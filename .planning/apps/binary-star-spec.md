# Binary Star Interactive — Build Spec

## Overview

A 3D interactive visualization of a binary star system orbiting its common center of mass. The user sees two color-coded stars (by temperature) tracing elliptical orbits in a Three.js scene, with linked 2D panels showing the radial velocity curves and light curve in real time. Sliders control mass ratio, eccentricity, inclination, and orbital period. When inclination approaches 90 degrees, eclipses produce visible dips in the light curve. This is a multi-panel physics simulation — the most complex COSMOS interactive to date, combining 3D orbital mechanics with two synchronized 2D diagnostic panels.

---

## Fact Sheet

### Key Numbers

| Property | Value | Source |
|----------|-------|--------|
| Kepler's third law (binaries) | P^2 / a^3 = 4 pi^2 / [G(M1+M2)] | Tatum, Celestial Mechanics Ch.18; NASA Imagine |
| Center-of-mass relation | M1 a1 = M2 a2; a = a1 + a2 | Standard two-body mechanics |
| RV semi-amplitude K1 | K1 = (2 pi a1 sin i) / (P sqrt(1 - e^2)) | Tatum Ch.18; Clubb RV derivation |
| RV semi-amplitude K2 | K2 = (2 pi a2 sin i) / (P sqrt(1 - e^2)) | Same, with a2 = M1 a / (M1+M2) |
| Mass function | f(M) = M2^3 sin^3(i) / (M1+M2)^2 = P K1^3 (1-e^2)^{3/2} / (2 pi G) | Wikipedia: Binary mass function |
| Roche lobe radius (Eggleton 1983) | r_L/a = 0.49 q^{2/3} / (0.6 q^{2/3} + ln(1 + q^{1/3})), q = M_donor/M_accretor | Eggleton 1983, ApJ 268, 368 |
| Algol (Beta Per) period | 2.867 days | Wikipedia: Algol |
| Algol masses | M1 = 3.17 M_sun (B8V), M2 = 0.70 M_sun (K0IV) | Wikipedia: Algol |
| Algol radii | R1 = 2.73 R_sun, R2 = 3.48 R_sun | Wikipedia: Algol |
| Algol inclination | 98.7 deg (nearly edge-on), e ~ 0 | Wikipedia: Algol |
| Algol eclipse depth | V = 2.12 to 3.4 (primary eclipse ~1.3 mag) | Wikipedia: Algol |
| Sirius orbital period | 50.1 years | Standard reference |
| Sirius masses | M_A = 2.06 M_sun, M_B = 1.02 M_sun | Standard reference |
| Fraction of stars in binaries | ~50% of solar-type, higher for massive stars | Duchene & Kraus 2013, ARA&A |

### Notes

- The "Algol paradox": the less massive star (K0IV) is the more evolved one. This is explained by mass transfer — the originally more massive star donated mass to its companion.
- Eclipsing binaries are the primary method for determining stellar masses and radii to high precision.
- For SB1 systems (single-lined spectroscopic binaries), only K1 is measurable, so only the mass function f(M) is determined — a lower limit on M2.
- For SB2 systems (double-lined), both K1 and K2 are measured, giving the mass ratio directly: q = M1/M2 = K2/K1.
- The COSMOS article currently has only text and one static image (center-of-mass diagram). The interactive will replace the static image.

### Binary Star Types

| Type | Observable | What it reveals |
|------|-----------|-----------------|
| Visual | Both stars resolved on sky | Orbital period, angular semi-major axis, with parallax: true masses |
| SB1 (spectroscopic, single-lined) | One set of spectral lines shifting | K1, P, e -> mass function f(M) |
| SB2 (spectroscopic, double-lined) | Two sets of shifting lines | K1, K2, P, e -> mass ratio + individual M sin^3(i) |
| Eclipsing | Periodic brightness dips | Inclination i ~ 90 deg, + RV data -> absolute masses and radii |
| Astrometric | Wobble on sky | Companion mass from wobble amplitude |

---

## State-of-the-Art Survey

### Reference 1: NAAP Eclipsing Binary Simulator (University of Nebraska)
- **URL**: https://astro.unl.edu/naap/ebs/animations/ebs.html
- **What it does well**: Four-panel layout (3D view, light curve, presets, settings). Adjustable mass, radius, temperature of both stars. Adjustable semi-major axis, eccentricity, inclination. Shows light curve in real time. Includes real data overlays from CALEB catalog. The gold standard for educational eclipsing binary simulators.
- **What it does poorly**: Flash-era design (now HTML5 port). No radial velocity curves. 3D view is simplistic. No center-of-mass visualization. Interface is dated.
- **Key technique**: Geometric eclipse model with uniform disks. Light curve computed from projected overlap area.
- **Applicable to our build?**: Yes — primary feature reference. We adopt the multi-panel layout but add RV curves, modernize the 3D view, and use Three.js.

