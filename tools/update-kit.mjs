#!/usr/bin/env node

import { createHash, randomBytes } from "node:crypto";
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
  realpath,
  rename,
  rm,
  stat,
  unlink,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { fileURLToPath, pathToFileURL } from "node:url";

const execFileAsync = promisify(execFile);
const OFFICIAL_KIT_ID = "dmandrianov/web-kit";
// PROMPT_KIT_TRUST_ROOT:BEGIN
export const OFFICIAL_REPOSITORY_ID = null;
export const OFFICIAL_REPOSITORY_FULL_NAME = null;
// PROMPT_KIT_TRUST_ROOT:END
const MANIFEST_PATH = ".prompt-kit/manifest.json";
const MANAGED_BEGIN_PREFIX = "<!-- PROMPT_KIT:BEGIN managed version=";
const MANAGED_END = "<!-- PROMPT_KIT:END -->";
const METADATA_TARGETS = new Set([
  ".prompt-kit/.gitignore",
  ".prompt-kit/CHANGELOG.md",
  ".prompt-kit/MIGRATIONS.md",
  ".prompt-kit/TERMS.md",
  ".prompt-kit/VERSION.md",
  ".prompt-kit/manifest.schema.json",
  ".prompt-kit/update.mjs",
]);

export function sha256Buffer(value) {
  return createHash("sha256").update(value).digest("hex");
}

export async function sha256File(filePath) {
  return sha256Buffer(await readFile(filePath));
}

export function parseSemver(value) {
  const match = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.exec(value ?? "");
  if (!match) throw new Error(`Invalid semantic version: ${value}`);
  return match.slice(1).map(Number);
}

export function compareSemver(left, right) {
  const a = parseSemver(left);
  const b = parseSemver(right);
  for (let index = 0; index < 3; index += 1) {
    if (a[index] !== b[index]) return a[index] < b[index] ? -1 : 1;
  }
  return 0;
}

export function isSafeRelativePath(value) {
  if (typeof value !== "string" || value.length === 0 || value.includes("\0") || value.includes("\\")) return false;
  if (!/^[A-Za-z0-9._/-]+$/.test(value)) return false;
  if (path.posix.isAbsolute(value) || value.startsWith("./") || value.endsWith("/")) return false;
  const parts = value.split("/");
  return parts.every((part) => part.length > 0 && part !== "." && part !== "..");
}

export function isAllowedTarget(value) {
  if (!isSafeRelativePath(value)) return false;
  if (value === "AGENTS.md") return true;
  if (METADATA_TARGETS.has(value)) return true;
  if (!value.startsWith("prompts/") || !value.endsWith(".md")) return false;
  if (value.split("/").slice(1).some((part) => part.startsWith("."))) return false;
  if (value.startsWith("prompts/_local/")) return value === "prompts/_local/README.md";
  return true;
}

export async function assertNoSymlinkComponents(root, relativePath) {
  if (!isSafeRelativePath(relativePath)) throw new Error(`Unsafe relative path: ${relativePath}`);
  const resolvedRoot = path.resolve(root);
  let rootInfo;
  try {
    rootInfo = await lstat(resolvedRoot);
  } catch (error) {
    if (error?.code === "ENOENT") throw new Error(`Project root does not exist: ${resolvedRoot}`);
    throw error;
  }
  if (!rootInfo.isDirectory()) throw new Error(`Project root is not a directory: ${resolvedRoot}`);
  const canonicalRoot = await realpath(resolvedRoot);
  let current = resolvedRoot;
  const parts = relativePath.split("/");
  for (let index = 0; index < parts.length; index += 1) {
    current = path.join(current, parts[index]);
    let info;
    try {
      info = await lstat(current);
    } catch (error) {
      if (error?.code === "ENOENT") return;
      throw error;
    }
    if (info.isSymbolicLink()) throw new Error(`Symlink is forbidden in managed path: ${relativePath}`);
    const canonical = await realpath(current);
    if (canonical !== canonicalRoot && !canonical.startsWith(`${canonicalRoot}${path.sep}`)) {
      throw new Error(`Managed path escapes the project root: ${relativePath}`);
    }
    if (index < parts.length - 1 && !info.isDirectory()) {
      throw new Error(`Non-directory parent exists in managed path: ${relativePath}`);
    }
  }
}

async function assertSafeProjectPaths(projectRoot, relativePaths) {
  for (const relative of [...new Set(relativePaths)].sort((left, right) => left.localeCompare(right, "en"))) {
    await assertNoSymlinkComponents(projectRoot, relative);
  }
}

export function extractManagedBlock(text) {
  const beginPattern = /<!-- PROMPT_KIT:BEGIN managed version=[^\r\n>]+ -->/g;
  const begins = [...text.matchAll(beginPattern)];
  const ends = [...text.matchAll(/<!-- PROMPT_KIT:END -->/g)];
  if (begins.length !== 1 || ends.length !== 1) {
    throw new Error(`AGENTS.md must contain exactly one managed block; found ${begins.length} begin and ${ends.length} end markers`);
  }
  const start = begins[0].index;
  const end = ends[0].index + ends[0][0].length;
  if (start >= ends[0].index) throw new Error("AGENTS.md managed block markers are out of order");
  return { block: text.slice(start, end), start, end };
}

function ensureObject(value, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(`${label} must be an object`);
}

export function extractUpdaterTrustRoot(text) {
  const begin = [...text.matchAll(/^\/\/ PROMPT_KIT_TRUST_ROOT:BEGIN$/gm)];
  const end = [...text.matchAll(/^\/\/ PROMPT_KIT_TRUST_ROOT:END$/gm)];
  const idDeclarations = [...text.matchAll(/^export const OFFICIAL_REPOSITORY_ID = (null|[1-9]\d*);$/gm)];
  const nameDeclarations = [...text.matchAll(/^export const OFFICIAL_REPOSITORY_FULL_NAME = (null|"[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+");$/gm)];
  if (begin.length !== 1 || end.length !== 1 || idDeclarations.length !== 1 || nameDeclarations.length !== 1) {
    throw new Error("Incoming updater must contain exactly one canonical repository trust-root block");
  }
  if (begin[0].index >= idDeclarations[0].index || idDeclarations[0].index >= nameDeclarations[0].index || nameDeclarations[0].index >= end[0].index) {
    throw new Error("Incoming updater repository trust-root declarations are out of order");
  }
  const between = text.slice(begin[0].index, end[0].index + end[0][0].length);
  const expected = `${begin[0][0]}\n${idDeclarations[0][0]}\n${nameDeclarations[0][0]}\n${end[0][0]}`;
  if (between !== expected) throw new Error("Incoming updater repository trust-root block is not canonical");
  const repositoryId = idDeclarations[0][1] === "null" ? null : Number(idDeclarations[0][1]);
  if (repositoryId !== null && (!Number.isSafeInteger(repositoryId) || repositoryId <= 0)) throw new Error("Incoming updater repository ID is invalid");
  const repositoryFullName = nameDeclarations[0][1] === "null" ? null : JSON.parse(nameDeclarations[0][1]);
  return { repositoryId, repositoryFullName };
}

