# Contemporary Visual Direction Standard

Этот документ помогает делать сайт актуальным, предметным и узнаваемым. Он не является каталогом трендов, обязательным preflight checklist или списком запрещённых эффектов.

Для порядка работы используй `prompts/_guidelines/creator-critic-design-workflow.md`: короткий brief → render → screenshot critic → один self-fix.

## Главная мысль

Современный дизайн начинается не со слова `modern`, не с названия стиля и не с модного эффекта. Он начинается с проекта:

- что человек делает;
- какой предмет, материал или процесс можно показать;
- как меняется состояние до/после;
- какие реальные документы, screenshots, фотографии или результаты существуют;
- какой человеческий контекст отличает проект от шаблонного SaaS.

Style library помогает подобрать язык, только когда project-derived material не даёт достаточно идей.

## 1. Сначала найди project visual raw material

Перед visual hypothesis собери 5–7 коротких наблюдений:

- `Object`: реальный предмет, интерфейс, документ, товар, место или носитель результата.
- `Action`: характерное действие, жест или шаг процесса.
- `Transformation`: что меняется и как это можно увидеть.
- `Material`: фото, бумага, экран, ткань, упаковка, чертёж, данные, звук, пространство.
- `Human signal`: лицо, рука, рабочая среда, след использования, голос автора.
- `Proof`: только реальный или честно redacted/schematic материал.

Хорошая visual idea отвечает: `что конкретно увидит посетитель` и `почему это могло появиться только у этого проекта`.

## 2. Один primary expressive lever

До первого CSS не нужен каталог media/icon/motion решений. Выбери:

- `Primary expressive lever` — главный ход, который держит композицию.
- `Optional secondary lever` — только если он поддерживает главный, а не конкурирует с ним.
- `Asset truth` — real / redacted / schematic / generated candidate / needs user asset.

Примеры levers:

- art-directed product/process photo;
- real or redacted artifact collage;
- expressive typography with deliberate Cyrillic rhythm;
- pictogram/diagram story;
- tactile material or editorial crop;
- one spatial/3D object tied to the product;
- short state-change motion;
- comparison or mechanism made visual.

Cards, gradients, unusual type, texture, motion, illustration and depth не запрещены сами по себе. Они допустимы, когда поддерживают primary lever, смысл и accessibility.

## 3. Первый viewport должен иметь visual event

Concept слабый, если его полностью описывает формула `H1 + lead + button + outlined rectangle`.

Visual event может быть спокойным или смелым, но он должен:

- создавать ясный focal point;
- помогать понять продукт или характер бренда;
- выдерживать mobile и wide screen;
- не притворяться несуществующим proof или product UI.

Если реального asset нет, используй art-directed placeholder: что будет изображено, какой crop/angle нужен и откуда должен прийти материал. Красивый placeholder не считается доказательством.

### Media delivery является частью visual direction

Для каждого заметного media slot после render зафиксируй:

- reserved geometry: intrinsic `width`/`height` или `aspect-ratio`, чтобы media не сдвигала canvas после загрузки;
- crop/focal point и поведение на mobile/reference/wide;
- responsive source sizing под фактическую rendered width, а не один максимальный 4K-файл для всех экранов;
- loading role: только реальный critical asset первого viewport получает раннюю загрузку, остальное не конкурирует с ним без причины;
- asset truth и fallback, включая отсутствие или ошибку загрузки.

Конкретный image API зависит от версии framework. Критерий не в названии prop, а в результате: геометрия зарезервирована, первый кадр стабилен, а выбранный ресурс соразмерен месту, которое он занимает.

## 4. Icons и motion подключаются по смыслу

Не нужно заранее писать отдельные длинные таблицы.

- Functional icon должен различать действие, статус или категорию и иметь label там, где смысл неочевиден.
- Крупный смысловой знак — это pictogram/diagram, а не увеличенная generic UI-icon.
- Motion нужен для state change, sequence, comparison или feedback. Если он ничего не объясняет, concept может быть intentionally static.
- Reduced-motion and accessibility остаются обязательными.

