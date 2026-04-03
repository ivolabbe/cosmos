# SAO Researcher — COSMOS Interactive Apps

*Assembled from: `roles/researcher.md` + `domains/astro-research.md` + `domains/threejs-interactive.md`*

**To use this agent:** The orchestrator assembles the prompt from the role + domain files. This file preserves COSMOS-specific learnings. For the full role definition, see `roles/researcher.md`. For domain knowledge, see `domains/astro-research.md` and `domains/threejs-interactive.md`.

---

## Learnings

*Append after each research task.*

- 2026-03-28 — Solar System Scope is the best CC-licensed texture source. 8K for major planets, 2K for Uranus/Neptune.
- 2026-03-28 — NASA Eyes (eyes.nasa.gov) is the gold standard for space visualizations. Study their UI patterns.
- 2026-03-28 — For planet apps, the spec is simple (textured sphere). For physics sims (GW, HR diagram), the spec needs a detailed shader/math section.
- 2026-03-28 — Saturn ring alpha texture from Solar System Scope works but needs manual UV remapping on RingGeometry.
- 2026-03-28 — Moon counts as of 2024: Jupiter 95, Saturn 146, Uranus 27, Neptune 16. These will change.
- 2026-03-28 — Pulsar: NRAO Essential Radio Astronomy Ch.6 is the single best reference for pulsar equations. Rankin 1993 for beam geometry.
- 2026-03-28 — For physics sims: the spec's pseudocode MUST be tested (the anti-pole interpulse formula had a bug). Include a "test these values" section.
- 2026-03-28 — NASA SVS (svs.gsfc.nasa.gov) has pre-rendered pulsar animations — excellent visual reference but not interactive.
- 2026-03-28 — Binary stars: Tatum's Celestial Mechanics Ch.18 for RV formulas. Clubb (Caltech) for clean derivation.
- 2026-03-28 — Binary stars: Eggleton 1983 (ApJ 268, 368) for Roche lobe radius, accurate to ~1%.
- 2026-03-28 — Binary stars: No existing tool unifies 3D + RV + light curve — unique value.
- 2026-03-28 — For multi-panel physics sims: key layout = (3D center/left) + (2D panels right) + (controls bottom) + (info top-left).
- 2026-03-28 — Rotation curves: Sofue 2009 (PASJ 61, 227) for MW decomposition. Freeman 1970 for exponential disk.
- 2026-03-29 — Large-scale structure: Zel'dovich approximation is ideal. Carroll, Press & Turner 1992 eq.29 for growth factor.
- 2026-03-29 — CMB: redshiftzero/cosmowebapp for pre-computed CAMB grid. Wayne Hu tutorials for pedagogical annotations.
- 2026-03-29 — Density wave: Beltoforion/Rougier use tilted ellipses — NOT true density wave physics. Need separate pattern speed.
- 2026-03-29 — Black hole: oseiskar/black-hole is the best Three.js reference. Binet equation u'' = -u(1-1.5u^2) for null geodesics.
- 2026-03-29 — Roche lobe: No existing WebGL/Three.js Roche lobe interactive exists. Zero prior art in JS.
- 2026-03-29 — HR diagram: Hurley, Pols & Tout 2000 for analytic stellar evolution. MIST for downloadable tracks.
- 2026-03-29 — Unit consistency is the #1 pitfall for galactic dynamics sims.
