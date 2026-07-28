# Собрать и проверить публичный Prompt Kit Release

## Когда использовать

Только в source repository Web Kit, когда maintainer просит подготовить локальный release candidate, проверить release artifacts или — отдельной явной командой — выполнить конкретные Git/GitHub publication actions в доверенном repository `dmandrianov/codex-web-kit-nextjs`.

Не используй этот prompt для обновления Prompt Kit внутри пользовательского сайта. Для пользовательского проекта используй `prompts/_maintenance/01-update-prompt-kit.md`.

## Роль Codex

Ты действуешь как release engineer, reproducible-build reviewer и осторожный maintainer публичного Prompt Kit под MIT License.

## Цель

Собрать локально проверяемые stable release assets `web-kit-vX.Y.Z.zip`, `web-kit-vX.Y.Z.tar.gz` и `SHA256SUMS`, создать manifest v1 с неизменным numeric repository ID и личным owner, включить MIT License, проверить payload и подготовить preflight report. Git/GitHub state-changing actions не входят в обычный build/verify pass и выполняются только после отдельного явного разрешения пользователя.

## Контекст, который нужно дать

- Корень source repository Prompt Kit.
- Целевая semantic version. Manifest schema v1 поддерживает только channel `stable`.
- Текущие `PROMPT_KIT_VERSION.md`, `CHANGELOG.md` и `MIGRATIONS.md` source repository.
- Корневой `LICENSE` с canonical MIT License.
- Root `AGENTS.md`, `prompts/` и `prompts/OWNERSHIP.md`.
- `tools/release.mjs`, `release/payload.json`, `release/manifest.schema.json` и release notes/configuration.
- Предыдущий stable GitHub Release metadata, если он доступен read-only.
- Trusted repository metadata: bootstrap/current full name `dmandrianov/codex-web-kit-nextjs`, positive numeric repository ID, `owner.login: dmandrianov`, `owner.type: User`, boolean visibility field и immutable releases `enabled: true`.
- Existing Git status, branch, commit и tags — только read-only evidence.
- Для GitHub Actions publication: dedicated repository-scoped GitHub App, Actions variable `WEB_KIT_RELEASE_APP_CLIENT_ID` и secret `WEB_KIT_RELEASE_APP_PRIVATE_KEY`; app permissions только `Administration: read` и `Contents: write`.
- Явный publish authorization, если пользователь просит не только локальную сборку, но и конкретный Git/GitHub mutation.

## Ограничения

- Этот prompt maintainer-only. Не копируй source-only release tooling и maintainer reports в пользовательский payload.
- Без отдельного явного разрешения пользователя запрещены: `git init`, `git add`, `git commit`, `git tag`, `git push`, создание/смена remote, branch operations, merge/rebase, а также create/edit/publish GitHub Release.
- Разрешение `собери релиз`, `подготовь релиз` или `проверь релиз` покрывает только local build/verify и не разрешает commit, tag, push или публикацию.
- Если пользователь разрешил одну Git/GitHub mutation, не расширяй её на остальные. Например, разрешение создать commit не разрешает tag/push/release.
- Не инициируй новый Git repository автоматически. При отсутствии `.git` можно собрать local candidate, но нельзя объявить его publishable или выдумать commit SHA.
- Не публикуй release из dirty/uncommitted source tree. Можно собрать диагностический candidate, но verdict должен быть `not publishable`.
- Не изменяй version, changelog, migrations или release notes молча. Несогласованность является blocker либо требует отдельной content/version правки.
- Не включай root `README.md`, root project changelog/migrations, `.git/`, source-only docs/tooling, backups, downloads, conflicts, tmp, archives, secrets или пользовательские материалы в distributable payload.
- Не включай `prompts/_local/`, кроме seed `prompts/_local/README.md` с policy `create-if-missing`.
- Не собирай prerelease через manifest schema v1: текущий schema/updater contract поддерживает только stable SemVer/tag. Для prerelease сначала нужен отдельный согласованный schema/tooling change.
- Не создавай release archive без generated `.prompt-kit/manifest.json` и `.prompt-kit/.gitignore`.
- Manifest не должен хэшировать сам себя.
- Не собирай publishable candidate без корневого `LICENSE`, canonical MIT text, mapped required `.prompt-kit/TERMS.md`, positive numeric repository ID, canonical full name, trusted personal owner, public visibility и включённых immutable releases. Legacy target `.prompt-kit/TERMS.md` сохраняется для updater `0.8.x`, но не должен содержать закрытых подписочных ограничений.
- `repositoryId: null` и `repositoryFullName: null` допустимы только для local diagnostic candidate. Strict `--publish` обязан блокировать такую конфигурацию.
- Не запрашивай, не печатай и не сохраняй human GitHub tokens, private keys или другие secret values. Для локальной maintainer-работы используй существующую GitHub CLI session и не вызывай `gh auth token`. GitHub Actions publication использует только короткоживущий installation token отдельного repository-scoped GitHub App; Client ID хранится в Actions variable, private key — в Actions secret, а их значения нельзя выводить, сохранять в source/assets или передавать пользователям. Встроенного `github.token` недостаточно для immutable-settings endpoint с `Administration: read`.
- Не помещай персональные списки доступа или access ledger в source, manifest, release notes либо assets.
- Не объявляй candidate готовым без `prompts/_maintenance/02-check-kit-integrity.md` со status `passed`.
- Сообщения пользователю оформляй по `prompts/_knowledge/codex-user-response-quality.md`.

