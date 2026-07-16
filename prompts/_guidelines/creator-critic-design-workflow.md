# Creator → Render → Critic

Этот workflow нужен для visual concept, page composition, нового блока и заметного UI-redesign. Его задача — дать модели достаточно направления, чтобы сделать сильный первый вариант, но не заставлять её одновременно быть дизайнером, аудитором и секретарём большого чеклиста.

## Главная схема

```text
короткий положительный brief
→ живой render
→ критика по screenshot
→ один связный self-fix
→ полный compliance на quality stage
```

Creator и critic — разные проходы. До первого render не загружай полные UI, copy и anti-slop базы. После render они становятся справочниками для проверки.

## 1. Сначала определи режим

### Creator

Используй, когда нужно придумать или заметно переработать композицию:

- visual concept;
- hero или marketing block;
- новый экран продукта;
- page-level composition;
- визуально слабый блок, которому нужен новый принцип, а не косметика.

### Critic

Используй, когда уже есть live UI или screenshots и нужно понять, что мешает качеству.

### Quality

Используй после творческого self-fix для полной проверки accessibility, states, responsive, runtime, technical quality и остальных обязательств проекта.

Локальная техническая правка без изменения композиции не требует отдельного creator pass. Сохрани существующий визуальный язык, исправь дефект и проверь затронутый участок.

## 2. Design context diet

Creator получает только контекст, который помогает принять визуальное решение:

1. Один outcome: что пользователь должен понять, почувствовать или сделать.
2. Реальный content: утверждённые факты, copy и данные текущего scope.
3. `docs/design-system/visual-north-star.md`, если он есть.
4. Approved screenshots или live concept. Визуальное доказательство важнее длинного пересказа.
5. Реальные assets: фотографии, product screenshots, видео, схемы, иконки, примеры результата. Отсутствующие материалы пометь честно.
6. Нужные части design system и Desktop Canvas Contract, а не все проектные документы.
7. От четырёх до шести релевантных правил качества для этой задачи.

Не передавай creator целиком:

- `ui-design-quality.md`;
- `site-copy-quality.md`;
- `anti-ai-slop-design-and-copy.md`;
- полный каталог before/after examples;
- повторённые таблицы `pass / fix`;
- длинный список визуальных запретов.

Чтобы выбрать 4–6 правил, сначала просмотри заголовки базы, затем открой только нужные разделы. Например, hero обычно требует hierarchy, focal point, media treatment, copy/CTA relation и responsive hierarchy; форма — grouping, labels, errors, submit area, states и mobile behavior.

## 3. Короткий creator brief

Creator brief должен помещаться в один короткий экран и описывать результат, а не пошаговую церемонию.

```md
## Outcome
[Что человек должен сразу понять, почувствовать или сделать]

## Positive direction
- [3–5 визуальных anchors из North Star и approved evidence]

## Evidence and materials
- Approved visual evidence: [live URL / screenshots]
- Real assets: [что доступно]
- Missing assets: [что нельзя подделывать]

## Creative freedom
[Какие composition, scale, whitespace, media treatment или expressive device можно выбрать самостоятельно]

## Hard boundaries
- [Только truth, permission, safety или accessibility; обычно 0–3 пункта]

## Relevant quality rules
- [4–6 критериев именно для текущей задачи]

## Scope
[Что можно менять и что остаётся вне текущего прохода]
```

Положительное направление должно быть конкретнее, чем `современно` или `дорого`: назови focal object, отношение текста и media, плотность, характер типографики и желаемый ритм. Не фиксируй будущий layout словами, если его ещё можно лучше найти в браузере.

## 4. Что остаётся жёстким

Слова `ALWAYS`, `NEVER`, `обязательно` и `никогда` используй только для настоящих инвариантов:

- не выдумывать факты, proof, цены, отзывы, гарантии или готовую функциональность;
- не выходить за разрешённый scope и не выполнять внешние/опасные действия без нужного разрешения;
- не раскрывать secrets и не ослаблять безопасность;
- не ломать доступность: смысл, управление и критичные состояния должны оставаться доступны.
- не менять смысл core semantic roles: primary/secondary action, success/warning/error, selected/disabled и другие status/interaction semantics не являются декоративным экспериментом.

