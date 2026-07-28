# Router Prompt Kit

Этот файл помогает Codex выбрать следующий промпт по текущему состоянию проекта.

## Диагностика перед выбором

Проверь:

- есть ли `docs/project-state.md`;
- есть ли `project-brief.md`;
- есть ли `AGENTS.md` и раздел `Project-specific context`;
- есть ли `README.md` и `docs/`;
- есть ли sitemap, page specs, block specs, design system docs;
- есть ли design concept artifacts: `docs/design-system/concepts/style-shortlist.md`, `design-lab/design-concepts/index.html`, `design-lab/gpt-taste/page/`, `docs/design-system/concepts/concept-feedback.md`, `docs/design-system/concepts/approved-concept.md`;
- выбран ли `Creator engine: gpt-taste`, какой mode (`page / block / component`), доступен ли original skill с pinned SHA-256 и есть ли `docs/design-system/gpt-taste-profile.md`;
- есть ли `docs/design-system/visual-north-star.md` с approved visual evidence, continuity anchors и creative freedom;
- есть ли `docs/design-system/iconography.md`;
- есть ли в `docs/design-system/layout-rules.md` Desktop Canvas Contract и First-render Responsive Delivery Contract: reference CSS viewport, canvas roles/caps, stable invariants, expansion zones, CSS-first initial geometry, hydration invariant и wide-screen matrix;
- есть ли `package.json`, `next.config.*`, `src/app`;
- просит ли пользователь новую SEO-статью, пост в блог, guide, comparison, listicle, review, pillar article или FAQ-материал под поисковый запрос;
- есть ли признаки интернет-магазина: товары, каталог, корзина, checkout, оплата, доставка;
- есть ли deployment intent: сервер, VPS, SSH, IP, root-доступ, домен, DNS, SSL, production deploy.
- есть ли `docs/seo/pre-deploy-technical-seo.md` и `docs/seo/production-seo-verification.md`, если сайт готовится к production или уже задеплоен.

Если пользователь пишет `обнови базу`, просит обновить Prompt Kit, перенести новую версию kit или безопасно заменить промпты, не используй website stages. Выбери maintenance flow:

- `prompts/_maintenance/01-update-prompt-kit.md` - через browser-authenticated GitHub CLI проверить публичный official Release и выполнить безопасную транзакцию;
- `prompts/_maintenance/03-migrate-agents-md.md` - если `AGENTS.md` без корректного managed-блока;
- `prompts/_maintenance/02-check-kit-integrity.md` - обязательная проверка применённого release;
- `prompts/_maintenance/04-align-project-after-kit-update.md` - обязательный post-update alignment без отката проекта.

Если maintainer исходного repository Web Kit просит подготовить новую версию, tag, release assets или GitHub Release, используй `prompts/_maintenance/05-release-prompt-kit.md`. Не путай выпуск самого Prompt Kit с production release пользовательского сайта.

После проверки назови:

- где проект находится сейчас — обычными словами;
- что уже готово;
- чего не хватает для текущей задачи;
- что предлагается сделать и зачем;
- внутреннюю стадию, уверенность и путь к промпту — отдельной служебной строкой.

## Как применять выбранный промпт

После выбора промпта:

1. Открой выбранный `.md` файл полностью.
2. Проверь, что задача действительно соответствует разделу `Когда использовать`.
3. Собери контекст из раздела `Контекст, который нужно дать`.
4. Перед любым сообщением, которое увидит человек, прочитай `prompts/_knowledge/codex-user-response-quality.md` и переведи технический результат на обычный язык.
5. Если задача создаёт новую композицию или заметно меняет visible UI, прочитай компактный `prompts/_guidelines/creator-critic-design-workflow.md` и начни в режиме `creator`.
6. Если active hypothesis/spec явно выбирает `Creator engine: gpt-taste`, полностью прочитай `prompts/_guidelines/gpt-taste-integration.md` и original `gpt-taste/SKILL.md`, проверь pinned SHA-256 и явно вызови `$gpt-taste`. Не полагайся на implicit invocation.
7. Для creator собери Design context diet: outcome, real copy/data, Visual North Star, approved screenshots/live concept, реальные assets, применимые design-system contracts и 4–6 релевантных правил. Полные UI/copy/anti-slop/contemporary/page-rhythm базы до первого render не загружай.
8. После live render перейди в режим `critic`: сначала оцени screenshots, затем используй полные релевантные базы как reference. Верни максимум три главных visual findings. Для native сделай один связный self-fix; для gpt-taste передай findings обратно `$gpt-taste` и примени его correction. Затем повторно посмотри render.
9. Полные `UI quality check`, `Site copy check`, accessibility, responsive matrix и technical checks запускай на quality stage или когда пользователь явно запросил полный audit.
10. Для новой SEO-статьи или другого длинного материала под поисковый запрос используй `prompts/_content/01-write-seo-article.md`: полностью прочитай `prompts/_guidelines/seo-content-writer-integration.md`, установленный `seo-content-writer/SKILL.md` и четыре локальных reference-файла, проверь pinned SHA-256 и явно вызови `$seo-content-writer`. Этот cross-cutting route сохраняет текущую website stage. Для остальных чистых copy-задач без UI-creator pass используй короткий обязательный контракт и `Site copy fast pass` из `prompts/_knowledge/site-copy-quality.md`; полный check оставляй длинному, критичному или рискованному тексту. Для hero/offer/CTA используй `prompts/_guidelines/landing-copy-formulas.md` как diagnostic fallback, если прямой fact-backed текст не складывается. Ответы самого Codex регулирует `codex-user-response-quality.md`.
11. Для локальной UI-правки без новой композиции выбери релевантные разделы `prompts/_knowledge/ui-design-quality.md`, сохрани существующий visual direction и проверь затронутый render.
12. Для visible UI извлеки из `layout-rules.md` применимые части Desktop Canvas Contract и First-render Responsive Delivery Contract. Concept и fast build делают sanity pass на mobile + `1440` + wide guard `>=2560 CSS px`; viewport задаётся до navigation/reload, а первый кадр сравнивается с settled state. Полная design-system/quality/handoff проверка использует `1440 / 1920 / 2560 CSS px`, а `3840 CSS px` — для true-4K/full-bleed/ultrawide target или с reasoned skip. `window.innerWidth` разрешён как QA evidence, но не как источник initial layout.
13. Technical SEO trigger не меняется: для metadata, heading hierarchy, canonical, index/noindex, `robots.txt`, `sitemap.xml`, structured data, crawlability, status codes, redirects и webmaster verification прочитай `prompts/_knowledge/technical-seo-baseline.md` полностью.
14. Соблюдай scope, permissions, truth, safety и accessibility; визуальные предпочтения из knowledge bases трактуй как критерии, а не абсолютные запреты.
15. Выполни только текущий prompt-step и создай output в указанном формате.
16. Помни: раздел `Output` задаёт содержание артефакта, но не отменяет понятный формат сообщения пользователю. Технические поля из артефакта сначала объясни человеческим языком.
17. Проверь `Done when`.
18. Обнови `docs/project-state.md`.
19. Назови следующий prompt из `Follow-up`.
20. Заверши ответ понятным блоком `Следующий шаг`, где действие названо обычными словами, а путь к prompt вынесен в служебную строку.

Если задача требует нескольких промптов, составь короткий маршрут, но не выполняй несколько крупных шагов за один заход. Максимум: 1 основной промпт и 1 вспомогательный, если без него нельзя корректно завершить текущий шаг.

## Design context diet

Для visible UI сначала выбери режим:

- `creator` — новая композиция или заметный redesign;
- `critic` — live UI/screenshots уже существуют;
- `quality` — нужен полный compliance и технический verdict;
- `local fix` — композиция не меняется, исправляется узкий дефект.

Creator brief остаётся коротким и outcome-first. В него входят Visual North Star, approved visual evidence, реальные assets, применимая часть Desktop Canvas Contract, creative freedom, до трёх настоящих hard boundaries и 4–6 правил именно для текущей задачи. `ALWAYS`/`NEVER` и абсолютные русские аналоги оставляй только для truth, permissions, safety, secrets и accessibility.

Сохраняй stable vocabulary — brand identity, core type/color/action semantics, accessibility и product interaction patterns. Marketing composition, media treatment, texture, section transition и motion могут быть provisional choices до critic. Для page rhythm creator может смотреть visual chapter из 2–4 соседних marketing-блоков, но product data, forms, checkout, pricing rules и business logic остаются block-scoped. После первых 2–3 живых marketing-блоков route должен привести к page-level calibration с решением `promote / refine / remove` для provisional vocabulary.

После render critic может читать полные knowledge bases, но сообщает максимум три главных visual findings и выполняет один связный self-fix. Полная compliance-таблица остаётся quality stage. Чистые copy, SEO, deployment и security задачи продолжают использовать свои полные профильные стандарты — Design context diet их не ослабляет.

## Три режима gpt-taste

`gpt-taste` — explicit creator engine, а не отдельная стадия:

- `page` — полноценный disposable page concept через `prompts/05-design-system/03-design-concept-prototypes.md`;
- `block` — одна visible marketing/editorial секция через `prompts/08-block-build/00-gpt-taste-creative-build.md`;
- `component` — один standalone expressive marketing component со specimen harness через тот же build prompt.

Если standalone component ещё не имеет spec, сначала используй `prompts/07-page-planning/00-gpt-taste-component-spec.md`; этот путь не требует выдумывать страницу.

Во всех трёх режимах original `SKILL.md` читается полностью и не изменяется. Scope ограничивает deliverable, поэтому block/component не синтезируют page shell. Approved `docs/design-system/gpt-taste-profile.md` удерживает identity и seed между проходами; RNG остаётся только для open choices.

Автоматически не выбирай gpt-taste для product/business UI, dashboard, checkout, forms, data, local fix, copy-only, quality, SEO, deployment или maintenance. Явная просьба пользователя может выбрать skill, но не отменяет truth/accessibility/security/business-logic gates.

## SEO-статьи через seo-content-writer

`seo-content-writer` — pinned external writing skill для новой статьи, а не новый website stage.

