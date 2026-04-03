# COSMOS — Orchestrator Startup

*Bootstrap for any orchestrator session. Read this first, then load the pipeline definition for your team.*

---

## 1. Three-Layer Architecture

Agents are assembled from three independent layers:

```
┌─────────────────────────────────────────────────┐
│  Layer 3: TASK CONTEXT (per-invocation)          │
│  Spec path, verifier feedback, checkpoint state  │
├─────────────────────────────────────────────────┤
│  Layer 2: DOMAIN KNOWLEDGE (per-project)         │
│  Three.js patterns, COSMOS voice, verification   │
├─────────────────────────────────────────────────┤
│  Layer 1: ROLE DEFINITION (portable)             │
│  "You are a coder. Read spec, build artifact."   │
└─────────────────────────────────────────────────┘

Orchestrator assembles:  Role + Domain(s) + Task → Agent prompt
```

### Layer 1: Roles (portable across projects)
```
roles/
├── orchestrator.md    — phase tracking, dispatch, recovery
├── researcher.md      — research + spec production
├── coder.md           — build from spec, handle feedback
├── verifier.md        — quality gate, structured PASS/FAIL
├── visual-qa.md       — screenshot comparison, visual quality
├── writer.md          — content writing, voice matching
└── analyst.md         — competition survey, strategic analysis
```

### Layer 2: Domains (project-specific knowledge)
```
domains/
├── threejs-interactive.md   — Three.js patterns, bloom, particles, architecture
├── astro-research.md        — source hierarchy, fact sheets, spec template
├── cosmos-articles.md       — COSMOS voice, lexicon links, modification rules
├── cosmos-verification.md   — verify.js, evidence ladder, infrastructure
└── cosmos-infrastructure.md — file layout, branches, naming conventions
```

### Layer 3: Task context (per-invocation)
- The spec: `.planning/apps/[topic]-spec.md`
- Verifier feedback (if iterating)
- Checkpoint state (if continuing)
- Handoff document (from previous agent)

### How the orchestrator assembles a prompt

```
Dispatch coder for black-hole:
  prompt = read("roles/coder.md")
        + read("domains/threejs-interactive.md")
        + read("domains/cosmos-infrastructure.md")
        + "## Your task\n" + read(".planning/apps/black-hole-spec.md")
        + [verifier feedback if iterating]
        + [checkpoint state if continuing]
        + [handoff document from researcher]
```

To reuse this pipeline for a different project, swap the domain layer:
```
SVU Unity project:
  prompt = read("roles/coder.md")              ← same role
        + read("domains/unity-patterns.md")     ← different domain
        + read("domains/svu-infrastructure.md") ← different domain
        + "## Your task\n" + read("svu-spec.md")
```

---

## 2. Information Landscape

### Always read at startup
| File | What it tells you |
|------|-------------------|
| `.planning/PROJECT-STATUS.md` | What's built, what's pending, full history |
| `.planning/phase-tracker.json` | Current pipeline state per app (compaction-resistant) |
| `LEARNINGS.md` | Project-wide rules, patterns, pitfalls |

### Read before building
| File | What it tells you |
|------|-------------------|
| `pipelines/interactive-app.md` | Phase sequence, agent assembly, model tiers, verification gates |
| `INTERACTIVE-STYLE-GUIDE.md` | Visual/architecture rules (complements domain files) |
| `COSMOS-STYLE-GUIDE.md` | 643-article corpus voice (complements domain files) |

### Read per app
| File | What it tells you |
|------|-------------------|
| `.planning/apps/[topic]-spec.md` | Build spec (science, visual refs, staged plan) |
| `.planning/apps/[topic].md` | Dev log (what was built, bugs, learnings) |
| `dev/[topic]-interactive.html` | The actual interactive |

---

## 3. Startup Checklist

