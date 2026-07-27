# Проверить готовность блока

## Когда использовать

После structure, styling, responsive и interaction/states pass для одного блока, перед `09-quality`.

## Роль Codex

Ты действуешь как senior frontend reviewer, design QA и scope guard.

## Цель

Создать или обновить `docs/pages/[page-slug]/blocks/[block-slug]-build-review.md`: финальный review одного блока с verdict `Block ready` или `needs fixes`.

## Контекст, который нужно дать

- Build plan.
- Block spec.
- Page spec.
- Реализованный блок.
- Design system docs.
- Проверки responsive/interaction, если они были.
- `prompts/_knowledge/ui-design-quality.md`.
- `prompts/_knowledge/site-copy-quality.md`, если блок содержит или меняет user-facing copy.
- `prompts/_guidelines/creator-critic-design-workflow.md`.
- `prompts/_guidelines/gpt-taste-integration.md`, original design plan и correction evidence, если result создан gpt-taste.
- Локальный URL или инструкции запуска, если есть.
- Список изменённых файлов.

## Ограничения

- Не исправляй несколько primary scopes. Для marketing chapter можно сделать full-page eyes-check и одну узкую spacing/surface/transition/alignment/media-handoff correction.
- Product/business logic остаётся one-block strict.
- Не ставь `Block ready`, если block spec не выполнен, адаптив явно сломан или соседние блоки изменены.
- Не скрывай нерешённые проверки.
- Не переходи к следующему block spec без фиксации текущего результата.
- Не ставь `Block ready`, если видимый пользовательский текст изменён или создан, но не прошёл короткий `Site copy check`.
- Не ставь `Block ready`, если Desktop Canvas Contract не проверен и wide desktop растягивает core composition или не имеет evidence.
- Не ставь `Block ready`, если correct responsive canvas появляется только после mount/hydration или critical media/measured surface не резервирует геометрию.

## Процесс

1. Сверь реализацию с block spec и build plan.
2. Проверь scope: изменён только текущий блок и необходимые integration points.
3. Проверь design-system соответствие: tokens, layout, components, accessibility.
4. Задай viewport до fresh reload, открой live result и просмотри early/settled state на mobile, 1440 и wide guard >=2560 CSS px.
5. Проверь viewport-dependent render branch, hydration warnings, reserved geometry и responsive media resource/loading role.
6. Как critic, выбери максимум три главные проблемы; полный UI checklist оставь `09-quality`.
7. Проверь approved meaning/facts/claims/voice/action, responsive и interaction readiness.
8. Проверь provisional expressive pattern и выбери keep/revise/remove.
9. Если нужен focused visual fix:
   - native → внеси его напрямую;
   - gpt-taste → верни findings/evidence `$gpt-taste` и примени его correction.
   Base может прямо закрыть non-redesign truth/accessibility/runtime/responsive-delivery failure. Затем повторно просмотри screenshots.
10. Для native marketing chapter разрешена одна узкая correction после full-page evidence. Для gpt-taste любую visual chapter correction верни skill. Задокументируй её; product/business соседи не меняй.
11. Создай или обнови `docs/pages/[page-slug]/blocks/[block-slug]-build-review.md`.
12. Если блок готов, обнови `docs/project-state.md`: отметь `Current block implemented`, следующий промпт `prompts/09-quality/01-quality-preflight.md`.
13. Если не готов, укажи, к какому `08-block-build` промпту вернуться.

## Output

Создай или обнови `docs/pages/[page-slug]/blocks/[block-slug]-build-review.md` в формате:

```md
# Block Build Review: [Block name]

## Verdict

- Status: Block ready / needs fixes
- Confidence:
- Next prompt:

## Screenshots

- Mobile:
- 1440 CSS px:
- Wide guard >=2560 CSS px:
- First frame vs settled state:
- Post-mount canvas correction:
- Responsive media / reserved geometry:

## Top findings (maximum 3)

## One fix and recheck

## Provisional pattern decision

## Chapter corrections

## Site copy check

- User-facing copy present/changed:
- `prompts/_knowledge/site-copy-quality.md` used:
- Notes:

## Changed files

## Project state update
```

В ответе кратко покажи:

- verdict;
- что изменено;
- blockers;
- следующий prompt по router.

## Done when

- Есть явный verdict.
- Проверено соответствие block spec.
- Product/business scope не расползся; marketing chapter corrections остаются узкими и записаны.
- Post-render critic назвал максимум три findings и сделал один focused fix/recheck; полный UI quality check передан в `09-quality`.
- Site copy check пройден, если блок содержит пользовательский текст, или конкретные fixes отправлены в нужный `08-block-build` prompt.
- Responsive/interaction risks зафиксированы.
- Desktop Canvas Contract пройден; native/non-redesign technical fix может вернуться в `04-responsive-pass`, а visual recomposition gpt-taste возвращается skill.
- First-render Responsive Delivery Contract пройден; иначе non-redesign technical fix возвращён в responsive pass/shared foundation, а visual change gpt-taste — skill.
- Если статус `Block ready`, следующий шаг ведёт в `09-quality`.
- `docs/project-state.md` обновлен.

## Follow-up

Если `Block ready`, следующий промпт: `prompts/09-quality/01-quality-preflight.md`.

Если `needs fixes`, вернись к одному из промптов:

- gpt-taste visual/composition/chapter finding → `prompts/08-block-build/00-gpt-taste-creative-build.md`;
- native или non-redesign technical failure → соответствующий `02-build-block-structure.md`, `03-style-block-from-design-system.md`, `04-responsive-pass.md` или `05-interaction-and-states-pass.md`.
