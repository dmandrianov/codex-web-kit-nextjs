# Выбрать runtime и hosting strategy

## Когда использовать

После deployment brief и server access/security, чтобы подтвердить ранний hosting shape из `docs/nextjs/technical-architecture.md` на реальной production-инфраструктуре, до env и deploy.

## Роль Codex

Ты действуешь как Next.js production architect.

## Цель

Создать `docs/deployment/runtime.md`: способ запуска Next.js в production, runtime dependencies, process model и ограничения hosting environment.

## Контекст, который нужно дать

- `docs/deployment/deployment-brief.md`.
- `docs/deployment/server-access.md`.
- `docs/deployment/server-security.md`.
- `docs/nextjs/technical-architecture.md`.
- `package.json`.
- Next.js version and config.
- Build output strategy: standalone, Node server, static export, Docker, managed platform.
- Требования к image optimization, Route Handlers, Server Actions, Cache Components/ISR и `proxy`.

## Ограничения

- Не устанавливай runtime без выбранной стратегии.
- Не меняй код приложения в этом промпте, кроме документации и минимальной config-проверки.
- Не выбирай static export, если проект использует runtime-only возможности Next.js.
- Не меняй ранний hosting shape молча. Если production target ему не соответствует, остановись и верни blocker в `prompts/06-nextjs-setup/02-technical-architecture.md`.
- Не выбирай Docker только ради Docker, если простой Node deploy достаточно надёжен.
- Не деплой приложение в этом промпте.

## Процесс

1. Сверь production target с hosting shape, версиями и feature contract из technical architecture.
2. Проанализируй Next.js features и `package.json`.
3. Подтверди или обоснованно измени deployment mode; архитектурное изменение требует возврата в owner prompt до deploy.
4. Зафиксируй команды build/start.
5. Определи server packages: Node, package manager, reverse proxy, process manager, Docker, если нужен.
6. Для нескольких instances зафиксируй shared cache/tag invalidation, общий `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY`, `deploymentId`, rolling deploy/version skew, streaming/proxy buffering, ephemeral storage, database pooling и migrations.
7. Для serverless зафиксируй ограничения shared memory/filesystem, long-running work, connection pooling и background tasks.
8. Зафиксируй risks and tradeoffs.
9. Создай или обнови `docs/deployment/runtime.md`.
10. Обнови `docs/project-state.md`: отметь `Runtime strategy selected`, следующий prompt.

## Output

Создай или обнови `docs/deployment/runtime.md`:

```md
# Runtime and Hosting Strategy

## Recommended strategy

- Mode:
- Why:
- Tradeoffs:

## Commands

- Install:
- Build:
- Start:

## Server requirements

## Next.js feature compatibility

## Process model

## Topology consistency

- Matches technical architecture:
- Instance count:
- Shared cache/tag invalidation:
- `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY`:
- Deployment ID/version skew:
- Streaming/proxy:
- Filesystem persistence:
- Database connections/migrations:

## Risks

## Next step
```

В ответе кратко покажи:

- выбранную стратегию;
- команды;
- риски;
- следующий prompt.

## Done when

- Runtime strategy выбрана и обоснована.
- Production topology не противоречит ранней архитектуре либо изменение возвращено на согласование.
- Multi-instance/serverless ограничения закрыты, если применимы.
- Команды build/start понятны.
- Next.js feature compatibility проверена.
- `docs/project-state.md` обновлён.

## Follow-up

Следующий промпт: `prompts/12-deployment/05-env-and-secrets.md`.
