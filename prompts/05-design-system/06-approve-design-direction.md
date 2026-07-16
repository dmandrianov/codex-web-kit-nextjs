# Зафиксировать утверждённое дизайн-направление

## Когда использовать

Когда пользователь явно утвердил live concept или явно попросил пропустить concept stage.

## Роль Codex

Ты design systems lead. Твоя задача — сохранить характер утверждённой работы, не превратив её в длинный свод запретов.

## Цель

Создать короткие `approved-concept.md`, `design-direction.md` и `visual-north-star.md`, которые удерживают общую идентичность и оставляют будущим блокам композиционную свободу.

## Контекст, который нужно дать

- Утверждённый live concept и mobile / 1440 / 2560 screenshots; если stage явно пропущен, решение пользователя о skip.
- `design-lab/design-concepts/concept-decisions.md`, если concept stage не был пропущен.
- `style-shortlist.md` и `concept-feedback.md`.
- Strategy, messaging, IA и reference principles.
- `prompts/_guidelines/creator-critic-design-workflow.md`.
- `prompts/_knowledge/contemporary-visual-direction.md`.
- `prompts/_templates/visual-north-star-template.md`.

## Ограничения

- Не утверждай направление без явного решения пользователя.
- Не копируй reference 1:1 и не закрепляй fake proof как реальный asset.
- Не фиксируй заранее layout каждого блока.
- Не превращай North Star в полный UI checklist или каталог анти-паттернов.
- Accessibility, semantic meaning, brand truth и proof honesty никогда не бывают provisional.

## Stable и provisional

Раздели будущую систему на два слоя:

- `Stable foundation`: approved brand character, semantic color roles, typography roles, interaction meaning, accessibility, truth/proof rules и проверенные continuity anchors.
- `Provisional expressive vocabulary`: marketing surfaces, decorative depth, section compositions, media treatments, pictogram language, motion accents и другие выразительные приёмы, которые ещё должны доказать себя в 2–3 живых блоках.

Provisional не означает случайный. Он должен продолжать approved concept, проходить screenshot critic и не нарушать stable foundation.

## Процесс

1. Зафиксируй решение пользователя и ссылки на live/screenshot evidence. Если concept stage явно пропущен, напиши `Concept stage skipped by user`, не выдумывай evidence и собери минимальное направление из brand/reference/strategy inputs.
2. Выдели 3–5 positive continuity anchors: наблюдаемые признаки, по которым новый блок узнаётся как часть этого проекта.
3. Зафиксируй primary expressive lever, optional secondary lever и asset truth из concept. При explicit skip пометь expressive vocabulary provisional и оставь честные open questions для первого live block.
4. Сформулируй `Stable foundation` и `Provisional expressive vocabulary`.
5. Укажи creative freedom: composition, scale, whitespace, crop, focal object, section rhythm и сочетание выразительных приёмов можно выбирать после build, если сохраняются anchors и invariants.
6. Оставь максимум три hard invariants. Предпочтение: явное решение пользователя, accessibility, truth/proof/brand safety.
7. Назначь `Calibration checkpoint`: после 2–3 живых marketing-блоков провести page-level screenshot review и решить, какие provisional patterns становятся stable, какие меняются, какие удаляются.
8. Создай документы по компактным схемам ниже.
9. Обнови `docs/project-state.md`: concept/direction/North Star approved и следующий prompt.

## Output

`docs/design-system/concepts/approved-concept.md`:

```md
# Approved Design Concept

## User decision
## Live evidence
## Keep
## Primary expressive lever
## Optional secondary lever
## Asset truth
## Open risks
```

`docs/design-system/design-direction.md`:

```md
# Design Direction

## Design goal
## Positive visual principles
## Stable foundation
## Provisional expressive vocabulary
## Media and asset truth
## Functional icon needs
## Motion role, if any
## Creative freedom
## Hard invariants
## Calibration after 2–3 live blocks
```

`docs/design-system/visual-north-star.md` создай по короткому шаблону `prompts/_templates/visual-north-star-template.md`.

В ответе покажи направление, 3–5 anchors, что уже stable, что пока provisional и когда будет calibration.

## Done when

- Есть явное user approval или явный skip.
- При skip отсутствующее visual evidence не выдумано, а first-live-block calibration названа явно.
- North Star короткий, положительный и связан с live evidence.
- Зафиксированы 3–5 anchors, creative freedom и максимум три hard invariants.
- Stable foundation отделён от provisional expressive vocabulary.
- Назначен calibration checkpoint после 2–3 живых блоков.
- Media/proof truth и accessibility сохранены.
- `docs/project-state.md` обновлён.

## Follow-up

Следующий промпт: `prompts/05-design-system/07-iconography-system.md`.
