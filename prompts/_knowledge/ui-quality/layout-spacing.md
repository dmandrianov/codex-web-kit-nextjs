# UI quality: layout and spacing

Загружай этот модуль для композиции страницы, сетки, контейнеров, секций и ритма. Остальные UI-модули не открывай без связи с текущей задачей.

## 3. Layout и композиция страницы

### Правило 3.1. Страница должна иметь смену композиционных ролей

- Что проверять: идут ли подряд блоки одного типа: `heading + lead + 3 cards`, `heading + lead + 3 cards`, `heading + lead + 3 cards`.
- Почему это важно: даже аккуратные секции становятся однообразными, если у них одинаковая форма и одинаковое дыхание.
- Плохо: лендинг из hero, benefits, features, process, proof и pricing, где каждый блок - центрированный заголовок и grid cards.
- Лучше: hero с product artifact, затем scenario list, затем process board, затем proof strip, затем pricing table, затем focused CTA.
- Когда можно нарушить правило: каталог, blog grid, dashboard list и другие repeated collections, где повтор является смыслом.
- Как Codex должен применять это в проекте: в block breakdown вести `composition role` и `primary visual form`; при neighbor check менять форму соседнего блока, если он повторяет предыдущий.

### Правило 3.2. Сетка должна помогать сканированию, а не просто делить экран

- Что проверять: есть ли устойчивые columns, max-width, alignment points, media zones, aside zones, gutters и edge relationships.
- Почему это важно: случайные widths и плавающие alignment создают ощущение неуверенной верстки.
- Плохо: один блок 1180px, следующий 1040px, третий full-width с текстом на 900px, но без причины.
- Лучше: page layout фиксирует container roles: `reading`, `content`, `wide`, `full-bleed media`; блоки выбирают роль осознанно.
- Когда можно нарушить правило: immersive hero, map, gallery или 3D/canvas scene, где full-bleed является задачей.
- Как Codex должен применять это в проекте: в layout-rules.md описывать container roles; в block build не подбирать max-width на глаз.

### Правило 3.3. Композиция должна иметь focal point

- Что проверять: есть ли главный визуальный объект блока: форма, product screenshot, comparison table, price, map, quote, media, checklist.
- Почему это важно: без focal point блок превращается в равномерное поле текста и карточек.
- Плохо: feature section с восемью одинаковыми карточками, где непонятно, что смотреть первым.
- Лучше: слева короткое объяснение, справа реальный интерфейсный фрагмент; ниже 3 supporting features, которые поясняют artifact.
- Когда можно нарушить правило: FAQ и legal sections, где задача - спокойное чтение без визуального центра.
- Как Codex должен применять это в проекте: в content preview писать `main visual/artifact`; если его нет, выбирать typography-led или table-led композицию, а не декоративный mockup.

### Правило 3.4. Alignment важнее симметрии

- Что проверять: элементы выровнены по ясным линиям; асимметрия держится на сетке; visual weight сбалансирован.
- Почему это важно: симметрия не спасает хаотичные края, а хорошее alignment делает даже простую страницу дорогой.
- Плохо: две колонки выглядят центрированными, но заголовок, текст, кнопка и изображение имеют разные левые края.
- Лучше: текстовая колонка имеет один left edge, media edge связан с container, CTA aligned с текстом, badges не плавают случайно.
- Когда можно нарушить правило: poster-like hero или editorial layout, где intentional offset зафиксирован как прием.
- Как Codex должен применять это в проекте: при screenshot review проверять края, gutters и baseline, а не только цвет и размер.

### Правило 3.5. Fixed and fluid widths должны выбираться осознанно

- Что проверять: forms, sidebars, checkout summaries, search bars, compact panels, cards and media have min/max-width rules, not only percentage grid columns.
- Почему это важно: wide screens tempt UI to stretch. A form that works at 560px can become harder to read at 900px, and a sidebar that works at 280px can become absurd at 420px.
- Плохо: checkout fields stretch across the full desktop container; filter sidebar takes 30% of a wide monitor and becomes visually heavier than products.
- Лучше: checkout form has a readable max-width, order summary has a stable width, extra space becomes gutters or supporting content.
- Когда можно нарушить правило: data-heavy dashboards and comparison tables can use more width, but only when the extra width improves scanning or comparison.
- Как Codex должен применять это в проекте: in layout rules define which elements are fixed, fluid, constrained or full-bleed; in responsive review check wide desktop, not only mobile.

