# Спроектировать фильтры, поиск и сортировку

## Когда использовать

После catalog architecture, PLP spec и product data model, до cart/checkout и реализации страниц категорий.

## Роль Codex

Ты действуешь как e-commerce UX designer, frontend state planner и SEO-aware catalog reviewer.

## Цель

Создать `docs/ecommerce/filters-search-sorting.md`: спецификацию фильтров, поиска, сортировки, URL/query behavior, mobile filters, empty/loading/error states и SEO/indexing notes.

## Контекст, который нужно дать

- `docs/ecommerce/product-data-model.md`.
- `docs/ecommerce/catalog-architecture.md`.
- `docs/ecommerce/category-plp-spec.md`.
- Атрибуты товаров.
- Примеры категорий.
- SEO-требования.
- Ограничения API/CMS.
- `prompts/_knowledge/ui-design-quality.md`.
- `prompts/_knowledge/site-copy-quality.md`.

## Ограничения

- Не реализуй код.
- Не добавляй фильтры, для которых нет данных.
- Не проектируй сложную state machine без необходимости.
- Не создавай индексируемые faceted pages без SEO rules.
- Не забывай mobile UX.
- Не утверждай filters/search/sorting UI без UI quality notes для density, grouping, selected/reset states, mobile drawer and empty/loading/error surfaces.
- Не утверждай labels, placeholders, empty/error states, reset text или SEO snippets без Site copy notes.

## Процесс

1. Определи фильтры по категориям и источники данных.
2. Определи сортировки и default sorting.
3. Опиши search и suggestions, если нужны.
4. Опиши URL/query behavior, reset behavior и сохранение состояния.
5. Опиши mobile filters.
6. Опиши empty/loading/error states.
7. Добавь UI quality notes по `prompts/_knowledge/ui-design-quality.md`.
8. Добавь Site copy notes по `prompts/_knowledge/site-copy-quality.md`.
9. Создай или обнови `docs/ecommerce/filters-search-sorting.md`.
10. Обнови `docs/project-state.md`: отметь `Filters/search/sorting spec` и укажи следующий промпт.

## Output

Создай или обнови `docs/ecommerce/filters-search-sorting.md` в формате:

```md
# Filters, Search and Sorting

## Filters by category

| Category | Filter | Data source | URL param | SEO notes | Required |
| --- | --- | --- | --- | --- | --- |

## Sorting

## Search

## URL/query behavior

## Mobile behavior

## Empty/loading/error states

## UI quality notes

## Site copy notes

## Open questions
```

В ответе кратко покажи:

- ключевые фильтры;
- URL behavior;
- mobile behavior;
- следующий prompt.

## Done when

- Фильтры связаны с реальными атрибутами.
- Mobile-поведение описано.
- Empty/loading/error states понятны.
- UI quality notes и Site copy notes зафиксированы для filters/search/sorting labels and states.
- `docs/project-state.md` обновлен.

## Follow-up

Следующий промпт: `prompts/11-ecommerce/08-commercial-rules.md`.
