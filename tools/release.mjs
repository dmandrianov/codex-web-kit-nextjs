#!/usr/bin/env node

import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import {
  access,
  chmod,
  copyFile,
  lstat,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rename,
  rm,
  utimes,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { fileURLToPath, pathToFileURL } from "node:url";

import {
  compareSemver,
  extractManagedBlock,
  isAllowedTarget,
  isSafeRelativePath,
  OFFICIAL_REPOSITORY_FULL_NAME,
  OFFICIAL_REPOSITORY_ID,
  parseSemver,
  sha256Buffer,
  sha256File,
  validateManifestShape,
  verifyPayloadDirectory,
} from "./update-kit.mjs";

const execFileAsync = promisify(execFile);
const KIT_ID = "dmandrianov/web-kit";
const MANIFEST_PATH = ".prompt-kit/manifest.json";
const BEGIN_PREFIX = "<!-- PROMPT_KIT:BEGIN managed version=";
const END_MARKER = "<!-- PROMPT_KIT:END -->";
const PORTABLE_PATH = /^[A-Za-z0-9._/-]+$/;
const MAX_PAYLOAD_FILE_BYTES = 2 * 1024 * 1024;
const REQUIRED_MAPPED_TARGETS = new Set([
  "AGENTS.md",
  ".prompt-kit/.gitignore",
  ".prompt-kit/CHANGELOG.md",
  ".prompt-kit/MIGRATIONS.md",
  ".prompt-kit/TERMS.md",
  ".prompt-kit/VERSION.md",
  ".prompt-kit/manifest.schema.json",
  ".prompt-kit/update.mjs",
]);

function comparePaths(left, right) {
  return left.localeCompare(right, "en");
}

function ensureObject(value, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(`${label} must be an object`);
  return value;
}

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

function resolveInside(root, relativePath) {
  if (!isSafeRelativePath(relativePath) || !PORTABLE_PATH.test(relativePath)) throw new Error(`Unsafe or non-portable path: ${relativePath}`);
  const resolvedRoot = path.resolve(root);
  const resolved = path.resolve(resolvedRoot, ...relativePath.split("/"));
  if (!resolved.startsWith(`${resolvedRoot}${path.sep}`)) throw new Error(`Path escapes source root: ${relativePath}`);
  return resolved;
}

function childEnvironment(options = {}) {
  const environment = {};
  for (const key of Object.keys(process.env)) {
    const tokenVariable = /^(?:GH_TOKEN|GITHUB_TOKEN|GH_ENTERPRISE_TOKEN|GITHUB_ENTERPRISE_TOKEN|GITHUB_PAT|PAT)$/i.test(key);
    const workflowToken = options.allowWorkflowToken
      && process.env.GITHUB_ACTIONS === "true"
      && key === "GH_TOKEN";
    if (tokenVariable && !workflowToken) continue;
    environment[key] = process.env[key];
  }
  return environment;
}

async function run(command, args, options = {}) {
  try {
    return await execFileAsync(command, args, {
      cwd: options.cwd,
      encoding: Object.hasOwn(options, "encoding") ? options.encoding : "utf8",
      maxBuffer: options.maxBuffer ?? 128 * 1024 * 1024,
      env: { ...childEnvironment(), LC_ALL: "C", TZ: "UTC" },
    });
  } catch (error) {
    const detail = String(error?.stderr || error?.message || error).trim();
    throw new Error(`${command} failed${detail ? `: ${detail}` : ""}`);
  }
}

async function runGh(args, purpose) {
  try {
    return await execFileAsync("gh", args, {
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
      env: { ...childEnvironment({ allowWorkflowToken: true }), LC_ALL: "C", TZ: "UTC" },
    });
  } catch (error) {
    if (error?.code === "ENOENT") throw new Error("GitHub CLI (gh) is required for private publication and was not found");
    throw new Error(`Authenticated GitHub CLI access failed while ${purpose}`);
  }
}

async function ghJson(args, purpose) {
  let lastError;
  for (const delay of [0, 250, 750, 1500]) {
    if (delay) await waitMilliseconds(delay);
    try {
      const { stdout } = await runGh(args, purpose);
      return JSON.parse(stdout);
    } catch (error) {
      lastError = error;
    }
  }
  if (lastError?.message?.includes("invalid JSON")) throw lastError;
  throw new Error(`GitHub CLI read failed after bounded retries while ${purpose}`);
}

function waitMilliseconds(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function verifyPublishedReleaseAttestation(trust, tag) {
  let lastError;
  for (const delay of [0, 250, 750, 1500]) {
    if (delay) await waitMilliseconds(delay);
    try {
      await ghJson(["release", "verify", tag, "--repo", trust.fullName, "--format", "json"], "verifying the published immutable release");
      return;
    } catch (error) {
      lastError = error;
    }
  }
  throw new Error(`Published immutable release verification failed: ${lastError?.message ?? "unknown error"}`);
}

function decodeText(buffer, label) {
  if (buffer.includes(0)) throw new Error(`${label} contains NUL bytes`);
  let text;
  try {
    text = new TextDecoder("utf-8", { fatal: true }).decode(buffer);
  } catch {
    throw new Error(`${label} is not valid UTF-8`);
  }
  if (text.includes("\r")) throw new Error(`${label} must use LF line endings`);
  return text;
}

const SECRET_PATTERNS = [
  ["private key", /-----BEGIN (?:RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----/],
  ["GitHub token", /\b(?:github_pat_[A-Za-z0-9_]{20,}|gh[pousr]_[A-Za-z0-9_]{20,})\b/],
  ["OpenAI API key", /\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}\b/],
  ["AWS access key", /\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/],
  ["Slack token", /\bxox[baprs]-[A-Za-z0-9-]{20,}\b/],
  ["Google API key", /\bAIza[0-9A-Za-z_-]{35}\b/],
  ["assigned credential", /\b(?:api[_-]?key|access[_-]?token|auth[_-]?token|client[_-]?secret|password)\s*[:=]\s*["']?[A-Za-z0-9_+/=-]{24,}/i],
];

export function findSecretKind(text) {
  for (const [kind, pattern] of SECRET_PATTERNS) {
    if (pattern.test(text)) return kind;
  }
  return null;
}

async function inspectSourceFile(root, relativePath, options = {}) {
  const absolute = resolveInside(root, relativePath);
  const info = await lstat(absolute);
  if (info.isSymbolicLink()) throw new Error(`Symlink is forbidden in release source: ${relativePath}`);
  if (!info.isFile()) throw new Error(`Release source is not a regular file: ${relativePath}`);
  if ((info.mode & 0o111) !== 0) throw new Error(`Executable bit is forbidden for release source: ${relativePath}`);
  if (info.size > (options.maxBytes ?? MAX_PAYLOAD_FILE_BYTES)) throw new Error(`Release source is too large: ${relativePath}`);
  const buffer = await readFile(absolute);
  const text = decodeText(buffer, relativePath);
  const secretKind = findSecretKind(text);
  if (secretKind) throw new Error(`Possible ${secretKind} found in ${relativePath}`);
  return { absolute, buffer, text, bytes: buffer.length };
}

async function walkFiles(root, current = root, result = []) {
  for (const item of await readdir(current, { withFileTypes: true })) {
    const absolute = path.join(current, item.name);
    const relative = path.relative(root, absolute).split(path.sep).join("/");
    const info = await lstat(absolute);
    if (info.isSymbolicLink()) throw new Error(`Symlink is forbidden in source tree: ${relative}`);
    if (info.isDirectory()) await walkFiles(root, absolute, result);
    else if (info.isFile()) result.push(relative);
    else throw new Error(`Non-regular source entry is forbidden: ${relative}`);
  }
  return result;
}

function assertUniquePortablePaths(values, label) {
  const exact = new Set();
  const folded = new Set();
  for (const value of values) {
    if (!isSafeRelativePath(value) || !PORTABLE_PATH.test(value)) throw new Error(`${label} contains an unsafe path: ${value}`);
    if (exact.has(value)) throw new Error(`${label} contains a duplicate path: ${value}`);
    const lower = value.toLocaleLowerCase("en-US");
    if (folded.has(lower)) throw new Error(`${label} contains a case-fold collision: ${value}`);
    exact.add(value);
    folded.add(lower);
  }
}

function parseVersionFile(text) {
  const versionMatches = [...text.matchAll(/^- Version:\s*([0-9]+\.[0-9]+\.[0-9]+)\s*$/gm)];
  const releasedMatches = [...text.matchAll(/^- Released:\s*(\d{4}-\d{2}-\d{2})\s*$/gm)];
  const markerMatches = [...text.matchAll(/^- Managed block:\s*`PROMPT_KIT:BEGIN managed version=([0-9]+\.[0-9]+\.[0-9]+)`\s*$/gm)];
  if (versionMatches.length !== 1 || releasedMatches.length !== 1 || markerMatches.length !== 1) {
    throw new Error("PROMPT_KIT_VERSION.md must contain one Version, Released date, and Managed block version");
  }
  const version = versionMatches[0][1];
  const releasedAt = releasedMatches[0][1];
  parseSemver(version);
  if (markerMatches[0][1] !== version) throw new Error("Version file managed-block marker does not match Version");
  const timestamp = Date.parse(`${releasedAt}T00:00:00Z`);
  if (!Number.isFinite(timestamp) || new Date(timestamp).toISOString().slice(0, 10) !== releasedAt) throw new Error(`Invalid release date: ${releasedAt}`);
  return { version, releasedAt, timestamp };
}

function firstReleaseHeading(text, label, withDate) {
  const pattern = withDate ? /^##\s+([0-9]+\.[0-9]+\.[0-9]+)\s+-\s+(\d{4}-\d{2}-\d{2})\s*$/m : /^##\s+([0-9]+\.[0-9]+\.[0-9]+)\s*$/m;
  const match = pattern.exec(text);
  if (!match) throw new Error(`${label} has no release heading`);
  return { version: match[1], releasedAt: match[2] ?? null, index: match.index, headingEnd: match.index + match[0].length };
}

function validateConfig(config) {
  ensureObject(config, "release/payload.json");
  if (config.schemaVersion !== 1) throw new Error(`Unsupported payload schema: ${config.schemaVersion}`);
  ensureObject(config.kit, "payload.kit");
  ensureObject(config.compatibility, "payload.compatibility");
  ensureObject(config.publication, "payload.publication");
  ensureObject(config.assets, "payload.assets");
  if (config.kit.id !== KIT_ID || config.kit.name !== "Web Kit") throw new Error("Payload kit identity is invalid");
  const repositoryIdValid = config.kit.repositoryId === OFFICIAL_REPOSITORY_ID;
  const repositoryNameValid = config.kit.repositoryFullName === OFFICIAL_REPOSITORY_FULL_NAME;
  if (!repositoryIdValid || !repositoryNameValid) throw new Error("Payload repository identity must match the updater's embedded trust root");
  if (config.kit.repositoryId !== null && (!Number.isSafeInteger(config.kit.repositoryId) || config.kit.repositoryId <= 0)) {
    throw new Error("Configured repository ID must be a positive safe integer");
  }
  if (config.kit.repositoryFullName !== null && !/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(config.kit.repositoryFullName)) {
    throw new Error("Configured repository full_name is invalid");
  }
  if ((config.kit.repositoryId === null) !== (config.kit.repositoryFullName === null)) {
    throw new Error("Payload repository ID and full_name must be configured together");
  }
  if (config.kit.transport !== "private-github-organization-gh") throw new Error("Payload release transport is invalid");
  if (config.kit.channel !== "stable") throw new Error("Only the stable release channel is supported");
  if (config.publication.termsRequired !== true || config.publication.accessModel !== "private-subscription") {
    throw new Error("Publication contract must require TERMS.md and private subscription access");
  }
  if (config.publication.immutableReleaseRequired !== true) throw new Error("Publication contract must require immutable GitHub releases");
  if (config.assets.archiveRootPattern !== "web-kit-v{version}" || config.assets.zipPattern !== "web-kit-v{version}.zip" || config.assets.tarPattern !== "web-kit-v{version}.tar.gz" || config.assets.checksum !== "SHA256SUMS") {
    throw new Error("Release asset naming contract is invalid");
  }
  if (!Array.isArray(config.mappedFiles) || !Array.isArray(config.promptFiles) || !Array.isArray(config.removed) || !Array.isArray(config.protectedPaths)) {
    throw new Error("Payload arrays are incomplete");
  }
  parseSemver(config.compatibility.compatibleFrom);

  assertUniquePortablePaths(config.promptFiles, "promptFiles");
  if (!config.promptFiles.includes("prompts/_local/README.md")) throw new Error("promptFiles must contain the local README seed");

  const mappedSources = [];
  const mappedTargets = [];
  const targetPolicies = new Map();
  for (const entry of config.mappedFiles) {
    ensureObject(entry, "mapped file");
    mappedSources.push(entry.source);
    mappedTargets.push(entry.target);
    if (!isAllowedTarget(entry.target)) throw new Error(`Mapped target is outside the updater boundary: ${entry.target}`);
    if (entry.target === "AGENTS.md") {
      if (entry.ownership !== "hybrid" || entry.policy !== "managed-block" || entry.required !== true) throw new Error("AGENTS.md mapping must be required managed-block hybrid content");
    } else if (entry.ownership !== "kit" || entry.policy !== "replace-if-unmodified" || typeof entry.required !== "boolean") {
      throw new Error(`Invalid mapped-file policy for ${entry.target}`);
    }
    targetPolicies.set(entry.target, entry);
  }
  assertUniquePortablePaths(mappedSources, "mapped source files");
  assertUniquePortablePaths(mappedTargets, "mapped target files");
  for (const required of REQUIRED_MAPPED_TARGETS) {
    if (!targetPolicies.has(required)) throw new Error(`Required mapped target is missing: ${required}`);
  }
  const terms = targetPolicies.get(".prompt-kit/TERMS.md");
  if (terms?.source !== "TERMS.md" || terms.required !== true) throw new Error("TERMS.md must be a required mapped release source");
  const allowedMappedTargets = new Set(REQUIRED_MAPPED_TARGETS);
  for (const target of mappedTargets) {
    if (!allowedMappedTargets.has(target)) throw new Error(`Unexpected mapped target: ${target}`);
  }

  const allTargets = [...mappedTargets, ...config.promptFiles];
  assertUniquePortablePaths(allTargets, "release targets");
  for (const prompt of config.promptFiles) {
    if (!prompt.startsWith("prompts/") || !isAllowedTarget(prompt)) throw new Error(`Invalid prompt target: ${prompt}`);
  }
  for (const removed of config.removed) {
    ensureObject(removed, "removed entry");
    if (!isAllowedTarget(removed.path) || removed.policy !== "delete-if-unmodified") throw new Error(`Unsafe removed entry: ${removed.path}`);
    if (allTargets.includes(removed.path)) throw new Error(`Removed path is still in the payload: ${removed.path}`);
  }
  return config;
}

async function readSourceMetadata(root) {
  const versionSource = await inspectSourceFile(root, "PROMPT_KIT_VERSION.md");
  const changelogSource = await inspectSourceFile(root, "CHANGELOG.md");
  const migrationsSource = await inspectSourceFile(root, "MIGRATIONS.md");
  const agentsSource = await inspectSourceFile(root, "AGENTS.md");
  const version = parseVersionFile(versionSource.text);
  const changelog = firstReleaseHeading(changelogSource.text, "CHANGELOG.md", true);
  const migrations = firstReleaseHeading(migrationsSource.text, "MIGRATIONS.md", false);
  if (changelog.version !== version.version || migrations.version !== version.version) throw new Error("Version, changelog, and migrations release headings disagree");
  if (changelog.releasedAt !== version.releasedAt) throw new Error("Version and changelog release dates disagree");
  const managed = extractManagedBlock(agentsSource.text);
  const managedVersion = /PROMPT_KIT:BEGIN managed version=([0-9]+\.[0-9]+\.[0-9]+)/.exec(managed.block)?.[1];
  if (managedVersion !== version.version) throw new Error("AGENTS.md managed-block version does not match the release version");
  return { version, changelogSource, migrationsSource, agentsSource, managed };
}

function isForbiddenTrackedPath(relativePath) {
  const parts = relativePath.split("/");
  const base = parts.at(-1).toLowerCase();
  if (parts.some((part) => ["node_modules", "dist", "tmp"].includes(part))) return true;
  if (relativePath === "archive.zip" || relativePath.startsWith("docs/prompt-kit-backups/")) return true;
  if (base === ".env" || base.startsWith(".env.")) return true;
  if (/^(?:id_rsa|id_ed25519|credentials|secrets?)(?:\.|$)/i.test(base)) return true;
  if (/\.(?:pem|key|p12|pfx|jks|kdbx)$/i.test(base)) return true;
  return false;
}

async function repositoryInfo(root) {
  try {
    const top = (await run("git", ["-C", root, "rev-parse", "--show-toplevel"])).stdout.trim();
    if (path.resolve(top) !== path.resolve(root)) return null;
    const head = (await run("git", ["-C", root, "rev-parse", "HEAD"])).stdout.trim();
    const status = (await run("git", ["-C", root, "status", "--porcelain=v1", "--untracked-files=all"])).stdout;
    return { head, status };
  } catch {
    return null;
  }
}

export function normalizeGitHubRepository(remoteUrl) {
  const value = String(remoteUrl ?? "").trim();
  let repositoryPath;
  const scp = /^git@github\.com:(.+)$/i.exec(value);
  if (scp) repositoryPath = scp[1];
  else {
    try {
      const parsed = new URL(value);
      if (parsed.hostname.toLowerCase() !== "github.com") return null;
      repositoryPath = parsed.pathname;
    } catch {
      return null;
    }
  }
  const normalized = repositoryPath.replace(/^\/+|\/+$/g, "").replace(/\.git$/i, "").toLowerCase();
  return /^[a-z0-9_.-]+\/[a-z0-9_.-]+$/.test(normalized) ? normalized : null;
}

function requirePublishRepositoryIdentity(config) {
  const repositoryId = config.kit.repositoryId;
  const fullName = config.kit.repositoryFullName;
  if (!Number.isSafeInteger(repositoryId) || repositoryId <= 0 || typeof fullName !== "string") {
    throw new Error("Publishing is disabled until a positive GitHub repository ID and final repository full_name are embedded in the updater and payload config");
  }
  return { repositoryId, fullName };
}

async function verifyPrivatePublishRepository(config) {
  const trust = requirePublishRepositoryIdentity(config);
  await runGh(["auth", "status", "--hostname", "github.com"], "checking publication authentication");
  const repository = await ghJson(["api", "--method", "GET", `repos/${trust.fullName}`], "checking publication repository access");
  if (repository.id !== trust.repositoryId) throw new Error("GitHub repository ID does not match the configured publication trust root");
  if (repository.full_name !== trust.fullName) throw new Error("Configured repository full_name is stale; update it to GitHub's current canonical full_name before publishing");
  if (repository.private !== true || repository.owner?.type !== "Organization") {
    throw new Error("Publishing requires a private GitHub Organization repository");
  }
  const immutableReleases = await ghJson([
    "api", "--method", "GET", `repos/${trust.fullName}/immutable-releases`,
  ], "checking immutable release settings");
  if (immutableReleases.enabled !== true) throw new Error("Immutable GitHub releases must be enabled before publishing");
  return trust;
}

async function resolveRemoteTagCommit(trust, tag) {
  let object = (await ghJson(["api", "--method", "GET", `repos/${trust.fullName}/git/ref/tags/${encodeURIComponent(tag)}`], "resolving the remote release tag")).object;
  for (let depth = 0; depth < 5; depth += 1) {
    if (object?.type === "commit" && /^[a-f0-9]{40}$/.test(object.sha ?? "")) return object.sha;
    if (object?.type !== "tag" || !/^[a-f0-9]{40}$/.test(object.sha ?? "")) break;
    object = (await ghJson(["api", "--method", "GET", `repos/${trust.fullName}/git/tags/${object.sha}`], "resolving an annotated remote release tag")).object;
  }
  throw new Error(`Cannot resolve remote tag ${tag} to an immutable commit`);
}

async function resolveMainCommit(root) {
  for (const reference of ["refs/remotes/origin/main", "refs/heads/main"]) {
    try {
      return { reference, commit: (await run("git", ["-C", root, "rev-parse", `--verify`, `${reference}^{commit}`])).stdout.trim() };
    } catch {
      // Try the local fallback when a remote-tracking main ref is unavailable.
    }
  }
  throw new Error("Publishing requires origin/main or a local main branch");
}

async function verifyGitPublication(root, tag, sourcePaths, config) {
  const trust = await verifyPrivatePublishRepository(config);
  const repository = await repositoryInfo(root);
  if (!repository) throw new Error("Publishing requires this folder to be the root of a Git repository with a commit");
  if (repository.status.trim()) throw new Error("Publishing requires a clean Git worktree");
  const origin = (await run("git", ["-C", root, "remote", "get-url", "origin"])).stdout.trim();
  if (normalizeGitHubRepository(origin) !== trust.fullName.toLowerCase()) throw new Error(`Publishing origin must be the configured private repository ${trust.fullName}`);
  const tagCommit = (await run("git", ["-C", root, "rev-parse", `refs/tags/${tag}^{commit}`])).stdout.trim();
  if (tagCommit !== repository.head) throw new Error(`Tag ${tag} does not point to HEAD`);
  const remoteTagCommit = await resolveRemoteTagCommit(trust, tag);
  if (remoteTagCommit !== tagCommit) throw new Error(`Remote tag ${tag} does not point to the local release commit`);
  const main = await resolveMainCommit(root);
  try {
    await run("git", ["-C", root, "merge-base", "--is-ancestor", tagCommit, main.commit]);
  } catch {
    throw new Error(`Tag ${tag} is not an ancestor of ${main.reference}`);
  }

  const tracked = (await run("git", ["-C", root, "ls-files", "-z"])).stdout.split("\0").filter(Boolean);
  for (const trackedPath of tracked) {
    if (isForbiddenTrackedPath(trackedPath)) throw new Error(`Forbidden path is tracked by Git: ${trackedPath}`);
    const absolute = path.join(root, ...trackedPath.split("/"));
    const info = await lstat(absolute);
    if (!info.isFile()) continue;
    if (info.size > 4 * 1024 * 1024) continue;
    const buffer = await readFile(absolute);
    if (buffer.includes(0)) continue;
    const text = decodeText(buffer, trackedPath);
    const secretKind = findSecretKind(text);
    if (secretKind) throw new Error(`Possible ${secretKind} found in tracked source ${trackedPath}`);
  }

  const trackedSet = new Set(tracked);
  for (const sourcePath of sourcePaths) {
    if (!trackedSet.has(sourcePath)) throw new Error(`Release source is not tracked by Git: ${sourcePath}`);
  }
  const stage = (await run("git", ["-C", root, "ls-files", "--stage", "--", ...sourcePaths])).stdout.split("\n").filter(Boolean);
  const modes = new Map(stage.map((line) => {
    const match = /^(\d{6}) [a-f0-9]+ \d\t(.+)$/.exec(line);
    return match ? [match[2], match[1]] : ["", ""];
  }));
  for (const sourcePath of sourcePaths) {
    if (modes.get(sourcePath) !== "100644") throw new Error(`Tracked release source must have mode 100644: ${sourcePath}`);
  }
  return { ...repository, trust };
}

async function sourceRevision(root, entries, repository, extraPaths = []) {
  if (repository && !repository.status.trim()) return repository.head;
  const digest = createHash("sha256");
  const sources = new Map(entries.map((entry) => [entry.source, entry.absolute]));
  for (const relative of extraPaths) sources.set(relative, resolveInside(root, relative));
  for (const [relative, absolute] of [...sources].sort((left, right) => comparePaths(left[0], right[0]))) {
    digest.update(relative).update("\0").update(await readFile(absolute)).update("\0");
  }
  return `worktree-${digest.digest("hex").slice(0, 40)}`;
}

async function resolveSourceEntries(root, config) {
  const entries = [];
  for (const mapped of config.mappedFiles) {
    const absolute = resolveInside(root, mapped.source);
    const present = await exists(absolute);
    if (!present) {
      if (mapped.required) throw new Error(`Required release source is missing: ${mapped.source}`);
      continue;
    }
    const inspected = await inspectSourceFile(root, mapped.source, { maxBytes: mapped.target === ".prompt-kit/TERMS.md" ? 256 * 1024 : undefined });
    entries.push({ ...mapped, ...inspected });
  }
  for (const prompt of config.promptFiles) {
    const inspected = await inspectSourceFile(root, prompt);
    const seed = prompt === "prompts/_local/README.md";
    entries.push({
      source: prompt,
      target: prompt,
      ownership: seed ? "seed" : "kit",
      policy: seed ? "create-if-missing" : "replace-if-unmodified",
      required: true,
      ...inspected,
    });
  }
  return entries;
}

async function readReleaseNotes(root, metadata) {
  const curatedPath = `release/notes/v${metadata.version.version}.md`;
  if (await exists(resolveInside(root, curatedPath))) {
    const curated = await inspectSourceFile(root, curatedPath);
    if (!curated.text.includes(`v${metadata.version.version}`) && !curated.text.includes(metadata.version.version)) {
      throw new Error(`${curatedPath} does not mention the release version`);
    }
    return { text: `${curated.text.trim()}\n`, sourcePath: curatedPath };
  }
  const text = metadata.changelogSource.text;
  const heading = metadata.changelogSource.text.match(new RegExp(`^##\\s+${metadata.version.version.replaceAll(".", "\\.")}\\s+-\\s+${metadata.version.releasedAt}\\s*$`, "m"));
  if (!heading || heading.index === undefined) throw new Error("Cannot extract release notes from CHANGELOG.md");
  const bodyStart = heading.index + heading[0].length;
  const next = text.slice(bodyStart).search(/^##\s+/m);
  const bodyEnd = next < 0 ? text.length : bodyStart + next;
  const body = text.slice(bodyStart, bodyEnd).trim();
  return { text: `# Web Kit v${metadata.version.version}\n\n${body}\n`, sourcePath: "CHANGELOG.md" };
}

export async function verifySource(root = process.cwd(), options = {}) {
  const sourceRoot = path.resolve(root);
  const configSource = await inspectSourceFile(sourceRoot, "release/payload.json", { maxBytes: 512 * 1024 });
  const config = validateConfig(JSON.parse(configSource.text));
  const metadata = await readSourceMetadata(sourceRoot);
  if (options.tag && options.tag !== `v${metadata.version.version}`) throw new Error(`Tag ${options.tag} does not match v${metadata.version.version}`);
  if (options.publish && !options.tag) throw new Error("--publish requires --tag vX.Y.Z");
  if (options.publish) requirePublishRepositoryIdentity(config);
  if (compareSemver(config.compatibility.compatibleFrom, metadata.version.version) > 0) throw new Error("compatibleFrom cannot be newer than the release version");

  const actualPrompts = (await walkFiles(path.join(sourceRoot, "prompts"))).map((value) => `prompts/${value}`).sort(comparePaths);
  const configuredPrompts = [...config.promptFiles].sort(comparePaths);
  const missing = configuredPrompts.filter((value) => !actualPrompts.includes(value));
  const unlisted = actualPrompts.filter((value) => !configuredPrompts.includes(value));
  if (missing.length || unlisted.length) {
    throw new Error(`Prompt allowlist mismatch. Missing: ${missing.join(", ") || "none"}; unlisted: ${unlisted.join(", ") || "none"}`);
  }

  const entries = await resolveSourceEntries(sourceRoot, config);
  const notes = await readReleaseNotes(sourceRoot, metadata);
  const sourcePaths = [...new Set(["release/payload.json", notes.sourcePath, ...entries.map((entry) => entry.source)])];
  let repository = await repositoryInfo(sourceRoot);
  if (options.tag) {
    if (!repository) throw new Error("Tag verification requires a Git repository at the source root");
    const tagCommit = (await run("git", ["-C", sourceRoot, "rev-parse", `refs/tags/${options.tag}^{commit}`])).stdout.trim();
    if (tagCommit !== repository.head) throw new Error(`Tag ${options.tag} does not point to HEAD`);
  }
  if (options.publish) repository = await verifyGitPublication(sourceRoot, options.tag, sourcePaths, config);
  const revision = await sourceRevision(sourceRoot, entries, repository, ["release/payload.json", notes.sourcePath]);
  return { root: sourceRoot, config, metadata, entries, notes, revision, repository };
}

function assetNames(config, version) {
  const replace = (value) => value.replaceAll("{version}", version);
  return {
    archiveRoot: replace(config.assets.archiveRootPattern),
    zip: replace(config.assets.zipPattern),
    tar: replace(config.assets.tarPattern),
    checksum: config.assets.checksum,
    notes: "RELEASE_NOTES.md",
  };
}

function outputDirectory(root, version, requested) {
  return requested ? path.resolve(root, requested) : path.join(root, "dist", "releases", `v${version}`);
}

function manifestEntry(entry, buffer) {
  const result = {
    path: entry.target,
    ownership: entry.ownership,
    policy: entry.policy,
    required: entry.required,
    sha256: sha256Buffer(buffer),
    bytes: buffer.length,
    mode: "0644",
  };
  if (entry.target === "AGENTS.md") {
    result.managedBlockSha256 = sha256Buffer(Buffer.from(extractManagedBlock(decodeText(buffer, "AGENTS.md")).block));
  }
  return result;
}

async function normalizeTree(root, timestamp) {
  const directories = [];
  const files = [];
  async function visit(current) {
    directories.push(current);
    for (const item of await readdir(current, { withFileTypes: true })) {
      const absolute = path.join(current, item.name);
      const info = await lstat(absolute);
      if (info.isSymbolicLink()) throw new Error(`Symlink appeared in staged payload: ${absolute}`);
      if (info.isDirectory()) await visit(absolute);
      else if (info.isFile()) files.push(absolute);
      else throw new Error(`Non-regular staged payload entry: ${absolute}`);
    }
  }
  await visit(root);
  const date = new Date(timestamp);
  for (const file of files) {
    await chmod(file, 0o644);
    await utimes(file, date, date);
  }
  for (const directory of directories.sort((left, right) => right.length - left.length)) {
    await chmod(directory, 0o755);
    await utimes(directory, date, date);
  }
  return files;
}

async function writePayloadStage(source, stageParent, names) {
  const payloadRoot = path.join(stageParent, names.archiveRoot);
  await mkdir(payloadRoot, { recursive: true });
  const fileEntries = [];
  for (const entry of source.entries) {
    const target = resolveInside(payloadRoot, entry.target);
    await mkdir(path.dirname(target), { recursive: true });
    await copyFile(entry.absolute, target);
    await chmod(target, 0o644);
    const buffer = await readFile(target);
    fileEntries.push(manifestEntry(entry, buffer));
  }
  fileEntries.sort((left, right) => comparePaths(left.path, right.path));
  const version = source.metadata.version;
  const manifest = {
    schemaVersion: 1,
    kit: {
      id: source.config.kit.id,
      name: source.config.kit.name,
      version: version.version,
      channel: source.config.kit.channel,
      releasedAt: version.releasedAt,
    },
    source: {
      repositoryId: source.config.kit.repositoryId,
      repositoryFullName: source.config.kit.repositoryFullName,
      transport: source.config.kit.transport,
      tag: `v${version.version}`,
      revision: source.revision,
    },
    release: {
      archiveRoot: names.archiveRoot,
      zipAsset: names.zip,
      tarAsset: names.tar,
      checksumAsset: names.checksum,
    },
    compatibility: source.config.compatibility,
    managedBlocks: { agents: { beginPrefix: BEGIN_PREFIX, endMarker: END_MARKER } },
    files: fileEntries,
    removed: source.config.removed,
    protectedPaths: source.config.protectedPaths,
  };
  validateManifestShape(manifest);
  const manifestFile = resolveInside(payloadRoot, MANIFEST_PATH);
  await mkdir(path.dirname(manifestFile), { recursive: true });
  await writeFile(manifestFile, `${JSON.stringify(manifest, null, 2)}\n`, { mode: 0o644 });
  await normalizeTree(payloadRoot, version.timestamp);
  await verifyPayloadDirectory(payloadRoot);
  return { payloadRoot, manifest };
}

async function createArchives(stageParent, payloadRoot, outputRoot, names, timestamp) {
  const zipPath = path.join(outputRoot, names.zip);
  const tarPath = path.join(outputRoot, names.tar);
  const rawTar = path.join(outputRoot, `${names.archiveRoot}.tar`);
  const payloadFiles = (await walkFiles(payloadRoot)).sort(comparePaths).map((value) => `${names.archiveRoot}/${value}`);
  await run("zip", ["-X", "-q", zipPath, ...payloadFiles], { cwd: stageParent });
  await run("tar", [
    "--sort=name",
    "--format=ustar",
    `--mtime=@${Math.floor(timestamp / 1000)}`,
    "--owner=0",
    "--group=0",
    "--numeric-owner",
    "--mode=u+rwX,go+rX,go-w",
    "-C",
    stageParent,
    "-cf",
    rawTar,
    names.archiveRoot,
  ]);
  const compressed = (await run("gzip", ["-n", "-9", "-c", rawTar], { encoding: null })).stdout;
  await writeFile(tarPath, compressed, { mode: 0o644 });
  await rm(rawTar, { force: true });
  await chmod(zipPath, 0o644);
  await chmod(tarPath, 0o644);
  return { zipPath, tarPath };
}

function validateArchiveName(raw, expectedRoot) {
  const directory = raw.endsWith("/");
  const value = directory ? raw.slice(0, -1) : raw;
  if (!value || !PORTABLE_PATH.test(value) || value.includes("\\") || path.posix.isAbsolute(value)) throw new Error(`Unsafe archive entry: ${raw}`);
  const parts = value.split("/");
  if (parts.some((part) => !part || part === "." || part === "..")) throw new Error(`Unsafe archive entry: ${raw}`);
  if (parts[0] !== expectedRoot) throw new Error(`Archive entry is outside ${expectedRoot}: ${raw}`);
  return { value, directory };
}

function parseModeListing(text) {
  const modes = new Map();
  for (const line of text.split(/\r?\n/)) {
    const match = /^([dl-][rwxStTs-]{9})\s+/.exec(line);
    if (!match) continue;
    const name = line.trim().split(/\s+/).at(-1).replace(/\/$/, "");
    modes.set(name, match[1]);
  }
  return modes;
}

function expectedDirectories(root, files) {
  const result = new Set([root]);
  for (const file of files) {
    const parts = `${root}/${file}`.split("/");
    for (let index = 1; index < parts.length; index += 1) result.add(parts.slice(0, index).join("/"));
  }
  return result;
}

function validateArchiveEntries(rawNames, modeText, expectedRoot, expectedFiles) {
  const expectedFullFiles = new Set(expectedFiles.map((value) => `${expectedRoot}/${value}`));
  const allowedDirectories = expectedDirectories(expectedRoot, expectedFiles);
  const modes = parseModeListing(modeText);
  const actualFiles = new Set();
  const seen = new Set();
  const folded = new Set();
  for (const raw of rawNames) {
    if (!raw) continue;
    const parsed = validateArchiveName(raw, expectedRoot);
    if (seen.has(parsed.value)) throw new Error(`Duplicate archive entry: ${parsed.value}`);
    const lower = parsed.value.toLocaleLowerCase("en-US");
    if (folded.has(lower)) throw new Error(`Archive path case collision: ${parsed.value}`);
    seen.add(parsed.value);
    folded.add(lower);
    const mode = modes.get(parsed.value);
    const directory = parsed.directory || mode?.startsWith("d");
    if (directory) {
      if (!allowedDirectories.has(parsed.value)) throw new Error(`Unexpected archive directory: ${parsed.value}`);
      if (mode && mode !== "drwxr-xr-x") throw new Error(`Archive directory mode is not 0755: ${parsed.value} (${mode})`);
    } else {
      actualFiles.add(parsed.value);
      if (mode !== "-rw-r--r--") throw new Error(`Archive file mode is not 0644: ${parsed.value} (${mode || "missing"})`);
    }
  }
  const missing = [...expectedFullFiles].filter((value) => !actualFiles.has(value));
  const extras = [...actualFiles].filter((value) => !expectedFullFiles.has(value));
  if (missing.length || extras.length) throw new Error(`Archive payload mismatch. Missing: ${missing.join(", ") || "none"}; extra: ${extras.join(", ") || "none"}`);
}

async function verifyExtractedModes(payloadRoot) {
  async function visit(current) {
    for (const item of await readdir(current, { withFileTypes: true })) {
      const absolute = path.join(current, item.name);
      const info = await lstat(absolute);
      if (info.isSymbolicLink()) throw new Error(`Extracted payload contains a symlink: ${absolute}`);
      if (info.isDirectory()) {
        if (process.platform !== "win32" && (info.mode & 0o777) !== 0o755) throw new Error(`Extracted directory mode is not 0755: ${absolute}`);
        await visit(absolute);
      } else if (info.isFile()) {
        if (process.platform !== "win32" && (info.mode & 0o777) !== 0o644) throw new Error(`Extracted file mode is not 0644: ${absolute}`);
      } else throw new Error(`Extracted payload has a non-regular entry: ${absolute}`);
    }
  }
  await visit(payloadRoot);
}

async function extractAndVerifyArchive(archivePath, kind, expectedRoot, expectedTargets) {
  let namesText;
  let modesText;
  if (kind === "zip") {
    namesText = (await run("unzip", ["-Z1", archivePath])).stdout;
    modesText = (await run("unzip", ["-Z", "-l", archivePath])).stdout;
  } else {
    namesText = (await run("tar", ["-tzf", archivePath])).stdout;
    modesText = (await run("tar", ["-tvzf", archivePath])).stdout;
  }
  validateArchiveEntries(namesText.split(/\r?\n/).filter(Boolean), modesText, expectedRoot, [...expectedTargets, MANIFEST_PATH]);
  const temporary = await mkdtemp(path.join(tmpdir(), `web-kit-release-${kind}-`));
  try {
    if (kind === "zip") await run("unzip", ["-q", archivePath, "-d", temporary]);
    else await run("tar", ["-xzf", archivePath, "-C", temporary, "--no-same-owner"]);
    const payloadRoot = path.join(temporary, expectedRoot);
    const manifest = await verifyPayloadDirectory(payloadRoot);
    await verifyExtractedModes(payloadRoot);
    return { temporary, payloadRoot, manifest };
  } catch (error) {
    await rm(temporary, { recursive: true, force: true });
    throw error;
  }
}

async function comparePayloadTrees(leftRoot, rightRoot, targets) {
  for (const relative of [...targets, MANIFEST_PATH]) {
    const left = await readFile(resolveInside(leftRoot, relative));
    const right = await readFile(resolveInside(rightRoot, relative));
    if (!left.equals(right)) throw new Error(`ZIP and TAR payloads differ: ${relative}`);
  }
}

async function verifyChecksums(outputRoot, names) {
  const checksumText = decodeText(await readFile(path.join(outputRoot, names.checksum)), names.checksum);
  const lines = checksumText.split("\n").filter(Boolean);
  const expectedNames = [names.tar, names.zip].sort(comparePaths);
  if (lines.length !== expectedNames.length) throw new Error("SHA256SUMS must contain exactly the ZIP and TAR.GZ records");
  for (let index = 0; index < expectedNames.length; index += 1) {
    const match = /^([a-f0-9]{64})  ([A-Za-z0-9._-]+)$/.exec(lines[index]);
    if (!match || match[2] !== expectedNames[index]) throw new Error(`Invalid SHA256SUMS line: ${lines[index]}`);
    const actual = await sha256File(path.join(outputRoot, match[2]));
    if (actual !== match[1]) throw new Error(`SHA-256 mismatch for ${match[2]}`);
  }
}

async function verifyArtifactsDirectory(source, outputRoot) {
  const names = assetNames(source.config, source.metadata.version.version);
  const actual = (await walkFiles(outputRoot)).sort(comparePaths);
  const expectedArtifacts = [names.zip, names.tar, names.checksum, names.notes].sort(comparePaths);
  if (actual.length !== expectedArtifacts.length || actual.some((value, index) => value !== expectedArtifacts[index])) {
    throw new Error(`Artifact directory must contain only ${expectedArtifacts.join(", ")}`);
  }
  const notes = decodeText(await readFile(path.join(outputRoot, names.notes)), names.notes);
  if (!notes.includes(source.metadata.version.version)) throw new Error("RELEASE_NOTES.md does not mention the release version");
  if (notes !== source.notes.text) throw new Error("RELEASE_NOTES.md does not match its curated source");
  await verifyChecksums(outputRoot, names);
  const targets = source.entries.map((entry) => entry.target).sort(comparePaths);
  const zip = await extractAndVerifyArchive(path.join(outputRoot, names.zip), "zip", names.archiveRoot, targets);
  const tar = await extractAndVerifyArchive(path.join(outputRoot, names.tar), "tar", names.archiveRoot, targets);
  try {
    if (zip.manifest.kit.version !== source.metadata.version.version || tar.manifest.kit.version !== source.metadata.version.version) throw new Error("Artifact manifest version is incorrect");
    if (zip.manifest.source.revision !== source.revision || zip.manifest.source.tag !== `v${source.metadata.version.version}`) throw new Error("Artifact manifest is not bound to the current source revision and tag");
    const manifestTargets = zip.manifest.files.map((entry) => entry.path).sort(comparePaths);
    if (manifestTargets.length !== targets.length || manifestTargets.some((value, index) => value !== targets[index])) throw new Error("Artifact manifest does not match the source allowlist");
    const sourceByTarget = new Map(source.entries.map((entry) => [entry.target, entry]));
    for (const entry of zip.manifest.files) {
      const expected = sourceByTarget.get(entry.path);
      const expectedHash = sha256Buffer(expected.buffer);
      if (entry.sha256 !== expectedHash || entry.bytes !== expected.buffer.length || entry.ownership !== expected.ownership || entry.policy !== expected.policy || entry.required !== expected.required) {
        throw new Error(`Artifact manifest metadata differs from source: ${entry.path}`);
      }
    }
    await comparePayloadTrees(zip.payloadRoot, tar.payloadRoot, targets);
    return { names, manifest: zip.manifest, files: targets.length };
  } finally {
    await rm(zip.temporary, { recursive: true, force: true });
    await rm(tar.temporary, { recursive: true, force: true });
  }
}

export async function buildRelease(root = process.cwd(), options = {}) {
  const source = await verifySource(root, { tag: options.tag, publish: Boolean(options.publish) });
  const version = source.metadata.version.version;
  const names = assetNames(source.config, version);
  const destination = outputDirectory(source.root, version, options.out);
  if (path.resolve(destination) === source.root || source.root.startsWith(`${path.resolve(destination)}${path.sep}`)) throw new Error("Release output cannot be the source root or its parent");
  const destinationExists = await exists(destination);
  if (destinationExists && !options.force) throw new Error(`Release output already exists: ${destination}; use --force to replace it`);
  await mkdir(path.dirname(destination), { recursive: true });
  const temporaryOutput = await mkdtemp(path.join(path.dirname(destination), `.${path.basename(destination)}.tmp-`));
  const stageParent = await mkdtemp(path.join(tmpdir(), "web-kit-release-stage-"));
  try {
    const { payloadRoot } = await writePayloadStage(source, stageParent, names);
    const archives = await createArchives(stageParent, payloadRoot, temporaryOutput, names, source.metadata.version.timestamp);
    const checksumRecords = [];
    for (const archivePath of [archives.tarPath, archives.zipPath].sort((left, right) => comparePaths(path.basename(left), path.basename(right)))) {
      checksumRecords.push(`${await sha256File(archivePath)}  ${path.basename(archivePath)}`);
    }
    await writeFile(path.join(temporaryOutput, names.checksum), `${checksumRecords.join("\n")}\n`, { mode: 0o644 });
    await writeFile(path.join(temporaryOutput, names.notes), source.notes.text, { mode: 0o644 });
    await verifyArtifactsDirectory(source, temporaryOutput);
    if (destinationExists) await rm(destination, { recursive: true, force: true });
    await rename(temporaryOutput, destination);
    return { status: "built", version, output: destination, assets: [names.zip, names.tar, names.checksum, names.notes] };
  } finally {
    await rm(stageParent, { recursive: true, force: true });
    await rm(temporaryOutput, { recursive: true, force: true });
  }
}

export async function verifyArtifacts(root = process.cwd(), options = {}) {
  const source = await verifySource(root, { tag: options.tag, publish: Boolean(options.publish) });
  const destination = outputDirectory(source.root, source.metadata.version.version, options.out);
  const result = await verifyArtifactsDirectory(source, destination);
  return { status: "verified", version: source.metadata.version.version, output: destination, files: result.files, assets: [result.names.zip, result.names.tar, result.names.checksum, result.names.notes] };
}

export async function collectLocalReleaseAssets(entries) {
  const result = new Map();
  for (const entry of entries) {
    if (!entry || typeof entry.name !== "string" || typeof entry.path !== "string" || result.has(entry.name)) {
      throw new Error("Local release asset expectations are invalid");
    }
    const info = await lstat(entry.path);
    if (!info.isFile() || info.isSymbolicLink() || info.size <= 0) throw new Error(`Local release asset is not a non-empty regular file: ${entry.name}`);
    result.set(entry.name, { path: entry.path, size: info.size, sha256: await sha256File(entry.path) });
  }
  return result;
}

export async function assertGitHubReleaseAssets(release, expectedAssets, label) {
  if (!Array.isArray(release.assets)) throw new Error(`${label} has no asset list`);
  const actualNames = release.assets.map((asset) => asset?.name).sort(comparePaths);
  const expected = [...expectedAssets.keys()].sort(comparePaths);
  if (actualNames.length !== expected.length || actualNames.some((name, index) => name !== expected[index])) {
    throw new Error(`${label} asset set is incomplete or contains unexpected files`);
  }
  for (const asset of release.assets) {
    if (!Number.isSafeInteger(asset.id) || asset.id <= 0 || asset.state !== "uploaded" || !Number.isSafeInteger(asset.size) || asset.size <= 0) {
      throw new Error(`${label} contains invalid asset metadata for ${asset?.name ?? "unknown asset"}`);
    }
    const local = expectedAssets.get(asset.name);
    if (asset.size !== local.size) throw new Error(`${label} asset size does not match local bytes: ${asset.name}`);
    if (asset.digest !== `sha256:${local.sha256}`) {
      throw new Error(`${label} asset digest does not match local SHA-256: ${asset.name}`);
    }
  }
}

export function findReleaseByTag(pages, tag) {
  const releases = Array.isArray(pages) && pages.every(Array.isArray) ? pages.flat() : pages;
  if (!Array.isArray(releases)) throw new Error("GitHub returned an invalid release list");
  return releases.find((release) => release?.tag_name === tag) ?? null;
}

export async function publishRelease(root = process.cwd(), options = {}) {
  if (!options.tag) throw new Error("Publishing requires --tag vX.Y.Z");
  const source = await verifySource(root, { tag: options.tag, publish: true });
  const verified = await verifyArtifacts(root, { tag: options.tag, publish: true, out: options.out });
  const trust = requirePublishRepositoryIdentity(source.config);
  const pages = await ghJson([
    "api", "--paginate", "--slurp", "--method", "GET",
    `repos/${trust.fullName}/releases?per_page=100`,
  ], "checking for an existing release");
  if (findReleaseByTag(pages, options.tag)) throw new Error(`Release ${options.tag} already exists; refusing to replace it`);

  const output = verified.output;
  const names = assetNames(source.config, source.metadata.version.version);
  const expectedAssets = await collectLocalReleaseAssets([
    { name: names.zip, path: path.join(output, names.zip) },
    { name: names.tar, path: path.join(output, names.tar) },
    { name: names.checksum, path: path.join(output, names.checksum) },
  ]);
  await runGh([
    "release", "create", options.tag,
    "--repo", trust.fullName,
    "--verify-tag",
    "--draft",
    "--title", `Web Kit ${options.tag}`,
    "--notes-file", path.join(output, names.notes),
    path.join(output, names.zip),
    path.join(output, names.tar),
    path.join(output, names.checksum),
  ], "creating the private draft release");

  let draft = null;
  for (const delay of [0, 250, 750, 1500, 3000]) {
    if (delay) await waitMilliseconds(delay);
    const draftPages = await ghJson([
      "api", "--paginate", "--slurp", "--method", "GET",
      `repos/${trust.fullName}/releases?per_page=100`,
    ], "verifying the draft release");
    draft = findReleaseByTag(draftPages, options.tag);
    if (draft) break;
  }
  if (!draft || !Number.isSafeInteger(draft.id) || draft.id <= 0 || draft.tag_name !== options.tag || draft.draft !== true || draft.prerelease) {
    throw new Error("Draft GitHub release metadata is invalid");
  }
  await assertGitHubReleaseAssets(draft, expectedAssets, "Draft GitHub release");

  await runGh([
    "release", "edit", options.tag,
    "--repo", trust.fullName,
    "--draft=false",
  ], "publishing the verified immutable release");

  const published = await ghJson([
    "api", "--method", "GET", `repos/${trust.fullName}/releases/tags/${encodeURIComponent(options.tag)}`,
  ], "verifying the published release");
  if (!Number.isSafeInteger(published.id) || published.id !== draft.id || published.tag_name !== options.tag || published.draft || published.prerelease || published.immutable !== true) {
    throw new Error("Published GitHub release is not immutable or has invalid metadata");
  }
  await assertGitHubReleaseAssets(published, expectedAssets, "Published GitHub release");
  await verifyPublishedReleaseAttestation(trust, options.tag);
  return { status: "published", version: source.metadata.version.version, tag: options.tag, repositoryId: trust.repositoryId, repository: trust.fullName, releaseId: published.id };
}

function parseArguments(values) {
  const result = { _: [] };
  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];
    if (!value.startsWith("--")) {
      result._.push(value);
      continue;
    }
    const key = value.slice(2).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
    const next = values[index + 1];
    if (next && !next.startsWith("--")) {
      result[key] = next;
      index += 1;
    } else result[key] = true;
  }
  return result;
}

async function main() {
  const args = parseArguments(process.argv.slice(2));
  const command = args._[0] ?? "verify-source";
  const root = path.resolve(args.root ?? process.cwd());
  const options = { tag: args.tag || null, publish: Boolean(args.publish), out: args.out || null, force: Boolean(args.force) };
  if (command === "verify-source") {
    const source = await verifySource(root, options);
    console.log(JSON.stringify({ status: "verified", version: source.metadata.version.version, files: source.entries.length, revision: source.revision }, null, 2));
    return;
  }
  if (command === "build") {
    console.log(JSON.stringify(await buildRelease(root, options), null, 2));
    return;
  }
  if (command === "verify-artifacts") {
    console.log(JSON.stringify(await verifyArtifacts(root, options), null, 2));
    return;
  }
  if (command === "publish") {
    console.log(JSON.stringify(await publishRelease(root, { ...options, publish: true }), null, 2));
    return;
  }
  throw new Error(`Unknown command: ${command}`);
}

const invokedDirectly = process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;
if (invokedDirectly) {
  main().catch((error) => {
    console.error(JSON.stringify({ status: "error", message: error.message }, null, 2));
    process.exitCode = 1;
  });
}
