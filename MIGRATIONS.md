# Migrations

This file describes changes that may require special handling when updating Prompt Kit inside an existing project.

## 0.10.1

Compatibility: non-breaking from `0.4.22+` and direct from `0.10.0`.

### Required

- Update only the managed block in `AGENTS.md` to version `0.10.1`; preserve everything outside it.
- Replace the blanket prohibition on storing application API keys/tokens with the scoped rule:
  - the user must explicitly request the configuration;
  - the target must be a verified untracked and Git-ignored `.env`/`.env.local` file or an authorized secret store;
  - the value must not be repeated in responses, command arguments, patches, diffs, docs, Git, logs, screenshots, state, reports or backups.
- Keep root passwords, SSH/private keys and passphrases outside this workflow.
- Keep project state and deployment documentation value-free: record only variable names, required status and safe storage location.

### Existing projects

- Do not ask the user to resupply an existing secret during the kit update.
- Do not read, print, copy, back up or rewrite existing env values only to align the project with this release.
- Existing `.env`, `.env.local`, hosting variables and secret stores remain project-owned and unchanged.
- On a later explicit configuration request, verify the destination with Git before writing and preserve unrelated entries without exposing them.
- Existing website stage, code, dependencies, integrations and deployment status remain valid.

### Breaking changes

- None. This is a Prompt Kit policy correction and does not modify application runtime behavior by itself.

## 0.10.0

Compatibility: non-breaking from `0.4.22+`.

### Required

- Update only the managed block in `AGENTS.md` to version `0.10.0`; preserve everything outside it.
- Add:
  - `prompts/_knowledge/nextjs-technical-baseline.md`;
  - `prompts/_knowledge/site-copy-quality-full.md`;
  - `prompts/_knowledge/ui-quality/`;
  - `prompts/06-nextjs-setup/02-technical-architecture.md`;
  - `prompts/09-quality/07-application-flow-check.md`;
  - `prompts/11-ecommerce/12-commerce-operations-and-payment-safety.md`.
- Use the four request lanes from the managed block:
  - `status` reads only the current project snapshot;
  - `direct` uses the affected files and a lightweight relevant standard;
  - `staged` reads the snapshot, compact Router and one current prompt;
  - `cross-cutting` enters the exact maintenance, CMS/architecture, commerce, article, SEO or deployment route.
- Keep `prompts/INDEX.md` as an ambiguity fallback rather than mandatory startup context.
- Keep the existing `ui-design-quality.md` and `site-copy-quality.md` paths as compact dispatchers. Load only the relevant UI modules before render and reserve the full copy/UI checks for critic, quality, long, critical or risky work.
- Keep `docs/project-state.md` at or below 8192 bytes. Before compacting an existing larger state, save a backup and preserve its older text losslessly in website-local `docs/project-history.md`; never ship that history in Prompt Kit.
- Update intake, project rules, Next.js setup, handoff, e-commerce, deployment, technical SEO, routing, state, templates, integrity/alignment prompts and release regression coverage.
- Use the generic `github-release-gh` manifest transport. The legacy `private-github-organization-gh` transport remains historical compatibility for release `0.9.0`, not the default for new releases.
- Keep the stable kit identity `dmandrianov/web-kit`, numeric repository trust anchor `1302994489` and canonical repository `dmandrianov/codex-web-kit-nextjs`.
- Keep root `LICENSE` as canonical MIT License and map the same text to `.prompt-kit/TERMS.md`. The legacy target filename remains only so updater `0.8.x` can validate the package; it adds no subscription or closed-use restrictions.

### Existing projects

- Existing stage, approved design/content, page and block specifications, production code and project-specific `AGENTS.md` content remain valid.
- Existing local rules after the managed block remain authoritative and must be preserved byte-for-byte by the updater.
- Do not delete an oversized historical state. During workflow alignment, back it up, move older chronology to `docs/project-history.md` without loss and leave a short current snapshot with one recommended prompt.
- Do not open `docs/project-history.md` for normal routing; use it only to recover an older decision.
- Do not add a CMS automatically. If the owner continues changing the site through Codex/AI and normal deploys are acceptable, record `CMS status: not needed`. If editors or content managers need a non-code interface, first define roles, preview/approval/publish flow, locales, redirects, media, revalidation, export/backup and downtime expectations, then choose a CMS.
- Do not rebuild the Next.js foundation only to create the new architecture document. On the next relevant setup, integration, e-commerce, handoff or deployment task, capture the missing decisions and verify the affected full scenarios.
- Static sites do not gain auth, a database, a server runtime or a heavy test stack without a real requirement.
- Dynamic sites should pass the application-wide flow check before project handoff or production deployment.
- E-commerce should pass the commerce operations/payment safety gate before the final e-commerce verdict; a browser return page is not proof of payment.

### Breaking changes

- No production-code, project-document or website-stage breaking changes.
- No prompt path is removed or renamed.
- The new UI modules and full copy reference are additive; existing dispatcher paths continue to work.
- No explicit update confirmation is required beyond normal manifest conflict and integrity gates.

## 0.9.0

Compatibility: explicit one-time source migration from `0.4.22+`.

### Required

- Update only the managed block in `AGENTS.md` to version `0.9.0`; preserve everything outside it.
- Keep the stable kit identity `dmandrianov/web-kit`.
- Keep the numeric repository trust anchor `1302994489`.
- Replace the bootstrap repository full name with `dmandrianov/codex-web-kit-nextjs`.
- Install the new updater that verifies:
  - numeric repository ID `1302994489`;
  - canonical owner login `dmandrianov`;
  - owner type `User`;
  - immutable stable release and signed release/asset attestations.
- Retain the legacy `private-github-organization-gh` manifest transport marker in this bridge release so the updater shipped in `0.8.0` can validate the archive before replacing itself.
- Replace the closed root `TERMS.md` with canonical root `LICENSE` under MIT.
- Map root `LICENSE` to required package target `.prompt-kit/TERMS.md`. The legacy filename is required by updater `0.8.x`; its contents are MIT and impose no subscription restriction.

### Existing projects

- The normal remote command cannot discover this bridge from `0.8.0`, because that updater rejects the transferred personal owner before downloading a release.
- Download and verify the official `0.9.0` assets outside the project, then apply the local archive with the installed updater:

  ```bash
  node .prompt-kit/update.mjs update \
    --project /path/to/project \
    --archive /path/to/web-kit-v0.9.0.tar.gz \
    --checksum-file /path/to/SHA256SUMS \
    --allow-breaking
  ```

- The local archive path does not call GitHub, change project Git or trust a new repository ID.
- After installation, run the bundled `verify` command and the full integrity/alignment flow before using remote updates again.
- Existing website stage, design, content, code and project-specific `AGENTS.md` content remain valid.
- Historical `v0.6.0`–`v0.8.0` release pages, assets and tags were retired during the public-source privacy cleanup. Existing installed copies remain usable; official public distribution resumes with `0.9.0`.

### Breaking changes

- No website code or project-document breaking change.
- Explicit confirmation is required because the canonical GitHub owner and repository full name change.
- Public distribution is enabled under MIT License. Users must retain the copyright notice and license text in copies or substantial portions.

