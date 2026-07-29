# Зафиксировать техническую архитектуру

## Когда использовать

После `docs/nextjs/preflight.md`, до scaffold или изменения архитектуры существующего Next.js-проекта.

## Роль Codex

Ты действуешь как senior Next.js architect, который сначала выясняет, как сайт будет поддерживаться и откуда берутся данные, а затем выбирает минимально достаточную техническую схему.

## Цель

Создать `docs/nextjs/technical-architecture.md`: понятное решение по версии Next.js, runtime, CMS, источникам данных, кешу, формам, безопасности, проверкам и deployment shape до начала реализации.

## Контекст, который нужно дать

- `project-brief.md`.
- `docs/nextjs/preflight.md`.
- `docs/project-state.md`.
- `docs/ia/ia-review.md` и sitemap.
- `docs/design-system/design-system-review.md`.
- `docs/ecommerce/*.md`, если проект является интернет-магазином.
- Требования к редакторам, контенту, формам, CRM, аккаунту и интеграциям.
- Известные ограничения hosting/deployment.
- Существующий `package.json`, configs и source code, если проект уже начат.
- `prompts/_knowledge/nextjs-technical-baseline.md`.

## Ограничения

- Не scaffold-и проект и не реализуй страницы.
- Не добавляй CMS, базу, auth, server runtime или внешнюю платформу «на будущее».
- Не выбирай CMS, commerce engine или payment provider без подтверждённых требований.
- Не считай static export, serverless и self-hosted Node взаимозаменяемыми.
- Не назначай одну cache policy всему сайту.
- Не оставляй price, stock, permissions, order или payment status на доверии к клиенту.
- Не перегружай простой сайт проверками сложного магазина: помечай неприменимые ветки `not applicable` с причиной.
- Если решение меняет стоимость, способ редактирования сайта или зависимость от внешней платформы, объясни его пользователю простыми словами и получи подтверждение.

## Процесс

1. Определи режим проекта: static marketing, content/CMS, transactional service, ecommerce или hybrid.
2. Сначала задай вопрос об эксплуатации контента: кто будет менять сайт после запуска.
3. Прими CMS decision:
   - если владелец продолжает сам менять сайт через Codex/ИИ и обычный deploy приемлем, поставь `CMS status: not needed`, предложи repository-owned content/typed files/MDX и не обсуждай CMS-платформы без причины;
   - если контент ведут редакторы, контент-менеджеры, маркетологи или другие сотрудники без работы с кодом, поставь `CMS status: needed` и обсуди роли, права, preview, approval, publish, locales, redirects, media, webhook/revalidation, export/backup и downtime behavior;
   - зафиксируй triggers, при которых `not needed` нужно пересмотреть.
4. Зафиксируй точные или целевые версии Next.js, React, Node.js, TypeScript, package manager и bundler. Для существующего проекта не обновляй major-версии внутри этого промпта.
5. Выбери hosting shape: static export, один Node.js process, serverless или несколько instances. Отдели подтверждённое решение от гипотезы.
6. Составь source-of-truth map для content, catalog, price, stock, user, cart, order, payment и других применимых сущностей.
7. Составь data/rendering/cache matrix: источник, владелец, чувствительность, rendering, допустимая свежесть, cache, invalidation event и fallback.
8. Если есть несколько языков/рынков, раздельно зафиксируй locale routing, translation source/fallback, localized slugs, market, currency, tax/price ownership и SEO handoff.
9. Перечисли публичные endpoints и mutations: формы, search, booking, auth, cart, checkout, webhooks. Для каждого зафиксируй validation, auth/authorization, duplicate/retry behavior, rate/spam risk и error recovery.
10. Зафиксируй server/client boundaries, DAL/DTO и provider adapters на уровне правил, не создавая premature abstractions.
11. Для e-commerce потребуй отдельный `prompts/11-ecommerce/12-commerce-operations-and-payment-safety.md` до финального e-commerce verdict.
12. Выбери минимальную test strategy по риску и critical app-wide scenarios.
13. Определи минимальные logs, error tracking, Web Vitals и integration monitoring.
14. Раздели решения на `confirmed`, `needs user choice`, `deferred without blocker`, `must resolve before scaffold`.
15. Создай или обнови `docs/nextjs/technical-architecture.md`.
16. Обнови `docs/project-state.md`: отметь `Technical architecture decided`, CMS status, runtime status и следующий промпт.

## Output

Создай или обнови `docs/nextjs/technical-architecture.md`:

```md
# Next.js Technical Architecture

## Verdict

- Status: ready for scaffold / needs decisions
- Confidence:
- Project mode:
- Next prompt:

## Content operations and CMS

- Who edits after launch:
- AI-assisted owner workflow:
- CMS status: not needed / needed / already selected / undecided
- Reason:
- If not needed, repository content approach:
- Reconsider when:
- If needed, roles/workflow/requirements:
- Approved platform or decision needed:

## Framework and runtime contract

| Item | Decision/version | Evidence | Status |
| --- | --- | --- | --- |

## Hosting shape

## Sources of truth

| Data | Authoritative source | Owner | Adapter/boundary | Notes |
| --- | --- | --- | --- | --- |

## Data, rendering and freshness

| Data/route | Rendering | Freshness | Cache | Invalidation | Fallback |
| --- | --- | --- | --- | --- | --- |

## Public endpoints and mutations

| Scenario | Boundary | Validation/auth | Duplicate/retry | Abuse risk | Recovery |
| --- | --- | --- | --- | --- | --- |

## Server/client and module ownership

## Locales and markets

- Locale routing:
- Translation source/fallback:
- Localized slugs/redirects:
- Market/currency/tax ownership:
- SEO handoff:

## Security boundaries

## Test strategy and critical scenarios

## Observability

## Decisions required before scaffold

## Deferred decisions

## Risks and owner prompts
```

В ответе сначала объясни:

- нужен ли проекту CMS и почему;
- какую схему работы сайта выбрали;
- какие решения блокируют scaffold;
- что требуется от пользователя;
- следующий шаг обычными словами и только затем prompt path.

## Done when

- CMS decision начинается с реального будущего workflow людей, а не с выбора платформы.
- AI-assisted owner workflow не получает CMS без подтверждённой причины.
- Для редакционной команды описаны CMS requirements до выбора продукта.
- Версии, runtime и hosting shape зафиксированы или имеют явный blocker.
- Все важные данные имеют источник истины и правило свежести.
- Язык, рынок и валюта разделены, если проект международный.
- Public endpoints, security boundaries и critical scenarios перечислены.
- E-commerce не может обойти отдельный commerce safety gate.
- Простому сайту не добавлена лишняя инфраструктура.
- `docs/project-state.md` обновлён.

## Follow-up

Если статус `ready for scaffold`, следующий промпт: `prompts/06-nextjs-setup/02-project-scaffold.md`.

Если есть `needs decisions`, остановись до scaffold, объясни человеку 1–3 решения простыми словами и продолжи этот prompt после ответа.
