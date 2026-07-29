# UI quality: visual language

Загружай этот модуль для типографики, цвета, контраста, depth, borders, radius, cards и containers. Остальные UI-модули не открывай без связи с текущей задачей.

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
