# Спроектировать безопасную работу магазина и оплаты

## Когда использовать

После cart, checkout и account/order specs, до финального e-commerce review и до реализации checkout/payment integration.

## Роль Codex

Ты действуешь как senior commerce architect, payment integration reviewer и operations planner.

## Цель

Создать `docs/ecommerce/commerce-operations-and-payment-safety.md`: технический контракт источников истины, корзины, заказа, оплаты, webhook, повторов, reconciliation и наблюдаемости.

## Контекст, который нужно дать

- Все готовые `docs/ecommerce/*.md`.
- `docs/nextjs/technical-architecture.md`.
- Выбранные commerce, payment, inventory, CRM/ERP и fulfillment systems.
- Sandbox/test-mode documentation выбранных providers.
- Business rules для price, stock, delivery, refund и cancel.
- `prompts/_knowledge/nextjs-technical-baseline.md`.

## Ограничения

- Не подключай provider и не выполняй реальный платёж в этом prompt.
- Не выдумывай capabilities API, webhook events или legal/payment rules.
- Не доверяй цене, скидке, наличию, user ID или order total из браузера.
- Не считай success redirect подтверждением оплаты.
- Не ставь safety status `ready`, если webhook signature, idempotency или reconciliation не определены.
- Не проектируй хранение card data внутри приложения, если это не отдельный подтверждённый compliance scope.
- По умолчанию предпочитай готовый commerce/payment backend и hosted payment surface; custom backend требует подтверждённой причины и отдельного risk review.
- Если `docs/nextjs/technical-architecture.md` отсутствует или имеет `needs decisions`, сначала вернись в Next.js architecture route; не заполняй safety contract догадками.

## Процесс

1. Зафиксируй authoritative system для product, variant, price, stock, cart, customer, order, payment и fulfillment.
2. Определи cart/session ownership, guest recovery, expiry и merge behavior.
3. Опиши server-side recalculation перед созданием payment: current price, discounts, tax, delivery, stock и currency/market.
4. Опиши order state machine и разрешённые transitions.
5. Определи момент создания order и связь internal order ID с provider session/payment ID.
6. Опиши webhook endpoint: raw body, signature verification, secret storage, supported events и response time.
7. Определи event deduplication/idempotency, concurrent delivery и out-of-order handling.
8. Опиши exactly-once business effect: повторный event не создаёт повторную отгрузку, письмо, списание бонусов или изменение остатка.
9. Опиши recovery/reconciliation: payment success при временной ошибке приложения, missed webhook, pending/async payment, manual retry.
10. Зафиксируй cancel, refund, partial refund/fulfillment и владельца каждого действия.
11. Определи logs, alerts, audit trail и данные, которые запрещено логировать.
12. Составь sandbox tests: duplicate event, invalid signature, price/stock changed, payment failed, delayed success, out-of-order event.
13. Создай или обнови `docs/ecommerce/commerce-operations-and-payment-safety.md`.
14. Обнови `docs/project-state.md`: отметь `Commerce operations and payment safety designed` и следующий prompt.

## Output

Создай или обнови `docs/ecommerce/commerce-operations-and-payment-safety.md`:

```md
# Commerce Operations and Payment Safety

## Verdict

- Status: ready for ecommerce review / needs decisions
- Commerce engine:
- Payment provider/mode:
- Custom backend reason, if any:

## Sources of truth

| Entity | Authoritative system | Owner | Update direction | Fallback |
| --- | --- | --- | --- | --- |

## Cart and session

## Server-side order recalculation

## Order state machine

| State | Entered by | Allowed next states | Side effects | Retry rule |
| --- | --- | --- | --- | --- |

## Payment creation and return flow

## Webhook contract

- Signature verification:
- Raw body:
- Secret location:
- Event IDs:
- Duplicate/concurrent handling:
- Out-of-order handling:
- Response timing:

## Idempotent business effects

## Recovery and reconciliation

## Cancel, refund and fulfillment

## Logs, alerts and audit

## Sandbox test matrix

| Scenario | Expected invariant | Evidence needed | Status |
| --- | --- | --- | --- |

## Open decisions and blockers
```

В ответе объясни обычными словами:

- какая система за что отвечает;
- почему повторное уведомление не создаст повторное действие;
- как магазин восстановится после временной ошибки;
- какие решения ещё нужны от пользователя;
- следующий prompt.

## Done when

- Для всех commerce entities определён источник истины.
- Итог заказа пересчитывается на server boundary.
- Success redirect не используется как единственное подтверждение оплаты.
- Webhook signature, idempotency, concurrency и out-of-order handling описаны.
- Order transitions и side effects контролируемы.
- Есть recovery/reconciliation и sandbox test matrix.
- Custom backend имеет подтверждённую причину либо используется готовая commerce/payment основа.
- `docs/project-state.md` обновлён.

## Follow-up

Если status `ready for ecommerce review`, следующий промпт: `prompts/11-ecommerce/12-ecommerce-review.md`.

Если нет Next.js technical architecture, используй `prompts/06-nextjs-setup/01-project-preflight.md`, а затем `prompts/06-nextjs-setup/02-technical-architecture.md`.

Если есть другие blockers, вернись к конкретному owner prompt или обсуди 1–3 обязательных решения с пользователем до review.