export async function verifyIncomingUpdaterTrustRoot(payloadRoot, manifest) {
  const updaterPath = resolveInside(payloadRoot, ".prompt-kit/update.mjs");
  const updaterInfo = await lstat(updaterPath);
  if (!updaterInfo.isFile() || updaterInfo.isSymbolicLink()) throw new Error("Incoming updater is not a regular file");
  const incoming = extractUpdaterTrustRoot(await readFile(updaterPath, "utf8"));
  if (incoming.repositoryId !== OFFICIAL_REPOSITORY_ID) throw new Error("Incoming updater repository ID does not match the currently trusted updater");
  if (incoming.repositoryId !== manifest.source.repositoryId) throw new Error("Incoming updater repository ID does not match its release manifest");
  if (incoming.repositoryFullName !== manifest.source.repositoryFullName) {
    throw new Error("Incoming updater repository full_name does not match the canonical release manifest");
  }
  return incoming;
}

export function validateManifestShape(manifest) {
  ensureObject(manifest, "manifest");
  if (manifest.schemaVersion !== 1) throw new Error(`Unsupported manifest schema: ${manifest.schemaVersion}`);
  ensureObject(manifest.kit, "manifest.kit");
  ensureObject(manifest.source, "manifest.source");
  ensureObject(manifest.release, "manifest.release");
  ensureObject(manifest.compatibility, "manifest.compatibility");
  ensureObject(manifest.managedBlocks, "manifest.managedBlocks");
  if (manifest.kit.id !== OFFICIAL_KIT_ID) throw new Error(`Unexpected kit id: ${manifest.kit.id}`);
  if (manifest.kit.name !== "Web Kit") throw new Error(`Unexpected kit name: ${manifest.kit.name}`);
  const repositoryIdValid = manifest.source.repositoryId === OFFICIAL_REPOSITORY_ID;
  const repositoryNameValid = manifest.source.repositoryFullName === null
    || /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(manifest.source.repositoryFullName);
  if (!repositoryIdValid) throw new Error("Manifest repository ID does not match the updater's embedded trust root");
  if (!repositoryNameValid) throw new Error("Manifest repository full_name is invalid");
  if (OFFICIAL_REPOSITORY_ID === null && manifest.source.repositoryFullName !== null) {
    throw new Error("Diagnostic manifests cannot configure a repository full_name without an embedded repository ID");
  }
  if (OFFICIAL_REPOSITORY_ID !== null && manifest.source.repositoryFullName === null) {
    throw new Error("Manifest repository ID and full_name must be configured together");
  }
  if (manifest.source.transport !== "private-github-organization-gh") throw new Error("Unexpected release transport");
  parseSemver(manifest.kit.version);
  parseSemver(manifest.compatibility.compatibleFrom);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(manifest.kit.releasedAt ?? "")) throw new Error("Manifest release date must use YYYY-MM-DD");
  const releaseDate = new Date(`${manifest.kit.releasedAt}T00:00:00Z`);
  if (Number.isNaN(releaseDate.valueOf()) || releaseDate.toISOString().slice(0, 10) !== manifest.kit.releasedAt) {
    throw new Error("Manifest release date is not a real calendar date");
  }
  if (typeof manifest.source.revision !== "string" || manifest.source.revision.length < 5 || manifest.source.revision.length > 64) {
    throw new Error("Manifest source revision is invalid");
  }
  if (manifest.source.tag !== `v${manifest.kit.version}`) throw new Error("Manifest tag does not match its version");
  if (manifest.kit.channel !== "stable") throw new Error("Only the stable update channel is supported");
  if (manifest.release.archiveRoot !== `web-kit-v${manifest.kit.version}`) throw new Error("Archive root does not match the version");
  if (manifest.release.zipAsset !== `web-kit-v${manifest.kit.version}.zip`) throw new Error("ZIP asset name does not match the version");
  if (manifest.release.tarAsset !== `web-kit-v${manifest.kit.version}.tar.gz`) throw new Error("TAR asset name does not match the version");
  if (manifest.release.checksumAsset !== "SHA256SUMS") throw new Error("Unexpected checksum asset name");
  if (compareSemver(manifest.compatibility.compatibleFrom, manifest.kit.version) > 0) throw new Error("Compatible-from version cannot be newer than the release");
  if (manifest.compatibility.minimumUpdaterSchemaVersion !== 1) throw new Error("This release requires an unsupported updater schema");
  if (typeof manifest.compatibility.breaking !== "boolean" || typeof manifest.compatibility.requiresExplicitConfirmation !== "boolean") {
    throw new Error("Manifest compatibility flags are invalid");
  }
  if (manifest.managedBlocks.agents?.beginPrefix !== MANAGED_BEGIN_PREFIX || manifest.managedBlocks.agents?.endMarker !== MANAGED_END) {
    throw new Error("Manifest managed-block markers are invalid");
  }
  if (!Array.isArray(manifest.files) || manifest.files.length === 0) throw new Error("Manifest files list is empty");
  if (!Array.isArray(manifest.removed) || !Array.isArray(manifest.protectedPaths)) throw new Error("Manifest arrays are incomplete");

  const seen = new Set();
  const seenCaseFolded = new Set();
  let previous = "";
  for (const entry of manifest.files) {
    ensureObject(entry, "manifest file entry");
    if (!isAllowedTarget(entry.path)) throw new Error(`Manifest target is outside the updater boundary: ${entry.path}`);
    if (entry.path === MANIFEST_PATH) throw new Error("Manifest cannot hash itself");
    if (seen.has(entry.path)) throw new Error(`Duplicate manifest target: ${entry.path}`);
    const folded = entry.path.toLocaleLowerCase("en-US");
    if (seenCaseFolded.has(folded)) throw new Error(`Case-fold path collision: ${entry.path}`);
    if (previous && entry.path.localeCompare(previous, "en") < 0) throw new Error("Manifest files must be sorted by path");
    previous = entry.path;
    seen.add(entry.path);
    seenCaseFolded.add(folded);
    if (!/^[a-f0-9]{64}$/.test(entry.sha256)) throw new Error(`Invalid SHA-256 for ${entry.path}`);
    if (typeof entry.required !== "boolean") throw new Error(`Invalid required flag for ${entry.path}`);
    if (!Number.isInteger(entry.bytes) || entry.bytes < 0 || entry.mode !== "0644") throw new Error(`Invalid file metadata for ${entry.path}`);
    if (entry.path === "AGENTS.md") {
      if (entry.ownership !== "hybrid" || entry.policy !== "managed-block" || !/^[a-f0-9]{64}$/.test(entry.managedBlockSha256 ?? "")) {
        throw new Error("AGENTS.md must use managed-block policy and carry its managed-block hash");
      }
    } else if (entry.path === "prompts/_local/README.md") {
      if (entry.ownership !== "seed" || entry.policy !== "create-if-missing") throw new Error("Local README must be a create-if-missing seed");
    } else if (entry.ownership !== "kit" || entry.policy !== "replace-if-unmodified") {
      throw new Error(`Unexpected ownership or update policy for ${entry.path}`);
    }
  }

  let previousRemoved = "";
  for (const entry of manifest.removed) {
    ensureObject(entry, "removed entry");
    if (!isAllowedTarget(entry.path) || entry.policy !== "delete-if-unmodified") throw new Error(`Unsafe removed entry: ${entry.path}`);
    if (seen.has(entry.path)) throw new Error(`Removed path is still present in files: ${entry.path}`);
    if (seenCaseFolded.has(entry.path.toLocaleLowerCase("en-US"))) throw new Error(`Removed path has a case-fold collision: ${entry.path}`);
    if (previousRemoved && entry.path.localeCompare(previousRemoved, "en") < 0) throw new Error("Removed entries must be sorted by path");
    previousRemoved = entry.path;
    seen.add(entry.path);
    seenCaseFolded.add(entry.path.toLocaleLowerCase("en-US"));
    parseSemver(entry.since);
    if (compareSemver(entry.since, manifest.kit.version) > 0) throw new Error(`Removed entry is dated after this release: ${entry.path}`);
    if (typeof entry.reason !== "string" || entry.reason.length === 0) throw new Error(`Removed entry needs a reason: ${entry.path}`);
    if (entry.replacement != null && !isAllowedTarget(entry.replacement)) throw new Error(`Unsafe replacement path: ${entry.replacement}`);
  }
  if (manifest.protectedPaths.some((entry) => typeof entry !== "string" || entry.length === 0)) throw new Error("Manifest protected paths are invalid");
  if (new Set(manifest.protectedPaths).size !== manifest.protectedPaths.length) throw new Error("Manifest protected paths contain duplicates");
  return manifest;
}

