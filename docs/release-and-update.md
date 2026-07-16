# Закрытые релизы и безопасное обновление Prompt Kit

Prompt Kit публикуется в приватном репозитории GitHub Organization. Git хранит историю исходной базы, теги и описание релизов, но доступ к ним получают только подписчики, добавленные как `outside collaborator` с ролью `Read`. Рабочий проект пользователя получает подготовленный release package без чужой `.git`-истории.

Ссылка на repository или release сама по себе не открывает доступ, но `TERMS.md` запрещает без письменного разрешения публиковать или передавать третьим лицам точный URL закрытого источника. Для подписки владелец хранит вне репозитория связку `payment email + GitHub username`: email используется для учёта оплаты и связи, а username является фактической границей GitHub access. Приглашение выдаётся именно этой учётной записи и удаляется после окончания подписки. Email подписчика, платёжные данные и список доступов не должны попадать в source history, release assets или проект пользователя.

## Модель закрытого доступа

- Repository обязан быть приватным и принадлежать GitHub Organization, чтобы подписчику можно было выдать только роль `Read`.
- Подписчик один раз авторизует GitHub CLI через браузер. Updater использует сохранённую GitHub CLI сессию только для чтения metadata и release assets.
- Пользователь не передаёт Codex токен, пароль или ключ. Updater не использует, не передаёт дочерним процессам, не печатает и не сохраняет `GH_TOKEN`, `GITHUB_TOKEN`, personal access token или результат `gh auth token`.
- Корнем доверия является положительный числовой GitHub repository ID, встроенный в опубликованный updater. Installed и incoming manifests обязаны содержать тот же ID. Редактируемый manifest сам по себе не может сменить источник доверия.
- `repositoryFullName` хранит bootstrap/последнее известное `ORG/repository` для обращения к документированному `repos/{owner}/{repo}` endpoint, человека и publication checks, но не является источником доверия. При rename или transfer updater следует штатному GitHub redirect и принимает возвращённое canonical full name только после проверки встроенного numeric ID, `private: true` и owner типа `Organization`.
- Полностью новый repository имеет другой ID и не принимается как обычное обновление. Для него нужен отдельно подготовленный trusted migration, проверяемая связь со старым источником и явное подтверждение пользователя.
- Для repository обязательно включены immutable releases. Updater принимает только опубликованный stable release с `immutable: true`, валидной подписанной GitHub attestation и локальными asset digests, совпадающими с этой attestation.
- После отзыва доступа remote update останавливается до любых изменений проекта. Уже установленная версия продолжает работать локально.

Maintainer automation использует отдельный контур доступа, который не передаётся подписчикам. Для `.github/workflows/release.yml` создай private GitHub App, установи его только на official repository и выдай только repository permissions `Administration: read` и `Contents: write`. Сохрани Client ID как Actions variable `WEB_KIT_RELEASE_APP_CLIENT_ID`, private key как Actions secret `WEB_KIT_RELEASE_APP_PRIVATE_KEY`. Workflow выпускает из них короткоживущий installation token; не подменяй эту схему общим PAT подписчиков или job-wide secret.

## Две разные среды

### Исходный репозиторий kit

В исходном репозитории находятся файлы для разработки и публикации:

- корневые `README.md`, `CHANGELOG.md`, `MIGRATIONS.md` и `PROMPT_KIT_VERSION.md`;
- корневой `TERMS.md` с закрытыми условиями использования;
- `AGENTS.md` и распространяемая библиотека `prompts/`;
- release tooling, GitHub workflows, проверки и maintainer-документация.

Корневые release-документы относятся к исходному репозиторию. Они не должны вслепую копироваться поверх одноимённых файлов сайта пользователя.

Generated и внутренние рабочие артефакты не входят в source history: `dist/`, старые archives, `tmp/`, audits, prompt-kit backups, local conflicts/downloads, secrets, subscriber access ledger и дублирующая корневая `templates/`. Канонические шаблоны находятся в `prompts/_templates/`.

### Установленный kit в проекте

В рабочем проекте установленная версия определяется по `.prompt-kit/manifest.json`. Release notes и инструкции миграции лежат в namespaced-файлах:

- `.prompt-kit/VERSION.md`;
- `.prompt-kit/CHANGELOG.md`;
- `.prompt-kit/MIGRATIONS.md`;
- `.prompt-kit/TERMS.md`.

Так Prompt Kit не захватывает корневые `README.md`, `CHANGELOG.md` или `MIGRATIONS.md` самого сайта.

## Что получает пользователь

Release package содержит только разрешённый payload:

- шаблон managed-блока `AGENTS.md`;
- распределяемые файлы `prompts/`;
- `.prompt-kit/manifest.json`;
- `.prompt-kit/VERSION.md` и schema manifest;
- namespaced changelog и migrations;
- `.prompt-kit/TERMS.md`, собранный из source `TERMS.md`;
- локальный `.prompt-kit/update.mjs`, который выполняет только download/preflight/apply и не управляет Git;
- служебный `.prompt-kit/.gitignore` для временных загрузок, backup и conflict-файлов.

`prompts/_local/README.md` является seed-файлом: он создаётся только при отсутствии. Остальное содержимое `prompts/_local/` принадлежит проекту и никогда не заменяется релизом.

В package не входят source-only docs, audit evidence, старые backup, `tmp/`, готовые архивы, корневая `templates/`, исходники сайта и пользовательские материалы.

### Первая установка и вход в GitHub

До первого скачивания подписчик принимает приглашение в приватный repository и один раз выполняет browser-based вход:

```bash
gh auth login --hostname github.com --web
```

GitHub CLI хранит данные сессии вне проекта; он использует доступное системное защищённое хранилище, а при его отсутствии может применить собственный fallback. Следуй предупреждениям `gh` и не вставляй токен в чат, команду, `.env`, manifest, документацию или проект. Если GitHub CLI отсутствует, сначала установи его официальным способом для своей операционной системы.

После входа сначала проверь подписанную attestation initial release, затем скачай его official assets через GitHub CLI из repository, указанного владельцем подписки. Пример с условным именем:

```bash
gh release verify vX.Y.Z --repo ORG/web-kit --format json
gh release download vX.Y.Z --repo ORG/web-kit --dir /downloads/web-kit-vX.Y.Z
```

До распаковки проверь локальные TAR.GZ и `SHA256SUMS` по подписанной attestation, затем обе строки в `SHA256SUMS`. Так первая установка не исполняет код из архива, который ещё не был независимо проверен:

```bash
gh release verify-asset vX.Y.Z \
  /downloads/web-kit-vX.Y.Z/web-kit-vX.Y.Z.tar.gz \
  --repo ORG/web-kit --format json
gh release verify-asset vX.Y.Z \
  /downloads/web-kit-vX.Y.Z/SHA256SUMS \
  --repo ORG/web-kit --format json
cd /downloads/web-kit-vX.Y.Z && sha256sum --check SHA256SUMS
```

Не распаковывай package поверх рабочего проекта. Только после успешных внешних проверок распакуй TAR.GZ во временную папку и запусти installer из проверенного payload:

```bash
node /tmp/web-kit-vX.Y.Z/.prompt-kit/update.mjs install \
  --project /path/to/your-project \
  --archive /downloads/web-kit-vX.Y.Z/web-kit-vX.Y.Z.tar.gz \
  --checksum-file /downloads/web-kit-vX.Y.Z/SHA256SUMS
```

Даже при первой установке installer проверяет checksum и точный manifest, обнаруживает занятые official paths до записи и не меняет Git проекта. Если существующий `AGENTS.md` ещё не имеет managed-блока, Codex сначала выполняет контролируемую migration, а не заменяет файл целиком.

## Фраза «обнови базу»

Если пользователь пишет `обнови базу`, Codex:

1. читает установленный `.prompt-kit/manifest.json`;
2. сверяет positive numeric `source.repositoryId` с ID, встроенным в updater, и проверяет browser-authenticated GitHub CLI session;
3. обращается к bootstrap/last-known full name через documented `repos/{owner}/{repo}` endpoint, следует GitHub rename/transfer redirect и принимает canonical имя только при встроенном ID, `private: true` и владельце типа `Organization`;
4. проверяет последний stable GitHub Release: не draft, не prerelease, `immutable: true`, с ожидаемыми assets, tag и revision, а также валидной подписанной release attestation;
5. сравнивает версии и, даже если номер уже совпадает, сверяет revision с immutable tag;
6. скачивает release assets во временную папку через `gh release download`;
7. до распаковки проверяет локальные TAR.GZ и `SHA256SUMS` через `gh release verify-asset`, затем сверяет архив с `SHA256SUMS` и проверяет manifest, repository ID, актуальное полное имя, revision и безопасные пути;
8. строит полный план обновления до любых изменений;
9. выполняет транзакцию по `prompts/_maintenance/01-update-prompt-kit.md`;
10. внутри транзакции проверяет установленный payload и записывает новый manifest последним managed payload write;
11. запускает полный integrity check по `prompts/_maintenance/02-check-kit-integrity.md`; при ошибке восстанавливает backup вместе с прежним manifest;
12. выполняет workflow alignment по `prompts/_maintenance/04-align-project-after-kit-update.md` и завершает общий update report.

Обычное совместимое обновление не требует пути к скачанной папке. Явный локальный путь остаётся fallback для offline-разработки и тестов.

Remote update не использует raw HTTPS без авторизации и не принимает секрет из environment как запасной способ. Updater запускает дочерние процессы без `GH_TOKEN`, `GITHUB_TOKEN`, `GITHUB_PAT` и `PAT`, не вызывает `gh auth token` и не выводит данные авторизации в отчёты. Если `gh` не установлен, сессия не активна или subscriber access отозван, update блокируется до записи и текущая версия остаётся нетронутой.

## Транзакционная безопасность

До записи файлов updater сравнивает текущее содержимое с baseline hashes из установленного manifest.

- Неизменённый kit-owned файл можно заменить.
- Отсутствующий kit-owned файл можно восстановить.
- Новый путь создаётся, только если не конфликтует с пользовательским файлом.
- Локально изменённый kit-owned файл блокирует автоматическую замену и попадает в conflict report.
- Удалённый в новой версии файл удаляется только при совпадении со старым baseline hash.
- `AGENTS.md` меняется только между `PROMPT_KIT:BEGIN` и `PROMPT_KIT:END`; всё снаружи сохраняется байт-в-байт.
- Breaking migration требует отдельного подтверждения пользователя.

Перед применением создаётся backup. Если integrity check не проходит, updater восстанавливает исходное состояние и не записывает новую установленную версию. Alignment идёт уже после фиксации проверенного payload и не меняет kit-owned inventory.

## Собственный Git проекта

У рабочего проекта остаётся один Git-репозиторий — репозиторий пользователя. Prompt Kit не создаёт внутри него второй `.git` и не добавляет remote или submodule.

Updater не выполняет:

- `git pull`, merge или rebase;
- изменение `origin`, `.git/config`, hooks, index или веток;
- commit или push;
- запись в официальный репозиторий kit.

Обновлённые файлы появляются как обычные локальные изменения проекта. Пользователь может посмотреть diff и сохранить их в своей истории самостоятельно.

## Окончание подписки

После отмены подписки владелец удаляет GitHub account из outside collaborators. С этого момента subscriber не видит repository и будущие releases, а команда `обнови базу` безопасно останавливается до записи.

Версии, скачанные во время активной подписки, остаются пригодными для использования и изменения в собственных и клиентских проектах. Отмена подписки не удаляет локальные файлы и не требует отката сайта. Запрещено передавать standalone kit, release archive, credentials или канал обновлений другим людям. Полные условия поставляются в `.prompt-kit/TERMS.md` и исходном `TERMS.md`.

## Администрирование подписчика

Для каждого платного доступа владелец хранит во внешней системе, а не в Git repository:

- payment email;
- подтверждённый GitHub username;
- статус подписки;
- дату приглашения и дату отзыва доступа.

После оплаты username приглашается в private Organization repository как `outside collaborator` с ролью `Read`. Это ближайший стандартный режим к «только скачать»: он запрещает push, но не является DRM и оставляет обычные read-level действия GitHub. Не выдавай `Write`, `Maintain`, `Admin`, membership в Organization или общий deploy key/PAT. В Organization запрети private repository forking, отключи неиспользуемые Issues/Discussions и потребуй 2FA, если это совместимо с моделью аккаунтов. После отмены подписки удали outside collaborator. Если используется платный GitHub plan, отдельно контролируй биллинг seats во внешнем операционном журнале.

