# Настроить доступ к серверу и SSH

## Когда использовать

Когда пользователь дал IP сервера, временный root-доступ или другой способ входа и нужно настроить безопасную SSH-коммуникацию с сервером до деплоя.

## Роль Codex

Ты действуешь как осторожный Linux/SSH operator и deployment engineer.

## Цель

Настроить проверяемый SSH-доступ к серверу, предпочтительно по ключу, создать `docs/deployment/server-access.md` без секретов и подготовить сервер к следующему security step.

## Контекст, который нужно дать

- `docs/deployment/deployment-brief.md`, если есть.
- IP сервера.
- SSH port, если отличается от `22`.
- User для входа: root или другой.
- Временный пароль, если пользователь его передал.
- Локальная ОС и shell.
- Желаемый deploy user, например `deploy`.
- Путь к существующему SSH key или разрешение создать новый.

## Ограничения

- Не сохраняй root-пароль, user password, private key или passphrase в файлы проекта.
- Если пользователь передал root-пароль, используй его только для первичной настройки и в конце обязательно напомни: `Обязательно смените root-пароль после этих действий`.
- Не отключай root login или password login, пока не проверен вход по SSH key.
- Не меняй firewall/ports в этом промпте, если это не нужно для первичного SSH-доступа.
- Не деплой приложение в этом промпте.
- Не выполняй destructive server commands.

## Процесс

1. Проверь, есть ли локальный SSH key. Если нет, предложи создать новый ключ.
2. Проверь SSH-доступ к серверу.
3. Если вход только по root-паролю, настрой SSH key для root или создай deploy user с ключом, в зависимости от контекста.
4. Проверь вход по ключу в новой SSH-сессии.
5. Зафиксируй способ доступа без секретов: host, user, port, key path, alias, known risks.
6. Если использовался root-пароль, добавь явное предупреждение о смене root-пароля после настройки.
7. Создай или обнови `docs/deployment/server-access.md`.
8. Обнови `docs/project-state.md`: отметь `SSH access configured`, следующий prompt.

## Output

Создай или обнови `docs/deployment/server-access.md`:

```md
# Server Access

## Server

- Host:
- SSH port:
- Primary user:
- Deploy user:

## SSH key

- Public key installed: yes/no
- Local key path:
- SSH config alias:

## Verification

- Root login tested:
- Deploy user login tested:
- Passwordless/key login tested:

## Security notes

- Secrets stored in docs: no
- Root password used during setup: yes/no
- Required user action:

## Next step
```

В ответе кратко покажи:

- как подключаться;
- что проверено;
- что не сохранено;
- предупреждение про root-пароль, если он использовался;
- следующий prompt.

## Done when

- SSH-доступ по ключу проверен или blocker явно описан.
- Секреты не записаны в docs.
- `docs/deployment/server-access.md` создан.
- Если использовался root-пароль, пользователь получил предупреждение сменить его.
- `docs/project-state.md` обновлён.

## Follow-up

Следующий промпт: `prompts/12-deployment/03-server-baseline-security.md`.
