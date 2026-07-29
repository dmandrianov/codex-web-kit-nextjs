# Workflow создания сайта через Codex

Этот процесс помогает вести Codex маленькими управляемыми шагами. Каждый этап заканчивается артефактом, который можно проверить и использовать как вход для следующего этапа.

## Как выглядит ответ пользователю

На любом этапе Codex оформляет сообщение по `prompts/_knowledge/codex-user-response-quality.md`. Сначала он обычными словами объясняет результат, его пользу и нужное действие пользователя. Технические названия этапов, файлов и проверок остаются в документах или показываются после этого как служебные детали.

Путь к следующему prompt не заменяет объяснение. Пользователь получает человеческое название следующего действия и готовую короткую фразу, которую можно отправить для продолжения.

## Maintenance вне стадий сайта

Обновление или выпуск самого Prompt Kit не меняет website stage.

Если пользователь пишет `обнови базу`, Codex читает `.prompt-kit/manifest.json`, через уже авторизованный GitHub CLI проверяет последний стабильный immutable release и signed release/asset attestation в доверенном repository и выполняет rollback-safe цепочку:

1. `prompts/_maintenance/01-update-prompt-kit.md` — preflight, checksum, backup и применение kit-owned файлов;
2. `prompts/_maintenance/02-check-kit-integrity.md` — проверка состава, hashes, links и managed-блока;
3. `prompts/_maintenance/04-align-project-after-kit-update.md` — сопоставление нового workflow с текущими артефактами без отката completed stages.

Новый `.prompt-kit/manifest.json` записывается последним. Installed changelog и migrations находятся в `.prompt-kit/`, поэтому source-документы release не заменяют одноимённые корневые файлы сайта.

Updater сверяет встроенный numeric repository ID и personal owner `dmandrianov`, не принимает raw token из environment и не использует Git проекта: не делает pull/merge/commit/push, не меняет remote и не создаёт вложенный `.git`. Private/public visibility не меняет источник доверия. Изменения остаются обычным локальным diff пользователя.

Если maintainer выпускает новую версию Web Kit, используется отдельный `prompts/_maintenance/05-release-prompt-kit.md`. Он проверяет source metadata, действующие условия распространения, trusted repository identity и включённые immutable releases, строит deterministic assets, прикрепляет их к draft и публикует только полный проверенный GitHub Release; пользовательский update flow при этом не запускается.

Если public repository временно недоступен, remote update прекращается, но уже установленная версия остаётся пригодной по MIT License, поставленной по compatibility path `.prompt-kit/TERMS.md`.

Подробный контракт описан в `docs/release-and-update.md` и `prompts/OWNERSHIP.md`.

## 0. Intake и project brief

Цель: понять, что за проект и какой сайт нужен, до создания `AGENTS.md`, дизайна, структуры страниц и кода.

Промпты:

- `prompts/00-intake-brief/01-scan-source-materials.md`
- `prompts/00-intake-brief/02-transcribe-media.md`
- `prompts/00-intake-brief/03-extract-project-facts.md`
- `prompts/00-intake-brief/04-run-project-interview.md`
- `prompts/00-intake-brief/05-competitor-discovery.md`
- `prompts/00-intake-brief/06-competitor-feature-loop.md`
- `prompts/00-intake-brief/07-finalize-project-brief.md`

Результат:

- найденные материалы;
- транскрипты видео и аудио;
- извлеченные факты, гипотезы и вопросы;
- будущий workflow изменения контента: owner + Codex/ИИ без CMS по умолчанию или editorial team с последующим CMS decision;
- итерационный анализ конкурентов;
- финальный `project-brief.md`.

## 1. Правила проекта

Цель: на основе project brief сохранить router-слой `AGENTS.md`, добавить `Project-specific context` и создать базовую документацию, чтобы Codex понимал стек, ограничения, стиль работы и критерии готовности.

Промпты:

- `prompts/01-project-rules/01-create-agents-md.md`
- `prompts/01-project-rules/02-create-project-docs.md`

Результат:

- `AGENTS.md` с сохранённым router-слоем и `Project-specific context`;
- `docs/project-state.md`;
- краткая документация проекта;
- понятные команды проверки.

## 2. Стратегия проекта

Цель: проверить project brief, уточнить стратегические пробелы и создать основу для исследования, IA, дизайна и контента.

