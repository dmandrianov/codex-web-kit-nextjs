# Project State

`docs/project-state.md` создаётся внутри рабочего проекта после первой диагностики. Он не обязан существовать в копируемом kit заранее, но Codex должен создать или обновить его после значимого шага.

## Когда создавать

Создай `docs/project-state.md`, если:

- пользователь начал новый проект;
- Codex впервые определил стадию;
- появился `project-brief.md`;
- выполнен переход между стадиями;
- завершён блок, страница или e-commerce сценарий;
- завершено обновление Prompt Kit и workflow alignment.

## Шаблон

```md
# Project State

## Current stage

- Stage: unknown
- Confidence: low
- Ecommerce flag: no
- Deployment flag: no
- CMS status: not checked / not needed / needed / selected / needs decision
- Technical architecture status: not checked / ready for scaffold / needs decisions
- Application flow status: not applicable / not checked / ready / needs fixes / blocked
- Technical SEO status: not checked / pre-deploy ready / production verified / needs fixes
- Current design pass: none / creator brief ready / rendered / critic reviewed / self-fixed / quality checked
- Current creator engine: native / gpt-taste / not applicable
- Current gpt-taste mode: page / block / component / not applicable
- gpt-taste skill status: not checked / checksum matched / missing / mismatch
- gpt-taste profile: not applicable / candidate / approved / needs recalibration
- Last updated: YYYY-MM-DD

## Kit compatibility

- Kit version:
- Installed manifest: `.prompt-kit/manifest.json`
- Update source repository ID:
- Update source bootstrap/canonical full name:
- Private access status: not checked / active / revoked / local archive only
- License: MIT at compatibility path `.prompt-kit/TERMS.md`
- Update channel: stable
- Last kit update:
- Last update result: not checked / current / updated / rolled back / blocked
- Workflow alignment status: not checked / aligned / needs user choice / blocked
- Alignment doc: `docs/prompt-kit-workflow-alignment.md`

## Confirmed artifacts

- [ ] Source materials scanned
- [ ] Media transcribed
- [ ] Project facts extracted
- [ ] Project brief approved
- [ ] AGENTS.md created
- [ ] Project docs created
- [ ] Documentation discipline defined
- [ ] Strategic brief audited
- [ ] Strategy clarified
- [ ] Editorial rules defined
- [ ] Site copy quality rules defined
- [ ] Competitor shortlist approved
- [ ] Competitor analysis done
- [ ] Audience insights done
- [ ] Reference analysis done
- [ ] Research synthesis done
- [ ] Research done
- [ ] Sitemap created
- [ ] Section map created
- [ ] Content inventory created
- [ ] IA reviewed
- [ ] Reference principles defined
- [ ] Design style shortlist created
- [ ] Design style hypothesis queue created
- [ ] Creator engine and mode selected explicitly
- [ ] gpt-taste original skill checksum matched, if selected
- [ ] Concept creator brief uses Design context diet
- [ ] Approved visual evidence and real assets passed to creator
- [ ] Current design concept rendered live
- [ ] Concept critic completed with up to 3 findings
- [ ] Concept one-pass self-fix rendered again
- [ ] Concept media/icon/motion choices recorded after render
- [ ] Design concept feedback collected
- [ ] Design concept iterated
- [ ] Design concept approved
- [ ] Design direction approved
- [ ] Visual North Star approved
- [ ] gpt-taste project profile approved, if selected
- [ ] Approved visual evidence saved
- [ ] Icon pack shortlisted
- [ ] Icon pack approved
- [ ] Iconography rules defined
- [ ] Design tokens defined
- [ ] Layout rules defined
- [ ] Desktop canvas contract defined
- [ ] Wide/4K viewport matrix defined
- [ ] First-render responsive delivery contract defined
- [ ] Page composition/rhythm rules defined
- [ ] UI design quality rules defined
- [ ] UI components planned
- [ ] Accessibility rules defined
- [ ] Design system reviewed
- [ ] Provisional vocabulary calibration scheduled or completed after 2–3 live marketing blocks
- [ ] Anti-AI-slop rules checked
- [ ] Next.js preflight done
- [ ] Content operations owner identified
- [ ] CMS status decided from real editing workflow
- [ ] Technical architecture decided
- [ ] Framework/runtime versions recorded
- [ ] Hosting shape selected before scaffold
- [ ] Sources of truth recorded
- [ ] Data/render/cache freshness matrix recorded
- [ ] Locales/markets/currency contract recorded, if applicable
- [ ] Public endpoint and application-security boundaries recorded
- [ ] Critical application scenarios and test strategy recorded
- [ ] Next.js scaffold ready
- [ ] App Router structure ready
- [ ] Styling integrated
- [ ] CSS-first responsive foundation integrated
- [ ] Tooling configured
- [ ] Next ready reviewed
- [ ] Page scope selected
- [ ] Page specs created
- [ ] Reference adapted for block
- [ ] Content and SEO plan created
- [ ] Block breakdown created
- [ ] Page planning reviewed
- [ ] Page composition/rhythm reviewed
- [ ] Current block content preview drafted
- [ ] Current block content preview approved
- [ ] Current block public facts and claims approved
- [ ] Current block fast build done
- [ ] Current gpt-taste block/component build done, if selected
- [ ] Current block creator brief uses Design context diet
- [ ] Current block live screenshots captured
- [ ] Current block critic completed with up to 3 findings
- [ ] Current block one-pass self-fix rendered again
- [ ] gpt-taste visual findings returned to skill, if selected
- [ ] Current block smoke checked
- [ ] Current block preflight done
- [ ] Current block structure built
- [ ] Current block styled
- [ ] Current block responsive checked
- [ ] Current block wide canvas checked
- [ ] Current block first frame checked after fresh reload
- [ ] Current block interactions checked
- [ ] Current block implemented
- [ ] Quality preflight done
- [ ] Visual review done
- [ ] Visual review rechecked after fixes
- [ ] Page desktop canvas matrix checked
- [ ] Accessibility check done
- [ ] Technical checks done
- [ ] Browser verification done
- [ ] Hydration/settled state has no canvas-level correction
- [ ] Responsive media candidates and reserved geometry verified
- [ ] Full UI/copy compliance checked when applicable
- [ ] Quality checks passed
- [ ] Application flows checked when applicable
- [ ] Deployment target selected
- [ ] SSH access configured
- [ ] Server baseline secured
- [ ] Runtime strategy selected
- [ ] Env/secrets configured
- [ ] Domain/DNS/SSL configured
- [ ] Pre-deploy technical SEO checked
- [ ] Technical SEO ready for deploy
- [ ] App deployed
- [ ] Process manager/reverse proxy configured
- [ ] Post-deploy verification passed
- [ ] Production SEO verified
- [ ] Search Console/Yandex setup completed or assigned as user action
- [ ] Rollback plan documented
- [ ] Deployment handoff prepared
- [ ] Handoff scope selected
- [ ] Handoff final review done
- [ ] Handoff summary prepared
- [ ] Handoff prepared

## Ecommerce artifacts

- [ ] E-commerce brief
- [ ] Product data model
- [ ] Catalog architecture
- [ ] Category PLP spec
- [ ] Product card spec
- [ ] PDP spec
- [ ] Filters/search/sorting spec
- [ ] Commercial rules
- [ ] Cart spec
- [ ] Checkout flow spec
- [ ] Account/orders analytics spec
- [ ] Commerce operations and payment safety
- [ ] Ecommerce reviewed

## Decisions

### Accepted

- 

### Deferred

- 

### Rejected

- 

## Open questions

- 

## Recommended next prompt

- Prompt:
- Why:
- Needs confirmation: yes/no
- Suggested user command:

## Optional refresh offers

| Offer | Why | Prompt | User decision |
| --- | --- | --- | --- |
```

