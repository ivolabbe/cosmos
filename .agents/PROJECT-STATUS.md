# COSMOS Project Status

*Current state of all interactive apps and infrastructure. Updated after each milestone.*

Last updated: 2026-03-29

---

## App Inventory

### Production-ready (on `main` branch)

| App | Interactive | Article | Type | Notes |
|-----|-----------|---------|------|-------|
| Gravitational Waves | `gravitational-waves-interactive.html` | `gravitational-waves.html` | Physics sim | 2D mesh + 3D volume + WebAudio chirp + spectrogram |
| Sun | `sun-interactive.html` | `sun.html` | Babylon.js | ParticleHelper preset, activity controls |
| Satellites | `satellites-interactive.html` | `satellite.html` | Data viz | CelesTrak catalog, 14K+ orbits, glTF Earth, debris |
| Asteroids | `asteroid-interactive.html` | `asteroid.html` | Orbital mech | 10K particles, realistic belt distribution, Kirkwood gaps, Greeks/Trojans, Hildas (3:2 resonance triangle), Ceres/Vesta, histogram panel |
| Mercury | `mercury-interactive.html` | `mercury.html` | Planet globe | 8K texture, simplest template |
| Venus | `venus-interactive.html` | `venus.html` | Planet globe | Cloud toggle, super-rotation |
| Earth | `earth-interactive.html` | `earth.html` | Planet globe | Custom day/night shader, city lights |
| Mars | `mars-interactive.html` | `mars.html` | Planet globe | Thin CO₂ atmosphere |
| Jupiter | `jupiter-interactive.html` | `jupiter.html` | Planet globe | 4K bands + GRS |
| Saturn | `saturn-interactive.html` | `saturn.html` | Planet globe | Ring system (alpha texture) |
| Uranus | `uranus-interactive.html` | `uranus.html` | Planet globe | 97.77° axial tilt |
| Neptune | `neptune-interactive.html` | `neptune.html` | Planet globe | Methane blue |

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

## Completed (2026-03-29)

### House style system established
- Deep analysis of all 7 production interactives → comprehensive visual reference in `INTERACTIVE-STYLE-GUIDE.md`
- Copy-paste snippet files: `.agents/snippets/house-style.css`, `house-style.js`, `components.js`
- Per-app reference table with exact bloom, camera, lighting values
- Sphere rendering decision tree, line rendering rules, particle material rules
- Generalized design principles for novel app types

### Asteroid belt major upgrade
- 10,000 particles (from 2,000) with realistic radial distribution traced from observed histogram
- Kirkwood gaps (3:1, 5:2, 7:3, 2:1) as zero-density zones in piecewise PDF
- Greeks (L4) and Trojans (L5) with Gaussian inclination distribution, z-oscillation
- Hildas: real Keplerian orbits locked to Jupiter via `hildaTime = 3/2 × jupTime`, triangle from aphelion clustering
- Ceres and Vesta as named objects with labels and raycaster tooltips
- Semi-major axis distribution histogram panel (log scale, colour-coded by population)
- HTML distance scale overlay (tracks zoom, ignores rotation/tilt)
- Circular particle shader with min-size clamp, radial-gradient Sun sprite
- Spacebar play/pause, proper embedded mode handling

### File renames
- All `experimental/*-article.html` → `experimental/*.html` (12 files, all references updated)

### Zenith interactive house-style update
- CSS/chrome aligned, embedded mode, toneMapping, background #000

## Pending Review

- Pulsar, Binary Star, Rotation Curve: on `dev`, physics reviewed, visual review pending

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
