# Подготовить env и secrets для production

## Когда использовать

После выбора runtime strategy, до production build/deploy.

## Роль Codex

Ты действуешь как security-conscious deployment engineer.

## Цель

Настроить required env без ручного редактирования секретного файла и создать `docs/deployment/env.md`: список переменных, места хранения и безопасные проверки без раскрытия значений.

## Контекст, который нужно дать

- `docs/deployment/runtime.md`.
- `.env.example`, если есть.
- `package.json`.
- Интеграции: CMS, forms, email, analytics, payments, maps, auth.
- Hosting platform или server strategy.
- Known production domains and callback URLs.
- Установленный `.prompt-kit/secret-input.mjs` для локального application-secret handoff.

## Ограничения

- Не записывай реальные secret values в docs, git, chat summary или examples.
- Не коммить `.env.production` с секретами.
- Не выдумывай tokens/API keys.
- Не проси вставлять application secret в чат, аргумент команды, patch или обычный видимый stdin. Даже если значение уже появилось в разговоре, не повторяй и не переноси его через tool call.
- По явной просьбе запусти `.prompt-kit/secret-input.mjs` в интерактивном terminal/PTY. Помощник сам проверяет untracked/ignored target, принимает значение без echo и записывает его с закрытыми правами.
- Если текущая задача была открыта до обновления Prompt Kit и ссылается на старое правило, объясни, что `AGENTS.md` загружается при старте задачи, и предложи новую задачу в том же проекте.
- Если permission profile технически запрещает `.env`, не обходи его. Назови причину и предложи одно безопасное действие: запустить masked helper в разрешённом локальном терминале либо использовать выбранный secret store.
- Не заканчивай ответ голой инструкцией «вставьте ключ в `.env`». Пользователь должен получить скрытый ввод или одно понятное действие без ручного редактирования файла.
- Root-пароли, private keys и passphrases не принимай и не сохраняй в проекте; для них используй отдельный credential/key workflow.
- Не запускай deploy, пока required env не подтверждены или явно помечены blocker.
- Не смешивай env setup с DNS/SSL.

## Процесс

1. Найди required env vars по коду, docs и `.env.example`.
2. Раздели public env и secret env.
3. Определи, где они задаются: local ignored env file, server file, systemd env, platform dashboard, Docker secrets или CI.
4. Для локального application secret выбери точное имя переменной и по умолчанию `.env.local`; public/client-prefixed переменные не выдавай за секретные.
5. До запроса значения запусти preflight помощника. Затем открой скрытый ввод командой без secret value: `node .prompt-kit/secret-input.mjs set --name <ENV_NAME> --file .env.local --project <root>`.
6. Сообщи обычными словами: `Я подготовил безопасное место. Вставьте ключ в открывшееся поле и нажмите Enter. Символы отображаться не будут; файл я обновлю сам.`
7. После успешного JSON-result проверь только имя переменной, target и готовность интеграции; значение не читай и не печатай. Учитывай, что уже работающий процесс может потребовать разрешённый пользователем restart.
8. Если helper вернул blocker, расшифруй его: stale task, target tracked/not ignored, denied permission, no PTY, symlink/ambiguous env или unsupported credential. Не проси ручного редактирования как первую альтернативу.
9. Зафиксируй missing values как open questions/blockers.
10. Проверь production URLs/callbacks.
11. Создай или обнови safe `.env.example`, если это уместно и только с именами/placeholder values.
12. Создай или обнови `docs/deployment/env.md` без secret values.
13. Обнови `docs/project-state.md`: отметь `Env/secrets configured` только если blockers закрыты.

## Output

Создай или обнови `docs/deployment/env.md`:

```md
# Production Env and Secrets

## Required variables

| Name | Type | Required | Source | Set where | Status |
| --- | --- | --- | --- | --- | --- |

## Public env

## Secret env

## Missing values / blockers

## Verification

## Next step
```

В ответе кратко покажи:

- какие env required;
- какие blockers остались;
- куда сохранены переданные значения, не показывая сами значения;
- следующий prompt.

Если нужен ввод пользователя, вместо технической инструкции используй:

```md
Я подготовил безопасное место для ключа. Вставьте его в открывшееся поле и нажмите Enter. Символы отображаться не будут. После этого я сам закончу настройку.
```

## Done when

- Required env vars перечислены.
- Секреты не раскрыты и не попали в docs, Git, logs, reports или backups.
- Локальные application secrets проходят через masked helper или выбранный secret store, а не через чат, command args или ручное редактирование файла.
- Helper подтвердил untracked/ignored target и не вывел значение.
- Missing values явно отмечены.
- Production env готов или blocker честно указан.
- `docs/project-state.md` обновлён.

## Follow-up

Если env готов, следующий промпт: `prompts/12-deployment/06-domain-dns-ssl.md`.

Если env blockers есть, назови точную причину и одно безопасное действие пользователя. Не ограничивайся словами `system restriction` и не предлагай ручное редактирование env без объяснения.
