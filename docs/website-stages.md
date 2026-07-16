# Этапы создания сайта и папки промптов

На каждом этапе Codex отвечает по `prompts/_knowledge/codex-user-response-quality.md`: сначала объясняет обычными словами, что готово, зачем это важно и что требуется от пользователя. Внутреннее название стадии и путь к следующему prompt остаются служебными деталями.

## Maintenance — не стадия сайта

Папка: `prompts/_maintenance/`

Назначение: установить, обновить, проверить или выпустить сам Prompt Kit, не меняя текущую стадию сайта.

- Фраза `обнови базу` запускает GitHub update по installed `.prompt-kit/manifest.json` через `prompts/_maintenance/01-update-prompt-kit.md`.
- Рабочий update проходит как транзакция `01-update → 02-integrity → 04-alignment`.
- Legacy `AGENTS.md` без markers сначала проходит `prompts/_maintenance/03-migrate-agents-md`.
- Выпуск версии в source-репозитории выполняется отдельно через `prompts/_maintenance/05-release-prompt-kit.md`.

Maintenance не делает `git pull`, commit или push в репозитории пользователя и не заменяет project-owned документы. После завершения проект продолжает с той стадии, на которой находился до обновления.

## 00. Intake brief

Папка: `prompts/00-intake-brief/`

Назначение: собрать исходные материалы, транскрибировать видео/аудио, извлечь факты, провести интервью, посмотреть конкурентов и финализировать project brief.

Когда переходить дальше: пользователь подтвердил, что суть проекта отражена верно, а `project-brief.md` можно использовать как источник правды.

## 01. Project rules

Папка: `prompts/01-project-rules/`

Назначение: на основе project brief сохранить router `AGENTS.md`, добавить `Project-specific context`, создать `docs/project-state.md`, документацию и команды проверки.

Когда переходить дальше: Codex знает стек, структуру, ограничения и критерии качества.

## 02. Project strategy

Папка: `prompts/02-project-strategy/`

Назначение: проверить project brief, выявить стратегические пробелы, сформировать цели, аудиторию, оффер, messaging, editorial rules, site copy quality rules и ограничения.

Когда переходить дальше: созданы `docs/strategic-audit.md`, `docs/strategy.md`, `docs/messaging.md` и `docs/content/editorial-rules.md`, editorial rules учитывают site copy quality principles, а `docs/project-state.md` отмечает stage `strategy-ready`.

## 03. Research

Папка: `prompts/03-research/`

Назначение: найти и подтвердить конкурентов/источники, изучить сайты конкурентов, отзывы, аудиторию и референсы, затем собрать research summary.

Когда переходить дальше: созданы `docs/research/competitors.md`, `docs/research/audience-insights.md`, `docs/research/reference-analysis.md` и `docs/research/research-summary.md`.

## 04. Information architecture

Папка: `prompts/04-information-architecture/`

Назначение: спланировать страницы, навигацию, секции, контентные пробелы и проверить готовность IA перед дизайн-системой.

Когда переходить дальше: созданы `docs/ia/sitemap.md`, `docs/ia/page-section-map.md`, `docs/ia/content-inventory.md`, `docs/ia/ia-review.md`, а review даёт verdict `IA ready`.

## 05. Design system

Папка: `prompts/05-design-system/`

Назначение: вывести дизайн-гипотезы из предмета, процесса, материалов и реальных assets проекта, дёшево проверить до трёх low-fi ходов и показать один выбранный high-fidelity HTML/CSS concept. Первый проход получает короткий Design context diet; после live render отдельный critic использует полные базы, называет до трёх главных проблем и делает один self-fix. Затем фиксируются stable foundation, provisional expressive vocabulary, Visual North Star, iconography, tokens, Desktop Canvas Contract, First-render Responsive Delivery Contract, components и accessibility.

Когда переходить дальше: создан approved concept или явно зафиксирован skip, после render сохранены фактические media/icon/motion decisions либо reasoned skip, созданы design direction, Visual North Star, iconography, semantic tokens, layout rules с обоими contracts, component/accessibility docs и calibration checkpoint после `2–3` живых marketing-блоков; review даёт verdict `Design ready`.

## 06. Next.js setup

Папка: `prompts/06-nextjs-setup/`

Назначение: безопасно подготовить технический фундамент проекта: preflight, scaffold, server-first App Router, CSS-first responsive styling без post-mount canvas correction, tooling и финальный review.

Когда переходить дальше: созданы `docs/nextjs/preflight.md`, `docs/nextjs/scaffold.md`, `docs/nextjs/app-router-structure.md`, `docs/nextjs/styling-integration.md`, `docs/nextjs/tooling.md`, `docs/nextjs/next-ready-review.md`, а review даёт verdict `Next ready`.

