# Стандарт визуального качества UI и страниц

Этот документ является самостоятельным стандартом Prompt Kit для UI-дизайна, композиции страниц и визуального качества интерфейсов. Он не является пересказом, конспектом, адаптацией или заменой каких-либо книг, курсов или платных материалов.

## Назначение

Используй этот стандарт как базу знаний, когда Codex выбирает дизайн-направление, делает HTML/CSS visual concepts, планирует страницу, описывает visual idea блока, верстает один блок, проводит visual review или исправляет плохой UI.

Стандарт не заменяет дизайн-систему проекта. Он помогает проверить, что дизайн-система, page spec, block spec и реализация дают ясную и живую страницу: понятную иерархию, устойчивый ритм, уместные цвета, хорошие формы, честные CTA, аккуратные карточки, читаемые таблицы и рабочий responsive.

## Как читать этот документ

- Сначала определи режим: `creator`, `critic` или `quality` по `prompts/_guidelines/creator-critic-design-workflow.md`.
- До первого render creator не читает этот документ целиком. Просмотри заголовки и выбери 4–6 правил, которые прямо помогают текущей композиции.
- После render critic может использовать полный документ как reference, но возвращает максимум три главных visual findings и делает один связный self-fix.
- Полная таблица `UI quality check` относится к quality stage, а не к creator brief.
- Если проект уже имеет `docs/design-system/*`, не вводи новые tokens, цвета, тени, radius, шрифты, иконки или компоненты без обновления этих документов.
- Если правило конфликтует с подтвержденным design direction, сначала зафиксируй конфликт и предложи точечное изменение дизайн-системы.
- Если данных не хватает, отмечай `needs proof`, `needs visual asset`, `needs token`, `needs component` или `needs user decision`.
- Если Codex не понимает, как правило выглядит на практике, открой `22. Практические before/after examples` и найди ближайший сценарий: hero, pricing, form, table, dashboard, e-commerce, responsive или anti-slop fix.

### Быстрый выбор правил для creator

| Задача | Сначала смотри |
| --- | --- |
| Visual concept / hero | 1.1–1.2, 1.5, 1.9, 2, 3.3, 12, 18.1–18.7 |
| Marketing block | 1.1–1.3, 2, 3.1–3.4, 8, 15, 18 |
| Form / CTA | 2, 4, 5, 9–10, 18.1–18.3 |
| Pricing / choice | 2, 6, 9, 13, 18 |
| Table / dashboard | 1.5–1.8, 2, 3.5–3.7, 11, 16, 18 |
| E-commerce | 2, 5–6, 9, 17–18 |
| Critic / fix | 19–22 плюс разделы конкретного UI |

Это карта, а не новый checklist. Из выбранных разделов активируй только 4–6 критериев, остальные оставь для critic и quality.

## 1. Главные принципы визуального качества

### Правило 1.1. У каждого экрана и блока есть один главный визуальный job

- Что проверять: можно ли одной фразой сказать, что блок должен дать пользователю: понять предложение, выбрать тариф, сравнить варианты, довериться proof, заполнить форму, перейти к покупке.
- Почему это важно: если блок одновременно продает, объясняет, доказывает, навигирует и развлекает, композиция распадается на шум.
- Плохо: hero с H1, длинным lead, тремя CTA, четырьмя badge, псевдо-dashboard, отзывом, списком преимуществ и формой в одном первом экране.
- Лучше: hero отвечает на `что это / для кого / что делать`, proof уходит в следующий блок, форма появляется там, где человек уже понимает ценность.
- Когда можно нарушить правило: в dense SaaS dashboard или checkout summary, где на одном экране много задач, но и там должен быть главный action или главный status.
- Как Codex должен применять это в проекте: в page spec и block spec фиксировать `visual job`; при build удалять декоративные элементы, которые не помогают этому job.

### Правило 1.2. Дизайн начинается с содержания, а не с контейнера

- Что проверять: есть ли реальные материалы: продукт, фото, скриншот, таблица, документ, карта, список условий, пример результата, отзыв, price breakdown.
- Почему это важно: пустой контейнер заставляет заполнять интерфейс cards, gradients, icons и badges без смысла.
- Плохо: блок `Преимущества` из шести одинаковых карточек с общими словами: `качество`, `скорость`, `поддержка`, `опыт`.
- Лучше: блок показывает три реальные ситуации: `заявка с телефона`, `ошибка оплаты`, `повторный заказ`, и для каждой дает конкретный ответ UI или сервиса.
- Когда можно нарушить правило: на раннем visual concept можно использовать реалистичный placeholder, если он явно помечен и не имитирует proof.
- Как Codex должен применять это в проекте: перед visual idea спрашивать, какой материал или факт несет блок; если материала нет, предлагать компактный текстовый формат или пометку `needs material`.

### Правило 1.3. Система важнее красивой единичной секции

- Что проверять: повторяются ли typography roles, spacing scale, button hierarchy, surface levels, card rules, icons, form states и responsive behavior.
- Почему это важно: сайт выглядит профессионально, когда решения повторяются осмысленно; случайно красивый блок ломает доверие к остальным.
- Плохо: один блок использует 24px radius и glow, другой 4px radius и sharp borders, третий вводит новый синий CTA без причины.
- Лучше: все блоки используют утвержденные tokens, а выразительность создается композицией, размером, материалами и контрастом секций.
- Когда можно нарушить правило: для campaign hero, launch banner или editorial feature, если exception заранее описан в design direction.
- Как Codex должен применять это в проекте: в build и review проверять `token/color/icon lock`; любое новое значение выносить в proposal, а не внедрять молча.

### Правило 1.4. Визуальное качество видно в мелких связях

- Что проверять: совпадают ли края элементов, есть ли логичные расстояния, не скачут ли baseline и высоты кнопок, совпадают ли icon sizes, не спорят ли border и shadow.
- Почему это важно: интерфейс может иметь хорошие цвета и шрифты, но выглядеть слабым из-за мелкой несогласованности.
- Плохо: карточки одной группы имеют разные padding, разные высоты заголовков, разное положение CTA и разные размеры иконок.
- Лучше: группа карточек использует одну сетку, одинаковый internal rhythm, выравнивание CTA и единый icon role.
- Когда можно нарушить правило: в editorial collage или masonry, где намеренная асимметрия является частью направления.
- Как Codex должен применять это в проекте: при screenshot review смотреть не только на крупную композицию, но и на edges, baselines, gaps, icon optical size, text overflow.

### Правило 1.5. Проектируй важную feature, а не абстрактную оболочку

- Что проверять: дизайн начинается с конкретного пользовательского действия, состояния или объекта: поиск, выбор тарифа, заполнение заявки, сравнение товаров, просмотр заказа, настройка фильтра.
- Почему это важно: когда Codex начинает с "красивой страницы", он часто делает общий shell: hero, cards, gradient, nav. Когда начинает с feature, появляются реальные ограничения: данные, states, action priority, errors, density.
- Плохо: сначала придумать общий dashboard layout, а потом пытаться впихнуть в него таблицу заказов, фильтры и empty states.
- Лучше: сначала спроектировать один рабочий сценарий: список заказов с фильтром, статусами, пустым состоянием и primary action; потом собрать вокруг него layout.
- Когда можно нарушить правило: брендовая promo page или editorial landing, где главный объект - история, визуальный образ или оффер, а не повторяемое действие.
- Как Codex должен применять это в проекте: в design concept и block preview выбирать тестовый блок с реальным UI pressure: тарифы, форма, карточка товара, таблица, фильтр, checkout summary, а не только красивый hero.

### Правило 1.6. Ясность и характер должны появляться вместе

- Что проверять: остаются ли понятными структура, действие, relation between groups, text hierarchy и states, когда выразительный приём уже присутствует.
- Почему это важно: характер помогает найти сильную композицию, но не должен маскировать слабую иерархию. Creator не обязан сначала делать намеренно скучный вариант.
- Плохо: блок выглядит "богато" за счет gradient border, shadow, blur and badges, но CTA теряется, price непонятен, group spacing случайный.
- Лучше: один осознанный expressive device — выразительный heading, image treatment, пространственный объект или meaningful depth — сразу поддерживает понятный visual job.
- Когда можно нарушить правило: expressive campaign, game, portfolio или event site, где визуальный удар является продуктом. Но и там action/hierarchy должны быть читаемы.
- Как Codex должен применять это в проекте: в creator pass искать ясную и выразительную композицию одновременно; в critic pass убирать только тот декор, который не помогает visual job или чтению.

### Правило 1.7. UI не должен обещать функциональность, которую нельзя сделать сейчас

- Что проверять: tabs, menu items, filters, upload zones, integrations, automations, reports and states correspond to the shippable scope.
- Почему это важно: нарисованная, но неготовая функциональность раздувает layout, создаёт ложное ожидание и часто блокирует выпуск простой полезной версии.
- Плохо: billing screen показывает `API sync`, `Scheduled reports`, `Auto-reconcile` и `Team approvals`, хотя в текущем build есть только CSV import.
- Лучше: экран честно проектирует рабочий CSV import, validation state, error recovery and next step; будущие возможности отмечены как roadmap, а не как готовый UI.
- Когда можно нарушить правило: в concept prototype можно показать будущую capability, если она явно помечена как concept and not production scope.
- Как Codex должен применять это в проекте: в block preview and build проверять `shippable scope`; всё, что нельзя реализовать сейчас, убирать или помечать как `future / needs confirmation`.

### Правило 1.8. Grayscale pass помогает увидеть слабую иерархию до цвета

- Что проверять: если убрать brand color, gradient and decorative media, остаются ли понятными scan order, primary action, selected state, errors and grouping.
- Почему это важно: цвет часто маскирует слабую композицию. Если блок работает в grayscale, цвет усиливает его, а не спасает.
- Плохо: pricing selector понятен только потому, что recommended plan залит ярким цветом; без цвета cards становятся равными.
- Лучше: selected plan сильнее по structure, spacing, border/surface and CTA hierarchy; color добавляет характер, но не является единственным сигналом.
- Когда можно нарушить правило: brand campaign может зависеть от цвета, но forms, checkout, dashboard, pricing and controls still need non-color hierarchy.
- Как Codex должен применять это в проекте: в design concepts and visual review проверять screenshot mentally or technically in grayscale before adding new accents.

### Правило 1.9. Personality должна переводиться в конкретные UI-рычаги

- Что проверять: design direction описывает не только mood, но и type choice, radius, density, color temperature, surface style, motion, icons and microcopy.
- Почему это важно: без конкретных рычагов "строго", "дружелюбно", "дорого" или "технологично" остаются словами, а блоки начинают выглядеть случайно.
- Плохо: direction says `premium and modern`, but one block uses playful rounded cards, another sharp enterprise tables, another neon gradients.
- Лучше: premium service direction fixes restrained type scale, small radius, quiet shadows, warmer neutral palette, sparse motion and precise CTA language.
- Когда можно нарушить правило: early mood exploration can stay broad, but approved design direction must become operational.
- Как Codex должен применять это в проекте: при выборе дизайн-направления переводить personality into tokens and component behavior, not only adjectives.

## 2. Visual hierarchy

### Правило 2.1. Первый взгляд должен найти главный смысл и главное действие

- Что проверять: за 3-5 секунд понятно ли, что важнее всего: H1, product artifact, price, form field, table status, primary CTA.
- Почему это важно: пользователь сканирует страницу, а не собирает смысл из равных по весу элементов.
- Плохо: H1, badge, иллюстрация, CTA, secondary CTA, логотипы и карточка с метрикой имеют одинаковый контраст и размер.
- Лучше: H1 и primary CTA сильнее, secondary action тише, proof заметен, но не конкурирует за первый взгляд.
- Когда можно нарушить правило: в инструментальных интерфейсах, где главный смысл - состояние системы, а не marketing CTA.
- Как Codex должен применять это в проекте: в visual idea назвать hierarchy order: `1 H1`, `2 primary action`, `3 proof`, `4 secondary details`; в CSS поддержать этот порядок размером, контрастом и spacing.

### Правило 2.2. Иерархия строится несколькими способами, а не только размером

- Что проверять: используются ли размер, вес, цвет, whitespace, proximity, alignment, position, background, media scale и motion с разными ролями.
- Почему это важно: если все важное только крупное, страница становится крикливой и плохо масштабируется на mobile.
- Плохо: каждый section heading почти как hero, все кнопки primary, все карточки с яркой обводкой.
- Лучше: ключевой блок крупнее, supporting headings спокойнее, детали читаемые, но не громкие; contrast используется для выбора, а не для украшения.
- Когда можно нарушить правило: на коротком one-screen promo, где весь экран работает как один большой CTA.
- Как Codex должен применять это в проекте: при design tokens задавать roles, а не только размеры; при review ловить `everything is important` эффект.

### Правило 2.3. Proximity сильнее декоративной рамки

- Что проверять: связанные элементы ближе друг к другу, чем к соседним группам; label рядом с value; error рядом с field; price рядом с периодом и условиями.
- Почему это важно: расстояние сообщает структуру быстрее, чем border, icon или подпись.
- Плохо: форма выглядит как список одинаково удаленных полей, а error вынесен в общий alert далеко от проблемного input.
- Лучше: поля группируются по смыслу, error появляется под конкретным input, submit отделен от полей чуть большим gap.
- Когда можно нарушить правило: в сложных enterprise forms, где общий alert нужен для screen readers и summary, но локальные errors все равно остаются.
- Как Codex должен применять это в проекте: в layout rules фиксировать spacing scale для groups; при build не решать структуру одними border/card.

