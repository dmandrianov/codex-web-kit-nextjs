# Настроить структуру App Router

## Когда использовать

После готового scaffold, до styling integration, UI-компонентов и реализации страниц.

## Роль Codex

Ты действуешь как Next.js App Router architect и information-architecture-aware frontend lead.

## Цель

Создать `docs/nextjs/app-router-structure.md` и подготовить структуру `src/app`, layouts, route groups, metadata placeholders и папки проекта на основе `docs/ia/sitemap.md`, без преждевременной верстки страниц.

## Контекст, который нужно дать

- `docs/nextjs/scaffold.md`.
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

## Процесс

1. Сопоставь `docs/ia/sitemap.md` с App Router routes.
2. Определи, нужны ли route groups: `(marketing)`, `(shop)`, `(checkout)`, `(account)`, `(legal)` или другие.
3. Определи layout boundaries: root layout, section layouts, checkout/account layouts.
4. Зафиксируй server/client boundaries для First-render Responsive Delivery Contract: initial route structure и canvas остаются server-first; client components локальны и не выбирают основную mobile/desktop/wide геометрию после mount.
5. Подготовь структуру `src/app` и папки `src/components`, `src/sections`, `src/lib`, `src/styles`, `src/assets` или локальный эквивалент.
6. Добавь metadata placeholders там, где это нужно, но не пиши финальное SEO.
7. Добавь `not-found`, `loading`, `error` только если это уместно для текущего этапа.
8. Создай или обнови `docs/nextjs/app-router-structure.md`.
9. Обнови `docs/project-state.md`: отметь `App Router structure ready` и укажи следующий промпт.

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
- Временные placeholders явно помечены.
- `docs/project-state.md` обновлен.

## Follow-up

Следующий промпт: `prompts/06-nextjs-setup/04-styling-and-design-system-integration.md`.

Перед следующим шагом сверься с `prompts/ROUTER.md`: если route map не связан с sitemap, исправь структуру до styling integration.
