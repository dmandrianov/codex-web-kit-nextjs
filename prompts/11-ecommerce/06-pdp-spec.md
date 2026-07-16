# Спланировать PDP

## Когда использовать

После product card spec, до фильтров, коммерческих правил, cart и checkout.

## Роль Codex

Ты действуешь как e-commerce UX designer, conversion planner и frontend page planner.

## Цель

Создать `docs/ecommerce/pdp-spec.md`: спецификацию product detail page с gallery, variants, price, stock, CTA, delivery/returns trust, reviews, related products, structured data notes и states.

## Контекст, который нужно дать

- `docs/ecommerce/brief.md`.
- `docs/ecommerce/product-data-model.md`.
- `docs/ecommerce/product-card-spec.md`.
- `docs/design-system/layout-rules.md`.
- `docs/design-system/component-inventory.md`.
- `prompts/_knowledge/ui-design-quality.md`.
- `prompts/_knowledge/site-copy-quality.md`.
- Шаблон `prompts/_templates/product-page-spec-template.md`.
- Примеры товаров.

## Ограничения

- Не реализуй PDP кодом.
- Не делай весь каталог.
- Не придумывай цены, отзывы, остатки, характеристики или сертификаты.
- Не формулируй финальные legal claims.
- Не проектируй checkout внутри PDP.
- Не утверждай PDP UI без UI quality notes для gallery, product info, variants, price, stock, CTA, trust, reviews, related products and responsive hierarchy.
- Не утверждай product copy, CTA, trust snippets, stock/variant messages, delivery/returns copy or structured data text без Site copy notes.

## Процесс

1. Определи цель PDP и основной сценарий принятия решения.
2. Опиши структуру PDP: hero, gallery, info, variants, CTA, details, delivery/returns, reviews, related.
3. Опиши states товара и CTA.
4. Опиши trust/proof requirements.
5. Добавь UI quality notes по `prompts/_knowledge/ui-design-quality.md`.
6. Добавь Site copy notes по `prompts/_knowledge/site-copy-quality.md`.
7. Добавь structured data notes для Product/Offer/Review только как план.
8. Создай или обнови `docs/ecommerce/pdp-spec.md`.
9. Обнови `docs/project-state.md`: отметь `PDP spec` и укажи следующий промпт.

## Output

Создай или обнови `docs/ecommerce/pdp-spec.md` по шаблону `prompts/_templates/product-page-spec-template.md`, добавив:

- structured data notes;
- trust/proof requirements;
- UI quality notes;
- Site copy notes;
- forbidden-to-invent facts;
- page-planning notes.

В ответе кратко покажи:

- PDP sections;
- states;
- trust/data risks;
- следующий prompt.

## Done when

- PDP можно вернуть в `07-page-planning`.
- Product states, CTA и trust requirements описаны.
- UI quality notes и Site copy notes зафиксированы для product info, CTA, variants, states and trust copy.
- Рискованные данные не выдуманы.
- `docs/project-state.md` обновлен.

## Follow-up

Следующий промпт: `prompts/11-ecommerce/07-filters-search-sorting.md`.
