# Next.js Technical Baseline

## Назначение

Это living reference для технических решений Next.js-проекта. Он не заменяет документацию выбранной major-версии и не является универсальной архитектурой для любого сайта.

Используй его:

- перед scaffold и выбором runtime;
- при проектировании источников данных, кеша, CMS, форм, аккаунта и e-commerce;
- при app-wide quality, deployment и handoff;
- при обновлении major-версии Next.js.

Последняя сверка с официальной документацией: `2026-07-29`, Next.js 16.

## 1. Версия является частью архитектуры

Для каждого проекта зафиксируй:

- точные версии Next.js, React, Node.js и TypeScript;
- package manager и lockfile;
- bundler для `dev` и `build`;
- runtime: static export, Node.js server, serverless, edge only where supported;
- источник правил: документация именно установленной major-версии.

Не переноси автоматически поведение кеша, request APIs, lint или middleware между major-версиями.

Для Next.js 16 проверь:

- Node.js `20.9+` и TypeScript `5.1+`;
- асинхронные `params`, `searchParams`, `cookies()`, `headers()` и `draftMode()`;
- `proxy.ts` вместо устаревшего `middleware.ts` для соответствующего network boundary;
- прямой ESLint или Biome script вместо удалённого `next lint`;
- Turbopack как default bundler, если проект не зафиксировал иной совместимый режим;
- включён ли `cacheComponents`, прежде чем применять `use cache`, Cache Components или Partial Prerendering.

Официальные источники:

- [Upgrading to Next.js 16](https://nextjs.org/docs/app/guides/upgrading/version-16)
- [Next.js 16](https://nextjs.org/blog/next-16)

## 2. Server-first и явные client boundaries

- Pages и layouts в App Router остаются Server Components по умолчанию.
- Client Component нужен для state, effects, event handlers и browser APIs.
- Ставь `'use client'` у минимального интерактивного leaf/subtree: его imports входят в client bundle.
- Props через server/client boundary должны быть сериализуемыми.
- Server-only modules, secrets, privileged SDK и прямой data access защищай `server-only` или эквивалентной границей.
- Не создавай полные дубли mobile/desktop DOM ради responsive layout; основную геометрию выбирает CSS до hydration.

Источник: [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components).

## 3. Источники данных и Backend for Frontend

- Server Component обращается прямо к базе, CMS, commerce SDK или trusted service.
- Не вызывай собственный Route Handler из Server Component: это лишний network hop и потенциальная ошибка build/runtime.
- Route Handler считается публичным API endpoint, даже если UI вызывает его только из этого сайта.
- Server Actions предназначены прежде всего для mutations, а не как универсальный data-fetching слой.
- Для каждого Action и Handler отдельно проверяй authentication, authorization и ownership ресурса.
- Вынеси sensitive access в Data Access Layer и возвращай в UI минимальный DTO/view model, а не полную запись провайдера.

Источник: [Backend for Frontend](https://nextjs.org/docs/app/guides/backend-for-frontend) и [Authentication](https://nextjs.org/docs/app/guides/authentication).

## 4. Матрица данных и свежести

До реализации заполни для каждого класса данных:

| Область | Источник истины | Владелец | Rendering | Допустимая свежесть | Cache | Invalidation | Fallback |
| --- | --- | --- | --- | --- | --- | --- | --- |

Минимально разделяй:

- marketing и редакционный контент;
- каталог и характеристики;
- цены, скидки и остатки;
- пользовательскую сессию, корзину и аккаунт;
- заказ, оплату и fulfillment;
- персональные и секретные данные.

Не используй одну cache policy для всех классов данных.

В Next.js 16 обычный `fetch` не становится кешированным автоматически. Выбор зависит от `cacheComponents`, `use cache`, cache tags/lifetimes и explicit fetch policy.

Для обновления:

- tag/path должен отражать реального владельца данных;
- CMS publish, product update и user mutation являются разными событиями;
- stale-while-revalidate подходит не каждой операции;
- user mutation, которой нужен read-your-writes, не должна возвращать заведомо старое состояние;
- price, stock, permissions и payment status проверяются заново на authoritative server boundary.

Источники:

- [Fetching Data](https://nextjs.org/docs/app/getting-started/fetching-data)
- [Cache Components](https://nextjs.org/docs/app/getting-started/partial-prerendering)
- [Revalidating](https://nextjs.org/docs/app/getting-started/revalidating)

## 5. Решение по CMS начинается с людей

Сначала спроси, кто будет менять сайт после запуска.

### CMS по умолчанию не нужна

Если владелец продолжит сам работать с сайтом через Codex/ИИ, а изменения могут проходить через файлы, Git и обычный deploy:

- используй repository-owned content, typed local data, MDX или другой простой file-based подход;
- не добавляй CMS «на будущее»;
- зафиксируй, как владелец просит ИИ изменить контент, проверяет diff и публикует сайт;
- укажи признаки, при которых решение нужно пересмотреть.

Это уменьшает зависимости, стоимость, поверхность ошибок и количество способов менять один и тот же контент.

### CMS нужно обсудить

Если контент должны менять редакторы, контент-менеджеры, маркетологи или другие сотрудники без работы с кодом:

- зафиксируй роли и права;
- определи content types и владельцев полей;
- опиши draft, preview, approval, schedule и publish workflow;
- определи locales, slug changes и redirects;
- выбери typed SDK/schema/code generation, если поддерживается;
- защити preview token и Draft Mode;
- спроектируй publish webhook и точечную cache invalidation;
- опиши media rules, export/backup и поведение при недоступности CMS.

Не выбирай конкретную CMS до подтверждения этих требований. Не храни draft mode или секретные preview-параметры в публичных metadata, URL или JSON-LD.

Источники:

- [Draft Mode](https://nextjs.org/docs/app/api-reference/functions/draft-mode)
- [Sanity visual editing with Next.js App Router](https://www.sanity.io/docs/nextjs/visual-editing-with-next-js-app-router)

## 6. Формы, Actions и публичные endpoints

Для lead form, booking, newsletter, account mutation и checkout:

- валидируй данные на сервере независимо от browser validation;
- проверяй authentication/authorization, если действие не публичное;
- ограничивай body size, frequency и execution time;
- добавляй spam/abuse protection по реальному риску;
- не доверяй скрытым полям, client totals, role или resource owner;
- проектируй повторную отправку: duplicate submission не должна создавать повторную заявку, оплату или письмо без решения;
- логируй correlation ID/result без утечки PII и secrets;
- возвращай понятное recovery state пользователю.

Для Server Actions проверь allowed origins и body size. Для Route Handlers проверь input parsing, rate limit и timeout.

Источники:

- [Forms](https://nextjs.org/docs/app/guides/forms)
- [Server Actions configuration](https://nextjs.org/docs/app/api-reference/config/next-config-js/serverActions)

## 7. E-commerce safety boundary

До статуса `Ecommerce ready` должны быть определены:

- commerce engine и authoritative systems для product, price, stock, cart, customer, order и fulfillment;
- server-side price/discount/stock recheck перед созданием payment;
- cart/session ownership и guest recovery;
- order state machine и разрешённые transitions;
- payment provider, hosted/custom checkout boundary и failure recovery;
- raw-body signature verification для webhook;
- event ID/idempotency key, duplicate и out-of-order handling;
- exactly-once business effect поверх at-least-once delivery;
- reconciliation для payment success без завершённого order update;
- refund/cancel/partial fulfillment ownership;
- observability без хранения card data или secrets.

Success redirect пользователя не является подтверждением оплаты. Webhook может прийти повторно или параллельно.

По умолчанию предпочитай готовый commerce/payment backend и hosted payment surface. Полностью custom backend является отдельным сложным решением и требует подтверждённой бизнес-причины.

Источники:

- [Stripe Checkout fulfillment](https://docs.stripe.com/checkout/fulfillment)
- [Stripe webhooks](https://docs.stripe.com/webhooks)
- [Stripe idempotent requests](https://docs.stripe.com/api/idempotent_requests)

## 8. Security boundary приложения

Server/VPS security не заменяет application security.

Проверь:

- secrets доступны только server-only code;
- каждый Action/Handler делает authorization, а не полагается на скрытый UI;
- rich text, user HTML и JSON-LD безопасно сериализуются;
- redirect/callback URL разрешены allowlist-правилом;
- external images используют узкие `remotePatterns`;
- upload ограничен type, size, storage и access rules;
- CSP выбирается осознанно: nonce-based CSP может сделать route dynamic и отключить static optimization/CDN caching;
- логи и analytics не содержат пароли, токены, card data и лишние персональные данные.

Источники:

- [Content Security Policy](https://nextjs.org/docs/app/guides/content-security-policy)
- [Image component](https://nextjs.org/docs/app/api-reference/components/image)
- [Production checklist](https://nextjs.org/docs/app/guides/production-checklist)

## 9. Testing и app-wide scenarios

Выбирай проверки по риску:

- unit: чистая бизнес-логика, formatters, calculations;
- contract/integration: adapters, schema validation, provider mapping;
- browser E2E: критичные flows, async Server Components, forms, auth, cart и checkout;
- replay/concurrency: webhooks, duplicate submit, stock/price change;
- production-like smoke: `next build` + реальный runtime, если это безопасно.

Не требуй тяжёлый test stack для простого статического сайта. Но критичный пользовательский сценарий должен иметь воспроизводимую проверку.

Источник: [Testing](https://nextjs.org/docs/app/guides/testing).

## 10. Deployment topology и наблюдаемость

Выбери hosting shape до реализации зависимых возможностей:

- static export;
- один Node.js process;
- serverless functions;
- несколько Node.js instances.

Для нескольких instances заранее реши:

- shared cache или координацию invalidation tags;
- общий `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY`;
- `deploymentId` и защиту от version skew;
- совместимость rolling deploy;
- proxy buffering/streaming;
- ephemeral filesystem;
- database connection pooling и migrations.

Минимальная наблюдаемость:

- runtime errors и structured logs;
- Web Vitals для важных routes;
- integration/webhook failures;
- deploy/version correlation;
- health/readiness;
- backup/restore и rollback evidence там, где есть stateful data.

Источники:

- [Self-hosting](https://nextjs.org/docs/app/guides/self-hosting)
- [Analytics](https://nextjs.org/docs/app/guides/analytics)

## 11. Locales, markets и валюты

Если проект работает на нескольких языках или рынках, до маршрутов и каталога зафиксируй:

- locale routing: subpath, domain или другой подтверждённый вариант;
- source и fallback для переводов;
- localized CMS fields/slugs и правила redirects;
- language/market/currency context для catalog/cart/checkout;
- authoritative currency, tax, price и availability source;
- canonical/hreflang ownership и отсутствие автоматического индексирования случайных комбинаций;
- форматирование дат/чисел/валют без подмены бизнес-значения на клиенте.

Не смешивай язык интерфейса, рынок продажи и валюту в один неявный параметр.

Источник: [Internationalization](https://nextjs.org/docs/app/guides/internationalization).

## 12. Component ownership и reuse

- Route-local component остаётся локальным, пока нет второго реального consumer или стабильного общего смысла.
- Shared UI primitives выражают visual/action semantics, но не знают DTO конкретной CMS или commerce provider.
- Feature/domain component владеет бизнес-сценарием.
- Integration adapter переводит provider schema в внутренний domain/view model.
- Client boundary не должна случайно утягивать server adapter или большую библиотеку в browser bundle.
- Общий компонент нельзя создавать только потому, что два блока визуально похожи.

## 13. Готовность технического фундамента

`Next ready` допустим только если:

- версии и runtime зафиксированы;
- CMS decision записан;
- data/freshness/cache matrix существует;
- public endpoints и security boundaries перечислены;
- e-commerce safety gate пройден, если применимо;
- deployment shape не конфликтует с выбранными возможностями;
- scaffold, App Router, styling и tooling соответствуют этим решениям;
- неизвестные P0/P1 вопросы имеют blocker, owner и следующий prompt.