## 0.8.0

Compatibility: non-breaking from `0.4.22+`.

### Required

- Update only the managed block in `AGENTS.md` to version `0.8.0`; preserve everything outside it.
- Add:
  - `prompts/_content/01-write-seo-article.md`;
  - `prompts/_guidelines/seo-content-writer-integration.md`.
- Update router/index, site-copy quality, page content planning, block content preview, smoke-check, integrity rules and public documentation.
- Keep the original `seo-content-writer` outside the Prompt Kit payload. The article route expects the preserved external dependency:
  - repository `aaron-he-zhu/seo-geo-claude-skills`;
  - tag `v9.9.12`;
  - commit `1608176f6c18de6aec62a9abf6a2074bf82c9f67`;
  - `SKILL.md` SHA-256 `8014ae5cb74e117415283dd27f2a86946a0df4cc0988f60be0a0b94f55204452`;
  - four reference checksums recorded in `prompts/_guidelines/seo-content-writer-integration.md`.

### Existing projects

- Existing stage, approved copy, page specs, block specs, design and production code remain valid.
- Do not rerun or rewrite existing pages automatically.
- Ordinary hero, CTA, cards, forms and block content preview use the lightweight native contract and `Site copy fast pass` on the next relevant copy task.
- The full `Site copy check` remains for long, critical or risky text.
- New SEO articles use the explicit `prompts/_content/01-write-seo-article.md` route. If the pinned external skill is missing or mismatched, stop before drafting and install/repair it separately; do not vendor it into the project.
- A controlled comparison on an anonymized Tension block showed better directness, claim support and entity precision without adding a new workflow stage.

### Breaking changes

- No production-code, project-document or website-stage breaking changes.
- No existing content preview is invalidated.
- No explicit update confirmation is required beyond the normal manifest conflict and integrity gates.

## 0.7.0

Compatibility: non-breaking from `0.4.22+`.

### Required

- Update only the managed block in `AGENTS.md` to version `0.7.0`; preserve everything outside it.
- Add:
  - `prompts/_guidelines/gpt-taste-integration.md`;
  - `prompts/_templates/gpt-taste-profile-template.md`;
  - `prompts/_templates/gpt-taste-component-spec-template.md`;
  - `prompts/07-page-planning/00-gpt-taste-component-spec.md`;
  - `prompts/08-block-build/00-gpt-taste-creative-build.md`;
  - `prompts/08-block-build/07-approve-gpt-taste-profile.md`.
- Update router/index/state, Creator-Critic workflow, design concept flow, block planning/content preview, smoke/integrity/alignment prompts and public documentation.
- Treat the original `gpt-taste/SKILL.md` as an optional external pinned dependency, not a kit-owned release file. When selected, verify:
  - repository `Leonxlnx/taste-skill`;
  - path `skills/gpt-tasteskill/SKILL.md`;
  - commit `e988add20dab0fa97d7a76781c48961c8184288e`;
  - SHA-256 `2e64c269953f2656c21bf5a0fa6b4568e82fe0c72b36e8f84758e090349966a5`.

### Existing projects

- Existing approved design, code and project stage remain valid. Do not rerun concept or redesign automatically.
- If a project already has an explicitly approved gpt-taste concept, create `docs/design-system/gpt-taste-profile.md` only from live/screenshots/decisions the user actually approved.
- Otherwise choose `Creator engine: gpt-taste` only on the next eligible expressive task:
  - `page` through `05-design-system/03`;
  - `block` or `component` through `08-block-build/00-gpt-taste-creative-build`.
- Existing product/business UI, checkout, forms, local fixes, quality, SEO, deployment and maintenance remain on their normal routes unless the user explicitly overrides creator selection.
- Missing or mismatched gpt-taste blocks UI creation before any silent fallback. Updating/installing the external skill is a separate user-authorized action.

## 0.6.0

### Required

- Update only the managed block in `AGENTS.md` to version `0.6.0`; preserve everything outside it.
- Update the canonical responsive rule and connected workflow files:
  - `prompts/_knowledge/ui-design-quality.md`;
  - `prompts/_knowledge/contemporary-visual-direction.md`;
  - `prompts/05-design-system/03-design-concept-prototypes.md`;
  - `prompts/05-design-system/09-layout-and-responsive-rules.md`;
  - `prompts/05-design-system/12-design-system-review.md`;
  - `prompts/06-nextjs-setup/03-app-router-structure.md`;
  - `prompts/06-nextjs-setup/04-styling-and-design-system-integration.md`;
  - `prompts/06-nextjs-setup/06-next-ready-review.md`;
  - page/block specs and templates;
  - `prompts/08-block-build/` responsive/build gates;
  - `prompts/09-quality/` smoke, preflight, browser and summary gates.
- Update `prompts/_maintenance/02-check-kit-integrity.md`, `prompts/_maintenance/04-align-project-after-kit-update.md` and source distribution docs so Creator-Critic, First-render and closed-access contracts remain covered.
- Move distribution to a private GitHub Organization repository and grant paying subscribers outside-collaborator role `Read`. Keep the payment email and matching GitHub username in an external subscription ledger, never in source or release assets.
- Add root `TERMS.md` and ship it as required `.prompt-kit/TERMS.md`; remove the optional open-source `LICENSE` publication gate.
- Configure the final positive numeric repository ID and bootstrap/current full name in release config and shipped updater. `null` remains local-diagnostic only and blocks strict publication.
- Enable immutable releases before publication. Release tooling must attach all assets to a draft, publish only after asset verification, then require `immutable: true` and a valid signed GitHub attestation.
- Configure the release workflow's dedicated repository-scoped GitHub App: Actions variable `WEB_KIT_RELEASE_APP_CLIENT_ID`, Actions secret `WEB_KIT_RELEASE_APP_PRIVATE_KEY`, permissions `Administration: read` and `Contents: write` only.
- Remote updater uses browser-authenticated `gh`, validates the canonical private Organization repository against the embedded numeric ID, verifies the immutable release and local assets by signed attestation before extraction, and downloads stable release assets without touching project Git.

### Optional refresh

- Do not roll back the project's stage or rebuild approved UI automatically.
- If `docs/design-system/layout-rules.md` lacks the new contract, run `prompts/05-design-system/09-layout-and-responsive-rules.md` as a targeted refresh.
- If production foundation selects layout after mount, run `prompts/06-nextjs-setup/04-styling-and-design-system-integration.md` with an explicit shared-foundation scope and regression-check affected consumers.
- Validate one representative route through `prompts/09-quality/05-browser-runtime-verification.md`: set each viewport before fresh load, compare early/settled frames and inspect responsive media resources.
- For subscriber onboarding, collect payment email for billing/accounting and GitHub username for the actual access boundary, invite that account with `Read`, then ask the subscriber to run `gh auth login --hostname github.com --web` once.

### Breaking changes

