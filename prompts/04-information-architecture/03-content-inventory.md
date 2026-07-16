# Составить IA-инвентаризацию контента

## Когда использовать

После `docs/ia/page-section-map.md`, до IA review, design system, page spec и реализации.

## Роль Codex

Ты действуешь как content strategist, project editor и risk-aware information architect.

## Цель

Создать `docs/ia/content-inventory.md`: карту доступного, недостающего и рискованного контента по страницам и секциям. Документ должен защищать проект от выдуманных фактов и помогать понять, какие материалы нужны до дизайна и верстки.

## Контекст, который нужно дать

- `docs/ia/sitemap.md`.
- `docs/ia/page-section-map.md`.
- `project-brief.md`.
- `docs/strategy.md`.
- `docs/messaging.md`.
- `docs/research/research-summary.md`.
- `docs/materials-index.md`, если есть.
- Исходные тексты, фото, видео, логотипы, кейсы, отзывы, сертификаты, прайсы, документы.
- Юридические, медицинские, финансовые или отраслевые ограничения, если есть.
- `docs/open-questions.md`, если есть.
- `docs/project-state.md`, если есть.

## Ограничения

- Не придумывай реальные отзывы, кейсы, цифры, сертификаты, лицензии, гарантии, цены и юридические формулировки.
- Не принимай placeholder за факт.
- Не пиши финальные тексты всех секций.
- Не меняй структуру страниц без явной причины. Если структура кажется слабой, зафиксируй риск для IA review.
- Placeholder допустим только там, где он безопасен: нейтральные подписи, временные заголовки, технические labels.
- Для claims с риском используй статус `risky`, а не сглаживай формулировку до уверенного факта.

## Процесс

1. Пройди по `docs/ia/page-section-map.md` постранично и посекционно.
2. Для каждой секции определи, какой контент требуется: текст, proof, media, product data, legal, FAQ, pricing, integrations.
3. Найди, что уже есть в материалах и документах.
4. Раздели контент на `available`, `missing`, `risky`, `placeholder-safe`.
5. Для каждого missing/risky пункта зафиксируй вопрос, владельца решения и влияние на дизайн/реализацию.
6. Обнови или создай `docs/open-questions.md` с критичными вопросами.
7. Создай или обнови `docs/ia/content-inventory.md`.
8. Обнови `docs/project-state.md`: отметь `Content inventory created` и укажи следующий промпт.

## Output

Создай или обнови `docs/ia/content-inventory.md` в формате:

```md
# Content Inventory

## Source context

- Section map:
- Materials index:
- Open questions:

## Inventory

| Page | Section | Content item | Type | Status | Source | Owner/decision needed | Risk | Placeholder allowed | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

## Available content

## Missing content

## Risky claims

## Placeholder-safe items

## Questions to add to docs/open-questions.md
```

В ответе кратко покажи:

- какие материалы уже готовы;
- какие пробелы критичны;
- какие claims нельзя использовать без подтверждения;
- следующий промпт по router.

## Done when

- Контентные пробелы видны по страницам и секциям.
- Рискованные claims отделены от подтвержденных фактов.
- Placeholder не может случайно выглядеть как реальный факт.
- `docs/open-questions.md` создан или обновлен, если есть вопросы.
- `docs/project-state.md` обновлен.
- Можно запускать IA review.

## Follow-up

Следующий промпт: `prompts/04-information-architecture/04-ia-review.md`.

Перед следующим шагом сверься с `prompts/ROUTER.md`: если есть критичные missing/risky пункты, IA review должен решить, можно ли идти дальше или надо вернуться к sitemap/section map/content gathering.
