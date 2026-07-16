# Определить iconography system

## Когда использовать

После approved concept и design direction, до tokens, components и production build.

## Роль Codex

Ты design systems lead: отделяешь стабильные функциональные знаки от ещё не доказанной marketing-пиктографии.

## Цель

Создать компактный `docs/design-system/iconography.md`: один основной способ показывать действия и состояния, правила доступности и provisional-направление для крупных pictograms, если они нужны concept.

## Контекст, который нужно дать

- Approved concept, design direction и Visual North Star.
- Temporary/functional icon needs из concept.
- IA и первые реальные section roles.
- Текущий frontend stack.
- `prompts/_guidelines/creator-critic-design-workflow.md`.
- Релевантные icon/accessibility разделы UI quality base.

## Ограничения

- Не смешивай несколько pack без ясной роли.
- Не используй icon вместо понятного label в критичном действии.
- Не копируй чужую branded iconography 1:1.
- Не устанавливай dependency на этом документальном шаге без отдельной технической причины.
- Не объявляй крупную marketing-пиктографику stable, пока она не проверена в 2–3 живых блоках.

## Stable и provisional

- `Stable`: смысл действий/статусов, labels, accessibility, icon-only controls, основной functional pack/style и правила optical sizing.
- `Provisional`: крупные pictograms, custom symbols, decorative icon compositions и motion accents для marketing-блоков.

## Процесс

1. Определи реальные роли: navigation, controls, states, forms, product/e-commerce UI, explanatory pictograms.
2. Если нужен functional pack, сравни 2–3 подходящих кандидата по style fit, coverage, license, Next.js fit и visual weight. Выбери один основной pack или честную custom/no-library strategy.
3. Зафиксируй stable правила: sizes by role, stroke/fill, color role, text labels, decorative `aria-hidden`, accessible name for icon-only controls, focus/disabled states.
4. Если concept использует крупные pictograms, опиши их provisional-направление одной короткой секцией: смысл, характер, где проверить, что будет считаться успехом.
5. Не составляй каталог всех возможных icons. Делай mapping только для компонентов/секций, которые уже есть в IA.
6. Назначь calibration после 2–3 живых marketing-блоков: keep / refine / replace provisional pictograms.
7. Создай `docs/design-system/iconography.md` и обнови `docs/project-state.md`.

## Output

```md
# Iconography

## Real roles
## Selected functional strategy
## Alternatives considered
## Stable functional rules
## Accessibility rules
## Provisional pictogram / large-symbol direction
## Real component mapping
## Calibration after 2–3 live blocks
## Install note
```

## Done when

- Есть одна functional icon strategy или обоснованный no-library вариант.
- Stable functional semantics и accessibility не оставлены provisional.
- Marketing pictograms допускаются как provisional vocabulary с calibration checkpoint.
- Нет случайного смешивания pack, fake proof или копирования 1:1.
- `docs/project-state.md` обновлён.

## Follow-up

Следующий промпт: `prompts/05-design-system/08-design-tokens.md`.
