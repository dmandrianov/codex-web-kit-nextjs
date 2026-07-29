# UI quality: examples

Загружай этот модуль только когда конкретный before/after пример помогает проверить или объяснить решение. Остальные UI-модули не открывай без связи с текущей задачей.

## 22. Практические before/after examples

Эти примеры являются самостоятельными Prompt Kit scenarios. Используй их как калибровку качества, а не как готовые шаблоны для копирования. Если текущий блок похож на пример, перенеси принцип: что должно стать главным, что нужно убрать, где усилить группировку, как показать состояние, какой компонент выбрать и как сохранить hierarchy на mobile.

### Example 22.1. Hero с несколькими конкурирующими задачами

- Плохо: первый экран SaaS показывает H1, длинный lead, два бейджа, три CTA, мини-dashboard, отзыв, список integrations и форму заявки. Визуально всё выглядит важным, а пользователь не понимает, что делать первым.
- Лучше: hero отвечает на `что это / для кого / какое действие дальше`; один primary CTA ведет к демо, secondary link ведет к pricing, а proof и integrations уходят ниже первым follow-up блоком.
- Почему лучше: первый экран получает один visual job, а не пытается закрыть всю страницу сразу.
- Как Codex применяет: в block preview выбери главный вопрос hero и убери элементы, которые относятся к proof, comparison или form step.

### Example 22.2. Shippable scope вместо фейкового продукта

- Плохо: лендинг сервиса импорта данных показывает живой dashboard с графиками, AI score, team comments и audit log, хотя в проекте реально есть только CSV upload и список ошибок.
- Лучше: hero показывает реальный upload flow: dropzone, preview первых строк, понятные ошибки в таблице и CTA `Проверить файл`. Будущие функции помечены как roadmap, не как уже доступный UI.
- Почему лучше: интерфейс не обещает продукт, который нельзя поставить в production.
- Как Codex применяет: перед созданием красивого artifact UI проверь, есть ли данные, API, states и реальные возможности; если нет, показывай честный фрагмент текущего workflow.

### Example 22.3. Grayscale hierarchy до цвета

- Плохо: pricing selector работает только цветом: выбранный тариф синий, скидка зеленая, warning красный, но размеры, вес текста, рамки и spacing одинаковые.
- Лучше: выбранный тариф имеет сильнее border, небольшой surface lift, checkmark, заметный CTA и короткий label; скидка остается вторичной, warning получает icon + text рядом с причиной.
- Почему лучше: смысл сохраняется без цвета, на слабом экране и для пользователей с отличающимся восприятием цвета.
- Как Codex применяет: в visual review мысленно обесцветь скриншот и проверь, понятны ли selected, error, primary action и links.

### Example 22.4. Personality как набор UI knobs

- Плохо: для юридического B2B сервиса дизайн описан как `современный и премиальный`, а UI получает фиолетовый gradient, большие rounded cards, glow buttons и дружелюбные emoji.
- Лучше: personality переводится в параметры: спокойная neutral palette, умеренный radius, плотная таблица документов, сильные focus states, строгая typography, минимум decorative effects.
- Почему лучше: характер интерфейса соответствует риску, аудитории и задаче, а не абстрактному mood.
- Как Codex применяет: в design direction фиксируй не только adjectives, но и конкретные type, spacing, radius, color temperature, icons, motion и density decisions.

### Example 22.5. Page rhythm и соседние секции

- Плохо: после hero идут три блока подряд в формате `centered heading + 3 icon cards`: benefits, process, features. Каждый блок сам по себе нормальный, но страница выглядит как template.
- Лучше: benefits становятся short comparison strip, process становится numbered workflow row, features показывают product screenshot с callouts.
- Почему лучше: соседние секции выполняют разные visual jobs и не повторяют один паттерн без причины.
- Как Codex применяет: перед build проверь 2-3 соседних блока и замени повторяющийся layout на более подходящий format: table, artifact, timeline, proof strip, FAQ, form или compact list.

### Example 22.6. Spacing и группировка формы

