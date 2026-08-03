# Обновить Prompt Kit из доверенного GitHub Release безопасно

## Когда использовать

Когда в рабочем проекте пользователь говорит `обнови базу`, `обнови kit`, `обнови Prompt Kit`, просит проверить новую версию или указывает конкретный release Prompt Kit. Если из контекста ясно, что речь идёт о базе данных, этот промпт не используй.

Команда `обнови базу` является явным разрешением на обычное совместимое обновление до последнего стабильного GitHub Release и на обязательную цепочку update -> integrity -> alignment. Repository публичный; приглашение не требуется. Для проверки GitHub Release пользователь один раз входит в GitHub CLI через browser-based flow. Дополнительное подтверждение нужно только для legacy-перехода без установленного manifest, breaking migration, downgrade или конфликта локальных изменений. Смена trusted numeric repository ID и prerelease не поддерживаются manifest/updater schema v1 и не включаются простым подтверждением.

## Роль Codex

Ты действуешь как release migration engineer, безопасный updater и хранитель проектного контекста.

## Цель

Через browser-authenticated GitHub CLI найти immutable stable release в доверенном repository `dmandrianov/codex-web-kit-nextjs`, проверить неизменный numeric repository ID, личного владельца, подписанную release/asset attestation, архив и manifest, обнаружить конфликты до записи, сделать backup, обновить только управляемые файлы Prompt Kit, сохранить Git и проектные файлы пользователя, затем пройти integrity check и workflow alignment.

## Контекст, который нужно дать

- Корень текущего рабочего проекта.
- Текущий `.prompt-kit/manifest.json`, если он есть.
- Текущий `AGENTS.md`.
- Текущий `prompts/OWNERSHIP.md`, если он есть.
- `.prompt-kit/CHANGELOG.md` и `.prompt-kit/MIGRATIONS.md`, если они есть.
- Для legacy-install без manifest: `PROMPT_KIT_VERSION.md`, `CHANGELOG.md`, `MIGRATIONS.md` и версия managed-блока, если они есть.
- `docs/project-state.md` и предыдущие maintenance reports, если они есть.
- Встроенный в shipped updater numeric repository ID как trust anchor.
- Last-known `repositoryFullName` и matching `repositoryId` из установленного manifest.
- Read-only evidence `gh auth status --hostname github.com`, без вывода токена.
- Для перехода `0.8.x -> 0.9.0`: отдельно скачанные и проверенные `web-kit-v0.9.0.tar.gz` и `SHA256SUMS`; переход запускается локально с `--allow-breaking`, не обращается к GitHub и сохраняет прежний numeric repository ID.

## Ограничения

- Обновляй только exact target paths и policies из проверенного incoming `.prompt-kit/manifest.json`.
- Не заменяй весь проект и не копируй release поверх корня вслепую.
- Не удаляй и не перезаписывай `docs/`, `src/`, `public/`, `project-brief.md`, package files, lockfiles, пользовательские материалы и другие project-owned файлы.
- Не удаляй и не перезаписывай содержимое `prompts/_local/`; допустим только seed-файл с policy `create-if-missing`.
- Не перезаписывай root `README.md`, `CHANGELOG.md`, `MIGRATIONS.md` или другие одноимённые файлы проекта. Release history Prompt Kit живёт в `.prompt-kit/`.
- В `AGENTS.md` меняй только один блок между `PROMPT_KIT:BEGIN` и `PROMPT_KIT:END`. Всё вне него сохраняй byte-for-byte, насколько позволяют файловые инструменты.
- Не применяй legacy transition, breaking migration или downgrade без явного подтверждения пользователя.
- Не принимай manifest, чей numeric repository ID отличается от ID, встроенного в shipped updater, даже после общего подтверждения. Новый ID требует отдельной trusted migration и обновления trust anchor, а не обычного schema v1 update.
- Не устанавливай prerelease через schema v1: остановись и объясни, что сначала нужен совместимый schema/tooling release.
- Не записывай файлы проекта до проверки release metadata, archive checksum, manifest, payload hashes, compatibility и полного conflict plan.
- При любом unresolved conflict не делай частичное обновление.
- Не выполняй `git init`, `clone`, `fetch`, `pull`, `merge`, `rebase`, `checkout`, `reset`, `clean`, `remote add/set-url`, `submodule`, `add`, `commit`, `tag`, `push` или создание GitHub Release.
- Не меняй `.git/`, remotes, ветки, hooks, credentials или настройки Git пользователя. Разрешены только read-only проверки вроде `git status` и `git diff` для отчёта.
- Не проси пользователя вставлять access token или другой секрет в чат, команду, `.env` или документацию. Используй browser-authenticated GitHub CLI session. Не читай и не печатай token, не вызывай `gh auth token`, не передавай дочерним процессам `GH_TOKEN`, `GITHUB_TOKEN`, `GITHUB_PAT` или `PAT`.
- Если `gh` отсутствует или сессия не активна, остановись до записи и попроси один раз выполнить browser-based `gh auth login`. Если trusted public repository недоступен, текущая скачанная версия остаётся доступной локально по MIT, но remote update временно недоступен.
- Не запускай сайт, scaffold, formatter или dependency install, если задача только про обновление Prompt Kit.
- Сообщения пользователю оформляй по `prompts/_knowledge/codex-user-response-quality.md`.

