# Подготовить env и secrets для production

## Когда использовать

После выбора runtime strategy, до production build/deploy.

## Роль Codex

Ты действуешь как security-conscious deployment engineer.

## Цель

Создать `docs/deployment/env.md`: список required env vars, где они задаются, какие секреты нужны и как проверить, что production config готов без раскрытия значений.

## Контекст, который нужно дать

- `docs/deployment/runtime.md`.
- `.env.example`, если есть.
- `package.json`.
- Интеграции: CMS, forms, email, analytics, payments, maps, auth.
- Hosting platform или server strategy.
- Known production domains and callback URLs.

## Ограничения

- Не записывай реальные secret values в docs, git, chat summary или examples.
- Не коммить `.env.production` с секретами.
- Не выдумывай tokens/API keys.
- Если пользователь сам передал application secret и явно попросил настроить среду, разрешено записать его в проверенный git-ignored `.env`/`.env.local` или в выбранный secret store.
- До локальной записи проверь, что target не tracked и действительно ignored. Не помещай значение в shell command, patch/diff, logs, screenshots, reports или backup; используй неэхирующий stdin/secret-aware input, если он доступен.
- Root-пароли, private keys и passphrases не принимай и не сохраняй в проекте; для них используй отдельный credential/key workflow.
- Не запускай deploy, пока required env не подтверждены или явно помечены blocker.
- Не смешивай env setup с DNS/SSL.

## Процесс

1. Найди required env vars по коду, docs и `.env.example`.
2. Раздели public env и secret env.
3. Определи, где они задаются: local ignored env file, server file, systemd env, platform dashboard, Docker secrets или CI.
4. Если пользователь явно просит записать переданное значение, сначала проверь target через Git и сохрани его без повторного вывода; существующие чужие значения не раскрывай и не перезаписывай.
5. Зафиксируй missing values как open questions/blockers.
6. Проверь production URLs/callbacks.
7. Создай или обнови safe `.env.example`, если это уместно и только с именами/placeholder values.
8. Создай или обнови `docs/deployment/env.md` без secret values.
9. Обнови `docs/project-state.md`: отметь `Env/secrets configured` только если blockers закрыты.

## Output

Создай или обнови `docs/deployment/env.md`:

```md
# Production Env and Secrets

## Required variables

| Name | Type | Required | Source | Set where | Status |
| --- | --- | --- | --- | --- | --- |

## Public env

## Secret env

## Missing values / blockers

## Verification

## Next step
```

В ответе кратко покажи:

- какие env required;
- какие blockers остались;
- куда сохранены переданные значения, не показывая сами значения;
- следующий prompt.

## Done when

- Required env vars перечислены.
- Секреты не раскрыты и не попали в docs, Git, logs, reports или backups.
- Явно переданные значения, если пользователь поручил настройку, находятся только в проверенном локальном ignored target или secret store.
- Missing values явно отмечены.
- Production env готов или blocker честно указан.
- `docs/project-state.md` обновлён.

## Follow-up

Если env готов, следующий промпт: `prompts/12-deployment/06-domain-dns-ssl.md`.

Если env blockers есть, остановись до ввода пользователя.