Промпты:

- `prompts/02-project-strategy/01-client-brief.md`
- `prompts/02-project-strategy/02-goals-audience-offer.md`

Результат:

- `docs/strategic-audit.md`;
- `docs/strategy.md`;
- `docs/messaging.md`;
- `docs/content/editorial-rules.md`;
- цели сайта, аудитории, оффер, CTA, доказательства;
- site copy quality rules для любого user-facing copy: один главный смысл, честные факты, пустые фразы вместо конкретики, польза/снятие риска, voice/person, claim policy, UI labels, form states, product/checkout microcopy, metadata и SEO snippets;
- подтвержденные факты, гипотезы и открытые вопросы.

## 3. Исследование

Цель: собрать контекст рынка, конкурентов, референсов и визуальных ожиданий.

Промпты:

- `prompts/03-research/01-discover-competitors-and-sources.md`
- `prompts/03-research/02-competitor-website-analysis.md`
- `prompts/03-research/03-reviews-audience-insights.md`
- `prompts/03-research/04-reference-analysis.md`
- `prompts/03-research/05-research-synthesis.md`

Результат:

- `docs/research/competitors.md`;
- `docs/research/audience-insights.md`;
- `docs/research/reference-analysis.md`;
- `docs/research/research-summary.md`;
- выводы для структуры, контента, дизайна и messaging.

## 4. Информационная архитектура

Цель: определить страницы, навигацию, секции, контентные пробелы и готовность IA до дизайна и кода.

Промпты:

- `prompts/04-information-architecture/01-sitemap.md`
- `prompts/04-information-architecture/02-page-section-map.md`
- `prompts/04-information-architecture/03-content-inventory.md`
- `prompts/04-information-architecture/04-ia-review.md`

Результат:

- `docs/ia/sitemap.md`;
- `docs/ia/page-section-map.md`;
- `docs/ia/content-inventory.md`;
- `docs/ia/ia-review.md`;
- verdict `IA ready` или список исправлений до design system.

## 5. Дизайн-система

Цель: сначала найти сильное визуальное направление через короткий creator pass и живой HTML/CSS render, затем проверить его отдельным critic pass и только после этого зафиксировать foundation: approved concept, Visual North Star, stable/provisional vocabulary, iconography, semantic tokens, Unified Design Canvas, Native Responsive First Paint, layout, UI-компоненты и accessibility.

Промпты:

- `prompts/05-design-system/01-visual-reference-principles.md`
- `prompts/05-design-system/02-design-style-shortlist.md`
- `prompts/05-design-system/03-design-concept-prototypes.md`
- `prompts/05-design-system/04-design-concept-feedback.md`
- `prompts/05-design-system/05-design-concept-iteration.md`
- `prompts/05-design-system/06-approve-design-direction.md`
- `prompts/05-design-system/07-iconography-system.md`
- `prompts/05-design-system/08-design-tokens.md`
- `prompts/05-design-system/09-layout-and-responsive-rules.md`
- `prompts/05-design-system/10-ui-components.md`
- `prompts/05-design-system/11-accessibility-rules.md`
- `prompts/05-design-system/12-design-system-review.md`

Результат:

