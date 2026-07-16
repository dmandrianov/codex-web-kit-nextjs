# Составить спецификацию страницы

## Когда использовать

После `docs/pages/[page-slug]/page-scope.md`, перед content/SEO plan, block breakdown и реализацией.

## Роль Codex

Ты действуешь как UX designer, content strategist и frontend planner.

## Цель

Создать `docs/pages/[page-slug]/page-spec.md`: спецификацию одной страницы, которая связывает IA, content inventory, design system, Next.js route и пользовательскую задачу в проверяемый план страницы.

## Контекст, который нужно дать

- `docs/pages/[page-slug]/page-scope.md`.
- `docs/ia/page-section-map.md`.
- `docs/ia/content-inventory.md`.
- `docs/design-system/design-direction.md`.
- `docs/design-system/visual-north-star.md`.
- `docs/design-system/design-tokens.md`.
- `docs/design-system/iconography.md`.
- `docs/design-system/layout-rules.md`.
- `docs/design-system/component-inventory.md`.
- `docs/design-system/accessibility.md`.
- `docs/content/editorial-rules.md`, если есть.
- `prompts/_guidelines/anti-ai-slop-design-and-copy.md`.
- 4–6 релевантных UI criteria, выбранных по `prompts/_guidelines/creator-critic-design-workflow.md`; не загружай полную базу в planning artifact.
- `prompts/_guidelines/page-composition-rhythm.md`.
- `docs/nextjs/app-router-structure.md`.
- Шаблон `prompts/_templates/page-spec-template.md`.
- Reference screenshots, если есть.
- E-commerce artifacts, если страница e-commerce.

## Ограничения

- Специфицируй одну страницу за раз.
- Не верстай страницу.
- Не создавай block specs в этом промпте.
- Не добавляй секции без связи с IA, user task или conversion goal.
- Не пиши полный финальный copywriting, если задача только в спецификации.
- Не планируй текстовые простыни для обычных блоков без явной причины.
- Не выдумывай отзывы, цифры, гарантии, цены, юридические условия и product data.
- Не копируй reference screenshot 1:1: извлекай смысл, UX-паттерн и состав блока, затем адаптируй под design system.
- Не планируй страницу как набор одинаковых секций. Уже на page spec уровне должна быть понятна смысловая лестница и примерный ритм.
- Не превращай page spec в каталог запретов. Truth, accessibility и semantic token roles остаются hard boundaries; один purposeful expressive opportunity может быть помечен provisional для проверки после render.
- Не фиксируй детальный layout каждого блока и не превращай visual pattern budget в квоты. Page spec задаёт общий курс, смысловой ритм и зоны свободы; финальную композицию Codex выбирает при build и проверяет по screenshots.

## Процесс

1. Проверь page scope и route.
2. Сверь страницу с IA section map и content inventory.
3. Определи primary user task, business goal, conversion goal и success criteria.
4. Составь список секций с назначением, входными данными, text density, CTA, proof и рисками.
5. Составь page story: что человек узнаёт на каждом шаге и почему следующий блок нужен.
6. Наметь composition roles, continuity anchors и примерные visual opportunities без детальной верстки. Для каждого блока оставь `composition freedom`: что Codex вправе решить во время build.
7. Для marketing/editorial страницы собери главы по 2–4 соседних блока: story arc, акцент/пауза/proof, shared spines и допустимые узкие corrections после full-page eyes-check. Product/business logic scopes отметь как one-block strict.
8. Для каждого блока запиши 4–6 релевантных creator directions вместо полного UI checklist. Полный стандарт применяется после render в quality.
9. Наследуй reference viewport, canvas roles/caps и expansion zones из `layout-rules.md`; отметь секции с режимом `wide/full-bleed` и их failure risks на `1920 / 2560 / 3840 CSS px` без фиксации финальной сетки блока.
10. Перенеси First-render Responsive Delivery Contract: CSS-first initial geometry, SSR/first-client invariant, justified measured exceptions, reserved media geometry, responsive asset sizing и font/loading stability.
11. Отметь reference screenshots и укажи, какие секции или блоки они могут усилить.
12. Зафиксируй Visual North Star, approved evidence, semantic tokens, iconography, components и accessibility.
13. Зафиксируй Next.js route/files expectations без реализации.
14. Создай или обнови `docs/pages/[page-slug]/page-spec.md`.
15. Обнови `docs/project-state.md`: отметь `Page specs created` и укажи следующий промпт.

## Output

Создай или обнови `docs/pages/[page-slug]/page-spec.md` по шаблону `prompts/_templates/page-spec-template.md`.

В ответе кратко покажи:

- цель страницы;
- список секций;
- контентные и design-system риски;
- reference screenshots, если есть;
- следующий промпт по router.

## Done when

- Описана ровно одна страница.
- Route и секции связаны с IA.
- Есть список секций и цель каждой секции.
- Есть page story: понятно, что нового даёт каждая секция и как она ведёт к следующей.
- Намечены composition roles и нет очевидной серии одинаковых блоков.
- Страница сохраняет Visual North Star, но block layouts не заморожены заранее.
- У блоков есть короткие creator directions; полный checklist не перенесён в pre-render planning.
- Marketing chapters и product/business strict scopes названы.
- Страница наследует Desktop Canvas Contract; wide/full-bleed sections и их expansion zones названы, а core composition не оставлена на бесконтрольное растяжение.
- Страница наследует First-render Responsive Delivery Contract; specs не планируют post-mount layout swap и называют media/measured geometry risks.
- Для секций понятен допустимый объём текста.
- Reference screenshots превращены в требования, а не в инструкцию копировать.
- Понятно, какие материалы нужны для реализации.
- `docs/project-state.md` обновлен.

## Follow-up

Если есть reference screenshot для конкретного блока, следующий промпт: `prompts/07-page-planning/03-adapt-reference-to-block-spec.md`.

Если reference screenshots нет или они уже разобраны, следующий промпт: `prompts/07-page-planning/04-content-and-seo-plan.md`.