### Правило 2.4. De-emphasis так же важен, как emphasis

- Что проверять: вторичные элементы не просто меньше, а реально тише: lighter weight, muted color, lower surface priority, position after primary information, shorter copy.
- Почему это важно: иерархия создается не только усилением главного, но и ослаблением второстепенного. Если всё одинаково громкое, пользователь не видит путь.
- Плохо: card title, description, metadata, badge, price, rating and CTA all use high contrast and bold weights.
- Лучше: title and price strong, description calm, metadata muted, badge small and specific, CTA clearly primary.
- Когда можно нарушить правило: warning/error/security state, где secondary detail тоже критичен для решения.
- Как Codex должен применять это в проекте: при visual review искать элементы, которые можно сделать тише без потери смысла; не увеличивать главный элемент бесконечно, если проще приглушить соседей.

### Правило 2.5. Label не должен заменять визуальную структуру

- Что проверять: нужны ли labels вроде `Название`, `Описание`, `Статус`, `Цена`, чтобы понять карточку или строку, или структура сама всё объясняет.
- Почему это важно: лишние labels добавляют шум и часто показывают, что value hierarchy слабая.
- Плохо: product card показывает `Название:`, `Цена:`, `Наличие:`, `Рейтинг:` перед очевидными значениями.
- Лучше: title, price, stock and rating have distinct roles and positions; label остается только там, где value ambiguous or legal-critical.
- Когда можно нарушить правило: forms, technical specs, medical/legal/finance data, admin tables with many similar values.
- Как Codex должен применять это в проекте: в cards/lists сначала настроить typography, proximity and order; labels использовать только для disambiguation, accessibility or dense data.

### Правило 2.6. В повторяемом item должен быть один primary line

- Что проверять: list row, product card, notification, order row or table row has one clear primary line and predictable secondary metadata.
- Почему это важно: пользователь сканирует repeated UI пачками; если в каждом item несколько конкурирующих первичных элементов, список становится утомительным.
- Плохо: order row одновременно выделяет номер заказа, дату, статус, сумму and customer name.
- Лучше: primary line chosen by task: для support это customer/request, для finance amount/status, для delivery address/time.
- Когда можно нарушить правило: audit table or admin power view, где пользователи сравнивают несколько полей одновременно.
- Как Codex должен применять это в проекте: в block spec для lists/tables фиксировать `primary scan line` и `secondary metadata`; не делать все columns visually equal.

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

## 5. Typography

### Правило 5.1. Typography roles должны быть стабильными

- Что проверять: H1, H2, H3, lead, body, caption, label, button, nav, price, metric и table text имеют разные, но повторяемые роли.
- Почему это важно: типографика строит навигацию по странице; случайные размеры заставляют пользователя угадывать важность.
- Плохо: card title иногда 18px medium, иногда 22px bold, иногда uppercase 13px, потому что так "лучше смотрелось".
- Лучше: card title role один, exceptions описаны: `feature-card-title`, `pricing-plan-title`, `metric-value`.
- Когда можно нарушить правило: campaign page с одной уникальной display role, если она не расползается по всему сайту.
- Как Codex должен применять это в проекте: в design tokens создать type roles; в build использовать компоненты/classes, а не подбирать font-size локально.

### Правило 5.2. Строка текста должна иметь нормальную длину

- Что проверять: long copy не растянута на слишком широкую колонку; line-height помогает чтению; dense UI не использует hero scale.
- Почему это важно: слишком длинные строки утомляют, слишком короткие ломают смысл и создают рваный vertical rhythm.
- Плохо: lead шириной 1000px на desktop или body copy по 3-4 слова в узкой карточке.
- Лучше: reading width для текста, отдельные compact rules для cards, table cells и form hints.
- Когда можно нарушить правило: large display phrase, metric row, code-like data или single-line CTA, где это не reading copy.
- Как Codex должен применять это в проекте: фиксировать `max-width` для text groups; при visual review проверять wrapping и orphan words.

### Правило 5.3. Вес шрифта должен показывать структуру, а не компенсировать слабый текст

- Что проверять: bold используется для labels, key values, selected tabs, headings, not for every important word.
- Почему это важно: если всё выделено, ничего не выделено; интерфейс становится шумным.
- Плохо: в pricing card жирным выделены название, цена, период, три benefits, badge и CTA support.
- Лучше: price и plan name сильные, included list спокойный, badge маленький, CTA сам говорит действием.
- Когда можно нарушить правило: dense tables, где bold помогает отличить primary cell from secondary metadata.
- Как Codex должен применять это в проекте: при review убирать лишний emphasis; если текст требует bold везде, переписать hierarchy или content.

### Правило 5.4. Числа, цены и статусы требуют отдельной типографики

- Что проверять: currency, periods, units, discounts, metrics, stock statuses и table values читаются без путаницы.
- Почему это важно: ошибка в числах, цене или статусе дороже декоративной ошибки.
- Плохо: `990руб/месяц` мелким серым рядом с яркой скидкой без условий.
- Лучше: price крупный, currency/period оптически ниже, old price и discount имеют правила, условия рядом и читаемы.
- Когда можно нарушить правило: mini cards с secondary metric, где число не является action driver.
- Как Codex должен применять это в проекте: в tokens/components предусмотреть `price`, `metric`, `status`, `table-value`; в e-commerce не оформлять цену как обычный paragraph.

### Правило 5.5. Type scale лучше вручную подобрать под интерфейс, чем вывести формулой

- Что проверять: scale has enough useful roles for product UI: compact label, body, card title, section title, display, metric, price, table text.
- Почему это важно: математически красивый scale часто даёт неудобные промежутки: слишком большой jump между body и heading или слишком много почти одинаковых sizes.
- Плохо: scale has 12px, 16px, 24px, 36px, 54px, and no comfortable 14/18/20 for dense cards and forms.
- Лучше: pick practical roles first, then keep them consistent: small, body, body-strong, card-title, section-title, hero, price, metric.
- Когда можно нарушить правило: editorial site with long-form typography, where modular scale is a deliberate reading system.
- Как Codex должен применять это в проекте: in design tokens define usage roles, not only numeric sizes; if a component needs a missing role, update tokens instead of ad hoc font-size.

### Правило 5.6. Line-height зависит от размера и плотности

- Что проверять: large headings use tighter line-height, body copy has comfortable line-height, compact UI labels are not too loose, dense tables do not waste vertical rhythm.
- Почему это важно: одинаковый line-height ratio на всех roles делает hero loose, tables bulky, and body text cramped or airy in the wrong places.
- Плохо: `line-height: 1.5` for hero H1, card title, button, table cell and paragraph.
- Лучше: display tighter, paragraphs comfortable, buttons centered and stable, table cells compact but readable.
- Когда можно нарушить правило: brand/editorial direction with intentionally airy typography, documented in design direction.
- Как Codex должен применять это в проекте: in tokens specify line-height per role; during review check wrapping and vertical rhythm with realistic text.

### Правило 5.7. Semantic hierarchy не обязана совпадать с visual hierarchy

- Что проверять: DOM headings, landmarks and labels are accessible, but visual weight follows the user task and screen context.
- Почему это важно: a correct `h1` can be visually quiet in a settings screen, while a price, status or form action deserves stronger visual priority.
- Плохо: account settings uses a giant page H1 while the current plan, billing status and save action are visually secondary.
- Лучше: semantic page title remains present, but compact; the task-critical fields, status and primary action lead the visual hierarchy.
- Когда можно нарушить правило: editorial pages and articles, where semantic and visual hierarchy often intentionally match.
- Как Codex должен применять это в проекте: in review compare semantic roles with screenshot priority; do not style every `h2` like a marketing heading by default.

### Правило 5.8. Mixed inline typography should align by baseline

- Что проверять: price + period, metric + unit, title + metadata, icon + label, toolbar title + actions, button text + icon align optically.
- Почему это важно: vertically centered mixed sizes often look almost right but subtly amateur; baseline alignment makes rows feel intentional.
- Плохо: `$129`, `/month`, discount badge and stock note float at different optical heights in a pricing card.
- Лучше: price and period share a baseline relation, badge aligns to the price group, and secondary note sits as metadata.
- Когда можно нарушить правило: icon-only controls or large hero collages, where geometric centering is the intended composition.
- Как Codex должен применять это в проекте: when composing inline groups, inspect baselines in screenshot; use component-level alignment rules instead of random offsets.

### Правило 5.9. Text alignment depends on reading length

- Что проверять: centered text is short enough; multi-line paragraphs, card descriptions, form help and dense UI are left-aligned or otherwise easy to scan.
- Почему это важно: centered text works for short statements, but 3-4 lines create ragged edges and slow reading, especially on mobile.
- Плохо: feature cards with centered 4-line descriptions and centered links under every card.
- Лучше: section intro can be centered if short; card bodies, specs, form help and table-like content use left alignment.
- Когда можно нарушить правило: poster-like hero, invitation page or one-screen campaign with very short text.
- Как Codex должен применять это в проекте: if copy wraps beyond two short lines, consider left alignment; do not center all section content by template habit.

### Правило 5.10. Font readiness is part of UI quality

- Что проверять: font has required weights, Cyrillic/locale coverage, numerals, currency signs, punctuation, fallback behavior, rendering quality and license fit.
- Почему это важно: a beautiful mock font can fail in real browser rendering, missing glyphs, bad numerals or awkward fallback.
- Плохо: pricing UI uses a display font with poor numerals; Cyrillic fallback changes line height and breaks cards.
- Лучше: font stack is tested with real language, prices, long product names, uppercase labels and fallback disabled/slow-loading conditions.
- Когда можно нарушить правило: temporary visual concept can use approximate fonts, but production tokens need verified font behavior.
- Как Codex должен применять это в проекте: in design tokens and browser review test the actual font stack with realistic content, not only Latin demo copy.

### Правило 5.11. Letter-spacing is a special-purpose tool

- Что проверять: tracking is used only for all-caps labels, tiny metadata, badges or specific brand display roles; normal text and buttons keep stable spacing.
- Почему это важно: random letter-spacing quickly makes UI feel poster-like, loose or hard to read.
- Плохо: buttons, nav, card titles and body text all use custom tracking because it looks "premium".
- Лучше: all-caps step label uses a small tokenized tracking; button labels, paragraph text and table cells use normal spacing.
- Когда можно нарушить правило: logo-like hero display or campaign typography, if it is not reused for working UI.
- Как Codex должен применять это в проекте: never add tracking ad hoc inside a block; define it as a type role or remove it.

## 6. Color и contrast

### Правило 6.1. Цвет должен иметь роль

- Что проверять: каждый акцентный цвет отвечает за action, state, category, brand cue, warning/success/error или selection.
- Почему это важно: декоративная раскраска разрушает систему и снижает доверие к states.
- Плохо: каждая карточка benefit имеет свой pastel цвет без значения.
- Лучше: primary цвет только для CTA и selected state, status colors только для статусов, neutral surfaces для группировки.
- Когда можно нарушить правило: editorial/portfolio page, где цвет является контентом или арт-дирекшном, но роли все равно фиксируются.
- Как Codex должен применять это в проекте: не вводить raw HEX; если нужен новый цвет, описать role и обновить tokens.

### Правило 6.2. Contrast должен поддерживать сканирование

- Что проверять: важные элементы отличаются от вторичных; muted text не становится нечитаемым; borders видны на surface; CTA не теряется.
- Почему это важно: дизайн может быть "мягким", но не должен заставлять искать действие.
- Плохо: светло-серый текст на светло-серой карточке, кнопка с low-contrast border, disabled и secondary одинаковые.
- Лучше: text contrast соответствует роли, primary action имеет ясный fill или contrast, secondary action не спорит с primary.
- Когда можно нарушить правило: disabled, placeholder и purely decorative text can be lower contrast, если accessibility rules соблюдены и смысл не теряется.
- Как Codex должен применять это в проекте: в visual review проверять contrast для text, CTA, form controls, table statuses и focus states.

### Правило 6.3. Нейтральная палитра не должна быть мертвой

- Что проверять: есть ли различимые surface levels, text hierarchy, border roles, hover states и focus rings.
- Почему это важно: quiet UI работает только когда нейтральные слои хорошо настроены.
- Плохо: белый фон, белые cards, почти невидимые borders, бледный text, primary CTA единственный живой элемент.
- Лучше: subtle surfaces, clear border contrast, meaningful hover, enough text contrast, one or two accent roles.
- Когда можно нарушить правило: print-like editorial page, где почти весь UI типографический.
- Как Codex должен применять это в проекте: в tokens задавать `background`, `surface`, `surface-raised`, `border`, `border-strong`, `text-muted`; не компенсировать нейтральность glow.

### Правило 6.4. Status colors не должны конкурировать с brand colors

- Что проверять: success, warning, error, info, stock, sale, promo отличаются от primary action и не используются как декор.
- Почему это важно: пользователь должен понимать, где действие, где состояние, где риск.
- Плохо: красный используется и для скидки, и для ошибки, и для primary CTA.
- Лучше: sale имеет commercial treatment, error имеет form/system treatment, primary CTA остается стабильным.
- Когда можно нарушить правило: brand color is red; тогда error требует другой pattern: icon, text, border, background, not only color.
- Как Codex должен применять это в проекте: в e-commerce и forms описывать semantic tokens отдельно; проверять color-only communication.

