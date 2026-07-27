# Проверить целостность Prompt Kit и release manifest

## Когда использовать

После установки или обновления Prompt Kit, для проверки verified incoming staging, а также перед публикацией нового release. Во время обычного update bundled updater сначала выполняет свою внутреннюю проверку и записывает manifest последним managed payload write, после чего этот prompt проводит полный installed integrity pass до alignment.

## Роль Codex

Ты действуешь как QA engineer для Markdown Prompt Kit, release payload и установленного manifest.

## Цель

Проверить, что Prompt Kit самодостаточный, manifest безопасен и согласован с payload, hashes совпадают, managed-блок `AGENTS.md` корректен, ссылки на промпты не сломаны, обязательные секции сохранены, а project-owned и Git-зоны не попали под управление updater.

## Контекст, который нужно дать

- Режим проверки: `installed`, `incoming staging` или `release candidate`.
- Корень рабочего проекта или распакованного release candidate.
- Manifest для проверки:
  - installed `.prompt-kit/manifest.json`; или
  - incoming `.prompt-kit/manifest.json` из verified staging до его установки.
- `AGENTS.md` и папка `prompts/` из проверяемого payload/проекта.
- `.prompt-kit/CHANGELOG.md`, `.prompt-kit/MIGRATIONS.md`, `.prompt-kit/TERMS.md` и `.prompt-kit/.gitignore`.
- `prompts/OWNERSHIP.md`.
- Archive и `SHA256SUMS`, если проверяется release candidate.
- `docs/prompt-kit-update-summary.md`, если проверка идёт после или во время обновления.

## Ограничения

- По умолчанию работай read-only; разрешено создать или обновить только `docs/prompt-kit-integrity.md`.
- Не исправляй содержательно prompts во время проверки. Сначала выдай точный issue list.
- Не трогай `docs/project-state.md`, `src/`, пользовательские материалы и локальные правила.
- Не считай `prompts/_local/` ошибкой в установленном проекте. Проверяй только, что manifest им не управляет, кроме разрешённого seed `create-if-missing`.
- Не считай `prompts/_guidelines/` и `prompts/_knowledge/` staged prompts: reference-файлы не обязаны иметь prompt-анатомию.
- Не выполняй никакие Git mutations и не изменяй `.git/`, remotes, branches, hooks или history.
- Не запрашивай и не проверяй raw GitHub token. Private transport проверяется по manifest/updater contract и, когда нужен remote preflight, через browser-authenticated `gh` без `gh auth token`.
- Не объявляй integrity passed при missing required file, checksum mismatch, unsafe manifest path, неправильном managed-блоке или несовпадении required payload hash.
- Сообщения пользователю оформляй по `prompts/_knowledge/codex-user-response-quality.md`.

## Процесс

1. Зафиксируй mode:
   - `installed` — проверяется текущий проект по installed manifest;
   - `incoming staging` — проверяется распакованный или вручную staged payload против incoming manifest;
   - `release candidate` — проверяется локально собранный архив перед публикацией.
2. Проверь наличие обязательных control files:
   - `.prompt-kit/manifest.json` в проверяемом manifest source;
   - `.prompt-kit/CHANGELOG.md`;
   - `.prompt-kit/VERSION.md`;
   - `.prompt-kit/MIGRATIONS.md`;
   - `.prompt-kit/TERMS.md`;
   - `.prompt-kit/.gitignore`;
   - `.prompt-kit/manifest.schema.json`;
   - `.prompt-kit/update.mjs`;
   - `AGENTS.md`;
   - `prompts/README.md`;
   - `prompts/INDEX.md`;
   - `prompts/ROUTER.md`;
   - `prompts/STATE.md`;
   - `prompts/OWNERSHIP.md`;
   - `prompts/_knowledge/codex-user-response-quality.md`;
   - `prompts/_knowledge/site-copy-quality.md`;
   - `prompts/_knowledge/ui-design-quality.md`;
   - `prompts/_knowledge/contemporary-visual-direction.md`;
   - `prompts/_knowledge/technical-seo-baseline.md`;
   - `prompts/_guidelines/creator-critic-design-workflow.md`;
   - `prompts/_templates/visual-north-star-template.md`.
