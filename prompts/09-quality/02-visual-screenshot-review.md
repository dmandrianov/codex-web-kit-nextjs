# Провести строгий visual screenshot review

## Когда использовать

После quality preflight для deep/final визуальной проверки одного блока, узкого UI-scope или marketing chapter. Fast build уже должен был сделать короткий creator/critic loop; здесь работает строгий post-render critic.

## Роль Codex

Ты design QA critic и frontend engineer. Ты оцениваешь существующий live result, находишь максимум три проблемы с самым большим влиянием, исправляешь разрешённый scope и подтверждаешь результат новым screenshot.

Используй `prompts/_guidelines/creator-critic-design-workflow.md`.

## Цель

Проверить не только пиксельные дефекты, но и качество решения: смысл, focal point, hierarchy, same-site continuity, composition, media, responsive, truth, accessibility и shippability. Выход должен быть коротким и доказательным.

## Контекст, который нужно дать

- quality plan и target scope;
- block/page spec, build review и content contract;
- Visual North Star, approved concept/Hero и предыдущие принятые screenshots;
- design tokens, iconography, components и Desktop Canvas Contract;
- live URL и актуальные screenshots;
- 2–4 соседних blocks для marketing chapter;
- `prompts/_knowledge/ui-design-quality.md`;
- `prompts/_knowledge/site-copy-quality.md`, если есть public copy;
- `prompts/_knowledge/contemporary-visual-direction.md`, если есть media/icon/motion/currentness;
- anti-slop и page rhythm guidelines.

## Scope rule

### Product/business UI

Для checkout, account, dashboard, settings, forms/data и business-critical flows исправляй только target block/scope. Соседей проверяй на regression, но не меняй их logic, states, data или action hierarchy.

### Marketing chapter

Можно проверить 2–4 соседних блока как chapter. После full-page eyes-check разрешены только узкие corrections соседей:

- spacing;
- surface continuity внутри semantic tokens;
- transition/divider;
- alignment spine;
- безопасный media crop/handoff.

Не переписывай их смысл, claims, CTA intent или product logic. Все chapter corrections перечисли отдельно.

## Ограничения

- Не меняй утверждённое design direction без отдельного решения пользователя.
- Не выдавай сохранённый, но не просмотренный screenshot за evidence.
- Не называй review успешным при fake proof, unsupported claims, inaccessible action, broken layout или очевидном responsive failure.
- Не лечи слабую композицию случайным decoration или новым списком запретов.
- Не выводи пользователю 30-пунктную таблицу. Полный стандарт применяется critic внутренне; наружу выходят максимум три главных findings и evidence.
- Не делай бесконечный polish. Один focused fix pass, затем recheck. Глубокую проблему отправь в конкретный build prompt.
- Не удаляй purposeful expressive pattern только потому, что он новый. Проверь его роль и связь с North Star.

## Процесс

### 1. Evidence

1. Открой актуальный live target в браузере.
2. Для deep/final visible UI проверь CSS viewport matrix:
   - mobile и применимый tablet;
   - `1440 CSS px` reference desktop;
   - `1920 CSS px` intermediate;
   - `2560 CSS px` wide;
   - `3840 CSS px` для true-4K/full-bleed/ultrawide target или запиши reasoned skip.
3. Запиши фактический `window.innerWidth`. OS scaling и физическое разрешение не заменяют CSS evidence.
4. Для marketing chapter получи full-page/context screenshots, а не только tight crop блока.

### 2. Full internal critic

5. Сравни live result с Visual North Star, approved evidence, Desktop Canvas Contract и соседями.
6. Внутренне пройди релевантный полный UI quality standard:
   - shippable scope и truth/proof;
   - focal point, hierarchy, de-emphasis и action hierarchy;
   - layout, grouping, spacing, type, contrast и color independence;
   - fixed/fluid widths и wide behavior;
   - media, containers, depth, controls, forms, tables и states;
   - accessibility, edge cases и realistic content;
   - mobile hierarchy и chapter continuity.
7. Если есть public copy, проверь approved meaning/facts/claims/voice/action. Exact wording и line breaks могут отличаться, если смысл не изменился и render стал лучше.
8. Если есть media/icon/motion, проверь visual event, честность material, system consistency и currentness.
9. Проверь anti-slop по ролям: каждый заметный приём должен быть functional, narrative, emotional, brand или atmospheric, а не generic autopilot.
10. Проверь provisional expressive pattern и выбери `keep`, `revise`, `remove` или `candidate to promote`.

### 3. Prioritize and fix

11. Из всех наблюдений выбери максимум три findings с самым большим влиянием. Не заполняй таблицу всеми `pass`.
12. Для каждой находки дай screenshot evidence, влияние и конкретный fix.
13. Сделай один focused fix pass внутри scope.
14. Для marketing chapter допускается одна узкая chapter correction после full-page evidence.
15. Пересними затронутые viewports и подтверди, что проблема закрыта и не появилась regression.
16. Если fix требует новой концепции, новых facts/assets или расширения product logic, не маскируй это косметикой: запиши blocker и owner prompt.
17. Создай или обнови visual-review artifact и `docs/project-state.md`.

## Output

```md
# Visual Review: [Scope]

## Verdict

- Status: passed / fixed and passed / blocked / needs deeper build
- Scope:
- Same-site / chapter verdict:
- Strongest part worth preserving:

## Screenshots reviewed

- Mobile:
- 1440 CSS px:
- 1920 CSS px:
- 2560 CSS px:
- 3840 CSS px / reasoned skip:
- Actual CSS viewport widths:
- Approved evidence compared:

## Top findings

1. **[Finding or none]**
   - Evidence:
   - Impact:
   - Fix:
2. **[Finding or none]**
   - Evidence:
   - Impact:
   - Fix:
3. **[Finding or none]**
   - Evidence:
   - Impact:
   - Fix:

## Fix and recheck

- One focused fix pass:
- Files changed:
- Viewports rechecked:
- Result:
- Regression check:

## Provisional expressive pattern

- Pattern: none / description
- Role: functional / narrative / emotional / brand / atmospheric
- Decision: keep / revise / remove / candidate to promote
- Design-system follow-up:

## Chapter corrections

- None / correction, reason, affected neighbor and files

## Hard gates

- Truth/proof:
- Accessibility/action:
- Semantic tokens/iconography:
- Responsive/canvas:
- Shippable scope:

## Blockers and owner

- Blocker:
- Owner prompt:
```

В ответе покажи screenshots, verdict, максимум три findings, fix/recheck и blockers. Полный checklist не копируй.

## Done when

- Актуальный render реально просмотрен, а не только сохранён.
- Для deep/final visible UI проверены mobile, `1440 / 1920 / 2560 CSS px`; применимый `3840` проверен или имеет reasoned skip.
- Полный релевантный UI/copy/contemporary standard применён внутренне.
- Наружу вынесены максимум три главные findings с evidence.
- Выполнен один focused fix pass и screenshot recheck либо указан настоящий blocker.
- Truth/proof, accessibility, semantic tokens и shippable scope проходят hard gates.
- Purposeful expressive pattern оценён по роли, а не запрещён автоматически.
- Product/business neighbor logic не менялась.
- Marketing chapter corrections, если были, узкие и задокументированы.
- Visual review artifact и project state обновлены.

## Follow-up

Следующий prompt: `prompts/09-quality/03-accessibility-and-usability-check.md`.

Если проблема требует глубокой переделки, вернись к соответствующему prompt из `prompts/08-block-build/`.
