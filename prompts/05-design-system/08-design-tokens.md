# Сформировать дизайн-токены

## Когда использовать

После approved concept, design direction и iconography, до layout/components/build.

## Роль Codex

Ты design systems engineer. Ты создаёшь надёжную основу, но не замораживаешь весь marketing-язык по двум concept-блокам.

## Цель

Создать `docs/design-system/design-tokens.md`: небольшой набор stable semantic/accessibility tokens и явно помеченный provisional expressive слой, который будет откалиброван после 2–3 живых блоков.

## Контекст, который нужно дать

- Design direction, Visual North Star и approved concept.
- Iconography.
- Реальные brand colors/fonts/assets.
- Accessibility requirements и frontend styling stack.
- `prompts/_guidelines/creator-critic-design-workflow.md`.
- Релевантные typography/color/state разделы UI quality base.

## Ограничения

- Не создавай огромную token taxonomy для первой версии.
- Не выбирай color без semantic role и contrast evidence.
- Не делай accessibility, focus, danger/success states или смысл действий provisional.
- Не кодируй каждый декоративный приём concept как вечный token.
- Не верстай компоненты или страницы.

## Stable и provisional

`Stable foundation`:

- approved brand primitives;
- text/background/action/status semantics;
- typography roles;
- focus, contrast and interaction meaning;
- core spacing needed for readable UI;
- functional icon roles.

`Provisional expressive vocabulary`:

- marketing surfaces and accent combinations;
- decorative radius/shadow/depth;
- display-scale accents;
- texture, gradient or media-overlay treatment;
- motion accents.

Provisional tokens всё равно должны иметь semantic name, доступный contrast и связь с approved concept.

## Процесс

1. Выдели минимальные primitive tokens: colors, fonts, type scale, spacing, radius, border, shadow/depth, motion, breakpoints и z-index.
2. Создай semantic tokens для background/surface/text/muted/action/focus/status/selection. Проверь основные contrast combinations.
3. У каждого token укажи статус `stable` или `provisional` и причину.
4. Добавь только реальные domain states из IA: e-commerce, dashboard, forms и другие, если они существуют.
5. Сопоставь icon size/color/focus roles с iconography.
6. Опиши CSS variables/Tailwind mapping без реализации production components.
7. Назначь calibration после 2–3 живых marketing-блоков: provisional tokens можно повысить до stable, уточнить или удалить по screenshot evidence. Stable semantics/accessibility менять только по явной причине.
8. Создай `docs/design-system/design-tokens.md` и обнови `docs/project-state.md`.

## Output

```md
# Design Tokens

## Principles
## Stable foundation
## Provisional expressive vocabulary

| Token | Value | Semantic role | Status | Evidence / calibration note |
| --- | --- | --- | --- | --- |

## Typography roles
## Spacing and layout primitives
## Focus and state tokens
## Icon tokens
## Domain-specific tokens
## CSS variables draft
## Calibration after 2–3 live blocks
```

## Done when

- Tokens компактны и имеют semantic roles.
- Brand/semantic/accessibility foundation отмечен stable.
- Marketing/decorative vocabulary может оставаться provisional.
- Contrast, focus and status meaning проверены.
- Назначен screenshot-based calibration checkpoint.
- `docs/project-state.md` обновлён.

## Follow-up

Следующий промпт: `prompts/05-design-system/09-layout-and-responsive-rules.md`.
