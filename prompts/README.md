# Prompt Kit для Next.js-проекта

Эта папка копируется в рабочий проект вместе с корневым `AGENTS.md`. После этого Codex может сам определять текущую стадию сайта и выбирать подходящий промпт.

## Как работает kit

1. Пользователь пишет задачу обычным языком.
2. Короткий `AGENTS.md` выбирает маршрут `status`, `direct`, `staged` или `cross-cutting`.
3. `status` и `direct` используют только локальные правила, текущий снимок и затронутые файлы.
4. `staged` и `cross-cutting` читают компактный `ROUTER.md`; `INDEX.md` открывается только при неоднозначности внутри выбранной стадии.
5. Codex выбирает 1 основной промпт и максимум 1 действительно необходимый вспомогательный.
6. Codex открывает выбранный `.md` промпт полностью и работает по его секциям.
7. Для крупных переходов Codex ждёт подтверждение.
8. После значимого шага Codex обновляет короткий текущий снимок `docs/project-state.md`.
9. В ответе Codex сначала объясняет обычными словами, что сделал, зачем это нужно и требуется ли действие пользователя.
10. В конце ответа Codex называет один следующий шаг и только затем показывает служебный путь к prompt.

## Что устанавливать в проект

Используй подготовленный package из публичного доверенного GitHub Release, а не clone репозитория внутрь сайта. Web Kit распространяется по MIT License. Установленный набор содержит:

- `AGENTS.md` с управляемым router-блоком;
- распространяемую папку `prompts/`;
- `.prompt-kit/manifest.json` с установленной версией и baseline hashes;
- `.prompt-kit/VERSION.md`, `CHANGELOG.md` и `MIGRATIONS.md`;
- `.prompt-kit/TERMS.md` с MIT License; legacy filename сохранён для совместимости updater `0.8.x`;
- schema manifest и `.prompt-kit/update.mjs` для безопасного update preflight/apply.

Корневые `README.md`, `CHANGELOG.md` и `MIGRATIONS.md` принадлежат самому сайту пользователя. Source-версии этих файлов из репозитория kit не копируются поверх проекта.

Папка `prompts/_templates/` уже содержит шаблоны, поэтому отдельная корневая `templates/` не распространяется.

## Главные правила

