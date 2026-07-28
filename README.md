# Web Kit — база промптов для Codex-сайтов

Официальный источник: приватный репозиторий GitHub Organization с доступом по подписке. Ссылка сама по себе не открывает repository; доступ выдаётся подтверждённому GitHub username с ролью `Read`. Публиковать или пересылать точный адрес закрытого repository/release третьим лицам запрещено `TERMS.md`.

Web Kit — копируемый Prompt Kit для создания Next.js-сайтов через Codex. После установки Codex сам определяет текущую стадию проекта, выбирает подходящий узкий промпт и ведёт работу маленькими проверяемыми шагами.

Главный принцип: один промпт - один этап или один небольшой фрагмент работы. Codex не должен одновременно исследовать нишу, проектировать дизайн-систему, верстать всю страницу и проверять продакшен. Чем уже задача, тем проще проверить результат и тем меньше риск расфокуса.

## Что даёт Web Kit

- Сам выбирает следующий маленький шаг по реальному состоянию проекта.
- Сохраняет решения в документах, чтобы контекст не терялся между сессиями.
- Ведёт от брифа и структуры до дизайна, Next.js, поблочной сборки и проверки.
- Добавляет отдельные контуры для интернет-магазина, деплоя и базового technical SEO.
- Проверяет качество интерфейса, текста, адаптива и визуальной цельности, а не только наличие кода.
- Обновляется из GitHub Release фразой `обнови базу`, не трогая Git и пользовательские файлы проекта.

## Быстрый старт

1. После оплаты передай владельцу payment email для учёта подписки и отдельный GitHub username для фактического repository access. Прими приглашение этой учётной записью.
2. Один раз войди в GitHub CLI через браузер: `gh auth login --hostname github.com --web`. Не отправляй Codex token, пароль, ключ или вывод `gh auth token`.
3. До скачивания проверь, что release имеет действительную подписанную GitHub attestation:

   ```bash
   gh release verify vX.Y.Z --repo ORG/web-kit --format json
   ```

4. Скачай все три official assets из private Release; точное `ORG/repository` приходит вместе с приглашением:

   ```bash
   gh release download vX.Y.Z --repo ORG/web-kit \
     --dir /downloads/web-kit-vX.Y.Z
   ```

5. До распаковки и запуска любого кода сверь локальные TAR.GZ и `SHA256SUMS` с подписанной release attestation, затем проверь обе контрольные суммы из файла. Если хотя бы одна проверка не прошла, ничего не распаковывай и не запускай:

   ```bash
   gh release verify-asset vX.Y.Z \
     /downloads/web-kit-vX.Y.Z/web-kit-vX.Y.Z.tar.gz \
     --repo ORG/web-kit --format json
   gh release verify-asset vX.Y.Z \
     /downloads/web-kit-vX.Y.Z/SHA256SUMS \
     --repo ORG/web-kit --format json
   cd /downloads/web-kit-vX.Y.Z && sha256sum --check SHA256SUMS
   ```

6. Только после этих внешних проверок распакуй TAR.GZ во временную папку и запусти installer из уже проверенного payload:

   ```bash
   node /tmp/web-kit-vX.Y.Z/.prompt-kit/update.mjs install \
     --project /path/to/your-project \
     --archive /downloads/web-kit-vX.Y.Z/web-kit-vX.Y.Z.tar.gz \
     --checksum-file /downloads/web-kit-vX.Y.Z/SHA256SUMS
   ```

   Installer сначала проверит checksum, manifest и конфликты. Не клонируй source-репозиторий внутрь сайта и не накладывай архив на проект вручную.
