# Rotation Curve Interactive — Build Spec

## Overview

A face-on spiral galaxy with orbiting test particles, linked to a real-time v(R) rotation curve plot. The user sees thousands of particle "stars" orbiting a procedural spiral galaxy at velocities computed from a three-component mass model (bulge + exponential disk + dark matter halo). A 2D panel on the right plots the rotation curve as it builds in real time. Sliders control the dark matter halo fraction and visible mass — removing dark matter makes the outer curve drop to Keplerian and outer particles visually fly apart. Toggle buttons overlay reference curves (Keplerian, solid-body, flat, observed). This is a direct, visceral demonstration of the dark matter problem: without the halo, the galaxy cannot hold itself together.

---

## Fact Sheet

### Key Numbers

| Property | Value | Source |
|----------|-------|--------|
| Milky Way circular velocity at R_sun | v_c = 220 km/s | IAU standard; Sofue 2009 |
| Solar galactocentric distance | R_sun = 8.2 kpc | Gravity Collaboration 2019 |
| Milky Way disk scale length | R_d = 2.6 kpc (range 2-3 kpc) | Bland-Hawthorn & Gerhard 2016 |
| Milky Way disk mass | M_disk ~ 5 x 10^10 M_sun | Sofue 2009, PASJ 61, 227 |
| Milky Way bulge mass | M_bulge ~ 1.8 x 10^10 M_sun | Sofue 2009 |
| Milky Way dark halo (NFW) scale radius | h ~ 12 kpc | Sofue 2012 |
| Milky Way dark halo central density | rho_0 ~ 0.01 M_sun/pc^3 | Sofue 2012; also ~0.3 GeV/cm^3 locally |
| NFW concentration (MW) | c ~ 10-15 | Navarro, Frenk & White 1996 |
| Rotation curve flat beyond | R > 5 kpc (approximately) | Sofue & Rubin 2001 |
| Keplerian decline | v(R) = sqrt(GM/R) ~ R^{-1/2} | Newton/Kepler |
| Solid body rotation | v(R) = omega * R ~ R | Rigid rotation |
| Pseudo-isothermal halo velocity | v_halo = v_inf * sqrt(1 - (R_c/R) * arctan(R/R_c)) | Begeman+ 1991 |

### Notes

- The rotation curve problem was first identified by Babcock (1939) and Rubin & Ford (1970), with Vera Rubin's systematic work in the 1970s-80s establishing it as one of the strongest pieces of evidence for dark matter.
- Flat rotation curves imply M(R) grows linearly with R at large radii, requiring rho(r) ~ r^{-2} — an isothermal sphere.
- The SPARC database (Lelli, McGaugh & Schombert 2016, AJ 152, 157) contains rotation curves for 175 disk galaxies and is the modern standard dataset.
- The Milky Way rotation curve shows a peak near R ~ 0.3-0.5 kpc (bulge), a mild dip, then flat behavior from ~5 kpc outward.
- Real rotation curves are measured via 21 cm HI emission (radio) and H-alpha emission (optical) for ionized gas.
- The NFW profile has a central cusp (rho ~ r^{-1}), while observed dwarf galaxies prefer a cored profile (pseudo-isothermal). For this visualization, the pseudo-isothermal halo is simpler and equally educational.

### Physics Context (for article writer)

The rotation curve of a spiral galaxy is the single most compelling piece of evidence for dark matter. If the mass of a galaxy were concentrated in the visible stars and gas, the orbital velocities of stars at large radii should decline as v ~ R^{-1/2} (Keplerian), just as planets in the Solar System orbit more slowly at greater distances. Instead, observed velocities remain approximately constant (flat) far beyond the visible disk. This implies a massive, invisible halo of dark matter surrounding every spiral galaxy, with mass growing linearly with radius. The discrepancy between the expected Keplerian curve and the observed flat curve is the "rotation curve problem," and it remains one of the central puzzles of modern astrophysics.

---

## State-of-the-Art Survey

