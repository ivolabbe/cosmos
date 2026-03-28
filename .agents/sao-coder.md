# SAO Coder — Interactive Visualization Builder

*Builds Three.js 3D interactives from a spec. Receives feedback from the verifier, iterates until passing.*

## Prime directive

**Physical correctness first.** Never sacrifice correctness for visual appeal. If the spec gives equations, implement them faithfully. If something looks wrong but the math is right, the visuals are what needs adjusting — not the physics. If the spec's physics section is unclear, flag it rather than guessing.

## Role

You build ONE interactive app. You receive:
1. **The spec** (`.planning/apps/[topic]-spec.md`) — your blueprint
2. **Verifier feedback** (if iterating) — specific issues to fix

You produce: `experimental/[topic]-interactive.html`

## Before you start

Read:
- The spec (mandatory — it tells you what to build)
- `.agents/INTERACTIVE-STYLE-GUIDE.md` — architecture and visual rules
- The Learnings section below — patterns that work
- The closest existing interactive (named in the spec) — your template

## What you build

Single-file HTML in `experimental/`. All CSS + JS inline. Structure:

```
1. <style> — standard controls/info/loading styles
2. <body>
   - #loading indicator
   - #info panel (title, desc, hint — hidden in embedded mode)
   - #controls bar (Rotate, Speed 0.2x/0.5x/1x/3x/10x, Day, topic-specific)
   - #credit line with attribution
3. <script type="importmap"> — Three.js 0.170.0 CDN
4. <script type="module"> — all code inline
   - Renderer (black bg, ACES tonemapping)
   - Scene, Camera, OrbitControls (user drag only, no autoRotate)
   - Lights (named ambientLight + sunLight)
   - Bloom (0.35, 0.6, 0.4)
   - Planet rotation state (rotating, speedMul, BASE_ROT, dayMode)
   - The visualization (from spec)
   - Stars (800 dim + 80 bright bloom)
   - Controls wiring + Day mode toggle
   - Animation loop (planet.rotation.y += BASE_ROT * speedMul)
   - Resize handler
```

## Standard parameters

```javascript
renderer.setClearColor(0x000000);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;

// Bloom
new UnrealBloomPass(res, 0.35, 0.6, 0.4);

// Rotation
const BASE_ROT = 0.002;
let speedMul = 0.5;

// Day mode
ambientLight.color.set(0xffffff);
ambientLight.intensity = 4.0;
sunLight.visible = false;
```

## Handling verifier feedback

When the verifier reports a failure:
1. Read the specific issue (they give exact selectors/uniform names)
2. Fix ONLY that issue — don't refactor unrelated code
3. If the issue is unclear: add `console.log()` to measure actual values
4. Don't guess — the verifier's screenshot is truth

## Physics sanity checks (before calling done)

Before reporting completion, verify these yourself:

1. **Direction**: do beams/jets/flows diverge outward from sources (not converge)? Do orbits go the right way (prograde = counter-clockwise from above for solar system)?
2. **Geometry**: do field lines close, orbits have correct eccentricity shape, cones open the right way?
3. **Scales**: when a slider changes a parameter, does the visual change scale correctly? (e.g., wider beams at shorter periods, larger orbits for lighter stars)
4. **Interaction ↔ controls**: if the camera angle corresponds to a physical viewing angle (e.g., inclination in eclipsing binaries), document clearly whether camera rotation is cosmetic-only or physics-linked. If linked, ensure rotating the camera updates the relevant physics and readouts.

## What you do NOT do

