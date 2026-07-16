# Выбрать страницу и зафиксировать scope

## Когда использовать

После `docs/nextjs/next-ready-review.md` со статусом `Next ready`, когда нужно спланировать одну конкретную страницу перед реализацией.

## Роль Codex

Ты действуешь как UX planner, product editor и frontend scope manager.

## Цель

Создать `docs/pages/[page-slug]/page-scope.md`: зафиксировать ровно одну страницу, её route, источники, цель, ограничения и готовность входных данных, чтобы Codex не начал проектировать или верстать весь сайт сразу.

## Контекст, который нужно дать

- `docs/nextjs/next-ready-review.md`.
- `docs/ia/sitemap.md`.
- `docs/ia/page-section-map.md`.
- `docs/ia/content-inventory.md`.
- `docs/design-system/design-system-review.md`.
- `docs/design-system/layout-rules.md`.
- `docs/design-system/component-inventory.md`.
- `docs/project-state.md`, если есть.
- Пользовательский запрос: какую страницу он хочет делать.
- Reference screenshots, если пользователь прислал их для страницы или блока.
- E-commerce artifacts, если страница относится к каталогу, PDP, корзине, checkout или аккаунту.

## Ограничения

- Выбери ровно одну страницу.
- Не создавай page spec, block specs или код в этом промпте.
- Не меняй sitemap без явной причины. Если страница отсутствует в IA, зафиксируй gap и предложи вернуться в IA.
- Не принимай скриншот блока как команду копировать чужой дизайн.
- Если задача явно про визуальное качество страницы или UI, учитывай `prompts/_knowledge/ui-design-quality.md` уже при выборе scope: лучше выбрать один проблемный блок/экран, чем распылиться на всю страницу.
- Не переходи к реализации, даже если пользователь просит "сверстай страницу".
- Для e-commerce страниц не пропускай артефакты `prompts/11-ecommerce/`.

## Процесс

1. Определи, какую страницу хочет пользователь: route, название, тип, источник в sitemap.
2. Проверь, есть ли эта страница в `docs/ia/sitemap.md` и `docs/ia/page-section-map.md`.
3. Проверь, есть ли контентные риски в `docs/ia/content-inventory.md`.
4. Проверь, готов ли Next.js foundation и design system.
5. Если пользователь прислал screenshot/reference, привяжи его к странице или потенциальному блоку.
6. Для e-commerce страницы проверь, какие `11-ecommerce` документы нужны до page spec.
7. Создай или обнови `docs/pages/[page-slug]/page-scope.md`.
8. Обнови `docs/project-state.md`: отметь `Page scope selected` и укажи следующий промпт.

## Output

Создай или обнови `docs/pages/[page-slug]/page-scope.md` в формате:

```md
# Page Scope: [Page name]

## Page identity

- Page:
- Route:
- Page type:
- Source in sitemap:
- Status:

## Goal

## Audience

## Source artifacts

| Artifact | Status | Notes |
| --- | --- | --- |

## Scope boundaries

### In scope

### Out of scope

## References

| Reference | Applies to | How to use | Do not copy |
| --- | --- | --- | --- |

## Content and data readiness

## Ecommerce requirements

## Open questions

## Next prompt
```

В ответе кратко покажи:

- выбранную страницу и route;
- что входит и не входит в scope;
- какие входные данные отсутствуют;
- следующий промпт по router.

## Done when

- Выбрана ровно одна страница.
- Route и источник в sitemap понятны.
- Scope не включает соседние страницы и будущие блоки вне задачи.
- References привязаны к странице или будущим блокам без копирования.
- E-commerce зависимости проверены.
- `docs/project-state.md` обновлен.

## Follow-up

Следующий промпт: `prompts/07-page-planning/02-page-spec.md`.

Перед следующим шагом сверься с `prompts/ROUTER.md`: если страница не готова по IA, e-commerce или Next.js foundation, сначала закрой этот gap.
