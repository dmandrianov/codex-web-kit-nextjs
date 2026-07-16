# Быстро реализовать один блок: creator → critic

## Когда использовать

Для `simple` и `medium` блока после готового spec и, если есть новый public copy, утверждённого content preview. Сложный или business-critical блок отправь в `prompts/08-block-build/01-block-build-preflight.md`.

## Роль Codex

Сначала ты creator: собираешь сильный рабочий вариант. После live render ты critic: называешь максимум три главные проблемы, делаешь один связный self-fix и перепроверяешь.

Следуй `prompts/_guidelines/creator-critic-design-workflow.md`. Основной build scope — текущий блок.

## Цель

Реализовать текущий блок, проверить его в live browser и довести одним коротким critic loop без полного checklist до render.

## Контекст, который нужно дать

- current block spec;
- approved meaning, facts, claims, voice и CTA intent;
- Visual North Star и 1–3 approved screenshots;
- relevant tokens, canvas rules, components и iconography;
- реальные assets и 2–4 соседних блока;
- Design context diet: creator handoff из content preview или 4–6 релевантных правил.

Не загружай до render полный UI/copy/anti-slop checklist.

## Ограничения

### Hard gates

- Не выдумывай facts, proof, product states, цены, отзывы или возможности.
- Не ломай accessibility, semantic token roles, настоящий action hierarchy и обязательные brand invariants.
- Сохраняй approved meaning, claims, voice и CTA intent. Exact wording и line breaks можно довести под композицию.
- Не копируй reference 1:1 и не вводи новый icon pack.
- Core responsive geometry должна быть правильной на первом кадре: не выбирай mobile/desktop/wide layout после mount через viewport read, effect или JS scale.

### Scope

- `Product/business`: checkout, dashboard, cart, account, settings, data/forms и business logic остаются one-block strict. Соседей только проверь на regression.
- `Marketing chapter`: смотри 2–4 соседних блока как одну композиционную главу. После full-page eyes-check можно узко исправить spacing, surface continuity внутри semantic tokens, transition, alignment spine или media handoff. Не меняй смысл, claims, CTA intent, states, data или логику соседей.

### Expressive exception

Marketing creator может попробовать один purposeful exception внутри North Star: illustration/texture, typographic composition, media treatment, spatial device/transition или небольшой motion principle.

Он должен выполнять functional, narrative, emotional, brand или atmospheric role и не нарушать hard gates. При необходимости используй один component-scoped named variable/class, не новый global semantic token. Запиши ход как `provisional pattern`; critic решит `keep / revise / remove`.

## Процесс

1. Составь короткий creator brief: outcome, 2–3 positive anchors, real material/focal opportunity, freedom, один canvas invariant и только нужный hard boundary.
2. Реализуй блок и базовые states. Не заполняй pre-render quality table.
3. При необходимости подстрой exact wording/line breaks без изменения approved content contract.
4. До navigation или fresh reload задай viewport. Сравни early frame с post-hydration settled state, затем реально просмотри screenshots:
   - mobile;
   - `1440 CSS px`;
   - wide guard не уже `2560 CSS px`.
5. Запиши фактический `window.innerWidth` только как evidence и сравни с North Star, approved evidence, Desktop Canvas Contract и соседями. Проверь код на viewport-dependent render branch.
6. Для media/measured surface проверь reserved geometry, crop, loading role и responsive source sizing; mobile/1440 не должны получать wide/4K candidate без причины.
7. Как critic, выбери максимум три findings по влиянию: meaning/focal/hierarchy; same-site/chapter rhythm; truth/accessibility/responsive/shippability.
8. Сделай один focused self-fix и повторно просмотри затронутые screenshots.
9. Для marketing chapter только после full-page evidence сделай разрешённую narrow correction, если без неё глава распадается, затем recheck.
10. Выполни доступный lint/type/build/runtime smoke пропорционально риску.
11. Создай короткий build review и обнови `docs/project-state.md`.

Fast lane не требует `1920/3840`, если нет явного риска. Полная `1440 / 1920 / 2560` матрица и применимый `3840` остаются deep/final quality.

## Output

```md
# Fast Block Build: [Block name]

## Scope and result

- Block:
- Scope mode: product/business strict / marketing chapter
- Files changed:
- Implemented:
- Copy/line-break adjustments without meaning change:
- States:

## Creator brief

- Outcome:
- Positive anchors:
- Material / focal opportunity:
- Creative freedom:
- Canvas invariant / hard boundary:

## Screenshots

- Mobile:
- 1440 CSS px:
- Wide >=2560 CSS px:
- Actual widths:
- Approved evidence compared:
- First frame matches settled responsive layout:
- Post-mount canvas correction: none / blocker
- Media reserved geometry / selected resource:

## Critic: top findings

1.
2.
3.

## Fix and recheck

- One focused self-fix:
- Rechecked:
- Result:

## Provisional pattern / chapter correction

- Pattern and role: none / description
- Decision: keep / revise / remove
- Narrow neighbor correction: none / description, reason and files

## Checks, blockers and next step
```

В ответе покажи result, screenshots, top findings, fix/recheck, provisional pattern и blockers. Полный checklist не вставляй.

## Done when

- Current block реализован; product/business neighbor logic не менялась.
- Approved content contract и hard gates сохранены.
- Mobile, 1440 и >=2560 live screenshots реально просмотрены.
- Fresh-load first frame совпадает с responsive intent; hydration/mount не меняет core canvas.
- Media/measured surfaces резервируют место, а responsive candidate соответствует rendered width и loading role.
- Critic назвал максимум три findings; выполнен один focused self-fix и recheck.
- Expressive exception и chapter correction, если были, остаются provisional/узкими и записаны.
- Документация и project state обновлены.

## Follow-up

- Короткий smoke: `prompts/09-quality/00-block-smoke-check.md`.
- Глубокая проблема: `prompts/08-block-build/01-block-build-preflight.md`.
- Следующий смысловой блок без approval: `prompts/07-page-planning/07-block-content-preview.md`.