function resolveInside(root, relativePath) {
  if (!isSafeRelativePath(relativePath)) throw new Error(`Unsafe relative path: ${relativePath}`);
  const resolvedRoot = path.resolve(root);
  const resolved = path.resolve(resolvedRoot, ...relativePath.split("/"));
  if (resolved !== resolvedRoot && !resolved.startsWith(`${resolvedRoot}${path.sep}`)) throw new Error(`Path escapes root: ${relativePath}`);
  return resolved;
}

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function walkRegularFiles(root, current = root, result = []) {
  for (const item of await readdir(current, { withFileTypes: true })) {
    const absolute = path.join(current, item.name);
    const relative = path.relative(root, absolute).split(path.sep).join("/");
    const info = await lstat(absolute);
    if (info.isSymbolicLink()) throw new Error(`Symlink is forbidden in release payload: ${relative}`);
    if (info.isDirectory()) await walkRegularFiles(root, absolute, result);
    else if (info.isFile()) result.push(relative);
    else throw new Error(`Non-regular release entry is forbidden: ${relative}`);
  }
  return result;
}

export async function verifyPayloadDirectory(payloadRoot) {
  const manifestFile = resolveInside(payloadRoot, MANIFEST_PATH);
  const manifest = validateManifestShape(JSON.parse(await readFile(manifestFile, "utf8")));
  const actual = (await walkRegularFiles(payloadRoot)).sort((a, b) => a.localeCompare(b, "en"));
  const expected = [...manifest.files.map((entry) => entry.path), MANIFEST_PATH].sort((a, b) => a.localeCompare(b, "en"));
  if (actual.length !== expected.length || actual.some((entry, index) => entry !== expected[index])) {
    const extras = actual.filter((entry) => !expected.includes(entry));
    const missing = expected.filter((entry) => !actual.includes(entry));
    throw new Error(`Release payload does not match manifest. Extra: ${extras.join(", ") || "none"}; missing: ${missing.join(", ") || "none"}`);
  }

  for (const entry of manifest.files) {
    const absolute = resolveInside(payloadRoot, entry.path);
    const info = await stat(absolute);
    if (info.size !== entry.bytes) throw new Error(`Size mismatch for ${entry.path}`);
    if ((await sha256File(absolute)) !== entry.sha256) throw new Error(`SHA-256 mismatch for ${entry.path}`);
    if (entry.policy === "managed-block") {
      const managed = extractManagedBlock(await readFile(absolute, "utf8"));
      if (!managed.block.startsWith(`${MANAGED_BEGIN_PREFIX}${manifest.kit.version} -->`)) {
        throw new Error("Managed block version does not match the release manifest");
      }
      if (sha256Buffer(Buffer.from(managed.block)) !== entry.managedBlockSha256) throw new Error("Managed block hash mismatch in release AGENTS.md");
    }
  }
  return manifest;
}

function childEnvironment() {
  const environment = {};
  for (const key of Object.keys(process.env)) {
    if (/^(?:GH_TOKEN|GITHUB_TOKEN|GH_ENTERPRISE_TOKEN|GITHUB_ENTERPRISE_TOKEN|GITHUB_PAT|PAT)$/i.test(key)) continue;
    environment[key] = process.env[key];
  }
  return environment;
}

async function runText(command, args, options = {}) {
  const { stdout, stderr } = await execFileAsync(command, args, {
    cwd: options.cwd,
    encoding: "utf8",
    maxBuffer: options.maxBuffer ?? 64 * 1024 * 1024,
    env: { ...childEnvironment(), LC_ALL: "C" },
  });
  return { stdout, stderr };
}

