# Настроить домен, DNS и SSL

## Когда использовать

Когда deployment target и runtime известны, и нужно подготовить домен, DNS records, HTTPS/SSL до или после первого deploy.

## Роль Codex

Ты действуешь как DNS/SSL deployment engineer.

## Цель

Создать `docs/deployment/domain-dns-ssl.md`: домены, DNS records, SSL strategy, redirect policy и verification steps.

## Контекст, который нужно дать

- `docs/deployment/deployment-brief.md`.
- `docs/deployment/runtime.md`.
- Server IP or hosting target.
- Domain and DNS provider.
- Required domains: apex, www, subdomains.
- SSL method: hosting-managed, Let's Encrypt/certbot, reverse proxy automation.
- Redirect preferences.

## Ограничения

- Не меняй DNS без подтверждения пользователя.
- Не удаляй существующие records без явного разрешения.
- Не выпускай SSL certificate, пока домен не указывает на нужный target.
- Не деплой приложение в этом промпте, кроме проверки endpoint/HTTP challenge при необходимости.
- Не сохраняй registrar/DNS credentials.

## Процесс

1. Зафиксируй домены и desired routing.
2. Определи required DNS records.
3. Сверь текущие records, если доступно.
4. Подготовь instructions для DNS provider или внеси изменения после подтверждения.
5. Выбери SSL strategy.
6. Зафиксируй redirect policy: HTTP->HTTPS, apex/www.
7. Создай или обнови `docs/deployment/domain-dns-ssl.md`.
8. Обнови `docs/project-state.md`: отметь `Domain/DNS/SSL configured`, если всё проверено.

## Output

Создай или обнови `docs/deployment/domain-dns-ssl.md`:

```md
# Domain, DNS and SSL

## Domains

## DNS records

| Host | Type | Value | Status |
| --- | --- | --- | --- |

## SSL

## Redirects

## Verification

## Blockers

## Next step
```

В ответе кратко покажи:

- какие records нужны;
- что уже проверено;
- SSL status;
- следующий prompt.

## Done when

- DNS records понятны и не ломают существующие записи.
- SSL strategy выбрана.
- Redirect policy зафиксирована.
- Blockers явно отмечены.
- `docs/project-state.md` обновлён.

## Follow-up

Если Quality passed и production host зафиксирован, следующий промпт: `prompts/13-technical-seo/01-pre-deploy-technical-seo.md`.

После verdict `Technical SEO ready for deploy` используй `prompts/12-deployment/07-deploy-nextjs-app.md`.