### Reference 2: CCNMTL/Columbia Eclipsing Binary Simulator
- **URL**: https://ccnmtl.github.io/astro-simulations/eclipsing-binary-simulator/
- **Source**: https://github.com/ccnmtl/astro-simulations
- **What it does well**: Open-source JavaScript (React). Four panels: system view, light curve, orientation controls, star properties. Compares to real CALEB data. Clean modern interface. Toggle between Earth view and free view.
- **What it does poorly**: No radial velocity curves. 2D system view only (top view + side view), not true 3D. Limited eccentricity support.
- **Key technique**: React components, canvas-based rendering. Eclipse depth from geometric overlap.
- **Applicable to our build?**: Yes — reference implementation for the eclipse/light curve algorithm. Our version is 3D with Three.js and adds RV curves.

### Reference 3: NAAP Radial Velocity Simulator (exoplanet version)
- **URL**: https://astro.unl.edu/naap/esp/animations/radialVelocitySimulator.html
- **What it does well**: Shows star wobble in real time with a linked RV curve panel. Adjustable mass, eccentricity, semi-major axis, inclination. Shows how e > 0 distorts the sinusoidal RV curve.
- **What it does poorly**: Designed for exoplanets (star + planet), not two visible stars. No light curve. 2D only.
- **Key technique**: Kepler solver for eccentric orbits, RV curve plotted as v_r vs orbital phase.
- **Applicable to our build?**: Yes — the RV panel layout and Kepler solver approach directly applicable to our binary star version.

### Reference 4: Orbital Simulator (orbitalsimulator.com)
- **URL**: https://orbitalsimulator.com/
- **What it does well**: Three.js WebGL renderer. Preset scenarios include "Binary Orbit" and "Binary Star + Planet". Full 3D with orbit trails. Camera orbit controls.
- **What it does poorly**: N-body integrator, not Kepler solver (overkill for two-body). No RV or light curves. No educational annotations.
- **Key technique**: Three.js scene, Verlet integration for N-body.
- **Applicable to our build?**: Visual reference for 3D orbit rendering. We use analytic Kepler orbits (exact, no drift) instead of numerical integration.

### Reference 5: COSMOS GW Interactive (our own)
- **URL**: `experimental/gravitational-waves-interactive.html`
- **What it does well**: Two orbiting objects + 2D spectrogram panel + slider controls. Physics precomputed with post-Newtonian formulas. Established COSMOS visual style. Audio. Bloom.
- **What it does poorly**: Specialized for inspiral (decaying orbit, not periodic).
- **Key technique**: Two-body center-of-mass orbit, 2D panel (canvas) synced to 3D scene, slider controls.
- **Applicable to our build?**: **Primary template.** The binary star app has the same architecture: two objects orbiting + linked 2D panels + sliders. We adapt the orbit computation (Kepler instead of inspiral) and replace the spectrogram with RV + light curve panels.

### Reference 6: Procedural Star Rendering (bpodgursky.com)
- **URL**: https://bpodgursky.com/2017/02/01/procedural-star-rendering-with-three-js-and-webgl-shaders/
- **What it does well**: Three.js custom shaders for glowing stellar surfaces. Procedural corona effect with additive blending.
- **Applicable to our build?**: Visual technique for rendering the two stars as glowing spheres with temperature-dependent color.

---

## Physics / Algorithm

### 1. Coordinate System

Right-handed coordinate system. The **orbital plane is the XZ plane** (consistent with COSMOS convention — top-down view from +Y). The Y-axis points toward the observer when inclination i = 90 deg.

- **X-axis**: in the orbital plane, toward periapsis (argument of periapsis omega = 0 for simplicity; see Note below)
- **Z-axis**: in the orbital plane, perpendicular to X
- **Y-axis**: normal to the orbital plane (angular momentum direction)

Inclination i rotates the system about the X-axis (the line of nodes). When i = 0, the observer looks face-on down +Y. When i = 90 deg, the observer looks edge-on (in the XZ plane).

**Note on argument of periapsis**: For the initial implementation, set omega = 90 deg (periapsis oriented so that the RV curve shows a clean shape). This can be made adjustable in a later stage.

