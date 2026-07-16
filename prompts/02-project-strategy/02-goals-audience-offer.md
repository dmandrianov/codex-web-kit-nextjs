# Сформировать стратегию, аудиторию и оффер

## Когда использовать

После стратегического аудита брифа или когда `project-brief.md` уже достаточно полный для формирования стратегии.

## Роль Codex

Ты действуешь как brand strategist, conversion-focused UX strategist и messaging architect.

## Цель

Создать стратегическую основу сайта: цели, аудитории, оффер, позиционирование, доказательства, CTA, ограничения, гипотезы и messaging, пригодные для исследования, IA, дизайна и контента.

## Контекст, который нужно дать

- `project-brief.md`.
- Strategic audit из `prompts/02-project-strategy/01-client-brief.md`, если он есть.
- `docs/strategic-audit.md`, если он уже создан.
- `AGENTS.md` с `Project-specific context`.
- `docs/project-state.md`.
- `prompts/_guidelines/anti-ai-slop-design-and-copy.md`.
- `prompts/_knowledge/site-copy-quality.md`.
- Существующие тексты, позиционирование и бренд-материалы.
- Примеры конкурентов или референсов, если они уже подтверждены.

## Ограничения

- Не писать финальный копирайтинг всей страницы.
- Не раздувать tone of voice в абстрактные слова. Нужны практичные editorial rules для будущих страниц.
- Не проводить исследование конкурентов в этом промпте.
- Не делать sitemap, IA, дизайн-систему или код.
- Не придумывать факты, цифры, отзывы, гарантии, сертификаты или юридические обещания.
- Явно разделяй `confirmed`, `hypothesis` и `open question`.
- Если критичные вопросы из `docs/strategic-audit.md` не закрыты, не создавай полноценные `docs/strategy.md` и `docs/messaging.md`: сначала обнови `docs/open-questions.md`, оставь stage `rules-ready` и попроси ответы.
- Если проект является интернет-магазином, не выдумывай коммерческие правила: общую стратегию можно зафиксировать здесь, а каталог, оплату, доставку, возвраты и checkout отправь в `prompts/11-ecommerce/`.

## Процесс

1. Проверь, что есть `project-brief.md`. Если его нет, вернись к intake.
2. Проверь, закрыты ли критичные вопросы из `docs/strategic-audit.md`. Если нет, задай только недостающие 3-5 вопросов, обнови `docs/open-questions.md` и не создавай финальную стратегию.
3. Сформулируй главную бизнес-цель сайта и вторичные цели.
4. Опиши 1-3 ключевых сегмента аудитории через задачи, боли, сомнения, критерии выбора и триггеры доверия.
5. Сформулируй оффер, позиционирование, supporting messages и анти-обещания.
6. Определи доказательства доверия и явно пометь, что подтверждено, а что является гипотезой.
7. Определи primary/secondary CTA и ограничения по tone of voice.
8. Сформулируй editorial rules по `site-copy-quality.md`: один главный смысл на блок, честные факты, польза/снятие риска, пустые фразы вместо конкретики, voice/person, CTA, text density и claim policy.
9. Создай или обнови `docs/strategy.md`, `docs/messaging.md`, `docs/content/editorial-rules.md` и `docs/project-state.md`.

## Output

Созданные или обновленные:

- `docs/strategy.md` со структурой: goals, success criteria, audience segments, positioning, offer, trust proof, conversion strategy, constraints, hypotheses, open questions.
- `docs/messaging.md` со структурой: main offer, supporting messages, message hierarchy, CTA, proof points, tone of voice, forbidden claims.
- `docs/content/editorial-rules.md` со структурой: editorial principles, site copy quality rules, text density rules, forbidden phrases, claim policy, block copy budgets, examples of concise rewrite.
- `docs/project-state.md` - stage `strategy-ready`, отмечено `Strategy clarified`, следующий промпт `prompts/03-research/01-discover-competitors-and-sources.md`.

Краткое резюме: что подтверждено, что является гипотезой, что нужно уточнить позже.

Если стратегия заблокирована критичными вопросами: обновленный `docs/open-questions.md`, stage `rules-ready` в `docs/project-state.md`, список вопросов и объяснение, почему стратегию пока нельзя фиксировать.

## Done when

- У сайта есть ясная бизнес-цель и критерии успеха.
- Аудитория описана через потребности, сомнения и триггеры доверия.
- Оффер и messaging можно использовать в исследовании, IA и дизайне.
- Неподтвержденные утверждения помечены как гипотезы.
- `docs/content/editorial-rules.md` опирается на site copy quality principles и пригоден для будущих content preview.
- Критичные вопросы из `docs/strategic-audit.md` закрыты или стратегия не финализирована.
- `docs/strategy.md`, `docs/messaging.md`, `docs/content/editorial-rules.md` и `docs/project-state.md` созданы или обновлены.

## Follow-up

Следующий промпт: `prompts/03-research/01-discover-competitors-and-sources.md`.
Перед следующим шагом сверься с `prompts/ROUTER.md` и обнови или создай `docs/project-state.md`.