7. Напиши Codex обычную задачу: например, "разберись, что за проект", "сделай бриф", "спланируй главную", "сверстай hero".
8. Codex должен прочитать `prompts/ROUTER.md`, `prompts/INDEX.md` и `docs/project-state.md`, если он есть.
9. Codex определит стадию, предложит 1 основной промпт и максимум 1 вспомогательный.
10. Для крупных переходов Codex сначала спросит подтверждение.
11. После значимого шага Codex обновит `docs/project-state.md`.
12. В каждом ответе Codex сначала объяснит простыми словами, что произошло, зачем это нужно и требуется ли что-то от пользователя.
13. В конце ответа Codex назовёт следующий шаг обычным языком, даст короткую команду для продолжения и отдельно покажет служебный путь к prompt.

Если в проекте уже есть собственный `AGENTS.md`, не накладывай package вручную. Попроси Codex установить release безопасно: он сохранит локальные правила и при необходимости сначала выполнит migration managed-блока.

## Как Codex объясняет результат

Внутренняя работа может оставаться технической, но сообщение человеку оформляется по `prompts/_knowledge/codex-user-response-quality.md`. По умолчанию ответ должен быть понятен умному семикласснику без опыта веб-разработки и отвечать на три вопроса: что сделано, зачем это важно и что делать дальше.

Пути к файлам, команды, статусы проверок и названия стадий не исчезают. Они идут после понятного итога как служебные подробности. Если от пользователя ничего не требуется, Codex говорит об этом прямо.

## Ручной порядок стадий

Если нужно пройти процесс вручную, порядок такой:

1. `prompts/00-intake-brief/` - материалы, транскрибация, факты, интервью, конкуренты, финальный project brief.
2. `prompts/01-project-rules/` - `AGENTS.md` и базовая документация проекта.
3. `prompts/02-project-strategy/` - стратегия, аудитория и оффер.
4. `prompts/03-research/` и `prompts/04-information-architecture/` - исследование, структура страниц и контент.
5. `prompts/05-design-system/` - референсы, гипотезы из предмета и материалов проекта, несколько дешёвых low-fi проб, один выбранный HTML/CSS concept, approved direction, компактный Visual North Star, stable/provisional vocabulary, Unified Design Canvas, Native Responsive First Paint, iconography, токены, layout, компоненты и accessibility.
6. `prompts/06-nextjs-setup/` - preflight, scaffold, server-first App Router, CSS-first responsive styling и tooling Next.js.
7. `prompts/07-page-planning/` - scope страницы, page spec, референсы, content/SEO, block specs и block content preview перед кодом.
8. `prompts/08-block-build/` - поблочная реализация после согласования текста и общего visual intent: Codex свободно выбирает композицию внутри Visual North Star, затем обязательно проверяет результат глазами по mobile/reference-desktop/wide screenshots; deep mode только по риску.
9. `prompts/09-quality/` - быстрый smoke-check по умолчанию, fresh-load first-frame проверка и полный QA только для сложных/проблемных блоков.
10. `prompts/10-handoff/` - scope handoff, final review, summary и следующий prompt.
11. `prompts/11-ecommerce/` - optional коммерческий слой до page planning каталога, PDP, корзины и checkout.
12. `prompts/12-deployment/` + `prompts/13-technical-seo/` - optional production flow: server/env/domain, pre-deploy SEO gate, deploy, live SEO verification, monitoring и handoff.

## Что устанавливается в проект

Release package содержит:

- `AGENTS.md` с managed router-блоком;
- распространяемую библиотеку `prompts/`;
- `.prompt-kit/manifest.json` с установленной версией и baseline hashes;
- `.prompt-kit/VERSION.md`, `.prompt-kit/CHANGELOG.md` и `.prompt-kit/MIGRATIONS.md`;
- `.prompt-kit/TERMS.md` с закрытыми условиями использования;
- schema manifest и локальный `.prompt-kit/update.mjs` для безопасного download/preflight/apply.

`AGENTS.md` является router-инструкцией. Правила конкретного сайта добавляются в `Project-specific context` снаружи managed-блока или в `docs/project-rules.md`.

