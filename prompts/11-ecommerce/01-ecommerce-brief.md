# Провести e-commerce бриф

## Когда использовать

Когда сайт является интернет-магазином, каталогом с покупкой онлайн, витриной товаров с заявками или содержит оплату/заказ товаров.

## Роль Codex

Ты действуешь как e-commerce strategist, UX researcher и frontend product planner.

## Цель

Создать `docs/ecommerce/brief.md`: подтверждённые вводные магазина, коммерческие ограничения, интеграции, географию, типы товаров, покупательский сценарий и открытые вопросы.

## Контекст, который нужно дать

- `project-brief.md`.
- `docs/strategy.md`.
- `docs/messaging.md`.
- Ниша и география продаж.
- Список товаров, категорий или SKU, если есть.
- Информация о доставке, оплате, возвратах.
- Content operations/CMS decision из project brief.
- Интеграции: commerce engine, PIM/catalog source, платежи, доставка, CRM/ERP, analytics.
- Шаблон `prompts/_templates/ecommerce-brief-template.md`.

## Ограничения

- Не проектируй каталог, product data, checkout и аналитику в деталях.
- Не придумывай юридические условия, тарифы доставки, комиссии, цены или гарантии.
- Разделяй `confirmed`, `hypothesis`, `open question`.
- Не переходи к верстке, page planning или коду.
- Не делай весь магазин одним документом: этот бриф только вход для следующих e-commerce промптов.
- Не объединяй CMS с PIM/commerce engine. CMS отвечает за редакционный workflow и по умолчанию не нужна владельцу, который продолжает менять сайт через Codex/ИИ; product/price/stock operations всё равно требуют отдельного source-of-truth decision.

## Процесс

1. Собери базовые параметры магазина: ниша, география, валюта, B2C/B2B, языки.
2. Опиши типы товаров и общую структуру ассортимента.
3. Опиши основной покупательский сценарий и ключевые сомнения пользователя.
4. Зафиксируй коммерческие правила на высоком уровне без деталей.
5. Перенеси content operations decision: кто меняет editorial product content и нужен ли для этого CMS. Не выбирай CMS, если owner + Codex/ИИ workflow достаточен.
6. Отдельно зафиксируй operational integrations и зависимости: commerce engine, catalog/PIM, price, stock, payment, delivery, CRM/ERP.
7. Раздели факты, гипотезы и открытые вопросы.
8. Создай или обнови `docs/ecommerce/brief.md`.
9. Обнови `docs/project-state.md`: отметь `E-commerce brief` и укажи следующий промпт.

## Output

Создай или обнови `docs/ecommerce/brief.md` по шаблону `prompts/_templates/ecommerce-brief-template.md`, добавив разделы:

- confirmed facts;
- hypotheses;
- open questions;
- integration risks;
- next e-commerce prompt.

В ответе кратко покажи:

- тип магазина;
- что подтверждено;
- какие critical questions остались;
- следующий prompt.

## Done when

- Понятны тип магазина, география, валюта, товары и основной путь покупки.
- Интеграции и коммерческие ограничения зафиксированы.
- CMS decision не смешан с commerce/PIM/price/stock sources.
- Неизвестные условия явно отмечены.
- `docs/project-state.md` обновлен.

## Follow-up

Следующий промпт: `prompts/11-ecommerce/02-product-data-model.md`.

Если товаров/категорий нет даже на уровне описания, сначала задай 3-5 критичных вопросов, не переходя к каталогу.