До iconography stage direction provisional. После 2–3 живых блоков pictograms/motion accents проходят calibration.

## 5. Дешёвый поиск, один публичный concept

До high-fidelity concept можно исследовать до трёх low-fi composition sketches. Это быстрые схемы без полного copy, tokens, responsive polish и отчёта.

Пользователю показывается один выбранный high-fidelity concept. Если он отвергнут целиком, бери следующую hypothesis; не маскируй неверное направление косметикой.

## 6. Creator сначала, critic после render

Creator получает positive direction, approved evidence, реальные assets, creative freedom и максимум три hard invariants. Он не обязан до render проходить полный UI/copy/anti-slop checklist.

После live render critic смотрит screenshot и отвечает на вопросы:

1. Что считывается первым?
2. Есть ли project-specific focal event?
3. Это продолжение approved direction или другой сайт?
4. Не стало ли решение отчётом, таблицей или generic AI-template без причины?
5. Честны ли assets и proof?
6. Не ломаются ли hierarchy/readability на mobile, `1440` и `2560 CSS px`?

Critic называет максимум три главные visual problems и делает один связный self-fix. Полный compliance относится к quality stage.

## 7. Stable foundation и provisional expression

После approval не замораживай весь визуальный язык по двум тестовым блокам.

`Stable foundation`:

- brand character and approved continuity anchors;
- semantic color/type roles;
- interaction meaning;
- accessibility, readability and proof truth;
- core canvas invariants.

`Provisional expressive vocabulary`:

- marketing surfaces and compositions;
- decorative tokens and depth;
- media treatments;
- pictograms, custom symbols and motion accents;
- one-off section patterns.

После 2–3 live marketing blocks проведи page-level screenshot calibration: `promote to stable / refine / remove`. Provisional freedom никогда не отменяет accessibility, semantic clarity или truth.

## 8. Trend переводится в project-safe lever

| Trend signal | Project-safe translation | Failure |
| --- | --- | --- |
| Tactile / human | real material, process photo, controlled imperfection | fake handmade clutter |
| Spatial / 3D | one meaningful object or depth cue | decorative futuristic blob |
| Expressive type | one strong type moment with readable Cyrillic | every heading oversized |
| Motion identity | state/sequence/feedback motion | random parallax and pulse |
| Pictogram story | project-specific explanation layer | generic icons above every card |
| Vibrant/maximal | contained accent scene with clear hierarchy | full-page noise without roles |

## 9. Anti-2020 smell check

После render проверь, а не запрещай заранее:

- style differs only by color, radius or font size;
- all sections repeat `text left / card right / rows below`;
- first viewport has no product/human/material signal;
- fake dashboard or document mockup substitutes real proof;
- service notes, labels or explanation dominate the design;
- composition collapses into generic cards or a content table.

Если видно несколько сигналов, меняй composition skeleton или primary expressive lever, а не добавляй случайный декор.

## 10. Visual North Star

После approval создай короткий `docs/design-system/visual-north-star.md`:

- approved live/screenshot evidence;
- one-sentence overall feel;
- 3–5 positive continuity anchors;
- stable foundation;
- provisional expressive vocabulary;
- creative freedom;
- максимум три hard invariants;
- calibration checkpoint after 2–3 live blocks.

North Star не задаёт готовую сетку каждой секции. Будущий design доказывает continuity после build через live browser и screenshots.

## Evidence levels

- Concept sanity: mobile / `1440` / `2560 CSS px`.
- Design-system and deep/page-level matrix: `1440 / 1920 / 2560 CSS px`.
- `3840 CSS px`: только для true-4K/full-bleed/ultrawide target или reasoned skip.

## Safety that never weakens

- no fake facts, proof, testimonials, metrics or product UI;
- no copying a reference 1:1;
- no inaccessible meaning, control or critical state;
- live browser evidence is required for visual approval when browser is available.