### Правило 3.6. Grid is an alignment tool, not an automatic layout answer

- Что проверять: grid columns support real content proportions; sidebars, media, forms and dense UI are not forced into arbitrary fractions.
- Почему это важно: a mathematically clean grid can still create awkward UI if content needs a stable working size.
- Плохо: dashboard uses 12-column math everywhere, so a compact settings menu becomes too wide and a chart becomes too narrow.
- Лучше: grid provides alignment points, but sidebar width, reading width, product cards and media zones use role-based constraints.
- Когда можно нарушить правило: editorial or magazine-like layouts can lean harder on grid rhythm, if content still remains readable.
- Как Codex должен применять это в проекте: do not use `grid-cols-12` as a substitute for content judgment; choose column behavior by task.

### Правило 3.7. Единый дизайнерский холст сохраняет композицию на wide desktop

- Что проверять: на reference desktop и wide CSS viewports сохраняются порядок визуальной иерархии, основные alignment axes, относительный вес focal object, читаемая ширина текста, связь copy/CTA/media и плотность секции. По умолчанию concept/fast sanity использует mobile, reference `1440x900 CSS px` и wide `2560x1440`; полная design-system/quality/handoff проверка добавляет `1920x1080`, а `3840x2160 CSS px` обязателен для true-4K/100% scaling, ultrawide или full-bleed target, иначе нужен явный reasoned skip. Если проект фиксирует другую matrix, она должна быть записана в `layout-rules.md`. Design canvas — это не viewport, а ограниченная внутренняя геометрия с project-specific caps.
- Почему это важно: responsive часто проверяют только между mobile и 1440px. Выше reference viewport процентные widths, `vw`, `vh`, `1fr` и бесконтрольные gaps раздвигают связанные элементы, делают строки и controls чрезмерно длинными, уменьшают focal point относительно пустого пространства и превращают цельную композицию в удалённые острова.
- Плохо: hero использует `width: 90vw` и `min-height: 100vh`; на 4K copy и media расходятся по краям, форма растягивается, карточки и gaps увеличиваются, следующий блок исчезает из первого viewport, а visual event теряет вес.
- Лучше: viewport работает как внешняя stage, внутри неё есть ограниченный design canvas с ролями `reading`, `content`, `wide` и `full-bleed`. Дополнительная ширина уходит во внешние gutters, фон, atmosphere или заранее объявленные expansion zones. Text measure, controls, forms, card geometry, column relation и core spacing перестают расти после проектного cap.
- Когда можно нарушить правило: data-heavy dashboard, map, timeline, gallery, immersive media, comparison surface или canvas/3D scene могут использовать больше ширины, если это улучшает задачу. Даже тогда нужны min/max rules, устойчивые anchors, явный wide-screen mode и проверка читаемости.
- Как Codex должен применять это в проекте: в `layout-rules.md` зафиксировать `Desktop Canvas Contract`: reference viewport, canvas roles/caps, gutters, stable invariants, allowed expansion zones, height behavior и режимы `hold / extend / recompose`. В visual review проверить CSS viewports, записать фактический `window.innerWidth` и отличать его от физического разрешения монитора. Не масштабировать страницу целиком через `transform`/`zoom` и не использовать неограниченный `vw`/`vh` для typography, spacing или component sizing. Цель — одинаковая композиционная логика и visual weight, а не pixel-identical screenshots.

### Правило 3.8. Native responsive first paint: холст правильный с первого кадра

