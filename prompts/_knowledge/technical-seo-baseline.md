# Базовый стандарт технического SEO

## Назначение

Этот файл задаёт единый технический SEO-минимум Prompt Kit для Next.js-сайтов перед production deploy и после запуска на реальном домене.

Он не является стратегией продвижения. Здесь нет сбора ключевых слов, контент-плана, блога, link building, прогнозов трафика и обещаний позиций. Цель стандарта проще: поисковый робот должен получить доступ к правильным страницам, корректно понять их структуру и не столкнуться с техническими противоречиями.

## Когда применять

Прочитай этот файл полностью, если задача касается:

- финальной metadata страницы или сайта;
- `title`, `description`, canonical, robots directives;
- структуры H1-H6;
- `robots.txt`, `sitemap.xml`;
- JSON-LD / Schema.org;
- index/noindex и доступности страниц для роботов;
- внутренних ссылок, alt-текста и семантической HTML-структуры;
- HTTP status codes, 404/410 и redirects;
- HTTPS и единого production host;
- Google Search Console, Яндекс Вебмастера или production SEO verification.

Основные staged prompts:

- `prompts/13-technical-seo/01-pre-deploy-technical-seo.md`;
- `prompts/13-technical-seo/02-production-seo-verification.md`.

## Граница с другими этапами

- `07-page-planning/04-content-and-seo-plan.md` определяет направление title, description, headings и structured data для одной страницы.
- `13-technical-seo/01` проверяет весь готовый site scope и реализует технический SEO-минимум перед deploy.
- `12-deployment/06-domain-dns-ssl.md` настраивает домен, DNS, SSL и redirect policy.
- `13-technical-seo/02` проверяет, что всё действительно работает на production.
- Performance, accessibility и visual quality остаются в `09-quality`; SEO-проход использует их результаты и делает только короткий SEO-relevant smoke.

## Базовые принципы

### 1. Сначала реши, какие URL должны быть в поиске

Для каждого route зафиксируй одно решение:

- `index` — публичная самостоятельная страница;
- `noindex` — страница доступна пользователю, но не должна попадать в поиск;
- `blocked/private` — закрытая авторизацией или иным реальным access control;
- `redirect` — старый или альтернативный URL;
- `not found` — URL не существует и возвращает 404/410.

Не смешивай эти механизмы. `robots.txt` управляет crawling, но не является надёжным способом удалить страницу из поиска. Если робот должен прочитать `noindex`, URL нельзя одновременно закрывать от него в `robots.txt`.

### 2. Metadata должна описывать конкретную страницу

Для каждой индексируемой страницы проверь:

- один осмысленный и уникальный `<title>`;
- отдельный `description`, если для страницы можно честно составить полезное описание;
- canonical на выбранный production URL;
- robots directive без случайного `noindex`;
- Open Graph/Twitter metadata и share image, если сайт должен нормально выглядеть при отправке ссылки;
- favicon и согласованное site name.

Не вводи жёсткие SEO-лимиты вроде «ровно 60/160 символов». Search engines могут сокращать сниппет под устройство и запрос. Используй краткий, точный текст без boilerplate и keyword stuffing.

`meta keywords` не добавляй: Google не использует этот тег для индексирования и ranking.

### 3. Heading hierarchy должна отражать структуру документа

Default Prompt Kit:

- у страницы один ясно выраженный основной H1;
- основные секции используют H2;
- вложенные подразделы используют H3/H4 по реальной вложенности;
- heading level не выбирается ради визуального размера — внешний вид задаётся CSS;
- пустые headings и декоративный текст в heading tags недопустимы;
- резкий переход H1 -> H4 или H2 -> H5 помечается как semantic warning и исправляется, если нет доказанной причины.

Не объявляй количество H1 самостоятельным ranking-фактором. Это правило ясности документа, accessibility и предсказуемого качества кита.

### 4. Canonical signals не должны конфликтовать

