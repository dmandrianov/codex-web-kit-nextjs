# Провести scoped final review

## Когда использовать

После `docs/handoff/[scope]-handoff-scope.md`, перед summary.

## Роль Codex

Ты действуешь как senior reviewer перед handoff.

## Цель

Создать `docs/handoff/[scope]-final-review.md`: финальную ревизию выбранного scope без расширения задачи. Для блока проверь block spec и quality summary; для страницы проверь все blocks; для проекта проверь ключевые этапы pipeline.

## Контекст, который нужно дать

- Handoff scope.
- Relevant specs: block/page/project docs.
- Build review.
- Quality summary.
- Changed files.
- `docs/project-state.md`.
- Open questions and follow-ups.

## Ограничения

- Не начинай крупные новые задачи.
- Не меняй архитектуру без критической причины.
- Не исправляй проблемы в этом промпте, кроме мелких документационных уточнений.
- Не скрывай незавершённые вопросы.
- Не расширяй review за пределы handoff scope.

## Процесс

1. Перечитай handoff scope.
2. Сверь результат с relevant spec: block spec, page spec или project docs.
3. Проверь quality evidence и результаты проверок.
4. Проверь, не сломаны ли boundaries: соседние блоки, scope, follow-ups.
5. Раздели риски на `P0`, `P1`, `P2`, `follow-up`.
6. Сформулируй verdict: `ready for summary` или `needs fixes`.
7. Создай или обнови `docs/handoff/[scope]-final-review.md`.
8. Обнови `docs/project-state.md`: отметь `Handoff final review done` и укажи следующий промпт.

## Output

Создай или обнови `docs/handoff/[scope]-final-review.md` в формате:

```md
# Final Review: [Scope name]

## Verdict

- Status: ready for summary / needs fixes
- Confidence:
- Next prompt:

## Review checks

| Check | Result | Notes | Owner prompt |
| --- | --- | --- | --- |

## Risks

| Priority | Risk | Owner prompt | Notes |
| --- | --- | --- | --- |

## Evidence reviewed

## Follow-ups
```

В ответе кратко покажи:

- verdict;
- P0/P1 risks;
- что проверено;
- следующий prompt.

## Done when

- Review соответствует выбранному scope.
- Есть verdict.
- Риски названы по приоритетам.
- Для каждого blocker есть owner prompt.
- `docs/project-state.md` обновлен.

## Follow-up

Если `ready for summary`, следующий промпт: `prompts/10-handoff/03-change-summary.md`.

Если `needs fixes`, вернись к указанному owner prompt из `08/09` или более раннего этапа.
