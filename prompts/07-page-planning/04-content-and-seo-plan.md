# Составить content и SEO plan страницы

## Когда использовать

После page spec и после reference adaptation, если она нужна, до block breakdown.

## Роль Codex

Ты действуешь как SEO-aware content strategist, UX writer и fact-checking editor.

## Цель

Создать `docs/pages/[page-slug]/content-seo-plan.md`: план контента, headings, CTA, proof, metadata, internal links и structured data notes для одной страницы без выдумывания фактов.

## Контекст, который нужно дать

- `docs/pages/[page-slug]/page-spec.md`.
- `docs/pages/[page-slug]/references/*.md`, если есть.
- `docs/ia/content-inventory.md`.
- `docs/strategy.md`.
- `docs/messaging.md`.
- `docs/content/editorial-rules.md`, если есть.
- `prompts/_guidelines/anti-ai-slop-design-and-copy.md`.
- `prompts/_guidelines/landing-copy-formulas.md`.
- `prompts/_knowledge/site-copy-quality.md`.
- 4–6 релевантных UI criteria только для content-heavy blocks; полный UI standard остаётся post-render quality.
- `docs/research/audience-insights.md`.
- `docs/design-system/accessibility.md`.
- Existing content/materials.
- E-commerce artifacts, если страница e-commerce.

## Ограничения

- Не пиши финальный длинный copywriting всех блоков.
- Не превращай обычные блоки в длинные текстовые простыни. Для каждого блока зафиксируй text density budget.
- Не выдумывай факты, цифры, отзывы, гарантии, цены, legal claims, product data.
- Не делай keyword stuffing.
- Не меняй структуру страницы без причины.
- Не создавай full SEO strategy для всего сайта.
- Не верстай страницу и не создавай block specs.
- Не планируй heading/CTA/lead, которые не проходят базовый `Site copy check`: нет пользы/снятия риска, есть пустые фразы, неподтверждённый claim или неясное действие.

## Процесс

1. Пройди по секциям page spec.
2. Для каждой секции зафиксируй content intent, user question, draft heading direction, site copy notes, CTA intent, proof/data needed, source и text density budget. Copy formula указывай только как fallback для конкретной диагностированной проблемы.
3. Добавь UI notes там, где content shape влияет на дизайн: hero, pricing, offer, forms, tables, product cards, dashboard snippets, checkout, CTA bands.
4. Отметь, где можно использовать placeholder-safe copy, а где нужны подтверждённые факты.
5. Составь metadata plan: title, description, OG notes.
6. Составь heading plan: H1/H2/H3 без финального copy overload.
7. Добавь internal links и structured data notes, если уместно.
8. Для e-commerce добавь product/category SEO, availability/price/review constraints без выдуманных данных.
9. Создай или обнови `docs/pages/[page-slug]/content-seo-plan.md`.
10. Обнови `docs/project-state.md`: отметь `Content and SEO plan created` и укажи следующий промпт.

## Output

Создай или обнови `docs/pages/[page-slug]/content-seo-plan.md` в формате:

```md
# Content and SEO Plan: [Page name]

## Content principles

## Section content plan

| Section | User question | Content intent | Heading direction | Formula fallback, if needed | Text density budget | CTA intent | Proof/data needed | Source | Risk |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

## Site copy rules for this page

## UI notes for content-heavy blocks

## Metadata plan

## Heading structure

## Internal links

## Structured data notes

## Placeholder-safe copy

## Copy length limits

## Facts that need confirmation

## Open questions
```

В ответе кратко покажи:

- H1/metadata direction;
- главные content gaps;
- что нельзя выдумывать;
- следующий промпт по router.

## Done when

- Контентные требования понятны по каждой секции.
- Для каждой секции понятен допустимый объём текста.
- Для каждой секции есть site copy notes: польза/снятие риска, claims, мусорные и слабые формулировки, proof/data gaps.
- Для hero, pricing, forms, tables, product/dense UI и CTA blocks есть UI notes, чтобы текст не ломал hierarchy, spacing и responsive.
- SEO план не конфликтует с IA и page spec.
- Рискованные claims отмечены.
- Понятно, какие тексты можно писать в block build, а какие требуют подтверждения.
- План различает content locks (meaning/facts/claims/voice/action) и гибкие до render exact wording/line breaks/final length.
- Copy formula не является обязательным полем без диагностированной проблемы.
- `docs/project-state.md` обновлен.

## Follow-up

Следующий промпт: `prompts/07-page-planning/05-block-breakdown.md`.

Перед следующим шагом сверься с `prompts/ROUTER.md`: если есть critical content gaps, не превращай их в выдуманный copy.
