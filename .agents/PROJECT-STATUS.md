# COSMOS Project Status

*Current state of all interactive apps and infrastructure. Updated after each milestone.*

Last updated: 2026-03-28

---

## App Inventory

### Production-ready (on `main` branch)

| App | Interactive | Article | Type | Notes |
|-----|-----------|---------|------|-------|
| Gravitational Waves | `gravitational-waves-interactive.html` | `gravitational-waves-article.html` | Physics sim | 2D mesh + 3D volume + WebAudio chirp + spectrogram |
| Sun | `sun-interactive.html` | `sun-article.html` | Babylon.js | ParticleHelper preset, activity controls |
| Satellites | `satellites-interactive.html` | `satellite-article.html` | Data viz | CelesTrak catalog, 14K+ orbits, glTF Earth, debris |
| Asteroids | `asteroid-interactive.html` | `asteroid-article.html` | Orbital mech | Kepler solver, Kirkwood gaps, Trojans |
| Mercury | `mercury-interactive.html` | `mercury-article.html` | Planet globe | 8K texture, simplest template |
| Venus | `venus-interactive.html` | `venus-article.html` | Planet globe | Cloud toggle, super-rotation |
| Earth | `earth-interactive.html` | `earth-article.html` | Planet globe | Custom day/night shader, city lights |
| Mars | `mars-interactive.html` | `mars-article.html` | Planet globe | Thin CO₂ atmosphere |
| Jupiter | `jupiter-interactive.html` | `jupiter-article.html` | Planet globe | 4K bands + GRS |
| Saturn | `saturn-interactive.html` | `saturn-article.html` | Planet globe | Ring system (alpha texture) |
| Uranus | `uranus-interactive.html` | `uranus-article.html` | Planet globe | 97.77° axial tilt |
| Neptune | `neptune-interactive.html` | `neptune-article.html` | Planet globe | Methane blue |

### On `dev` branch (pending review)

| App | Interactive | Article | Type | Review status |
|-----|-----------|---------|------|---------------|
| Pulsar | `pulsar-interactive.html` | `pulsar.html` | Physics sim | Reviewed: beam direction fixed, angle clamped at 20°, pulse centred, camera zoomed out |
| Binary Star | `binary-star-interactive.html` | `binary-star.html` | Physics sim | Reviewed: orbitControls bug fixed. Visual review pending. |
| Rotation Curve | `rotation-curve-interactive.html` | `rotation-curve.html` | Physics sim | Reviewed: yellow bulge + blue disk, B/T slider, physical DM readouts, bloom balanced, panel sizing |

### Not yet started (from Top 10 list)

| # | Topic | Complexity | Notes |
|---|-------|-----------|-------|
| 2 | Black Hole | Hard | Schwarzschild lensing. Reference: nilsvu/black-holes-playground |
| 3 | Density Wave Model | Hard | Top-down galaxy + spiral potential + star formation |
| 4 | Roche Lobe | Hard | 3D equipotential surface + L1 mass stream |
| 5 | HR Diagram | Hardest | Animated evolutionary tracks + stellar cross-section |
| 7 | CMB | Hard | All-sky sphere + angular power spectrum |
| 8 | Large-Scale Structure | Hardest | N-body fly-through + time slider |

---

## Pending Review (2026-03-28)

User gave 3 categories of feedback on the 3 new physics sim apps:

1. **Article content** — DONE. Articles reverted to original text + iframe only. <15% correction rule.
2. **Physics of simulations** — DONE. Beam direction fixed, angle clamped, reference code/formula requirement added, generic physics verification checklist.
3. **Visual style** — DONE. Visual agent created, bloom/density rules, circular particles, panel sizing, layout checks, readout requirements.

---

## Infrastructure

- **Agent system**: 6 agents in `.agents/sao-*.md` (orchestrator, researcher, coder, verifier, visual designer, writer)
- **Startup**: `.agents/STARTUP.md` — bootstrap instructions for any orchestrator
- **Style guide**: `.agents/INTERACTIVE-STYLE-GUIDE.md` — Three.js visual/architecture rules
- **Style analysis**: `.agents/cosmos-style-analysis.md` — 643-article corpus voice characterization
- **Learnings**: `.agents/LEARNINGS.md` — consolidated feedback and technical patterns
- **Verification**: `.agents/verify.js` — automated Puppeteer checks
- **Candidate list**: `.planning/INTERACTIVE-DEMOS.md` — ranked Top 10 + honourable mentions
- **Dev logs**: `.planning/apps/*.md` — per-app build history
- **Specs**: `.planning/apps/*-spec.md` — build blueprints for physics sim apps

## Assets

- **Planet textures**: `experimental/assets/textures/planets/web/` (Solar System Scope / NASA, CC BY 4.0, 2K–8K compressed)
- **Satellite models**: `experimental/models/satellites/` (glTF + CelesTrak catalog bins)
- **Credits**: `experimental/assets/CREDITS.md`

## Branches

- `main` — production (planets, sun, satellites, asteroids, GW)
- `dev` — 3 new physics sim apps (pulsar, binary star, rotation curve) pending review