- No production-code or project-document breaking changes.
- Existing settled screenshots remain useful evidence, but they no longer prove first-render responsive stability by themselves.
- The `0.5.0` Creator-Critic sequencing remains active: `0.6.0` adds delivery evidence and does not move full design checklists back before render.
- Ending a subscription revokes repository and future-release access but does not invalidate versions downloaded while the subscription was active. Those versions remain usable under `.prompt-kit/TERMS.md`.
- A rename/transfer with the same numeric repository ID is compatible. A completely new repository ID is not an ordinary update and requires a trusted migration plus explicit confirmation.

### Files requiring careful merge

- `AGENTS.md`: managed block only.
- Preserve `prompts/_local/`, `docs/project-state.md`, project design documents, website code, package files and every `.git/` setting.
- Never store GitHub tokens, CLI credential data, payment email or subscriber username in the project, backup, manifest or maintenance reports.
- Do not reuse the old repository slug for another repository until subscribers have an updater with the new bootstrap slug. If the slug resolves to another ID, the updater must block rather than switch source.
- Shared canvas primitives may affect several blocks; change them in a downstream project only with an explicit scope and regression evidence.

## 0.5.0

### Required

- Update only the managed block in `AGENTS.md` to version `0.5.0`; preserve everything outside it.
- Install or update the exact allowlisted prompt files, including:
  - `prompts/_maintenance/01-update-prompt-kit.md`;
  - `prompts/_maintenance/02-check-kit-integrity.md`;
  - `prompts/_maintenance/03-migrate-agents-md.md`;
  - `prompts/_maintenance/04-align-project-after-kit-update.md`;
  - `prompts/_maintenance/05-release-prompt-kit.md`.
- Add `prompts/_guidelines/creator-critic-design-workflow.md` and update the connected routing, design-system, page-planning, block-build, visual-quality and template prompts that consume the creator/critic contract.
- Update `AGENTS.md`, `prompts/ROUTER.md`, `prompts/INDEX.md`, `prompts/README.md` and `prompts/STATE.md` so new composition starts from a short positive brief and live evidence, while full compliance remains a later critic/quality pass.
- Create `.prompt-kit/manifest.json` only after the full payload passes integrity checks.
- Install release metadata as `.prompt-kit/VERSION.md`, `.prompt-kit/CHANGELOG.md`, `.prompt-kit/MIGRATIONS.md`, `.prompt-kit/manifest.schema.json`, `.prompt-kit/update.mjs` and `.prompt-kit/.gitignore`.
- Use only the curated asset attached to the official stable GitHub Release and verify it against `SHA256SUMS` before extraction.

### First legacy transition

- Installations at `0.4.22` or earlier have no per-file manifest baseline. Build the full plan and backup first, then ask for one explicit confirmation before replacing legacy kit-owned files.
- Do not interpret the confirmation as permission to modify the user's Git repository, project documents, source code, root README/changelog/migrations or `prompts/_local/` content.
- After `0.5.0` is installed successfully, future compatible releases use the manifest baseline and the phrase `обнови базу` is sufficient unless a real conflict or breaking migration is found.

### Optional refresh

- Keep the project's current stage and all completed artifacts.
- Run workflow alignment after the integrity check and offer only relevant optional refreshes; do not execute them without a separate user choice.
- Do not rebuild already approved concepts or blocks only to adopt creator/critic terminology. Use the new loop on the next visual concept, new composition or meaningful redesign.
- If an active project has a very long design contract, optionally compact its approved evidence into `docs/design-system/visual-north-star.md`; do not change the approved direction without user feedback.

### Breaking changes

- No production-code or project-document breaking changes.
- The distribution model changes: GitHub Release assets and `.prompt-kit/manifest.json` become the supported update path.
- The creative workflow changes sequencing, not product truth: creator gets a smaller context before render, critic gets the full relevant knowledge after render, and accessibility/safety/business semantics remain mandatory throughout.

### Files requiring careful merge

- `AGENTS.md`: managed block only.
- Preserve `prompts/_local/`, `docs/project-state.md`, project documentation, website code, package files and every `.git/` setting.
- In a downstream project, root `README.md`, `CHANGELOG.md`, `MIGRATIONS.md`, `PROMPT_KIT_VERSION.md`, `.gitignore` and `.gitattributes` are user-owned and must not be overwritten by the release.

## 0.4.22

### Required

- Update the managed block in `AGENTS.md` to version `0.4.22`.
- Copy new file:
  - `prompts/_knowledge/codex-user-response-quality.md`.
- Update:
  - `prompts/ROUTER.md`;
  - `prompts/INDEX.md`;
  - `prompts/README.md`;
  - `prompts/STATE.md`;
  - `prompts/_templates/prompt-template.md`;
  - `prompts/_maintenance/02-check-kit-integrity.md`;
  - `prompts/_maintenance/04-align-project-after-kit-update.md`;
  - source-kit public docs: `README.md`, `docs/workflow.md`, `docs/website-stages.md`, `docs/prompt-status.md`, `docs/prompt-anatomy.md`;
  - `PROMPT_KIT_VERSION.md`, `CHANGELOG.md`, `MIGRATIONS.md`.

### Optional refresh

- Do not move a project to an earlier website stage and do not rewrite old project documents only to adopt the new response style.
- Start using the standard from the next user-visible message.
- Existing project-specific communication preferences may refine tone or detail level as long as the answer still explains the result, its value and the required user action.
- No rerun of strategy, design, page planning, block build, quality, SEO or deployment is needed.

### Breaking changes

- No production-code or project-document breaking changes.
- Workflow behavior changes globally: raw stage names, verdicts and prompt paths are no longer sufficient as a user-facing answer.
- Every user-visible response must lead with plain-language meaning and explicitly say whether the user needs to act.

### Files requiring careful merge

- `AGENTS.md` managed block only. Preserve project-specific content outside the managed block.
- Preserve `prompts/_local/`, `docs/project-rules.md` and local communication preferences.
- In downstream projects, do not blindly overwrite project-owned `docs/`; the listed public docs are source-kit release documentation.
- Do not rewrite technical artifacts merely to make them conversational. Apply the standard to the chat response that explains those artifacts.

## 0.4.21

### Required

- Update the managed block in `AGENTS.md` to version `0.4.21`.
- Update:
  - `prompts/ROUTER.md`;
  - `prompts/INDEX.md`;
  - `prompts/README.md`;
  - `prompts/STATE.md`;
  - `prompts/_guidelines/page-composition-rhythm.md`;
  - `prompts/_knowledge/ui-design-quality.md`;
  - `prompts/_knowledge/contemporary-visual-direction.md`;
  - `prompts/_templates/visual-north-star-template.md`;
  - `prompts/_templates/page-spec-template.md`;
  - `prompts/_templates/block-spec-template.md`;
  - `prompts/05-design-system/03-design-concept-prototypes.md`;
  - `prompts/05-design-system/04-design-concept-feedback.md`;
  - `prompts/05-design-system/05-design-concept-iteration.md`;
  - `prompts/05-design-system/06-approve-design-direction.md`;
  - `prompts/05-design-system/09-layout-and-responsive-rules.md`;
  - `prompts/05-design-system/12-design-system-review.md`;
  - `prompts/06-nextjs-setup/04-styling-and-design-system-integration.md`;
  - `prompts/07-page-planning/02-page-spec.md`;
  - `prompts/07-page-planning/05-block-breakdown.md`;
  - `prompts/07-page-planning/06-page-planning-review.md`;
  - `prompts/07-page-planning/07-block-content-preview.md`;
  - `prompts/08-block-build/00-build-block-fast-lane.md`;
  - `prompts/08-block-build/04-responsive-pass.md`;
  - `prompts/08-block-build/06-block-build-review.md`;
  - `prompts/09-quality/00-block-smoke-check.md`;
  - `prompts/09-quality/01-quality-preflight.md`;
  - `prompts/09-quality/02-visual-screenshot-review.md`;
  - `prompts/09-quality/05-browser-runtime-verification.md`;
  - `prompts/09-quality/06-quality-summary.md`;
  - `README.md`, `docs/workflow.md`, `docs/website-stages.md`, `docs/prompt-status.md`, `docs/prompt-anatomy.md`;
  - `PROMPT_KIT_VERSION.md`, `CHANGELOG.md`, `MIGRATIONS.md`.