### Правило 6.5. Цветовая шкала должна строиться вокруг hue, saturation and lightness

- Что проверять: у primary, neutral and semantic colors есть usable steps: background tint, subtle surface, border, text/icon, solid action, hover/active, disabled.
- Почему это важно: один brand color не превращается сам в систему. Codex часто делает random HEX для hover, border and background, и palette разваливается.
- Плохо: primary `#2563eb`, hover `#1d4ed8`, card tint `#eff6ff`, border `#93c5fd` добавлены случайно без проверки saturation/lightness relationships.
- Лучше: color scale has deliberate lightness/saturation steps and semantic usage for each step.
- Когда можно нарушить правило: very small static site with one CTA color and no complex states, but hover/focus still need explicit values.
- Как Codex должен применять это в проекте: when tokens are missing, propose scale roles instead of inventing local HEX; check hover/active/focus/background together.

### Правило 6.6. Neutral colors тоже имеют температуру и характер

- Что проверять: grays/neutral surfaces do not look dead, dirty, or mismatched with brand; neutral scale supports borders, muted text, cards, page background and disabled UI.
- Почему это важно: most interface area is neutral. Bad neutrals make even good accent colors feel cheap.
- Плохо: pure gray scale used everywhere while brand is warm and photographic; muted text too cold against warm images.
- Лучше: neutral scale slightly follows brand temperature or product context; readable text and borders remain stable.
- Когда можно нарушить правило: strict enterprise/admin UI, where neutral purity and consistency are more important than brand warmth.
- Как Codex должен применять это в проекте: in design tokens define neutral role notes; do not use arbitrary slate/gray/tan palettes by habit.

### Правило 6.7. Bright color needs neutral room

- Что проверять: vivid accent appears in limited places and has enough neutral space around it; not every surface is tinted.
- Почему это важно: high saturation works when it has contrast against calm surroundings. If every block is colorful, nothing guides action.
- Плохо: hero, cards, icons, pricing, badges and background all use saturated accent variants.
- Лучше: primary action and 1-2 semantic highlights use strong color; supporting surfaces stay neutral or lightly tinted.
- Когда можно нарушить правило: festival/game/music campaign, where high-energy palette is the concept, but action and states still need roles.
- Как Codex должен применять это в проекте: scan page for accent overload; if accent appears everywhere, reduce it before adding new hierarchy tricks.

### Правило 6.8. Muted text on colored surfaces needs matching color logic

- Что проверять: muted/helper text on tinted, dark, brand or image surfaces is not generic gray or arbitrary opacity.
- Почему это важно: gray text on colored backgrounds can look dirty, disabled or low-contrast even when it technically passes a contrast check.
- Плохо: success banner uses gray muted text on green tint; dark blue panel uses `text-gray-400` for helper copy.
- Лучше: secondary text uses a token derived from the surface color family or a tested neutral that remains readable and intentional.
- Когда можно нарушить правило: strict neutral admin UI with mostly white/gray surfaces and no color-tinted panels.
- Как Codex должен применять это в проекте: when a section uses colored/tinted surface, define text, muted text, link and border tokens for that surface.

### Правило 6.9. Low-priority colored surfaces should often be tints, not solid slabs

- Что проверять: secondary notes, info panels, lightweight proof and helper zones do not use a saturated filled background that competes with CTA.
- Почему это важно: accessible white-on-solid color can make a secondary block too loud. A tint with dark text often communicates role with less visual pressure.
- Плохо: every info notice is a saturated blue panel with white text, making it compete with the primary button.
- Лучше: low-priority info uses pale tint, clear text, subtle border or accent rail; high-priority alert gets stronger color only when needed.
- Когда можно нарушить правило: critical alerts, campaign sections or brand moments that intentionally deserve high contrast.
- Как Codex должен применять это в проекте: choose surface intensity by priority; do not turn every colored block into a CTA-like slab.

### Правило 6.10. Color scales need perceived-brightness tuning

- Что проверять: yellow, blue, red, green and neutral scales maintain useful contrast and saturation across steps, not only numeric lightness.
- Почему это важно: equal HSL lightness changes do not look equally bright. Some hues become muddy, neon or washed out without hand-tuning.
- Плохо: warning palette darkens into dirty brown; success tint becomes neon; info border is too pale to separate.
- Лучше: semantic palettes are adjusted by eye for usable tint, border, solid, hover and text roles.
- Когда можно нарушить правило: if using a proven design-system palette, but each role still needs browser verification.
- Как Codex должен применять это в проекте: do not generate color steps mechanically; test them in real components with text, icons, borders and states.

### Правило 6.11. Accent rails can add character without adding containers

- Что проверять: small accent borders, rails, dots or top bars communicate active/selected/category states without filling the whole surface.
- Почему это важно: restrained accents often solve hierarchy better than extra cards, glows or saturated backgrounds.
- Плохо: active sidebar item becomes a large filled pill and overpowers the navigation.
- Лучше: active item uses a left rail, subtle surface and stronger label; category list uses small accent markers with clear labels.
- Когда можно нарушить правило: touch-heavy mobile UI can need a larger hit-area state, but accent still should not hide the label.
- Как Codex должен применять это в проекте: consider tokenized accent rails for selected/active/category states before adding heavy decoration.

## 7. Depth, shadow, border, radius

### Правило 7.1. Depth показывает слой интерфейса, а не "дороговизну"

- Что проверять: shadows соответствуют elevation: dropdown, modal, sticky bar, popover, raised card, not every container.
- Почему это важно: если все элементы подняты, depth перестает объяснять, что находится поверх чего.
- Плохо: каждая карточка имеет большую мягкую тень, а modal почти не отличается.
- Лучше: обычные cards используют border/surface, interactive overlays используют shadow, sticky elements имеют subtle separation.
- Когда можно нарушить правило: visual concept intentionally depth-based, но уровни depth должны быть описаны.
- Как Codex должен применять это в проекте: в design tokens задать 2-4 shadow roles; при build не добавлять arbitrary shadow for prettiness.

### Правило 7.2. Border часто лучше shadow для плотного UI

- Что проверять: lists, tables, forms, sidebars и dashboards используют separation, который не создает мутный визуальный шум.
- Почему это важно: много теней в dense UI быстро делает интерфейс грязным.
- Плохо: dashboard из 12 cards с shadow и glow на каждой.
- Лучше: surface + border + spacing; shadow только для overlays, active panels или sticky headers.
- Когда можно нарушить правило: marketing mockup, где 1-2 artifact cards должны быть визуально подняты.
- Как Codex должен применять это в проекте: в SaaS/admin UI предпочитать border/surface; shadow выдавать только role-driven элементам.

### Правило 7.3. Radius должен соответствовать характеру и масштабу

- Что проверять: buttons, cards, inputs, pills, modals, product images и dashboards имеют согласованную radius scale.
- Почему это важно: случайный radius меняет характер бренда и делает компоненты неродственными.
- Плохо: input 6px, button 999px, card 28px, image 0px без design reason.
- Лучше: compact controls 6-8px, cards 8-12px, pills full radius только для tags/chips, large media radius по design direction.
- Когда можно нарушить правило: brand или product object имеет характерную форму, и она намеренно переносится в UI.
- Как Codex должен применять это в проекте: не использовать rounded-2xl по привычке; брать radius role из tokens.

### Правило 7.4. Border и shadow не должны дублировать одну задачу

- Что проверять: не пытается ли card одновременно иметь heavy border, strong shadow, tinted background и glow.
- Почему это важно: несколько separation effects делают UI тяжелым и generic.
- Плохо: pricing card с gradient border, shadow, inner border, glow и badge.
- Лучше: selected pricing card выделяется одним сильным приемом: border + badge, или background + CTA, или scale/elevation.
- Когда можно нарушить правило: one-off hero artifact, если это главный visual object и не повторяется на странице.
- Как Codex должен применять это в проекте: при visual review спрашивать: какой один прием отвечает за separation/priority?

### Правило 7.5. Shadow должен подчиняться модели света

- Что проверять: raised elements have consistent direction, softness, offset and highlight/shadow logic; inset/pressed states behave differently from raised states.
- Почему это важно: случайные shadows выглядят как CSS effect, а не как физически понятный depth.
- Плохо: button has shadow upward, card has shadow in all directions, dropdown has tiny border only, selected option glows.
- Лучше: one light direction, small offset for buttons/cards, stronger elevation for dropdown/modal, subtle inset/highlight for pressed or glossy states.
- Когда можно нарушить правило: flat design direction, where depth is intentionally minimal and separation uses border/surface.
- Как Codex должен применять это в проекте: define shadow roles by layer; never add shadow without asking whether element is raised, recessed, sticky or overlay.

### Правило 7.6. Pressed, selected and inset states need their own treatment

- Что проверять: selected tab/card, pressed button, input focus, checkbox/radio and toggle use state treatment that matches their physical/metaphorical behavior.
- Почему это важно: using the same border/shadow for default and selected states makes state unclear or decorative.
- Плохо: selected pricing card only has a brighter shadow; active tab only changes text color.
- Лучше: selected state uses surface/border/checkmark/fill consistently; pressed state can use inset or darker fill; focus uses accessible ring.
- Когда можно нарушить правило: native platform UI where browser/OS state behavior is intentionally preserved.
- Как Codex должен применять это в проекте: component inventory should define state surface, border, icon and focus roles, not only default styling.

### Правило 7.7. A shadow can need ambient and contact parts

- Что проверять: overlays, dropdowns, modals and raised cards have believable softness and contact, not one blurry blob.
- Почему это важно: a single large blur often looks muddy. Contact shadow anchors the element; ambient shadow communicates elevation.
- Плохо: dropdown uses one huge soft shadow that makes the menu look dirty and detached.
- Лучше: dropdown has a tight contact shadow plus a softer ambient shadow; modal has wider soft depth with controlled edge contrast.
- Когда можно нарушить правило: flat design direction where overlays use border/surface instead of shadow.
- Как Codex должен применять это в проекте: define shadow roles as pairs when needed; avoid arbitrary `shadow-xl` as the default answer.

### Правило 7.8. Flat depth can use surfaces and overlap

- Что проверять: layers can be communicated by surface color, overlap, spacing and z-order, not only border or shadow.
- Почему это важно: some interfaces need depth without visual heaviness, especially dashboards, checkout and calm editorial pages.
- Плохо: every panel gets border and shadow even though surface contrast already separates groups.
- Лучше: checkout summary slightly overlaps a calm surface boundary; sticky toolbar uses surface tint and subtle divider.
- Когда можно нарушить правило: highly tactile interfaces where physical depth is part of the visual language.
- Как Codex должен применять это в проекте: if shadow feels too heavy, try surface level or controlled overlap before adding another border.

### Правило 7.9. Optical weight matters for icons, borders and text

- Что проверять: solid icons, thick borders, filled badges and dark strokes do not overpower nearby labels or values.
- Почему это важно: same pixel size does not mean same visual weight. A solid icon can feel heavier than a label even if both fit the grid.
- Плохо: sidebar icons are darker and visually heavier than navigation text; border around every card competes with card title.
- Лучше: icon stroke/fill, border strength and text weight are tuned so the intended primary element wins.
- Когда можно нарушить правило: icon-led toolbar or app nav where icons are the primary recognition system.
- Как Codex должен применять это в проекте: inspect optical weight, not only size; adjust icon color/stroke and border strength as component rules.

## 8. Cards и containers

### Правило 8.1. Card - это смысловая единица, а не default wrapper

- Что проверять: можно ли объяснить, почему этот контент должен быть в карточке: item, option, plan, product, stat, quote, step, form group.
- Почему это важно: card overuse делает все блоки одинаковыми и скрывает настоящую структуру.
- Плохо: каждый абзац, список, CTA и картинка помещены в отдельные cards.
- Лучше: cards используются для сравнимых items; narrative content остается typography/layout-led.
- Когда можно нарушить правило: dashboard или catalog, где cards являются основной моделью объектов.
- Как Codex должен применять это в проекте: в block spec писать `why card`; если причины нет, использовать rows, timeline, table, media split, checklist или plain section.

### Правило 8.2. Карточки одной группы должны быть сравнимыми

- Что проверять: titles, body length, media, icons, CTA и metadata находятся в предсказуемых местах.
- Почему это важно: пользователь сравнивает items глазами; разные структуры внутри одного grid замедляют выбор.
- Плохо: одна card с иконкой, другая с метрикой, третья с длинным текстом, четвертая с кнопкой.
- Лучше: card group имеет один template; если item требует другого формата, это другая группа или featured card.
- Когда можно нарушить правило: editorial cards with varied content, если layout clearly communicates hierarchy.
- Как Codex должен применять это в проекте: при build использовать component variants; при copy preview держать text density budget.

### Правило 8.3. Не вкладывай cards в cards без реальной иерархии

- Что проверять: нет ли outer card, внутри которой еще cards, chips, badges, panels и pseudo-window без необходимости.
- Почему это важно: nested containers создают "UI lasagna" и убивают whitespace.
- Плохо: section card содержит pricing card, внутри benefit cards, внутри icon chips.
- Лучше: section остается full-width layout, pricing plans являются cards, benefits внутри - list rows.
- Когда можно нарушить правило: complex product UI mockup, где nested panels показывают реальный интерфейс, и hierarchy соответствует продукту.
- Как Codex должен применять это в проекте: в visual idea запрещать `card inside card` как default; использовать container только там, где он меняет смысл.