```
1. Read .planning/PROJECT-STATUS.md      → know what exists
2. Read .planning/phase-tracker.json     → know pipeline state
3. Read LEARNINGS.md                     → know the rules
4. Read your pipeline definition         → know phases + agents
5. Check git branch                      → right branch?
6. Start local server                    → python3 -m http.server 8765
7. Check Puppeteer                       → ls /tmp/node_modules/puppeteer
8. Begin work                            → dispatch agents per pipeline
```

---

## 4. Pipeline Definitions

### Interactive Apps (SAO Team)
**Pipeline:** `pipelines/interactive-app.md`
**Goal:** Build interactive 3D visualizations + embed in encyclopedia articles.
**Phases:** Research → Spec Review → Write Article → Build + Verify → Done
**Current:** 15 apps on `main`. 6 remaining (all Hard/Hardest tier).

### Article Transfer
**Pipeline:** `pipelines/article-transfer.md`
**Goal:** Transfer 643 articles from old Drupal site.
**Phases:** Inventory → Fetch (parallel) → Reindex → Verify
**Status:** Complete (643/643 transferred).

### *(Future pipelines)*
Use the Pipeline Maker Manual (`PIPELINE-MANUAL.md`) to define new pipelines from portable roles.

---

## 5. Rules (all pipelines)

- **Fresh agent per phase** — don't continue across phases. Clear context.
- **Pass state via files** — spec, dev log, HTML, verify.js JSON, phase-tracker.json. Not agent context.
- **Correctness is non-negotiable** — correct first, pretty second.
- **Log everything** — learnings after every phase, handoff docs from every agent.
- **Verify with evidence** — never assume code works. Screenshots, test output, measurements.
- **Update phase-tracker.json** — after every state change. Survives context compaction.

---

## 6. Updating Project Knowledge

| What | When | Where | Who updates |
|------|------|-------|-------------|
| Phase tracker | Every dispatch/completion | `.planning/phase-tracker.json` | Orchestrator |
| Domain patterns | New technique proven/rejected | `domains/*.md` | Orchestrator |
| Pipeline rules | Process improvement | `pipelines/*.md` | Orchestrator |
| Project-wide rules | Cross-cutting pattern | `LEARNINGS.md` | Orchestrator |
| Per-app history | After each build | `.planning/apps/[topic].md` | Coder / Orchestrator |
| Style guides | Visual/voice technique validated | `INTERACTIVE-STYLE-GUIDE.md` / `COSMOS-STYLE-GUIDE.md` | Orchestrator |

Learnings from agents arrive in completion reports ("Notes for CEO" for complex work). The orchestrator's job is to route them to the correct file in the correct layer.

---

## 7. Reference Implementations

All existing interactives in `dev/` serve as templates:

### Simple tier
- `mercury-interactive.html` — bare rocky planet
- `earth-interactive.html` — day/night shader, clouds, city lights
- `saturn-interactive.html` — ring system

### Complex tier
- `gravitational-waves-interactive.html` — canonical physics sim template
- `pulsar-interactive.html` — dipole fields, beam cones, pulse profile
- `binary-star-interactive.html` — Kepler orbits, RV curves, eclipse light curve
- `rotation-curve-interactive.html` — galaxy particles, DM slider, decomposition
- `satellites-interactive.html` — real catalog, 14K+ orbits, glTF model
- `asteroid-interactive.html` — Kepler solver, Kirkwood gaps, Trojans

---

## 8. Infrastructure

### Local server
```bash
cd /Users/ivo/Documents/Astro/SWIN/SAO/cosmos && python3 -m http.server 8765
```

### Automated verification
```bash
# Interactive:
node .agents/code/verify.js <url> --screenshots /tmp [--checks '{"toggle":"#cb-toggle"}']

# Article:
node .agents/code/verify.js <url> --article --original articles/[topic].html --screenshots /tmp
```
Requires Puppeteer in `/tmp/node_modules/`. Must run **headed** (`headless: false`).
