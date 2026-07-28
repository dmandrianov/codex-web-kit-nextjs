# Статус промптов

Этот документ фиксирует состояние библиотеки именно относительно промптов: что уже собрано, что нужно протестировать на реальных задачах и что ещё не доведено до боевого качества.

## Статусы

- `Каркас готов` - файл существует, структура промпта заполнена, можно использовать для первого теста.
- `Нужно протестировать` - промпт нужно прогнать на реальном или учебном проекте и записать, где он проседает.
- `Нужно усилить` - промпту не хватает деталей, примеров, edge cases или более точного output.
- `Не создано` - такого промпта ещё нет, но он нужен для полной системы.

## Что точно готово

- Создана полная структура папок `prompts/00...13` и cross-cutting content route в `prompts/_content/`.
- `AGENTS.md` переписан как router-инструкция для рабочих Next.js проектов.
- Внутри `prompts/` добавлены служебные файлы: `README.md`, `INDEX.md`, `ROUTER.md`, `STATE.md`.
- Внутри `prompts/_templates/` лежат шаблоны, а release payload добавляет installed manifest и namespaced metadata, поэтому kit не требует source-репозиторий внутри сайта.
- Router-слой требует открывать выбранный `.md` промпт полностью и выполнять его по секциям, а не действовать только по краткому описанию из индекса.
- Добавлен обязательный стандарт `prompts/_knowledge/codex-user-response-quality.md`: любой ответ Codex сначала объясняет результат, пользу и нужное действие обычными словами, а внутренние статусы и пути показывает после этого.
- После каждого значимого prompt-step Codex должен явно показывать `Следующий шаг`: человеческое название действия, причину, естественную команду для продолжения и отдельную служебную ссылку на prompt.
- Все 88 staged prompts имеют единую анатомию: когда использовать, роль, цель, контекст, ограничения, процесс, output, done when, follow-up.
- Maintenance-слой включает 5 промптов: GitHub update, integrity check, AGENTS migration, workflow alignment и maintainer-only release authoring.
- Установленная версия фиксируется в `.prompt-kit/manifest.json`; source changelog/migrations маппятся в namespaced metadata и не захватывают корневые документы сайта.
- Фраза `обнови базу` запускает rollback-safe транзакцию `01 → 02 → 04` без `git pull`, commit, push или изменения remote пользователя.
- Добавлен fast lane для обычных блоков: быстрый build + smoke-check вместо обязательной длинной цепочки проверок на каждый блок.
- Block content preview утверждает meaning, facts, claims, voice и CTA intent, но не замораживает exact wording, line breaks или layout; formula и alternatives используются только при реальном диагностическом выборе.
- Усилен copy preview: добавлен pain-first human check, voice/person и проверка CTA support lines.
- Добавлен page composition/rhythm guideline: page story, visual pattern budget, neighbor check, token/color lock и iconography lock без новой тяжёлой стадии.
- Добавлен собственный редакторский стандарт `prompts/_knowledge/site-copy-quality.md`: короткий обязательный контракт и `Site copy fast pass` работают для обычного user-facing copy, а полный `Site copy check` остаётся длинным, критичным и рискованным текстам.
- UI design quality сохранён как большая reference-base: creator выбирает из неё `4–6` правил, critic читает релевантные разделы после render, а полный `UI quality check` выполняется на quality stage.
- Добавлен Unified Design Canvas: concept/fast sanity использует mobile + `1440` + wide `>=2560 CSS px`; полный design-system/quality/handoff gate использует `1440 / 1920 / 2560`, а `3840` — только по применимости.
- Добавлен Native Responsive First Paint: CSS выбирает initial geometry до первого кадра, hydration не исправляет canvas, media/measured surfaces резервируют место, а browser QA сравнивает fresh-load early frame с settled state и проверяет responsive resource.
- Contemporary visual direction до render задаёт primary expressive lever, optional secondary и asset truth; фактический media/icon/motion treatment и currentness фиксируются после render.
- Добавлен technical SEO baseline и два production gates: site-wide implementation/check перед deploy и live verification после deploy без keyword research, cargo-cult metadata и обещаний индексации.
- Добавлен Visual North Star: компактный перенос approved style в page planning/build/QA с positive anchors, creative freedom, approved evidence и максимум тремя hard boundaries.
- Fast lane для visible marketing blocks теперь задаёт viewport до fresh reload, просматривает early/settled mobile/reference-desktop/wide state, сравнивает его с approved style и обоими canvas/delivery contracts, затем делает self-fix при visual drift, wide stretch или post-mount correction. Отдельный pre-build live preview каждого блока не требуется.
- Усилены router/AGENTS trigger rules: если задача трогает видимый UI и пользовательский текст одновременно, Codex должен применять обе базы знаний и фиксировать оба результата.
- В `0.8.0` был добавлен закрытый release foundation Web Kit: private GitHub Organization, subscriber role `Read`, browser-authenticated `gh`, embedded numeric repository ID, immutable release/asset attestation, required `.prompt-kit/TERMS.md`, deterministic assets, checksums, exact manifest inventory, backup/rollback и отдельный release prompt. В `0.9.0` эта историческая схема заменяется публичным личным repository с тем же numeric ID и MIT License; старое имя `.prompt-kit/TERMS.md` остаётся только compatibility path для updater `0.8.x` и содержит тот же MIT-текст.
- Первый этап теперь начинается с intake-брифа: материалы, транскрибация, извлечение фактов, интервью, конкуренты, финальный project brief.
- `AGENTS.md` и проектная документация создаются после project brief, а не до понимания проекта.
- Есть общий pipeline для сайтов: intake brief -> project rules -> strategy -> research -> IA -> design system -> Next.js setup -> page planning -> block content preview -> block build -> quality -> handoff.
- Design system использует Sol-friendly loop: project-derived hypotheses -> до трёх дешёвых low-fi probes -> один public high-fidelity concept -> screenshot critic -> one self-fix -> approved stable/provisional direction -> calibration после `2–3` live blocks.
- Канонический `prompts/_guidelines/creator-critic-design-workflow.md` отделяет creator, critic и full quality; marketing rhythm можно проверять chapter из `2–4` блоков, не расширяя product/business scope.
- Оригинальный gpt-taste подключён как pinned external creator engine без изменения `SKILL.md`: explicit modes `page / block / component`, continuity profile и correction loop через `$gpt-taste`.
- Оригинальный seo-content-writer подключён как pinned external article writer без изменения `SKILL.md`: preserved `v9.9.12`, отдельный article route, четыре проверяемых reference-файла и truth/source gates.
- Автоматический trigger полного seo-content-writer ограничен новыми статьями, blog posts и длинными SEO-материалами. Hero, CTA, cards, forms и обычный block content preview сохраняют native route, но используют лёгкий слой: direct answer, heading promise, claim support, concrete entities, decision-state CTA и semantic closure.
- Добавлен общий anti-AI-slop/copy-density guideline для дизайна, контента, page planning, block build и quality.
- Есть отдельный e-commerce слой: e-commerce brief, product data model, каталог, PLP, product card, PDP, фильтры, commercial rules, cart, checkout, account/orders, analytics и review.
- Есть отдельный deployment слой: SSH/server access, baseline security, runtime, env/secrets, domain/DNS/SSL, deploy, process/proxy, post-deploy checks, monitoring/rollback и handoff.
- Есть отдельный technical SEO слой: indexability matrix, metadata/headings/canonical, robots/noindex, sitemap, JSON-LD, status/redirect checks, production verification и Search Console/Yandex user actions.
- Есть базовые шаблоны для брифа, page spec, block spec, e-commerce brief, product page spec и checkout flow.

