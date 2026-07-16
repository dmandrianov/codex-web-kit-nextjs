# Собрать один visual concept

## Когда использовать

После `docs/design-system/concepts/style-shortlist.md`, где одна hypothesis отмечена `Prototype next`. Используй до approval, iconography, tokens и production UI.

## Роль Codex

Сначала ты visual designer, который свободно собирает композицию. После первого render ты переключаешься в screenshot critic. Не смешивай эти роли до появления изображения.

## Цель

Создать в `design-lab/design-concepts/` один disposable high-fidelity concept из двух тестовых блоков, открыть его в live browser, увидеть правильную композицию уже на первом кадре mobile, `1440` и `2560 CSS px`, исправить одну главную визуальную проблему и показать пользователю.

## Контекст, который нужно дать

- `Prototype next` и `Active creative brief` из style shortlist.
- Два test blocks и их реальные факты/copy.
- Реальные brand/media/product assets и reference principles, если есть.
- `docs/strategy.md` и `docs/messaging.md` — только нужные для этих двух блоков части.
- 4–6 релевантных quality rules для этих двух блоков, выбранных по заголовкам баз.
- `prompts/_guidelines/creator-critic-design-workflow.md`.
- `prompts/_knowledge/contemporary-visual-direction.md`.
- `prompts/_guidelines/landing-copy-formulas.md`, если есть Hero/CTA.

Не превращай creator input в полный учебник. Остальные design quality материалы подключаются к critic после первого render и только по релевантным разделам.

## Ограничения

В active brief должно быть не больше трёх hard invariants. Обязательная основа:

- truth/IP: не подделывать факты, proof, продуктовый UI или assets и не копировать чужой visual/layout 1:1;
- accessibility/readability: не выпускать нечитаемый или недоступный concept;
- одна явная project/user boundary, если она действительно нужна.

## Creative freedom

Codex самостоятельно выбирает composition, type scale, whitespace, depth, surface treatment, crop, rhythm и форму focal object. До CSS выбери только:

- `primary expressive lever` — главный визуальный ход;
- `optional secondary lever` — только если он усиливает главный;
- `asset truth` — real / redacted / schematic / generated candidate / needs user asset.

Не требуются отдельные предварительные таблицы media, icons и motion. Они становятся частью lever только когда действительно нужны.

## Процесс

Цикл: `creator → render → critic → one fix`.

1. Сначала осмотри approved visual evidence и реальные assets; visual evidence важнее длинного пересказа.
2. Сожми active hypothesis в creative brief из 5–8 строк: desired effect, primary lever, optional secondary, available assets, freedom и 0–3 hard invariants.
3. Собери один `index.html` и один `styles.css` в `design-lab/design-concepts/`. Не используй production `src/` и не верстай всю страницу.
4. Покажи два test blocks как настоящий фрагмент будущего сайта. Не помещай перед ними `fit`, `risk`, `judge`, prompt notes, stage labels или отчёт.
5. Если реального proof/media нет, используй честный art-directed placeholder или schematic. Он должен объяснять будущий asset, а не притворяться доказательством.
6. Открой preview в live browser. Скриншот не заменяет открытую страницу.
7. До navigation или fresh reload установи нужный viewport. Сравни первый видимый кадр с settled state и только затем сними и осмотри screenshots:
   - mobile;
   - reference desktop `1440 CSS px`;
   - wide sanity `2560 CSS px`.
   `1920` и `3840` не являются обязательным concept preflight: полная matrix проверяется позже в layout/design-system/page-level review, а `3840` — только когда проекту действительно нужен true-4K/ultrawide target.
8. Только теперь переключись в critic. Подключи релевантные разделы `ui-design-quality`, `anti-ai-slop`, copy/accessibility и проверь изображение, а не намерение.
9. Назови максимум три видимые проблемы. Приоритет: focal point, project specificity, hierarchy, continuity, asset honesty, mobile/wide failure.
10. Сделай один self-fix, который сильнее всего улучшает concept. Не распыляйся на десятки косметических изменений.
11. Перезагрузи live preview и повторно осмотри mobile / 1440 / 2560. Если hard invariant всё ещё нарушен, это blocker, а не `done`.
12. Только после финального render зафиксируй короткий `concept-decisions.md`: фактический media treatment, reserved geometry, responsive source intent, loading role, icon/pictogram role или skip, motion role или intentionally static, primary/secondary lever, asset truth и first-frame verdict. Никаких preflight-таблиц.
13. Обнови `docs/project-state.md`: `Current design concept prototyped`, `Live concept reviewed`, следующий промпт.

## Output

Создай или обнови:

- `design-lab/design-concepts/index.html`;
- `design-lab/design-concepts/styles.css`;
- `design-lab/design-concepts/concept-decisions.md`;
- `design-lab/design-concepts/qa-mobile.png`;
- `design-lab/design-concepts/qa-desktop.png`;
- `design-lab/design-concepts/qa-wide.png`.

В ответе кратко покажи:

- ссылку/путь к live preview;
- какая hypothesis собрана;
- primary lever и asset truth;
- что critic увидел и что было исправлено;
- что именно нужно оценить пользователю.

Не публикуй длинные preflight tables, если нет blocker.

## Done when

- Собран один public high-fidelity concept, не три направления.
- В нём два test blocks и один ясный primary expressive lever.
- Композиция создана со свободой внутри максимум трёх hard invariants.
- Live preview открыт и осмотрен.
- Mobile, `1440` и `2560 CSS px` screenshots сохранены и осмотрены.
- На каждом viewport первый кадр совпадает с responsive intent: нет post-load scale, column/DOM swap или canvas correction.
- Media slots резервируют геометрию и не предполагают один максимальный asset для всех rendered widths без причины.
- Critic включён после первого render, выбрал максимум три проблемы и выполнен один self-fix.
- Фактические media/icon/motion decisions записаны коротко после render, а не спланированы длинными таблицами до CSS.
- Нет fake proof, копирования 1:1, служебного отчёта вместо сайта или блокирующего accessibility failure.
- `src/` не изменён, `docs/project-state.md` обновлён.

## Follow-up

Следующий промпт: `prompts/05-design-system/04-design-concept-feedback.md`.

Если browser недоступен, зафиксируй blocker и не считай visual review завершённым.
