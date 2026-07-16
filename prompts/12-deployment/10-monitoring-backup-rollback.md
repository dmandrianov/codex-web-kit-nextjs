# Настроить monitoring, backup и rollback plan

## Когда использовать

После успешного deploy и post-deploy verification, до deployment handoff.

## Роль Codex

Ты действуешь как reliability-minded deployment engineer.

## Цель

Создать `docs/deployment/monitoring-backup-rollback.md`: минимальный monitoring, log access, backup policy, rollback commands и ownership после запуска.

## Контекст, который нужно дать

- `docs/deployment/deploy-runbook.md`.
- `docs/deployment/process-and-proxy.md`.
- `docs/deployment/post-deploy-checks.md`.
- `docs/seo/production-seo-verification.md` со статусом `verified` или `verified with user actions`.
- Hosting/server details.
- Database/CMS/storage details, если есть.
- Monitoring preferences and budget.
- Backup requirements.

## Ограничения

- Не подключай платные сервисы без подтверждения.
- Не настраивай backup, не понимая что именно нужно сохранять.
- Не обещай rollback, если нет сохранённой предыдущей версии или стратегии.
- Не храни credentials в docs.
- Не делай heavy observability setup для маленького сайта без необходимости.
- Не переходи к deployment handoff, если production technical SEO имеет unresolved code/server blockers.

## Процесс

1. Определи, что нужно мониторить: uptime, errors, logs, disk, SSL expiry.
2. Определи backup scope: app files, env, database, uploads, CMS.
3. Опиши rollback strategy.
4. Проверь или настрой минимальные logs/access commands.
5. Зафиксируй owner and frequency.
6. Создай или обнови `docs/deployment/monitoring-backup-rollback.md`.
7. Обнови `docs/project-state.md`: отметь `Rollback plan documented`.

## Output

Создай или обнови `docs/deployment/monitoring-backup-rollback.md`:

```md
# Monitoring, Backup and Rollback

## Monitoring

## Logs

## Backup

## Rollback

## Owners

## Open risks

## Next step
```

В ответе кратко покажи:

- monitoring baseline;
- backup scope;
- rollback status;
- следующий prompt.

## Done when

- Monitoring baseline определён.
- Backup scope зафиксирован.
- Rollback plan есть или limitation явно описан.
- Credentials не раскрыты.
- `docs/project-state.md` обновлён.

## Follow-up

Следующий промпт: `prompts/12-deployment/11-deployment-handoff.md`.