### Правило 8.4. Контейнер не должен решать проблему слабой иерархии

- Что проверять: добавляется ли рамка/фон только потому, что элементы "теряются".
- Почему это важно: если без card смысл не держится, возможно, проблема в группировке, тексте или layout.
- Плохо: блок process получил card background для каждого шага, потому что между шагами нет ясного порядка.
- Лучше: process использует timeline, numbers, alignment и spacing; cards добавляются только если шаги имеют самостоятельные details.
- Когда можно нарушить правило: interactive selectable cards, где container нужен для hit area and state.
- Как Codex должен применять это в проекте: сначала исправить hierarchy/proximity, затем решать, нужен ли container.

## 9. Buttons, CTA и controls

### Правило 9.1. Primary action должен быть один в локальном контексте

- Что проверять: в hero, pricing card, form, modal, toolbar или table row понятно, какой action основной.
- Почему это важно: несколько равных CTA заставляют пользователя выбирать между действиями вместо выбора продукта.
- Плохо: `Начать`, `Узнать больше`, `Связаться`, `Скачать`, все одинаковые filled buttons.
- Лучше: один filled primary, один secondary/ghost, остальные как text links или contextual actions.
- Когда можно нарушить правило: toolbar professional app, где несколько icon controls равноправны, но selected/primary operation все равно может выделяться.
- Как Codex должен применять это в проекте: в block content preview фиксировать primary/secondary CTA; в build использовать button variants из component inventory.

### Правило 9.2. CTA label должен называть действие

- Что проверять: label объясняет, что произойдет: открыть, скачать, получить расчет, добавить в корзину, оформить заказ, сохранить, применить.
- Почему это важно: визуально сильная кнопка с расплывчатым текстом не снижает сомнение.
- Плохо: `Узнать больше`, `Начать путь`, `Откройте возможности`.
- Лучше: `Посмотреть тарифы`, `Получить расчет`, `Добавить в корзину`, `Сохранить фильтр`, `Оформить заказ`.
- Когда можно нарушить правило: well-known platform pattern like `Continue`, if context above is unambiguous.
- Как Codex должен применять это в проекте: брать CTA text из content preview/site-copy rules; не придумывать новые labels во время build.

### Правило 9.3. Control должен выглядеть как control

- Что проверять: buttons, tabs, switches, checkboxes, selects, sliders, steppers and icon buttons have recognizable affordance and states.
- Почему это важно: красивый text или icon без affordance снижает discoverability.
- Плохо: фильтры e-commerce выглядят как декоративные chips без selected/hover/focus states.
- Лучше: chips have selected state, clear border/fill, keyboard focus, reset action and count.
- Когда можно нарушить правило: static navigation labels, where no interaction is expected beyond links.
- Как Codex должен применять это в проекте: использовать familiar control patterns; icon-only controls обязаны иметь tooltip/aria-label where needed.

### Правило 9.4. Состояния важны так же, как default

- Что проверять: hover, active, focus-visible, disabled, loading, selected, error, success and pressed states.
- Почему это важно: polished UI ломается в момент взаимодействия, если states не продуманы.
- Плохо: submit button меняет текст на `...`, ширина скачет, layout дергается.
- Лучше: loading state keeps dimensions, has spinner/icon, disabled state remains readable, success feedback appears nearby.
- Когда можно нарушить правило: static prototype, but production block must document missing states.
- Как Codex должен применять это в проекте: в build/review фиксировать states table для controls; не сдавать forms/buttons без focus-visible.

### Правило 9.5. Важный выбор может быть отдельным UI, а не стандартным radio/select

- Что проверять: насколько выбор влияет на решение: тариф, размер, способ доставки, роль пользователя, сценарий onboarding, payment method.
- Почему это важно: стандартный control экономит место, но иногда прячет важные различия. Selectable cards, segmented controls or option rows can make comparison clearer.
- Плохо: critical plan choice hidden in a tiny select, while differences are explained far below.
- Лучше: 3-4 selectable option cards show name, key value, limit and selected state; mobile uses compact option rows if cards are too wide.
- Когда можно нарушить правило: long lists, country/city choices, technical filters, where select/search is faster than custom cards.
- Как Codex должен применять это в проекте: in block specs mark `choice importance`; if high, consider selectable cards/rows with clear selected/focus/error states.

### Правило 9.6. Custom controls должны улучшать, а не просто украшать browser defaults

- Что проверять: checkbox, radio, select, stepper, date picker and file input have clear affordance, keyboard behavior, focus, error and disabled states.
- Почему это важно: custom controls often look nicer in default state but lose usability and accessibility.
- Плохо: custom checkbox is a colored square with no focus-visible and no disabled state.
- Лучше: custom control keeps native semantics, visible focus, clear selected/disabled/error, enough target size.
- Когда можно нарушить правило: internal prototype or static visual concept, but production prompt must list missing interaction/accessibility work.
- Как Codex должен применять это в проекте: do not replace native controls unless visual/UX gain is real and states can be implemented safely.

### Правило 9.7. Action hierarchy is not the same as semantic severity

- Что проверять: primary, secondary, tertiary, destructive and confirmation actions are styled by user task priority and risk moment.
- Почему это важно: a destructive action is important, but it should not become the primary visual action until the user is in an explicit confirmation context.
- Плохо: `Delete workspace` is a red filled button next to `Save changes` on the settings page.
- Лучше: destructive action is a quiet danger-zone link or secondary button; the confirmation modal uses stronger warning treatment.
- Когда можно нарушить правило: emergency/safety workflows where the risky action is the central task and must be unmistakable.
- Как Codex должен применять это в проекте: list actions by hierarchy and severity separately; choose button variant from both dimensions, not from text alone.

### Правило 9.8. Polish native controls before inventing custom controls

- Что проверять: checkbox, radio, select, file input and date input can be improved with label rhythm, hit area, accent color, focus ring, disabled and error states.
- Почему это важно: native controls are accessible and familiar. A custom control should earn its complexity.
- Плохо: custom select breaks keyboard navigation just to match a rounded visual style.
- Лучше: native select uses proper width, label, focus, error, disabled state and sits naturally inside the design system.
- Когда можно нарушить правило: complex combobox, date range picker, searchable selector or segmented choice where native control cannot support the task.
- Как Codex должен применять это в проекте: start with native semantics and styling; only custom-build controls when task value is clear and all states can be implemented.

### Правило 9.9. Link treatment depends on context

- Что проверять: paragraph links, nav links, card links, table row links, footer links and tertiary actions have appropriate affordance and noise level.
- Почему это важно: a link inside reading copy needs to stand out; a grid of cards full of blue underlines becomes noisy and hard to scan.
- Плохо: every card title, metadata item and footer action is bright blue and underlined.
- Лучше: paragraph links use clear affordance; card titles can use stronger text and hover; tertiary actions use quiet link styling; destructive links have separate treatment.
- Когда можно нарушить правило: legal/documentation pages where classic underlined links improve scannability.
- Как Codex должен применять это в проекте: define link variants in component inventory; do not use one global blue underline for every clickable text.

### Правило 9.10. Menus can be structured when choices need context

- Что проверять: dropdowns, command menus and action menus have grouping, descriptions, icons and separators only when they clarify choice.
- Почему это важно: flat menus are fine for simple actions, but high-context product actions often need structure to prevent misclicks.
- Плохо: `Create` menu has 14 flat items with similar names and no grouping.
- Лучше: menu groups actions by job, adds short descriptions for unfamiliar choices, keeps keyboard/focus states predictable.
- Когда можно нарушить правило: very short menus of 3-5 familiar actions should stay plain.
- Как Codex должен применять это в проекте: for complex menus, specify grouping, labels, descriptions, icons, keyboard behavior and empty/disabled states before build.

## 10. Forms

### Правило 10.1. Форма должна объяснять, что и зачем вводить

- Что проверять: labels are persistent, hints answer doubts, required/optional is clear, fields are grouped by user task.
- Почему это важно: placeholder-only forms выглядят чище, но часто хуже работают и ломают accessibility.
- Плохо: input с placeholder `Телефон`, без label, без объяснения, что будет после отправки.
- Лучше: label `Телефон`, hint `Напишем по этому запросу`, button `Получить расчет`, success message nearby.
- Когда можно нарушить правило: one-field search/newsletter, where label can be visually hidden but accessible.
- Как Codex должен применять это в проекте: в form block spec описывать fields, labels, hints, validation, success/error states and privacy microcopy.

### Правило 10.2. Ошибка должна помогать исправить действие

- Что проверять: error is next to field, specific, visible, announced to assistive tech, not only red border.
- Почему это важно: ошибка без инструкции создает тупик.
- Плохо: `Ошибка` под формой после submit.
- Лучше: под email field: `Введите адрес в формате name@example.com`; summary сверху only if multiple errors.
- Когда можно нарушить правило: security-sensitive forms, где не раскрывают детали, но все равно дают безопасную next action.
- Как Codex должен применять это в проекте: в interaction pass задавать validation messages; в quality check проверять error proximity and color independence.

### Правило 10.3. Форма должна быть пропорциональна обещанию

- Что проверять: количество полей соответствует ценности действия и стадии пользователя.
- Почему это важно: длинная форма для слабого CTA выглядит как барьер и снижает доверие.
- Плохо: hero lead magnet просит имя, телефон, компанию, бюджет, город, комментарий и согласие.
- Лучше: первый шаг просит email/Telegram или один вопрос; detailed fields появляются после выбора услуги/товара.
- Когда можно нарушить правило: B2B qualification, loan/insurance/medical/legal workflows, where required data is part of service.
- Как Codex должен применять это в проекте: в page planning выбирать form depth; если fields выглядят лишними, пометить `conversion risk`.

### Правило 10.4. Submit area должна закрывать риск

- Что проверять: рядом с submit есть microcopy: что будет после клика, сроки, spam/privacy, payment timing, cancellation.
- Почему это важно: последняя секунда перед действием часто держится на маленьком сомнении.
- Плохо: `Отправить` без context.
- Лучше: `Получить расчет`; support: `Ответим в рабочее время, без подписки на рассылку`.
- Когда можно нарушить правило: internal admin UI, where action outcome is obvious and repeated daily.
- Как Codex должен применять это в проекте: связывать CTA support с site-copy quality standard; не ставить декоративные trust badges вместо ответа на риск.

## 11. Lists, tables и dense UI

### Правило 11.1. Списки должны иметь явный принцип сортировки или группировки

- Что проверять: list order is meaningful: priority, process, alphabet, status, date, frequency, price, category.
- Почему это важно: случайный список ощущается как dump информации.
- Плохо: features list mixes onboarding, payment, analytics, support and security without groups.
- Лучше: features grouped by workflow: `Собрать`, `Проверить`, `Опубликовать`, `Поддерживать`.
- Когда можно нарушить правило: small unordered list of 3 items where order truly does not matter.
- Как Codex должен применять это в проекте: в block spec указывать grouping logic; при copy preview не делать длинный flat list без причины.

### Правило 11.2. Таблица нужна для сравнения, а не для всего плотного текста

- Что проверять: rows/columns support comparison; headers are clear; alignment follows data type; table has responsive behavior.
- Почему это важно: таблица без compare logic плохо читается и ломается на mobile.
- Плохо: pricing details as a table with paragraphs in cells.
- Лучше: pricing table compares limits/features; explanations go in notes/FAQ.
- Когда можно нарушить правило: technical docs, specs, product attributes, finance/admin data.
- Как Codex должен применять это в проекте: выбирать table only when user compares; otherwise use definition list, grouped rows, accordion or checklist.

### Правило 11.3. Dense UI требует меньше украшений и больше структуры

- Что проверять: dashboard/admin screens use clear navigation, filters, row states, status tokens, empty/loading/error states, not decorative cards.
- Почему это важно: users return to dense UI often; decoration slows repeated work.
- Плохо: CRM dashboard with huge hero greeting, gradient cards and low-density stats that push work table below fold.
- Лучше: compact header, primary actions, filters, table, status chips, saved views, useful empty states.
- Когда можно нарушить правило: onboarding dashboard first-run, where education is primary.
- Как Codex должен применять это в проекте: for SaaS/admin prefer quiet utilitarian composition; avoid landing-page hero patterns inside tools.

### Правило 11.4. Numeric and status data must align predictably

- Что проверять: numbers right-align when compared, labels left-align, dates consistent, statuses use text + color/icon where needed.
- Почему это важно: misaligned data slows scanning and causes mistakes.
- Плохо: order totals centered, stock statuses colored only, dates in mixed formats.
- Лучше: totals right-aligned, currency consistent, status includes text, date/time format stable.
- Когда можно нарушить правило: metric cards, where single number is display object.
- Как Codex должен применять это в проекте: in tables/components set alignment rules; review dense UI at real data lengths, not only perfect placeholders.

### Правило 11.5. Rows need hover, selected, expanded and empty logic