async function extractTarArchive(archivePath) {
  const listing = (await runText("tar", ["-tzf", archivePath])).stdout.split(/\r?\n/).filter(Boolean);
  if (listing.length === 0) throw new Error("Release archive is empty");
  const roots = new Set();
  const seen = new Set();
  for (const raw of listing) {
    const value = raw.endsWith("/") ? raw.slice(0, -1) : raw;
    if (!isSafeRelativePath(value)) throw new Error(`Unsafe archive entry: ${raw}`);
    const parts = value.split("/");
    if (parts.some((part) => !part || part === "." || part === "..")) throw new Error(`Unsafe archive entry: ${raw}`);
    roots.add(parts[0]);
    if (seen.has(value)) throw new Error(`Duplicate archive entry: ${value}`);
    seen.add(value);
  }
  if (roots.size !== 1) throw new Error("Release archive must have exactly one top-level directory");

  const verbose = (await runText("tar", ["-tvzf", archivePath])).stdout.split(/\r?\n/).filter(Boolean);
  for (const line of verbose) {
    const type = line[0];
    if (type !== "-" && type !== "d") throw new Error(`Archive contains a forbidden entry type: ${line}`);
  }

  const temporary = await mkdtemp(path.join(tmpdir(), "web-kit-update-"));
  await runText("tar", ["-xzf", archivePath, "-C", temporary, "--no-same-owner", "--no-same-permissions"]);
  const archiveRoot = [...roots][0];
  const payloadRoot = path.join(temporary, archiveRoot);
  const manifest = await verifyPayloadDirectory(payloadRoot);
  if (manifest.release.archiveRoot !== archiveRoot) throw new Error("Archive root does not match release manifest");
  return { temporary, payloadRoot, manifest };
}

async function writeAtomic(target, data) {
  await mkdir(path.dirname(target), { recursive: true });
  const temporary = `${target}.tmp-${process.pid}-${randomBytes(6).toString("hex")}`;
  await writeFile(temporary, data, { mode: 0o644 });
  await rename(temporary, target);
  await chmod(target, 0o644);
}

async function copyAtomic(source, target) {
  await writeAtomic(target, await readFile(source));
}

async function readCurrentManifest(projectRoot) {
  await assertNoSymlinkComponents(projectRoot, MANIFEST_PATH);
  const manifestFile = resolveInside(projectRoot, MANIFEST_PATH);
  if (!(await exists(manifestFile))) return null;
  return validateManifestShape(JSON.parse(await readFile(manifestFile, "utf8")));
}

function parseVersionMarkdown(text) {
  const match = /^- Version:\s*([0-9]+\.[0-9]+\.[0-9]+)\s*$/m.exec(text);
  return match?.[1] ?? null;
}

async function detectLegacyVersion(projectRoot) {
  const candidates = [];
  for (const relative of [".prompt-kit/VERSION.md", "PROMPT_KIT_VERSION.md"]) {
    await assertNoSymlinkComponents(projectRoot, relative);
    const absolute = path.resolve(projectRoot, relative);
    if (await exists(absolute)) {
      const value = parseVersionMarkdown(await readFile(absolute, "utf8"));
      if (value) candidates.push(value);
    }
  }
  const agents = path.join(projectRoot, "AGENTS.md");
  await assertNoSymlinkComponents(projectRoot, "AGENTS.md");
  if (await exists(agents)) {
    const match = /PROMPT_KIT:BEGIN managed version=([0-9]+\.[0-9]+\.[0-9]+)/.exec(await readFile(agents, "utf8"));
    if (match) candidates.push(match[1]);
  }
  const unique = [...new Set(candidates)];
  if (unique.length > 1) throw new Error(`Installed version markers disagree: ${unique.join(", ")}`);
  return unique[0] ?? null;
}

async function hashIfFile(filePath) {
  try {
    const info = await lstat(filePath);
    if (info.isSymbolicLink()) return { kind: "symlink" };
    if (!info.isFile()) return { kind: "other" };
    return { kind: "file", sha256: await sha256File(filePath), mode: info.mode & 0o777 };
  } catch (error) {
    if (error?.code === "ENOENT") return { kind: "missing" };
    throw error;
  }
}

export async function planUpdate(projectRoot, payloadRoot, options = {}) {
  const incoming = await verifyPayloadDirectory(payloadRoot);
  const current = await readCurrentManifest(projectRoot);
  await assertSafeProjectPaths(projectRoot, [
    MANIFEST_PATH,
    ".prompt-kit/backups",
    ...incoming.files.map((entry) => entry.path),
    ...incoming.removed.map((entry) => entry.path),
    ...(current?.files.map((entry) => entry.path) ?? []),
  ]);
  const currentVersion = current?.kit.version ?? (await detectLegacyVersion(projectRoot));
  const baseline = current ? "manifest" : currentVersion ? "legacy" : "fresh";
  const actions = [];
  const conflicts = [];

  if (current && current.kit.id !== incoming.kit.id) conflicts.push({ path: MANIFEST_PATH, reason: "installed kit id differs from incoming release" });
  if (currentVersion) {
    const direction = compareSemver(incoming.kit.version, currentVersion);
    if (direction < 0 && !options.allowDowngrade) conflicts.push({ path: MANIFEST_PATH, reason: "downgrade requires explicit approval" });
    if (compareSemver(currentVersion, incoming.compatibility.compatibleFrom) < 0 && !options.allowBreaking) {
      conflicts.push({ path: MANIFEST_PATH, reason: `release requires version ${incoming.compatibility.compatibleFrom} or newer` });
    }
  }
  if ((incoming.compatibility.breaking || incoming.compatibility.requiresExplicitConfirmation) && !options.allowBreaking) {
    conflicts.push({ path: MANIFEST_PATH, reason: "release requires explicit confirmation" });
  }
  if (baseline === "legacy" && !options.allowLegacy) {
    conflicts.push({ path: MANIFEST_PATH, reason: "first manifest-based update requires one-time legacy confirmation" });
    return { currentVersion, targetVersion: incoming.kit.version, baseline, actions, conflicts, manifest: incoming };
  }
  if (baseline === "fresh" && !options.allowFresh) {
    conflicts.push({ path: MANIFEST_PATH, reason: "fresh installation requires install mode" });
    return { currentVersion, targetVersion: incoming.kit.version, baseline, actions, conflicts, manifest: incoming };
  }

  const oldByPath = new Map(current?.files.map((entry) => [entry.path, entry]) ?? []);
  const incomingByPath = new Map(incoming.files.map((entry) => [entry.path, entry]));
  const removedByPath = new Map(incoming.removed.map((entry) => [entry.path, entry]));

  for (const entry of incoming.files) {
    await assertNoSymlinkComponents(projectRoot, entry.path);
    const target = resolveInside(projectRoot, entry.path);
    const local = await hashIfFile(target);
    if (local.kind === "symlink" || local.kind === "other") {
      conflicts.push({ path: entry.path, reason: `local target is ${local.kind}, not a regular file` });
      continue;
    }

    if (entry.policy === "create-if-missing") {
      actions.push({ kind: local.kind === "missing" ? "create" : "preserve", path: entry.path, entry });
      continue;
    }

    if (entry.policy === "managed-block") {
      if (local.kind === "missing") {
        if (options.allowFresh) actions.push({ kind: "create", path: entry.path, entry });
        else conflicts.push({ path: entry.path, reason: "AGENTS.md is missing" });
        continue;
      }
      let localManaged;
      try {
        localManaged = extractManagedBlock(await readFile(target, "utf8"));
      } catch (error) {
        conflicts.push({ path: entry.path, reason: error.message });
        continue;
      }
      const localManagedHash = sha256Buffer(Buffer.from(localManaged.block));
      if (localManagedHash === entry.managedBlockSha256) {
        actions.push({ kind: "noop", path: entry.path, entry });
        continue;
      }
      const old = oldByPath.get(entry.path);
      if (old?.managedBlockSha256 && localManagedHash !== old.managedBlockSha256) {
        conflicts.push({ path: entry.path, reason: "managed block was edited locally" });
        continue;
      }
      actions.push({ kind: "replace-managed-block", path: entry.path, entry });
      continue;
    }

    if (local.kind === "missing") {
      actions.push({ kind: "create", path: entry.path, entry });
      continue;
    }
    if (local.sha256 === entry.sha256) {
      actions.push({ kind: "noop", path: entry.path, entry });
      continue;
    }
    const old = oldByPath.get(entry.path);
    if (old && local.sha256 === old.sha256) {
      actions.push({ kind: "replace", path: entry.path, entry });
      continue;
    }
    if (!current && options.allowLegacy && entry.path.startsWith("prompts/") && !entry.path.startsWith("prompts/_local/")) {
      actions.push({ kind: "replace", path: entry.path, entry, legacyTrusted: true });
      continue;
    }
    conflicts.push({ path: entry.path, reason: old ? "kit-owned file was edited locally" : "new official path already exists with different content" });
  }

  if (current) {
    for (const old of current.files) {
      if (incomingByPath.has(old.path) || old.policy === "create-if-missing") continue;
      if (!removedByPath.has(old.path)) {
        conflicts.push({ path: old.path, reason: "incoming manifest omitted an installed file without an explicit removal record" });
        continue;
      }
      await assertNoSymlinkComponents(projectRoot, old.path);
      const target = resolveInside(projectRoot, old.path);
      const local = await hashIfFile(target);
      if (local.kind === "missing") continue;
      if (local.kind === "file" && local.sha256 === old.sha256) actions.push({ kind: "remove", path: old.path, entry: old });
      else conflicts.push({ path: old.path, reason: "obsolete kit file was edited locally and cannot be removed" });
    }
  }

  return { currentVersion, targetVersion: incoming.kit.version, baseline, actions, conflicts, manifest: incoming };
}

