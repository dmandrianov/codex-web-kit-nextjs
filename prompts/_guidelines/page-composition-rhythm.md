# Page Composition and Rhythm Guidelines

Этот файл удерживает страницу как одну историю. Он не заставляет каждый блок изобретать новый стиль и не запрещает полезный повтор.

Работай по `prompts/_guidelines/creator-critic-design-workflow.md`: короткое направление для creator, проверка ритма после живого render.

## Главная цель

Человек должен двигаться от вопроса к ответу, от сомнения к действию. Каждый блок добавляет новый смысл, а визуальный темп страницы чередует акцент, объяснение, доказательство и паузу.

## Source of truth

Используй только релевантное для текущего решения:

- `docs/design-system/visual-north-star.md` и approved screenshots;
- `design-tokens.md`, `iconography.md`, `layout-rules.md`, `component-inventory.md`;
- page spec, block breakdown и текущий block spec;
- 2–4 соседних блока или их screenshots;
- нужные разделы `ui-design-quality.md` на critic/quality этапе.

Из `layout-rules.md` извлеки Desktop Canvas Contract: reference viewport, canvas roles/caps, stable invariants, expansion zones и wide-screen modes.

## Page story

Для каждого смыслового блока ответь:

- какой вопрос он закрывает;
- что человек узнаёт впервые;
- какое изменение понимания или действие должно произойти;
- какой блок идёт до и после;
- можно ли объединить соседние части, если они решают одну задачу.

Один блок обычно имеет один главный job. Это правило о смысле, а не требование к одной визуальной форме.

## Composition roles

| Role | Задача | Возможные формы |
| --- | --- | --- |
| Entry | объяснить, куда попал человек | hero, media-led intro, compact facts |
| Tension | назвать проблему или риск | contrast, scenario, before/after |
| Orientation | объяснить устройство или ход | map, timeline, process, demonstration |
| Proof | показать, почему верить | real media, artifacts, cases, sourced facts |
| Offer | объяснить состав и условия | package, pricing, included/excluded |
| Decision help | снять сомнение | FAQ, comparison, fit/boundaries |
| Action | дать следующий шаг | focused CTA, form, contact band |

Соседние секции могут повторять brand anchors, surface language, type rhythm и media treatment. Механический повтор одной формы без смысловой причины — сигнал для critic, а не автоматический запрет.

## Marketing chapter composition

Для marketing, editorial и storytelling страниц рассматривай 2–4 соседних смысловых блока как одну главу.

До build:

- посмотри соседние specs и живые sections;
- реши, где в главе акцент, пауза, объяснение и переход;
- определи общие alignment spines, surface flow и смену плотности;
- реализуй основной scope текущего блока.

После full-page eyes-check разрешены узкие исправления соседей, если без них глава распадается:

- section spacing;
- surface/background continuity внутри существующих semantic tokens;
- transition/divider;
- alignment spine;
- локальный media crop или безопасный visual handoff.

Нельзя без отдельного scope:

- переписывать смысл или публичные claims соседа;
- менять его product/business logic;
- менять CTA intent;
- перестраивать form states, data behavior или navigation;
- маскировать слабый текущий блок большой переделкой страницы.

Запиши такие изменения как `chapter correction` с причиной и файлами.

## Product and business logic remain strict

Для dashboard, checkout, cart, account, settings, forms с бизнес-логикой, data tables и других functional flows действует строгий one-block scope.

Соседей можно только просмотреть на regression. Любая правка их логики, states, validation, data или action hierarchy требует отдельного scope.

## Pattern observation

Смотри за повтором, но не веди квоту:

| Pattern | Вопрос critic |
| --- | --- |
| Dark/raised surface | держит ли он главу или делает её тяжёлой? |
| Cards/grid | помогает ли сравнению или всё стало каталогом? |
| Numbered rows | отражают ли они настоящую последовательность? |
| Display type | создаёт ли акт истории или конкурирует с Hero? |
| Badges/chips | кодируют ли они реальный статус/категорию? |
| Artifact/mock UI | это real, schematic или misleading proof? |
| New visual device | продолжает ли North Star и решает ли задачу? |

## Semantic tokens and expressive exception

Truth, accessibility и semantic token roles остаются hard boundaries.

Marketing creator может добавить один purposeful expressive exception по `anti-ai-slop-design-and-copy.md`. Для локального опыта допустим один component-scoped named variable/class, но не россыпь raw values, новый semantic meaning или icon pack. После render запиши его как provisional pattern:

- что добавлено;
- какую functional/narrative/emotional/brand/atmospheric role выполняет;
- где использовано;
- решение critic: keep/revise/remove;
- нужно ли позже обновить design-system docs.

## Real material preference

Proof, process и trust лучше строить из реального интерфейса, документа, фото, карты, результата, review или source-backed факта. Illustration допустима как explanation или atmosphere, если не выдана за proof.

Если материала нет, зафиксируй `needs source/proof`. Не заполняй пустоту убедительным fake UI.

## Neighbor check for creator

До render достаточно 4–6 релевантных направлений:

- job блока и роль в главе;
- 2–3 continuity anchors;
- главный focal/material opportunity;
- один важный responsive/canvas invariant;
- creative freedom;
- hard boundary, если он действительно нужен.

Полный UI checklist до render не нужен.

## Post-render chapter critic

После каждых 3–4 реализованных marketing-блоков или при заметном drift:

1. открой full-page view;
2. просмотри mobile, `1440 CSS px` и wide guard не уже `2560 CSS px`;
3. перед final/deep quality проверь полную матрицу `1440 / 1920 / 2560`, а `3840` — для true-4K/full-bleed/ultrawide target или с reasoned skip;
4. сравни с Visual North Star, approved concept/Hero и предыдущим принятым состоянием;
5. выбери максимум три проблемы с самым большим влиянием;
6. если нужна chapter correction, сделай один узкий pass и повторно просмотри страницу.

Critic проверяет:

- ощущается ли страница одним сайтом;
- есть ли чередование акцента и паузы;
- не повторяется ли одна форма без причины;
- не расходятся ли copy/media/CTA на wide desktop;
- сохраняются ли alignment spines, focal weight и section density;
- не стал ли результат отчётом, шаблоном или набором несвязанных секций;
- не нарушены ли truth, accessibility, semantic tokens и responsive.

Это проверка уже существующего render, а не обязательный HTML-preview каждого будущего блока.
