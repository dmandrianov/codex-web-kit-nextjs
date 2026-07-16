# Зафиксировать фидбек по visual concept

## Когда использовать

После того как пользователь посмотрел один active concept в live browser.

## Роль Codex

Ты design facilitator: не защищаешь работу и не пишешь отчёт, а переводишь реакцию пользователя в понятное решение.

## Цель

Коротко зафиксировать: concept утверждён, нуждается в одной focused iteration, отвергнут в пользу следующей hypothesis или требует нового shortlist.

## Контекст, который нужно дать

- Live `design-lab/design-concepts/index.html`.
- `qa-mobile.png`, `qa-desktop.png`, `qa-wide.png`.
- `docs/design-system/concepts/style-shortlist.md`.
- Комментарий пользователя и новые references/assets, если появились.
- `prompts/_guidelines/creator-critic-design-workflow.md`.

## Ограничения

- Не спорь со вкусом пользователя.
- Не создавай новый concept в этом шаге.
- Не превращай одно замечание в новый длинный avoid-list.
- Не ставь `approved`, если пользователь не видел live preview или если mobile / 1440 / 2560 evidence показывает hard failure.
- Фразы `вообще не нравится`, `не туда`, `не мой стиль` означают смену hypothesis, а не косметический ремонт, если пользователь прямо не попросил обратное.

## Процесс

1. Если пользователь уже дал фидбек, не задавай повторные вопросы. Если нет — спроси одним сообщением:
   - что точно оставить;
   - что мешает;
   - продолжать это направление или пробовать следующее.
2. Определи один mode:
   - `approved`;
   - `needs iteration`;
   - `rejected, try next hypothesis`;
   - `needs new shortlist`.
3. Переведи слова пользователя в 1–3 наблюдаемых изменения: например, focal object, scale, density, color role, media, typography, CTA или rhythm.
4. Зафиксируй одну сильную часть `Keep` и максимум три пункта `Change`. Не дополняй feedback своими десятью замечаниями.
5. Убедись, что concept действительно был осмотрен на mobile, `1440` и `2560 CSS px`. Полная `1920/3840` matrix относится к позднему системному/page-level review по применимости.
6. Создай или обнови `docs/design-system/concepts/concept-feedback.md`.
7. Обнови `docs/project-state.md` и следующий промпт.

## Output

```md
# Design Concept Feedback

## Active concept

## What the user wants to keep

## What must change
1.
2.
3.

## Evidence sanity
- Live preview viewed:
- Mobile / 1440 / 2560:
- Hard failure:

## Decision
- Status: approved / needs iteration / rejected, try next hypothesis / needs new shortlist
- Next hypothesis:
- Next prompt:
```

В ответе скажи обычными словами только решение, что остаётся, что меняется и что будет дальше.

## Done when

- Решение основано на live concept и пользовательском фидбеке.
- Keep и Change короткие и наблюдаемые.
- Feedback не превратился в отчёт или новый каталог запретов.
- Есть один ясный status и следующий prompt.
- `docs/project-state.md` обновлён.

## Follow-up

- `approved` → `prompts/05-design-system/06-approve-design-direction.md`.
- `needs iteration` → `prompts/05-design-system/05-design-concept-iteration.md`.
- `rejected, try next hypothesis` → `prompts/05-design-system/03-design-concept-prototypes.md`.
- `needs new shortlist` → `prompts/05-design-system/02-design-style-shortlist.md`.
