# Написать SEO-статью через оригинальный seo-content-writer

## Когда использовать

Когда пользователь просит написать новую SEO-статью, пост в блог, подробный guide, comparison, listicle, review, pillar article или FAQ-материал под поисковый запрос.

Это cross-cutting задача: она не откатывает и не продвигает стадию разработки сайта. Для короткого текста hero, CTA, карточек, форм и обычных блоков используй текущий page copy flow, а не этот промпт.

## Роль Codex

Ты orchestration layer и factual editor. Оригинальный `$seo-content-writer` владеет структурой статьи, SEO-writing workflow и CORE-EEAT self-check. Ты даёшь ему проверенный контекст проекта, следишь за источниками и не меняешь upstream skill.

## Цель

Создать готовый к редакторскому просмотру черновик статьи, который отвечает поисковому намерению, естественно использует ключевые слова, удобен для чтения и не содержит выдуманных фактов.

## Контекст, который нужно дать

- `project-brief.md`, если статья относится к текущему проекту.
- `docs/strategy.md`, `docs/messaging.md` и `docs/content/editorial-rules.md`, если они есть.
- Тема и primary keyword.
- Secondary keywords, если они уже выбраны.
- Аудитория и search intent.
- Тип статьи и желаемая длина.
- Tone of voice.
- Подтверждённые facts, claims, examples и CTA.
- Доступные внутренние ссылки.
- Источники, competitor URLs или SERP evidence, если они есть.
- `prompts/_guidelines/seo-content-writer-integration.md`.

## Ограничения

- До черновика прочитай integration guideline, установленный `seo-content-writer/SKILL.md` и четыре его локальных reference-файла полностью.
- Проверь pinned commit context и SHA-256. При missing/mismatch остановись, не делай silent fallback.
- Не редактируй и не копируй upstream skill внутрь Prompt Kit или проекта.
- Не придумывай факты, цифры, исследования, цитаты, даты, кейсы, результаты и ссылки.
- Для изменчивых сведений используй актуальные первичные источники.
- Если источника нет, ставь `[needs source]`.
- Не обещай ranking, traffic, indexing или featured snippet.
- Не публикуй статью, не меняй CMS и не отправляй URL в поисковые системы без отдельной просьбы пользователя.
- Не требуй отсутствующие upstream memory/sibling skills для создания inline-черновика.
- Не применяй этот article route автоматически к короткому тексту страницы. Его возможная интеграция в page copy рассматривается отдельно.

## Процесс

1. Проверь skill identity и обязательные reference-файлы по integration guideline.
2. Собери уже известные входные данные. Не переспрашивай факты, которые есть в документах или сообщении пользователя.
3. Если без primary keyword или темы нельзя понять предмет статьи, остановись и задай один точный вопрос.
4. Если пользователь просит конкурентный или актуальный research, проверь SERP intent и первичные источники. Отдели source facts от собственных выводов.
5. Подготовь handoff по форме `seo-content-writer invocation`.
6. Явно вызови `$seo-content-writer`.
7. Выполни upstream workflow: requirements, CORE-EEAT constraints, research/plan, title, meta, structure, on-page checks, links и final self-check.
8. Сохрани язык и tone of voice проекта. Не вставляй ключевую фразу ценой неестественной грамматики.
9. Проверь, что основной ответ на запрос появляется в начале, headings образуют понятный outline, а вывод закрывает обещание вступления.
10. Пометь все нерешённые source gaps и решения, которые действительно нужны от пользователя.
11. Сохрани результат в файл только если пользователь попросил файл или в проекте уже указан canonical content path.
12. Обнови `docs/project-state.md` короткой cross-cutting записью, не меняя основную website stage.

## Output

Покажи:

1. Рекомендуемый title и 1–2 сильные альтернативы с короткой причиной различий.
2. Meta description.
3. Article slug suggestion, если это уместно.
4. Полный черновик с H1/H2/H3, snippet-ready block, FAQ и conclusion/CTA.
5. Рекомендации по внутренним и внешним ссылкам.
6. Короткий self-check: intent, keyword naturalness, structure, evidence gaps.
7. Список `[needs source]` и только реальные решения пользователя.

Не добавляй большой технический отчёт, если пользователь просил только готовую статью.

## Done when

- Skill preflight passed.
- `$seo-content-writer` вызван явно.
- Черновик соответствует requested language, audience, search intent и tone.
- Primary keyword использован естественно.
- H1/H2/H3, meta, snippet-ready block и FAQ присутствуют, если формат их оправдывает.
- Headings полезны даже при чтении отдельно.
- Нет выдуманных фактов и фальшивых ссылок.
- Source gaps явно помечены.
- Upstream skill остался неизменным.
- Основная стадия проекта не изменилась из-за статьи.

## Follow-up

- Если пользователь хочет правки, повторно используй этот prompt в узком revision scope с тем же facts/source set.
- Если нужно перенести статью в сайт, сначала определи canonical content path и отдельный implementation scope.
- Для hero, CTA и обычных page blocks сохраняй лёгкий нативный контракт из `prompts/_knowledge/site-copy-quality.md`. Полный skill применяй к странице только по явной просьбе пользователя и без ослабления truth/source gates.