- Автоматический trigger: новая SEO-статья, blog post, how-to guide, comparison, listicle, review, pillar article или FAQ-материал под поисковый запрос.
- Route: `prompts/_content/01-write-seo-article.md`.
- Preflight: integration guideline, полный installed `SKILL.md`, четыре локальных reference-файла и checksum match.
- Upstream skill владеет article structure, keyword placement, snippet/FAQ/link recommendations и CORE-EEAT self-check.
- Prompt Kit владеет project facts, claims, source truth, permissions и местом сохранения результата.
- Main website stage не меняется; в `docs/project-state.md` добавляется только короткая cross-cutting запись.

Не вызывай полный skill автоматически для hero, offer, CTA, cards, labels, forms и обычного block content preview. Page copy использует лёгкий нативный слой полезных принципов через короткий контракт и `Site copy fast pass` в `site-copy-quality.md`; это не требует чтения skill/references, checksum preflight, article research или отдельного approval. Явная просьба пользователя применить `$seo-content-writer` к landing page или product description может переопределить default, но не truth/source gates.

Если skill missing/mismatched, остановись до черновика и предложи установить preserved `v9.9.12` через `$skill-installer`; не делай silent fallback.

## Режимы скорости для блоков

По умолчанию используй `fast`:

- `fast` - обычный native блок: `prompts/08-block-build/00-build-block-fast-lane.md`; явно выбранный gpt-taste block/component: `prompts/08-block-build/00-gpt-taste-creative-build.md`.
- `standard` - fast build + короткий smoke-check `prompts/09-quality/00-block-smoke-check.md`.
- `deep` - старая подробная цепочка `08/01...06` и `09/01...06` для сложных, критичных или проблемных блоков.

Deep mode включай только если:

- блок содержит форму, checkout, auth/account, payment, фильтры/search, сложную анимацию, carousel, canvas/3D, API/data-heavy логику;
- пользователь явно попросил глубокую проверку;
- fast smoke выявил визуальный, runtime, accessibility или responsive риск;
- блок является критичным для конверсии и будет переиспользоваться.

Для explicit `gpt-taste / component` сложная animation/carousel не отменяет выбранный creator engine: сначала `00-gpt-taste-creative-build.md` создаёт visual/interaction direction, затем deep prompt может проверить structure, states, accessibility и runtime. Deep mode не становится native redesign.

Для простой менюшки, hero, текстового блока, карточек, статичной секции, CTA или FAQ не запускай deep mode без причины.

Fast включает creator → render → critic. Для visible marketing block открой live UI, задай mobile/reference-desktop/wide viewport до fresh reload, сравни первый и settled кадр с Visual North Star, обоими canvas/delivery contracts и approved concept, назови максимум три главных findings, сделай один связный self-fix и повторно посмотри render. Отдельный pre-build live preview блока не нужен, если пользователь не запросил его явно.

## Формат завершения шага

После выполненной работы сначала объясни результат, затем покажи продолжение:

```md
Готово: [результат обычными словами]
Зачем это нужно: [польза, снятый риск или новое состояние]
Что нужно от вас: [ничего / одно точное действие]

Следующий шаг: [человеческое название действия или результата]
Зачем: [1 короткая причина]
Чтобы продолжить, напишите: "[естественная короткая команда пользователя]"

Служебно для Codex: `[path к следующему prompt]`.
```

Правила:

- следующий шаг бери из `Follow-up` выполненного промпта и сверяй с decision tree;
- если следующий шаг крупный, не начинай его без подтверждения;
- если следующий шаг локальный и пользователь уже попросил цепочку, можно продолжить только в рамках одного prompt-step;
- если нужно подтверждение, скажи обычной фразой, что начнёшь после ответа пользователя;
- если следующего шага нет, напиши `Следующий шаг: ничего — задача завершена` и не добавляй команду;
- `docs/project-state.md` должен содержать тот же recommended next prompt.

## Обновление Prompt Kit

Update flow не является стадией сайта. Фраза `обнови базу` уже разрешает обычное совместимое обновление; дополнительный путь к папке или повторное подтверждение не нужны. Подтверждение требуется только для breaking migration, ручного конфликта или trusted migration на новый numeric repository ID.

При обновлении:

- считай `.prompt-kit/manifest.json` canonical installed version и baseline; для legacy-проекта без manifest используй conservative migration, а не угадывай ownership;
- проверь browser-authenticated `gh` session и последний stable immutable release в доверенном repository: bootstrap/last-known slug может пройти GitHub redirect, но canonical source обязан совпасть с embedded numeric ID и принадлежать personal owner `dmandrianov`; private/public visibility сама по себе не меняет trust;
- используй локальный package только если пользователь явно передал verified official archive + matching checksum; не используй случайный archive как обход недоступного trusted source;
- прочитай `.prompt-kit/CHANGELOG.md`, `.prompt-kit/MIGRATIONS.md`, MIT License по compatibility path `.prompt-kit/TERMS.md` и `prompts/OWNERSHIP.md`; корневые release metadata относятся к source-репозиторию kit, а не к пользовательскому проекту;
- не проси token/пароль/ключ, не вызывай `gh auth token` и не сохраняй GitHub credentials в проекте или отчётах;
- до extraction проверь signed release attestation и provenance локальных TAR.GZ/`SHA256SUMS` через `gh release verify-asset`; до записи проверь checksum, incoming manifest, archive paths и полный conflict plan;
- создай backup в `.prompt-kit/backups/YYYY-MM-DD-HHMM/`;
- обновляй только неизменённые kit-owned paths из manifest;
- сохраняй project-owned файлы и seed-only `prompts/_local/`;
- в `AGENTS.md` заменяй только один валидный managed-блок и сохраняй всё снаружи байт-в-байт;
- не выполняй `git pull`, merge, commit, push, remote/submodule setup и не меняй `.git/` пользователя;
- если repository недоступен, остановись до записи: установленная версия остаётся пригодной по приложенным к ней условиям, но future releases нельзя считать проверенными;
- выполняй полную транзакцию `01-update → 02-integrity → 04-alignment`;
- записывай новый `.prompt-kit/manifest.json` последним, только после успешной проверки;
- при failed integrity check делай rollback и не объявляй новую версию установленной;
- не возвращайся к обычному website workflow, пока `docs/prompt-kit-workflow-alignment.md` не создан или пользователь явно не попросил остановиться после отчёта.

Source release flow выполняется отдельно через `prompts/_maintenance/05-release-prompt-kit.md`. Он собирает release assets и готовит публикацию, но не обновляет сайт и не подменяет deployment flow.

## Alignment после обновления kit

Если kit обновился, но проект уже был в работе, не определяй стадию только по отсутствию новых файлов из новой версии. Сначала проверь:

- `docs/prompt-kit-update-summary.md`;
- `docs/prompt-kit-integrity.md`;
- `docs/prompt-kit-workflow-alignment.md`;
- `docs/project-state.md`;
- более поздние артефакты, которые доказывают, что старый workflow уже закрыл смысл нового этапа.

Правила:

- если `docs/prompt-kit-update-summary.md` новее, чем `docs/prompt-kit-workflow-alignment.md`, используй `prompts/_maintenance/04-align-project-after-kit-update.md`;
- не откатывай проект назад из `block-build`, `quality`, `deployment` или `handoff` в design/IA только из-за нового missing artifact;
- если новый этап полезен, но не обязателен, предложи пользователю optional refresh: что улучшит, сколько займет, какой prompt запустить;
- если старый результат явно слабый или конфликтует с новой логикой, предложи recommended rerun, но спроси подтверждение;
- если более поздний review уже есть, можно создать маленький migration artifact вместо полного rerun.

## Decision tree

