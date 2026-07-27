# Интеграция оригинального gpt-taste в Prompt Kit

Этот документ задаёт внешнюю рамку для оригинального `gpt-taste`. Он не пересказывает, не сокращает и не заменяет `SKILL.md`: Codex каждый раз читает скилл полностью и явно вызывает `$gpt-taste`, когда маршрутизатор выбрал этот creator engine.

## Канонический источник

- Repository: `Leonxlnx/taste-skill`
- Path: `skills/gpt-tasteskill/SKILL.md`
- Pinned commit: `e988add20dab0fa97d7a76781c48961c8184288e`
- Expected SHA-256: `2e64c269953f2656c21bf5a0fa6b4568e82fe0c72b36e8f84758e090349966a5`
- License: MIT

Prompt Kit хранит только ссылку, commit и checksum. Не копируй `SKILL.md` внутрь release payload и не редактируй установленный upstream-файл ради совместимости с базой.

## Preflight

До UI-работы:

1. Найди доступный skill с именем `gpt-taste`.
2. Прочитай его `SKILL.md` полностью.
3. Вычисли SHA-256 и сравни с ожидаемым значением.
4. Проверь `docs/design-system/gpt-taste-profile.md`, если он уже существует.
5. Зафиксируй выбранный mode и scope в active brief/spec.

Если skill отсутствует или checksum отличается:

- остановись до генерации UI;
- покажи expected и actual identity без вывода чувствительных данных;
- предложи установить или обновить каноническую версию;
- не подменяй выбранный `gpt-taste` обычным creator pass молча.

## Явная маршрутизация

Не полагайся на неявное совпадение description. Prompt Kit явно вызывает `$gpt-taste` только если active hypothesis, page spec или block spec содержит:

```md
- Creator engine: gpt-taste
- gpt-taste mode: page / block / component
```

По умолчанию используй `Creator engine: native`.

Автоматически предлагать или выбирать `gpt-taste` можно для выразительного marketing, campaign, editorial, portfolio или showcase UI, когда нужен новый визуальный принцип. Не вызывай его автоматически для:

- dashboard, account, settings, admin, checkout, cart, forms, data tables и другого product/business UI;
- локальной технической правки без новой композиции;
- copy-only, research, IA, SEO, deployment, maintenance и обычного quality audit;
- существующего approved UI, если задача не просит заметный redesign.

Явная просьба пользователя использовать `$gpt-taste` может переопределить эти defaults, но не truth, permissions, accessibility, security и business-logic scope.

## Три режима

### `page`

Используй для нового visual concept или цельной выразительной landing/campaign/portfolio page.

- Deliverable — целая страница.
- Оригинальные page-level требования скилла применяются полностью.
- На concept stage результат disposable и живёт в `design-lab/gpt-taste/page/`, а не в production `src/`.
- Первый проход может использовать полный RNG скилла для незакреплённых решений.

### `block`

Используй для одного самостоятельного visible marketing/editorial блока внутри уже определённой страницы.

- Deliverable — ровно текущий блок; для ритма можно смотреть 2–4 соседних блока как visual evidence.
- Загрузи оригинальный skill полностью и применяй все его правила, относящиеся к элементам внутри текущего scope.
- Page-only clauses не разрешают создавать фиктивные Nav, Hero, Footer, полный AIDA-лендинг или новый контент вне block spec.
- Не добавляй отсутствующие claims, proof или CTA ради искусственного block-level AIDA. Сохраняй утверждённую смысловую роль блока.
- Disposable spike, если он нужен, живёт в `design-lab/gpt-taste/blocks/[slug]/`.

### `component`

Используй для отдельного выразительного marketing-компонента: card system, horizontal accordion, carousel, marquee, media object, interactive comparison или другого самостоятельного visual object.

- Deliverable — один reusable component и его specimen harness.
- Harness показывает реальные предусмотренные states, content ranges и responsive behavior, но не притворяется полноценной страницей.
- Page-only clauses не требуют Nav, Hero, Footer или AIDA shell.
- Product/business component автоматически остаётся на native engine, если пользователь явно не выбрал `$gpt-taste`.
- Disposable specimen живёт в `design-lab/gpt-taste/components/[slug]/`.

Scope определяет предмет работы, а не сокращает содержимое скилла. Сначала прочитай весь upstream `SKILL.md`, затем передай ему выбранный deliverable и project context.

## Внешние hard gates

Эти границы не являются визуальной правкой скилла:

