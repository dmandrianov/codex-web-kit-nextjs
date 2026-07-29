# Спланировать account, orders и analytics

## Когда использовать

После checkout flow, чтобы решить account/order сценарии и e-commerce analytics event map.

## Роль Codex

Ты действуешь как product designer для customer account, analytics-minded product engineer и privacy-aware planner.

## Цель

Создать `docs/ecommerce/account-orders-analytics.md`: решение по аккаунту/заказам, MVP/post-MVP, order states и analytics event map без преждевременной реализации.

## Контекст, который нужно дать

- `docs/ecommerce/brief.md`.
- `docs/ecommerce/checkout-flow.md`.
- `docs/ecommerce/cart-spec.md`.
- CRM/ERP/auth/analytics integrations.
- Бизнес-цели и privacy/consent требования.

## Ограничения

- Не делай аккаунт обязательным, если бизнес этого не требует.
- Не проектируй auth security в деталях без выбранного провайдера.
- Не подключай аналитику кодом.
- Не собирай персональные данные без необходимости.
- Не придумывай события, которые никто не будет использовать.
- Учитывай consent/cookie требования.

## Процесс

1. Определи, нужен ли аккаунт в MVP.
2. Опиши account/order scenarios: registration, login, order history, addresses, repeat order, wishlist.
3. Опиши order states и data sources.
4. Определи analytics funnel: view_item, select_item, add_to_cart, begin_checkout, purchase, errors.
5. Определи event parameters и privacy notes.
6. Раздели MVP/post-MVP.
7. Создай или обнови `docs/ecommerce/account-orders-analytics.md`.
8. Обнови `docs/project-state.md`: отметь `Account/orders analytics spec` и укажи следующий промпт.

## Output

Создай или обнови `docs/ecommerce/account-orders-analytics.md` в формате:

```md
# Account, Orders and Analytics

## Account decision

## Account scenarios

## Order states

## MVP / post-MVP

## Analytics event map

| Event | Trigger | Parameters | Business question | Privacy notes |
| --- | --- | --- | --- | --- |

## Consent and privacy

## Open questions
```

В ответе кратко покажи:

- нужен ли account в MVP;
- order states;
- ключевые analytics events;
- следующий prompt.

## Done when

- Account не блокирует guest checkout без причины.
- Order states и data sources понятны.
- Основная e-commerce воронка измерима.
- Privacy и consent не забыты.
- `docs/project-state.md` обновлен.

## Follow-up

Следующий промпт: `prompts/11-ecommerce/12-commerce-operations-and-payment-safety.md`.
