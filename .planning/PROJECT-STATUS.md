# COSMOS Project Status

*Master reference for current state, upcoming work, and completed history.*
*Updated after each milestone by the orchestrator.*

Last updated: 2026-03-30

---

## 1. Current State

### Production apps (on `main`)

| App | Interactive | Article | Type | Notes |
|-----|-----------|---------|------|-------|
| Gravitational Waves | `gravitational-waves-interactive.html` | `gravitational-waves.html` | Physics sim | 2D mesh + 3D volume + WebAudio chirp + spectrogram |
| Sun | `sun-interactive.html` | `sun.html` | Babylon.js | ParticleHelper preset, activity controls |
| Satellites | `satellites-interactive.html` | `satellite.html` | Data viz | CelesTrak catalog, 14K+ orbits, glTF Earth, debris |
| Asteroids | `asteroid-interactive.html` | `asteroid.html` | Orbital mech | 10K particles, Kirkwood gaps, Greeks/Trojans, Hildas, Ceres/Vesta, histogram |
| Mercury | `mercury-interactive.html` | `mercury.html` | Planet globe | 8K texture, simplest template |
| Venus | `venus-interactive.html` | `venus.html` | Planet globe | Cloud toggle, super-rotation |
| Earth | `earth-interactive.html` | `earth.html` | Planet globe | Custom day/night shader, city lights |
| Mars | `mars-interactive.html` | `mars.html` | Planet globe | Thin CO₂ atmosphere |
| Jupiter | `jupiter-interactive.html` | `jupiter.html` | Planet globe | 4K bands + GRS |
| Saturn | `saturn-interactive.html` | `saturn.html` | Planet globe | Ring system (alpha texture) |
| Uranus | `uranus-interactive.html` | `uranus.html` | Planet globe | 97.77° axial tilt |
| Neptune | `neptune-interactive.html` | `neptune.html` | Planet globe | Methane blue |
| Pulsar | `pulsar-interactive.html` | `pulsar.html` | Physics sim | Dipole field lines, beam cones, pulse profile, audio |
| Binary Star | `binary-star-interactive.html` | `binary-star.html` | Physics sim | Kepler orbits, RV curves, eclipse light curve |
| Rotation Curve | `rotation-curve-interactive.html` | `rotation-curve.html` | Physics sim | Galaxy particles, DM slider, component decomposition |

### Built on `dev` (pending review + merge)

| App | Interactive | Article | Type | Notes |
|-----|-----------|---------|------|-------|
| Black Hole | `black-hole-interactive.html` | `black-hole.html` | Physics sim | GLSL Schwarzschild lensing, accretion disk, Doppler boosting, annotations |
| Density Wave | `density-wave-interactive.html` | `density-wave-model.html` | Physics sim | 10K particles, differential rotation, pattern speed, Ω(R) panel |
| Roche Lobe | `roche-lobe-interactive.html` | `roche-lobe.html` | Physics sim | MarchingCubes equipotentials, L1 mass transfer, accretion disk |
| HR Diagram | `hr-diagram-interactive.html` | `hertzsprung-russell-diagram.html` | Physics sim | 2D Canvas, 6 mass tracks, cross-section sidebar |
| CMB | `cmb-interactive.html` | `cosmic-microwave-background.html` | Physics sim | 3D sphere, layer peeling, power spectrum, parameter sliders |
| Large-Scale Structure | `large-scale-structure-interactive.html` | `large-scale-structure.html` | Physics sim | Zel'dovich approximation, 50K particles, z=10→0 |

### Infrastructure

- **Agent system**: 7 agents in `.agents/agents/cosmos-*.md` (orchestrator, researcher, coder, verifier, visual, writer, analyst)
- **Style guide**: `.agents/INTERACTIVE-STYLE-GUIDE.md` — Three.js visual/architecture rules
- **Corpus style**: `.agents/COSMOS-STYLE-GUIDE.md` — 643-article voice characterization
- **Learnings**: `.agents/LEARNINGS.md` — consolidated feedback and technical patterns
- **Verification**: `.agents/code/verify.js` — automated Puppeteer checks
- **Specs**: `.planning/apps/*-spec.md` — build blueprints for physics sim apps
- **Dev logs**: `.planning/apps/*.md` — per-app build history

### Site Features

- **Knowledge Graph Explorer**: `dev/explore.html` — D3 force-directed graph of all 643 articles and their cross-links; search, zoom, click-to-navigate. Linked from index page A-Z explorer.
- **A-Z Explorer widget**: compact inline letter bar with click-to-expand entries; on index.html and prototyped on article pages (cluster-environment.html). Loads `js/cosmos-index.js`.

