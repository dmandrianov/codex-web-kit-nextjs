# Prompt Kit Context Loading Architecture

## Status

- Target version: `0.10.0`
- Initiative: context diet without quality loss
- Current phase: compact bootstrap, Router, state, reference split and deterministic gates implemented; disposable-project smoke pending
- Public runtime/API impact: none
- Distribution: source-repository documentation only; this file is not part of the copied Prompt Kit payload

## Goal

Keep the staged Prompt Kit workflow, safety gates and quality standards while reducing the amount of unrelated instruction text that competes with the current task.

The refactor changes when a rule is loaded, not whether an important rule exists.

## Context layers

### `always`

Small durable instructions that must be visible before any repository work:

- identify the request lane;
- respect project-local instructions;
- preserve truth, permissions, secrets and destructive-action boundaries;
- perform only the current step;
- use the short human-response contract;
- enter Prompt Kit maintenance through the safe maintenance prompt before writes.

The managed `AGENTS.md` block has a hard source budget of `10240` bytes. Together with a `12288`-byte project-local fixture and normal markers, the full project instruction chain must remain below the default `32768`-byte Codex project-instruction limit.

### `route`

Instructions needed only after the request has been classified:

- the current website stage and its next prompt;
- design creator/critic workflow;
- CMS and Next.js architecture;
- e-commerce operations and payment safety;
- technical SEO and deployment;
- content/article workflows;
- Prompt Kit update, integrity, alignment and release work.

Only one primary prompt and at most one necessary supporting prompt are loaded for the current step.

### `reference`

Large knowledge bases used to select a few criteria or to review an existing result:

- UI quality rules;
- site-copy checks;
- contemporary visual direction;
- anti-slop and page rhythm;
- Next.js and technical SEO baselines;
- examples and full compliance checklists.

Before a first render, a creator may load a dispatcher plus at most two relevant UI modules. Full relevant checks remain available for critic or quality work, but unrelated modules stay unloaded.

### `local`

Context owned by a concrete website or by the local maintainer workspace:

- project-specific instructions outside the managed `AGENTS.md` block;
- `docs/project-state.md`;
- optional `docs/project-history.md`;
- project briefs, design documents, page specs and implementation evidence;
- local maintainer audits under ignored `docs/audits/`.

No project history is shipped in the Prompt Kit release. A website may maintain its own state and history only inside that website.

## Request lanes

| Lane | Use when | Initial context | Stage effect |
| --- | --- | --- | --- |
| `status` | The user asks what is ready, blocked or next | Short current-state snapshot | None |
| `direct` | A small local diagnosis or change does not require a website-stage transition | Affected files, local rules and relevant lightweight standard | Preserve current stage |
| `staged` | The request advances the website workflow | Current-state snapshot, compact Router, one selected prompt | Advance only after the prompt's `Done when` |
| `cross-cutting` | Update, CMS/architecture, e-commerce, article, SEO or deployment work has its own gate | Exact trigger route and its safety baseline | Preserve or update the website stage as defined by that route |

`INDEX.md` is a lookup catalog. It is not mandatory startup context. The full user-response standard is also a reference; its short contract lives in the `always` layer.

## Rule relocation ledger

No group may be removed before its destination and preservation evidence are recorded here.

| Current group | Target layer | Planned destination | Preservation evidence |
| --- | --- | --- | --- |
| Prompt Kit purpose and base Next.js stack | `always` | Compact managed `AGENTS.md` block | Managed-block marker and stack assertions |
| Human-response outcome/action contract | `always` + `reference` | Short contract in `AGENTS.md`; full examples in `codex-user-response-quality.md` | Response-contract assertions |
| Per-request loading algorithm | `always` | Four-lane bootstrap in `AGENTS.md` | Lane-selection tests |
| Website stage names and normal transitions | `route` | Compact `ROUTER.md` | Ten golden routing scenarios |
| Full prompt catalog | `reference` | `INDEX.md` | Broken-link and catalog coverage tests |
| Project-local instruction precedence | `always` + `local` | Compact `AGENTS.md`; local rules remain after the managed block | `12288`-byte sentinel fixture and real prompt-input check |
| One-step scope and confirmation for major transitions | `always` + `route` | Compact `AGENTS.md`; stage prompt `Follow-up` | Whole-page and stage-transition scenarios |
| Truth, claims and no invented business facts | `always` | Compact `AGENTS.md` | Copy, commerce and direct-fix scenarios |
| Secret, credential and destructive-action safety | `always` | Compact `AGENTS.md` plus profile-specific prompts | Maintenance and deployment scenarios |
| Prompt Kit update trigger and Git isolation | `always` + `route` | One safe entry rule in `AGENTS.md`; full contract in maintenance prompts | Update scenario and updater tests |
| Prompt Kit repository identity, attestation, backup and rollback | `route` | Maintenance prompts and updater | Existing release/security tests |
| Design context diet and creator → render → critic → self-fix | `route` | Creator/critic guideline and design/build prompts | Existing creator-contract tests |
| gpt-taste modes, checksum and continuity | `route` | gpt-taste integration and selected design/build prompts | Existing pinned-skill tests |
| Ordinary page-copy fast pass | `route` + `reference` | Compact copy dispatcher | Copy fast-lane tests |
| SEO article external-skill workflow | `route` | Article prompt and integration guideline | Existing article routing tests |
| UI hierarchy, composition, spacing and typography | `reference` | UI foundation and visual-language modules | Rule inventory plus UI module coverage |
| Controls, forms, tables, states and product UI | `reference` | UI controls/data module | Rule inventory plus form/data scenarios |
| Hero, offer, trust, feature and commerce UI | `reference` | UI marketing/commerce module | Hero and checkout scenarios |
| Responsive canvas, first paint and media behavior | `route` + `reference` | UI responsive/media module and affected build/quality prompts | Existing responsive assertions and smoke |
| Anti-patterns, critic process and full UI checklist | `reference` | UI critic/quality module | Critic and quality assertions |
| UI examples | `reference` | Examples-only module | Link and section coverage |
| CMS decision from the real editing workflow | `route` | Intake, technical architecture and Next.js baseline | CMS golden scenario and existing architecture tests |
| Next.js version/runtime/data/cache/security architecture | `route` + `reference` | Technical architecture prompt and Next.js baseline | Existing Next.js architecture tests |
| E-commerce source of truth, totals, webhook and recovery | `route` + `reference` | Commerce safety and review prompts | Checkout scenario and existing commerce tests |
| Technical SEO gates | `route` + `reference` | Technical SEO prompts and baseline | Deployment/SEO scenario and existing SEO assertions |
| Deployment access, env, runtime, SSL and rollback | `route` | Deployment prompts | Deployment scenario and safety assertions |
| Current project stage and next action | `local` | Compact `docs/project-state.md` inside each website | State budget and status-route scenario |
| Completed project history | `local` | Stage artifacts or optional `docs/project-history.md` inside that website | Lossless migration check when compaction is used |
| Source-maintainer measurements and iteration history | `local` | Ignored source `docs/project-state.md` and `docs/audits/` | Git-ignore and release-boundary checks |