- только подтверждённые facts, claims, prices, proof, product states и actions;
- accessibility, keyboard/focus/reduced-motion и semantic action/status meaning;
- permissions, secrets, security и разрешённый filesystem/external-action scope;
- утверждённый content contract и business logic;
- CSS-first initial responsive geometry, reserved media geometry и отсутствие post-mount canvas correction.

Если hard gate конфликтует с декоративным решением, сохрани gate и верни визуальную задачу `$gpt-taste` для нового решения.

## Project continuity profile

После первого утверждённого `gpt-taste` page concept создай `docs/design-system/gpt-taste-profile.md` по шаблону `prompts/_templates/gpt-taste-profile-template.md`.

Профиль делит решения на:

- `locked`: уже утверждённые type/color/radius/surface/action semantics, motion family, accessibility и project seed;
- `available`: ещё не использованные архитектуры и допустимые варианты;
- `used`: уже применённые component/layout/motion architectures;
- `open`: решения, которые можно рандомизировать в текущем scope.

Approved profile — это project context более высокого приоритета, а не модификация upstream skill. На первом page concept RNG может выбирать всё незакреплённое. В последующих block/component runs:

- не reroll locked choices;
- если original skill требует Python RNG для категории, включи locked value в одноэлементный candidate pool и всё равно выполни механизм; для open category передай полный допустимый pool;
- не менять stable identity молча;
- рандомизировать только `open` composition, architecture, media treatment и motion choices;
- учитывать соседние блоки и не повторять одну архитектуру механически;
- после принятого результата обновлять `used`, а новые stable choices переводить в `locked` только после явного approval или calibration.

Каждый block/component run создаёт только `profile run candidate` и не меняет canonical profile до принятия результата. После того как пользователь увидел и одобрил live result, `prompts/08-block-build/07-approve-gpt-taste-profile.md` создаёт первый profile или применяет evidence-backed delta к существующему; rejected run не загрязняет `Used/Available/Open`.

## Creator handoff

Перед явным вызовом `$gpt-taste` передай:

```md
## gpt-taste invocation
- Creator engine: gpt-taste
- Mode: page / block / component
- Deliverable:
- In scope:
- Out of scope:
- Approved meaning, facts, claims and CTA intent:
- Visual North Star and approved screenshots:
- gpt-taste profile:
- Locked profile choices:
- Open RNG choices:
- Real assets / missing assets:
- Neighbor evidence:
- Required states:
- Hard gates:
- Runtime and files:
```

Не заменяй оригинальный обязательный `design_plan`: дай skill сформировать его в своём формате перед кодом.

## Creator → render → critic

1. Выполни preflight и собери короткий handoff.
2. Явно вызови `$gpt-taste` и дай ему владеть visual creator pass.
3. Реализуй выданный `design_plan` в выбранном scope.
4. Открой live render и проверь mobile, `1440 CSS px` и wide не уже `2560 CSS px`; для component добавь предусмотренные states.
5. Base critic называет максимум три главных visual findings.
6. Любое исправление composition, typography, surface, rhythm, media treatment или motion верни `$gpt-taste` вместе со screenshot evidence. Не перепроектируй его результат обычным base creator.
7. Base может прямо исправить только truth, accessibility, security, runtime и responsive-delivery failure, если исправление не меняет визуальную концепцию. Если меняет — снова вызови `$gpt-taste`.
8. Повторно отрисуй, осмотри и зафиксируй outcome.

## Runtime и зависимости

- Сначала переиспользуй существующий runtime проекта или disposable lab.
- Не создавай второй dev server, если этот проект уже запущен и отвечает.
- Перед новым server следуй project server rules.
- Не добавляй React, Tailwind, GSAP или другие dependencies без проверки текущего проекта и разрешения, когда установка меняет dependency surface.
- В disposable lab не переноси код в production автоматически. Production implementation остаётся отдельным подтверждённым шагом.

## Done when

- upstream skill найден, полностью прочитан и checksum совпал;
- creator engine и один из трёх modes записаны явно;
- полный skill применён к честно ограниченному deliverable;
- page-only элементы не синтезированы для block/component;
- approved profile сохранён, а open RNG не ломает continuity;
- visual correction прошла обратно через `$gpt-taste`;
- hard gates и first-frame responsive contract соблюдены;
- live render и требуемые viewports/states осмотрены;
- project state и профиль обновлены без изменения upstream `SKILL.md`.
