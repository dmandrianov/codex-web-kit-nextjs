# Индекс промптов

Используй этот файл как карту Prompt Kit. Для выбора конкретного промпта смотри также `prompts/ROUTER.md`.

## Shared guidelines

- `prompts/_knowledge/codex-user-response-quality.md` - обязательный стандарт для всех сообщений Codex человеку: результат сначала, простое объяснение, польза, нужное действие и только затем служебные технические детали.
- `prompts/_guidelines/creator-critic-design-workflow.md` - главный workflow для новой композиции и заметного redesign: короткий positive creator brief, Design context diet, live render, critic до трёх findings, один self-fix и полный compliance позже.
- `prompts/_guidelines/gpt-taste-integration.md` - внешняя рамка для неизменённого upstream `$gpt-taste`: pinned identity, explicit routing, modes `page / block / component`, continuity profile и возврат visual fixes skill.
- `prompts/_guidelines/seo-content-writer-integration.md` - внешняя рамка для неизменённого upstream `$seo-content-writer`: preserved `v9.9.12`, pinned identity, article-only full routing и лёгкий нативный page-copy layer без полного skill preflight.
- `prompts/_guidelines/anti-ai-slop-design-and-copy.md` - reference для critic и quality; до первого render creator выбирает из него только применимые критерии, а не читает весь avoid-list.
- `prompts/_guidelines/landing-copy-formulas.md` - diagnostic fallback для заголовков, CTA и секций, когда прямой fact-backed текст не складывается.
- `prompts/_guidelines/page-composition-rhythm.md` - reference для page rhythm и соседних блоков; creator активирует только критерии, нужные текущему visual chapter.
- `prompts/_knowledge/site-copy-quality.md` - редакторский стандарт с коротким обязательным контрактом и `Site copy fast pass` для обычных текстов страниц; полный чек остаётся длинному, критичному или рискованному copy.
- `prompts/_knowledge/ui-design-quality.md` - большая visual reference base, включая Unified Design Canvas и Native Responsive First Paint. До render это меню для выбора 4–6 правил; после render — reference critic; полная таблица `UI quality check` относится к quality stage.
- `prompts/_knowledge/contemporary-visual-direction.md` - reference для concept critic: first-viewport visual event, media/icon/motion treatment, currentness и anti-2020 smell check; creator заранее получает только выбранные критерии и реальные assets.
- `prompts/_knowledge/technical-seo-baseline.md` - базовый technical SEO standard: route indexability, metadata, heading hierarchy, canonical, robots/noindex, sitemap, JSON-LD, crawlability, status codes, redirects и production verification без keyword strategy.
- `prompts/_templates/visual-north-star-template.md` - компактный перенос approved visual direction в page planning, block build и screenshot eyes-check: positive continuity anchors, creative freedom, approved evidence и только настоящие hard boundaries.
- `prompts/_templates/gpt-taste-profile-template.md` - память проекта для gpt-taste: locked identity/seed, used and available architectures, open RNG choices, motion и asset truth.
- `prompts/_templates/gpt-taste-component-spec-template.md` - standalone component contract: content/actions, real states, specimen matrix, profile continuity and runtime scope.

## Cross-cutting content

- `prompts/_content/01-write-seo-article.md` - написать новую SEO-статью, blog post, guide, comparison, listicle, review, pillar article или FAQ-материал через полный original `$seo-content-writer`; основная website stage не меняется.

## Как загружается дизайн-контекст

- `creator`: North Star + approved visual evidence + real assets + применимая design-system основа + 4–6 правил;
- `render`: live UI на нужных viewports вместо дополнительного текстового отчёта;
- `critic`: полные релевантные базы доступны после render, но результат ограничен тремя главными findings и одним self-fix;
- `quality`: полный UI/copy/accessibility/responsive/technical compliance;
- `ALWAYS`/`NEVER`: только truth, permissions, safety, secrets и accessibility.

## 00. Intake brief

Цель: понять проект до правил, дизайна и кода.

