# Определить scope handoff

## Когда использовать

После `docs/pages/[page-slug]/blocks/[block-slug]-quality-summary.md` со статусом `Quality passed` или когда пользователь просит итог по блоку, странице, итерации или проекту.

## Роль Codex

Ты действуешь как delivery lead и project state curator.

## Цель

Создать `docs/handoff/[scope]-handoff-scope.md`: определить, что именно сдаётся сейчас (`block`, `page`, `iteration`, `project`), какие артефакты подтверждают готовность и какой уровень summary нужен.

## Контекст, который нужно дать

- Quality summary, если сдаётся блок.
- Page planning review и block breakdown, если сдаётся страница.
- `docs/project-state.md`.
- Changed files.
- Последние проверки.
- `docs/quality/application-flow-check.md`, если сдаётся страница/проект с формами, CMS, auth, commerce или интеграциями.
- Open questions, risks, TODO.
- Запрос пользователя: нужен итог блока, страницы, итерации или проекта.

## Ограничения

- Не начинай новую реализацию.
- Не объявляй весь проект готовым, если завершён только один блок.
- Не скрывай незавершённые задачи.
- Не смешивай out-of-scope follow-ups с текущим handoff scope.
- Если quality summary не `Quality passed`, вернись в `prompts/09-quality/06-quality-summary.md`.

## Процесс

1. Определи handoff type: `block`, `page`, `iteration`, `project`.
2. Определи scope boundaries: что входит в итог, что не входит.
3. Собери подтверждающие артефакты: specs, build review, quality summary, checks. Для page/project scope определи, нужен ли `prompts/09-quality/07-application-flow-check.md`.
4. Проверь, есть ли blockers, open questions, follow-ups.
5. Определи, нужен ли следующий block spec, следующая страница или project-level handoff.
6. Создай или обнови `docs/handoff/[scope]-handoff-scope.md`.
7. Обнови `docs/project-state.md`: отметь `Handoff scope selected` и укажи следующий промпт.

## Output

Создай или обнови `docs/handoff/[scope]-handoff-scope.md` в формате:

```md
# Handoff Scope: [Scope name]

## Scope type

- Type: block / page / iteration / project
- Confidence:
- Next prompt:

## Included

## Excluded

## Evidence

| Artifact | Path | Status | Notes |
| --- | --- | --- | --- |

## Changed files

## Open questions and follow-ups

## Recommended next step
```

В ответе кратко покажи:

- handoff type;
- что входит в scope;
- что не входит;
- blockers/follow-ups;
- следующий prompt.

## Done when

- Handoff scope явно выбран.
- Для page/project scope с динамическими сценариями application flow check присутствует или назначен обязательным следующим шагом.
- Нет путаницы между готовым блоком, страницей и проектом.
- Есть список evidence.
- Следующий шаг понятен.
- `docs/project-state.md` обновлен.

## Follow-up

Если page/project scope требует application-wide проверки и её ещё нет, следующий промпт: `prompts/09-quality/07-application-flow-check.md`.

Иначе следующий промпт: `prompts/10-handoff/02-final-review.md`.

Если scope не готов к handoff, вернись к `prompts/09-quality/06-quality-summary.md` или нужному prompt из `08/09`.