## Процесс

1. Определи intent:
   - `check only`, если пользователь просит только проверить наличие версии;
   - `latest stable update`, если пользователь говорит `обнови базу` без номера;
   - `exact stable version`, если пользователь явно указал tag/version. Текущий network updater получает только latest stable; exact stable разрешён только через отдельно скачанные official TAR.GZ + matching `SHA256SUMS` и обязательную expected tag/version binding;
   - `local verified archive`, если пользователь явно передал archive + matching checksum file. Этот mode не вызывает `gh`, но всё равно проверяет embedded/manifest repository ID.
2. Определи installed state:
   - canonical: прочитай `.prompt-kit/manifest.json`;
   - legacy: если manifest отсутствует, осторожно определи версию по managed marker и старому `PROMPT_KIT_VERSION.md`;
   - blocked: если источники версии противоречат друг другу или manifest повреждён.
3. Для remote intent проверь source access и identity до любых project writes:
   - `gh` установлен;
   - `gh auth status --hostname github.com` подтверждает browser-authenticated session;
   - numeric `source.repositoryId` установленного manifest является положительным числом и совпадает с ID, встроенным в updater;
   - запрос через documented `repos/{owner}/{repo}` endpoint использует bootstrap/last-known `repositoryFullName`, следует штатному GitHub redirect и возвращает numeric ID, равный embedded trust anchor, `owner.login: dmandrianov`, `owner.type: User` и корректное boolean-поле `private`;
   - canonical `full_name` из ответа используется для дальнейших release/tag/download calls; bootstrap name помогает найти endpoint, но не заменяет ID trust anchor.
   Если любой пункт не выполнен, остановись до staging и project writes. Не предлагай token как обходной путь. Для `local verified archive` пропусти только `gh` access checks; source identity, checksum и manifest gates остаются обязательными после staging.
4. Через read-only `gh api` найди последний release в verified canonical repository:
   - только latest stable, не draft и не prerelease;
   - `immutable` обязан быть `true`;
   - до скачивания `gh release verify <tag> --repo <canonical-full-name> --format json` обязан подтвердить действительную подписанную release attestation;
   - зафиксируй release ID, tag, target commit/revision и asset URLs до скачивания.
   Exact stable version не ищется network updater через отдельный endpoint: она поддерживается только как заранее отдельно скачанные official TAR.GZ + matching `SHA256SUMS`, чьи local bytes независимо проверены по signed release attestation до запуска updater.
5. Сравни версии:
   - если installed version равна target, всё равно потребуй совпадение installed `source.revision` с immutable GitHub tag; только после этого не создавай backup и ничего не заменяй, сообщи `already current` и при необходимости запусти read-only integrity check;
   - если target ниже installed, остановись как downgrade;
   - если target является prerelease, остановись как unsupported under schema v1, даже если пользователь его запросил;
   - если пользователь просил только проверить, покажи from/to и release notes без скачивания или записи.
