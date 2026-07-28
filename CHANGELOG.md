# Changelog

## 0.8.0 - 2026-07-28

Added:

- Pinned external `seo-content-writer` integration for new SEO articles, blog posts and long-form search content without copying or modifying upstream files.
- Cross-cutting `prompts/_content/01-write-seo-article.md` route that preserves the current website stage.
- Preserved `v9.9.12` source identity, `SKILL.md` checksum and four required reference checksums.
- Lightweight native page-copy contract inspired by the useful transferable principles: direct answer before persuasion, heading-to-body promise, claim-to-evidence support, concrete entities, decision-state CTA and semantic closure.
- `Site copy fast pass` inside existing content preview and smoke-check, plus a headings-only page outline check.

Changed:

- Ordinary page copy now uses a two-tier review: a short required pass for normal blocks and the full check only for long, critical or risky text.
- Default output is one recommended draft; alternatives are created only for a real semantic choice.

Guardrails:

- Short hero, CTA, card, form and ordinary block copy continues to use the native site copy standard; the full external skill and article workflow are not invoked.
- Missing or mismatched `seo-content-writer` blocks the article route instead of silently falling back.
- External claims, statistics, dates, quotes and links require sources or `[needs source]`.

Migration:

- Follow the `0.8.0` section in `MIGRATIONS.md`. Existing website stages, approved copy and production UI remain valid. Ordinary page copy receives the fast native check on the next relevant task; the external article skill remains a separately installed pinned dependency.

## 0.7.0 - 2026-07-27

Added:

- Full external `gpt-taste` integration without copying or modifying upstream `SKILL.md`.
- Three explicit creator modes: `page` for a complete visual concept, `block` for one marketing/editorial section and `component` for a standalone expressive component with a specimen harness.
- Canonical source, pinned commit and SHA-256 preflight with a hard stop on missing or mismatched skill identity.
- `docs/design-system/gpt-taste-profile.md` contract and template for locked project identity/seed, used and available architectures, open RNG choices, motion and asset truth.
- Dedicated `prompts/08-block-build/00-gpt-taste-creative-build.md` route for block/component work.
- Direct standalone component spec route that does not require a fictional page plan.
- Explicit approval route that creates or updates profile memory only after the user accepts live evidence; rejected runs do not pollute continuity.

Changed:

- Style shortlist now selects `Creator engine: native / gpt-taste` explicitly; gpt-taste page concepts may use the full page-level skill contract in a disposable lab.
- Block specs, page planning and content preview carry creator engine, mode, profile locks and conditional build prompt.
- Creator-Critic workflow returns visual/composition findings to `$gpt-taste`; base directly owns only truth, accessibility, security, runtime and responsive-delivery fixes that do not redesign.
- Router, state, integrity and workflow alignment understand the three modes and continuity profile.

Guardrails:

- Original `gpt-taste/SKILL.md` is not vendored, summarized, edited or silently replaced by native creator behavior.
- Block/component scope loads the full skill but does not synthesize Nav, Hero, Footer, page AIDA shell, fake claims or CTA outside the approved spec.
- Dashboard, checkout, account, forms, data/business UI, local fixes, copy-only, quality, SEO, deployment and maintenance do not invoke gpt-taste automatically.
- Approved profile choices do not reroll in later block/component runs; randomness remains available only for unresolved scoped choices.

Migration:

- Follow the `0.7.0` section in `MIGRATIONS.md`. Existing UI and project stage remain unchanged. Use gpt-taste on the next eligible visual task only after an explicit route; create a continuity profile from approved evidence, never retroactively from guesses.

## 0.6.0 - 2026-07-16

Added:

- Native Responsive First Paint in `prompts/_knowledge/ui-design-quality.md`: the responsive canvas must be correct on the first visible frame, not repaired after hydration or mount.
- Project-level `First-render Responsive Delivery Contract` with CSS-first initial geometry, SSR/first-client invariant, justified measured exceptions, reserved media geometry, responsive asset sizing and font/loading stability.
- Fresh-load browser evidence that compares the early frame with the settled state at the configured mobile/reference/wide viewports.
- Closed subscriber distribution through a private GitHub Organization repository: subscribers are outside collaborators with role `Read`, while payment email and GitHub username are tracked outside source and release assets.
- Required `TERMS.md`, mapped to `.prompt-kit/TERMS.md`, which permits use and modification in subscriber-controlled and client projects and continued use of versions downloaded during an active subscription.
- Browser-authenticated GitHub CLI transport for remote updates without asking the user to paste a token.
- Mandatory GitHub immutable releases with signed release and local-asset attestation verification before extraction.

Changed:

- Design concept, layout rules and design-system review now reject a fixed reference artboard that is scaled or recomposed only after JavaScript loads.
- App Router and styling setup keep the initial route server-first, use CSS media/container queries for core geometry and reserve the outer box of measured client surfaces.
- Page/block specs carry initial-layout source, viewport dependency, media geometry/source role and first-frame checks into implementation.
- Fast/deep block build and quality gates inspect viewport-dependent render branches, hydration/layout snap, selected responsive media resources and loading roles.
- Public workflow/status documentation now matches the Sol-friendly design contract: selective `4-6` rule creator context, post-render critic, flexible content approval, provisional vocabulary and marketing chapters.
- Integrity and workflow alignment now regression-check the Creator-Critic Design Loop as well as the new first-render delivery contract.
- Remote update trust is anchored to a positive numeric repository ID embedded in the updater and repeated in manifests. Bootstrap/last-known full name may follow a GitHub rename/transfer redirect, but the canonical repository is accepted only with the same ID, private status and Organization owner.
- Release tooling treats null repository identity as local-diagnostic only and blocks strict publication until the final private Organization full name and numeric ID are configured.
- Publication now follows draft -> attach/verify all assets -> publish, then requires `immutable: true` and a valid signed release attestation.
- The publication workflow mints a short-lived token from a repository-scoped GitHub App with only `Administration: read` and `Contents: write`; subscriber credentials are never reused for release automation.

