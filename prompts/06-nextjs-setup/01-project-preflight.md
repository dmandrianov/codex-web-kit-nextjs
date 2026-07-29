# Провести Next.js preflight

## Когда использовать

После `docs/design-system/design-system-review.md` со статусом `Design ready`, до scaffold или изменения технической структуры проекта.

## Роль Codex

Ты действуешь как senior Next.js engineer и careful project migration reviewer.

## Цель

Создать `docs/nextjs/preflight.md`: диагностику текущей рабочей папки, чтобы понять, можно ли безопасно создавать или адаптировать Next.js проект, не затерев Prompt Kit, документацию и пользовательские файлы.

## Контекст, который нужно дать

- `AGENTS.md`.
- `docs/project-state.md`, если есть.
- `docs/design-system/design-system-review.md`.
- Текущая структура файлов.
- `package.json`, lockfile, `next.config.*`, `tsconfig.json`, `src/app`, `app`, `pages`, если они есть.
- Предпочтения по package manager, если есть.
- Требования к деплою, если известны.

## Ограничения

- Не scaffold-и проект в этом промпте.
- Не удаляй, не перемещай и не перезаписывай файлы.
- Не делай `create-next-app` поверх непроверенной непустой директории.
- Не трогай `AGENTS.md`, `prompts/`, `docs/` и пользовательские материалы без явной причины.
- Не выбирай package manager наугад, если lockfile уже указывает на существующий выбор.
- Если проект уже Next.js, не предлагай пересоздать его без веской причины.

## Процесс

1. Осмотри корень проекта и ключевые файлы.
2. Определи тип состояния: `no-next`, `partial-next`, `existing-next`, `conflicting-setup`.
3. Определи package manager по lockfile или существующим scripts.
4. Проверь, есть ли Prompt Kit файлы, пользовательские материалы, docs, media, design assets.
5. Найди риски scaffold: непустая папка, конфликтующие `src/`, `app/`, `pages/`, `package.json`, configs.
6. Предложи безопасную стратегию: scaffold in-place, scaffold во временную папку и перенос, адаптация существующего Next.js.
7. Создай или обнови `docs/nextjs/preflight.md`.
8. Обнови `docs/project-state.md`: отметь `Next.js preflight done` и укажи следующий промпт.

## Output

Создай или обнови `docs/nextjs/preflight.md` в формате:

```md
# Next.js Preflight

## Current state

- State: no-next / partial-next / existing-next / conflicting-setup
- Package manager:
- Confidence:

## Found files

| Path | Meaning | Risk |
| --- | --- | --- |

## Protected files and folders

## Scaffold strategy

## Risks

## Commands to run next

## Open questions
```

В ответе кратко покажи:

- текущее состояние проекта;
- безопасную scaffold strategy;
- что нельзя трогать;
- следующий промпт по router.

## Done when

- Понятно, есть ли уже Next.js проект.
- Понятно, какой package manager использовать.
- Понятно, можно ли scaffold in-place или нужен временный scaffold.
- Prompt Kit и пользовательские файлы защищены.
- `docs/project-state.md` обновлен.

## Follow-up

Следующий промпт: `prompts/06-nextjs-setup/02-technical-architecture.md`.

Перед следующим шагом сверься с `prompts/ROUTER.md`: если preflight выявил конфликт, сначала согласуй безопасную стратегию с пользователем.
