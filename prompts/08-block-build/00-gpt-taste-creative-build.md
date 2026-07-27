# Реализовать блок или компонент через оригинальный gpt-taste

## Когда использовать

После готового page-bound block spec или standalone `docs/components/[slug]/component-spec.md` и public content со status `approved / not applicable`, если в spec явно записано:

```md
- Creator engine: gpt-taste
- gpt-taste mode: block / component
```

Для целой страницы используй `prompts/05-design-system/03-design-concept-prototypes.md` в mode `page`. Для native creator используй `prompts/08-block-build/00-build-block-fast-lane.md`.

## Роль Codex

Ты orchestration layer. Оригинальный `$gpt-taste` владеет визуальным creator pass; Prompt Kit удерживает scope, project continuity, факты, доступность и техническую проверку.

## Цель

Создать один выразительный marketing block или standalone component без изменения upstream `SKILL.md`, показать live render, вернуть visual findings тому же skill и довести результат одним focused loop.

## Контекст, который нужно дать

- `prompts/_guidelines/gpt-taste-integration.md`.
- Полностью прочитанный установленный `gpt-taste/SKILL.md`.
- Current block spec или standalone component spec и approved content contract.
- `docs/design-system/gpt-taste-profile.md`, если есть.
- Visual North Star, approved screenshots/live concept и реальные assets.
- Для block: 2–4 соседних блока и их смысловые роли.
- Для component: use contexts, content ranges, states и specimen harness requirements.
- Desktop Canvas Contract и First-render Responsive Delivery Contract.

## Ограничения

- Не сокращай и не переписывай upstream skill.
- Не запускай работу при missing/mismatched skill identity.
- Не создавай page shell, Nav, Hero, Footer или новый оффер для block/component scope.
- Не выдумывай facts, proof, claims, prices, product states или actions.
- Не меняй approved business logic, action/status semantics и accessibility.
- Не reroll locked choices из approved gpt-taste profile.
- Не исправляй visual findings обычным base creator: отправляй их обратно `$gpt-taste`.

## Процесс

1. Выполни preflight из `gpt-taste-integration.md`: availability, full read, commit/source context и SHA-256.
2. Проверь mode:
   - `block` — один visible marketing/editorial section;
   - `component` — один reusable expressive component и specimen harness.
3. Если mode или creator engine не записан в spec, не угадывай:
   - page-bound block/component → `07-page-planning/05-block-breakdown.md`;
   - standalone component → `07-page-planning/00-gpt-taste-component-spec.md`.
4. Собери `gpt-taste invocation` handoff: deliverable, in/out scope, approved content, locked/open profile choices, assets, neighbors/states, hard gates и runtime.
5. Явно вызови `$gpt-taste`. Сохрани его обязательный `design_plan` перед кодом.
6. Реализуй результат:
   - production files, если build уже утверждён и runtime готов;
   - `design-lab/gpt-taste/blocks/[slug]/` для disposable block spike;
   - `design-lab/gpt-taste/components/[slug]/` для component specimen.
7. Для component покажи предусмотренные default/hover/focus/active/expanded/disabled/loading/error states только по реальному contract; не выдумывай продуктовые states.
8. Открой live render. До fresh navigation задай viewport и осмотри:
   - mobile;
   - `1440 CSS px`;
   - wide не уже `2560 CSS px`;
   - все required component states.
9. Проверь fresh first frame против settled state, reserved media geometry, selected resource, keyboard/focus и reduced motion.
10. Base critic формулирует максимум три visual findings по screenshots.
11. Передай findings и evidence обратно `$gpt-taste`. Получи visual correction от skill, примени её и повторно осмотри render.
12. Технические hard-gate failures исправляй прямо только когда это не меняет visual concept; иначе включи их в следующий skill pass.
13. Зафиксируй result и обнови:
   - block/component build review;
   - `gpt-taste-profile-run-candidate.md` рядом с lab/build review: proposed `Used/Available/Open` delta и новые provisional choices;
   - `docs/project-state.md`.
14. Не изменяй canonical `docs/design-system/gpt-taste-profile.md` до user approval. Не переводить provisional choice в locked без approval/calibration evidence.

## Output

```md
# gpt-taste Creative Build: [name]

## Route

- Creator engine: gpt-taste
- Mode: block / component
- Upstream checksum:
- Profile:
- Deliverable:
- Scope:

## Original design plan

[design_plan from $gpt-taste]

## Live evidence

- Preview:
- Mobile:
- 1440 CSS px:
- Wide >=2560 CSS px:
- Component states:
- First frame / settled:
- Reduced motion:

## Base critic

1.
2.
3.

## gpt-taste correction and recheck

- Findings returned to skill:
- Correction:
- Rechecked:
- Remaining risk:

## Profile memory

- Locked choices preserved:
- Architecture used:
- Available choices:
- Provisional choice:
- Profile delta candidate:

## Files, checks and next step
```

В ответе покажи результат, live evidence, что заметил critic, что исправил `$gpt-taste`, и нужен ли выбор пользователя. Не публикуй внутренний длинный prompt.

## Done when

- Creator engine и mode заданы spec.
- Оригинальный skill полностью прочитан, checksum совпал и `design_plan` сохранён.
- Создан ровно block или component, без фиктивной страницы вокруг.
- Approved content, profile locks и hard gates сохранены.
- Mobile, `1440`, wide и required states просмотрены live.
- Visual findings возвращены `$gpt-taste`, после correction выполнен recheck.
- Создан run candidate; approved profile не изменён до user approval; project state обновлён.

## Follow-up

- Если пользователь одобрил result/profile delta: `prompts/08-block-build/07-approve-gpt-taste-profile.md`.
- Короткий smoke: `prompts/09-quality/00-block-smoke-check.md`.
- Page-bound content не утверждён: `prompts/07-page-planning/07-block-content-preview.md`.
- Standalone component spec/content не готов: `prompts/07-page-planning/00-gpt-taste-component-spec.md`.
- Page-bound route/spec неверен: `prompts/07-page-planning/05-block-breakdown.md`.
- Deep technical risk после build: `prompts/09-quality/01-quality-preflight.md`.
