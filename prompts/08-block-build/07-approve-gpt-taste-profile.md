# Утвердить изменения continuity profile после блока или компонента

## Когда использовать

После того как пользователь увидел и явно одобрил `gpt-taste / block` или `gpt-taste / component`, а build создал `gpt-taste-profile-run-candidate.md`. Prompt создаёт первый approved profile или обновляет существующий.

Не используй этот prompt для page concept: там profile утверждается через `prompts/05-design-system/06-approve-design-direction.md`.

## Роль Codex

Ты design systems lead. Ты сохраняешь узнаваемые решения принятого результата, не превращая один блок/компонент в жёсткий layout-шаблон всего сайта.

## Цель

Проверить run candidate и live evidence, затем создать или обновить approved `docs/design-system/gpt-taste-profile.md` с locked identity, used/available architectures и open RNG choices для следующих runs.

## Контекст, который нужно дать

- Явный user approval.
- Current block/component spec и build review.
- Live preview и mobile / 1440 / 2560 screenshots.
- `gpt-taste-profile-run-candidate.md`.
- Existing `docs/design-system/gpt-taste-profile.md`, если есть.
- Original `design_plan` и final correction/recheck evidence.
- Visual North Star и existing design system, если есть.
- `prompts/_guidelines/gpt-taste-integration.md`.
- `prompts/_templates/gpt-taste-profile-template.md`.

## Ограничения

- Не утверждай profile без явного user approval и просмотренного live evidence.
- Не меняй UI, не запускай новый creator pass и не редизайни результат.
- Не объявляй stable выбор, который был невидим, случайно попал в код или не относится к project identity.
- Не lock layout конкретного блока, exact copy, crop и локальный motion только потому, что они присутствуют в одном specimen.
- Source/commit/SHA-256 должны совпадать с canonical integration identity.
- Accessibility, semantic actions/statuses, reduced motion и asset truth сохраняются как hard gates.

## Процесс

1. Проверь явный user approval, live evidence и matched skill identity.
2. Отдели:
   - `locked identity` — принятые type/color/radius/surface/action semantics и узнаваемые continuity anchors;
   - `used architectures` — фактически применённые layout/component/motion patterns;
   - `available architectures` — ещё не использованные варианты;
   - `open choices` — composition/media/motion решения, которые можно искать дальше.
3. Сохрани project seed и политику RNG: locked categories используют one-value pool, open categories — полный approved pool.
4. Зафиксируй motion family/budget и reduced-motion alternative только по реальному evidence.
5. Зафиксируй asset truth и missing assets.
6. Создай или обнови `docs/design-system/gpt-taste-profile.md` по template со status `approved`. Для существующего profile примени только evidence-backed delta из принятого run.
7. Обнови build review ссылкой на approved profile и убери двусмысленность candidate status; candidate можно сохранить как historical evidence.
8. Обнови `docs/project-state.md`: profile approved, creator engine/mode и следующий prompt.

## Output

Создай `docs/design-system/gpt-taste-profile.md`.

В ответе покажи:

- какие решения стали stable;
- что осталось open для следующих блоков/компонентов;
- какая architecture уже использована и чего не стоит повторять сразу;
- что пользователю сейчас делать не нужно.

## Done when

- Есть явный approval и live evidence.
- Canonical skill identity совпадает.
- Locked identity не содержит случайный local layout/copy.
- Used/available/open choices разделены.
- Seed/RNG и reduced-motion policy записаны.
- Accepted run candidate merged в approved docs profile без изменения upstream skill; rejected run не меняет canonical profile.
- Build review и project state обновлены.

## Follow-up

- Короткий smoke текущего результата: `prompts/09-quality/00-block-smoke-check.md`.
- Следующий standalone component без spec: `prompts/07-page-planning/00-gpt-taste-component-spec.md`.
- Следующий page-bound block: его content preview/build route из block spec.
