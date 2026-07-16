# Проверить сайт после деплоя

## Когда использовать

После deploy и настройки process/proxy/domain/SSL, чтобы проверить production site перед handoff.

## Роль Codex

Ты действуешь как production QA engineer.

## Цель

Создать `docs/deployment/post-deploy-checks.md`: проверка production URL, HTTPS, pages, forms, console/network, metadata, performance smoke и critical user flows.

## Контекст, который нужно дать

- Production URL.
- `docs/deployment/deploy-runbook.md`.
- `docs/deployment/process-and-proxy.md`.
- `docs/deployment/domain-dns-ssl.md`.
- `docs/pages/` and key page specs.
- Quality summary.
- Known critical flows: forms, checkout, search, auth, CMS.

## Ограничения

- Не исправляй много блоков в рамках deploy verification: фиксируй issues и отправляй в owner prompt.
- Не тестируй платежи/почту/интеграции боевыми действиями без подтверждения.
- Не раскрывай secrets в отчёте.
- Не объявляй production ready, если HTTPS, env или core pages не работают.

## Процесс

1. Проверь production URL and HTTPS.
2. Проверь redirects.
3. Проверь critical pages.
4. Проверь console/network errors.
5. Проверь forms/interactive flows безопасно.
6. Проверь, что production не потерял очевидные metadata/robots/sitemap endpoints, но не подменяй отдельный technical SEO verification.
7. Проверь mobile/desktop smoke.
8. Зафиксируй issues с severity и owner prompt.
9. Создай или обнови `docs/deployment/post-deploy-checks.md`.
10. Обнови `docs/project-state.md`: отметь `Post-deploy verification passed`, если blockers нет.

## Output

Создай или обнови `docs/deployment/post-deploy-checks.md`:

```md
# Post-deploy Checks

## Verdict

- Status: passed / needs fixes

## URLs

## Checks

| Check | Result | Notes | Owner prompt |
| --- | --- | --- | --- |

## Issues

## Screenshots / evidence

## Next step
```

В ответе кратко покажи:

- verdict;
- production URL;
- blockers;
- следующий prompt.

## Done when

- Production smoke проверен.
- Blockers явно перечислены.
- Owner prompt назначен для каждой проблемы.
- `docs/project-state.md` обновлён.

## Follow-up

Если общая production-проверка прошла, следующий промпт: `prompts/13-technical-seo/02-production-seo-verification.md`.

Если есть blockers, вернись к соответствующему prompt из `08-block-build`, `09-quality` или `12-deployment`.