### 2. Two-Body Kepler Problem

Given total mass M_tot = M1 + M2 and semi-major axis a (of the relative orbit), Kepler's third law gives the period:

```
P^2 = 4 pi^2 a^3 / (G M_tot)
```

Each star orbits the center of mass at distance:

```
a1 = a * M2 / M_tot       (star 1's semi-major axis)
a2 = a * M1 / M_tot       (star 2's semi-major axis)
```

The stars are always on opposite sides of the center of mass along the line joining them.

### 3. Kepler Solver: Mean Anomaly -> Eccentric Anomaly -> True Anomaly

**Step 1 — Mean anomaly** (uniform in time):

```
M(t) = 2 pi * (t / P)  mod  2 pi
```

**Step 2 — Kepler's equation** (solve iteratively via Newton-Raphson):

```
M = E - e sin(E)

Newton-Raphson:
  E_0 = M
  repeat 10 times:
    E_{n+1} = E_n - (E_n - e sin(E_n) - M) / (1 - e cos(E_n))
```

This is already implemented in the style guide's `solveKepler()`.

**Step 3 — True anomaly** from eccentric anomaly:

```
tan(v/2) = sqrt((1+e)/(1-e)) * tan(E/2)
```

Or equivalently:

```
cos(v) = (cos(E) - e) / (1 - e cos(E))
sin(v) = sqrt(1 - e^2) * sin(E) / (1 - e cos(E))
v = atan2(sin(v), cos(v))
```

### 4. Star Positions in the Orbital Plane

The radial distance from the focus (center of mass projected onto the relative orbit) at true anomaly v:

```
r(v) = a (1 - e^2) / (1 + e cos(v))
```

Position of star 1 (relative to center of mass) in the orbital plane:

```
x1 = -a1 (1 - e^2) / (1 + e cos(v)) * cos(v)
z1 = -a1 (1 - e^2) / (1 + e cos(v)) * sin(v)
```

Position of star 2 (opposite side):

```
x2 = +a2 (1 - e^2) / (1 + e cos(v)) * cos(v)
z2 = +a2 (1 - e^2) / (1 + e cos(v)) * sin(v)
```

Note the sign convention: star 1 and star 2 are on opposite sides of the center of mass.

### 5. Applying Inclination

To project into the observer's frame, rotate about the X-axis by inclination angle i:

```
// Observer frame (x_obs, y_obs, z_obs):
// x_obs = x (unchanged, along line of nodes)
// y_obs = -z sin(i)   (component toward observer)
// z_obs = z cos(i)     (component in sky plane perpendicular to x)
```

For the 3D scene, place the camera along +Y and rotate the entire orbit group about X by (90 - i) degrees. But for **projected separation** (eclipse calculations) and **radial velocity**, we need the analytic formulas below.

### 6. Radial Velocity Curves

The radial velocity of each star (velocity component along the line of sight toward the observer) is:

```
v_r1(t) = V_sys + K1 [cos(omega + v(t)) + e cos(omega)]
v_r2(t) = V_sys - K2 [cos(omega + v(t)) + e cos(omega)]
```

where:

```
K1 = (2 pi a1 sin(i)) / (P sqrt(1 - e^2))
K2 = (2 pi a2 sin(i)) / (P sqrt(1 - e^2))
```

Source: Tatum, Celestial Mechanics, Chapter 18, Eq. 18.2.12; Clubb RV derivation (Caltech).

**V_sys** is the systemic velocity (center-of-mass radial velocity). For our visualization, set V_sys = 0.

**omega** is the argument of periapsis. For circular orbits (e = 0), omega is undefined and the RV curve is a pure sinusoid. For eccentric orbits, omega controls the asymmetry of the RV curve. Default: omega = 90 deg (periapsis along the line of sight, producing the classic asymmetric shape).

**Key properties to verify:**
- K1/K2 = M2/M1 (lighter star moves faster)
- For e = 0: RV is a pure sinusoid with amplitude K
- For e > 0: RV curve is asymmetric — the star spends more time near apoapsis (moving slowly) and less time near periapsis (moving fast)
- When i = 0: K1 = K2 = 0 (no radial velocity — motion is in the sky plane)

### 7. Eclipse Geometry and Light Curve

**Eclipse condition**: An eclipse occurs when the projected separation of the two star centers on the sky plane is less than R1 + R2.

The projected separation (on the plane perpendicular to the line of sight):

```
d_proj = sqrt(dx^2 + dz_proj^2)
```

