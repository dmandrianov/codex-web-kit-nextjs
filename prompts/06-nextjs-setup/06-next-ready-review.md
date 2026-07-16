# Проверить готовность Next.js проекта

## Когда использовать

После preflight, scaffold, App Router structure, styling integration и tooling setup, перед page planning.

## Роль Codex

Ты действуешь как senior Next.js reviewer и release-quality frontend lead.

## Цель

Создать `docs/nextjs/next-ready-review.md`: финальную проверку технического фундамента с verdict `Next ready` или `needs fixes`.

## Контекст, который нужно дать

- `docs/nextjs/preflight.md`.
- `docs/nextjs/scaffold.md`.
- `docs/nextjs/app-router-structure.md`.
- `docs/nextjs/styling-integration.md`.
- `docs/nextjs/tooling.md`.
- `docs/design-system/design-system-review.md`.
- `docs/ia/sitemap.md`.
- `docs/project-state.md`.
- Текущий `package.json`, configs, `src/app`.

## Ограничения

- Не создавай page spec или блоки.
- Не верстай UI.
- Не ставь `Next ready`, если проект не запускается и причина не является внешним блокером.
- Не игнорируй несоответствие `src/app` sitemap или design-system foundation.
- Не ставь `Next ready`, если core responsive geometry исправляется после mount или foundation не резервирует media/measured geometry.
- Не скрывай ошибки lint/type/build за общими словами.

## Процесс

1. Проверь наличие ключевых файлов: `package.json`, `src/app`, root layout, global styles, configs.
2. Сверь App Router structure с sitemap.
3. Сверь styling foundation с design tokens и layout rules.
4. Проверь First-render Responsive Delivery Contract: server-first structure, CSS-first geometry, отсутствие viewport-dependent mount branch, reserved media/measured geometry и font/loading stability.
5. Проверь scripts и package manager.
6. Запусти доступные проверки: install status, lint, typecheck, build, если это безопасно и настроено.
7. Раздели проблемы на `must fix before page planning`, `can fix during first page`, `watch later`.
8. Создай или обнови `docs/nextjs/next-ready-review.md`.
9. Если проект готов, обнови `docs/project-state.md`: stage `next-ready`, отметь `Next ready reviewed`, следующий промпт `prompts/07-page-planning/01-select-page-and-scope.md`.
10. Если не готов, оставь stage `design-ready` или текущий setup stage и укажи, к какому setup-промпту вернуться.

## Output

Создай или обнови `docs/nextjs/next-ready-review.md` в формате:

```md
# Next Ready Review

## Verdict

- Status: Next ready / needs fixes
- Confidence:
- Next prompt:

## Checks

| Check | Result | Notes | Fix prompt |
| --- | --- | --- | --- |

## Must fix before page planning

## Can fix during first page

## Watch later

## Project state update
```

В ответе кратко покажи:

- verdict `Next ready` или `needs fixes`;
- проверки и результаты;
- blockers;
- следующий prompt по router.

## Done when

- Есть явный verdict.
- Техническая структура готова к page planning.
- CSS-first initial layout и responsive media/font stability готовы до block build.
- Команды разработки и проверки понятны.
- Ошибки или блокеры описаны конкретно.
- Если статус `Next ready`, `docs/project-state.md` переведен в `next-ready`.

## Follow-up

Если `Next ready`, следующий промпт: `prompts/07-page-planning/01-select-page-and-scope.md`.

Если `needs fixes`, вернись к одному из промптов:

- `prompts/06-nextjs-setup/01-project-preflight.md`;
- `prompts/06-nextjs-setup/02-project-scaffold.md`;
- `prompts/06-nextjs-setup/03-app-router-structure.md`;
- `prompts/06-nextjs-setup/04-styling-and-design-system-integration.md`;
- `prompts/06-nextjs-setup/05-tooling-and-quality-scripts.md`.
