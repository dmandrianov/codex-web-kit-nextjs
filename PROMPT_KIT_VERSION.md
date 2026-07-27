# Prompt Kit Version

- Version: 0.7.0
- Released: 2026-07-27
- Managed block: `PROMPT_KIT:BEGIN managed version=0.7.0`
- Update model: immutable attested GitHub Release + manifest-based safe merge

## Compatibility

- Requires root `AGENTS.md`.
- Requires `prompts/README.md`, `prompts/ROUTER.md`, `prompts/INDEX.md`, `prompts/STATE.md`.
- Requires `prompts/_knowledge/codex-user-response-quality.md` for all user-visible Codex messages.
- Requires `prompts/_guidelines/creator-critic-design-workflow.md` for visual concepts, new composition and meaningful redesign work.
- Supports optional external `gpt-taste` creator engine through `prompts/_guidelines/gpt-taste-integration.md`; the original skill stays outside the payload and must match its pinned source/checksum when selected.
- Installs release metadata under `.prompt-kit/`; the user project's root documentation and Git configuration remain project-owned.
- Project-specific rules must live outside the `PROMPT_KIT` managed block in `AGENTS.md` or in `docs/project-rules.md`.

## Update Rule

When updating an existing project, use `prompts/_maintenance/01-update-prompt-kit.md` and only an immutable curated GitHub Release whose signed release and local-asset attestations pass before extraction. Do not replace the whole project folder and do not use Git as the update transport.
