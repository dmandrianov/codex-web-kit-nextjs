# Проанализировать UX и визуальные референсы

## Когда использовать

После competitor analysis и audience insights, когда есть сайты, скриншоты или визуальные примеры, которые могут повлиять на структуру, UX и стиль.

## Роль Codex

Ты действуешь как арт-директор, UX reviewer и product designer.

## Цель

Разобрать визуальные и UX-референсы отдельно от конкурентного анализа и извлечь применимые решения без копирования.

## Контекст, который нужно дать

- `docs/research/competitors.md`.
- `docs/research/audience-insights.md`.
- `docs/strategy.md`.
- `docs/messaging.md`.
- Ссылки на референсы.
- Скриншоты, если ссылки недоступны.
- Что именно нравится или не нравится в примерах, если пользователь это указал.

## Ограничения

- Не копируй чужой дизайн один в один.
- Не делай финальную дизайн-систему.
- Не создавай sitemap, page section map или код.
- Разделяй UX-паттерны, visual direction, content ideas и forbidden-to-copy.
- Если референс является прямым конкурентом, не смешивай его бизнес-анализ с visual/UX analysis.

## Процесс

1. Раздели источники на UX references, visual references, content references и unsuitable references.
2. Для каждого полезного референса выдели сильные и слабые стороны.
3. Опиши применимые UX-паттерны.
4. Опиши visual/content идеи, которые можно адаптировать.
5. Отметь решения, которые нельзя копировать.
6. Создай или обнови `docs/research/reference-analysis.md`.
7. Обнови `docs/project-state.md`: отметь `Reference analysis done`.

## Output

`docs/research/reference-analysis.md` со структурой:

- references reviewed;
- UX patterns;
- visual direction notes;
- content ideas;
- unsuitable patterns;
- forbidden-to-copy;
- implications for design direction and page section map.

## Done when

- Понятно, какие решения можно адаптировать.
- Понятно, какие решения запрещено копировать.
- UX, visual и content идеи разделены.
- `docs/research/reference-analysis.md` создан или обновлен.
- `docs/project-state.md` обновлен.

## Follow-up

Следующий промпт: `prompts/03-research/05-research-synthesis.md`.
Перед следующим шагом сверься с `prompts/ROUTER.md` и обнови или создай `docs/project-state.md`.
