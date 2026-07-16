# Уточнить active visual concept

## Когда использовать

После `concept-feedback.md` со статусом `needs iteration`. Если направление отвергнуто целиком, вернись к `03-design-concept-prototypes.md` и следующей hypothesis.

## Роль Codex

Ты art director, который делает одну содержательную итерацию, а не прячет слабую идею под случайным декором.

## Цель

Обновить тот же live concept, сохранить одобренное, выполнить 1–3 изменения пользователя, осмотреть render и сделать один self-fix.

## Контекст, который нужно дать

- `docs/design-system/concepts/concept-feedback.md`.
- Текущие `index.html`, `styles.css` и QA screenshots.
- `design-lab/design-concepts/concept-decisions.md`, если есть.
- Active creative brief и hypothesis.
- Новые реальные assets/references пользователя.
- `prompts/_guidelines/creator-critic-design-workflow.md`.
- Релевантные, а не все подряд, разделы design/copy/accessibility knowledge.

## Ограничения

- Не меняй hypothesis, если feedback просит refinement.
- Не создавай параллельный второй concept и не переходи в production `src/`.
- Не меняй то, что пользователь явно попросил сохранить.
- Не исправляй слабую композицию случайными gradients, cards, icons, motion или fake dashboard.
- Не подделывай proof и не копируй reference 1:1.

## Процесс

1. Сожми feedback до:
   - `Keep` — одна сильная часть;
   - `Change` — 1–3 наблюдаемых изменения;
   - `Freedom` — что Codex решает сам;
   - `Hard invariants` — максимум три.
2. Выбери один главный композиционный ответ на feedback. Если нужны media, pictogram или motion, включи их в primary/secondary expressive lever; отдельные предварительные таблицы не нужны.
3. Обнови тот же `index.html` и `styles.css`. Изменение должно быть заметно в композиции, hierarchy, focal object или предметности, а не только в оттенке акцента.
4. Перезагрузи live preview и осмотри mobile, `1440` и `2560 CSS px` screenshots.
5. Переключись в critic после render. Назови максимум три видимые проблемы, связанные с запросом пользователя, continuity, readability, asset honesty или viewport failure.
6. Сделай один self-fix по самой важной проблеме и повторно осмотри три screenshots.
7. После финального render обнови короткий `concept-decisions.md` фактическими media/icon/motion decisions или reasoned skips.
8. Добавь в `concept-feedback.md` короткую секцию `Iteration`: что сохранено, что изменено, что исправлено после render.
9. Обнови `docs/project-state.md`.

## Output

Обнови:

- `design-lab/design-concepts/index.html`;
- `design-lab/design-concepts/styles.css`;
- `design-lab/design-concepts/concept-decisions.md`;
- `qa-mobile.png`, `qa-desktop.png`, `qa-wide.png`;
- `docs/design-system/concepts/concept-feedback.md`.

В ответе покажи live preview, три главных изменения и что пользователю нужно оценить. Не публикуй внутренний failure report.

## Done when

- Сохранена одобренная часть active concept.
- Выполнены 1–3 изменения feedback.
- Live preview и mobile / 1440 / 2560 screenshots обновлены и осмотрены.
- Critic сработал после render; выполнен один self-fix.
- Нет fake proof, копирования 1:1 или блокирующей accessibility проблемы.
- `src/` не изменён, `docs/project-state.md` обновлён.

## Follow-up

Вернись к `prompts/05-design-system/04-design-concept-feedback.md`.

Если пользователь прямо утвердил refined concept, следующий шаг: `prompts/05-design-system/06-approve-design-direction.md`.
