# Собрать deployment brief

## Когда использовать

Когда пользователь хочет разместить сайт на сервере, VPS, hosting platform или подготовить production deploy, но ещё не зафиксированы цель деплоя, инфраструктура, домен, env и ограничения.

## Роль Codex

Ты действуешь как DevOps-minded Next.js engineer и deployment planner.

## Цель

Создать `docs/deployment/deployment-brief.md`: куда и как планируется деплоить сайт, какие доступы есть, какие риски и какие шаги нужны до production.

## Контекст, который нужно дать

- `docs/project-state.md`.
- `docs/nextjs/next-ready-review.md`.
- `docs/nextjs/technical-architecture.md`.
- `docs/quality/application-flow-check.md`, если scope содержит формы, CMS, auth, commerce или project-level handoff.
- `docs/pages/` и quality summary, если сайт уже готов.
- Hosting target: VPS/server, Vercel, Netlify, Docker, shared hosting или другое.
- IP сервера, домен, DNS provider, если есть.
- Предпочтительный способ запуска: Node process, Docker, static export, managed platform.
- Known env vars, integrations, analytics, forms, CMS, payment, email.
- Ограничения по бюджету, региону, доступам и безопасности.

## Ограничения

- Не подключайся к серверу и не меняй инфраструктуру в этом промпте.
- Не деплой сайт до quality/build readiness.
- Не записывай пароли, tokens, private keys или secret values в docs.
- Не выбирай production strategy вслепую: разделяй confirmed, hypothesis и open question.
- Не объединяй server access, hardening, env, domain, deploy и monitoring в один шаг.

## Процесс

1. Определи deployment target и текущую готовность сайта.
2. Проверь, есть ли quality summary, применимый application flow check и успешный build.
3. Зафиксируй доступы, которые нужны, без хранения секретов.
4. Выбери предварительную deployment strategy.
5. Перечисли env/secrets, domain/DNS/SSL, runtime и monitoring needs.
6. Раздели blockers на `must fix before deploy`, `can configure during deploy`, `after deploy`.
7. Создай или обнови `docs/deployment/deployment-brief.md`.
8. Обнови `docs/project-state.md`: отметь `Deployment target selected`, следующий prompt.

## Output

Создай или обнови `docs/deployment/deployment-brief.md`:

```md
# Deployment Brief

## Target

- Type:
- Provider/server:
- Domain:
- Runtime strategy:

## Readiness

- Quality passed:
- Application flows checked:
- Build passed:
- Known blockers:

## Access

- Server/IP:
- User:
- SSH key needed:
- Secrets stored in docs: no

## Env and integrations

## Risks

## Open questions

## Recommended deployment route

## Project state update
```

В ответе кратко покажи:

- target;
- blockers;
- следующий prompt;
- нужна ли настройка SSH.

## Done when

- Deployment target понятен или open questions явно зафиксированы.
- Секреты не сохранены в документации.
- Понятно, можно ли переходить к SSH/server access.
- Для динамических/интеграционных проектов application-wide scenarios проверены или записаны как blocker.
- `docs/project-state.md` обновлён.

## Follow-up

Если нужен сервер/VPS доступ, следующий промпт: `prompts/12-deployment/02-server-access-and-ssh.md`.

Если SSH уже настроен, следующий промпт: `prompts/12-deployment/03-server-baseline-security.md`.
