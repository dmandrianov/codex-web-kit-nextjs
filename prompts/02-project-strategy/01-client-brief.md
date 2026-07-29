# Проверить стратегический бриф

## Когда использовать

После `project-brief.md`, `Project-specific context` в `AGENTS.md` и базовой документации проекта, до исследования, IA, дизайна и кода.

## Роль Codex

Ты действуешь как product strategist, UX researcher и редактор стратегического брифа.

## Цель

Проверить, достаточно ли текущего `project-brief.md` для стратегии сайта: найти пробелы, противоречия, неподтвержденные гипотезы и решения, которые нужно уточнить до исследования, IA и дизайна.

## Контекст, который нужно дать

- `project-brief.md`.
- `AGENTS.md` с `Project-specific context`.
- `docs/project-state.md`.
- `docs/project-rules.md`, если он есть.
- `docs/open-questions.md`, если он есть.
- Существующие материалы проекта, если они важны для проверки.

## Ограничения

- Не проводи первичный бриф заново: этим занимается `prompts/00-intake-brief/`.
- Если `project-brief.md` отсутствует, остановись и предложи вернуться к `prompts/00-intake-brief/07-finalize-project-brief.md`.
- Не задавай десятки вопросов: выбери только 3-5 критичных вопросов, без которых стратегия будет слабой.
- Не переходи к исследованию конкурентов, IA, дизайну, копирайтингу страниц или коду.
- Не превращай гипотезы в подтвержденные факты.

## Процесс

1. Проверь наличие `project-brief.md`. Если его нет, остановись и предложи вернуться к intake.
2. Сверь `project-brief.md` с `Project-specific context` и текущим `docs/project-state.md`.
3. Раздели вводные на `confirmed`, `hypothesis`, `conflict`, `open question`.
4. Проверь стратегические зоны: цель сайта, аудитории, оффер, доверие, CTA, ограничения, контент, конкуренты, e-commerce флаг.
5. Если данных достаточно, подготовь краткий strategic audit и рекомендуй следующий промпт.
6. Создай или обнови `docs/strategic-audit.md`.
7. Если данных достаточно, зафиксируй `Strategic brief audited` как последний подтверждённый результат в `docs/project-state.md` и укажи следующий промпт `prompts/02-project-strategy/02-goals-audience-offer.md`.
8. Если данных мало, задай только 3-5 критичных вопросов, объясни зачем они нужны, обнови `docs/open-questions.md` и оставь stage `rules-ready`.

## Output

Созданный или обновленный `docs/strategic-audit.md` с разделами:

- `confirmed` - подтвержденные факты;
- `hypothesis` - неподтвержденные, но полезные гипотезы;
- `conflicts` - противоречия между источниками;
- `critical gaps` - пробелы, которые мешают стратегии;
- `questions` - максимум 3-5 критичных вопросов, если они нужны;
- `recommendation` - можно ли переходить к стратегии;
- `next prompt` - рекомендуемый следующий промпт.

Также обновленный `docs/project-state.md` и при необходимости `docs/open-questions.md`.

## Done when

- `project-brief.md` проверен и не дублируется первичным брифом.
- Факты, гипотезы, конфликты и открытые вопросы разделены.
- Если вопросы нужны, их не больше 3-5 и они действительно критичны.
- Понятно, можно ли переходить к `prompts/02-project-strategy/02-goals-audience-offer.md`.
- `docs/strategic-audit.md` создан или обновлен.
- В `docs/project-state.md` отмечено `Strategic brief audited`, если аудит завершен.
- `docs/project-state.md` обновлен или явно указано, почему обновление невозможно.

## Follow-up

Следующий промпт: `prompts/02-project-strategy/02-goals-audience-offer.md`.
Перед следующим шагом сверься с `prompts/ROUTER.md` и обнови или создай `docs/project-state.md`.