where:

```
dx = x2 - x1                    (in the orbital plane, along the line of nodes)
dz_proj = (z2 - z1) * cos(i)    (projected component perpendicular to line of sight)
```

**Eclipse types:**
- Total eclipse: d_proj + R_small <= R_large (smaller star fully hidden behind larger)
- Annular eclipse: d_proj + R_large <= R_small (impossible if R_large > R_small by definition)
- Partial eclipse: |R1 - R2| < d_proj < R1 + R2 (partial overlap)
- No eclipse: d_proj >= R1 + R2

**Which star is in front?** The star with the larger y-component (toward the observer) is in front. Compute:

```
y1 = -z1 * sin(i)    (star 1's distance toward observer)
y2 = -z2 * sin(i)    (star 2's distance toward observer)
```

If y1 > y2, star 1 is in front (eclipsing star 2). If y2 > y1, star 2 is in front.

### 8. Overlap Area (Uniform Disk Model)

For two uniform circular disks of radii R1 and R2 separated by projected distance d:

**Case 1: No overlap (d >= R1 + R2)**

```
A_overlap = 0
```

**Case 2: Complete overlap (d + min(R1,R2) <= max(R1,R2))**

```
A_overlap = pi * min(R1, R2)^2
```

**Case 3: Partial overlap (|R1 - R2| < d < R1 + R2)**

```
A_overlap = R1^2 * arccos((d^2 + R1^2 - R2^2) / (2 d R1))
           + R2^2 * arccos((d^2 + R2^2 - R1^2) / (2 d R2))
           - 0.5 * sqrt((-d+R1+R2)(d+R1-R2)(d-R1+R2)(d+R1+R2))
```

Source: Wolfram MathWorld, Circle-Circle Intersection.

### 9. Light Curve Computation

Each star contributes flux proportional to its visible area times its surface brightness. For uniform disks:

```
F1 = B1 * pi * R1^2     (uneclipsed flux from star 1)
F2 = B2 * pi * R2^2     (uneclipsed flux from star 2)
```

where B1 and B2 are surface brightnesses (proportional to T^4 for blackbodies, or simply parameterized by a luminosity ratio).

During an eclipse:
- If star 2 is in front of star 1: the blocked flux is B1 * A_overlap
- If star 1 is in front of star 2: the blocked flux is B2 * A_overlap

```
F_total = F1 + F2 - B_eclipsed * A_overlap
```

Normalize to F_max = F1 + F2 = 1 for plotting.

**Primary eclipse**: the hotter/brighter star is eclipsed (deeper dip).
**Secondary eclipse**: the cooler/fainter star is eclipsed (shallower dip).

**Limb darkening**: For the initial implementation, skip limb darkening (uniform disks). This is a standard simplification for educational tools. Can be added later as an enhancement.

### 10. Stellar Radii and Surface Brightness

For the interactive, we do NOT compute realistic stellar structure. Instead, use simple parameterizations:

**Star radius** (visual, in scene units): scale to be visible relative to the orbit. Use a slider for the "fill factor" (R/R_Roche) or simply set R1 and R2 as fractions of the semi-major axis.

**Default**: R1 = 0.15 a, R2 = 0.10 a (visible but not overlapping). These are unrealistically large for most real binaries but necessary for the eclipse light curve to be demonstrable at moderate inclinations.

**Surface brightness ratio**: parameterize as a temperature ratio. For simplicity:

```
B1/B2 = (T1/T2)^4
```

Default: T1 = 10000 K (hot, blue-white), T2 = 5000 K (cool, yellow-orange). This gives B1/B2 = 16, so the primary eclipse (hot star eclipsed) is much deeper than the secondary.

**Star colors** (from temperature, approximate):

| T (K) | Color | Hex |
|--------|-------|-----|
| 3000 | Deep red-orange | #ff4400 |
| 5000 | Yellow-orange | #ffaa33 |
| 6000 | Yellow-white | #ffdd66 |
| 8000 | White | #eeeeff |
| 10000 | Blue-white | #aaccff |
| 20000 | Blue | #6688ff |
| 30000 | Deep blue | #4466ff |

### 11. Roche Lobe (Display Only)

Show the Roche lobe boundary as a dashed ellipse in the orbital plane to indicate when stars are close to filling their Roche lobes (mass transfer regime).

Eggleton (1983) approximation for the equivalent-volume Roche lobe radius:

```
r_L1 / a = 0.49 q^(2/3) / (0.6 q^(2/3) + ln(1 + q^(1/3)))
```