- Всегда начинай с выбора одного из четырёх маршрутов. Полную диагностику стадии делай только для `staged` или когда state явно устарел.
- Короткий контракт ответа находится в `AGENTS.md`. Полный `prompts/_knowledge/codex-user-response-quality.md` используй для сложного отчёта, блокера или неоднозначной передачи результата, а не перед каждым сообщением.
- После выбора промпта открывай сам `.md` файл и следуй его полной структуре, а не только краткому описанию из `INDEX.md`.
- Не делай несколько стадий за один заход.
- Для большой задачи показывай маршрут из нескольких промптов, но выполняй только текущий prompt-step.
- Не верстай страницу без page scope, page spec, content/SEO plan, block breakdown и page planning review.
- Новую композицию делай по `prompts/_guidelines/creator-critic-design-workflow.md`: короткий positive brief → live render → critic → один self-fix → полный quality позже.
- Если hypothesis/spec явно выбирает `Creator engine: gpt-taste`, прочитай `prompts/_guidelines/gpt-taste-integration.md` и original skill полностью. Режимы: `page`, `block`, `component`; visual findings возвращаются `$gpt-taste`.
- Прямой standalone gpt-taste component сначала получает `07-page-planning/00-gpt-taste-component-spec.md`; каждый accepted block/component profile delta применяется через `08-block-build/07-approve-gpt-taste-profile.md`.
- Для новой SEO-статьи, blog post, guide, comparison, listicle, review, pillar article или FAQ-материала используй `prompts/_content/01-write-seo-article.md`: integration guideline, pinned `seo-content-writer` и четыре upstream reference-файла читаются полностью, затем skill вызывается явно.
- Полный `$seo-content-writer` не применяется автоматически к hero, CTA, карточкам, формам и обычному block content preview. Page copy получает лёгкий слой его полезных принципов через короткий контракт и `Site copy fast pass` в `site-copy-quality.md`, без article workflow и отдельного approval.
- До первого render действует Design context diet: Visual North Star, approved screenshots/live concept, реальные assets, нужная часть design system и только 4–6 релевантных правил. Полные UI/copy/anti-slop/contemporary/page-rhythm базы используются после render как critic/reference.
- Creator brief описывает outcome, positive direction и creative freedom. Абсолютные `ALWAYS`/`NEVER` оставляй только для truth, permissions, safety, secrets и accessibility.
- Дизайн-систему начинай со style hypothesis queue. Creator может дёшево исследовать несколько low-fi ходов, но пользователю по умолчанию показывает один собранный active concept; после approval выбери iconography и затем design tokens.
- После approval создай `docs/design-system/visual-north-star.md`: 3–5 positive continuity anchors, approved screenshots/live preview, creative freedom и максимум три настоящие hard boundaries. Он направляет, но не диктует layout каждого блока.
- Stable vocabulary — brand identity, core type/color/action semantics, accessibility и product patterns — сохраняется. Marketing composition, media treatment, texture, section transition и motion могут быть provisional proposals до critic; после первых 2–3 живых marketing-блоков page-level screenshots решают `promote / refine / remove`.
- Для marketing rhythm можно оценивать visual chapter из 2–4 соседних блоков. Product data, forms, checkout, pricing rules и другая бизнес-логика остаются block-scoped.
- `docs/design-system/layout-rules.md` хранит Desktop Canvas Contract и First-render Responsive Delivery Contract. Creator получает применимую часть; concept/fast sanity задаёт viewport до fresh reload, смотрит первый и settled кадр на mobile + `1440` + wide `>=2560 CSS px`, а полная design-system/quality/handoff проверка — `1440 / 1920 / 2560 CSS px` и применимый `3840 CSS px`.
- Core responsive geometry выбирает CSS до первого кадра. Не используй mount effects, `window.innerWidth`, `matchMedia` или resize listeners для послезагрузочного переключения основной композиции; JS остаётся для поведения, а измеряемые surfaces заранее резервируют внешнюю геометрию.
- После render critic сначала смотрит screenshots, затем использует полные релевантные базы, называет максимум три главных visual findings и делает один связный self-fix. Полные `UI quality check` и `Site copy check` относятся к quality stage.
- Для чистой copy-задачи без UI render сразу используй короткий обязательный контракт и `Site copy fast pass` из `prompts/_knowledge/site-copy-quality.md`; полный чек оставляй длинному, критичному или рискованному тексту. `landing-copy-formulas.md` подключай как diagnostic fallback, если прямой fact-backed hero/CTA не работает.
- Для базового technical SEO применяй `prompts/_knowledge/technical-seo-baseline.md`: до deploy пройди `13-technical-seo/01`, после общего production smoke — `13-technical-seo/02`. Это отдельный gate для metadata, heading hierarchy, canonical, robots/noindex, sitemap, JSON-LD, crawlability, status codes и redirects без keyword research.
- На intake выясни, кто будет менять сайт после запуска. Владелец, продолжающий работу через Codex/ИИ, по умолчанию получает repository-owned content без CMS; редакционная команда сначала описывает роли и publish workflow, а затем выбирает CMS.
- После Next.js preflight и до scaffold используй `06-nextjs-setup/02-technical-architecture.md` и `prompts/_knowledge/nextjs-technical-baseline.md`: версия, hosting shape, источники истины, свежесть/кеш, public endpoints, безопасность и critical scenarios фиксируются до кода.
- Native design concept prototypes храни в `design-lab/design-concepts/`, gpt-taste page concepts — в `design-lab/gpt-taste/page/`, не в production `src/`.
- Design concept prototypes открывай как live HTML/CSS preview в браузере. Скриншоты можно использовать как QA evidence, но не как основной формат согласования.
- Если пользователь отверг concept целиком, пробуй следующую hypothesis, а не косметическую iteration того же направления.
- Перед реализацией смыслового блока покажи `07-page-planning/07-block-content-preview.md`: смысл, факты, claims, voice, CTA intent, рабочий текст и короткий visual intent. Формула и варианты нужны только при реальной диагностической пользе.
- Content approval не замораживает line breaks, точную геометрию или ещё не собранную композицию; отдельный live preview блока до кода не обязателен.
- Перед approval публичного текста делай pain-first human check: фраза должна отвечать на реальную ситуацию пользователя и звучать в правильном голосе проекта.
- Реализацию начинай после approved preview или явного пропуска: native — `08-block-build/00-build-block-fast-lane.md`, gpt-taste block/component — `08-block-build/00-gpt-taste-creative-build.md`.
- Deep mode `08-block-build/01...06` используй только для сложных, критичных или проблемных блоков.
- Quality pass по умолчанию делай через `09-quality/00-block-smoke-check.md`; полный block QA `09-quality/01...06` запускай только по риску. Перед page/project handoff или deploy динамического сайта отдельно проверь полные сценарии через `09-quality/07-application-flow-check.md`.
- Не копируй скриншоты, Behance или чужие сайты 1:1: используй их как reference input и адаптируй под дизайн-систему проекта.
- Для интернет-магазинов проходи e-commerce слой, включая `11-ecommerce/12-commerce-operations-and-payment-safety.md`, до `docs/ecommerce/ecommerce-review.md`, а затем возвращай конкретную страницу в `07-page-planning`.
- Для сервера, SSH, домена, SSL и production deploy используй `12-deployment`; не смешивай деплой с версткой и quality fixes.
- Production deploy не объявляй ready без pre-deploy technical SEO check, а deployment handoff — без production SEO verification, кроме явного user-approved skip.
- Если пользователь дал root-пароль, не сохраняй его в docs и напомни: `Обязательно смените root-пароль после этих действий`.
- После значимого шага обновляй короткий текущий снимок `docs/project-state.md`; историю открывай только для восстановления старого решения.
- После значимого шага всегда показывай `Следующий шаг`: сначала понятное действие и его смысл, затем естественную команду продолжения и служебный путь к prompt. Если действий от пользователя нет, скажи это прямо.

