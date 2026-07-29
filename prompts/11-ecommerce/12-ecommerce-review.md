# Проверить e-commerce слой

## Когда использовать

После e-commerce brief, product data model, catalog architecture, PLP, product card, PDP, filters, commercial rules, cart, checkout, account/analytics и commerce operations/payment safety.

## Роль Codex

Ты действуешь как senior e-commerce reviewer, UX risk analyst и router-aware project lead.

## Цель

Создать `docs/ecommerce/ecommerce-review.md`: финальный verdict `Ecommerce ready for page planning` или `needs fixes`, чтобы конкретные e-commerce страницы можно было вернуть в общий pipeline `07-page-planning -> 08-block-build -> 09-quality`.

## Контекст, который нужно дать

- Все `docs/ecommerce/*.md`.
- `docs/ecommerce/commerce-operations-and-payment-safety.md`.
- `docs/nextjs/technical-architecture.md`.
- `docs/ia/ia-review.md`.
- `docs/design-system/design-system-review.md`.
- `docs/nextjs/next-ready-review.md`, если есть.
- `docs/project-state.md`.
- Open questions and risks.

## Ограничения

- Не реализуй страницы или блоки.
- Не переписывай все e-commerce docs без необходимости.
- Не ставь `Ecommerce ready`, если checkout, commercial rules или product data строятся на догадках.
- Не ставь `Ecommerce ready`, если commerce/payment source of truth, server-side order recalculation, signed webhook, idempotency, order transitions или reconciliation отсутствуют либо имеют status `needs decisions`.
- Не отправляй в реализацию весь магазин: только конкретную страницу/блок через общий pipeline.
- Не скрывай legal/payment/delivery risks.

## Процесс

1. Проверь наличие всех e-commerce artifacts.
2. Сверь product data model с catalog, PLP, product card, PDP, cart и checkout.
3. Проверь commercial rules до checkout.
4. Проверь technical commerce safety: authoritative systems, cart/session ownership, server-side total/stock recheck, order state machine, webhook signature, idempotency, concurrent/out-of-order delivery, recovery/reconciliation и sandbox test matrix.
5. Проверь critical states: stock, price changed, promo invalid, duplicate submit/event, pending/failed payment, delivery unavailable, out of stock.
6. Проверь analytics/privacy/consent и отсутствие запрещённых payment/secrets data в logs.
7. Раздели issues на `must fix before page planning`, `can fix during page planning`, `watch later`.
8. Создай или обнови `docs/ecommerce/ecommerce-review.md`.
9. Если готово, обнови `docs/project-state.md`: отметь `Ecommerce reviewed`, следующий промпт `prompts/07-page-planning/01-select-page-and-scope.md`.

## Output

Создай или обнови `docs/ecommerce/ecommerce-review.md` в формате:

```md
# Ecommerce Review

## Verdict

- Status: Ecommerce ready for page planning / needs fixes
- Confidence:
- Next prompt:

## Checks

| Check | Result | Notes | Fix prompt |
| --- | --- | --- | --- |

## Must fix before page planning

## Can fix during page planning

## Watch later

## Recommended first ecommerce page

## Project state update
```

В ответе кратко покажи:

- verdict;
- blockers;
- recommended first ecommerce page;
- следующий prompt.

## Done when

- Есть явный verdict.
- Критичные e-commerce риски не скрыты.
- Commerce operations и payment safety имеют status `ready for ecommerce review`.
- Источники истины, server-side recalculation, webhook/idempotency и recovery подтверждены документами, а не подразумеваются.
- Понятно, какую конкретную страницу планировать первой.
- Проект возвращается в общий pipeline, а не в реализацию всего магазина.
- `docs/project-state.md` обновлен.

## Follow-up

Если `Ecommerce ready for page planning`, следующий промпт: `prompts/07-page-planning/01-select-page-and-scope.md`.

Если `needs fixes`, вернись к одному из промптов `prompts/11-ecommerce/`.
