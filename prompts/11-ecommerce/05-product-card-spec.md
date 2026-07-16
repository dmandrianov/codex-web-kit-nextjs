# Спланировать product card

## Когда использовать

После PLP spec и product data model, до PDP и реализации карточек в каталоге.

## Роль Codex

Ты действуешь как e-commerce UI planner и frontend component designer.

## Цель

Создать `docs/ecommerce/product-card-spec.md`: спецификацию product card как отдельного UI-компонента/блока с контентом, actions, states, accessibility, analytics и design-system constraints.

## Контекст, который нужно дать

- `docs/ecommerce/product-data-model.md`.
- `docs/ecommerce/category-plp-spec.md`.
- `docs/design-system/design-tokens.md`.
- `docs/design-system/layout-rules.md`.
- `docs/design-system/component-inventory.md`.
- `prompts/_knowledge/ui-design-quality.md`.
- `prompts/_knowledge/site-copy-quality.md`.
- Примеры товаров.

## Ограничения

- Не реализуй карточку кодом.
- Не проектируй PDP.
- Не придумывай цены, скидки, отзывы, остатки или бейджи.
- Не добавляй quick add, wishlist или compare без бизнес-сценария.
- Не копируй чужие product cards 1:1.
- Не утверждай card layout/states без UI quality notes: hierarchy, media fit, price prominence, CTA, badges, states and mobile grid behavior.
- Не утверждай product labels, badges, stock messages, CTA, quick action text или empty/unavailable copy без Site copy notes.

## Процесс

1. Определи обязательные элементы product card.
2. Опиши actions: open PDP, add to cart, quick add, wishlist, compare, если нужны.
3. Опиши states: default, hover, focus, loading, out of stock, sale, new, unavailable variant.
4. Опиши media/image rules и text fitting.
5. Добавь UI quality notes по `prompts/_knowledge/ui-design-quality.md`.
6. Добавь Site copy notes по `prompts/_knowledge/site-copy-quality.md`.
7. Опиши accessibility и analytics events.
8. Создай или обнови `docs/ecommerce/product-card-spec.md`.
9. Обнови `docs/project-state.md`: отметь `Product card spec` и укажи следующий промпт.

## Output

Создай или обнови `docs/ecommerce/product-card-spec.md` в формате:

```md
# Product Card Spec

## Purpose

## Content and data

## Actions

## States

| State | UI behavior | Data needed | Notes |
| --- | --- | --- | --- |

## Design-system constraints

## UI quality notes

## Site copy notes

## Accessibility

## Analytics

## Open questions
```

В ответе кратко покажи:

- элементы карточки;
- states;
- data risks;
- следующий prompt.

## Done when

- Product card можно планировать как отдельный block spec.
- States и actions описаны.
- UI quality notes и Site copy notes зафиксированы для card content, labels, CTA, badges and states.
- Неизвестные данные отмечены.
- `docs/project-state.md` обновлен.

## Follow-up

Следующий промпт: `prompts/11-ecommerce/06-pdp-spec.md`.