Guardrails:

- `window.innerWidth`, `matchMedia`, mount effects and resize listeners may support QA or interaction, but cannot choose the initial core mobile/desktop/wide layout.
- Full duplicate mobile/desktop DOM trees are not a default responsive strategy.
- Responsive media must not fetch one maximum 4K candidate on every viewport without a measured reason, and only actual critical first-viewport media receives early loading.
- A chart, canvas/3D or virtualized surface may measure real pixels only when its outer geometry is reserved before measurement and the exception is documented.
- The responsive extension does not restore the old always-on design checklist: concept and fast build stay lean before render, while full UI/copy/accessibility/runtime compliance stays in quality.
- Updater never requests, prints or stores GitHub credentials, never invokes `gh auth token`, and strips raw token variables from child processes; verified local archive mode remains independent of `gh`.
- Revoking repository access stops future releases before any project write but does not disable or remove versions downloaded during the active subscription. Standalone redistribution, resale, private repository/release URL sharing, archive sharing and credential sharing remain prohibited by TERMS.
- First install and remote update never execute code from an unverified archive: local TAR.GZ and `SHA256SUMS` must match the signed GitHub release attestation before extraction.
- Rename/transfer keeps working only while the numeric ID remains unchanged. A new repository ID requires a trusted migration and explicit confirmation; reusing the old slug for another repository safely blocks updates instead of switching sources.

Migration:

- Follow the `0.6.0` section in `MIGRATIONS.md`. Existing projects keep their current stage and UI; offer a targeted layout/foundation/browser refresh instead of an automatic redesign.
- Before publication, move the source to a private GitHub Organization repository, enable immutable releases, configure its numeric ID/full name, require browser-based `gh` login for subscribers and deliver `.prompt-kit/TERMS.md`. Existing user-project Git repositories remain untouched.

## 0.5.0 - 2026-07-16

Added:

- A release foundation for `dmandrianov/web-kit`: exact payload allowlist, versioned ZIP and tar.gz assets, `SHA256SUMS`, deterministic local builds and GitHub Actions validation.
- Installed metadata under `.prompt-kit/`, including a manifest with official file hashes, compatibility rules, release identity and safe update policies.
- A dependency-free updater that checks the latest stable GitHub Release, verifies the archive before extraction, plans every change, creates a backup and rolls back a failed transaction.
- Maintainer-only release prompt `prompts/_maintenance/05-release-prompt-kit.md` and public release/update documentation.
- New `prompts/_guidelines/creator-critic-design-workflow.md`: a compact `creator -> render -> critic -> self-fix -> quality` loop for visual concepts, new compositions and meaningful redesigns.
- A Design context diet that gives the creator approved visual evidence, real assets, the relevant design-system slice and only 4-6 task-specific quality rules before the first render.
- Explicit `stable vocabulary` versus `provisional expressive choices`, so a strong local composition can be explored without silently changing brand, interaction or accessibility semantics.

Changed:

- The phrases `обнови базу`, `обнови кит` and `обнови Prompt Kit` now route to the complete safe maintenance transaction: update, integrity check and workflow alignment.
- Release copies of `CHANGELOG.md`, `MIGRATIONS.md` and the version marker are namespaced under `.prompt-kit/`, so a website project's root documentation is never overwritten.
- Kit files use manifest baselines: unmodified official files may be replaced, local changes become conflicts, seed files are preserved and removals require an explicit release record.
- The source repository and the user's website repository are independent. Updates arrive as HTTPS release assets, not as nested Git repositories, remotes, pulls or pushes.
- Design-system, page-planning and block-build prompts now separate the creative pass from screenshot-based criticism. Full UI/copy/anti-slop compliance moves after a live render or to the quality stage instead of overloading the first composition attempt.
- Content approval confirms copy and general visual intent, not an unbuilt layout. Marketing composition may consider a small chapter of neighboring blocks, while product data, forms, checkout and business logic remain block-scoped.
- Visual checks now prioritize the first impression, one focal event, continuity with approved evidence and at most three high-impact findings before one coherent self-fix.

Guardrails:

- The updater has a hard path boundary and cannot write into `.git`, `docs`, `src`, `public`, package files, root Git settings or user-owned local prompts.
- `AGENTS.md` is updated only inside one valid `PROMPT_KIT` managed block; content outside the block is preserved.
- The first manifest-based transition from a legacy installation requires one explicit confirmation because older kits do not have a trustworthy per-file baseline. Later compatible updates are one-phrase operations.
- Local build and verification do not publish anything. Publication requires the closed `TERMS.md`, configured private Organization identity and separate authorization for commit, tag, push and GitHub Release creation.
- Publication runs only through a manually dispatched workflow for an existing verified tag; pushing a tag alone does not create a GitHub Release.
- Remote updates bind the manifest version, tag and source revision to the selected GitHub tag commit, and local archive application requires an explicit checksum file.
- The creator/critic simplification does not weaken truth, permissions, secret handling, accessibility or core product semantics; those remain hard boundaries in every pass.
- Existing approved designs are not invalidated and no page is rebuilt automatically merely to adopt the new creative workflow.