- `prompts/00-intake-brief/01-scan-source-materials.md` - найти исходные материалы.
- `prompts/00-intake-brief/02-transcribe-media.md` - транскрибировать видео/аудио.
- `prompts/00-intake-brief/03-extract-project-facts.md` - извлечь факты, гипотезы и вопросы.
- `prompts/00-intake-brief/04-run-project-interview.md` - провести интервью, если данных мало.
- `prompts/00-intake-brief/05-competitor-discovery.md` - найти и отобрать конкурентов.
- `prompts/00-intake-brief/06-competitor-feature-loop.md` - анализировать конкурентов по 2-3 идеи за раз.
- `prompts/00-intake-brief/07-finalize-project-brief.md` - собрать финальный `project-brief.md`.

## 01. Project rules

- `prompts/01-project-rules/01-create-agents-md.md` - сохранить router `AGENTS.md` и добавить `Project-specific context`.
- `prompts/01-project-rules/02-create-project-docs.md` - создать базовую документацию и `docs/project-state.md`.

## 02. Project strategy

- `prompts/02-project-strategy/01-client-brief.md` - проверить strategic brief и выявить критичные пробелы.
- `prompts/02-project-strategy/02-goals-audience-offer.md` - создать `docs/strategy.md` и `docs/messaging.md`.

## 03. Research

- `prompts/03-research/01-discover-competitors-and-sources.md` - найти кандидатов конкурентов, референсов и источников.
- `prompts/03-research/02-competitor-website-analysis.md` - проанализировать подтвержденный shortlist конкурентов.
- `prompts/03-research/03-reviews-audience-insights.md` - извлечь audience insights из отзывов и публичных источников.
- `prompts/03-research/04-reference-analysis.md` - разобрать UX и визуальные референсы.
- `prompts/03-research/05-research-synthesis.md` - собрать research summary для IA, контента и дизайна.

## 04. Information architecture

- `prompts/04-information-architecture/01-sitemap.md` - создать `docs/ia/sitemap.md`.
- `prompts/04-information-architecture/02-page-section-map.md` - создать `docs/ia/page-section-map.md`.
- `prompts/04-information-architecture/03-content-inventory.md` - создать `docs/ia/content-inventory.md`.
- `prompts/04-information-architecture/04-ia-review.md` - проверить IA и перевести проект в `ia-ready`.

## 05. Design system

- `prompts/05-design-system/01-visual-reference-principles.md` - извлечь принципы из стартовых референсов и скриншотов.
- `prompts/05-design-system/02-design-style-shortlist.md` - выбрать style hypothesis queue из 3 кандидатов и одну `Prototype next` hypothesis.
- `prompts/05-design-system/03-design-concept-prototypes.md` - создать один disposable concept: native x 2 блока или полноценный `gpt-taste / page`, затем провести screenshot critic и один self-fix через выбранный creator engine.
- `prompts/05-design-system/04-design-concept-feedback.md` - собрать фидбек и решение: approve, iterate, try next hypothesis или new shortlist.
- `prompts/05-design-system/05-design-concept-iteration.md` - уточнить один active concept внутри выбранной hypothesis.
- `prompts/05-design-system/06-approve-design-direction.md` - зафиксировать approved concept и `docs/design-system/design-direction.md`.
- `prompts/05-design-system/07-iconography-system.md` - выбрать icon pack и создать `docs/design-system/iconography.md`.
- `prompts/05-design-system/08-design-tokens.md` - создать `docs/design-system/design-tokens.md`.
- `prompts/05-design-system/09-layout-and-responsive-rules.md` - создать `docs/design-system/layout-rules.md` с Desktop Canvas Contract, First-render Responsive Delivery Contract, containers, grid и responsive rules.
- `prompts/05-design-system/10-ui-components.md` - создать `docs/design-system/component-inventory.md`.
- `prompts/05-design-system/11-accessibility-rules.md` - создать `docs/design-system/accessibility.md`.
- `prompts/05-design-system/12-design-system-review.md` - проверить дизайн-систему и перевести проект в `design-ready`.

## 06. Next.js setup

- `prompts/06-nextjs-setup/01-project-preflight.md` - проверить текущую папку и стратегию scaffold.
- `prompts/06-nextjs-setup/02-project-scaffold.md` - безопасно создать или адаптировать Next.js каркас.
- `prompts/06-nextjs-setup/03-app-router-structure.md` - настроить структуру App Router по sitemap.
- `prompts/06-nextjs-setup/04-styling-and-design-system-integration.md` - подключить styling foundation, design tokens и CSS-first responsive delivery без post-mount canvas correction.
- `prompts/06-nextjs-setup/05-tooling-and-quality-scripts.md` - настроить scripts, TypeScript, lint и tooling.
- `prompts/06-nextjs-setup/06-next-ready-review.md` - проверить готовность Next.js и перевести проект в `next-ready`.

