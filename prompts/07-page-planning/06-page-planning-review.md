# Проверить готовность страницы к block build

## Когда использовать

После page scope, page spec, reference adaptation, content/SEO plan и block breakdown, перед согласованием первого блока и `08-block-build`.

## Роль Codex

Ты действуешь как senior frontend planner, UX reviewer и implementation risk analyst.

## Цель

Создать `docs/pages/[page-slug]/page-planning-review.md`: финальную проверку, что страницу можно реализовывать по одному блоку без расползания scope.

## Контекст, который нужно дать

- `docs/pages/[page-slug]/page-scope.md`.
- `docs/pages/[page-slug]/page-spec.md`.
- `docs/pages/[page-slug]/content-seo-plan.md`.
- `docs/pages/[page-slug]/block-breakdown.md`.
- `docs/pages/[page-slug]/blocks/*.md`.
- `docs/pages/[page-slug]/references/*.md`, если есть.
- `docs/design-system/design-system-review.md`.
- `docs/design-system/visual-north-star.md`.
- `docs/design-system/iconography.md`.
- `docs/design-system/design-tokens.md`.
- `docs/design-system/layout-rules.md`.
- `prompts/_guidelines/page-composition-rhythm.md`.
- `prompts/_guidelines/creator-critic-design-workflow.md`; UI quality base используй для точечной проверки readiness, не копируй её целиком в specs.
- `prompts/_guidelines/gpt-taste-integration.md` и `docs/design-system/gpt-taste-profile.md`, если хотя бы один spec выбирает этот engine.
- `docs/nextjs/next-ready-review.md`.
- `docs/project-state.md`, если есть.

## Ограничения

- Не реализуй блоки.
- Не переписывай все specs без необходимости.
- Не ставь `Ready for block build`, если нет отдельного block spec для первого блока.
- Не пропускай content/legal/product data gaps.
- Не допускай задачу "сверстать всю страницу".
- Не игнорируй screenshot/reference conflicts with design system.
- Не ставь `Ready for block build`, если block breakdown не объясняет page story, роли блоков и ограничения на повтор визуальных паттернов.
- Не ставь `Ready for block build`, если specs ломают truth, accessibility, semantic token roles или iconography. Один purposeful marketing exception допустим как provisional pattern внутри North Star.
- Не ставь `Ready for block build`, если specs либо слишком жёстко заморозили layout, либо не перенесли Visual North Star, composition freedom и post-build screenshot eyes-check.
- Не ставь `Ready for block build`, если specs игнорируют Desktop Canvas Contract или оставляют wide/full-bleed blocks без canvas role, expansion zone и wide-screen check.
- Не ставь `Ready for block build`, если specs игнорируют First-render Responsive Delivery Contract, допускают post-mount canvas correction или не резервируют media/measured geometry.
- Не ставь `Ready for block build`, если creator engine/mode не задан, `gpt-taste` назначен product/business UI автоматически или выбранный skill/profile preflight заблокирован.

## Процесс

