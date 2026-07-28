# Владение файлами Prompt Kit

Этот контракт определяет, что updater может менять в рабочем проекте, а что обязан сохранить. Официальный источник — GitHub repository, закреплённый положительным numeric repository ID в поставляемом updater. Installed и incoming manifests обязаны содержать тот же ID. `repositoryFullName` хранит последнее известное имя и может измениться при проверенном GitHub rename/transfer без смены доверенного ID; canonical owner должен оставаться `dmandrianov`.

## Главное правило

Updater применяет только пути, перечисленные в установленном `.prompt-kit/manifest.json`, и только внутри жёсткого distribution allowlist. Manifest не может разрешить изменение исходников сайта, проектной документации или Git-настроек.

Любой неизвестный путь считается пользовательским и сохраняется.

## Kit-owned в установленном проекте

Эти файлы поставляются release package и могут обновляться по manifest policy:

- `.prompt-kit/CHANGELOG.md`
- `.prompt-kit/MIGRATIONS.md`
- `.prompt-kit/VERSION.md`
- `.prompt-kit/manifest.schema.json`
- `.prompt-kit/update.mjs`
- `.prompt-kit/.gitignore`
- `.prompt-kit/TERMS.md` — MIT License по legacy compatibility path
- `prompts/README.md`
- `prompts/INDEX.md`
- `prompts/ROUTER.md`
- `prompts/STATE.md`
- `prompts/OWNERSHIP.md`
- `prompts/_guidelines/`
- `prompts/_knowledge/`
- `prompts/_templates/`
- `prompts/_maintenance/`
- `prompts/00-intake-brief/`
- `prompts/01-project-rules/`
- `prompts/02-project-strategy/`
- `prompts/03-research/`
- `prompts/04-information-architecture/`
- `prompts/05-design-system/`
- `prompts/06-nextjs-setup/`
- `prompts/07-page-planning/`
- `prompts/08-block-build/`
- `prompts/09-quality/`
- `prompts/10-handoff/`
- `prompts/11-ecommerce/`
- `prompts/12-deployment/`
- `prompts/13-technical-seo/`

`.prompt-kit/manifest.json` — особый installed baseline. Он содержит установленную версию, numeric repository ID, последнее известное полное имя upstream, точный inventory и hashes. Updater записывает новый manifest последним, только после успешного update, integrity check и rollback-safe завершения транзакции.

## Source-only в репозитории kit

В исходном source repository Web Kit есть файлы, нужные для разработки и выпуска, но не для копирования поверх пользовательского проекта:

- корневые `README.md`, `CHANGELOG.md`, `MIGRATIONS.md`, `PROMPT_KIT_VERSION.md` и `LICENSE`;
- `docs/` с maintainer-документацией;
- `tools/`, `.github/`, release configuration и tests;
- `.gitignore`, `.gitattributes`.

При сборке source `CHANGELOG.md`, `MIGRATIONS.md` и `LICENSE` попадают в package как `.prompt-kit/CHANGELOG.md`, `.prompt-kit/MIGRATIONS.md` и `.prompt-kit/TERMS.md`. Последний target сохраняет legacy filename для updater `0.8.x`, но содержит canonical MIT License. Корневые документы сайта пользователя не заменяются.

## Project-owned

Updater никогда не перезаписывает и не удаляет:

- `README.md`, `CHANGELOG.md`, `MIGRATIONS.md` рабочего сайта;
- `project-brief.md`;
- `docs/project-state.md`;
- `docs/project-rules.md`;
- `docs/strategy.md`;
- `docs/messaging.md`;
- `docs/research/`;
- `docs/ia/`;
- `docs/design-system/`;
- `design-lab/`;
- `docs/nextjs/`;
- `docs/pages/`;
- `docs/ecommerce/`;
- `docs/deployment/`;
- `docs/seo/`;
- `docs/handoff/`;
- `src/`, `public/`, `package.json` и lockfiles;
- `.git/`, корневые `.gitignore` и `.gitattributes`;
- `.env*`, secrets и access files;
- пользовательские материалы, media, transcripts и screenshots;
- любые пути, не зарегистрированные как kit-owned в installed manifest.

Update reports остаются project-owned:

- `docs/prompt-kit-update-summary.md`;
- `docs/prompt-kit-integrity.md`;
- `docs/prompt-kit-workflow-alignment.md`;
- `docs/agents-md-migration.md`.

## Hybrid: AGENTS.md

`AGENTS.md` состоит из двух зон:

- updater меняет только единственный блок между `<!-- PROMPT_KIT:BEGIN managed ... -->` и `<!-- PROMPT_KIT:END -->`;
- всё вне managed-блока сохраняется байт-в-байт;
- project-specific правила должны находиться снаружи managed-блока или в `docs/project-rules.md`.

Если markers отсутствуют, повторяются или повреждены, обычное обновление останавливается и передаёт работу в `prompts/_maintenance/03-migrate-agents-md.md`.

## Seed и локальная настройка

`prompts/_local/README.md` поставляется с policy `create-if-missing`. Updater может создать его при первой установке, но не заменяет существующий файл.

Пользовательские расширения хранятся в:

- `prompts/_local/`;
- `docs/project-rules.md`;
- `docs/codex-preferences.md`.

Не редактируй distributed prompts напрямую, если не готов вручную разбирать конфликт при следующем обновлении.

## Политика изменённых и удалённых файлов

- Kit-owned файл заменяется автоматически только при совпадении текущего SHA-256 с installed baseline.
- Локально изменённый kit-owned файл создаёт preflight conflict и не перезаписывается.
- Отсутствующий kit-owned файл можно восстановить из release.
- Файл, удалённый upstream, удаляется только при совпадении со старым baseline hash.
- Изменённый удаляемый файл сохраняется и требует ручного решения.
- Breaking migration применяется только после явного подтверждения пользователя.

## Backup и временные файлы

Перед записью создаётся backup:

`.prompt-kit/backups/YYYY-MM-DD-HHMM/`

Временные загрузки и conflict evidence хранятся в:

- `.prompt-kit/downloads/`;
- `.prompt-kit/conflicts/`.

Эти папки исключаются локальным `.prompt-kit/.gitignore`. Updater не меняет корневой `.gitignore` проекта.

## Git проекта

Prompt Kit не владеет `.git/`. Updater не выполняет `git pull`, merge, rebase, commit или push, не добавляет remote/submodule и не меняет `.git/config`, hooks, index или branches. Обновление появляется как обычный локальный diff в собственном репозитории пользователя.

## Доступ к GitHub Releases

Browser-authenticated GitHub CLI session принадлежит пользователю и живёт вне проекта. Конкретный способ хранения credential выбирает сам `gh` и операционная система. Updater может выполнять через `gh` только read-only проверки repository/release, signed attestation, local asset provenance и скачивание assets. Он принимает только immutable release, не использует raw token variables, не сохраняет token, не вызывает `gh auth token`, не принимает `GH_TOKEN`, `GITHUB_TOKEN`, `GITHUB_PAT` или `PAT` как transport и не копирует credential store в backup либо release.

Любые персональные данные и журнал выдачи/отзыва доступа принадлежат внешней системе владельца Web Kit. Они не являются kit payload, project-owned документами сайта или source-файлами repository и не должны попадать в manifest.
