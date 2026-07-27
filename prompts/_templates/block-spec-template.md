# Block spec: [Название блока]

## Identity

- Page:
- Route:
- Block:
- Order:
- Spec status: draft / ready / needs fixes
- Source page spec:
- Source content/SEO plan:

## Цель блока

[Что пользователь должен понять или сделать после этого блока.]

## User question

[На какой вопрос пользователя отвечает блок.]

## Page context and rhythm

- Previous block:
- Next planned block:
- What this block adds:
- Composition role: entry / tension / orientation / proof / offer / decision help / action
- Continuity anchors from Visual North Star:
- Composition freedom:
- Visual opportunity / possible focal material:
- Visual risk: low / medium / high
- Patterns already used nearby:
- Repetition to watch, not automatically ban:
- Scope mode: product/business one-block strict / marketing chapter
- Marketing chapter (2-4 blocks), if applicable:
- Narrow neighbor corrections allowed after full-page eyes-check: spacing / surface / transition / alignment / media handoff / none

## Copy direction

- Main meaning:
- Confirmed facts:
- Allowed claims and limitations:
- CTA intent:
- Formula fallback, only if a diagnosed copy problem needs it:
- Tone:
- Voice/person:
- Main user pain:
- Phrases that may sound internal:
- User decision needed before build: yes/no
- Approval locks: meaning / facts / claims / voice / CTA intent
- Flexible until render: exact wording / line breaks / final length / composition
- Locked copy, if any:

## Scope

### In scope

- 

### Out of scope

- 

## Контент

- Заголовок:
- Подзаголовок:
- Основной текст:
- CTA:
- Proof/data:
- Медиа:
- Дополнительные элементы:
- Факты, которые нельзя выдумывать:

## Text density budget

- Heading length:
- Lead length:
- Card text length:
- Max paragraphs:
- What must stay short:
- Where longer explanation is allowed:
- Words/phrases to avoid:

## Reference adaptation

- Source reference:
- Preserve:
- Adapt:
- Replace with design system:
- Forbidden to copy:

## Поведение

- Reference desktop 1440 CSS px:
- Wide desktop / 4K:
- Canvas role: reading / content / wide / full-bleed
- Wide-screen mode: hold / extend / recompose
- Stable invariants / allowed expansion zone:
- Initial layout source: CSS
- JavaScript viewport dependency: none / justified exception
- Reserved geometry for media / measured surface:
- Responsive asset sizing and loading role:
- Tablet:
- Mobile:
- Hover/focus:
- Empty/loading/error states:
- Data states:

## Дизайн-система

- Creator engine: native / gpt-taste
- gpt-taste mode: block / component / not applicable
- Engine selection reason:
- Explicit user override: yes / no
- gpt-taste profile:
- Locked profile choices:
- Open RNG choices:
- Visual North Star:
- Approved visual evidence:
- Используемые токены:
- Semantic token invariants:
- Provisional visual values/patterns allowed for this creator pass:
- Iconography lock:
- Layout rules:
- Desktop Canvas Contract:
- First-render Responsive Delivery Contract:
- Page rhythm rules:
- Компоненты:
- Иконки/изображения:
- Accessibility:
- Creator brief, 4-6 relevant directions:
- Purposeful expressive opportunity:
- Expressive role: functional / narrative / emotional / brand / atmospheric
- Hard boundaries: truth / accessibility / semantic token roles / explicit user feedback
- Full checklist stage: post-render quality critic

## Файлы

- Создать:
- Изменить:
- Не трогать:

## Checks

- Visual:
- Mobile/reference-desktop/wide screenshots visually inspected:
- Canvas continuity checked at 1440 and at least 2560 CSS px:
- Fresh-load first frame compared with settled state:
- Post-mount canvas correction: none / blocker
- Selected media resource and reserved geometry verified:
- Compared with North Star and neighboring blocks:
- Self-fix if result feels like another site/report/table without reason:
- Screenshot critic: maximum 3 findings and one focused self-fix:
- Provisional pattern decision: keep / revise / remove / promote later
- Marketing chapter corrections, if any:
- Responsive:
- Accessibility:
- Browser:
- Lint/type/build:

## Done when

- Creator engine/mode заданы явно; без явного `gpt-taste` используется native route.
- Основной build scope — текущий блок.
- Для marketing chapter основной scope остаётся текущим блоком; разрешены только задокументированные узкие corrections соседей после full-page eyes-check.
- Для product/business UI соседняя логика, states, data и actions не менялись.
- Блок соответствует page spec и block spec.
- Адаптив проверен.
- Текст не перекрывается и не выпадает.
- Текст не превышает density budget без причины.
- Блок не выглядит как generic autopilot; заметные приёмы имеют functional, narrative, emotional, brand или atmospheric role.
- Truth, accessibility и semantic token roles не нарушены.
- Один purposeful expressive exception допустим внутри Visual North Star и записан как provisional pattern.
- Блок не повторяет соседний смысл/layout/pattern механически без причины.
- Блок узнаётся как часть утверждённого visual direction, но не обязан копировать layout Hero или соседей.
- Codex использовал композиционную свободу и проверил результат глазами по mobile/reference-desktop/wide screenshots.
- Critic назвал максимум три главные проблемы, сделал один focused self-fix и повторно проверил screenshots.
- Desktop Canvas Contract соблюдён: wide viewport не растягивает hierarchy, text measure, controls, card geometry, core gaps или связь copy/media без объявленного wide mode.
- Responsive composition правильна с первого кадра: CSS выбирает initial geometry, hydration не меняет canvas, media/measured surfaces резервируют место и не загружают избыточный asset без причины.
- Соседние блоки не сломаны.
- Reference, если был, адаптирован под дизайн-систему, а не скопирован.
- Проверки проекта проходят или проблемы явно зафиксированы.
