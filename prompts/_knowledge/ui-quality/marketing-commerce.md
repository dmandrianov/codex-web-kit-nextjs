# UI quality: marketing and commerce

Загружай этот модуль для hero, pricing, trust, feature и e-commerce интерфейсов. Остальные UI-модули не открывай без связи с текущей задачей.

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