| Условие | Стадия | Основной промпт |
| --- | --- | --- |
| Пользователь пишет `обнови базу` или просит проверить новую версию Prompt Kit | `maintenance` | `prompts/_maintenance/01-update-prompt-kit.md` |
| Maintainer source-репозитория просит подготовить version/tag/assets/GitHub Release самого Prompt Kit | `maintenance` | `prompts/_maintenance/05-release-prompt-kit.md` |
| Kit обновлен, integrity passed, но нет свежего `docs/prompt-kit-workflow-alignment.md` | `maintenance` | `prompts/_maintenance/04-align-project-after-kit-update.md` |
| Пользователь просит новую SEO-статью, blog post, guide, comparison, listicle, review, pillar article или FAQ-материал под поисковый запрос | текущая стадия сохраняется | `prompts/_content/01-write-seo-article.md` |
| Нет понятных вводных, файлов или brief | `unknown` | `prompts/00-intake-brief/04-run-project-interview.md` |
| Есть видео или аудио, но нет транскрипта | `intake` | `prompts/00-intake-brief/02-transcribe-media.md` |
| Есть материалы, но нет `project-brief.md` | `intake` | `prompts/00-intake-brief/03-extract-project-facts.md` |
| Есть конкуренты, но идеи не отобраны | `intake` | `prompts/00-intake-brief/06-competitor-feature-loop.md` |
| Есть черновик brief, но он не подтверждён | `intake` | `prompts/00-intake-brief/07-finalize-project-brief.md` |
| Есть `project-brief.md`, но в `AGENTS.md` нет `Project-specific context` | `brief-ready` | `prompts/01-project-rules/01-create-agents-md.md` |
| Есть `Project-specific context`, но нет `docs/project-state.md` или базовых docs | `brief-ready` | `prompts/01-project-rules/02-create-project-docs.md` |
| Есть project rules и docs, но нет `docs/strategic-audit.md` | `rules-ready` | `prompts/02-project-strategy/01-client-brief.md` |
| Есть `docs/strategic-audit.md`, но нет `docs/strategy.md` или `docs/messaging.md` | `rules-ready` | `prompts/02-project-strategy/02-goals-audience-offer.md` |
| Есть `docs/strategy.md` и `docs/messaging.md`, но нет `docs/research/competitors.md` | `strategy-ready` | `prompts/03-research/01-discover-competitors-and-sources.md` |
| Есть approved shortlist, но нет competitor analysis | `strategy-ready` | `prompts/03-research/02-competitor-website-analysis.md` |
| Есть `docs/research/competitors.md`, но нет `docs/research/audience-insights.md` | `strategy-ready` | `prompts/03-research/03-reviews-audience-insights.md` |
| Есть audience insights, но нет `docs/research/reference-analysis.md` | `strategy-ready` | `prompts/03-research/04-reference-analysis.md` |
| Есть research docs, но нет `docs/research/research-summary.md` | `strategy-ready` | `prompts/03-research/05-research-synthesis.md` |
| Есть `docs/research/research-summary.md`, но нет `docs/ia/sitemap.md` | `strategy-ready` | `prompts/04-information-architecture/01-sitemap.md` |
| Есть `docs/ia/sitemap.md`, но нет `docs/ia/page-section-map.md` | `strategy-ready` | `prompts/04-information-architecture/02-page-section-map.md` |
| Есть `docs/ia/page-section-map.md`, но нет `docs/ia/content-inventory.md` | `strategy-ready` | `prompts/04-information-architecture/03-content-inventory.md` |
| Есть IA docs, но нет `docs/ia/ia-review.md` | `strategy-ready` | `prompts/04-information-architecture/04-ia-review.md` |
| Пользователь дал visual references или скриншоты до готовой дизайн-системы | `ia-ready` | `prompts/05-design-system/01-visual-reference-principles.md` |
| `docs/ia/ia-review.md` готов и IA ready, есть visual references, но нет `docs/design-system/reference-principles.md` | `ia-ready` | `prompts/05-design-system/01-visual-reference-principles.md` |
| `docs/ia/ia-review.md` готов и IA ready, но нет `docs/design-system/concepts/style-shortlist.md` | `ia-ready` | `prompts/05-design-system/02-design-style-shortlist.md` |
| Есть style shortlist, но нет active native или gpt-taste page concept по выбранному engine | `ia-ready` | `prompts/05-design-system/03-design-concept-prototypes.md` |
| Есть style hypothesis queue и нужно попробовать следующую hypothesis после reject | `ia-ready` | `prompts/05-design-system/03-design-concept-prototypes.md` |
| Есть active visual concept prototype, но нет `docs/design-system/concepts/concept-feedback.md` | `ia-ready` | `prompts/05-design-system/04-design-concept-feedback.md` |
| `concept-feedback.md` содержит `needs iteration` | `ia-ready` | `prompts/05-design-system/05-design-concept-iteration.md` |
| `concept-feedback.md` содержит `rejected, try next hypothesis` | `ia-ready` | `prompts/05-design-system/03-design-concept-prototypes.md` |
| `concept-feedback.md` содержит `approved`, но нет `docs/design-system/concepts/approved-concept.md` или `docs/design-system/design-direction.md` | `ia-ready` | `prompts/05-design-system/06-approve-design-direction.md` |
| Concept/design direction approved, но нет `docs/design-system/visual-north-star.md` | `ia-ready` | `prompts/05-design-system/06-approve-design-direction.md` |
| Пользователь явно попросил пропустить visual concept stage, но нет `docs/design-system/design-direction.md` | `ia-ready` | `prompts/05-design-system/06-approve-design-direction.md` |
| Есть `docs/design-system/design-direction.md` и approved/skip concept, но нет `docs/design-system/iconography.md` | `ia-ready` | `prompts/05-design-system/07-iconography-system.md` |
| Есть `docs/design-system/iconography.md`, но нет `docs/design-system/design-tokens.md` | `ia-ready` | `prompts/05-design-system/08-design-tokens.md` |
| Есть `docs/design-system/design-tokens.md`, но нет `docs/design-system/layout-rules.md` | `ia-ready` | `prompts/05-design-system/09-layout-and-responsive-rules.md` |
| Есть `docs/design-system/layout-rules.md`, но нет `docs/design-system/component-inventory.md` | `ia-ready` | `prompts/05-design-system/10-ui-components.md` |
| Есть `docs/design-system/component-inventory.md`, но нет `docs/design-system/accessibility.md` | `ia-ready` | `prompts/05-design-system/11-accessibility-rules.md` |
| Есть design-system docs, но нет `docs/design-system/design-system-review.md` | `ia-ready` | `prompts/05-design-system/12-design-system-review.md` |
| `docs/design-system/design-system-review.md` готов и Design ready, но нет `docs/nextjs/preflight.md` | `design-ready` | `prompts/06-nextjs-setup/01-project-preflight.md` |
| Есть `docs/nextjs/preflight.md`, но нет `docs/nextjs/scaffold.md` | `design-ready` | `prompts/06-nextjs-setup/02-project-scaffold.md` |
| Есть `docs/nextjs/scaffold.md`, но нет `docs/nextjs/app-router-structure.md` | `design-ready` | `prompts/06-nextjs-setup/03-app-router-structure.md` |
| Есть `docs/nextjs/app-router-structure.md`, но нет `docs/nextjs/styling-integration.md` | `design-ready` | `prompts/06-nextjs-setup/04-styling-and-design-system-integration.md` |
| Есть `docs/nextjs/styling-integration.md`, но нет `docs/nextjs/tooling.md` | `design-ready` | `prompts/06-nextjs-setup/05-tooling-and-quality-scripts.md` |
| Есть Next.js setup docs, но нет `docs/nextjs/next-ready-review.md` | `design-ready` | `prompts/06-nextjs-setup/06-next-ready-review.md` |
| Пользователь просит standalone expressive marketing component с новым visual principle, router выбрал gpt-taste, но component spec ещё нет | `page-planning` | `prompts/07-page-planning/00-gpt-taste-component-spec.md` |
| Standalone gpt-taste component spec ready и content/preflight passed | `block-build` | `prompts/08-block-build/00-gpt-taste-creative-build.md` |
| `docs/nextjs/next-ready-review.md` готов и Next ready, но нет page scope | `next-ready` | `prompts/07-page-planning/01-select-page-and-scope.md` |
| Пользователь просит страницу, но нет page scope | `next-ready` | `prompts/07-page-planning/01-select-page-and-scope.md` |
| Есть page scope, но нет page spec | `page-planning` | `prompts/07-page-planning/02-page-spec.md` |
| Пользователь дал скриншот блока, но нет reference adaptation | `page-planning` | `prompts/07-page-planning/03-adapt-reference-to-block-spec.md` |
| Есть page spec, но нет content/SEO plan | `page-planning` | `prompts/07-page-planning/04-content-and-seo-plan.md` |
| Есть content/SEO plan, но нет block breakdown | `page-planning` | `prompts/07-page-planning/05-block-breakdown.md` |
| Есть block breakdown, но нет page planning review | `page-planning` | `prompts/07-page-planning/06-page-planning-review.md` |
| Page planning review готов и Ready for block build, есть смысловой block spec, но нет утверждённого content preview | `block-build` | `prompts/07-page-planning/07-block-content-preview.md` |
| Пользователь просит обсудить/переделать текст, заголовок, CTA или визуальную идею будущего блока до кода | `block-build` | `prompts/07-page-planning/07-block-content-preview.md` |
| Page planning review готов, spec явно выбирает `gpt-taste` mode `block/component`, content approved или skipped | `block-build` | `prompts/08-block-build/00-gpt-taste-creative-build.md` |
| Page planning review готов, native block spec есть, content preview утверждён или пользователь явно пропустил согласование | `block-build` | `prompts/08-block-build/00-build-block-fast-lane.md` |
| Пользователь просит сверстать страницу целиком, но есть block breakdown | `block-build` | `prompts/07-page-planning/07-block-content-preview.md` |
| Пользователь просит обычный смысловой блок и есть block spec, но нет content preview | `block-build` | `prompts/07-page-planning/07-block-content-preview.md` |
| Пользователь просит gpt-taste block/component, spec и content preview готовы | `block-build` | `prompts/08-block-build/00-gpt-taste-creative-build.md` |
| gpt-taste block/component утверждён пользователем и есть run profile candidate | `block-build` | `prompts/08-block-build/07-approve-gpt-taste-profile.md` |
| Пользователь просит обычный native блок и content preview уже утверждён | `block-build` | `prompts/08-block-build/00-build-block-fast-lane.md` |
| Блок сложный/критичный или пользователь просит deep mode | `block-build` | `prompts/08-block-build/01-block-build-preflight.md` |
| Native build plan есть, но нет structure pass | `block-build` | `prompts/08-block-build/02-build-block-structure.md` |
| Native structure pass готов, но блок не стилизован по дизайн-системе | `block-build` | `prompts/08-block-build/03-style-block-from-design-system.md` |
| Native styling pass готов, но адаптив не проверен | `block-build` | `prompts/08-block-build/04-responsive-pass.md` |
| Native блоку нужен интерактив/states pass, но он не выполнен | `block-build` | `prompts/08-block-build/05-interaction-and-states-pass.md` |
| Native block build passes готовы, но нет build review | `block-build` | `prompts/08-block-build/06-block-build-review.md` |
| Fast build готов, но нужен короткий smoke-check | `quality` | `prompts/09-quality/00-block-smoke-check.md` |
| Block build review готов и Block ready, но нужен deep quality plan | `quality` | `prompts/09-quality/01-quality-preflight.md` |
| Есть quality plan, но нет visual review | `quality` | `prompts/09-quality/02-visual-screenshot-review.md` |
| Есть visual review, но нет accessibility/usability check | `quality` | `prompts/09-quality/03-accessibility-and-usability-check.md` |
| Есть accessibility/usability check, но нет technical checks | `quality` | `prompts/09-quality/04-technical-checks.md` |
| Есть technical checks, но нет browser runtime verification | `quality` | `prompts/09-quality/05-browser-runtime-verification.md` |
| Есть browser runtime verification, но нет quality summary | `quality` | `prompts/09-quality/06-quality-summary.md` |
| Пользователь просит настроить сервер/SSH/VPS, но нет deployment brief | `deployment` | `prompts/12-deployment/01-deployment-brief.md` |
| Пользователь дал IP/root-доступ и просит настроить SSH | `deployment` | `prompts/12-deployment/02-server-access-and-ssh.md` |
| Есть `docs/deployment/deployment-brief.md`, но нет `docs/deployment/server-access.md` для VPS/server deploy | `deployment` | `prompts/12-deployment/02-server-access-and-ssh.md` |
| Есть server access, но нет `docs/deployment/server-security.md` | `deployment` | `prompts/12-deployment/03-server-baseline-security.md` |
| Есть server security, но нет `docs/deployment/runtime.md` | `deployment` | `prompts/12-deployment/04-runtime-and-hosting-strategy.md` |
| Есть runtime strategy, но нет `docs/deployment/env.md` | `deployment` | `prompts/12-deployment/05-env-and-secrets.md` |
| Есть env docs, но нет `docs/deployment/domain-dns-ssl.md` | `deployment` | `prompts/12-deployment/06-domain-dns-ssl.md` |
| Domain/DNS/SSL plan готов, Quality passed, но нет `docs/seo/pre-deploy-technical-seo.md` со статусом `ready for deploy` | `technical-seo` | `prompts/13-technical-seo/01-pre-deploy-technical-seo.md` |
| Есть deployment prerequisites, пользователь просит deploy, но нет `docs/deployment/deploy-runbook.md` | `deployment` | `prompts/12-deployment/07-deploy-nextjs-app.md` |
| App deployed, но нет `docs/deployment/process-and-proxy.md` | `deployment` | `prompts/12-deployment/08-process-manager-and-reverse-proxy.md` |
| Process/proxy настроены, но нет `docs/deployment/post-deploy-checks.md` | `deployment` | `prompts/12-deployment/09-post-deploy-verification.md` |
| Post-deploy checks passed, но нет `docs/seo/production-seo-verification.md` с technical verdict `verified` / `verified with user actions` | `technical-seo` | `prompts/13-technical-seo/02-production-seo-verification.md` |
| Production SEO technically verified или verified with user actions, но нет `docs/deployment/monitoring-backup-rollback.md` | `deployment` | `prompts/12-deployment/10-monitoring-backup-rollback.md` |
| Deployment docs готовы, но нет `docs/deployment/deployment-handoff.md` | `deployment` | `prompts/12-deployment/11-deployment-handoff.md` |
| Quality summary готов и Quality passed, но нет handoff scope | `handoff` | `prompts/10-handoff/01-handoff-scope.md` |
| Работа завершена, нужен итог, но нет handoff scope | `handoff` | `prompts/10-handoff/01-handoff-scope.md` |
| Есть handoff scope, но нет final review | `handoff` | `prompts/10-handoff/02-final-review.md` |
| Есть final review, но нет change summary | `handoff` | `prompts/10-handoff/03-change-summary.md` |
| Есть change summary, но нет next iteration plan | `handoff` | `prompts/10-handoff/04-next-iteration-plan.md` |