- Что проверять: table/list rows define hover, selected, active, expanded, loading, empty and error states where relevant.
- Почему это важно: dense UI is mostly stateful. If states are missing, a table may look fine but fail during work.
- Плохо: selectable rows have no selected treatment; expanded row pushes content unpredictably; empty table is blank.
- Лучше: row states have subtle surface/border changes, expanded area is predictable, empty state gives reason and next action.
- Когда можно нарушить правило: static marketing comparison table with no interaction.
- Как Codex должен применять это в проекте: table/list block specs should include state table and worst-case content before build.

### Правило 11.6. Related table data can live in a rich primary cell

- Что проверять: columns are separated only when they need sorting, comparison or independent scanning; related identity data can be grouped.
- Почему это важно: too many columns make tables wide and fragmented. A rich first cell can preserve hierarchy and reduce horizontal noise.
- Плохо: customer table splits name, avatar, email, company and role into separate narrow columns.
- Лучше: first cell groups avatar, name, email and company; revenue, plan, status and last active remain separate sortable/comparable columns.
- Когда можно нарушить правило: expert data grids where every field is independently filtered, sorted or exported.
- Как Codex должен применять это в проекте: in table specs decide which fields are `identity`, `compare`, `status`, `action` and `metadata`.

### Правило 11.7. Semantic list markers can replace another card grid

- Что проверять: benefits, inclusions, requirements, steps and warnings could be clearer as compact rows with meaningful markers instead of cards.
- Почему это важно: AI often turns every list into cards. Strong list markers and grouping can create clarity without extra containers.
- Плохо: PDP `included / optional / unavailable` information becomes three decorative cards with icons.
- Лучше: compact list uses check, plus and unavailable markers with clear labels and muted explanations.
- Когда можно нарушить правило: comparable options, feature categories or pricing plans where each item truly needs a separate surface.
- Как Codex должен применять это в проекте: before choosing card grid, consider checklist, definition list, grouped rows or timeline with semantic markers.

## 12. Hero sections

### Правило 12.1. Hero должен быть первым ответом, а не всей страницей сразу

- Что проверять: hero answers what it is, who it is for, why continue, what action to take.
- Почему это важно: перегруженный hero задерживает пользователя до понимания основного предложения.
- Плохо: hero includes full process, testimonials, pricing, features grid and form.
- Лучше: H1 + lead + primary CTA + proof/support + one relevant product/place/result visual.
- Когда можно нарушить правило: one-screen utility, login, calculator, search or booking flow, where hero and product are same.
- Как Codex должен применять это в проекте: content preview should keep H1/lead/CTA concise; move secondary claims to neighbor blocks.

### Правило 12.2. Hero visual должен показывать предмет, а не атмосферу

- Что проверять: hero media reveals product, place, object, result, workflow, person, or real artifact.
- Почему это важно: abstract gradients and decorative objects rarely help user decide.
- Плохо: SaaS hero with blurred neon shapes and floating fake chart unrelated to product.
- Лучше: real dashboard slice, workflow board, before/after panel, product photo, map, document fragment, service artifact.
- Когда можно нарушить правило: brand teaser or art project where atmosphere is the product.
- Как Codex должен применять это в проекте: if no real asset, generate or design an original relevant artifact; mark fake proof as forbidden.

### Правило 12.3. Hero composition must leave room for the next section

- Что проверять: first viewport on mobile, reference desktop and wide desktop hints that page continues; hero is not a sealed poster or a height-stretched empty field unless product requires it.
- Почему это важно: landing pages need scroll invitation and story continuity.
- Плохо: full viewport hero with centered text and no visible next content, followed by unrelated card grid.
- Лучше: hero has bottom rhythm, next section cue, or partial proof strip visible without crowding.
- Когда можно нарушить правило: immersive game/demo/portfolio scene with intentional full-screen experience.
- Как Codex должен применять это в проекте: when building hero, test mobile/reference-desktop/wide screenshots; check that content does not overlap, `vh` does not create uncontrolled height, and next-section relationship remains visible.

## 13. Pricing / offer sections

### Правило 13.1. Pricing должен объяснять выбор, а не только показывать цену

- Что проверять: plan names, prices, periods, included/excluded, limits, best-fit notes and next action are clear.
- Почему это важно: users compare risk, value and fit, not only numbers.
- Плохо: three cards with `Basic`, `Pro`, `Premium`, each with generic benefits.
- Лучше: plans named by use case: `Start`, `Team`, `Scale`; each shows who it fits, key limit, included items and action.
- Когда можно нарушить правило: single-price offer, where clarity is in inclusions and conditions.
- Как Codex должен применять это в проекте: in content preview include fit/limit notes; in UI ensure price, period and CTA hierarchy.

### Правило 13.2. Highlight one option only when it truly helps

- Что проверять: selected/recommended plan has a reason: most common, best value, required for team, current plan.
- Почему это важно: arbitrary highlight feels manipulative and adds visual noise.
- Плохо: middle plan glows because pricing sections often highlight middle plan.
- Лучше: badge says `Для команд от 5 человек`, visual treatment is controlled and not louder than the whole section.
- Когда можно нарушить правило: A/B tested marketing page, but reasoning should remain documented.
- Как Codex должен применять это в проекте: do not auto-highlight; mark `needs business decision` if no recommended plan is confirmed.

### Правило 13.3. Offer section must show boundaries

- Что проверять: what is not included, when offer is not suitable, cancellation/refund/access terms, delivery/payment conditions.
- Почему это важно: clear boundaries reduce support load and increase trust.
- Плохо: `Все включено` without scope.
- Лучше: included list + not included notes + FAQ link + CTA support.
- Когда можно нарушить правило: tiny low-risk purchase, where details can be in FAQ/cart but must still be accessible.
- Как Codex должен применять это в проекте: if boundaries are missing, mark `offer gap`; do not hide gap with stronger copy or prettier card.

## 14. Trust / proof sections

### Правило 14.1. Proof должен доказывать конкретный claim

- Что проверять: each proof item maps to a claim: speed, quality, safety, experience, availability, price, support.
- Почему это важно: random logos, stats and badges look decorative if they do not answer doubt.
- Плохо: `Нам доверяют` with unlabeled logo cloud and no context.
- Лучше: `18 запусков за год` supports experience claim, case snippet supports result claim, process checklist supports risk reduction.
- Когда можно нарушить правило: well-known enterprise logos can act as shorthand, if usage rights and context are clear.
- Как Codex должен применять это в проекте: in trust block spec include `claim -> proof`; if no proof, mark `needs proof`.

### Правило 14.2. Метрика без контекста может вредить

- Что проверять: number has period, scope, condition and relevance.
- Почему это важно: impressive number can mislead or distract if user does not know what it means.
- Плохо: `1000+ клиентов` with no geography, period, or service.
- Лучше: `1000+ заказов в 2025 году по Москве и области`; only if confirmed.
- Когда можно нарушить правило: internal dashboard where metric context is known to users.
- Как Codex должен применять это в проекте: never invent metrics; require `needs confirmation` and display context next to number.

### Правило 14.3. Testimonials need editing and placement discipline

- Что проверять: quote is short, has context, does not overclaim, and appears near the doubt it resolves.
- Почему это важно: long testimonial blocks are often skipped and can feel fake.
- Плохо: three long quotes in cards after features, all saying general praise.
- Лучше: one short quote near pricing about value, one near process about confidence, one case quote with context.
- Когда можно нарушить правило: dedicated reviews page, where browsing testimonials is the task.
- Как Codex должен применять это в проекте: do not invent testimonials; if supplied, trim to short compliant excerpt and pair with context.

## 15. Feature sections

### Правило 15.1. Feature should connect property to user job

- Что проверять: each feature says what exists, why it matters, and what user can do/avoid.
- Почему это важно: a list of features is not the same as a useful product explanation.
- Плохо: `Интеграции`, `Аналитика`, `Поддержка`, `Безопасность`.
- Лучше: `Интеграции`: `Передавайте заявки в CRM без ручного копирования`; `Аналитика`: `видно, какие страницы приводят заявки`.
- Когда можно нарушить правило: expert product specs where audience already knows the meaning, but grouping still matters.
- Как Codex должен применять это в проекте: in content preview use feature/advantage/benefit logic without padding text.

### Правило 15.2. Feature sections need visual variety by meaning

- Что проверять: are all features equal, or does one deserve artifact/screenshot/comparison?
- Почему это важно: identical cards flatten important differences.
- Плохо: core product workflow appears as one small card among minor conveniences.
- Лучше: core workflow shown as product screenshot/process board; supporting features listed as compact rows.
- Когда можно нарушить правило: small product with 3 equal pillars.
- Как Codex должен применять это в проекте: choose visual form by feature importance; do not default to card grid.

### Правило 15.3. Icons in feature blocks must distinguish, not decorate

- Что проверять: icon helps identify category/action/status; icon style follows approved pack; size and stroke are consistent.
- Почему это важно: random icons make a generic AI look and add noise.
- Плохо: huge sparkles, rockets, shields and stars above every card, unrelated to content.
- Лучше: small functional icons for categories, or no icons if titles are enough.
- Когда можно нарушить правило: playful consumer product with icon-led brand language, documented in design direction.
- Как Codex должен применять это в проекте: use `docs/design-system/iconography.md`; if no icon adds meaning, omit it.

## 16. SaaS / dashboard UI

### Правило 16.1. Product UI should prioritize repeated work

- Что проверять: main tasks, saved views, filters, search, primary action, status, empty states and error recovery are visible.
- Почему это важно: dashboard users often return to complete work, not admire a composition.
- Плохо: SaaS dashboard first screen dominated by welcome hero and decorative metrics, with table below fold.
- Лучше: compact header, key status, filters, table/list, primary action, useful secondary metrics.
- Когда можно нарушить правило: onboarding first-run screen, where education and setup are the work.
- Как Codex должен применять это в проекте: distinguish marketing page from product UI; use dense, restrained patterns for operational screens.

### Правило 16.2. Navigation and active state must be unmistakable

- Что проверять: current section, breadcrumbs, tabs, side nav, filters and selected rows have clear states.
- Почему это важно: complex UI fails when user loses location.
- Плохо: active tab differs only by low-contrast text color.
- Лучше: active state uses text weight, indicator, background/border and accessible semantics.
- Когда можно нарушить правило: minimal tool with two views, but state still needs accessibility.
- Как Codex должен применять это в проекте: in component inventory define nav/tabs states; in quality check verify keyboard and aria roles.

### Правило 16.3. Charts must answer a question

- Что проверять: chart type, axis, labels, range, comparison and empty state support a user decision.
- Почему это важно: decorative charts look impressive but do not help.
- Плохо: random line chart in hero dashboard mock with no labels.
- Лучше: conversion trend with period, current value, comparison, and linked insight.
- Когда можно нарушить правило: background product preview, but then it must not be presented as proof.
- Как Codex должен применять это в проекте: if chart data is fake, label as placeholder; prefer table/list if no trend/comparison exists.

### Правило 16.4. Dense screens need explicit empty/loading/error states

- Что проверять: list, table, chart, form and page states exist for no data, loading, error, partial data, permission issues.
- Почему это важно: real apps are often in states other than perfect demo data.
- Плохо: empty table shows only blank area.
- Лучше: empty state explains why empty, gives next action, and avoids fake success tone.
- Когда можно нарушить правило: static marketing screenshot, but production component must define states later.
- Как Codex должен применять это в проекте: in block build and interaction pass include states table for product UI components.

### Правило 16.5. Chart series and statuses must not rely on hue alone

- Что проверять: chart series, status categories and metric comparisons use labels, markers, stroke styles, icons, direct annotations or table backup where needed.
- Почему это важно: different hues are not enough for accessibility, grayscale review or quick scanning in dense dashboards.
- Плохо: revenue, refunds and forecast are three similar colored lines with no direct labels.
- Лучше: revenue uses solid line, refunds dashed line, forecast muted line; labels sit near line ends and tooltip values are clear.
- Когда можно нарушить правило: single-series chart with obvious axis and label, where color is only decorative.
- Как Codex должен применять это в проекте: in chart specs define what question the chart answers and how meaning survives without color.

### Правило 16.6. Empty screens should remove dead chrome

- Что проверять: filters, sort, tabs, pagination, bulk actions and table tools disappear or become secondary when there is no data to operate on.
- Почему это важно: empty state is often first-use activation. Dead controls make the product feel broken and distract from the next useful action.
- Плохо: empty catalog shows full filters, sort dropdown, pagination, bulk toolbar and a blank grid.
- Лучше: empty catalog shows add/import CTA, short setup checklist, optional sample data and a calm explanation.
- Когда можно нарушить правило: saved filters/search pages where empty result is the answer; still show reset and context.
- Как Codex должен применять это в проекте: for empty states, decide which controls remain useful; hide or disable dead chrome with explanation.

## 17. E-commerce UI

### Правило 17.1. Product card must support fast comparison

- Что проверять: image, title, variant, price, old price, stock, rating, delivery/promo, primary action and secondary action are placed consistently.
- Почему это важно: PLP users compare many items quickly; inconsistent cards slow scanning and reduce confidence.
- Плохо: product cards with different image ratios, random badges, price in different positions.
- Лучше: fixed image ratio, stable title lines, price block, stock/delivery status, clear add-to-cart or view action.
- Когда можно нарушить правило: curated editorial collection, where product storytelling matters more than fast comparison.
- Как Codex должен применять это в проекте: e-commerce product-card spec must define data fields, states and responsive behavior before build.

