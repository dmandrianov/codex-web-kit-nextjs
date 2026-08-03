# Project State

`docs/project-state.md` — короткий текущий снимок конкретного сайта. Он создаётся после первой диагностики и обновляется после значимого шага. Это не журнал всей разработки и не общий чек-лист Prompt Kit.

## Что читать

- Перед маршрутизацией читай только `docs/project-state.md`.
- Подтверждение выполненных этапов ищи в указанных артефактах и review-файлах.
- `docs/project-history.md` открывай только когда нужно восстановить старое решение или ход изменений.
- Не переноси состояние, историю или факты одного сайта в исходный Web Kit и другой проект.

## Бюджет

- Текущий снимок — не более `8192` байт.
- Не добавляй в него общий список всех возможных этапов и проверок.
- Если снимок разросся, сначала сделай резервную копию, затем перенеси устаревшую хронологию без потери текста в `docs/project-history.md`.
- История принадлежит только конкретному сайту и не входит в Release Prompt Kit.

## Шаблон

```md
# Project State

## Current snapshot

- Stage: unknown
- Confidence: low
- Active scope: page / block / task / none
- Ecommerce flag: no
- Deployment flag: no
- CMS status: not checked / not needed / needed / selected / needs decision
- Technical architecture: not checked / ready / needs decisions
- Application flows: not applicable / not checked / ready / needs fixes / blocked
- Technical SEO: not checked / pre-deploy ready / production verified / needs fixes
- Design pass: none / creator ready / rendered / critic reviewed / self-fixed / quality checked
- Creator engine: native / gpt-taste / not applicable
- Last updated: YYYY-MM-DD

## Latest completed result

- Completed:
- Evidence:
- Checks:
- Outcome:

## Blockers and open decisions

- Blockers:
- Needs user confirmation:
- Open decisions:

## Authoritative artifacts

| Area | Current source of truth |
| --- | --- |
| Brief and strategy | |
| IA and content | |
| Design system | |
| Technical architecture | |
| Active page or block | |
| Quality / SEO / deploy | |

## Kit compatibility

- Installed version:
- Manifest: `.prompt-kit/manifest.json`
- Update source repository ID:
- Last update result: not checked / current / updated / rolled back / blocked
- Workflow alignment: not checked / aligned / needs user choice / blocked
- Alignment evidence: `docs/prompt-kit-workflow-alignment.md`

## Recommended next prompt

- Prompt:
- Why:
- Needs confirmation: yes / no
- Suggested user command:
```

Удаляй пустые неприменимые строки, если они не помогают текущему проекту. Для особого workflow можно добавить один короткий флаг, но не копировать профильный checklist.

## Правила обновления

- Меняй stage только после появления подтверждающего артефакта или review.
- При низкой уверенности оставляй stage прежним и записывай пробел в `Open decisions`.
- `Latest completed result` хранит только последний значимый результат; более старую хронологию при необходимости веди в `docs/project-history.md`.
- `Authoritative artifacts` содержит ссылки, а не копии их содержимого.
- Для магазина сохраняй `Ecommerce flag: yes`; детальную готовность доказывает `docs/ecommerce/ecommerce-review.md`.
- Для CMS фиксируй решение из реального редакторского процесса, а не установку «на будущее».
- Для design creator/critic сохраняй только текущий engine/pass и ссылку на profile или review; подробные критерии остаются в design artifacts.
- До render не объявляй полный UI/copy compliance. Полные checklist относятся к quality stage.
- Для application flows, technical SEO и deployment записывай короткий статус и ссылку на профильный review.
- После обновления Prompt Kit обновляй kit version и alignment, но не откатывай готовые стадии сайта автоматически.
- Версию определяй по `.prompt-kit/manifest.json`; legacy fallback используй только при контролируемой миграции.
- Не записывай Git remote, branch или commit пользовательского сайта: updater ими не управляет.
- Не записывай значения секретов, credential paths или персональные данные доступа в state, history, reports и backups; указывай только имена env и место хранения. Локальный application secret передаётся через `.prompt-kit/secret-input.mjs`, не через state или чат.
- Update source считается verified только после всех trust/integrity проверок maintenance-маршрута.
- Следующий prompt должен быть один. Добавь естественную короткую команду пользователя, а технический путь оставь служебной деталью.
- В ответе человеку переводи state обычным языком по `prompts/_knowledge/codex-user-response-quality.md`.
