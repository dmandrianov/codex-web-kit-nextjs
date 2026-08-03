import { randomBytes } from "node:crypto";
import { execFile } from "node:child_process";
import {
  chmod,
  copyFile,
  lstat,
  mkdir,
  mkdtemp,
  open,
  readFile,
  realpath,
  rename,
  rm,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { pathToFileURL } from "node:url";

const execFileAsync = promisify(execFile);
const MAX_ENV_BYTES = 1024 * 1024;
const MAX_SECRET_BYTES = 16 * 1024;
const VARIABLE_PATTERN = /^[A-Z][A-Z0-9_]*$/;
const TARGET_PATTERN = /^\.env(?:\.[a-z0-9_-]+)*(?:\.local)?$/i;
const PUBLIC_PREFIXES = ["NEXT_PUBLIC_", "NUXT_PUBLIC_", "VITE_", "REACT_APP_", "EXPO_PUBLIC_", "PUBLIC_"];
const FORBIDDEN_VARIABLE_PARTS = /(?:^|_)(?:PASSWORD|PASSCODE|PASSPHRASE|PRIVATE_KEY|SSH_KEY|ROOT|PEM|CERTIFICATE)(?:_|$)/;
const FORBIDDEN_TARGETS = new Set([".env.example", ".env.sample", ".env.template"]);

export class SecretInputError extends Error {
  constructor(code, message) {
    super(message);
    this.name = "SecretInputError";
    this.code = code;
  }
}

function fail(code, message) {
  throw new SecretInputError(code, message);
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
    } else {
      result[key] = true;
    }
  }
  return result;
}

export function validateVariableName(value) {
  if (typeof value !== "string" || !VARIABLE_PATTERN.test(value)) {
    fail("invalid_variable", "Имя переменной должно состоять из заглавных латинских букв, цифр и подчёркиваний.");
  }
  if (PUBLIC_PREFIXES.some((prefix) => value.startsWith(prefix))) {
    fail("public_variable", "Эта переменная доступна браузеру и не подходит для хранения секрета.");
  }
  if (FORBIDDEN_VARIABLE_PARTS.test(value)) {
    fail("unsupported_credential", "Пароли, root-доступ, private keys и сертификаты настраиваются отдельным credential workflow.");
  }
  return value;
}

export function validateTargetName(value) {
  if (typeof value !== "string" || value.includes("/") || value.includes("\\") || !TARGET_PATTERN.test(value)) {
    fail("invalid_target", "Безопасный ввод поддерживает только корневой локальный env-файл проекта.");
  }
  if (FORBIDDEN_TARGETS.has(value.toLowerCase())) {
    fail("public_env_template", "Файлы-примеры не должны содержать реальные секреты. Используйте .env.local.");
  }
  return value;
}

function decodeSecret(secret) {
  const buffer = Buffer.isBuffer(secret) ? secret : Buffer.from(secret ?? "");
  if (buffer.length === 0) fail("empty_secret", "Пустое значение не сохранено.");
  if (buffer.length > MAX_SECRET_BYTES) fail("secret_too_large", "Значение слишком большое для application API key/token workflow.");
  if (buffer.includes(0) || buffer.includes(10) || buffer.includes(13)) {
    fail("multiline_secret", "Многострочные значения и private keys этим помощником не принимаются.");
  }
  let value;
  try {
    value = new TextDecoder("utf-8", { fatal: true }).decode(buffer);
  } catch {
    fail("invalid_encoding", "Значение должно быть однострочным UTF-8 текстом.");
  }
  if (value.trim() !== value) fail("outer_whitespace", "Перед ключом или после него обнаружен пробел. Вставьте значение ещё раз без лишних пробелов.");
  if (/-----BEGIN [A-Z0-9 ]*PRIVATE KEY-----/.test(value)) {
    fail("private_key", "Private keys этим помощником не принимаются.");
  }
  return value;
}

