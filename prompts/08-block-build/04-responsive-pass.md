# Провести адаптивный проход по одному блоку

## Когда использовать

После structure/styling pass одного блока, если нужно проверить и улучшить mobile, tablet, desktop и wide поведение.

## Роль Codex

Ты действуешь как frontend engineer, специализирующийся на responsive UI.

## Цель

Проверить и улучшить адаптив одного блока без изменения его смысла и соседних секций. Не превращай responsive pass в адаптацию всей страницы.

## Контекст, который нужно дать

- Build plan.
- Block spec.
- Реализованный блок.
- Design tokens, layout rules и breakpoints.
- `prompts/_knowledge/ui-design-quality.md`.
- Скриншоты mobile/tablet/reference-desktop/wide, если есть.
- URL локального сервера, если проект запущен.

## Ограничения

- Работай только с указанным блоком.
- Если видишь проблемы соседних блоков, зафиксируй их как отдельные задачи, но не исправляй в этом проходе.
- Не меняй контентную структуру без причины.
- Не трогай глобальные стили, если проблему можно решить локально.
- Не исправляй весь сайт.
- Не скрывай переполнение уменьшением шрифта через viewport units.
- Не масштабируй весь блок через `transform`/`zoom` и не лечи wide stretch локальными случайными `max-width`, если проблема в shared Desktop Canvas Contract.
- Не исправляй responsive geometry после mount через `window.innerWidth`, `matchMedia`, effect/mount state или resize listener; core layout должен выбрать CSS до первого кадра.

## Процесс

1. До navigation или fresh reload задай viewport. Проверь блок на mobile/tablet; для этого deep responsive pass обязательны `1440x900 / 1920x1080 / 2560x1440 CSS px`. `3840x2160 CSS px` обязателен для true-4K/full-bleed/ultrawide target, иначе зафиксируй reasoned skip. Фиксируй фактический CSS viewport, а не физическое разрешение экрана.
2. Сравни early frame с settled state и найди переполнения, наложения, горизонтальный скролл, canvas-level snap, layout shifts и проблемы читаемости.
3. Проверь, что mobile layout сохраняет hierarchy, main action, text order, card/list grouping, form/table usability и не превращает блок в однообразную простыню.
4. Проверь Desktop Canvas Contract: связанные колонки не расходятся, line length/controls/cards/core gaps не растягиваются, focal point не теряет вес, first-viewport height не становится случайной, full-bleed и expansion zones ведут себя по `layout-rules.md`.
5. Проверь stable dimensions для cards, controls, images и media; запиши reserved geometry, rendered CSS size, selected resource/natural size и loading role для критичного media.
6. Найди viewport-dependent render branches. `window.innerWidth`/`matchMedia` оставляй только для QA или поведения, которое не определяет initial geometry; measured exception резервирует outer box заранее.
7. Проверь font loading: fallback и загруженный font не должны менять line breaks так, чтобы canvas заметно перестраивался.
8. Исправь адаптивные стили только в рамках блока. Если дефект системный, не маскируй его local canvas и не меняй shared primitive в этом узком проходе: зафиксируй blocker/follow-up и route к `prompts/06-nextjs-setup/04-styling-and-design-system-integration.md` или `prompts/05-design-system/09-layout-and-responsive-rules.md`. Shared primitive можно менять только после явного расширения scope и с regression-check всех затронутых consumers.
9. Проверь, что reference desktop не ухудшился.
10. Зафиксируй результаты, first-frame verdict, canvas invariants и оставшиеся viewport risks.
11. Обнови `docs/project-state.md`: отметь `Current block responsive checked`, `Current block wide canvas checked`, `Current block first frame checked after fresh reload` и укажи следующий промпт.

## Output

Список исправлений, проверенные viewport, оставшиеся риски, проблемы вне текущего блока.

## Done when

- Блок выглядит корректно на основных ширинах; `1440 / 1920 / 2560 CSS px` проверены, а `3840` проверен для true-4K/full-bleed/ultrawide target или имеет reasoned skip.
- Desktop Canvas Contract соблюдён: hierarchy, density, alignment spines, focal weight и связь copy/media сохраняются от 1440 до wide/4K.
- First-render Responsive Delivery Contract соблюдён: CSS выбирает core geometry до первого кадра, hydration не исправляет canvas, media/font loading не сдвигает композицию.
- Mobile layout сохраняет visual hierarchy, main action и grouping.
- Текст и controls не перекрываются.
- Нет горизонтального скролла из-за блока.
- Соседние секции не изменены.
- Проблемы вне текущего блока вынесены в open questions или следующий prompt.
- `docs/project-state.md` обновлен.

## Follow-up

Следующий промпт: `prompts/08-block-build/05-interaction-and-states-pass.md` или `prompts/08-block-build/06-block-build-review.md`, если интерактивных состояний нет.

Перед следующим шагом сверься с `prompts/ROUTER.md`.