Migration:

- Follow the `0.5.0` section in `MIGRATIONS.md`. Existing project stages, code and documents do not roll back or refresh automatically; the creator/critic loop can start with the next genuinely visual task.

## 0.4.22 - 2026-07-16

Added:

- New `prompts/_knowledge/codex-user-response-quality.md`: an always-on standard for every user-visible Codex message, including diagnostics, progress updates, questions, blockers and final answers.
- A plain-language contract based on three questions: what happened, why it matters and what the user needs to do now.
- Practical translations for common internal terms, plus templates for diagnostics, completed work, blockers and natural copy-ready continuation commands.

Changed:

- `AGENTS.md` and `prompts/ROUTER.md` now require the human meaning first and move stage names, prompt paths, commands and raw statuses into a later service line.
- The technical `Output` section of a staged prompt is explicitly separated from the chat response: artifacts may stay technical, but the user message must explain their meaning in ordinary language.
- Diagnostic and completion formats now say what is ready, why it helps and whether the user needs to act.
- The next step is named as a human action; its internal prompt path no longer replaces the explanation.
- `prompts/_templates/prompt-template.md`, prompt anatomy, state guidance, public docs and maintenance checks carry the same response contract.

Guardrails:

- The standard does not replace `site-copy-quality.md`: one regulates Codex's messages, the other regulates text shown on the website.
- Internal reasoning, code and project documents may remain technically precise.
- Simple language must not become childish language, hide failed checks or remove important risks.
- Technical details remain available after the plain-language result or whenever the user asks for them.

Migration:

- Replace only the managed block in `AGENTS.md`, copy the new knowledge file and update router/template/public documentation listed in `MIGRATIONS.md`.
- Existing projects keep their current stage, artifacts and code. The new response style applies from the next message and requires no content, design or implementation rerun.

## 0.4.21 - 2026-07-16

Added:

- Unified Design Canvas in `prompts/_knowledge/ui-design-quality.md`: a canonical wide-screen rule that preserves hierarchy, density, alignment spines, focal weight, text measure and copy/CTA/media relationships above the reference desktop.
- Project-level `Desktop Canvas Contract` generated by `prompts/05-design-system/09-layout-and-responsive-rules.md`: reference CSS viewport, canvas roles/caps, inline gutters, stable invariants, expansion zones, height behavior and `hold / extend / recompose` modes.
- Default CSS viewport matrix: reference `1440x900`, interpolation `1920x1080`, wide guard `2560x1440` and applicable true-4K `3840x2160`.

Changed:

- Visual concept prototype, feedback, iteration and approval now include a canvas continuity gate plus mobile, reference-desktop and wide screenshot evidence; approval is blocked without a passing wide verdict.
- Visual North Star carries the approved desktop-canvas character without freezing future block layouts.
- Design-system review blocks `Design ready` when layout rules omit the canvas contract or wide-screen failure criteria.
- Next.js styling integration now creates shared stage/container primitives so blocks do not invent local `max-width` behavior.
- Page and block specs inherit canvas roles, wide-screen modes, stable invariants and declared expansion zones.
- Fast lane and block smoke now inspect mobile, `1440 CSS px` and a wide guard of at least `2560 CSS px`.
- Deep/concept/page-level visual QA requires `1440 / 1920 / 2560 CSS px`; `3840 CSS px` is required for true-4K/full-bleed/ultrawide targets or must have a reasoned skip. Uncontrolled wide stretch cannot pass.
- Page-level rhythm review uses reference and wide full-page screenshots and requires the full matrix before quality/handoff.

Guardrails:

- The viewport is measured in CSS pixels, for example with `window.innerWidth`; physical 4K resolution does not prove a 3840 CSS-pixel viewport because OS scaling may reduce it.
- Extra width may expand only declared gutters, stage/background, atmosphere, full-bleed media or task-driven data surfaces. Core text, forms, controls, cards, gaps and column relationships remain constrained after their project cap.
- The kit does not solve wide screens with global `zoom`, `transform: scale(...)` or unbounded `vw`/`vh`; `100vh` is not a default content-section height.
- The goal is stable composition and visual weight, not pixel-identical screenshots.

Migration:

- Replace the managed block in `AGENTS.md` and update the connected design-system, page-planning, block-build, quality, templates, router and public workflow docs.
- Existing projects do not roll back or redesign automatically. Offer a targeted `05/09` layout-rules refresh, then wire shared canvas primitives through `06/04` and apply the new wide guard on the next visible block.
- Existing approved concepts remain valid unless the wide canvas check reveals a real composition failure.

## 0.4.20 - 2026-07-15

Added:

- New `prompts/_knowledge/technical-seo-baseline.md`: a fact-safe baseline for route indexability, page metadata, H1-H6 hierarchy, canonical URLs, robots/noindex, `robots.txt`, `sitemap.xml`, JSON-LD, crawlable links, image alt behavior, HTTP statuses, redirects and production verification.
- New `prompts/13-technical-seo/01-pre-deploy-technical-seo.md`: a site-wide implementation and readiness gate after Quality passed and domain planning, before production deploy.
- New `prompts/13-technical-seo/02-production-seo-verification.md`: a live-origin verification gate after general post-deploy smoke, before monitoring/rollback and deployment handoff.
- New project-owned `docs/seo/` artifact lane with pre-deploy and production verification reports.

