# COSMOS — Orchestrator Startup

*Generic bootstrap for any orchestrator session. Read this first to understand the information landscape, then load the team-specific plan.*

---

## 1. Information Landscape

The project knowledge is organized into layers. Read what you need, in this order.

### Layer 0: Where things are (read always)

```
.agents/
├── STARTUP.md              ← YOU ARE HERE — generic orchestrator bootstrap
├── PROJECT-STATUS.md        ← Current app inventory, branch state, pending items
├── LEARNINGS.md             ← Accumulated rules, technical patterns, references
├── AGENTS.md                ← Architecture diagram (transfer pipeline + SAO agents)
├── INTERACTIVE-STYLE-GUIDE.md ← Three.js visual/architecture rules
├── cosmos-style-analysis.md ← 643-article corpus voice characterization
├── verify.js                ← Automated Puppeteer verification script
├── sao-orchestrator.md      ← SAO team: phase tracker + recovery
├── sao-researcher.md        ← SAO team: produces build specs
├── sao-coder.md             ← SAO team: builds interactives from specs
├── sao-verify.md            ← SAO team: quality gate (physics + visual)
└── sao-writer.md            ← SAO team: article content specialist

.planning/
├── INTERACTIVE-DEMOS.md     ← Top 10 ranked candidate list
└── apps/
    ├── planets.md           ← Planet apps dev log
    ├── pulsar.md            ← Pulsar dev log
    ├── pulsar-spec.md       ← Pulsar build spec
    ├── binary-star.md       ← Binary star dev log
    ├── binary-star-spec.md  ← Binary star build spec
    ├── rotation-curve.md    ← Rotation curve dev log
    ├── rotation-curve-spec.md ← Rotation curve build spec
    └── ...                  ← More dev logs and specs per app

experimental/                ← All interactive HTML files + article pages
articles/                    ← Production COSMOS encyclopedia (643 articles)
```

### Layer 1: Project state (read at startup)

| File | What it tells you |
|------|-------------------|
| `PROJECT-STATUS.md` | What's built, what's on which branch, what's pending review |
| `LEARNINGS.md` | Rules, patterns, pitfalls, external references |

### Layer 2: Architecture & style (read before building)

| File | What it tells you |
|------|-------------------|
| `AGENTS.md` | Agent pipeline architecture, complexity tiers |
| `INTERACTIVE-STYLE-GUIDE.md` | How to build interactives (Three.js patterns, controls, colours, physics) |
| `cosmos-style-analysis.md` | How to write articles (voice, level, length, cross-linking density) |
| `INTERACTIVE-DEMOS.md` | The ranked candidate list with descriptions |

### Layer 3: Team-specific (read for your team)

| Team | Orchestrator | Agents | Plan |
|------|-------------|--------|------|
| **SAO Interactive Apps** | `sao-orchestrator.md` | researcher, coder, verifier, writer | Build Top 10 physics sims |
| *(future teams)* | *their orchestrator* | *their agents* | *their plan* |

### Layer 4: Per-app context (read when working on a specific app)

| File | What it tells you |
|------|-------------------|
| `.planning/apps/[topic].md` | Dev log: what was built, bugs found, lessons learned |
| `.planning/apps/[topic]-spec.md` | Build spec: facts, physics, staged plan, verification criteria |
| `experimental/[topic]-interactive.html` | The actual interactive (read for template patterns) |

---

## 2. Generic Startup Checklist

```
1. Read PROJECT-STATUS.md     → know what exists, what's pending
2. Read LEARNINGS.md          → know the rules and patterns
3. Identify your team         → load the team-specific orchestrator
4. Read the team plan         → know what to build next
5. Check git branch           → make sure you're on the right branch
6. Start local server         → python3 -m http.server 8765
7. Check Puppeteer            → ls /tmp/node_modules/puppeteer
8. Begin work                 → dispatch agents per team plan
```

---

## 3. Updating Project Knowledge

These files are **living documents** — update them as you learn.

