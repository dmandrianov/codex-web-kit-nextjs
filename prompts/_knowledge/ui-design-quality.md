# UI design quality: диспетчер

Этот файл помогает выбрать только ту часть UI-стандарта, которая нужна текущей задаче. Он сохраняет прежний canonical path, но больше не содержит всю reference base целиком.

## Контракт загрузки

1. До первого render прочитай этот диспетчер и не более двух профильных модулей.
2. Creator получает Visual North Star, approved evidence, реальные assets, применимую основу design system и 4–6 правил из выбранных модулей.
3. Не загружай до render `critic-quality.md`, `examples.md` и все модули подряд.
4. После render critic читает `critic-quality.md` и максимум один модуль поверхности, где найден главный риск.
5. Полный compliance остаётся quality stage или явно запрошенному полному аудиту. На нём открывай только применимые модули, при необходимости последовательно.
6. Truth, accessibility, permissions, security и responsive first-frame safety обязательны независимо от выбранного модуля.

## Модули

| Модуль | Когда открывать |
| --- | --- |
| `prompts/_knowledge/ui-quality/foundation-hierarchy.md` | Базовые принципы, hierarchy, content priority и общий quality bar. |
| `prompts/_knowledge/ui-quality/layout-spacing.md` | Композиция страницы, grid, containers, sections, density, spacing и rhythm. |
| `prompts/_knowledge/ui-quality/visual-language.md` | Typography, color, contrast, depth, borders, radius, cards и containers. |
| `prompts/_knowledge/ui-quality/controls-forms-data.md` | Buttons, CTA, controls, forms, lists, tables, dashboard и dense UI. |
| `prompts/_knowledge/ui-quality/marketing-commerce.md` | Hero, pricing, trust, feature, product и e-commerce surfaces. |
| `prompts/_knowledge/ui-quality/responsive-media.md` | Responsive behavior, viewports, media sizing и stable geometry. |
| `prompts/_knowledge/ui-quality/critic-quality.md` | Post-render critic, anti-patterns, review checklist и полный `UI quality check`. |
| `prompts/_knowledge/ui-quality/examples.md` | Before/after examples, только когда конкретный пример помогает решению. |

Категория foundation физически разделена на `foundation-hierarchy.md` и `layout-spacing.md`, чтобы каждый reference-модуль оставался меньше `40 КБ`.

## Быстрый выбор

| Задача | Минимальная загрузка после диспетчера |
| --- | --- |
| Новый marketing block | `marketing-commerce.md` + один из `layout-spacing.md` / `visual-language.md`. |
| Форма, checkout, control или business UI | `controls-forms-data.md` + при необходимости `responsive-media.md`. |
| Локальная UI-правка | Один модуль, прямо связанный с дефектом. |
| Responsive/media fix | `responsive-media.md` + максимум один модуль поверхности. |
| Concept creator | `foundation-hierarchy.md` + один модуль главного visual lever. |
| Critic после render | `critic-quality.md` + максимум один профильный модуль. |
| Полный quality pass | `critic-quality.md`, затем только применимые профильные модули. |

Если выбор неоднозначен, сначала определи поверхность и риск задачи. `prompts/INDEX.md` открывай только если после этого всё ещё непонятен маршрут.
