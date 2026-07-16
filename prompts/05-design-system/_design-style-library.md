# Design Style Library

Это fallback-справочник для `prompts/05-design-system/02-design-style-shortlist.md`. Сначала Codex извлекает visual ideas из предмета, процесса, материалов и реальных assets проекта. Библиотека подключается только если нужно расширить язык или сравнить найденную идею с известной style family.

Не начинай shortlist с выбора label из этой библиотеки. Style family описывает язык, а не подменяет project-specific idea.

Для проверки практического UI-качества после render используй релевантные sections `prompts/_knowledge/ui-design-quality.md`, а не загружай полный checklist в creator pass.

Для проверки современности используй `prompts/_knowledge/contemporary-visual-direction.md`: hypothesis выбирает primary expressive lever, optional secondary lever и честный asset truth. Отдельные media/icon/motion tables до CSS не требуются.

## Optional fit check

Используй эту matrix только если project-derived поиск потребовал fallback. Сравни 2–4 действительно подходящие style families; не прогоняй весь каталог ради формального рейтинга.

| Style | Audience fit | Offer fit | Content fit | Brand fit | Modernity fit | UI quality risk | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
|  | high/medium/low | high/medium/low | high/medium/low | high/medium/low | high/medium/low | high/medium/low | use / maybe / avoid |

## Общие принципы

- Визуальная иерархия должна помогать понять главное действие, а не просто украшать экран.
- Контраст, баланс, proximity, alignment, repetition и clear grouping важнее декоративных эффектов.
- Каждый selected style должен быть сформулирован как hypothesis with visual event, not as mood label.
- Concept stage прототипирует one active hypothesis per pass. Три candidates нужны для очереди, а не для одновременного HTML comparison.
- Media, icons/pictograms and motion могут быть expressive levers, если помогают проекту. Missing assets отмечаются честным art-directed placeholder.
- Design tokens фиксируются только после утвержденного visual concept.
- Референсы и скриншоты используются как input для смысла, структуры и UX-паттернов, но не копируются 1:1.
- Для e-commerce и рабочих интерфейсов ясность выбора, цены, статусов, фильтров и CTA важнее выразительной композиции.

## Swiss / International / Editorial Grid

- Best for: экспертные услуги, B2B, архитектура, культура, premium editorial, проекты с сильным текстом и строгой подачей.
- Avoid for: детские, игровые, сильно эмоциональные бренды, дешевые промо-лендинги, хаотичный контент без структуры.
- Core principles: сетка, иерархия, alignment, крупная типографика, минимум декора, ясный ритм.
- Typography: уверенная grotesk/neo-grotesk система, заметная шкала заголовков, аккуратные captions.
- Layout/grid: 12-column или editorial grid, сильные поля, асимметрия только осознанно.
- Color: нейтральная база, 1-2 акцента, высокий contrast.
- Spacing/radius/shadow: много воздуха, radius small/none, shadows минимальны.
- Imagery/media: крупные фото/кейсы, строгая кадрировка, подписи и meta.
- CTA/buttons: спокойные, четкие, без декоративной перегрузки.
- Trust/social proof: логотипы, кейсы, цитаты, факты в строгой сетке.
- Motion: subtle reveal, scroll rhythm, без лишней пластики.
- Good blocks to test: hero, case cards, benefits, expert proof.
- Anti-patterns: случайная асимметрия, мелкий текст, декоративные рамки без функции.
- Modern references/trend notes: хорошо сочетается с editorial web, typographic layouts и restrained premium.

## Premium Minimal / Quiet Luxury

- Best for: дорогие услуги, недвижимость, private healthcare, beauty premium, авторские продукты, luxury e-commerce.
- Avoid for: массовые скидочные магазины, B2B SaaS с плотными данными, проекты с большим числом дешевых CTA.
- Core principles: спокойствие, качество материалов, точная типографика, мало элементов, высокий контроль деталей.
- Typography: elegant serif + clean sans или очень выверенный sans, умеренные display sizes.
- Layout/grid: широкие поля, медленный ритм, fewer cards, больше editorial blocks.
- Color: off-white/charcoal/soft neutrals + один deep accent, не уходить в однообразный beige.
- Spacing/radius/shadow: generous spacing, radius small, shadows почти отсутствуют.
- Imagery/media: настоящие качественные фото, texture/material close-ups, аккуратный art direction.
- CTA/buttons: understated, уверенные, без screaming colors.
- Trust/social proof: сертификаты, craftsmanship, процесс, гарантии, факты качества.
- Motion: медленный, subtle, с reduced motion fallback.
- Good blocks to test: hero, service cards, proof strip, product detail.
- Anti-patterns: fake luxury, слишком маленький contrast, пустота вместо структуры.
- Modern references/trend notes: связан с quiet luxury, tactile warmth и premium editorial.

## Bold Digital / Conversion-First

