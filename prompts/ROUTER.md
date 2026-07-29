# Router Prompt Kit

Используй Router только для маршрутов `staged` и `cross-cutting` либо когда `direct` оказался неоднозначным. Для обычного status-вопроса или узкой локальной правки Router не нужен.

## 1. Минимальная диагностика

Сначала прочитай в `docs/project-state.md` только текущий снимок:

- stage и confidence;
- active page/block/task;
- blockers и open decisions;
- authoritative artifact pointers;
- recommended next prompt.

Если state отсутствует или явно устарел, проверь только evidence текущей стадии: `project-brief.md`, нужный раздел `docs/`, `package.json`, `src/app` и запрошенный пользователем scope. Не читай всю историю проекта без конкретной причины.

Если recommended prompt существует, его prerequisites ещё верны и просьба пользователя с ним согласуется, используй его. Иначе выбери маршрут ниже. `prompts/INDEX.md` открывай только при неоднозначности внутри уже выбранной стадии.

После диагностики назови пользователю человеческим языком:

- где проект находится;
- что уже готово;
- что мешает текущей просьбе;
- какой один шаг выполняется сейчас.

## 2. Применение выбранного промпта

1. Выбери один основной промпт и максимум один необходимый вспомогательный.
2. Открой основной файл полностью; краткого описания из Router или INDEX недостаточно.
3. Собери только контекст из его раздела `Контекст, который нужно дать`.
4. Выполни ровно текущий prompt-step и проверь `Done when`.
5. Обнови короткий текущий снимок `docs/project-state.md`.
6. Сверь следующий шаг с `Follow-up`; крупный переход требует подтверждения.

Большие knowledge bases — reference, а не обязательный startup:

- до первого UI render: Visual North Star, approved evidence, реальные assets, применимые design-system contracts и 4–6 правил;
- после render: только релевантные critic/reference sections, максимум три главных visual findings и один self-fix;
- полный UI/copy/accessibility/responsive/technical compliance: quality stage или явный полный audit.

## 3. Cross-cutting маршруты

Cross-cutting задача не обязана менять основную website stage.

| Запрос | Основной маршрут | Обязательная граница |
| --- | --- | --- |
| Обновить Prompt Kit | `prompts/_maintenance/01-update-prompt-kit.md` | Полная транзакция update → integrity → alignment; Git проекта не является транспортом |
| Проверить установленный kit | `prompts/_maintenance/02-check-kit-integrity.md` | Не менять project-owned файлы |
| Исправить legacy `AGENTS.md` | `prompts/_maintenance/03-migrate-agents-md.md` | Сохранить локальный текст вне managed-блока |
| Согласовать проект после обновления | `prompts/_maintenance/04-align-project-after-kit-update.md` | Не откатывать завершённые стадии |
| Выпустить сам Prompt Kit | `prompts/_maintenance/05-release-prompt-kit.md` | Git/GitHub mutations только по отдельному разрешению |
| Новая SEO-статья/guide/comparison/listicle/review/pillar/FAQ | `prompts/_content/01-write-seo-article.md` | Явно вызвать `$seo-content-writer`; текущая стадия сохраняется |
| CMS, runtime, data/cache или hosting architecture | `prompts/06-nextjs-setup/02-technical-architecture.md` | Сначала определить, кто меняет контент |
| Каталог, PDP, cart или checkout | Первый недостающий prompt из `prompts/11-ecommerce/` | До UI закрыть operations/payment safety и e-commerce review |
| Metadata, canonical, robots, sitemap, schema, statuses или redirects | Technical SEO prompt и baseline | Не обещать indexing или rankings |
| Сервер, SSH, env, домен, SSL или production deploy | Первый недостающий prompt из `prompts/12-deployment/` | Quality и SEO gates не заменяются deployment smoke |

### CMS workflow-first

- Если владелец продолжает менять сайт через Codex/ИИ и обычный deploy приемлем, CMS status по умолчанию `not needed`.
- Если контент ведут редакторы, контент-менеджеры или маркетологи без кода, сначала зафиксируй roles, preview/approval/publish, locales, redirects, media, webhook/revalidation, export/backup и downtime behavior.
- Не добавляй CMS, auth, database или custom backend «на будущее».

### Обычный copy и article skill

- Hero, CTA, карточки, формы и block content preview используют `Site copy fast pass`; это не требует чтения skill/references.
- Полный `$seo-content-writer` используется только для article-route или по явной просьбе пользователя.
- Truth, claims и source boundaries проверяются в любом маршруте.

## 4. Staged website flow

Используй существующий `Follow-up` последнего подтверждённого prompt-step. Если state отсутствует, найди первую незакрытую строку подходящей стадии.

| Evidence | Stage | Следующий вход |
| --- | --- | --- |
| Нет понятных материалов или brief | `unknown` | `prompts/00-intake-brief/04-run-project-interview.md` |
| Есть media без транскрипта | `intake` | `prompts/00-intake-brief/02-transcribe-media.md` |
| Есть материалы без `project-brief.md` | `intake` | `prompts/00-intake-brief/03-extract-project-facts.md` |
| Brief не подтверждён | `intake` | `prompts/00-intake-brief/07-finalize-project-brief.md` |
| Brief готов, проектных правил нет | `brief-ready` | `prompts/01-project-rules/01-create-agents-md.md` |
| Правила есть, базовых docs/state нет | `brief-ready` | `prompts/01-project-rules/02-create-project-docs.md` |
| Стратегия не проверена | `rules-ready` | `prompts/02-project-strategy/01-client-brief.md` |
| Цели, аудитория и offer не зафиксированы | `rules-ready` | `prompts/02-project-strategy/02-goals-audience-offer.md` |
| Strategy ready, research не завершён | `strategy-ready` | Первый незакрытый prompt из `prompts/03-research/` |
| Research ready, IA не завершена | `strategy-ready` | Первый незакрытый prompt из `prompts/04-information-architecture/` |
| IA ready, design direction/system не готовы | `ia-ready` | Выбрать design route ниже |
| Design review passed, Next foundation не готов | `design-ready` | Выбрать Next.js route ниже |
| Next review passed, page scope отсутствует | `next-ready` | `prompts/07-page-planning/01-select-page-and-scope.md` |
| Page scope есть, остальные page artifacts не готовы | `page-planning` | Первый незакрытый prompt из `prompts/07-page-planning/` |
| Page planning ready, строится один block/component | `block-build` | Выбрать build route ниже |
| Блок или страница требуют проверки | `quality` | Smoke или первый незакрытый quality prompt |
| Quality passed, нужна передача результата | `handoff` | `prompts/10-handoff/01-handoff-scope.md` |