## 07. Page planning

Папка: `prompts/07-page-planning/`

Назначение: выбрать страницу и scope, создать page spec, content/SEO plan и block specs, зафиксировать page story и visual chapters. Content preview утверждает meaning, facts, claims, voice и CTA intent, но не line breaks/layout. Для будущей композиции creator получает только короткий visual intent и `4–6` релевантных критериев; полные checks выполняются после render.

Когда переходить дальше: созданы `docs/pages/[page]/page-scope.md`, `page-spec.md`, `content-seo-plan.md`, `block-breakdown.md`, `blocks/*.md`, `page-planning-review.md`, а для текущего смыслового блока есть утверждённый `blocks/[block]-content-preview.md` или пользователь явно пропустил согласование.

## 08. Block build

Папка: `prompts/08-block-build/`

Назначение: реализовать ровно один блок после согласования текста и общего visual intent. По умолчанию через fast lane: mini-preflight, свободная композиция внутри Visual North Star, structure, styling, CSS-first responsive, states, fresh-load mobile/reference-desktop/wide first-frame eyes-check и self-fix одним prompt-step. Отдельный pre-build live preview блока не обязателен. Подробная цепочка остаётся для complex/deep mode.

Когда переходить дальше: fast build или build review показывает, что текущий блок готов, соседние части не сломаны, а следующий block spec выбран отдельно.

## 09. Quality

Папка: `prompts/09-quality/`

Назначение: проверить один блок или узкий scope. По умолчанию используется быстрый smoke-check, но visible UI всегда проверяют fresh load: viewport задаётся до navigation, early frame сравнивается с settled state, hydration и media resources инспектируются, а screenshots сверяются с Visual North Star/обоими canvas contracts/approved evidence. Deep review обязательно проверяет `1440 / 1920 / 2560 CSS px`; `3840 CSS px` — для true-4K/full-bleed/ultrawide target или с reasoned skip.

Когда переходить дальше: создан quality summary со статусом `Quality passed` или все fixes отправлены в конкретный `08/09` prompt.

## 10. Handoff

Папка: `prompts/10-handoff/`

Назначение: закрыть текущий scope (`block`, `page`, `deployment`, `iteration`, `project`): определить scope, провести scoped review, подготовить summary и выбрать следующий prompt.

Когда завершать: есть handoff scope, final review, change summary, next iteration plan и обновлённый `docs/project-state.md`.

## 11. Ecommerce

Папка: `prompts/11-ecommerce/`

Назначение: добавить специализированный слой для интернет-магазинов: e-commerce brief, product data model, каталог, PLP, product card, PDP, фильтры, поиск, сортировка, коммерческие правила, корзина, checkout, аккаунт, заказы и аналитика.

Когда использовать: после базового брифа, IA и дизайн-системы, до page planning и реализации e-commerce страниц и блоков.

Когда переходить дальше: создан `docs/ecommerce/ecommerce-review.md`, verdict `Ecommerce ready for page planning`, риски интеграций и юридические требования зафиксированы, первая e-commerce страница возвращена в `07-page-planning`.

## 12. Deployment

Папка: `prompts/12-deployment/`

Назначение: отдельный слой для размещения сайта: deployment brief, SSH/server access, базовая безопасность сервера, runtime strategy, env/secrets, domain/DNS/SSL, deploy, process manager/reverse proxy, post-deploy checks, monitoring/backup/rollback и deployment handoff.

Когда использовать: когда пользователь явно просит настроить сервер, SSH, VPS, root-доступ, production env, домен, SSL или задеплоить сайт.

Когда переходить дальше: создан `docs/deployment/deployment-handoff.md`, production status честно зафиксирован, secrets не сохранены, post-deploy checks и production technical SEO verification пройдены или blockers отправлены в owner prompts.

## 13. Technical SEO

Папка: `prompts/13-technical-seo/`

Назначение: отдельный двухпроходный gate вокруг production deploy без keyword research и контент-продвижения. До deploy реализуются и проверяются metadata, H1-H6, canonical, robots/noindex, sitemap, JSON-LD, crawlable links, alt и status/redirect readiness. После deploy всё повторно проверяется на live HTTPS origin вместе с Search Console/Yandex handoff.

Когда использовать: первый проход — после `Quality passed` и domain planning, до production deploy; второй — после общего post-deploy smoke, до monitoring/rollback и deployment handoff.

Когда переходить дальше: создан `docs/seo/pre-deploy-technical-seo.md` со статусом `ready for deploy`, а после запуска — `docs/seo/production-seo-verification.md` с technical verdict `verified` или `verified with user actions`.
