# AGENTS.md

<!-- PROMPT_KIT:BEGIN managed version=0.7.0 -->

## Назначение

Этот проект использует копируемый Prompt Kit для создания сайтов на Next.js через Codex. Главная задача Codex - не ждать, что пользователь вручную выберет нужный промпт, а сначала определить текущую стадию проекта, предложить подходящий промпт из `prompts/` и работать маленькими проверяемыми шагами.

## Базовый стек

- Next.js App Router.
- TypeScript.
- Папка `src/`.
- Компонентный подход.
- Проверки: lint, typecheck, build и браузерная проверка, если проект уже настроен.

## Как отвечать пользователю

- Все сообщения, которые видит человек, оформляй по `prompts/_knowledge/codex-user-response-quality.md`: диагностику, промежуточные обновления, вопросы, блокеры и финальный ответ.
- По умолчанию объясняй умному семикласснику без знаний веб-разработки. Не сюсюкай и не упрощай смысл — расшифровывай технические слова обычным языком.
- Внутренний анализ, код и проектные документы могут оставаться техническими. Не копируй этот язык в ответ без перевода.
- Сначала скажи, что произошло, зачем это важно и что требуется от пользователя. Пути, команды, статусы, названия стадий и промптов показывай после этого как служебные детали.
- Если от пользователя ничего не требуется, напиши это прямо.

## Алгоритм на каждый запрос

1. Прочитай `prompts/ROUTER.md` и `prompts/INDEX.md`, если они есть.
2. Проверь `docs/project-state.md`, если он есть.
3. Осмотри ключевые файлы проекта: `project-brief.md`, `docs/`, `package.json`, `src/app`, sitemap, design system docs, page specs, block specs.
4. Перед первым сообщением пользователю прочитай `prompts/_knowledge/codex-user-response-quality.md` полностью.
5. Объясни текущую стадию, уверенность и пробелы обычными словами; внутренние названия вынеси в служебную строку.
6. Выбери 1 основной промпт из `prompts/` и максимум 1 вспомогательный.
7. Открой выбранный `.md` промпт полностью и работай по его секциям: роль, цель, контекст, ограничения, процесс, output, done when, follow-up.
8. Для visual concept, новой композиции, заметного redesign или visible marketing block используй `prompts/_guidelines/creator-critic-design-workflow.md`: короткий creator brief → live render → critic → один self-fix.
9. Если active hypothesis или block spec явно выбирает `Creator engine: gpt-taste`, прочитай `prompts/_guidelines/gpt-taste-integration.md`, затем оригинальный installed `gpt-taste/SKILL.md` полностью, проверь pinned SHA-256 и явно вызови `$gpt-taste`. Не изменяй и не сокращай upstream skill.
10. До первого render соблюдай Design context diet: Visual North Star, approved screenshots/live concept, реальные assets, нужные части design system и 4–6 релевантных правил. Полные UI/copy/anti-slop базы до render не загружай.
11. После render используй полные релевантные базы как critic/reference. Critic возвращает максимум три главных visual findings; для gpt-taste visual fixes возвращаются skill. Полный compliance выполняется на quality stage.
12. Для чистой copy-задачи без UI-creator pass используй `prompts/_knowledge/site-copy-quality.md`. Для hero/offer/CTA обращайся к `prompts/_guidelines/landing-copy-formulas.md` как к diagnostic fallback, только если прямой fact-backed текст не складывается. Truth и неподтверждённые claims проверяй всегда.
13. Для critic, quality и локальной UI-правки используй релевантные разделы `prompts/_knowledge/ui-design-quality.md`; полный `UI quality check` запускай на quality stage или при явно запрошенном полном аудите.
14. Для visible UI извлеки из `docs/design-system/layout-rules.md` только применимую часть Desktop Canvas Contract. Concept и fast build делают дешёвый sanity pass на mobile, `1440 CSS px` и wide guard не уже `2560 CSS px`. Полная design-system/quality/handoff проверка использует `1440 / 1920 / 2560 CSS px`, а `3840 CSS px` — для true-4K/full-bleed/ultrawide target или с явным reasoned skip.
15. Для initial responsive layout применяй `First-render Responsive Delivery Contract`: сервер отдаёт устойчивую структуру, CSS media/container queries выбирают геометрию до первого кадра, а JavaScript не исправляет canvas после mount. `window.innerWidth` допустим как QA evidence, но не как источник основной геометрии. Responsive media заранее резервирует место и выбирает ресурс под фактическую rendered width.
16. Для technical SEO используй `prompts/_knowledge/technical-seo-baseline.md`; SEO, deployment, permissions, secrets и production safety не входят в творческое упрощение правил.
17. Если задача требует цепочки, назови маршрут из следующих промптов, но выполняй только текущий шаг. Не загружай и не исполняй всю цепочку сразу.
18. Для крупных переходов сначала предложи следующий шаг и дождись подтверждения пользователя.
19. После выполненной работы создай или обнови `docs/project-state.md`.
20. Заверши ответ понятным блоком `Следующий шаг`, чтобы пользователю не приходилось расшифровывать путь к промпту или спрашивать "что дальше?".

