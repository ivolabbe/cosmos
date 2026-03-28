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
Visual verification is context-heavy (web searches, image comparisons). The verifier dispatches `sao-visual` as a sub-agent. Visual rules: favour additive blending for glow, use bloom tastefully (0.2–0.4), use plain THREE.Line + additive for orbit lines (no stacking, no Line2 with transparency), find appropriate textures for spherical bodies. **Never change physics to match visuals** — only adjust visual parameters (zoom, brightness, opacity, line thickness, colour, bloom).

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
- `Line2` with transparency causes dotted artifacts — use plain `THREE.Line` with additive blending instead. Do NOT stack copies at Y offsets (breaks at zoom).
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

### Visual polish — mistakes and corrections (2026-03-29)
- **PointsMaterial renders squares.** Always use ShaderMaterial with `gl_PointCoord` discard + Gaussian falloff (`makeCircleMat`). This was the first mistake made on the asteroid app and has been caught on multiple other apps too — it is the single most common visual error.
- **Double-FrontSide spheres for glow are wrong.** Use BackSide halos (for 3D bodies) or radial-gradient sprites with AdditiveBlending (for point sources in diagrams). FrontSide double-spheres produce an ugly hard-edge disc.
- **Stacked `THREE.Line` copies (±0.008 Y offset) break at zoom.** The copies separate when zoomed in and collapse when zoomed out. This hack should NOT be used. Plain `THREE.Line` + additive blending is the correct approach — 1px on screen, glow from additive overlap, artifact-free at all zoom levels.
- **`Line2`/`LineMaterial` with transparency produces stippled/dotted artifacts.** Only use `Line2` for fully opaque elements (e.g. scale bar ticks where `transparent: false`). For any transparent or additive line, use plain `THREE.Line`.
- **Wide diffuse halo sprites (2x scale, 0.3 alpha stacked behind core) look ugly.** One compact sprite is enough; let bloom handle the soft glow naturally. Never paint a wide halo to simulate bloom.
- **Background `#0a0a2e` is too bright/blue.** Use `#000` for all space scenes. Deep navy was an early experiment that made scenes look murky.
- **Different bloom/particle parameters for embed vs fullscreen breaks consistency.** Never change bloom strength, sprite scales, or line widths per mode. The ONE exception: particle opacity and size may be reduced in embedded mode for dense particle fields that compound with bloom into overblown white masses.
- **Sun as flat disc + sphere is wrong for diagram-scale views.** Use a radial-gradient CanvasTexture on a Sprite with AdditiveBlending. The gradient provides a compact bright core with smooth falloff; bloom handles the outer glow.
- **Planet glow halos are unnecessary for small schematic markers.** In diagram-scale views where planets are tiny dots, bloom on a bright MeshBasicMaterial colour is sufficient. Adding halo layers at this scale just wastes draw calls.
- **Bloom threshold tuning:** too low makes everything glow (including the UI glass panels); too high misses small bright objects. Tune per scene and test. For the asteroid diagram: strength 0.45, radius 0.7, threshold 0.4.

