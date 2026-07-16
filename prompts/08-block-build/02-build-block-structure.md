# Реализовать структуру одного блока

## Когда использовать

После block build preflight, когда нужно создать или подключить базовую React/HTML структуру одного блока без полной визуальной доводки.

## Роль Codex

Ты действуешь как senior frontend engineer с вниманием к семантике, файловым границам и безопасной интеграции.

## Цель

Реализовать структуру ровно одного блока в Next.js проекте: компонент, semantic markup, подключение к странице, базовые props/data и минимальные class hooks для styling pass.

## Контекст, который нужно дать

- `docs/pages/[page-slug]/blocks/[block-slug]-build-plan.md`.
- Block spec.
- Page spec.
- Existing route/page files.
- Existing components.
- Design-system component inventory.
- Content/SEO plan.
- Только релевантные semantic/control/state criteria из UI standard; полный checklist остаётся post-render quality.

## Ограничения

- Реализуй только один указанный блок.
- Не делай финальную визуальную доводку, если блок не тривиальный.
- Не меняй соседние блоки, кроме явно необходимого подключения текущего блока.
- Не добавляй зависимости.
- Не выдумывай контентные факты.
- Не добавляй интерактивную бизнес-логику вне block spec.
- Не копируй reference screenshot 1:1.

## Процесс

1. Перечитай build plan и block spec.
2. Подтверди, какие файлы меняешь и какие не трогаешь.
3. Создай или обнови компонент блока.
4. Подключи блок в нужное место страницы, не меняя соседние блоки.
5. Добавь semantic HTML, базовые props/data и class hooks так, чтобы будущая hierarchy, controls/forms/tables states и responsive не требовали переписывать структуру.
6. Используй существующие компоненты, если они уже подходят.
7. Проверь, что проект компилируется на уровне очевидных импортов и JSX/TS.
8. Обнови `docs/project-state.md`: отметь `Current block structure built` и укажи следующий промпт.

## Output

В ответе укажи:

- изменённые файлы;
- созданные компоненты;
- что подключено к странице;
- что оставлено для styling pass;
- риски и open questions.

## Done when

- Структура одного блока создана или обновлена.
- Блок подключён в правильное место.
- Соседние блоки не изменены.
- Markup семантически понятен.
- Structure не блокирует будущую UI quality: hierarchy, main action, form/table/control states и responsive order можно реализовать в следующих pass.
- Нет финального styling scope creep.
- `docs/project-state.md` обновлен.

## Follow-up

Следующий промпт: `prompts/08-block-build/03-style-block-from-design-system.md`.

Если блок оказался слишком сложным для одного structure pass, зафиксируй оставшиеся части как отдельные sub-tasks, но не переходи к соседним блокам.