## E-commerce флаг

Если проект является интернет-магазином, добавь флаг `ecommerce-needed`. Он не заменяет основную стадию.

Перед планированием и реализацией e-commerce страниц проверь:

| Условие | Основной промпт |
| --- | --- |
| Нет `docs/ecommerce/brief.md` | `prompts/11-ecommerce/01-ecommerce-brief.md` |
| Нет `docs/ecommerce/product-data-model.md` | `prompts/11-ecommerce/02-product-data-model.md` |
| Нет `docs/ecommerce/catalog-architecture.md` | `prompts/11-ecommerce/03-catalog-architecture.md` |
| Нет `docs/ecommerce/category-plp-spec.md` | `prompts/11-ecommerce/04-category-plp-spec.md` |
| Нет `docs/ecommerce/product-card-spec.md` | `prompts/11-ecommerce/05-product-card-spec.md` |
| Нет `docs/ecommerce/pdp-spec.md` | `prompts/11-ecommerce/06-pdp-spec.md` |
| Нет `docs/ecommerce/filters-search-sorting.md` | `prompts/11-ecommerce/07-filters-search-sorting.md` |
| Нет `docs/ecommerce/commercial-rules.md` | `prompts/11-ecommerce/08-commercial-rules.md` |
| Нет `docs/ecommerce/cart-spec.md` | `prompts/11-ecommerce/09-cart-spec.md` |
| Нет `docs/ecommerce/checkout-flow.md` | `prompts/11-ecommerce/10-checkout-flow-spec.md` |
| Нет `docs/ecommerce/account-orders-analytics.md` | `prompts/11-ecommerce/11-account-orders-analytics.md` |
| Нет `docs/ecommerce/ecommerce-review.md` | `prompts/11-ecommerce/12-ecommerce-review.md` |
| `docs/ecommerce/ecommerce-review.md` готов и verdict `Ecommerce ready for page planning` | `prompts/07-page-planning/01-select-page-and-scope.md` |