Changed:

- Deployment routing now requires `Technical SEO ready for deploy` after domain/DNS/SSL planning and before production deploy, unless the user explicitly approves a skip.
- General post-deploy verification now hands off to a dedicated production SEO check before monitoring and deployment handoff.
- `AGENTS.md`, router, index, state template, ownership rules, maintenance integrity/alignment prompts and public workflow docs now understand the `technical-seo` stage.
- Deployment prompts now consume SEO readiness reports and keep SSL issuance/renewal separate from SEO verification.
- Integrity scope now covers staged prompt folders `00-13` and requires the technical SEO knowledge base.

Guardrails:

- Technical SEO does not trigger keyword research, blog planning, content promotion or ranking promises.
- The kit rejects cargo-cult SEO defaults: `meta keywords`, fake `lastmod`, mandatory `priority/changefreq`, robots as a substitute for `noindex`, invented schema and hard character-count gates.
- Search Console and Yandex Webmaster ownership/submission changes require user confirmation; missing external access becomes an explicit user action rather than a fake pass.

Migration:

- Replace the managed block in `AGENTS.md` and copy the new knowledge file plus `prompts/13-technical-seo/`.
- Update router/index/state/ownership, connected deployment prompts and public workflow docs.
- Existing projects do not roll back automatically. If not deployed, offer the pre-deploy gate after domain planning. If already live, offer production SEO verification as a targeted refresh.

## 0.4.19 - 2026-07-14

Added:

- New `prompts/_templates/visual-north-star-template.md` for carrying an approved visual direction into page planning, block build and screenshot QA without freezing every block layout.
- Required post-build desktop/mobile eyes-check for visible marketing blocks, including comparison with approved concept/Hero and screenshot recheck after self-fix.

Changed:

- Design approval now creates `docs/design-system/visual-north-star.md` with approved evidence, 3-5 positive continuity anchors, creative freedom, visual quality target and no more than three real hard boundaries.
- Anti-slop contracts now start with positive visual direction and creative freedom. Long avoid-lists and automatic stylistic hard stops were removed.
- Page planning now separates technical risk from visual risk, treats visual pattern budgets as observational instead of quota-based and preserves continuity before novelty.
- Block content preview approves copy and high-level visual intent, not an unbuilt final layout. A separate pre-build live HTML preview is not required unless the user asks for it or a major visual decision cannot be made otherwise.
- Fast lane now lets Codex choose composition, scale, whitespace, focal object and media treatment inside the approved North Star, then requires actual screenshot inspection and self-fix before handoff.
- Block smoke and visual screenshot review now test `same site`, focal point, visual energy, report/table smell and mobile character against approved visual evidence.
- Page-level eyes-check is required after every 3-4 implemented storytelling blocks to detect accumulated visual drift.
- Router, AGENTS, templates, README/workflow/status docs and Prompt Kit state now carry the Visual North Star workflow.

Evidence:

- Based on a controlled downstream-project audit: the same `gpt-5.6-sol` produced a strong Hero from an approved live concept and weaker downstream blocks from over-constrained prose contracts.

Migration:

- Replace the managed block in `AGENTS.md`.
- Copy the new Visual North Star template and update the connected design approval, page planning, block build and visual QA prompts.
- Existing projects do not need automatic redesign. Create a targeted Visual North Star from the already approved concept and use the new eyes-check on the next visible block.

## 0.4.18 - 2026-07-05

Added:

- New knowledge base: `prompts/_knowledge/contemporary-visual-direction.md` for modern visual direction, first-viewport visual events, media/image/video slots, icon/pictogram roles, motion intent and anti-2020 checks.

Changed:

- Design style shortlist now creates a `style hypothesis queue` with one `Prototype next` instead of pushing Codex to generate three HTML directions at once.
- Design concept prototypes now build one active concept per pass on two blocks, with a media/asset plan, temporary icon/pictogram direction, motion intent, currentness gate and anti-2020 smell check.
- Concept feedback can mark a direction as `rejected, try next hypothesis`; complete rejection routes back to the next queued hypothesis instead of cosmetic iteration.
- Concept iteration now refines one active concept only; it no longer asks for 2-3 variants inside the same pass.
- Approval, iconography and design-system review prompts carry media, temporary icon/pictogram and motion decisions forward before tokens/components.
- Block content preview, fast lane build, smoke-check and visual screenshot review now preserve contemporary visual checks so media/icons/motion do not disappear after concept approval.
- Router, AGENTS, README, workflow and prompt status docs now describe the one-concept design loop and contemporary visual standard.

Migration:

- Replace the managed block in `AGENTS.md`.
- Copy new file `prompts/_knowledge/contemporary-visual-direction.md`.
- Update `prompts/ROUTER.md`, `prompts/INDEX.md`, `prompts/README.md`, `prompts/STATE.md`, `prompts/05-design-system/02...07`, `prompts/05-design-system/12-design-system-review.md`, `prompts/05-design-system/_design-style-library.md`, `prompts/07-page-planning/07-block-content-preview.md`, `prompts/08-block-build/00-build-block-fast-lane.md`, `prompts/09-quality/00-block-smoke-check.md`, `prompts/09-quality/02-visual-screenshot-review.md`, shared guidelines and public docs.
- Existing approved design systems do not need automatic rollback. Apply the new loop when the current design direction feels outdated, generic, under-mediaed, iconless or rejected by the user.

