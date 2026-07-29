# Спланировать checkout flow

## Когда использовать

После cart spec и commercial rules, до реализации checkout steps.

## Роль Codex

Ты действуешь как checkout UX architect, frontend product planner и risk-aware form designer.

## Цель

Создать `docs/ecommerce/checkout-flow.md`: checkout flow spec с guest checkout, customer, delivery, payment, review, success, errors, validation, legal elements и analytics.

## Контекст, который нужно дать

- `docs/ecommerce/cart-spec.md`.
- `docs/ecommerce/commercial-rules.md`.
- `docs/ecommerce/product-data-model.md`.
- `docs/nextjs/technical-architecture.md`.
- Payment/delivery integration constraints.
- `docs/design-system/accessibility.md`.
- `prompts/_knowledge/ui-design-quality.md`.
- `prompts/_knowledge/site-copy-quality.md`.
- Шаблон `prompts/_templates/checkout-flow-template.md`.

## Ограничения

- Не подключай реальные платежи.
- Не реализуй checkout кодом.
- Не придумывай условия доставки, оплаты, возвратов, комиссии или legal text.
- Guest checkout должен быть рассмотрен явно, если аккаунт не обязателен.
- Не проектируй все checkout blocks как одну реализационную задачу.
- Не утверждай checkout UI без UI quality notes для forms, step hierarchy, progress, review, errors, payment failure, success and mobile behavior.
- Не утверждай checkout copy, field labels, validation errors, recovery messages, consent/legal prompts, success copy or CTA без Site copy notes.
- Не считай success page или redirect подтверждением оплаты; это UX state ожидания/подтверждения, а authoritative payment result определяется в technical commerce safety.

## Процесс

1. Выбери checkout model: one-page, step-by-step, hybrid.
2. Опиши steps: cart handoff, customer, delivery, payment, review, success.
3. Опиши fields, validation, errors и recovery.
4. Опиши guest/registered user behavior.
5. Опиши edge cases: stock, price, promo, duplicate submit, pending/async payment, payment failure, delivery unavailable и потерю связи после перехода к провайдеру.
6. Опиши legal/consent elements.
7. Добавь UI quality notes по `prompts/_knowledge/ui-design-quality.md`.
8. Добавь Site copy notes по `prompts/_knowledge/site-copy-quality.md`.
9. Опиши analytics events.
10. Создай или обнови `docs/ecommerce/checkout-flow.md`.
11. Обнови `docs/project-state.md`: отметь `Checkout flow spec` и укажи следующий промпт.

## Output

Создай или обнови `docs/ecommerce/checkout-flow.md` по шаблону `prompts/_templates/checkout-flow-template.md`, добавив:

- validation matrix;
- recovery behavior;
- accessibility notes;
- UI quality notes;
- Site copy notes;
- implementation split into block specs.

В ответе кратко покажи:

- checkout model;
- steps;
- critical errors;
- следующий prompt.

## Done when

- Checkout можно реализовывать по шагам.
- Все критичные ошибки описаны.
- Success/pending/failure UI не подменяет server-side payment truth.
- Есть guest scenario.
- Юридические элементы не забыты.
- UI quality notes и Site copy notes зафиксированы для checkout forms, labels, errors, recovery, consent and success states.
- `docs/project-state.md` обновлен.

## Follow-up

Следующий промпт: `prompts/11-ecommerce/11-account-orders-analytics.md`.
