# Описать product data model

## Когда использовать

После `docs/ecommerce/brief.md`, до архитектуры каталога, product card, PDP, фильтров и checkout.

## Роль Codex

Ты действуешь как e-commerce data architect, UX planner и frontend data contract reviewer.

## Цель

Создать `docs/ecommerce/product-data-model.md`: модель данных товаров, SKU, вариантов, атрибутов, цен, остатков, media, badges, reviews и коммерческих flags, пригодную для каталога, PDP, корзины и аналитики.

## Контекст, который нужно дать

- `docs/ecommerce/brief.md`.
- Список товаров/SKU, если есть.
- Примеры товаров.
- CMS/PIM/API ограничения.
- Требования к цене, остаткам, скидкам, вариантам, отзывам.
- Юридические и отраслевые ограничения.

## Ограничения

- Не придумывай реальные цены, остатки, отзывы, рейтинги, сертификаты и характеристики.
- Не проектируй UI и страницы.
- Не добавляй поля, которые никто не будет использовать.
- Не смешивай product attributes, filter attributes и marketing badges без объяснения.
- Не выбирай CMS/PIM без отдельного решения.
- Используй CMS decision из project brief или `docs/nextjs/technical-architecture.md`, если он уже создан: если владелец меняет сайт через Codex/ИИ и редакционная команда не нужна, не добавляй CMS только ради каталога.
- Не смешивай editorial product copy с operational price/stock/order data, если у них разные владельцы и требования к свежести.

## Процесс

1. Определи типы товаров: physical, digital, service, configurable, bundle, subscription.
2. Определи сущности: product, variant/SKU, category, collection, media, price, stock, review, badge.
3. Для content, catalog identity, price, stock и variants зафиксируй отдельный authoritative source и владельца.
4. Опиши обязательные и optional поля.
5. Отдельно выдели attributes для фильтров, сравнения и PDP.
6. Опиши состояния: in stock, low stock, out of stock, sale, new, preorder, unavailable variant.
7. Зафиксируй data risks и open questions.
8. Создай или обнови `docs/ecommerce/product-data-model.md`.
9. Обнови `docs/project-state.md`: отметь `Product data model` и укажи следующий промпт.

## Output

Создай или обнови `docs/ecommerce/product-data-model.md` в формате:

```md
# Product Data Model

## Product types

## Entities

| Entity | Purpose | Required fields | Optional fields | Source | Notes |
| --- | --- | --- | --- | --- | --- |

## Sources of truth

| Data class | Authoritative source | Owner | Freshness | Notes |
| --- | --- | --- | --- | --- |

## Product fields

## Variant/SKU fields

## Attributes

| Attribute | Used for PDP | Used for filters | Used for comparison | Required | Notes |
| --- | --- | --- | --- | --- | --- |

## States and flags

## Media requirements

## Reviews and ratings

## Data risks and open questions
```

В ответе кратко покажи:

- ключевые сущности;
- обязательные поля;
- риски данных;
- следующий prompt.

## Done when

- Product/SKU/variant модель понятна.
- Content, catalog identity, price и stock не смешаны без явного owner/source decision.
- Атрибуты для PDP, фильтров и сравнения разделены.
- Неизвестные данные отмечены, а не выдуманы.
- `docs/project-state.md` обновлен.

## Follow-up

Следующий промпт: `prompts/11-ecommerce/03-catalog-architecture.md`.
