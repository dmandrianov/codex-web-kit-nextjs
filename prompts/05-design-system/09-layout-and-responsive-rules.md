# Зафиксировать layout и responsive rules

## Когда использовать

После design tokens, до component inventory и production build.

## Роль Codex

Ты responsive layout architect. Ты фиксируешь безопасный canvas, но не назначаешь одну композицию всем будущим секциям.

## Цель

Создать `docs/design-system/layout-rules.md`: stable reading/responsive foundation, Desktop Canvas Contract, First-render Responsive Delivery Contract и provisional expressive patterns, которые проверятся на первых живых блоках.

## Контекст, который нужно дать

- Design direction, Visual North Star, tokens и iconography.
- IA section map и content inventory.
- Approved concept screenshots: mobile / 1440 / 2560.
- `prompts/_guidelines/creator-critic-design-workflow.md`.
- `prompts/_guidelines/page-composition-rhythm.md`.
- Релевантные layout/responsive sections UI quality base.

## Ограничения

- Не верстай страницы и не заменяй page specs.
- Не используй одну grid/card форму как ответ на все секции.
- Не допускай бесконтрольный `vw/vh`, global scale, overflow, text collision или растяжение core content на wide screens.
- Не планируй initial layout, который становится правильным только после mount, viewport read или JavaScript scale. Core responsive geometry должна определяться CSS до первого кадра.
- Accessibility, readable measure, touch targets, semantic order и critical controls остаются stable.
- Не запрещай новый composition только потому, что его ещё нет в component inventory.

## Stable и provisional

- `Stable`: canvas roles/caps, reading measure, gutters, safe responsive order, interaction/touch constraints, media safety, form/control fitting, CSS-first initial geometry, hydration stability и wide-screen invariants.
- `Provisional`: section composition archetypes, expressive full-bleed stages, media/copy relationships, rhythm accents, overlap/depth devices и marketing-specific expansion zones.

## Процесс

1. Определи container/canvas roles: reading, content, wide и full-bleed.
2. Создай `Desktop Canvas Contract`: reference viewport, caps, gutters, stable invariants, allowed expansion zones, height behavior и modes `hold / extend / recompose`.
3. Создай `First-render Responsive Delivery Contract`:
   - `Initial layout source: CSS` и способ доставки critical canvas styles вместе с initial route;
   - одинаковая semantic structure в server HTML и первом client render;
   - `JavaScript viewport dependency: none / justified exception`;
   - reserved geometry для media и measured widgets;
   - responsive asset sizing по rendered width и loading role;
   - font/loading stability без послезагрузочной смены canvas geometry;
   - failure signs: flash reference canvas, post-mount column/DOM swap, hidden duplicate trees, late oversized media или geometry shift.
4. Полная системная matrix на этом позднем шаге:
   - `1440x900`, `1920x1080`, `2560x1440 CSS px` — обязательны;
   - `3840x2160 CSS px` — только для true-4K/full-bleed/ultrawide target, иначе reasoned skip.
   Concept stage до этого использует более дешёвый sanity set: mobile / 1440 / 2560.
5. Зафиксируй stable rules для text measure, core gaps, controls, forms, navigation, tables/dense UI, cropping, focus visibility и responsive reading order.
6. Опиши page rhythm через роли секций: calm, expressive, media-led, proof, decision, CTA. Не предписывай каждому блоку конкретную сетку.
7. Назови provisional expressive patterns из approved concept и где их можно пробовать. Каждый новый pattern должен иметь смысл, screenshot evidence и не ломать stable foundation.
8. Определи mobile/tablet/reference/wide behavior: что holds, что extends, что recomposes.
9. Назначь calibration после 2–3 live marketing blocks: посмотреть соседние blocks вместе, затем стабилизировать, изменить или удалить provisional patterns.
10. Создай `docs/design-system/layout-rules.md` и обнови `docs/project-state.md`.

## Output

```md
# Layout and Responsive Rules

## Stable foundation
## Provisional expressive patterns

## Desktop Canvas Contract
- Reference CSS viewport:
- Canvas roles and caps:
- Gutters:
- Stable invariants:
- Expansion zones:
- Height behavior:
- Wide modes: hold / extend / recompose

| CSS viewport | What stays stable | What may expand/recompose | Failure signs |
| --- | --- | --- | --- |
| 1440x900 | | | |
| 1920x1080 | | | |
| 2560x1440 | | | |
| 3840x2160 / skip | | | |

## First-render Responsive Delivery Contract
- Initial layout source: CSS
- Critical canvas CSS delivery:
- SSR / first client render invariant:
- JavaScript viewport dependency: none / justified exception
- Reserved geometry for media and measured surfaces:
- Responsive asset sizing and loading roles:
- Font/loading stability:
- Failure signs:

## Reading and grid rules
## Section roles and page rhythm
## Responsive behavior
## Media and crop safety
## Controls, forms and dense UI
## Screenshot adaptation rules
## Calibration after 2–3 live blocks
```

## Done when

- Desktop Canvas Contract защищает core content от uncontrolled stretch.
- First-render Responsive Delivery Contract запрещает post-mount canvas correction и фиксирует responsive media/font stability.
- Обязательная `1440 / 1920 / 2560` matrix и применимый `3840` описаны в CSS pixels.
- Stable responsive/accessibility foundation отделён от provisional marketing composition.
- Будущие блоки имеют свободу `hold / extend / recompose` внутри invariants.
- Есть calibration checkpoint по соседним live blocks.
- `docs/project-state.md` обновлён.

## Follow-up

Следующий промпт: `prompts/05-design-system/10-ui-components.md`.
