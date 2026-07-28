# Как пользователь запускает обновление Prompt Kit

В рабочем проекте достаточно написать:

```text
обнови базу
```

Codex понимает слово `база` как Prompt Kit, если из контекста не идёт речь о базе данных. Команда разрешает обычное совместимое обновление до последнего стабильного GitHub Release и обязательную цепочку update → integrity → alignment.

## Публичный источник

- repository: `dmandrianov/codex-web-kit-nextjs`;
- numeric repository ID: `1302994489`;
- owner: personal account `dmandrianov`, type `User`;
- visibility: public;
- license: MIT.

Приглашение к repository не требуется. Для проверки подписанных GitHub Releases updater использует GitHub CLI. Перед первым remote update пользователь один раз выполняет browser-based вход:

```bash
gh auth login --hostname github.com --web
```

Токен, пароль, ключ или вывод `gh auth token` передавать Codex нельзя.

## Что проверит Codex

1. Прочитает установленный `.prompt-kit/manifest.json` и определит текущую версию.
2. Проверит GitHub CLI session и доступность public repository.
3. Обратится к bootstrap/last-known `owner/name`, проследует штатному redirect и примет canonical имя только при совпадении numeric ID, owner login `dmandrianov` и owner type `User`.
4. Проверит immutable stable release, подписанную release attestation и локальные asset attestations.
5. Сверит `SHA256SUMS`, безопасно распакует archive во staging и проверит manifest.
6. Проверит MIT License по compatibility path `.prompt-kit/TERMS.md`.
7. До записи покажет conflicts и потребует отдельное подтверждение только для breaking/legacy migration, downgrade или локальных изменений.
8. Создаст backup, заменит только управляемые файлы, проверит integrity и сопоставит новый workflow с текущей стадией проекта.

Updater не делает `git pull`, commit, push, не меняет remote и не создаёт вложенный repository.

## Одноразовый переход `0.8.x -> 0.9.0`

После transfer source из Organization в personal account используется отдельно скачанный и проверенный archive:

```bash
node .prompt-kit/update.mjs update \
  --project /path/to/project \
  --archive /downloads/web-kit-v0.9.0/web-kit-v0.9.0.tar.gz \
  --checksum-file /downloads/web-kit-v0.9.0/SHA256SUMS \
  --allow-breaking
```

Этот режим не вызывает `gh`. Переход допустим, потому что numeric repository ID остался прежним. `0.9.0` переносит bootstrap full name на `dmandrianov/codex-web-kit-nextjs` и устанавливает updater, который понимает личного владельца и public visibility.

Bridge release сохраняет два legacy identifiers:

- transport `private-github-organization-gh`;
- package path `.prompt-kit/TERMS.md`.

Они нужны только updater `0.8.x`. Файл по legacy path содержит MIT License, а не закрытые подписочные условия.

## Когда update остановится

- numeric repository ID не совпал;
- owner не `dmandrianov` или имеет другой type;
- transport не поддерживается;
- release не immutable или attestation недействительна;
- GitHub CLI session отсутствует;
- trusted repository временно недоступен;
- manifest, checksum, archive paths, MIT License или payload hashes повреждены;
- есть локальный conflict или неподтверждённая breaking migration.

Уже установленная версия при этом не удаляется и остаётся доступной по MIT License.