### Reference 1: Wittman Rotation Curve Builder (UC Davis)
- **URL**: https://wittman.physics.ucdavis.edu/Animations/RotationCurve/index.html
- **What it does well**: Students adjust stellar disk mass-to-light ratio and dark matter halo amplitude via sliders and see the composite rotation curve update. Dark matter modeled as rho ~ 1/(a^2+r^2) (pseudo-isothermal). Shows data points for a real galaxy. Pedagogically clear.
- **What it does poorly**: 2D plot only — no 3D galaxy view. No particles orbiting. No visual demonstration of what happens when you remove dark matter. Static educational tool.
- **Key technique**: 2D canvas plotting, component decomposition with sliders.
- **Applicable to our build?**: Yes — the curve decomposition approach and slider UX. We add the critical missing element: a live 3D galaxy where you see the consequences of changing dark matter.

### Reference 2: Beltoforion Galaxy Renderer (TypeScript/WebGL)
- **URL**: https://beltoforion.de/en/spiral_galaxy_renderer/
- **Source**: https://github.com/beltoforion/Galaxy-Renderer-Typescript
- **What it does well**: Beautiful procedural spiral galaxy using density wave theory. Elliptical orbits with progressive angular tilt create realistic spiral arms. De Vaucouleurs bulge + Freeman exponential disk for star distribution. WebGL2 rendering. Open source TypeScript.
- **What it does poorly**: Focused on visual rendering, not physics simulation. No rotation curve plot. No dark matter. Stars don't orbit at physically computed velocities.
- **Key technique**: Density wave theory — elliptical orbits tilted by an angle that increases with radius. Eccentricity varies (circular in bulge, higher at mid-radii, decreasing outward). Stars are distributed along orbits using surface brightness profiles.
- **Applicable to our build?**: YES — primary reference for generating the spiral galaxy visual. We adopt the tilted-ellipse approach for spiral arm structure, but drive orbital velocities from our mass model instead of arbitrary rotation.

### Reference 3: Three.js Galaxy Generator (Bruno Simon / Three.js Journey)
- **URL**: https://threejs-journey.com/lessons/animated-galaxy
- **Demo**: https://threejsdemos.com/demos/particles/galaxy
- **What it does well**: Procedural particle galaxy in Three.js. Spiral arms via angular offset proportional to radius. Color gradient (hot center to cool outer). 50k particles, smooth animation. Clean, beautiful.
- **What it does poorly**: Stars spin at same angular velocity (solid body rotation). Not physically motivated. No rotation curve. Purely decorative.
- **Key technique**: Points geometry with vertex shader animation. Spiral arms via theta_offset = arm_index * 2pi/N_arms + radius * spin_factor.
- **Applicable to our build?**: Yes — for the visual style. We use the same Points-based particle system but drive velocities from physics, not a uniform spin.

### Reference 4: Andrew Campbell N-body Galaxy (WebGL)
- **URL**: https://andrewdcampbell.github.io/galaxy-sim-report
- **What it does well**: Full N-body WebGL simulation of galaxy formation. GPU-accelerated. Beautiful collision dynamics.
- **What it does poorly**: N-body is overkill for our educational purpose. Complex. No rotation curve decomposition.
- **Key technique**: WebGL compute for gravitational interactions. Barnes-Hut tree.
- **Applicable to our build?**: No — we use analytic orbits (much simpler, no drift, exact velocities). The visual output is a useful quality target.

### Reference 5: Villano-lab Galactic Spin (Python/Jupyter)
- **URL**: https://github.com/villano-lab/galactic-spin-W1
- **Docs**: https://galactic-spin-w1.readthedocs.io/
- **What it does well**: Uses real SPARC data for 175 galaxies. Sliders to scale each component (bulge, disk, gas, halo). Fits to observed data. Educational workshop with step-by-step guidance.
- **What it does poorly**: Python/Jupyter only — not a web interactive. No 3D visualization. Sliders don't work on mobile.
- **Key technique**: Component rotation curve fitting with scaling sliders. Uses SPARC database tables directly.
- **Applicable to our build?**: The pedagogical approach — scale components via sliders, see how the composite curve changes — is exactly what we want. We port this concept to 3D + web.

### What no existing tool does (our unique value)

No existing web interactive combines:
1. A live 3D face-on spiral galaxy with particles orbiting at physically computed velocities
2. A linked real-time rotation curve plot
3. A dark matter slider where removing DM visually destroys the outer galaxy

This combination — seeing the physics break down visually — is what makes this app educational and memorable.

---

## Physics / Algorithm

### Mass model: three-component decomposition

The total circular velocity at radius R is:

```
v_total(R) = sqrt( v_bulge(R)^2 + v_disk(R)^2 + v_halo(R)^2 )
```