- Best for: запуск продукта, промо, SaaS landing, event, education, digital-сервис с ясным offer.
- Avoid for: юридические/медицинские темы с высоким доверием, luxury, проекты с консервативной аудиторией.
- Core principles: сильный оффер, большая иерархия, контраст, быстрые CTA, proof рядом с action.
- Typography: крупный sans, короткие заголовки, high contrast between display/body.
- Layout/grid: секции с clear focal point, conversion zones, sticky/visible CTA по ситуации.
- Color: 1 dominant brand accent + нейтральные surfaces, осторожно с purple/blue SaaS cliché.
- Spacing/radius/shadow: medium density, cards допустимы, но не делать card soup.
- Imagery/media: product screenshots, outcome visuals, real UI, before/after.
- CTA/buttons: заметные, action-oriented, несколько уровней CTA.
- Trust/social proof: цифры, logos, cases, гарантии, сравнения.
- Motion: microinteractions, progress, hover, но не отвлекать от CTA.
- Good blocks to test: hero, benefits cards, pricing/offer, proof strip.
- Anti-patterns: всё кричит одновременно, fake metrics, aggressive gradients.
- Modern references/trend notes: conversion-first digital часто смешивается с bento и product storytelling.

## Warm Human / Trust-First Service

- Best for: локальные услуги, медицина, образование, семейные сервисы, care/service business, проекты с высоким страхом выбора.
- Avoid for: high-tech SaaS, fashion luxury, edgy brands, когда нужен строгий enterprise tone.
- Core principles: человеческое доверие, понятные шаги, лица/процесс, мягкая иерархия, успокаивающий тон.
- Typography: readable sans, friendly headings, body text не мельчить.
- Layout/grid: понятные sequential blocks, FAQ, process, trust cards.
- Color: теплые, но не однотонно beige; добавлять нейтральный contrast и functional accents.
- Spacing/radius/shadow: medium spacing, radius moderate, shadows мягкие и редкие.
- Imagery/media: реальные фото команды/процесса/результатов, не stock-like.
- CTA/buttons: clear and reassuring, рядом с explanation или proof.
- Trust/social proof: отзывы, документы, гарантии, этапы, ответы на страхи.
- Motion: minimal, comforting, no flashy effects.
- Good blocks to test: hero, process, benefits/trust, testimonials.
- Anti-patterns: стерильный corporate, фальшивые улыбки, декоративность вместо доказательств.
- Modern references/trend notes: хорошо сочетается с tactile warmth и service storytelling.

## Productive SaaS / Dashboard Clarity

- Best for: SaaS, CRM, admin, B2B tools, dashboards, workflows, docs-heavy products.
- Avoid for: эмоциональные lifestyle/brand sites, luxury, visual portfolio.
- Core principles: плотность, scanability, системность, ясные states, data hierarchy.
- Typography: compact sans, strong body readability, controlled heading scale.
- Layout/grid: tables, panels, toolbars, side nav, responsive density rules.
- Color: semantic states, neutral surfaces, restrained accent.
- Spacing/radius/shadow: compact spacing, radius small, borders > heavy shadows.
- Imagery/media: real product UI, diagrams, screenshots, workflow examples.
- CTA/buttons: familiar controls, icons in toolbars, clear primary actions.
- Trust/social proof: integrations, security, uptime, roles, enterprise proof.
- Motion: functional transitions, loading/skeleton states.
- Good blocks to test: hero with product UI, feature grid, workflow cards, dashboard snippet.
- Anti-patterns: marketing hero overload, huge empty cards, decorative gradients.
- Modern references/trend notes: опирается на design systems, productive typography и operational clarity.

## Bento / Modular Product Storytelling

- Best for: product landing, SaaS, apps, AI tools, complex offer, когда нужно показать несколько benefits быстро.
- Avoid for: сайты с мало контента, luxury minimal, темы где cards выглядят несерьезно.
- Core principles: modular hierarchy, reusable tiles, varied card sizes, feature storytelling.
- Typography: strong section headings, readable card titles, short supporting copy.
- Layout/grid: bento grid with stable dimensions, responsive collapse, no nested cards.
- Color: neutral surfaces + controlled accent per feature group.
- Spacing/radius/shadow: radius medium, shadows subtle, consistent gutters.
- Imagery/media: product snippets, icons, screenshots, small charts.
- CTA/buttons: primary CTA outside grid or in anchor tile, not every card.
- Trust/social proof: metrics/logos integrated as modules.
- Motion: hover states, subtle depth, no layout shifts.
- Good blocks to test: benefits/product features, integrations, proof grid.
- Anti-patterns: all blocks as cards, inconsistent card heights, text overflow.
- Modern references/trend notes: bento remains useful if it serves information hierarchy, not decoration.

## Neo-Brutalism / Tactile Brutalism

