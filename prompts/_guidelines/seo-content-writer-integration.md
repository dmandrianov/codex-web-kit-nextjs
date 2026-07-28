# Интеграция оригинального seo-content-writer в Prompt Kit

Этот документ задаёт внешнюю рамку для неизменённого `seo-content-writer`. Он не пересказывает и не заменяет `SKILL.md`: при задаче на статью Codex читает установленный skill и его локальные reference-файлы полностью, затем явно вызывает `$seo-content-writer`.

## Канонический источник

- Repository: `aaron-he-zhu/seo-geo-claude-skills`
- Preserved release: `v9.9.12`
- Pinned commit: `1608176f6c18de6aec62a9abf6a2074bf82c9f67`
- Path: `build/seo-content-writer/`
- Expected `SKILL.md` SHA-256: `8014ae5cb74e117415283dd27f2a86946a0df4cc0988f60be0a0b94f55204452`
- License: Apache-2.0

Репозиторий на ветке `main` теперь служит указателем на большой набор `aaron-marketing-skills`. Prompt Kit закрепляет последнюю самостоятельную версию `v9.9.12`, чтобы правила написания не менялись вместе с внешним bundle.

Prompt Kit не копирует и не редактирует upstream-файлы. Skill устанавливается отдельно в стандартную папку Codex через `$skill-installer` из точного repository/path/commit выше.

## Обязательные локальные reference-файлы

После установки должны присутствовать:

| Path внутри skill | Expected SHA-256 |
| --- | --- |
| `references/instructions-detail.md` | `24605115a253effc44386066b559370b680433ddc908f68b3ba8e54da91700e1` |
| `references/seo-writing-checklist.md` | `2444caf310b03243501af872e5e087854f79a935d289b185dd1e6fc9a06cb0eb` |
| `references/title-formulas.md` | `e9d0d47c2c93dce7e8a04622c7cf7f26dc63116795b4a0feb167e7271fe43f29` |
| `references/content-structure-templates.md` | `f37dfd001669a2c35a44fa6be5b34b99c4eb4c38fe71a471a990cf88252f8bd6` |

Ссылки upstream на общий `memory/`, sibling skills, `CONNECTORS.md` и repository-level `skill-contract.md` могут отсутствовать при установке одного skill. Это не блокирует inline-черновик статьи. Не имитируй отсутствующую память, не создавай её вне проекта и не объявляй недоступный auditor выполненным.

## Preflight

Перед написанием статьи:

1. Найди установленный skill с именем `seo-content-writer`.
2. Прочитай `SKILL.md` полностью.
3. Проверь SHA-256 `SKILL.md`.
4. Проверь наличие и SHA-256 четырёх локальных reference-файлов, затем прочитай их полностью.
5. Собери факты проекта, аудиторию, цель, язык, tone of voice, primary keyword, search intent и CTA.
6. Отдели подтверждённые факты от гипотез и мест, где нужен источник.

Если skill отсутствует, checksum отличается или обязательный reference-файл повреждён:

- остановись до черновика;
- покажи expected и actual identity;
- предложи установить закреплённую версию через `$skill-installer`;
- не подменяй skill обычным генератором текста молча.

## Когда вызывать автоматически

Используй `$seo-content-writer` для:

- новой SEO-статьи или поста в блог;
- how-to guide, comparison, listicle, pillar article, review или FAQ-материала;
- длинного информационного материала под заданный поисковый запрос;
- явной просьбы пользователя применить `$seo-content-writer`.

Не вызывай автоматически для:

- hero, offer, CTA, карточек, подписей, форм, навигации и другого короткого текста интерфейса;
- content preview одного обычного блока страницы;
- общего tone of voice, messaging или редакционных правил проекта;
- technical SEO, metadata-only, schema, robots, sitemap и deployment;
- обновления старой статьи: закреплённый skill сам отправляет такую задачу к `content-refresher`, который пока не входит в эту интеграцию.

Хотя upstream description упоминает landing pages и product descriptions, Prompt Kit не запускает полный skill автоматически для обычных текстов сайта. Вместо этого `site-copy-quality.md` использует лёгкий нативный слой: direct answer before persuasion, heading-to-body promise, claim-to-evidence support, concrete entities, decision-state CTA и semantic closure. `Site copy fast pass` работает внутри существующего content preview/smoke-check и не требует чтения skill/references, checksum preflight, article research или дополнительного approval. Явная просьба пользователя применить полный skill к такой странице допустима, если scope и факты зафиксированы.

## Разделение ответственности

`seo-content-writer` владеет:

- выбором article structure;
- SEO-структурой H1/H2/H3;
- title/meta draft;
- natural keyword placement;
- snippet-ready block, FAQ и link recommendations;
- CORE-EEAT self-check из upstream references.

Prompt Kit владеет:

- подтверждёнными project facts, claims, audience и offer;
- актуальностью источников и честными `[needs source]`;
- границами текущей задачи, permissions и местом сохранения результата;
- понятным объяснением результата пользователю;
- нативным лёгким контрактом для page copy и решением, нужен ли полный skill по явной просьбе пользователя.

## Handoff в skill

Перед явным вызовом передай:

```md
## seo-content-writer invocation
- Deliverable:
- Language:
- Primary keyword:
- Secondary keywords:
- Search intent:
- Audience:
- Content type:
- Target length:
- Tone of voice:
- Approved facts and claims:
- Required sources / source gaps:
- Internal links available:
- Competitor or SERP evidence:
- CTA goal:
- In scope:
- Out of scope:
```

Не заставляй пользователя повторять данные, которые уже есть в brief, strategy, messaging, editorial rules или текущем сообщении.

## Truth и research gates

- Не придумывай статистику, исследования, даты, цитаты, кейсы, клиентов, результаты и ссылки.
- Для сведений, которые могли измениться, проверь актуальные первичные источники.
- Если пользователь не просил research и источника нет, используй `[needs source]` вместо правдоподобной выдумки.
- Keyword не должен ломать русскую грамматику или повторяться механически.
- Search intent важнее формального количества вхождений.
- Title, meta и CTA не обещают того, чего статья не доказывает.

## Done when

- установленный upstream skill и четыре reference-файла полностью прочитаны и совпадают с pinned identity;
- `$seo-content-writer` вызван явно для статьи;
- структура и self-check принадлежат upstream skill, а не упрощённому пересказу Prompt Kit;
- черновик отвечает search intent и остаётся удобным для человека;
- все source-needing claims имеют источник или `[needs source]`;
- короткие тексты обычных блоков сайта не были незаметно переведены на новый стандарт;
- upstream-файлы не изменены и не попали в Prompt Kit payload.