- Что проверять: viewport задаётся до navigation или fresh reload, и первый видимый кадр уже имеет правильную mobile/reference/wide композицию. Серверная разметка и первый client render сохраняют одну semantic structure, а core geometry выбирается CSS Grid/Flex, media queries или container queries до hydration. `window.innerWidth` допустим как QA evidence, но не как источник initial layout.
- Почему это важно: layout, который сначала показывает reference-версию, а после mount переключает колонки или масштаб, создаёт видимый скачок, лишнюю client work и нестабильный первый экран. Settled screenshot может скрыть этот дефект.
- Плохо: компонент читает `window.innerWidth` или `matchMedia` в `useEffect`, после чего заменяет desktop DOM на mobile DOM, пересчитывает canvas scale и только тогда показывает корректную композицию. Hero media не имеет зарезервированной высоты и поздно двигает следующий блок.
- Лучше: сервер сразу отдаёт устойчивую semantic structure; CSS выбирает columns, order, gaps и caps для фактического viewport; responsive media имеет `width`/`height` или `aspect-ratio`, осознанный crop/focal point и source sizing под rendered width. JavaScript подключает interaction, но не исправляет основную геометрию после mount.
- Когда можно нарушить правило: chart, canvas/3D, virtualized surface или другой measured widget может зависеть от реальных пикселей. Его внешняя область должна быть зарезервирована до измерения, серверный и первый client render не должны конфликтовать, а исключение и причина записываются в delivery contract.
- Как Codex должен применять это в проекте: в `layout-rules.md` создать `First-render Responsive Delivery Contract` с полями `initial layout source`, `SSR/hydration invariant`, `JavaScript viewport dependency`, `reserved geometry`, `responsive asset sizing` и `font/loading stability`. Не дублировать полные mobile/desktop DOM trees только ради скрытия одного через CSS. В browser QA сравнивать early frame с settled state после cold/fresh load, искать viewport-dependent render branches, hydration warnings, layout shifts и фактически выбранные media resources.
## 4. Spacing и ритм

### Правило 4.1. Spacing должен быть шкалой, а не набором случайных gaps

- Что проверять: используются ли повторяемые значения для micro, element, group, section и page spacing.
- Почему это важно: случайные отступы делают интерфейс собранным вручную без системы.
- Плохо: `mt-7`, `mb-11`, `gap-5`, `py-19`, inline `style={{ marginTop: 37 }}` без причины.
- Лучше: spacing roles: `xs` для label/value, `sm` для элементов группы, `md` для card padding, `lg` для groups, `xl` для section.
- Когда можно нарушить правило: для optical correction у крупной типографики или media crop, если exception локален и объясним.
- Как Codex должен применять это в проекте: использовать tokens/classes из design system; при необходимости нового gap предложить обновить spacing scale.

### Правило 4.2. Внутренний и внешний spacing имеют разные роли

- Что проверять: padding внутри cards/buttons/forms не путается с gap между cards/sections.
- Почему это важно: если internal padding и external gap одинаковые, группы перестают читаться.
- Плохо: карточка с 24px padding, gap между карточками 24px и расстояние до heading тоже 24px - все связи одинаковые.
- Лучше: heading closer to lead, lead separated from grid, card internal padding smaller/larger по роли, section gap заметно больше group gap.
- Когда можно нарушить правило: в плотных tables/lists, где rhythm задается rows, а не большими section gaps.
- Как Codex должен применять это в проекте: в layout rules фиксировать `content group`, `card group`, `section transition`; в review проверять, что related/unrelated distances отличаются.

### Правило 4.3. Ритм страницы должен чередовать плотность

- Что проверять: есть ли после dense блока более спокойный блок; не идут ли подряд несколько визуально тяжелых секций.
- Почему это важно: пользователь устает, если каждый экран одинаково громкий или одинаково плотный.
- Плохо: dark hero, dark artifact, dark pricing, dark CTA подряд.
- Лучше: выразительный hero, светлый explanation, dense comparison, спокойный proof, focused CTA.
- Когда можно нарушить правило: product app, admin panel или checkout, где плотность является рабочей нормой; тогда нужно усилить группировку и sticky summaries.
- Как Codex должен применять это в проекте: в page planning вести visual pattern budget; при block build проверять 2-3 соседних блока.

### Правило 4.4. Mobile spacing не должен быть просто сжатым desktop

- Что проверять: сохраняется ли hierarchy после stack; не превращаются ли blocks в длинную однообразную ленту; CTA не уезжает слишком далеко.
- Почему это важно: мобильный пользователь видит меньше контекста, и слабая группировка там ломается быстрее.
- Плохо: desktop grid из 6 карточек становится 6 full-width cards с огромными padding и одинаковыми заголовками.
- Лучше: mobile использует compact rows, accordion, horizontal comparison, stepper или сокращенный summary, если это лучше сохраняет смысл.
- Когда можно нарушить правило: editorial page, где линейное чтение является целью.
- Как Codex должен применять это в проекте: в responsive pass проверять не только breakpoints, но и `does mobile still reveal the decision?`.