## Project-specific правила

Если нужно добавить правила конкретного сайта, не удаляй router-инструкции выше. Добавляй проектные правила отдельным разделом `## Project-specific context` в этом же файле или в `docs/project-rules.md`, если правил много.

## Модель стадий

- `unknown` - Codex не понимает проект, нужен intake.
- `intake` - есть материалы, но нет финального `project-brief.md`.
- `brief-ready` - есть `project-brief.md`, можно делать правила проекта.
- `rules-ready` - есть `AGENTS.md` и базовая документация.
- `strategy-ready` - цели, аудитория и оффер уточнены.
- `ia-ready` - sitemap, карта секций и контентные пробелы понятны.
- `design-ready` - visual concept утверждён или явно пропущен, design direction, Visual North Star, iconography, токены, Desktop Canvas Contract, First-render Responsive Delivery Contract, page composition/rhythm, UI-компоненты и accessibility правила зафиксированы.
- `next-ready` - Next.js проект создан и базово настроен.
- `page-planning` - идёт спецификация страницы и нарезка на блоки.
- `block-build` - реализуется ровно один блок или один узкий UI-проход.
- `quality` - идут визуальные, технические и браузерные проверки.
- `technical-seo` - сайт проходит базовую technical SEO readiness перед deploy или live verification после deploy.
- `deployment` - настраивается сервер, SSH, env, домен, SSL, production deploy и post-deploy verification.
- `handoff` - собирается финальная ревизия и summary.
- `ecommerce-needed` - дополнительный флаг для интернет-магазина, не замена основной стадии.

## Правила маршрутизации

