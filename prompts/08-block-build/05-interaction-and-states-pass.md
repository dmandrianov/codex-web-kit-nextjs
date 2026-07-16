# Провести проход по интерактиву и состояниям блока

## Когда использовать

Когда один блок содержит кнопки, формы, tabs, меню, анимации, hover/focus, loading/error/empty states, selected states или другие интерактивные состояния.

## Роль Codex

Ты действуешь как frontend engineer, отвечающий за interaction design, UI states и accessibility.

## Цель

Проверить и улучшить интерактивные состояния одного блока. Не расширяй проход на все интерактивные элементы страницы.

## Контекст, который нужно дать

- Build plan.
- Block spec.
- Реализованный блок.
- UI components.
- Accessibility rules.
- `prompts/_knowledge/ui-design-quality.md`.
- `prompts/_knowledge/site-copy-quality.md`, если states содержат user-facing copy.
- Ожидаемое поведение.
- Form/data/e-commerce specs, если блок связан с ними.

## Ограничения

- Работай только с указанным блоком.
- Если на странице есть другие интерактивные блоки, не трогай их в этом проходе.
- Не добавляй анимации без функционального смысла.
- Не меняй бизнес-логику за пределами блока.
- Не ломай keyboard navigation.
- Не добавляй сложный state management, если block spec этого не требует.
- Не выдумывай API/data behavior.
- Не добавляй или не утверждай labels, validation errors, help text, empty/success/loading copy без короткого `Site copy check`.

## Процесс

1. Найди все интерактивные элементы блока.
2. Проверь hover, focus, active, disabled, loading, error, empty, selected states где применимо.
3. Проверь, что controls выглядят как controls, состояния не меняют размеры layout, а main action остаётся очевидным.
4. Проверь keyboard navigation и aria/semantic HTML.
5. Проверь reduced motion и visible focus.
6. Для forms/e-commerce проверь errors, success, validation, price/stock/variant states только в рамках block spec.
7. Проверь state microcopy по `prompts/_knowledge/site-copy-quality.md`, если пользователь видит labels, errors, help text, empty/success/loading states или checkout/product messages.
8. Исправь найденные проблемы.
9. Запусти релевантные проверки.
10. Обнови `docs/project-state.md`: отметь `Current block interactions checked` и укажи следующий промпт.

## Output

Список проверенных состояний, изменения, результаты проверок, проблемы вне scope.

## Done when

- Все интерактивные элементы блока имеют понятные состояния.
- Состояния controls/forms/e-commerce UI поддерживают visual hierarchy и не создают layout shift.
- Блок доступен с клавиатуры.
- Focus states видимы.
- Empty/loading/error states учтены, если они нужны.
- User-facing state copy проходит `Site copy check`, если states содержат labels, errors, help text или empty/success/loading messages.
- Соседние интерактивные блоки не изменены.
- Проверки проекта пройдены или проблемы описаны.
- `docs/project-state.md` обновлен.

## Follow-up

Следующий промпт: `prompts/08-block-build/06-block-build-review.md`.

Перед следующим шагом сверься с `prompts/ROUTER.md`.