3. Проверь manifest schema и identity. JSON Schema validation является первым слоем, но недостаточна сама по себе: обязательно запусти semantic validator bundled updater/release tooling для cross-field, safe-path, sorting, case-fold, ownership/policy и protected-boundary правил:
   - поддерживаемый `schemaVersion`;
   - `kit.id` равен `dmandrianov/web-kit`, `kit.name` равен `Web Kit`, channel равен `stable`, а `releasedAt` является реальной датой `YYYY-MM-DD`;
   - `kit.version`, `source.tag` и release asset version согласованы;
   - `source.transport` задаёт private GitHub Organization transport через browser-authenticated `gh`;
   - `source.repositoryId` является положительным числом и совпадает с embedded updater trust anchor для publishable/installed release; `null` допустим только для явно помеченного local diagnostic candidate и блокирует публикацию/remote update;
   - `source.repositoryFullName` задан для publishable/installed release и соответствует canonical private Organization repository; bootstrap name помогает пройти documented GitHub rename/transfer redirect, но numeric ID остаётся trust anchor;
   - `source.tag` и `source.revision` имеют ожидаемый формат;
   - `release.archiveRoot`, `release.zipAsset`, `release.tarAsset` и `release.checksumAsset` имеют ожидаемый формат;
   - `compatibility.compatibleFrom`, `breaking`, `requiresExplicitConfirmation` и `minimumUpdaterSchemaVersion` присутствуют и допустимы;
   - `managedBlocks.agents.beginPrefix` и `managedBlocks.agents.endMarker` являются canonical;
   - `protectedPaths` присутствует и защищает Git, project-owned зоны и `prompts/_local/**`;
   - manifest не хэшует сам себя и не заявляет собственный path как обычный managed payload.
   - required `.prompt-kit/TERMS.md` присутствует в inventory; optional open-source `LICENSE` не является publication gate.
4. Проверь безопасность `files[]` и `removed[]`:
   - paths отсортированы, относительные, нормализованные, без `..`, absolute prefix, backslash traversal, exact дублей и case-fold collisions;
   - один path не встречается одновременно в active files и removed;
   - отсутствуют `.git/`, Git config/hooks, credentials, `src/`, `public/`, package files, project docs и другие project-owned targets;
   - `prompts/_local/` отсутствует, кроме разрешённого seed README;
   - ownership допускает только `kit`, `hybrid` или `seed`;
   - policies допускают только заявленный contract: `replace-if-unmodified`, `managed-block`, `create-if-missing`, а для removed — только `delete-if-unmodified`; локально изменённый removed path является blocking manual conflict, а не другой manifest policy;
   - required, sha256, bytes и mode имеют корректный формат;
   - `AGENTS.md` entry содержит отдельный valid `managedBlockSha256`;
   - removed entries имеют valid `since`, непустой `reason`, безопасный optional `replacement` и policy `delete-if-unmodified`.
5. Проверь payload против manifest:
   - каждый required file существует;
   - SHA-256, byte size и file mode совпадают;
   - unexpected files внутри release payload перечислены отдельно;
   - manifest target paths соответствуют фактической структуре после единственного top-level archive directory.
6. Для policy `managed-block` проверь отдельно:
   - target path — только `AGENTS.md`;
   - begin marker встречается ровно один раз;
   - end marker встречается ровно один раз и идёт после begin;
   - marker version совпадает с manifest version;
   - hash проверяется только для canonical managed fragment согласно manifest contract, а не для project-specific prefix/suffix;
   - всё вне managed fragment в installed project не оценивается как часть kit payload.
7. Для policy `create-if-missing`:
   - отсутствие optional seed допустимо до установки;
   - существующий пользовательский seed не должен считаться кандидатом на overwrite;
   - различие существующего seed с release не делает проект-owned customization ошибкой.
8. В `installed` mode сравни фактические managed files с installed baseline:
   - совпадение required files — passed;
   - локальное изменение `replace-if-unmodified` или managed fragment — `local drift`, которое будущий updater обязан заблокировать;
   - missing required file или повреждённый prompt — `needs fixes`;
   - local-only unknown files не удаляй и не считай частью release.
9. Если проверяется release candidate, дополнительно:
   - проверь SHA-256 каждого archive asset по `SHA256SUMS`;
   - проверь ровно один top-level directory;
   - запрети symlinks, hardlinks, absolute/traversal paths, nested `.git`, backups, downloads, conflicts, tmp и secrets;
   - сравни payload ZIP и TAR.GZ: file list, content hashes и modes должны совпадать.
10. Проверь Prompt Kit structure:
    - ссылки на конкретные prompt-файлы внутри `prompts/` ведут к существующим файлам;
    - staged prompts в папках `00-13` и `_maintenance/` имеют секции `Когда использовать`, `Роль Codex`, `Цель`, context, constraints, `Процесс`, `Output`, `Done when`, `Follow-up`; creator/accessibility prompts могут использовать ясные смысловые эквиваленты вроде `Creator input`, `Hard invariants`, `Настоящие ограничения` или `Неподвижная граница`;
    - reference files с именем, начинающимся на `_`, не считаются staged prompts;
    - `_maintenance/` содержит update, integrity, migrate, alignment и release prompts;
    - `prompts/_local/README.md` доступен как seed source.
