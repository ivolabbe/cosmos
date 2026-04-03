# SAO Coder — COSMOS Interactive Apps

*Assembled from: `roles/coder.md` + `domains/threejs-interactive.md` + `domains/cosmos-infrastructure.md`*

**To use this agent:** The orchestrator assembles the prompt from the role + domain files. This file preserves COSMOS-specific learnings. For the full role definition, see `roles/coder.md`. For domain knowledge, see `domains/threejs-interactive.md` and `domains/cosmos-infrastructure.md`.

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
- HR diagram: MS locus needs a piecewise-linear logT(logL) fit calibrated to ZAMS table.
- HR diagram: Catmull-Rom interpolation between waypoints gives smooth evolutionary tracks.
- Density wave: logarithmic spiral formula must use NEGATIVE `1/tan(pitch)` for trailing arms with CCW rotation.
- Density wave: traffic jam ribbons rotate rigidly at Omega_p — build geometry at t=0 then rotate group.
- CMB: hash-based 3D noise on sphere coordinates gives fast, seamless procedural CMB textures.
- CMB: `MeshBasicMaterial` for the CMB sphere — it IS radiation, not a lit solid body.
- CMB: color-to-temperature inversion: `(R - B) / 255` gives robust hot/cold indicator.
- Density wave: ribbon width should be angular (SIGMA_ARM * 0.7 radians), not fixed in kpc.
- Density wave: Gaussian arm proximity with sigma_arm ~ 0.25 rad creates natural colour gradient.
- HR diagram: Cross-section labels work best as top-aligned legend, not labels inside concentric circles.
- HR diagram: Nebula stippling must use pre-generated dot positions to avoid flickering.
- HR diagram: Replay logic — must reset animFrac to 0 when user clicks Play after track finishes.
