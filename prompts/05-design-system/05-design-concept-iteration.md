# Уточнить active visual concept

## Когда использовать

После `concept-feedback.md` со статусом `needs iteration`. Если направление отвергнуто целиком, вернись к `03-design-concept-prototypes.md` и следующей hypothesis.

## Роль Codex

Ты art director, который делает одну содержательную итерацию, а не прячет слабую идею под случайным декором.

## Цель

Обновить тот же live concept, сохранить одобренное, выполнить 1–3 изменения пользователя, осмотреть render и сделать один self-fix.

## Контекст, который нужно дать

- `docs/design-system/concepts/concept-feedback.md`.
- Текущий native lab или `design-lab/gpt-taste/page/` и его QA screenshots.
- Active `concept-decisions.md`: из native lab или gpt-taste page lab.
- Active creative brief и hypothesis.
- Creator engine/mode, `design-plan.md` и `gpt-taste-profile-candidate.md`, если применимо.
- Новые реальные assets/references пользователя.
- `prompts/_guidelines/creator-critic-design-workflow.md`.
- `prompts/_guidelines/gpt-taste-integration.md`, если creator engine — `gpt-taste`.
- Релевантные, а не все подряд, разделы design/copy/accessibility knowledge.

## Ограничения

- Не меняй hypothesis, если feedback просит refinement.
- Не создавай параллельный второй concept и не переходи в production `src/`.
- Не меняй то, что пользователь явно попросил сохранить.
- Не исправляй слабую композицию случайными gradients, cards, icons, motion или fake dashboard.
- Не подделывай proof и не копируй reference 1:1.
- Не перепроектируй `gpt-taste` concept обычным base creator.

## Процесс

1. Сожми feedback до:
   - `Keep` — одна сильная часть;
   - `Change` — 1–3 наблюдаемых изменения;
   - `Freedom` — что Codex решает сам;
   - `Hard invariants` — максимум три.
2. Выбери один главный композиционный ответ на feedback. Если нужны media, pictogram или motion, включи их в primary/secondary expressive lever; отдельные предварительные таблицы не нужны.
3. Обнови тот же active concept:
   - `native` — напрямую в `design-lab/design-concepts/`;
   - `gpt-taste` — полностью прочитай original skill, передай ему Keep/Change/evidence, явно вызови `$gpt-taste`, сохрани обновлённый `design_plan` и примени его correction в `design-lab/gpt-taste/page/`.
   Изменение должно быть заметно в композиции, hierarchy, focal object или предметности, а не только в оттенке акцента.
4. Перезагрузи live preview и осмотри mobile, `1440` и `2560 CSS px` screenshots.
5. Переключись в critic после render. Назови максимум три видимые проблемы, связанные с запросом пользователя, continuity, readability, asset honesty или viewport failure.
6. Сделай один self-fix по самой важной проблеме и повторно осмотри три screenshots. Для `gpt-taste` self-fix снова должен пройти через `$gpt-taste`.
7. После финального render обнови короткий `concept-decisions.md` фактическими media/icon/motion decisions или reasoned skips.
8. Добавь в `concept-feedback.md` короткую секцию `Iteration`: что сохранено, что изменено, что исправлено после render.
9. Обнови `docs/project-state.md`.

## Output

Для `native` обнови:

- `design-lab/design-concepts/index.html`;
- `design-lab/design-concepts/styles.css`;
- `design-lab/design-concepts/concept-decisions.md`;
- `qa-mobile.png`, `qa-desktop.png`, `qa-wide.png`;

Для `gpt-taste` обнови active runnable files в `design-lab/gpt-taste/page/`, а также:

- `design-lab/gpt-taste/page/design-plan.md`;
- `design-lab/gpt-taste/page/concept-decisions.md`;
- `design-lab/gpt-taste/page/gpt-taste-profile-candidate.md`;
- `design-lab/gpt-taste/page/qa-mobile.png`;
- `design-lab/gpt-taste/page/qa-desktop.png`;
- `design-lab/gpt-taste/page/qa-wide.png`.

В обеих ветках обнови `docs/design-system/concepts/concept-feedback.md`.

В ответе покажи live preview, три главных изменения и что пользователю нужно оценить. Не публикуй внутренний failure report.

## Done when

- Сохранена одобренная часть active concept.
- Выполнены 1–3 изменения feedback.
- Live preview и mobile / 1440 / 2560 screenshots обновлены и осмотрены.
- Critic сработал после render; выполнен один self-fix.
- Visual changes `gpt-taste` concept выполнены через `$gpt-taste`, а не base redesign.
- Нет fake proof, копирования 1:1 или блокирующей accessibility проблемы.
- `src/` не изменён, `docs/project-state.md` обновлён.

## Follow-up

Вернись к `prompts/05-design-system/04-design-concept-feedback.md`.

Если пользователь прямо утвердил refined concept, следующий шаг: `prompts/05-design-system/06-approve-design-direction.md`.