- Плохо: в checkout label, input, helper text и error имеют одинаковые gap; поля между собой стоят почти так же близко, как label к input. Ошибка визуально относится к следующему полю.
- Лучше: label + input + helper/error собраны плотнее; между группами полей больше воздуха; error стоит сразу под своим field и имеет icon/text color role.
- Почему лучше: spacing объясняет отношения без дополнительных рамок и декоративных контейнеров.
- Как Codex применяет: при form build настрой internal gap, group gap и section gap отдельно; не лечи плохую группировку лишними cards.

### Example 22.7. Fixed/fluid widths на широком desktop

- Плохо: checkout растягивает address form на всю ширину 1440px, inputs становятся чрезмерно длинными, а order summary уезжает далеко вправо.
- Лучше: form column имеет max-width, summary держится рядом как stable side panel, а лишнее пространство остается внешним breathing room или используется для helpful support block.
- Почему лучше: пользователь сканирует поля естественной длины, а total и primary action остаются в поле внимания.
- Как Codex применяет: для forms, pricing cards, text columns, tables и media заранее укажи fixed, max-width и fluid behavior.

### Example 22.8. Typography roles и semantic hierarchy

- Плохо: в account settings заголовок `Настройки` огромный, но важный статус `Подписка закончится завтра` выглядит как обычный muted caption; кнопка `Сохранить` конкурирует с destructive action.
- Лучше: page title умеренный; urgent status получает отдельную role с icon и strong text; `Сохранить` визуально primary, destructive action вторичен и отделен.
- Почему лучше: визуальная иерархия совпадает с реальной важностью задачи.
- Как Codex применяет: проверяй не только HTML heading order, но и то, какие элементы пользователь должен увидеть первыми.

### Example 22.9. Baseline и inline typography

- Плохо: price row `4900 ₽ / месяц` использует крупную цену, маленький период, badge `-20%` и caption, но baseline скачет; badge висит выше текста, а currency выглядит отдельным словом.
- Лучше: price, currency и period выровнены по оптической baseline; badge имеет отдельный компактный slot; caption уходит ниже как secondary line.
- Почему лучше: интерфейс выглядит собранным, а цена читается одним объектом.
- Как Codex применяет: для prices, metrics, units, badges and inline icons проверяй baseline, line-height и vertical alignment.

### Example 22.10. Font fallback и реалистичный текст

- Плохо: product card идеально выглядит с `Desk Lamp`, но ломается на `Настольный светильник с беспроводной зарядкой и регулировкой угла`; цифры цены прыгают между rows.
- Лучше: card тестируется на длинном русском названии, sale price, old price и missing image; title clamps intentionally, price uses stable numeric settings, CTA остается на одной линии.
- Почему лучше: дизайн держит реальный контент, а не только короткие демо-строки.
- Как Codex применяет: в QA добавляй Cyrillic, long names, numeric data, sale/zero values and missing content stress cases.

### Example 22.11. Color и muted text на colored surface

- Плохо: info banner на синей поверхности содержит серый helper text и белый link без underline. На реальном мониторе helper почти исчезает, link похож на обычный текст.
- Лучше: banner использует доступный text color для всей иерархии; secondary text приглушен через opacity/token, но остается читаемым; link получает underline или icon cue.
- Почему лучше: contrast поддерживает scanning и не прячет важные условия.
- Как Codex применяет: для colored surfaces проверяй все роли текста: title, body, helper, link, status, disabled.

### Example 22.12. Depth, border и radius без декоративной перегрузки

- Плохо: dashboard cards имеют одновременно border, сильную shadow, gradient, inner glow и 24px radius. В плотном UI каждая card выглядит как отдельный рекламный баннер.
- Лучше: основная grid использует light border и subtle surface; shadow появляется только у popover/modal или active draggable item; radius соответствует design system.
- Почему лучше: depth сообщает слой и интерактивность, а не просто украшает всё подряд.
- Как Codex применяет: перед добавлением shadow спроси, какой layer она обозначает: base, raised, overlay, selected, pressed или floating.

### Example 22.13. Cards и containers без nesting