## 07. Page planning

- `prompts/07-page-planning/00-gpt-taste-component-spec.md` - подготовить standalone gpt-taste component contract и specimen scope без фиктивной page spec.
- `prompts/07-page-planning/01-select-page-and-scope.md` - выбрать одну страницу и зафиксировать scope.
- `prompts/07-page-planning/02-page-spec.md` - создать `docs/pages/[page]/page-spec.md`.
- `prompts/07-page-planning/03-adapt-reference-to-block-spec.md` - адаптировать screenshot/reference в требования к блоку.
- `prompts/07-page-planning/04-content-and-seo-plan.md` - создать content/SEO plan страницы.
- `prompts/07-page-planning/05-block-breakdown.md` - разбить страницу на block specs.
- `prompts/07-page-planning/06-page-planning-review.md` - проверить готовность к `08-block-build`.
- `prompts/07-page-planning/07-block-content-preview.md` - согласовать смысл, факты, claims, voice, CTA intent, рабочий текст и короткий visual intent, не замораживая line breaks и будущую композицию.

## 08. Block build

- `prompts/08-block-build/00-gpt-taste-creative-build.md` - реализовать один выразительный marketing block или standalone component через полный original `$gpt-taste`, specimen/live render, critic и correction через skill.
- `prompts/08-block-build/00-build-block-fast-lane.md` - реализовать обычный блок по creator → render → critic → one self-fix без полного checklist до render.
- `prompts/08-block-build/01-block-build-preflight.md` - проверить block spec, scope, файлы и план проходов.
- `prompts/08-block-build/02-build-block-structure.md` - реализовать структуру одного блока.
- `prompts/08-block-build/03-style-block-from-design-system.md` - стилизовать блок по дизайн-системе.
- `prompts/08-block-build/04-responsive-pass.md` - провести адаптивный проход одного блока.
- `prompts/08-block-build/05-interaction-and-states-pass.md` - проверить интерактив и состояния одного блока.
- `prompts/08-block-build/06-block-build-review.md` - проверить готовность блока к quality stage.
- `prompts/08-block-build/07-approve-gpt-taste-profile.md` - после явного approval создать profile или применить принятый run delta к project continuity memory.

## 09. Quality

- `prompts/09-quality/00-block-smoke-check.md` - быстро проверить один блок без полного QA-stage.
- `prompts/09-quality/01-quality-preflight.md` - составить quality plan для текущего блока.
- `prompts/09-quality/02-visual-screenshot-review.md` - глазами проверить screenshots; короткий critic ограничивает первичный ответ тремя главными findings и одним self-fix, а полный audit выполняется в quality flow.
- `prompts/09-quality/03-accessibility-and-usability-check.md` - проверить accessibility и usability.
- `prompts/09-quality/04-technical-checks.md` - запустить lint/type/build/tests для текущего scope.
- `prompts/09-quality/05-browser-runtime-verification.md` - проверить runtime, hydration и стабильность первого responsive кадра в браузере.
- `prompts/09-quality/06-quality-summary.md` - собрать verdict `Quality passed` / `needs fixes`.

## 10. Handoff

- `prompts/10-handoff/01-handoff-scope.md` - определить scope handoff: block/page/iteration/project.
- `prompts/10-handoff/02-final-review.md` - провести scoped final review.
- `prompts/10-handoff/03-change-summary.md` - подготовить change summary.
- `prompts/10-handoff/04-next-iteration-plan.md` - выбрать следующий prompt или завершить итерацию.

## 11. Ecommerce

Используй как дополнительный слой для интернет-магазинов.