## Правила обновления

- Обновляй stage только после завершения соответствующего артефакта.
- Не отмечай чекбокс, если артефакт не создан или не подтверждён.
- Если уверенность низкая, оставляй stage прежним и добавляй open question.
- Если проект интернет-магазин, ставь `Ecommerce flag: yes` и веди e-commerce artifacts.
- Если проект готовится к размещению, ставь `Deployment flag: yes` и веди deployment artifacts.
- Если начат technical SEO gate, обновляй `Technical SEO status` и веди `docs/seo/pre-deploy-technical-seo.md` / `docs/seo/production-seo-verification.md`.
- `Current design pass` отражает только текущую фазу creator → render → critic → self-fix → quality. Не создавай отдельный state-field для каждого из 4–6 выбранных creator criteria.
- `Current creator engine` и `Current gpt-taste mode` бери из active hypothesis/spec; без explicit selection используй `native`.
- Не ставь gpt-taste status `checksum matched`, пока original `SKILL.md` не прочитан полностью и SHA-256 не совпал с pinned identity из integration guideline.
- Approved gpt-taste profile хранит locked/open/used choices; отсутствие profile не откатывает stage, но блокирует обещание continuity для следующего skill run.
- До render не отмечай полный UI/copy compliance: creator фиксирует только context diet и факт live render. Полные базы и checklist относятся к critic/quality.
- После обновления указывай следующий рекомендуемый промпт.
- Для следующего промпта указывай естественную короткую команду пользователя без номера или пути к prompt, например: `да, продолжай со стратегией`.
- В ответе пользователю переводи технические поля state по `prompts/_knowledge/codex-user-response-quality.md`; сам `docs/project-state.md` может оставаться точным и техническим.
- После обновления Prompt Kit обновляй `Kit compatibility` и не откатывай completed stages без alignment.
- Версию установленного kit определяй по `.prompt-kit/manifest.json`; корневой `PROMPT_KIT_VERSION.md` используй только как legacy fallback при контролируемой миграции.
- По фразе `обнови базу` запускай транзакцию `prompts/_maintenance/01-update-prompt-kit.md` → `02-check-kit-integrity.md` → `04-align-project-after-kit-update.md`.
- Ставь `Last update result: updated` только после успешной integrity check, alignment и записи нового manifest. После rollback оставляй прежнюю версию и указывай `rolled back`.
- Не записывай Git remote, branch или commit пользовательского проекта в `Kit compatibility`: updater не управляет Git проекта.
- Не записывай персональные данные доступа, token, credential path или вывод `gh auth token` в project state. Достаточно безопасного access status.
- Numeric repository ID должен совпадать с embedded updater trust anchor. Rename/transfer сохраняет ID; новый ID отмечай как blocked pending trusted migration.
- Remote update source отмечай как verified только после `immutable: true`, valid signed release attestation и local asset provenance до extraction.
- Если public repository временно недоступен, сохраняй installed version и status `repository access unavailable`: скачанная версия остаётся пригодной по MIT, но remote updates временно недоступны.
- Если новая версия kit добавила улучшенный этап, записывай его в `Optional refresh offers`, а не запускай автоматически.