### Physics implementation — asteroid belt (2026-03-29)
- **Asteroid z-phases need random RAAN.** Without independent `raan` values, asteroids at similar semi-major axes oscillate in correlated sinusoidal "marching" patterns. Applying a random RAAN rotation (`cos/sin` rotation in the XZ plane) decorrelates the vertical oscillation.
- **Kirkwood gaps must be wide enough to be visually obvious.** The real gaps are narrow, but at 5000-10000 particles the density dip must be unmistakable. Use exclusion half-widths of 0.12-0.20 AU, wider for stronger resonances (2:1 widest at 0.20, 3:1 at 0.18).
- **Realistic belt distribution:** Use a piecewise-linear density table traced from an observed reference histogram, not uniform random or simple Gaussian sampling. Build a CDF from the table and use inverse-transform sampling for physically correct asteroid placement.
- **Trojan naming:** L4 = Greeks (leading), L5 = Trojans (trailing). Historically correct — the L4 group was named after Greek heroes, the L5 group after Trojan defenders.
- **Hildas are NOT trapped at equilibrium points.** Unlike Trojans (which librate around L4/L5), Hildas orbit independently on eccentric ellipses in 3:2 resonance with Jupiter. The triangular pattern is a "traffic jam" — Hildas slow at aphelion, and with 3 aphelion directions 120 degrees apart, the density peaks form a triangle.
- **Pure Keplerian Hildas drift relative to Jupiter** without gravitational feedback. Fix: derive Hilda time from Jupiter time (`hildaTime = 3/2 * jupTime`) to enforce resonance lock. This keeps the triangle locked to Jupiter's orbital motion.
- **All Hildas need the same forced period** for the triangle to be stable (the real resonance enforces this). Individual `a` values can vary (3.7-4.1 AU) for visual spread, but the period is forced to `P = a0^1.5` for the reference semi-major axis.
- **Hilda aphelion direction:** In the `orbitXYZ` coordinate convention, aphelion points at angle `(pi - omega)` in the XZ plane. Therefore, to aim aphelion at `targetAngle`, set `omega = pi - targetAngle`.
- **Hilda phase distribution biased toward aphelion:** 60% of phases near M=pi (aphelion) with Gaussian scatter, 40% uniformly distributed. This mimics resonance libration, which keeps Hildas near aphelion longer than pure Kepler predicts.
- **Trojan inclination distribution:** Use Gaussian-weighted inclination (sum of 3 random values minus 1.5, divided by 1.5, times max amplitude). This approximates the observed distribution (mean ~10 degrees, rare above 25 degrees). Uniform distribution to +/-35 degrees is unrealistic.
- **Population ratios:** Trojans ~1% of belt (use 5% for visibility), Hildas ~0.4% of belt (use 2-6% for visibility with minimum count for triangle to be visible).

### UI/UX lessons (2026-03-29)
- **Play/Pause label convention:** Show what clicking WILL DO. When playing: "Pause" (with pause icon, button has `.active` class with red bg). When paused: "Play" (with play icon, default style).
- **Spacebar must toggle play/pause in every app.** This is a project-wide rule. Add a `keydown` listener for `Space` that calls `preventDefault()` and triggers the play button click.
- **Labels should be close to objects.** Use offsets of 0.05-0.08 world units. Offsets of 0.25+ cause labels to drift away when zoomed in.
- **Tooltip should trigger on planet mesh hover (raycaster)**, not only on label text. Labels are small and hard to hover; the mesh is a larger hit target. Use `Raycaster.intersectObjects` on `pointermove`.
- **Distance scale should be HTML overlay (fixed screen X), not 3D geometry.** The scale bar tracks zoom via camera FOV projection but does NOT rotate or tilt with the scene. This ensures the scale is always readable and always in the same screen position.
- **Panel titles: keep short, use standard `.panel-box h3`** (11px, weight 400, 50% opacity white).
- **Histogram needs log scale** to show small populations (Hildas, Trojans) alongside the large main belt population.
- **Embed panel sizes must be tested.** CSS scaling of a native canvas can make text unreadable. Always verify both fullscreen and embedded modes.
- **Adapt label font sizes for embed vs fullscreen** using the `isEmbedded` flag. Distance scale labels: 14px fullscreen, 11px embedded. Secondary (light-minute) labels: 12px fullscreen, 9px embedded.

### Verification process lessons (2026-03-29)
- **Code-reading verification is useless for visual quality.** Must use actual browser (Puppeteer headed or Chrome). A code review cannot catch visual artifacts, alignment issues, or bloom interactions.
- **Visual verification must check IMPLEMENTATION patterns**, not just visual outcomes. A wrong implementation (e.g. double-FrontSide spheres) that happens to look passable under one set of bloom settings will break under different conditions.
- **Always dispatch both sao-verify + sao-visual agents.** Never substitute manual code review for visual inspection.
- **A "PASS" report without screenshots is invalid.** The verifier must produce actual screenshots. A text-only report proves nothing was actually rendered.