Если пользователь просит сразу реализовать каталог, PLP, PDP, корзину или checkout без готового e-commerce review, сначала выбери недостающий промпт из `prompts/11-ecommerce/`. E-commerce слой описывает коммерческую механику и риски, но не заменяет page spec, block breakdown и поблочную реализацию.

## Deployment stage

Deployment flow не заменяет quality и handoff. Используй `prompts/12-deployment/`, если пользователь просит:

- настроить сервер, VPS, SSH, root-доступ или deploy user;
- подключить домен, DNS или SSL;
- подготовить production env/secrets;
- задеплоить Next.js сайт;
- проверить production URL;
- подготовить rollback/monitoring.

Правила:

- production deploy не начинай без quality/build readiness, если пользователь явно не просит debug/preview deploy;
- после domain/DNS/SSL planning и до production deploy пройди `prompts/13-technical-seo/01-pre-deploy-technical-seo.md`, кроме явного user-approved skip;
- после общего post-deploy smoke пройди `prompts/13-technical-seo/02-production-seo-verification.md` до monitoring и deployment handoff;
- server access можно настраивать раньше, но приложение не деплой до readiness;
- root-пароль, tokens, private keys и env secrets не сохраняй в docs;
- если пользователь передал root-пароль, после действий обязательно напомни: `Обязательно смените root-пароль после этих действий`;
- после deployment handoff возвращайся в `prompts/10-handoff/01-handoff-scope.md`.