export function encodeDotenvValue(secret) {
  const value = decodeSecret(secret);
  const escaped = value
    .replace(/\\/g, "\\\\")
    .replace(/\"/g, "\\\"")
    .replace(/\$/g, "\\$")
    .replace(/\t/g, "\\t");
  return `"${escaped}"`;
}

function assignmentPattern(variable) {
  return new RegExp(`^\\s*(?:export\\s+)?${variable}\\s*=`);
}

export function updateEnvText(existing, variable, encodedValue) {
  validateVariableName(variable);
  const text = typeof existing === "string" ? existing : new TextDecoder("utf-8", { fatal: true }).decode(existing);
  if (text.includes("\0")) fail("invalid_env_file", "Env-файл содержит недопустимые NUL-байты.");
  const eol = text.includes("\r\n") ? "\r\n" : "\n";
  const hadTrailingEol = text.endsWith("\n");
  const lines = text.length === 0 ? [] : text.split(/\r?\n/);
  if (hadTrailingEol) lines.pop();
  const pattern = assignmentPattern(variable);
  const matches = [];
  for (let index = 0; index < lines.length; index += 1) {
    if (pattern.test(lines[index])) matches.push(index);
  }
  if (matches.length > 1) {
    fail("duplicate_variable", `Переменная ${variable} встречается в env-файле несколько раз. Нужен ручной разбор без изменения значений.`);
  }
  const assignment = `${variable}=${encodedValue}`;
  if (matches.length === 1) lines[matches[0]] = assignment;
  else lines.push(assignment);
  return `${lines.join(eol)}${eol}`;
}

async function pathKind(filePath) {
  try {
    const info = await lstat(filePath);
    if (info.isSymbolicLink()) return "symlink";
    if (info.isFile()) return "file";
    if (info.isDirectory()) return "directory";
    return "other";
  } catch (error) {
    if (error?.code === "ENOENT") return "missing";
    throw error;
  }
}

async function runGit(args, options = {}) {
  const childEnvironment = {};
  for (const [key, value] of Object.entries(process.env)) {
    if (/(?:KEY|SECRET|TOKEN|PASSWORD|PASSPHRASE)/i.test(key)) continue;
    childEnvironment[key] = value;
  }
  try {
    const result = await execFileAsync("git", args, {
      cwd: options.cwd,
      encoding: "utf8",
      maxBuffer: 4 * 1024 * 1024,
      env: { ...childEnvironment, LC_ALL: "C" },
    });
    return { ok: true, ...result };
  } catch (error) {
    if (error?.code === "ENOENT") fail("git_missing", "Git не найден, поэтому нельзя проверить защиту env-файла.");
    return { ok: false, stdout: error?.stdout ?? "", stderr: error?.stderr ?? "", code: error?.code };
  }
}

async function checkIgnoreInsideRepository(projectRoot, relativePath) {
  const tracked = await runGit(["-C", projectRoot, "ls-files", "--error-unmatch", "--", relativePath]);
  if (tracked.ok) fail("tracked_target", `${relativePath} уже отслеживается Git. Секрет туда не записан.`);
  const ignored = await runGit(["-C", projectRoot, "check-ignore", "--no-index", "-q", "--", relativePath]);
  return ignored.ok;
}

