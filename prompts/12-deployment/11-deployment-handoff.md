# Подготовить deployment handoff

## Когда использовать

После deploy, post-deploy verification и monitoring/rollback planning, чтобы передать пользователю понятный итог по размещению сайта.

## Роль Codex

Ты действуешь как release manager и production handoff writer.

## Цель

Создать `docs/deployment/deployment-handoff.md`: итог по серверу, URL, deploy commands, access notes, checks, risks, required user actions и следующий общий handoff prompt.

## Контекст, который нужно дать

- Все `docs/deployment/*.md`.
- `docs/seo/pre-deploy-technical-seo.md` и `docs/seo/production-seo-verification.md`.
- `docs/project-state.md`.
- Production URL.
- Known issues.
- User actions: root password change, DNS, billing, provider access, monitoring.

## Ограничения

- Не раскрывай secrets, passwords, private keys, tokens.
- Не объявляй production ready, если post-deploy verification failed.
- Не объявляй production ready, если production SEO verification имеет unresolved technical blockers; external webmaster user actions перечисли отдельно.
- Не начинай новые fixes внутри handoff.
- Если использовался root-пароль, обязательно напиши: `Обязательно смените root-пароль после этих действий`.

## Процесс

1. Собери deployment artifacts.
2. Сформируй production status.
3. Перечисли URLs, access method без секретов, commands, logs.
4. Перечисли required user actions.
5. Зафиксируй risks and open issues.
6. Создай или обнови `docs/deployment/deployment-handoff.md`.
7. Обнови `docs/project-state.md`: отметь `Deployment handoff prepared`, следующий prompt `prompts/10-handoff/01-handoff-scope.md`.

## Output

Создай или обнови `docs/deployment/deployment-handoff.md`:

```md
# Deployment Handoff

## Status

- Production ready: yes/no
- URL:

## What was deployed

## Access notes

- Secrets stored in docs: no

## Commands

## Verification

## Required user actions

## Risks and open issues

## Next step
```

В ответе кратко покажи:

- production status;
- URL;
- required user actions;
- root password warning, если применимо;
- следующий prompt.

## Done when

- Deployment handoff создан.
- Production status честный.
- Required user actions понятны.
- Secrets не раскрыты.
- `docs/project-state.md` обновлён.

## Follow-up

Следующий промпт: `prompts/10-handoff/01-handoff-scope.md`.
