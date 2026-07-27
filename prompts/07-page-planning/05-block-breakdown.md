# Разбить страницу на задачи по блокам

## Когда использовать

После page spec, reference adaptation и content/SEO plan, перед реализацией одного блока.

## Роль Codex

Ты действуешь как frontend lead, который нарезает страницу на безопасные маленькие задачи.

## Цель

Создать `docs/pages/[page-slug]/block-breakdown.md` и отдельные block specs в `docs/pages/[page-slug]/blocks/`: каждая задача должна быть достаточно маленькой для одного native fast-lane или одного `gpt-taste` creative build. Для complex блоков можно явно отправить в deep mode.

## Контекст, который нужно дать

- `docs/pages/[page-slug]/page-scope.md`.
- `docs/pages/[page-slug]/page-spec.md`.
- `docs/pages/[page-slug]/content-seo-plan.md`.
- `docs/content/editorial-rules.md`, если есть.
- `prompts/_guidelines/anti-ai-slop-design-and-copy.md`.
- `prompts/_guidelines/page-composition-rhythm.md`.
- `prompts/_guidelines/creator-critic-design-workflow.md`; из UI quality выбирай только 4–6 релевантных creator criteria на блок.
- `prompts/_guidelines/gpt-taste-integration.md`.
- `docs/design-system/gpt-taste-profile.md`, если есть.
- `docs/pages/[page-slug]/references/*.md`, если есть.
- `docs/design-system/design-tokens.md`.
- `docs/design-system/visual-north-star.md`.
- `docs/design-system/iconography.md`.
- `docs/design-system/layout-rules.md`.
- `docs/design-system/component-inventory.md`.
- `docs/design-system/accessibility.md`.
- `docs/nextjs/app-router-structure.md`.
- Текущая структура проекта.
- Шаблон `prompts/_templates/block-spec-template.md`.

## Ограничения

- Не реализуй блоки в этом промпте.
- Не объединяй несколько крупных секций в одну задачу.
- Не делай всю страницу одним block spec.
- Если блок сложный, раздели его на structure, responsive, interaction или data states.
- Не превращай screenshot в задачу "скопировать". В block spec фиксируй preserve/adapt/forbidden-to-copy.
- Не добавляй блоки без связи с page spec.
- Не создавай block spec без text density budget для обычных блоков.
- Не создавай block spec без роли блока в общей истории страницы: entry, tension, orientation, proof, offer, decision help или action.
- Не планируй несколько соседних блоков на generic autopilot. Повтор сильного brand/atmospheric pattern допустим, если держит chapter и имеет роль.
- Truth, accessibility и semantic token roles остаются hard boundaries. Для marketing block можно наметить один purposeful expressive opportunity как provisional, не фиксируя его заранее.
- Не превращай block spec в детальный макет до кода. Он должен задать job, continuity anchors, visual risk и пространство композиционной свободы.
- Не назначай `gpt-taste` каждому видимому блоку. По умолчанию engine `native`; `gpt-taste` получает только выразительный marketing/editorial scope, где новый visual principle действительно нужен.
- Product/business UI, checkout, dashboard, forms, data и локальная техническая задача не получают `gpt-taste` автоматически.

## Процесс

1. Пройди по page spec и content/SEO plan.
2. Для каждой секции реши, является ли она одним блоком или требует дробления.
3. Создай `docs/pages/[page-slug]/block-breakdown.md` с порядком реализации, зависимостями, техническим риском и отдельным visual risk.
4. Для каждого блока создай отдельный block spec по шаблону.
5. Составь page story: что нового даёт каждый блок после предыдущего.
6. Для marketing/editorial страницы собери главы по 2–4 соседних блока. Отметь story arc, shared spines/surfaces и разрешённый narrow correction scope после full-page eyes-check. Product/business logic blocks отметь one-block strict.
7. Составь наблюдательный visual pattern budget. Не используй его как автоматический запрет сильного brand anchor.
8. Для каждого блока добавь creator handoff из 4–6 релевантных направлений: job, positive anchors, material/focal opportunity, freedom, canvas invariant и настоящий hard boundary. Не переносить полный UI checklist до render.
9. Для каждого spec явно выбери:
   - `Creator engine: native` и `gpt-taste mode: not applicable`;
   - либо `Creator engine: gpt-taste` и mode `block` для смысловой секции;
   - либо `Creator engine: gpt-taste` и mode `component` для самостоятельного reusable expressive object со specimen/states.