### Правило 17.2. Filters should be powerful but not visually dominant

- Что проверять: filters are discoverable, selected filters visible, reset easy, mobile pattern clear, counts not misleading.
- Почему это важно: filters help narrow choice but should not bury products.
- Плохо: desktop filter sidebar with dozens of open groups, pushing product grid into narrow column.
- Лучше: priority filters visible, advanced filters collapsed, selected chips above grid, clear reset and result count.
- Когда можно нарушить правило: professional catalog with technical specs, where filtering is the main task.
- Как Codex должен применять это в проекте: in e-commerce specs define filter priority, selected state, empty result, mobile drawer behavior.

### Правило 17.3. PDP should answer purchase doubts near the action

- Что проверять: price, variants, stock, delivery, returns, warranty, payment, size/specs and add-to-cart are close enough.
- Почему это важно: users decide in the product purchase zone; trust details too far away are missed.
- Плохо: add-to-cart appears before variant availability, delivery cost and return info.
- Лучше: purchase panel groups variant, price, stock, delivery promise, return note, CTA and payment options.
- Когда можно нарушить правило: luxury/editorial product page where storytelling precedes purchase, but purchase summary still needs clarity.
- Как Codex должен применять это в проекте: PDP block specs should separate gallery, purchase panel, specs, proof and recommendations; no random trust icons.

### Правило 17.4. Checkout should reduce uncertainty, not upsell aggressively

- Что проверять: steps, summary, delivery/payment choices, errors, edit actions, total price, taxes/fees and confirmation are clear.
- Почему это важно: checkout failures are often trust and clarity failures.
- Плохо: promo banners and recommendations compete with payment action.
- Лучше: focused checkout layout, persistent order summary, clear validation, back/edit controls and final confirmation.
- Когда можно нарушить правило: cart page before checkout can include recommendations, but payment step should stay focused.
- Как Codex должен применять это в проекте: checkout specs must define states and microcopy before UI; quality pass must test errors and mobile.

## 18. Responsive behavior

### Правило 18.1. Responsive is hierarchy preservation, not only stacking

- Что проверять: after mobile reflow, main heading, action, proof, price, form fields and key comparison remain in useful order.
- Почему это важно: stacking can technically fit but lose decision logic.
- Плохо: pricing cards stack so recommended plan appears third after two less relevant options.
- Лучше: mobile order can place recommended/current plan first, or add plan selector/comparison summary.
- Когда можно нарушить правило: when source order has legal/SEO/accessibility constraints, but visual aids can compensate.
- Как Codex должен применять это в проекте: responsive pass must check reading/action order, not just overflow.

### Правило 18.2. Fixed-format elements need explicit mobile strategy

- Что проверять: tables, dashboards, calendars, checkout summaries, product galleries, maps and comparison boards have mobile behavior.
- Почему это важно: these elements do not become good mobile UI by squeezing.
- Плохо: wide comparison table overflows horizontally with hidden key labels.
- Лучше: responsive table becomes cards, sticky first column, horizontal scroll with labels, or compact comparison selector.
- Когда можно нарушить правило: expert data tables where horizontal scroll is expected, but affordance must be visible.
- Как Codex должен применять это в проекте: in page/block specs define mobile form before build; in review test at narrow viewport.

### Правило 18.3. Touch targets and sticky UI must be intentional

- Что проверять: tap areas, spacing between controls, sticky headers/CTA bars, bottom navigation, focus/scroll behavior.
- Почему это важно: mobile UI often fails through accidental taps, hidden content or sticky elements covering forms.
- Плохо: sticky CTA covers form error or checkout total; chips are too small to tap.
- Лучше: sticky CTA appears after value is clear, respects safe areas, can be dismissed if needed, does not cover content.
- Когда можно нарушить правило: critical app navigation, where persistent controls are core, but layout reserves space.
- Как Codex должен применять это в проекте: visual/browser review should inspect sticky elements on mobile and ensure no overlap.

### Правило 18.4. Images and artifacts need crop rules

- Что проверять: focal point remains visible; product image ratio stable; screenshots readable or intentionally summarized.
- Почему это важно: responsive crops can hide the actual product/place/object and turn media into atmosphere.
- Плохо: mobile hero crops product screenshot so only blurred side panel remains.
- Лучше: mobile uses alternate crop, simplified artifact, or stacked text + image with visible focal point.
- Когда можно нарушить правило: abstract background, but not when media is proof or product.
- Как Codex должен применять это в проекте: define image/artifact aspect ratios; review mobile/reference-desktop/wide screenshots for meaningful visibility and stable focal weight.

### Правило 18.5. Media treatment должен быть выбран по роли материала

- Что проверять: media is marked as product proof, visual context, instruction, comparison, brand atmosphere, user evidence or decorative background.
- Почему это важно: one visual treatment cannot serve every role. A readable screenshot, a product photo, a proof logo strip and an atmospheric image need different crop, contrast, scale and surrounding UI.
- Плохо: SaaS hero uses a tiny blurred screenshot as proof, e-commerce product cards mix lifestyle photos, cutouts and screenshots without a system, service page hides real work photos behind heavy tint.
- Лучше: product image stays inspectable, app screenshot is large enough or simplified, proof media is close to the claim, decorative background is clearly secondary.
- Когда можно нарушить правило: campaign or editorial page can use expressive media treatment, but only when the media is not carrying critical proof or product detail.
- Как Codex должен применять это в проекте: in page/block specs record `media role`, `source`, `aspect ratio`, `crop`, `treatment`, `fallback` and `mobile behavior` before build.

### Правило 18.6. Text over image needs controlled contrast

- Что проверять: text area, focal point, overlay/scrim strength, image complexity, mobile crop and CTA visibility.
- Почему это важно: text over busy images often passes in a perfect mock and fails with real photos, long headings or mobile crops.
- Плохо: white H1 and primary CTA placed over a bright interior photo with no quiet area; mobile crop moves the brightest object behind the button.
- Лучше: image has intentional negative space, text sits on a controlled contrast zone, CTA contrast is tested, mobile uses alternate crop or separates text from media.
- Когда можно нарушить правило: editorial hero can intentionally blend type and image, but not for checkout, pricing, forms or critical conversion copy.
- Как Codex должен применять это в проекте: if contrast is uncertain, choose a quieter image, add a restrained contrast layer, or separate copy and media instead of relying on hope.

### Правило 18.7. Screenshot and photo sets need consistent treatment

- Что проверять: repeated media uses stable ratio, crop logic, background, device chrome, shadow/depth, caption style and loading/fallback state.
- Почему это важно: inconsistent media makes the page feel assembled from unrelated fragments even when the layout is clean.
- Плохо: feature section alternates laptop mockups, phone screenshots, cropped dashboard fragments and stock photos with different shadows and ratios.
- Лучше: screenshots share one frame system; photos share crop rules and color temperature; product cards reserve a stable image area.
- Когда можно нарушить правило: intentional case-study collage, but the variation must be the concept, not an accident.
- Как Codex должен применять это в проекте: define reusable media classes or component variants; do not invent a new screenshot/photo treatment inside each block.

### Правило 18.8. Media and icons have intended sizes

- Что проверять: icons, logos, screenshots, diagrams and photos are not upscaled beyond quality or shrunk until their detail becomes meaningless.
- Почему это важно: small assets become crude when enlarged; full screenshots become decorative noise when squeezed too small.
- Плохо: full dashboard screenshot is reduced to a tiny card where labels are unreadable; 16px icon is blown up to 64px.
- Лучше: crop the relevant workflow panel, use a simplified diagram, choose a higher-resolution logo, or present the screenshot as proof at a readable size.
- Когда можно нарушить правило: abstract texture or background media where detail is intentionally not inspected.
- Как Codex должен применять это в проекте: in block preview record `intended size`; in review compare rendered media size to what user needs to inspect.

### Правило 18.9. User-provided media needs defensive containment

- Что проверять: portrait, landscape, very bright, very dark, transparent, same-background, missing and low-quality images do not break layout.
- Почему это важно: CMS, marketplace, reviews, avatars, logos and product photos are unpredictable. A design that only works with perfect assets will collapse in production.
- Плохо: user product photos use intrinsic ratios, so cards have uneven heights and white products disappear on white card backgrounds.
- Лучше: fixed ratio, object-fit rule, focal point support, neutral placeholder, fallback state and subtle inner treatment for low-contrast assets.
- Когда можно нарушить правило: curated editorial page where every asset is art-directed before publishing.
- Как Codex должен применять это в проекте: stress-test media slots with bad but realistic assets; define fallback and crop behavior before implementation is done.

### Правило 18.10. Background decoration must be detachable

- Что проверять: decorative patterns, gradients, textures and background imagery can be removed without losing hierarchy, CTA visibility or content meaning.
- Почему это важно: background decoration should break monotony, not become structural support. If the UI needs it to make sense, the composition is weak.
- Плохо: text only reads because a decorative blob happens to sit behind it; mobile crop removes that blob and hierarchy fails.
- Лучше: content sits on stable surfaces; decorative pattern stays low-contrast, away from reading zones and never carries proof or state meaning.
- Когда можно нарушить правило: immersive campaign/game/art page where background is the experience, still with readable controls.
- Как Codex должен применять это в проекте: in visual review temporarily ignore/remove decoration; if UI fails, fix hierarchy first.

## 19. Anti-patterns: что часто делает AI плохо

### Правило 19.1. Generic hero template

- Что проверять: huge gradient, glass cards, floating badges, fake dashboards, universal H1 and two generic CTAs.
- Почему это важно: this pattern looks plausible but says little about the actual project.
- Плохо: `Transform your workflow` over blue-purple glow with abstract cards.
- Лучше: exact offer, real artifact, concrete action, proof line, and visual tied to product or service.
- Когда можно нарушить правило: none as default; only if brand direction explicitly uses this language and assets are real.
- Как Codex должен применять это в проекте: replace atmospheric decoration with subject-specific media or typography-led composition.

### Правило 19.2. Card grid as universal answer

- Что проверять: every section becomes 3 or 6 cards with icons.
- Почему это важно: page rhythm collapses and user cannot tell which block matters.
- Плохо: benefits, process, proof, pricing and FAQ all as cards.
- Лучше: mix forms: process timeline, proof row, pricing table, FAQ accordion, media-led feature, focused CTA band.
- Когда можно нарушить правило: catalog/product collection where item grid is the product.
- Как Codex должен применять это в проекте: during page planning enforce visual pattern budget and neighbor check.

### Правило 19.3. Decorative badges and chips without information

- Что проверять: badges like `New`, `AI-powered`, `Trusted`, `Premium`, `Fast`, `Secure` have proof or action relevance.
- Почему это важно: random badges create false hierarchy and weaken trust.
- Плохо: hero has 5 floating badges repeating generic claims.
- Лучше: one meaningful badge: `Beta`, `Для команд`, `Доставка сегодня`, `Скидка до 12 июля`, if confirmed.
- Когда можно нарушить правило: playful gamified UI, where badges are content and states.
- Как Codex должен применять это в проекте: remove badges without source; mark unsupported claim as `needs confirmation`.

### Правило 19.4. One-note palette and overdone gradients

- Что проверять: page is dominated by one hue family, many gradients, glowing blobs or tinted surfaces without roles.
- Почему это важно: overcoloring hides hierarchy and gives generic AI feel.
- Плохо: every block is blue-purple gradient variation.
- Лучше: mostly neutral surfaces, controlled accent, semantic state colors, one or two expressive moments.
- Когда можно нарушить правило: event/music/game/creative campaign with strong color identity, still with contrast and token rules.
- Как Codex должен применять это в проекте: scan CSS colors; if new colors appear outside tokens, fix or propose design-system update.

### Правило 19.5. Fake product proof

- Что проверять: mock UI, charts, metrics, testimonials, logos and badges are presented as if real.
- Почему это важно: fake proof is worse than no proof.
- Плохо: dashboard artifact shows imaginary revenue growth and customer logos.
- Лучше: use abstract workflow diagram, real screenshot, or mark placeholder; ask for proof.
- Когда можно нарушить правило: concept prototype can use clearly fictional sample data, not final public proof.
- Как Codex должен применять это в проекте: never invent proof; in final UI use real data or neutral illustrative artifacts.

### Правило 19.6. Over-large type inside compact UI

- Что проверять: card headings, dashboard titles, table labels, sidebar nav and buttons are scaled to container.
- Почему это важно: hero typography inside small components looks amateur and causes overflow.
- Плохо: pricing card title 36px, button text wraps, metric labels collide.
- Лучше: display type only for hero/key editorial moments; compact panels use tighter roles.
- Когда можно нарушить правило: one featured card intentionally acts as section focal point.
- Как Codex должен применять это в проекте: match font role to container; review text fitting at realistic content lengths.

## 20. UI review checklist

### Правило 20.1. Review from screenshot first, code second

- Что проверять: full viewport screenshots at mobile, reference desktop and wide desktop before debating code details.
- Почему это важно: many visual issues are relational: spacing, rhythm, hierarchy, overlap, repeated patterns.
- Плохо: fixing CSS token names while page still has unclear focal point and repeated card grids.
- Лучше: screenshot review compares the built result with approved visual evidence, identifies top visual issues, then code changes target those issues.
- Когда можно нарушить правило: broken build/runtime issue must be fixed before screenshot can exist.
- Как Codex должен применять это в проекте: in build and quality prompts capture or inspect mobile, reference-desktop and wide-desktop visual output; compare it with `visual-north-star.md`, the Desktop Canvas Contract, approved concept/Hero and neighboring sections; list findings by severity and scope. Screenshot must be visually inspected, not only saved.