- `prompts/11-ecommerce/01-ecommerce-brief.md` - провести e-commerce бриф.
- `prompts/11-ecommerce/02-product-data-model.md` - описать product data model: поля, варианты, цены, остатки, медиа.
- `prompts/11-ecommerce/03-catalog-architecture.md` - спроектировать категории, URL, SEO-посадки и связи каталога.
- `prompts/11-ecommerce/04-category-plp-spec.md` - описать category/PLP страницу до page planning.
- `prompts/11-ecommerce/05-product-card-spec.md` - описать карточку товара в списках.
- `prompts/11-ecommerce/06-pdp-spec.md` - описать product detail page.
- `prompts/11-ecommerce/07-filters-search-sorting.md` - спроектировать фильтры, поиск, сортировку и empty states.
- `prompts/11-ecommerce/08-commercial-rules.md` - зафиксировать оплату, доставку, возвраты, налоги, акции и юридические ограничения.
- `prompts/11-ecommerce/09-cart-spec.md` - спроектировать корзину.
- `prompts/11-ecommerce/10-checkout-flow-spec.md` - спроектировать checkout flow.
- `prompts/11-ecommerce/11-account-orders-analytics.md` - спланировать аккаунт, заказы, уведомления, аналитику и consent.
- `prompts/11-ecommerce/12-ecommerce-review.md` - проверить e-commerce слой и вернуть конкретные страницы в `07-page-planning`.

## 12. Deployment

Используй как отдельный слой для server access, SSH, env, domain/SSL, production deploy, verification и rollback.

- `prompts/12-deployment/01-deployment-brief.md` - собрать deployment target, readiness, доступы и риски.
- `prompts/12-deployment/02-server-access-and-ssh.md` - настроить SSH-доступ и не сохранять секреты.
- `prompts/12-deployment/03-server-baseline-security.md` - выполнить базовую безопасную настройку сервера.
- `prompts/12-deployment/04-runtime-and-hosting-strategy.md` - выбрать production runtime strategy.
- `prompts/12-deployment/05-env-and-secrets.md` - подготовить env/secrets без раскрытия значений.
- `prompts/12-deployment/06-domain-dns-ssl.md` - настроить домен, DNS и SSL.
- `prompts/12-deployment/07-deploy-nextjs-app.md` - задеплоить Next.js приложение.
- `prompts/12-deployment/08-process-manager-and-reverse-proxy.md` - настроить process manager и reverse proxy.
- `prompts/12-deployment/09-post-deploy-verification.md` - проверить production URL и critical flows.
- `prompts/12-deployment/10-monitoring-backup-rollback.md` - зафиксировать monitoring, backup и rollback.
- `prompts/12-deployment/11-deployment-handoff.md` - подготовить deployment handoff.

## 13. Technical SEO

Используй как отдельный двухпроходный gate вокруг production deploy, а не как SEO-продвижение или keyword research.

- `prompts/13-technical-seo/01-pre-deploy-technical-seo.md` - реализовать и проверить базовое technical SEO после domain planning, до production deploy.
- `prompts/13-technical-seo/02-production-seo-verification.md` - проверить live HTTPS origin, robots, sitemap, metadata, schema, statuses и webmaster handoff после deploy.

## Maintenance

Используй для установки, обновления, проверки и выпуска самого Prompt Kit. Это не стадия создания сайта.

- `prompts/_maintenance/01-update-prompt-kit.md` - по фразе `обнови базу` через browser-authenticated `gh` проверить private Organization Release, embedded numeric repository ID и безопасно применить kit-owned файлы, не затрагивая Git проекта.
- `prompts/_maintenance/02-check-kit-integrity.md` - проверить incoming/installed manifest, immutable release/asset attestation, закрытый transport, `.prompt-kit/TERMS.md`, ссылки, обязательные файлы, managed-блок и ownership после применения release.
- `prompts/_maintenance/03-migrate-agents-md.md` - перенести старый `AGENTS.md` на managed-блок без потери project-specific правил.
- `prompts/_maintenance/04-align-project-after-kit-update.md` - сопоставить новый workflow с уже выполненным проектом и предложить optional refresh.
- `prompts/_maintenance/05-release-prompt-kit.md` - maintainer-only подготовка версии, closed-use TERMS, deterministic assets, private Organization identity и draft-to-immutable GitHub Release.

Обычное обновление является одной rollback-safe транзакцией `01 → 02 → 04`. Release authoring через `05` — отдельный source workflow и не запускается в пользовательском проекте.