Выбери один production origin и используй его согласованно:

- canonical;
- sitemap URLs;
- Open Graph URL;
- structured data URLs;
- internal links;
- HTTP -> HTTPS и apex/www redirects.

Не указывай один URL canonical, другой в sitemap и третий во внутренних ссылках.

### 5. `robots.txt` должен быть простым и безопасным

Проверь:

- файл доступен по `/robots.txt` и возвращает 200;
- production public routes случайно не закрыты;
- правила относятся к реальным техническим разделам;
- указан абсолютный production URL sitemap;
- staging/preview policy не попала в production;
- `Disallow` не используется как замена `noindex` или access control.

Для Next.js App Router предпочитай штатный `app/robots.ts` или статический metadata file.

### 6. `sitemap.xml` содержит только пригодные к индексации URL

В sitemap включай URL, которые:

- являются canonical;
- должны индексироваться;
- возвращают 200;
- используют production HTTPS host;
- не требуют login;
- не являются redirect, 404, search/filter state или служебной страницей без отдельного SEO-смысла.

Правила:

- используй абсолютные URL;
- `lastmod` указывай только из реальной даты изменения;
- не ставь текущую дату всем страницам при каждом build;
- не трать время на искусственное заполнение `priority` и `changefreq`: Google их игнорирует;
- sitemap помогает discovery, но не гарантирует indexing.

Для Next.js App Router предпочитай `app/sitemap.ts` или статический `app/sitemap.xml`.

### 7. Structured data добавляется по фактам, а не по шаблону

Предпочтительный формат для Next.js — JSON-LD.

Базовые кандидаты:

- `WebSite` на home page;
- `Organization` или подходящий subtype, если известны реальные данные организации;
- `LocalBusiness`, если есть подтверждённые адрес, контакты и тип бизнеса;
- `BreadcrumbList`, если breadcrumbs действительно показаны пользователю;
- `Product` / `Offer`, если это реальная товарная страница с подтверждёнными данными;
- другие типы только по назначению страницы и актуальной документации search engine.

Нельзя:

- размечать отсутствующий или скрытый от пользователя контент;
- выдумывать reviews, rating, price, availability, address, certificates или legal data;
- добавлять schema только ради количества;
- считать валидный JSON-LD гарантией rich result.

Проверяй markup через Google Rich Results Test для поддерживаемых features и Schema Markup Validator для общей Schema.org-валидности. При вставке JSON-LD из динамических данных учитывай XSS-safe serialization.

### 8. Ссылки и изображения должны быть понятны роботам и людям

- Навигационные переходы используют crawlable `<a href>` / Next.js `Link`, а не только click handler на `div` или `span`.
- У каждой важной индексируемой страницы есть хотя бы одна внутренняя ссылка.
- Anchor text объясняет назначение перехода без keyword stuffing.
- Meaningful images имеют краткий context-aware `alt`.
- Decorative images используют `alt=""`.
- Не дублируй alt механически из filename или соседнего heading.

### 9. HTTP behavior является частью SEO-минимума

- Рабочая индексируемая страница возвращает 200.
- Несуществующая страница возвращает настоящий 404/410, а не soft 404 с кодом 200.
- Постоянный перенос использует 301/308.
- Временный перенос использует 302/307 только когда он действительно временный.
- Избегай redirect chains и loops.
- HTTP и альтернативный host перенаправляются на один HTTPS canonical host.
- 5xx и network errors являются production blockers.

SSL certificate выпускается и обновляется deployment-этапом. SEO verification проверяет HTTPS availability, redirect behavior и отсутствие HTTP URL в canonical/sitemap/markup.

### 10. Mobile/rendering/performance входят как smoke, а не дубликат QA

SEO-проход должен убедиться, что:

- основной текст и links присутствуют в rendered HTML;
- mobile version не теряет важный контент;
- robots не блокирует critical JS/CSS/assets;
- нет очевидного severe performance blocker;
- production имеет baseline Core Web Vitals/PageSpeed evidence, если инструмент доступен.

