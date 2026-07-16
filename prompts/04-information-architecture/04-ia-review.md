# Проверить информационную архитектуру

## Когда использовать

После `docs/ia/sitemap.md`, `docs/ia/page-section-map.md` и `docs/ia/content-inventory.md`, перед дизайн-системой, page spec и кодом.

## Роль Codex

Ты действуешь как senior information architect, UX reviewer и project risk analyst.

## Цель

Создать `docs/ia/ia-review.md`: короткую проверку IA, которая решает, готов ли проект переходить к design system или нужно исправить структуру, секции, навигацию или контентные пробелы.

## Контекст, который нужно дать

- `docs/ia/sitemap.md`.
- `docs/ia/page-section-map.md`.
- `docs/ia/content-inventory.md`.
- `project-brief.md`.
- `docs/strategy.md`.
- `docs/messaging.md`.
- `docs/research/research-summary.md`.
- `docs/research/audience-insights.md`.
- `docs/project-state.md`, если есть.
- E-commerce artifacts из `prompts/11-ecommerce/`, если проект магазин.

## Ограничения

- Не создавай новую дизайн-систему.
- Не пиши page spec и не переходи к реализации.
- Не переписывай все IA-документы целиком, если можно дать точечные исправления.
- Не закрывай критичные пробелы выдуманными фактами.
- Не ставь `IA ready`, если есть страницы без цели, секции без контента, trust blocks без proof или e-commerce сценарии без артефактов.

## Процесс

1. Проверь sitemap: есть ли лишние страницы, страницы без цели, перегруженная навигация, непонятные labels, пропущенные service/legal pages.
2. Проверь page section map: есть ли у каждой секции user question, business goal, content needed, CTA/proof там, где они нужны.
3. Проверь content inventory: есть ли критичные missing/risky пункты, которые блокируют дизайн или реализацию.
4. Сверь IA с strategy, messaging, research summary и audience insights.
5. Для e-commerce проекта проверь, что каталог, PDP, фильтры, корзина, checkout, доставка/оплата/возвраты не проектируются на догадках.
6. Раздели замечания на `must fix before design`, `can fix during page planning`, `watch later`.
7. Создай или обнови `docs/ia/ia-review.md`.
8. Если IA готова, обнови `docs/project-state.md`: отметь `IA reviewed`, stage `ia-ready`, следующий промпт `prompts/05-design-system/01-visual-reference-principles.md`, если есть визуальные референсы, или `prompts/05-design-system/02-design-style-shortlist.md`, если их нет.
9. Если IA не готова, оставь текущую стадию и укажи, к какому IA-промпту вернуться.

## Output

Создай или обнови `docs/ia/ia-review.md` в формате:

```md
# IA Review

## Verdict

- Status: IA ready / needs fixes
- Confidence:
- Next prompt:

## Checks

| Check | Result | Notes | Fix prompt |
| --- | --- | --- | --- |

## Must fix before design

## Can fix during page planning

## Watch later

## Ecommerce notes

## Project state update
```

В ответе кратко покажи:

- итоговый статус `IA ready` или `needs fixes`;
- 3-7 главных замечаний;
- какой промпт запускать дальше;
- обновлен ли `docs/project-state.md`.

## Done when

- Есть явный verdict по IA.
- Критичные проблемы не спрятаны в общих словах.
- Понятно, какие исправления делать до design system, а какие можно отложить.
- Если статус `IA ready`, `docs/project-state.md` переведен в `ia-ready`.
- Следующий prompt указан через router-логику.

## Follow-up

Если `IA ready`, следующий промпт: `prompts/05-design-system/01-visual-reference-principles.md`, если есть визуальные референсы, или `prompts/05-design-system/02-design-style-shortlist.md`, если их нет.

Если `needs fixes`, вернись к одному из промптов:

- `prompts/04-information-architecture/01-sitemap.md`;
- `prompts/04-information-architecture/02-page-section-map.md`;
- `prompts/04-information-architecture/03-content-inventory.md`.