## Compact project-state contract

The distributed `prompts/STATE.md` template will have an `8192`-byte hard budget and contain only:

- current stage, confidence and important flags;
- active page/block/task;
- latest completed result;
- blockers and open decisions;
- pointers to authoritative artifacts;
- installed kit version and alignment status;
- recommended next prompt and whether confirmation is required.

Large completion checklists are removed. Evidence remains in the actual artifacts and reviews. If a concrete website needs a chronological log, older state text is moved losslessly to `docs/project-history.md` in that website after a backup.

Routing reads the current snapshot first. History is read only to recover an older decision.

## UI and copy reference contract

The existing `ui-design-quality.md` path remains as a compact dispatcher. Its current rules move exactly once into these conceptual groups:

1. foundation and hierarchy;
2. layout and spacing;
3. visual language;
4. controls, forms and data;
5. marketing and commerce;
6. responsive and media;
7. critic and quality;
8. examples.

The original foundation category is split into two physical modules, `foundation-hierarchy.md` and `layout-spacing.md`, because their combined source exceeds the per-file budget. Each module has a `40960`-byte hard budget. The dispatcher names the minimum modules for creator, critic, local-fix and quality work.

The existing `site-copy-quality.md` path keeps the truth contract and fast pass within an `8192`-byte budget. Long-form and full quality checks move to a separate reference with a `40960`-byte budget, loaded only for long, critical, risky or explicit quality work.

Existing paths remain valid, and new modules are additive. This keeps the `0.10.0` migration non-breaking.

## Deterministic enforcement

`tools/context-diet.test.mjs` enforces the architecture without invoking a model:

- byte budgets for the managed block, Router, state, dispatchers and reference modules;
- both managed markers and a `12288`-byte local-rule fixture inside the documented default `32768`-byte instruction limit;
- route-specific loading with no mandatory INDEX or full reference bases;
- complete prompt payload coverage and concrete prompt-link resolution;
- exactly one destination for every former numbered UI section and copy rule group;
- ten golden requests with expected lane, primary prompt, relevant references and critical safety/quality gates;
- at least `60%` mandatory-context reduction for every ordinary golden route.

Both validation and release workflows run the context tests together with the existing release/security/updater suite. The deterministic harness does not replace the final fresh read-only Codex sessions or disposable-project smoke; those remain checkpoint 5 evidence.

## Release gates

The context-diet candidate is ready only when:

- the `AGENTS.md`, Router, state and module byte budgets pass;
- both managed markers and a local-rule sentinel are visible inside the default instruction limit;
- mandatory startup no longer requires the full INDEX or full reference bases;
- all prompt links resolve;
- every ledger row has an automated assertion or a named golden scenario;
- existing release, updater, security, creator/critic, Next.js, CMS, commerce and SEO tests pass;
- ten fresh-session scenarios choose the correct lane and preserve their critical gates;
- ordinary candidate routes use at least `60%` less mandatory context than the current baseline;
- disposable Bootini and Abgdeyka copies preserve local rules, project sources and update integrity.

## Implementation checkpoints

1. Inventory and baseline — documentation only.
2. Compact bootstrap and Router.
3. Compact state and split references.
4. Add deterministic budgets and golden scenario harness.
5. Run disposable-project smoke, rebuild reproducible artifacts and finish release metadata.

Each checkpoint is one local commit on `codex/context-diet-0.10`. Work stops for review after every checkpoint. Nothing is pushed, tagged, published or applied to a real website without the separately required authorization.
