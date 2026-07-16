# Создать IA-карту секций страниц

## Когда использовать

После `docs/ia/sitemap.md`, до инвентаризации контента, design system, page spec и кода.

## Роль Codex

Ты действуешь как UX architect и content strategist.

## Цель

Создать `docs/ia/page-section-map.md`: IA-карту ключевых страниц, где каждая секция отвечает на понятный пользовательский вопрос, поддерживает бизнес-цель и имеет входные требования по контенту, CTA и доказательствам.

## Контекст, который нужно дать

- `docs/ia/sitemap.md`.
- `project-brief.md`.
- `docs/strategy.md`.
- `docs/messaging.md`.
- `docs/research/research-summary.md`.
- `docs/research/audience-insights.md`.
- `docs/research/competitors.md`, если есть.
- `docs/project-state.md`, если есть.
- Для интернет-магазина: e-commerce artifacts из `prompts/11-ecommerce/`, если страница относится к каталогу, PDP, корзине или checkout.

## Ограничения

- Не пиши финальный copywriting для всех блоков.
- Не выбирай финальные цвета, шрифты, компоненты, анимации или layout.
- Не делай page spec для реализации. Этот документ только про IA и содержание.
- Не проектируй целую страницу как один большой блок. Каждая секция должна иметь отдельную задачу.
- Не добавляй секции "для красоты" без пользовательского вопроса или бизнес-цели.
- Не выдумывай отзывы, цифры, кейсы и юридические утверждения.

## Процесс

1. Проверь `docs/ia/sitemap.md` и выбери страницы, которые нужно разобрать сейчас.
2. Для каждой страницы зафиксируй primary purpose и основной сценарий пользователя.
3. Разложи страницу на секции в порядке принятия решения: понять -> доверять -> сравнить -> выбрать -> действовать.
4. Для каждой секции укажи user question, business goal, content needed, CTA, proof и source/dependency.
5. Отметь секции, которые можно отложить без потери основного сценария.
6. Отдельно пометь риски: нет доказательств, неясный оффер, слишком много CTA, конфликт с research.
7. Создай или обнови `docs/ia/page-section-map.md`.
8. Обнови `docs/project-state.md`: отметь `Section map created` и укажи следующий промпт.

## Output

Создай или обнови `docs/ia/page-section-map.md` в формате:

```md
# Page Section Map

## Scope

- Pages covered:
- Pages deferred:
- Source sitemap:

## Page maps

### [Page name]

Purpose:
Primary audience:
Primary conversion:

| Order | Section | User question | Business goal | Content needed | CTA | Proof/trust | Source/dependency | Risk | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

## Cross-page notes

## Risks and open questions
```

В ответе кратко покажи:

- какие страницы разобраны;
- какие секции критичны;
- где есть контентные риски;
- следующий промпт по router.

## Done when

- Каждая ключевая страница разбита на секции.
- У каждой секции есть user question и business goal.
- CTA не висят в воздухе, а связаны с offer/messaging.
- Trust blocks имеют источник доказательств или помечены как риск.
- Понятно, какого контента не хватает для следующего шага.
- `docs/project-state.md` обновлен.

## Follow-up

Следующий промпт: `prompts/04-information-architecture/03-content-inventory.md`.

Перед следующим шагом сверься с `prompts/ROUTER.md`: если карта секций выявила спорную страницу или критичный пробел, сначала обнови sitemap или open questions.