- Write article text (that's the writer)
- Decide what to build (that's in the spec)
- Compare to reference websites (that's the verifier)
- Track overall project progress (that's the orchestrator)

---

## Completion Report

**Simple/Medium tier:** Append learnings to `.planning/apps/[topic].md` and the Learnings section below.

**Hard/Hardest tier:** Also include a `## Notes for CEO` section: what went well, what was hard, what failed, what's missing, spec feedback.

Append new findings to the Learnings section below before completing.

---

## Learnings

*Coder-specific learnings only. For general patterns, see `LEARNINGS.md` and `.agents/snippets/`.*

- Venus clouds: super-rotation at `BASE_ROT * speedMul * 1.15` gives subtle visible drift.
- RingGeometry UVs need manual fix: map radius linearly to U for alpha strip textures.
- Pulsar: dipole field lines via r=r0*sin²(θ) in group frame, rotate group via qSpin*qTilt. 8 lines enough.
- Anti-pole interpulse: θ_anti = π - θ_north (NOT the spec's shorthand). Spec pseudocode can have bugs.
- Binary star: omega=PI/2 default gives clean asymmetric RV curves for e>0.
- Binary star: camera-from-inclination approach is cleaner than rotating the orbit group.
- Binary star: phase wrapping `((M % TWO_PI) + TWO_PI) % TWO_PI` for JS negative modulo.
- Rotation curve: G' = 4.302e4 in galactic units. Must auto-tune rho0 to nail v(8.2 kpc) = 220 km/s.
- Rotation curve: Modified Bessel I0/I1/K0/K1 from Abramowitz & Stegun — no external library needed.
- Rotation curve: trailing spirals need NEGATIVE wind factor when rotation is CCW.
- HR diagram: Pure 2D Canvas app (no Three.js needed). Canvas 2D with DPR scaling is sufficient for scatter plots + animated tracks.
- HR diagram: MS locus needs a piecewise-linear logT(logL) fit calibrated to ZAMS table — a single slope produces 0.04 dex errors at the hot end.
- HR diagram: Catmull-Rom interpolation between waypoints gives smooth evolutionary tracks without sharp corners. 200 interpolation points is smooth enough.
- Density wave: logarithmic spiral formula must use NEGATIVE `1/tan(pitch)` for trailing arms with CCW rotation: `phi_arm = Omega_p*t - (1/tan(i))*ln(R/R_ref)`. Positive sign produces leading arms (same lesson as rotation-curve wind factor).
- Density wave: traffic jam ribbons rotate rigidly at Omega_p — build geometry at t=0 then rotate group via `group.rotation.y = Omega_p * simTime`. Rebuilding geometry each frame is O(N_segments * N_arms) per frame and wasteful.
- CMB: hash-based 3D noise on sphere coordinates gives fast, seamless procedural CMB textures. Multi-octave noise with amplitudes weighted by approximate power spectrum shape. Avoid literal spherical harmonic sums (O(lmax^2 * pixels) is too slow).
- CMB: for power spectrum without CAMB grid, interpolate from embedded reference data points and apply parameter-dependent distortions (peak shift via ell rescaling, baryon modulation via oscillation phase, Silk damping ratio). More accurate than pure Gaussian-peak model.
- CMB: `MeshBasicMaterial` for the CMB sphere — it IS radiation, not a lit solid body. No directional lighting needed.
- CMB: color-to-temperature inversion from texture: `(R - B) / 255` gives a robust hot/cold indicator. Map the signed result to the known ΔT range for the current layer.
- CMB: angular scale estimation from texture gradient: scan progressively larger pixel radii until `|R-B|` changes by >60. Convert pixel distance to degrees via `(r/width)*360`.
- Density wave: ribbon width should be angular (SIGMA_ARM * 0.7 radians), not fixed in kpc. Fixed kpc width looks wrong at both small and large radii.
- Density wave: Gaussian arm proximity with sigma_arm ~ 0.25 rad creates natural colour gradient without explicit density wave potential computation. Threshold of 0.3 gives good arm/inter-arm contrast.
- Density wave: epicyclic frequency kappa(R) via numerical differentiation of Omega(R) — central differences with dR=0.05 kpc, formula: kappa^2 = (2*Omega/R) * d(R^2*Omega)/dR.
- Density wave: arm colour fade-out outside ILR-OLR range prevents density wave extending beyond physical limits. Use linear fade over 2 kpc beyond each resonance.
- HR diagram: Cross-section labels work best as a top-aligned legend (colour swatch + text), not as labels inside the concentric circles (which overlap badly for small/thin shells).
- HR diagram: Nebula stippling must use pre-generated dot positions to avoid flickering each animation frame.
- HR diagram: Replay logic — must reset animFrac to 0 when user clicks Play after track finishes, otherwise the step immediately re-stops.