11. Проверь response-quality coverage:
    - managed-блок `AGENTS.md` требует стандарт для всех сообщений пользователю;
    - `prompts/ROUTER.md` отделяет технический Output от понятного сообщения человеку;
    - `prompts/_templates/prompt-template.md` и `docs/prompt-anatomy.md` используют человеческий формат следующего шага;
    - maintenance prompts также требуют `prompts/_knowledge/codex-user-response-quality.md`.
12. Проверь First-render Responsive Delivery coverage:
    - canonical rule в `prompts/_knowledge/ui-design-quality.md` требует CSS-first initial geometry и запрещает post-mount canvas correction;
    - `05-design-system/09` создаёт project-level First-render Responsive Delivery Contract;
    - `06-nextjs-setup/03`, `04` и `06` сохраняют server-first structure, CSS-first geometry, reserved media/measured geometry и font/loading stability;
    - page/block templates переносят initial layout source, viewport dependency и media delivery;
    - fast/deep build и quality проверяют fresh-load early frame против settled state, hydration и selected responsive resource.
13. Проверь Creator-Critic Design Loop coverage:
    - `AGENTS.md`, `ROUTER.md` и canonical guideline отделяют `creator`, `critic` и full `quality`;
    - creator до render получает Visual North Star/approved evidence, реальные assets, применимую design-system основу и только `4-6` task-specific rules, а не полные UI/copy/anti-slop/contemporary базы;
    - concept flow допускает до трёх дешёвых low-fi sketches/probes, но по умолчанию показывает пользователю один выбранный high-fidelity concept;
    - content approval фиксирует meaning, facts, claims, voice и CTA intent, но не замораживает exact wording, line breaks, geometry и layout;
    - copy formulas являются diagnostic fallback, а не обязательным шаблоном hero/CTA;
    - fast visible build выполняет `creator -> live render -> critic до трёх findings -> one self-fix -> recheck`;
    - полные UI/copy/accessibility/responsive/runtime checks остаются quality gate и не дублируются большими pre-render таблицами;
    - stable vocabulary отделён от provisional expressive choices, есть calibration `promote / refine / remove` после первых `2-3` live marketing blocks;
    - marketing chapter может охватывать `2-4` соседних blocks только для visual rhythm; product data, forms, checkout, pricing и business logic остаются block-scoped;
    - truth, permissions, secrets, accessibility и core action/status semantics остаются hard invariants.
    - integration guideline, profile/component templates, standalone component spec, dedicated build и profile approval prompts присутствуют в payload;
    - canonical source, pinned commit и SHA-256 gpt-taste согласованы во всех этих файлах;
    - modes `page / block / component` маршрутизируются явно, но original `SKILL.md` не входит в Prompt Kit payload и не переписан;
    - missing/mismatched skill блокирует выбранный gpt-taste pass без silent native fallback;
    - dashboard, checkout, forms, data/business UI, local fix, copy-only, quality, SEO, deployment и maintenance не получают gpt-taste автоматически;
    - approved gpt-taste profile отделяет locked identity/seed от used/available/open choices;
    - first block/component candidate становится approved только через explicit user approval route;
    - block/component scope не синтезирует page shell, а visual findings возвращаются `$gpt-taste`.
14. Проверь Git isolation:
   - `.git/` и Git metadata не находятся в payload/manifest;
   - root Git config/remotes/hooks не менялись текущей maintenance operation, если есть before/after evidence;
   - nested repository отсутствует.
15. Проверь private distribution contract:
   - bundled updater содержит embedded numeric repository ID и bootstrap full name для published build;
   - installed/incoming manifest ID совпадает с embedded trust anchor;
   - rename/transfer допускается только через documented GitHub redirect с последующей проверкой прежнего ID, `private: true` и Organization owner;
   - новый numeric ID блокируется до trusted migration;
   - remote path использует `gh api`/`gh release download`, не raw unauthenticated HTTPS;
   - remote release обязан иметь `immutable: true`, валидную signed release attestation, а скачанные TAR.GZ и `SHA256SUMS` — проходить `gh release verify-asset` до extraction;
   - updater не вызывает `gh auth token`, не читает raw token variables и не передаёт `GH_TOKEN`, `GITHUB_TOKEN`, `GITHUB_PAT` или `PAT` дочерним процессам;
   - incoming updater содержит ровно один canonical trust marker и не меняет embedded repository ID через один только incoming manifest;
   - target, backup, manifest и rollback paths не могут выйти из реального project root через symlinked parent;
   - local `--archive` mode не требует и не вызывает `gh`;
   - `.prompt-kit/TERMS.md` разрешает дальнейшее использование скачанных во время подписки версий, но запрещает standalone redistribution, resale, credential и archive sharing.
