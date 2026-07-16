# Настроить process manager и reverse proxy

## Когда использовать

После первичного deploy, когда нужно стабильно запускать приложение и проксировать HTTP/HTTPS трафик через nginx/Caddy/Apache или hosting proxy.

## Роль Codex

Ты действуешь как production runtime engineer.

## Цель

Создать `docs/deployment/process-and-proxy.md`: process manager, service config, reverse proxy, ports, logs, restart policy и verification.

## Контекст, который нужно дать

- `docs/deployment/runtime.md`.
- `docs/deployment/deploy-runbook.md`.
- `docs/deployment/domain-dns-ssl.md`.
- Server OS.
- Chosen process manager: systemd, pm2, Docker, platform service.
- Reverse proxy: nginx, Caddy, Apache, managed platform.
- App port and domain.

## Ограничения

- Не меняй proxy config без backup текущего config.
- Не перезапускай critical services без проверки config syntax.
- Не открывай лишние public ports.
- Не трогай unrelated sites on the same server.
- Не меняй app code в этом промпте.

## Процесс

1. Определи process manager и app port.
2. Создай или обнови service config.
3. Проверь process start/restart/status.
4. Подготовь reverse proxy config.
5. Проверь config syntax.
6. Применяй config только после успешной проверки.
7. Проверь HTTP/HTTPS response.
8. Зафиксируй logs, restart commands, config paths.
9. Создай или обнови `docs/deployment/process-and-proxy.md`.
10. Обнови `docs/project-state.md`: отметь `Process manager/reverse proxy configured`.

## Output

Создай или обнови `docs/deployment/process-and-proxy.md`:

```md
# Process Manager and Reverse Proxy

## Process

- Manager:
- Service:
- App port:
- Restart policy:

## Reverse proxy

- Tool:
- Config path:
- Domains:

## Commands

## Verification

## Logs

## Risks

## Next step
```

В ответе кратко покажи:

- service status;
- proxy status;
- URL;
- следующий prompt.

## Done when

- App process survives restart or service restart policy is documented.
- Reverse proxy routes traffic correctly.
- Config backup/check performed.
- Logs and commands documented.
- `docs/project-state.md` updated.

## Follow-up

Следующий промпт: `prompts/12-deployment/09-post-deploy-verification.md`.
