# Создать sitemap и навигационную структуру

## Когда использовать

После готового `docs/research/research-summary.md`, до карты секций, дизайн-системы, page spec и кода.

## Роль Codex

Ты действуешь как information architect, UX strategist и SEO-aware planner.

## Цель

Создать `docs/ia/sitemap.md`: понятную карту страниц, навигационных групп, пользовательских задач, бизнес-целей и SEO intent. Sitemap должен помогать решить, какие страницы действительно нужны, какие можно отложить и как пользователь будет находить ключевые сценарии.

## Контекст, который нужно дать

- `project-brief.md`.
- `docs/strategy.md`.
- `docs/messaging.md`.
- `docs/research/research-summary.md`.
- `docs/research/audience-insights.md`.
- `docs/project-state.md`, если есть.
- Известные обязательные страницы, юридические требования, SEO-ограничения.
- Для интернет-магазина: e-commerce brief и каталоговые артефакты из `prompts/11-ecommerce/`, если они уже есть.

## Ограничения

- Не проектируй секции страниц подробно, это следующий промпт.
- Не переходи к визуальному дизайну, page spec или коду.
- Не добавляй страницу без понятной пользовательской задачи или бизнес-причины.
- Не раздувай маленький сайт до большого портала без доказанной необходимости.
- Не проектируй детально каталог, PDP, корзину и checkout внутри этого промпта. Для этого используй `prompts/11-ecommerce/`.
- Если данных не хватает, фиксируй open questions, а не выдумывай бизнес-логику.

## Процесс

1. Проверь, что есть strategy и research summary. Если их нет, вернись к router-логике.
2. Выпиши основные пользовательские сценарии и задачи из strategy, messaging и audience insights.
3. Составь список страниц и раздели их на `required`, `optional`, `deferred`, `service`.
4. Для каждой страницы зафиксируй purpose, primary audience, user task, business goal и conversion role.
5. Сгруппируй страницы по навигации: primary nav, secondary nav, footer, service/legal, hidden/system.
6. Добавь SEO intent и заметки по URL/slug там, где это уместно.
7. Для e-commerce проекта проверь, не нужны ли отдельные категории, catalog landing, PDP, cart, checkout и policy pages, но детали отправь в `prompts/11-ecommerce/`.
8. Создай или обнови `docs/ia/sitemap.md`.
9. Обнови `docs/project-state.md`: отметь `Sitemap created` и укажи следующий промпт.

## Output

Создай или обнови `docs/ia/sitemap.md` в формате:

```md
# Sitemap

## Source context

- Brief:
- Strategy:
- Research:
- Ecommerce flag:

## User tasks

| User task | Audience | Priority | Source |
| --- | --- | --- | --- |

## Pages

| Page | Status | Purpose | Primary audience | User task | Business goal | Nav group | Priority | SEO intent | Conversion role | Notes/open questions |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

## Navigation model

### Primary nav

### Secondary nav

### Footer

### Service/legal/system

## Deferred pages

## Open questions
```

В ответе кратко покажи:

- какие страницы обязательны;
- какие отложены;
- какие вопросы мешают уверенности;
- следующий промпт по router.

## Done when

- У каждой страницы есть понятная задача и причина существования.
- Навигация не перегружена и разделена по ролям.
- SEO intent указан для страниц, которым он нужен.
- Служебные, юридические и системные страницы не смешаны с основными продажными страницами.
- E-commerce потребности отмечены отдельным флагом, если проект магазин.
- `docs/project-state.md` обновлен.

## Follow-up

Следующий промпт: `prompts/04-information-architecture/02-page-section-map.md`.

Перед следующим шагом сверься с `prompts/ROUTER.md`: если sitemap неполный или пользователь не подтвердил спорные страницы, сначала закрой open questions.
