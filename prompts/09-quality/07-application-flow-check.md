# Проверить приложение целиком

## Когда использовать

После готовности нужных страниц и block-level quality, перед project-level handoff или production deploy. Для простого статического сайта используй короткий режим; для форм, CMS, аккаунта и e-commerce добавь соответствующие критичные сценарии.

## Роль Codex

Ты действуешь как application QA lead и integration reviewer.

## Цель

Создать `docs/quality/application-flow-check.md`: проверить не отдельный блок, а полные пользовательские и операционные сценарии, границы данных и восстановление после ошибок.

## Контекст, который нужно дать

- `docs/nextjs/technical-architecture.md`.
- Relevant page/block quality summaries.
- `docs/ecommerce/ecommerce-review.md`, если применимо.
- CMS/content operations decision.
- Routes, forms, Actions, Handlers, integrations и webhooks.
- Test commands, runtime URL и deployment shape.
- `prompts/_knowledge/nextjs-technical-baseline.md`.

## Ограничения

- Не повторяй полный visual review каждого блока.
- Не объявляй project-ready только по lint/build или открытию главной страницы.
- Не выполняй реальные платежи, рассылки, удаления или production mutations без явного разрешения и безопасного test mode.
- Не скрывай отсутствующий test environment или внешние доступы.
- Не требуй checkout/webhook проверки у статического сайта без таких возможностей.
- Не исправляй крупную архитектуру внутри этого prompt: назначь owner prompt.

## Процесс

1. Определи применимый уровень: static, forms/content, authenticated service или ecommerce.
2. Составь список critical journeys от действия человека до подтверждённого результата.
3. Проверь navigation, not-found/error/loading и основные публичные routes.
4. Для форм проверь server validation, duplicate submit, error recovery и подтверждённую доставку результата.
5. Для CMS проверь draft/preview, publish, cache invalidation, slug redirect и downtime fallback.
6. Для auth/account проверь authorization, resource ownership, session expiry и запрещённый доступ.
7. Для e-commerce проверь price/stock recheck, cart ownership, payment failure, signed webhook, duplicate/out-of-order event и reconciliation в test mode.
8. Проверь app-wide console/network/runtime errors и production-like build/start, если это безопасно.
9. Сверь фактическое поведение с data/freshness/cache matrix.
10. Зафиксируй evidence, blockers и owner prompt для каждого P0/P1.
11. Создай или обнови `docs/quality/application-flow-check.md`.
12. Обнови `docs/project-state.md`: отметь `Application flows checked` и verdict.

## Output

Создай или обнови `docs/quality/application-flow-check.md`:

```md
# Application Flow Check

## Verdict

- Status: application ready / needs fixes / blocked by external access
- Scope level:
- Confidence:

## Critical journeys

| Journey | Expected result | Evidence | Result | Owner prompt |
| --- | --- | --- | --- | --- |

## Data and cache behavior

## Forms and public mutations

## CMS operations

## Auth and ownership

## Ecommerce and payment safety

## Production-like runtime

## Issues

| Priority | Issue | Evidence | Owner prompt |
| --- | --- | --- | --- |

## User actions

## Next step
```

В ответе кратко объясни:

- какие полные сценарии действительно проверены;
- что работает;
- что ещё мешает готовности;
- требуется ли действие пользователя;
- следующий шаг.

## Done when

- Проверен применимый полный путь пользователя, а не только отдельные блоки.
- Данные, формы, CMS, auth и commerce проверены только там, где они есть.
- Повторные действия и восстановление после ошибки проверены для критичных mutations.
- Нет скрытых P0/P1 или им назначены точные owner prompts.
- Verdict опирается на evidence.
- `docs/project-state.md` обновлён.

## Follow-up

Если `application ready`, переходи к project/page handoff или pre-deploy technical SEO по текущему scope.

Если `needs fixes`, вернись к owner prompt из `06-nextjs-setup`, `08-block-build`, `09-quality`, `11-ecommerce` или integration-specific task.