Корневые `README.md`, `CHANGELOG.md` и `MIGRATIONS.md` в рабочем проекте принадлежат самому сайту. Одноимённые source-документы Web Kit используются для GitHub и при сборке маппятся в `.prompt-kit/`, а не копируются поверх пользовательских файлов.

Папка `prompts/_templates/` уже содержит шаблоны. Отдельная корневая `templates/` в release не входит.

## Обновление одной фразой

В проекте с установленным Web Kit напиши Codex: `обнови базу`.

Codex через browser-authenticated GitHub CLI проверит последний stable release в private Organization repository, сверит embedded numeric repository ID, потребует `immutable: true`, проверит подписанную release attestation и локальные assets, сравнит версии, сделает backup и обновит только файлы kit. Полный проход всегда идёт в порядке:

1. `prompts/_maintenance/01-update-prompt-kit.md` — preflight и безопасная транзакция;
2. `prompts/_maintenance/02-check-kit-integrity.md` — проверка результата;
3. `prompts/_maintenance/04-align-project-after-kit-update.md` — совместимость нового workflow с текущим состоянием проекта.

Updater не запрашивает и не выводит token, не вызывает `gh auth token` и не использует `GH_TOKEN`, `GITHUB_TOKEN`, `GITHUB_PAT` или `PAT` как запасной транспорт. GitHub CLI хранит данные сессии вне проекта; конкретный способ хранения зависит от системы и настройки самого `gh`.

`AGENTS.md` меняется только внутри `PROMPT_KIT:BEGIN` / `PROMPT_KIT:END`. Проектные docs, `src/`, материалы пользователя и `prompts/_local/` сохраняются. Локально изменённый kit-файл не затирается автоматически: обновление останавливается с понятным conflict report.

Новый `.prompt-kit/manifest.json` записывается последним. Если проверка не проходит, версия не считается установленной и доступен rollback.

Web Kit не вмешивается в Git проекта: не делает `git pull`, commit или push, не меняет `origin` и не создаёт второй `.git`. Изменения остаются обычным diff в репозитории пользователя.

Rename или transfer того же repository не ломает trust: GitHub redirect приводит к canonical full name, после чего updater проверяет неизменный embedded numeric ID, private status и Organization owner. Новый repository ID требует отдельной trusted migration. Старое `owner/name` нельзя занимать другим repository до доставки подписчикам updater с новым bootstrap slug; при несовпадении ID обновление безопасно остановится.

После отмены подписки доступ к repository и будущим releases закрывается, но версии, законно скачанные во время активной подписки, можно продолжать использовать и изменять в собственных и клиентских проектах по `.prompt-kit/TERMS.md`. Распространять standalone kit, release archives, credentials или канал обновлений нельзя.

Подробный контракт: [docs/release-and-update.md](docs/release-and-update.md). Правила владения: [prompts/OWNERSHIP.md](prompts/OWNERSHIP.md).

## Выпуск новой версии

Maintainer исходного репозитория использует `prompts/_maintenance/05-release-prompt-kit.md`. Этот flow проверяет version/changelog/migrations/TERMS, private Organization identity, numeric repository ID и обязательную настройку immutable releases, строит payload строго по allowlist, генерирует exact manifest, архивы и `SHA256SUMS`, затем создаёт draft, прикрепляет все assets и только после этого публикует private GitHub Release. Готовый release обязан иметь `immutable: true` и действительную подписанную attestation. Для workflow настраивается отдельный GitHub App только для этого repository с `Administration: read` и `Contents: write`; его client ID хранится в Actions variable `WEB_KIT_RELEASE_APP_CLIENT_ID`, private key — в secret `WEB_KIT_RELEASE_APP_PRIVATE_KEY`, а job получает только короткоживущий installation token.

Публикация не выполняется без явного подтверждения. Release authoring относится к самому Web Kit и не является деплоем пользовательского сайта.

## Базовый стек

По умолчанию промпты рассчитаны на сайты на Next.js:

