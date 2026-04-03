# Agent Building Blocks

*A parts catalog of everything available for assembling agent pipelines. Read this before the Pipeline Manual.*

---

## The Assembly Model

Every agent invocation is built from three layers snapped together at dispatch time:

```
Agent = Role + Domain(s) + Task context
```

- **Role** — what the agent *does* (portable, project-independent)
- **Domain** — what the agent *knows* (project-specific, swappable)
- **Task** — what the agent *works on right now* (ephemeral, per-invocation)

The orchestrator reads the files and inlines them into the agent's prompt. Nothing crosses agent boundaries automatically.

---

## Roles (Layer 1)

Portable behavioral contracts. Each defines inputs, outputs, process, boundaries, and completion report format. Zero domain knowledge.

| Role | One-liner | Typical model | Key output |
|------|-----------|--------------|------------|
| **orchestrator** | Tracks phases, dispatches agents, recovers failures | opus | Phase tracker updates, learnings routing |
| **researcher** | Investigates topic, produces spec for builders | opus | Spec document with facts, references, staged plan |
| **coder** | Builds artifacts from a spec, iterates on feedback | sonnet–opus | Built artifact (code, file, scene) |
| **verifier** | Quality gate — structured PASS/FAIL with evidence | sonnet | Verification report with checklist + evidence |
| **visual-qa** | Screenshot comparison against references | sonnet | Visual report with element-by-element comparison |
| **writer** | Writes/modifies content matching a voice guide | sonnet | Content file matching corpus style |
| **analyst** | Competition survey, quality audit, gap analysis | opus | Analysis document with recommendations |

### Role Composition Rules

- **Minimum viable team**: coder + verifier (producer + gate)
- **Standard team**: researcher + coder + verifier (plan + produce + gate)
- **Full team**: researcher + writer + coder + verifier + visual-qa + analyst
- **Never combine**: producer and verifier in one agent (separation of concerns)
- **Optional**: visual-qa is a sub-agent of verifier, dispatched only when output is visual
- **Optional**: analyst is on-demand, not part of the standard pipeline

### When to Add a Custom Role

Add a new role when an existing role would need fundamentally different behavior, not just different domain knowledge. Signs you need a new role:
- Different input/output contract (not just different content)
- Different iteration pattern (e.g., continuous monitoring vs one-shot)
- Different relationship to other agents (e.g., a reviewer that blocks merges)

Don't create a new role when a domain file would suffice.

---

## Domains (Layer 2)

Project-specific knowledge files. Each is a briefing packet that makes a generalist role effective in your specific context.

### Anatomy of a Domain File

```markdown
# Domain: [Name]
*[One-liner]. Loaded by [roles] working on [what].*

## Core knowledge       — the essential patterns and rules
## Technical details    — specific parameters, code patterns
## Common pitfalls      — what goes wrong, how to avoid
## Reference artifacts  — templates, examples, URLs
```

### Domain Design Guidelines

| Do | Don't |
|----|-------|
| Include specific values (`bloom: 0.35`) | Include vague guidance ("use bloom tastefully") |
| Include anti-patterns with reasons | List rules without explaining why |
| Include templates and formats | Assume the agent knows your conventions |
| Keep focused — one concern per file | Combine unrelated knowledge |
| Update after every project cycle | Let them go stale |

### How Many Domains?

- **1 domain** — simple project with one technology stack
- **2–3 domains** — typical project (tech stack + content rules + infrastructure)
- **4–5 domains** — complex project with multiple concerns (COSMOS has 5)
- **>5 domains** — consider merging related ones; too many = too much context per agent

### Current COSMOS Domains (as examples)

| Domain | What it contains | Loaded by |
|--------|-----------------|-----------|
| `threejs-interactive` | Three.js patterns, bloom, particles, file structure, controls | coder, verifier, visual-qa |
| `astro-research` | Source hierarchy, spec template, competition survey method | researcher, spec reviewer |
| `cosmos-articles` | COSMOS voice, lexicon links, modification limits, templates | writer, verifier |
| `cosmos-verification` | verify.js, evidence ladder, screenshot requirements | verifier |
| `cosmos-infrastructure` | File layout, branches, naming conventions, local server | all agents |

---

## Pipelines (the wiring)

A pipeline defines how roles are sequenced, gated, and parallelized for a repeatable class of work.

### Pipeline Components

| Component | What it defines | Why it matters |
|-----------|----------------|---------------|
| **Phase sequence** | What order agents run | Prevents building before researching |
| **Agent assembly table** | Role + domain(s) + model per phase | The orchestrator's dispatch instructions |
| **Verification gates** | What must pass before the next phase | Prevents expensive rework |
| **Wave schedule** | What runs in parallel | Throughput for batch work |
| **Model tiers** | opus/sonnet/haiku per agent | Cost/quality optimization |
| **Checkpoint protocol** | Format for mid-work handoffs | Enables complex work across sessions |
| **Context budget** | Stages per agent session by complexity | Prevents context exhaustion |
| **Handoff format** | What passes between phases | Preserves reasoning, not just artifacts |
| **Recovery rules** | What happens on failure | Prevents pipeline stalls |

