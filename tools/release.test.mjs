import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { chmod, copyFile, lstat, mkdir, mkdtemp, readFile, readdir, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import test from "node:test";

import {
  assertGitHubReleaseAssets,
  buildRelease,
  canonicalMitLicense,
  collectLocalReleaseAssets,
  findReleaseByTag,
  findSecretKind,
  normalizeGitHubRepository,
  verifyArtifacts,
  verifySource,
} from "./release.mjs";
import {
  extractUpdaterTrustRoot,
  OFFICIAL_REPOSITORY_FULL_NAME,
  OFFICIAL_REPOSITORY_ID,
  OFFICIAL_REPOSITORY_OWNER_LOGIN,
  verifyIncomingUpdaterTrustRoot,
} from "./update-kit.mjs";

const execFileAsync = promisify(execFile);
const toolsDirectory = path.dirname(fileURLToPath(import.meta.url));
const updaterSource = path.join(toolsDirectory, "update-kit.mjs");
const releaseSource = path.join(toolsDirectory, "release.mjs");
const productionRepository = {
  id: OFFICIAL_REPOSITORY_ID,
  fullName: OFFICIAL_REPOSITORY_FULL_NAME,
};

async function writeText(root, relative, text, mode = 0o644) {
  const target = path.join(root, ...relative.split("/"));
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, text, { mode });
  await chmod(target, mode);
  return target;
}

function fixturePayload(options = {}) {
  const repository = options.repository ?? productionRepository;
  return {
    schemaVersion: 1,
    kit: {
      id: "dmandrianov/web-kit",
      name: "Web Kit",
      repositoryId: repository.id,
      repositoryFullName: repository.fullName,
      transport: "private-github-organization-gh",
      channel: "stable",
    },
    compatibility: {
      compatibleFrom: "1.0.0",
      breaking: false,
      requiresExplicitConfirmation: false,
      minimumUpdaterSchemaVersion: 1,
    },
    publication: {
      licenseRequired: true,
      licenseSpdx: "MIT",
      licenseSource: "LICENSE",
      licensePackageTarget: ".prompt-kit/TERMS.md",
      accessModel: "public-open-source",
      immutableReleaseRequired: true,
    },
    assets: {
      archiveRootPattern: "web-kit-v{version}",
      zipPattern: "web-kit-v{version}.zip",
      tarPattern: "web-kit-v{version}.tar.gz",
      checksum: "SHA256SUMS",
    },
    mappedFiles: [
      { source: "AGENTS.md", target: "AGENTS.md", ownership: "hybrid", policy: "managed-block", required: true },
      { source: "PROMPT_KIT_VERSION.md", target: ".prompt-kit/VERSION.md", ownership: "kit", policy: "replace-if-unmodified", required: true },
      { source: "CHANGELOG.md", target: ".prompt-kit/CHANGELOG.md", ownership: "kit", policy: "replace-if-unmodified", required: true },
      { source: "MIGRATIONS.md", target: ".prompt-kit/MIGRATIONS.md", ownership: "kit", policy: "replace-if-unmodified", required: true },
      { source: "release/manifest.schema.json", target: ".prompt-kit/manifest.schema.json", ownership: "kit", policy: "replace-if-unmodified", required: true },
      { source: "release/prompt-kit.gitignore", target: ".prompt-kit/.gitignore", ownership: "kit", policy: "replace-if-unmodified", required: true },
      { source: "tools/update-kit.mjs", target: ".prompt-kit/update.mjs", ownership: "kit", policy: "replace-if-unmodified", required: true },
      { source: "LICENSE", target: ".prompt-kit/TERMS.md", ownership: "kit", policy: "replace-if-unmodified", required: true },
    ],
    promptFiles: ["prompts/README.md", "prompts/_local/README.md"],
    removed: [],
    protectedPaths: [
      ".git",
      ".git/**",
      ".gitignore",
      ".gitattributes",
      "docs/**",
      "src/**",
      "public/**",
      "project-brief.md",
      "package.json",
      "package-lock.json",
      "pnpm-lock.yaml",
      "yarn.lock",
      "bun.lock",
      "bun.lockb",
      ".env*",
      "prompts/_local/**",
    ],
  };
}

function configureUpdaterRepository(text, repository) {
  const id = repository.id === null ? "null" : String(repository.id);
  const fullName = repository.fullName === null ? "null" : JSON.stringify(repository.fullName);
  const block = [
    "// PROMPT_KIT_TRUST_ROOT:BEGIN",
    `export const OFFICIAL_REPOSITORY_ID = ${id};`,
    `export const OFFICIAL_REPOSITORY_FULL_NAME = ${fullName};`,
    "// PROMPT_KIT_TRUST_ROOT:END",
  ].join("\n");
  const trustRootPattern = /\/\/ PROMPT_KIT_TRUST_ROOT:BEGIN\nexport const OFFICIAL_REPOSITORY_ID = (?:null|[1-9]\d*);\nexport const OFFICIAL_REPOSITORY_FULL_NAME = (?:null|"[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+");\n\/\/ PROMPT_KIT_TRUST_ROOT:END/;
  assert.match(text, trustRootPattern, "fixture updater trust root is missing");
  return text.replace(trustRootPattern, block);
}