### Optional refresh

- Do not invalidate an approved concept or move an active project back to design-system stage only because its existing `layout-rules.md` predates the Desktop Canvas Contract.
- If an existing site stretches badly above 1440 CSS px, offer a targeted refresh through `prompts/05-design-system/09-layout-and-responsive-rules.md`; merge the new contract into the existing project-owned layout rules instead of overwriting them.
- If shared container primitives are missing, apply `prompts/06-nextjs-setup/04-styling-and-design-system-integration.md` only to the styling foundation, then check the next visible block with mobile + 1440 + at least 2560 CSS-pixel screenshots.
- Before deep/concept/page-level quality/handoff, test `1440 / 1920 / 2560 CSS px`. Test `3840 CSS px` for true-4K/full-bleed/ultrawide targets or record a reasoned skip. A physical 4K monitor with OS scaling may expose only 1920 or 2560 CSS px; record the actual browser viewport.

### Breaking changes

- No source-code API breaking changes.
- Workflow behavior changes: `Design ready` now requires a Desktop Canvas Contract, fast visible-UI work requires a wide guard, and deep visual QA cannot pass without the required wide-screen evidence or an explicit applicability decision for 3840 CSS px.

### Files requiring careful merge

- `AGENTS.md` managed block only. Preserve project-specific content outside the managed block.
- Existing `docs/design-system/layout-rules.md`, Visual North Star and page/block specs are project-owned. Add the canvas contract as a targeted merge; do not replace approved design decisions.
- Existing production CSS is project-owned. Prefer shared stage/container primitives, but do not rewrite unrelated blocks while fixing one wide-screen defect.
- Preserve `prompts/_local/` and unrelated knowledge files added by the user or another local workflow.

## 0.4.20

### Required

- Update the managed block in `AGENTS.md` to version `0.4.20`.
- Copy new files:
  - `prompts/_knowledge/technical-seo-baseline.md`;
  - `prompts/13-technical-seo/01-pre-deploy-technical-seo.md`;
  - `prompts/13-technical-seo/02-production-seo-verification.md`.
- Update:
  - `prompts/ROUTER.md`;
  - `prompts/INDEX.md`;
  - `prompts/README.md`;
  - `prompts/STATE.md`;
  - `prompts/OWNERSHIP.md`;
  - `prompts/_maintenance/02-check-kit-integrity.md`;
  - `prompts/_maintenance/04-align-project-after-kit-update.md`;
  - `prompts/12-deployment/06-domain-dns-ssl.md`;
  - `prompts/12-deployment/07-deploy-nextjs-app.md`;
  - `prompts/12-deployment/09-post-deploy-verification.md`;
  - `prompts/12-deployment/10-monitoring-backup-rollback.md`;
  - `prompts/12-deployment/11-deployment-handoff.md`;
  - `README.md`, `docs/workflow.md`, `docs/website-stages.md`, `docs/prompt-status.md`;
  - `PROMPT_KIT_VERSION.md`, `CHANGELOG.md`, `MIGRATIONS.md`.

### Optional refresh

- Do not move an active project back to an earlier website stage only because `docs/seo/` is missing.
- If a project is not yet deployed and has `Quality passed` plus a production domain plan, offer `prompts/13-technical-seo/01-pre-deploy-technical-seo.md` before deploy.
- If a project is already live, offer `prompts/13-technical-seo/02-production-seo-verification.md` as a targeted production refresh. Create a compact pre-deploy baseline artifact only if the live verification needs it; do not rebuild the site automatically.
- Existing page-level `content-seo-plan.md` files remain valid. The new lane adds technical implementation and production evidence, not keyword strategy.

### Breaking changes

- No source-code breaking changes.
- Workflow behavior changes: production deploy now has a pre-deploy technical SEO gate and deployment handoff has a live production SEO gate, unless the user explicitly approves a skip.
- Search Console/Yandex Webmaster actions remain confirmation-gated external changes and may be listed as user actions without failing the technical site verdict.

### Files requiring careful merge

- `AGENTS.md` managed block only. Preserve project-specific content outside the managed block.
- `docs/seo/` is project-owned. Never overwrite existing SEO reports during a kit update.
- Existing deployment docs are project-owned. Preserve completed server/domain/SSL decisions and attach the new SEO gates to the current deployment position.

## 0.4.19

### Required

- Update the managed block in `AGENTS.md` to version `0.4.19`.
- Copy new file:
  - `prompts/_templates/visual-north-star-template.md`.
- Update:
  - `prompts/ROUTER.md`;
  - `prompts/INDEX.md`;
  - `prompts/README.md`;
  - `prompts/STATE.md`;
  - `prompts/_guidelines/anti-ai-slop-design-and-copy.md`;
  - `prompts/_guidelines/page-composition-rhythm.md`;
  - `prompts/_knowledge/contemporary-visual-direction.md`;
  - `prompts/_knowledge/ui-design-quality.md`;
  - `prompts/05-design-system/02-design-style-shortlist.md`;
  - `prompts/05-design-system/03-design-concept-prototypes.md`;
  - `prompts/05-design-system/05-design-concept-iteration.md`;
  - `prompts/05-design-system/06-approve-design-direction.md`;
  - `prompts/05-design-system/07-iconography-system.md`;
  - `prompts/05-design-system/08-design-tokens.md`;
  - `prompts/05-design-system/09-layout-and-responsive-rules.md`;
  - `prompts/05-design-system/10-ui-components.md`;
  - `prompts/05-design-system/12-design-system-review.md`;
  - `prompts/07-page-planning/02-page-spec.md`;
  - `prompts/07-page-planning/05-block-breakdown.md`;
  - `prompts/07-page-planning/06-page-planning-review.md`;
  - `prompts/07-page-planning/07-block-content-preview.md`;
  - `prompts/08-block-build/00-build-block-fast-lane.md`;
  - `prompts/09-quality/00-block-smoke-check.md`;
  - `prompts/09-quality/02-visual-screenshot-review.md`;
  - `prompts/_templates/page-spec-template.md`;
  - `prompts/_templates/block-spec-template.md`;
  - public README/workflow/status docs.

