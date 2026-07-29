# Настроить tooling и quality scripts

## Когда использовать

После scaffold, App Router structure и styling integration, до page planning и реализации.

## Роль Codex

Ты действуешь как frontend tooling engineer и quality gate maintainer.

## Цель

Создать `docs/nextjs/tooling.md`: понятные команды разработки и проверки, минимальные зависимости, TypeScript/lint/build workflow и правила добавления tooling без расползания проекта.

## Контекст, который нужно дать

- `package.json`.
- Lockfile и package manager.
- `tsconfig.json`, `next.config.*`, ESLint config, formatting config, Tailwind config, если есть.
- `docs/nextjs/scaffold.md`.
- `docs/nextjs/technical-architecture.md`.
- `docs/nextjs/styling-integration.md`.
- Требования к деплою и CI, если известны.
- `docs/project-state.md`.

## Ограничения

- Не добавляй зависимости "на всякий случай".
- Не переписывай весь tooling без причины.
- Не запускай форматтеры, которые меняют чужие файлы массово, без необходимости.
- Не меняй framework stack без подтверждения.
- Не настраивай CI/deploy полностью, если это отдельная будущая задача.
- Не верстай страницы и компоненты.

## Процесс

1. Проверь package manager, scripts и точные версии Next.js, React, Node.js и TypeScript против technical architecture.
2. Убедись, что есть или понятны команды `dev`, `build`, прямой ESLint/Biome `lint`, typecheck. Для Next.js 16 не используй удалённый `next lint` и не считай `next build` заменой lint.
3. Настрой минимальный TypeScript/lint workflow, если он отсутствует.
4. Проверь path aliases и module resolution.
5. Зафиксируй formatting policy: есть ли Prettier/Biome или пока не нужен.
6. Определи минимальную test strategy из technical architecture: не ставь test stack без сценария, но зафиксируй E2E для async Server Components и критичных flows, если они есть.
7. Определи, нужны ли дополнительные зависимости сейчас. Для каждой зависимости укажи причину, альтернативы и риск.
8. Запусти доступные проверки или опиши блокеры.
9. Создай или обнови `docs/nextjs/tooling.md`.
10. Обнови `docs/project-state.md`: отметь `Tooling configured` и укажи следующий промпт.

## Output

Создай или обнови `docs/nextjs/tooling.md` в формате:

```md
# Tooling and Quality Scripts

## Package manager

## Scripts

| Script | Command | Purpose | Status |
| --- | --- | --- | --- |

## TypeScript

## Lint

## Framework/runtime compatibility

## Test strategy

| Risk/scenario | Test level | Tool/command | Status |
| --- | --- | --- | --- |

## Formatting

## Dependencies

| Dependency | Reason | Alternatives | Risk |
| --- | --- | --- | --- |

## Checks run

## Blockers
```

В ответе кратко покажи:

- package manager;
- команды проверки;
- добавленные зависимости и причины;
- следующий промпт по router.

## Done when

- Scripts понятны и зафиксированы.
- TypeScript/lint/build workflow есть или блокеры явно описаны.
- Версии и команды соответствуют выбранной major-версии Next.js.
- Критичные app-wide scenarios имеют план проверки; простому сайту не добавлен лишний test stack.
- Новые зависимости обоснованы.
- Команды проверки записаны в документацию.
- `docs/project-state.md` обновлен.

## Follow-up

Следующий промпт: `prompts/06-nextjs-setup/06-next-ready-review.md`.

Перед следующим шагом сверься с `prompts/ROUTER.md`: если проверки не запускаются из-за setup-проблем, исправь setup до final review.