## 0.4.17 - 2026-07-05

Changed:

- Strengthened router/AGENTS trigger rules so any visible UI task uses `prompts/_knowledge/ui-design-quality.md` and any user-facing copy task uses `prompts/_knowledge/site-copy-quality.md`.
- Expanded copy triggers beyond landing text: button labels, navigation labels, form labels/placeholders/errors, empty/success/loading states, product card text, checkout microcopy, metadata and SEO snippets now require `Site copy check`.
- Updated block content preview, fast lane build, block build review, block smoke-check, quality preflight, visual review and quality summary so UI and copy bases are checked together when a task touches both interface and text.
- Added Site copy checks to interaction/states and accessibility/usability passes where labels, errors, help text or state copy are reviewed.
- Added UI quality and Site copy notes to e-commerce PLP, product card, PDP, filters/search/sorting, cart and checkout specs.
- Updated shared guidelines, README/workflow/status docs and maintenance artifacts to document the stricter trigger behavior.

Migration:

- Replace the managed block in `AGENTS.md`.
- Update `prompts/ROUTER.md`, `prompts/INDEX.md`, `prompts/README.md`, shared guidelines and key `07-page-planning`, `08-block-build` and `09-quality` prompts.
- Update key `11-ecommerce` prompts that define visible catalog, cart and checkout UI/copy.
- Update `README.md`, `docs/workflow.md`, `docs/prompt-status.md`, `PROMPT_KIT_VERSION.md`, `CHANGELOG.md`, `MIGRATIONS.md` and maintenance docs.
- Existing project pages do not need automatic rewrite or redesign. Apply the stricter triggers when the next task touches visible UI or user-facing copy.

## 0.4.16 - 2026-07-05

Changed:

- Expanded `prompts/_knowledge/ui-design-quality.md` with a standalone practical before/after examples section.
- Added original bad/better UI scenarios for hero, shippable scope, grayscale hierarchy, personality knobs, page rhythm, spacing/grouping, fixed/fluid widths, typography, baseline, font fallback, color/contrast, depth, cards, buttons, controls, forms, tables, lists, trust/proof, feature sections, SaaS dashboards, e-commerce media, responsive behavior and anti-slop fixes.
- Updated router/docs/prompts so design-system review, block content preview, block build and visual review can use relevant before/after examples as calibration, not only abstract criteria.
- Added `Relevant before/after example checked` to the UI quality check.

Migration:

- Replace the managed block in `AGENTS.md`.
- Update `prompts/_knowledge/ui-design-quality.md`.
- Update UI quality criteria in router/index/docs and key design/page/build/quality prompts.
- Existing projects do not need automatic redesign. Apply before/after examples when revisiting weak blocks, generic-looking sections, confusing forms/tables, pricing, dashboards, e-commerce grids or responsive issues.

## 0.4.15 - 2026-07-05

Changed:

- Deepened `prompts/_knowledge/ui-design-quality.md` after a third UX/UI gap pass with parallel reviewer lenses.
- Added production-grade UI checks for shippable scope, grayscale hierarchy, personality as concrete UI knobs, fixed-vs-fluid width decisions, grid-as-alignment, ambiguous grouping, spacious-first workflow and separation escalation.
- Added typography rules for semantic vs visual hierarchy, mixed-inline baseline alignment, text alignment discipline, font fallback/readiness and letter-spacing policy.
- Added color/depth rules for muted text on colored surfaces, tint-vs-solid priority, perceived-brightness tuning, accent rails, two-layer shadows, flat depth and optical weight.
- Added controls/data/media rules for action severity vs priority, native-control polish, contextual link treatment, structured menus, rich table cells, semantic list markers, chart color-independence, dead chrome in empty states, intended media size, user-provided media containment and visual calibration.
- Expanded `UI quality check` and key design/page/build/quality prompts to apply the new criteria.

Migration:

- Replace the managed block in `AGENTS.md`.
- Update `prompts/_knowledge/ui-design-quality.md`.
- Update UI quality criteria in router/index, design-system review, block content preview, fast build and visual screenshot review.
- Existing projects do not need automatic redesign. Apply the expanded checks when a block feels stretched, generic, visually correct but still slightly amateur, or too dependent on color/decor.

## 0.4.14 - 2026-07-05

Changed:

- Deepened `prompts/_knowledge/ui-design-quality.md` after a second practical UX/UI gap pass.
- Added stronger guidance for feature-first design, de-emphasis, label economy, primary scan lines, optical spacing, hand-tuned type scale, line-height roles, color scales, neutral temperature, restrained bright accents, light-source depth, pressed/selected/inset states, important-choice controls and custom-control state safety.
- Added practical rules for media treatment, text-over-image contrast, screenshot/photo consistency, empty/loading/error/disabled states, edge-case polish and purposeful micro-interactions.
- Expanded `UI quality check` with de-emphasis, color scale roles, media treatment, suitable controls, states and realistic-content polish checks.
- Updated routing/docs/prompts so design-system, page-planning, block-build and quality flows apply the richer UI quality standard.

Migration:

- Replace the managed block in `AGENTS.md`.
- Update `prompts/_knowledge/ui-design-quality.md`.
- Update design-system, page-planning, block-build and quality prompts that list UI quality criteria.
- Existing projects do not need automatic redesign. Apply the stronger checks when revisiting a design system, a visually important block, a built UI, or a generic-looking AI design.