6. Скачай во временную папку canonical updater assets `web-kit-vX.Y.Z.tar.gz` и `SHA256SUMS` через `gh release download --repo <canonical-full-name>`. До extraction выполни `gh release verify-asset <tag> <local-file> --repo <canonical-full-name> --format json` отдельно для TAR.GZ и `SHA256SUMS`; local bytes обоих файлов обязаны совпасть с signed release attestation. ZIP остаётся эквивалентным release/manual asset, но автоматический updater не должен выбирать его, пока используемый release tool не поддерживает такую же безопасную ZIP extraction. Для любого local `--archive` mode matching checksum file обязателен; этот mode допустим только после внешней проверки происхождения файлов и не вызывает `gh`. Не клонируй repository и не создавай вложенный `.git`.
7. Проверь SHA-256 архива по точной строке из уже attested `SHA256SUMS`. При отсутствующей или несовпадающей checksum остановись до распаковки и записи.
8. Безопасно распакуй архив во staging:
   - разрешён ровно один top-level каталог `web-kit-vX.Y.Z/`;
   - запрети absolute paths, `..`, duplicate paths, symlinks, hardlinks и вложенный `.git`;
   - не распаковывай напрямую в рабочий проект.
9. Проверь incoming `.prompt-kit/manifest.json`:
   - поддерживаемый `schemaVersion`;
   - `kit.id`, `kit.name`, stable channel, release date, version и tag согласованы с выбранным release;
   - `source.repositoryId` совпадает со встроенным trusted ID, а `source.repositoryFullName` совпадает с canonical full name после documented endpoint/redirect и проверки numeric ID;
   - `source.transport` равен `github-release-gh` или совместимому legacy-значению `private-github-organization-gh`, оставленному только для мостового release `0.9.0`;
   - `release.archiveRoot`, `release.zipAsset`, `release.tarAsset` и `release.checksumAsset` согласованы с version и скачанными assets;
   - `source.tag` и `source.revision` совпадают с зафиксированным release/tag/target commit evidence, а не только имеют похожий формат;
   - `compatibility.compatibleFrom`, `breaking`, `requiresExplicitConfirmation` и `minimumUpdaterSchemaVersion` поддерживаются updater;
   - `managedBlocks.agents` содержит canonical begin/end markers;
   - `files[]` и `removed[]` отсортированы и содержат только безопасные относительные пути без exact/case-fold дублей;
   - каждый payload file имеет ожидаемые SHA-256, bytes, mode, ownership и policy;
   - `protectedPaths` защищает Git, project-owned зоны и `prompts/_local/**`;
   - manifest не пытается управлять project-owned путями, `.git/` или содержимым `prompts/_local/`, кроме разрешённого seed;
   - required `.prompt-kit/TERMS.md` присутствует, хэширован и содержит MIT License, скопированную из root `LICENSE` в этот legacy path для совместимости updater `0.8.x`.
   - incoming `.prompt-kit/update.mjs` содержит ровно один canonical trust marker: его embedded repository ID совпадает с текущим shipped updater, а embedded full name совпадает с canonical `source.repositoryFullName` incoming manifest; редактируемый manifest не может незаметно подменить trust anchor следующего обновления.
10. Прочитай incoming `.prompt-kit/MIGRATIONS.md`, current/incoming ownership rules и release notes для диапазона from -> to.
11. До plan проверь каждый существующий компонент всех target/backup/manifest/rollback путей через filesystem metadata/realpath и запрети symlink parent, который может вывести запись за реальный корень проекта. Затем построй полный preflight plan до записи. Для каждого path используй installed manifest как baseline:
    - local hash равен old manifest hash — `safe replace`;
    - local hash уже равен incoming hash — `already applied`;
    - existing kit-owned или managed fragment отличается от old baseline — `local conflict`;
    - новый path отсутствует — `safe create`;
    - новый path уже существует с другим содержимым — `collision conflict`;
    - seed `create-if-missing` уже существует — `preserve`;
    - removed path не менялся — применить `delete-if-unmodified`;
    - removed path изменён — `manual conflict`: сохранить, заблокировать всю автоматическую транзакцию и не удалять;
    - неизвестные local-only файлы не удалять.
12. Для `AGENTS.md` отдельно проверь:
    - ровно один begin marker и один end marker в правильном порядке;
    - hash только текущего managed fragment против installed baseline;
    - incoming fragment соответствует manifest;
    - prefix и suffix проекта не попадут под замену.
