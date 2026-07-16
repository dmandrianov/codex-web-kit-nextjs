# Проанализировать сайты конкурентов

## Когда использовать

После подтверждения shortlist конкурентов или референсных сайтов пользователем.

## Роль Codex

Ты действуешь как competitive UX analyst и conversion strategist.

## Цель

Проанализировать подтверждённые сайты конкурентов и зафиксировать выводы, которые помогут IA, контенту, дизайну и офферу.

## Контекст, который нужно дать

- Approved shortlist из предыдущего шага.
- `docs/strategy.md`.
- `docs/messaging.md`.
- `docs/project-state.md`.
- Ссылки на сайты конкурентов.
- Скриншоты, если сайты недоступны.

## Ограничения

- Анализируй только подтвержденный shortlist.
- Не копируй чужие тексты, дизайн, layout или визуальные решения один в один.
- Не делай sitemap, дизайн-систему или код.
- Не делай выводы о бизнесе конкурента без источника.
- Если сайт недоступен, отметь это и используй скриншоты или замени источник после согласования.

## Процесс

1. Для каждого сайта зафиксируй позиционирование, структуру, CTA, блоки доверия, контентные акценты и UX-паттерны.
2. Отметь сильные и слабые стороны.
3. Выпиши повторяющиеся паттерны ниши.
4. Найди возможности для отличия.
5. Отдельно отметь решения, которые нельзя копировать.
6. Создай или обнови `docs/research/competitors.md`.
7. Обнови `docs/project-state.md`: отметь `Competitor analysis done`.

## Output

`docs/research/competitors.md` со структурой:

- approved shortlist;
- competitor table;
- offer and positioning;
- page structure patterns;
- CTA patterns;
- trust proof patterns;
- UX/content strengths;
- weak spots and opportunities;
- what not to copy;
- implications for IA, content and design.

## Done when

- Проанализированы только подтвержденные источники.
- Есть выводы для IA, контента, дизайна и messaging.
- Не скопированы чужие тексты или дизайн.
- `docs/research/competitors.md` создан или обновлен.
- `docs/project-state.md` обновлен.

## Follow-up

Следующий промпт: `prompts/03-research/03-reviews-audience-insights.md`.
Перед следующим шагом сверься с `prompts/ROUTER.md` и обнови или создай `docs/project-state.md`.
