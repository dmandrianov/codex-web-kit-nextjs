# Спланировать cart spec

## Когда использовать

После commercial rules, product card/PDP и до checkout flow.

## Роль Codex

Ты действуешь как cart UX architect и frontend product planner.

## Цель

Создать `docs/ecommerce/cart-spec.md`: спецификацию корзины с item list, quantity, remove, promo, price summary, delivery estimate, empty cart, stock/price changes и analytics notes.

## Контекст, который нужно дать

- `docs/ecommerce/product-data-model.md`.
- `docs/ecommerce/product-card-spec.md`.
- `docs/ecommerce/pdp-spec.md`.
- `docs/ecommerce/commercial-rules.md`.
- `docs/nextjs/technical-architecture.md`.
- `docs/design-system/component-inventory.md`.
- `prompts/_knowledge/ui-design-quality.md`.
- `prompts/_knowledge/site-copy-quality.md`.
- Шаблон `prompts/_templates/checkout-flow-template.md`, если полезен.

## Ограничения

- Не проектируй весь checkout flow.
- Не подключай платежи.
- Не выдумывай цены, скидки, доставку или промокоды.
- Не считай browser/local state источником истины для price, discount, stock или cart ownership.
- Не делай cart и checkout одним block spec.
- Не реализуй код.
- Не утверждай cart UI без UI quality notes для item rows, quantity controls, price summary, promo, empty cart, stock/price changes and mobile behavior.
- Не утверждай cart copy, promo errors, stock/price messages, empty cart text, CTA or delivery estimate copy без Site copy notes.

## Процесс

1. Опиши назначение cart.
2. Опиши cart item data и actions.
3. Опиши price summary, promo code, delivery estimate.
4. Опиши server revalidation points и states: empty, loading, item unavailable, price changed, quantity limit, promo invalid, duplicate/retry.
5. Опиши mobile cart behavior.
6. Добавь UI quality notes по `prompts/_knowledge/ui-design-quality.md`.
7. Добавь Site copy notes по `prompts/_knowledge/site-copy-quality.md`.
8. Опиши analytics events.
9. Создай или обнови `docs/ecommerce/cart-spec.md`.
10. Обнови `docs/project-state.md`: отметь `Cart spec` и укажи следующий промпт.

## Output

Создай или обнови `docs/ecommerce/cart-spec.md` в формате:

```md
# Cart Spec

## Purpose

## Cart item

## Actions

## Price summary

## Promo and discounts

## Delivery estimate

## States and errors

## Server revalidation and ownership

## Mobile behavior

## UI quality notes

## Site copy notes

## Analytics

## Open questions
```

В ответе кратко покажи:

- cart structure;
- critical states;
- data risks;
- следующий prompt.

## Done when

- Cart можно вернуть в `07-page-planning`.
- Cart и checkout не смешаны.
- Ошибки и edge cases описаны.
- Источник истины корзины и точки серверной перепроверки зафиксированы на уровне UX/data contract.
- UI quality notes и Site copy notes зафиксированы для cart actions, states, errors and CTAs.
- `docs/project-state.md` обновлен.

## Follow-up

Следующий промпт: `prompts/11-ecommerce/10-checkout-flow-spec.md`.