### Process mistakes to avoid (2026-03-29)
- **Read the style guide BEFORE implementing.** Many mistakes in the asteroid app were patterns already documented as "don't do this" in the style guide.
- **Simpler is better.** Over-engineering (wide halos, stacked lines, per-mode bloom parameters) always produced worse results than the simple approach (plain lines + additive, bloom alone, identical 3D settings both modes).
- **Don't make the same mistake multiple times.** If a correction is given (e.g. "no Line2 with transparency"), apply it consistently to ALL similar elements, not just the one that was flagged.
- **Test embed and fullscreen side by side** before declaring done. Many issues (unreadable text, overblown particles, hidden panels) only appear in one mode.
- **Don't accept verification reports at face value.** Check that the report includes screenshots and specific measured values, not just "looks good".

### Spec-writing pitfalls
- Spec pseudocode MUST be tested — the pulsar anti-pole formula had a bug caught only by the verifier.
- Rotation curve spec used positive wind factor for spiral arms (produces leading arms); should be negative for trailing.
- Always include a "test these values" section in specs for verifier cross-checks.
- Density wave spec had the SAME trailing-arm sign error as the rotation curve spec. This pattern repeats — add a checklist item for all galaxy/spiral specs.
- LSS spec's growth factor test values (D(z=10)=0.079) were wrong — actual value ~0.115. Verifier caught this via independent Python computation.

### Batch 2 learnings (2026-03-29) — 6 Hard/Hardest tier apps

**Architecture:**
- **2D Canvas is correct for diagram apps.** The HR Diagram doesn't need Three.js — a 2D scatter plot with Canvas 2D renders crisply and is simpler to develop. Don't force Three.js on 2D visualizations.
- **GLSL fragment shader apps are fundamentally different.** Black hole lensing renders a full-screen quad — no Three.js geometry. The GW interactive is the closest template for HTML/CSS/controls, but the 3D pipeline is entirely different.
- **MarchingCubes for isosurfaces** works well (Roche Lobe). Use `setCell()` for custom scalar fields, not `addBall()` (which uses 1/r², not the Roche potential).
- **Procedural textures are acceptable placeholders** for data-dependent apps (CMB). Ship with procedural, upgrade to real data later.

**Physics:**
- **Zel'dovich approximation** is an excellent lightweight approach for cosmic web visualization. RMS displacement ~5-10 Mpc produces visible filaments. Time evolution is trivial (multiply displacement by D(z)).
- **Roche potential** coordinate conventions: spec uses (x,y) as orbital plane, COSMOS uses (x,z). Coriolis sign conventions are error-prone — cross-reference with rozwadowski/Roche-lobe.
- **Waypoint-based evolutionary tracks** (HR Diagram) are far simpler than full SSE analytic formulae and produce indistinguishable results for educational purposes. Catmull-Rom interpolation eliminates sharp corners.
- **Analytical spectrum approximations** (CMB) capture qualitative parameter effects without CAMB dependency. Ship fast, upgrade later.

**Process:**
- **Parallel dispatch of 6 researchers + 6 writers + 6 coders works.** All 6 specs completed, all 6 articles completed, all 6 interactives built in one session.
- **Embed detection must check BOTH** `window.self !== window.top` AND `?embed=1` URL parameter. This was missed by 3 of 6 coders — add to style guide template.
- **Default values must show the key feature.** Roche Lobe defaulted to fill=0.8 (no mass transfer visible). Changed to 1.05 so users see the L1 stream immediately.
- **Rate limits can interrupt coder agents mid-build.** Files are often structurally complete but may miss polish stages. Verify what was written before rebuilding.

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
| `experimental/*.html` (non-interactive) | Article pages with embedded interactives |
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
