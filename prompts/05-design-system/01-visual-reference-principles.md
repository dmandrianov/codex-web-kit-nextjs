# Извлечь принципы из визуальных референсов

## Когда использовать

После `docs/ia/ia-review.md` со статусом `IA ready`, до style shortlist, visual concepts, дизайн-направления и токенов. Используй этот промпт, если есть стартовые дизайн-референсы: Behance, сайты, скриншоты, moodboard, бренд-материалы или примеры блоков.

## Роль Codex

Ты действуешь как digital art director, UX analyst и design reference curator.

## Цель

Создать `docs/design-system/reference-principles.md`: не копию чужого дизайна, а набор принципов, которые можно безопасно адаптировать в стиль текущего сайта.

## Контекст, который нужно дать

- `project-brief.md`.
- `docs/strategy.md`.
- `docs/messaging.md`.
- `docs/research/reference-analysis.md`, если есть.
- `docs/ia/ia-review.md`.
- `prompts/_guidelines/creator-critic-design-workflow.md`.
- Только релевантные reference/hierarchy/media sections из `prompts/_knowledge/ui-design-quality.md`.
- Ссылки на референсы, скриншоты, изображения, Behance-проекты, сайты.
- Бренд-материалы: логотип, цвета, шрифты, фото, tone of voice.
- Ограничения по нише, аудитории, юридическим требованиям и e-commerce, если есть.

## Ограничения

- Не копируй layout, тексты, иллюстрации, брендовые элементы, уникальные композиции и визуальные приемы 1:1.
- Не переноси чужую палитру, типографику или декоративные эффекты, если они конфликтуют с аудиторией, оффером или будущими tokens.
- Не создавай финальные токены, компоненты или код.
- Не делай дизайн-систему по одному красивому скриншоту, если он противоречит стратегии.
- Если скриншот нечитабелен, сначала опиши, что видно, и зафиксируй open question.
- Для будущих скриншотов блоков фиксируй правило: сохранять смысл и UX-паттерн, но приводить визуал к дизайн-системе сайта.

## Процесс

1. Собери список референсов и раздели их на `brand`, `visual mood`, `UX pattern`, `content pattern`, `block reference`.
2. Для каждого референса опиши, что в нём важно: настроение, плотность, композиция, типографический характер, цветовая роль, работа с изображениями, CTA, доверие.
3. Раздели выводы на `adapt`, `avoid`, `needs confirmation`.
4. Сверь выводы только с релевантными разделами `prompts/_knowledge/ui-design-quality.md`: референс должен давать переносимые признаки hierarchy, composition, typography, media treatment и responsive, а не новый полный checklist.
5. Отдельно зафиксируй forbidden-to-copy: конкретные layout-композиции, тексты, изображения, фирменные элементы и узнаваемые декоративные приемы.
6. Сформулируй правила адаптации будущих screenshot references для отдельных блоков.
7. Создай или обнови `docs/design-system/reference-principles.md`.
8. Обнови `docs/project-state.md`: отметь `Reference principles defined` и укажи следующий промпт.

## Output

Создай или обнови `docs/design-system/reference-principles.md` в формате:

```md
# Reference Principles

## Source references

| Reference | Type | Why relevant | Usable principles | Do not copy | Notes |
| --- | --- | --- | --- | --- | --- |

## Adaptable principles

## Anti-patterns and forbidden-to-copy

## Screenshot reference workflow

- Preserve:
- Adapt:
- Replace with site design system:
- Ask before changing:

## Open questions
```

В ответе кратко покажи:

- какие принципы можно адаптировать;
- что нельзя копировать;
- какие вопросы остались;
- следующий промпт по router.

## Done when

- Референсы превращены в принципы, а не в инструкцию копировать дизайн.
- Есть явный список `adapt` и `avoid`.
- Есть правило для будущих скриншотов блоков.
- Понятно, какие референсы влияют на style shortlist и visual concepts.
- `docs/project-state.md` обновлен.

## Follow-up

Следующий промпт: `prompts/05-design-system/02-design-style-shortlist.md`.

Если референсов нет, можно пропустить этот шаг и перейти к `prompts/05-design-system/02-design-style-shortlist.md`, но в `docs/project-state.md` нужно отметить, что reference principles отсутствуют или не требуются.
