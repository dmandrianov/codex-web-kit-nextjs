# Проверить browser runtime

## Когда использовать

После technical checks, особенно для UI-изменений, интерактива, форм, client components, responsive behavior и e-commerce states.

## Роль Codex

Ты действуешь как frontend runtime QA engineer.

## Цель

Проверить текущий блок или узкий сценарий в реальном браузере: правильный responsive canvas с первого кадра, console errors, hydration, network/media delivery, route behavior, clicks, forms и visible runtime regressions.

## Контекст, который нужно дать

- Quality plan.
- URL локального сервера.
- Block spec.
- Expected scenarios.
- Viewport list.
- Technical checks results.
- Browser/dev server constraints.

## Ограничения

- Проверяй только указанный сценарий или блок.
- Не превращай проверку в redesign.
- Не игнорируй console errors.
- Не исправляй unrelated runtime issues в других блоках.
- Не меняй API/data contracts без отдельного решения.
- Если dev server не запускается, зафиксируй blocker и вернись к technical checks/tooling.
- Не ограничивайся resize уже загруженной страницы или settled screenshot: viewport нужно установить до fresh navigation/reload.

## Процесс

1. Запусти или проверь dev server.
2. Для каждого обязательного viewport сначала установи CSS width/height и DPR, затем выполни fresh navigation/reload.
3. На mobile и всех reference/wide CSS viewports из quality plan сравни early frame, hydration и settled state; для deep visible UI это включает `1440 / 1920 / 2560` и применимый `3840`.
4. Проверь, что нет canvas-level snap, column/DOM swap, flash reference layout или заметного font/media shift. Назови фактически сдвигающий элемент, а не ограничивайся одним числовым score.
5. Проверь код/behavior на `window.innerWidth`, `matchMedia`, mount effect/state или resize listener, который выбирает initial geometry. Justified measured surface должна резервировать outer box заранее.
6. Для critical media запиши current/selected resource, rendered CSS size, natural size, reserved geometry и loading role. Mobile/1440 не должны загружать 4K candidate без причины.
7. Проверь ключевые клики, формы, transitions или route behavior для текущего блока.
8. Проверь console errors, hydration warnings, network errors.
9. Исправь локальные проблемы текущего блока.
10. Если проблема вне scope, зафиксируй follow-up.
11. Создай или обнови `docs/pages/[page-slug]/blocks/[block-slug]-browser-verification.md`.
12. Обнови `docs/project-state.md`: отметь `Browser verification done`, `Hydration/settled state has no canvas-level correction`, `Responsive media candidates and reserved geometry verified` и укажи следующий промпт.

## Output

Создай или обнови `docs/pages/[page-slug]/blocks/[block-slug]-browser-verification.md` в формате:

```md
# Browser Runtime Verification: [Block name]

## Runtime

- URL:
- Dev server:

## Viewports checked

| CSS viewport / DPR | Fresh load | Early vs settled | Canvas correction | Hydration warning |
| --- | --- | --- | --- | --- |

## Responsive media and font evidence

| Element | Rendered size | Selected / natural resource | Reserved geometry | Loading role | Shift |
| --- | --- | --- | --- | --- | --- |

## Scenarios checked

| Scenario | Result | Notes |
| --- | --- | --- |

## Console/network

## Fixes made

## Out-of-scope follow-ups
```

В ответе кратко покажи:

- URL/runtime status;
- scenarios checked;
- console/network status;
- fixes/follow-ups;
- следующий prompt.

## Done when

- Сценарий текущего блока работает в браузере.
- Mobile и обязательная desktop canvas matrix из quality plan проверены.
- На каждом viewport выполнен fresh load; early frame совпадает с settled responsive intent без post-mount canvas correction.
- Нет relevant hydration warning, unreserved critical media/font shift или необоснованной загрузки 4K candidate на меньшем canvas.
- Нет критичных console/hydration/network errors, связанных с текущим блоком.
- Оставшиеся проблемы явно описаны.
- `docs/project-state.md` обновлен.

## Follow-up

Следующий промпт: `prompts/09-quality/06-quality-summary.md`.

Если browser verification требует изменения реализации блока, вернись к соответствующему промпту из `prompts/08-block-build/`.
