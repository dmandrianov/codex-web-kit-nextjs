# Подготовить standalone component для gpt-taste

## Когда использовать

Когда пользователь просит отдельный выразительный marketing component через `gpt-taste`, но у компонента нет page-bound block spec. Для компонента внутри уже спланированной страницы используй `05-block-breakdown.md`.

## Роль Codex

Ты component product designer и scope planner. Ты превращаешь прямой запрос в маленький проверяемый contract, не заставляя пользователя сначала придумывать целую страницу.

## Цель

Создать `docs/components/[component-slug]/component-spec.md`, который явно выбирает `Creator engine: gpt-taste`, mode `component`, фиксирует реальные content/states/use contexts и specimen harness, затем маршрутизирует в dedicated creative build.

## Контекст, который нужно дать

- Запрос пользователя и references/assets.
- `project-brief.md`, strategy/messaging и editorial rules, если существуют.
- Visual North Star, approved screenshots и `docs/design-system/gpt-taste-profile.md`, если существуют.
- Design tokens, component inventory, iconography, accessibility и layout contracts, если существуют.
- Реальный copy/data contract и допустимые content ranges.
- `prompts/_guidelines/gpt-taste-integration.md`.
- `prompts/_templates/gpt-taste-component-spec-template.md`.

## Ограничения

- Не создавай page spec, Nav, Hero, Footer или искусственный landing shell.
- Не пиши production UI на этом шаге.
- Не выдумывай facts, claims, proof, prices, product states или actions.
- Не назначай gpt-taste product/business component автоматически. Для explicit user override сохрани business logic и accessibility как hard gates.
- Не добавляй states «для красоты»: specimen показывает только реальные предусмотренные состояния.
- Не отмечай public content approved без user approval или уже подтверждённого source.
- Не добавляй dependencies и не запускай server.

## Процесс

1. Определи deliverable: один reusable component, а не секция или страница. Если это секция, вернись к page/block planning и mode `block`.
2. Зафиксируй use contexts, content/data ranges, настоящие actions и required states.
3. Зафиксируй content status:
   - `approved` — пользователь дал/утвердил meaning, facts, claims и action;
   - `needs approval` — покажи короткий content contract в этом же spec и остановись до build;
   - `not applicable` — компонент не содержит нового public copy.
4. Явно запиши `Creator engine: gpt-taste`, `Mode: component` и причину. Для product/business component запиши `Explicit user override: yes`; без него используй native component planning.
5. Выполни read-only skill preflight из integration guideline: availability, full read и pinned SHA-256. Не генерируй UI.
6. Перенеси approved profile locks, open RNG choices, Visual North Star и neighbor/use-context evidence.
7. Опиши specimen harness: backgrounds/containers, content ranges, responsive widths, keyboard path, reduced motion и реальные states.
8. Зафиксируй runtime/files и dependency constraints.
9. Создай component spec по шаблону и обнови `docs/project-state.md`.
10. Если content ready и preflight passed, назначь `prompts/08-block-build/00-gpt-taste-creative-build.md`. Иначе запроси одно точное content/skill решение.

## Output

Создай `docs/components/[component-slug]/component-spec.md` по `prompts/_templates/gpt-taste-component-spec-template.md`.

В ответе покажи:

- какой компонент будет создан;
- где он должен использоваться;
- какие content/states считаются реальными;
- что покажет specimen;
- готов ли route к build или что нужно подтвердить.

## Done when

- Deliverable является одним standalone component.
- Creator engine/mode заданы явно.
- Product/business override не выдуман.
- Meaning/facts/claims/actions approved или честно заблокированы.
- Required states и specimen harness определены без page shell.
- Skill preflight пройден или blocker показан до UI.
- Profile locks/open choices и runtime scope записаны.
- Next prompt соответствует readiness.
- `docs/project-state.md` обновлён.

## Follow-up

- Ready → `prompts/08-block-build/00-gpt-taste-creative-build.md`.
- Нужен content approval → обнови этот component spec после решения пользователя.
- Оказалось секцией страницы → `prompts/07-page-planning/05-block-breakdown.md`.
- Нужен native product component → `prompts/05-design-system/10-ui-components.md` или соответствующий page/block spec.
