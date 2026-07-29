import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const toolsDirectory = path.dirname(fileURLToPath(import.meta.url));
const sourceRoot = path.resolve(toolsDirectory, "..");
const DEFAULT_PROJECT_INSTRUCTION_LIMIT = 32 * 1024;
const LOCAL_RULE_FIXTURE_BYTES = 12 * 1024;
const BASELINE_MANDATORY_BYTES = 134_038;

const paths = {
  agents: "AGENTS.md",
  router: "prompts/ROUTER.md",
  state: "prompts/STATE.md",
  index: "prompts/INDEX.md",
  response: "prompts/_knowledge/codex-user-response-quality.md",
  uiDispatcher: "prompts/_knowledge/ui-design-quality.md",
  uiDirectory: "prompts/_knowledge/ui-quality",
  copyFast: "prompts/_knowledge/site-copy-quality.md",
  copyFull: "prompts/_knowledge/site-copy-quality-full.md",
};

const budgets = {
  managedAgents: 10_240,
  router: 16_384,
  state: 8_192,
  uiDispatcher: 8_192,
  uiModule: 40_960,
  copyFast: 8_192,
  copyFull: 40_960,
};

async function read(relative) {
  return readFile(path.join(sourceRoot, ...relative.split("/")), "utf8");
}

async function exists(relative) {
  try {
    await stat(path.join(sourceRoot, ...relative.split("/")));
    return true;
  } catch (error) {
    if (error?.code === "ENOENT") return false;
    throw error;
  }
}

function bytes(text) {
  return Buffer.byteLength(text, "utf8");
}

function extractManagedBlock(agents) {
  const begin = agents.indexOf("<!-- PROMPT_KIT:BEGIN");
  const marker = "<!-- PROMPT_KIT:END -->";
  const end = agents.indexOf(marker);
  assert.ok(begin >= 0, "managed begin marker is missing");
  assert.ok(end > begin, "managed end marker is missing or precedes begin");
  return agents.slice(begin, end + marker.length);
}

function localRuleFixture() {
  const sentinel = "LOCAL_RULE_SENTINEL: use pnpm for this website";
  const prefix = [
    "## Project-specific context",
    "",
    "- Package manager: pnpm.",
    "- This local rule is intentionally placed at the end of a 12 KiB fixture.",
    "",
  ].join("\n");
  const suffix = `\n${sentinel}`;
  const fillerBytes = LOCAL_RULE_FIXTURE_BYTES - bytes(prefix) - bytes(suffix);
  assert.ok(fillerBytes > 0);
  const fixture = `${prefix}${"x".repeat(fillerBytes)}${suffix}`;
  assert.equal(bytes(fixture), LOCAL_RULE_FIXTURE_BYTES);
  return { fixture, sentinel };
}

async function walkMarkdown(relativeDirectory) {
  const absoluteDirectory = path.join(sourceRoot, ...relativeDirectory.split("/"));
  const entries = await readdir(absoluteDirectory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const relative = `${relativeDirectory}/${entry.name}`;
    if (entry.isDirectory()) files.push(...(await walkMarkdown(relative)));
    else if (entry.isFile() && entry.name.endsWith(".md")) files.push(relative);
  }
  return files.sort((left, right) => left.localeCompare(right, "en"));
}

