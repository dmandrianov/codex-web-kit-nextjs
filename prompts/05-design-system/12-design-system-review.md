# Проверить дизайн-систему

## Когда использовать

После approved concept/direction, iconography, tokens, layout, components и accessibility.

## Роль Codex

Ты design systems critic. Здесь уместна строгая проверка: creative concept уже существует, поэтому review не должен заранее душить поиск.

## Цель

Создать `docs/design-system/design-system-review.md` с verdict `Design ready` или `needs fixes`. `Design ready` требует complete stable foundation, но допускает честно обозначенный provisional expressive vocabulary с обязательной calibration после 2–3 live blocks.

## Контекст, который нужно дать

- Все `docs/design-system/*` документы и approved live evidence.
- IA review и project state.
- `prompts/_guidelines/creator-critic-design-workflow.md`.
- Релевантные UI quality, anti-slop, page-rhythm и contemporary sections.

## Что обязательно stable до Design ready

- approved direction и короткий Visual North Star;
- brand/semantic token roles;
- typography roles and readable measure;
- interaction meaning and functional icon strategy;
- Desktop Canvas Contract;
- First-render Responsive Delivery Contract;
- critical component states;
- accessibility, contrast, focus, truth/proof rules;
- no-copy-1:1 and screenshot adaptation rules.

## Что может остаться provisional

- marketing surfaces and decorative tokens;
- pictograms/custom symbols;
- expressive section compositions;
- media treatments, depth and motion accents;
- one-off marketing modules.

Provisional vocabulary не блокирует `Design ready`, если он продолжает approved concept, не нарушает stable foundation и имеет named calibration checkpoint after 2–3 live blocks.

## Ограничения

- Не создавай код или новые page specs.
- Не ставь `Design ready`, если critical semantics/accessibility объявлены provisional.
- Не ставь `Design ready`, если нет live concept evidence, user-approved skip или честного blocker.
- Не требуй заморозить весь marketing vocabulary до первого production block.
- Не разрешай fake proof, copy 1:1, uncontrolled wide stretch или inaccessible expressive treatment.
- Не ставь `Design ready`, если initial responsive geometry зависит от post-mount viewport read или media/font geometry не зарезервирована.

## Процесс

1. Проверь цепочку evidence: project → hypothesis → live concept → user decision → North Star → system docs.
2. Отдельно проверь `Stable foundation`: contradictions, missing semantics, accessibility, responsive safety, states and asset truth.
3. Отдельно проверь `Provisional expressive vocabulary`: связь с approved concept, допустимая freedom и понятный способ проверки.
4. Проверь Desktop Canvas Contract на `1440 / 1920 / 2560 CSS px`; `3840` только для true-4K/full-bleed/ultrawide target или reasoned skip.
5. Проверь First-render Responsive Delivery Contract: CSS-first geometry, SSR/first-client invariant, justified measured exceptions, reserved media geometry, responsive asset sizing и font/loading stability.
6. Проверь concept evidence на mobile / 1440 / 2560. Concept не обязан был проходить отдельный `1920/3840` preflight; системная wide matrix закрывается layout/review.
7. Проверь, что future build использует creator→render→critic: короткий positive brief до build, screenshot critic после render, self-fix по видимым проблемам.
8. Проверь calibration plan: после 2–3 живых marketing-блоков page-level screenshots решают `promote / refine / remove` для provisional vocabulary.
9. Раздели выводы на `must fix now`, `calibrate after live blocks`, `watch later`.
10. Создай review и обнови `docs/project-state.md`. При `Design ready` следующий шаг — Next.js preflight.

## Output

```md
# Design System Review

## Verdict
- Status: Design ready / needs fixes
- Confidence:
- Next prompt:

## Stable foundation
| Area | Result | Blocking issue |
| --- | --- | --- |

## Provisional expressive vocabulary
| Pattern/token | Evidence | Calibration decision later |
| --- | --- | --- |

## Live and canvas evidence
- Concept: mobile / 1440 / 2560
- System matrix: 1440 / 1920 / 2560
- 3840: checked / reasoned skip
- First-frame delivery: passed / blocker

## Must fix now
## Calibrate after 2–3 live blocks
## Watch later
```

## Done when

- Есть ясный verdict.
- Stable brand/semantic/accessibility/responsive foundation complete или blockers названы.
- Provisional expressive vocabulary разрешён без снижения safety и accessibility.
- Calibration after 2–3 live blocks обязательна и имеет конкретный результат `promote / refine / remove`.
- Live concept, no-fake-proof, no-copy-1:1 and browser evidence сохранены.
- Wide matrix проверена по применимости.
- CSS-first initial geometry, hydration invariant и media/font stability проверены; post-mount canvas correction блокирует `Design ready`.
- `docs/project-state.md` обновлён.

## Follow-up

- `Design ready` → `prompts/06-nextjs-setup/01-project-preflight.md`.
- `needs fixes` → один конкретный prompt из `prompts/05-design-system/`, который закрывает blocker.
