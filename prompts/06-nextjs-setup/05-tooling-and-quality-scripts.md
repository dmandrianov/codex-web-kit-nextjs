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

1. Проверь package manager, scripts и версии зависимостей.
2. Убедись, что есть или понятны команды `dev`, `build`, `lint`, typecheck.
3. Настрой минимальный TypeScript/lint workflow, если он отсутствует.
4. Проверь path aliases и module resolution.
5. Зафиксируй formatting policy: есть ли Prettier/Biome или пока не нужен.
6. Определи, нужны ли дополнительные зависимости сейчас. Для каждой зависимости укажи причину, альтернативы и риск.
7. Запусти доступные проверки или опиши блокеры.
8. Создай или обнови `docs/nextjs/tooling.md`.
9. Обнови `docs/project-state.md`: отметь `Tooling configured` и укажи следующий промпт.

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
- Новые зависимости обоснованы.
- Команды проверки записаны в документацию.
- `docs/project-state.md` обновлен.

## Follow-up

Следующий промпт: `prompts/06-nextjs-setup/06-next-ready-review.md`.

Перед следующим шагом сверься с `prompts/ROUTER.md`: если проверки не запускаются из-за setup-проблем, исправь setup до final review.