### Common Pipeline Patterns

**Linear** — simplest, each phase feeds the next:
```
Research → Build → Verify → Done
```

**Linear with gate** — adds a quality check before expensive work:
```
Research → Spec Review → Build → Verify → Done
```

**Feedback loop** — verification can send work back:
```
Research → Build ⇄ Verify → Done
              (max 3 iterations)
```

**Fan-out / fan-in** — parallel work converges:
```
         ┌→ Build A ──→ Verify A ─┐
Research ─┼→ Build B ──→ Verify B ─┼→ Integrate → Done
         └→ Build C ──→ Verify C ─┘
```

**Staged build** — complex work split across agent sessions:
```
Research → Build (stage 1) → checkpoint → Build (stage 2) → Verify → Done
```

---

## Architectural Features

### 1. Spec-Driven Development

The **spec** is the central artifact. The researcher produces it; coder, verifier, and writer all consume it. This means:
- One source of truth for what to build
- Verifier checks against the spec, not their own judgment
- Coder follows the spec, not their own design instincts
- Changes to requirements = changes to the spec, not whispered context

### 2. Separation of Producer and Verifier

The agent that builds something never verifies it. This is a hard rule because:
- Self-verification has a 100% pass rate and catches nothing
- The verifier reads the producer's role definition and checks rule compliance
- The orchestrator validates that verifier reports contain real evidence

### 3. Evidence-Based Verification

Verification is not "I read the code and it looks fine." The evidence ladder:

| Level | What | Example |
|-------|------|---------|
| 1. Existence | File exists, non-zero | `ls -la output.html` |
| 2. Substantive | Has expected structure | grep for key elements |
| 3. Mechanical | Automated checks pass | test suite, linter, verify.js |
| 4. Correctness | Logic/facts verified | measured vs expected values |
| 5. Quality | Meets reference bar | screenshot comparison |

All 5 levels required for PASS. The orchestrator rejects reports missing evidence.

### 4. Checkpoint Protocol

For work that exceeds one agent session:

```markdown
## CHECKPOINT
### Completed — [what's done]
### Current — [where it stopped]
### Remaining — [what's left]
### Files modified — [what exists on disk]
### Key decisions — [what continuation agent needs to know]
### What NOT to change — [working features to preserve]
```

The orchestrator reads this and spawns a fresh agent with checkpoint + spec inlined. The new agent continues from where the previous one stopped.

### 5. Handoff Documents

Specs capture *what* to build. Handoffs capture *why*:

```markdown
## Handoff: [From] → [To]
- Key decisions: [what was chosen]
- Rejected alternatives: [what was ruled out and why]
- Risks: [what might go wrong]
- Open questions: [what the next agent may need to decide]
```

This prevents the next agent from re-exploring paths already rejected.

### 6. Phase Tracker (compaction-resistant state)

```json
{
  "pipeline": "interactive-app",
  "items": {
    "item-name": {
      "phase": 3,
      "status": "verifier-dispatched",
      "iteration": 2,
      "checkpoint": { ... }
    }
  }
}
```

Survives context compaction, session restarts, and agent failures. The orchestrator reads it at startup and updates it after every state change.

### 7. Wave Scheduling

For batch work, items are grouped into waves of independent operations:

```
Wave 1: All research (independent)     → dispatch all in parallel
Wave 2: All spec review (per-item dep) → dispatch all in parallel  
Wave 3: All builds (per-item dep)      → dispatch up to N in parallel
```

Within-wave: fully parallel. Cross-wave: sequential per item. The pipeline definition sets max concurrency.

### 8. Model Tiering

Not all agents need the most expensive model:

| Cognitive load | Model | Use for |
|---------------|-------|---------|
| Novel reasoning, architecture | **opus** | Research, complex builds, analysis |
| Following explicit instructions | **sonnet** | Standard builds, verification, writing |
| Mechanical transforms, lookups | **haiku** | Inventory, reindexing, exploration |

The pipeline's agent assembly table specifies the model per phase.

### 9. Learnings Feedback Loop

The system improves across cycles because the orchestrator **must** update domain/role/pipeline files after every completed item. This is not optional cleanup — it's an explicit pipeline phase (Phase 4 in interactive-app).

**The loop:**
```
Agent hits problem → fixes it → reports in completion
    ↓
Orchestrator reads all completion reports
    ↓
Diffs each learning against the relevant file
    ↓
Already captured? → skip
New? → append (with the *why*, not just the rule)
Contradicts existing? → update existing entry
    ↓
Commit knowledge updates separately
```

**Routing:**

| Learning type | Routes to | Update frequency |
|---------------|-----------|-----------------|
| Technical pattern (works/fails) | `domains/*.md` | After most runs |
| Spec template gap | Research domain | After most runs |
| Verification gap | Verification domain | After most runs |
| Pipeline process change | `pipelines/*.md` | Occasionally |
| Role behavior issue (2+ occurrences) | `roles/*.md` | Rarely |
| Project-wide rule | `LEARNINGS.md` | Occasionally |
| Per-item history | Item's dev log | Every run |

