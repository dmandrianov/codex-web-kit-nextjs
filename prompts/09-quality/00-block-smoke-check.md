# Быстро проверить один блок

## Когда использовать

После fast-lane реализации блока, когда нужен короткий sanity check без полной цепочки visual -> accessibility -> technical -> browser -> summary.

## Роль Codex

Ты действуешь как practical QA engineer, который быстро ловит грубые ошибки и не превращает проверку простого блока в отдельный проект.

Если block/component создан через `gpt-taste`, technical/truth/accessibility failures можно исправить прямо только без redesign; visual/composition findings верни `$gpt-taste` по `prompts/_guidelines/gpt-taste-integration.md`.

## Цель

Проверить один блок быстрым smoke-check: визуальная целостность, mobile/reference-desktop/wide, базовая доступность, console/runtime, минимальные команды проверки, если они доступны.

## Контекст, который нужно дать

- `docs/pages/[page-slug]/blocks/[block-slug]-fast-build.md`.
- Block spec.
- Изменённые файлы.
- URL локального сервера или инструкции запуска.
- `package.json` и команды checks, если есть.
- Скриншоты или browser access, если доступны.
- `docs/design-system/visual-north-star.md` и approved concept/Hero screenshots.
- `prompts/_guidelines/anti-ai-slop-design-and-copy.md`.
- `prompts/_knowledge/site-copy-quality.md`, если блок содержит или меняет user-facing copy.
- `prompts/_knowledge/ui-design-quality.md`.
- `prompts/_knowledge/contemporary-visual-direction.md`, если fast build/content preview содержит media/icon/motion/currentness notes или блок должен выглядеть современно.
- `prompts/_guidelines/page-composition-rhythm.md`.
- `prompts/_guidelines/creator-critic-design-workflow.md`.

## Ограничения

- Не проводи полный QA-stage, если smoke-check достаточен.
- Не проверяй всю страницу как full QA. Для marketing можно открыть full-page view 2–4 соседних блоков как chapter; product/business logic остаётся one-block strict.
- Не исправляй unrelated issues.
- Не пропускай очевидный AI-slop: декоративный шум, text overload, одинаковые карточки без роли, случайные иконки.
- Не пропускай Site copy smoke, если блок содержит пользовательский текст: headings, CTA, labels, errors, empty/success/loading states, product text или checkout microcopy.
- Не пропускай нарушение semantic tokens или iconography. Purposeful marketing exception внутри North Star проверяй как provisional pattern, а не запрещай автоматически.
- Не пропускай contemporary visual smoke, если блок должен держать media/icon/motion/currentness: проверь, что эти решения не потерялись и не заменены декоративными заглушками.
- Не называй блок `passed`, если он технически работает, но явно повторяет соседний блок и ломает ритм страницы.
- Не запускай долгие проверки без необходимости.
- Не засчитывай visual smoke по DOM/CSS или факту сохранения PNG. Visible UI нужно реально посмотреть в mobile, reference-desktop и wide-desktop screenshot.
- Не ставь `passed`, если на reference desktop блок собран, а на wide guard core composition растянута, focal point потерян или связанные copy/media/CTA разъехались.
- Не ставь `passed`, если correct responsive canvas появляется только после hydration/mount, critical media сдвигает layout или mobile/1440 без причины получает wide/4K asset.
- Если smoke выявил серьёзную проблему, назначь owner prompt из detailed flow.

## Процесс

1. Определи текущий блок и изменённые файлы.
2. Для visible UI задай viewport до navigation/fresh reload, открой live page и сравни early frame с settled state, затем реально просмотри screenshots блока с контекстом соседей: mobile, reference desktop `1440 CSS px` и wide guard не уже `2560 CSS px`.
3. Сравни с Visual North Star, Desktop Canvas Contract и approved concept/Hero: тот же ли это сайт, сохраняется ли характер, есть ли focal point, не стал ли блок отчётом/таблицей без причины, держатся ли hierarchy/density/alignment на wide viewport.
4. Проверь visual smoke: нет явных overlap, сломанной сетки, обрезанного текста, пустого блока.
5. Проведи короткий screenshot critic и выбери максимум три проблемы с самым большим влиянием. Полный UI checklist оставь deep quality.
6. Проверь contemporary visual smoke, если блок использует media/icons/motion или отвечает за современное первое впечатление: visual event есть, media не пустая декорация, иконки не случайные, motion имеет задачу, нет явного "2020 SaaS kit" ощущения.
7. Проверь Site copy smoke, если есть user-facing copy: opening даёт прямой ответ, body выполняет обещание heading, material claims имеют опору, сущности и действия названы конкретно, CTA соответствует готовности человека, а блок заканчивается выводом или следующим шагом. Одновременно проверь errors/states, пустые фразы и text overload.
8. Проверь anti-slop smoke: текст не раздут, декор не случайный, композиция не выглядит как generic AI-template.
9. Проверь continuity + rhythm: общий стиль сохранён; повтор или новая форма имеют смысл, а не следуют квоте.
10. Проверь truth/accessibility/semantic token/iconography hard gates и provisional pattern, если он есть.
11. Проверь базовую accessibility: семантика, focus для интерактива, alt/labels если применимо.
12. Проверь console/runtime, hydration warnings и отсутствие viewport-dependent mount branch, если доступен браузер/код.
13. Для critical media проверь reserved geometry, rendered size, selected resource/natural size и loading role. Не требуй ранней загрузки от каждого изображения.
14. Если есть исправимая проблема:
    - native → сделай один focused self-fix;
    - gpt-taste visual/composition → верни finding/evidence `$gpt-taste` и примени его correction;
    - non-redesign truth/accessibility/runtime/responsive-delivery failure → base может исправить прямо.
    Затем повторно посмотри затронутые screenshots до verdict.
