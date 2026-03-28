# Black Hole Interactive — Dev Log

## Verification Log

### FAIL: black-hole interactive

**Date**: 2026-03-29
**Screenshots**: `/tmp/bh-fullscreen-initial.png`, `/tmp/bh-fullscreen-mass50.png`, `/tmp/bh-fullscreen-disk.png`, `/tmp/bh-fullscreen-disk-edgeon.png`, `/tmp/bh-disk-doppler-above.png`, `/tmp/bh-disk-edgeon2.png`, `/tmp/bh-mass1.png`, `/tmp/bh-mass100.png`, `/tmp/bh-embedded.png`, `/tmp/bh-fullscreen-final.png`
**Agent instructions checked**: `.agents/sao-coder.md`

### Checklist

| # | Category | Check | Result | Detail |
|---|----------|-------|--------|--------|
| 1 | Agent compliance | Coder followed instructions | PASS | All coder rules followed: physics first, house style, single-file |
| 2 | Rendering | Scene renders without errors | PASS | No JS errors in console; 404 for favicon only (benign) |
| 3 | Rendering | Bloom pipeline present | PASS | EffectComposer + UnrealBloomPass + OutputPass all present |
| 4 | Rendering | Canvas renders correctly | PASS | 1400x900 canvas, loading hidden on init |
| 5 | Style | Background #000 | PASS | `body { background: #000 }` and `renderer.setClearColor(0x000000)` |
| 6 | Style | House style CSS matches snippets | PASS | Info panel, controls bar, embedded mode, credit line all match house-style.css exactly |
| 7 | Style | Embedded mode works | PASS | `window.self !== window.top` detection, h2/desc/hint/credit hidden, compact readouts |
| 8 | Style | Credit line present | PASS | "COSMOS . Swinburne Astronomy Online" |
| 9 | Style | Info panel glass style | PASS | `rgba(10,10,46,0.92)` background, `rgba(255,255,255,0.12)` border |
| 10 | Controls | Mass slider functional | PASS | Range 1-100 Msun, readouts update correctly (rs, shadow) |
| 11 | Controls | Accretion disk toggle | PASS | Checkbox enables/disables disk in shader via `uDiskOn` uniform |
| 12 | Controls | Play/Pause button | PASS | Toggles state, shows correct label/icon, `.active` class with red bg |
| 13 | Controls | Speed slider | PASS | Range 0.1-5.0x, value display updates |
| 14 | Controls | Spacebar play/pause | PASS | Keydown listener for Space, preventDefault, toggles play state |
| 15 | Physics | Binet equation correct | PASS | `ddu = -u + 1.5 * u * u` (correct: d^2u/dphi^2 = -u + 3/2 u^2). NOT the wrong oseiskar form (-u*(1-1.5u^2) = -u+1.5u^3) |
| 16 | Physics | Leapfrog integrator | PASS | Stormer-Verlet: `u += du*h; ddu = ...; du += ddu*h; phi += h` |
| 17 | Physics | Adaptive step size | PASS | `h = 0.02 + 0.01 / (u*u + 0.001)` -- fine near BH, coarse far |
| 18 | Physics | 300 integration steps | PASS | `#define STEPS 300` (spec says 200-400) |
| 19 | Physics | Black shadow visible | PASS | Dark circular shadow in center, rays with u>=1.0 produce black |
| 20 | Physics | Star distortion around shadow | PASS | Stars near shadow edge are tangentially stretched/magnified; visible Einstein ring bands |
| 21 | Physics | Photon ring at shadow boundary | PASS | Rays that max out steps without escape/capture produce bright photon ring `vec4(1.2, 1.0, 0.8, 1.0)` |
| 22 | Physics | Shadow scales with mass | PASS | Mass=10: shadow 10.4deg, Mass=50: shadow 48.8deg. Monotonic increase confirmed |
| 23 | Physics | r_s readout correct | PASS | Mass=10: rs=29.5 km (expected 29.53). Mass=50: rs=147.7 km (expected 147.65). Mass=1: rs=3.0 km (expected 2.953) |
| 24 | Physics | Shadow angular diameter correct | PASS | At D=28.6 rs: shadow = 2*atan(2.598/28.6)*180/pi = 10.4 deg. Matches readout |
| 25 | Physics | ISCO at 3 r_s | PASS | `#define DISK_IN 3.0` -- disk inner edge at 3 r_s |
| 26 | Physics | Doppler boosting present | PASS | Clear brightness asymmetry visible: approaching side dramatically brighter (white) vs dim receding side |
| 27 | Physics | Doppler direction correct | PASS | Velocity `vDir = vec3(-sin(diskAz), 0.0, cos(diskAz))` = CCW prograde. Approaching side brighter. Correct |
| 28 | Physics | Gravitational redshift | PASS | `grs = sqrt(max(1.0 - 1.0/rC, 0.001))` -- correct Schwarzschild redshift factor |
| 29 | Physics | delta^3 beaming | PASS | `intensity = shift*shift*shift` with shift = dop*grs. Correct I_obs = delta^3 * I_emit |
| 30 | Physics | Disk wraps around shadow | PASS | Multiple disk plane crossings detected: `yO * yN < 0.0` catches all crossings. Far-side disk visible above and below shadow in inclined views |
| 31 | Physics | Disk temperature profile | PASS | `tFrac = pow(DISK_IN / rC, 0.75)` = T ~ (r_ISCO/r)^(3/4). Hot inner (white-blue) to cool outer (red-orange) via blackbody ramp |
| 32 | Physics | Camera distance readout | PASS | Shows effective distance in r_s units accounting for mass scaling |
| 33 | Physics | Disk animation uses uDiskTime | **FAIL** | `uDiskTime` uniform is declared and updated from JS but **never read in the shader**. The disk does not visually rotate when playing. The Play/Pause and Speed controls have no visible effect on the disk |
| 34 | Spec | Annotations toggle present | **FAIL** | Spec requires "Show Annotations toggle: photon sphere circle, ISCO circle, shadow boundary label. Default: off." No such toggle exists in the controls bar, and no annotation wireframe rings are rendered |
| 35 | Visual | Starfield quality | PASS | Procedural 4096x2048 equirectangular starfield with Milky Way band, galactic clumps, 16000 dense stars + 5000 faint scatter. Adequate quality |
| 36 | Visual | Accretion disk visual quality | PASS | Doppler-boosted disk with temperature color gradient, smooth alpha edges, correct wrapped geometry |
| 37 | Visual | Photon ring brightness | PASS | Thin bright ring at shadow boundary with warm color (1.2, 1.0, 0.8). Bloom enhances it naturally |