### Правило 4.5. Spacing scale должен быть оптическим, а не линейным

- Что проверять: small sizes have smaller steps, large layout distances have larger steps; spacing tokens reflect perceived difference, not arithmetic purity.
- Почему это важно: разница 4px внутри button или input может быть огромной, а 4px в hero width почти незаметны. Линейная шкала заставляет мелкий UI прыгать, а крупный - стоять на месте.
- Плохо: spacing scale `4, 8, 12, 16, 20, 24, 28, 32` используется одинаково для icon gaps, card padding, section spacing and page gutters.
- Лучше: compact roles have tight steps; section/page roles use larger jumps: micro, element, group, card, section, page.
- Когда можно нарушить правило: если дизайн-система уже наследует framework scale, но semantic roles всё равно должны ограничивать применение.
- Как Codex должен применять это в проекте: в tokens не выбирать spacing только потому, что он кратен 4; проверять optical effect в реальном компоненте.

### Правило 4.6. Optical alignment иногда важнее математического

- Что проверять: icon/text baseline, centered icons, uppercase labels, rounded buttons, media crops and asymmetric shapes look visually centered, not only mathematically centered.
- Почему это важно: разные формы имеют разный optical weight; идеально вычисленный center может выглядеть смещённым.
- Плохо: icon inside button mathematically centered but appears too low; text in pill looks off because uppercase has different optical height.
- Лучше: small optical adjustment is allowed through component token or local exception with explanation.
- Когда можно нарушить правило: data tables, grids and strict admin UI, where predictable geometry matters more than expressive optical correction.
- Как Codex должен применять это в проекте: не добавлять random nudges; если нужен optical correction, оформить как component rule, например icon offset or media focal point.

### Правило 4.7. Spacing должен делать группировку однозначной

- Что проверять: without borders or backgrounds, it is still clear which label belongs to which input, which metadata belongs to which card, and where one row/card ends.
- Почему это важно: ambiguous spacing forces users to infer structure, especially in forms, lists, checkout and dense product cards.
- Плохо: label-to-input gap equals input-to-next-label gap; product title is as close to previous card image as to its own price.
- Лучше: related elements sit closer; unrelated groups have a visibly larger gap or a light separator; form fields and errors feel attached.
- Когда можно нарушить правило: visible row separators or strong surfaces can carry grouping, but spacing should still not contradict them.
- Как Codex должен применять это в проекте: in visual review ask `what belongs together?`; if the answer relies on guessing, adjust gaps before adding borders.

### Правило 4.8. Start spacious, then tighten intentionally

- Что проверять: compact UI was tightened from a clear spacious version, not built cramped from the start.
- Почему это важно: adding space to a cramped layout often produces a merely acceptable interface; starting with breathing room reveals the real grouping and hierarchy.
- Плохо: admin widget squeezes metrics, filters and CTA into one row, then adds random 8px gaps to stop collisions.
- Лучше: first separate metrics, filter and CTA into clear groups; then reduce gaps only where density improves repeated work.
- Когда можно нарушить правило: mature design system with proven dense components can start compact because roles are already validated.
- Как Codex должен применять это в проекте: for new components, make a clear version first; compact it only after hierarchy, labels and states are stable.

### Правило 4.9. Separation has an escalation ladder

- Что проверять: separation uses the lightest tool that works: proximity, whitespace, surface tint, subtle divider, border, then shadow/layer.
- Почему это важно: too many borders make UI noisy; too few separators make grouping ambiguous. The right answer is usually a ladder, not one default.
- Плохо: every row, card, toolbar and nested panel has a visible border.
- Лучше: date groups in an orders list use gap and muted header; row separators appear only where scanning needs them; selected row uses surface change.
- Когда можно нарушить правило: high-density financial or technical tables may need more explicit separators.
- Как Codex должен применять это в проекте: before adding a border or shadow, try spacing and surface contrast; record stronger separators as component rules.