where q = M1/M2 (mass ratio of the star whose Roche lobe we compute, to its companion).

For star 2, use q_2 = M2/M1.

This is a visual indicator only — we do not simulate mass transfer.

---

## Implementation Stages

### Stage 1: Two Stars Orbiting Their Center of Mass in 3D

**Build:**
- Scene: black background (#000), two-layer star field (800 dim + 80 bright, bloom).
- Center of mass: small marker (dim cross or dot) at origin.
- Star 1: `SphereGeometry(R1, 32, 32)` with emissive MeshBasicMaterial, color from T1. Additive blending glow sprite behind it.
- Star 2: same, smaller, different color from T2.
- Orbit computation: Kepler solver (M -> E -> v -> position), analytic positions each frame.
- Orbit trails: `THREE.Line` showing the full elliptical orbit path for each star (computed once, updated when parameters change). Color-coded to match each star, opacity 0.4.
- Camera: position along +Y (top-down view of orbital plane). OrbitControls with damping.
- Animation: time steps forward each frame, stars move along their orbits.
- Sliders (minimal for Stage 1): mass ratio q = M2/M1 (0.1 to 1.0), eccentricity e (0 to 0.9).

**Pass criteria:**
- Two stars orbit the center of mass in visibly elliptical paths (for e > 0).
- Stars speed up at periapsis and slow down at apoapsis.
- Center of mass stays fixed at origin.
- Heavier star has a smaller orbit, lighter star has a larger orbit.
- For q = 1 (equal masses): both orbits are the same size.
- For e = 0: circular orbits at constant speed.
- No drift over many orbits (analytic solution guarantees this).

### Stage 2: Radial Velocity Curve Panel

**Build:**
- 2D canvas panel (top-right, matching GW spectrogram/pulsar pulse panel layout).
- Panel size: ~300x150 px. Title: "Radial Velocity".
- Plot v_r vs orbital phase (0 to 1) for both stars simultaneously.
- Star 1 curve: blue-white color (matching star 1). Star 2 curve: orange color (matching star 2).
- Horizontal axis: phase (0 to 1, labeled). Vertical axis: v_r (labeled in km/s or normalized).
- A vertical playhead line moves across the plot in sync with the 3D orbit animation.
- Zero-velocity horizontal dashed line.
- Display K1, K2 values in the readout panel.
- Add inclination slider (0 to 90 deg). When i = 0, RV curves flatten to zero. When i = 90, maximum amplitude.

**Pass criteria:**
- For e = 0: both RV curves are sinusoidal, 180 deg out of phase.
- For e > 0: curves are asymmetric — sharper peak at periapsis, flatter at apoapsis.
- K1/K2 = M2/M1 — the lighter star has the larger amplitude.
- Playhead position matches the stars' orbital phase in the 3D view.
- When i = 0, both curves are flat (zero amplitude).
- When i increases, amplitudes grow proportionally to sin(i).

### Stage 3: Eclipse Light Curve Panel

**Build:**
- Second 2D canvas panel, positioned below the RV panel (or stacked vertically in a column on the right side).
- Panel size: ~300x120 px. Title: "Light Curve".
- Plot normalized flux (0.0 to 1.0) vs orbital phase (0 to 1).
- Compute eclipse geometry at each phase step using the circle-overlap formula.
- Primary eclipse dip (hotter star eclipsed): deeper, centered at phase where star 1 is behind star 2.
- Secondary eclipse dip: shallower, at the opposite phase.
- Playhead synced to orbital phase.
- For i < i_crit (where eclipses do not occur), the light curve is flat — display a subtle label: "No eclipses at this inclination".

**Pass criteria:**
- At i = 90 deg: deep primary eclipse + shallow secondary eclipse, 0.5 phase apart (for circular orbits).
- Eclipse depth ratio matches the surface brightness ratio (primary eclipse is deeper because the hotter star is being blocked).
- For i < i_crit (arcsin((R1+R2)/a)), no eclipses — flat light curve.
- Eclipse duration is proportional to (R1+R2)/a and depends on eccentricity (eclipses near periapsis are shorter).
- Playhead tracks correctly.

### Stage 4: Full Controls + Inclination-Dependent 3D View

**Build:**
- Complete control bar (bottom, matching COSMOS style):
  - Play/Pause button
  - Mass ratio slider: q = M2/M1 (0.1 to 1.0, step 0.05)
  - Eccentricity slider: e (0 to 0.9, step 0.01)
  - Inclination slider: i (0 to 90 deg, step 1)
  - Period slider: P (optional, affects only animation speed — the physics is scale-free)
  - Speed selector: 0.5x, 1x, 3x, 10x
- Inclination changes tilt the 3D orbit plane relative to the camera. When i = 0 (face-on), the camera looks straight down onto the orbital plane. When i = 90 (edge-on), the camera sees the orbits from the side and eclipses are maximized.
- Implementation: rotate the orbit group (containing both stars, trails, and center-of-mass marker) about the X-axis by the inclination angle, OR move the camera. The camera approach is cleaner: keep orbits in the XZ plane, position camera at angle determined by i.
- When inclination changes, the 3D view, RV curves, and light curve all update simultaneously.
- Info panel (top-left) with readouts:
  - Mass ratio: q = M2/M1
  - Eccentricity: e
  - Inclination: i
  - K1, K2 (km/s, normalized)
  - Eclipse status: "Eclipsing" or "Non-eclipsing"

**Pass criteria:**
- All sliders update all three views (3D + RV + light curve) in real time.
- At i = 0: face-on view, RV curves flat, no eclipses.
- At i = 90: edge-on view, maximum RV amplitudes, eclipses visible.
- Smooth transitions when dragging sliders.
- No performance issues — target 30+ fps.

### Stage 5: Polish (Stars, Info Panel, Credits, Embed Mode)

**Build:**
- Star rendering: add bloom glow (UnrealBloomPass, subtle: strength 0.25, radius 0.5, threshold 0.6). Stars should look like glowing spheres, not flat circles.
- Star size: slightly exaggerated for visibility but with a "realistic size" toggle that scales them down.
- Roche lobe indicator: dashed ellipse outlines in the orbital plane showing each star's Roche lobe boundary (Eggleton formula). Only shown when toggled on.
- Orbit trails: option to show/hide.
- Preset configurations button or dropdown:
  - "Algol-like" (q=0.22, e=0, i=82 deg, large stars)
  - "Equal masses" (q=1.0, e=0, i=60 deg)
  - "Eccentric" (q=0.5, e=0.6, i=75 deg)
  - "Face-on" (q=0.7, e=0.3, i=10 deg)
- Info panel: title, description, readouts (fullscreen mode). Hidden title/desc in embed mode.
- Hint text: "Drag to rotate · Scroll to zoom · Adjust sliders below"
- Credit line: "COSMOS · Swinburne Astronomy Online"
- Embed mode detection (`window.self !== window.top`), compact layout.
- Responsive resize handler.
- Loading indicator (though this app has no textures to load — remove immediately or skip).

**Pass criteria:**
- Bloom makes stars glow convincingly.
- Presets produce recognizable configurations.
- Roche lobe outlines are correct relative to the orbit.
- Embed mode works in an iframe at 800x500.
- All controls visible on one line (or wrapping gracefully on mobile).
- No console errors.

---

## Reference Implementations (for Coder)

### 1. Kepler Solver (already in COSMOS style guide)

```javascript
function solveKepler(M, e) {
  let E = M;
  for (let i = 0; i < 10; i++)
    E -= (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
  return E;
}
```

### 2. True Anomaly from Eccentric Anomaly

```javascript
function trueAnomaly(E, e) {
  const sinV = Math.sqrt(1 - e * e) * Math.sin(E) / (1 - e * Math.cos(E));
  const cosV = (Math.cos(E) - e) / (1 - e * Math.cos(E));
  return Math.atan2(sinV, cosV);
}
```

### 3. Radial Velocity at True Anomaly v

```javascript
function radialVelocity(K, e, omega, v) {
  // v_r = K * [cos(omega + v) + e * cos(omega)]
  return K * (Math.cos(omega + v) + e * Math.cos(omega));
}
```

### 4. Circle-Circle Overlap Area

```javascript
function overlapArea(R1, R2, d) {
  if (d >= R1 + R2) return 0;                           // no overlap
  if (d + Math.min(R1, R2) <= Math.max(R1, R2))         // complete overlap
    return Math.PI * Math.min(R1, R2) ** 2;
  // partial overlap
  const part1 = R1 * R1 * Math.acos((d * d + R1 * R1 - R2 * R2) / (2 * d * R1));
  const part2 = R2 * R2 * Math.acos((d * d + R2 * R2 - R1 * R1) / (2 * d * R2));
  const part3 = 0.5 * Math.sqrt(
    (-d + R1 + R2) * (d + R1 - R2) * (d - R1 + R2) * (d + R1 + R2)
  );
  return part1 + part2 - part3;
}
```

### 5. Projected Separation for Eclipse Check

```javascript
function projectedSeparation(x1, z1, x2, z2, inclination) {
  const dx = x2 - x1;
  const dz = (z2 - z1) * Math.cos(inclination);
  return Math.sqrt(dx * dx + dz * dz);
}
```

### 6. Roche Lobe Radius (Eggleton 1983)

```javascript
function rocheLobeRadius(q, a) {
  // q = M_donor / M_companion
  const q23 = Math.pow(q, 2 / 3);
  const q13 = Math.pow(q, 1 / 3);
  return a * 0.49 * q23 / (0.6 * q23 + Math.log(1 + q13));
}
```

### 7. Star Color from Temperature

```javascript
function starColor(T) {
  // Approximate blackbody color (simplified)
  if (T < 3500) return 0xff3300;
  if (T < 5000) return 0xffaa33;
  if (T < 6000) return 0xffdd66;
  if (T < 7500) return 0xffeedd;
  if (T < 10000) return 0xccddff;
  if (T < 20000) return 0x88aaff;
  return 0x5577ff;
}
```

---

## Eye Candy & Verification Targets (for Verifier)

### Visual Quality Targets

1. **Stars should glow**: Use bloom post-processing. Each star should have a soft halo extending ~50% beyond its geometric radius. The hotter star should appear distinctly bluer/whiter than the cooler star.

2. **Orbit trails**: Smooth ellipses, color-matched to each star, semi-transparent. Should be clearly visible against the black background.

3. **2D panels**: Clean, dark background matching the info panel style. Curves should be smooth (compute at 200+ phase points). Axis labels legible. Playhead line clearly visible (bright white or Swinburne red).

4. **Overall composition**: The 3D orbit view dominates the left/center of the screen. The two 2D panels stack vertically on the right. Controls bar at bottom center. Info panel at top-left. This is the same layout as the GW interactive (3D center, spectrogram top-right, controls bottom).

### What "Correct" Looks Like

- **Circular orbit (e=0), equal masses (q=1)**: Both stars trace identical circles on opposite sides of the center of mass. Both RV curves are identical sinusoids (same amplitude, 180 deg phase offset). Primary and secondary eclipses are identical (same depth, same duration).

- **Circular orbit (e=0), unequal masses (q=0.3)**: Star 1 (heavier) has a small orbit, Star 2 (lighter) has a large orbit. K2 > K1. Primary eclipse (hot star behind cool star) is deeper than secondary eclipse.

- **Eccentric orbit (e=0.5), moderate q**: Stars speed up visibly near periapsis and slow down near apoapsis. RV curves are asymmetric — steep rise at periapsis, gentle return at apoapsis. Eclipse timing shifts from phase 0.5 symmetry.

- **Face-on (i=0)**: RV curves are flat lines at zero. No eclipses. The full face of both orbits is visible.

- **Edge-on (i=90)**: Maximum RV amplitudes. Eclipses occur (if R1+R2 > 0 relative to a). Stars appear to oscillate back and forth along a line.

### What "Wrong" Looks Like (Avoid These)

- Stars drifting away from center of mass over time (use analytic orbits, not numerical integration).
- RV curves that are in phase (they must be in anti-phase — when star 1 approaches, star 2 recedes).
- Primary eclipse at the same depth as secondary eclipse when surface brightnesses differ.
- Eclipses occurring at i = 0 (face-on — impossible).
- The lighter star having the smaller RV amplitude (it must be the opposite: lighter star moves faster).

### Physical Correctness Checks

1. **K1 * M1 = K2 * M2** (momentum conservation) — verify numerically for any parameter combination.
2. **Eclipse depth**: For equal-temperature stars, both eclipses should be the same depth. For T1 >> T2, the primary eclipse (hot star behind) should be much deeper.
3. **Eclipse duration at i = 90, e = 0**: duration/period ~ (R1+R2) / (pi * a). For R1=R2=0.15a: duration ~ 0.095 P (about 10% of the period).
4. **RV curve integral**: the area under the positive half of the RV curve should equal the area under the negative half (center of mass is stationary).
5. **Kepler's law**: verify that the orbital animation period matches P = 2pi sqrt(a^3 / (G M_tot)) for the displayed parameters.

---

## Textures/Assets Needed

**None.** This is a fully procedural visualization. Stars are rendered as emissive spheres with bloom. No texture files required.

---

## Complexity Estimate

**Complex (500-800 lines JS)**. Three synchronized views (3D scene + RV canvas + light curve canvas), Kepler orbit solver, eclipse geometry computation, multiple sliders updating all views simultaneously. Comparable to the pulsar interactive (~895 lines) but with more 2D rendering. The GW interactive is the closest precedent in terms of architecture.

---

## Closest Existing COSMOS App to Use as Template

**`experimental/gravitational-waves-interactive.html`** — because:
1. Same architecture: two objects orbiting center of mass + linked 2D panel + slider controls.
2. Same physics pattern: compute orbital positions from analytic formulas (not numerical integration).
3. Same layout: 3D view center, 2D panel top-right, info panel top-left, controls bar bottom.
4. Same slider pattern: mass sliders, speed control, play/pause, checkboxes.
5. Already has the center-of-mass orbit computation (positions bx1, by1, bx2, by2 computed from a, M1, M2).

**Key adaptations from GW template:**
- Replace inspiral (decaying orbit) with periodic Kepler orbit (constant a, e).
- Replace spectrogram panel with RV curve panel.
- Add second 2D panel for light curve.
- Add inclination slider (GW is always face-on).
- Replace black holes with colored stellar spheres.
- Remove gravitational wave mesh and audio chirp.

Also reference **`experimental/pulsar-interactive.html`** for the dual-panel layout pattern (3D + 2D pulse profile).

---

## Numerical Pitfalls

1. **Kepler solver convergence**: Newton-Raphson converges in ~5-8 iterations for e < 0.9. For e > 0.95, may need more iterations or a better starting guess (E_0 = M + e * sin(M)). Limit eccentricity slider to e <= 0.9 to avoid this.

2. **True anomaly at E = pi**: atan2 handles this correctly, but watch for sign errors if using acos.

3. **Eclipse computation at exact conjunction**: when d_proj ~ 0, the overlap area formula is well-defined (complete overlap case). No singularity.

4. **Phase wrapping**: ensure phase is always in [0, 2pi) using modulo arithmetic. The RV and light curve panels plot phase 0 to 1 (not 0 to 2pi).

5. **Inclination at exactly 0 or 90**: both are well-defined. At i = 0, sin(i) = 0 so K1 = K2 = 0. At i = 90, cos(i) = 0 so projected dz = 0 and eclipses are central.

6. **Argument of periapsis omega**: for e = 0, omega is undefined. When e = 0, the cos(omega + v) + e cos(omega) term simplifies to cos(omega + v), but omega is arbitrary. Set omega = 0 for circular orbits (or any constant — the RV curve is a pure sinusoid regardless). Only expose omega as a control for advanced users (Stage 5 or later).

---

## Notes for CEO

- **What went well**: The binary star physics is well-documented in standard textbooks (Tatum's Celestial Mechanics, Clubb's RV derivation, Wolfram MathWorld for geometry). All formulas are traceable to authoritative sources. The NAAP and CCNMTL simulators provide excellent feature benchmarks.

- **What was hard**: No existing Three.js/WebGL binary star simulator combines 3D orbits + RV curves + light curves in one view. This will be a unique product. The closest are the NAAP tools, which have separate simulators for eclipsing binaries and radial velocities — we unify them.

- **What's missing**: Limb darkening is omitted in the initial spec (uniform disk model). This is standard for educational tools but means eclipse light curves will have slightly sharper ingress/egress than real observations. Can be added later as a refinement (linear limb darkening is straightforward).

- **Pitfalls for coder**: (1) The sign convention for radial velocity (positive = receding) must be consistent between the formula and the plot. Astronomy convention: positive v_r means the star is moving away from the observer (redshift). (2) The argument of periapsis omega affects the shape of the RV curve significantly for eccentric orbits — this parameter must be handled carefully, not set to zero. Use omega = 90 deg as default. (3) The projected separation formula for eclipses requires care with the inclination rotation — test with i = 90 (edge-on) first, where dz_proj should be zero and eclipses are central.

- **Complexity assessment**: This is the most complex COSMOS interactive yet — three synchronized views, Kepler orbits, eclipse geometry. Estimate 2-3 build sessions for a coder. The GW interactive template reduces this significantly since the architecture (dual-object orbit + 2D panel + sliders) is already proven.

- **Unique value**: No existing online tool provides a unified 3D + RV + light curve view of binary stars. The NAAP tools are the benchmark but they separate these views into different simulators. Our app will be the first to combine all three in a single interactive visualization with modern WebGL rendering.