async function backupTargets(projectRoot, plan) {
  const stamp = `${new Date().toISOString().replace(/[-:]/g, "").replace(".", "-")}-${randomBytes(3).toString("hex")}`;
  const backupRelative = `.prompt-kit/backups/${stamp}`;
  const backupRoot = resolveInside(projectRoot, backupRelative);
  const records = [];
  const paths = new Set(plan.actions.filter((action) => !["noop", "preserve"].includes(action.kind)).map((action) => action.path));
  paths.add(MANIFEST_PATH);
  await assertSafeProjectPaths(projectRoot, [...paths, `${backupRelative}/files`, `${backupRelative}/transaction.json`]);
  await mkdir(path.join(backupRoot, "files"), { recursive: true });
  await assertSafeProjectPaths(projectRoot, [`${backupRelative}/files`, `${backupRelative}/transaction.json`]);

  for (const relative of [...paths].sort((a, b) => a.localeCompare(b, "en"))) {
    await assertNoSymlinkComponents(projectRoot, relative);
    const target = resolveInside(projectRoot, relative);
    const state = await hashIfFile(target);
    const record = { path: relative, existed: state.kind === "file", mode: state.kind === "file" ? state.mode : null };
    if (state.kind === "file") {
      const backupRelativePath = `${backupRelative}/files/${relative}`;
      await assertNoSymlinkComponents(projectRoot, backupRelativePath);
      const backup = resolveInside(projectRoot, backupRelativePath);
      await mkdir(path.dirname(backup), { recursive: true });
      await assertNoSymlinkComponents(projectRoot, backupRelativePath);
      await copyFile(target, backup);
      await chmod(backup, 0o600);
    } else if (state.kind !== "missing") {
      throw new Error(`Cannot back up non-regular path: ${relative}`);
    }
    records.push(record);
  }
  const transaction = {
    schemaVersion: 1,
    status: "prepared",
    from: plan.currentVersion,
    to: plan.targetVersion,
    createdAt: new Date().toISOString(),
    records,
  };
  await assertNoSymlinkComponents(projectRoot, `${backupRelative}/transaction.json`);
  await writeAtomic(path.join(backupRoot, "transaction.json"), `${JSON.stringify(transaction, null, 2)}\n`);
  return { backupRoot, backupRelative, transaction };
}

async function restoreRecords(projectRoot, backupRoot, transaction) {
  const backupRelative = path.relative(path.resolve(projectRoot), path.resolve(backupRoot)).split(path.sep).join("/");
  if (!backupRelative.startsWith(".prompt-kit/backups/") || !isSafeRelativePath(backupRelative)) throw new Error("Unsafe rollback backup path");
  await assertSafeProjectPaths(projectRoot, [
    `${backupRelative}/transaction.json`,
    ...transaction.records.map((record) => record.path),
    ...transaction.records.filter((record) => record.existed).map((record) => `${backupRelative}/files/${record.path}`),
  ]);
  for (const record of [...transaction.records].reverse()) {
    if (!isAllowedTarget(record.path) && record.path !== MANIFEST_PATH) throw new Error(`Unsafe rollback target: ${record.path}`);
    await assertNoSymlinkComponents(projectRoot, record.path);
    const target = resolveInside(projectRoot, record.path);
    if (record.existed) {
      const backupPath = `${backupRelative}/files/${record.path}`;
      await assertNoSymlinkComponents(projectRoot, backupPath);
      const backup = resolveInside(projectRoot, backupPath);
      await copyAtomic(backup, target);
      await chmod(target, Number.isInteger(record.mode) ? record.mode : 0o644);
    } else {
      await rm(target, { force: true });
    }
  }
}

async function verifyInstalledState(projectRoot, manifest) {
  for (const entry of manifest.files) {
    await assertNoSymlinkComponents(projectRoot, entry.path);
    const target = resolveInside(projectRoot, entry.path);
    if (entry.policy === "create-if-missing" && !(await exists(target))) continue;
    const local = await hashIfFile(target);
    if (local.kind !== "file") throw new Error(`Installed path is not a regular file: ${entry.path}`);
    if (entry.policy === "managed-block") {
      const managed = extractManagedBlock(await readFile(target, "utf8"));
      if (sha256Buffer(Buffer.from(managed.block)) !== entry.managedBlockSha256) throw new Error("Installed AGENTS.md managed block failed verification");
    } else if (entry.policy !== "create-if-missing" && local.sha256 !== entry.sha256) {
      throw new Error(`Installed file failed verification: ${entry.path}`);
    }
  }
}