- `docs/design-system/reference-principles.md`, если есть референсы;
- `docs/design-system/concepts/style-shortlist.md`;
- `design-lab/design-concepts/index.html`;
- `design-lab/design-concepts/styles.css`;
- либо полноценный gpt-taste page concept и profile candidate в `design-lab/gpt-taste/page/`;
- `docs/design-system/concepts/concept-feedback.md`;
- `docs/design-system/concepts/approved-concept.md`;
- `docs/design-system/design-direction.md`;
- `docs/design-system/iconography.md`;
- `docs/design-system/design-tokens.md`;
- `docs/design-system/layout-rules.md`;
- `docs/design-system/component-inventory.md`;
- `docs/design-system/accessibility.md`;
- `docs/design-system/design-system-review.md`;
- `docs/design-system/gpt-taste-profile.md`, если пользователь утвердил gpt-taste page concept;
- правило: будущие скриншоты блоков используются как UX/reference input и адаптируются под дизайн-систему, а не копируются.
- правило: design shortlist выводит гипотезы прежде всего из предмета, процесса, материалов и реальных assets проекта; style library является fallback. Creator может дёшево проверить до трёх low-fi sketches, но пользователю показывает один выбранный high-fidelity concept.
- правило: до render creator получает approved evidence, реальные assets, positive direction, creative freedom и только `4–6` применимых критериев. После render critic подключает полные UI/copy/contemporary/anti-slop базы, называет максимум три findings и делает один связный self-fix.
- правило: actual media/icon/motion decisions фиксируются коротко после render. До CSS не нужны обязательные большие planning-таблицы.
- правило: если пользователь полностью отвергает concept, workflow возвращается к следующей гипотезе через `prompts/05-design-system/03-design-concept-prototypes.md`, а не к косметической итерации disliked style.
- правило: iconography/tokens/layout/components создаются только после approved visual concept или явного решения пользователя пропустить concept stage. Brand, semantic action/status meaning, accessibility и product patterns остаются stable; marketing composition, media treatment, texture и motion могут быть provisional до calibration.
- правило: после первых `2–3` живых marketing-блоков page screenshots решают `promote / refine / remove` для provisional vocabulary.
- правило: marketing rhythm можно оценивать chapter из `2–4` соседних блоков, но product data, forms, checkout, pricing rules и business logic остаются block-scoped.
- правило: layout rules содержат Desktop Canvas Contract и First-render Responsive Delivery Contract. Concept/fast sanity использует mobile + `1440` + wide `>=2560 CSS px`; полный `1440 / 1920 / 2560` matrix остаётся design-system/quality/handoff gate, а `3840` включается по применимости.
- правило: полная UI/contemporary проверка выполняется после render и на quality stage; до render эти базы являются меню для выбора `4–6` критериев, а не единым checklist.
- правило: style hypothesis явно выбирает native или gpt-taste. `gpt-taste / page` читает original skill полностью, сохраняет его `design_plan`, а visual self-fix возвращает skill.

## 6. Настройка Next.js

Цель: безопасно подготовить технический фундамент Next.js: проверить текущую папку, до scaffold решить CMS need, версии, hosting shape, источники данных, свежесть/кеш, безопасность и критичные сценарии, затем создать или адаптировать scaffold, настроить App Router, подключить дизайн-систему, зафиксировать tooling и получить verdict `Next ready`.

Промпты:

- `prompts/06-nextjs-setup/01-project-preflight.md`
- `prompts/06-nextjs-setup/02-technical-architecture.md`
- `prompts/06-nextjs-setup/02-project-scaffold.md`
- `prompts/06-nextjs-setup/03-app-router-structure.md`
- `prompts/06-nextjs-setup/04-styling-and-design-system-integration.md`
- `prompts/06-nextjs-setup/05-tooling-and-quality-scripts.md`
- `prompts/06-nextjs-setup/06-next-ready-review.md`

Результат:

- `docs/nextjs/preflight.md`;
- `docs/nextjs/technical-architecture.md`;
- `docs/nextjs/scaffold.md`;
- `docs/nextjs/app-router-structure.md`;
- `docs/nextjs/styling-integration.md`;
- `docs/nextjs/tooling.md`;
- `docs/nextjs/next-ready-review.md`;
- Next.js App Router;
- TypeScript;
- папка `src/`;
- безопасно сохранённые `AGENTS.md`, `prompts/`, `docs/` и пользовательские материалы;
- styling foundation на основе дизайн-системы, включая shared stage/container primitives, server-first structure и CSS-first responsive delivery без post-mount canvas correction;
- понятные команды запуска и проверки.
- CMS не добавлена без реального редакционного workflow; для owner + Codex/ИИ по умолчанию используется repository-owned content.
- версии, hosting shape, sources of truth, data/cache matrix и public endpoint boundaries приняты до кода.

## 7. Планирование страницы

Цель: перед кодом выбрать одну страницу, зафиксировать scope, создать page spec, адаптировать референсы, спланировать content/SEO, нарезать страницу на маленькие block specs, проверить готовность к реализации и согласовать текст/визуальную идею первого смыслового блока.

Промпты:

- `prompts/07-page-planning/00-gpt-taste-component-spec.md` — прямой standalone component contract без фиктивной страницы;
- `prompts/07-page-planning/01-select-page-and-scope.md`
- `prompts/07-page-planning/02-page-spec.md`
- `prompts/07-page-planning/03-adapt-reference-to-block-spec.md`
- `prompts/07-page-planning/04-content-and-seo-plan.md`
- `prompts/07-page-planning/05-block-breakdown.md`
- `prompts/07-page-planning/06-page-planning-review.md`
- `prompts/07-page-planning/07-block-content-preview.md`

Результат:

- `docs/pages/[page]/page-scope.md`;
- `docs/pages/[page]/page-spec.md`;
- `docs/pages/[page]/references/*.md`, если есть скриншоты или референсы;
- `docs/pages/[page]/content-seo-plan.md`;
- `docs/pages/[page]/block-breakdown.md`;
- `docs/pages/[page]/blocks/*.md`;
- `docs/pages/[page]/page-planning-review.md`;
- `docs/pages/[page]/blocks/[block]-content-preview.md`;
- первый block spec, готовый к реализации через `08-block-build`.
- creator engine и mode в каждом block spec: native, gpt-taste block или gpt-taste component.
- page story, composition roles, visual pattern budget и neighbor rules, чтобы страница читалась целиком, а не как набор одинаковых блоков.
- site copy notes и `Site copy check` для любого user-facing copy, чтобы heading/lead/CTA, labels, errors, empty states, product text, checkout microcopy и SEO snippets не утверждались без фактов, пользы и понятного действия.
- content approval фиксирует meaning, facts, claims, voice и CTA intent, но не exact wording, line breaks, geometry или будущую composition. Copy formulas подключаются только как diagnostic fallback.
- короткий creator intent: outcome, continuity anchors, real assets, creative freedom и `4–6` критериев для текущего блока. Полный `UI quality check` не выполняется до первого render.

## 8. Реализация блоков

Цель: быстро реализовывать один блок за раз после согласования смысла. Fast lane даёт creator композиционную свободу внутри stable foundation, разрешает один purposeful provisional приём, затем задаёт viewport до fresh reload, сравнивает early/settled frame, проводит critic до трёх findings, делает один связный self-fix и повторный eyes-check. Подробные проходы остаются для complex/deep mode.

Промпты:

- `prompts/08-block-build/00-build-block-fast-lane.md`
- `prompts/08-block-build/00-gpt-taste-creative-build.md`
- `prompts/08-block-build/01-block-build-preflight.md`
- `prompts/08-block-build/02-build-block-structure.md`
- `prompts/08-block-build/03-style-block-from-design-system.md`
- `prompts/08-block-build/04-responsive-pass.md`
- `prompts/08-block-build/05-interaction-and-states-pass.md`
- `prompts/08-block-build/06-block-build-review.md`
- `prompts/08-block-build/07-approve-gpt-taste-profile.md`

Результат:

- быстрый build одного обычного блока;
- полный gpt-taste build одной marketing/editorial секции или standalone component со specimen, если это явно выбрано в spec;
- после явного approval gpt-taste block/component его run candidate создаёт или обновляет approved continuity profile; rejected run canonical profile не меняет;
- использование утверждённого `docs/pages/[page]/blocks/[block]-content-preview.md` для смысловых блоков;
- stable vocabulary guard и явно помеченный provisional expressive proposal, если блоку нужен новый визуальный ход;
- creator → render → critic: до render только `4–6` релевантных правил, после render максимум три high-impact findings и один связный self-fix;
- visual eyes-check: viewport задан до fresh reload, early/settled state просмотрен на mobile, `1440 CSS px` и wide `>=2560 CSS px`, результат сравнен с Visual North Star, обоими canvas/delivery contracts и neighbors;
- проверка Site copy guard при любом user-facing copy change: headings, CTA, button labels, form labels/errors, empty/success/loading states, product/checkout text, metadata и SEO snippets;
- `docs/pages/[page]/blocks/[block]-build-plan.md`;
- структура одного блока;
- styling по дизайн-системе;
- проверенный адаптив одного блока;
- проверенные интерактивные состояния;
- `docs/pages/[page]/blocks/[block]-build-review.md`;
- отсутствие поломок соседних блоков;
- следующий block spec для продолжения работы.

Fast lane является дефолтом для простых и средних блоков. Deep mode включается только для форм, checkout/auth/payment, фильтров/search, сложной анимации, API/data-heavy логики, критичных reusable компонентов или если smoke-check нашёл проблему.