- App Router;
- TypeScript;
- папка `src/`;
- компонентная структура;
- дизайн-система через токены и переиспользуемые UI-компоненты;
- проверки lint, typecheck, build и браузерная визуальная проверка.

## Важное ограничение

Не проси Codex сверстать целую страницу одним запросом. Структуру страницы можно планировать целиком, но верстку лучше делать по одному блоку.

Для обычных блоков используй короткую цепочку: сначала `prompts/07-page-planning/07-block-content-preview.md`, если в блоке есть публичный текст или важная смысловая подача, затем `prompts/08-block-build/00-build-block-fast-lane.md`. Preview утверждает смысл, факты, claims, voice и CTA intent, но не замораживает точные переносы и layout. Формула и альтернативы нужны только при реальном смысловом выборе. Fast lane работает как `creator → live render → critic до трёх findings → один self-fix`; для сложного блока остаётся deep mode.

Для выразительных marketing-задач можно явно выбрать оригинальный `gpt-taste` без изменения его `SKILL.md`. Есть три режима: `page` для полноценного disposable concept, `block` для одной секции и `component` для самостоятельного компонента со specimen. Style hypothesis или spec фиксирует engine/mode, поэтому page идёт через `05-design-system/03`, page-bound block/component — через planning и `08-block-build/00-gpt-taste-creative-build.md`, а прямой standalone component сначала получает компактный `07-page-planning/00-gpt-taste-component-spec.md` без фиктивной страницы. После approval continuity profile сохраняет утверждённую идентичность и оставляет случайность только для открытых решений.

Для новой SEO-статьи, поста в блог, guide, comparison, listicle, review, pillar article или FAQ-материала есть отдельный cross-cutting route `prompts/_content/01-write-seo-article.md`. Он явно вызывает неизменённый внешний `$seo-content-writer`, закреплённый на самостоятельной версии `v9.9.12`, и не меняет текущую стадию сайта. Короткие тексты hero, CTA, карточек, форм и обычных блоков получают лёгкий слой его полезных принципов через собственный `site-copy-quality.md`, без полного article workflow и нового этапа.

Чтобы поблочная разработка не превращала страницу в набор разных сайтов или одинаковых секций, используй `prompts/_guidelines/page-composition-rhythm.md`. Marketing-композицию можно смотреть главой из `2–4` соседних блоков, не расширяя scope product data, forms, checkout и business logic. После первых `2–3` живых блоков provisional приёмы получают решение `promote / refine / remove`; затем остаются короткие page-level rhythm checks.

Для практического качества UI используй `prompts/_knowledge/ui-design-quality.md`. Это большая reference-base, а не обязательный учебник перед первым рисунком. Creator просматривает карту разделов и активирует только `4–6` правил для текущей задачи. После live render critic может использовать полную базу, а полный `UI quality check` относится к quality stage. Так знания сохраняются, но не заставляют первый вариант одновременно удовлетворять сотням пожеланий.

`docs/design-system/layout-rules.md` хранит Desktop Canvas Contract: reference viewport `1440 CSS px`, canvas roles/caps, stable invariants и expansion zones. Concept/fast sanity смотрит mobile, `1440` и wide `>=2560 CSS px`; полная design-system/quality/handoff проверка использует `1440 / 1920 / 2560`, а `3840` — для true-4K/full-bleed/ultrawide target или с reasoned skip. На wide screen растёт внешняя stage, фон или объявленная media-zone, а не текст, формы, cards, controls и core gaps.

Там же хранится First-render Responsive Delivery Contract. Сервер отдаёт устойчивую структуру, CSS выбирает основную геометрию до первого кадра, а JavaScript не перестраивает canvas после mount. Media заранее резервирует место и получает responsive source под фактическую rendered width; browser QA задаёт viewport до fresh reload и сравнивает early frame с settled state.

Для современного визуального направления используй `prompts/_knowledge/contemporary-visual-direction.md`. До render creator выбирает один primary expressive lever, при необходимости один secondary lever и честный набор реальных assets. Фактические media/icon/motion решения и currentness фиксируются коротко уже после render, когда их можно увидеть, а не предсказать таблицей.