10. При `gpt-taste` укажи reason, profile, locked choices, open RNG choices и explicit user override. Не выбирай `component`, если deliverable на самом деле целая секция.
11. В block spec укажи: цель, user question, composition role, chapter/scope mode, creator route, continuity anchors, freedom, visual risk, content locks, optional formula fallback, text density, canvas mode, first-render delivery, media geometry/source role, components, semantic tokens, states, checks и out of scope.
12. Для visible marketing block зафиксируй creator → live render → screenshot critic: mobile, `1440 CSS px`, wide guard >=`2560 CSS px`, максимум 3 findings и один focused self-fix. Для `gpt-taste` findings возвращаются `$gpt-taste`.
13. Если у блока есть reference adaptation, добавь preserve/adapt/forbidden-to-copy.
14. Выбери первый блок для реализации и его route:
   - native → `prompts/08-block-build/00-build-block-fast-lane.md`;
   - gpt-taste → `prompts/08-block-build/00-gpt-taste-creative-build.md`.
15. Обнови `docs/project-state.md`: отметь `Block breakdown created`, creator route первого блока и следующий промпт.

## Output

Создай или обнови:

- `docs/pages/[page-slug]/block-breakdown.md`;
- `docs/pages/[page-slug]/blocks/[01-block-slug].md`;
- следующие block specs по необходимости.

Формат `block-breakdown.md`:

```md
# Block Breakdown: [Page name]

## Implementation order

| Order | Block | Spec path | Scope | Creator engine | Mode | Dependencies | Technical risk | Visual risk | Build prompt | Ready |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

## First block to build

## Deferred blocks

## Cross-block constraints

## Page story

| Order | Block | User question | New information after previous block | Composition role | Visual opportunity / material |
| --- | --- | --- | --- | --- | --- |

## Marketing chapters and strict product scopes

## Creator handoff by block

## Visual pattern budget

| Pattern | Planned use | Limit/risk | Notes |
| --- | --- | --- | --- |

## Semantic token and iconography invariants

## Provisional expressive opportunities

## Visual North Star carryover

## Desktop canvas carryover

## Page-level eyes-check cadence
```

В ответе кратко покажи:

- список блоков;
- первый блок для реализации;
- какие блоки требуют отдельного responsive/interaction pass;
- следующий промпт по router.

## Done when

- Вся страница разбита на маленькие задачи.
- Каждая задача имеет чёткие границы и отдельный block spec.
- У каждого обычного блока есть copy budget, чтобы реализация не раздувала текст.
- У каждого смыслового блока есть `User question`; copy formula указана только как fallback для конкретной проблемы.
- У каждого смыслового блока есть composition role и короткая проверка соседних блоков.
- У каждого visible marketing block есть continuity anchors, composition freedom, visual risk и post-build screenshot check.
- У каждого block spec явно выбран native/gpt-taste route; для gpt-taste указан mode `block` или `component`.
- У каждого блока есть 4–6 релевантных creator directions; полный UI checklist оставлен post-render quality.
- Marketing chapters и one-block strict product/business scopes разделены.
- Purposeful expressive opportunity может быть provisional, а не запрещена до render.
- У каждого visible block есть canvas role и wide-screen mode; full-bleed/extend exceptions называют expansion zone, а не растягивают core content по умолчанию.
- У каждого visible block initial geometry CSS-first; viewport-dependent mount branch, unreserved media и один oversized asset для всех widths отмечаются как blocker/risk.
- Есть visual pattern budget, который предотвращает повтор одинаковых cards, dark artifacts, numbered rows, accent dots и hero-like headings.
- Visual pattern budget остаётся наблюдательным и не заставляет менять общий стиль ради искусственного разнообразия.
- Block specs сохраняют semantic token roles и iconography; purposeful marketing exception помечен provisional, а не запрещён или молча превращён в global token.
- Reference screenshots привязаны к конкретным block specs и адаптированы под дизайн-систему.
- Первый block spec передаётся в native fast lane или gpt-taste creative build согласно записанному route.
- `docs/project-state.md` обновлен.

## Follow-up

Следующий промпт: `prompts/07-page-planning/06-page-planning-review.md`.

Перед реализацией блока нужно пройти review, если страница новая или block breakdown содержит риски.
