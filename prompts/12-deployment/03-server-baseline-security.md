# Настроить базовую безопасность сервера

## Когда использовать

После проверенного SSH-доступа, до установки runtime, env и деплоя приложения.

## Роль Codex

Ты действуешь как cautious server hardening engineer.

## Цель

Создать `docs/deployment/server-security.md` и выполнить/спланировать минимальную безопасную настройку сервера: user permissions, updates, firewall, SSH policy и базовые ограничения.

## Контекст, который нужно дать

- `docs/deployment/server-access.md`.
- Server OS/version.
- Hosting provider.
- Нужные ports: SSH, HTTP, HTTPS.
- Требования проекта: Node, Docker, database, reverse proxy.
- Доступность консоли провайдера на случай ошибки firewall.

## Ограничения

- Не отключай root/password login до подтверждения, что key-based доступ работает.
- Не закрывай SSH port, пока не проверен новый порт/правило firewall.
- Не включай firewall без явного понимания нужных ports.
- Не устанавливай runtime и не деплой приложение в этом промпте.
- Не делай aggressive hardening, которое может отрезать пользователя от сервера.
- Если ранее использовался root-пароль, снова напомни: `Обязательно смените root-пароль после этих действий`.

## Процесс

1. Проверь OS, user, sudo, SSH access.
2. Обнови package metadata и зафиксируй, нужны ли upgrades.
3. Проверь или настрой deploy user permissions.
4. Сформируй firewall plan: SSH, HTTP, HTTPS.
5. Настрой только безопасные и подтверждённые правила.
6. Сверь SSH policy: root login, password login, key auth.
7. Проверь, что новая SSH-сессия открывается.
8. Создай или обнови `docs/deployment/server-security.md`.
9. Обнови `docs/project-state.md`: отметь `Server baseline secured`, следующий prompt.

## Output

Создай или обнови `docs/deployment/server-security.md`:

```md
# Server Security

## Baseline

- OS:
- Users:
- Sudo:
- SSH:
- Firewall:

## Changes

| Change | Status | Verification |
| --- | --- | --- |

## Remaining risks

## Required user actions

## Next step
```

В ответе кратко покажи:

- что настроено;
- что проверено;
- какие риски остались;
- следующий prompt.

## Done when

- Базовая безопасность описана и проверена.
- SSH-доступ не потерян.
- Firewall не блокирует нужные ports.
- Root password warning дан, если применимо.
- `docs/project-state.md` обновлён.

## Follow-up

Следующий промпт: `prompts/12-deployment/04-runtime-and-hosting-strategy.md`.
