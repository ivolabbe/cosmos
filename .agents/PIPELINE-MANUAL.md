# Pipeline Maker Manual

*How to build a new agent pipeline from portable roles. Reuse the roles, define your domains, wire a pipeline.*

---

## Quick Start

Building a new pipeline has four steps:

1. **Define your domains** — what does the project know?
2. **Pick your roles** — which agents do you need?
3. **Wire the pipeline** — what phases, in what order, with what gates?
4. **Configure model tiers** — which agents get opus vs sonnet vs haiku?

You can do this from scratch, or use the **Interview Stage** below to guide you through it.

---

## The Three Layers

Every agent is assembled from three layers at dispatch time:

```
Agent = Role (portable) + Domain(s) (project-specific) + Task (per-invocation)
```

### Layer 1: Roles (you already have these)

| Role | What it does | When to use |
|------|-------------|-------------|
| `orchestrator` | Tracks phases, dispatches agents, recovers failures | Always — one per pipeline |
| `researcher` | Researches topics, produces specs | When you need planning before building |
| `coder` | Builds artifacts from specs | When you produce code/files |
| `verifier` | Quality gate — structured PASS/FAIL with evidence | When quality matters (always) |
| `visual-qa` | Screenshot comparison, visual assessment | When output is visual |
| `writer` | Writes/modifies content matching a voice guide | When you produce text content |
| `analyst` | Competition survey, strategic analysis | When you need market/quality intelligence |

You can add new roles. A good role is:
- **Domain-free** — no project-specific knowledge baked in
- **Clear boundaries** — explicit "does" and "does NOT do" lists
- **Input/output defined** — what it receives, what it produces
- **Testable** — the orchestrator can verify its output

### Layer 2: Domains (you define these per project)

A domain file contains everything a role needs to know about your specific project context. Think of it as the briefing packet.

Good domains answer: "If I dropped a smart generalist into this role, what would they need to read before starting?"

### Layer 3: Task context (assembled per invocation)

The spec, feedback, checkpoint state, handoff doc from previous agent. This is ephemeral — it changes every dispatch.

---

## Interview Stage: Building a New Pipeline

Use this structured interview to define a pipeline for a new project. Answer each question, then the answers map directly to the files you need to create.

### Part 1: Project Context

```
Q1: What is the project producing?
    (e.g., "interactive 3D physics simulations", "API documentation",
     "Unity scenes for LED wall", "data analysis reports")

Q2: What does "done" look like for one unit of work?
    (e.g., "a verified HTML file deployed to dev/",
     "a merged PR with passing tests", "a rendered scene in Unity")

Q3: What are the quality gates?
    (e.g., "physics must be correct", "tests must pass",
     "visual quality must match NASA reference", "professor must approve")

Q4: What domain knowledge does a new contributor need?
    (e.g., "Three.js rendering patterns", "Unity HDRP pipeline",
     "our API design conventions", "the existing data schema")
    → Each answer becomes a domain file.

Q5: What existing artifacts can serve as templates?
    (e.g., "gravitational-waves-interactive.html is our best example",
     "the auth service is the cleanest module")
```

### Part 2: Pipeline Design

```
Q6: What phases does each unit of work go through?
    List them in order. Common patterns:
    a) Research → Build → Verify → Done
    b) Research → Plan → Build → Test → Review → Done
    c) Fetch → Transform → Validate → Deploy
    d) Spec → Prototype → Iterate → Polish → Ship

Q7: Which phases need a quality gate before proceeding?
    (Every phase that's expensive to redo should have a gate before it.)

Q8: Can multiple units run in parallel? What are the dependencies?
    (e.g., "all research can run in parallel, but building depends on
     its own research completing")

Q9: What happens when a phase fails?
    (e.g., "retry with feedback, max 3 times, then flag and move on")

Q10: What's the complexity range?
     (e.g., "simple = 1 session, complex = needs 3 staged sessions
      with checkpoints")
```

### Part 3: Agent Assembly

```
Q11: For each phase, which role handles it?
     Map: Phase → Role

Q12: For each role, what domain knowledge does it need?
     Map: Role → Domain file(s)

Q13: What model tier for each role?
     - Opus: architecture decisions, complex reasoning, novel problems
     - Sonnet: following explicit instructions, standard execution
     - Haiku: simple lookups, mechanical transforms, cheap exploration

Q14: Does the verifier need sub-agents?
     (e.g., visual-qa for screenshot comparison,
      security-reviewer for auth code)
```

### Part 4: State & Recovery

```
Q15: What state must survive context compaction?
     (→ goes in phase-tracker.json)

Q16: What's the checkpoint format for complex work?
     (What does a coder need to hand off to a continuation agent?)

Q17: Where do learnings accumulate?
     Map: learning type → file location
```

---

## Creating the Files

After the interview, create these files:

### 1. Domain files (`domains/`)

One `.md` file per knowledge area from Q4. Structure:

```markdown
# Domain: [Name]

*[One-line description]. Loaded by [which roles] working on [what].*

---

## [Section 1: Core knowledge]
[The essential patterns, rules, conventions]

## [Section 2: Technical details]
[Specific parameters, code patterns, infrastructure]

## [Section 3: Common pitfalls]
[What goes wrong and how to avoid it]

## [Section 4: Reference implementations]
[Templates, examples, URLs]
```

