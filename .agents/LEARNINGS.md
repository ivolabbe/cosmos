# COSMOS Interactive Apps — Learnings & Rules

*Accumulated project knowledge from building interactive visualizations. Read by all agents at startup. Updated after each app pipeline.*

---

## Development Rules

### Physics correctness is non-negotiable
All physics in interactive visualizations must be correct. This is an educational tool for a university astronomy encyclopedia — incorrect physics misleads students. When unsure about physics, say so rather than guessing. Don't speculate about what reference visualizations are doing — verify from source code or papers.

### Reference code or formula before implementation
Before writing physics in a spec, find **reference code or authoritative formulas** from credible sources (astropy, galpy, NASA/STScI repos, published researchers' GitHub, textbooks, peer-reviewed papers). This validates the physics AND gives the coder a cross-check.

### Verify in browser, never assume
Never assume code works. After writing any interactive: start server, open in Chrome, screenshot, check console errors. Compare output to reference sources (NASA imagery, etc.) for visual quality. Don't theorize — measure, print, and know. If something fails: log the failure, diagnose, fix, re-test.

### Physics verification is generic, not app-specific
Every physics element must be checked for: (1) direction sanity — beams diverge, orbits are prograde, flows go the right way; (2) geometry — shapes match physics (dipole loops, elliptical orbits); (3) scale relationships — parameter changes produce correct relative effects; (4) interaction consistency — if camera angle and a control both affect the same physical quantity, they must agree.

### Never modify articles/ directly
The `articles/` directory is the **production reference** — it must stay untouched on `dev` so we can compare before/after. All new/updated article pages go in `experimental/` only. When ready to go live, the migration is a deliberate copy from `experimental/` to `articles/`, not an in-place edit.

### Minimal article modifications
When adding an interactive to an existing article: ONLY add the iframe embed block and its caption. Do not rewrite, expand, restructure, or "enhance" article content. Slight modifications (<15%) are acceptable — correcting obvious mistakes or updating to present day. A different team handles substantial text changes. For new articles, match the COSMOS voice per `cosmos-style-analysis.md`.

### Rapid visual iteration
The user iterates rapidly by testing visually in Chrome and queuing corrections. Physical accuracy is as important as visual appeal. Don't over-engineer before testing — make the minimal change, let the user evaluate, iterate. The user references real physics papers/tools as visual quality targets — take these seriously.

### Visual quality via sub-agent
Visual verification is context-heavy (web searches, image comparisons). The verifier dispatches `sao-visual` as a sub-agent. Visual rules: favour additive blending for glow, use bloom tastefully (0.2–0.4), make sparse lines thick enough to see (stacked copies), find appropriate textures for spherical bodies. **Never change physics to match visuals** — only adjust visual parameters (zoom, brightness, opacity, line thickness, colour, bloom).

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
- Beam cones: ConeGeometry + custom shader with radial/axial fade + `AdditiveBlending`. **IMPORTANT**: ConeGeometry apex is at +Y — must flip (rotate PI) for beams that diverge outward from a source. Unfixed, beams converge (physically wrong).
- Circular particles: mandatory for all particle apps. Use ShaderMaterial with `if (d > 1.0) discard; alpha = exp(-d*d*2.0);`. Default PointsMaterial = ugly squares.
- Bloom vs density: control bloom via particle SIZE not brightness. Dense regions (bulge/cores) = tiny bright particles. Sparse regions (disk/outskirts) = larger particles. Never dim particles to control bloom.
- Fullscreen panels: generous sizing (380px, 15px font, 380×220 canvases). Embedded: shrink via CSS. Visual agent checks both.
- Periodic profiles: offset display by half-period so peaks are centred, not split at plot boundary.
- Readouts: always physically meaningful (actual masses in units, DM fraction within stated radius). Never just slider percentages.
- Speed ranges: match physics context (galaxy 0.01–1.0x, pulsar depends on period). Don't use generic ranges.
- Reference curves (solid body, Keplerian): don't clamp to plot max — let canvas clip naturally.
- Translucent reference shapes (disk ring, bulge sphere) at low opacity add spatial context.
- Stars (stellar objects): use a **luminance-tint shader** — convert sun texture to grayscale (preserving granulation detail) then multiply by target colour. `MeshBasicMaterial({ map, color })` multiplies RGB×RGB which turns blue×orange into grey. The shader approach works for any temperature. Hotter stars get higher brightness uniform (>1.0) to trigger bloom. No extra halo spheres — bloom handles the glow.
- WebGL colour manipulation for textures: (1) luminance-tint shader (best), (2) canvas 2D pre-processing, (3) find a different texture online. Option 1 is most flexible — one texture serves all stellar types.
- Camera-physics linking: when camera angle IS a physical parameter (e.g., binary inclination), they must be two-way linked. OrbitControls 'change' event → update slider → recompute physics.
- Defaults must show the key feature on first load: eclipsing binary should show eclipses (i > i_crit), pulsar should show a pulse (|beta| < rho).
- Verifier must not just note issues as "minor" — if a directive was given (layout sizing, article corrections, visual research), failing to implement it is a FAIL, not a "minor note".
- Writer agent: <15% correction permission means ACTUALLY making the correction, not just flagging it for a content team.
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