### Assets

- **Planet textures**: `dev/assets/textures/planets/web/` (Solar System Scope / NASA, CC BY 4.0, 2K–8K compressed)
- **Satellite models**: `dev/models/satellites/` (glTF + CelesTrak catalog bins)
- **Credits**: `dev/assets/CREDITS.md`

### Branches

- `main` — production (15 apps: 8 planets, GW, sun, satellites, asteroids, pulsar, binary star, rotation curve)
- `dev` — 6 new apps built (black hole, density wave, roche lobe, HR diagram, CMB, large-scale structure) — pending merge

---

## 2. Upcoming Work

### Immediate

- Merge 6 new apps from `dev` to `main` after visual review
- Download real ESA Planck equirectangular textures for CMB app (currently procedural)
- Run CAMB Python script to generate CMB power spectrum grid (currently analytical approximation)
- LSS polish: fog slider, scale bar, fly-through mode, educational overlay

### Next-gen interactives

- 22 new app ideas ranked by impact/effort in `.planning/analysis/next-gen-interactives.md`
- Moon phases cluster (~400K+ combined searches) identified as biggest untapped SEO opportunity

---

## 3. History

### 2026-03-29 — Batch 2: remaining Top 10 physics sims

**6 apps built:**
- **Black Hole**: GLSL fragment shader gravitational lensing (Binet equation, leapfrog integrator, 300 steps). Accretion disk with Doppler boosting (δ³), gravitational redshift, blackbody colour ramp. Annotations toggle for photon sphere/ISCO/event horizon rings.
- **Density Wave**: 10K particles with differential rotation and density wave colouring. Separate pattern speed from material rotation demonstrates Lin-Shu theory. Traffic jam overlay, Ω(R) panel with resonance markers (CR/ILR/OLR), DM slider.
- **Roche Lobe**: MarchingCubes isosurface of Roche potential in co-rotating frame. L1/L2/L3 via bisection, L4/L5 at equilateral triangles. Ballistic mass transfer stream with Coriolis deflection. Accretion disk at circularisation radius. Potential/Gas mode toggle.
- **HR Diagram**: 2D Canvas with ~2000 IMF-weighted background population. 6 evolutionary tracks (0.5–25 M☉) with Catmull-Rom interpolation. Stellar cross-section sidebar with burning shells per phase. Clickable regions, iso-radius lines, spectral type bands.
- **CMB**: 3D rotatable sphere with layer peeling (raw sky → foreground removed → anisotropies). Click-to-inspect with galactic coordinates and ΔT. Power spectrum panel with Planck 2018 data + error bars. 4 cosmological parameter sliders with physically correct peak shifts.
- **Large-Scale Structure**: Zel'dovich approximation with ~50K particles, CDM power spectrum, growth factor D(z). Time slider z=10→0 shows structure formation. DM/baryon toggle. Depth fog, scale markers.

**SEO analysis:**
- 4 pages of Semrush keyword data captured for astronomy.swin.edu.au
- 19.8K keywords ranked, 49.6K monthly traffic (+59%), rivaling Wikipedia/NASA
- Moon phases cluster (~400K+ combined searches) as biggest untapped opportunity
- 22 new interactive app ideas ranked by impact/effort

### 2026-03-29 — Batch 1: house style + asteroid upgrade

- Deep analysis of all 7 production interactives → `INTERACTIVE-STYLE-GUIDE.md`
- Copy-paste snippet files: `.agents/snippets/house-style.css`, `house-style.js`, `components.js`
- Asteroid belt major upgrade: 10K particles, Kirkwood gaps, Greeks/Trojans, Hildas (3:2 resonance), Ceres/Vesta, histogram panel
- All `dev/*-article.html` → `dev/*.html` (12 files renamed)
- Zenith interactive house-style update

### 2026-03-28 — Batch 0: first 4 physics sims

- Pulsar, Binary Star, Rotation Curve built through full pipeline
- Gravitational Waves enhanced (3D volume, WebAudio chirp, spectrogram)

### 2026-03-27 — Planet globes + infrastructure

- All 8 planet globe interactives built
- Sun (Babylon.js), Satellites (CelesTrak), Asteroids (orbital mechanics)
- Agent system established (7 agents, 3 pipeline modes)
- Verification system (`verify.js` with Puppeteer)

### 2026-03-26 — Project inception

- COSMOS encyclopedia site upgrade project started
- 643 articles archived to `articles_orig/`
- Planning documents, candidate list, initial analysis