- Best for: creative studios, youth brands, events, indie products, bold campaigns.
- Avoid for: healthcare, legal, funeral/care services, conservative B2B, trust-sensitive checkout.
- Core principles: strong contrast, visible structure, playful roughness, directness.
- Typography: bold sans/display, high contrast, short copy.
- Layout/grid: chunky blocks, offset elements, deliberate rawness with strict containment.
- Color: high-contrast accents, black/white base, avoid eye strain.
- Spacing/radius/shadow: hard borders, low/no radius, offset shadows only if controlled.
- Imagery/media: cutouts, textures, collage, expressive product shots.
- CTA/buttons: chunky, obvious, tactile.
- Trust/social proof: badges, stamps, direct quotes, but keep credibility.
- Motion: tactile hover/press, small transforms.
- Good blocks to test: hero, cards, CTA, event/program blocks.
- Anti-patterns: unreadable chaos, accessibility failures, fake edginess.
- Modern references/trend notes: tactile rebellion can work, but needs strict usability guardrails.

## Glass / Liquid / Depth-Based UI

- Best for: AI tools, fintech concept, futuristic products, immersive launches, media-rich hero.
- Avoid for: content-heavy sites, low-end devices, projects needing maximum readability, serious public-service pages.
- Core principles: depth, translucency, layered surfaces, lighting, restrained motion.
- Typography: clean sans, high contrast against glass surfaces.
- Layout/grid: layered hero or focused modules; avoid making every section glass.
- Color: luminous accents, dark/light surfaces with contrast checks.
- Spacing/radius/shadow: large radius, blur/depth, but with fallback and performance awareness.
- Imagery/media: gradients/photo/video/3D can support depth, not replace content.
- CTA/buttons: solid enough to be readable and clickable.
- Trust/social proof: keep proof on solid surfaces, not behind blur.
- Motion: liquid transitions only where meaningful; respect reduced motion.
- Good blocks to test: hero, feature cards, product preview.
- Anti-patterns: low contrast, blur everywhere, heavy GPU effects, unreadable text.
- Modern references/trend notes: use modern depth trends carefully; production sites need accessibility and performance.

## Craft / Organic / Handmade Warmth

- Best for: handmade goods, food, local brands, education, wellness, cultural projects, personal expert sites.
- Avoid for: strict enterprise tools, price-comparison commerce, technical dashboards.
- Core principles: texture, warmth, imperfection, storytelling, material cues.
- Typography: humanist sans/serif mix, readable body, occasional expressive display.
- Layout/grid: organic rhythm but still aligned; avoid arbitrary placement.
- Color: earthy/warm palette plus clear contrast and functional CTA color.
- Spacing/radius/shadow: varied but controlled spacing, softer radius, tactile borders.
- Imagery/media: real materials, process photos, illustrations, hand-drawn accents.
- CTA/buttons: simple, tactile, friendly.
- Trust/social proof: origin, process, maker story, reviews, certifications.
- Motion: gentle, natural, no excessive parallax.
- Good blocks to test: hero, story, product/service cards, testimonials.
- Anti-patterns: scrapbook chaos, low contrast handwritten text, too many textures.
- Modern references/trend notes: trend toward texture and warmth is useful when it supports authenticity.

## E-commerce Utility / Polaris-Like Commerce Clarity

- Best for: catalogs, product grids, DTC shops, B2B commerce, stores with filters, PDP, cart and checkout.
- Avoid for: pure portfolio/brand sites without transactional flows.
- Core principles: findability, product comparison, price clarity, stock/status clarity, trust near decisions.
- Typography: highly readable, compact labels, clear price hierarchy.
- Layout/grid: stable product grids, filters, sort, category nav, PDP sections, checkout forms.
- Color: semantic commerce tokens: price, sale, stock, rating, promo, error/success.
- Spacing/radius/shadow: consistent cards, predictable controls, stable dimensions.
- Imagery/media: clear product photos, ratios, thumbnails, zoom/detail rules.
- CTA/buttons: add to cart / buy / checkout are unmistakable; secondary actions lower priority.
- Trust/social proof: delivery, payment, returns, reviews, warranty near product decisions.
- Motion: functional feedback for add-to-cart, filters, loading, not decorative.
- Good blocks to test: category hero, product cards, trust strip, PDP buy box.
- Anti-patterns: hidden price, vague availability, overloaded product card, checkout friction.
- Modern references/trend notes: Polaris-like clarity is a strong base for commerce even when the brand layer is more expressive.

## Source notes

- NN/g visual design principles: https://www.nngroup.com/articles/principles-visual-design/
- NN/g visual design study guide: https://www.nngroup.com/articles/visual-design-in-ux-study-guide/
- Material Design tokens: https://m3.material.io/foundations/design-tokens
- Atlassian design tokens: https://atlassian.design/tokens/design-tokens
- IBM Carbon typography: https://carbondesignsystem.com/elements/typography/overview/
- Shopify Polaris design: https://polaris-react.shopify.com/design
- Figma web design trends: https://www.figma.com/resource-library/web-design-trends/
- Tilda web design styles: https://tilda.education/en/web-design-styles
- Envato web design trends: https://elements.envato.com/learn/web-design-trends
- Creative Bloq 2026 trends: https://www.creativebloq.com/design/graphic-design/texture-warmth-and-tactile-rebellion-the-big-graphic-design-trends-for-2026