function occurrenceCount(text, pattern) {
  return [...text.matchAll(pattern)].length;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const scenarios = [
  {
    id: "status",
    request: "Что сейчас с проектом и что дальше?",
    lane: "status",
    primaryPrompt: null,
    prePromptFiles: [paths.agents, paths.state],
    referencesBeforeRender: [],
    forbidden: [paths.router, paths.index, paths.response, paths.uiDispatcher, paths.copyFull],
    evidence: [
      [paths.agents, ["`status`", "Прочитай только текущий снимок"]],
      [paths.state, ["Перед маршрутизацией читай только `docs/project-state.md`"]],
    ],
  },
  {
    id: "small-copy",
    request: "Замени короткий текст в готовом блоке, не меняя его смысл.",
    lane: "direct",
    primaryPrompt: null,
    prePromptFiles: [paths.agents, paths.copyFast],
    referencesBeforeRender: [paths.copyFast],
    forbidden: [paths.router, paths.index, paths.copyFull, paths.uiDispatcher],
    evidence: [
      [paths.agents, ["`direct`", "не загружай Router, INDEX и большие справочники"]],
      [paths.copyFast, ["## Короткий обязательный контракт", "## Site copy fast pass"]],
    ],
  },
  {
    id: "approved-hero",
    request: "Реализуй утверждённый hero-блок.",
    lane: "staged",
    primaryPrompt: "prompts/08-block-build/00-build-block-fast-lane.md",
    prePromptFiles: [paths.agents, paths.state, paths.router],
    referencesBeforeRender: [
      paths.uiDispatcher,
      "prompts/_knowledge/ui-quality/marketing-commerce.md",
      "prompts/_knowledge/ui-quality/layout-spacing.md",
      paths.copyFast,
    ],
    uiModulesBeforeRender: [
      "prompts/_knowledge/ui-quality/marketing-commerce.md",
      "prompts/_knowledge/ui-quality/layout-spacing.md",
    ],
    referencesAfterRender: ["prompts/_knowledge/ui-quality/critic-quality.md"],
    forbidden: [
      paths.index,
      paths.copyFull,
      "prompts/_knowledge/ui-quality/controls-forms-data.md",
      "prompts/_knowledge/ui-quality/examples.md",
    ],
    evidence: [
      [paths.router, ["обычный native block", "Просьба сверстать всю страницу не отменяет поблочную реализацию"]],
      [
        "prompts/08-block-build/00-build-block-fast-lane.md",
        ["После live render ты critic", "1440 CSS px", "2560 CSS px", "один focused self-fix"],
      ],
    ],
  },
  {
    id: "whole-page",
    request: "Сверстай сразу всю страницу, хотя page scope и block specs ещё не готовы.",
    lane: "staged",
    primaryPrompt: "prompts/07-page-planning/01-select-page-and-scope.md",
    prePromptFiles: [paths.agents, paths.state, paths.router],
    referencesBeforeRender: [],
    forbidden: [paths.index, paths.copyFull, paths.uiDispatcher],
    evidence: [
      [paths.router, ["До реализации страницы нужны page scope", "не отменяет поблочную реализацию без отдельного подтверждения риска"]],
      ["prompts/07-page-planning/01-select-page-and-scope.md", ["лучше выбрать один проблемный блок/экран"]],
    ],
  },
  {
    id: "cms",
    request: "Нужна ли проекту CMS?",
    lane: "cross-cutting",
    primaryPrompt: "prompts/06-nextjs-setup/02-technical-architecture.md",
    prePromptFiles: [paths.agents, paths.state],
    referencesBeforeRender: ["prompts/_knowledge/nextjs-technical-baseline.md"],
    forbidden: [paths.index, paths.uiDispatcher, paths.copyFull],
    evidence: [
      [paths.agents, ["Если владелец продолжает работать через Codex/ИИ", "CMS по умолчанию не нужна"]],
      [
        "prompts/06-nextjs-setup/02-technical-architecture.md",
        ["CMS status: not needed", "CMS status: needed", "preview, approval, publish"],
      ],
    ],
  },
  {
    id: "checkout",
    request: "Реализуй checkout, но e-commerce review ещё не проводился.",
    lane: "cross-cutting",
    primaryPrompt: "prompts/11-ecommerce/01-ecommerce-brief.md",
    prePromptFiles: [paths.agents, paths.state, paths.router],
    referencesBeforeRender: [],
    forbidden: [paths.index, paths.uiDispatcher, paths.copyFull],
    evidence: [
      [paths.router, ["Каталог, PDP, cart или checkout", "До UI закрыть operations/payment safety"]],
      [
        "prompts/11-ecommerce/12-ecommerce-review.md",
        ["server-side order recalculation", "signed webhook", "idempotency", "reconciliation"],
      ],
    ],
  },
  {
    id: "kit-update",
    request: "Обнови кит.",
    lane: "cross-cutting",
    primaryPrompt: "prompts/_maintenance/01-update-prompt-kit.md",
    prePromptFiles: [paths.agents],
    referencesBeforeRender: [],
    forbidden: [paths.index, paths.state, paths.uiDispatcher, paths.copyFull],
    evidence: [
      [paths.agents, ["→ integrity → alignment", "не меняй Git проекта"]],
      [
        "prompts/_maintenance/01-update-prompt-kit.md",
        ["immutable stable release", "сделать backup", "ничего не коммить"],
      ],
    ],
  },
  {
    id: "production-seo-deploy",
    request: "Подготовь готовый сайт к production deploy и проверь technical SEO.",
    lane: "cross-cutting",
    primaryPrompt: "prompts/13-technical-seo/01-pre-deploy-technical-seo.md",
    prePromptFiles: [paths.agents, paths.state, paths.router],
    referencesBeforeRender: ["prompts/_knowledge/technical-seo-baseline.md"],
    forbidden: [paths.index, paths.uiDispatcher, paths.copyFull],
    evidence: [
      [paths.router, ["Перед production deploy после Quality passed", "После deploy smoke"]],
      [
        "prompts/13-technical-seo/01-pre-deploy-technical-seo.md",
        ["Technical SEO ready for deploy", "Не меняй DNS, SSL или production server"],
      ],
    ],
  },
  {
    id: "local-rule-conflict",
    request: "Общий шаблон говорит npm, а локальное правило сайта требует pnpm.",
    lane: "direct",
    primaryPrompt: null,
    prePromptFiles: [paths.agents],
    referencesBeforeRender: [],
    forbidden: [paths.router, paths.index, paths.uiDispatcher, paths.copyFull],
    localOverride: { general: "npm", local: "pnpm", expected: "pnpm" },
    evidence: [
      [paths.agents, ["Более узкое локальное правило имеет приоритет", "truth, permissions, safety, secrets или accessibility"]],
    ],
  },
  {
    id: "small-code-fix",
    request: "Исправь небольшую ошибку в существующем компоненте.",
    lane: "direct",
    primaryPrompt: null,
    prePromptFiles: [paths.agents],
    referencesBeforeRender: [],
    forbidden: [paths.router, paths.index, paths.uiDispatcher, paths.copyFull],
    evidence: [
      [paths.agents, ["не загружай Router, INDEX и большие справочники", "Выполни проверки пропорционально риску"]],
    ],
  },
];

test("context budgets and project-local instruction visibility stay within the documented 32 KiB limit", async () => {
  const [agents, router, state, uiDispatcher, copyFast, copyFull] = await Promise.all([
    read(paths.agents),
    read(paths.router),
    read(paths.state),
    read(paths.uiDispatcher),
    read(paths.copyFast),
    read(paths.copyFull),
  ]);
  const managed = extractManagedBlock(agents);
  const { fixture, sentinel } = localRuleFixture();
  const instructionChain = `${agents.trimEnd()}\n\n${fixture}`;
  const visible = Buffer.from(instructionChain).subarray(0, DEFAULT_PROJECT_INSTRUCTION_LIMIT).toString("utf8");

  assert.ok(bytes(managed) <= budgets.managedAgents, `managed AGENTS is ${bytes(managed)} bytes`);
  assert.ok(bytes(router) <= budgets.router, `Router is ${bytes(router)} bytes`);
  assert.ok(bytes(state) <= budgets.state, `state template is ${bytes(state)} bytes`);
  assert.ok(bytes(uiDispatcher) <= budgets.uiDispatcher, `UI dispatcher is ${bytes(uiDispatcher)} bytes`);
  assert.ok(bytes(copyFast) <= budgets.copyFast, `copy fast reference is ${bytes(copyFast)} bytes`);
  assert.ok(bytes(copyFull) <= budgets.copyFull, `copy full reference is ${bytes(copyFull)} bytes`);
  assert.ok(bytes(instructionChain) <= DEFAULT_PROJECT_INSTRUCTION_LIMIT, `instruction fixture is ${bytes(instructionChain)} bytes`);
  assert.ok(visible.includes("PROMPT_KIT:BEGIN"), "managed begin marker is not visible");
  assert.ok(visible.includes("PROMPT_KIT:END"), "managed end marker is not visible");
  assert.ok(visible.includes(sentinel), "project-local rule sentinel is not visible");
});

test("all routed UI modules remain individually bounded and the dispatcher limits creator loading", async () => {
  const uiFiles = (await readdir(path.join(sourceRoot, paths.uiDirectory))).filter((name) => name.endsWith(".md")).sort();
  assert.equal(uiFiles.length, 8);
  for (const name of uiFiles) {
    const content = await read(`${paths.uiDirectory}/${name}`);
    assert.ok(bytes(content) <= budgets.uiModule, `${name} is ${bytes(content)} bytes`);
  }
  const dispatcher = await read(paths.uiDispatcher);
  assert.ok(dispatcher.includes("не более двух профильных модулей"));
  assert.ok(dispatcher.includes("Не загружай до render"));
  assert.ok(dispatcher.includes("Полный compliance остаётся quality stage"));
});

test("startup routing does not require INDEX or full reference bases for ordinary work", async () => {
  const [agents, router] = await Promise.all([read(paths.agents), read(paths.router)]);
  assert.ok(agents.includes("`prompts/INDEX.md` — справочный каталог"));
  assert.ok(agents.includes("Открывай его только при неоднозначном выборе"));
  assert.ok(agents.includes("не загружай Router, INDEX и большие справочники без причины"));
  assert.ok(agents.includes("Не загружай заранее будущие стадии и полные reference-базы"));
  assert.ok(router.includes("Большие knowledge bases — reference, а не обязательный startup"));
  assert.ok(router.includes("полный UI/copy/accessibility/responsive/technical compliance: quality stage"));
});

test("the split UI and copy references retain every former top-level rule group exactly once", async () => {
  const uiFiles = (await readdir(path.join(sourceRoot, paths.uiDirectory))).filter((name) => name.endsWith(".md"));
  const ui = (await Promise.all(uiFiles.map((name) => read(`${paths.uiDirectory}/${name}`)))).join("\n");
  for (let section = 1; section <= 22; section += 1) {
    assert.equal(occurrenceCount(ui, new RegExp(`^## ${section}\\. `, "gm")), 1, `UI section ${section} was lost or duplicated`);
  }
  assert.equal(occurrenceCount(ui, /^## UI quality check$/gm), 1);
  for (const marker of [
    "## First-render Responsive Delivery Contract",
    "## 5. Typography",
    "## 9. Buttons, CTA и controls",
    "## 12. Hero sections",
    "## 22. Практические before/after examples",
  ]) {
    assert.ok(ui.includes(marker), `UI rule group is missing: ${marker}`);
  }

  const copy = `${await read(paths.copyFast)}\n${await read(paths.copyFull)}`;
  for (const heading of [
    "Короткий обязательный контракт",
    "Общие правила сайта",
    "Hero и offer",
    "Lead и пояснение",
    "CTA и microcopy",
    "Trust/proof",
    "Cards",
    "Pricing",
    "FAQ",
    "About",
    "Long explanatory blocks",
    "Быстрый редакторский проход",
    "Site copy fast pass",
    "Полный редакторский чек",
    "Site copy check",
    "Важное ограничение",
  ]) {
    assert.equal(occurrenceCount(copy, new RegExp(`^## ${escapeRegExp(heading)}$`, "gm")), 1, `copy section was lost or duplicated: ${heading}`);
  }
});

test("all concrete prompt links resolve and the release payload covers the complete prompt library", async () => {
  const markdownFiles = [paths.agents, "docs/context-loading-architecture.md", ...(await walkMarkdown("prompts"))];
  for (const relative of markdownFiles) {
    const content = await read(relative);
    for (const match of content.matchAll(/`(prompts\/[A-Za-z0-9_./-]+\.md)`/g)) {
      assert.ok(await exists(match[1]), `${relative} links to missing ${match[1]}`);
    }
  }

  const payload = JSON.parse(await read("release/payload.json"));
  assert.deepEqual(
    [...payload.promptFiles].sort((left, right) => left.localeCompare(right, "en")),
    await walkMarkdown("prompts"),
  );
});

test("ten golden requests choose the expected lane, current prompt and only relevant references", async () => {
  const fixture = JSON.parse(await read("tools/fixtures/context-diet-scenarios.json"));
  assert.equal(fixture.schemaVersion, 1);
  assert.equal(fixture.baselineMandatoryBytes, BASELINE_MANDATORY_BYTES);
  assert.deepEqual(
    fixture.scenarios.map(({ id, request, expectedLane, expectedPrimaryPrompt }) => ({
      id,
      request,
      lane: expectedLane,
      primaryPrompt: expectedPrimaryPrompt,
    })),
    scenarios.map(({ id, request, lane, primaryPrompt }) => ({ id, request, lane, primaryPrompt })),
  );
  assert.equal(scenarios.length, 10);
  assert.equal(new Set(scenarios.map((scenario) => scenario.id)).size, scenarios.length);
  const agents = await read(paths.agents);

  for (const scenario of scenarios) {
    assert.ok(agents.includes(`\`${scenario.lane}\``), `${scenario.id} lane is not defined`);
    if (scenario.primaryPrompt) assert.ok(await exists(scenario.primaryPrompt), `${scenario.id} prompt is missing`);
    const loaded = new Set([
      ...scenario.prePromptFiles,
      ...(scenario.referencesBeforeRender ?? []),
      ...(scenario.referencesAfterRender ?? []),
      ...(scenario.primaryPrompt ? [scenario.primaryPrompt] : []),
    ]);
    for (const forbidden of scenario.forbidden) {
      assert.ok(!loaded.has(forbidden), `${scenario.id} loads irrelevant ${forbidden}`);
    }
    assert.ok((scenario.uiModulesBeforeRender ?? []).length <= 2, `${scenario.id} exceeds the pre-render UI module cap`);
    for (const [relative, markers] of scenario.evidence) {
      const source = await read(relative);
      for (const marker of markers) assert.ok(source.includes(marker), `${scenario.id} lost gate "${marker}" in ${relative}`);
    }
  }
});

test("ordinary golden routes reduce mandatory pre-prompt text by at least 60 percent", async () => {
  const ordinary = scenarios.filter((scenario) => ["status", "direct", "staged"].includes(scenario.lane));
  for (const scenario of ordinary) {
    let candidateBytes = 0;
    for (const relative of new Set(scenario.prePromptFiles)) candidateBytes += bytes(await read(relative));
    const reduction = 1 - candidateBytes / BASELINE_MANDATORY_BYTES;
    assert.ok(reduction >= 0.6, `${scenario.id} reduces only ${(reduction * 100).toFixed(1)}%`);
  }
});

test("project-local conflict evidence is visible after the managed block and keeps safety exceptions", async () => {
  const agents = await read(paths.agents);
  const { fixture, sentinel } = localRuleFixture();
  const chain = `${agents.trimEnd()}\n\n${fixture}`;
  const conflict = scenarios.find((scenario) => scenario.id === "local-rule-conflict");
  assert.ok(conflict);
  assert.equal(conflict.localOverride.expected, conflict.localOverride.local);
  assert.ok(chain.indexOf(sentinel) > chain.indexOf("PROMPT_KIT:END"));
  assert.ok(agents.includes("Более узкое локальное правило имеет приоритет"));
  assert.ok(agents.includes("truth, permissions, safety, secrets или accessibility"));
});