Each component derives from a mass distribution via v(R) = sqrt(G * M(<R) / R) or the appropriate potential derivative.

### Component 1: Bulge (Hernquist profile)

The Hernquist (1990) profile is simpler than de Vaucouleurs and has an analytic rotation curve. Preferred for computational simplicity.

Density: `rho(r) = (M_b / 2pi) * (a_b / r) * 1/(r + a_b)^3`

Enclosed mass: `M(<r) = M_b * r^2 / (r + a_b)^2`

Circular velocity:
```
v_bulge(R) = sqrt( G * M_b * R / (R + a_b)^2 )
```

Parameters:
- M_b = 1.5 x 10^10 M_sun (bulge mass)
- a_b = 0.5 kpc (bulge scale radius)

The velocity rises linearly at small R (solid-body-like), peaks near R ~ a_b, then declines.

### Component 2: Exponential disk (Freeman 1970)

Surface density: `Sigma(R) = Sigma_0 * exp(-R / R_d)`

The circular velocity of a thin exponential disk involves modified Bessel functions (Freeman 1970, ApJ 160, 811):

```
v_disk(R)^2 = 4 * pi * G * Sigma_0 * R_d * y^2 * [I_0(y)*K_0(y) - I_1(y)*K_1(y)]
```

where `y = R / (2 * R_d)`, and I_n, K_n are modified Bessel functions of the first and second kind.

**Simplification for implementation:** The Bessel function expression can be precomputed into a lookup table or approximated. A practical approximation (Binney & Tremaine, eq. 2.165):

```javascript
function vDiskSquared(R, Md, Rd) {
  const y = R / (2 * Rd);
  if (y < 1e-6) return 0;
  // Freeman disk: v^2 = (G*Md)/(2*Rd) * y^2 * [I0*K0 - I1*K1] evaluated at y
  // Use rational approximation of the Bessel product (peaks at y ~ 1.08, i.e. R ~ 2.16 Rd)
  // Approximation: f(y) = 4.8 * y^2 * exp(-2*y) * (1 + 0.4/y) for y > 0.3, linear ramp below
  // OR precompute a table of 200 points.
  // Best: use the polynomial approximation from Abramowitz & Stegun for I0,K0,I1,K1
}
```

Parameters:
- M_d = 5 x 10^10 M_sun (disk mass, related to Sigma_0 via M_d = 2*pi*Sigma_0*R_d^2)
- R_d = 2.6 kpc (disk scale length)

The velocity peaks at R ~ 2.2 * R_d ~ 5.7 kpc and then slowly declines.

**Practical note:** For a JavaScript implementation, use the polynomial approximations of modified Bessel functions from Abramowitz & Stegun (Handbook of Mathematical Functions, Ch. 9), which are accurate to ~10^{-7}:

```javascript
// Modified Bessel I0(x), I1(x), K0(x), K1(x) — Abramowitz & Stegun polynomial fits
function besselI0(x) {
  if (x < 3.75) {
    const t = (x / 3.75) ** 2;
    return 1 + 3.5156229*t + 3.0899424*t**2 + 1.2067492*t**3
             + 0.2659732*t**4 + 0.0360768*t**5 + 0.0045813*t**6;
  }
  const t = 3.75 / x;
  return (Math.exp(x) / Math.sqrt(x)) * (0.39894228 + 0.01328592*t
    + 0.00225319*t**2 - 0.00157565*t**3 + 0.00916281*t**4
    - 0.02057706*t**5 + 0.02635537*t**6 - 0.01647633*t**7 + 0.00392377*t**8);
}
// (similarly for I1, K0, K1)
```

### Component 3: Dark matter halo (pseudo-isothermal sphere)

Chosen over NFW for simplicity and because it produces a truly flat curve at large R (pedagogically clearer). The cored profile also avoids the central cusp issue.

Density: `rho(r) = rho_0 / (1 + (r/R_c)^2)`

Enclosed mass: `M(<r) = 4*pi*rho_0*R_c^3 * (r/R_c - arctan(r/R_c))`

Circular velocity:
```
v_halo(R) = sqrt( 4*pi*G*rho_0*R_c^2 * (1 - (R_c/R)*arctan(R/R_c)) )
```

At large R: `v_halo -> v_inf = sqrt(4*pi*G*rho_0) * R_c` (flat, constant).

