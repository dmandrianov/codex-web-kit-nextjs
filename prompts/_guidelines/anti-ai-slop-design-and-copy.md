# Anti-AI-Slop Design and Copy Guidelines

Этот файл помогает получить интерфейс с характером конкретного проекта. Он не является списком запрещённых украшений. Сначала создай осмысленную композицию, затем проверь её по готовому render.

Для creator/critic порядка используй `prompts/_guidelines/creator-critic-design-workflow.md`.

## Главный принцип

AI-slop — не gradient, card, glow, illustration или decoration сами по себе. AI-slop появляется, когда приём выбран автоматически и не выполняет понятную роль.

Перед build ответь:

- что человек должен понять или сделать;
- какой материал проекта можно показать;
- что станет главным центром внимания;
- почему выбранная композиция подходит именно этому проекту;
- какие 2–3 continuity anchors связывают её с Visual North Star.

## Пять допустимых ролей визуального приёма

Каждый заметный элемент должен выполнять хотя бы одну роль:

| Role | Что делает | Примеры |
| --- | --- | --- |
| Functional | помогает понять, выбрать или действовать | controls, comparison, hierarchy, state cue |
| Narrative | показывает ход истории, процесса или изменения | timeline, sequence, before/after, spatial journey |
| Emotional | создаёт нужное ощущение и темп | scale, pause, tension, warmth, restraint |
| Brand | делает проект узнаваемым | характер type, recurring shape, material, color behavior |
| Atmospheric | создаёт среду, глубину или настроение | texture, light, crop, motion, background field |

`Atmospheric` и `emotional` — полноценные роли. Decoration не нужно запрещать как класс. Оно становится проблемой только тогда, когда не связано с задачей, вытесняет содержание или повторяет generic autopilot.

## Generic autopilot

Остановись и пересобери решение, если оно возникло без связи с материалом проекта:

- обычный hero автоматически стал gradient + glow + floating cards;
- любой набор тезисов автоматически превратился в одинаковые cards;
- каждый пункт получил большую иконку только для заполнения места;
- появился fake dashboard, псевдодокумент или график, который выглядит как proof, но ничего не доказывает;
- все секции построены одной формой `heading + lead + grid`;
- новый блок выглядит как другой template, хотя локально аккуратен;
- интерфейс стал отчётом или таблицей только потому, что такую форму проще проверить;
- текст состоит из универсальных обещаний, которые подходят любому бизнесу.

Не лечи generic result новым списком запретов. Найди недостающий focal point, реальный материал, нужную роль, контраст масштаба или более ясную композицию.

## Короткий creator brief

До первого render не загружай creator длинным quality checklist. Собери 4–6 релевантных направлений:

1. job и главный вопрос пользователя;
2. 2–3 positive anchors из Visual North Star и approved evidence;
3. доступный реальный material/media;
4. focal opportunity или желаемая visual role;
5. свобода композиции;
6. только настоящие hard boundaries.

Не обязательно использовать все шесть строк. Если направление не влияет на решение, убери его.

## Hard boundaries

До и после build жёсткими остаются:

- truth: никаких выдуманных фактов, цен, отзывов, гарантий, product states или proof;
- accessibility: содержание, действия, focus, контраст и смысл не должны быть недоступны;
- semantic design tokens: существующие semantic roles и обязательные brand/accessibility invariants нельзя ломать случайными значениями;
- честный shippable scope: schematic или illustrative material должен быть назван таким, а не выдан за работающий продукт;
- явный актуальный user feedback.

Обычные style preferences, знакомые anti-patterns и вкусовые опасения не являются hard stop автоматически.

## Purposeful expressive exception

В marketing/editorial блоке creator может использовать один новый выразительный ход, если существующей системы не хватает для сильной композиции:

- illustration или pictorial treatment;
- texture/material treatment;
- typographic composition;
- media crop/treatment;
- spatial device или transition;
- небольшой motion principle.

Условия:

