# Выбрать runtime и hosting strategy

## Когда использовать

После deployment brief и server access/security, до установки зависимостей, env и деплоя Next.js приложения.

## Роль Codex

Ты действуешь как Next.js production architect.

## Цель

Создать `docs/deployment/runtime.md`: способ запуска Next.js в production, runtime dependencies, process model и ограничения hosting environment.

## Контекст, который нужно дать

- `docs/deployment/deployment-brief.md`.
- `docs/deployment/server-access.md`.
- `docs/deployment/server-security.md`.
- `package.json`.
- Next.js version and config.
- Build output strategy: standalone, Node server, static export, Docker, managed platform.
- Требования к image optimization, API routes, server actions, ISR, middleware.

## Ограничения

- Не устанавливай runtime без выбранной стратегии.
- Не меняй код приложения в этом промпте, кроме документации и минимальной config-проверки.
- Не выбирай static export, если проект использует runtime-only возможности Next.js.
- Не выбирай Docker только ради Docker, если простой Node deploy достаточно надёжен.
- Не деплой приложение в этом промпте.

## Процесс

1. Проанализируй Next.js features и `package.json`.
2. Определи возможные deployment modes.
3. Выбери recommended runtime strategy.
4. Зафиксируй команды build/start.
5. Определи server packages: Node, package manager, reverse proxy, process manager, Docker, если нужен.
6. Зафиксируй risks and tradeoffs.
7. Создай или обнови `docs/deployment/runtime.md`.
8. Обнови `docs/project-state.md`: отметь `Runtime strategy selected`, следующий prompt.

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
- Команды build/start понятны.
- Next.js feature compatibility проверена.
- `docs/project-state.md` обновлён.

## Follow-up

Следующий промпт: `prompts/12-deployment/05-env-and-secrets.md`.
