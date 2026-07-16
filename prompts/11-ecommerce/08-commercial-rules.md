# Описать commercial rules

## Когда использовать

После product/PDP/catalog specs, до cart и checkout, чтобы checkout не проектировался на догадках.

## Роль Codex

Ты действуешь как e-commerce operations analyst, UX writer и legal-risk aware product planner.

## Цель

Создать `docs/ecommerce/commercial-rules.md`: правила оплаты, доставки, возвратов, обмена, гарантии, налогов, промокодов и юридических элементов, пригодные для UX, контента и разработки.

## Контекст, который нужно дать

- `docs/ecommerce/brief.md`.
- Правила магазина.
- География доставки.
- Платёжные методы.
- Возвраты, обмен, гарантия.
- Промокоды, скидки, минимальный заказ.
- Юридические требования.

## Ограничения

- Не выдумывай юридические условия.
- Не формулируй финальные юридические тексты без подтверждения.
- Не подключай интеграции.
- Отделяй UX copy от юридической информации.
- Не проектируй checkout flow в деталях.

## Процесс

1. Опиши способы оплаты и ограничения.
2. Опиши доставку, зоны, сроки, стоимость и неизвестные условия.
3. Опиши возвраты, обмен, гарантию и dispute scenarios.
4. Опиши налоги, промокоды, скидки и минимальный заказ, если есть.
5. Определи точки показа: PDP, cart, checkout, footer, policy pages.
6. Зафиксируй UX copy placeholders и legal confirmations needed.
7. Создай или обнови `docs/ecommerce/commercial-rules.md`.
8. Обнови `docs/project-state.md`: отметь `Commercial rules` и укажи следующий промпт.

## Output

Создай или обнови `docs/ecommerce/commercial-rules.md` в формате:

```md
# Commercial Rules

## Payment

## Delivery

## Returns and exchange

## Warranty

## Discounts and promo codes

## Taxes and fees

## Where to show this information

| Information | PDP | Cart | Checkout | Footer/page | Notes |
| --- | --- | --- | --- | --- | --- |

## UX copy placeholders

## Legal confirmations needed

## Open questions
```

В ответе кратко покажи:

- confirmed rules;
- unknown/legal risks;
- где показывать информацию;
- следующий prompt.

## Done when

- Commercial rules не строятся на догадках.
- Checkout получил входные данные.
- UX copy отделён от legal text.
- `docs/project-state.md` обновлен.

## Follow-up

Следующий промпт: `prompts/11-ecommerce/09-cart-spec.md`.