13. До изменений остановись и запроси явное подтверждение, если:
    - `.prompt-kit/manifest.json` отсутствует и это первый legacy transition;
    - manifest требует confirmation или migration является breaking;
    - есть local conflict, collision, ambiguous removal или повреждённые markers;
    - запрошен downgrade.
    Покажи последствия и точный список затрагиваемых путей. Фраза `обнови базу` уже достаточна для обычного clean non-breaking update с валидным installed manifest.
    Prerelease, отсутствующий/неактивный `gh`, недоступный trusted repository, несовпадение embedded/manifest/remote numeric ID, неверный owner или unsupported transport под schema v1 не являются confirmation cases: это unsupported или access blockers. Уже скачанная версия остаётся пригодной локально по MIT; updater просто не получает remote release.
14. После чистого preflight и всех нужных подтверждений создай transaction backup в `.prompt-kit/backups/<timestamp>/` до первого target write. Сохрани:
    - полный текущий `AGENTS.md`;
    - текущий `.prompt-kit/manifest.json` и namespaced history/migrations;
    - каждый файл, который будет заменён или удалён;
    - machine-readable список originally missing paths, чтобы rollback мог удалить только созданные этой транзакцией файлы.
15. Непосредственно перед apply повтори проверку реального project boundary и отсутствия symlink parents, затем примени план из verified staging через dependency-free updater, чей hash уже проверен manifest. Для manifest-based install используй установленный `.prompt-kit/update.mjs`, если его schema совместима; для первого legacy transition допустим verified incoming `.prompt-kit/update.mjs`. Транзакция должна:
    - `replace-if-unmodified` — только для прошедших baseline check;
    - `create-if-missing` — только если target отсутствует;
    - `managed-block` — замени только verified fragment внутри `AGENTS.md`;
    - `removed[]` — только по заявленной policy;
    - выполнить внутреннюю проверку фактически установленного payload;
    - записать incoming manifest последним managed payload write только после этой внутренней проверки.
16. После успешного возврата updater используй полученный backup path и отдельно сохрани в его `reports/` существующие `docs/prompt-kit-update-summary.md`, `docs/prompt-kit-integrity.md`, `docs/prompt-kit-workflow-alignment.md` и `docs/project-state.md`, если они существуют. Это snapshot maintenance reports перед их обновлением, а не часть manifest payload. Затем запусти полный `prompts/_maintenance/02-check-kit-integrity.md` в installed mode против нового installed manifest.
17. Если apply, внутренняя проверка updater или полный integrity check не прошли:
    - останови транзакцию;
    - восстанови заменённые/удалённые файлы из backup;
    - удали только paths, которые отсутствовали до транзакции и были созданы ею;
    - восстанови прежний installed manifest, в том числе через transaction rollback command из backup, если updater уже успел его записать;
    - зафиксируй status `rolled back` и честный blocker;
    - не запускай alignment.
18. После passed полного integrity проверь, что installed `.prompt-kit/manifest.json` совпадает с verified incoming manifest и является последним managed payload write этой транзакции. Не переписывай его повторно без причины.
19. Создай или обнови `docs/prompt-kit-update-summary.md`, затем без дополнительного запроса запусти `prompts/_maintenance/04-align-project-after-kit-update.md`. Это одна maintenance-транзакция, а не несколько крупных website stages.
20. Очисти staging/downloads. Backup не удаляй. Покажи read-only Git diff/status, если проект использует Git, но ничего не коммить и не меняй его настройки.
21. Если release меняет `AGENTS.md`, явно предупреди: уже открытая задача сохраняет прежнюю instruction chain; новая версия managed-правил действует в новой задаче того же проекта. Не называй это ошибкой cache и не проси перезапускать весь компьютер.

## Output

Создай или обнови `docs/prompt-kit-update-summary.md`:

```md
# Prompt Kit Update Summary

## Result

- Status: already current / updated / blocked / rolled back
- Date:

## Source

- Repository ID:
- Repository bootstrap full name:
- Repository canonical full name:
- Repository ID/owner/visibility check:
- Release tag:
- Release URL:
- Asset:
- Discovery mode: latest stable / exact stable archive / legacy bootstrap

## Private access

- GitHub CLI available: yes/no/not needed for local archive
- Browser-authenticated session: passed/failed/not needed
- Repository read access: passed/revoked/failed/not needed
- Token requested/read/logged: no

## Versions

- From:
- To:
- Installed manifest before:
- Installed manifest after:

## Verification

- SHA256SUMS found: yes/no
- Archive SHA-256 expected:
- Archive SHA-256 actual:
- Archive checksum: passed/failed/not downloaded
- Manifest schema/source/version: passed/failed
- Payload hashes: passed/failed

## Compatibility and authorization

- Legacy transition: yes/no
- Breaking migration: yes/no
- Explicit confirmation required: yes/no
- Explicit confirmation received: yes/no/not needed

## Backup and rollback

- Backup path:
- Rollback needed: yes/no
- Rollback result:

## Applied plan

- Added:
- Replaced:
- Removed:
- Preserved:
- Already current:

## Conflicts

| Path | Policy | Local state | Incoming state | Resolution |
| --- | --- | --- | --- | --- |

## AGENTS.md merge

- Managed block updated: yes/no
- Project-specific content preserved: yes/no/not checked
- Manual conflicts:

## Project and Git safety

- Project-owned files preserved: yes/no
- `prompts/_local/` preserved: yes/no
- Git repository detected: yes/no
- Git remotes/branches/hooks changed: no
- Git commit/tag/push performed: no

## Integrity and alignment

- Integrity status:
- Integrity report: `docs/prompt-kit-integrity.md`
- Alignment status:
- Alignment report: `docs/prompt-kit-workflow-alignment.md`

## Next action

- 
```

В сообщении пользователю сначала обычными словами покажи:

- обновление установлено, уже было актуальным, заблокировано или откатилось;
- from/to version;
- зачем остановка безопасна, если есть конфликт;
- где backup;
- что сохранено;
- требуется ли одно точное действие пользователя.

Технические checksum, manifest и Git details показывай после человеческого итога. Формат ответа сверяй с `prompts/_knowledge/codex-user-response-quality.md`.

## Done when

- Remote release найден только через browser-authenticated `gh` в доверенном repository, чей numeric ID и личный owner совпадают с embedded trust anchor; local archive mode не вызывает `gh`.
- Canonical full name получен через documented slug endpoint и GitHub redirect, затем подтверждён embedded numeric ID; rename/transfer того же ID принят, новый ID заблокирован до trusted migration.
- Stable-only schema v1 и downgrade policy соблюдены; prerelease не установлен.
- Archive checksum и manifest проверены до записи.
- MIT License по compatibility path `.prompt-kit/TERMS.md` проверена как kit-owned payload.
- Полный conflict plan построен по installed manifest до изменений.
- Первый legacy transition и breaking update не выполнены без подтверждения.
- Backup создан до target writes.
- Обновлены только разрешённые manifest paths и managed-блок `AGENTS.md`.
- Project-owned файлы и `prompts/_local/` сохранены.
- Git repository, remotes, branches, hooks и history пользователя не изменены.
- Токен/credential не запрошен, не прочитан, не выведен и не сохранён; token environment не передан дочерним процессам.
- При ошибке выполнен проверяемый rollback.
- Installed manifest записан updater последним managed payload write только после внутренней transactional verification; failure последующего полного integrity вызывает rollback к прежнему manifest.
- Integrity и alignment завершены либо есть честный blocker.
- Пользователь получил понятный summary.

## Follow-up

Если `AGENTS.md` не содержит безопасного managed-блока, используй `prompts/_maintenance/03-migrate-agents-md.md`, затем вернись к этому preflight.

Во время clean update автоматически используй `prompts/_maintenance/02-check-kit-integrity.md`, а после passed integrity — `prompts/_maintenance/04-align-project-after-kit-update.md`; отдельное подтверждение между ними не требуется.

Если обновление заблокировано конфликтом, legacy transition или breaking migration, дождись одного точного решения пользователя и повтори preflight. Не продолжай обычный website workflow, пока maintenance-транзакция не завершена или честно не отменена.

Если отсутствует GitHub CLI session, попроси пользователя один раз выполнить `gh auth login --hostname github.com --web` и повтори remote preflight. Если public repository временно недоступен, не проси секрет и не удаляй установленный kit: объясни, что скачанную версию можно продолжать использовать по MIT, но remote releases временно недоступны.

Если repository получил новый numeric ID, ordinary update не продолжай. Нужна maintainer-prepared trusted migration с явной сменой embedded trust anchor и отдельным подтверждением пользователя.

Если старый bootstrap `owner/name` после rename/transfer уже занят другим repository, numeric-ID check обязан заблокировать update. Не переключайся на найденный repository; используй trusted migration или вручную проверенный official archive с новым updater/bootstrap slug.