## Что нужно протестировать

Тестировать лучше не всё сразу, а цепочками. Цель теста - понять, может ли промпт дать полезный артефакт без лишнего расползания скоупа.

| Цепочка | Что проверить | Критерий успеха |
| --- | --- | --- |
| Intake без файлов | `00-intake-brief/04-run-project-interview.md` -> `07-finalize-project-brief.md` | Пользователь может надиктовать проект, а Codex собирает ясный brief |
| Intake с файлами | `01-scan-source-materials.md` -> `03-extract-project-facts.md` | Codex отличает факты, гипотезы, вопросы и источники |
| Intake с медиа | `01-scan-source-materials.md` -> `02-transcribe-media.md` -> `03-extract-project-facts.md` | Видео/аудио превращаются в полезную выжимку для брифа |
| Конкурентный цикл | `05-competitor-discovery.md` -> `06-competitor-feature-loop.md` | Codex предлагает 2-3 идеи за раз и ждёт выбора пользователя |
| Новый обычный сайт | `00` -> `01` -> `02` -> `03` -> `04` -> `05` -> `07` | Получаются документы, по которым можно планировать страницу |
| Дизайн-система без референсов | `05/02` -> `05/03` -> `05/04` -> `05/06` -> `05/07` -> `05/08` | Гипотезы выводятся из проекта, до трёх low-fi проб стоят дёшево, пользователю показывается один high-fi concept, а media/icon/motion decisions фиксируются после render |
| gpt-taste page | `05/02` -> `05/03` -> `05/04` -> `05/06` | Explicit engine вызывает полный original skill, создаёт полноценный page concept, возвращает visual fix skill и после approval фиксирует continuity profile |
| gpt-taste block/component | `07/05` -> `07/07` -> `08/00-gpt-taste` -> `09/00` | Block не разрастается в page shell; component имеет specimen/states; profile locks сохраняются, visual findings исправляет skill |
| standalone gpt-taste component | `07/00-gpt-taste-component-spec` -> `08/00-gpt-taste` -> `08/07 profile approval` | Прямая component-задача не требует page spec; run delta меняет canonical profile только после user approval |
| gpt-taste non-trigger | dashboard / checkout / forms / local fix / quality / SEO / deployment | Router сохраняет native/профильный маршрут, если пользователь явно не выбрал gpt-taste |
| SEO-статья через external skill | `_content/01-write-seo-article` -> explicit `$seo-content-writer` | Pinned skill и четыре references читаются полностью; черновик отвечает intent, не выдумывает sources и не меняет website stage |
| seo-content-writer non-trigger | hero / CTA / cards / forms / ordinary block preview | Router использует `Site copy fast pass` без полного skill preflight; полный skill включается только по explicit user request |
| Итерация дизайна | `05/04` -> `05/05` или `05/03` -> `05/04` -> `05/06` | Фидбек "почти, но..." уточняет один active concept, а полный reject переводит к следующей гипотезе |
| Верстка одного блока | `07-page-planning` -> `07/07` -> `08/00` -> optional `09/00` | Content approval не замораживает layout; creator render получает 4–6 правил, critic возвращает до трёх findings и делает один self-fix |
| Ритм страницы | `07/05` -> `07/06` -> `08/00` -> calibration | Marketing chapter держит continuity `2–4` блоков; product/business scope остаётся узким; provisional vocabulary получает `promote / refine / remove` |
| Визуальное качество UI | `05-design-system` -> `07-page-planning` -> `08-block-build` -> `09-quality` | Полная UI-база не перегружает первый render: selective creator context, post-render critic и отдельный full quality gate сохраняют и свободу, и строгость |
| Единый дизайнерский холст | `05/03` -> `05/09` -> `06/04` -> `08/00` -> `09/02` | Reference viewport и ограниченный inner design canvas сохраняют hierarchy/density от 1440 до wide/4K; extra width уходит только в gutters, stage/background или объявленные expansion zones |
| Responsive с первого кадра | `05/09` -> `06/03` -> `06/04` -> `08/04` -> `09/05` | CSS выбирает core geometry до hydration; fresh-load early frame совпадает с settled state, media резервирует место и получает resource под rendered width |
| Современная визуальная подача | `05/02` -> `05/03` -> `08/00` -> `09/02` | Creator выбирает expressive lever и реальные assets; critic после render проверяет фактический media/icon/motion treatment, currentness и anti-2020 smell |
| Качество пользовательского текста | `02/02` -> `07/04` -> `07/07` -> `08/00` -> `09/00` | H1/H2 дают связный outline; обычный block preview и smoke проходят fast pass: direct answer, heading promise, claim support, concrete wording, decision-state CTA и semantic closure |
| Понятность ответов Codex | диагностика -> выполнение -> итог или блокер | Человек без технического опыта понимает, что произошло, зачем это нужно, требуется ли его действие и какой следующий шаг можно запустить обычной фразой |
| Интернет-магазин | `00-intake-brief` -> `11-ecommerce` -> `07-page-planning` | Product data, каталог, PLP, PDP, cart и checkout описаны до кода |
| Проверка качества | `09-quality` -> `10-handoff` | Проверки дают verdict по одному блоку, конкретные fixes и не расширяют скоуп |
| Деплой на VPS | `09-quality` -> `12-deployment` -> `10-handoff` | SSH, env, domain/SSL, deploy и rollback описаны без сохранения секретов |
| Базовое technical SEO | `12/06` -> `13/01` -> `12/07...09` -> `13/02` -> `12/10...11` | До deploy реализованы metadata/robots/sitemap/schema, после deploy проверены live origin/statuses и webmaster actions |
| Self-contained release | установлен GitHub Release payload | Codex находит router, index, state rules, templates и `.prompt-kit/manifest.json`, не требуя source-репозиторий внутри проекта |
| Router пустого проекта | нет brief/docs/Next.js | Codex выбирает intake/interview, а не setup или верстку |
| Router Next.js без page spec | есть `package.json` и `src/app`, но нет page spec | Codex предлагает `07-page-planning`, а не верстает страницу |
| Обновление kit | пользователь пишет `обнови базу` при доступном stable immutable GitHub Release | Codex проверяет signed release/asset attestation, checksum/manifest, делает preflight и backup, выполняет `01 → 02 → 04`, сохраняет project-owned paths и не меняет Git пользователя |
| Конфликт обновления | локально изменён kit-owned файл или managed-блок | Codex ничего не затирает, сохраняет conflict evidence и не записывает новый installed manifest |
| Выпуск kit | maintainer готовит новую версию через `05-release-prompt-kit.md` | Source metadata согласованы, payload построен по allowlist, assets детерминированы, draft публикуется только полным и становится immutable; tag/release не создаются без подтверждения |
| Alignment после обновления | проект уже в работе, kit обновился и workflow изменился | Codex не откатывает стадию, создаёт `docs/prompt-kit-workflow-alignment.md` и предлагает optional refresh |

