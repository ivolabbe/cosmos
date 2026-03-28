# Asteroid Belt Interactive — Dev Log

**Files:** `experimental/asteroid-interactive.html`, `experimental/asteroid.html`
**Status:** Production-ready (major upgrade 2026-03-29)
**Started:** 2026-03-23

## Overview

Top-down solar system view showing the main asteroid belt, Kirkwood gaps, and Jupiter Trojans. Three.js with CSS2D labels and tooltips. Embeddable via iframe.

## Architecture

- Three.js 0.170 via CDN importmap + CSS2DRenderer for labels
- 10,000 main belt particles via circular ShaderMaterial (makeCircleMat with min-size clamp)
- Kepler solver for elliptical orbits with random RAAN for decorrelated z-oscillation
- Realistic radial distribution: piecewise linear density table traced from observed histogram
- Kirkwood gap exclusion zones (3:1, 5:2, 7:3, 2:1) as zero-density zones in PDF
- Greeks (L4) and Trojans (L5) with Gaussian inclination, z-oscillation, tapered tangential scatter
- Hildas: real Keplerian orbits locked to Jupiter (hildaTime = 3/2 × jupTime), triangle from aphelion clustering
- Ceres and Vesta as named objects with raycaster tooltips
- Semi-major axis distribution histogram panel (log scale, colour-coded by population)
- HTML distance scale overlay (fixed screen X, tracks zoom, ignores rotation/tilt)
- Radial-gradient Sun sprite with additive blending
- EffectComposer + UnrealBloomPass + OutputPass
- Spacebar play/pause

## Iteration Log

### v1 — Initial prototype (2026-03-23)
- Full solar system (Sun, inner planets, Jupiter) with asteroid belt
- Kirkwood gaps visible at correct resonance locations
- Trojan clusters at L4/L5
- Controls: Play/Pause, Speed, Orbits, Labels

### v2 — Major upgrade (2026-03-29)
- House style CSS/chrome (info panel, controls bar, embedded mode, credit, loading)
- Circular particles (ShaderMaterial), bloom pipeline, two-layer stars
- Realistic belt distribution from observed histogram (piecewise linear PDF)
- Greeks (L4) renamed, Trojans (L5) with Gaussian inclination + z-oscillation
- Hildas added: real Keplerian orbits, 3:2 resonance lock to Jupiter, aphelion-biased phase → triangle
- Ceres + Vesta as named bodies with raycaster hover tooltips
- Semi-major axis histogram panel (log scale, colour-coded populations)
- HTML distance scale overlay (zoom-tracking, rotation-invariant)
- Sun: radial-gradient sprite + additive blending (no more flat disc)
- Orbit lines: plain THREE.Line + additive blending (Line2 had artifacts)
- Embed/fullscreen particle opacity tuning for bloom balance
- Spacebar play/pause

## Resolved Issues
- [x] Visual density — now 10K particles with realistic distribution
- [x] Tooltip — raycaster on planet meshes, not just labels
- [x] Kirkwood gaps — wide enough to be visible, correct resonance ratios
- [x] Square particles → circular ShaderMaterial
- [x] No bloom → full bloom pipeline
- [x] Sun flat disc → radial gradient sprite
- [x] Stacked-line orbit hack → plain THREE.Line + additive
- [x] Background #0a0a2e too bright → #000

## Open Issues
- [ ] Hilda triangle drifts slightly at high speed (3:2 lock is approximate)
- [ ] Consider adding Near-Earth Asteroids (Aten, Apollo, Amor groups)