16. Сформируй counts, issues, warnings и однозначный verdict.

## Output

Создай или обнови `docs/prompt-kit-integrity.md`:

```md
# Prompt Kit Integrity

## Check context

- Mode: installed / incoming staging / release candidate
- Checked manifest:
- Checked at:

## Version and identity

- Kit ID:
- Version:
- Tag:
- Repository ID:
- Embedded trust anchor:
- Repository bootstrap/canonical full name:
- Private Organization transport:
- Identity status: passed/failed

## Result

- Status: passed / needs fixes
- Errors:
- Warnings:

## Manifest safety

- Schema:
- Active file entries:
- Removed entries:
- Duplicate/unsafe paths:
- Project-owned targets:
- Policies:

## Payload verification

- Required files checked:
- Missing:
- Hashes checked:
- Hash mismatches:
- Size/mode mismatches:
- Unexpected release files:

## Archive verification

- ZIP checksum:
- TAR.GZ checksum:
- Archive structure:
- ZIP/TAR payload parity:

## AGENTS.md managed block

- Begin marker:
- End marker:
- Count:
- Version:
- Managed fragment hash:
- Project-specific content excluded from hash: yes/no

## Prompt links and anatomy

- Prompt links checked:
- Missing links:
- Staged prompts checked:
- Missing required sections:

## Creator-Critic Design Loop

- Canonical guideline:
- Selective creator context:
- Low-fi exploration / one public concept:
- Content approval freedom:
- Render / top-three critic / one self-fix:
- Stable / provisional / calibration:
- Marketing chapter scope:
- Hard invariants preserved:

## First-render responsive delivery

- Canonical rule:
- Design-system contract:
- Next.js foundation gate:
- Page/block carryover:
- Fresh-load browser evidence gate:

## Local and Git safety

- `_local` unmanaged except seed: yes/no
- Project-owned targets absent: yes/no
- Local drift:
- Nested `.git` absent: yes/no
- Git metadata untouched: yes/no/not applicable

## Closed distribution

- `.prompt-kit/TERMS.md` required/hash:
- Browser-authenticated `gh` transport:
- Raw token handling absent:
- Rename/transfer keeps numeric ID:
- New repository ID requires trusted migration:
- Local archive mode independent from `gh`:

## Issues

| Priority | Type | Path | Issue | Suggested fix |
| --- | --- | --- | --- | --- |

## Next action

- 
```

В сообщении пользователю сначала объясни обычными словами:

- проверка пройдена или что именно мешает продолжить;
- можно ли безопасно завершить update/publish;
- требуется ли действие пользователя.

После этого покажи counts и технические детали. Формат ответа сверяй с `prompts/_knowledge/codex-user-response-quality.md`.

## Done when

- Manifest schema, identity, paths, policies и compatibility проверены.
- Embedded numeric repository trust anchor, private Organization `gh` transport, rename/transfer и new-ID migration boundaries проверены.
- Required payload hashes, sizes и modes проверены.
- Required `.prompt-kit/TERMS.md` проверен; raw token/credential transport отсутствует.
- Release archive checksum/structure проверены, если применимо.
- Managed fragment `AGENTS.md` проверен без захвата project-specific content.
- Prompt links и anatomy проверены.
- Creator-Critic Design Loop проверен от routing и concept до content preview, fast build, critic и quality.
- Response-quality coverage проверено.
- First-render Responsive Delivery coverage проверено от design system до browser QA.
- Project-owned, `_local` и Git safety проверены.
- Есть counts, issue list и честный verdict `passed` / `needs fixes`.

## Follow-up

Если проблема в отсутствующих или повреждённых markers `AGENTS.md`, используй `prompts/_maintenance/03-migrate-agents-md.md`.

Если проверяется incoming staging до apply и status `passed`, верни управление в `prompts/_maintenance/01-update-prompt-kit.md`. Если проверяется уже установленное обновление и status `passed`, updater должен подтвердить, что `.prompt-kit/manifest.json` был последним managed payload write, и автоматически запустить `prompts/_maintenance/04-align-project-after-kit-update.md`.

Если проверяется release candidate и status `passed`, вернись в `prompts/_maintenance/05-release-prompt-kit.md`. Если есть ошибки, исправь release source/tooling точечно и повтори этот prompt; ничего не публикуй до passed verdict.
