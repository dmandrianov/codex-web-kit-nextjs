# UI quality: critic and quality

Загружай этот модуль после render для critic, полного UI review или quality stage. Остальные UI-модули не открывай без связи с текущей задачей.

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
