# COSMOS — Agent Architecture

## Three-Layer Design

Agents are assembled from three independent, composable layers:

```
┌─────────────────────────────────────────────────────────────┐
│  LAYER 3: TASK CONTEXT (per-invocation)                     │
│  Spec, verifier feedback, checkpoint state, handoff doc     │
├─────────────────────────────────────────────────────────────┤
│  LAYER 2: DOMAIN KNOWLEDGE (per-project, swappable)         │
│  threejs-interactive · astro-research · cosmos-articles      │
│  cosmos-verification · cosmos-infrastructure                 │
├─────────────────────────────────────────────────────────────┤
│  LAYER 1: ROLE DEFINITIONS (portable across projects)        │
│  orchestrator · researcher · coder · verifier                │
│  visual-qa · writer · analyst                                │
└─────────────────────────────────────────────────────────────┘
```

**To reuse this system for a different project:** keep the roles, swap the domains, define a new pipeline.

---

## Directory Layout

```
.agents/
├── STARTUP.md                  ← Orchestrator bootstrap
├── AGENTS.md                   ← This file — architecture overview
├── LEARNINGS.md                ← Project-wide rules & patterns
├── PIPELINE-MANUAL.md          ← How to build new pipelines
├── INTERACTIVE-STYLE-GUIDE.md  ← Visual/architecture rules (reference)
├── COSMOS-STYLE-GUIDE.md       ← Article voice analysis (reference)
│
├── roles/                      ← Layer 1: Portable role definitions
│   ├── orchestrator.md
│   ├── researcher.md
│   ├── coder.md
│   ├── verifier.md
│   ├── visual-qa.md
│   ├── writer.md
│   └── analyst.md
│
├── domains/                    ← Layer 2: Project-specific knowledge
│   ├── threejs-interactive.md      — Three.js patterns, bloom, particles
│   ├── astro-research.md           — Source hierarchy, spec template
│   ├── cosmos-articles.md          — COSMOS voice, lexicon, modification rules
│   ├── cosmos-verification.md      — verify.js, evidence ladder, tools
│   └── cosmos-infrastructure.md    — File layout, branches, conventions
│
├── pipelines/                  ← Pipeline definitions
│   ├── interactive-app.md          — 4-phase app pipeline (with improvements)
│   └── article-transfer.md        — Batch article transfer pipeline
│
├── agents/                     ← Assembled COSMOS agents (role + domain, with learnings)
│   ├── cosmos-interactive-orchestrator.md
│   ├── cosmos-researcher.md
│   ├── cosmos-coder.md
│   ├── cosmos-verify.md
│   ├── cosmos-visual.md
│   ├── cosmos-writer.md
│   └── cosmos-analyst.md
│
├── code/                       ← Verification & template code
│   ├── verify.js
│   ├── verify.sh
│   └── article-template.html
│
└── snippets/                   ← House-style code patterns
    ├── house-style.css
    ├── house-style.js
    └── components.js
```

---

## Interactive App Pipeline