**Guidelines:**
- Include ONLY knowledge that isn't obvious to a domain expert
- Include specific values, not vague guidance ("bloom 0.35" not "use bloom tastefully")
- Include anti-patterns with explanations ("don't use X because Y")
- Keep each domain file focused — split if it covers two unrelated areas
- Domain files are living documents — update after every project cycle

### 2. Pipeline definition (`pipelines/`)

One `.md` file per pipeline from Q6–Q10. Structure:

```markdown
# Pipeline: [Name]

*[One-line description]*

---

## Overview
[ASCII diagram of phases]

## Agent Assembly
[Table: Phase → Role → Domain(s) → Model tier]

## Phase Details
[For each phase: dispatch instructions, inputs, outputs, routing]

## Verification Gates
[What each gate checks, what blocks progress]

## Wave Scheduling
[Which phases can run in parallel, max concurrency]

## Checkpoint Protocol
[Format for complex work handoffs]

## Context Budget
[Stages per session by complexity tier]

## Phase Tracker Schema
[JSON schema for compaction-resistant state]
```

### 3. Phase tracker (`.planning/phase-tracker.json`)

```json
{
  "pipeline": "[pipeline-name]",
  "updated": "[ISO timestamp]",
  "items": {
    "[item-name]": {
      "phase": 0,
      "status": "pending",
      "iteration": 0,
      "checkpoint": null,
      "model": "sonnet",
      "tier": "medium",
      "notes": ""
    }
  }
}
```

### 4. Learnings file

Start with a blank `LEARNINGS.md` organized by category. It will fill up as the pipeline runs.

---

## Example: Adapting for a Unity Project

Starting from the COSMOS pipeline, here's how you'd adapt for the SVU Unity project:

### Swap domains

| COSMOS domain | SVU domain (new) |
|---------------|-----------------|
| `threejs-interactive.md` | `unity-hdrp.md` (HDRP pipeline, shader graph, LED wall constraints) |
| `astro-research.md` | `svu-content.md` (scene requirements, educational goals, data sources) |
| `cosmos-articles.md` | *(not needed — no articles)* |
| `cosmos-verification.md` | `unity-verification.md` (Play mode tests, visual regression, LED wall preview) |
| `cosmos-infrastructure.md` | `svu-infrastructure.md` (Unity project structure, asset pipeline, build) |

### Modify pipeline

```
Phase 1: RESEARCHER → Scene spec (content + visual targets + data)
Phase 1b: SPEC REVIEW → Buildability check
Phase 2: CODER → Unity scene from spec
Phase 3: VERIFIER → Play mode test + visual regression + LED wall preview
Phase 4: Done — log learnings, commit
```

No writer phase needed. Verifier uses Unity Play mode instead of Puppeteer.

### Keep roles unchanged

`researcher.md`, `coder.md`, `verifier.md`, `visual-qa.md` — all portable. The domain files provide the Unity-specific knowledge.

---

## Example: Adapting for a Documentation Project

### New domains

| Domain file | Content |
|-------------|---------|
| `api-conventions.md` | REST patterns, auth, pagination, error format |
| `doc-style.md` | Voice guide, Markdown conventions, example format |
| `doc-verification.md` | Link checker, code sample runner, spell check |

### Pipeline

```
Phase 1: RESEARCHER → Doc spec (API endpoints to document, example scenarios)
Phase 2: WRITER → Draft documentation
Phase 3: VERIFIER → Link check + code sample execution + style compliance
Phase 4: Done
```

No coder, no visual-qa needed.

---

## Design Principles

### 1. Roles are verbs, domains are nouns
Roles define *what to do* (research, build, verify). Domains define *what to know* (Three.js, Unity, API conventions). Don't mix them.

### 2. Domain files are briefing packets
Write them as if briefing a smart contractor who's never seen your project. Include the specific values, not just the principles.

### 3. Every expensive phase needs a gate before it
The coder burns the most context. A spec review gate before Phase 3 is almost always worth it.

### 4. Checkpoints are not optional for complex work
If a work item might exceed one agent session, define the checkpoint format upfront. Don't discover this mid-build.

### 5. The phase tracker is your crash recovery
It survives context compaction, session restarts, and agent failures. Update it after every state change.

### 6. Learnings compound across cycles
Route learnings to the right layer: domain patterns → domain files, role improvements → role files, pipeline process → pipeline file, project rules → LEARNINGS.md.

### 7. Model tiers match cognitive load
- **Opus**: Novel problems, architecture decisions, complex reasoning (research, complex builds)
- **Sonnet**: Following explicit instructions, standard execution (most builds, verification)
- **Haiku**: Simple lookups, mechanical transforms (inventory, reindex, exploration)

### 8. Handoff documents preserve reasoning
The spec captures *what* to build. The handoff captures *why* certain decisions were made, *what* was rejected, and *what risks* remain. Both matter for the next agent.

---

## Checklist: Is My Pipeline Ready?

- [ ] Every phase has: role + domain(s) + model tier defined
- [ ] Every gate has: specific checks + PASS/FAIL criteria
- [ ] Checkpoint format defined for complex work
- [ ] Context budget specified per complexity tier
- [ ] Wave scheduling defined (what's parallel, what's sequential)
- [ ] Phase tracker JSON created with all work items
- [ ] Learnings routing table defined (what goes where)
- [ ] At least one reference implementation / template exists
- [ ] Domain files contain specific values, not vague guidance
- [ ] Recovery protocol defined (what happens on failure at each phase)