## Technical SEO stage

Technical SEO является отдельным двухпроходным gate вокруг production deploy, а не keyword/content strategy:

1. `prompts/13-technical-seo/01-pre-deploy-technical-seo.md` реализует и проверяет site-wide baseline после Quality passed и domain planning, до production deploy.
2. `prompts/13-technical-seo/02-production-seo-verification.md` проверяет live origin после общего post-deploy smoke, до monitoring/rollback и deployment handoff.

Для обоих prompt-step прочитай `prompts/_knowledge/technical-seo-baseline.md` полностью. Не смешивай SSL issuance с SEO, не обещай indexing/rankings и не выполняй Search Console/Yandex ownership changes без подтверждения пользователя.

## Design concept stage

Design system flow начинается с визуального выбора, а не с tokens:

1. `prompts/05-design-system/01-visual-reference-principles.md`, если есть стартовые референсы.
2. `prompts/05-design-system/02-design-style-shortlist.md` - выбрать style hypothesis queue из 3 кандидатов и одну `Prototype next` hypothesis.
3. `prompts/05-design-system/03-design-concept-prototypes.md` - по короткому creator brief сделать один active concept: native x 2 блока или полноценный disposable `gpt-taste / page`, затем провести critic/self-fix и зафиксировать фактические media/icon/motion решения.
4. `prompts/05-design-system/04-design-concept-feedback.md` - собрать feedback и статус: approved, needs iteration, rejected/try next hypothesis или needs new shortlist.
5. `prompts/05-design-system/05-design-concept-iteration.md` - уточнить один active concept, если пользователь хочет развивать именно его.
6. `prompts/05-design-system/06-approve-design-direction.md` - зафиксировать approved concept и design direction.
7. Только после этого переходи к `prompts/05-design-system/07-iconography-system.md`, затем к `prompts/05-design-system/08-design-tokens.md`.

Правила:

- не веди напрямую в tokens без `docs/design-system/concepts/approved-concept.md`, кроме явного решения пользователя пропустить visual concept stage;
- native prototypes храни в `design-lab/design-concepts/`, gpt-taste page concept — в `design-lab/gpt-taste/page/`; не используй `src/`;
- concept stage по умолчанию показывает один public high-fidelity concept за проход; до него creator может дёшево исследовать несколько композиционных ходов без сборки трёх полных сайтов;
- creator получает approved references, реальные assets, positive direction, creative freedom и 4–6 выбранных правил; полный contemporary/UI/anti-slop слой применяется critic после render;
- после render critic проверяет first-viewport visual event, фактический media/icon/motion treatment, currentness и Canvas continuity на reference/wide desktop, возвращает максимум три findings и один self-fix;
- если пользователь говорит "второй, но мягче", выбирай iteration, а не новый shortlist;
- если пользователь говорит "вообще не нравится", "не туда" или "не мой стиль", выбирай `prompts/05-design-system/03-design-concept-prototypes.md` для следующей hypothesis, а не cosmetic iteration;
- если пользователь принес новые визуальные референсы до утверждения concept, обнови reference principles или style shortlist;
- если пользователь принес скриншот конкретного блока после design-ready, отправляй его в `prompts/07-page-planning/03-adapt-reference-to-block-spec.md`.
- concept и production UI не должны сначала рисовать один reference canvas, а после загрузки перестраиваться под viewport: core geometry выбирает CSS до первого кадра, responsive media резервирует место и не загружает избыточный wide asset без причины.

## Правила подтверждения

Спрашивай подтверждение перед:

- переходом на новую крупную стадию;
- изменением router-слоя `AGENTS.md` или `Project-specific context`;
- созданием sitemap или дизайн-системы;
- preflight и scaffold Next.js проекта;
- реализацией UI. По умолчанию реализуй один блок за раз; целая страница одним заходом допустима только после явного подтверждения пользователя и фиксации риска качества;
- подключением зависимостей;
- подключением к серверу, изменением SSH/firewall, настройкой DNS/SSL, production env или деплоем;
- изменением checkout, оплаты, доставки или юридических текстов.

Можно действовать без отдельного подтверждения, если пользователь уже явно попросил локальную задачу и она не выходит за один промпт.