### Optional refresh

- Do not invalidate an approved concept or redesign existing pages automatically.
- If an active project already has an approved concept/design direction, create `docs/design-system/visual-north-star.md` through `prompts/05-design-system/06-approve-design-direction.md` as a targeted refresh.
- For the next visible marketing block, use the new fast-lane screenshot eyes-check. No separate pre-build live preview is required.
- After 3-4 existing blocks, run a page-level eyes-check if the page feels visually fragmented or repetitive.

### Breaking changes

- No production code breaking changes.
- Workflow behavior changes: content preview no longer implies approval of an unbuilt final layout. Visible marketing blocks cannot be handed off from fast lane without desktop/mobile screenshot inspection and self-fix when needed.

### Files requiring careful merge

- `AGENTS.md` managed block only. Preserve project-specific content outside the managed block.
- Existing `docs/design-system/` and page/block docs are project-owned. Add Visual North Star only as an explicit or targeted refresh; do not overwrite design decisions automatically.

## 0.4.18

### Required

- Update the managed block in `AGENTS.md` to version `0.4.18`.
- Copy new file:
  - `prompts/_knowledge/contemporary-visual-direction.md`.
- Update:
  - `prompts/ROUTER.md`;
  - `prompts/INDEX.md`;
  - `prompts/README.md`;
  - `prompts/STATE.md`;
  - `prompts/05-design-system/_design-style-library.md`;
  - `prompts/05-design-system/02-design-style-shortlist.md`;
  - `prompts/05-design-system/03-design-concept-prototypes.md`;
  - `prompts/05-design-system/04-design-concept-feedback.md`;
  - `prompts/05-design-system/05-design-concept-iteration.md`;
  - `prompts/05-design-system/06-approve-design-direction.md`;
  - `prompts/05-design-system/07-iconography-system.md`;
  - `prompts/05-design-system/12-design-system-review.md`;
  - `prompts/07-page-planning/07-block-content-preview.md`;
  - `prompts/08-block-build/00-build-block-fast-lane.md`;
  - `prompts/09-quality/00-block-smoke-check.md`;
  - `prompts/09-quality/02-visual-screenshot-review.md`;
  - `prompts/_guidelines/anti-ai-slop-design-and-copy.md`;
  - `README.md`, `docs/workflow.md`, `docs/website-stages.md`, `docs/prompt-status.md`;
  - `PROMPT_KIT_VERSION.md`, `CHANGELOG.md`, `MIGRATIONS.md`.

### Optional refresh

- Do not automatically invalidate approved design directions or rebuild existing pages.
- If a project is currently in design concept stage and the concept feels outdated, too 2020, iconless, image-less, video-less, too text-heavy or fully rejected, rerun `prompts/05-design-system/03-design-concept-prototypes.md` for the next queued hypothesis.
- If the project already has a chosen concept but lacks media/icon/motion direction, rerun `prompts/05-design-system/06-approve-design-direction.md` or `07-iconography-system.md` to carry those decisions into design-system docs.
- For the next visually important block, rerun `prompts/07-page-planning/07-block-content-preview.md` so the block receives a `Contemporary visual preview` before code.

### Breaking changes

- No production code breaking changes.
- Workflow behavior changes: design concept generation is now one active concept per pass, not three simultaneous HTML variants. Rejection of a concept can move to the next hypothesis instead of forcing iteration on the disliked direction.

### Files requiring careful merge

- `AGENTS.md` managed block only. Preserve project-specific content outside the managed block.
- `docs/design-system/`, `design-lab/`, page specs and block docs are project-owned. Do not overwrite them automatically; create targeted refreshes only when the user asks or the current stage needs them.

## 0.4.17

### Required

- Update the managed block in `AGENTS.md` to version `0.4.17`.
- Update:
  - `prompts/ROUTER.md`;
  - `prompts/INDEX.md`;
  - `prompts/README.md`;
  - `prompts/_guidelines/anti-ai-slop-design-and-copy.md`;
  - `prompts/_guidelines/landing-copy-formulas.md`;
  - `prompts/_guidelines/page-composition-rhythm.md`;
  - `prompts/07-page-planning/07-block-content-preview.md`;
  - `prompts/08-block-build/00-build-block-fast-lane.md`;
  - `prompts/08-block-build/05-interaction-and-states-pass.md`;
  - `prompts/08-block-build/06-block-build-review.md`;
  - `prompts/09-quality/00-block-smoke-check.md`;
  - `prompts/09-quality/01-quality-preflight.md`;
  - `prompts/09-quality/02-visual-screenshot-review.md`;
  - `prompts/09-quality/03-accessibility-and-usability-check.md`;
  - `prompts/09-quality/06-quality-summary.md`;
  - `prompts/11-ecommerce/04-category-plp-spec.md`;
  - `prompts/11-ecommerce/05-product-card-spec.md`;
  - `prompts/11-ecommerce/06-pdp-spec.md`;
  - `prompts/11-ecommerce/07-filters-search-sorting.md`;
  - `prompts/11-ecommerce/09-cart-spec.md`;
  - `prompts/11-ecommerce/10-checkout-flow-spec.md`;
  - `README.md`, `docs/workflow.md`, `docs/prompt-status.md`;
  - `PROMPT_KIT_VERSION.md`, `CHANGELOG.md`, `MIGRATIONS.md`.

### Optional refresh

- Do not rewrite existing copy or redesign existing UI automatically.
- For the next/current visible UI task, require `prompts/_knowledge/ui-design-quality.md` even if the user asks for a small CSS/layout/state fix.
- For the next/current user-facing copy task, require `prompts/_knowledge/site-copy-quality.md` even if the user asks for a button label, form error, empty state, product card text, checkout microcopy, metadata or SEO snippet.
- If a task touches both UI and copy, run both `UI quality check` and `Site copy check`.

### Breaking changes

- No production code breaking changes.
- Workflow behavior is stricter: visible UI and user-facing copy cannot be approved without the relevant knowledge base check.

## 0.4.16

### Required

- Update the managed block in `AGENTS.md` to version `0.4.16`.
- Update:
  - `prompts/_knowledge/ui-design-quality.md`;
  - UI quality criteria in router/index/docs;
  - `prompts/05-design-system/12-design-system-review.md`;
  - `prompts/07-page-planning/07-block-content-preview.md`;
  - `prompts/08-block-build/00-build-block-fast-lane.md`;
  - `prompts/09-quality/01-quality-preflight.md`;
  - `prompts/09-quality/02-visual-screenshot-review.md`;
  - `PROMPT_KIT_VERSION.md`, `CHANGELOG.md`, `MIGRATIONS.md`.

### Optional refresh

- Do not redesign existing pages automatically.
- For a weak or generic block, rerun `prompts/07-page-planning/07-block-content-preview.md` or `prompts/09-quality/02-visual-screenshot-review.md` and compare the block with the closest before/after example in `prompts/_knowledge/ui-design-quality.md`.
- For a shallow design system, rerun `prompts/05-design-system/12-design-system-review.md` and check whether component, layout, typography, color, form, table and responsive rules have practical bad/good examples behind them.

### Breaking changes

