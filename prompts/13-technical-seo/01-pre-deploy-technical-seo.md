# Подготовить базовое техническое SEO перед деплоем

## Когда использовать

После `Quality passed`, когда все публичные routes текущего site scope уже собраны, production domain/host зафиксирован в deployment docs и приложение ещё можно безопасно исправить до deploy.

Не используй этот prompt для keyword research, content strategy, блога или SEO-продвижения.

## Роль Codex

Ты действуешь как technical SEO engineer и Next.js release-readiness reviewer.

## Цель

Довести готовый сайт до verdict `Technical SEO ready for deploy`: создать route indexability matrix, реализовать и проверить metadata, heading hierarchy, canonical, robots, sitemap, применимую structured data, crawlable links, image alt policy и error/status readiness. Создать `docs/seo/pre-deploy-technical-seo.md`.

## Контекст, который нужно дать

- `prompts/_knowledge/technical-seo-baseline.md`.
- `docs/ia/sitemap.md`.
- `docs/nextjs/app-router-structure.md`.
- `docs/pages/` и page specs/content SEO plans для публичных routes.
- `docs/ecommerce/`, если проект является интернет-магазином.
- Последний quality summary со статусом `Quality passed`.
- `docs/quality/application-flow-check.md`, если сайт содержит формы, CMS, auth, commerce или другие integrations.
- `docs/deployment/deployment-brief.md`.
- `docs/deployment/domain-dns-ssl.md` с выбранным production host.
- Текущие `src/app`, metadata files, layouts, pages, redirects и config.
- `package.json` и известные команды lint/typecheck/build.
- `prompts/_knowledge/site-copy-quality.md`, если нужно создать или изменить title/description/visible headings/alt text.

## Ограничения

- Не исследуй keywords, конкурентов, SERP и поисковый спрос.
- Не создавай блог, новые landing pages или длинный SEO-copy.
- Не меняй visual design и layout, кроме минимальной semantic correction, которая не влияет на утверждённую композицию.
- Не выдумывай organization, address, rating, reviews, price, availability, certificates или другие schema facts.
- Не добавляй structured data без подходящего page type и подтверждённых данных.
- Не используй `robots.txt` как замену `noindex`, password protection или access control.
- Не добавляй `meta keywords`.
- Не вводи жёсткие character limits для title/description как pass/fail gate.
- Не подставляй фиктивный production domain. Если origin неизвестен, зафиксируй blocker.
- Не меняй DNS, SSL или production server в этом prompt.
- Не деплой приложение.
- Не расширяй исправления на unrelated UI/content issues.

## Процесс

1. Прочитай `prompts/_knowledge/technical-seo-baseline.md` полностью.
2. Проверь readiness: `Quality passed`, применимый application flow check не имеет P0/P1, production host известен, site scope и routes понятны.
3. Сопоставь IA sitemap, App Router и фактические routes. Создай route indexability matrix со статусами `index`, `noindex`, `private/blocked`, `redirect`, `not found`.
4. Для каждого indexable route проверь или реализуй:
   - unique descriptive title;
   - page-specific description;
   - canonical;
   - robots decision;
   - Open Graph/Twitter metadata and image where relevant;
   - согласованный production URL.
5. Проверь document outline: один ясный H1, логичные H2/H3/H4, отсутствие headings ради размера шрифта и пустых headings. Исправь только безопасные semantic issues текущего scope.
6. Проверь `metadataBase` или эквивалентный central production origin. Не допускай расхождения canonical, sitemap, Open Graph URLs, JSON-LD URLs и internal links.
7. Создай или исправь `app/robots.ts` / `app/robots.txt`: production crawl policy, sitemap URL, отсутствие случайного global disallow.
8. Создай или исправь `app/sitemap.ts` / `app/sitemap.xml`: только absolute HTTPS canonical indexable 200-intended URLs. Не добавляй redirects, noindex, private, search/filter states и 404 routes.
9. Добавь JSON-LD только для применимых types и подтверждённых данных. Для отсутствующей/неуместной schema зафиксируй `reasoned skip`. Используй XSS-safe serialization для dynamic data.
10. Проверь crawlable internal links и alt policy на meaningful/decorative images. Не переписывай контент без необходимости.
11. Проверь readiness для 404/410 и permanent/temporary redirects. Server-specific redirect execution остаётся deployment owner scope.
12. Для multilingual, ecommerce, pagination/facets и non-HTML assets добавь только применимые conditional checks.
13. Запусти доступные lint, typecheck и build. Если можно открыть production-like build локально, проверь rendered `<head>`, `/robots.txt`, `/sitemap.xml` и sample routes.
14. Проведи `Anti-cargo-cult check` из knowledge base.
15. Создай или обнови `docs/seo/pre-deploy-technical-seo.md` с evidence и verdict.
16. Обнови `docs/project-state.md`: отметь `Technical SEO ready for deploy` только если blockers нет; следующий prompt — текущий недостающий deployment step по router, обычно `prompts/12-deployment/07-deploy-nextjs-app.md`.

## Output

Создай или обнови `docs/seo/pre-deploy-technical-seo.md`:

```md
# Pre-deploy Technical SEO

## Verdict

- Status: ready for deploy / needs fixes / blocked
- Production origin:
- Scope:

## Readiness

| Requirement | Status | Evidence / blocker |
| --- | --- | --- |

## Route indexability matrix

| Route | Purpose | Decision | Canonical | In sitemap | Robots/meta | Expected status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |

## Metadata audit

| Route | Title | Description | Canonical | OG/share | Result |
| --- | --- | --- | --- | --- | --- |

## Heading and semantics audit

| Route | H1 | Outline | Links | Images/alt | Result |
| --- | --- | --- | --- | --- | --- |

## Robots

## Sitemap

## Structured data

| Route/type | Data source | Validator/readiness | Result |
| --- | --- | --- | --- |

## Status and redirect readiness

## Conditional checks

## Commands and evidence

## Fixes made

## Blockers and owner prompts

## Anti-cargo-cult check

## Next step
```

В ответе кратко покажи:

- verdict;
- production origin;
- сколько routes проверено;
- какие files/fixes добавлены;
- blockers;
- следующий deployment prompt.

## Done when

- `prompts/_knowledge/technical-seo-baseline.md` применён полностью.
- Применимый application flow check пройден либо честно помечен `not applicable` для статического сайта без динамических сценариев.
- Route indexability matrix покрывает весь current site scope.
- Все indexable routes имеют проверенные title, description, canonical и robots decision.
- Heading hierarchy проверена на фактических страницах.
- `robots.txt` и `sitemap.xml` реализованы без конфликтов.
- Structured data добавлена только по фактам или имеет reasoned skip.
- Crawlable links, image alt policy, 404 и redirects readiness проверены.
- Relevant lint/typecheck/build checks пройдены или blockers перечислены.
- Нет cargo-cult SEO defaults.
- Создан `docs/seo/pre-deploy-technical-seo.md`.
- `docs/project-state.md` обновлён.

## Follow-up

Если verdict `ready for deploy`, следующий промпт: `prompts/12-deployment/07-deploy-nextjs-app.md` или более ранний недостающий deployment prompt по `prompts/ROUTER.md`.

Если есть code/content blockers, верни их в конкретный owner prompt из `06-nextjs-setup`, `07-page-planning`, `08-block-build` или `09-quality`, затем повтори этот prompt.

Не объявляй production SEO проверенным до `prompts/13-technical-seo/02-production-seo-verification.md`.
