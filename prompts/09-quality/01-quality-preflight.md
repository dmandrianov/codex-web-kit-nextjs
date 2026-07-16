# Провести quality preflight

## Когда использовать

Когда блоку нужен deep quality flow после build review или fast smoke выявил риск. Для обычного блока по умолчанию используй `prompts/09-quality/00-block-smoke-check.md`.

## Роль Codex

Ты действуешь как QA lead и scope guard для одного блока или узкого UI-scope.

## Цель

Создать `docs/pages/[page-slug]/blocks/[block-slug]-quality-plan.md`: deep quality plan для текущего блока с URL, viewport, командами, критериями и границами исправлений.

## Контекст, который нужно дать

- Block build review.
- Block spec.
- Page spec.
- Design system docs.
- `docs/nextjs/tooling.md`.
- `package.json`.
- Список изменённых файлов.
- URL локального сервера или инструкции запуска.
- `prompts/_knowledge/ui-design-quality.md`.
- `prompts/_knowledge/site-copy-quality.md`, если quality scope содержит user-facing copy.
- `prompts/_guidelines/creator-critic-design-workflow.md`.
- Обязательные viewport и сценарии.

## Ограничения

- Не исправляй код в этом промпте.
- Не запускай deep quality flow для обычного блока без причины.
- Не расширяй scope на всю страницу без причины. Допустим marketing chapter из 2–4 блоков; product/business logic остаётся one-block strict.
- Не запускай проверки без понимания команд и package manager.
- Не игнорируй отсутствие dev server или URL: зафиксируй blocker.
- Если block review не `Block ready`, вернись в `prompts/08-block-build/06-block-build-review.md`.
- Не считай quality plan полным без Site copy criteria, если блок содержит headings, CTA, labels, errors, empty/success/loading states, product text, checkout microcopy, metadata или SEO snippets.

## Процесс

1. Определи scope mode: product/business one-block strict или marketing chapter 2–4 blocks; перечисли route и changed files.
2. Проверь, какие quality checks нужны: visual/UI quality, accessibility/usability, technical, browser runtime.
3. Для visible UI зафиксируй mobile/tablet и desktop matrix. `1440x900 / 1920x1080 / 2560x1440 CSS px` обязательны для deep visual review; `3840x2160 CSS px` обязателен для true-4K/full-bleed/ultrawide target или имеет явный reasoned skip.
4. Зафиксируй UI quality criteria для visual review: shippable scope, hierarchy, de-emphasis, main/action hierarchy, spacing/grouping, fixed/fluid widths, Desktop Canvas Contract, First-render Responsive Delivery Contract, typography/font readiness, contrast/color independence, media treatment, cards/containers, controls/forms/tables, states, edge polish, responsive and closest before/after example to compare against.
5. Зафиксируй Site copy criteria, если блок содержит user-facing copy: claims, CTA, labels, form errors, empty/success/loading states, product/checkout text, metadata snippets and text density.
6. Определи команды: dev, lint, typecheck, build, tests, если есть.
7. Определи URL или способ запуска.
8. Зафиксируй, что можно исправлять. Для marketing neighbors допустимы только post-render spacing/surface/transition/alignment/media-handoff corrections; смысл/claims/logic остаются protected.
9. Создай или обнови `docs/pages/[page-slug]/blocks/[block-slug]-quality-plan.md`.
10. Обнови `docs/project-state.md`: отметь `Quality preflight done` и укажи следующий промпт.

## Output

Создай или обнови `docs/pages/[page-slug]/blocks/[block-slug]-quality-plan.md` в формате:

```md
# Quality Plan: [Block name]

## Scope

- Page:
- Route:
- Block:
- Changed files:

## Checks to run

| Check | Needed | Command/tool | Notes |
| --- | --- | --- | --- |

## Viewports

| CSS viewport | Required | Why / skip reason | Evidence |
| --- | --- | --- | --- |
| Mobile | yes | | |
| 1440x900 | yes | reference desktop | |
| 1920x1080 | yes | interpolation | |
| 2560x1440 | yes | wide guard | |
| 3840x2160 | yes / reasoned skip | true 4K / full-bleed guard | |

## Desktop canvas criteria

- Stable invariants:
- Allowed expansion zones:
- Failure signs:
- Actual CSS viewport source:

## First-render delivery criteria

- Viewport set before navigation/fresh reload:
- Early frame compared with settled state:
- SSR / first client render invariant:
- Viewport-dependent render branch check:
- Reserved geometry for media/measured surfaces:
- Responsive media resource/loading evidence:
- Font/loading shift evidence:

## UI quality criteria

- Closest before/after example to use:

## Site copy criteria

- User-facing copy present:
- `prompts/_knowledge/site-copy-quality.md` required:
- Checks to include:

## Runtime URL

## Allowed fixes

## Protected meaning / business logic and chapter correction scope

## Out of scope

## Blockers

## Next prompt
```

В ответе кратко покажи:

- quality scope;
- checks to run;
- URL/commands;
- blockers;
- следующий prompt по router.

## Done when

- Scope проверки ясен.
- UI quality criteria для visual review зафиксированы, если блок затрагивает интерфейс, включая closest before/after example для спорного/слабого UI.
- Для visible UI matrix содержит reference and wide CSS viewports; wide desktop не оставлен под условным `если нужно`.
- Plan требует fresh-load first-frame evidence, hydration/canvas stability и проверку responsive media/font delivery.
- Site copy criteria зафиксированы, если блок содержит пользовательский текст.
- Команды и URL понятны или blockers зафиксированы.
- Известно, какие исправления разрешены.
- Проблемы вне текущего блока защищены от случайной правки.
- Marketing chapter и product/business strict scope различены.
- `docs/project-state.md` обновлен.

## Follow-up

Если deep quality нужен, следующий промпт: `prompts/09-quality/02-visual-screenshot-review.md`.

Если достаточно smoke-check, используй `prompts/09-quality/00-block-smoke-check.md`.

Если quality plan не может быть составлен, вернись к `prompts/08-block-build/06-block-build-review.md` или tooling setup.
