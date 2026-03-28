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
| Pulsar | `pulsar-interactive.html` | `pulsar.html` | Physics sim | Dipole field lines, beam cones, pulse profile, audio |
| Binary Star | `binary-star-interactive.html` | `binary-star.html` | Physics sim | Kepler orbits, RV curves, eclipse light curve |
| Rotation Curve | `rotation-curve-interactive.html` | `rotation-curve.html` | Physics sim | Galaxy particles, DM slider, component decomposition |

### Built on `dev` branch (pending review + merge to main)

| App | Interactive | Article | Type | Notes |
|-----|-----------|---------|------|-------|
| Black Hole | `black-hole-interactive.html` | `black-hole.html` | Physics sim | GLSL Schwarzschild lensing, accretion disk with Doppler boosting, annotations |
| Density Wave | `density-wave-interactive.html` | `density-wave-model.html` | Physics sim | 10K particles, differential rotation, pattern speed, star formation colouring, Ω(R) panel |
| Roche Lobe | `roche-lobe-interactive.html` | `roche-lobe.html` | Physics sim | MarchingCubes equipotentials, L1 mass transfer stream, Coriolis deflection, accretion disk |
| HR Diagram | `hr-diagram-interactive.html` | `hertzsprung-russell-diagram.html` | Physics sim | 2D Canvas, 6 mass tracks, Catmull-Rom animation, cross-section sidebar, clickable regions |
| CMB | `cmb-interactive.html` | `cosmic-microwave-background.html` | Physics sim | 3D rotatable sphere, layer peeling, power spectrum panel, cosmological parameter sliders |
| Large-Scale Structure | `large-scale-structure-interactive.html` | `large-scale-structure.html` | Physics sim | Zel'dovich approximation, 50K particles, time evolution z=10→0, DM/baryon toggle |

---

## Completed (2026-03-29, batch 2)

### All 6 remaining Top 10 physics sim apps built
- **Black Hole**: GLSL fragment shader gravitational lensing (Binet equation, leapfrog integrator, 300 steps). Accretion disk with Doppler boosting (delta^3), gravitational redshift, blackbody colour ramp. Annotations toggle for photon sphere/ISCO/event horizon rings.
- **Density Wave**: 10K particles with differential rotation and density wave colouring. Separate pattern speed from material rotation demonstrates Lin-Shu theory. Traffic jam overlay, Ω(R) panel with resonance markers (CR/ILR/OLR), DM slider.
- **Roche Lobe**: MarchingCubes isosurface of Roche potential in co-rotating frame. L1/L2/L3 via bisection, L4/L5 at equilateral triangles. Ballistic mass transfer stream with Coriolis deflection. Accretion disk at circularisation radius. Potential/Gas mode toggle.
- **HR Diagram**: 2D Canvas with ~2000 IMF-weighted background population. 6 evolutionary tracks (0.5–25 M☉) with Catmull-Rom interpolation. Stellar cross-section sidebar with burning shells per phase. Clickable regions, iso-radius lines, spectral type bands.
- **CMB**: 3D rotatable sphere with layer peeling (raw sky → foreground removed → anisotropies). Click-to-inspect with galactic coordinates and ΔT. Power spectrum panel with Planck 2018 data + error bars. 4 cosmological parameter sliders with physically correct peak shifts.
- **Large-Scale Structure**: Zel'dovich approximation with ~50K particles, CDM power spectrum, growth factor D(z). Time slider z=10→0 shows structure formation. DM/baryon toggle. Depth fog, scale markers.

### SEO analysis and next-gen strategy
- Captured 4 pages of Semrush keyword data for astronomy.swin.edu.au
- 19.8K keywords ranked, 49.6K monthly traffic (+59%), rivaling Wikipedia/NASA
- Identified moon phases cluster (~400K+ combined searches) as biggest untapped opportunity
- Analyst produced 22 new interactive app ideas ranked by impact/effort
- Full analysis at `.planning/analysis/next-gen-interactives.md`

## Completed (2026-03-29, batch 1)

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

## Pending

- Merge 6 new apps from `dev` to `main` after visual review
- Download real ESA Planck equirectangular textures for CMB app (currently procedural)
- Run CAMB Python script to generate CMB power spectrum grid (currently analytical approximation)
- LSS polish features: fog slider, scale bar, fly-through mode, educational overlay
- Next-gen interactives: 22 new app ideas in `.planning/analysis/next-gen-interactives.md`

---

## Infrastructure

- **Agent system**: 7 agents in `.agents/sao-*.md` (orchestrator, researcher, coder, verifier, visual designer, writer, analyst)
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

- `main` — production (15 apps: 8 planets, GW, sun, satellites, asteroids, pulsar, binary star, rotation curve)
- `dev` — 6 new apps built (black hole, density wave, roche lobe, HR diagram, CMB, large-scale structure) — pending merge
