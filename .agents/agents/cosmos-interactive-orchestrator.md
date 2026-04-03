# SAO Orchestrator — COSMOS Interactive Apps

*Assembled from: `roles/orchestrator.md` + `pipelines/interactive-app.md` + COSMOS domains.*

**To use this agent:** Read `roles/orchestrator.md` for the generic orchestrator role, then `pipelines/interactive-app.md` for the COSMOS-specific pipeline with phases, agent assembly, model tiers, and verification gates. State is tracked in `.planning/phase-tracker.json`.

---

## Quick Reference

### Pipeline phases
```
Phase 1:  RESEARCHER → Spec
Phase 1b: SPEC REVIEW → Quality gate
Phase 2:  WRITER → Article → VERIFIER
Phase 3:  CODER → VERIFIER (+ VISUAL QA) → feedback loop
Phase 4:  Done — learnings, commit
```

### Agent assembly (from pipeline)
| Phase | Role | Domains | Model |
|-------|------|---------|-------|
| 1 | researcher | astro-research + threejs-interactive | opus |
| 1b | verifier | astro-research | sonnet |
| 2 write | writer | cosmos-articles | sonnet |
| 2 verify | verifier | cosmos-verification + cosmos-articles | sonnet |
| 3 build | coder | threejs-interactive + cosmos-infrastructure | sonnet/opus |
| 3 verify | verifier | cosmos-verification + threejs-interactive | sonnet |
| 3 visual | visual-qa | threejs-interactive | sonnet |

### Hard gates (from role)
1. Never report success without verifier confirmation
2. Never claim works without evidence (screenshots)
3. Never skip a phase
4. Never let producer and verifier be the same agent

### Full documentation
- Generic role: `roles/orchestrator.md`
- Pipeline definition: `pipelines/interactive-app.md`
- Phase tracker: `.planning/phase-tracker.json`
- Project status: `.planning/PROJECT-STATUS.md`

---

## Learnings

- 2026-03-28 — For simple apps (planet globes): phases 1-4 can complete in one builder agent. For complex sims: keep phases separate with dedicated agents.
- 2026-03-28 — Style/pattern changes (background color, star field) affect ALL apps. Settle these before dispatching builders.
- 2026-03-28 — Texture compression is a shared dependency — do it before Phase 3 for all apps that need textures.
- 2026-03-28 — Pulsar pipeline (first medium-tier app) completed in one session: research→build→verify→fix→article→verify.
- 2026-03-28 — Spec pseudocode can have bugs. The researcher's anti-pole formula was wrong — the verifier caught it via code analysis. Always have the verifier check physics equations, not just visuals.
- 2026-03-28 — For physics sims without textures: no loading time, so `loading` indicator can be removed immediately.
- 2026-03-28 — The GW interactive is an excellent template for physics sim apps (2D panel + sliders + audio + readouts).
- 2026-03-28 — Verifier should be dispatched even before the coder fully completes — can run in parallel. The orchestrator can apply fixes from verifier feedback directly.
- 2026-03-28 — Article verify.js gave false failures for article pages — now resolved with `--article` mode.
- 2026-03-29 — Pipeline simplified: 5 phases → 4 phases. Visual research folded into Researcher (Phase 1). verify.js now automates all mechanical checks.
- 2026-03-29 — All 6 Hard/Hardest tier apps built in parallel (6 researchers + 6 writers + 6 coders simultaneously). Rate limits can interrupt agents mid-build — check file state before rebuilding.
- 2026-03-29 — Added Iteration Mode for refining existing apps. Not a do-over — researcher reads existing app, spec says what to keep vs change, coder modifies existing file.
- 2026-03-29 — Added Do-Over Mode: archive old version, rebuild from scratch informed by failures. Never delete — always archive.
- 2026-03-29 — Removed Interactive Mode: too token-hungry for targeted changes. User-directed tweaks go through iteration mode or direct coder dispatch.
- 2026-04-03 — Architecture refactored to 3-layer system (roles/domains/pipelines). Added: spec review gate, checkpoint protocol, context budget, wave scheduling, model tiers, evidence ladder, handoff docs, phase tracker.