- Плохо: feature section: большой card содержит три cards, внутри каждой еще icon card и badge. Много рамок, мало смысла.
- Лучше: section остается unframed; каждая feature получает простую row/card только если нужно отделить самостоятельный объект. Icon встроен в заголовок или callout, а не живет в собственной коробке.
- Почему лучше: меньше контейнеров, больше внимания к содержанию и alignment.
- Как Codex применяет: удаляй один уровень container, если он не добавляет group, state, action или data boundary.

### Example 22.14. Buttons, CTA и action hierarchy

- Плохо: pricing card имеет `Попробовать`, `Купить`, `Подробнее`, `Связаться`, все как filled buttons. Пользователь не видит главный следующий шаг.
- Лучше: один primary CTA на выбранном/рекомендованном тарифе, secondary link для details, tertiary contact action отдельно для enterprise context.
- Почему лучше: action hierarchy совпадает с приоритетом решения.
- Как Codex применяет: для каждого блока назначь one primary action, optional secondary action и скрытые/tertiary actions; не превращай все ссылки в buttons.

### Example 22.15. Important choices: native controls сначала

- Плохо: checkout delivery method сделан как три декоративные cards с hover glow; keyboard focus не виден, selected state только цветом, screen reader не понимает radio group.
- Лучше: варианты являются semantic radio group, визуально оформлены как selectable rows/cards, имеют focus ring, selected border/checkmark, price/time metadata и error state.
- Почему лучше: важный выбор остается доступным, понятным и предсказуемым.
- Как Codex применяет: используй native semantics для radio/select/checkbox/file input, а кастомный визуал накладывай поверх корректного поведения.

### Example 22.16. Forms: error рядом с местом исправления

- Плохо: форма заявки показывает `Что-то пошло не так` над формой, но не подсвечивает поле телефона; disabled submit никак не объяснен.
- Лучше: summary говорит, что нужно исправить телефон; field получает error text и aria-describedby; disabled submit заменяется активным submit, который показывает validation, или рядом есть clear reason.
- Почему лучше: пользователь понимает, где проблема и как продолжить.
- Как Codex применяет: для каждой формы опиши focus, filled, invalid, disabled, loading, success and failure states до handoff.

### Example 22.17. Tables и dense UI

- Плохо: orders table показывает customer, email, date, amount, status, owner, actions одинаковым весом; customer identity и payment risk тонут в колонках.
- Лучше: первая ячейка богатая: customer name, email muted, small source marker; amount/right aligned; status has text + icon; row action предсказуемо справа.
- Почему лучше: dense UI становится сканируемым, потому что primary object и сравнимые значения получают правильные роли.
- Как Codex применяет: в таблицах выделяй primary entity cell, comparison columns, status column и action column; не делай все ячейки одинаковыми.

### Example 22.18. Semantic list markers

- Плохо: PDP block `Что входит` использует одинаковые зеленые check icons для включенных, опциональных и недоступных услуг.
- Лучше: included items имеют check, optional items имеют plus/label `опционально`, unavailable items имеют muted text и reason. Цвет не единственный marker.
- Почему лучше: пользователь не путает состав покупки, upsell и ограничение.
- Как Codex применяет: для списков benefits, limitations, availability и plan features выбирай markers по смыслу, а не по красоте.

### Example 22.19. Trust/proof без фейковой уверенности

- Плохо: trust section пишет `Нам доверяют тысячи клиентов` и показывает логотипы-заглушки без подтверждения.
- Лучше: если proof есть, показывается конкретный проверяемый факт: число заказов, дата, отрасль, ссылка на кейс или цитата клиента. Если proof нет, блок заменяется на process transparency или гарантийные условия с `needs confirmation`.
- Почему лучше: доверие строится на проверяемом материале, а не на визуальном шуме.
- Как Codex применяет: не выдумывай logos, numbers, reviews, guarantees or awards; в preview помечай missing proof явно.

### Example 22.20. Feature section как product behavior, а не набор абстракций

- Плохо: features grid: `Автоматизация`, `Контроль`, `Аналитика`, `Интеграции`, каждая с generic icon и одинаковым текстом.
- Лучше: features показывают конкретное поведение: `Система подсвечивает заказы без оплаты`, `Менеджер видит просроченные задачи`, `Экспорт показывает ошибки до отправки`.
- Почему лучше: пользователь видит, как UI работает в реальной ситуации.
- Как Codex применяет: каждую feature привязывай к объекту, действию, state, result или risk removed.

