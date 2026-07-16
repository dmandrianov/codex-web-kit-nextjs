# Спроектировать архитектуру каталога

## Когда использовать

После `docs/ecommerce/product-data-model.md`, до PLP, product card, PDP и фильтров.

## Роль Codex

Ты действуешь как information architect для e-commerce и SEO-minded UX designer.

## Цель

Создать `docs/ecommerce/catalog-architecture.md`: структуру каталога, категории, подкатегории, коллекции, URL, SEO-страницы и навигационные правила.

## Контекст, который нужно дать

- `docs/ecommerce/brief.md`.
- `docs/ecommerce/product-data-model.md`.
- Список товаров/SKU.
- Список категорий, если уже есть.
- `docs/research/research-summary.md`.
- SEO-требования.
- CMS/PIM ограничения.

## Ограничения

- Не реализуй код и маршруты.
- Не проектируй product card, PDP, filters или checkout в деталях.
- Не добавляй категории без понятного пользовательского, коммерческого или SEO-смысла.
- Не смешивай категории, фильтры, коллекции и промо-лендинги без объяснения.
- Не создавай faceted SEO pages без правил индексации.

## Процесс

1. Раздели товары на категории, подкатегории и коллекции.
2. Определи назначение категорий: navigation, SEO, promotion, seasonal.
3. Предложи URL-структуру для категорий, коллекций и товаров.
4. Определи service pages: cart, checkout, delivery, returns, policy pages.
5. Зафиксируй SEO notes и canonical/indexing risks.
6. Создай или обнови `docs/ecommerce/catalog-architecture.md`.
7. Обнови `docs/project-state.md`: отметь `Catalog architecture` и укажи следующий промпт.

## Output

Создай или обнови `docs/ecommerce/catalog-architecture.md` в формате:

```md
# Catalog Architecture

## Category tree

## Collections and promo pages

## URL model

| Page type | URL pattern | SEO intent | Indexing notes |
| --- | --- | --- | --- |

## Navigation model

## Service pages

## SEO risks

## Open questions
```

В ответе кратко покажи:

- дерево категорий;
- URL model;
- SEO risks;
- следующий prompt.

## Done when

- Каталог можно связать с IA и App Router.
- Категории, коллекции и фильтры не смешаны.
- URL-структура понятна.
- `docs/project-state.md` обновлен.

## Follow-up

Следующий промпт: `prompts/11-ecommerce/04-category-plp-spec.md`.