После approval design concept создавай `docs/design-system/visual-north-star.md` по `prompts/_templates/visual-north-star-template.md`. Это короткий общий ориентир: approved screenshots/live preview, 3-5 positive anchors, visual quality target, creative freedom и максимум три настоящие hard boundaries. Он не требует заранее согласовывать HTML каждого блока.

Для visible marketing block fast lane обязан открыть live UI, задать viewport до fresh reload и реально просмотреть первый/settled кадр на mobile, `1440 CSS px` и wide `>=2560 CSS px`. Сохранить PNG недостаточно: Codex сравнивает блок с Visual North Star, обоими canvas/delivery contracts, approved concept/Hero и соседями, исправляет visual drift, wide stretch или post-mount canvas correction и повторяет проверку до handoff.

## Важное про дизайн

Дизайн-система теперь не начинается с абстрактных токенов или каталога модных стилей. Сначала Codex выводит гипотезы из предмета, процесса, материалов и реальных assets проекта; style library остаётся fallback. Он может дёшево проверить до трёх low-fi sketches или DOM/CSS probes, выбирает лучший и собирает один disposable high-fidelity concept: native в `design-lab/design-concepts/` или gpt-taste page mode в `design-lab/gpt-taste/page/`.

Пользователю по умолчанию показывается один сильный concept, а не три почти готовых сайта. Если пользователь полностью отвергает стиль, следующий проход берёт другую гипотезу; partial feedback уточняет текущую. После approval brand, core type/color/action semantics, accessibility и product patterns становятся stable foundation, а marketing composition, media treatment, texture и motion могут временно оставаться provisional.

Concept строится по короткому positive creator brief с реальными materials и максимум тремя настоящими hard boundaries. После render Codex записывает фактический media/asset treatment, temporary icon/pictogram direction и motion intent либо короткий reasoned skip. Он не выдумывает proof и не маскирует отсутствующие материалы декоративным mockup.

Это нужно, чтобы пользователь видел стиль глазами до реализации сайта. Preview не является production-кодом и не должен попадать в `src/`.

Concept preview нужно открывать как живую HTML/CSS страницу:

- в Codex desktop/app - в in-app Browser справа, если он доступен;
- вне Codex - в обычном системном браузере;
- screenshots можно сохранить для QA, но не использовать как основной способ согласования дизайна.

После утверждения направления Codex должен подобрать icon pack через `prompts/05-design-system/07-iconography-system.md`: сравнить 2-4 варианта, выбрать основной набор, зафиксировать правила размеров, stroke/fill, цвета, icon-only controls, pictogram/large-symbol rules и Next.js install notes. Иконки не выбираются случайно на этапе верстки блока, а temporary direction из concept stage либо принимается, либо осознанно пересматривается.

Layout rules должны также фиксировать ритм страницы: какие секции спокойные, какие expressive, где уместны media/proof/CTA blocks, сколько раз можно повторять dark panels, numbered rows, card grids и artifact/mock UI. Новые цвета, radius, shadow, font roles и icon libraries нельзя добавлять внутри одного блока без обновления дизайн-системы.

Design-system review выполняет полный строгий pass уже после живого concept: visual hierarchy, semantic/accessibility foundation, canvas/delivery contracts, components, states и responsive. Provisional expressive vocabulary не блокирует `Design ready`, если есть checkpoint после `2–3` живых marketing-блоков.

## Важное про AI-slop и текст

Для дизайна и текстов используй `prompts/_guidelines/anti-ai-slop-design-and-copy.md`. До render creator берёт из него только релевантные критерии; после render critic использует документ как reference. Он фиксирует два принципа:

- выразительный приём оценивается по роли — functional, narrative, emotional, brand или atmospheric; бесцельный декор является finding, но gradients, cards, glass, texture, illustration или motion не запрещены по названию;
- текст в обычных блоках должен быть коротким и конкретным: смысл, факт, ограничение, CTA; без пустых фраз, штампов и длинных абзацев там, где блок не рассчитан на чтение.

В стратегии создаётся `docs/content/editorial-rules.md`, а перед реализацией смыслового блока Codex показывает `block-content-preview`: смысл, факты, claims, voice, CTA intent, рабочий текст и короткий visual intent. Формулы — diagnostic fallback, альтернативы — только при настоящем выборе. Перед approval текст проходит pain-first human check; точные line breaks и композиция остаются свободными до live render.

Для качества текста используется собственный стандарт `prompts/_knowledge/site-copy-quality.md`: прямой ответ идёт до убеждения, body выполняет обещание heading, material claims получают опору, конкретные сущности заменяют общие слова, CTA соответствует готовности человека, а блок получает смысловое завершение. Обычный текст проходит короткий `Site copy fast pass` внутри текущего шага; полный чек остаётся длинному, критичному или рискованному copy.

Для базового technical SEO используется `prompts/_knowledge/technical-seo-baseline.md`. Это не keyword research и не продвижение: стандарт проверяет indexability routes, title/description, H1-H6, canonical, robots/noindex, `robots.txt`, `sitemap.xml`, JSON-LD, crawlable links, alt, status codes, redirects и production host. Он применяется дважды: перед deploy и после запуска на реальном домене.

## Дополнение для деплоя

Если нужно разместить сайт на сервере, настроить SSH, домен, SSL или production deploy, используй `prompts/12-deployment/`.

Рекомендуемый порядок:

1. `prompts/12-deployment/01-deployment-brief.md` - понять target, readiness и риски.
2. `prompts/12-deployment/02-server-access-and-ssh.md` - настроить SSH-доступ.
3. `prompts/12-deployment/03-server-baseline-security.md` - выполнить базовую безопасную настройку сервера.
4. `prompts/12-deployment/04-runtime-and-hosting-strategy.md` - выбрать production runtime.
5. `prompts/12-deployment/05-env-and-secrets.md` - подготовить env/secrets без раскрытия значений.
6. `prompts/12-deployment/06-domain-dns-ssl.md` - настроить домен, DNS и SSL.
7. `prompts/13-technical-seo/01-pre-deploy-technical-seo.md` - реализовать и проверить technical SEO baseline до deploy.
8. `prompts/12-deployment/07-deploy-nextjs-app.md` - задеплоить приложение.
9. `prompts/12-deployment/08-process-manager-and-reverse-proxy.md` - настроить process manager и reverse proxy.
10. `prompts/12-deployment/09-post-deploy-verification.md` - проверить production URL и critical flows.
11. `prompts/13-technical-seo/02-production-seo-verification.md` - проверить live robots, sitemap, metadata, schema, statuses и webmaster actions.
12. `prompts/12-deployment/10-monitoring-backup-rollback.md` - зафиксировать monitoring, backup и rollback.
13. `prompts/12-deployment/11-deployment-handoff.md` - подготовить итог по деплою.

Если пользователь передал root-пароль для первичной настройки, Codex не должен сохранять его в docs и должен явно напомнить: `Обязательно смените root-пароль после этих действий`.

## Документы

