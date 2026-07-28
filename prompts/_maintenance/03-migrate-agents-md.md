# Мигрировать AGENTS.md на managed-блок

## Когда использовать

Когда проект использует legacy-версию Prompt Kit или вручную изменённый `AGENTS.md` без однозначной пары markers `PROMPT_KIT:BEGIN` / `PROMPT_KIT:END`, поэтому safe updater не может заменить только managed fragment.

Если миграция вызвана командой `обнови базу`, сначала должны быть проверены GitHub Release, archive checksum и incoming manifest по `prompts/_maintenance/01-update-prompt-kit.md`. Первый legacy transition требует явного подтверждения пользователя; одна исходная фраза `обнови базу` не разрешает автоматически разделять старый смешанный `AGENTS.md`.

## Роль Codex

Ты действуешь как careful migration engineer, который сохраняет локальные правила проекта и готовит `AGENTS.md` к будущим manifest-based updates.

## Цель

Создать ровно один управляемый блок Prompt Kit в `AGENTS.md`, перенести в него только проверенный canonical router fragment, сохранить project-specific content снаружи и вернуть управление updater preflight без преждевременной установки новой версии.

## Контекст, который нужно дать

- Текущий полный `AGENTS.md`.
- Verified incoming `AGENTS.md` из staging GitHub Release.
- Incoming `.prompt-kit/manifest.json` с policy `managed-block`.
- Текущий `prompts/OWNERSHIP.md`, если он есть.
- Incoming `.prompt-kit/MIGRATIONS.md`.
- `docs/project-rules.md` и другие места локальных правил, если они есть.
- Backup path текущей update-транзакции, если migration запущена из `01-update-prompt-kit.md`.
- Явное подтверждение legacy transition, если оно уже получено.

## Ограничения

- Не используй непроверенный локальный архив или случайный `AGENTS.md` как source managed fragment.
- Не удаляй и не сокращай локальные правила пользователя.
- Не помещай `Project-specific context`, доменные ограничения, команды проекта, пользовательские предпочтения или ссылки на project docs внутрь managed-блока.
- Не объявляй ambiguous text kit-owned только потому, что он похож на router rule.
- Не переписывай project docs и код проекта.
- Не копируй incoming `.prompt-kit/manifest.json` в installed path: это делает только updater после полного integrity pass.
- Не выполняй Git mutations и не меняй `.git/`, remotes, branches, hooks или history.
- Если невозможно безопасно отделить router text от project-specific content, остановись до изменения и покажи conflict list.
- Первый legacy transition выполняй только после отдельного понятного подтверждения пользователя. Подтверждение может быть унаследовано из текущей `01-update-prompt-kit.md` transaction, но должно быть явно зафиксировано.
- Сообщения пользователю оформляй по `prompts/_knowledge/codex-user-response-quality.md`.

## Процесс

1. Проверь provenance incoming fragment:
   - `kit.id` release равен `dmandrianov/web-kit`, а `source.repositoryId` совпадает со встроенным numeric trust root updater;
   - для remote release trusted repository ID, personal owner и browser-authenticated GitHub access уже проверены до staging; local fallback имеет явные checksum evidence;
   - archive checksum passed;
   - incoming manifest identity/version passed;
   - `AGENTS.md` указан в manifest как `hybrid` с policy `managed-block`.
   Если evidence нет, вернись в `prompts/_maintenance/01-update-prompt-kit.md` и ничего не меняй.
2. Проверь текущий `AGENTS.md`:
   - markers отсутствуют;
   - есть только один marker;
   - markers повторяются;
   - markers перепутаны;
   - файл содержит смешанный legacy router и local rules.
3. Собери inventory содержимого, которое нужно сохранить снаружи managed block:
   - `Project-specific context`;
   - правила конкретного бизнеса/сайта;
   - команды, paths, env/access notes без секретов;
   - ссылки на project docs;
   - пользовательские предпочтения;
   - неизвестные фрагменты, которые нельзя доказуемо отнести к старому kit.
