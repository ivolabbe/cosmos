# Pipeline: Interactive App

*End-to-end pipeline for building interactive visualizations with accompanying articles. Defines phases, agent assembly, model tiers, wave scheduling, checkpoint protocol, and verification gates.*

---

## Overview

```
Phase 1: RESEARCH → Spec (science + visual references + build plan)
Phase 1b: SPEC REVIEW → Pre-flight quality gate on the spec
Phase 2: WRITE (article) → VERIFY (article) → pass
Phase 3: BUILD → VERIFY → feedback loop (max 3 iterations) → pass
Phase 4: DONE — log learnings, update docs, commit
```

## Agent Assembly (Role + Domain → Agent)

| Phase | Role | Domain files to load | Model tier |
|-------|------|---------------------|------------|
| 1 | `roles/researcher.md` | `domains/astro-research.md` + `domains/threejs-interactive.md` | **opus** |
| 1b | `roles/verifier.md` | `domains/astro-research.md` | **sonnet** |
| 2 (write) | `roles/writer.md` | `domains/cosmos-articles.md` | **sonnet** |
| 2 (verify) | `roles/verifier.md` | `domains/cosmos-verification.md` + `domains/cosmos-articles.md` | **sonnet** |
| 3 (build) | `roles/coder.md` | `domains/threejs-interactive.md` + `domains/cosmos-infrastructure.md` | **sonnet** (Simple/Medium) / **opus** (Hard/Hardest) |
| 3 (verify) | `roles/verifier.md` | `domains/cosmos-verification.md` + `domains/threejs-interactive.md` | **sonnet** |
| 3 (visual) | `roles/visual-qa.md` | `domains/threejs-interactive.md` | **sonnet** |

## Phase Details

### Phase 1: Research

**Dispatch:** Researcher with astro-research + threejs-interactive domains.

**Task context:**
```
Topic: [topic]
Output path: .planning/apps/[topic]-spec.md
Closest existing app: [from domain/project status]
Complexity tier: [Simple / Medium / Hard / Hardest]
```

**Output:** `.planning/apps/[topic]-spec.md`

**Handoff:** Researcher includes `## Handoff: Researcher → Coder` at end of spec.

### Phase 1b: Spec Review (pre-execution quality gate)

**Purpose:** Catch bad specs before they waste a full coder + verifier cycle.

**Dispatch:** Verifier with astro-research domain. (Lighter check — no screenshots needed.)

**Task context:**
```
Review the spec at .planning/apps/[topic]-spec.md for buildability.
This is a pre-flight check, not artifact verification.
```

**Checklist:**
| # | Check | Reject if |
|---|-------|-----------|
| 1 | Verification criteria testable | Vague ("looks good") instead of measurable |
| 2 | Reference URLs fetchable | Dead links or placeholder URLs |
| 3 | Staged plan realistic | Stages too large for context budget (see table below) |
| 4 | Equations precise | Ambiguous notation, missing edge cases |
| 5 | Test values provided | No way to validate physics output |
| 6 | Visual targets specific | "Similar to NASA" without specific URLs |

**If FAIL:** Return spec to researcher with specific issues. Researcher revises. Re-check (max 2 rounds).

**If PASS:** Move to Phase 2.

### Phase 2: Article + Verify

**Dispatch writer** with cosmos-articles domain.

**Task context:**
```
Topic: [topic]
Spec: .planning/apps/[topic]-spec.md (read facts section)
Interactive path: dev/[topic]-interactive.html (for iframe embed)
Existing article: articles/[topic].html (if exists)
Output: dev/[topic].html
```

**Then dispatch verifier** with cosmos-verification + cosmos-articles domains.

