# Подготовить каркас Next.js-проекта

## Когда использовать

После `docs/nextjs/preflight.md`, когда безопасная стратегия scaffold подтверждена или очевидна.

## Роль Codex

Ты действуешь как senior Next.js engineer, который аккуратно создаёт технический фундамент без реализации страниц.

## Цель

Создать или адаптировать базовый Next.js проект с App Router, TypeScript, `src/`, alias `@/*` и минимальными scripts, не затерев Prompt Kit и пользовательские файлы.

## Контекст, который нужно дать

- `docs/nextjs/preflight.md`.
- `AGENTS.md`.
- `docs/project-state.md`.
- `docs/design-system/design-system-review.md`.
- Выбранный package manager.
- Требования к деплою, если известны.
- Существующая структура проекта, если она уже есть.

## Ограничения

- Не верстай страницы и блоки.
- Не добавляй зависимости без необходимости.
- По умолчанию используй Next.js App Router, TypeScript, `src/`, alias `@/*`.
- Не перезаписывай `AGENTS.md`, `prompts/`, `docs/`, source materials и пользовательские изменения.
- Если директория непустая, не запускай scaffold-команду, которая может затереть файлы, без явного безопасного плана.
- Если проект уже Next.js, адаптируй существующий проект вместо пересоздания.

## Процесс

1. Перечитай `docs/nextjs/preflight.md` и подтверди scaffold strategy.
2. Если Next.js проекта нет, создай его безопасно: in-place только если это безопасно, иначе через временную папку с переносом нужных файлов.
3. Проверь наличие App Router, TypeScript, `src/`, `src/app`, `tsconfig.json`, `next.config.*`, `package.json`.
4. Настрой или проверь alias `@/*`.
5. Проверь базовые scripts: `dev`, `build`, `lint`, typecheck если есть.
6. Не создавай реальные страницы, кроме минимального placeholder, если он нужен для запуска.
7. Создай или обнови `docs/nextjs/scaffold.md`.
8. Обнови `docs/project-state.md`: отметь `Next.js scaffold ready` и укажи следующий промпт.

## Output

Создай или обнови `docs/nextjs/scaffold.md` в формате:

```md
# Next.js Scaffold

## Scaffold strategy used

## Created or verified files

| File | Status | Notes |
| --- | --- | --- |

## Package manager

## Scripts

## Protected files preserved

## Checks run

## Open questions
```

В ответе кратко покажи:

- что создано или подтверждено;
- какие команды доступны;
- какие проверки запускались;
- следующий промпт по router.

## Done when

- Next.js проект существует или существующий проект признан пригодным.
- App Router, TypeScript, `src/` и alias `@/*` проверены.
- Prompt Kit и пользовательские файлы не повреждены.
- Проект можно запустить или причины блокировки явно описаны.
- `docs/project-state.md` обновлен.

## Follow-up

Следующий промпт: `prompts/06-nextjs-setup/03-app-router-structure.md`.

Перед следующим шагом сверься с `prompts/ROUTER.md`: если scaffold не завершён или проект не запускается, не переходи к структуре маршрутов.