## Переименование и перенос repository

Updater доверяет numeric repository ID. Поэтому rename или transfer того же repository не требуют менять Git пользователя и не выглядят как новый источник: GitHub возвращает актуальное `owner/name`, а новый release manifest фиксирует его вместе с прежним ID.

Не занимай старое `owner/name` новым repository, пока подписчики не получили updater с новым bootstrap slug. Если старый slug уже указывает на другой repository, numeric-ID check безопасно заблокирует update и не переключится на чужой source; для продолжения понадобится trusted migration или вручную проверенный official archive.

Если база переезжает в полностью новый repository, его ID изменится. Обычная фраза `обнови базу` не разрешает такую замену. Maintainer сначала готовит отдельную trusted migration со старого источника, описывает оба ID и последствия, а пользователь явно подтверждает смену source. До этого updater сохраняет прежнюю установленную версию.

## Выпуск новой версии

Maintainer запускает `prompts/_maintenance/05-release-prompt-kit.md`. Release authoring обязан:

1. проверить согласованность версии, managed marker, changelog и migrations;
2. потребовать private GitHub Organization repository, его актуальное `owner/name` и положительный numeric repository ID;
3. проверить через GitHub API, что immutable releases включены; рекомендация или ручная галочка без API evidence недостаточны;
4. потребовать корневой `TERMS.md` и mapped `.prompt-kit/TERMS.md` в payload;
5. собрать payload только по allowlist;
6. сгенерировать точный `.prompt-kit/manifest.json` с repository identity и SHA-256 каждого управляемого файла;
7. нормализовать line endings и file modes;
8. запретить absolute paths, `..`, symlinks, secrets и неожиданные файлы;
9. собрать `web-kit-vX.Y.Z.zip`, `web-kit-vX.Y.Z.tar.gz` и `SHA256SUMS`;
10. прогнать release validation;
11. подготовить Git tag и GitHub Release notes;
12. после явного подтверждения создать draft Release, прикрепить и сверить все assets, затем опубликовать draft;
13. после публикации потребовать `immutable: true` и успешно выполнить `gh release verify` для подписанной attestation.

GitHub App нужен потому, что documented immutable-releases settings endpoint требует `Administration: read`, а publication — `Contents: write`. Само включение immutable releases остаётся разовой ручной настройкой owner/admin и не выполняется release workflow.

Release authoring не является обновлением рабочего сайта и не выполняется внутри пользовательского проекта.

Canonical tooling source-репозитория:

- `node tools/release.mjs verify-source` — проверить version metadata, allowlist и source safety;
- `node tools/release.mjs build` — собрать local candidate в `dist/releases/vX.Y.Z/`;
- `node tools/release.mjs verify-artifacts` — распаковать и проверить оба формата;
- `.github/workflows/validate.yml` — повторить проверки в continuous integration;
- `.github/workflows/release.yml` — вручную запустить публикацию уже существующего tag после отдельного разрешения maintainer. Обычный push tag сам по себе release не создаёт.

Команды build/verify не разрешают автоматически commit, tag, push или публикацию GitHub Release.

Поля `repositoryFullName` и `repositoryId` могут оставаться пустыми только для локальной диагностической сборки до выбора Organization repository. Strict publish gate обязан заблокировать публикацию, пока имя не задано, ID не является положительным числом, repository не приватный, owner не является Organization или immutable releases не включены.

## Версии и release notes

- `patch` — исправление без изменения контракта.
- `minor` — новая совместимая возможность или заметное расширение workflow.
- `major` — несовместимое изменение после стабильной `1.0.0`.

Каждый релиз получает tag `vX.Y.Z`, запись в changelog и GitHub Release. Крупный релиз дополнительно объясняет, что изменилось для человека, какие действия обязательны, какие миграции требуют подтверждения и как откатиться.

Draft и prerelease не считаются автоматическим stable update. Updater по умолчанию выбирает только последний опубликованный стабильный release.