4. Сравни доказуемый legacy router layer с verified incoming managed fragment. Не пытайся содержательно сливать две версии router внутри managed block: target fragment должен быть canonical incoming fragment.
5. Подготовь migration plan до записи:
   - что будет удалено как доказуемый legacy duplicate;
   - что будет помещено в canonical managed block;
   - что останется вне блока без изменений;
   - что является ambiguous conflict.
6. Покажи plan и получи явное подтверждение первого legacy transition, если оно ещё не было получено в updater transaction. Если есть ambiguity, перечисли её отдельно и не интерпретируй молча.
7. Создай backup полного текущего `AGENTS.md` в `.prompt-kit/backups/<timestamp>/` до изменения. Если updater уже создал transaction backup, используй его и не создавай конкурирующий источник восстановления.
8. Собери новый `AGENTS.md`:
   - один заголовок `# AGENTS.md`;
   - один canonical incoming managed fragment с incoming version marker;
   - всё сохранённое local/project-specific content вне managed block;
   - ссылка на `docs/project-rules.md` вне managed block, если local rules уже вынесены туда.
9. Проверь результат:
   - begin marker ровно один;
   - end marker ровно один и расположен после begin;
   - managed fragment hash совпадает с incoming manifest contract;
   - project-specific content не находится между markers;
   - сохранённые local fragments присутствуют;
   - файл не содержит двух копий canonical router.
10. Если проверка не прошла, восстанови исходный `AGENTS.md` из backup и зафиксируй status `rolled back` / `needs manual merge`.
11. Создай или обнови `docs/agents-md-migration.md`.
12. Верни управление в `prompts/_maintenance/01-update-prompt-kit.md`. Он должен повторить conflict preflight с новым managed block, применить остальные файлы, запустить integrity и только после passed integrity установить incoming manifest.

## Output

Создай или обнови `docs/agents-md-migration.md`:

```md
# AGENTS.md Migration

## Result

- Status: migrated / needs manual merge / rolled back
- Date:

## Source

- Repository:
- Release tag:
- Incoming manifest:
- Archive checksum verified: yes/no

## Authorization

- Legacy transition: yes/no
- Explicit confirmation required: yes/no
- Explicit confirmation received: yes/no

## Backup

- Path:
- Restore tested/used: yes/no

## Preserved local content

- 

## Removed legacy duplicates

- 

## Managed block

- Version:
- Begin marker count:
- End marker count:
- Fragment hash:
- Hash matches incoming manifest: yes/no

## Manual conflicts

| Fragment | Why ambiguous | Safe options | User decision |
| --- | --- | --- | --- |

## Git safety

- Git metadata/remotes/history changed: no

## Next action

- Return to `prompts/_maintenance/01-update-prompt-kit.md` / wait for manual decision
```

В сообщении пользователю сначала объясни:

- managed-блок создан или почему миграция остановлена;
- локальные правила сохранены или какой fragment требует решения;
- где backup;
- продолжится ли текущая update-транзакция автоматически.

Технические markers и hashes показывай после человеческого итога. Формат ответа сверяй с `prompts/_knowledge/codex-user-response-quality.md`.

## Done when

- Incoming fragment имеет verified GitHub Release provenance.
- Первый legacy transition явно подтверждён.
- Backup полного `AGENTS.md` создан до изменения.
- `AGENTS.md` содержит ровно один корректный managed block.
- Managed fragment совпадает с incoming manifest.
- Project-specific и ambiguous local content сохранены вне managed block.
- При ошибке исходный файл восстановлен.
- Git пользователя не изменён.
- Incoming manifest ещё не объявлен установленным.
- Updater может безопасно повторить preflight или получил точный conflict list.

## Follow-up

После успешной миграции вернись в `prompts/_maintenance/01-update-prompt-kit.md`; не проси отдельную команду, если это продолжение уже подтверждённой update-транзакции.

Если пользователь отказался от migration или нужен manual merge, останови update без частичных изменений. Для отдельной проверки уже корректного `AGENTS.md` используй `prompts/_maintenance/02-check-kit-integrity.md`.
