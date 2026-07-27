# Согласовать смысл и факты блока

## Когда использовать

После page planning и перед build смыслового блока, если посетитель увидит новый heading, lead, CTA, proof, form copy или другой публичный текст.

Можно пропустить, если пользователь явно написал `делай без согласования текста` или блок технический и не содержит нового public copy.

## Роль Codex

Ты действуешь как UX writer и content editor. На этом шаге ты согласовываешь содержание, а не рисуешь и не утверждаешь layout.

## Цель

Создать `docs/pages/[page-slug]/blocks/[block-slug]-content-preview.md`, где пользователь видит:

- главный смысл и вопрос блока;
- подтверждённые facts и допустимые claims;
- voice/person;
- рекомендуемый черновик copy;
- CTA/action;
- открытые данные и риски.

Content approval не фиксирует exact wording, line breaks, окончательную длину строк, visual composition или layout. Во время build creator может аккуратно сократить фразу, поменять порядок слов и подобрать переносы под живую композицию, не меняя утверждённые meaning, facts, claims, voice и action.

## Контекст, который нужно дать

- page spec, content/SEO plan, block breakdown и текущий block spec;
- strategy, messaging и source materials;
- соседние block specs и уже утверждённый copy, чтобы не повторять смысл;
- `prompts/_knowledge/site-copy-quality.md`;
- `prompts/_guidelines/landing-copy-formulas.md` только как diagnostic fallback;
- `prompts/_guidelines/creator-critic-design-workflow.md` для handoff в build;
- creator engine/mode и `prompts/_guidelines/gpt-taste-integration.md`, если spec выбирает `gpt-taste`;
- Visual North Star и approved evidence — только чтобы передать creator continuity anchors, а не утвердить layout.

## Ограничения

- Не пиши код и не меняй production UI.
- Не создавай обязательный HTML-preview.
- Не выдумывай факты, цены, отзывы, гарантии, юридические условия, product states или proof.
- Не выдавай draft wording за финальный текст.
- Не замораживай переносы строк и расположение copy до render.
- Не выбирай copy formula по обязанности. Используй её только если подача получилась общей или непонятной.
- Не проси пользователя оценивать композицию, которой ещё не существует.
- Не смешивай content approval и layout approval.
- Не делай длинный UI quality checklist: полный visual critic работает после live render.
- Не загружай creator новым каталогом запретов. Передай ему 4–6 релевантных направлений.

## Что именно утверждает пользователь

| Утверждается сейчас | Остаётся гибким до build |
| --- | --- |
| главный смысл и user question | exact wording |
| подтверждённые facts | line breaks и длина строк |
| допустимые claims и ограничения | порядок элементов в composition |
| voice/person и tone boundary | layout, scale, spacing, media placement |
| CTA intent / настоящее действие | финальная button label, если смысл действия тот же |
| что нельзя выдумывать | один purposeful expressive exception внутри North Star |

Если точная юридическая, ценовая или продуктовая формулировка обязана быть дословной, отметь её как `locked copy`.

## Процесс

1. Выбери один block spec и сформулируй его главный user question.
2. Отдели подтверждённые facts от предположений и `needs confirmation`.
3. Зафиксируй допустимые claims: что можно сказать, что нельзя обещать и какие ограничения нельзя потерять.
4. Выбери voice/person: first person, brand voice или neutral product.
5. Подготовь один рекомендуемый draft: heading, короткий answer/lead, key points, CTA, microcopy и proof placeholders.
6. Проведи `Site copy check` по релевантным разделам базы. Исправь generic wording, внутреннюю терминологию и неподтверждённые claims.
7. Если текст всё ещё не держится, возьми одну формулу из `landing-copy-formulas.md` как диагностический каркас и после переписывания убери ощущение шаблона. Если формула не нужна, напиши `Formula used: no`.
8. Дай 1–2 альтернативы только там, где у пользователя действительно есть смысловой выбор. Не создавай варианты ради количества.
9. Сверь смысл с соседними блоками: что этот блок сообщает впервые и что не должен повторять.
10. Подготовь короткий creator handoff из 4–6 строк: job, 2–3 positive anchors, available material/focal opportunity, creative freedom и настоящие hard boundaries. Это направление, не layout spec. Сохрани creator engine/mode из spec; не меняй route на основании текста.
11. Отметь один possible expressive opportunity, если он естественно следует из материала. Он не обязателен и может быть выбран creator иначе.
12. Создай или обнови content-preview artifact.
13. Запиши conditional next prompt:
   - native → `prompts/08-block-build/00-build-block-fast-lane.md`;
   - gpt-taste block/component → `prompts/08-block-build/00-gpt-taste-creative-build.md`.