export async function applyPlannedUpdate(projectRoot, payloadRoot, plan) {
  if (plan.conflicts.length > 0) throw new Error(`Update plan contains ${plan.conflicts.length} conflict(s)`);
  await assertSafeProjectPaths(projectRoot, [MANIFEST_PATH, ...plan.actions.map((action) => action.path)]);
  const { backupRoot, backupRelative, transaction } = await backupTargets(projectRoot, plan);
  try {
    for (const action of plan.actions) {
      if (["noop", "preserve"].includes(action.kind)) continue;
      await assertNoSymlinkComponents(projectRoot, action.path);
      const target = resolveInside(projectRoot, action.path);
      if (action.kind === "remove") {
        await unlink(target);
        continue;
      }
      const source = resolveInside(payloadRoot, action.path);
      if (action.kind === "replace-managed-block") {
        const current = await readFile(target, "utf8");
        const localManaged = extractManagedBlock(current);
        const incomingManaged = extractManagedBlock(await readFile(source, "utf8"));
        await writeAtomic(target, `${current.slice(0, localManaged.start)}${incomingManaged.block}${current.slice(localManaged.end)}`);
      } else {
        await copyAtomic(source, target);
      }
    }
    await verifyInstalledState(projectRoot, plan.manifest);
    await assertNoSymlinkComponents(projectRoot, MANIFEST_PATH);
    await copyAtomic(resolveInside(payloadRoot, MANIFEST_PATH), resolveInside(projectRoot, MANIFEST_PATH));
    transaction.status = "complete";
    transaction.completedAt = new Date().toISOString();
    await assertNoSymlinkComponents(projectRoot, `${backupRelative}/transaction.json`);
    await writeAtomic(path.join(backupRoot, "transaction.json"), `${JSON.stringify(transaction, null, 2)}\n`);
    return { backupRoot, changed: plan.actions.filter((action) => !["noop", "preserve"].includes(action.kind)).map((action) => action.path) };
  } catch (error) {
    let rollbackError = null;
    try {
      await restoreRecords(projectRoot, backupRoot, transaction);
    } catch (failure) {
      rollbackError = failure;
    }
    transaction.status = rollbackError ? "rollback-failed" : "rolled-back";
    transaction.error = error.message;
    if (rollbackError) transaction.rollbackError = rollbackError.message;
    transaction.rolledBackAt = new Date().toISOString();
    await assertNoSymlinkComponents(projectRoot, `${backupRelative}/transaction.json`);
    await writeAtomic(path.join(backupRoot, "transaction.json"), `${JSON.stringify(transaction, null, 2)}\n`);
    if (rollbackError) throw new Error(`Update failed and automatic rollback also failed: ${error.message}; rollback: ${rollbackError.message}`);
    throw new Error(`Update failed and was rolled back: ${error.message}`);
  }
}

async function verifyChecksum(archivePath, checksumFile) {
  const assetName = path.basename(archivePath);
  const lines = (await readFile(checksumFile, "utf8")).split(/\r?\n/).filter(Boolean);
  const parsed = lines.map((line) => /^([a-f0-9]{64})\s+\*?([^/\\]+)$/.exec(line));
  if (parsed.some((record) => !record)) throw new Error("Checksum file contains an invalid record");
  const matches = parsed.filter((record) => record[2] === assetName);
  if (matches.length !== 1) throw new Error(`Checksum must contain exactly one record for ${assetName}`);
  const [record] = matches;
  const actual = await sha256File(archivePath);
  if (actual !== record[1]) throw new Error(`Archive checksum mismatch for ${assetName}`);
  return actual;
}

function requireRemoteRepositoryTrust(manifest) {
  if (!manifest) throw new Error("Authenticated remote updates require an installed release manifest; use a verified local archive for the first installation");
  const repositoryId = OFFICIAL_REPOSITORY_ID;
  const fullName = OFFICIAL_REPOSITORY_FULL_NAME ?? manifest.source.repositoryFullName;
  if (!Number.isSafeInteger(repositoryId) || repositoryId <= 0 || typeof fullName !== "string") {
    throw new Error("Remote updates are disabled until a positive GitHub repository ID and final repository full_name are configured in a published release");
  }
  return { repositoryId, fullName };
}

async function runGh(args, purpose) {
  try {
    return await execFileAsync("gh", args, {
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
      env: { ...childEnvironment(), LC_ALL: "C" },
    });
  } catch (error) {
    if (error?.code === "ENOENT") throw new Error("GitHub CLI (gh) is required for private updates and was not found");
    throw new Error(`Authenticated GitHub CLI access failed while ${purpose}; run gh auth login and ask the maintainer to confirm your read access`);
  }
}

async function ghJson(args, purpose) {
  const { stdout } = await runGh(args, purpose);
  try {
    return JSON.parse(stdout);
  } catch {
    throw new Error(`GitHub CLI returned invalid JSON while ${purpose}`);
  }
}

function waitMilliseconds(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function verifyImmutableReleaseAttestation(trust, tag) {
  let lastError;
  for (const delay of [0, 250, 750, 1500]) {
    if (delay) await waitMilliseconds(delay);
    try {
      await ghJson(["release", "verify", tag, "--repo", trust.fullName, "--format", "json"], "verifying the immutable release attestation");
      return;
    } catch (error) {
      lastError = error;
    }
  }
  throw new Error(`Immutable GitHub release verification failed: ${lastError?.message ?? "unknown error"}`);
}

async function verifyImmutableReleaseAsset(trust, tag, assetPath) {
  await ghJson([
    "release", "verify-asset", tag, assetPath,
    "--repo", trust.fullName,
    "--format", "json",
  ], `verifying immutable release asset ${path.basename(assetPath)}`);
}

async function verifyPrivateRepositoryAccess(trust) {
  await runGh(["auth", "status", "--hostname", "github.com"], "checking authentication");
  const repository = await ghJson(["api", "--method", "GET", `repos/${trust.fullName}`], "checking private repository access");
  if (!Number.isSafeInteger(repository.id) || repository.id !== trust.repositoryId) {
    throw new Error("GitHub repository ID does not match the trusted release manifest");
  }
  if (repository.private !== true || repository.owner?.type !== "Organization") {
    throw new Error("The trusted update source must be a private GitHub Organization repository");
  }
  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repository.full_name ?? "")) {
    throw new Error("GitHub returned an invalid canonical repository full_name");
  }
  return { repositoryId: repository.id, fullName: repository.full_name, configuredFullName: trust.fullName };
}