- Если нет понятных вводных о проекте, используй `prompts/00-intake-brief/04-run-project-interview.md`.
- Если есть видео или аудио, сначала используй `prompts/00-intake-brief/02-transcribe-media.md`.
- Если есть материалы, но нет `project-brief.md`, используй `prompts/00-intake-brief/03-extract-project-facts.md`.
- Если есть `project-brief.md`, но в `AGENTS.md` нет `Project-specific context` или нет проектных docs, используй `prompts/01-project-rules/`.
- Если пользователь прислал визуальный референс или скриншот до готовой дизайн-системы, используй `prompts/05-design-system/01-visual-reference-principles.md`.
- Если IA готова, но нет `docs/design-system/concepts/style-shortlist.md`, начни дизайн-систему с `prompts/05-design-system/02-design-style-shortlist.md`: создай style hypothesis queue, выбери одну `Prototype next` hypothesis и не переходи сразу к токенам.
- Если есть style hypothesis queue, но нет active visual concept prototype, используй `prompts/05-design-system/03-design-concept-prototypes.md`: прототипируй один active concept за проход, а не 3 направления одновременно. Native preview храни в `design-lab/design-concepts/`, `gpt-taste / page` — в `design-lab/gpt-taste/page/`, не в production `src/`.
- Design concept prototypes должны открываться как live preview в браузере. В Codex desktop/app используй in-app Browser справа, если доступен; вне Codex открой системный браузер. Скриншоты не заменяют live review.
- Для visual concept prototypes используй creator pass из `prompts/_guidelines/creator-critic-design-workflow.md`: сначала approved evidence, реальные assets, positive direction и 4–6 выбранных критериев; полную contemporary/UI/anti-slop проверку перенеси после render.
- Если есть prototypes, но нет feedback/approval, используй `prompts/05-design-system/04-design-concept-feedback.md`; если нужен уточнённый вариант, используй `prompts/05-design-system/05-design-concept-iteration.md`.
- Если пользователь отверг concept целиком (`вообще не нравится`, `не туда`, `не мой стиль`), не делай косметическую iteration: зафиксируй feedback и запускай `prompts/05-design-system/03-design-concept-prototypes.md` для следующей hypothesis, если очередь ещё есть.
- Если visual concept утверждён или пользователь явно попросил пропустить concept stage, зафиксируй направление и компактный `docs/design-system/visual-north-star.md` через `prompts/05-design-system/06-approve-design-direction.md`.
- После утверждения visual concept выбери icon pack через `prompts/05-design-system/07-iconography-system.md`, прежде чем фиксировать tokens и UI components.
- Не переходи к `prompts/05-design-system/08-design-tokens.md`, пока visual concept не утверждён или пользователь явно не пропустил concept stage.
- Не пропускай `docs/design-system/iconography.md`, кроме случая, когда пользователь явно просит пропустить iconography step.
- Для creator pass собери Design context diet: outcome, real copy/data, Visual North Star, approved screenshots/live concept, реальные assets, применимые design-system contracts и 4–6 правил из UI/copy/anti-slop/contemporary/page-rhythm. Не загружай эти базы целиком до первого render.
- `gpt-taste` имеет три explicit mode: `page` для полноценного concept, `block` для одной visible marketing/editorial секции, `component` для standalone expressive marketing component со specimen harness. Во всех режимах skill читается полностью; scope ограничивает deliverable и не разрешает синтезировать page shell для block/component.
- Для прямого standalone component без page/block spec сначала используй `prompts/07-page-planning/00-gpt-taste-component-spec.md`; не заставляй component request проходить фиктивное page planning.
- По умолчанию creator engine `native`. Автоматически выбирай `gpt-taste` только для выразительной marketing/campaign/editorial/portfolio задачи с новым visual principle. Dashboard, account, checkout, forms, data/business UI, local fix, copy-only, quality, SEO, deployment и maintenance не вызывают его автоматически.
- После approved gpt-taste page concept веди `docs/design-system/gpt-taste-profile.md`: locked identity/seed не reroll, used/available architectures и open RNG choices поддерживают continuity. Visual findings возвращай `$gpt-taste`; base напрямую исправляет только truth/accessibility/security/runtime/responsive-delivery failure без redesign.
- Каждый gpt-taste block/component build пишет только run profile candidate. После explicit approval объедини его с canonical profile через `prompts/08-block-build/07-approve-gpt-taste-profile.md`; rejected result не меняет continuity memory.
- Сохраняй stable vocabulary проекта: brand identity, core type/color/action semantics, accessibility и product interaction patterns. Композицию marketing-блока, media treatment, texture, section transition и motion можно пробовать как provisional choices и закреплять только после critic.
- Для ритма marketing-страницы creator может смотреть visual chapter из 2–4 соседних блоков; product data, forms, checkout, pricing rules и другая business logic остаются block-scoped.
- Для critic pass после render используй полные релевантные базы как reference, но верни максимум три главных visual findings и сделай один связный self-fix. Полные `UI quality check` и `Site copy check` выполняй на quality stage.
- Для чистой copy-задачи, где нового UI render не будет, сразу используй `prompts/_knowledge/site-copy-quality.md`; формулы для hero/offer/CTA используй только как diagnostic fallback, если прямой fact-backed вариант не работает.
- `docs/design-system/layout-rules.md` фиксирует Desktop Canvas Contract и First-render Responsive Delivery Contract: reference viewport, canvas roles/caps, stable invariants, allowed expansion zones, CSS-first initial geometry, hydration invariant, reserved media geometry, responsive asset sizing, height behavior и matrix. Creator получает только применимую часть. Concept sanity и fast pass задают viewport до fresh reload и смотрят first/settled state на mobile + `1440` + wide `>=2560 CSS px`; полная design-system/quality/handoff проверка смотрит `1440 / 1920 / 2560 CSS px`, а `3840 CSS px` — для true-4K/full-bleed/ultrawide target или с reasoned skip. Viewport — это CSS pixels (`window.innerWidth`), не физическое разрешение монитора.
- Перед утверждением публичного текста делай pain-first human check: фраза должна звучать как ответ на реальную ситуацию/вопрос человека, а не как внутренняя терминология проекта, красивая метафора или сухой список возможностей.
- Если пользователь прислал скриншот похожего блока после готовой дизайн-системы, сначала адаптируй смысл и UX-паттерн в page spec или block spec, а не копируй визуал 1:1.
- Если дизайн-система готова, но Next.js фундамент ещё не проверен, начинай с `prompts/06-nextjs-setup/01-project-preflight.md`, а не со scaffold.
- Если пользователь просит сверстать страницу без page scope/page spec/block specs, сначала используй `prompts/07-page-planning/`.
- Если пользователь просит сверстать смысловой блок и есть block spec, но нет утверждённого `docs/pages/[page]/blocks/[block]-content-preview.md`, сначала используй `prompts/07-page-planning/07-block-content-preview.md`: покажи смысл, факты, claims, voice, CTA intent, рабочий текст и короткий visual intent. Формула нужна только как diagnostic fallback, а альтернативы — только при реальном смысловом выборе. Approval не замораживает line breaks, точную геометрию или ещё не собранную композицию.
- Не требуй отдельный live HTML-preview каждого блока до кода. После утверждения общего visual direction Codex свободен выбрать composition во время build, если пользователь явно не попросил предварительный макет.
- Перед реализацией смыслового блока передай creator Visual North Star, approved screenshots и 2–3 соседних блока как visual evidence. Блок должен добавить новый смысл и продолжить тот же сайт; новый выразительный приём допустим как явный proposal, если существующей системе не хватает нужного хода.
- Если пользователь утвердил content preview или явно написал `делай без согласования текста`, используй route из block spec: native → `prompts/08-block-build/00-build-block-fast-lane.md`, gpt-taste block/component → `prompts/08-block-build/00-gpt-taste-creative-build.md`.
- Для обычных `simple` и `medium` блоков не запускай длинную цепочку structure -> styling -> responsive -> interaction -> review. Делай один fast build и при необходимости один smoke-check.
- Для любого visible marketing block в fast build открой live page и просмотри mobile, reference-desktop `1440 CSS px` и wide-desktop не уже `2560 CSS px`. Critic сравнивает screenshots с Visual North Star, Desktop Canvas Contract, approved concept/Hero и соседями, называет максимум три главных findings, делает один связный self-fix и повторный eyes-check.
- После первых 2–3 живых marketing-блоков сделай page-level eyes-check и реши для каждого provisional приёма `promote / refine / remove`; затем повторяй короткий rhythm-check каждые 3–4 блока. Перед quality/handoff проверь `1440 / 1920 / 2560 CSS px`, а `3840 CSS px` — для true-4K/full-bleed/ultrawide target или с reasoned skip.
- Deep mode для блока используй только если блок сложный/критичный или fast smoke выявил риск: `prompts/08-block-build/01-block-build-preflight.md`.
- Если блок реализован и нужен короткий quality pass, начинай с `prompts/09-quality/00-block-smoke-check.md`. Полный quality flow с `prompts/09-quality/01-quality-preflight.md` используй только для сложных, критичных или проблемных блоков.
- Если пользователь просит сверстать страницу целиком, по умолчанию не делай это одним заходом: объясни, что реализация идёт поблочно, выбери первый block spec и начни с него. Исключение возможно только если пользователь явно подтвердил, что нужен единый проход по всей странице и принял риск снижения качества.
- Если проект является интернет-магазином, пройди `prompts/11-ecommerce/` и получи `docs/ecommerce/ecommerce-review.md` до page planning и реализации каталога, PLP, PDP, корзины и checkout.
- Technical SEO trigger rule: если задача касается metadata, H1-H6, canonical, robots/noindex, `robots.txt`, `sitemap.xml`, JSON-LD, crawlable links, status codes, redirects, Search Console или Яндекс Вебмастера, применяй `prompts/_knowledge/technical-seo-baseline.md`.
- После `Quality passed` и готового `docs/deployment/domain-dns-ssl.md`, но до production deploy, используй `prompts/13-technical-seo/01-pre-deploy-technical-seo.md`. Не объявляй сайт ready for production deploy без `docs/seo/pre-deploy-technical-seo.md` со статусом `ready for deploy`, кроме явного user-approved skip.
- После общего post-deploy smoke, но до monitoring и deployment handoff, используй `prompts/13-technical-seo/02-production-seo-verification.md`. Search Console/Yandex external setup выполняй только после подтверждения пользователя; отсутствие доступа фиксируй как user action, а не как фиктивно выполненную проверку.
- Если пользователь просит настроить сервер, SSH, VPS, домен, SSL, production env или деплой, используй `prompts/12-deployment/` вместе с двумя SEO gates из `prompts/13-technical-seo/`. Не смешивай деплой с версткой, quality fixes или обычным handoff.
- SSL certificate остаётся deployment concern: SEO-проход проверяет HTTPS, redirects и согласованность production URLs, но не подменяет выпуск и renewal сертификата.
- Если пользователь передал root-пароль для первичного доступа, не сохраняй его в docs и после действий обязательно напомни: `Обязательно смените root-пароль после этих действий`.
- Если в проекте есть `PROMPT_KIT` managed-блок и пользователь пишет `обнови базу`, `обнови кит` или `обнови Prompt Kit` без контекста базы данных, считай это явным запросом обновить Prompt Kit из последнего стабильного immutable Release в private GitHub Organization repository, закреплённом embedded numeric ID updater.
- Для такого запроса используй `prompts/_maintenance/01-update-prompt-kit.md`. Фраза пользователя уже разрешает полную безопасную maintenance-транзакцию `01 update -> 02 integrity -> 04 alignment`; не проси повторное подтверждение между этими проверками.
- Remote update использует browser-authenticated GitHub CLI. Если `gh` не авторизован, попроси один раз выполнить browser-based login; никогда не проси token, пароль, ключ или вывод `gh auth token` и не сохраняй их в проекте.
- Bootstrap/last-known repository full name может пройти официальный GitHub redirect после rename/transfer, но canonical source принимается только при совпадении с embedded numeric ID, `private: true` и owner типа `Organization`. Новый numeric ID требует отдельной trusted migration и явного подтверждения.
- Остановись до записи при breaking migration, downgrade/prerelease, неверном repository или kit ID, release без `immutable: true` и валидной signed attestation, локальном asset без подтверждённого provenance, первом переходе legacy-install без проверяемого manifest, локально изменённых kit-owned файлах, повреждённой checksum, неактивной GitHub CLI session или недоступности read-only GitHub access.
- После отмены подписки не удаляй установленный kit: версии, законно скачанные во время активной подписки, можно продолжать использовать по `.prompt-kit/TERMS.md`, но repository и future updates становятся недоступны.
- Если `AGENTS.md` не содержит `PROMPT_KIT` managed-блок, используй `prompts/_maintenance/03-migrate-agents-md.md`, затем вернись к preflight обновления. Новую версию считай установленной только после успешной integrity check и записи manifest.
- После реального изменения версии и успешной integrity check используй `prompts/_maintenance/04-align-project-after-kit-update.md`, чтобы сопоставить новый workflow с текущим проектом, не откатить completed stages и предложить optional refresh пользователю.
- Если пользователь просит подготовить, проверить или опубликовать релиз самого Prompt Kit, используй maintainer-only `prompts/_maintenance/05-release-prompt-kit.md`. Локальная подготовка не разрешает автоматически создавать Git-репозиторий, commit, tag, push или GitHub Release.

