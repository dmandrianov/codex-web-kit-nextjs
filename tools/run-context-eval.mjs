#!/usr/bin/env node

import { execFile, spawn } from "node:child_process";
import { cp, mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

const execFileAsync = promisify(execFile);
const toolsDirectory = path.dirname(fileURLToPath(import.meta.url));
const sourceRoot = path.resolve(toolsDirectory, "..");
const fixturePath = path.join(toolsDirectory, "fixtures/context-diet-scenarios.json");
const gateCodes = [
  "state-snapshot-only",
  "truth-claims",
  "one-block-at-a-time",
  "creator-render-critic",
  "responsive-evidence",
  "page-planning-first",
  "content-owner-before-cms",
  "ai-owner-no-cms-default",
  "commerce-readiness-first",
  "server-recheck-webhook-recovery",
  "verified-release-backup-rollback",
  "no-project-git",
  "quality-and-predeploy-seo-first",
  "external-ownership-needs-confirmation",
  "local-rule-priority",
  "safety-exceptions-win",
  "minimal-local-scope",
  "proportional-checks",
];

function parseArgs(argv) {
  const result = {};
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (!argument.startsWith("--")) throw new Error(`Unexpected argument: ${argument}`);
    const key = argument.slice(2);
    const value = argv[index + 1];
    if (!value || value.startsWith("--")) throw new Error(`Missing value for --${key}`);
    result[key] = value;
    index += 1;
  }
  for (const required of ["baseline", "candidate", "out"]) {
    if (!result[required]) throw new Error(`Missing --${required}`);
  }
  return result;
}

function outputSchema() {
  return {
    type: "object",
    additionalProperties: false,
    properties: {
      lane: {
        type: "string",
        enum: ["status", "direct", "staged", "cross-cutting"],
      },
      primary_prompt: {
        type: ["string", "null"],
      },
      files_to_load: {
        type: "array",
        items: { type: "string" },
      },
      full_references_before_render: {
        type: "array",
        items: { type: "string" },
      },
      local_rule_winner: {
        type: "string",
        enum: ["none", "npm", "pnpm", "other"],
      },
      gate_codes: {
        type: "array",
        items: {
          type: "string",
          enum: gateCodes,
        },
      },
      irrelevant_full_reference_loaded: {
        type: "boolean",
      },
      notes: {
        type: "string",
      },
    },
    required: [
      "lane",
      "primary_prompt",
      "files_to_load",
      "full_references_before_render",
      "local_rule_winner",
      "gate_codes",
      "irrelevant_full_reference_loaded",
      "notes",
    ],
  };
}

function projectState(scenario) {
  return [
    "# Project State",
    "",
    "## Current snapshot",
    "",
    `- Active evaluation fixture: ${scenario.projectFixture}`,
    "- Last updated: 2026-07-29",
    "",
    "## Latest completed result",
    "",
    "- Completed: only the prerequisites stated in the evaluation fixture",
    "- Evidence: treat the fixture statement as authoritative for this routing evaluation",
    "",
    "## Blockers and open decisions",
    "",
    "- Blockers: anything explicitly described as absent in the fixture",
    "",
    "## Recommended next prompt",
    "",
    "- Prompt: determine from the user's request and the fixture",
    "",
  ].join("\n");
}

function evaluationPrompt(scenario) {
  return [
    "This is a read-only Prompt Kit routing evaluation.",
    "Do not implement the request, edit files, run builds, use the network, or change any external state.",
    "Use the automatically loaded project instructions and only the minimum read-only project inspection those instructions require.",
    "Classify the request, choose only the current step, and return the exact project-relative primary prompt when a staged or cross-cutting prompt is required.",
    "For a direct/status request with no prompt file, return null.",
    "List the files the route requires, not every file that exists.",
    "full_references_before_render must contain only full/large reference bases that would actually be loaded before a first UI render.",
    "Choose all applicable gate_codes from the schema. The code names describe the protected behavior.",
    "If a safe project-local package-manager rule conflicts with a general npm preference, the more specific local rule should win.",
    "",
    `Project fixture: ${scenario.projectFixture}`,
    `User request: ${scenario.request}`,
  ].join("\n");
}