Parameters:
- rho_0 = 0.035 M_sun/pc^3 (central halo density, adjustable)
- R_c = 5 kpc (core radius)
- v_inf ~ 180 km/s (asymptotic flat velocity from halo alone)

### Reference curves (toggle overlays)

1. **Keplerian**: `v_kep(R) = sqrt(G * M_total_visible / R)` where M_total_visible = M_b + M_d (all visible mass at center). Shows R^{-1/2} decline.
2. **Solid body**: `v_solid(R) = v_c * (R / R_ref)` — linear, matching v_c at R_ref (e.g. 8 kpc). Shows what rigid rotation looks like.
3. **Flat (observed)**: `v_flat(R) = v_c = 220 km/s` — horizontal line at the Milky Way value.
4. **Composite (model)**: `v_total(R)` as computed from the three components above.

### Particle orbit dynamics

Particles orbit in the x-z plane (face-on, camera looking down y-axis). Each particle has a fixed galactocentric radius R_i (no radial migration — this is a test-particle model, not N-body).

Angular velocity: `omega_i = v_total(R_i) / R_i`

Position update each frame:
```javascript
theta_i += omega_i * dt;
x_i = R_i * cos(theta_i);
z_i = R_i * sin(theta_i);
```

When dark matter is reduced via slider, v_total(R) drops for large R. Particles at those radii now orbit slower. Visually, the outer galaxy "unwinds" and particles appear to fly apart (they orbit too slowly for the visual expectation of coherent spiral arms).

**Spiral arm structure:** Use the Beltoforion tilted-ellipse approach. Each particle's orbit is a slightly elliptical path with a tilt angle that depends on R:

```
tilt_angle(R) = arm_offset + arm_wind * ln(R / R_inner)
```

This logarithmic spiral winding creates the classic spiral arm pattern. With N_arms = 2 (or 4), particles cluster along the spiral density wave crests. The exact arm pattern is:

```javascript
// For arm j (j = 0..N_arms-1):
const armAngle = (2 * Math.PI * j / N_arms) + windFactor * Math.log(R / R_inner);
// Scatter theta around armAngle with Gaussian spread sigma_arm
theta_base = armAngle + gaussianRandom(0, sigma_arm);
```

### Numerical considerations

- **Units**: Work in kpc and km/s internally. G = 4.302 x 10^{-3} pc M_sun^{-1} (km/s)^2, or equivalently G = 4.302 x 10^{-3} * 10^3 kpc M_sun^{-1} (km/s)^2 = 4.302 x 10^{-3} (km/s)^2 pc / M_sun. Simplest: normalize so that v(R) is in km/s with R in kpc.
- **G in convenient units**: G = 4.302 x 10^{-3} pc (km/s)^2 / M_sun. Convert to kpc: G = 4.302 x 10^{-6} kpc (km/s)^2 / M_sun. But since masses are in units of 10^10 M_sun, use G' = 4.302 x 10^{-6} * 10^10 = 4.302 x 10^4 kpc (km/s)^2 / (10^10 M_sun). So for M in 10^10 M_sun and R in kpc: v^2 = G' * M / R, giving v in km/s.
- **Bessel functions**: Precompute v_disk^2(R) on a 200-point grid from R=0 to R=30 kpc, interpolate linearly. Recompute only when M_d or R_d changes.
- **Time step**: dt in Myr. A typical orbital period at R=8 kpc: T = 2*pi*R/v = 2*pi*8/220 ~ 0.228 Gyr ~ 228 Myr. For smooth animation at 60 fps, use dt ~ 1-5 Myr per frame (adjustable via speed slider).

### Test values (verify before building)

| R (kpc) | v_bulge (km/s) | v_disk (km/s) | v_halo (km/s) | v_total (km/s) |
|---------|----------------|----------------|----------------|-----------------|
| 0.5     | ~175           | ~60            | ~35            | ~189            |
| 2.0     | ~125           | ~165           | ~95            | ~228            |
| 5.0     | ~67            | ~190           | ~145           | ~252            |
| 8.0     | ~45            | ~170           | ~165           | ~242            |
| 15.0    | ~25            | ~120           | ~178           | ~218            |
| 25.0    | ~15            | ~65            | ~180           | ~194            |