## Матрица промптов

| Промпт | Текущий статус | Что протестировать | Что усилить |
| --- | --- | --- | --- |
| `prompts/00-intake-brief/01-scan-source-materials.md` | Каркас готов | Сканирование проекта с файлами и без файлов | Правила для video/audio/text/design/links |
| `prompts/00-intake-brief/02-transcribe-media.md` | Каркас готов | Извлечение текста из видео/аудио | Инструменты транскрибации, таймкоды, формат цитат |
| `prompts/00-intake-brief/03-extract-project-facts.md` | Каркас готов | Факты из транскриптов и текстов | Таблица fact/hypothesis/question/source |
| `prompts/00-intake-brief/04-run-project-interview.md` | Каркас готов | Голосовая надиктовка без материалов | Итерации вопросов по 3-5 штук |
| `prompts/00-intake-brief/05-competitor-discovery.md` | Каркас готов | Поиск и отбор конкурентов | Правила источников и регионов |
| `prompts/00-intake-brief/06-competitor-feature-loop.md` | Каркас готов | Цикл "2-3 фишки за раз" | Backlog решений: взять/адаптировать/отложить/не брать |
| `prompts/00-intake-brief/07-finalize-project-brief.md` | Каркас готов | Финализация project brief | Формат `project-brief.md` как source of truth |
| `prompts/01-project-rules/01-create-agents-md.md` | Каркас готов | Сохранение router + добавление `Project-specific context` | Примеры хорошего project-specific слоя с правилами docs/comments |
| `prompts/01-project-rules/02-create-project-docs.md` | Каркас готов | Создание минимальной документации и `docs/project-state.md` | Минимальные docs и documentation discipline для разных типов сайтов |
| `prompts/02-project-strategy/01-client-brief.md` | Каркас готов | Создание `docs/strategic-audit.md` после intake/project rules | Не дублировать `00-intake-brief`, задавать только 3-5 критичных вопросов |
| `prompts/02-project-strategy/02-goals-audience-offer.md` | Каркас готов | Создание `docs/strategy.md`, `docs/messaging.md` и `docs/content/editorial-rules.md` | Stop condition при незакрытых critical gaps, качество editorial/site copy rules |
| `prompts/03-research/01-discover-competitors-and-sources.md` | Каркас готов | Автопоиск кандидатов и подтверждение shortlist | Качество search queries и региональные источники |
| `prompts/03-research/02-competitor-website-analysis.md` | Каркас готов | Анализ approved shortlist | Матрица структуры, CTA, trust, UX patterns |
| `prompts/03-research/03-reviews-audience-insights.md` | Каркас готов | Инсайты из отзывов без scraping abuse | Правила безопасных источников и коротких цитат |
| `prompts/03-research/04-reference-analysis.md` | Каркас готов | Разбор UX/visual references | Разделение UX, visual, content, forbidden-to-copy |
| `prompts/03-research/05-research-synthesis.md` | Каркас готов | Research summary для IA/design/content | Проверка, что summary не создаёт sitemap/design |
| `prompts/04-information-architecture/01-sitemap.md` | Каркас готов | Sitemap для малого сайта, лендинга и магазина | Навигационные labels, SEO intent, service pages |
| `prompts/04-information-architecture/02-page-section-map.md` | Каркас готов | Карта секций для главной и ключевых страниц | User question/business goal/proof по каждой секции |
| `prompts/04-information-architecture/03-content-inventory.md` | Каркас готов | Проверка недостающего и рискованного контента | Связка с `docs/open-questions.md` и safe placeholders |
| `prompts/04-information-architecture/04-ia-review.md` | Каркас готов | Verdict `IA ready` / `needs fixes` перед design system | Критерии блокеров для e-commerce и обычных сайтов |
| `prompts/05-design-system/01-visual-reference-principles.md` | Каркас готов | Разбор стартовых референсов и скриншотов | Качество правил adapt/avoid/forbidden-to-copy |
| `prompts/05-design-system/02-design-style-shortlist.md` | Каркас готов | Project-derived hypothesis queue и дешёвые low-fi probes | Реальные materials/process/assets первичны; style library — fallback; один concept выбран для high-fi |
| `prompts/05-design-system/03-design-concept-prototypes.md` | Каркас готов | Native concept x 2 блока или полный gpt-taste page concept → critic → correction | Explicit engine, original design plan, mobile/1440/2560 first-frame sanity и profile candidate |
| `prompts/05-design-system/04-design-concept-feedback.md` | Каркас готов | Сбор фидбека пользователя по одному active concept | Перевод вкусового фидбека в approved / needs iteration / rejected, try next hypothesis / needs new shortlist |
| `prompts/05-design-system/05-design-concept-iteration.md` | Каркас готов | Refined pass одного active concept | Не начинать стиль заново при partial-fit, но полный reject отправлять к следующей гипотезе |
| `prompts/05-design-system/06-approve-design-direction.md` | Каркас готов | Approved stable foundation + provisional expressive vocabulary | Короткий North Star, честный skip и calibration `promote / refine / remove` после 2–3 live blocks |
| `prompts/05-design-system/07-iconography-system.md` | Каркас готов | Выбор icon pack, pictogram rules и правил iconography | Fit matrix, pack coverage, typography/media fit, Next.js notes, accessibility |
| `prompts/05-design-system/08-design-tokens.md` | Каркас готов | Генерация tokens под approved concept, iconography и accessibility | CSS variables/Tailwind mapping, contrast checks |
| `prompts/05-design-system/09-layout-and-responsive-rules.md` | Каркас готов | Layout rules для landing, corporate, e-commerce | Desktop Canvas Contract, First-render Responsive Delivery Contract, CSS viewport matrix, container/grid/section rhythm, responsive media/font stability и screenshot adaptation |
| `prompts/05-design-system/10-ui-components.md` | Каркас готов | Component inventory для первых страниц | Props, states, icon usage, UI quality coverage, accessibility matrix, e-commerce components |
| `prompts/05-design-system/11-accessibility-rules.md` | Каркас готов | Чеклист доступности для UI и блоков | WCAG-oriented проверки, icon-only controls |
| `prompts/05-design-system/12-design-system-review.md` | Каркас готов | Verdict `Design ready` / `needs fixes` перед Next.js | Проверка approved concept, contemporary visual readiness, media/icon/motion carryover, iconography, UI quality readiness, before/after examples, anti-AI-slop, reference screenshots и e-commerce |
| `prompts/06-nextjs-setup/01-project-preflight.md` | Каркас готов | Диагностика пустой, непустой и существующей Next.js папки | Защита Prompt Kit и пользовательских материалов |
| `prompts/06-nextjs-setup/02-project-scaffold.md` | Каркас готов | Безопасный scaffold нового Next.js проекта | Сценарий временной папки и перенос без перезаписи |
| `prompts/06-nextjs-setup/03-app-router-structure.md` | Каркас готов | Структура `src/app` по sitemap | Route groups, metadata, layouts, server/client boundaries, placeholders |
| `prompts/06-nextjs-setup/04-styling-and-design-system-integration.md` | Каркас готов | Подключение tokens/layout к CSS foundation | CSS variables/Tailwind mapping, shared canvas/container primitives, CSS-first initial geometry, media/font stability |
| `prompts/06-nextjs-setup/05-tooling-and-quality-scripts.md` | Каркас готов | Настройка lint/type/build/scripts | Политика добавления зависимостей и formatting |
| `prompts/06-nextjs-setup/06-next-ready-review.md` | Каркас готов | Verdict `Next ready` / `needs fixes` перед page planning | Проверка структуры, scripts, styling foundation |
| `prompts/07-page-planning/01-select-page-and-scope.md` | Каркас готов | Выбор одной страницы из sitemap | Scope boundaries, route, e-commerce dependencies |
| `prompts/07-page-planning/00-gpt-taste-component-spec.md` | Каркас готов | Прямой standalone component contract | Content/actions, real states, specimen, explicit override and skill preflight without fictional page planning |
| `prompts/07-page-planning/02-page-spec.md` | Каркас готов | Page spec для главной/каталога/PDP | Связь IA/design-system/Next.js route |
| `prompts/07-page-planning/03-adapt-reference-to-block-spec.md` | Каркас готов | Адаптация скриншота блока | Preserve/adapt/forbidden-to-copy и component mapping |
| `prompts/07-page-planning/04-content-and-seo-plan.md` | Каркас готов | Content/SEO план страницы | Metadata, headings, internal links, fact safety, text density, site copy notes |
| `prompts/07-page-planning/05-block-breakdown.md` | Каркас готов | Нарезка страницы на маленькие block specs | Page story, composition roles, visual pattern budget, copy budget |
| `prompts/07-page-planning/06-page-planning-review.md` | Каркас готов | Verdict `Ready for block build` / `needs fixes` | Проверка первого block spec, page rhythm, token/icon lock и рисков |
| `prompts/07-page-planning/07-block-content-preview.md` | Каркас готов | Согласование смысла блока до кода | Facts/claims/voice/CTA intent approved; line breaks/layout flexible; formula/alternatives diagnostic only |
| `prompts/08-block-build/00-build-block-fast-lane.md` | Каркас готов | Короткий creator → render → critic → self-fix | Design context diet, один purposeful provisional exception, fresh-load mobile/1440/wide evidence и top-3 findings |
| `prompts/08-block-build/00-gpt-taste-creative-build.md` | Каркас готов | Full-skill block/component creator → live specimen → critic → skill correction | Pinned identity, scope without page shell, profile locks/open RNG and visual handback |
| `prompts/08-block-build/01-block-build-preflight.md` | Каркас готов | Deep preflight для complex blocks | Решение simple/medium/complex и защита соседних блоков |
| `prompts/08-block-build/02-build-block-structure.md` | Каркас готов | Реализация структуры одного блока | Semantic markup, imports, подключение без styling creep |
| `prompts/08-block-build/03-style-block-from-design-system.md` | Каркас готов | Styling одного блока по дизайн-системе | Tokens/layout/components/reference adaptation |
| `prompts/08-block-build/04-responsive-pass.md` | Каркас готов | Проверка mobile/tablet и desktop matrix 1440/1920/2560/3840 одного блока | Canvas invariants, fresh-load first frame, hydration stability, media candidates и expansion zones |
| `prompts/08-block-build/05-interaction-and-states-pass.md` | Каркас готов | Hover/focus/form/data states одного блока | Keyboard, aria, empty/loading/error states |
| `prompts/08-block-build/06-block-build-review.md` | Каркас готов | Verdict `Block ready` / `needs fixes` | Проверка scope, соседних блоков, design-system соответствия, Site copy check и UI quality check |
| `prompts/08-block-build/07-approve-gpt-taste-profile.md` | Каркас готов | Create/merge accepted block/component run candidate | Reject leaves canonical profile untouched; lock only seen identity and preserve source/hash |
| `prompts/09-quality/00-block-smoke-check.md` | Каркас готов | Быстрый smoke-check обычного блока | Грубые visual/runtime/accessibility ошибки, Site copy smoke, UI quality smoke, Contemporary visual smoke, before/after calibration, rhythm/token/icon smoke без полного QA |
| `prompts/09-quality/01-quality-preflight.md` | Каркас готов | Deep quality plan для одного блока | Scope, commands, URL, viewports, allowed fixes, UI quality criteria и Site copy criteria |
| `prompts/09-quality/02-visual-screenshot-review.md` | Каркас готов | Визуальный аудит одного блока или узкого scope | Mobile/reference/wide eyes-check, desktop canvas matrix, сравнение с Visual North Star/approved concept, UI quality, self-fix + screenshot recheck |
| `prompts/09-quality/03-accessibility-and-usability-check.md` | Каркас готов | Accessibility/usability одного блока | Keyboard, focus, semantics, contrast, target size |
| `prompts/09-quality/04-technical-checks.md` | Каркас готов | Технические проверки текущего scope | Lint/type/build/tests и out-of-scope failures |
| `prompts/09-quality/05-browser-runtime-verification.md` | Каркас готов | Проверка runtime в браузере | Fresh-load early/settled frame, hydration, responsive media/font evidence, network и route/click/form behavior |
| `prompts/09-quality/06-quality-summary.md` | Каркас готов | Verdict `Quality passed` / `needs fixes` | Owner prompt для каждой failed check, включая UI quality и Site copy findings |
| `prompts/10-handoff/01-handoff-scope.md` | Каркас готов | Определение scope: block/page/iteration/project | Не объявлять проект готовым после одного блока |
| `prompts/10-handoff/02-final-review.md` | Каркас готов | Scoped final review | Приоритеты P0/P1/P2 и owner prompt |
| `prompts/10-handoff/03-change-summary.md` | Каркас готов | Summary после scope/итерации | Форматы для пользователя и technical summary |
| `prompts/10-handoff/04-next-iteration-plan.md` | Каркас готов | Следующий prompt после handoff | Возврат к следующему block spec или остановка |
| `prompts/11-ecommerce/01-ecommerce-brief.md` | Каркас готов | Бриф магазина | Ниши: fashion, food, digital, B2B |
| `prompts/11-ecommerce/02-product-data-model.md` | Каркас готов | Product fields, variants, stock, prices, media | CMS/PIM readiness, structured data requirements |
| `prompts/11-ecommerce/03-catalog-architecture.md` | Каркас готов | Категории, URL, SEO pages | Faceted navigation, canonical/index rules |
| `prompts/11-ecommerce/04-category-plp-spec.md` | Каркас готов | Category/PLP page до page planning | Sort/filter/search states, merchandising zones, UI quality notes и Site copy notes |
| `prompts/11-ecommerce/05-product-card-spec.md` | Каркас готов | Product card в catalog grids | Badges, price states, stock states, quick actions, UI quality notes и Site copy notes |
| `prompts/11-ecommerce/06-pdp-spec.md` | Каркас готов | PDP структура и states | Trust, variants, reviews, recommendations, schema.org, UI quality notes и Site copy notes |
| `prompts/11-ecommerce/07-filters-search-sorting.md` | Каркас готов | Фильтры и mobile catalog UX | Query params, empty states, reset behavior, UI quality notes и Site copy notes |
| `prompts/11-ecommerce/08-commercial-rules.md` | Каркас готов | Delivery/payment/returns/legal/promos | Legal vs UX copy, tax, regional restrictions |
| `prompts/11-ecommerce/09-cart-spec.md` | Каркас готов | Cart UX и states | Price changes, promo errors, stock changes, UI quality notes и Site copy notes |
| `prompts/11-ecommerce/10-checkout-flow-spec.md` | Каркас готов | Checkout flow | Guest checkout, errors, payment failure, UI quality notes и Site copy notes |
| `prompts/11-ecommerce/11-account-orders-analytics.md` | Каркас готов | Account/orders/notifications/analytics | Consent, event naming, privacy-safe tracking |
| `prompts/11-ecommerce/12-ecommerce-review.md` | Каркас готов | Verdict перед page planning | Blockers, recommended first ecommerce page |
| `prompts/12-deployment/01-deployment-brief.md` | Каркас готов | Target/readiness для deploy | Managed platforms vs VPS decision |
| `prompts/12-deployment/02-server-access-and-ssh.md` | Каркас готов | IP/root-password -> SSH key setup | Edge cases Windows SSH, key permissions, root password warning |
| `prompts/12-deployment/03-server-baseline-security.md` | Каркас готов | Базовая server security без lockout | Firewall/SSH policy rollback |
| `prompts/12-deployment/04-runtime-and-hosting-strategy.md` | Каркас готов | Next.js runtime strategy | standalone/Docker/static/platform compatibility |
| `prompts/12-deployment/05-env-and-secrets.md` | Каркас готов | Production env без раскрытия secrets | Integrations checklist and secret storage |
| `prompts/12-deployment/06-domain-dns-ssl.md` | Каркас готов | Domain/DNS/SSL setup | Existing DNS records and SSL challenge failures |
| `prompts/12-deployment/07-deploy-nextjs-app.md` | Каркас готов | Production deploy | Release dirs, build failures, rollback prep |
| `prompts/12-deployment/08-process-manager-and-reverse-proxy.md` | Каркас готов | systemd/pm2/Docker + nginx/Caddy | Multi-site server safety |
| `prompts/12-deployment/09-post-deploy-verification.md` | Каркас готов | Production smoke test | Forms, checkout, console/network, mobile |
| `prompts/12-deployment/10-monitoring-backup-rollback.md` | Каркас готов | Monitoring/backup/rollback | Small-site minimum viable ops |
| `prompts/12-deployment/11-deployment-handoff.md` | Каркас готов | Deployment handoff | Required user actions and root password warning |
| `prompts/13-technical-seo/01-pre-deploy-technical-seo.md` | Каркас готов | Полный небольшой сайт перед deploy | Route matrix, metadata/headings, canonical, robots, sitemap, JSON-LD, build evidence |
| `prompts/13-technical-seo/02-production-seo-verification.md` | Каркас готов | Live production origin после smoke | HTTPS/redirects/statuses, live metadata/schema, Search Console/Yandex handoff |
| `prompts/_maintenance/01-update-prompt-kit.md` | Каркас готов | Safe update из новой версии kit | Реальные merge conflicts в `AGENTS.md` |
| `prompts/_maintenance/02-check-kit-integrity.md` | Каркас готов | Проверка ссылок, managed-блока и ownership | Автоматизация проверок |
| `prompts/_maintenance/03-migrate-agents-md.md` | Каркас готов | Миграция старого `AGENTS.md` без markers | Сложные локальные правила и manual conflicts |
| `prompts/_maintenance/04-align-project-after-kit-update.md` | Каркас готов | Alignment нового workflow с уже выполненным проектом | Качество optional refresh предложений и защита от отката стадий |
| `prompts/_maintenance/05-release-prompt-kit.md` | Каркас готов | Dry-run и controlled GitHub Release | Version/tag consistency, deterministic assets, release notes, publish confirmation и rollback публикации |

