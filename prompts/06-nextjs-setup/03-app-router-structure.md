# Настроить структуру App Router

## Когда использовать

После готового scaffold, до styling integration, UI-компонентов и реализации страниц.

## Роль Codex

Ты действуешь как Next.js App Router architect и information-architecture-aware frontend lead.

## Цель

Создать `docs/nextjs/app-router-structure.md` и подготовить структуру `src/app`, layouts, route groups, metadata placeholders и папки проекта на основе `docs/ia/sitemap.md`, без преждевременной верстки страниц.

## Контекст, который нужно дать

- `docs/nextjs/scaffold.md`.
- `docs/nextjs/technical-architecture.md`.
- `docs/ia/sitemap.md`.
- `docs/ia/page-section-map.md`.
- `docs/design-system/layout-rules.md`.
- `docs/project-state.md`.
- Текущая структура `src/app`.
- Page specs, если уже есть.
- E-commerce artifacts, если проект магазин.

## Ограничения

- Не верстай финальные блоки страниц.
- Не создавай маршруты без связи с sitemap.
- Не смешивай route files и общие компоненты без понятной структуры.
- Не переносись в page planning.
- Placeholder-страницы допустимы только для проверки маршрута и должны быть явно временными.
- Не создавай route groups ради красоты, только если они упрощают layouts, public/private зоны, marketing/app разделы или e-commerce сценарии.
- Не превращай root/section layout в client component ради чтения viewport. Server Components остаются default, а client boundaries добавляются только вокруг реального interaction/browser API.
- Не импортируй server-only modules, secrets или privileged provider SDK в Client Component tree.
- Не вызывай собственный Route Handler из Server Component вместо прямого обращения к source adapter.
- Не считай скрытый UI авторизацией: каждый Server Action и Route Handler проверяет доступ самостоятельно.

## Процесс

1. Сопоставь `docs/ia/sitemap.md` с App Router routes.
2. Определи, нужны ли route groups: `(marketing)`, `(shop)`, `(checkout)`, `(account)`, `(legal)` или другие.
3. Определи layout boundaries: root layout, section layouts, checkout/account layouts.
4. Зафиксируй server/client boundaries: initial route structure остаётся server-first; client components локальны, получают сериализуемые props и не выбирают основную mobile/desktop/wide геометрию после mount.
5. Сопоставь sources of truth с server-only adapters/DAL, внутренними DTO/view models и feature boundaries. Provider schema не должна напрямую становиться API всех UI-компонентов.
6. Для каждого Route Handler и Server Action из technical architecture зафиксируй authentication, authorization, validation, retry/duplicate behavior и owner module.
7. Подготовь структуру `src/app` и route-local/shared/feature/server folders без premature universal library.
8. Добавь metadata placeholders там, где это нужно, но не пиши финальное SEO.
9. Добавь `not-found`, `loading`, `error` только если это уместно для текущего этапа.
10. Создай или обнови `docs/nextjs/app-router-structure.md`.
11. Обнови `docs/project-state.md`: отметь `App Router structure ready` и укажи следующий промпт.

## Output

Создай или обнови `docs/nextjs/app-router-structure.md` в формате:

```md
# App Router Structure

## Route map

| Sitemap page | Route | Route group | Layout | Status | Notes |
| --- | --- | --- | --- | --- | --- |

## Folder structure

## Layout boundaries

## Server and client boundaries

## Module and component ownership

| Area | Route-local UI | Shared UI | Feature/domain | Server adapter/DAL |
| --- | --- | --- | --- | --- |

## Actions and Route Handlers

| Boundary | Purpose | Validation/auth | Duplicate/retry | Owner module |
| --- | --- | --- | --- | --- |

## Metadata placeholders

## Temporary placeholders

## Open questions
```

В ответе кратко покажи:

- route map;
- созданные папки;
- временные placeholders;
- следующий промпт по router.

## Done when

- Структура App Router соответствует sitemap.
- Общие компоненты, sections, styles, lib и assets лежат в понятных местах.
- Нет преждевременной реализации дизайна.
- First-render Responsive Delivery Contract поддержан: initial layout остаётся server-first; client boundaries не используются для post-mount выбора canvas.
- Client boundaries минимальны, props сериализуемы, server-only code не попадает в browser graph.
- Server Components обращаются к source adapters напрямую, а не через собственный HTTP endpoint.
- Actions и Route Handlers имеют server-side validation и authorization rules.
- Route-local, shared, feature/domain и integration ownership различены без преждевременной абстракции.
- Временные placeholders явно помечены.
- `docs/project-state.md` обновлен.

## Follow-up

Следующий промпт: `prompts/06-nextjs-setup/04-styling-and-design-system-integration.md`.

Перед следующим шагом сверься с `prompts/ROUTER.md`: если route map не связан с sitemap, исправь структуру до styling integration.
