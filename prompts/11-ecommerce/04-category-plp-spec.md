# Спланировать category и PLP страницы

## Когда использовать

После `docs/ecommerce/catalog-architecture.md`, до product card, filters/search/sorting и page planning конкретной категории.

## Роль Codex

Ты действуешь как e-commerce UX designer, SEO planner и frontend page planner.

## Цель

Создать `docs/ecommerce/category-plp-spec.md`: спецификацию category/PLP страницы, product grid, category intro, merchandising, pagination/load more, empty/loading/error states и mobile behavior.

## Контекст, который нужно дать

- `docs/ecommerce/brief.md`.
- `docs/ecommerce/product-data-model.md`.
- `docs/ecommerce/catalog-architecture.md`.
- `docs/design-system/layout-rules.md`.
- `docs/design-system/component-inventory.md`.
- `prompts/_knowledge/ui-design-quality.md`.
- `prompts/_knowledge/site-copy-quality.md`.
- Примеры категорий и товаров.

## Ограничения

- Не реализуй PLP кодом.
- Не проектируй product card в деталях, это следующий промпт.
- Не добавляй блоки без связи с выбором товара.
- Не выдумывай количество товаров, цены и остатки.
- Не решай filters/search/sorting полностью здесь, только оставь места и зависимости.
- Не утверждай PLP UI без UI quality notes для grid, filters entry, sorting, states, mobile behavior и empty/loading/error surfaces.
- Не утверждай category intro, labels, sorting/filter labels, empty/error states или SEO snippets без Site copy notes.

## Процесс

1. Опиши назначение category/PLP страницы.
2. Определи обязательные зоны: category intro, grid/list, filters entry, sorting, pagination/load more, empty states.
3. Опиши merchandising: promo banner, featured products, collections, trust snippets, если нужны.
4. Зафиксируй mobile PLP behavior.
5. Опиши loading/empty/error states.
6. Добавь UI quality notes по `prompts/_knowledge/ui-design-quality.md`.
7. Добавь Site copy notes по `prompts/_knowledge/site-copy-quality.md`.
8. Создай или обнови `docs/ecommerce/category-plp-spec.md`.
9. Обнови `docs/project-state.md`: отметь `Category PLP spec` и укажи следующий промпт.

## Output

Создай или обнови `docs/ecommerce/category-plp-spec.md` в формате:

```md
# Category / PLP Spec

## Page purpose

## Core sections

| Section | Purpose | Content/data | States | Notes |
| --- | --- | --- | --- | --- |

## Product grid rules

## Pagination / load more

## Mobile behavior

## Empty/loading/error states

## UI quality notes

## Site copy notes

## SEO notes

## Open questions
```

В ответе кратко покажи:

- PLP sections;
- product grid rules;
- mobile risks;
- следующий prompt.

## Done when

- PLP можно вернуть в `07-page-planning` как конкретную страницу.
- Grid, states и mobile behavior описаны.
- UI quality notes и Site copy notes зафиксированы для PLP, states и snippets.
- Product card вынесен отдельно.
- `docs/project-state.md` обновлен.

## Follow-up

Следующий промпт: `prompts/11-ecommerce/05-product-card-spec.md`.