14. Обнови `docs/project-state.md`: `approved` ставь только после явного подтверждения пользователя.
15. Покажи пользователю, что именно он утверждает, и попроси короткий ответ.

## Output

Создай или обнови:

```md
# Block Content Preview: [Block name]

## Status

- Content status: draft / approved / needs iteration
- Build readiness: blocked / ready after content approval
- Page:
- Block:
- Source spec:
- Creator engine: native / gpt-taste
- gpt-taste mode: block / component / not applicable
- Next prompt after approval: native fast lane / gpt-taste creative build

## Approval scope

- Approved now: meaning / facts / claims / voice / CTA intent
- Remains flexible: exact wording / line breaks / final length / layout / composition
- Locked copy, if any:

## User question and block job

- User question:
- Main meaning:
- What user should understand or do:
- What this adds after the previous block:

## Facts and claims

### Confirmed facts

-

### Allowed claims and required limitations

-

### Needs confirmation

-

### Must not be invented

-

## Voice

- Person: first person / brand / neutral product
- Tone boundary:

## Recommended draft

- Heading:
- Short answer / lead:
- Key points:
- CTA intent:
- Draft CTA label:
- Microcopy:
- Proof/data placeholder:

## Site copy check

- Truth and fair selection:
- User benefit / removed risk:
- Generic or internal wording removed:
- CTA names a real action:
- Voice consistent:
- Open facts marked:
- Formula used: no / [formula and diagnosed problem]

## Meaningful alternatives

- Alternative 1, if useful:
- Alternative 2, if useful:
- What decision changes between them:

## Creator handoff

- Creator engine:
- gpt-taste mode:
- gpt-taste profile:
- Job:
- Positive anchor 1:
- Positive anchor 2:
- Available material / focal opportunity:
- Creative freedom:
- Hard boundary, only if needed:
- Possible expressive opportunity, not a fixed layout:

## User decision

- Approve meaning/facts/claims/voice/action: pending / approved
- Requested changes:
- Reminder: final wording, line breaks and layout will be judged after live render.
```

В ответе покажи обычными словами:

- что блок должен сказать;
- какие facts/claims считаются подтверждёнными;
- рекомендуемый draft;
- что останется гибким во время дизайна;
- какое решение требуется от пользователя.

## Done when

- Утверждается содержание, а не невидимый layout.
- Main meaning, facts, claims, voice и CTA intent понятны.
- Неподтверждённые данные отмечены `needs confirmation`.
- Нет fake proof или выдуманных обещаний.
- Exact copy, line breaks и final length не заморожены без реальной причины.
- Формула использована только при диагностированной проблеме или явно пропущена.
- Creator handoff содержит 4–6 релевантных направлений, а не полный UI checklist.
- Next prompt соответствует creator engine/mode из block spec.
- Создан content-preview artifact и корректно обновлён project state.

## Follow-up

После явного content approval:

- native → `prompts/08-block-build/00-build-block-fast-lane.md`;
- gpt-taste block/component → `prompts/08-block-build/00-gpt-taste-creative-build.md`.

Если facts/claims не подтверждены, оставайся на этом шаге. Если block job слабый, вернись к `prompts/07-page-planning/05-block-breakdown.md`.