These are approximate and should be tuned so that v_total is relatively flat (210-250 km/s) from R ~ 3 to 25 kpc. The exact numbers depend on the chosen parameter values. The coder should plot the three component curves during development to verify correct shape.

---

## Implementation Stages

### Stage 1: Face-on spiral galaxy particle system
**Build:** A Three.js scene with ~5000-8000 particles arranged in a face-on spiral galaxy pattern (camera looking down Y-axis). Two-arm logarithmic spiral with Gaussian scatter around arm ridges. Exponential radial distribution (more particles near center). Color gradient: warm white/yellow center, blue-white in arms, dim in outskirts. Particles orbit at angular velocity omega(R) = v_total(R) / R where v_total comes from the three-component model. Background stars (two-layer, per style guide).

**Key details:**
- Particle distribution: Use rejection sampling from exponential disk profile for radii. Additional bulge particles from Hernquist profile.
- Spiral arms: Logarithmic spiral with N_arms = 2. Each particle assigned to an arm with Gaussian angular scatter (sigma ~ 15-20 deg).
- Particle sizes: Larger near center (bulge), smaller in outskirts. sizeAttenuation: true.
- Colors: Use a color ramp from #ffeedd (center) through #aabbff (mid) to #6688cc (outer).
- Rotation: Counter-clockwise (prograde) from above. Inner particles orbit faster (differential rotation visible).
- Use THREE.Points with BufferGeometry. Update position arrays each frame.

**Pass criteria:** Galaxy is visible, spiral arms discernible, differential rotation evident (inner regions complete orbits faster than outer). No console errors. Smooth 60fps with 5000+ particles.

### Stage 2: Linked v(R) rotation curve plot
**Build:** A 2D canvas panel on the right side (same pattern as GW spectrogram / binary star RV panel) showing v(R) vs R. The curve builds in real time: as particles orbit, their positions contribute data points to the plot. Also draw the three component curves (bulge, disk, halo) as colored dashed lines, and the total as a solid white line.

**Key details:**
- Canvas: 300 x 250 px, positioned top-right (same as GW spectrogram).
- X-axis: R from 0 to 25 kpc.
- Y-axis: v from 0 to 350 km/s.
- Axis labels: "R (kpc)" and "v (km/s)".
- Component curves: bulge (orange dashed), disk (cyan dashed), halo (magenta dashed), total (white solid, thicker).
- "Observed" data: When the rotation curve is at default (100% dark matter), scatter ~15 "data points" with error bars along the total curve to simulate real observations. These provide the visual anchor that the model should match.
- Grid: Subtle gridlines at 50 km/s intervals and 5 kpc intervals.
- Panel title: "Rotation Curve".

**Pass criteria:** All four curves visible and correctly shaped: bulge peaks early and declines, disk peaks around 6 kpc and declines gently, halo rises and flattens, total is approximately flat. Curve updates when parameters change.

### Stage 3: Dark matter slider
**Build:** A slider labeled "Dark Matter" (0% to 100%, default 100%) in the controls bar. Reducing dark matter to 0% removes the halo contribution entirely. The rotation curve immediately updates: v_total drops to Keplerian at large R. Simultaneously, particles at large R slow down — they orbit at the new (lower) angular velocity. The outer galaxy visibly "unwraps" as particles can no longer maintain circular orbits at the old speed.

**Key details:**
- Slider multiplies v_halo^2 by the slider fraction f_DM (0 to 1).
- `v_total(R) = sqrt(v_b^2 + v_d^2 + f_DM * v_h^2)`
- When f_DM decreases, recompute all omega_i. Particles at large R immediately slow down.
- At f_DM = 0: outer curve drops as sqrt(G*(M_b+M_d)/R), i.e. Keplerian beyond the disk.
- Visual effect: spiral arms in the outer galaxy stretch, unwind, and disperse.
- The "observed" data points stay fixed — they represent measurements. The model curve moves away from the data when DM is reduced, visually showing the discrepancy.
- Add a readout: "Dark Matter: XX%".

**Pass criteria:** At 100% DM, curve is flat and matches "data." At 0% DM, outer curve drops steeply (Keplerian). Outer particles orbit visibly slower. The transition is smooth as slider moves. The visual "destruction" of outer spiral arms is dramatic and clear.

