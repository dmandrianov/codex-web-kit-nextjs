# Release и обновление Prompt Kit

## Текущий публичный источник

- canonical repository: `dmandrianov/codex-web-kit-nextjs`;
- numeric repository ID: `1302994489`;
- owner: `dmandrianov`, type `User`;
- visibility: public;
- license: MIT;
- previous slug: `dmandrianov-web-kit/web-kit`.

GitHub сохранил numeric ID после transfer/rename. Поэтому источник доверия не менялся.

Версия `0.9.0` объединила два перехода:

1. перенос bootstrap source с Organization на personal repository;
2. переход от закрытых подписочных условий к MIT License.

Начиная с `0.10.0` новые manifests используют generic transport `github-release-gh`. Bridge-значение `private-github-organization-gh` сохраняется только в историческом release `0.9.0`, чтобы установленный updater `0.8.x` мог принять переходный архив.

## Модель доверия

Корень доверия — positive numeric repository ID, встроенный в updater. Manifest не может самостоятельно заменить этот ID.

Remote updater:

1. использует browser-authenticated GitHub CLI;
2. обращается к bootstrap/last-known slug и следует документированному GitHub redirect;
3. сверяет numeric ID;
4. требует `owner.login: dmandrianov` и `owner.type: User`;
5. проверяет корректное boolean-поле visibility;
6. принимает только stable release с `immutable: true`;
7. проверяет release attestation и отдельные attestations скачанных TAR.GZ и `SHA256SUMS`;
8. сверяет SHA-256 до extraction.

Полностью новый repository получает другой numeric ID и требует отдельной trusted migration.

## MIT License

Canonical license находится в root `LICENSE` и использует SPDX identifier `MIT`.

Release package копирует этот текст в `.prompt-kit/TERMS.md`. Legacy filename сохранён только потому, что updater `0.8.x` требует этот target до установки bridge release. В package нет закрытых подписочных ограничений.

MIT разрешает использовать, копировать, изменять, объединять, публиковать, распространять, сублицензировать и продавать копии при сохранении copyright notice и текста лицензии. Проект предоставляется без гарантий согласно самому `LICENSE`.

## Почему `0.9.0` сохраняет legacy transport

Updater из `0.8.x` принимает только:

```text
private-github-organization-gh
```

Поэтому manifest `0.9.0` оставляет это значение как совместимый transport identifier, хотя repository уже public и принадлежит personal account. Bundled updater `0.9.0` понимает оба значения:

- `private-github-organization-gh` — bridge compatibility;
- `github-release-gh` — generic transport для следующих releases.

## Сценарий `0.8.x -> 0.9.0`

Пользователь отдельно получает проверенные TAR.GZ и `SHA256SUMS`, затем запускает старый updater локально:

```bash
node .prompt-kit/update.mjs update \
  --project /path/to/project \
  --archive /downloads/web-kit-v0.9.0/web-kit-v0.9.0.tar.gz \
  --checksum-file /downloads/web-kit-v0.9.0/SHA256SUMS \
  --allow-breaking
```

Local archive mode не вызывает `gh`. Он проверяет checksum, manifest, payload и прежний numeric repository ID, затем устанавливает новый bootstrap source, updater и MIT License.

После этого обычные remote updates идут через:

```text
обнови базу
```

## Release package

Distributable package строится только по `release/payload.json` и содержит:

- managed block `AGENTS.md`;
- `prompts/**`, включая seed `prompts/_local/README.md`;
- `.prompt-kit/CHANGELOG.md`;
- `.prompt-kit/MIGRATIONS.md`;
- `.prompt-kit/VERSION.md`;
- `.prompt-kit/TERMS.md` с MIT License;
- `.prompt-kit/manifest.schema.json`;
- `.prompt-kit/update.mjs`;
- generated `.prompt-kit/manifest.json`;
- `.prompt-kit/.gitignore`.

Source-only tooling, `.git/`, `dist/`, backups, secrets, project code и пользовательские материалы в package не входят.

## Локальная подготовка release

```bash
node tools/release.mjs verify-source
node tools/release.mjs build
node tools/release.mjs verify-artifacts
node --test tools/release.test.mjs
```

Обычная просьба `подготовь релиз` разрешает только локальную сборку и проверку. Она не разрешает менять remote, создавать commit/tag, выполнять push или создавать GitHub Release.

## Publication gates

- version, marker, changelog, migrations и release notes согласованы;
- repository ID `1302994489`;
- canonical full name `dmandrianov/codex-web-kit-nextjs`;
- owner `dmandrianov`, type `User`;
- repository public;
- root `LICENSE` определяется как canonical MIT License;
- MIT text mapped в required `.prompt-kit/TERMS.md`;
- immutable releases включены;
- worktree clean, commit известен и совпадает с manifest revision;
- target tag/release отсутствует;
- ZIP/TAR.GZ reproducible и имеют одинаковый payload;
- `SHA256SUMS` совпадает;
- integrity status `passed`;
- опубликованный release имеет действительную signed attestation.

`repositoryId: null` или `repositoryFullName: null` допустимы только для local diagnostic candidate.

## Права пользователей

Public visibility позволяет читать, клонировать, скачивать и fork repository. MIT License разрешает использование, изменение и распространение при сохранении license notice.

Публичный пользователь не получает push access к canonical repository. Он может предложить изменения через fork и Pull Request, но принять их может только owner или явно добавленный collaborator с write access.

## GitHub Actions

Validation workflow использует `contents: read`. Publication workflow также начинает с `contents: read` и получает отдельный short-lived write token только от repository-scoped GitHub App во время ручного запуска:

- `Administration: read`;
- `Contents: write`;
- Client ID в Actions variable `WEB_KIT_RELEASE_APP_CLIENT_ID`;
- private key в Actions secret `WEB_KIT_RELEASE_APP_PRIVATE_KEY`.

Значения секретов не выводятся и не попадают в source/assets.
