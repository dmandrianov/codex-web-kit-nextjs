# Адаптировать reference screenshot в требования к блоку

## Когда использовать

После page spec, если пользователь прислал скриншот, Behance-фрагмент или ссылку на похожий блок, который нужно использовать при планировании конкретного блока.

## Роль Codex

Ты действуешь как UX pattern analyst, product designer и design-system guard.

## Цель

Создать `docs/pages/[page-slug]/references/[block-slug]-reference-adaptation.md`: безопасную адаптацию reference screenshot в требования к будущему block spec без копирования чужого визуала.

## Контекст, который нужно дать

- Reference screenshot, ссылка или описание похожего блока.
- `docs/pages/[page-slug]/page-spec.md`.
- `docs/design-system/reference-principles.md`, если есть.
- `docs/design-system/design-direction.md`.
- `docs/design-system/design-tokens.md`.
- `docs/design-system/iconography.md`.
- `docs/design-system/layout-rules.md`.
- `docs/design-system/component-inventory.md`.
- `docs/design-system/accessibility.md`.
- Только релевантные разделы `prompts/_knowledge/ui-design-quality.md`, выбранные через creator/critic workflow.
- `prompts/_guidelines/creator-critic-design-workflow.md`.
- `docs/ia/content-inventory.md`.
- E-commerce artifacts, если блок связан с товаром, каталогом, корзиной или checkout.

## Ограничения

- Не верстай блок.
- Не копируй layout, тексты, изображения, брендовые элементы, уникальные композиции и визуальные эффекты 1:1.
- Не переноси чужую палитру, typography, icons или spacing, если они конфликтуют с дизайн-системой.
- Не меняй page spec без явной причины.
- Если скриншот нечитабелен, опиши, что видно, и задай уточняющий вопрос.
- Если референс требует изменения дизайн-системы, предложи это отдельно и не применяй молча.

## Процесс

1. Опиши, что видно на screenshot/reference: структура, контентные зоны, интерактив, визуальный ритм.
2. Определи смысл блока и пользовательскую задачу.
3. Раздели наблюдения на `preserve`, `adapt`, `replace with design system`, `forbidden-to-copy`.
4. Выдели 4–6 релевантных design signals для будущего creator: UX job, hierarchy/focal idea, material/media treatment, continuity anchor, responsive invariant и то, что нельзя копировать. Не переносить полный UI checklist до render.
5. Сопоставь элементы с existing component inventory.
6. Зафиксируй content requirements и риски по фактам.
7. Зафиксируй responsive и accessibility expectations.
8. Создай или обнови `docs/pages/[page-slug]/references/[block-slug]-reference-adaptation.md`.
9. Обнови `docs/project-state.md`: отметь `Reference adapted for block` и укажи следующий промпт.

## Output

Создай или обнови `docs/pages/[page-slug]/references/[block-slug]-reference-adaptation.md` в формате:

```md
# Reference Adaptation: [Block name]

## Source reference

## What the reference is doing

## Preserve

## Adapt to this site

## Replace with design system

## Forbidden to copy

## Component mapping

| Reference element | Site component/token/layout rule | Notes |
| --- | --- | --- |

## Creator signals (4-6)

## Post-render critic risks

## Content requirements

## Responsive and accessibility notes

## Open questions
```

В ответе кратко покажи:

- смысл референса;
- что сохраняем;
- что адаптируем;
- что нельзя копировать;
- следующий промпт по router.

## Done when

- Reference screenshot превращён в требования к блоку.
- Чётко отделены UX-паттерн и чужой визуал.
- Есть mapping на design tokens/layout/components.
- Есть 4–6 creator signals и post-render critic risks; полный UI checklist не загружен до build.
- Есть ограничения для будущего block spec.
- `docs/project-state.md` обновлен.

## Follow-up

Следующий промпт: `prompts/07-page-planning/04-content-and-seo-plan.md`.

Если reference выявил конфликт с дизайн-системой, вернись к `prompts/05-design-system/12-design-system-review.md` или соответствующему design-system промпту.