- ход остаётся внутри характера Visual North Star;
- он выполняет functional, narrative, emotional, brand или atmospheric role;
- он не ломает truth, accessibility и semantic tokens;
- он не вводит новый icon pack;
- технически он может жить как один component-scoped named variable/class, а не как россыпь raw values или новый global semantic token;
- после render он записывается как `provisional pattern`, а не молча становится частью дизайн-системы;
- critic решает: `keep provisional`, `promote later`, `revise` или `remove`.

Для product UI, checkout, account, settings и business-critical flows такой exception не должен менять логику, состояния, semantic controls или ожидаемое поведение.

## Реальные материалы

Предпочитай материал, который принадлежит проекту:

- реальный интерфейс;
- фотографию человека, продукта, места или процесса;
- документ, карту, таблицу или результат работы;
- честный source-backed факт;
- реальный отзыв;
- объясняющую illustration, явно не выдаваемую за proof.

Если proof отсутствует, напиши `needs source/proof`. Не маскируй пробел убедительным fake artifact.

## Copy direction

Публичный текст должен отвечать на реальную ситуацию человека:

- один главный смысл на блок;
- факты отделены от предположений;
- польза или снятый риск понятны;
- CTA называет настоящее действие;
- voice/person остаётся последовательным;
- открытые данные отмечены `needs confirmation`.

Не замораживай до build точные переносы, финальную длину строки и расположение текста. Content approval утверждает meaning, facts, claims, voice и action. Creator может аккуратно редактировать длину и line breaks под композицию, не меняя смысл и обещания.

Обычную copy-проверку делай по `prompts/_knowledge/site-copy-quality.md`, а полный quality pass — по `prompts/_knowledge/site-copy-quality-full.md`. Формулы из `prompts/_guidelines/landing-copy-formulas.md` — диагностический инструмент, когда подача не работает, а не обязательная форма для каждого блока.

## Text density defaults

Это ориентиры, а не автоматический запрет:

| Элемент | Обычный диапазон | Когда можно больше |
| --- | --- | --- |
| Hero H1 | 5–12 слов | сложный B2B/offline offer |
| Hero lead | 1–2 коротких предложения | новый рынок или сложная услуга |
| Section H2 | 3–9 слов | editorial/SEO context |
| Section intro | 0–2 предложения | без intro теряется смысл |
| Card text | 0–2 предложения | product/legal/complex service |
| CTA | 1–4 слова | действию нужен контекст |
| FAQ answer | 2–5 предложений | legal/commercial nuance |

Если длиннее — причина должна идти от содержания, а не от желания заполнить поверхность.

## Post-render critic

После live render critic проверяет полный релевантный quality standard. В рабочий summary выносятся максимум три находки с самым большим влиянием:

1. что сильнее всего мешает смыслу или focal point;
2. что разрушает continuity/характер;
3. что создаёт truth, accessibility, responsive или shippability risk.

Если есть исправимая проблема, сделай один сфокусированный self-fix и повторно просмотри screenshots. Полные основания остаются в knowledge base и quality stage; creator не обязан заранее переписывать их в таблицу.

## Быстрый итоговый вопрос

Перед handoff спроси:

- Это могло появиться только в этом проекте или выглядит как готовый template?
- Главный приём имеет понятную роль?
- Реальные материалы и claims честны?
- На mobile, 1440 и wide guard сохраняется характер?
- После critic исправлена самая важная проблема?

## Sources

- Creator/critic workflow: `prompts/_guidelines/creator-critic-design-workflow.md`
- Page rhythm: `prompts/_guidelines/page-composition-rhythm.md`
- Site copy quality: `prompts/_knowledge/site-copy-quality.md`
- Full site copy quality: `prompts/_knowledge/site-copy-quality-full.md`
- UI design quality: `prompts/_knowledge/ui-design-quality.md`
- Contemporary visual direction: `prompts/_knowledge/contemporary-visual-direction.md`
