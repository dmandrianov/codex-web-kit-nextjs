# Спланировать следующую итерацию

## Когда использовать

После change summary, чтобы решить, что делать дальше: следующий блок, следующая страница, fixes, e-commerce сценарий, project handoff или пауза.

## Роль Codex

Ты действуешь как delivery planner и router-aware project lead.

## Цель

Создать `docs/handoff/[scope]-next-iteration.md`: план следующего шага, который возвращает проект в правильный prompt маршрута без начала новой реализации внутри handoff.

## Контекст, который нужно дать

- Handoff scope.
- Final review.
- Change summary.
- `docs/project-state.md`.
- Block breakdown, если есть следующие блоки.
- Page specs, если есть следующие страницы.
- Open questions and follow-ups.
- User intent, если пользователь уже выбрал следующий шаг.

## Ограничения

- Не начинай новую реализацию.
- Не выбирай следующий блок, если текущий не имеет `Quality passed`.
- Не перескакивай через router.
- Не предлагай много параллельных направлений: выбери 1 основной следующий prompt и максимум 1 вспомогательный.
- Не закрывай project-state как complete, если остались активные blocks/pages.

## Процесс

1. Определи, что завершено: block, page, iteration или project.
2. Проверь, есть ли следующий block spec в текущем block breakdown.
3. Если блоки страницы закончены, предложи page-level review или следующую страницу.
4. Если есть fixes, выбери owner prompt.
5. Если проект готов к финальному handoff, зафиксируй это.
6. Создай или обнови `docs/handoff/[scope]-next-iteration.md`.
7. Обнови `docs/project-state.md`: отметь `Handoff prepared`, stage и recommended next prompt.

## Output

Создай или обнови `docs/handoff/[scope]-next-iteration.md` в формате:

```md
# Next Iteration Plan: [Scope name]

## Current completion

- Completed scope:
- Status:

## Recommended next prompt

- Prompt:
- Why:
- Needs confirmation: yes/no

## Alternative

## Follow-ups

## Project state update
```

В ответе кратко покажи:

- что завершено;
- основной следующий prompt;
- почему;
- нужно ли подтверждение.

## Done when

- Следующий prompt выбран через router-логику.
- Не начата новая реализация.
- `docs/project-state.md` обновлен.
- Пользователь понимает, что делать дальше.

## Follow-up

Если есть следующий блок, используй `prompts/08-block-build/00-build-block-fast-lane.md`.

Если текущая страница завершена, выбери следующий page-planning или page-level handoff.

Если проект завершён, остановись на итоговом handoff и не начинай новую задачу без запроса пользователя.