function normalizePrompt(value) {
  if (value === null) return null;
  return String(value).replaceAll("\\", "/").replace(/^\.?\//, "");
}

function grade(scenario, result) {
  const expectedPrompt = normalizePrompt(scenario.expectedPrimaryPrompt);
  const actualPrompt = normalizePrompt(result.primary_prompt);
  const expectedGates = scenario.expectedGateCodes ?? [];
  const missingGates = expectedGates.filter((gate) => !result.gate_codes.includes(gate));
  const localRulePass = scenario.id !== "local-rule-conflict" || result.local_rule_winner === "pnpm";
  const indexPass = !result.files_to_load.some((relative) => /(?:^|\/)INDEX\.md$/i.test(relative));
  const statusRouterPass =
    scenario.id !== "status" ||
    !result.files_to_load.some((relative) => /(?:^|\/)ROUTER\.md$/i.test(relative));
  const allowedReferences = {
    "small-copy": ["prompts/_knowledge/site-copy-quality.md"],
    "approved-hero": [
      "prompts/_knowledge/ui-design-quality.md",
      "prompts/_knowledge/ui-quality/marketing-commerce.md",
      "prompts/_knowledge/ui-quality/layout-spacing.md",
    ],
    "whole-page": ["prompts/_knowledge/ui-design-quality.md"],
    cms: ["prompts/_knowledge/nextjs-technical-baseline.md"],
    "production-seo-deploy": [
      "prompts/_knowledge/technical-seo-baseline.md",
    ],
  };
  const allowedForScenario = new Set(allowedReferences[scenario.id] ?? []);
  const unexpectedFullReferences = result.full_references_before_render.filter(
    (relative) => !allowedForScenario.has(normalizePrompt(relative)),
  );
  return {
    lanePass: result.lane === scenario.expectedLane,
    promptPass: actualPrompt === expectedPrompt,
    gatesPass: missingGates.length === 0,
    missingGates,
    localRulePass,
    relevantReferencePass:
      !result.irrelevant_full_reference_loaded &&
      unexpectedFullReferences.length === 0 &&
      indexPass &&
      statusRouterPass,
    pass:
      result.lane === scenario.expectedLane &&
      actualPrompt === expectedPrompt &&
      missingGates.length === 0 &&
      localRulePass &&
      !result.irrelevant_full_reference_loaded &&
      unexpectedFullReferences.length === 0 &&
      indexPass &&
      statusRouterPass,
  };
}

function usageFromJsonl(stdout) {
  let usage = null;
  for (const line of stdout.split(/\r?\n/)) {
    if (!line.trim()) continue;
    let event;
    try {
      event = JSON.parse(line);
    } catch {
      continue;
    }
    if (event.type === "turn.completed" && event.usage) usage = event.usage;
  }
  return usage;
}

function agentMessageFromJsonl(stdout) {
  let message = null;
  for (const line of stdout.split(/\r?\n/)) {
    if (!line.trim()) continue;
    let event;
    try {
      event = JSON.parse(line);
    } catch {
      continue;
    }
    if (
      event.type === "item.completed" &&
      event.item?.type === "agent_message" &&
      typeof event.item.text === "string"
    ) {
      message = event.item.text;
    }
  }
  if (message === null) throw new Error("Codex JSONL did not contain a final agent message");
  return message;
}

function runCodex(args, options) {
  return new Promise((resolve, reject) => {
    const child = spawn("codex", args, {
      cwd: options.cwd,
      env: process.env,
      stdio: ["pipe", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    const timeout = setTimeout(() => {
      child.kill("SIGTERM");
    }, options.timeout);
    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", (chunk) => {
      stdout += chunk;
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    child.on("error", (error) => {
      clearTimeout(timeout);
      reject(error);
    });
    child.on("close", (code, signal) => {
      clearTimeout(timeout);
      if (code === 0) {
        resolve({ stdout, stderr });
        return;
      }
      const error = new Error(
        signal
          ? `Codex terminated by ${signal}`
          : `Codex exited with status ${code}`,
      );
      error.stdout = stdout;
      error.stderr = stderr;
      reject(error);
    });
    child.stdin.end();
  });
}

async function prepareScenario(source, scenario, root) {
  const scenarioDirectory = path.join(root, scenario.id);
  await cp(source, scenarioDirectory, {
    recursive: true,
    force: true,
    preserveTimestamps: true,
  });
  await mkdir(path.join(scenarioDirectory, "docs"), { recursive: true });
  await writeFile(
    path.join(scenarioDirectory, "docs/project-state.md"),
    projectState(scenario),
  );
  if (scenario.id === "local-rule-conflict") {
    const agentsPath = path.join(scenarioDirectory, "AGENTS.md");
    const agents = await readFile(agentsPath, "utf8");
    await writeFile(
      agentsPath,
      `${agents.trimEnd()}\n\n## Project-specific context\n\n- Package manager: pnpm.\n- This safe local rule overrides a general npm preference.\n`,
    );
  }
  await execFileAsync("git", ["init", "-q", "-b", "main"], {
    cwd: scenarioDirectory,
  });
  return scenarioDirectory;
}

async function runOne({
  variant,
  source,
  scenario,
  evaluationRoot,
  schemaPath,
}) {
  const variantRoot = path.join(evaluationRoot, variant);
  await mkdir(variantRoot, { recursive: true });
  const scenarioDirectory = await prepareScenario(
    source,
    scenario,
    variantRoot,
  );
  const args = [
    "exec",
    "--ephemeral",
    "--sandbox",
    "read-only",
    "--ignore-user-config",
    "--output-schema",
    schemaPath,
    "--json",
    "-c",
    'model_reasoning_effort="low"',
    "-C",
    scenarioDirectory,
    evaluationPrompt(scenario),
  ];
  const startedAt = Date.now();
  const { stdout, stderr } = await runCodex(args, {
    cwd: sourceRoot,
    timeout: 120_000,
  });
  const result = JSON.parse(agentMessageFromJsonl(stdout));
  return {
    variant,
    scenario: scenario.id,
    request: scenario.request,
    durationMs: Date.now() - startedAt,
    usage: usageFromJsonl(stdout),
    result,
    grade: grade(scenario, result),
    stderr: stderr.trim(),
  };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const baseline = path.resolve(options.baseline);
  const candidate = path.resolve(options.candidate);
  const output = path.resolve(options.out);
  const fixture = JSON.parse(await readFile(fixturePath, "utf8"));
  const scenarios = options.scenario
    ? fixture.scenarios.filter((scenario) => scenario.id === options.scenario)
    : fixture.scenarios;
  if (scenarios.length === 0) {
    throw new Error(`Unknown --scenario ${options.scenario}`);
  }
  const evaluationRoot = await mkdtemp(path.join(tmpdir(), "web-kit-context-eval-"));
  const schemaPath = path.join(evaluationRoot, "output-schema.json");
  await writeFile(schemaPath, `${JSON.stringify(outputSchema(), null, 2)}\n`);
  const results = [];

  try {
    for (const scenario of scenarios) {
      for (const [variant, source] of [
        ["baseline", baseline],
        ["candidate", candidate],
      ]) {
        process.stdout.write(`START ${variant} ${scenario.id}\n`);
        try {
          const result = await runOne({
            variant,
            source,
            scenario,
            evaluationRoot,
            schemaPath,
          });
          results.push(result);
          process.stdout.write(
            `DONE ${variant} ${scenario.id} pass=${result.grade.pass} input=${result.usage?.input_tokens ?? "unknown"}\n`,
          );
        } catch (error) {
          results.push({
            variant,
            scenario: scenario.id,
            request: scenario.request,
            error: error instanceof Error ? error.message : String(error),
            stdout: error?.stdout ?? "",
            stderr: error?.stderr ?? "",
            grade: { pass: false },
          });
          process.stdout.write(`FAIL ${variant} ${scenario.id}\n`);
        }
      }
    }

    let previousResults = [];
    try {
      const previous = JSON.parse(await readFile(output, "utf8"));
      if (Array.isArray(previous.results)) previousResults = previous.results;
    } catch (error) {
      if (error?.code !== "ENOENT") throw error;
    }
    const merged = new Map();
    for (const item of [...previousResults, ...results]) {
      merged.set(`${item.variant}:${item.scenario}`, item);
    }
    const mergedResults = [...merged.values()].sort((left, right) => {
      const scenarioOrder =
        fixture.scenarios.findIndex((item) => item.id === left.scenario) -
        fixture.scenarios.findIndex((item) => item.id === right.scenario);
      if (scenarioOrder !== 0) return scenarioOrder;
      return left.variant.localeCompare(right.variant, "en");
    });
    const candidateResults = mergedResults.filter(
      (result) => result.variant === "candidate",
    );
    const baselineResults = mergedResults.filter(
      (result) => result.variant === "baseline",
    );
    const sumInput = (items) =>
      items.reduce(
        (total, item) => total + (item.usage?.input_tokens ?? 0),
        0,
      );
    const report = {
      schemaVersion: 1,
      generatedAt: new Date().toISOString(),
      codexVersion: (
        await execFileAsync("codex", ["--version"], { encoding: "utf8" })
      ).stdout.trim(),
      fixture: path.relative(sourceRoot, fixturePath),
      baselineRevision: fixture.baselineRevision,
      summary: {
        candidatePassed: candidateResults.filter((item) => item.grade.pass)
          .length,
        candidateTotal: candidateResults.length,
        baselinePassed: baselineResults.filter((item) => item.grade.pass)
          .length,
        baselineTotal: baselineResults.length,
        candidateInputTokens: sumInput(candidateResults),
        baselineInputTokens: sumInput(baselineResults),
      },
      results: mergedResults,
    };
    await mkdir(path.dirname(output), { recursive: true });
    await writeFile(output, `${JSON.stringify(report, null, 2)}\n`);
    process.stdout.write(
      `SUMMARY candidate=${report.summary.candidatePassed}/${report.summary.candidateTotal} baseline=${report.summary.baselinePassed}/${report.summary.baselineTotal}\n`,
    );
    if (report.summary.candidatePassed !== report.summary.candidateTotal) {
      process.exitCode = 1;
    }
  } finally {
    const safePrefix = path.join(tmpdir(), "web-kit-context-eval-");
    if (!evaluationRoot.startsWith(safePrefix)) {
      throw new Error(`Refusing to remove unexpected temp path: ${evaluationRoot}`);
    }
    await rm(evaluationRoot, { recursive: true, force: true });
  }
}

await main();