1. Проверь, что page scope, page spec, content/SEO plan и block breakdown существуют.
2. Проверь, что каждый block spec достаточно маленький для одного запуска.
3. Проверь, что первый block spec содержит inputs, files, constraints, states и done when.
4. Проверь, что screenshots/references адаптированы и не требуют копирования.
5. Проверь, что content risks и forbidden claims отмечены.
6. Проверь page story: каждый блок даёт новый смысл, а не повторяет соседний.
7. Проверь visual continuity и pattern budget: блоки остаются одним сайтом, а повтор/разнообразие объясняются задачей, а не квотой.
8. Проверь creator readiness: у блока есть 4–6 релевантных направлений, а не полный pre-render checklist. Полный UI standard должен применяться после live render.
9. Проверь marketing chapters и product/business strict scopes. Узкие corrections соседей разрешены только после full-page eyes-check и не меняют смысл/логику.
10. Проверь Visual North Star, composition freedom и creator → render → critic loop: mobile, 1440 и wide guard, максимум 3 findings, один self-fix.
11. Проверь first-render carryover: CSS-first geometry, hydration invariant, justified measured exceptions, reserved media geometry и responsive source/loading roles.
12. Проверь truth/accessibility/semantic token/iconography hard boundaries и provisional expressive opportunities.
13. Проверь creator routing: native/gpt-taste выбран явно; mode соответствует deliverable; gpt-taste profile locks/open choices перенесены; visual correction route возвращается skill.
14. Проверь, что design system и Next.js foundation готовы.
15. Раздели замечания на `must fix before block build`, `can fix during block build`, `watch later`.
16. Создай или обнови `docs/pages/[page-slug]/page-planning-review.md`.
17. Если готово, обнови `docs/project-state.md`: stage `block-build`, отметь `Page planning reviewed`, `Page composition/rhythm reviewed`, creator route и следующий промпт. Для смыслового блока сначала `07-block-content-preview`; для технического блока без public copy — native fast lane или gpt-taste creative build согласно spec.

## Output

Создай или обнови `docs/pages/[page-slug]/page-planning-review.md` в формате:

```md
# Page Planning Review: [Page name]

## Verdict

- Status: Ready for block build / needs fixes
- Confidence:
- First block:
- Next prompt:
- First content preview:

## Checks

| Check | Result | Notes | Fix prompt |
| --- | --- | --- | --- |

## Must fix before block build

## Can fix during block build

## Watch later

## Page story and rhythm

## Visual North Star and creative freedom

## Post-build eyes-check plan

## Desktop canvas carryover

## First-render responsive carryover

## Hard boundaries and provisional patterns

## Creator readiness and post-render critic plan

## Creator engine routing

## Project state update
```

В ответе кратко покажи:

- verdict;
- первый блок для реализации;
- blockers;
- следующий prompt по router.

## Done when

- Есть явный verdict.
- Первый block spec готов к реализации.
- Для первого смыслового блока выбран `07-block-content-preview`, чтобы пользователь утвердил meaning/facts/claims/voice/action; exact copy, line breaks и layout остаются гибкими до render.
- Страница не будет реализовываться целиком одним промптом.
- Page story, composition roles, visual pattern budget и token/icon constraints проверены.
- Visual North Star перенесён, Codex имеет композиционную свободу, а видимый результат будет проверен по mobile/reference-desktop/wide screenshots после build.
- Desktop Canvas Contract перенесён в page/block specs; uncontrolled stretch на wide desktop не может получить `Ready for block build`.
- First-render Responsive Delivery Contract перенесён в specs; post-mount canvas correction и unreserved critical media не могут получить `Ready for block build`.
- Creator readiness проверена коротко; полный UI quality standard зарезервирован для post-render critic.
- Creator engine/mode соответствуют scope; выбранный gpt-taste preflight/profile не заблокирован.
- Marketing chapter corrections и strict product/business scopes понятны до build.
- Reference screenshots и content risks обработаны.
- Если статус `Ready for block build`, `docs/project-state.md` переведен в `block-build`.

## Follow-up

Если `Ready for block build` и первый блок смысловой, следующий промпт: `prompts/07-page-planning/07-block-content-preview.md`.

Если первый блок технический и не содержит публичного copy, следующий промпт берётся из spec: `00-build-block-fast-lane.md` для native или `00-gpt-taste-creative-build.md` для явно выбранного gpt-taste.

Если `needs fixes`, вернись к одному из промптов:

- `prompts/07-page-planning/01-select-page-and-scope.md`;
- `prompts/07-page-planning/02-page-spec.md`;
- `prompts/07-page-planning/03-adapt-reference-to-block-spec.md`;
- `prompts/07-page-planning/04-content-and-seo-plan.md`;
- `prompts/07-page-planning/05-block-breakdown.md`.
