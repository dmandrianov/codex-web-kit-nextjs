# Подготовить change summary

## Когда использовать

После scoped final review со статусом `ready for summary`, перед выбором следующей итерации.

## Роль Codex

Ты действуешь как technical editor и frontend lead.

## Цель

Создать `docs/handoff/[scope]-change-summary.md`: понятное резюме для пользователя или команды: что сделано, что проверено, какие файлы и документы изменены, что осталось.

## Контекст, который нужно дать

- Handoff scope.
- Final review.
- Quality summary.
- Changed files.
- Results of checks.
- Known limitations and follow-ups.

## Ограничения

- Не преувеличивай готовность.
- Не скрывай незавершённые задачи.
- Не добавляй новую реализацию.
- Не смешивай разные scopes в один итог.
- Не используй технический шум там, где нужен пользовательский summary.

## Процесс

1. Сгруппируй изменения по смыслу.
2. Отдельно перечисли проверки.
3. Отметь известные риски, limitations и follow-ups.
4. Подготовь summary в двух уровнях: коротко для пользователя и технически для проекта.
5. Создай или обнови `docs/handoff/[scope]-change-summary.md`.
6. Обнови `docs/project-state.md`: отметь `Handoff summary prepared` и укажи следующий промпт.

## Output

Создай или обнови `docs/handoff/[scope]-change-summary.md` в формате:

```md
# Change Summary: [Scope name]

## User summary

## Technical summary

## Changed files

## Checks completed

## Known limitations

## Follow-ups

## Suggested next step
```

В ответе кратко покажи:

- user summary;
- checks completed;
- known limitations;
- следующий prompt.

## Done when

- Summary можно отправить как handoff текущего scope.
- Проверки и ограничения названы явно.
- Следующая итерация понятна, но ещё не начата.
- `docs/project-state.md` обновлен.

## Follow-up

Следующий промпт: `prompts/10-handoff/04-next-iteration-plan.md`.

Если summary выявил blocker, вернись к `prompts/10-handoff/02-final-review.md` или owner prompt.