- No production code breaking changes.
- Existing docs remain valid. Add before/after calibration only when revisiting a design system, page spec, block preview, build pass or visual QA.

## 0.4.15

### Required

- Update the managed block in `AGENTS.md` to version `0.4.15`.
- Update:
  - `prompts/_knowledge/ui-design-quality.md`;
  - UI quality criteria in router/index/docs;
  - `prompts/05-design-system/12-design-system-review.md`;
  - `prompts/07-page-planning/07-block-content-preview.md`;
  - `prompts/08-block-build/00-build-block-fast-lane.md`;
  - `prompts/09-quality/01-quality-preflight.md`;
  - `prompts/09-quality/02-visual-screenshot-review.md`;
  - `PROMPT_KIT_VERSION.md`, `CHANGELOG.md`, `MIGRATIONS.md`.

### Optional refresh

- Do not redesign existing pages automatically.
- For a visually weak block, rerun `prompts/09-quality/02-visual-screenshot-review.md` and apply the expanded checks for shippable scope, fixed/fluid widths, typography, color independence, media stress and visual calibration.
- For a shallow design system, rerun `prompts/05-design-system/12-design-system-review.md` and check personality-to-token translation, font readiness, surface color logic and control/link states.

### Breaking changes

- No production code breaking changes.
- Existing docs remain valid. Add the stronger notes only when revisiting a design system, page spec, block preview or visual QA.

## 0.4.14

### Required

- Update the managed block in `AGENTS.md` to version `0.4.14`.
- Update:
  - `prompts/_knowledge/ui-design-quality.md`;
  - UI quality criteria in `prompts/05-design-system/`, `prompts/07-page-planning/`, `prompts/08-block-build/` and `prompts/09-quality/`;
  - `README.md`, `docs/workflow.md`, `docs/prompt-status.md`;
  - `PROMPT_KIT_VERSION.md`, `CHANGELOG.md`, `MIGRATIONS.md`.

### Optional refresh

- Do not redesign existing project pages automatically.
- For a weak or generic block, rerun `prompts/07-page-planning/07-block-content-preview.md` or `prompts/09-quality/02-visual-screenshot-review.md` and apply the expanded `UI quality check`.
- For a design system that feels too shallow, rerun `prompts/05-design-system/12-design-system-review.md` and check de-emphasis, media treatment, states and edge polish.

### Breaking changes

- No production code breaking changes.
- Existing design-system/page/block docs remain valid. Add the stronger UI notes only when a document is actively revisited or during optional refresh.

## 0.4.13

### Required

- Update the managed block in `AGENTS.md` to version `0.4.13`.
- Copy new file:
  - `prompts/_knowledge/ui-design-quality.md`.
- Update:
  - `prompts/ROUTER.md`;
  - `prompts/INDEX.md`;
  - `prompts/README.md`;
  - `prompts/STATE.md`;
  - `prompts/OWNERSHIP.md`;
  - `prompts/_guidelines/anti-ai-slop-design-and-copy.md`;
  - `prompts/_guidelines/page-composition-rhythm.md`;
  - `prompts/05-design-system/`;
  - `prompts/07-page-planning/`;
  - `prompts/08-block-build/`;
  - `prompts/09-quality/`;
  - `README.md`;
  - `docs/workflow.md`;
  - `docs/prompt-status.md`;
  - `PROMPT_KIT_VERSION.md`, `CHANGELOG.md`, `MIGRATIONS.md`.

### Optional refresh

- Do not redesign existing project pages automatically.
- For a current or problematic block, rerun `prompts/07-page-planning/07-block-content-preview.md`, `prompts/08-block-build/00-build-block-fast-lane.md` or `prompts/09-quality/02-visual-screenshot-review.md` and apply `UI quality check`.
- For a weak design system, rerun `prompts/05-design-system/12-design-system-review.md` and check UI quality readiness before moving forward.

### Breaking changes

- No production code breaking changes.
- Existing design-system/page/block docs remain project-owned. Add UI quality notes only when a document is actively revisited or during optional refresh.

## 0.4.12

### Required

- Update the managed block in `AGENTS.md` to version `0.4.12`.
- Delete the previous public-copy knowledge file if present.
- Copy/update:
  - `prompts/_knowledge/site-copy-quality.md`;
  - `prompts/07-page-planning/07-block-content-preview.md`;
  - `AGENTS.md`, `prompts/ROUTER.md`, `prompts/INDEX.md`;
  - `PROMPT_KIT_VERSION.md`, `CHANGELOG.md`, `MIGRATIONS.md`;
  - README/docs and public-copy related prompts/guidelines.

### Optional refresh

- Do not rewrite all project copy automatically.
- For the current or problematic public-copy block, rerun `prompts/07-page-planning/07-block-content-preview.md` and apply `Site copy check`.

### Breaking changes

- File rename: the public-copy standard now lives at `prompts/_knowledge/site-copy-quality.md`.
- No production code breaking changes.
## 0.4.11

### Required

- Update the managed block in `AGENTS.md` to version `0.4.11`.
- Update:
  - `prompts/_knowledge/site-copy-quality.md`;
  - `prompts/07-page-planning/07-block-content-preview.md`;
  - `PROMPT_KIT_VERSION.md`, `CHANGELOG.md`, `MIGRATIONS.md`.

### Optional refresh

- Do not rewrite all project copy automatically.
- If a current block feels generic, overpromising, structurally overloaded, or not tied to a real user question, rerun `prompts/07-page-planning/07-block-content-preview.md` for that block.
- If a block has no proof or a weak offer, mark `needs proof`, `offer gap` or `strategy gap` instead of hiding the issue with stronger wording.

### Breaking changes

- No production code breaking changes.
- Existing approved content remains project-owned.

## 0.4.10

### Required

- Update the managed block in `AGENTS.md` to version `0.4.10`.
- Update:
  - `prompts/_knowledge/site-copy-quality.md`;
  - `PROMPT_KIT_VERSION.md`, `CHANGELOG.md`, `MIGRATIONS.md`.

### Optional refresh

- No automatic refresh needed.
- If a user struggles to explain what is wrong with copy, use the bad/good examples in `prompts/_knowledge/site-copy-quality.md` during the next `prompts/07-page-planning/07-block-content-preview.md` pass.

### Breaking changes

- No workflow or production code breaking changes.

## 0.4.9

### Required

- Update the managed block in `AGENTS.md` to version `0.4.9`.
- Update:
  - `prompts/_knowledge/site-copy-quality.md`;
  - `prompts/07-page-planning/07-block-content-preview.md`;
  - `PROMPT_KIT_VERSION.md`, `CHANGELOG.md`, `MIGRATIONS.md`.

### Optional refresh

- If a block has already passed content preview, do not invalidate it automatically.
- If the text feels correct but flat, overloaded, too abstract, or not grounded in user scenarios, rerun `prompts/07-page-planning/07-block-content-preview.md` for that block and apply the expanded `Site copy check`.

### Breaking changes

- No production code breaking changes.
- Existing public copy is project-owned. Refresh only current or problematic blocks.

## 0.4.8

### Required