- `docs/workflow.md` - полный процесс создания сайта.
- `docs/prompt-anatomy.md` - единая структура промпта.
- `docs/website-stages.md` - этапы сайта и связанные папки промптов.
- `docs/prompt-status.md` - статус промптов: готово, нужно протестировать, не доделано.
- `docs/release-and-update.md` - устройство GitHub Releases, установленного manifest и безопасного обновления одной фразой.
- `prompts/ROUTER.md` - правила автоматического выбора стадии и промпта.
- `prompts/INDEX.md` - индекс всех стадий и промптов.
- `prompts/STATE.md` - шаблон `docs/project-state.md`.
- `prompts/_knowledge/site-copy-quality.md` - стандарт качества пользовательского текста с быстрым обязательным контрактом для лендингового copy, UI labels, form states, product/e-commerce copy и SEO snippets.
- `prompts/_guidelines/creator-critic-design-workflow.md` - короткий Sol-friendly цикл, Design context diet и граница между творческим проходом и строгой проверкой.
- `prompts/_knowledge/ui-design-quality.md` - выборочная creator-reference и полная critic/quality база с Unified Design Canvas, Native Responsive First Paint и before/after examples.
- `prompts/_knowledge/contemporary-visual-direction.md` - visual event, expressive levers, asset truth и post-render media/icon/motion/currentness review.
- `prompts/_knowledge/technical-seo-baseline.md` - стандарт базового technical SEO до и после production deploy.
- `docs/prompt-kit-workflow-alignment.md` - создаётся в рабочем проекте после обновления kit и объясняет, как новая версия workflow соотносится с текущим состоянием проекта.

## Источники подхода

- Codex best practices: https://developers.openai.com/codex/learn/best-practices
- Codex prompting: https://developers.openai.com/codex/prompting
- Codex AGENTS.md: https://developers.openai.com/codex/guides/agents-md
- OpenAI prompt engineering: https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-openai-api
- Next.js project structure: https://nextjs.org/docs/app/getting-started/project-structure
- Material Design tokens: https://m3.material.io/foundations/design-tokens
- NN/g visual design principles: https://www.nngroup.com/articles/principles-visual-design/
- NN/g icon usability: https://www.nngroup.com/articles/icon-usability/
- Atlassian design tokens: https://atlassian.design/tokens/design-tokens
- Atlassian iconography: https://atlassian.design/foundations/iconography/
- IBM Carbon pictograms: https://carbondesignsystem.com/elements/pictograms/overview/
- IBM Carbon typography: https://carbondesignsystem.com/elements/typography/overview/
- Shopify Polaris design: https://polaris-react.shopify.com/design

## Дополнение для интернет-магазинов

Для интернет-магазинов обычной структуры сайта недостаточно. Перед page planning и версткой каталога, PLP, карточек товара, PDP, корзины и checkout нужно отдельно пройти промпты из `prompts/11-ecommerce/` и получить `docs/ecommerce/ecommerce-review.md`.

Рекомендуемый порядок:

1. `prompts/11-ecommerce/01-ecommerce-brief.md` - собрать e-commerce вводные.
2. `prompts/11-ecommerce/02-product-data-model.md` - описать поля товаров, варианты, цены, остатки и медиа.
3. `prompts/11-ecommerce/03-catalog-architecture.md` - спроектировать каталог, категории, URL и SEO-посадки.
4. `prompts/11-ecommerce/04-category-plp-spec.md` - описать category/PLP страницу.
5. `prompts/11-ecommerce/05-product-card-spec.md` - описать карточку товара в списках.
6. `prompts/11-ecommerce/06-pdp-spec.md` - описать product detail page.
7. `prompts/11-ecommerce/07-filters-search-sorting.md` - описать фильтры, поиск, сортировку и empty states.
8. `prompts/11-ecommerce/08-commercial-rules.md` - зафиксировать оплату, доставку, возвраты, налоги, акции и юридические ограничения.
9. `prompts/11-ecommerce/09-cart-spec.md` - спроектировать корзину.
10. `prompts/11-ecommerce/10-checkout-flow-spec.md` - спроектировать checkout flow.
11. `prompts/11-ecommerce/11-account-orders-analytics.md` - описать аккаунт, заказы, уведомления, аналитику и consent.
12. `prompts/11-ecommerce/12-ecommerce-review.md` - проверить слой и выбрать первую e-commerce страницу для общего pipeline.

После этого e-commerce страницы возвращаются в общий процесс: page scope -> page spec -> content/SEO -> block breakdown -> реализация одного блока -> проверка.
