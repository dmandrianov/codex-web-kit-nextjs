# UI quality: controls, forms and data

Загружай этот модуль для buttons, CTA, controls, forms, lists, tables, dashboard и dense UI. Остальные UI-модули не открывай без связи с текущей задачей.

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