Глубокие performance fixes остаются в owner prompt из `09-quality`.

## Обязательный pre-deploy минимум

| Область | Обязательный результат |
| --- | --- |
| Routes | Route indexability matrix создана |
| Metadata | Title, description, canonical и robots decision проверены |
| Headings | Один ясный H1 и логичная секционная hierarchy |
| Crawling | `robots.txt` реализован без опасных конфликтов |
| Discovery | `sitemap.xml` реализован из canonical indexable URLs |
| Structured data | Добавлено только применимое и fact-backed либо есть reasoned skip |
| Links/images | Crawlable links и alt policy проверены |
| Errors | 404/status/redirect readiness проверены |
| Build | Relevant lint/typecheck/build checks пройдены |

## Обязательный production минимум

| Область | Обязательный результат |
| --- | --- |
| Origin | HTTPS и один canonical host работают |
| Status | Public pages, redirects и missing URLs возвращают ожидаемые codes |
| Files | `/robots.txt` и `/sitemap.xml` доступны с 200 |
| Sitemap | Содержит production canonical URLs без redirects/noindex/404 |
| Rendered head | Metadata и canonical присутствуют в live HTML |
| Structured data | Live markup валиден или issues перечислены |
| Crawlability | Important pages доступны и связаны crawlable links |
| Webmaster tools | Setup выполнен или оформлен как explicit user action |
| Evidence | Создан production SEO report с verdict |

## Условные проверки

Добавляй только когда применимо:

- `hreflang` для multilingual/multi-regional сайта;
- pagination и faceted navigation rules;
- image/video/news sitemaps;
- `X-Robots-Tag` для non-HTML files;
- Product/Offer/Review и merchant markup;
- LocalBusiness;
- redirects со старого домена;
- Search Console/Yandex ownership tokens;
- IndexNow или другие engine-specific integrations.

## Anti-cargo-cult check

Перед verdict проверь:

- нет `meta keywords`;
- нет обещания гарантированной индексации или rich result;
- нет invented schema data;
- `robots.txt` не используется вместо `noindex`/access control;
- sitemap не содержит все известные URL без разбора;
- `lastmod` не подделывается текущей датой;
- `priority/changefreq` не считаются обязательными;
- character counts не используются как единственный критерий title/description;
- отсутствие schema без подходящего типа не считается ошибкой;
- SSL issuance не смешано с SEO implementation.

## Официальные источники для актуализации

- Google Search technical requirements: `https://developers.google.com/search/docs/essentials/technical`
- Google title links: `https://developers.google.com/search/docs/appearance/title-link`
- Google snippets: `https://developers.google.com/search/docs/appearance/snippet`
- Google robots.txt: `https://developers.google.com/search/docs/crawling-indexing/robots/intro`
- Google sitemap: `https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap`
- Google canonical: `https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls`
- Google structured data: `https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data`
- Google crawlable links: `https://developers.google.com/search/docs/crawling-indexing/links-crawlable`
- Google redirects: `https://developers.google.com/search/docs/crawling-indexing/301-redirects`
- Next.js metadata: `https://nextjs.org/docs/app/getting-started/metadata-and-og-images`
- Next.js robots: `https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots`
- Next.js sitemap: `https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap`
- Next.js JSON-LD: `https://nextjs.org/docs/app/guides/json-ld`
- Schema Markup Validator: `https://validator.schema.org/`
- Yandex robots.txt: `https://yandex.com/support/webmaster/en/controlling-robot/robots-txt`
- Yandex sitemap: `https://yandex.com/support/webmaster/en/controlling-robot/sitemap`

Если framework или search-engine behavior мог измениться, проверь актуальные official docs до реализации. Не опирайся на случайные SEO-чеклисты как на нормативный источник.