Остальные дизайн-правила — критерии и предпочтения, а не запреты. Cards, gradients, unusual type, illustration, texture, motion или новый visual pattern допустимы, если они помогают задаче, поддерживают направление и не маскируют слабую структуру. Если выразительный приём выходит за текущую design system, пометь его как proposal и после render реши, стоит ли закрепить его в системе.

### Stable vocabulary и provisional choices

Разделяй основу сайта и эксперимент текущего прохода:

- `stable vocabulary` — brand identity, основные type roles, core palette, смысл primary/secondary actions, accessibility semantics, утверждённая icon family и product interaction patterns;
- `provisional expressive choices` — композиция marketing-блока, focal object, scale, media crop/treatment, texture, section transition, декоративный surface, локальный motion или новый повторяемый visual motif.

Stable vocabulary сохраняет узнаваемость и поведение. Provisional choice можно попробовать в creator pass без предварительного превращения в глобальный token. После critic его либо убирают, либо принимают и документируют в design system. Truth, accessibility и реальные product states никогда не являются provisional.

### Scope для marketing chapter

Для ритма marketing-страницы creator может смотреть и планировать visual chapter из 2–4 соседних блоков: их высоту, плотность, фон, переходы, focal sequence и чередование спокойных/выразительных мест. Это не разрешает незаметно переписывать весь page content или business logic.

Product UI, данные, формы, checkout, pricing rules и другая бизнес-логика остаются block-scoped. Их расширение требует отдельного scope. Production implementation также может идти маленькими блоками, даже если visual composition проверяется как chapter.

## 5. Creator pass

1. Посмотри approved visual evidence и реальные assets до чтения длинных текстовых объяснений.
2. Сформулируй один главный visual job и один focal event.
3. Дёшево исследуй несколько композиционных ходов — внутренние thumbnails, low-fi sketches или короткие DOM/CSS probes — и выбери лучший. Пользователю покажи один собранный high-fidelity concept, если он не просил варианты.
4. Реализуй его без промежуточного отчёта о каждом решении.
5. Открой live UI и получи screenshots на требуемых mobile/reference/wide viewports.

Первый render — не финальный verdict. Его задача — превратить абстрактные слова в видимый материал, который можно честно оценить.

## 6. Critic pass

Critic начинается только после render.

1. Сначала посмотри screenshot целиком и назови фактическое первое впечатление.
2. Сравни с Visual North Star, approved evidence, соседями и Desktop Canvas Contract.
3. Теперь можно использовать полные релевантные knowledge bases как справочник: UI, copy, anti-slop, contemporary direction, page rhythm.
4. Верни максимум три главных visual findings. Не превращай этот проход в полный compliance audit.
5. Выбери один связный self-fix с самым большим визуальным эффектом, внеси его и повторно посмотри render.

Формат critic:

```md
## First impression
[Что считывается за первые секунды]

## Main findings
1. [Наблюдаемая проблема → почему важна → направление исправления]
2. [Только если это одна из трёх главных проблем]
3. [Только если это одна из трёх главных проблем]

## Self-fix
- Исправлено: [один связный проход]
- Проверено на: [viewports]
- После повторного render: [что стало лучше / какой риск остался]
```

Если найдено нарушение truth, permissions, safety или accessibility, исправь его независимо от лимита визуальных findings. Это не считается вкусовой придиркой.

## 7. Полный quality stage

Полные `UI quality check`, `Site copy check`, accessibility, responsive matrix, states, runtime и technical checks выполняются на quality stage или когда риск текущего компонента прямо этого требует.

Quality stage может использовать базы целиком. Он не должен перепроектировать уже сильную композицию из-за механического желания удовлетворить каждое необязательное предпочтение. Findings должны опираться на screenshot, поведение или проверяемое требование.

## 8. Done when

- creator brief короткий, положительный и outcome-first;
- creator получил North Star, approved visual evidence и реальные assets, если они существуют;
- до render выбрано 4–6 релевантных правил вместо полной загрузки баз;
- live UI отрисован и просмотрен на нужных viewports;
- critic назвал не более трёх главных visual findings;
- выполнен один связный self-fix и повторный render;
- полный compliance оставлен quality stage;
- truth, permissions, safety и accessibility не ослаблены.