## Обновление kit

В рабочем проекте достаточно написать: `обнови базу`.

До первого remote update пользователь один раз выполняет `gh auth login --hostname github.com --web`. Приглашение к публичному repository не требуется. Токен, пароль или ключ нельзя передавать Codex либо сохранять в проекте.

Codex читает `.prompt-kit/manifest.json`, проверяет последний stable private Release через browser-authenticated GitHub CLI, требует `immutable: true`, валидирует signed release/asset attestation, сверяет canonical repository с embedded numeric ID и затем выполняет транзакцию:

1. `prompts/_maintenance/01-update-prompt-kit.md` — preflight, backup и безопасное применение только kit-owned файлов;
2. `prompts/_maintenance/02-check-kit-integrity.md` — проверка manifest, links, managed-блока и состава;
3. `prompts/_maintenance/04-align-project-after-kit-update.md` — сопоставление нового workflow с уже выполненной работой без отката стадий.

Новый `.prompt-kit/manifest.json` записывается последним. При конфликте или failed integrity check updater не объявляет новую версию установленной и сохраняет rollback.

Локальный путь к package остаётся fallback для offline-теста. По умолчанию путь указывать не нужно.

Updater не взаимодействует с Git пользователя: не делает `git pull`, commit или push, не меняет remote и не создаёт вложенный репозиторий. Обновление остаётся обычным локальным diff.

Rename/transfer того же repository поддерживается через GitHub redirect и проверку неизменного numeric ID. Мостовой release `0.9.0` переводит bootstrap source на `dmandrianov/codex-web-kit-nextjs` и сохраняет совместимые legacy transport/path values, чтобы updater `0.8.x` мог принять проверенный локальный архив. Новый repository ID требует trusted migration. Код и документацию можно использовать, изменять и распространять по MIT License.

## Служебные файлы

- `INDEX.md` - карта стадий и промптов.
- `ROUTER.md` - правила выбора следующего промпта.
- `STATE.md` - шаблон и правила `docs/project-state.md`.
- `OWNERSHIP.md` - правила, какие файлы принадлежат kit, проекту или hybrid-слою.
- `_guidelines/creator-critic-design-workflow.md` - компактный Sol-friendly workflow, Design context diet и граница между creator, critic и full quality.
- `_knowledge/codex-user-response-quality.md` - стандарт понятных сообщений Codex пользователю; не смешивать с текстом сайта.
- `_knowledge/ui-design-quality.md` - стандарт визуального качества UI и страниц для design system, page planning, block build, visual review, quality и before/after калибровки.
- `_knowledge/site-copy-quality.md` - стандарт качества пользовательского текста с быстрым обязательным проходом для content planning, block content preview, rewrite, microcopy, CTA, form states, product/e-commerce copy и SEO snippets.
- `_knowledge/contemporary-visual-direction.md` - стандарт современного visual direction: до render выбирается primary expressive lever, optional secondary lever и честный asset scope; фактические media/icon/motion решения фиксируются после render.
- `_knowledge/technical-seo-baseline.md` - стандарт базового technical SEO для pre-deploy implementation и live production verification.
- `_templates/visual-north-star-template.md` - короткий общий visual course для будущих блоков без запретительного overfitting.
- `_templates/` - шаблоны документов.
- `_maintenance/` - промпты для безопасного обновления и проверки kit.
- `_maintenance/01-update-prompt-kit.md` - обновить установленную базу из GitHub Release или явного локального package.
- `_maintenance/02-check-kit-integrity.md` - проверить результат транзакции до фиксации новой установленной версии.
- `_maintenance/04-align-project-after-kit-update.md` - post-update alignment: сопоставить новый workflow с уже выполненным проектом.
- `_maintenance/05-release-prompt-kit.md` - maintainer-only выпуск новой версии из source-репозитория.
- `_local/` - локальные промпты проекта, которые нельзя удалять при обновлении.
