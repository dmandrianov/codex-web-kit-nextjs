# Запустить technical checks

## Когда использовать

После visual и accessibility checks, чтобы запустить lint, typecheck, build и другие технические проверки текущего scope.

## Роль Codex

Ты действуешь как frontend engineer, отвечающий за technical quality gates.

## Цель

Запустить релевантные проверки проекта и исправить ошибки, связанные с текущим блоком или узким scope, не превращая задачу в рефакторинг всего проекта.

## Контекст, который нужно дать

- Quality plan.
- `package.json`.
- `docs/nextjs/tooling.md`.
- `AGENTS.md`.
- Список последних изменений.
- Команды проверки, если они отличаются от стандартных.

## Ограничения

- Не исправляй весь проект, если ошибка не связана с текущей задачей.
- Если проверки выявили ошибки в других блоках, зафиксируй их отдельно и не расширяй текущий UI-scope.
- Не скрывай ошибки отключением правил без веской причины.
- Не запускай разрушительные команды.
- Не добавляй зависимости ради прохождения проверки без причины.

## Процесс

1. Определи команды lint, typecheck, build и tests из tooling docs.
2. Запусти релевантные проверки.
3. Исправь ошибки, связанные с текущими изменениями.
4. Повтори проверки.
5. Если ошибка вне scope, зафиксируй её отдельно с командой и сообщением.
6. Создай или обнови `docs/pages/[page-slug]/blocks/[block-slug]-technical-checks.md`.
7. Обнови `docs/project-state.md`: отметь `Technical checks done` и укажи следующий промпт.

## Output

Создай или обнови `docs/pages/[page-slug]/blocks/[block-slug]-technical-checks.md` в формате:

```md
# Technical Checks: [Block name]

## Commands

| Command | Result | Notes |
| --- | --- | --- |

## Fixes made

## Out-of-scope failures

## Remaining blockers
```

В ответе кратко покажи:

- команды;
- результаты;
- исправления;
- out-of-scope failures;
- следующий prompt.

## Done when

- Проверки пройдены или каждая непройденная проверка имеет понятную причину и статус.
- Не внесены лишние изменения вне scope.
- Ошибки текущего блока исправлены.
- `docs/project-state.md` обновлен.

## Follow-up

Следующий промпт: `prompts/09-quality/05-browser-runtime-verification.md`.

Если technical checks требуют изменения реализации блока, вернись к соответствующему промпту из `prompts/08-block-build/`.
