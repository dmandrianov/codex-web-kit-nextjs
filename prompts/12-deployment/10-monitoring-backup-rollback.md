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
- `docs/nextjs/technical-architecture.md`.
- `docs/quality/application-flow-check.md`, если применимо.
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

1. Определи, что нужно мониторить: uptime/health, runtime errors, structured logs, Web Vitals важных routes, integration/webhook failures, disk и SSL expiry.
2. Свяжи logs/errors с deploy version или `deploymentId`, не записывая secrets и лишние персональные данные.
3. Для CMS, forms, auth и commerce определи отдельные failure signals и owner реакции.
4. Определи backup scope: app files, env reference, database, uploads, CMS export и stateful queues/storage.
5. Опиши rollback strategy, совместимость database migrations и способ проверить восстановление.
6. Проверь или настрой минимальные logs/access commands и alerts по подтверждённому бюджету.
7. Зафиксируй owner, threshold и frequency.
8. Создай или обнови `docs/deployment/monitoring-backup-rollback.md`.
9. Обнови `docs/project-state.md`: отметь `Rollback plan documented`.

## Output

Создай или обнови `docs/deployment/monitoring-backup-rollback.md`:

```md
# Monitoring, Backup and Rollback

## Monitoring

| Signal | Why | Threshold | Owner | Response |
| --- | --- | --- | --- | --- |

## Logs

## Integrations and webhooks

## Backup

## Rollback

## Restore verification and migrations

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
- Runtime, Web Vitals и критичные integration/webhook failures имеют применимые signals.
- Backup scope зафиксирован.
- Rollback plan, migration compatibility и restore verification есть или limitation явно описан.
- Credentials не раскрыты.
- `docs/project-state.md` обновлён.

## Follow-up

Следующий промпт: `prompts/12-deployment/11-deployment-handoff.md`.