Если внутри выбранной папки непонятно, какой файл следующий, тогда открой только соответствующий раздел `prompts/INDEX.md`, а не весь каталог заранее.

## 5. Design route

1. Есть visual references до готовой системы → `prompts/05-design-system/01-visual-reference-principles.md`.
2. Нет style hypothesis queue → `prompts/05-design-system/02-design-style-shortlist.md`.
3. Нет active concept → `prompts/05-design-system/03-design-concept-prototypes.md`.
4. Concept rendered, feedback не зафиксирован → `prompts/05-design-system/04-design-concept-feedback.md`.
5. Feedback `needs iteration` → `prompts/05-design-system/05-design-concept-iteration.md`.
6. Concept approved, direction/North Star не зафиксированы → `prompts/05-design-system/06-approve-design-direction.md`.
7. Затем iconography → tokens → layout/responsive → components → accessibility → design-system review.

Reject всего concept запускает следующую hypothesis, а не косметическую iteration.

### gpt-taste

Explicit modes:

- `page` — concept через `03-design-concept-prototypes.md`;
- `block` — одна marketing/editorial секция через `00-gpt-taste-creative-build.md`;
- `component` — standalone expressive component; если spec отсутствует, сначала `prompts/07-page-planning/00-gpt-taste-component-spec.md`.

После явного approval run profile используй `prompts/08-block-build/07-approve-gpt-taste-profile.md`.

До вызова полностью прочитай integration guideline и original skill, проверь pinned SHA-256 и явно вызови `$gpt-taste`. Dashboard, checkout, forms, quality, SEO, deployment и maintenance не являются автоматическими triggers. Scope `block/component` не разрешает создавать page shell.

## 6. Next.js route

Порядок обязателен:

1. `prompts/06-nextjs-setup/01-project-preflight.md`;
2. `prompts/06-nextjs-setup/02-technical-architecture.md`;
3. `prompts/06-nextjs-setup/02-project-scaffold.md`;
4. App Router structure;
5. styling/design-system integration;
6. tooling;
7. next-ready review.

Technical architecture фиксирует CMS status, точные framework/runtime versions, hosting shape, sources of truth, data/rendering/cache matrix, public endpoint/security boundaries, critical scenarios и observability.

Major-version правила проверяй по документации установленной версии. Для Next.js 16 route учитывает Node.js `20.9+`, async request APIs, `proxy`, direct ESLint/Biome и explicit cache contract.

## 7. Page planning и block build

До реализации страницы нужны page scope, page spec, content/SEO plan, block breakdown и planning review.

Для смыслового блока до кода используй `prompts/07-page-planning/07-block-content-preview.md`, кроме явного пропуска пользователем. Approval фиксирует смысл, facts, claims, voice и CTA intent, но не line breaks и будущую композицию.

Build route:

- обычный native block → `prompts/08-block-build/00-build-block-fast-lane.md`;
- explicit gpt-taste block/component → `prompts/08-block-build/00-gpt-taste-creative-build.md`;
- deep mode → `prompts/08-block-build/01-block-build-preflight.md` только для формы, auth, checkout, payment, search/filter, сложной animation/data logic, критичного reuse или найденного риска.

Просьба сверстать всю страницу не отменяет поблочную реализацию без отдельного подтверждения риска.

Visible marketing build использует creator → live render → critic → one self-fix и применимые mobile/reference/wide checks из block prompt и layout rules.

## 8. Quality, e-commerce и deployment gates

- Короткая проверка блока → `prompts/09-quality/00-block-smoke-check.md`.
- Полный quality flow нужен сложному, критичному или проблемному scope.
- Перед handoff/deploy сайта с forms, CMS, auth, commerce или integrations выполни `prompts/09-quality/07-application-flow-check.md`.
- E-commerce получает флаг `ecommerce-needed`, но сохраняет основную stage. До page planning обязательны `prompts/11-ecommerce/12-commerce-operations-and-payment-safety.md` и `prompts/11-ecommerce/12-ecommerce-review.md`.
- Перед production deploy после Quality passed и domain planning нужен `prompts/13-technical-seo/01-pre-deploy-technical-seo.md`, кроме явного user-approved skip.
- После deploy smoke до monitoring/handoff нужен `prompts/13-technical-seo/02-production-seo-verification.md`.
- Search Console/Yandex ownership changes выполняются только после подтверждения пользователя.

## 9. Завершение шага

Обнови короткий current state, затем сообщи:

```md
Готово: [результат]
Зачем это нужно: [польза или снятый риск]
Что нужно от вас: [ничего / одно действие]

Следующий шаг: [одно действие обычными словами]
Зачем: [короткая причина]
```

Технический путь к следующему prompt показывай после объяснения. Если работа завершена или заблокирована, скажи это прямо и не создавай искусственную очередь.