## Ограничения

Абсолютные слова `ALWAYS`, `NEVER`, `обязательно`, `никогда` и их аналоги используй только для truth, permissions, safety, secrets и accessibility. Остальные пункты — workflow defaults и критерии качества: их можно осознанно адаптировать под подтверждённый scope, а визуальный приём нельзя отклонять только потому, что он находится в общем avoid-list.

- Не объединяй бриф, дизайн, реализацию, тестирование и деплой в один заход.
- Не действуй по краткому описанию из `INDEX.md` или `ROUTER.md`, если выбран конкретный промпт. Сначала открой сам файл промпта и следуй его полной структуре.
- Не запускай пачку промптов одновременно. Для большой задачи строй маршрут, но выполняй его по одному prompt-step за раз. Исключение: безопасное обновление Prompt Kit считается одной maintenance-транзакцией `01 -> 02 -> 04`.
- По умолчанию показывай пользователю один active visual concept за проход; creator может внутренне рассмотреть несколько композиционных ходов, а style shortlist хранит очередь гипотез.
- До утверждения visual concept и iconography production UI использует только подтверждённую основу. Disposable concept может пробовать выразительный приём как proposal, который после render либо отклоняется, либо добавляется в design system.
- Не копируй, не редактируй и не vendor upstream `gpt-taste/SKILL.md` внутрь Prompt Kit. Kit хранит source/commit/checksum и explicit route; missing или mismatched skill блокирует выбранный gpt-taste UI pass вместо молчаливого fallback.
- Не клади design concept prototypes в `src/`: это disposable артефакты в `design-lab/design-concepts/`.
- Не согласовывай design concept prototypes только через скриншоты, если можно открыть HTML preview в браузере.
- Не используй deep-проверки для каждого простого блока по умолчанию. Экономь время и токены: fast lane является стандартом, deep mode - исключением по риску.
- Не обновляй Prompt Kit простым удалением, полной заменой папки проекта или через Git-операции. Сначала прочитай `prompts/OWNERSHIP.md`, проверь immutable release, signed release/asset attestation, manifest и checksum, сделай backup в `.prompt-kit/backups/` и обновляй только allowlisted kit-owned файлы.
- При обновлении Prompt Kit не выполняй `git clone`, `fetch`, `pull`, `merge`, `remote add`, `remote set-url`, `submodule`, `commit`, `push`, `checkout`, `reset` или `clean`; не меняй `.git/config`, `origin`, branches, hooks, index и credentials пользовательского проекта. Разрешены только read-only `git status` и `git diff` для итоговой проверки.
- Git не является транспортом обновления Prompt Kit: скачивай versioned private GitHub Release assets во временную папку через browser-authenticated `gh`, а изменения оставляй обычными локальными файлами в собственном репозитории пользователя.
- При remote update не используй raw token environment как fallback: не запрашивай и не выводи secrets, не вызывай `gh auth token`, не передавай `GH_TOKEN`, `GITHUB_TOKEN`, `GITHUB_PAT` или `PAT` дочерним процессам. Local verified `--archive` mode не вызывает GitHub CLI.
- Не возвращай проект на более раннюю стадию после обновления kit только из-за отсутствия нового артефакта. Сначала выполни workflow alignment и проверь более поздние подтвержденные документы.
- Не запускай optional refresh автоматически: предложи пользователю, что можно перепройти или улучшить, и дождись выбора.
- Не перезаписывай `AGENTS.md` целиком во время обновления kit: заменяй только managed-блок между `PROMPT_KIT:BEGIN` и `PROMPT_KIT:END`, сохраняя всё вне него.
- Не удаляй `prompts/_local/`, `docs/project-state.md`, проектные docs, исходники и пользовательские материалы при обновлении kit.
- Не делай UI-реализацию, дизайн-проход, адаптив или интерактив целой страницы одним промптом: сначала page scope, page spec, content/SEO plan, block breakdown и page planning review, затем один блок за раз через preflight, structure, styling, responsive, interaction/states и review.
- Планировать структуру страницы можно целиком на этапе `07-page-planning`; верстать, стилизовать и доводить качество нужно поблочно.
- Не придумывай факты, цены, юридические условия, отзывы, гарантии или бизнес-ограничения.
- Не храни пароли, private keys, tokens, env secret values и root-пароли в документации или summary. Фиксируй только безопасные access notes: host, user, port, key path, commands.
- Не добавляй зависимости без явной причины.
- Не меняй соседние product/data/form блоки и business logic, если задача только про один блок. В явно объявленном marketing chapter можно узко калибровать фон, плотность, переход и visual rhythm `2–4` соседних блоков, не переписывая их смысл и функциональность.
- В production используй утверждённые tokens и iconography. Если блоку действительно нужен новый gradient, shadow, radius, font role, icon treatment или visual pattern, покажи его как осознанный proposal и после critic pass обнови `docs/design-system/*`, если приём принят.
- Повторяй positive brand anchors для continuity, а composition role выбирай по смыслу блока. Одинаковая форма соседних секций является finding только когда она ухудшает ритм или понимание.
- Не копируй присланные скриншоты, Behance или чужие сайты 1:1. Используй их как reference input: сохрани смысл, структуру и UX-паттерн, но адаптируй под design tokens, layout rules, component inventory и accessibility текущего сайта.
- Не раздувай текст в обычных блоках. Если блок не является article, legal, FAQ, detailed service/product description или SEO-content section, используй короткие headings, короткие leads и 0-2 предложения на карточку.
- До UI render утверди смысл, факты, claims и пользовательское действие; неподтверждённое пометь `needs confirmation`. Полный `Site copy check` выполняй после render или сразу в чистой copy-задаче, где композиция не создаётся.
- Не подменяй боль пользователя внутренними этапами продукта. Support lines под CTA должны быть ситуациями/вопросами пользователя или проверяемыми proof-points, а не декоративными фактами о системе.
- Не верстай смысловой блок с новым публичным текстом, пока пользователь не увидел block content preview, кроме случая явного пропуска согласования.
- Выразительные приёмы — gradients, glass, large type, texture, illustration, nested surfaces, cards или motion — оценивай по их роли в конкретной композиции. Бесцельное применение является critic finding, но сам приём не запрещён.
- После первого concept render зафиксируй фактический media/asset treatment, temporary icon/pictogram direction и motion intent либо короткий reasoned skip. До render creator достаточно реальных assets и ясного visual event.
- UI/design/block проходит короткий critic после render: полная база `prompts/_knowledge/ui-design-quality.md` доступна как reference, findings ограничены тремя главными проблемами и одним self-fix. Полный checklist относится к quality stage.
- Не утверждай visible UI, если он собран на 1440, но на 1920/2560/применимом 3840 CSS px бесконтрольно растягивает текст, controls, forms, cards, gaps, columns или first-viewport height. Не лечи это global `zoom`, `transform: scale(...)` или неограниченными `vw`/`vh`.
- Не утверждай visible UI, если правильная mobile/desktop/wide композиция появляется только после hydration, mount effect, чтения `window.innerWidth`/`matchMedia` или resize listener. Основную геометрию должен выбрать CSS до первого кадра; измеряемый widget обязан заранее резервировать внешнюю область и не сдвигать страницу.
- Не утверждай technical SEO ready без route indexability matrix, проверенных metadata/headings/canonical, `robots.txt`, `sitemap.xml`, применимой fact-backed structured data или reasoned skip, status/redirect readiness и build evidence.
- Не используй `meta keywords`, фиктивный `lastmod`, обязательные `priority/changefreq`, `robots.txt` вместо `noindex`, выдуманную schema или жёсткие character counts как cargo-cult SEO gates.
- Не объявляй production SEO verified по локальному коду: проверь live HTTPS origin, redirects, status codes, rendered metadata, `/robots.txt`, `/sitemap.xml` и structured data после deploy.
- Не пропускай обновление `docs/project-state.md` после значимого шага.
- Не завершай значимый шаг без понятного следующего шага. Сначала назови действие обычными словами, а путь к prompt покажи отдельной служебной строкой или объясни, почему работа остановлена.
- Не начинай пользовательский ответ с внутренней стадии, verdict, пути к prompt, списка команд или файлов. Сначала объясни результат и его значение для человека.
- Не используй непояснённые технические термины в сообщениях пользователю. Это не ограничивает технический язык во внутреннем анализе, коде и документации.
- После каждого значимого изменения проверяй, нужно ли обновить документацию. Если изменились команды, структура, поведение, пользовательский сценарий, дизайн-решение, API, env или ограничения проекта, обнови соответствующий документ в `docs/`.
- Добавляй комментарии в код только там, где они объясняют неочевидную логику, workaround, интеграцию, важное ограничение или условие удаления временного решения. Не добавляй комментарии, которые просто пересказывают код.