## 0.4.13 - 2026-07-04

Added:

- New standalone knowledge base: `prompts/_knowledge/ui-design-quality.md`.
- Practical UI standard for visual hierarchy, layout/composition, spacing, typography, color/contrast, depth, cards/containers, buttons/CTA, controls, forms, lists/tables, hero, pricing, trust/proof, feature sections, SaaS/dashboard UI, e-commerce UI, responsive behavior, AI UI anti-patterns and `UI quality check`.

Changed:

- `AGENTS.md`, `prompts/ROUTER.md` and `prompts/INDEX.md` now route UI design, visual review, quality pass and AI-slop fixes to the new UI design quality standard.
- Design-system prompts now use UI quality criteria before tokens/layout/components are considered ready.
- Page-planning prompts now carry UI quality notes into page specs, reference adaptation, block breakdown, planning review and block content preview.
- Block-build prompts now check UI quality during fast lane and deep-mode passes.
- Quality prompts now include UI quality smoke/review criteria, especially visual hierarchy, main action, spacing, typography, contrast, cards/containers, controls/forms/tables and mobile hierarchy.
- README, workflow and prompt-status docs now document the new standard.

Migration:

- Replace the managed block in `AGENTS.md`.
- Copy `prompts/_knowledge/ui-design-quality.md`.
- Update references in router/index, design-system, page-planning, block-build, quality prompts, guidelines, README/docs, changelog, migrations and version file.
- Existing projects do not need automatic redesign. Apply `UI quality check` when revisiting the current page/block, design-system review or visual QA.

## 0.4.12 - 2026-07-04

Changed:

- Renamed the public copy knowledge base to `prompts/_knowledge/site-copy-quality.md`.
- Rebuilt the document as a standalone Prompt Kit site-copy standard: hero/offer, lead, CTA, proof, cards, pricing, FAQ, about, long explanatory blocks and `Site copy check`.
- Removed external book/method/source references, old method labels and temporary extracted-source artifacts from the kit.
- Updated router, prompts, README/docs, changelog and migrations to use neutral Prompt Kit terminology.

Migration:

- Replace the managed block in `AGENTS.md`.
- Delete the previous public-copy knowledge file if it exists.
- Copy `prompts/_knowledge/site-copy-quality.md`.
- Update all references from the old public-copy knowledge file to the new one.
## 0.4.11 - 2026-07-04

Changed:

- Deepened `prompts/_knowledge/site-copy-quality.md` after a practical site-copy gap pass.
- Added missing copy principles: text goal vs text tasks, copy cannot compensate for weak product/proof, fair fact selection, commas/lists as a symptom of overload, and writing to the recipient's actual question.
- Expanded `prompts/07-page-planning/07-block-content-preview.md` so content preview checks these principles before public block copy is approved.

Migration:

- Replace the managed block in `AGENTS.md`.
- Update `prompts/_knowledge/site-copy-quality.md` and `prompts/07-page-planning/07-block-content-preview.md`.
- Existing copy does not need automatic rollback. Apply the expanded check to current/problematic blocks.

## 0.4.10 - 2026-07-04

Changed:

- Expanded `prompts/_knowledge/site-copy-quality.md` with practical bad/good examples for the main principles, editor passes and website blocks.
- Added examples for truth, meaning vs form, benefit/risk removal, simplification, empty phrases replaced with facts, respect/care, information density, understandable facts, sensory experience, didactics, honest headings, product scenarios, hero, H2, cards, CTA, proof, about, pricing, FAQ and common AI-copy weak spots.

Migration:

- Replace the managed block in `AGENTS.md`.
- Update `prompts/_knowledge/site-copy-quality.md`.
- No workflow changes; existing projects can use the richer examples the next time they write or revise public copy.

## 0.4.9 - 2026-07-04

Changed:

- Deepened `prompts/_knowledge/site-copy-quality.md` after a second practical copy-quality pass.
- Added missing layers: information density, sensory experience, didactic explanation, understandable facts, honest headings outside context, and product storytelling through details/scenarios/proof/limitations.
- Expanded the block content preview `Site copy check` so Codex catches not only unsupported claims, but also overloaded sentences, abstract claims, unclear facts and unbalanced proof/limitations.

Migration:

- Replace the managed block in `AGENTS.md`.
- Update `prompts/_knowledge/site-copy-quality.md` and `prompts/07-page-planning/07-block-content-preview.md`.
- Existing content previews do not need automatic invalidation. Apply the stronger check when revisiting public copy.

## 0.4.8 - 2026-07-04

Added:

- New knowledge base: `prompts/_knowledge/site-copy-quality.md`, as a standalone Prompt Kit standard for website copy.
- Site copy check for public copy: truth, user benefit/risk removal, empty phrases replaced with facts, weak/generic phrases, readable syntax, CTA action, voice/person and open facts.

Changed:

- `AGENTS.md` and `ROUTER.md` now require the site-copy quality standard for public copy, editorial rules, content preview and rewrite tasks.
- Strategy now uses the knowledge base when creating `docs/content/editorial-rules.md`.
- Content/SEO plan now records site copy notes per section.
- Block content preview now includes a `Site copy check` table before approval.

Migration:

- Replace the managed block in `AGENTS.md`.
- Copy `prompts/_knowledge/site-copy-quality.md`.
- Update `prompts/INDEX.md`, `prompts/README.md`, `prompts/ROUTER.md`, `prompts/STATE.md`, strategy/content/page-planning prompts and public README docs.
- Existing projects do not need to rerun all content. Offer an optional refresh for the next/current public-copy block using `prompts/07-page-planning/07-block-content-preview.md`.