async function createSourceFixture(options = {}) {
  const root = await mkdtemp(path.join(tmpdir(), "web-kit-release-source-"));
  const version = options.version ?? "1.2.3";
  const date = "2026-01-02";
  await writeText(root, "PROMPT_KIT_VERSION.md", `# Prompt Kit Version\n\n- Version: ${version}\n- Released: ${date}\n- Managed block: \`PROMPT_KIT:BEGIN managed version=${version}\`\n`);
  await writeText(root, "CHANGELOG.md", `# Changelog\n\n## ${version} - ${date}\n\nAdded:\n\n- Reproducible releases.\n\n## 1.0.0 - 2025-01-01\n\n- Earlier release.\n`);
  await writeText(root, "MIGRATIONS.md", `# Migrations\n\n## ${version}\n\n### Required\n\n- Update the managed block.\n`);
  await writeText(root, "AGENTS.md", `# AGENTS.md\n\n<!-- PROMPT_KIT:BEGIN managed version=${version} -->\n\nManaged fixture.\n\n<!-- PROMPT_KIT:END -->\n\n## Project-specific context\n`);
  await writeText(root, "prompts/README.md", "# Fixture prompts\n");
  await writeText(root, "prompts/_local/README.md", "# Local prompt seed\n");
  await writeText(root, "release/manifest.schema.json", "{}\n");
  await writeText(root, "release/prompt-kit.gitignore", "backups/\ndownloads/\n");
  await writeText(root, `release/notes/v${version}.md`, `# Web Kit v${version}\n\nSafe release fixture.\n`);
  await writeText(root, "release/payload.json", `${JSON.stringify(fixturePayload(options), null, 2)}\n`);
  await mkdir(path.join(root, "tools"), { recursive: true });
  await copyFile(updaterSource, path.join(root, "tools", "update-kit.mjs"));
  await copyFile(releaseSource, path.join(root, "tools", "release.mjs"));
  await chmod(path.join(root, "tools", "update-kit.mjs"), 0o644);
  await chmod(path.join(root, "tools", "release.mjs"), 0o644);
  const updaterPath = path.join(root, "tools", "update-kit.mjs");
  const updater = await readFile(updaterPath, "utf8");
  const repository = options.repository ?? productionRepository;
  const configured = configureUpdaterRepository(updater, repository);
  await writeFile(updaterPath, configured, { mode: 0o644 });
  if (options.license !== false) await writeText(root, "LICENSE", options.licenseText ?? canonicalMitLicense());
  return root;
}

async function run(command, args, options = {}) {
  return execFileAsync(command, args, {
    cwd: options.cwd,
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
    env: options.env ?? process.env,
  });
}

async function initializeFixtureRepository(root) {
  await run("git", ["init", "-q", "-b", "main"], { cwd: root });
  await run("git", ["config", "user.name", "Release Fixture"], { cwd: root });
  await run("git", ["config", "user.email", "release-fixture@example.invalid"], { cwd: root });
  await run("git", ["add", "."], { cwd: root });
  await run("git", ["commit", "-q", "-m", "Fixture release source"], { cwd: root });
  return (await run("git", ["rev-parse", "HEAD"], { cwd: root })).stdout.trim();
}

async function buildConfiguredFixture(root, output) {
  await run(process.execPath, [path.join(root, "tools", "release.mjs"), "build", "--root", root, "--out", output]);
}

async function createFakeGh(root, config) {
  const bin = path.join(root, "bin");
  await mkdir(bin, { recursive: true });
  await writeText(root, "config.json", `${JSON.stringify(config, null, 2)}\n`);
  const script = `#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");
const root = path.dirname(path.dirname(process.argv[1]));
const config = JSON.parse(fs.readFileSync(path.join(root, "config.json"), "utf8"));
const args = process.argv.slice(2);
const tokenKeys = Object.keys(process.env).filter((key) => /^(?:GH_TOKEN|GITHUB_TOKEN|GH_ENTERPRISE_TOKEN|GITHUB_ENTERPRISE_TOKEN|GITHUB_PAT|PAT)$/i.test(key));
fs.appendFileSync(path.join(root, "calls.ndjson"), JSON.stringify({ args, tokenKeys }) + "\\n");
function output(value) { process.stdout.write(JSON.stringify(value)); }
if (args[0] === "auth" && args[1] === "status" && args[2] === "--hostname" && args[3] === "github.com") process.exit(0);
if (args[0] === "api") {
  const endpoint = args.at(-1);
  if (endpoint === "repos/" + config.bootstrapFullName) {
    output({
      id: config.returnedRepositoryId,
      full_name: config.canonicalFullName,
      private: config.private !== false,
      owner: { type: "User", login: config.ownerLogin || "dmandrianov" },
    });
    process.exit(0);
  }
  if (endpoint === "repos/" + config.canonicalFullName + "/releases/latest") {
    output(config.release);
    process.exit(0);
  }
  if (endpoint === "repos/" + config.canonicalFullName + "/git/ref/tags/" + encodeURIComponent(config.release.tag_name)) {
    output({ object: { type: "commit", sha: config.commit } });
    process.exit(0);
  }
}
if (args[0] === "release" && args[1] === "verify") {
  if (args[2] !== config.release.tag_name || args[args.indexOf("--repo") + 1] !== config.canonicalFullName) process.exit(2);
  output({ verified: true });
  process.exit(0);
}
if (args[0] === "release" && args[1] === "verify-asset") {
  const localAsset = args[3];
  const expectedAsset = config.assets[path.basename(localAsset)];
  if (args[2] !== config.release.tag_name || args[args.indexOf("--repo") + 1] !== config.canonicalFullName || !expectedAsset) process.exit(2);
  if (!fs.readFileSync(localAsset).equals(fs.readFileSync(expectedAsset))) process.exit(3);
  output({ verified: true });
  process.exit(0);
}
if (args[0] === "release" && args[1] === "download") {
  const pattern = args[args.indexOf("--pattern") + 1];
  const destination = args[args.indexOf("--dir") + 1];
  const source = config.assets[pattern];
  if (args[args.indexOf("--repo") + 1] !== config.canonicalFullName || !source) process.exit(2);
  fs.copyFileSync(source, path.join(destination, pattern));
  process.exit(0);
}
process.exit(2);
`;
  const executable = await writeText(root, "bin/gh", script, 0o755);
  return { executable, configPath: path.join(root, "config.json"), logPath: path.join(root, "calls.ndjson") };
}

test("high-confidence secret signatures are detected without flagging ordinary prose", () => {
  assert.equal(findSecretKind("Never write passwords into docs."), null);
  assert.equal(findSecretKind(`value=${"github_pat_"}${"a".repeat(24)}`), "GitHub token");
});