## 9. Проверка

Цель: проверять качество без лишнего расхода времени. По умолчанию после fast build достаточно короткого smoke-check, который включает fresh-load first-frame stability. Полный quality flow используется только для сложных, критичных или проблемных блоков. Если аудит страницы находит проблемы в нескольких блоках, исправления разбиваются на отдельные block-level задачи.

Промпты:

- `prompts/09-quality/00-block-smoke-check.md`
- `prompts/09-quality/01-quality-preflight.md`
- `prompts/09-quality/02-visual-screenshot-review.md`
- `prompts/09-quality/03-accessibility-and-usability-check.md`
- `prompts/09-quality/04-technical-checks.md`
- `prompts/09-quality/05-browser-runtime-verification.md`
- `prompts/09-quality/06-quality-summary.md`
- `prompts/09-quality/07-application-flow-check.md` — отдельный page/project gate перед handoff/deploy для форм, CMS, auth, commerce и интеграций.

Результат:

- быстрый smoke-check одного блока;
- `docs/pages/[page]/blocks/[block]-quality-plan.md`;
- visual review;
- UI quality review по `prompts/_knowledge/ui-design-quality.md`, включая relevant before/after example для слабого или спорного UI;
- contemporary visual review по `prompts/_knowledge/contemporary-visual-direction.md`, если проверяемый scope затрагивает media, icons/pictograms, motion, hero/first viewport или жалобу "не современно";
- Site copy review по `prompts/_knowledge/site-copy-quality.md`, если проверяемый scope содержит пользовательский текст, UI labels, form states, product/checkout copy, metadata или SEO snippets;
- accessibility/usability check;
- technical checks;
- browser runtime verification с early/settled frame, hydration и responsive media evidence;
- quality summary с verdict `Quality passed` или `needs fixes`;
- `docs/quality/application-flow-check.md` с evidence полных пользовательских и операционных сценариев по применимости;
- исправления в рамках текущего блока или узкого scope;
- подтвержденные проверки.

## 10. Handoff

Цель: аккуратно закрыть текущий scope: block, page, deployment, iteration или project. Handoff не начинает новую работу, а фиксирует готовность, риски, summary и следующий prompt.

Промпты:

- `prompts/10-handoff/01-handoff-scope.md`
- `prompts/10-handoff/02-final-review.md`
- `prompts/10-handoff/03-change-summary.md`
- `prompts/10-handoff/04-next-iteration-plan.md`

Результат:

- `docs/handoff/[scope]-handoff-scope.md`;
- `docs/handoff/[scope]-final-review.md`;
- `docs/handoff/[scope]-change-summary.md`;
- `docs/handoff/[scope]-next-iteration.md`;
- честный статус готовности текущего scope;
- следующий prompt или остановка до решения пользователя.

## 11. E-commerce слой

Если проект является интернет-магазином, добавь отдельный e-commerce проход после базовой IA и дизайн-системы, но до page planning и реализации каталога, PLP, PDP, корзины и checkout.

Промпты:

- `prompts/11-ecommerce/01-ecommerce-brief.md`
- `prompts/11-ecommerce/02-product-data-model.md`
- `prompts/11-ecommerce/03-catalog-architecture.md`
- `prompts/11-ecommerce/04-category-plp-spec.md`
- `prompts/11-ecommerce/05-product-card-spec.md`
- `prompts/11-ecommerce/06-pdp-spec.md`
- `prompts/11-ecommerce/07-filters-search-sorting.md`
- `prompts/11-ecommerce/08-commercial-rules.md`
- `prompts/11-ecommerce/09-cart-spec.md`
- `prompts/11-ecommerce/10-checkout-flow-spec.md`
- `prompts/11-ecommerce/11-account-orders-analytics.md`
- `prompts/11-ecommerce/12-commerce-operations-and-payment-safety.md`
- `prompts/11-ecommerce/12-ecommerce-review.md`

Результат:

- `docs/ecommerce/brief.md`;
- `docs/ecommerce/product-data-model.md`;
- `docs/ecommerce/catalog-architecture.md`;
- `docs/ecommerce/category-plp-spec.md`;
- `docs/ecommerce/product-card-spec.md`;
- `docs/ecommerce/pdp-spec.md`;
- `docs/ecommerce/filters-search-sorting.md`;
- `docs/ecommerce/commercial-rules.md`;
- `docs/ecommerce/cart-spec.md`;
- `docs/ecommerce/checkout-flow.md`;
- `docs/ecommerce/account-orders-analytics.md`;
- `docs/ecommerce/commerce-operations-and-payment-safety.md`;
- `docs/ecommerce/ecommerce-review.md`;
- verified sources of truth, server-side order recalculation, signed webhook, idempotency, recovery/reconciliation и sandbox test matrix;
- verdict `Ecommerce ready for page planning` или список fixes;
- конкретная первая e-commerce страница, которую нужно вернуть в `07-page-planning`.

## 12. Deployment слой

Если пользователь хочет настроить сервер, SSH, домен, SSL, production env или задеплоить сайт, используй отдельный deployment flow. Не смешивай деплой с версткой, quality fixes и обычным handoff.

Deployment flow проходит через два technical SEO gates из `13-technical-seo`: после domain/DNS/SSL planning до deploy и после общего post-deploy smoke до monitoring/handoff.

Промпты:

- `prompts/12-deployment/01-deployment-brief.md`
- `prompts/12-deployment/02-server-access-and-ssh.md`
- `prompts/12-deployment/03-server-baseline-security.md`
- `prompts/12-deployment/04-runtime-and-hosting-strategy.md`
- `prompts/12-deployment/05-env-and-secrets.md`
- `prompts/12-deployment/06-domain-dns-ssl.md`
- `prompts/12-deployment/07-deploy-nextjs-app.md`
- `prompts/12-deployment/08-process-manager-and-reverse-proxy.md`
- `prompts/12-deployment/09-post-deploy-verification.md`
- `prompts/12-deployment/10-monitoring-backup-rollback.md`
- `prompts/12-deployment/11-deployment-handoff.md`

Результат:

- `docs/deployment/deployment-brief.md`;
- `docs/deployment/server-access.md`;
- `docs/deployment/server-security.md`;
- `docs/deployment/runtime.md`;
- `docs/deployment/env.md`;
- `docs/deployment/domain-dns-ssl.md`;
- `docs/deployment/deploy-runbook.md`;
- `docs/deployment/process-and-proxy.md`;
- `docs/deployment/post-deploy-checks.md`;
- `docs/deployment/monitoring-backup-rollback.md`;
- `docs/deployment/deployment-handoff.md`;
- `docs/seo/pre-deploy-technical-seo.md` со статусом `ready for deploy`;
- `docs/seo/production-seo-verification.md` с technical verdict `verified` или `verified with user actions`;
- production URL проверен или blockers явно зафиксированы;
- secrets не сохранены в документации;
- если использовался root-пароль, пользователь получил напоминание сменить его после действий.

## 13. Technical SEO

Цель: отдельный базовый technical SEO-проход без keyword research, блога и продвижения. Он проверяет готовность site-wide metadata/indexability до deploy и реальное поведение сайта после запуска.

Промпты:

- `prompts/13-technical-seo/01-pre-deploy-technical-seo.md`;
- `prompts/13-technical-seo/02-production-seo-verification.md`.

Общая база:

- `prompts/_knowledge/technical-seo-baseline.md`.

Первый gate запускается после `Quality passed` и готового domain/DNS/SSL plan, но до production deploy. Он реализует route indexability matrix, metadata, heading hierarchy, canonical, robots, sitemap, применимую JSON-LD, crawlable links, alt policy и status/redirect readiness.

Второй gate запускается после общего post-deploy smoke. Он проверяет live HTTPS origin, redirects, status codes, rendered metadata, `/robots.txt`, `/sitemap.xml`, structured data и Search Console/Yandex setup либо оформляет точные user actions, если нужен внешний доступ.

Результат:

- `docs/seo/pre-deploy-technical-seo.md`;
- `docs/seo/production-seo-verification.md`;
- verdict `Technical SEO ready for deploy` до production release;
- verdict `Production SEO verified` или `verified with user actions` до monitoring и deployment handoff;
- отсутствие cargo-cult SEO: `meta keywords`, fake `lastmod`, robots вместо noindex, invented schema, обязательные priority/changefreq и обещания индексации.
