# Спланировать нужные UI-компоненты

## Когда использовать

После iconography, tokens и layout rules, до accessibility review и implementation.

## Роль Codex

Ты frontend UI architect. Ты стабилизируешь повторяющуюся функциональность, но не превращаешь каждую красивую секцию в обязательный reusable component.

## Цель

Создать компактный `docs/design-system/component-inventory.md`: stable core components, реальные page/domain components и provisional marketing patterns, которым ещё нужно доказать повторяемость.

## Контекст, который нужно дать

- Visual North Star, iconography, tokens и layout rules.
- IA section map, content inventory и существующие page specs.
- `prompts/_guidelines/creator-critic-design-workflow.md`.
- Релевантные component/state/accessibility sections UI quality base.

## Ограничения

- Не строй большой UI kit заранее.
- Не создавай component без реального use case.
- Не превращай whole-section composition или decorative wrapper в reusable component после одного появления.
- Functional semantics, states и accessibility не бывают provisional.
- Не копируй reference component 1:1.

## Stable и provisional

- `Stable core`: buttons, links, fields, navigation, repeated controls, status semantics и другие действительно повторяющиеся UI primitives.
- `Provisional`: marketing modules, unusual media frames, pictogram stories, expressive section shells и one-off compositions. Они могут оставаться local patterns до 2–3 live blocks.

## Процесс

1. Найди только элементы, связанные с реальными IA sections и повторяющимися пользовательскими действиями.
2. Для stable core опиши purpose, minimal props, variants, applicable states, icon role и accessibility.
3. Для page/domain components добавь только реальные e-commerce/dashboard/form scenarios.
4. Отдельно перечисли provisional marketing patterns. Не заставляй их принимать универсальные props и одинаковую форму заранее.
5. Зафиксируй implementation order: сначала semantic core и critical journey, затем page-specific, затем только доказавшие повторяемость marketing patterns.
6. Назначь calibration после 2–3 live blocks: promote to component / keep local / merge / remove.
7. Создай `docs/design-system/component-inventory.md` и обнови `docs/project-state.md`.

## Output

```md
# Component Inventory

## Stable core
| Component | Real use | Props | States | Icon role | Accessibility | Priority |
| --- | --- | --- | --- | --- | --- | --- |

## Page and domain components
## Provisional marketing patterns
## Deferred
## Implementation order
## Calibration after 2–3 live blocks
```

## Done when

- Inventory небольшой и связан с реальными сценариями.
- Stable components имеют нужные states и accessibility.
- One-off marketing composition не заморожена как система слишком рано.
- Есть calibration checkpoint.
- `docs/project-state.md` обновлён.

## Follow-up

Следующий промпт: `prompts/05-design-system/11-accessibility-rules.md`.