function expectedReleaseAssetNames(version) {
  return [`web-kit-v${version}.tar.gz`, `web-kit-v${version}.zip`, "SHA256SUMS"].sort((left, right) => left.localeCompare(right, "en"));
}

async function fetchLatestRelease(trust) {
  const canonicalTrust = await verifyPrivateRepositoryAccess(trust);
  const release = await ghJson(["api", "--method", "GET", `repos/${canonicalTrust.fullName}/releases/latest`], "reading the latest private release");
  if (!Number.isSafeInteger(release.id) || release.id <= 0) throw new Error("Latest GitHub release has an invalid ID");
  if (release.draft || release.prerelease) throw new Error("Latest GitHub release is a draft or prerelease");
  if (release.immutable !== true) throw new Error("Latest GitHub release is not immutable");
  if (!/^v[0-9]+\.[0-9]+\.[0-9]+$/.test(release.tag_name ?? "")) throw new Error("Latest GitHub release has an invalid stable tag");
  const version = release.tag_name.slice(1);
  parseSemver(version);
  if (!Array.isArray(release.assets)) throw new Error("Latest GitHub release has no asset list");
  const actualNames = release.assets.map((asset) => asset?.name).sort((left, right) => String(left).localeCompare(String(right), "en"));
  const expectedNames = expectedReleaseAssetNames(version);
  if (actualNames.length !== expectedNames.length || actualNames.some((name, index) => name !== expectedNames[index])) {
    throw new Error(`Release v${version} must contain exactly ${expectedNames.join(", ")}`);
  }
  for (const asset of release.assets) {
    if (!Number.isSafeInteger(asset.id) || asset.id <= 0 || asset.state !== "uploaded" || !Number.isSafeInteger(asset.size) || asset.size <= 0) {
      throw new Error(`Release asset metadata is invalid for ${asset?.name ?? "unknown asset"}`);
    }
  }
  const revision = await fetchTagCommit(canonicalTrust, release.tag_name);
  await verifyImmutableReleaseAttestation(canonicalTrust, release.tag_name);
  return { release, version, revision, trust: canonicalTrust };
}

async function fetchTagCommit(trust, tag) {
  if (!/^v[0-9]+\.[0-9]+\.[0-9]+$/.test(tag)) throw new Error(`Unexpected release tag: ${tag}`);
  let object = (await ghJson(["api", "--method", "GET", `repos/${trust.fullName}/git/ref/tags/${encodeURIComponent(tag)}`], "resolving the release tag")).object;
  for (let depth = 0; depth < 5; depth += 1) {
    if (object?.type === "commit" && /^[a-f0-9]{40}$/.test(object.sha ?? "")) return object.sha;
    if (object?.type !== "tag" || !/^[a-f0-9]{40}$/.test(object.sha ?? "")) break;
    object = (await ghJson(["api", "--method", "GET", `repos/${trust.fullName}/git/tags/${object.sha}`], "resolving an annotated release tag")).object;
  }
  throw new Error(`Cannot resolve ${tag} to an immutable commit`);
}

async function downloadReleaseArchive(trust, release, version) {
  const tarName = `web-kit-v${version}.tar.gz`;
  const checksumName = "SHA256SUMS";
  const tarAsset = release.assets?.find((asset) => asset.name === tarName);
  const checksumAsset = release.assets?.find((asset) => asset.name === checksumName);
  if (!tarAsset || !checksumAsset) throw new Error(`Release v${version} is missing ${tarName} or ${checksumName}`);
  const temporary = await mkdtemp(path.join(tmpdir(), "web-kit-download-"));
  const archivePath = path.join(temporary, tarName);
  const checksumPath = path.join(temporary, checksumName);
  try {
    for (const assetName of [tarName, checksumName]) {
      await runGh([
        "release", "download", release.tag_name,
        "--repo", trust.fullName,
        "--pattern", assetName,
        "--dir", temporary,
        "--clobber",
      ], `downloading ${assetName}`);
      const downloaded = await lstat(path.join(temporary, assetName));
      if (!downloaded.isFile() || downloaded.isSymbolicLink()) throw new Error(`Downloaded release asset is not a regular file: ${assetName}`);
      await verifyImmutableReleaseAsset(trust, release.tag_name, path.join(temporary, assetName));
    }
    const digest = await verifyChecksum(archivePath, checksumPath);
    if (typeof tarAsset.digest === "string" && tarAsset.digest.startsWith("sha256:") && tarAsset.digest.slice(7) !== digest) {
      throw new Error("GitHub asset digest disagrees with SHA256SUMS");
    }
    return { temporary, archivePath, checksumPath, version, releaseId: release.id };
  } catch (error) {
    await rm(temporary, { recursive: true, force: true });
    throw error;
  }
}

async function applyArchive(projectRoot, archivePath, options) {
  if (!options.checksumFile) throw new Error("Applying a release archive requires --checksum-file");
  await verifyChecksum(archivePath, options.checksumFile);
  const archiveMatch = /^web-kit-v([0-9]+\.[0-9]+\.[0-9]+)\.tar\.gz$/.exec(path.basename(archivePath));
  if (!archiveMatch) throw new Error("Release archive must use the canonical web-kit-vX.Y.Z.tar.gz name");
  const expectedVersion = options.expectedVersion ?? archiveMatch[1];
  parseSemver(expectedVersion);
  if (archiveMatch[1] !== expectedVersion) throw new Error("Release archive filename does not match the selected version");
  const extracted = await extractTarArchive(archivePath);
  try {
    if (extracted.manifest.kit.version !== expectedVersion || extracted.manifest.source.tag !== `v${expectedVersion}`) {
      throw new Error("Release manifest version/tag does not match the selected GitHub release");
    }
    if (extracted.manifest.release.archiveRoot !== `web-kit-v${expectedVersion}`) {
      throw new Error("Release manifest archive root does not match the selected GitHub release");
    }
    if (options.expectedRepositoryId !== undefined
      && extracted.manifest.source.repositoryId !== options.expectedRepositoryId) {
      throw new Error("Release manifest repository ID does not match the trusted installed release");
    }
    if (options.expectedRepositoryFullName !== undefined
      && extracted.manifest.source.repositoryFullName !== options.expectedRepositoryFullName) {
      throw new Error("Release manifest repository full_name does not match the trusted installed release");
    }
    if (options.expectedRevision && extracted.manifest.source.revision !== options.expectedRevision) {
      throw new Error("Release manifest revision does not match the selected GitHub tag commit");
    }
    await verifyIncomingUpdaterTrustRoot(extracted.payloadRoot, extracted.manifest);
    const plan = await planUpdate(projectRoot, extracted.payloadRoot, options);
    if (options.dryRun || plan.conflicts.length > 0) return { status: plan.conflicts.length ? "blocked" : "planned", ...plan };
    const result = await applyPlannedUpdate(projectRoot, extracted.payloadRoot, plan);
    return { status: "updated", from: plan.currentVersion, to: plan.targetVersion, baseline: plan.baseline, ...result };
  } finally {
    await rm(extracted.temporary, { recursive: true, force: true });
  }
}

