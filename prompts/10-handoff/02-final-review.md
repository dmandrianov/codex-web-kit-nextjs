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
- `docs/quality/application-flow-check.md`, если scope page/project содержит формы, CMS, auth, commerce или интеграции.
- `docs/nextjs/technical-architecture.md`, для project scope.
- Changed files.
- `docs/project-state.md`.
- Open questions and follow-ups.

## Ограничения

- Не начинай крупные новые задачи.
- Не меняй архитектуру без критической причины.
- Не исправляй проблемы в этом промпте, кроме мелких документационных уточнений.
- Не скрывай незавершённые вопросы.
- Не расширяй review за пределы handoff scope.
- Не ставь project/page scope `ready for summary`, если применимый application flow check отсутствует или имеет `needs fixes`.

## Процесс

1. Перечитай handoff scope.
2. Сверь результат с relevant spec: block spec, page spec или project docs.
3. Проверь block-level quality evidence и результаты проверок.
4. Для page/project scope проверь application-wide journeys, data/cache behavior, forms/CMS/auth/commerce и production-like runtime по применимости.
5. Для project scope сверь результат с technical architecture и незакрытыми owner prompts.
6. Проверь, не сломаны ли boundaries: соседние блоки, scope, follow-ups.
7. Раздели риски на `P0`, `P1`, `P2`, `follow-up`.
8. Сформулируй verdict: `ready for summary` или `needs fixes`.
9. Создай или обнови `docs/handoff/[scope]-final-review.md`.
10. Обнови `docs/project-state.md`: отметь `Handoff final review done` и укажи следующий промпт.

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
- Применимые полные пользовательские сценарии проверены, а не выведены из готовности отдельных блоков.
- Для каждого blocker есть owner prompt.
- `docs/project-state.md` обновлен.

## Follow-up

Если `ready for summary`, следующий промпт: `prompts/10-handoff/03-change-summary.md`.

Если `needs fixes`, вернись к указанному owner prompt из `08/09` или более раннего этапа.
