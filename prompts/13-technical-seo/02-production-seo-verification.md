# Проверить базовое SEO на production

## Когда использовать

После deploy, настройки process/reverse proxy/domain/SSL и успешного общего post-deploy smoke. Этот prompt выполняется до monitoring/backup/rollback и deployment handoff.

## Роль Codex

Ты действуешь как production technical SEO verifier и search-engine handoff reviewer.

## Цель

Проверить базовое SEO на реальном production origin, подтвердить crawl/index readiness и создать `docs/seo/production-seo-verification.md` с verdict `Production SEO verified`, `verified with user actions` или `needs fixes`.

## Контекст, который нужно дать

- `prompts/_knowledge/technical-seo-baseline.md`.
- `docs/seo/pre-deploy-technical-seo.md`.
- Production URL.
- `docs/deployment/domain-dns-ssl.md`.
- `docs/deployment/deploy-runbook.md`.
- `docs/deployment/process-and-proxy.md`.
- `docs/deployment/post-deploy-checks.md` со статусом passed.
- `docs/pages/`, IA sitemap и фактический route list.
- Google Search Console / Яндекс Вебмастер access context, если пользователь хочет выполнить external setup.
- Known staging/preview URLs.

## Ограничения

- Не проводи keyword research, content strategy или ranking analysis.
- Не обещай индексацию, позиции, rich results или сроки появления сайта в поиске.
- Не исправляй большой UI/content scope внутри production verification.
- Не меняй DNS, verification records, Search Console/Yandex ownership или sitemap submissions без подтверждения пользователя.
- Не сохраняй verification tokens, credentials и private access data в docs.
- Не запускай реальные платные действия.
- Не считай webmaster setup blocker для технической исправности сайта, если нужен внешний user access; используй verdict `verified with user actions`.
- Не считай sitemap гарантией индексации.
- Не скрывай production blocker под статусом `user action`, если проблема находится в коде, server config или deploy.

## Процесс

1. Прочитай `prompts/_knowledge/technical-seo-baseline.md` полностью.
2. Проверь prerequisites: production URL работает, HTTPS/SSL активен, общий post-deploy smoke passed.
3. Проверь origin normalization:
   - HTTP -> HTTPS;
   - alternate apex/www -> canonical host;
   - отсутствие redirect chains/loops;
   - canonical, sitemap, Open Graph и JSON-LD используют тот же production origin.
4. Проверь HTTP status behavior:
   - indexable pages return 200;
   - missing sample URL returns 404/410;
   - permanent redirects use 301/308;
   - нет soft 404, unexpected 5xx и redirect-to-home для всех missing URLs.
5. Открой `/robots.txt`: status 200, production rules, sitemap URL, отсутствие accidental global block.
6. Открой `/sitemap.xml`: status 200, valid XML, absolute canonical HTTPS URLs, отсутствие redirects/noindex/private/404 URLs. Проверь real `lastmod`, если он используется.
7. Для всех routes маленького сайта или representative sample большого сайта проверь live rendered HTML:
   - title and description;
   - canonical and robots meta;
   - один ясный H1 и logical headings;
   - crawlable internal links;
   - meaningful/decorative image alt behavior;
   - Open Graph/share metadata.
8. Проверь live JSON-LD:
   - syntactic Schema.org validity;
   - Google rich-result eligibility where applicable;
   - соответствие видимому content и production URLs;
   - отсутствие invented/hidden data.
9. Проверь, что important routes доступны без login и critical rendered content виден search-engine tools. Для staging/preview проверь запрет публичной индексации или реальный access control.
10. Запусти production PageSpeed/Core Web Vitals smoke для ключевых routes, если tool доступен. Severe issues отправь в `09-quality`; не дублируй full performance audit.
11. Если пользователь дал доступ и подтвердил external changes:
    - добавь/проверь property в Google Search Console;
    - добавь/проверь site в Яндекс Вебмастере;
    - выполни ownership verification безопасным выбранным способом;
    - submit sitemap;
    - проверь home page и 1-3 critical URLs через URL inspection/server response tools;
    - request indexing только если пользователь это подтвердил.
12. Если external access/confirmation отсутствует, создай точный user action list без фиктивного выполнения.
13. Проведи `Anti-cargo-cult check`.
14. Если найден code/server blocker, назначь owner prompt. После исправления и redeploy повтори relevant post-deploy smoke и этот prompt.
15. Создай или обнови `docs/seo/production-seo-verification.md`.
16. Обнови `docs/project-state.md`: отметь technical verdict, webmaster action status и следующий prompt.

## Output

Создай или обнови `docs/seo/production-seo-verification.md`:

```md
# Production SEO Verification

## Verdict

- Status: verified / verified with user actions / needs fixes / blocked
- Production origin:
- Checked at:

## Production checks

| Check | Result | Evidence | Owner prompt |
| --- | --- | --- | --- |

## URL and status sample

| URL | Expected | Actual | Canonical | Indexing decision | Result |
| --- | --- | --- | --- | --- | --- |

## Robots verification

## Sitemap verification

## Live metadata and headings

| Route | Title/description | Canonical/robots | H1/outline | OG | Result |
| --- | --- | --- | --- | --- | --- |

## Structured data validation

| Route/type | Rich Results Test | Schema validator | Content match | Result |
| --- | --- | --- | --- | --- |

## Crawlability, links and images

## Performance smoke

## Search engine setup

| Service | Property/rights | Sitemap submitted | URL checked | Status / user action |
| --- | --- | --- | --- | --- |

## Security and secret handling

- Verification secrets stored in docs: no

## Issues and fixes

## Required user actions

## Anti-cargo-cult check

## Next step
```

В ответе кратко покажи:

- production SEO verdict;
- какие URLs и files проверены;
- Search Console/Yandex status;
- blockers и required user actions;
- следующий deployment prompt.

## Done when

- Production HTTPS origin и redirects проверены.
- Indexable pages/status codes проверены на live site.
- `/robots.txt` и `/sitemap.xml` доступны и не конфликтуют.
- Live metadata, heading hierarchy, canonical и robots decisions проверены.
- Structured data валидирована там, где она есть.
- Crawlable links, alt behavior и staging protection проверены.
- Search Console/Yandex setup выполнен после подтверждения или оформлен как explicit user action.
- Verification secrets не сохранены.
- Создан `docs/seo/production-seo-verification.md`.
- `docs/project-state.md` обновлён.

## Follow-up

Если verdict `verified` или `verified with user actions`, следующий промпт: `prompts/12-deployment/10-monitoring-backup-rollback.md`.

Если есть blocker, вернись к конкретному owner prompt из `09-quality`, `12-deployment` или `13-technical-seo/01-pre-deploy-technical-seo.md`, затем повтори общий post-deploy smoke и этот prompt.
