# Как обновить Prompt Kit в рабочем проекте

В проекте с установленным Prompt Kit достаточно одной фразы:

```md
Обнови базу.
```

Codex должен понять слово `база` как Prompt Kit, если из контекста не идёт речь о базе данных. Команда разрешает обычное совместимое обновление до последнего стабильного GitHub Release из private Organization repository, чей numeric ID встроен в updater и обязан совпадать с manifest, а также обязательные проверки после него.

Release находится в приватном repository GitHub Organization. При оформлении доступа payment email используется для учёта оплаты и связи, а отдельно подтверждённый GitHub username определяет, какой аккаунт получит роль `Read`. Перед первым обновлением нужно один раз принять приглашение этой учётной записью и выполнить browser-based вход:

```bash
gh auth login --hostname github.com --web
```

После этого обычной фразы `обнови базу` достаточно. Не отправляй Codex токен, пароль, ключ или вывод `gh auth token` и не сохраняй секрет в `.env`, manifest либо документации проекта.

## Что произойдёт автоматически

Codex:

1. Прочитает установленный `.prompt-kit/manifest.json` и определит текущую версию.
2. Проверит активную GitHub CLI session и доступ к private Organization repository.
3. Обратится к bootstrap/last-known `owner/name`, проследует штатному GitHub redirect после rename/transfer и примет canonical имя только при совпадении со встроенным numeric ID, `private: true` и owner типа `Organization`.
4. Проверит, что последний стабильный GitHub Release опубликован как immutable и имеет действительную подписанную GitHub attestation, без добавления Git remote и без `git pull`.
5. Скачает release archive и `SHA256SUMS` через GitHub CLI во временную папку.
6. До распаковки свяжет локальные assets с attestation через `gh release verify-asset`, затем проверит checksum, manifest, repository ID, tag/revision, список файлов и совместимость до любых изменений проекта.
7. Сравнит локальные файлы с hashes установленного manifest и остановится до записи, если пользователь менял kit-owned файл.
8. Создаст transaction backup в `.prompt-kit/backups/<timestamp>/`.
9. Обновит только exact paths из release manifest.
10. В `AGENTS.md` заменит только managed-блок, сохранив всё project-specific содержимое снаружи.
11. Не удалит `docs/`, `src/`, `public/`, package files, пользовательские материалы и `prompts/_local/`.
12. Не изменит `.git`, `origin`, remotes, branches, hooks и history, не создаст commit и ничего не отправит в GitHub.
13. Не использует raw `GH_TOKEN`, `GITHUB_TOKEN`, `GITHUB_PAT` или `PAT`, удалит эти переменные из environment дочерних процессов и не выведет их значения либо другие авторизационные данные в лог.
14. Внутри transaction проверит установленный payload и запишет новый manifest последним управляемым файлом.
15. После transaction выполнит полную проверку Prompt Kit. Если она найдёт ошибку, updater восстановит backup вместе с прежним manifest.
16. Только после passed полной проверки сопоставит новый workflow с текущей стадией проекта, не откатывая уже выполненную работу.

Повторное подтверждение не требуется для обычного стабильного обновления без конфликтов. Codex остановится и задаст один точный вопрос, если обнаружит legacy transition, breaking migration, downgrade или локальный конфликт:

- первый переход со старой версии без `.prompt-kit/manifest.json`;
- breaking migration;
- downgrade;
- локально изменённые kit-owned файлы.

Codex остановится без возможности `подтвердить и продолжить`, если обнаружит:

- повреждённую checksum или manifest;
- другой numeric repository ID вместо официального;
- repository не является private repository GitHub Organization;
- release не является immutable, его attestation недействительна или локальный asset ей не соответствует;
- GitHub CLI отсутствует или browser-based session не активна;
- отсутствие read-only доступа к release, в том числе после отмены подписки.

Prerelease тоже не является вариантом с подтверждением: manifest/updater schema v1 поддерживает только стабильные версии.

Переименование или transfer того же repository допускаются, потому что numeric repository ID сохраняется. Не занимай старое `owner/name` другим repository, пока подписчики не получили updater с новым bootstrap slug: при несовпадении ID обновление безопасно остановится. Полностью новый repository получает другой ID и требует отдельной trusted migration с явным подтверждением; обычная команда обновления не меняет источник доверия.

## Другие полезные формулировки

Только проверить наличие новой версии, ничего не меняя:

```md
Проверь, есть ли обновление базы, но пока ничего не устанавливай.
```

Установить конкретную стабильную версию можно только из отдельно скачанного official TAR.GZ и matching `SHA256SUMS`, чьи local bytes заранее проверены через signed release attestation. Текущий network updater автоматически получает только latest stable:

```md
Установи Web Kit v0.5.1 из проверенного архива `/path/web-kit-v0.5.1.tar.gz`; matching checksum-файл лежит в `/path/SHA256SUMS`.
```

Показать технический план до записи:

```md
Проверь обновление базы и покажи preflight: версии, checksum, breaking changes и локальные конфликты. Пока ничего не устанавливай.
```

## Первый переход со старой версии

Версии до manifest-based update могут не иметь `.prompt-kit/manifest.json`. Тогда Codex сначала скачает и проверит официальный release, покажет полный список затрагиваемых файлов и отдельно попросит подтвердить legacy transition. Это одноразовая мера: после успешной установки `0.5.0` или более новой manifest-based версии следующие совместимые обновления снова запускаются одной фразой.

## Что появится после обновления

- `docs/prompt-kit-update-summary.md` — что обновилось, что сохранилось и где backup;
- `docs/prompt-kit-integrity.md` — прошли ли manifest, hashes, prompt links и managed block проверку;
- `docs/prompt-kit-workflow-alignment.md` — как новый workflow соотносится с уже выполненной работой проекта;
- обновлённый `.prompt-kit/manifest.json` — установленная версия и baseline hashes для следующего безопасного обновления.

Если обновление уже актуально, Codex ничего не заменит и просто сообщит текущую версию.

## Если подписка закончилась

После отзыва GitHub access новые releases больше не скачиваются, но установленная версия не блокируется и не удаляется. Версии, законно скачанные во время активной подписки, можно продолжать использовать и изменять в собственных и клиентских проектах по `.prompt-kit/TERMS.md`. Передавать другим людям standalone kit, release archives, credentials или доступ к обновлениям нельзя.