## 0.4.7 - 2026-07-04

Added:

- New shared guideline: `prompts/_guidelines/page-composition-rhythm.md`.
- Lightweight page-level composition checks for page planning, block content preview, fast lane build and block smoke-check.
- Token/color lock and iconography lock rules so Codex does not invent new colors, shadows, radii or icon packs inside a block.
- Visual pattern budget for repeated section forms: dark slabs, numbered rows, card grids, artifact/mock UI, big display headings and accent dots.

Changed:

- `AGENTS.md` now requires page composition/rhythm checks for design, page planning, block build and quality tasks.
- Page planning now records page story, composition roles and visual pattern budget before block build.
- Fast lane and smoke-check now check neighbor rhythm, token/color lock and iconography lock without turning every block into deep QA.
- Design-system layout/review prompts now require composition/rhythm rules before `Design ready`.

Migration:

- Replace the managed block in `AGENTS.md`.
- Copy `prompts/_guidelines/page-composition-rhythm.md`.
- Update `prompts/INDEX.md`, `prompts/STATE.md`, design-system prompts, page-planning prompts, fast lane, smoke-check and templates.
- Existing projects do not need to roll back. Offer an optional refresh: run page-planning review or current block content preview to add page story, visual pattern budget and token/icon lock before continuing.

## 0.4.6 - 2026-07-03

Changed:

- Strengthened block content preview with a pain-first human check before code.
- Added voice/person selection so author-led sites do not accidentally sound like third-person press releases.
- Added rules for CTA support lines: use real user situations/questions unless facts are needed as proof.
- Expanded landing copy formulas with weak-wording rewrites for internal terminology, copywriter metaphors and technical value claims.

Migration:

- Replace the managed block in `AGENTS.md`.
- Update `prompts/_guidelines/landing-copy-formulas.md`, `prompts/07-page-planning/07-block-content-preview.md`, `prompts/_guidelines/anti-ai-slop-design-and-copy.md` and block spec templates.
- Existing projects can keep current previews; apply the stronger check when revisiting a block or drafting the next one.

## 0.4.5 - 2026-07-03

Added:

- Block content preview before implementation: `prompts/07-page-planning/07-block-content-preview.md`.
- Landing copy formulas guideline: `prompts/_guidelines/landing-copy-formulas.md`.
- Project state checkboxes for `Current block content preview drafted` and `Current block content preview approved`.

Changed:

- Router now sends meaningful/public-copy blocks to content preview before fast lane build.
- Fast lane now refuses to invent heading/lead/CTA for meaningful blocks unless preview is approved or user explicitly skips text approval.
- Content/SEO plan and block specs now carry user questions and copy formula candidates.

Migration:

- Replace the managed block in `AGENTS.md`.
- Copy `prompts/_guidelines/landing-copy-formulas.md` and `prompts/07-page-planning/07-block-content-preview.md`.
- Update `prompts/ROUTER.md`, `prompts/INDEX.md`, `prompts/STATE.md`, page-planning prompts, fast lane and templates.
- Existing projects in block-build should add an optional refresh: run content preview for the current/next block before continuing implementation.

## 0.4.4 - 2026-07-03

Added:

- Shared guideline: `prompts/_guidelines/anti-ai-slop-design-and-copy.md`.
- Editorial output from strategy: `docs/content/editorial-rules.md`.
- Text density budgets in content planning, page specs and block specs.
- Anti-AI-slop checks in design direction, design-system review, fast block build, smoke-check and visual review.

Changed:

- `AGENTS.md` now tells Codex to apply anti-slop/copy-density rules for design, content, page planning, block build and quality.
- Strategy now creates editorial rules, not only strategy and messaging.
- Block build and quality now check generic AI look, decorative noise and copy overload.

Migration:

- Replace the managed block in `AGENTS.md`.
- Copy `prompts/_guidelines/anti-ai-slop-design-and-copy.md`.
- Update strategy, design-system, page-planning, block-build, quality prompts and templates.
- Existing projects can add `docs/content/editorial-rules.md` retroactively before the next page/block planning pass.

## 0.4.3 - 2026-07-03

Added:

- Iconography step after approved design direction: `prompts/05-design-system/07-iconography-system.md`.
- New design-system artifact: `docs/design-system/iconography.md`.
- Project state checkboxes for `Icon pack shortlisted`, `Icon pack approved` and `Iconography rules defined`.

Changed:

- Design tokens moved to `prompts/05-design-system/08-design-tokens.md`.
- Layout, UI components, accessibility and design-system review moved to `09...12`.
- Router now sends approved design direction to iconography before tokens.
- Next.js styling integration, page planning and block build prompts now read `docs/design-system/iconography.md`.

Migration:

- Replace the managed block in `AGENTS.md`.
- Copy the updated `prompts/05-design-system/` folder.
- Update `prompts/ROUTER.md`, `prompts/INDEX.md`, `prompts/STATE.md`, README and docs.
- Existing projects with a completed design system can either create `docs/design-system/iconography.md` retroactively from current implementation choices or accept this as an optional refresh before the next icon-heavy block.

## 0.4.2 - 2026-07-02

Changed:

- Design concept prototypes must be reviewed as a live HTML/CSS page, not as screenshot-only output.
- `prompts/05-design-system/03-design-concept-prototypes.md` now requires opening `design-lab/design-concepts/index.html` in the in-app Codex Browser when available, or in the system browser outside Codex.
- Feedback and iteration prompts now assume the user reviews the same live preview page; iterations update and refresh that page.

Migration:

- Replace the managed block in `AGENTS.md`.
- Update `prompts/05-design-system/03-design-concept-prototypes.md`, `04-design-concept-feedback.md`, `05-design-concept-iteration.md`.
- Existing screenshot folders can remain as QA evidence, but they should not be the primary review surface.

## 0.4.1 - 2026-06-30

Added:

- Post-update workflow alignment prompt: `prompts/_maintenance/04-align-project-after-kit-update.md`.
- Router rules that prevent completed project stages from being rolled back only because a new kit version added intermediate artifacts.
- Optional refresh offers after kit updates: Codex should propose useful reruns or upgrades to the user, but not execute them automatically.
- `Kit compatibility` and `Optional refresh offers` sections in `prompts/STATE.md`.

Changed:

- Update flow now runs: safe update -> integrity check -> workflow alignment.
- `AGENTS.md` managed block now requires alignment after Prompt Kit updates.
- Maintenance index and integrity prompt now include the alignment step.

Migration:

- Replace the managed block in `AGENTS.md`.
- Copy `prompts/_maintenance/04-align-project-after-kit-update.md`.
- Update `prompts/ROUTER.md`, `prompts/INDEX.md`, `prompts/STATE.md`, `CHANGELOG.md`, `MIGRATIONS.md` and `PROMPT_KIT_VERSION.md`.
- After updating an in-progress project, create `docs/prompt-kit-workflow-alignment.md`.

## 0.4.0 - 2026-06-30

Added:

- Design style library: `prompts/05-design-system/_design-style-library.md`.
- Visual concept stage for design system:
  - `prompts/05-design-system/02-design-style-shortlist.md`;
  - `prompts/05-design-system/03-design-concept-prototypes.md`;
  - `prompts/05-design-system/04-design-concept-feedback.md`;
  - `prompts/05-design-system/05-design-concept-iteration.md`;
  - `prompts/05-design-system/06-approve-design-direction.md`.
- Disposable prototype artifacts under `design-lab/design-concepts/`.
- Project state checkboxes for design shortlist, prototypes, feedback, iteration and approval.

Changed:

- Design tokens now start at `prompts/05-design-system/08-design-tokens.md` in the current kit and must follow approved concept or explicit skip.
- Layout, components, accessibility and review prompts are now `09...12` in the current kit.
- Router now prevents direct IA -> tokens flow.
- Updated `AGENTS.md`, router, index, state, workflow, stages, README and prompt status docs.

Migration:

- Replace the managed block in `AGENTS.md`.
- Copy the updated `prompts/05-design-system/` folder.
- Update `prompts/ROUTER.md`, `prompts/INDEX.md`, `prompts/STATE.md`, README and docs.
- Existing projects with an already approved `docs/design-system/design-direction.md` may either create `docs/design-system/concepts/approved-concept.md` retroactively or explicitly record that visual concept stage was skipped.

## 0.3.0 - 2026-06-30

Changed:

- Added fast lane for ordinary block implementation: `prompts/08-block-build/00-build-block-fast-lane.md`.
- Added quick block smoke-check: `prompts/09-quality/00-block-smoke-check.md`.
- Router now defaults simple/medium blocks to fast lane instead of the long multi-pass block/quality flow.
- Deep mode remains available for complex, critical or problematic blocks.
- Updated `AGENTS.md`, router, index, state, workflow and status docs.

Migration:

- Replace the managed block in `AGENTS.md`.
- Copy new `08/00` and `09/00` prompts.
- Update `prompts/ROUTER.md`, `prompts/INDEX.md`, `prompts/STATE.md`, README and docs.

## 0.2.0 - 2026-06-30

Added:

- `prompts/12-deployment/` with 11 prompts for deployment brief, SSH/server access, baseline security, runtime strategy, env/secrets, domain/DNS/SSL, deploy, process/proxy, post-deploy verification, monitoring/backup/rollback and deployment handoff.
- Deployment routing rules in `AGENTS.md` and `prompts/ROUTER.md`.
- Deployment artifacts in `prompts/STATE.md`.
- Root-password safety rule: do not store root password in docs and remind the user to change it after initial setup.

Migration:

- Replace the managed block in `AGENTS.md`.
- Copy new `prompts/12-deployment/`.
- Update router/index/state/docs from the new kit.

## 0.1.1 - 2026-06-30

Changed:

- Added mandatory `Следующий шаг` final response format after every meaningful prompt-step.
- Router now requires Codex to show next prompt, reason, confirmation requirement and suggested user command.
- Updated prompt template and prompt anatomy docs to preserve this behavior in future prompts.
- Updated managed block version in `AGENTS.md`.

Migration:

- Replace the managed block in `AGENTS.md`.
- Keep project-specific rules outside the managed block.

## 0.1.0 - 2026-06-30

Initial distributable Prompt Kit version.

Added:

- Router-based `AGENTS.md` with managed block markers.
- Self-contained `prompts/` folder with router, index, state rules and templates.
- Staged website workflow from intake to handoff.
- E-commerce layer before catalog, PLP, PDP, cart and checkout implementation.
- Maintenance layer for safe updates.

Notes:

- This version introduces the update ownership model.
- Future releases should document changed prompts, required migrations and compatibility notes here.