### Stage 4: Toggle reference curves
**Build:** Checkbox toggles in the controls bar for overlay curves on the v(R) plot:
- "Keplerian" — dashed red line showing v ~ R^{-1/2} (all visible mass at center)
- "Solid body" — dashed green line showing v ~ R
- "Flat" — horizontal dashed yellow line at v = 220 km/s

These help the student compare the observed/model curve to the three canonical behaviors.

**Key details:**
- Each toggle adds/removes the corresponding overlay line on the 2D panel.
- The Keplerian curve uses M_visible = M_b + M_d as the total central mass.
- The solid body line extends from origin with slope = v_c / R_ref.
- Default: all three OFF (to keep plot clean). Student enables as desired.
- Update the reference curves when M_visible changes (if we add a visible mass slider).

**Pass criteria:** Each toggle correctly shows/hides its reference curve. The curves have correct shapes and are visually distinct from the model curves (different colors, dashed).

### Stage 5: Additional controls + polish
**Build:**
- "Visible Mass" slider (50% to 200%, default 100%): scales both M_b and M_d. Shows how increasing/decreasing baryonic mass affects the inner rotation curve but not the flat outer part.
- Play/Pause button.
- Speed selector (0.5x, 1x, 3x, 10x).
- Labels toggle: show/hide "Bulge," "Disk," "Halo" labels on the galaxy itself (concentric zones).
- Info panel: title, description, readouts (v at cursor radius, dark matter fraction, visible mass scale).
- Embed mode: compact readout only.
- Polish: bloom on center (subtle), particle glow, smooth control transitions.

**Pass criteria:** All controls functional. Embed mode works. Performance maintained at 60fps. Info panel shows correct live values.

---

## Features & Controls

### 3D Scene (left/center)
- Face-on spiral galaxy (5000-8000 particles)
- Differential rotation driven by mass model
- Spiral arm structure via logarithmic spiral + Gaussian scatter
- Color gradient: warm center, cool outskirts
- Subtle bloom on central bulge region
- Background stars (two-layer)

### 2D Panel (top-right)
- v(R) rotation curve plot
- Component curves: bulge (orange), disk (cyan), halo (magenta), total (white)
- Simulated "observed data" points with error bars
- Toggle overlay curves: Keplerian, solid body, flat
- Axis labels and gridlines

### Controls (bottom bar)
- **Play/Pause** button
- **Speed** selector (0.5x, 1x, 3x, 10x)
- **Dark Matter** slider (0-100%, default 100%)
- **Visible Mass** slider (50-200%, default 100%)
- **Keplerian** checkbox
- **Solid Body** checkbox
- **Flat (220)** checkbox
- **Labels** checkbox

