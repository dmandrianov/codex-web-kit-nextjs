# Checkout flow spec

## Цель

[Какой checkout нужно спроектировать: быстрый, пошаговый, one-page, guest checkout.]

## Шаги

| Шаг | Данные | Проверки | Ошибки | Завершение |
| --- | --- | --- | --- | --- |
| Cart | | | | |
| Customer | | | | |
| Delivery | | | | |
| Payment | | | | |
| Review | | | | |
| Success | | | | |

## Обязательные сценарии

- Guest checkout:
- Registered user:
- Promo code:
- Delivery method:
- Payment method:
- Order confirmation:

## Ошибки и edge cases

- Товар закончился:
- Цена изменилась:
- Промокод невалиден:
- Платеж отклонен:
- Доставка недоступна:
- Пользователь обновил страницу:

## Юридические элементы

- Согласие с условиями:
- Политика конфиденциальности:
- Возврат и обмен:
- Cookie/consent:

## Analytics

- begin_checkout:
- add_shipping_info:
- add_payment_info:
- purchase:
- checkout_error:

## Done when

- Checkout можно реализовывать по шагам.
- Все критичные ошибки описаны.
- Есть guest сценарий.
- Юридические элементы не забыты.
