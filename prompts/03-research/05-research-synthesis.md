# Синтезировать research findings

## Когда использовать

После competitor analysis, audience insights и reference analysis, перед информационной архитектурой и дизайном.

## Роль Codex

Ты действуешь как UX strategist, research synthesizer и product editor.

## Цель

Собрать компактные выводы исследования для sitemap, page section map, контента, design direction и messaging.

## Контекст, который нужно дать

- `docs/research/competitors.md`.
- `docs/research/audience-insights.md`.
- `docs/research/reference-analysis.md`, если он есть.
- `docs/strategy.md`.
- `docs/messaging.md`.
- `docs/project-state.md`.

## Ограничения

- Не создавай sitemap, page section map или дизайн-систему.
- Не добавляй новые неподтвержденные факты.
- Не превращай research summary в длинный отчёт.
- Не копируй чужие тексты и дизайн.
- Для интернет-магазина не проектируй каталог, PDP и checkout здесь: отправь это в `prompts/11-ecommerce/`.

## Процесс

1. Выдели повторяющиеся рыночные паттерны.
2. Выдели audience insights, которые влияют на структуру и контент.
3. Сформулируй возможности для отличия.
4. Сформулируй риски и решения, которых стоит избегать.
5. Подготовь рекомендации для IA, контента, design direction и messaging.
6. Создай или обнови `docs/research/research-summary.md`.
7. Обнови `docs/project-state.md`: отметь `Research done` и `Research synthesis done`, следующий промпт `prompts/04-information-architecture/01-sitemap.md`.

## Output

`docs/research/research-summary.md` со структурой:

- key market patterns;
- audience insights;
- differentiation opportunities;
- risks and avoid list;
- recommendations for sitemap;
- recommendations for page section map;
- recommendations for content;
- recommendations for design direction;
- recommendations for messaging;
- open research questions.

## Done when

- Research summary короткий и пригоден для следующего этапа.
- Есть выводы для IA, контента, дизайна и messaging.
- Не создан sitemap или дизайн-система.
- `docs/research/research-summary.md` создан или обновлен.
- `docs/project-state.md` обновлен и ведёт в `prompts/04-information-architecture/01-sitemap.md`.

## Follow-up

Следующий промпт: `prompts/04-information-architecture/01-sitemap.md`.
Перед следующим шагом сверься с `prompts/ROUTER.md` и обнови или создай `docs/project-state.md`.