| File | When to update | Who updates |
|------|---------------|-------------|
| `LEARNINGS.md` | After each app pipeline — new rules, patterns, pitfalls | Orchestrator |
| `PROJECT-STATUS.md` | After each app completes or status changes | Orchestrator |
| `INTERACTIVE-STYLE-GUIDE.md` | When a new visual technique is proven or rejected | Orchestrator / Coder |
| `sao-*.md` Learnings sections | After each phase — agent-specific findings | Each agent |
| `.planning/apps/[topic].md` | After each build — dev log per app | Coder / Orchestrator |

**The orchestrator's knowledge management job** is to collect agent notes (via "Notes for CEO" in completion reports), distil learnings, and propagate them to the correct files. If a pattern emerges across multiple apps, add it to `LEARNINGS.md`. If it's agent-specific, add it to that agent's Learnings section.

---

## 4. Rules (all teams)

- **Fresh agent per phase** — don't continue across phases. Clear context.
- **Pass state via files** — spec, dev log, HTML file, verify.js JSON. Not agent context.
- **Physics correctness is non-negotiable** — correct first, pretty second.
- **Log everything** — learnings after every phase, notes for CEO from every agent.
- **Verify in browser** — never assume code works. Screenshot, console, compare to references.
- **Minimal article modifications** — existing articles get iframe embed only (<10% text changes max).

---

## 5. Reference Implementations

All existing COSMOS interactives in `experimental/` can be used as templates:

### Simple tier (textured sphere + atmosphere + controls)
- `mercury-interactive.html` — bare rocky planet, simplest template
- `earth-interactive.html` — custom day/night shader, cloud layer, city lights
- `saturn-interactive.html` — ring system (RingGeometry + alpha)

### Complex tier (physics simulations)
- `gravitational-waves-interactive.html` — GLSL mesh, WebAudio, spectrogram (canonical physics sim template)
- `pulsar-interactive.html` — dipole field lines, beam cones, pulse profile, audio
- `binary-star-interactive.html` — Kepler orbits, RV curves, eclipse light curve
- `rotation-curve-interactive.html` — galaxy particles, DM slider, component decomposition
- `satellites-interactive.html` — real catalog data, 14K+ orbits, glTF model
- `asteroid-interactive.html` — Kepler solver, Kirkwood gaps, Trojans

### External references
- Black hole lensing: `github.com/nilsvu/black-holes-playground`
- GW volume rendering: `github.com/nilsvu/gwpv`
- NASA Eyes: `eyes.nasa.gov`

---

## 6. Infrastructure

### Local server
```bash
cd /Users/ivo/Documents/Astro/SWIN/SAO/cosmos && python3 -m http.server 8765
```

### Automated verification
```bash
node .agents/verify.js <url> --screenshots /tmp [--checks '{"toggle":"#cb-toggle"}']
```
Requires Puppeteer in `/tmp/node_modules/` (`cd /tmp && npm install puppeteer`).
Must run **headed** (`headless: false`) — WebGL requires GPU.

### Branches
- `main` — production
- `dev` — work in progress (currently: 3 physics sim apps pending review)

---

## 7. Team-Specific Plans

### SAO Interactive Apps Team
**Goal:** Build the Top 10 interactive visualizations from `.planning/INTERACTIVE-DEMOS.md`.

**Read:** `sao-orchestrator.md` for full phase-tracking protocol.

**Pipeline per app:**
```
Phase 1: Dispatch researcher → .planning/apps/[topic]-spec.md
Phase 2: Dispatch coder (reads spec) → dispatch verifier → loop until pass
Phase 3: Dispatch writer (reads spec) → add iframe to article
Phase 4: Log learnings, update agent docs, commit
```

**Current state:** 3/10 built (pulsar, binary star, rotation curve) on `dev` branch, pending physics + visual review. 7 remaining (see PROJECT-STATUS.md).

### *(Future: Content Team)*
*Goal: Substantive article text updates, new articles, fact-checking.*

### *(Future: Visual Design Team)*
*Goal: Cross-app visual consistency, landing pages, embed-demo coordination.*