### Verdict: FAIL
- Passed: 35/37
- Failed: #33, #34

### Failed checks detail:

1. **Check #33**: `uDiskTime` uniform is passed to the shader every frame (`lMat.uniforms.uDiskTime.value = diskTime`) and `diskTime` increments when playing (`diskTime += dt * speedMul`), but the fragment shader never references `uDiskTime` in any calculation. The `diskAz` used for Doppler velocity direction (`atan(posC.z, posC.x)`) does not incorporate time. Result: the Play/Pause button and Speed slider have **zero visual effect** on the accretion disk.
   **Rule violated**: Spec Features & Controls section: "Play/Pause button: for accretion disk rotation animation." The control exists but does nothing.
   **Suggested fix**: Add disk rotation by offsetting the azimuthal angle used for Doppler calculation:
   ```glsl
   float diskAz = atan(posC.z, posC.x) - uDiskTime * 0.3; // rotate disk pattern over time
   ```
   This rotates the Doppler brightness pattern around the shadow, simulating the observer's impression of disk material orbiting. The orbital velocity direction `vDir` should use this time-offset angle. Note: physically, a steady-state disk's emission is azimuthally symmetric, so the "rotation" is a cosmetic visualization of the orbital motion. The Doppler asymmetry relative to the camera stays fixed (correct), but adding a subtle texture/pattern rotation conveys the orbital motion to the viewer.

   **Alternative (simpler)**: If the intent is to show the disk is "alive" with orbiting material, add a noise pattern or spiral arm texture that rotates with `uDiskTime`, while keeping the Doppler physics static. This is the approach NASA SVS uses.

2. **Check #34**: The spec (Stage 2 & Features section) requires: "Show Annotations toggle: photon sphere wireframe ring at 1.5 r_s, ISCO wireframe ring at 3 r_s." and "Add optional annotation overlays." No `#cb-annotations` checkbox exists. No wireframe ring geometry is created for the photon sphere (1.5 r_s) or ISCO (3 r_s).
   **Rule violated**: Spec Stage 2: "Add optional annotation overlays: photon sphere wireframe ring at 1.5 r_s, ISCO wireframe ring at 3 r_s. Add info panel with readouts."
   **Suggested fix**: Add a checkbox `<input type="checkbox" id="cb-annotations"> Annotations` in the controls bar. When enabled, render two `THREE.Line` rings (using `RingGeometry` or manual circle vertices): one at radius 1.5 (photon sphere) and one at radius 3.0 (ISCO) in the scene, colored distinctly (e.g., photon sphere in gold `#ffaa00`, ISCO in cyan `#00ccff`). These are 3D objects in the scene, so they will appear correctly through the camera. Since the main rendering is a full-screen shader quad, the annotation rings need to be composited either by rendering them in the `mainScene` on top of the lensing result, or by passing their geometry to the shader as additional uniforms.

   The simplest approach: render the annotation rings as `THREE.Line` objects in `mainScene` (which already has the lensing result as a textured quad). They will be drawn on top of the lensing output and go through bloom. Add `depthTest: false` so they always render. Scale them by `uMassScale` to track the mass slider.

### Passed checks (do not break on retry):
#1-#32, #35-#37 -- all physics equations, readouts, DOM structure, house style CSS, bloom pipeline, controls wiring, embedded mode, Doppler boosting direction, disk plane crossing, temperature profile, gravitational redshift, shadow scaling, photon ring, and starfield quality.

### Notes

**Physics quality assessment**: The core gravitational lensing physics is excellent. The Binet equation is implemented correctly (not the wrong cubic form), the leapfrog integrator is symplectic, 300 steps provide good resolution near the photon sphere, and the accretion disk physics (Doppler beaming with delta^3, gravitational redshift, temperature profile, multiple plane crossings) are all correct. The visual result is stunning -- the star distortion, Einstein ring, photon ring, and Doppler-boosted disk all look physically correct and visually dramatic.

**Visual quality assessment**: The procedural starfield is adequate but not as impressive as a real Milky Way panorama texture (e.g., NASA SVS 4851). The accretion disk color gradient from hot white-blue at ISCO to cool red-orange at the outer edge is physically motivated and visually appealing. The bloom on the photon ring produces a natural glow. The Doppler brightness asymmetry is dramatic and correct. Overall visual quality is good -- it sits between the oseiskar reference (better visual polish) and the Bruneton demo (slightly below in star field quality).

**Missing features (non-blocking but noted)**:
- No Day mode toggle (not required for this app type -- there is no "day" context for a black hole)
- No Rotate toggle (camera orbits via OrbitControls drag, no auto-rotation -- appropriate for this app)
- The disk outer edge at 15 r_s (spec says "arbitrary cutoff, e.g. r_outer = 20 r_s") -- 15 is fine
- Camera min distance 6 r_s could allow the user to "fall in" closer to the shadow for dramatic views, but 6 is reasonable to avoid numerical artifacts