### Правило 20.2. Check hierarchy, rhythm, tokens, then details

- Что проверять: first hierarchy, then page rhythm, then token consistency, then component details and polish.
- Почему это важно: polishing icons cannot fix a bad composition.
- Плохо: changing border radius while primary CTA is visually hidden.
- Лучше: first make the action obvious, then adjust spacing, then tune borders/radius.
- Когда можно нарушить правило: tiny bugfix where issue is known and local.
- Как Codex должен применять это в проекте: visual review findings ordered: `blocking hierarchy`, `layout/rhythm`, `token/component`, `detail polish`.

### Правило 20.3. Compare block with neighbors

- Что проверять: block remains recognizably part of the approved visual direction; previous and next 2-3 sections do not mechanically repeat role/form, CTA, card pattern, artifact or color slab without reason.
- Почему это важно: single block can be good alone and weak in page sequence.
- Плохо: three consecutive sections all use centered heading + icon cards.
- Лучше: keep shared brand anchors, but let one section become artifact-led proof and another a compact comparison or FAQ when their jobs differ.
- Когда можно нарушить правило: repeated category sections in catalog, but they should be intentionally grouped.
- Как Codex должен применять это в проекте: block build and smoke-check must include continuity + neighbor notes; novelty must not make the block look like another site.

### Правило 20.4. Review with real or worst-case content

- Что проверять: longest titles, real product names, prices, errors, empty states, mobile wraps, translated labels.
- Почему это важно: demo-perfect text hides overflow and layout shifts.
- Плохо: cards look aligned only because every title is two words.
- Лучше: test with long title, missing image, sale price, error message, disabled action.
- Когда можно нарушить правило: early concept prototype, but final build must test realistic content.
- Как Codex должен применять это в проекте: use realistic sample data in QA; if data model unknown, create stress cases and note assumptions.

### Правило 20.5. De-emphasis pass должен быть отдельным шагом review

- Что проверять: secondary labels, helper text, timestamps, metadata, badges, inactive tabs, optional links and tertiary actions are visually quieter than primary content.
- Почему это важно: weak UI often has too much emphasis, not too little. If every small label is dark, bold or boxed, the real decision disappears.
- Плохо: dashboard row gives equal weight to customer name, internal ID, timestamp, status, owner, comment count and secondary menu.
- Лучше: primary line is dark and scannable; metadata is smaller/muted; status uses a controlled semantic treatment; secondary action appears on hover or in a predictable column.
- Когда можно нарушить правило: safety-critical warnings, payment errors or destructive actions can stay visually strong.
- Как Codex должен применять это в проекте: during visual review mark what should be quieter before adding new decoration or stronger accents.

### Правило 20.6. Empty, loading, error and disabled states need visual composition

- Что проверять: state message, action, icon/illustration restraint, container height, skeleton/loading rhythm, retry/edit path and accessibility.
- Почему это важно: product UI is judged in imperfect states; blank panels, vague spinners and hostile errors make the interface feel unfinished.
- Плохо: table body disappears during loading, empty state says `No data`, disabled button has no explanation, payment error appears far from the field.
- Лучше: loading keeps layout stable, empty state explains cause and next action, disabled state tells what is missing, error appears near the fix point and in a summary if needed.
- Когда можно нарушить правило: very small inline controls can use concise states, but they still need focus, disabled and error behavior.
- Как Codex должен применять это в проекте: every form/table/list/dashboard component spec should include at least happy, empty/loading, error and disabled states.

### Правило 20.7. Edge polish matters: first, last, overflow, missing

- Что проверять: first/last card, single-item list, long title, missing image, zero price, sale price, long CTA, many filters, no results, narrow viewport.
- Почему это важно: AI-generated UI often looks good only with ideal demo data. Real content reveals broken radius, separators, alignment, wrapping and rhythm.
- Плохо: last table row keeps a border that clashes with the card radius; a missing product image collapses the card; long plan names push CTA below the fold.
- Лучше: first/last items have correct borders/radius, placeholders keep dimensions, long text clamps or wraps intentionally, totals and actions stay aligned.
- Когда можно нарушить правило: throwaway prototype, but production blocks must receive an edge-case pass before handoff.
- Как Codex должен применять это в проекте: add stress content in visual QA and fix layout constraints, not just the sample copy.

### Правило 20.8. Micro-interactions should confirm intent, not entertain by default

- Что проверять: hover, focus, active, pressed, selected, expand/collapse, drag, toast, transition duration and reduced-motion behavior.
- Почему это важно: interaction polish should make controls feel reliable. Random motion or animated decoration can distract, hide state or slow repeated work.
- Плохо: every card lifts, glows and animates on hover; selected plan only changes shadow; loading button jumps width.
- Лучше: hover clarifies clickability, pressed state feels tactile, selected state is unmistakable, loading preserves button width, transitions are short and purposeful.
- Когда можно нарушить правило: game, interactive demo or brand campaign with motion as a core experience, still with accessibility controls.
- Как Codex должен применять это в проекте: implement state transitions only after default hierarchy is clear; test keyboard focus and reduced motion for interactive controls.

### Правило 20.9. Review should include a grayscale or color-independence pass

- Что проверять: primary action, selected state, errors, links, charts and status chips remain understandable without relying only on hue.
- Почему это важно: color can hide hierarchy problems and can fail for accessibility, screenshots, low-quality displays or color-blind users.
- Плохо: active tab, error field and selected plan differ only by color.
- Лучше: active state also has indicator or weight; error has text/icon; selected plan has border/surface/checkmark; charts have labels/markers.
- Когда можно нарушить правило: purely decorative color moments, as long as actions and states remain clear.
- Как Codex должен применять это в проекте: during visual review check whether meaning survives if color is mentally removed or screenshot is desaturated.

### Правило 20.10. Calibrate implementation against a visual reference pattern

- Что проверять: line-height, row height, icon alignment, underline offset, shadow softness, hover contrast, border strength and whitespace match the intended component quality.
- Почему это важно: many weak UIs are off by many small amounts, not by one obvious failure. A short calibration pass catches these details.
- Плохо: data table is structurally correct but rows are too tall, numeric columns feel off, hover is too strong and action links look like paragraph links.
- Лучше: compare against the project component pattern or a local reference variant and fix the top 3 mismatches.
- Когда можно нарушить правило: emergency bugfix or backend-only change where visual surface is not touched.
- Как Codex должен применять это в проекте: after screenshot review, name 2-3 visual deltas and adjust tokens/components rather than chasing random pixels.

## 21. Как применять в Codex

Работай по `prompts/_guidelines/creator-critic-design-workflow.md`. Этот документ меняет роль по ходу работы: до render он является меню правил, после render — полной reference base, а на quality stage — источником полного checklist.

### До render: creator

- Сначала открой Visual North Star, approved screenshots/live concept и реальные assets.
- Сформулируй outcome, positive direction, creative freedom и только настоящие hard boundaries.
- По карте в начале документа выбери 4–6 правил для текущей задачи. Не копируй в brief целые разделы и полный `UI quality check`.
- Для concept обычно нужны visual job, focal point, personality knobs, media role и desktop continuity.
- Для блока обычно нужны hierarchy, composition role, relation with neighbors, responsive hierarchy и один типоспецифичный критерий.
- Для form/table/dashboard/e-commerce UI выбери правила про реальную пользовательскую задачу и критичные states, а не общий маркетинговый каталог.
- Собери один вариант и переведи слова в live render. Не пиши длинный отчёт до того, как появится материал для оценки.

### После render: critic

- Сначала оцени screenshots целиком: first impression, focal point, primary action, rhythm и continuity.
- Затем используй нужные разделы или всю базу для проверки built result.
- Назови максимум три главных visual findings. Мелкие compliance-пункты оставь quality stage.
- Выбери один связный self-fix с наибольшим эффектом, реализуй его и повторно посмотри mobile/reference/wide render.
- Если проблема локальная, сохрани сильную композицию. Если проблема системная, предложи изменение tokens/components вместо скрытого локального исключения.

### На quality stage

- Пройди полный `UI quality check` и применимые before/after examples.
- Проверь accessibility, controls/states, realistic or worst-case content, responsive matrix, Desktop Canvas Contract, edge polish и runtime evidence.
- Полный audit может создать больше трёх findings; это отдельный compliance-проход, а не продолжение creator brief.
- Visual preference не становится hard failure без screenshot evidence, требования проекта или риска для пользователя.

## 22. Практические before/after examples

Эти примеры являются самостоятельными Prompt Kit scenarios. Используй их как калибровку качества, а не как готовые шаблоны для копирования. Если текущий блок похож на пример, перенеси принцип: что должно стать главным, что нужно убрать, где усилить группировку, как показать состояние, какой компонент выбрать и как сохранить hierarchy на mobile.

### Example 22.1. Hero с несколькими конкурирующими задачами

- Плохо: первый экран SaaS показывает H1, длинный lead, два бейджа, три CTA, мини-dashboard, отзыв, список integrations и форму заявки. Визуально всё выглядит важным, а пользователь не понимает, что делать первым.
- Лучше: hero отвечает на `что это / для кого / какое действие дальше`; один primary CTA ведет к демо, secondary link ведет к pricing, а proof и integrations уходят ниже первым follow-up блоком.
- Почему лучше: первый экран получает один visual job, а не пытается закрыть всю страницу сразу.
- Как Codex применяет: в block preview выбери главный вопрос hero и убери элементы, которые относятся к proof, comparison или form step.

### Example 22.2. Shippable scope вместо фейкового продукта

- Плохо: лендинг сервиса импорта данных показывает живой dashboard с графиками, AI score, team comments и audit log, хотя в проекте реально есть только CSV upload и список ошибок.
- Лучше: hero показывает реальный upload flow: dropzone, preview первых строк, понятные ошибки в таблице и CTA `Проверить файл`. Будущие функции помечены как roadmap, не как уже доступный UI.
- Почему лучше: интерфейс не обещает продукт, который нельзя поставить в production.
- Как Codex применяет: перед созданием красивого artifact UI проверь, есть ли данные, API, states и реальные возможности; если нет, показывай честный фрагмент текущего workflow.

### Example 22.3. Grayscale hierarchy до цвета

- Плохо: pricing selector работает только цветом: выбранный тариф синий, скидка зеленая, warning красный, но размеры, вес текста, рамки и spacing одинаковые.
- Лучше: выбранный тариф имеет сильнее border, небольшой surface lift, checkmark, заметный CTA и короткий label; скидка остается вторичной, warning получает icon + text рядом с причиной.
- Почему лучше: смысл сохраняется без цвета, на слабом экране и для пользователей с отличающимся восприятием цвета.
- Как Codex применяет: в visual review мысленно обесцветь скриншот и проверь, понятны ли selected, error, primary action и links.

### Example 22.4. Personality как набор UI knobs

- Плохо: для юридического B2B сервиса дизайн описан как `современный и премиальный`, а UI получает фиолетовый gradient, большие rounded cards, glow buttons и дружелюбные emoji.
- Лучше: personality переводится в параметры: спокойная neutral palette, умеренный radius, плотная таблица документов, сильные focus states, строгая typography, минимум decorative effects.
- Почему лучше: характер интерфейса соответствует риску, аудитории и задаче, а не абстрактному mood.
- Как Codex применяет: в design direction фиксируй не только adjectives, но и конкретные type, spacing, radius, color temperature, icons, motion и density decisions.

### Example 22.5. Page rhythm и соседние секции

- Плохо: после hero идут три блока подряд в формате `centered heading + 3 icon cards`: benefits, process, features. Каждый блок сам по себе нормальный, но страница выглядит как template.
- Лучше: benefits становятся short comparison strip, process становится numbered workflow row, features показывают product screenshot с callouts.
- Почему лучше: соседние секции выполняют разные visual jobs и не повторяют один паттерн без причины.
- Как Codex применяет: перед build проверь 2-3 соседних блока и замени повторяющийся layout на более подходящий format: table, artifact, timeline, proof strip, FAQ, form или compact list.

### Example 22.6. Spacing и группировка формы

- Плохо: в checkout label, input, helper text и error имеют одинаковые gap; поля между собой стоят почти так же близко, как label к input. Ошибка визуально относится к следующему полю.
- Лучше: label + input + helper/error собраны плотнее; между группами полей больше воздуха; error стоит сразу под своим field и имеет icon/text color role.
- Почему лучше: spacing объясняет отношения без дополнительных рамок и декоративных контейнеров.
- Как Codex применяет: при form build настрой internal gap, group gap и section gap отдельно; не лечи плохую группировку лишними cards.

### Example 22.7. Fixed/fluid widths на широком desktop

- Плохо: checkout растягивает address form на всю ширину 1440px, inputs становятся чрезмерно длинными, а order summary уезжает далеко вправо.
- Лучше: form column имеет max-width, summary держится рядом как stable side panel, а лишнее пространство остается внешним breathing room или используется для helpful support block.
- Почему лучше: пользователь сканирует поля естественной длины, а total и primary action остаются в поле внимания.
- Как Codex применяет: для forms, pricing cards, text columns, tables и media заранее укажи fixed, max-width и fluid behavior.