```
          ┌──────────────────────────────────────────────┐
          │  ORCHESTRATOR  (roles/orchestrator.md)        │
          │  + pipeline: pipelines/interactive-app.md     │
          │  + state: .planning/phase-tracker.json        │
          └──────────┬───────────────────────────────────┘
                     │
    ┌────────────────┼────────────────┐
    ▼                ▼                ▼
  App 1            App 2            App N  (wave-parallel)
    │                │                │
    ▼                ▼                ▼
┌─────────┐    ┌─────────┐    ┌─────────┐
│RESEARCHER│    │RESEARCHER│    │RESEARCHER│  Phase 1
│= role +  │    │= role +  │    │= role +  │  (research)
│ domains  │    │ domains  │    │ domains  │
└────┬─────┘    └────┬─────┘    └────┬─────┘
     │               │               │
     ▼               ▼               ▼
  SPEC REVIEW     SPEC REVIEW     SPEC REVIEW    Phase 1b
  (pre-flight)    (pre-flight)    (pre-flight)   (quality gate)
     │               │               │
     ▼               ▼               ▼
  ┌──────┐        ┌──────┐        ┌──────┐
  │WRITER│        │WRITER│        │WRITER│       Phase 2
  └──┬───┘        └──┬───┘        └──┬───┘
     ▼               ▼               ▼
  VERIFIER         VERIFIER        VERIFIER
     │               │               │
     ▼               ▼               ▼
  ┌──────┐        ┌──────┐        ┌──────┐
  │CODER │        │CODER │        │CODER │       Phase 3
  └──┬───┘feedback└──┬───┘        └──┬───┘       (staged builds
     │   ▲           │               │            with checkpoints)
     ▼   │           ▼               ▼
  ┌──────┴──┐     ┌─────────┐    ┌─────────┐
  │VERIFIER │     │VERIFIER │    │VERIFIER │
  │+VISUAL  │     │+VISUAL  │    │+VISUAL  │
  └─────────┘     └─────────┘    └─────────┘
     │               │               │
     ▼               ▼               ▼
   Done             Done            Done         Phase 4
```

### Key Improvements Over Original Architecture

1. **Spec Review Gate** (Phase 1b) — catches bad specs before wasting coder context
2. **Checkpoint Protocol** — structured continuation for Hard/Hardest tier apps
3. **Context Budget Discipline** — stages per session capped by complexity tier
4. **Wave Scheduling** — formal wave system for parallel multi-app execution
5. **Model Tiering** — opus for research/complex builds, sonnet for execution/verification
6. **Evidence Ladder** — 5-level verification (existence → substantive → mechanical → physics → visual)
7. **Handoff Documents** — structured context preservation between phases
8. **Phase Tracker** — compaction-resistant JSON state file

---

## Agent Assembly

The **SPEC** remains the central artifact. But agents are now assembled at dispatch time:

```
Agent prompt = Role (from roles/) + Domain(s) (from domains/) + Task context
```

| Agent | Role | Domain(s) loaded |
|-------|------|-----------------|
| Researcher | `researcher.md` | `astro-research.md` + `threejs-interactive.md` |
| Coder | `coder.md` | `threejs-interactive.md` + `cosmos-infrastructure.md` |
| Verifier | `verifier.md` | `cosmos-verification.md` + (topic-relevant domain) |
| Visual QA | `visual-qa.md` | `threejs-interactive.md` |
| Writer | `writer.md` | `cosmos-articles.md` |
| Analyst | `analyst.md` | (all domains as needed) |

### Model Tiers

| Agent | Simple/Medium | Hard/Hardest |
|-------|--------------|-------------|
| Researcher | opus | opus |
| Spec Reviewer | sonnet | sonnet |
| Writer | sonnet | sonnet |
| Coder | sonnet | opus |
| Verifier | sonnet | sonnet |
| Visual QA | sonnet | sonnet |

---

## Legacy Agent Files

The `agents/` directory retains the assembled COSMOS agent files for backwards compatibility and to preserve accumulated **Learnings** sections. These files now reference their component roles and domains rather than duplicating the content.

New pipelines should assemble agents from `roles/` + `domains/` directly, per the Pipeline Manual.

---

## Article Transfer Pipeline

See `pipelines/article-transfer.md`. Status: complete (643/643 articles transferred).

---

## Article Transfer — Original Agent Definitions

*Preserved for reference. The transfer pipeline used fixed agents before the 3-layer refactor.*

### Pipeline

```
1. cosmos-inventory          (once, fast)
2. cosmos-fetch-letter × N   (parallel, one per letter)
3. cosmos-reindex            (once, after all fetches)
4. cosmos-verify             (once, after reindex)
5. git commit + push         (manual)
```

See `pipelines/article-transfer.md` for the updated version using roles + domains.