async function checkIgnoreWithoutRepository(projectRoot, relativePath) {
  const rootIgnore = path.join(projectRoot, ".gitignore");
  const kitIgnore = path.join(projectRoot, ".prompt-kit", ".gitignore");
  if (await pathKind(rootIgnore) !== "file") return false;
  const temporary = await mkdtemp(path.join(tmpdir(), "web-kit-secret-ignore-"));
  try {
    await writeFile(path.join(temporary, ".gitignore"), await readFile(rootIgnore));
    if (await pathKind(kitIgnore) === "file") {
      await mkdir(path.join(temporary, ".prompt-kit"), { recursive: true });
      await writeFile(path.join(temporary, ".prompt-kit", ".gitignore"), await readFile(kitIgnore));
    }
    const initialized = await runGit(["init", "-q"], { cwd: temporary });
    if (!initialized.ok) fail("git_check_failed", "Не удалось создать временную Git-проверку для env-файла.");
    const ignored = await runGit(["check-ignore", "--no-index", "-q", "--", relativePath], { cwd: temporary });
    return ignored.ok;
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
}

async function isGitRepository(projectRoot) {
  const result = await runGit(["-C", projectRoot, "rev-parse", "--is-inside-work-tree"]);
  return result.ok && result.stdout.trim() === "true";
}

async function verifyIgnored(projectRoot, relativePath) {
  const repository = await isGitRepository(projectRoot);
  const ignored = repository
    ? await checkIgnoreInsideRepository(projectRoot, relativePath)
    : await checkIgnoreWithoutRepository(projectRoot, relativePath);
  if (!ignored) fail("target_not_ignored", `${relativePath} не подтверждён как Git-ignored. Секрет не записан.`);
  return { repository, ignored: true, tracked: false };
}

async function assertRegularDirectory(directory, label) {
  const kind = await pathKind(directory);
  if (kind === "symlink") fail("symlink_boundary", `${label} не должен быть symlink.`);
  if (kind !== "directory") fail("missing_directory", `${label} не найден.`);
}

export async function prepareSecretTarget({ projectRoot = process.cwd(), target = ".env.local", variable }) {
  const normalizedVariable = validateVariableName(variable);
  const normalizedTarget = validateTargetName(target);
  const resolvedProject = path.resolve(projectRoot);
  await assertRegularDirectory(resolvedProject, "Корень проекта");
  const canonicalProject = await realpath(resolvedProject);
  const kitDirectory = path.join(canonicalProject, ".prompt-kit");
  await assertRegularDirectory(kitDirectory, ".prompt-kit");
  const targetPath = path.join(canonicalProject, normalizedTarget);
  const targetKind = await pathKind(targetPath);
  if (targetKind === "symlink") fail("symlink_target", `${normalizedTarget} является symlink. Секрет не записан.`);
  if (!new Set(["missing", "file"]).has(targetKind)) fail("invalid_target_type", `${normalizedTarget} не является обычным файлом.`);
  if (targetKind === "file" && (await lstat(targetPath)).size > MAX_ENV_BYTES) {
    fail("env_too_large", `${normalizedTarget} слишком большой для безопасного автоматического обновления.`);
  }
  const temporaryName = `.secret-input-${process.pid}-${randomBytes(6).toString("hex")}.tmp`;
  const temporaryRelative = `.prompt-kit/${temporaryName}`;
  await verifyIgnored(canonicalProject, normalizedTarget);
  await verifyIgnored(canonicalProject, temporaryRelative);
  return {
    projectRoot: canonicalProject,
    target: normalizedTarget,
    targetPath,
    targetKind,
    variable: normalizedVariable,
    temporaryPath: path.join(kitDirectory, temporaryName),
  };
}

async function atomicWrite(plan, contents) {
  let handle;
  try {
    handle = await open(plan.temporaryPath, "wx", 0o600);
    await handle.writeFile(contents);
    await handle.sync();
    await handle.close();
    handle = null;
    await chmod(plan.temporaryPath, 0o600);
    const currentKind = await pathKind(plan.targetPath);
    if (currentKind === "symlink") fail("symlink_target", `${plan.target} стал symlink во время записи. Изменение отменено.`);
    if (!new Set(["missing", "file"]).has(currentKind)) fail("invalid_target_type", `${plan.target} больше не является обычным файлом.`);
    try {
      await rename(plan.temporaryPath, plan.targetPath);
    } catch (error) {
      if (process.platform !== "win32" || !new Set(["EEXIST", "EPERM", "EACCES"]).has(error?.code)) throw error;
      await copyFile(plan.temporaryPath, plan.targetPath);
      await rm(plan.temporaryPath, { force: true });
    }
    await chmod(plan.targetPath, 0o600);
  } finally {
    if (handle) await handle.close().catch(() => {});
    await rm(plan.temporaryPath, { force: true }).catch(() => {});
  }
}

export async function storeSecret({ projectRoot = process.cwd(), target = ".env.local", variable, secret }) {
  const plan = await prepareSecretTarget({ projectRoot, target, variable });
  let existing = Buffer.alloc(0);
  if (plan.targetKind === "file") existing = await readFile(plan.targetPath);
  if (existing.length > MAX_ENV_BYTES) fail("env_too_large", `${plan.target} слишком большой для безопасного автоматического обновления.`);
  let encoded;
  try {
    encoded = encodeDotenvValue(secret);
    const updated = updateEnvText(existing, plan.variable, encoded);
    await atomicWrite(plan, Buffer.from(updated));
  } finally {
    if (Buffer.isBuffer(secret)) secret.fill(0);
    existing.fill(0);
    encoded = undefined;
  }
  return {
    status: "stored",
    variable: plan.variable,
    target: plan.target,
    valueExposed: false,
    restartMayBeRequired: true,
  };
}

export async function readHiddenInput({ input = process.stdin, output = process.stderr } = {}) {
  if (!input.isTTY || typeof input.setRawMode !== "function") {
    fail("interactive_tty_required", "Скрытый ввод недоступен в этой задаче. Откройте встроенный терминал и запустите помощник там.");
  }
  output.write("Вставьте ключ и нажмите Enter. Символы не отображаются: ");
  const bytes = [];
  const previousRaw = input.isRaw;
  input.setRawMode(true);
  input.resume();
  try {
    await new Promise((resolve, reject) => {
      const onData = (chunk) => {
        for (const byte of Buffer.from(chunk)) {
          if (byte === 3) {
            cleanup();
            reject(new SecretInputError("cancelled", "Ввод отменён. Ничего не сохранено."));
            return;
          }
          if (byte === 10 || byte === 13) {
            cleanup();
            resolve();
            return;
          }
          if (byte === 8 || byte === 127) {
            bytes.pop();
            continue;
          }
          bytes.push(byte);
          if (bytes.length > MAX_SECRET_BYTES) {
            cleanup();
            reject(new SecretInputError("secret_too_large", "Значение слишком большое. Ничего не сохранено."));
            return;
          }
        }
      };
      const cleanup = () => input.off("data", onData);
      input.on("data", onData);
    });
  } finally {
    input.setRawMode(Boolean(previousRaw));
    input.pause();
    output.write("\n");
  }
  const result = Buffer.from(bytes);
  bytes.fill(0);
  return result;
}

function usage() {
  return `Безопасная настройка application API key/token

Использование:
  node .prompt-kit/secret-input.mjs set --name VARIABLE [--file .env.local] [--project .]

Значение нельзя передавать аргументом команды. Помощник запросит его скрыто.`;
}

async function main() {
  const args = parseArguments(process.argv.slice(2));
  if (args.help || args._[0] === "help") {
    process.stdout.write(`${usage()}\n`);
    return;
  }
  const command = args._[0] ?? "set";
  if (command !== "set") fail("unknown_command", `Неизвестная команда: ${command}`);
  if (args.value || args.secret || args.token) fail("secret_argument_forbidden", "Не передавайте секрет в аргументах команды.");
  const projectRoot = path.resolve(args.project ?? process.cwd());
  const target = args.file ?? ".env.local";
  const variable = args.name;
  const plan = await prepareSecretTarget({ projectRoot, target, variable });
  process.stderr.write(`Безопасное место проверено: ${plan.target}, переменная ${plan.variable}.\n`);
  const secret = await readHiddenInput();
  const result = await storeSecret({ projectRoot, target, variable, secret });
  process.stdout.write(`${JSON.stringify(result)}\n`);
}

const invokedDirectly = process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;
if (invokedDirectly) {
  main().catch((error) => {
    const code = error instanceof SecretInputError ? error.code : "unexpected_error";
    process.stderr.write(`${JSON.stringify({ status: "blocked", code, message: error.message })}\n`);
    process.exitCode = 2;
  });
}