### Example 22.8. Typography roles и semantic hierarchy

- Плохо: в account settings заголовок `Настройки` огромный, но важный статус `Подписка закончится завтра` выглядит как обычный muted caption; кнопка `Сохранить` конкурирует с destructive action.
- Лучше: page title умеренный; urgent status получает отдельную role с icon и strong text; `Сохранить` визуально primary, destructive action вторичен и отделен.
- Почему лучше: визуальная иерархия совпадает с реальной важностью задачи.
- Как Codex применяет: проверяй не только HTML heading order, но и то, какие элементы пользователь должен увидеть первыми.

### Example 22.9. Baseline и inline typography

- Плохо: price row `4900 ₽ / месяц` использует крупную цену, маленький период, badge `-20%` и caption, но baseline скачет; badge висит выше текста, а currency выглядит отдельным словом.
- Лучше: price, currency и period выровнены по оптической baseline; badge имеет отдельный компактный slot; caption уходит ниже как secondary line.
- Почему лучше: интерфейс выглядит собранным, а цена читается одним объектом.
- Как Codex применяет: для prices, metrics, units, badges and inline icons проверяй baseline, line-height и vertical alignment.

### Example 22.10. Font fallback и реалистичный текст

- Плохо: product card идеально выглядит с `Desk Lamp`, но ломается на `Настольный светильник с беспроводной зарядкой и регулировкой угла`; цифры цены прыгают между rows.
- Лучше: card тестируется на длинном русском названии, sale price, old price и missing image; title clamps intentionally, price uses stable numeric settings, CTA остается на одной линии.
- Почему лучше: дизайн держит реальный контент, а не только короткие демо-строки.
- Как Codex применяет: в QA добавляй Cyrillic, long names, numeric data, sale/zero values and missing content stress cases.

### Example 22.11. Color и muted text на colored surface

- Плохо: info banner на синей поверхности содержит серый helper text и белый link без underline. На реальном мониторе helper почти исчезает, link похож на обычный текст.
- Лучше: banner использует доступный text color для всей иерархии; secondary text приглушен через opacity/token, но остается читаемым; link получает underline или icon cue.
- Почему лучше: contrast поддерживает scanning и не прячет важные условия.
- Как Codex применяет: для colored surfaces проверяй все роли текста: title, body, helper, link, status, disabled.

### Example 22.12. Depth, border и radius без декоративной перегрузки

- Плохо: dashboard cards имеют одновременно border, сильную shadow, gradient, inner glow и 24px radius. В плотном UI каждая card выглядит как отдельный рекламный баннер.
- Лучше: основная grid использует light border и subtle surface; shadow появляется только у popover/modal или active draggable item; radius соответствует design system.
- Почему лучше: depth сообщает слой и интерактивность, а не просто украшает всё подряд.
- Как Codex применяет: перед добавлением shadow спроси, какой layer она обозначает: base, raised, overlay, selected, pressed или floating.

### Example 22.13. Cards и containers без nesting

- Плохо: feature section: большой card содержит три cards, внутри каждой еще icon card и badge. Много рамок, мало смысла.
- Лучше: section остается unframed; каждая feature получает простую row/card только если нужно отделить самостоятельный объект. Icon встроен в заголовок или callout, а не живет в собственной коробке.
- Почему лучше: меньше контейнеров, больше внимания к содержанию и alignment.
- Как Codex применяет: удаляй один уровень container, если он не добавляет group, state, action или data boundary.

### Example 22.14. Buttons, CTA и action hierarchy

- Плохо: pricing card имеет `Попробовать`, `Купить`, `Подробнее`, `Связаться`, все как filled buttons. Пользователь не видит главный следующий шаг.
- Лучше: один primary CTA на выбранном/рекомендованном тарифе, secondary link для details, tertiary contact action отдельно для enterprise context.
- Почему лучше: action hierarchy совпадает с приоритетом решения.
- Как Codex применяет: для каждого блока назначь one primary action, optional secondary action и скрытые/tertiary actions; не превращай все ссылки в buttons.

### Example 22.15. Important choices: native controls сначала

- Плохо: checkout delivery method сделан как три декоративные cards с hover glow; keyboard focus не виден, selected state только цветом, screen reader не понимает radio group.
- Лучше: варианты являются semantic radio group, визуально оформлены как selectable rows/cards, имеют focus ring, selected border/checkmark, price/time metadata и error state.
- Почему лучше: важный выбор остается доступным, понятным и предсказуемым.
- Как Codex применяет: используй native semantics для radio/select/checkbox/file input, а кастомный визуал накладывай поверх корректного поведения.

### Example 22.16. Forms: error рядом с местом исправления

- Плохо: форма заявки показывает `Что-то пошло не так` над формой, но не подсвечивает поле телефона; disabled submit никак не объяснен.
- Лучше: summary говорит, что нужно исправить телефон; field получает error text и aria-describedby; disabled submit заменяется активным submit, который показывает validation, или рядом есть clear reason.
- Почему лучше: пользователь понимает, где проблема и как продолжить.
- Как Codex применяет: для каждой формы опиши focus, filled, invalid, disabled, loading, success and failure states до handoff.

### Example 22.17. Tables и dense UI

- Плохо: orders table показывает customer, email, date, amount, status, owner, actions одинаковым весом; customer identity и payment risk тонут в колонках.
- Лучше: первая ячейка богатая: customer name, email muted, small source marker; amount/right aligned; status has text + icon; row action предсказуемо справа.
- Почему лучше: dense UI становится сканируемым, потому что primary object и сравнимые значения получают правильные роли.
- Как Codex применяет: в таблицах выделяй primary entity cell, comparison columns, status column и action column; не делай все ячейки одинаковыми.

### Example 22.18. Semantic list markers

- Плохо: PDP block `Что входит` использует одинаковые зеленые check icons для включенных, опциональных и недоступных услуг.
- Лучше: included items имеют check, optional items имеют plus/label `опционально`, unavailable items имеют muted text и reason. Цвет не единственный marker.
- Почему лучше: пользователь не путает состав покупки, upsell и ограничение.
- Как Codex применяет: для списков benefits, limitations, availability и plan features выбирай markers по смыслу, а не по красоте.

### Example 22.19. Trust/proof без фейковой уверенности

- Плохо: trust section пишет `Нам доверяют тысячи клиентов` и показывает логотипы-заглушки без подтверждения.
- Лучше: если proof есть, показывается конкретный проверяемый факт: число заказов, дата, отрасль, ссылка на кейс или цитата клиента. Если proof нет, блок заменяется на process transparency или гарантийные условия с `needs confirmation`.
- Почему лучше: доверие строится на проверяемом материале, а не на визуальном шуме.
- Как Codex применяет: не выдумывай logos, numbers, reviews, guarantees or awards; в preview помечай missing proof явно.

### Example 22.20. Feature section как product behavior, а не набор абстракций

- Плохо: features grid: `Автоматизация`, `Контроль`, `Аналитика`, `Интеграции`, каждая с generic icon и одинаковым текстом.
- Лучше: features показывают конкретное поведение: `Система подсвечивает заказы без оплаты`, `Менеджер видит просроченные задачи`, `Экспорт показывает ошибки до отправки`.
- Почему лучше: пользователь видит, как UI работает в реальной ситуации.
- Как Codex применяет: каждую feature привязывай к объекту, действию, state, result или risk removed.

### Example 22.21. SaaS dashboard: empty state без мертвой оболочки

- Плохо: новый account показывает пустую таблицу, disabled filters, серый chart area и текст `No data`.
- Лучше: dashboard сохраняет layout, но основной empty state объясняет следующий шаг: import sample, connect source, create first project. Неактуальные filters скрыты или disabled с причиной.
- Почему лучше: пустой продукт выглядит как начало workflow, а не как сломанная админка.
- Как Codex применяет: проектируй empty/loading/error states как полноценные композиции с next action.

### Example 22.22. E-commerce product grid с unpredictable media

- Плохо: product cards предполагают одинаковые квадратные фото; вертикальные товары обрезаются, logos растягиваются, отсутствие фото ломает высоту card.
- Лучше: media container имеет stable aspect ratio, object-fit rules, safe background, placeholder, alt behavior; card content aligns by grid areas, not by lucky image height.
- Почему лучше: catalog survives real seller/user-uploaded content.
- Как Codex применяет: при e-commerce UI всегда тестируй wide, tall, transparent, missing, low-quality and text-heavy images.

### Example 22.23. Responsive hierarchy вместо механического stack

- Плохо: desktop pricing comparison с 5 колонками на mobile просто становится длинной вертикальной таблицей; CTA оказывается после 80 строк.
- Лучше: mobile показывает selected/recommended plan first, затем compact comparison accordion, sticky/nearby CTA и короткий summary of differences.
- Почему лучше: mobile сохраняет decision path, а не только порядок DOM.
- Как Codex применяет: для responsive pass проверь, какой выбор делает пользователь на маленьком экране, и перестрой presentation под этот выбор.

### Example 22.24. Anti-slop fix pass

- Плохо: weak AI block чинится добавлением gradient, glassmorphism, bigger icons and more cards.
- Лучше: fix pass сначала убирает decorative noise, уточняет main action, снижает secondary emphasis, выравнивает spacing/type, проверяет realistic content, затем добавляет один уместный visual accent.
- Почему лучше: качество появляется из ясности и системности, а не из количества эффектов.
- Как Codex применяет: при запросе `сделай красивее` сначала назови top visual defect, затем исправь hierarchy/layout/spacing/type; effects добавляй только если они усиливают job блока.

### Example 22.25. Единый desktop canvas вместо бесконечного stretch

- Плохо: двухколоночный hero выглядит собранно на 1440px, но на 2560–3840px колонки расходятся, lead становится слишком длинным, media теряет визуальный вес, gaps увеличиваются, а cards заполняют лишнюю ширину.
- Лучше: hero держит общий content canvas и устойчивое отношение copy/media; text measure, controls и core spacing ограничены, media расширяется только внутри объявленной zone, а фон продолжает viewport.
- Почему лучше: композиция сохраняет характер и плотность, не превращаясь ни в растянутый интерфейс, ни в маленький случайный остров без stage treatment.
- Как Codex применяет: проверяет canvas invariants на обязательных `1440 / 1920 / 2560 CSS px`, добавляет `3840 CSS px` для true-4K/full-bleed/ultrawide target или фиксирует reasoned skip и исправляет систему контейнеров, caps и expansion zones, а не отдельные симптомы каждого блока.

### Example 22.26. Первый кадр вместо послезагрузочного responsive swap

- Плохо: сервер показывает двухколоночный 1440-layout; после hydration `useEffect` читает viewport, заменяет дерево на mobile или wide version и загружает один 4K hero asset для всех экранов.
- Лучше: одна semantic structure сразу раскладывается CSS под заданный viewport; hero резервирует геометрию, браузер выбирает подходящий responsive candidate, а client code отвечает только за menu, tabs или другие действия.
- Почему лучше: пользователь не видит промежуточный неправильный дизайн, страница выполняет меньше лишней работы и не тратит мобильный трафик на wide asset без причины.
- Как Codex применяет: устанавливает viewport до fresh reload, сравнивает early и settled frame, проверяет hydration console и выбранный media resource; post-mount canvas correction блокирует approval.

## UI quality check

Эта полная таблица запускается на quality stage или для critic-задачи с явно запрошенным полным аудитом. До первого render creator выбирает только 4–6 релевантных критериев из документа и не переносит таблицу в creator brief.

| Check | Result | Notes |
| --- | --- | --- |
| Visual hierarchy is clear | pass / fix | |
| Shippable scope is honest | pass / fix | |
| Secondary UI is properly de-emphasized | pass / fix | |
| Main action is visually obvious | pass / fix | |
| Action hierarchy matches task priority | pass / fix | |
| Spacing has consistent rhythm | pass / fix | |
| Grouping is unambiguous without extra decoration | pass / fix | |
| Fixed/fluid widths are intentional | pass / fix | |
| Desktop canvas preserves hierarchy and density from 1440 to wide/4K | pass / fix | |
| Responsive canvas is correct on first frame without post-mount layout correction | pass / fix | |
| Typography roles are consistent | pass / fix | |
| Semantic and visual hierarchy do not conflict | pass / fix | |
| Font fallback and numerals are safe | pass / fix | |
| Contrast supports scanning | pass / fix | |
| Meaning survives without color alone | pass / fix | |
| Color scale has defined roles | pass / fix | |
| Media/image treatment supports content | pass / fix | |
| Media survives unpredictable content | pass / fix | |
| Cards/containers are not overused | pass / fix | |
| Shadows/depth have a purpose | pass / fix | |
| Important choices use suitable controls | pass / fix | |
| Native/link controls are polished before custom UI | pass / fix | |
| Tables/lists use the right density and grouping | pass / fix | |
| Empty/error/loading states are designed | pass / fix | |
| Detail polish checked with realistic content | pass / fix | |
| Visual implementation calibrated against reference quality | pass / fix | |
| Relevant before/after example checked | pass / fix | |
| Section has one visual job | pass / fix | |
| Neighbor sections do not repeat the same pattern | pass / fix | |
| UI does not introduce new tokens randomly | pass / fix | |
| Mobile layout keeps hierarchy | pass / fix | |
| Design avoids generic AI template patterns | pass / fix | |
