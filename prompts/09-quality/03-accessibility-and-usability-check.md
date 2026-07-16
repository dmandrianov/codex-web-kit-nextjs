# Проверить accessibility и usability блока

## Когда использовать

После visual screenshot review, чтобы проверить доступность и пользовательскую пригодность одного блока.

## Роль Codex

Ты действуешь как accessibility QA engineer и UX reviewer.

## Цель

Проверить и исправить accessibility/usability проблемы текущего блока: semantic HTML, keyboard, focus, aria, contrast, target size, labels, errors, reduced motion и понятность interactions.

## Контекст, который нужно дать

- Quality plan.
- Block spec.
- Реализованный блок.
- `docs/design-system/accessibility.md`.
- Component inventory.
- `prompts/_knowledge/ui-design-quality.md`.
- `prompts/_knowledge/site-copy-quality.md`, если блок содержит user-facing labels, errors, help text или states.
- Browser URL или screenshots.
- Form/e-commerce specs, если блок связан с ними.

## Ограничения

- Проверяй только текущий блок.
- Не меняй бизнес-логику за пределами блока.
- Не добавляй сложные accessibility abstractions без необходимости.
- Не скрывай focus outlines.
- Не оправдывай плохую доступность reference screenshot.
- Если проблема системная, зафиксируй follow-up для design system или shared component.
- Не называй usability/accessibility check пройденным, если labels, errors, help text или state copy непонятны пользователю и не прошли `Site copy check`.

## Процесс

1. Проверь semantic HTML и heading/list/button/link usage.
2. Проверь keyboard navigation и focus order.
3. Проверь visible focus states.
4. Проверь aria/labels только там, где они нужны.
5. Проверь contrast/readability, touch target sizes и сохранение visual hierarchy для controls/forms/tables.
6. Проверь forms/errors/success/help text, если есть.
7. Проверь Site copy quality для user-facing labels, errors, help text, empty/success/loading states и recovery messages.
8. Проверь reduced motion, если есть motion.
9. Исправь локальные проблемы текущего блока.
10. Создай или обнови `docs/pages/[page-slug]/blocks/[block-slug]-accessibility-check.md`.
11. Обнови `docs/project-state.md`: отметь `Accessibility check done` и укажи следующий промпт.

## Output

Создай или обнови `docs/pages/[page-slug]/blocks/[block-slug]-accessibility-check.md` в формате:

```md
# Accessibility and Usability Check: [Block name]

## Checks

| Check | Result | Fix made | Notes |
| --- | --- | --- | --- |

## Keyboard and focus

## Semantics and aria

## Contrast and readability

## Forms and states

## Site copy usability

- User-facing labels/errors/states present:
- `prompts/_knowledge/site-copy-quality.md` used:
- Notes:

## Out-of-scope follow-ups
```

В ответе кратко покажи:

- checks passed/failed;
- fixes made;
- remaining risks;
- следующий prompt.

## Done when

- Keyboard/focus проверены.
- Semantics и aria не конфликтуют с UI.
- Contrast/readability и targets приемлемы.
- Controls/forms/tables остаются понятными визуально и доступны в состояниях.
- Forms/states проверены, если есть.
- Labels/errors/help text/state copy понятны пользователю и проходят `Site copy check`, если они есть.
- Системные проблемы вынесены в follow-up.
- `docs/project-state.md` обновлен.

## Follow-up

Следующий промпт: `prompts/09-quality/04-technical-checks.md`.

Если accessibility проблема требует изменения структуры блока, вернись к `prompts/08-block-build/02-build-block-structure.md` или `prompts/08-block-build/05-interaction-and-states-pass.md`.
