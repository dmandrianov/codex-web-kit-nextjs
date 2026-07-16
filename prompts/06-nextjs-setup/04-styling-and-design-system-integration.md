# Интегрировать styling и дизайн-систему

## Когда использовать

После структуры App Router, до tooling review, page planning и реализации блоков.

## Роль Codex

Ты действуешь как frontend design systems engineer и CSS architecture reviewer.

## Цель

Создать `docs/nextjs/styling-integration.md` и подготовить технический слой для дизайн-системы: global styles, CSS variables или Tailwind mapping, базовую типографику, token hooks, reusable canvas/container primitives, CSS-first initial responsive geometry, iconography integration notes и структуру файлов без верстки UI-блоков.

## Контекст, который нужно дать

- `docs/design-system/design-tokens.md`.
- `docs/design-system/iconography.md`.
- `docs/design-system/layout-rules.md`.
- `docs/design-system/component-inventory.md`.
- `docs/design-system/accessibility.md`.
- `docs/nextjs/app-router-structure.md`.
- Текущий CSS-подход проекта.
- `src/app/globals.css`, Tailwind config или CSS modules, если есть.

## Ограничения

- Не реализуй реальные блоки страниц.
- Не создавай полный UI kit в этом промпте.
- Не добавляй styling library без явной причины.
- Не перетаскивай всю дизайн-систему в код, если достаточно foundation.
- Не ломай существующий CSS.
- Не используй цвета, spacing или typography вне design tokens без причины.
- Не добавляй icon package без связи с `docs/design-system/iconography.md`.
- Не добавляй шрифты или внешние assets без подтверждения, если это влияет на загрузку или лицензии.
- Не оставляй будущим блокам локальный подбор `max-width`: shared canvas roles из `layout-rules.md` должны иметь один технический способ применения.
- Не реализуй desktop canvas через global `zoom`, `transform: scale(...)` или неограниченные `vw`/`vh` values.
- Не определяй core responsive layout через `window.innerWidth`, `matchMedia`, mount state, `useEffect`/`useLayoutEffect` или resize listener. Эти API допустимы для QA или interaction, но не для initial canvas geometry.
- Не дублируй полные mobile/desktop DOM trees только ради последующего скрытия одной версии.

## Процесс

1. Определи текущий styling approach: CSS variables, Tailwind, CSS modules, global CSS, UI library.
2. Подготовь базовые token bindings: colors, typography, spacing, radius, shadows, focus.
3. Настрой `globals.css` или эквивалент: reset/base, body styles, CSS variables, focus-visible, reduced motion.
4. Реализуй reusable viewport stage и canvas/container roles из `layout-rules.md`: reference/content/wide caps, reading width, full-bleed behavior и bounded inline gutters через CSS variables, utilities или layout primitives.
5. Проверь, что foundation выражает режимы `hold / extend / recompose`, не заставляя каждый блок заново подбирать width behavior.
6. Реализуй First-render Responsive Delivery Contract: critical canvas styles доступны с initial route, CSS media/container queries выбирают layout до hydration, а server HTML и first client render сохраняют одну semantic structure.
7. Подготовь media foundation: reserved geometry, crop/focal hooks и responsive source sizing под rendered width. Не назначай всем слотам максимальный 4K asset или раннюю загрузку.
8. Подключай только нужные font families/weights и исключи late external stylesheet, который меняет line breaks или canvas geometry после первого кадра.
9. Для measured surfaces опиши justified exception и заранее зарезервируй outer geometry.
10. Подготовь структуру `src/styles` или локальный эквивалент, если она нужна.
11. Добавь base typography classes или правила только если это соответствует project style.
12. Подготовь icon implementation notes: package name, import style, base size/color classes или wrapper component, если он нужен.
13. Для e-commerce подготовь semantic hooks для price, sale, stock, rating, checkout status.
14. Создай или обнови `docs/nextjs/styling-integration.md`.
15. Обнови `docs/project-state.md`: отметь `Styling integrated`, `Desktop canvas foundation integrated`, `CSS-first responsive foundation integrated` и укажи следующий промпт.

## Output

Создай или обнови `docs/nextjs/styling-integration.md` в формате:

```md
# Styling and Design System Integration

## Styling approach

## Token implementation

| Design token | Code token/CSS variable | Usage |
| --- | --- | --- |

## Global styles

## Canvas and container implementation

| Layout role | CSS variable / utility / primitive | Cap / gutter behavior | Wide-screen mode |
| --- | --- | --- | --- |

## Desktop canvas verification

- Reference CSS viewport:
- Wide guard viewport:
- Global scaling used: no
- Notes:

## First-render responsive delivery

- Initial layout source: CSS
- Critical canvas styles available with initial route:
- SSR / first client render invariant:
- JavaScript viewport dependency: none / justified exception
- Reserved media / measured-surface geometry:
- Responsive asset sizing and loading roles:
- Font/loading stability:
- Post-mount canvas correction: none

## Typography base

## Iconography integration

## Accessibility base styles

## Ecommerce styling hooks

## Files changed

## Open questions
```

В ответе кратко покажи:

- выбранный styling approach;
- какие tokens подключены;
- как подключается iconography;
- какие файлы изменены;
- следующий промпт по router.

## Done when

- Design tokens имеют технический способ применения.
- Desktop Canvas Contract имеет shared implementation для stage, reading/content/wide/full-bleed roles; блоки не подбирают caps локально.
- Foundation не использует global scale/zoom и не растягивает core typography, controls или spacing бесконечно после reference cap.
- Initial mobile/desktop/wide geometry определяется CSS до первого кадра; нет post-mount viewport branch или canvas correction.
- Media/measured surfaces резервируют место, responsive sources соответствуют rendered width, а font loading не перестраивает canvas.
- Iconography имеет технический способ применения или явно отложена до компонента.
- Base styles не заменяют будущую реализацию блоков.
- Focus, readable text и reduced motion учтены на foundation уровне.
- E-commerce semantic hooks есть, если проект магазин.
- `docs/project-state.md` обновлен.

## Follow-up

Следующий промпт: `prompts/06-nextjs-setup/05-tooling-and-quality-scripts.md`.

Перед следующим шагом сверься с `prompts/ROUTER.md`: если styling foundation конфликтует с design tokens, исправь его до tooling review.