**Routing:**
- PASS → Phase 3
- FAIL → feedback to writer, re-dispatch (max 3)
- Still failing after 3 → flag PROBLEM in dev log, move to Phase 3 (don't block)

### Phase 3: Build + Verify Loop

**Dispatch coder** with threejs-interactive + cosmos-infrastructure domains.

**Task context:**
```
Topic: [topic]
Spec: .planning/apps/[topic]-spec.md
Output: dev/[topic]-interactive.html
Template: dev/[template from spec]-interactive.html
[If iterating: verifier feedback below]
[If continuing: checkpoint state below]
```

**Context Budget by Tier:**

| Tier | Max stages per coder session | When to checkpoint |
|------|-----------------------------|--------------------|
| Simple | All stages (1 session) | Never needed |
| Medium | All stages (1 session) | If context > 60% |
| Hard | 2–3 stages per session | After each stage group |
| Hardest | 1–2 stages per session | After each stage |

**Checkpoint format** (coder writes this when context fills):
```markdown
## CHECKPOINT

### Completed
- [x] Stage 1: [what was built]
- [x] Stage 2: [what was built]

### Current
- [ ] Stage 3: [in progress, where it stopped]

### Remaining
- [ ] Stage 4: [from spec]

### Files modified
- dev/[topic]-interactive.html

### Key decisions
- [decisions continuation agent needs]

### What NOT to change
- [working features to preserve]
```

**Then dispatch verifier** with cosmos-verification + threejs-interactive domains.
Verifier dispatches visual-qa sub-agent for visual quality assessment.

**Routing:**
- Physics PASS + Visual PASS → Phase 4
- Physics PASS + Visual NEEDS_WORK → FAIL (visual feedback to coder)
- Physics FAIL → FAIL regardless (correctness first)
- FAIL → feedback to coder, re-dispatch (max 3 iterations)
- Still failing after 3 → flag PROBLEM, continue to next app

### Phase 4: Done — Knowledge Integration

Phase 4 is NOT a formality. It is the mechanism by which the system improves. The orchestrator must complete all steps before moving to the next app.

#### Step 4.1: Collect all completion reports

Read every agent's output from this pipeline run:
- Researcher completion report + handoff document
- Writer completion report (if Phase 2 ran)
- Coder completion report + checkpoint notes (if any)
- Verifier report(s) — including failed iterations
- Visual QA report(s)
- "Notes for CEO" sections (Hard/Hardest tier)

**Also collect from the iteration history:**
- What did the verifier catch that the coder got wrong?
- Did the coder hit the same bug as a previous app?
- Did the spec miss something the coder had to figure out?
- Did the researcher's references turn out to be useful or wrong?

#### Step 4.2: Diff learnings against domain files

For each learning, check whether the relevant domain file already covers it:

```
For each learning from completion reports:
  1. Identify which file it belongs to (see routing table below)
  2. Read that file
  3. Is this learning already captured? → skip
  4. Does it contradict something in the file? → update the existing entry
  5. Is it new? → append to the appropriate section
```

**Routing table:**

| Learning type | Example | Route to |
|---------------|---------|----------|
| Rendering pattern that works/fails | "Line2 with transparency causes artifacts" | `domains/threejs-interactive.md` → Technical Gotchas |
| Physics implementation pattern | "Bessel functions from Abramowitz & Stegun" | `domains/threejs-interactive.md` → Architecture Patterns, or `domains/astro-research.md` → Common Pitfalls |
| Source/reference quality | "NAAP tools are best for educational comparison" | `domains/astro-research.md` → Visual Competition Survey |
| Spec template improvement | "Must include test values for every equation" | `domains/astro-research.md` → Spec Template |
| Verification gap | "verify.js doesn't catch X, must check manually" | `domains/cosmos-verification.md` → Evidence Ladder |
| Article/voice pattern | "Bold inline labels, not H2 headings" | `domains/cosmos-articles.md` |
| Infrastructure change | "New asset path convention" | `domains/cosmos-infrastructure.md` |
| Pipeline process improvement | "Spec review caught 80% of issues" | `pipelines/interactive-app.md` |
| Role behavior issue | "Coder kept verifying its own work" | `roles/coder.md` → What You Do NOT Do |
| Cross-cutting rule | "Physics correctness first, always" | `LEARNINGS.md` |
| App-specific history | "Black hole: tried ray marching, too slow" | `.planning/apps/[topic].md` |

#### Step 4.3: Propose and apply updates

For each learning that needs to be added or updated:

1. **State the learning** clearly and concisely
2. **State where it goes** (file path + section)
3. **Apply the edit** — append to the relevant section, or update the existing entry if it's a correction
4. **If a domain file change affects agent behavior** (e.g., new mandatory check, new anti-pattern), verify the change is specific enough that an agent reading the file cold would follow it

**Update quality checklist:**
- [ ] Specific enough to act on? ("bloom 0.35" not "use bloom tastefully")
- [ ] Includes the *why*? ("because X causes Y" not just "don't do X")
- [ ] Placed in the right section of the right file?
- [ ] Doesn't duplicate an existing entry?
- [ ] Doesn't contradict an existing entry without replacing it?

#### Step 4.4: Check if roles need tightening

Review the iteration history for this app:

| Signal | Possible role update |
|--------|---------------------|
| Coder kept self-verifying instead of stopping | Strengthen "What You Do NOT Do" in `roles/coder.md` |
| Verifier reports were vague / missing evidence | Add specific requirements to `roles/verifier.md` |
| Researcher's spec missed critical implementation detail | Add to spec self-review checklist in `roles/researcher.md` |
| Handoff was missing, next agent repeated work | Strengthen handoff requirement in the producing role |
| Checkpoint was too vague for continuation | Improve checkpoint format in `roles/coder.md` |

Only update roles when a pattern repeats across 2+ apps. A single incident goes to the app's dev log; a pattern goes to the role.

#### Step 4.5: Update state and commit

1. Update `phase-tracker.json` → status: "done"
2. Git commit with message: `Complete [topic]: [brief outcome]`
3. If domain/role/pipeline files were updated, commit those separately:
   `Update domain knowledge from [topic] pipeline run`

This separation keeps artifact commits clean and knowledge commits reviewable.

## Iteration Mode (refine existing apps)

```
Phase 1i: RESEARCHER (reads existing app + spec + dev log + feedback)
  → Updated spec with "## What to keep" + "## What to change"
Phase 2i: WRITER (if article needs updating) — skip if unchanged
Phase 3i: CODER (modifies existing file, not fresh build) → VERIFIER loop
Phase 4i: Done — log learnings, commit
```

Key: coder starts from existing file. Spec says what to preserve vs change.

## Do-Over Mode (rebuild from scratch)

When fundamental approach is wrong or >70% needs changing:

```
Phase 0d: Archive existing to dev/archive/ and .planning/apps/archive/
Phase 1d: RESEARCHER with "## Lessons from v[N]" section
Phase 2d–4d: Standard pipeline (fresh build from new spec)
```

Never delete — always archive.

## Wave Scheduling (parallel apps)

When building multiple apps simultaneously:

| Wave | Phase | Notes |
|------|-------|-------|
| 1 | All Phase 1 (research) | Fully independent — all can run in parallel |
| 2 | All Phase 1b (spec review) | Independent per app |
| 3 | All Phase 2 (article) | Independent per app |
| 4 | All Phase 3 (build) | Independent per app, but may compete for context |

Within each wave, dispatch up to 4 concurrent pipelines. Biggest/hardest first for load balancing.

**Cross-wave dependencies:** An app must complete Phase N before its own Phase N+1. But App A's Phase 3 can run while App B is still in Phase 1.

## Handoff Documents

Each agent's completion includes a structured handoff:

```markdown
## Handoff: [Role] → [Next Role]
- **Key decisions**: [what was chosen and why]
- **Rejected alternatives**: [what was considered and why not]
- **Risks**: [what might go wrong next]
- **Open questions**: [things the next agent may need to decide]
```

The orchestrator injects the previous handoff into the next agent's prompt.

## Phase Tracker Schema

```json
{
  "pipeline": "interactive-app",
  "updated": "2026-04-03T10:30:00Z",
  "items": {
    "black-hole": {
      "phase": 3,
      "status": "coder-dispatched",
      "iteration": 2,
      "checkpoint": {
        "completed_stages": ["scene-setup", "lensing-shader"],
        "current_stage": "accretion-disk",
        "files": ["dev/black-hole-interactive.html"]
      },
      "model": "opus",
      "notes": "Hard tier, GLSL-heavy"
    },
    "density-wave": {
      "phase": 1,
      "status": "research-complete",
      "iteration": 0,
      "checkpoint": null,
      "model": "sonnet",
      "notes": ""
    }
  }
}
```

## Verification Gate Summary

| Gate | When | What it checks | Blocks |
|------|------|----------------|--------|
| **Spec review** (Phase 1b) | After research | Spec buildability, testability | Phase 2 |
| **Article verify** (Phase 2) | After writer | Text preservation, facts, template | Phase 3 |
| **Build verify** (Phase 3) | After coder | Evidence ladder (5 levels), physics, visual quality | Phase 4 |
| **Orchestrator meta-check** | After every verify | Report completeness (screenshots, evidence, specificity) | Accepts/rejects the report itself |
