import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { chmod, lstat, mkdir, mkdtemp, readFile, readdir, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import test from "node:test";

import {
  encodeDotenvValue,
  prepareSecretTarget,
  readHiddenInput,
  SecretInputError,
  storeSecret,
  updateEnvText,
  validateTargetName,
  validateVariableName,
} from "./secret-input.mjs";

const execFileAsync = promisify(execFile);

async function createProject(t, { git = true } = {}) {
  const root = await mkdtemp(path.join(tmpdir(), "web-kit-secret-test-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(path.join(root, ".prompt-kit"), { recursive: true });
  await writeFile(path.join(root, ".gitignore"), ".env*\n!.env.example\n");
  await writeFile(path.join(root, ".prompt-kit", ".gitignore"), "*.tmp\n");
  if (git) await execFileAsync("git", ["init", "-q"], { cwd: root });
  return root;
}

function expectCode(code) {
  return (error) => error instanceof SecretInputError && error.code === code;
}

test("secret target and variable validation keeps public and credential-only values out", () => {
  assert.equal(validateVariableName("DADATA_API_KEY"), "DADATA_API_KEY");
  assert.equal(validateTargetName(".env.local"), ".env.local");
  assert.throws(() => validateVariableName("NEXT_PUBLIC_API_KEY"), expectCode("public_variable"));
  assert.throws(() => validateVariableName("ROOT_PASSWORD"), expectCode("unsupported_credential"));
  assert.throws(() => validateTargetName(".env.example"), expectCode("public_env_template"));
  assert.throws(() => validateTargetName("config/.env.local"), expectCode("invalid_target"));
});

test("dotenv encoding preserves single-line token characters without exposing a raw assignment", () => {
  assert.equal(encodeDotenvValue(Buffer.from("unit$value#part")), '"unit\\$value#part"');
  assert.throws(() => encodeDotenvValue(Buffer.from(" line")), expectCode("outer_whitespace"));
  assert.throws(() => encodeDotenvValue(Buffer.from("line1\nline2")), expectCode("multiline_secret"));
  assert.throws(
    () => encodeDotenvValue(Buffer.from(["-----BEGIN PRIVATE", " KEY-----"].join(""))),
    expectCode("private_key"),
  );
});

test("env update preserves unrelated entries, replaces one value and rejects duplicates", () => {
  const updated = updateEnvText('OTHER="keep"\nAPP_API_TOKEN="old"\n', "APP_API_TOKEN", '"new"');
  assert.equal(updated, 'OTHER="keep"\nAPP_API_TOKEN="new"\n');
  assert.throws(
    () => updateEnvText("APP_API_TOKEN=one\nAPP_API_TOKEN=two\n", "APP_API_TOKEN", '"new"'),
    expectCode("duplicate_variable"),
  );
});

test("storeSecret writes only to an ignored untracked file, uses mode 0600 and clears the input buffer", async (t) => {
  const root = await createProject(t);
  const target = path.join(root, ".env.local");
  await writeFile(target, 'OTHER="keep"\nAPP_API_TOKEN="old"\n');
  await chmod(target, 0o644);
  const secret = Buffer.from("unit$value#part");
  const result = await storeSecret({ projectRoot: root, variable: "APP_API_TOKEN", secret });
  assert.deepEqual(result, {
    status: "stored",
    variable: "APP_API_TOKEN",
    target: ".env.local",
    valueExposed: false,
    restartMayBeRequired: true,
  });
  assert.ok(secret.every((byte) => byte === 0));
  assert.equal(await readFile(target, "utf8"), 'OTHER="keep"\nAPP_API_TOKEN="unit\\$value#part"\n');
  assert.equal((await lstat(target)).mode & 0o777, 0o600);
  assert.deepEqual((await readdir(path.join(root, ".prompt-kit"))).sort(), [".gitignore"]);
});

test("storeSecret verifies root .gitignore even before a project becomes a Git repository", async (t) => {
  const root = await createProject(t, { git: false });
  const result = await storeSecret({
    projectRoot: root,
    variable: "SERVICE_API_KEY",
    secret: Buffer.from("unit_value"),
  });
  assert.equal(result.status, "stored");
  assert.match(await readFile(path.join(root, ".env.local"), "utf8"), /^SERVICE_API_KEY=/);
});

test("tracked, non-ignored and symlink targets are blocked before secret writes", async (t) => {
  const trackedRoot = await createProject(t);
  const trackedTarget = path.join(trackedRoot, ".env.local");
  await writeFile(trackedTarget, "APP_API_TOKEN=old\n");
  await execFileAsync("git", ["add", "-f", ".env.local"], { cwd: trackedRoot });
  await assert.rejects(
    storeSecret({ projectRoot: trackedRoot, variable: "APP_API_TOKEN", secret: Buffer.from("new") }),
    expectCode("tracked_target"),
  );
  assert.equal(await readFile(trackedTarget, "utf8"), "APP_API_TOKEN=old\n");

  const plainRoot = await createProject(t, { git: false });
  await writeFile(path.join(plainRoot, ".gitignore"), "node_modules/\n");
  await assert.rejects(
    prepareSecretTarget({ projectRoot: plainRoot, variable: "APP_API_TOKEN" }),
    expectCode("target_not_ignored"),
  );

  const symlinkRoot = await createProject(t);
  const outside = path.join(symlinkRoot, "outside-value");
  await writeFile(outside, "unchanged\n");
  await symlink(outside, path.join(symlinkRoot, ".env.local"));
  await assert.rejects(
    prepareSecretTarget({ projectRoot: symlinkRoot, variable: "APP_API_TOKEN" }),
    expectCode("symlink_target"),
  );
  assert.equal(await readFile(outside, "utf8"), "unchanged\n");
});

test("hidden input refuses a non-interactive stream instead of accepting a visible secret", async () => {
  await assert.rejects(
    readHiddenInput({ input: { isTTY: false }, output: { write() {} } }),
    expectCode("interactive_tty_required"),
  );
});
