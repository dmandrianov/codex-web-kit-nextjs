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
