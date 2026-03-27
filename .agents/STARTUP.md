# SAO Interactive Apps — Startup Instructions

*Read this at the start of a new session to bootstrap the orchestrator.*

## Read these files in order

1. `.agents/AGENTS.md` — architecture overview (5 agents, spec-driven pipeline)
2. `.agents/sao-orchestrator.md` — your role as phase tracker + knowledge manager
3. `.planning/INTERACTIVE-DEMOS.md` — the Top 10 target list
4. `.planning/apps/planets.md` — learnings from planet apps (proven patterns)
5. `.agents/INTERACTIVE-STYLE-GUIDE.md` — visual/architecture rules

## You are the orchestrator

Start with ONE medium-tier app: **Pulsar**.

```
Phase 1: Dispatch researcher → .planning/apps/pulsar-spec.md
Phase 2: Dispatch coder (reads spec) → dispatch verifier → loop until pass
Phase 3: Dispatch writer (reads spec) → dispatch verifier for article
Phase 4: Log learnings, update agent docs
```

After Pulsar: do **Binary Star** or **Rotation Curve**.
After 2-3 apps: assess whether to parallelize.

## Rules

- **Fresh agent per phase** — don't continue across phases. Clear context.
- **Pass state via files** — spec, dev log, HTML file, verify.js JSON. Not agent context.
- **Physics correctness is non-negotiable** — correct first, pretty second.
- **Log everything** — learnings after every phase, notes for CEO from every agent.
- **You can modify agent definitions** based on experience.
- **1 at a time first** — learn lessons, improve flow. Parallelize after 2-3 successes.

## Reference implementations

All existing COSMOS interactives can be used as reference/template code:

### Planet globes (simple tier — textured sphere + atmosphere + controls)
- `experimental/mercury-interactive.html` — bare rocky planet, simplest template
- `experimental/earth-interactive.html` — custom day/night shader, cloud layer, city lights
- `experimental/venus-interactive.html` — cloud toggle, super-rotation
- `experimental/mars-interactive.html` — thin atmosphere
- `experimental/jupiter-interactive.html` — gas giant bands
- `experimental/saturn-interactive.html` — ring system (RingGeometry + alpha)
- `experimental/uranus-interactive.html` — extreme axial tilt
- `experimental/neptune-interactive.html` — ice giant

### Physics simulations (complex tier)
- `experimental/gravitational-waves-interactive.html` — GLSL spacetime mesh, post-Newtonian inspiral, WebAudio chirp, 2D spectrogram
- `experimental/satellites-interactive.html` — binary catalog data, 14K+ orbits, glTF model, edge-detected coastlines
- `experimental/asteroid-interactive.html` — Kepler solver, orbital mechanics
- `experimental/sun-interactive.html` — Babylon.js particle system

### External references
- Black hole lensing: `github.com/nilsvu/black-holes-playground` (Schwarzschild WebGL)
- NASA Eyes: `eyes.nasa.gov` (gold standard for space visualization)

## Verification

Automated checks via `.agents/verify.js`:
```bash
node .agents/verify.js <url> --screenshots /tmp [--checks '{"toggle":"#cb-toggle"}']
```
Returns structured JSON. Requires Puppeteer in `/tmp/node_modules/` (install: `cd /tmp && npm install puppeteer`).

## Local server

```bash
cd /Users/ivo/Documents/Astro/SWIN/SAO/cosmos && python3 -m http.server 8765
```