### Info Panel (top-left)
- Title: "Galaxy Rotation Curves"
- Description: "Why don't outer stars fly away? Dark matter holds galaxies together."
- Readouts:
  - Dark Matter: XX%
  - Visible Mass: XXx
  - v(8 kpc): XXX km/s [at Sun's radius]
  - v(20 kpc): XXX km/s

---

## Verification Requirements

### Physics checks (for verifier)

1. **Rotation curve shape**: At default (100% DM), total curve should be approximately flat (210-250 km/s) from R ~ 3-25 kpc. NOT rising, NOT declining steeply.
2. **Bulge peak**: v_bulge should peak near R ~ 0.5-1 kpc then decline. This is the innermost component.
3. **Disk peak**: v_disk should peak near R ~ 5-7 kpc then decline gently.
4. **Halo rise**: v_halo should rise from zero, flattening by R ~ 10 kpc to a constant ~180 km/s.
5. **Component sum**: v_total must be computed as sqrt(v_b^2 + v_d^2 + v_h^2), NOT as v_b + v_d + v_h.
6. **Keplerian at 0% DM**: With dark matter at 0%, the rotation curve beyond the disk (R > 10 kpc) should decline as R^{-1/2}.
7. **Prograde rotation**: All particles orbit counter-clockwise when viewed from above (positive y-axis).
8. **Differential rotation**: Inner particles complete orbits faster than outer particles. At R=2 kpc (v~230 km/s), period ~ 53 Myr. At R=15 kpc (v~220 km/s), period ~ 428 Myr. Ratio ~ 8:1.
9. **Spiral arms trail**: In a counter-clockwise rotating galaxy, spiral arms should trail (curve opposite to rotation direction). This is achieved by the logarithmic spiral winding in the correct direction.
10. **Solar circle**: v ~ 220 km/s at R ~ 8 kpc.

### Visual checks (for verifier)

1. Galaxy is clearly spiral with 2 discernible arms.
2. Differential rotation is visible — inner stars lap outer stars.
3. At 0% dark matter, outer galaxy visibly "falls apart" — spiral structure degrades.
4. The 2D panel curves have correct shapes and are labeled.
5. Toggling reference curves on/off works and they are distinguishable.
6. Background stars present, bloom subtle (not overwhelming).
7. Performance: 60fps with 5000+ particles.

---

## Eye Candy & Visual Targets

### Reference images

1. **Beltoforion Galaxy Renderer**: https://beltoforion.de/en/spiral_galaxy_renderer/ — Our face-on galaxy should look roughly this good: clear spiral arms, color gradient, bright center. This is our primary visual target.
2. **Three.js Galaxy Generator**: https://threejsdemos.com/demos/particles/galaxy — Clean particle-based spiral with nice color ramp. Our particle style should be similar.
3. **Real face-on spirals**: NGC 628 (M74), NGC 5457 (M101) — reference for arm structure, color gradient, arm-to-interarm contrast.

### What WRONG looks like
- **Uniform rotation (solid body)**: All particles orbit at the same angular velocity. Arms don't differentially wind. Looks like a spinning disk, not a galaxy.
- **Random scatter with no arms**: If spiral arm structure is missing, it looks like an elliptical galaxy, not a spiral.
- **Leading arms**: Arms curve in the direction of rotation. Real spiral arms TRAIL (curve opposite to rotation).
- **Rising rotation curve**: If v_total increases indefinitely with R, the physics is wrong.

---

## Textures/Assets Needed

**None.** This is a fully procedural visualization. All geometry is generated from particles and canvas drawing. No textures, no external assets.

Optional enhancement: A soft circular gradient sprite for each particle (a small 32x32 radial gradient PNG). But THREE.Points with `sizeAttenuation: true` and additive blending may suffice without a texture.

---

## Complexity Estimate

**Complex (500-800 lines JS)**. Three-component mass model with Bessel functions, procedural spiral galaxy particle system, linked 2D canvas panel, multiple sliders affecting physics in real time. Comparable to binary-star-interactive (946 lines). The physics is more involved (Bessel functions, three mass models) but the 3D geometry is simpler (particles only, no meshes).

---

## Closest Existing COSMOS App to Use as Template

**`experimental/binary-star-interactive.html`** — because:
1. Same architecture: 3D scene (center/left) + 2D canvas panel (right) + sliders in controls bar
2. Physics-driven particle/object positions updated each frame from analytic model
3. Sliders that change physics parameters and immediately update both 3D scene and 2D plot
4. Already uses the multi-panel layout pattern proven in GW and pulsar apps
5. Stacked 2D panels on the right (RV + light curve) — we use one panel for the rotation curve

Alternative template: `experimental/gravitational-waves-interactive.html` — for the spectrogram panel positioning and the slider-driven physics architecture. Either works; binary-star is slightly closer because it has the same "orbiting objects + diagnostic panel" pattern.

---

## Reference Implementations (for coder)

### Rotation curve computation
- **Sofue 2009** (PASJ 61, 227): "Unified Rotation Curve of the Galaxy" — the authoritative Milky Way decomposition paper. Table 6 has best-fit parameters. https://arxiv.org/abs/0811.0859
- **Sofue 2016 review** (NED Level 5): Explicit formulas for v_bulge, v_disk (Freeman/Bessel), v_halo (NFW and isothermal). https://ned.ipac.caltech.edu/level5/Sept16/Sofue/Sofue4.html

### Bessel function approximations
- **Abramowitz & Stegun, Ch. 9**: Polynomial approximations for I_0, I_1, K_0, K_1. Standard reference. The polynomial coefficients are widely available (e.g. Numerical Recipes, or the A&S online edition).

### Spiral galaxy particle generation
- **Beltoforion Galaxy Renderer** (TypeScript): https://github.com/beltoforion/Galaxy-Renderer-Typescript — density wave spiral arm structure, tilted-ellipse approach, star distribution from surface brightness profiles.
- **Three.js Journey galaxy tutorial**: Logarithmic spiral with angular offset proportional to radius. Color ramp via vertex colors. Points geometry.

### Pseudo-isothermal halo
- **Begeman, Broeils & Sanders 1991** (MNRAS 249, 523): Standard reference for pseudo-isothermal halo fits to rotation curves. The formula v^2 = 4*pi*G*rho_0*R_c^2*(1 - (R_c/R)*arctan(R/R_c)) is from this paper.

### Pseudocode: core physics function

```javascript
// Constants (convenient units: M in 10^10 Msun, R in kpc, v in km/s)
const G_UNIT = 43007.1;  // G in units where [G] = kpc (km/s)^2 / (10^10 Msun)
// Verify: v^2 = G_UNIT * 5 / 8 => v = sqrt(26879) ~ 164 km/s  (disk alone at 8 kpc, rough check)

// Bulge: Hernquist profile
function vBulge(R, Mb, ab) {
  return Math.sqrt(G_UNIT * Mb * R / (R + ab) ** 2);
}

// Disk: Freeman exponential disk with Bessel functions
function vDisk(R, Md, Rd) {
  const y = R / (2 * Rd);
  if (y < 1e-8) return 0;
  const Sigma0 = Md / (2 * Math.PI * Rd * Rd);  // central surface density
  const factor = 4 * Math.PI * G_UNIT * Sigma0 * Rd;
  // Note: G_UNIT here needs consistent units with Sigma0 in 10^10 Msun / kpc^2
  // Better: express directly as v^2 = (G*Md)/(2*Rd) * (2y)^2 * [I0*K0 - I1*K1]
  //       = (G*Md*R^2) / (2*Rd^3) * [I0(y)*K0(y) - I1(y)*K1(y)]
  const bess = besselI0(y)*besselK0(y) - besselI1(y)*besselK1(y);
  const v2 = 0.5 * G_UNIT * Md / Rd * (2*y*y) * bess;
  return Math.sqrt(Math.max(v2, 0));
}

// Halo: Pseudo-isothermal sphere
function vHalo(R, rho0, Rc) {
  // v^2 = 4*pi*G*rho0*Rc^2 * (1 - (Rc/R)*atan(R/Rc))
  // rho0 in 10^10 Msun / kpc^3
  const v2 = 4 * Math.PI * G_UNIT * rho0 * Rc*Rc * (1 - (Rc/R)*Math.atan(R/Rc));
  return Math.sqrt(Math.max(v2, 0));
}

// Total
function vTotal(R, params, fDM) {
  const vb = vBulge(R, params.Mb, params.ab);
  const vd = vDisk(R, params.Md, params.Rd);
  const vh = vHalo(R, params.rho0, params.Rc);
  return Math.sqrt(vb*vb + vd*vd + fDM * vh*vh);
}
```

**CRITICAL: The coder must verify that vTotal(8.2) ~ 220 km/s at default parameters before proceeding to Stage 2.** Plot the three components and total in the browser console or on the 2D canvas during development. If the curve is not flat in the 5-25 kpc range, the parameters need tuning.

---

## Notes for CEO

- **What went well**: The physics is well-established and extensively documented. Sofue's reviews and the SPARC database provide authoritative parameter values. Multiple existing 2D tools validate the pedagogical approach (component decomposition with sliders).
- **What was hard**: No existing web tool combines a 3D galaxy with a linked rotation curve. We are building something genuinely new. The Bessel function computation for the disk component is the most technically tricky part — needs careful implementation and unit testing.
- **What's missing**: No open-source WebGL rotation curve simulator exists to use as a direct code reference. The coder will need to port the physics from textbook formulas. The Beltoforion galaxy renderer is the closest visual reference but doesn't do rotation curve physics.
- **Pitfalls for coder**:
  1. **Unit consistency is critical.** G in different unit systems gives wildly different numbers. The coder must verify v(8 kpc) ~ 220 km/s before building anything else.
  2. **Bessel functions**: JavaScript has no built-in modified Bessel functions. Must implement from Abramowitz & Stegun polynomial approximations (or use a simple lookup table). Get this wrong and the disk curve will be wrong.
  3. **v_total is quadrature sum**, not linear sum. `sqrt(vb^2 + vd^2 + vh^2)`, NOT `vb + vd + vh`.
  4. **Spiral arms must trail**, not lead. The winding direction of the logarithmic spiral must be opposite to the rotation direction.
  5. **Performance**: 5000-8000 particles updated each frame. Use BufferGeometry with position array updates, not individual mesh objects.
