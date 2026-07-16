# Стилизовать блок по дизайн-системе

## Когда использовать

После structure pass для одного блока, когда нужно применить design tokens, layout rules, component inventory и visual reference adaptation.

## Роль Codex

Ты действуешь как frontend UI engineer и design-system implementer.

## Цель

Довести визуальный слой одного блока до соответствия дизайн-системе: typography, spacing, layout, colors, media, states hooks и reference adaptation без перехода к адаптивной доводке всей страницы.

## Контекст, который нужно дать

- Build plan.
- Block spec.
- Реализованный блок.
- `docs/design-system/design-tokens.md`.
- `docs/design-system/iconography.md`.
- `docs/design-system/layout-rules.md`.
- `docs/design-system/component-inventory.md`.
- `docs/design-system/reference-principles.md`, если есть.
- `docs/content/editorial-rules.md`, если есть.
- `prompts/_guidelines/anti-ai-slop-design-and-copy.md`.
- Creator brief с 4–6 relevant quality rules; полный UI standard не загружай до render.
- `prompts/_guidelines/creator-critic-design-workflow.md`.
- Reference adaptation для блока, если есть.
- Текущие styles/components.

## Ограничения

- Работай только с указанным блоком.
- Не меняй глобальные tokens/design system без отдельного решения.
- Не меняй соседние блоки ради визуального совпадения.
- Не делай responsive pass для всех viewport глубоко, только базовую устойчивость; отдельная адаптивная доводка дальше.
- Не выбирай приёмы на generic autopilot. Functional, narrative, emotional, brand и atmospheric роли допустимы.
- Для marketing scope разрешён один purposeful expressive exception внутри North Star; запиши его provisional. Truth, accessibility и semantic tokens остаются hard boundaries.
- Не расширяй текст сверх block spec text density budget.
- Не копируй чужой screenshot style 1:1.

## Процесс

1. Прочитай creator brief из build plan: 4–6 релевантных направлений, без полного pre-render checklist.
2. Сопоставь block spec с tokens/layout/components.
3. Как creator, выбери и реализуй composition/material/type/media treatment.
4. Используй component inventory вместо ad hoc product UI, где это уместно.
5. Адаптируй reference screenshot через preserve/adapt/forbidden-to-copy.
6. Проверь text fitting, отсутствие overlap и стабильные размеры controls.
7. Если exact wording/line breaks скорректированы, убедись, что approved meaning/facts/claims/voice/action не изменились.
8. Если использован expressive exception, запиши его как provisional pattern и назови роль.
9. Оставь полный UI quality checklist post-render critic; сейчас зафиксируй только риски для responsive/quality.
10. Обнови `docs/project-state.md`: отметь `Current block styled` и укажи следующий промпт.

## Output

В ответе укажи:

- изменённые файлы;
- какие tokens/components применены;
- creator brief и созданную композицию;
- provisional pattern, если есть;
- как адаптирован reference;
- что проверить на responsive pass;
- риски.

## Done when

- Один блок визуально соответствует дизайн-системе.
- Использованы tokens/layout rules, а не случайные значения.
- Визуальный слой следует короткому creator brief; полный UI quality check запланирован после live render.
- Соседние блоки не изменены.
- Reference, если был, адаптирован, а не скопирован.
- Текст и controls не ломают layout в базовом состоянии.
- Нет generic autopilot; заметные приёмы имеют понятную роль.
- `docs/project-state.md` обновлен.

## Follow-up

Следующий промпт: `prompts/08-block-build/04-responsive-pass.md`.

Если блок не требует отдельной адаптивной доводки, всё равно зафиксируй это и переходи к `prompts/08-block-build/06-block-build-review.md` или interaction pass, если он нужен.
