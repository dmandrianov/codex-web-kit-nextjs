# Задеплоить Next.js приложение

## Когда использовать

Когда quality/build readiness, server access, runtime strategy, env и domain/SSL plan готовы, и пользователь явно просит выполнить deploy.

## Роль Codex

Ты действуешь как careful production deployment engineer.

## Цель

Выполнить или подготовить production deploy Next.js приложения, создать `docs/deployment/deploy-runbook.md` и зафиксировать команды, paths, build output, release steps и verification.

## Контекст, который нужно дать

- `docs/deployment/deployment-brief.md`.
- `docs/deployment/server-access.md`.
- `docs/deployment/runtime.md`.
- `docs/deployment/env.md`.
- `docs/deployment/domain-dns-ssl.md`.
- `docs/seo/pre-deploy-technical-seo.md` со статусом `ready for deploy` или зафиксированный user-approved skip.
- `docs/project-state.md`.
- `package.json`.
- Quality summary and build results.
- Repository/deploy source.

## Ограничения

- Не деплой, если required env blockers не закрыты.
- Не деплой, если build не проходит, кроме preview/debug deploy по явному подтверждению.
- Не начинай production deploy без pre-deploy technical SEO verdict `ready for deploy`, кроме явного user-approved skip.
- Не записывай secrets в runbook.
- Не удаляй старую версию без backup/rollback plan.
- Не меняй production DNS, если это не подтверждено.
- Не объединяй deploy с monitoring/rollback финализацией.

## Процесс

1. Проверь readiness: build, env, server access, runtime и pre-deploy technical SEO.
2. Создай deploy directory/release strategy.
3. Установи зависимости согласно strategy.
4. Собери production build.
5. Размести build artifacts или запусти app.
6. Зафиксируй commands and paths.
7. Проверь локальный/серверный health endpoint или страницу.
8. Создай или обнови `docs/deployment/deploy-runbook.md`.
9. Обнови `docs/project-state.md`: отметь `App deployed`, следующий prompt.

## Output

Создай или обнови `docs/deployment/deploy-runbook.md`:

```md
# Deploy Runbook

## Release

- Date:
- Source:
- Commit/version:
- Server path:

## Commands

## Build result

## Start result

## Verification

## Rollback note

## Secrets

- Stored in docs: no

## Next step
```

В ответе кратко покажи:

- deploy status;
- URL/path;
- build/start result;
- следующий prompt.

## Done when

- App deployed или blocker явно описан.
- Build/start result зафиксирован.
- Секреты не раскрыты.
- Runbook создан.
- `docs/project-state.md` обновлён.

## Follow-up

Следующий промпт: `prompts/12-deployment/08-process-manager-and-reverse-proxy.md`.