15. Для native marketing chapter после full-page evidence разрешена одна узкая spacing/surface/transition/alignment/media-handoff correction. Для gpt-taste visual chapter correction верни skill. Не меняй смысл, claims или business logic соседей.
16. Запусти лёгкие команды проверки, если они уже известны и быстры.
17. Создай или обнови `docs/pages/[page-slug]/blocks/[block-slug]-smoke-check.md`.
18. Обнови `docs/project-state.md`: отметь smoke status, screenshot eyes-check и следующий prompt.

## Output

Создай или обнови `docs/pages/[page-slug]/blocks/[block-slug]-smoke-check.md`:

```md
# Smoke Check: [Block name]

## Verdict

- Status: passed / needs fixes / needs deep QA

## Top findings (maximum 3)

1.
2.
3.

## Screenshot eyes-check

- Reference desktop screenshot (1440 CSS px):
- Wide desktop screenshot (>=2560 CSS px):
- Mobile screenshot:
- Actual CSS viewport widths:
- Approved evidence compared:
- Same-site / continuity verdict:
- Focal point:
- Report/table smell:
- Desktop canvas continuity:
- Stable invariants / expansion zones:
- First frame matches settled state:
- Post-mount canvas correction / hydration warning:
- Critical media reserved geometry / selected resource / loading role:
- One focused self-fix and recheck:

## Contemporary visual smoke

- `prompts/_knowledge/contemporary-visual-direction.md` used:
- Visual event / media / icon / motion notes:
- Anti-2020 smell:

## Site copy smoke

- User-facing copy present/changed:
- `prompts/_knowledge/site-copy-quality.md` used:
- Direct answer / heading promise:
- Claim-to-evidence support:
- Concrete entities / semantic closure / next step:
- Notes:

## Hard gates and provisional pattern

## Chapter correction

## Fixes made

## Remaining issues

## Next step
```

В ответе кратко покажи:

- verdict;
- что проверено;
- что исправлено;
- нужен ли deep QA;
- следующий шаг.

## Done when

- Smoke-check выполнен для одного блока.
- Нет явных visual/runtime blockers или они перечислены.
- Screenshot critic назвал максимум три главные проблемы; полный UI checklist не дублирован.
- Mobile/reference-desktop/wide screenshots visible UI реально просмотрены и сравнены с Visual North Star/Desktop Canvas Contract/approved evidence.
- Wide guard сохраняет core hierarchy, density, focal weight, text measure и copy/media relation; иначе smoke status не может быть `passed`.
- First frame уже соответствует viewport; hydration/mount не меняет core canvas, а critical media не вызывает unreserved shift или oversized fetch без причины.
- Если результат имел исправимую главную проблему, выполнен один focused correction и повторный eyes-check; gpt-taste visual fix прошёл через skill.
- Contemporary visual smoke пройден для блоков с media/icon/motion/currentness role или проблема записана с owner prompt.
- Нет очевидного AI-slop или copy overload, либо проблема зафиксирована как follow-up.
- Truth, accessibility, semantic tokens и iconography проходят hard gates либо проблема зафиксирована.
- Marketing chapter correction, если была, узкая и задокументирована; product/business соседи не менялись.
- Мелкие проблемы текущего блока исправлены, если это безопасно.
- Для серьёзных проблем выбран owner prompt.
- `docs/project-state.md` обновлён.

## Follow-up

Если smoke passed и есть следующий block spec, выбери prompt по его route: native → `prompts/08-block-build/00-build-block-fast-lane.md`, gpt-taste block/component → `prompts/08-block-build/00-gpt-taste-creative-build.md`.

Если нужен detailed QA, используй `prompts/09-quality/01-quality-preflight.md`.

Если блок готов и это последний блок scope, используй `prompts/10-handoff/01-handoff-scope.md`.