async function verifyInstalled(projectRoot) {
  const manifest = await readCurrentManifest(projectRoot);
  if (!manifest) return { status: "legacy", version: await detectLegacyVersion(projectRoot), drift: ["manifest missing"] };
  const drift = [];
  for (const entry of manifest.files) {
    await assertNoSymlinkComponents(projectRoot, entry.path);
    const target = resolveInside(projectRoot, entry.path);
    const local = await hashIfFile(target);
    if (entry.policy === "create-if-missing") continue;
    if (local.kind !== "file") {
      drift.push(`${entry.path}: ${local.kind}`);
      continue;
    }
    if (entry.policy === "managed-block") {
      try {
        const managed = extractManagedBlock(await readFile(target, "utf8"));
        if (sha256Buffer(Buffer.from(managed.block)) !== entry.managedBlockSha256) drift.push(`${entry.path}: managed block modified`);
      } catch (error) {
        drift.push(`${entry.path}: ${error.message}`);
      }
    } else if (local.sha256 !== entry.sha256) drift.push(`${entry.path}: modified`);
  }
  return { status: drift.length ? "drift" : "verified", version: manifest.kit.version, drift };
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
  const command = args._[0] ?? "check";
  const projectRoot = path.resolve(args.project ?? process.cwd());
  const options = {
    allowBreaking: Boolean(args.allowBreaking),
    allowDowngrade: Boolean(args.allowDowngrade),
    allowLegacy: Boolean(args.allowLegacy),
    allowFresh: command === "install",
    dryRun: Boolean(args.dryRun),
    checksumFile: args.checksumFile ? path.resolve(args.checksumFile) : null,
  };

  if (command === "verify") {
    console.log(JSON.stringify(await verifyInstalled(projectRoot), null, 2));
    return;
  }
  if (command === "check") {
    const currentManifest = await readCurrentManifest(projectRoot);
    const current = currentManifest?.kit.version ?? (await detectLegacyVersion(projectRoot));
    const trust = requireRemoteRepositoryTrust(currentManifest);
    const latest = await fetchLatestRelease(trust);
    const direction = current ? compareSemver(latest.version, current) : 1;
    if (direction === 0 && currentManifest.source.revision !== latest.revision) {
      throw new Error("Installed release revision does not match the immutable GitHub tag");
    }
    const status = direction === 0 ? "current" : direction < 0 ? "local-newer" : "update-available";
    console.log(JSON.stringify({ status, current, latest: latest.version, releaseId: latest.release.id }, null, 2));
    return;
  }
  if (command === "rollback") {
    if (!args.backup) throw new Error("rollback requires --backup");
    const backupRoot = path.resolve(projectRoot, args.backup);
    const allowedBackupRoot = path.resolve(projectRoot, ".prompt-kit", "backups");
    if (!backupRoot.startsWith(`${allowedBackupRoot}${path.sep}`)) throw new Error("Rollback backup must be inside .prompt-kit/backups");
    const backupRelative = path.relative(projectRoot, backupRoot).split(path.sep).join("/");
    if (!isSafeRelativePath(backupRelative) || !backupRelative.startsWith(".prompt-kit/backups/")) throw new Error("Rollback backup path is invalid");
    await assertNoSymlinkComponents(projectRoot, `${backupRelative}/transaction.json`);
    const transaction = JSON.parse(await readFile(path.join(backupRoot, "transaction.json"), "utf8"));
    if (!Array.isArray(transaction.records)) throw new Error("Backup transaction record is invalid");
    await restoreRecords(projectRoot, backupRoot, transaction);
    transaction.status = "rolled-back-manual";
    transaction.rolledBackAt = new Date().toISOString();
    await assertNoSymlinkComponents(projectRoot, `${backupRelative}/transaction.json`);
    await writeAtomic(path.join(backupRoot, "transaction.json"), `${JSON.stringify(transaction, null, 2)}\n`);
    console.log(JSON.stringify({ status: "rolled-back", backupRoot }, null, 2));
    return;
  }
  if (!["apply", "install", "update"].includes(command)) throw new Error(`Unknown command: ${command}`);

  if (args.archive) {
    const result = await applyArchive(projectRoot, path.resolve(args.archive), options);
    console.log(JSON.stringify(result, null, 2));
    if (result.status === "blocked") process.exitCode = 2;
    return;
  }

  const currentManifest = await readCurrentManifest(projectRoot);
  const current = currentManifest?.kit.version ?? (await detectLegacyVersion(projectRoot));
  const trust = requireRemoteRepositoryTrust(currentManifest);
  const latest = await fetchLatestRelease(trust);
  if (current) {
    const direction = compareSemver(latest.version, current);
    if (direction === 0) {
      if (currentManifest.source.revision !== latest.revision) {
        throw new Error("Installed release revision does not match the immutable GitHub tag");
      }
      console.log(JSON.stringify({ status: "current", version: current, releaseId: latest.release.id }, null, 2));
      return;
    }
    if (direction < 0 && !options.allowDowngrade) {
      console.log(JSON.stringify({ status: "blocked", current, latest: latest.version, reason: "latest stable release is older than the installed version" }, null, 2));
      process.exitCode = 2;
      return;
    }
  }
  const download = await downloadReleaseArchive(latest.trust, latest.release, latest.version);
  try {
    const result = await applyArchive(projectRoot, download.archivePath, {
      ...options,
      checksumFile: download.checksumPath,
      expectedVersion: latest.version,
      expectedRevision: latest.revision,
      expectedRepositoryId: latest.trust.repositoryId,
      expectedRepositoryFullName: latest.trust.fullName,
    });
    console.log(JSON.stringify({ ...result, releaseId: download.releaseId }, null, 2));
    if (result.status === "blocked") process.exitCode = 2;
  } finally {
    await rm(download.temporary, { recursive: true, force: true });
  }
}

const invokedDirectly = process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;
if (invokedDirectly) {
  main().catch((error) => {
    console.error(JSON.stringify({ status: "error", message: error.message }, null, 2));
    process.exitCode = 1;
  });
}