**Key principle:** domain files change often, role files change rarely, pipeline files change occasionally. A single incident goes to the dev log; a repeated pattern goes to the domain; a repeated behavioral issue across multiple items goes to the role.

### 10. Ad Hoc Dispatch

Not everything needs a pipeline. For one-off tasks:

```
"Review this spec" → verifier + relevant domain + the spec. Done.
"Research CMB tools" → researcher + astro-research domain + prompt. Done.
```

The roles and domains are useful even without pipeline wiring. The pipeline adds repeatability, not capability.

---

## Decision Guide: What Do I Need?

```
One-off task, one agent?
  → Just dispatch: role + domain(s) + task description

One-off task, multiple agents in sequence?
  → Ad hoc orchestration: I dispatch them in order

Repeatable workflow, will do 3+ times?
  → Pipeline: use the Pipeline Manual interview

Need a new kind of agent behavior?
  → New role (if fundamentally different process)
  → New domain (if just different knowledge)

Need to adapt for a different project?
  → Keep roles, write new domains, define new pipeline
```

---

## Key Artifacts

These are the files that flow between agents. Understanding them is as important as understanding the agents.

### Persistent Artifacts (live on disk, survive sessions)

| Artifact | Created by | Consumed by | Location |
|----------|-----------|-------------|----------|
| **Spec** | Researcher | Coder, Verifier, Writer | `.planning/apps/[topic]-spec.md` |
| **Dev log** | Coder, Orchestrator | All agents (next iteration) | `.planning/apps/[topic].md` |
| **Built artifact** | Coder | Verifier, Visual QA | `dev/[topic]-interactive.html` |
| **Verification report** | Verifier | Orchestrator, Coder (feedback) | Appended to dev log |
| **Visual report** | Visual QA | Verifier | Passed back to verifier context |
| **Phase tracker** | Orchestrator | Orchestrator (on restart) | `.planning/phase-tracker.json` |
| **Learnings** | All agents | All agents (next cycle) | `LEARNINGS.md`, domain files, agent files |

### Ephemeral Artifacts (passed in agent prompts, not saved separately)

| Artifact | Created by | Consumed by | Purpose |
|----------|-----------|-------------|---------|
| **Handoff document** | Any completing agent | Next agent in pipeline | Preserves reasoning (decisions, rejections, risks) |
| **Checkpoint** | Coder (when context fills) | Continuation coder | Resume point with completed/remaining/decisions |
| **Verifier feedback** | Verifier (on FAIL) | Coder (next iteration) | Specific actionable fixes |
| **Completion report** | Any agent | Orchestrator | What happened, what was learned, notes for CEO |

### The Spec: Central Artifact

The spec is the single source of truth. It flows through the entire pipeline:

```
Researcher produces it
    ↓
Spec Reviewer validates it (Phase 1b gate)
    ↓
Writer reads its facts section → writes article
    ↓
Coder reads its stages + physics → builds interactive
    ↓
Verifier reads its criteria → checks against built artifact
```

A good spec must serve all three consumers:
- **Coder** needs: implementation stages, physics/algorithm, reference code, test values
- **Verifier** needs: verification criteria, comparison URLs, what "correct" looks like
- **Writer** needs: fact sheet, key numbers, narrative hooks

### Artifact Lifecycle

```
                    ┌─────────────┐
                    │    SPEC      │ ← created once, may be revised
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              ↓            ↓            ↓
         ┌────────┐  ┌─────────┐  ┌────────┐
         │ARTICLE │  │ARTIFACT │  │VERIFY  │
         │(.html) │  │(.html)  │  │REPORT  │
         └────┬───┘  └────┬────┘  └────┬───┘
              │           │            │
              ↓           ↓            ↓
         ┌─────────────────────────────────┐
         │          DEV LOG                │ ← accumulates history
         │  (.planning/apps/[topic].md)    │
         └─────────────────────────────────┘
              │
              ↓
         ┌─────────────────────────────────┐
         │        LEARNINGS                │ ← distilled patterns
         │  (LEARNINGS.md + domain files)  │
         └─────────────────────────────────┘
```

### What Makes a Good Spec

| Quality | Test |
|---------|------|
| **Buildable** | Could a coder start coding from this without asking questions? |
| **Verifiable** | Could a verifier write automated checks from the criteria? |
| **Staged** | Is each stage small enough for one context-budget window? |
| **Sourced** | Is every fact traceable to a URL or paper? |
| **Complete** | Are edge cases, pitfalls, and test values included? |

### What Makes a Good Verification Report

| Quality | Test |
|---------|------|
| **Evidenced** | Does every PASS/FAIL have a screenshot, measurement, or test output? |
| **Specific** | Could the coder fix every FAIL from the report alone? |
| **Complete** | Are all spec criteria covered, plus role-compliance check? |
| **Structured** | Does it use the checklist table format? |
| **Actionable** | Are fixes stated as exact parameter changes, not vague suggestions? |
