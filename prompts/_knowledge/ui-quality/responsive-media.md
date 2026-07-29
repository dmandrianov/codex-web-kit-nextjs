# UI quality: responsive and media

Загружай этот модуль для responsive behavior, viewport-проверок и поведения медиа. Остальные UI-модули не открывай без связи с текущей задачей.

## First-render Responsive Delivery Contract

- Сервер отдаёт устойчивую структуру, а CSS media/container queries выбирают основную геометрию до первого видимого кадра.
- `window.innerWidth` и JavaScript допустимы как QA evidence или для поведения, которое нельзя выразить CSS, но не как источник canvas/layout, исправляющий страницу после mount.
- SSR, первый client render и settled state сохраняют одну смысловую структуру без hydration-driven layout snap.
- Перед browser verification установи viewport до navigation/fresh reload и сравни early frame с settled state.
- Для media заранее резервируй геометрию, задавай честный aspect ratio/crop/fallback и выбирай responsive resource по фактической rendered width.

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