test("official GitHub origin normalization rejects forks and accepts HTTPS or SSH", () => {
  assert.equal(normalizeGitHubRepository("https://github.com/dmandrianov/codex-web-kit-nextjs.git"), "dmandrianov/codex-web-kit-nextjs");
  assert.equal(normalizeGitHubRepository("git@github.com:dmandrianov/codex-web-kit-nextjs.git"), "dmandrianov/codex-web-kit-nextjs");
  assert.equal(normalizeGitHubRepository("https://github.com/someone/web-kit.git"), "someone/web-kit");
  assert.equal(normalizeGitHubRepository("file:///tmp/web-kit"), null);
});

test("the shipped trust root points to the transferred personal repository without changing its numeric ID", () => {
  assert.equal(OFFICIAL_REPOSITORY_ID, 1302994489);
  assert.equal(OFFICIAL_REPOSITORY_FULL_NAME, "dmandrianov/codex-web-kit-nextjs");
  assert.equal(OFFICIAL_REPOSITORY_OWNER_LOGIN, "dmandrianov");
});

test("release workflow validates env-only tags and scopes the GitHub App token", async () => {
  const workflow = await readFile(path.resolve(toolsDirectory, "..", ".github", "workflows", "release.yml"), "utf8");
  const runLines = workflow.split("\n").filter((line) => /^\s*run:/.test(line));
  assert.ok(runLines.every((line) => !line.includes("${{ inputs.tag }}")), "workflow interpolates raw input inside run");
  assert.match(workflow, /\/\[\\r\\n\]\//, "tag validator does not explicitly reject CR/LF");
  assert.match(workflow, /permission-administration: read/);
  assert.match(workflow, /permission-contents: write/);
  assert.equal((workflow.match(/^\s+GH_TOKEN:/gm) ?? []).length, 4, "GH_TOKEN must be scoped only to gh-dependent steps");
});

test("source verification rejects unlisted prompts and executable payload files", async () => {
  const root = await createSourceFixture();
  try {
    await writeText(root, "prompts/unlisted.md", "# Unlisted\n");
    await assert.rejects(() => verifySource(root), /Prompt allowlist mismatch/);
    await rm(path.join(root, "prompts", "unlisted.md"));
    await chmod(path.join(root, "prompts", "README.md"), 0o755);
    await assert.rejects(() => verifySource(root), /Executable bit is forbidden/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("release source requires the MIT LICENSE", async () => {
  const root = await createSourceFixture({ license: false });
  try {
    await assert.rejects(() => verifySource(root), /Required release source is missing: LICENSE/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("release source rejects a modified or incomplete MIT license", async () => {
  const root = await createSourceFixture({ licenseText: "MIT License\n\nIncomplete grant.\n" });
  try {
    await assert.rejects(() => verifySource(root), /LICENSE must match the canonical MIT text/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("publication is blocked until repository ID and final full_name are embedded", async () => {
  const root = await createSourceFixture({ repository: { id: null, fullName: null } });
  try {
    await assert.rejects(
      () => run(process.execPath, ["tools/release.mjs", "verify-source", "--tag", "v1.2.3", "--publish"], { cwd: root }),
      (error) => {
        assert.match(error.stderr, /positive GitHub repository ID and final repository full_name/);
        return true;
      },
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("GitHub draft assets must match local sizes and available SHA-256 digests", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "web-kit-release-asset-check-"));
  try {
    const entries = [];
    for (const [name, bytes] of [["kit.zip", "zip-bytes\n"], ["kit.tar.gz", "tar-bytes\n"], ["SHA256SUMS", "checksums\n"]]) {
      entries.push({ name, path: await writeText(root, name, bytes) });
    }
    const expected = await collectLocalReleaseAssets(entries);
    const release = {
      assets: entries.map((entry, index) => {
        const local = expected.get(entry.name);
        return { id: index + 1, name: entry.name, state: "uploaded", size: local.size, digest: `sha256:${local.sha256}` };
      }),
    };
    await assertGitHubReleaseAssets(release, expected, "Fixture draft");

    const wrongSize = JSON.parse(JSON.stringify(release));
    wrongSize.assets[0].size += 1;
    await assert.rejects(
      () => assertGitHubReleaseAssets(wrongSize, expected, "Fixture draft"),
      /size does not match local bytes/,
    );

    const wrongDigest = JSON.parse(JSON.stringify(release));
    wrongDigest.assets[1].digest = `sha256:${"0".repeat(64)}`;
    await assert.rejects(
      () => assertGitHubReleaseAssets(wrongDigest, expected, "Fixture draft"),
      /digest does not match local SHA-256/,
    );

    const missingDigest = JSON.parse(JSON.stringify(release));
    delete missingDigest.assets[2].digest;
    await assert.rejects(
      () => assertGitHubReleaseAssets(missingDigest, expected, "Fixture draft"),
      /digest does not match local SHA-256/,
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("draft releases are resolved from the paginated release list", () => {
  const draft = { id: 77, tag_name: "v1.2.3", draft: true, prerelease: false };
  assert.equal(findReleaseByTag([[{ tag_name: "v1.2.2" }], [draft]], "v1.2.3"), draft);
  assert.equal(findReleaseByTag([], "v1.2.3"), null);
  assert.throws(() => findReleaseByTag({ releases: [] }, "v1.2.3"), /invalid release list/);
});

test("incoming updater trust root rejects a self-consistent manifest paired with foreign embedded constants", async () => {
  const payloadRoot = await mkdtemp(path.join(tmpdir(), "web-kit-foreign-updater-"));
  try {
    const incomingPath = path.join(payloadRoot, ".prompt-kit", "update.mjs");
    await mkdir(path.dirname(incomingPath), { recursive: true });
    const validUpdater = await readFile(updaterSource, "utf8");
    assert.deepEqual(extractUpdaterTrustRoot(validUpdater), {
      repositoryId: productionRepository.id,
      repositoryFullName: productionRepository.fullName,
    });
    const foreignRepository = {
      id: productionRepository.id === 999999 ? 999998 : 999999,
      fullName: "foreign-owner/web-kit",
    };
    const foreignUpdater = configureUpdaterRepository(validUpdater, foreignRepository);
    await writeFile(incomingPath, foreignUpdater, { mode: 0o644 });
    const manifest = {
      source: {
        repositoryId: foreignRepository.id,
        repositoryFullName: foreignRepository.fullName,
      },
    };
    await assert.rejects(
      () => verifyIncomingUpdaterTrustRoot(payloadRoot, manifest),
      /does not match the currently trusted updater/,
    );
    assert.throws(
      () => extractUpdaterTrustRoot(`${validUpdater}\nexport const OFFICIAL_REPOSITORY_ID = 1;\n`),
      /exactly one canonical repository trust-root block/,
    );
  } finally {
    await rm(payloadRoot, { recursive: true, force: true });
  }
});

test("install rejects a symlink parent before backups or writes outside the project", async () => {
  const source = await createSourceFixture();
  const workspace = await mkdtemp(path.join(tmpdir(), "web-kit-symlink-parent-"));
  const output = path.join(workspace, "release");
  const project = path.join(workspace, "project");
  const outside = path.join(workspace, "outside");
  try {
    await buildRelease(source, { out: output });
    await mkdir(project, { recursive: true });
    await mkdir(outside, { recursive: true });
    await writeText(outside, "sentinel.txt", "outside must remain unchanged\n");
    await symlink(outside, path.join(project, "prompts"), "dir");
    await assert.rejects(
      () => run(process.execPath, [
        path.join(source, "tools", "update-kit.mjs"),
        "install",
        "--project",
        project,
        "--archive",
        path.join(output, "web-kit-v1.2.3.tar.gz"),
        "--checksum-file",
        path.join(output, "SHA256SUMS"),
      ]),
      /Symlink is forbidden in managed path/,
    );
    assert.deepEqual(await readdir(outside), ["sentinel.txt"]);
    assert.equal(await readFile(path.join(outside, "sentinel.txt"), "utf8"), "outside must remain unchanged\n");
    await assert.rejects(() => lstat(path.join(project, ".prompt-kit", "backups")), /ENOENT/);
    await assert.rejects(() => lstat(path.join(project, "AGENTS.md")), /ENOENT/);
  } finally {
    await rm(source, { recursive: true, force: true });
    await rm(workspace, { recursive: true, force: true });
  }
});

test("release archives are reproducible and install without changing the user's Git or project files", async () => {
  const source = await createSourceFixture();
  const workspace = await mkdtemp(path.join(tmpdir(), "web-kit-release-integration-"));
  const outputOne = path.join(workspace, "release-one");
  const outputTwo = path.join(workspace, "release-two");
  const project = path.join(workspace, "user-project");
  try {
    await buildRelease(source, { out: outputOne });
    await buildRelease(source, { out: outputTwo });
    await verifyArtifacts(source, { out: outputOne });

    for (const asset of ["web-kit-v1.2.3.zip", "web-kit-v1.2.3.tar.gz", "SHA256SUMS", "RELEASE_NOTES.md"]) {
      assert.deepEqual(await readFile(path.join(outputOne, asset)), await readFile(path.join(outputTwo, asset)), `${asset} must be reproducible`);
    }

    await mkdir(path.join(project, "docs"), { recursive: true });
    await writeText(project, "README.md", "# User project\n");
    await writeText(project, ".gitignore", "user-cache/\n");
    await writeText(project, ".gitattributes", "*.txt text eol=lf\n");
    await writeText(project, "CHANGELOG.md", "# User changelog\n");
    await writeText(project, "MIGRATIONS.md", "# User migrations\n");
    await writeText(project, "docs/project-state.md", "user documentation\n");
    await writeText(project, "package.json", "{\"private\":true}\n");
    await writeText(project, "prompts/_local/custom.md", "# User-owned local prompt\n");
    await run("git", ["init", "-q"], { cwd: project });
    await run("git", ["config", "user.name", "Fixture User"], { cwd: project });
    await run("git", ["config", "user.email", "fixture@example.invalid"], { cwd: project });
    await run("git", ["remote", "add", "origin", "https://example.invalid/user/project.git"], { cwd: project });
    await writeText(project, ".git/hooks/pre-commit", "#!/bin/sh\nexit 0\n", 0o755);
    await run("git", ["add", "."], { cwd: project });
    await run("git", ["commit", "-q", "-m", "User project baseline"], { cwd: project });

    const protectedFiles = [
      ".git/config",
      ".git/HEAD",
      ".git/index",
      ".git/hooks/pre-commit",
      ".gitignore",
      ".gitattributes",
      "README.md",
      "CHANGELOG.md",
      "MIGRATIONS.md",
      "docs/project-state.md",
      "package.json",
      "prompts/_local/custom.md",
    ];
    const before = new Map();
    for (const relative of protectedFiles) before.set(relative, await readFile(path.join(project, ...relative.split("/"))));
    const hookModeBefore = (await lstat(path.join(project, ".git", "hooks", "pre-commit"))).mode & 0o777;
    const headBefore = (await run("git", ["rev-parse", "HEAD"], { cwd: project })).stdout.trim();

    const updater = path.join(source, "tools", "update-kit.mjs");
    const { stdout } = await run(process.execPath, [
      updater,
      "install",
      "--project",
      project,
      "--archive",
      path.join(outputOne, "web-kit-v1.2.3.tar.gz"),
      "--checksum-file",
      path.join(outputOne, "SHA256SUMS"),
    ]);
    const result = JSON.parse(stdout);
    assert.equal(result.status, "updated");
    assert.equal(result.to, "1.2.3");
    for (const relative of protectedFiles) {
      assert.deepEqual(await readFile(path.join(project, ...relative.split("/"))), before.get(relative), `${relative} changed during install`);
    }
    assert.equal((await run("git", ["rev-parse", "HEAD"], { cwd: project })).stdout.trim(), headBefore);
    assert.equal((await run("git", ["diff", "--cached", "--name-only"], { cwd: project })).stdout.trim(), "");
    assert.equal((await lstat(path.join(project, ".git", "hooks", "pre-commit"))).mode & 0o777, hookModeBefore);
    assert.equal((await run("git", ["remote", "get-url", "origin"], { cwd: project })).stdout.trim(), "https://example.invalid/user/project.git");
  } finally {
    await rm(source, { recursive: true, force: true });
    await rm(workspace, { recursive: true, force: true });
  }
});

test("verified gh updates survive the same-ID transfer to the personal owner, scrub token variables, and reject an ID mismatch before writes", async () => {
  const repositoryId = 424242;
  const oldFullName = "dmandrianov-web-kit/web-kit";
  const canonicalFullName = "dmandrianov/codex-web-kit-nextjs";
  const oldSource = await createSourceFixture({ version: "1.2.2", repository: { id: repositoryId, fullName: oldFullName } });
  const newSource = await createSourceFixture({ version: "1.2.3", repository: { id: repositoryId, fullName: canonicalFullName } });
  const workspace = await mkdtemp(path.join(tmpdir(), "web-kit-private-gh-"));
  const oldOutput = path.join(workspace, "old-release");
  const newOutput = path.join(workspace, "new-release");
  const project = path.join(workspace, "project");
  const fakeRoot = path.join(workspace, "fake-gh");
  try {
    await initializeFixtureRepository(oldSource);
    const newCommit = await initializeFixtureRepository(newSource);
    await buildConfiguredFixture(oldSource, oldOutput);
    await buildConfiguredFixture(newSource, newOutput);
    await mkdir(project, { recursive: true });
    await mkdir(path.join(fakeRoot, "home"), { recursive: true });

    const tarName = "web-kit-v1.2.3.tar.gz";
    const zipName = "web-kit-v1.2.3.zip";
    const checksumName = "SHA256SUMS";
    const assets = {
      [tarName]: path.join(newOutput, tarName),
      [zipName]: path.join(newOutput, zipName),
      [checksumName]: path.join(newOutput, checksumName),
    };
    const releaseAssets = [];
    let assetId = 500;
    for (const name of [zipName, tarName, checksumName]) {
      releaseAssets.push({ id: assetId, name, state: "uploaded", size: (await readFile(assets[name])).length });
      assetId += 1;
    }
    const fakeConfig = {
      trustedRepositoryId: repositoryId,
      returnedRepositoryId: repositoryId,
      bootstrapFullName: oldFullName,
      canonicalFullName,
      commit: newCommit,
      assets,
      release: { id: 77, tag_name: "v1.2.3", draft: false, prerelease: false, immutable: true, assets: releaseAssets },
    };
    const fake = await createFakeGh(fakeRoot, fakeConfig);
    const tokenSentinels = {
      GH_TOKEN: `ghp_${"a".repeat(40)}`,
      GITHUB_TOKEN: `ghp_${"b".repeat(40)}`,
      GH_ENTERPRISE_TOKEN: `ghp_${"e".repeat(40)}`,
      GITHUB_ENTERPRISE_TOKEN: `ghp_${"f".repeat(40)}`,
      GITHUB_PAT: `github_pat_${"c".repeat(40)}`,
      PAT: `github_pat_${"d".repeat(40)}`,
    };
    const privateEnvironment = {
      ...process.env,
      ...tokenSentinels,
      HOME: path.join(fakeRoot, "home"),
      PATH: `${path.dirname(fake.executable)}${path.delimiter}${process.env.PATH}`,
    };

    const oldUpdater = path.join(oldSource, "tools", "update-kit.mjs");
    await run(process.execPath, [
      oldUpdater,
      "install",
      "--project",
      project,
      "--archive",
      path.join(oldOutput, "web-kit-v1.2.2.tar.gz"),
      "--checksum-file",
      path.join(oldOutput, checksumName),
    ], { env: privateEnvironment });

    const installedUpdater = path.join(project, ".prompt-kit", "update.mjs");
    fakeConfig.release.immutable = false;
    await writeFile(fake.configPath, `${JSON.stringify(fakeConfig, null, 2)}\n`);
    let mutableReleaseError;
    try {
      await run(process.execPath, [installedUpdater, "check", "--project", project], { env: privateEnvironment });
    } catch (error) {
      mutableReleaseError = error;
    }
    assert.ok(mutableReleaseError, "mutable release was accepted");
    assert.match(String(mutableReleaseError.stderr), /release is not immutable/);
    fakeConfig.release.immutable = true;
    await writeFile(fake.configPath, `${JSON.stringify(fakeConfig, null, 2)}\n`);
    const checked = await run(process.execPath, [installedUpdater, "check", "--project", project], { env: privateEnvironment });
    assert.equal(JSON.parse(checked.stdout).status, "update-available");
    const updated = await run(process.execPath, [installedUpdater, "update", "--project", project], { env: privateEnvironment });
    assert.equal(JSON.parse(updated.stdout).to, "1.2.3");
    const installedManifest = JSON.parse(await readFile(path.join(project, ".prompt-kit", "manifest.json"), "utf8"));
    assert.equal(installedManifest.source.repositoryId, repositoryId);
    assert.equal(installedManifest.source.repositoryFullName, canonicalFullName);

    const successfulCalls = (await readFile(fake.logPath, "utf8")).trim().split("\n").map((line) => JSON.parse(line));
    assert.ok(successfulCalls.some((call) => call.args.at(-1) === `repos/${oldFullName}`), "bootstrap full_name was not used for repository identity");
    assert.ok(successfulCalls.some((call) => call.args.at(-1) === `repos/${canonicalFullName}/releases/latest`), "canonical full_name was not used after rename");
    assert.ok(successfulCalls.some((call) => call.args[0] === "release" && call.args.includes(canonicalFullName)), "release assets were not downloaded from the canonical repository");
    assert.ok(successfulCalls.some((call) => call.args[0] === "release" && call.args[1] === "verify"), "immutable release attestation was not verified");
    const verifiedAssets = successfulCalls.filter((call) => call.args[0] === "release" && call.args[1] === "verify-asset");
    assert.equal(verifiedAssets.length, 2, "downloaded archive and checksum must both be verified against the immutable release");
    assert.ok(successfulCalls.every((call) => call.tokenKeys.length === 0), "a token environment variable reached gh");
    assert.ok(successfulCalls.every((call) => !(call.args[0] === "auth" && call.args[1] === "token")), "updater attempted to read an authentication token");
    for (const value of Object.values(tokenSentinels)) {
      assert.ok(!checked.stdout.includes(value) && !checked.stderr.includes(value) && !updated.stdout.includes(value) && !updated.stderr.includes(value));
    }

    fakeConfig.bootstrapFullName = canonicalFullName;
    await writeFile(fake.configPath, `${JSON.stringify(fakeConfig, null, 2)}\n`);
    const currentResult = await run(process.execPath, [installedUpdater, "update", "--project", project], { env: privateEnvironment });
    assert.equal(JSON.parse(currentResult.stdout).status, "current");
    fakeConfig.private = false;
    await writeFile(fake.configPath, `${JSON.stringify(fakeConfig, null, 2)}\n`);
    const publicVisibilityResult = await run(process.execPath, [installedUpdater, "update", "--project", project], { env: privateEnvironment });
    assert.equal(JSON.parse(publicVisibilityResult.stdout).status, "current");
    fakeConfig.private = true;
    await writeFile(fake.configPath, `${JSON.stringify(fakeConfig, null, 2)}\n`);
    const validManifestBytes = await readFile(path.join(project, ".prompt-kit", "manifest.json"));
    const wrongRevisionManifest = JSON.parse(validManifestBytes.toString("utf8"));
    wrongRevisionManifest.source.revision = "0".repeat(40);
    await writeFile(path.join(project, ".prompt-kit", "manifest.json"), `${JSON.stringify(wrongRevisionManifest, null, 2)}\n`);
    let sameVersionError;
    try {
      await run(process.execPath, [installedUpdater, "update", "--project", project], { env: privateEnvironment });
    } catch (error) {
      sameVersionError = error;
    }
    assert.ok(sameVersionError, "same-version update ignored a mismatched tag revision");
    assert.match(String(sameVersionError.stderr), /revision does not match the immutable GitHub tag/);
    await writeFile(path.join(project, ".prompt-kit", "manifest.json"), validManifestBytes);

    const beforeMismatch = new Map([
      ["AGENTS.md", await readFile(path.join(project, "AGENTS.md"))],
      ["manifest.json", await readFile(path.join(project, ".prompt-kit", "manifest.json"))],
      ["update.mjs", await readFile(path.join(project, ".prompt-kit", "update.mjs"))],
    ]);
    const callsBeforeMismatch = (await readFile(fake.logPath, "utf8")).trim().split("\n").length;
    fakeConfig.returnedRepositoryId = repositoryId + 1;
    await writeFile(fake.configPath, `${JSON.stringify(fakeConfig, null, 2)}\n`);
    let mismatchError;
    try {
      await run(process.execPath, [installedUpdater, "update", "--project", project], { env: privateEnvironment });
    } catch (error) {
      mismatchError = error;
    }
    assert.ok(mismatchError, "repository ID mismatch unexpectedly succeeded");
    assert.match(String(mismatchError.stderr), /repository ID does not match/);
    for (const value of Object.values(tokenSentinels)) assert.ok(!String(mismatchError.stderr).includes(value));
    assert.deepEqual(await readFile(path.join(project, "AGENTS.md")), beforeMismatch.get("AGENTS.md"));
    assert.deepEqual(await readFile(path.join(project, ".prompt-kit", "manifest.json")), beforeMismatch.get("manifest.json"));
    assert.deepEqual(await readFile(path.join(project, ".prompt-kit", "update.mjs")), beforeMismatch.get("update.mjs"));
    let allCalls = (await readFile(fake.logPath, "utf8")).trim().split("\n").map((line) => JSON.parse(line));
    assert.ok(allCalls.slice(callsBeforeMismatch).every((call) => call.args[0] !== "release"), "assets were downloaded after repository ID trust failed");

    fakeConfig.returnedRepositoryId = repositoryId;
    fakeConfig.ownerLogin = "different-owner";
    await writeFile(fake.configPath, `${JSON.stringify(fakeConfig, null, 2)}\n`);
    const callsBeforeOwnerMismatch = allCalls.length;
    let ownerMismatchError;
    try {
      await run(process.execPath, [installedUpdater, "update", "--project", project], { env: privateEnvironment });
    } catch (error) {
      ownerMismatchError = error;
    }
    assert.ok(ownerMismatchError, "repository owner mismatch unexpectedly succeeded");
    assert.match(String(ownerMismatchError.stderr), /must remain owned by the GitHub user dmandrianov/);
    allCalls = (await readFile(fake.logPath, "utf8")).trim().split("\n").map((line) => JSON.parse(line));
    assert.ok(allCalls.slice(callsBeforeOwnerMismatch).every((call) => call.args[0] !== "release"), "assets were downloaded after repository owner trust failed");
    assert.ok(allCalls.every((call) => call.tokenKeys.length === 0), "a token environment variable reached gh during the failure path");
  } finally {
    await rm(oldSource, { recursive: true, force: true });
    await rm(newSource, { recursive: true, force: true });
    await rm(workspace, { recursive: true, force: true });
  }
});

test("shipped prompts preserve the Sol-friendly creator-critic contract", async () => {
  const sourceRoot = path.resolve(toolsDirectory, "..");
  const read = (relative) => readFile(path.join(sourceRoot, ...relative.split("/")), "utf8");

  async function walkMarkdown(directory) {
    const files = [];
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const target = path.join(directory, entry.name);
      if (entry.isDirectory()) files.push(...await walkMarkdown(target));
      else if (entry.name.endsWith(".md")) files.push(target);
    }
    return files;
  }

  const promptFiles = await walkMarkdown(path.join(sourceRoot, "prompts"));
  const promptTexts = new Map();
  for (const file of promptFiles) {
    const relative = path.relative(sourceRoot, file).split(path.sep).join("/");
    promptTexts.set(relative, await readFile(file, "utf8"));
  }

  const references = new Set();
  for (const [relative, content] of promptTexts) {
    for (const match of content.matchAll(/prompts\/[A-Za-z0-9_./-]+\.md/g)) references.add(match[0]);
    assert.equal((content.match(/^```/gm) ?? []).length % 2, 0, `${relative} has unbalanced Markdown fences`);
  }
  for (const reference of references) assert.ok(promptTexts.has(reference), `Broken prompt reference: ${reference}`);

  const anatomy = ["Когда использовать", "Роль Codex", "Цель", "Контекст, который нужно дать", "Ограничения", "Процесс", "Output", "Done when", "Follow-up"];
  const staged = [...promptTexts.keys()].filter((relative) => /^prompts\/(?:0[0-9]|1[0-3])-[^/]+\/[^_][^/]*\.md$/.test(relative) || /^prompts\/_(?:content|maintenance)\/[^_][^/]*\.md$/.test(relative));
  for (const relative of staged) {
    for (const section of anatomy) assert.ok(promptTexts.get(relative).includes(`## ${section}`), `${relative} is missing ${section}`);
  }

  const agents = await read("AGENTS.md");
  assert.equal((agents.match(/^<!-- PROMPT_KIT:BEGIN managed version=/gm) ?? []).length, 1);
  assert.equal((agents.match(/^<!-- PROMPT_KIT:END -->/gm) ?? []).length, 1);

  const required = {
    "prompts/_guidelines/creator-critic-design-workflow.md": ["4–6", "low-fi", "максимум три", "self-fix", "stable vocabulary", "provisional expressive choices", "2–4", "core semantic roles"],
    "prompts/05-design-system/03-design-concept-prototypes.md": ["creator", "render", "critic", "mobile", "1440", "2560"],
    "prompts/07-page-planning/07-block-content-preview.md": ["meaning", "facts", "claims", "voice", "CTA intent", "line breaks"],
    "prompts/08-block-build/00-build-block-fast-lane.md": ["Design context diet", "live render", "максимум три", "self-fix"],
    "prompts/_guidelines/landing-copy-formulas.md": ["диагностический инструмент"],
    "prompts/_maintenance/02-check-kit-integrity.md": ["Creator-Critic Design Loop", "4-6", "2-4"],
    "prompts/_maintenance/04-align-project-after-kit-update.md": ["Creator-Critic Design Loop", "optional refresh"],
  };
  for (const [relative, needles] of Object.entries(required)) {
    const content = promptTexts.get(relative).toLowerCase();
    for (const needle of needles) assert.ok(content.includes(needle.toLowerCase()), `${relative} is missing creator-critic assertion: ${needle}`);
  }

  for (const relative of [
    "prompts/05-design-system/03-design-concept-prototypes.md",
    "prompts/07-page-planning/07-block-content-preview.md",
    "prompts/08-block-build/00-build-block-fast-lane.md",
  ]) {
    const content = promptTexts.get(relative);
    assert.ok((content.match(/\S+/g) ?? []).length <= 1300, `${relative} regressed into an oversized creator prompt`);
    assert.ok(!content.includes("## UI quality check"), `${relative} restored the full UI matrix before render`);
  }
});

test("shipped prompts route the full external gpt-taste skill in three scoped modes", async () => {
  const sourceRoot = path.resolve(toolsDirectory, "..");
  const read = (relative) => readFile(path.join(sourceRoot, ...relative.split("/")), "utf8");
  const expectedHash = "2e64c269953f2656c21bf5a0fa6b4568e82fe0c72b36e8f84758e090349966a5";
  const expectedCommit = "e988add20dab0fa97d7a76781c48961c8184288e";

  const [
    agents,
    router,
    integration,
    profile,
    concept,
    breakdown,
    nativeBuild,
    tasteBuild,
    payloadText,
  ] = await Promise.all([
    read("AGENTS.md"),
    read("prompts/ROUTER.md"),
    read("prompts/_guidelines/gpt-taste-integration.md"),
    read("prompts/_templates/gpt-taste-profile-template.md"),
    read("prompts/05-design-system/03-design-concept-prototypes.md"),
    read("prompts/07-page-planning/05-block-breakdown.md"),
    read("prompts/08-block-build/00-build-block-fast-lane.md"),
    read("prompts/08-block-build/00-gpt-taste-creative-build.md"),
    read("release/payload.json"),
  ]);
  const payload = JSON.parse(payloadText);

  for (const content of [integration, profile]) {
    assert.ok(content.includes(expectedHash), "gpt-taste pinned SHA-256 drifted");
    assert.ok(content.includes(expectedCommit), "gpt-taste pinned commit drifted");
  }
  for (const mode of ["page", "block", "component"]) {
    assert.ok(integration.includes(`\`${mode}\``), `integration is missing ${mode} mode`);
    assert.ok(router.includes(`\`${mode}\``), `router is missing ${mode} mode`);
  }

  assert.ok(concept.includes("design-lab/gpt-taste/page/"));
  assert.ok(concept.includes("явно вызови `$gpt-taste`"));
  assert.ok(breakdown.includes("Creator engine: gpt-taste"));
  assert.ok(breakdown.includes("mode `block`"));
  assert.ok(breakdown.includes("mode `component`"));
  assert.ok(tasteBuild.includes("design-lab/gpt-taste/blocks/[slug]/"));
  assert.ok(tasteBuild.includes("design-lab/gpt-taste/components/[slug]/"));
  assert.ok(tasteBuild.includes("Передай findings и evidence обратно `$gpt-taste`"));
  assert.ok(nativeBuild.includes("не выполняй этот native prompt"));
  assert.ok(router.includes("00-gpt-taste-component-spec.md"));
  assert.ok(router.includes("07-approve-gpt-taste-profile.md"));

  for (const nonTrigger of ["Dashboard", "checkout", "forms", "quality", "SEO", "deployment", "maintenance"]) {
    assert.ok(agents.toLowerCase().includes(nonTrigger.toLowerCase()), `AGENTS non-trigger is missing: ${nonTrigger}`);
    assert.ok(router.toLowerCase().includes(nonTrigger.toLowerCase()), `router non-trigger is missing: ${nonTrigger}`);
  }
  assert.ok(integration.toLowerCase().includes("не полагайся на неявное совпадение description"));
  assert.ok(integration.includes("не подменяй выбранный `gpt-taste` обычным creator pass молча"));
  assert.ok(integration.includes("не reroll locked choices"));

  const requiredPromptFiles = [
    "prompts/08-block-build/00-gpt-taste-creative-build.md",
    "prompts/08-block-build/07-approve-gpt-taste-profile.md",
    "prompts/07-page-planning/00-gpt-taste-component-spec.md",
    "prompts/_guidelines/gpt-taste-integration.md",
    "prompts/_templates/gpt-taste-component-spec-template.md",
    "prompts/_templates/gpt-taste-profile-template.md",
  ];
  for (const relative of requiredPromptFiles) assert.ok(payload.promptFiles.includes(relative), `payload is missing ${relative}`);
  assert.ok(!payload.promptFiles.some((relative) => /gpt-tasteskill\/SKILL\.md$/i.test(relative)), "upstream gpt-taste SKILL.md must remain external");
});

test("shipped prompts route the pinned external seo-content-writer only for article work", async () => {
  const sourceRoot = path.resolve(toolsDirectory, "..");
  const read = (relative) => readFile(path.join(sourceRoot, ...relative.split("/")), "utf8");
  const expectedCommit = "1608176f6c18de6aec62a9abf6a2074bf82c9f67";
  const expectedSkillHash = "8014ae5cb74e117415283dd27f2a86946a0df4cc0988f60be0a0b94f55204452";
  const expectedReferenceHashes = [
    "24605115a253effc44386066b559370b680433ddc908f68b3ba8e54da91700e1",
    "2444caf310b03243501af872e5e087854f79a935d289b185dd1e6fc9a06cb0eb",
    "e9d0d47c2c93dce7e8a04622c7cf7f26dc63116795b4a0feb167e7271fe43f29",
    "f37dfd001669a2c35a44fa6be5b34b99c4eb4c38fe71a471a990cf88252f8bd6",
  ];

  const [agents, router, integration, articlePrompt, payloadText] = await Promise.all([
    read("AGENTS.md"),
    read("prompts/ROUTER.md"),
    read("prompts/_guidelines/seo-content-writer-integration.md"),
    read("prompts/_content/01-write-seo-article.md"),
    read("release/payload.json"),
  ]);
  const payload = JSON.parse(payloadText);

  assert.ok(integration.includes("`v9.9.12`"), "preserved seo-content-writer version drifted");
  assert.ok(integration.includes(expectedCommit), "seo-content-writer pinned commit drifted");
  assert.ok(integration.includes(expectedSkillHash), "seo-content-writer pinned SKILL SHA-256 drifted");
  for (const hash of expectedReferenceHashes) assert.ok(integration.includes(hash), `seo-content-writer reference hash drifted: ${hash}`);

  for (const content of [agents, router]) {
    assert.ok(content.includes("prompts/_content/01-write-seo-article.md"), "article route is missing");
    assert.ok(content.includes("$seo-content-writer"), "explicit seo-content-writer invocation is missing");
  }
  assert.ok(articlePrompt.includes("Явно вызови `$seo-content-writer`"));
  assert.ok(articlePrompt.includes("Основная стадия проекта не изменилась"));
  assert.ok(router.includes("текущая стадия сохраняется"));

  for (const nonTrigger of ["hero", "CTA", "карточ", "форм", "content preview"]) {
    assert.ok(integration.toLowerCase().includes(nonTrigger.toLowerCase()), `seo-content-writer non-trigger is missing: ${nonTrigger}`);
  }

  for (const relative of [
    "prompts/_content/01-write-seo-article.md",
    "prompts/_guidelines/seo-content-writer-integration.md",
  ]) {
    assert.ok(payload.promptFiles.includes(relative), `payload is missing ${relative}`);
  }
  assert.ok(!payload.promptFiles.some((relative) => /seo-content-writer\/(?:SKILL|references\/.+)\.md$/i.test(relative)), "upstream seo-content-writer files must remain external");
});

test("ordinary page copy uses the lightweight fast pass without the article workflow", async () => {
  const sourceRoot = path.resolve(toolsDirectory, "..");
  const read = (relative) => readFile(path.join(sourceRoot, ...relative.split("/")), "utf8");
  const [agents, router, integration, standard, preview, contentPlan, smoke] = await Promise.all([
    read("AGENTS.md"),
    read("prompts/ROUTER.md"),
    read("prompts/_guidelines/seo-content-writer-integration.md"),
    read("prompts/_knowledge/site-copy-quality.md"),
    read("prompts/07-page-planning/07-block-content-preview.md"),
    read("prompts/07-page-planning/04-content-and-seo-plan.md"),
    read("prompts/09-quality/00-block-smoke-check.md"),
  ]);

  for (const marker of [
    "## Короткий обязательный контракт",
    "## Site copy fast pass",
    "Ответ идёт до убеждения",
    "Обещание заголовка выполнено",
    "Сильный тезис имеет опору",
    "Блок смыслово завершён",
  ]) {
    assert.ok(standard.includes(marker), `lightweight page-copy marker is missing: ${marker}`);
  }

  for (const content of [agents, router, integration, preview]) {
    assert.ok(content.includes("Site copy fast pass"), "page-copy fast pass routing is missing");
  }
  assert.ok(preview.includes("Полный `Site copy check` используй только"));
  assert.ok(contentPlan.includes("Headings-only outline verdict"));
  assert.ok(smoke.includes("Claim-to-evidence support"));
  assert.ok(router.includes("не требует чтения skill/references"));
  assert.ok(integration.includes("не требует чтения skill/references"));
});
