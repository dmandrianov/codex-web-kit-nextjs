# Собрать один visual concept

## Когда использовать

После `docs/design-system/concepts/style-shortlist.md`, где одна hypothesis отмечена `Prototype next`. Используй до approval, iconography, tokens и production UI.

## Роль Codex

Сначала ты visual designer/orchestrator, который свободно собирает композицию. При `Creator engine: gpt-taste` визуальным creator является оригинальный `$gpt-taste`; при `native` — обычный creator этого workflow. После первого render ты переключаешься в screenshot critic. Не смешивай эти роли до появления изображения.

## Цель

Создать один disposable high-fidelity concept, открыть его в live browser, увидеть правильную композицию уже на первом кадре mobile, `1440` и `2560 CSS px`, исправить одну главную визуальную проблему и показать пользователю.

- `native` — два тестовых блока в `design-lab/design-concepts/`.
- `gpt-taste / page` — полноценный page concept в `design-lab/gpt-taste/page/`, чтобы исходный skill отработал без page-level кастрации.

## Контекст, который нужно дать

- `Prototype next` и `Active creative brief` из style shortlist.
- Два test blocks и их реальные факты/copy.
- Для `gpt-taste / page`: `docs/ia/page-section-map.md`, подтверждённый content contract всех planned sections и честные placeholders для пробелов. Не достраивай AIDA неизвестными facts/claims/proof.
- Реальные brand/media/product assets и reference principles, если есть.
- `docs/strategy.md` и `docs/messaging.md` — только нужные для этих двух блоков части.
- 4–6 релевантных quality rules для этих двух блоков, выбранных по заголовкам баз.
- `prompts/_guidelines/creator-critic-design-workflow.md`.
- `prompts/_guidelines/gpt-taste-integration.md`, если active hypothesis выбирает `gpt-taste`.
- Полностью прочитанный installed `gpt-taste/SKILL.md` и `docs/design-system/gpt-taste-profile.md`, если они применимы.
- `prompts/_knowledge/contemporary-visual-direction.md`.
- `prompts/_guidelines/landing-copy-formulas.md`, если есть Hero/CTA.

Не превращай creator input в полный учебник. Остальные design quality материалы подключаются к critic после первого render и только по релевантным разделам.

## Ограничения

В active brief должно быть не больше трёх hard invariants. Обязательная основа:

- truth/IP: не подделывать факты, proof, продуктовый UI или assets и не копировать чужой visual/layout 1:1;
- accessibility/readability: не выпускать нечитаемый или недоступный concept;
- одна явная project/user boundary, если она действительно нужна.

Не меняй выбранный creator engine внутри этого шага. При `gpt-taste` остановись до UI, если skill отсутствует или SHA-256 не совпадает с pinned identity.

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
3. Выполни выбранную ветку:
   - `native`: собери один `index.html` и один `styles.css` в `design-lab/design-concepts/`; покажи два test blocks как настоящий фрагмент будущего сайта и не верстай всю страницу;
   - `gpt-taste / page`: выполни preflight из `gpt-taste-integration.md`, собери invocation handoff, явно вызови `$gpt-taste`, сохрани его `design_plan` и собери полноценный disposable page concept в `design-lab/gpt-taste/page/`.
   В обеих ветках не используй production `src/`.
4. Не помещай перед concept `fit`, `risk`, `judge`, prompt notes, stage labels или отчёт.
5. Если реального proof/media нет, используй честный art-directed placeholder или schematic. Он должен объяснять будущий asset, а не притворяться доказательством.
6. Открой preview в live browser. Скриншот не заменяет открытую страницу.
7. До navigation или fresh reload установи нужный viewport. Сравни первый видимый кадр с settled state и только затем сними и осмотри screenshots:
   - mobile;
   - reference desktop `1440 CSS px`;
   - wide sanity `2560 CSS px`.
   `1920` и `3840` не являются обязательным concept preflight: полная matrix проверяется позже в layout/design-system/page-level review, а `3840` — только когда проекту действительно нужен true-4K/ultrawide target.
