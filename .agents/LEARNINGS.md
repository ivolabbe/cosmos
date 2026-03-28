# COSMOS Interactive Apps — Learnings & Rules

*Accumulated project knowledge from building interactive visualizations. Read by all agents at startup. Updated after each app pipeline.*

---

## Development Rules

### Physics correctness is non-negotiable
All physics in interactive visualizations must be correct. This is an educational tool for a university astronomy encyclopedia — incorrect physics misleads students. When unsure about physics, say so rather than guessing. Don't speculate about what reference visualizations are doing — verify from source code or papers.

### Verify in browser, never assume
Never assume code works. After writing any interactive: start server, open in Chrome, screenshot, check console errors. Compare output to reference sources (NASA imagery, etc.) for visual quality. Don't theorize — measure, print, and know. If something fails: log the failure, diagnose, fix, re-test.

### Minimal article modifications
When adding an interactive to an existing article: ONLY add the iframe embed block and its caption. Do not rewrite, expand, restructure, or "enhance" article content. Slight modifications (<10%) are acceptable — correcting obvious mistakes or updating to present day. A different team handles substantial text changes. For new articles, match the COSMOS voice per `cosmos-style-analysis.md`.

### Rapid visual iteration
The user iterates rapidly by testing visually in Chrome and queuing corrections. Physical accuracy is as important as visual appeal. Don't over-engineer before testing — make the minimal change, let the user evaluate, iterate. The user references real physics papers/tools as visual quality targets — take these seriously.

### Continuous learning
After every successful result, write learnings to the project. Update agent files, dev logs, and style guides with new knowledge. Pattern: build → test → verify → log → improve skill → next iteration.

---

## Technical Learnings

### Atmosphere rendering
Ray-marched column density on a single FrontSide sphere is the ONLY approach that works for realistic planetary atmospheres. Rejected approaches: single fresnel rim (ring not gradient), multiple discrete shells (banding), Stemkoski glow (stylized only), per-fragment fresnel on shells (wrong brightness profile). Use the shader from `satellites-interactive.html`. Key params: `scaleHeight`, `intensity` (2–4), `atmosRadius`.

### Three.js patterns
- Planet globe: `SphereGeometry(1, 128, 64)` + `MeshStandardMaterial`. Roughness 0.75–0.95.
- Stars: two-layer (800 dim opacity 0.3 + 80 bright opacity 0.9) with bloom threshold 0.4.
- Bloom: `UnrealBloomPass` + `OutputPass` (OutputPass required in Three.js 0.170.0+).
- Saturn rings: `MeshBasicMaterial` (self-lit), not Standard — flat geometry + directional light = barely visible.
- Earth shader: MUST use world-space normals for day/night, not view-space.
- `Line2` with transparency causes dotted artifacts — use stacked `THREE.Line` copies instead.
- Headless Puppeteer CANNOT render WebGL. Always `headless: false` for verification.
- `const` declarations don't hoist — any function referencing a const must be called AFTER the const is defined (binary star `orbitControls` bug).

### Physics sim patterns
- GW interactive is the canonical template for physics sims (2D panels + sliders + audio + readouts).
- Kepler solver: 10–12 Newton-Raphson iterations, `atan2`-based true anomaly.
- Pulsar anti-pole: θ_anti = π − θ_north (NOT `pulseIntensity(phase, PI−alpha, zeta, rho)`).
- Beam cones: ConeGeometry + custom shader with radial/axial fade + `AdditiveBlending`.
- Visual spin cap: for P < 0.5s, cap visual omega at 2 Hz; physics runs at correct rate.
- Web Audio: continuous oscillator for P < 50ms, discrete clicks for P > 50ms. Init on user gesture.
- Binary star: camera-from-inclination approach is cleaner than rotating the orbit group.
- Rotation curve: `G' = 4.302×10⁴` in galactic units (10¹⁰ M☉, kpc, km/s).

### Spec-writing pitfalls
- Spec pseudocode MUST be tested — the pulsar anti-pole formula had a bug caught only by the verifier.
- Rotation curve spec used positive wind factor for spiral arms (produces leading arms); should be negative for trailing.
- Always include a "test these values" section in specs for verifier cross-checks.

---

## File Organisation

| Location | Contents |
|---|---|
| `.agents/sao-*.md` | Agent definitions with per-agent Learnings sections |
| `.agents/INTERACTIVE-STYLE-GUIDE.md` | Three.js visual/architecture rules |
| `.agents/cosmos-style-analysis.md` | 643-article corpus voice/level/style analysis |
| `.agents/verify.js` | Automated Puppeteer verification script |
| `.planning/INTERACTIVE-DEMOS.md` | Top 10 ranked candidate list |
| `.planning/apps/*.md` | Per-app dev logs |
| `.planning/apps/*-spec.md` | Build specs for physics sim apps |
| `experimental/*-interactive.html` | Interactive visualizations |
| `experimental/*-article.html` | Article pages with embedded interactives |
| `experimental/assets/` | Textures, models, credits |

---

## External References

- **GWPV**: `github.com/nilsvu/gwpv` — visual quality target for 3D gravitational wave rendering
- **Black hole lensing**: `github.com/nilsvu/black-holes-playground` — Schwarzschild WebGL
- **NASA Eyes**: `eyes.nasa.gov` — gold standard for space visualization UI
- **NASA SVS**: `svs.gsfc.nasa.gov` — pre-rendered astrophysics animations (visual references)
- **Solar System Scope**: `solarsystemscope.com/textures` — CC BY 4.0 planet textures
- **NRAO ERA**: `cv.nrao.edu/~sransom/web/Ch6.html` — pulsar equations reference
- **NAAP**: `astro.unl.edu` — educational astronomy simulators (feature reference)
- **Testing**: always `python3 -m http.server 8765`, never `file://` (ES modules need HTTP)
