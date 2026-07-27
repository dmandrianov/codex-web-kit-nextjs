# Провести preflight перед реализацией блока

## Когда использовать

Когда блок сложный, критичный или fast lane не подходит. Для обычных simple/medium блоков по умолчанию используй `prompts/08-block-build/00-build-block-fast-lane.md`.

## Роль Codex

Ты действуешь как senior frontend engineer и scope guard, который защищает проект от расползания реализации.

## Цель

Создать `docs/pages/[page-slug]/blocks/[block-slug]-build-plan.md`: deep-mode план реализации ровно одного сложного блока, где проверены block spec, файлы, design system, reference adaptation, риски и границы изменений.

## Контекст, который нужно дать

- `docs/pages/[page-slug]/page-spec.md`.
- `docs/pages/[page-slug]/content-seo-plan.md`.
- `docs/pages/[page-slug]/block-breakdown.md`.
- `docs/pages/[page-slug]/blocks/[block-slug].md`.
- `docs/pages/[page-slug]/blocks/[block-slug]-content-preview.md`, если блок содержит публичный текст.
- `docs/pages/[page-slug]/references/[block-slug]-reference-adaptation.md`, если есть.
- `docs/design-system/design-tokens.md`.
- `docs/design-system/iconography.md`.
- `docs/design-system/layout-rules.md`.
- `docs/design-system/component-inventory.md`.
- `docs/design-system/accessibility.md`.
- 4–6 relevant quality rules, выбранных по creator/critic workflow; полный UI standard остаётся quality-stage input.
- `prompts/_guidelines/creator-critic-design-workflow.md`.
- `prompts/_guidelines/gpt-taste-integration.md` и approved profile, если spec выбирает этот engine.
- `docs/nextjs/app-router-structure.md`.
- Текущие файлы страницы, соседние секции и существующие компоненты.

## Ограничения

- Не пиши код в этом промпте.
- Не используй deep preflight для обычного блока без причины: сначала оцени, достаточно ли fast lane.
- Не выбирай несколько primary build scopes. Для marketing можно посмотреть 2–4 соседних блока как chapter; product/business logic остаётся one-block strict.
- Не меняй page spec, если проблема решается уточнением build plan.
- Не начинай deep-mode реализацию смыслового блока, если пользователь не утвердил meaning, facts, claims, voice и CTA intent через content preview. Exact copy, line breaks и layout остаются гибкими до render.
- Не добавляй зависимости.
- Не соглашайся на реализацию всей страницы одним заходом, если пользователь явно не подтвердил исключение и риск качества.
- Если block spec не готов, вернись в `prompts/07-page-planning/05-block-breakdown.md` или `prompts/07-page-planning/06-page-planning-review.md`.
- Не теряй creator engine во время deep planning. Explicit gpt-taste остаётся visual creator; native passes не должны незаметно перепроектировать его результат.

## Процесс

1. Проверь, что выбран ровно один block spec.
2. Проверь, что block spec содержит цель, user question, scope, content, design constraints, files, states и done when.
3. Зафиксируй `Creator engine` и mode из spec, затем определи сложность блока: `simple`, `medium`, `complex`.
4. Составь границы изменений. Для product/business UI защити соседей полностью. Для marketing chapter разреши только post-render narrow corrections: spacing/surface/transition/alignment/media handoff без изменения смысла и логики.
5. Сопоставь block spec с existing components и design tokens.
6. Собери creator brief из 4–6 релевантных направлений и отдельно перечисли риски, которые critic проверит после render. Не переписывай полный UI checklist в preflight.
7. Отметь permissible purposeful expressive exception для marketing scope или `not applicable`; truth, accessibility и semantic tokens остаются hard boundaries.
8. Если есть reference adaptation, выпиши `preserve`, `adapt`, `forbidden-to-copy`.
9. Определи, какие проходы нужны: structure, styling, responsive, interaction/states, review. Для gpt-taste это technical/quality responsibilities вокруг его creator build, а не замена engine.
10. Если нет утверждённого content preview для смыслового блока, остановись и предложи `prompts/07-page-planning/07-block-content-preview.md`.
11. Создай или обнови `docs/pages/[page-slug]/blocks/[block-slug]-build-plan.md`.
12. Выбери next prompt:
    - native complex → `02-build-block-structure.md`;
    - native simple/medium → `00-build-block-fast-lane.md`;
    - gpt-taste block/component → `00-gpt-taste-creative-build.md`.
13. Обнови `docs/project-state.md`: отметь `Current block preflight done`, creator engine/mode и следующий промпт.

## Output

Создай или обнови `docs/pages/[page-slug]/blocks/[block-slug]-build-plan.md` в формате:

```md
# Block Build Plan: [Block name]

## Verdict

- Status: ready / needs spec fixes
- Complexity: simple / medium / complex
- Creator engine: native / gpt-taste
- gpt-taste mode: block / component / not applicable
- Next prompt:

## Scope

### Allowed changes

### Protected files/sections

## Source specs

| Artifact | Path | Status | Notes |
| --- | --- | --- | --- |

## Component and token mapping

## Creator brief (4-6 directions)

## Post-render critic risks

## Purposeful expressive exception

## Reference adaptation summary

## Implementation passes

| Pass | Needed | Notes |
| --- | --- | --- |

## Risks and open questions
```

В ответе кратко покажи:

- выбранный блок;
- сложность;
- какие файлы можно менять;
- какие проходы нужны;
- следующий prompt по router.

## Done when

- Выбран один primary build scope; marketing chapter context не расширяет product/business logic scope.
- Границы изменений понятны.
- Product/business соседи защищены; marketing chapter correction scope явно ограничен.
- Сложность блока оценена.
- Creator engine сохранён; deep plan не превращает gpt-taste result в native redesign.
- Creator не загружен полным checklist; post-render critic risks понятны.
- Понятно, каким следующим проходом реализовывать блок.
- `docs/project-state.md` обновлен.

## Follow-up

Если deep mode подтверждён:

- native → `prompts/08-block-build/02-build-block-structure.md`;
- gpt-taste block/component → `prompts/08-block-build/00-gpt-taste-creative-build.md`, а deep plan задаёт последующие technical/quality checks.

Если после preflight стало понятно, что блок обычный и рисков нет, используй route из spec: native fast lane или gpt-taste creative build.

Если preflight выявил проблемы в spec, вернись к `prompts/07-page-planning/05-block-breakdown.md` или `prompts/07-page-planning/06-page-planning-review.md`.