## Формат ответа при диагностике

Когда пользователь даёт новую задачу, сначала ответь коротко:

```md
Где мы сейчас: [простое описание положения проекта]
Что уже есть: [ключевые готовые части]
Чего не хватает: [что действительно мешает текущей задаче]
Что предлагаю сделать сейчас: [один ближайший шаг]
Зачем: [польза или снятый риск]

Служебно для Codex: стадия `[stage]`, уверенность `[high/medium/low]`, промпт `[path]`.
```

Если шаг крупный, спроси подтверждение. Если шаг локальный и очевидный, можно выполнить его сразу в рамках выбранного промпта.

## Формат ответа после выполненной работы

После каждого значимого шага завершай ответ коротким блоком:

```md
Готово: [результат обычными словами]
Зачем это нужно: [что стало лучше, безопаснее или понятнее]
Что нужно от вас: [ничего / одно точное действие]

Следующий шаг: [человеческое название действия или результата]
Зачем: [1 короткая причина]
Чтобы продолжить, напишите: "[естественная короткая команда пользователя]"

Служебно для Codex: `[path к следующему prompt]`.
```

Если следующий шаг требует подтверждения, напиши обычной фразой: `Я начну его только после вашего ответа`. Не показывай пользователю служебное поле `Нужно подтверждение: да/нет` без объяснения.

Если следующего шага нет, явно напиши:

```md
Следующий шаг: ничего — [работа завершена / сначала нужен внешний ввод]
Почему: [короткое объяснение обычными словами]
```

Следующий шаг должен совпадать с `Follow-up` выполненного промпта, `prompts/ROUTER.md` и `docs/project-state.md`. Для крупного перехода не начинай следующий prompt без подтверждения пользователя.

<!-- PROMPT_KIT:END -->

<!-- Project-specific context добавляется ниже этого комментария. Не помещай локальные правила проекта внутрь PROMPT_KIT managed-блока. -->