### Example 22.21. SaaS dashboard: empty state без мертвой оболочки

- Плохо: новый account показывает пустую таблицу, disabled filters, серый chart area и текст `No data`.
- Лучше: dashboard сохраняет layout, но основной empty state объясняет следующий шаг: import sample, connect source, create first project. Неактуальные filters скрыты или disabled с причиной.
- Почему лучше: пустой продукт выглядит как начало workflow, а не как сломанная админка.
- Как Codex применяет: проектируй empty/loading/error states как полноценные композиции с next action.

### Example 22.22. E-commerce product grid с unpredictable media

- Плохо: product cards предполагают одинаковые квадратные фото; вертикальные товары обрезаются, logos растягиваются, отсутствие фото ломает высоту card.
- Лучше: media container имеет stable aspect ratio, object-fit rules, safe background, placeholder, alt behavior; card content aligns by grid areas, not by lucky image height.
- Почему лучше: catalog survives real seller/user-uploaded content.
- Как Codex применяет: при e-commerce UI всегда тестируй wide, tall, transparent, missing, low-quality and text-heavy images.

### Example 22.23. Responsive hierarchy вместо механического stack

- Плохо: desktop pricing comparison с 5 колонками на mobile просто становится длинной вертикальной таблицей; CTA оказывается после 80 строк.
- Лучше: mobile показывает selected/recommended plan first, затем compact comparison accordion, sticky/nearby CTA и короткий summary of differences.
- Почему лучше: mobile сохраняет decision path, а не только порядок DOM.
- Как Codex применяет: для responsive pass проверь, какой выбор делает пользователь на маленьком экране, и перестрой presentation под этот выбор.

### Example 22.24. Anti-slop fix pass

- Плохо: weak AI block чинится добавлением gradient, glassmorphism, bigger icons and more cards.
- Лучше: fix pass сначала убирает decorative noise, уточняет main action, снижает secondary emphasis, выравнивает spacing/type, проверяет realistic content, затем добавляет один уместный visual accent.
- Почему лучше: качество появляется из ясности и системности, а не из количества эффектов.
- Как Codex применяет: при запросе `сделай красивее` сначала назови top visual defect, затем исправь hierarchy/layout/spacing/type; effects добавляй только если они усиливают job блока.

### Example 22.25. Единый desktop canvas вместо бесконечного stretch

- Плохо: двухколоночный hero выглядит собранно на 1440px, но на 2560–3840px колонки расходятся, lead становится слишком длинным, media теряет визуальный вес, gaps увеличиваются, а cards заполняют лишнюю ширину.
- Лучше: hero держит общий content canvas и устойчивое отношение copy/media; text measure, controls и core spacing ограничены, media расширяется только внутри объявленной zone, а фон продолжает viewport.
- Почему лучше: композиция сохраняет характер и плотность, не превращаясь ни в растянутый интерфейс, ни в маленький случайный остров без stage treatment.
- Как Codex применяет: проверяет canvas invariants на обязательных `1440 / 1920 / 2560 CSS px`, добавляет `3840 CSS px` для true-4K/full-bleed/ultrawide target или фиксирует reasoned skip и исправляет систему контейнеров, caps и expansion zones, а не отдельные симптомы каждого блока.

### Example 22.26. Первый кадр вместо послезагрузочного responsive swap

- Плохо: сервер показывает двухколоночный 1440-layout; после hydration `useEffect` читает viewport, заменяет дерево на mobile или wide version и загружает один 4K hero asset для всех экранов.
- Лучше: одна semantic structure сразу раскладывается CSS под заданный viewport; hero резервирует геометрию, браузер выбирает подходящий responsive candidate, а client code отвечает только за menu, tabs или другие действия.
- Почему лучше: пользователь не видит промежуточный неправильный дизайн, страница выполняет меньше лишней работы и не тратит мобильный трафик на wide asset без причины.
- Как Codex применяет: устанавливает viewport до fresh reload, сравнивает early и settled frame, проверяет hydration console и выбранный media resource; post-mount canvas correction блокирует approval.
