# Выбрать очередь визуальных гипотез

## Когда использовать

После `docs/ia/ia-review.md` со статусом `IA ready` и после `docs/design-system/reference-principles.md`, если были стартовые референсы. Используй до visual concept, design tokens и production UI.

## Роль Codex

Ты действуешь как digital art director: сначала ищешь визуальный язык внутри самого проекта, а уже потом обращаешься к библиотеке готовых стилей.

## Цель

Создать `docs/design-system/concepts/style-shortlist.md`: три различимые визуальные гипотезы, очередь проверки и одну гипотезу `Prototype next`. Следующий шаг собирает один публичный high-fidelity concept, а не три почти одинаковых сайта.

## Контекст, который нужно дать

- `project-brief.md`, `docs/strategy.md`, `docs/messaging.md`.
- `docs/research/research-summary.md` и `docs/research/reference-analysis.md`, если есть.
- `docs/ia/page-section-map.md` и `docs/ia/ia-review.md`.
- `docs/design-system/reference-principles.md`, если есть.
- Реальные брендовые материалы, фото, видео, документы, screenshots и предметные артефакты.
- `prompts/_guidelines/creator-critic-design-workflow.md`.
- `prompts/_knowledge/contemporary-visual-direction.md`.

Не загружай заранее полный anti-slop checklist и `_design-style-library.md`. Подключай один релевантный anti-slop раздел или style library только если project-derived поиск упёрся в конкретный пробел.

## Ограничения

- Не копируй чужой сайт или узнаваемую композицию 1:1.
- Не выдавай придуманные assets, интерфейсы, цифры, отзывы или proof за реальные.
- Не создавай production UI, final tokens или три публичных high-fidelity concepts.

Остальные решения — typography, composition, media treatment, scale, whitespace, depth и visual rhythm — остаются зоной поиска.

## Процесс

1. Сначала извлеки `Project visual raw material` из самого проекта:
   - предметы и материалы;
   - действия и процесс;
   - результат или изменение состояния;
   - реальные документы, интерфейсы, фотографии и доказательства;
   - человеческий или физический контекст;
   - характерные слова, метафоры и ритм продукта.
2. Из этого сырья сформулируй 5–7 project-derived visual ideas. Каждая идея должна отвечать: `что именно увидит человек` и `почему это относится к этому проекту`.
3. Только если project-derived ideas слишком слабы или однообразны, открой `_design-style-library.md` и используй её, чтобы расширить язык, а не выбрать готовый шаблон по названию.
4. Собери три различимые hypotheses. У каждой должны быть:
   - одна project-specific idea;
   - primary expressive lever;
   - optional secondary lever;
   - подходящие реальные или честно обозначенные assets;
   - главный риск и простой reject signal.
5. При необходимости сделай до трёх дешёвых low-fi composition sketches. Это могут быть внутренние schematic thumbnails, rough DOM/CSS frames или один disposable sketch sheet. Они проверяют только силу композиции; не требуют полного copy, tokens, motion plan, responsive polish или пользовательского согласования.
6. Не показывай low-fi sketches как три готовых концепта. Выбери один strongest sketch/hypothesis для `Prototype next`; публичным high-fidelity concept на следующем шаге остаётся один вариант.
7. Выбери два тестовых блока: `Hero / Entry` и один самый сложный non-hero block, где направление может сломаться.
8. Для active hypothesis напиши короткий creative brief: желаемое впечатление, primary lever, optional secondary lever, available assets, creative freedom и максимум три hard invariants.
9. Создай или обнови `docs/design-system/concepts/style-shortlist.md`.
10. Обнови `docs/project-state.md`: `Design hypothesis queue created` и следующий промпт.

## Output

```md
# Design Hypothesis Queue

## Project visual raw material

## Project-derived visual ideas

## Hypothesis queue

### Hypothesis 1 — Prototype next
- Project-specific idea:
- Why it fits:
- Primary expressive lever:
- Optional secondary lever:
- Asset truth:
- Creative freedom:
- Hard invariants: 0–3
- Learning goal:
- Reject signal:

### Hypothesis 2

### Hypothesis 3

## Low-fi exploration
- Used: yes / no
- Sketches explored:
- Why the selected composition won:

## Test blocks
- Block 1:
- Block 2:

## Active creative brief

## Open questions
```

В ответе покажи только три hypotheses, выбранную `Prototype next`, два test blocks и что пользователю нужно решить. Не пересказывай внутренний анализ.

## Done when

- Идеи сначала выведены из предмета, процесса и материалов проекта.
- Style library использована только как fallback или словарь.
- Есть три различимые hypotheses и ровно одна `Prototype next`.
- Допускается до трёх low-fi sketches, но следующий публичный high-fidelity concept один.
- Active brief короткий, положительный и содержит не больше трёх hard invariants.
- Ни одна hypothesis не опирается на fake proof или копирование 1:1.
- `docs/project-state.md` обновлён.

## Follow-up

Следующий промпт: `prompts/05-design-system/03-design-concept-prototypes.md`.
