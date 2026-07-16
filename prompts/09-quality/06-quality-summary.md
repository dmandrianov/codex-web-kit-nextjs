# Составить quality summary

## Когда использовать

После quality preflight, visual review, accessibility/usability check, technical checks и browser runtime verification.

## Роль Codex

Ты действуешь как QA lead, frontend reviewer и handoff gatekeeper.

## Цель

Создать `docs/pages/[page-slug]/blocks/[block-slug]-quality-summary.md`: финальный verdict по текущему блоку `Quality passed` или `needs fixes`, с понятным следующим шагом.

## Контекст, который нужно дать

- Quality plan.
- Visual review.
- Accessibility/usability check.
- Technical checks.
- Browser runtime verification.
- Block build review.
- Block spec.
- `prompts/_knowledge/site-copy-quality.md`, если блок содержит user-facing copy.
- `prompts/_knowledge/ui-design-quality.md`.
- `docs/project-state.md`, если есть.

## Ограничения

- Не исправляй код в этом промпте, кроме очень мелких документационных уточнений.
- Не скрывай failed checks.
- Не объявляй `Quality passed`, если есть P0/P1 проблемы текущего блока.
- Не объявляй `Quality passed`, если responsive canvas исправляется после mount, есть relevant hydration mismatch/layout snap или critical media/font geometry не зарезервирована.
- Не смешивай проблемы текущего блока с backlog по другим блокам.
- Не переходи к следующему block spec, если текущий блок требует fixes.

## Процесс

1. Собери результаты всех quality docs.
2. Проверь, что visual/UI quality findings закрыты или имеют owner prompt: hierarchy, de-emphasis, main action, spacing, typography, contrast, media treatment, cards/containers, controls/forms/tables, states, edge polish, responsive и Desktop Canvas Contract.
3. Проверь browser evidence First-render Responsive Delivery Contract: fresh-load early/settled comparison, hydration, viewport branch, media candidate/reserved geometry и font/loading stability.
4. Проверь, что Site copy findings закрыты или имеют owner prompt, если блок содержит user-facing copy: claims, CTA, labels, errors, empty/success states, product/checkout text, metadata snippets.
5. Раздели найденные проблемы на `P0`, `P1`, `P2`, `follow-up`.
6. Определи verdict: `Quality passed` или `needs fixes`.
7. Если нужны fixes, укажи точный prompt: quality prompt или `08-block-build` prompt.
8. Если quality passed, определи следующий block spec или handoff prompt.
9. Создай или обнови `docs/pages/[page-slug]/blocks/[block-slug]-quality-summary.md`.
10. Обнови `docs/project-state.md`: отметь `Quality checks passed`, если verdict passed, и укажи следующий prompt.

## Output

Создай или обнови `docs/pages/[page-slug]/blocks/[block-slug]-quality-summary.md` в формате:

```md
# Quality Summary: [Block name]

## Verdict

- Status: Quality passed / needs fixes
- Confidence:
- Next prompt:

## Results

| Check | Result | Notes |
| --- | --- | --- |

## Issues

| Priority | Issue | Owner prompt | Notes |
| --- | --- | --- | --- |

## Out-of-scope follow-ups

## Next block or handoff

## Project state update
```

В ответе кратко покажи:

- verdict;
- failed checks, если есть;
- prompt для fixes или следующий block spec;
- обновление project-state.

## Done when

- Есть финальный verdict.
- Visual/UI quality findings закрыты или имеют owner prompt.
- `Quality passed` не выдан, если wide-screen matrix показывает uncontrolled stretch или обязательные canvas screenshots не просмотрены.
- `Quality passed` не выдан без fresh-load first-frame evidence или при post-mount canvas correction, relevant hydration warning, unreserved critical media/font shift либо неверном responsive asset candidate.
- Все failed checks имеют owner prompt.
- Out-of-scope issues не смешаны с текущим блоком.
- Если `Quality passed`, можно переходить к следующему block spec или handoff.
- `docs/project-state.md` обновлен.

## Follow-up

Если `Quality passed`, следующий промпт: следующий block spec через `prompts/08-block-build/00-build-block-fast-lane.md` или `prompts/10-handoff/01-handoff-scope.md`, если работу нужно сдать или завершить итерацию.

Если `needs fixes`, вернись к одному из промптов:

- `prompts/08-block-build/02-build-block-structure.md`;
- `prompts/08-block-build/03-style-block-from-design-system.md`;
- `prompts/08-block-build/04-responsive-pass.md`;
- `prompts/08-block-build/05-interaction-and-states-pass.md`;
- `prompts/09-quality/02-visual-screenshot-review.md`;
- `prompts/09-quality/03-accessibility-and-usability-check.md`;
- `prompts/09-quality/04-technical-checks.md`;
- `prompts/09-quality/05-browser-runtime-verification.md`.