- Update the managed block in `AGENTS.md` to version `0.4.8`.
- Copy new file:
  - `prompts/_knowledge/site-copy-quality.md`.
- Update:
  - `prompts/INDEX.md`;
  - `prompts/README.md`;
  - `prompts/ROUTER.md`;
  - `prompts/STATE.md`;
  - `prompts/_guidelines/anti-ai-slop-design-and-copy.md`;
  - `prompts/_guidelines/landing-copy-formulas.md`;
  - `prompts/02-project-strategy/02-goals-audience-offer.md`;
  - `prompts/07-page-planning/04-content-and-seo-plan.md`;
  - `prompts/07-page-planning/07-block-content-preview.md`;
  - README and docs.

### Optional refresh

- If a project is already in `block-build`, do not roll it back.
- If public text feels generic, too smooth, too long or not human enough, rerun `prompts/07-page-planning/07-block-content-preview.md` for the current/next block and apply `Site copy check`.
- If `docs/content/editorial-rules.md` exists but is weak, update it from `prompts/02-project-strategy/02-goals-audience-offer.md` or create a focused editorial refresh before the next page planning step.

### Breaking changes

- No production code breaking changes.
- Existing project copy is project-owned. Do not rewrite all text automatically; propose targeted refreshes.

## 0.4.7

### Required

- Update the managed block in `AGENTS.md` to version `0.4.7`.
- Copy new file:
  - `prompts/_guidelines/page-composition-rhythm.md`.
- Update:
  - `prompts/INDEX.md`;
  - `prompts/STATE.md`;
  - `prompts/_guidelines/anti-ai-slop-design-and-copy.md`;
  - `prompts/05-design-system/09-layout-and-responsive-rules.md`;
  - `prompts/05-design-system/12-design-system-review.md`;
  - `prompts/07-page-planning/05-block-breakdown.md`;
  - `prompts/07-page-planning/06-page-planning-review.md`;
  - `prompts/07-page-planning/07-block-content-preview.md`;
  - `prompts/08-block-build/00-build-block-fast-lane.md`;
  - `prompts/09-quality/00-block-smoke-check.md`;
  - `prompts/_templates/page-spec-template.md`;
  - `prompts/_templates/block-spec-template.md`;
  - README and docs.

### Optional refresh

- If a project is already in `block-build`, do not roll it back.
- If the page looks like separate similar blocks, rerun `prompts/07-page-planning/06-page-planning-review.md` or the current `prompts/07-page-planning/07-block-content-preview.md` to add page story, neighbor check and visual pattern budget.
- If a block introduced unexpected colors/icons/shadows, run a focused block refresh using `prompts/08-block-build/00-build-block-fast-lane.md` with token/color/icon lock.

### Breaking changes

- No production code breaking changes.
- Existing `docs/design-system/`, page specs and block specs are project-owned. Do not overwrite them automatically; offer a targeted refresh.

## 0.4.6

### Required

- Update the managed block in `AGENTS.md` to version `0.4.6`.
- Update:
  - `prompts/_guidelines/landing-copy-formulas.md`;
  - `prompts/07-page-planning/07-block-content-preview.md`;
  - `prompts/_guidelines/anti-ai-slop-design-and-copy.md`;
  - `prompts/_templates/block-spec-template.md`.

### Optional refresh

- If a project already has an approved content preview, do not invalidate it automatically.
- If a user says the text is "too neural", "too smooth", "not from pain" or "not human", rerun `prompts/07-page-planning/07-block-content-preview.md` for that block with the pain-first human check.
- For author-led sites, verify voice/person before rewriting production copy.

### Breaking changes

- No production code breaking changes.
- Existing project docs are project-owned; add pain-first notes only when a block is actively revisited.

## 0.4.5

### Required

- Update the managed block in `AGENTS.md` to version `0.4.5`.
- Copy new files:
  - `prompts/_guidelines/landing-copy-formulas.md`;
  - `prompts/07-page-planning/07-block-content-preview.md`.
- Update:
  - `prompts/ROUTER.md`;
  - `prompts/INDEX.md`;
  - `prompts/STATE.md`;
  - `prompts/07-page-planning/04-content-and-seo-plan.md`;
  - `prompts/07-page-planning/05-block-breakdown.md`;
  - `prompts/07-page-planning/06-page-planning-review.md`;
  - `prompts/08-block-build/00-build-block-fast-lane.md`;
  - `prompts/08-block-build/01-block-build-preflight.md`;
  - `prompts/_templates/block-spec-template.md`;
  - README and docs.

### Optional refresh

- If a project is already in `block-build`, do not roll it back. Offer to run `prompts/07-page-planning/07-block-content-preview.md` for the current or next block.
- If existing block text feels generic, create a content preview for that block before editing production UI.
- If a project has old block specs, add `User question` and `Copy direction` only when the block is being revisited.

### Breaking changes

- No production code breaking changes.
- `AGENTS.md` managed block only. Preserve project-specific content outside the managed block.
- Existing page/block docs are project-owned. Do not overwrite them automatically; propose a targeted refresh.

## 0.4.4

### Required

- Update the managed block in `AGENTS.md` to version `0.4.4`.
- Copy `prompts/_guidelines/anti-ai-slop-design-and-copy.md`.
- Update these prompt areas:
  - `prompts/02-project-strategy/02-goals-audience-offer.md`;
  - `prompts/05-design-system/06-approve-design-direction.md`;
  - `prompts/05-design-system/12-design-system-review.md`;
  - `prompts/07-page-planning/04-content-and-seo-plan.md`;
  - `prompts/07-page-planning/05-block-breakdown.md`;
  - `prompts/08-block-build/00-build-block-fast-lane.md`;
  - `prompts/09-quality/00-block-smoke-check.md`;
  - `prompts/09-quality/02-visual-screenshot-review.md`;
  - `prompts/_templates/page-spec-template.md`;
  - `prompts/_templates/block-spec-template.md`.
- Update `prompts/ROUTER.md`, `prompts/INDEX.md`, `prompts/STATE.md`, README and docs.

### Optional

- If a project already has strategy/messaging but no `docs/content/editorial-rules.md`, create it retroactively before the next page planning or block build step.
- If a block already looks too generic or text-heavy, run a focused visual/copy refresh using the new guideline before continuing with more blocks.

### Breaking changes

- None for production code. The workflow adds a stricter quality filter for design and copy.

### Files requiring careful merge

- `AGENTS.md` managed block only. Preserve project-specific content outside the managed block.
- `docs/content/`, `docs/design-system/`, page specs and block specs are project-owned. Do not overwrite them automatically; propose a refresh.

## 0.4.3

### Required

- Update the managed block in `AGENTS.md` to version `0.4.3`.
- Copy the new design-system prompt: `prompts/05-design-system/07-iconography-system.md`.
- Rename/update the later design-system prompts:
  - `prompts/05-design-system/08-design-tokens.md`;
  - `prompts/05-design-system/09-layout-and-responsive-rules.md`;
  - `prompts/05-design-system/10-ui-components.md`;
  - `prompts/05-design-system/11-accessibility-rules.md`;
  - `prompts/05-design-system/12-design-system-review.md`.