## Процесс

1. Определи requested mode:
   - `build candidate` — локально собрать artifacts;
   - `verify artifacts` — проверить уже собранные artifacts;
   - `publish` — возможен только при явном перечислении разрешённых Git/GitHub actions.
2. Запусти source preflight `node tools/release.mjs verify-source`. Если command отсутствует или не проходит, не заменяй его ручной публикацией и не продолжай к build как publishable candidate.
3. Проверь release metadata:
   - version является valid SemVer;
   - stable channel согласован с version/tag и schema v1;
   - managed marker `AGENTS.md`, `PROMPT_KIT_VERSION.md`, changelog и migrations указывают одну target version;
   - target version выше предыдущего stable release для обычного нового release;
   - changelog объясняет Added/Changed/Fixed/Guardrails/Migration по применимости;
   - breaking/confirmation flags основаны на migrations, а не на догадке;
   - корневой `LICENSE` существует, содержит unmodified MIT License с `Copyright (c) 2026 dmandrianov` и после сборки становится required `.prompt-kit/TERMS.md`;
   - changelog/migrations объясняют, что legacy target filename сохранён только для updater `0.8.x`, а лицензия самого проекта — MIT.
4. Проверь source tree read-only:
   - repository identity и current branch;
   - clean/dirty status;
   - current commit SHA, если Git уже существует;
   - existing target tag и release collision;
   - trusted repository identity: configured full name `dmandrianov/codex-web-kit-nextjs`, positive numeric ID, `owner.login: dmandrianov`, `owner.type: User`, `private: false`;
   - repository immutable releases configuration через documented GitHub API: `enabled: true`; ручного предположения или рекомендации недостаточно;
   - numeric ID совпадает с embedded updater trust anchor и release config; bootstrap full name нужен для documented API/redirect и publication checks, но не заменяет ID;
   - отсутствие secrets и явно запрещённых source artifacts в allowlist.
   Не исправляй Git state автоматически.
5. Определи candidate status до сборки:
   - `publishable candidate`, если source version согласована, Git repository уже существует, worktree clean, commit известен, trusted public personal identity подтверждена, immutable releases включены и MIT License готова;
   - `local diagnostic candidate`, если Git отсутствует, tree dirty или repository ID/full name ещё `null`;
   - `blocked`, если version/metadata/allowlist противоречат друг другу.
6. Собери curated payload только из release allowlist:
   - canonical `AGENTS.md` как source managed fragment;
   - kit-owned `prompts/**`;
   - seed `prompts/_local/README.md`;
   - source changelog и migrations, mapped в `.prompt-kit/CHANGELOG.md` и `.prompt-kit/MIGRATIONS.md`;
   - source version marker, mapped в `.prompt-kit/VERSION.md`;
   - manifest schema, mapped в `.prompt-kit/manifest.schema.json`;
   - dependency-free updater, mapped в `.prompt-kit/update.mjs`;
   - MIT License, mapped из source `LICENSE` в required compatibility target `.prompt-kit/TERMS.md`; отсутствие LICENSE блокирует publishable candidate;
   - `.prompt-kit/.gitignore` для local backup/download/conflict directories;
   - generated `.prompt-kit/manifest.json`.