## Что ещё не доделано

Эти промпты или разделы ещё нужно создать отдельно:

- Промпт аудита самого промпта: проверить, не слишком ли широкий скоуп, есть ли output и done when.
- Промпт для подготовки контента блока: заголовки, microcopy, CTA, ограничения по фактам.
- Промпт для image/assets strategy: какие изображения нужны, где брать, как проверять права и качество.
- Промпт для CMS/data model: сущности, поля, связи, источники данных.
- Промпт для forms: поля, validation, errors, success states, spam protection.
- Промпт для рефакторинга после нескольких блоков: убрать дубли, стабилизировать компоненты, не менять дизайн.
- Промпт для проверки project brief: достаточно ли данных, чтобы создавать `AGENTS.md` и IA.

## Порядок доработки

1. Протестировать новый `00-intake-brief` на трех сценариях: нет файлов, есть текстовые файлы, есть видео/аудио.
2. Протестировать router на пустом проекте, проекте с материалами, Next.js проекте без page spec и интернет-магазине.
3. Протестировать GitHub update на копиях проекта: current manifest, stale manifest, legacy без manifest, broken markers, локальный drift, removed file и rollback после failed integrity.
4. Протестировать release authoring в dry-run и на тестовом tag: allowlist, reproducible archives, SHA256SUMS, draft/prerelease filtering и запрет publish без подтверждения.
5. Довести `prompts/_templates/prompt-template.md` до финальной версии.
6. Протестировать цепочку обычного сайта на учебном проекте.
7. Протестировать цепочку интернет-магазина на учебном магазине.
8. Протестировать deployment flow на учебном VPS или локальном dry-run без реальных секретов.
9. По результатам тестов усилить ключевые промпты: intake, project brief, `AGENTS.md`, anti-AI-slop guidelines, editorial rules, design style shortlist, live concept preview, feedback, design tokens, page spec, block breakdown, fast lane build, smoke-check, visual review, ecommerce brief, catalog architecture, PDP, checkout, SSH, env, deploy, SSL.
10. Добавить недостающие промпты из раздела "Что ещё не доделано".
11. Провести ревизию всей базы и пометить статусы: `готов к использованию`, `нужен тест`, `нужно переписать`.