- Update `prompts/ROUTER.md`, `prompts/INDEX.md`, `prompts/STATE.md`, `README.md`, `docs/workflow.md`, `docs/website-stages.md` and `docs/prompt-status.md`.

### Optional

- If a project already has design tokens/components but no `docs/design-system/iconography.md`, create it retroactively from current icon choices before the next icon-heavy block.
- If a project has not started block build, run `prompts/05-design-system/07-iconography-system.md` before continuing to tokens/components.

### Breaking changes

- Design-system prompt numbering changed after `06-approve-design-direction.md`.
- Router now expects iconography before tokens unless the user explicitly skips iconography.

### Files requiring careful merge

- `AGENTS.md` managed block only. Preserve project-specific content outside the managed block.
- `docs/design-system/` is project-owned. Do not overwrite existing docs; add or update only `iconography.md` when the user chooses this refresh.

## 0.4.2

### Required

- Update the managed block in `AGENTS.md` to version `0.4.2`.
- Update these design-system prompts:
  - `prompts/05-design-system/03-design-concept-prototypes.md`;
  - `prompts/05-design-system/04-design-concept-feedback.md`;
  - `prompts/05-design-system/05-design-concept-iteration.md`.

### Optional

- If a project already has screenshot-only concept prototypes, reopen or recreate `design-lab/design-concepts/index.html` as live preview and record the browser URL/path in `docs/project-state.md`.
- Keep existing screenshots only as QA evidence.

### Breaking changes

- None for production code. The concept review behavior changes: screenshots are no longer an acceptable primary review surface when HTML preview can be opened.

### Files requiring careful merge

- `AGENTS.md` managed block only. Preserve project-specific content outside the managed block.
- Existing `design-lab/` artifacts are project-owned; update them only when the user is actively doing concept design.

## 0.4.1

### Required

- Update the managed block in `AGENTS.md` to version `0.4.1`.
- Copy `prompts/_maintenance/04-align-project-after-kit-update.md`.
- Update `prompts/ROUTER.md`, `prompts/INDEX.md`, `prompts/STATE.md`, `CHANGELOG.md`, `MIGRATIONS.md` and `PROMPT_KIT_VERSION.md`.
- After integrity check, run `prompts/_maintenance/04-align-project-after-kit-update.md`.

### Optional

- For already-updated projects, create `docs/prompt-kit-workflow-alignment.md` retroactively.
- Add optional refresh offers for any newly improved stages that could benefit the project.

### Breaking changes

- None. This version changes update behavior, not website workflow artifacts.

### Files requiring careful merge

- `AGENTS.md` managed block only. Preserve project-specific content outside the managed block.
- `docs/project-state.md` is project-owned; update only the `Kit compatibility`, maintenance note and recommended next prompt fields if needed.
- `docs/prompt-kit-workflow-alignment.md` is project-owned output and should not be overwritten blindly in future updates.

## 0.4.0

### Required

- Update the managed block in `AGENTS.md` to version `0.4.0`.
- Replace `prompts/05-design-system/` with the new design flow:
  - `_design-style-library.md`;
  - `02-design-style-shortlist.md`;
  - `03-design-concept-prototypes.md`;
  - `04-design-concept-feedback.md`;
  - `05-design-concept-iteration.md`;
  - `06-approve-design-direction.md`;
  - `08-design-tokens.md`;
  - `09-layout-and-responsive-rules.md`;
  - `10-ui-components.md`;
  - `11-accessibility-rules.md`;
  - `12-design-system-review.md`.
- Update `prompts/ROUTER.md`, `prompts/INDEX.md`, `prompts/STATE.md`, `README.md`, `docs/workflow.md`, `docs/website-stages.md` and `docs/prompt-status.md`.

### Optional

- For existing projects that already have `docs/design-system/design-direction.md`, create `docs/design-system/concepts/approved-concept.md` from the existing decision or mark visual concept stage as explicitly skipped in `docs/project-state.md`.
- Keep old disposable prototypes if they exist, but move them out of `src/` into `design-lab/design-concepts/`.

### Breaking changes

- Old design-system prompt paths for design direction and design tokens changed. Router and index now point to the new staged design flow.

### Files requiring careful merge

- `AGENTS.md` managed block only. Preserve project-specific content outside the managed block.
- `docs/design-system/` is project-owned and must not be overwritten.
- `design-lab/` is project-owned/disposable output and must not be deleted during kit update.

## 0.3.0

### Required

- Update the managed block in `AGENTS.md` to make fast lane the default block-build mode.
- Copy `prompts/08-block-build/00-build-block-fast-lane.md`.
- Copy `prompts/09-quality/00-block-smoke-check.md`.
- Update `prompts/ROUTER.md`, `prompts/INDEX.md`, `prompts/STATE.md`, `README.md`, `docs/workflow.md`, `docs/website-stages.md` and `docs/prompt-status.md`.

### Optional

- Existing projects may keep old detailed build docs. New blocks should use fast lane unless deep mode is needed.

### Breaking changes

- None. Detailed `08/01...06` and `09/01...06` prompts remain available.

### Files requiring careful merge

- `AGENTS.md` managed block only. Preserve project-specific content outside the managed block.

## 0.2.0

### Required

- Update the managed block in `AGENTS.md` to include deployment routing and secrets/root-password safety rules.
- Copy `prompts/12-deployment/`.
- Update `prompts/ROUTER.md`, `prompts/INDEX.md`, `prompts/STATE.md`, `README.md`, `docs/workflow.md`, `docs/website-stages.md` and `docs/prompt-status.md`.

### Optional

- Add deployment artifacts to existing `docs/project-state.md` when a project starts deployment.

### Breaking changes

- None.

### Files requiring careful merge

- `AGENTS.md` managed block only. Preserve project-specific content outside the managed block.
- Existing project deployment docs under `docs/deployment/` are project-owned and must not be overwritten.

## 0.1.1

### Required

- Update the managed block in `AGENTS.md` to include the mandatory `Следующий шаг` final response format.
- Update `prompts/ROUTER.md`, `prompts/README.md`, `README.md`, `docs/prompt-anatomy.md` and `prompts/_templates/prompt-template.md`.

### Optional

- Re-run `prompts/_maintenance/02-check-kit-integrity.md` after update.

### Breaking changes

- None.

### Files requiring careful merge

- `AGENTS.md` managed block only. Preserve everything outside `PROMPT_KIT:BEGIN` / `PROMPT_KIT:END`.

## 0.1.0

Initial version with safe-update conventions.

Required migration for projects that used an earlier unversioned copy:

1. Add `PROMPT_KIT` managed block markers to root `AGENTS.md`.
2. Keep project-specific rules outside the managed block.
3. Move local custom prompts to `prompts/_local/`.
4. Treat `docs/project-state.md`, project docs, source files and user materials as project-owned.

Use `prompts/_maintenance/03-migrate-agents-md.md` if an existing `AGENTS.md` does not have managed block markers.

## Future Migration Format

For each future release, add:

```md
## x.y.z

### Required

- 

### Optional

- 

### Breaking changes

- 

### Files requiring careful merge

- 
```