7. Сгенерируй manifest v1:
   - `schemaVersion`;
   - `kit` identity/name/version/channel/release date;
   - `source.repositoryFullName`, positive numeric `source.repositoryId`, supported GitHub `source.transport`, tag и revision; для `0.9.0` legacy transport string допустима только как совместимый мост для updater `0.8.x`;
   - `release` archiveRoot/zipAsset/tarAsset/checksumAsset;
   - `compatibility` range, breaking и explicit-confirmation flags;
   - `managedBlocks.agents` markers;
   - exact sorted `files[]` с path, ownership, policy, required, SHA-256, bytes и mode; entry `AGENTS.md` дополнительно несёт `managedBlockSha256`;
   - explicit sorted `removed[]` с since, policy `delete-if-unmodified`, replacement/reason по применимости;
   - `protectedPaths` для Git, project-owned зон и `prompts/_local/**`.
   Manifest не включает собственный hash в `files[]`.
8. Нормализуй payload для воспроизводимости:
   - один top-level directory `web-kit-vX.Y.Z/`;
   - deterministic file order;
   - нормализованные безопасные file modes;
   - без symlinks/hardlinks и path traversal;
   - без host-specific absolute paths и timestamps, если tooling умеет их нормализовать.
9. Запусти `node tools/release.mjs build`. Он должен собрать локальные assets в canonical directory `dist/releases/vX.Y.Z/`:
   - `web-kit-vX.Y.Z.zip`;
   - `web-kit-vX.Y.Z.tar.gz`;
   - `SHA256SUMS` с checksum обоих архивов.
   Явный `--out` допустим только для CI/tests или если пользователь задал другой local output.
10. Запусти `node tools/release.mjs verify-artifacts`, затем распакуй каждый архив в отдельную временную папку и примени `prompts/_maintenance/02-check-kit-integrity.md` в mode `release candidate`.
11. Проверь parity ZIP/TAR.GZ:
    - одинаковые relative paths;
    - одинаковые content hashes;
    - одинаковые declared modes;
    - одинаковый manifest;
    - checksum обоих assets совпадает с `SHA256SUMS`.
12. Проверь distributable boundary:
    - root пользовательские имена не заняты;
    - source-only files отсутствуют;
    - `_local` содержит только seed README;
    - `.git`, backups, downloads, conflicts и secrets отсутствуют;
    - package не содержит вложенного repository.
13. Создай или обнови `docs/prompt-kit-release-preflight.md`. Зафиксируй, является ли candidate publishable или только diagnostic.
14. Остановись после local build/verify, если пользователь не дал отдельного явного разрешения на конкретные Git/GitHub mutations.
15. Если publish actions явно разрешены, перед каждой группой действий повторно проверь:
    - local integrity `passed`;
    - worktree clean;
    - commit SHA совпадает с manifest;
    - browser-authenticated GitHub CLI session активна без raw token transport;
    - configured repository существует, является public, принадлежит personal owner `dmandrianov` и имеет numeric ID, совпадающий с embedded updater/config/manifest trust anchor;
    - documented immutable-releases endpoint возвращает `enabled: true`;
    - target tag/release отсутствует;
    - assets относятся к этому commit/version;
    - permission scope пользователя покрывает ровно запрошенное действие.
    - при запуске Actions dedicated GitHub App установлен только на official repository и выдаёт token с `Administration: read` + `Contents: write`; token scoped к конкретным gh-dependent steps.
16. После явной publish authorization повтори strict source/build gate с `--tag vX.Y.Z --publish` по инструкции tooling. Эти флаги только ужесточают локальную проверку и сборку: они сами не создают commit/tag, не выполняют push и не публикуют GitHub Release. Отдельное разрешение всё равно требуется на каждую внешнюю mutation.
17. Публикуй только в безопасной последовательности: создай draft Release, прикрепи ZIP, TAR.GZ и `SHA256SUMS`, read-only сверь draft asset names/sizes/digests, затем опубликуй draft. Не создавай сразу опубликованный release с частичным набором assets.
18. После публикации read-only проверь GitHub Release: repository ID/personal owner/current visibility, tag, stable status, release notes, asset names/sizes, downloadable `SHA256SUMS` и `immutable: true`. С небольшим ограниченным retry выполни `gh release verify <tag> --repo <canonical-full-name> --format json`; отсутствие действительной подписанной attestation является blocker, а не warning. Не изменяй последующие состояния без нового разрешения.

## Output

Создай или обнови `docs/prompt-kit-release-preflight.md`:

```md
# Prompt Kit Release Preflight

## Requested mode and authorization

- Mode: build candidate / verify artifacts / publish
- Authorized Git actions:
- Authorized GitHub actions:
- Unauthorized actions not performed:

## Version and source

- Version:
- Channel:
- Tag:
- Repository bootstrap/canonical full name:
- Repository numeric ID:
- Repository ID/owner/visibility check:
- Immutable releases enabled:
- Release GitHub App scope/configured: `Administration: read` + `Contents: write` / no
- Branch:
- Commit:
- Worktree: clean/dirty/not a Git repository

## Release metadata

- Version files aligned: yes/no
- Changelog entry:
- Migration entry:
- MIT License source/mapped compatibility file:
- Compatibility:
- Breaking/confirmation flags:

## Built artifacts

- Output directory:
- ZIP:
- TAR.GZ:
- SHA256SUMS:

## Manifest

- Schema:
- Embedded/manifest repository ID aligned:
- Trusted `gh` transport:
- Managed files:
- Removed entries:
- Unsafe/project-owned targets:
- Manifest self-hash absent: yes/no

## Verification

- Integrity status:
- ZIP checksum/structure:
- TAR.GZ checksum/structure:
- ZIP/TAR parity:
- Published release immutable/attestation:
- Secret/unwanted-file scan:

## Publishability

- Verdict: publishable candidate / local diagnostic candidate / blocked / published
- Blockers:
- Warnings:

## Git and GitHub mutations

- `git init` performed: yes/no
- Authorization reference for any `yes`:
- Commit created:
- Tag created:
- Push performed:
- GitHub Release created/published:
- Draft assets verified before publish:

## Distribution boundary

- Root `LICENSE` detected as MIT: yes/no
- Packaged MIT License at legacy `.prompt-kit/TERMS.md`: yes/no
- Personal access ledger included in source/assets: no
- Human token requested/stored/logged: no
- Release workflow token: short-lived repository-scoped GitHub App installation / not used
- Closed subscription restrictions absent: yes/no

## Next action

- 
```

В сообщении пользователю сначала объясни:

- artifacts локально готовы или что мешает;
- candidate можно публиковать или он только диагностический;
- никакие Git/GitHub действия не выполнены без разрешения;
- какое одно разрешение или исправление нужно дальше.

Технические hashes, paths и commit/tag details показывай после человеческого итога. Формат ответа сверяй с `prompts/_knowledge/codex-user-response-quality.md`.

## Done when

- Target version и release metadata согласованы.
- Publishable candidate привязан к trusted personal repository через embedded positive numeric ID и owner `dmandrianov`, а repository immutable releases configuration подтверждена как `enabled: true`; null identity или выключенная immutability остаются blocker.
- Root `LICENSE` содержит canonical MIT License и включён как required `.prompt-kit/TERMS.md` compatibility target без закрытых подписочных ограничений.
- Curated payload не содержит project-owned/source-only/Git/secret artifacts.
- Manifest v1 создан и проверен.
- ZIP, TAR.GZ и SHA256SUMS собраны локально или проверены.
- Оба архива имеют один top-level directory и одинаковый payload.
- Publication выполняется только через draft с полным проверенным набором assets; опубликованный release имеет `immutable: true` и валидную signed attestation.
- Integrity status `passed` либо есть честный blocker.
- Candidate честно классифицирован как publishable/diagnostic/blocked.
- Без явной авторизации не выполнены git init/commit/tag/push и GitHub Release create/publish.
- Human GitHub credential и personal access ledger не запрошены, не выведены и не попали в source/assets; managed CI credential, если применим, не раскрыт.
- Пользователь получил понятный preflight report и одно следующее действие.

## Follow-up

Если local candidate не прошёл проверку, исправь только source/tooling issue и повтори этот prompt вместе с `prompts/_maintenance/02-check-kit-integrity.md`.

Если candidate publishable, остановись и попроси пользователя явно назвать разрешённые действия, например отдельно: создать release commit, создать tag, выполнить push, создать draft Release или опубликовать Release. Не считай общее `готово` или `продолжай` разрешением на все внешние mutations.

После явно разрешённой публикации проверь GitHub Release, `immutable: true`, signed attestation и local asset provenance read-only, затем обнови preflight report. Для `0.9.0` отдельно проверь два disposable-сценария: переход с установленного `0.8.0` через verified local archive + `--allow-breaking` и последующий remote update уже из canonical public personal repository. Убедись, что root source определяется GitHub как MIT и release archive содержит тот же текст лицензии по compatibility path.