8. Только теперь переключись в critic. Подключи релевантные разделы `ui-design-quality`, `anti-ai-slop`, copy/accessibility и проверь изображение, а не намерение.
9. Назови максимум три видимые проблемы. Приоритет: focal point, project specificity, hierarchy, continuity, asset honesty, mobile/wide failure.
10. Сделай один self-fix, который сильнее всего улучшает concept. При `gpt-taste` верни findings и screenshots `$gpt-taste`, получи его correction и только затем внеси изменения. Не перепроектируй skill output обычным base creator.
11. Перезагрузи live preview и повторно осмотри mobile / 1440 / 2560. Если hard invariant всё ещё нарушен, это blocker, а не `done`.
12. Только после финального render зафиксируй короткий `concept-decisions.md`: creator engine/mode, фактический media treatment, reserved geometry, responsive source intent, loading role, icon/pictogram role или skip, motion role или intentionally static, primary/secondary lever, asset truth и first-frame verdict. Никаких preflight-таблиц.
13. Для `gpt-taste / page` создай `design-lab/gpt-taste/page/gpt-taste-profile-candidate.md` по шаблону `prompts/_templates/gpt-taste-profile-template.md`. Статус остаётся `candidate` до user approval.
14. Обнови `docs/project-state.md`: `Current design concept prototyped`, creator engine/mode, `Live concept reviewed`, следующий промпт.

## Output

Для `native` создай или обнови:

- `design-lab/design-concepts/index.html`;
- `design-lab/design-concepts/styles.css`;
- `design-lab/design-concepts/concept-decisions.md`;
- `design-lab/design-concepts/qa-mobile.png`;
- `design-lab/design-concepts/qa-desktop.png`;
- `design-lab/design-concepts/qa-wide.png`.

Для `gpt-taste / page` создай или обнови:

- runnable page concept в `design-lab/gpt-taste/page/`;
- `design-lab/gpt-taste/page/design-plan.md`;
- `design-lab/gpt-taste/page/concept-decisions.md`;
- `design-lab/gpt-taste/page/gpt-taste-profile-candidate.md`;
- `design-lab/gpt-taste/page/qa-mobile.png`;
- `design-lab/gpt-taste/page/qa-desktop.png`;
- `design-lab/gpt-taste/page/qa-wide.png`.

В ответе кратко покажи:

- ссылку/путь к live preview;
- какая hypothesis собрана, creator engine и mode;
- primary lever и asset truth;
- что critic увидел и что было исправлено;
- что именно нужно оценить пользователю.

Не публикуй длинные preflight tables, если нет blocker.

## Done when

- Собран один public high-fidelity concept, не три направления.
- В `native` concept есть два test blocks; в `gpt-taste / page` есть полноценная page composition и исходный `design_plan`.
- Композиция создана со свободой внутри максимум трёх hard invariants.
- Live preview открыт и осмотрен.
- Mobile, `1440` и `2560 CSS px` screenshots сохранены и осмотрены.
- На каждом viewport первый кадр совпадает с responsive intent: нет post-load scale, column/DOM swap или canvas correction.
- Media slots резервируют геометрию и не предполагают один максимальный asset для всех rendered widths без причины.
- Critic включён после первого render, выбрал максимум три проблемы и выполнен один self-fix.
- Visual self-fix `gpt-taste` concept выполнен самим `$gpt-taste` после передачи screenshot findings.
- Фактические media/icon/motion decisions записаны коротко после render, а не спланированы длинными таблицами до CSS.
- Нет fake proof, копирования 1:1, служебного отчёта вместо сайта или блокирующего accessibility failure.
- `src/` не изменён, выбранный lab path соблюдён, `docs/project-state.md` обновлён.

## Follow-up

Следующий промпт: `prompts/05-design-system/04-design-concept-feedback.md`.

Если browser недоступен, зафиксируй blocker и не считай visual review завершённым.
