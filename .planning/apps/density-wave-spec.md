# Density Wave Model Interactive — Build Spec

## Overview

A top-down spiral galaxy with thousands of particle-stars orbiting at Keplerian (differential) velocities, passing through a slow-moving spiral density wave pattern. Stars entering the spiral arms experience compression and trigger "star formation" — glowing blue-white before fading back to their baseline colour as they exit. The user controls: pattern speed (Omega_p), number of arms (m = 1-4), pitch angle, and dark matter halo fraction. A toggle overlay shows the "traffic jam" analogy — highlighting the density wave crests as translucent lanes so students see that the pattern rotates slower than the stars. A linked 2D panel shows Omega(r) vs Omega_p, marking the corotation radius and Lindblad resonances. This is a direct, visceral demonstration of the Lin-Shu density wave theory: spiral arms are not material structures but standing compression waves through which stars flow.

---

## Fact Sheet

### Key Numbers

| Property | Value | Source |
|----------|-------|--------|
| Lin-Shu density wave theory | 1964, C.C. Lin & Frank Shu | Lin & Shu 1964, ApJ 140, 646 |
| Milky Way pattern speed Omega_p | 23-28 km/s/kpc (consensus ~25) | Dias+ 2019 (Gaia DR2); Mishurov+ 2023 |
| Milky Way corotation radius R_c | 8.5 +/- 0.6 kpc (~R_sun) | Dias+ 2019, MNRAS 486, 5726 |
| Milky Way circular velocity v_c | 220 km/s at R_sun = 8.2 kpc | IAU standard; Gravity Collab. 2019 |
| Milky Way spiral arm count | 4 major (m=4), or 2 dominant (m=2) | Vallee 2017; debated |
| Milky Way pitch angle | 13.1 +/- 0.6 deg | Vallee 2015, multiple methods |
| Typical pitch angle range (spirals) | 5-30 deg (Sa tight, Sc open) | Kennicutt 1981; Yu+ 2019 |
| Epicyclic frequency kappa(R_sun) | ~37 km/s/kpc | Derived: kappa = sqrt(2) * v_c/R for flat curve |
| Inner Lindblad Resonance (ILR) | Omega(R) = Omega_p + kappa/m | Standard definition |
| Outer Lindblad Resonance (OLR) | Omega(R) = Omega_p - kappa/m | Standard definition |
| OB star lifetime | ~3-10 Myr | Massey 2003 |
| Orbital period at R_sun | ~230 Myr | T = 2*pi*R/v |
| Orbital period at R = 3 kpc | ~80 Myr | v ~ 235 km/s |

### Notes

- The density wave theory resolves the **winding problem**: if spiral arms were material, differential rotation would wind them up within a few galactic rotations. Instead, arms are long-lived compression wave patterns.
- Inside corotation (R < R_c): stars orbit faster than the pattern, entering arms from behind and exiting ahead. Outside corotation (R > R_c): stars orbit slower and the pattern overtakes them.
- At corotation, stars and the wave co-move. Star formation enhancement may be reduced here because the gas spends a long time in the arm but the compression shock is weaker.
- The density wave only exists between the Inner and Outer Lindblad Resonances (ILR, OLR). Beyond these radii, the wave cannot be sustained.
- Hot, massive OB stars (M > 8 M_sun) form in the compressed gas and live only 3-10 Myr — too short to leave the arm. They mark the spiral pattern in blue/UV light. Older, redder stars are distributed throughout the disk.
- The "traffic jam" analogy is the canonical pedagogical tool: cars (stars) flow through a slow-moving jam (density wave); the jam persists even though individual cars pass through it.
- Milky Way arm count is debated: some models favour m=2 with inter-arm branches, others m=4. For the visualisation, m=2 is visually clearest and pedagogically standard.

### Physics Context (for article writer)

The density wave model, proposed by C.C. Lin and Frank Shu in 1964, explains why spiral galaxies retain their spiral arm structure despite differential rotation. If the arms were material structures — made of the same stars — they would wind up and dissolve within a few hundred million years. Instead, the arms are density waves: regions of enhanced gravitational potential that rotate as a rigid pattern at a fixed angular speed (the pattern speed, Omega_p), slower than the stars themselves. Stars and gas clouds pass through these waves, are temporarily compressed, and move on. The compression triggers star formation: massive, luminous O and B stars light up the arms in blue before dying, while older red stars fill the inter-arm regions. The analogy is a traffic jam on a highway — the jam moves slowly while individual cars pass through it. This elegant theory connects galactic dynamics to star formation and explains the characteristic blue-armed, red-interarm colour gradient seen in spiral galaxies.

---

## State-of-the-Art Survey

### Reference 1: Beltoforion Galaxy Renderer (TypeScript/WebGL)
- **URL**: https://beltoforion.de/en/spiral_galaxy_renderer/
- **Source**: GitHub (https://github.com/beltoforion/Galaxy-Renderer-Typescript)
- **What it does well**: Beautiful procedural spiral galaxy using tilted elliptical orbits. Stars orbit on ellipses whose orientation angle increases linearly with radius (`tiltAngle = radius * angleOffset`), creating the spiral pattern. Eccentricity varies: circular in bulge, peaks at mid-radii, returns to circular at outer edge. H-II regions sized proportionally to inter-arm distance (visible only in arms). De Vaucouleurs bulge + exponential disk brightness profiles. Star colour from blackbody temperature. WebGL2 rendering. Open source.
- **What it does poorly**: Stars all rotate at the same angular velocity (no differential Keplerian rotation). The spiral pattern is baked into the orbit orientations, not a separate density wave — so the "traffic jam" concept is not demonstrated. No pattern speed vs material speed comparison. No star formation triggering. No controls for pattern speed or pitch angle. Purely visual, not educational.
- **Key technique**: Tilted-ellipse density wave model. `star.tiltAngle = radius * 0.019`. Eccentricity piecewise-linear (1.0 at centre, 0.8 at bulge boundary, 1.0 at disk edge). Stars distributed via CDF of exponential disk + Sersic bulge.
- **Our advantage**: We add true differential rotation (material speed != pattern speed), visible star formation triggering, interactive pattern speed control, and the traffic jam overlay. Our galaxy is physically correct, not just visually pretty.

### Reference 2: Rougier Galaxy Simulator (Python/VisPy)
- **URL**: https://github.com/rougier/galaxy
- **Source**: GitHub (port of Beltoforion's C++ version to Python/VisPy)
- **What it does well**: Clean Python implementation of the same tilted-ellipse approach. H-II region pairs whose size is proportional to inter-pair distance (visibility trick). GPU-accelerated rendering via VisPy/OpenGL. 30,000 stars. Open source.
- **What it does poorly**: All particles rotate at the same angular velocity (uniform, not differential). No density wave physics — the "spiral" is entirely from orbit tilt. No pattern speed control. Python-only (not web).
- **Key technique**: `stars['angle'] = 90 - R * angular_offset` (angular_offset = 0.019 rad/pc). Eccentricity = inner 0.8, outer 1.0. Constant angular velocity for all stars.
- **Our advantage**: Web-based, interactive, physically correct differential rotation, pattern speed control, star formation.

### Reference 3: Wikipedia Density Wave Theory Animations
- **URL**: https://en.wikipedia.org/wiki/Density_wave_theory
- **Source**: Wikipedia
- **What it does well**: Three excellent animations that students see first: (1) rigid rotation showing winding problem, (2) differential rotation showing arm dissolution, (3) density wave solution showing stable arms with stars flowing through. These are the canonical visual explanation. The traffic jam analogy is clearly explained in text.
- **What it does poorly**: Animations are pre-rendered GIFs — not interactive. Cannot adjust pattern speed, arm count, or pitch angle. No star formation. Low resolution. No 3D.
- **Key technique**: Pre-rendered frame animation.
- **Our advantage**: Fully interactive (adjust Omega_p, m, pitch angle). 3D with orbit controls. Star formation glow. Real-time. Linked analytical panel showing Omega(r) vs Omega_p.

### Reference 4: daneroo/im-spiral-galaxy (JavaScript/Canvas)
- **URL**: https://github.com/daneroo/im-spiral-galaxy (demo: http://daniel-lauzon.com/im-spiral-galaxy/)
- **Source**: GitHub
- **What it does well**: JavaScript port of Beltoforion's algorithm. Runs in browser via Canvas. Open source. Simple implementation.
- **What it does poorly**: Canvas 2D only (no WebGL/Three.js). Same uniform rotation issue as Beltoforion. No interactive controls beyond basic animation. Low visual quality — no bloom, no glow, no star formation.
- **Key technique**: Same tilted-ellipse approach as Beltoforion, rendered on 2D canvas.
- **Our advantage**: Three.js with bloom, particle shaders, 3D camera, star formation glow, interactive controls, linked physics panel.

### Reference 5: Simeon Radivoev Density Wave Galaxy Map (Unity)
- **URL**: https://simeonradivoev.itch.io/density-wave-galaxy-map
- **Source**: itch.io (Unity WebGL build)
- **What it does well**: 3D galaxy with animated density wave rendering. Can be rotated. Inspired by Mass Effect galaxy map — visually atmospheric. Uses density wave theory for spiral generation.
- **What it does poorly**: Game-oriented (star map for sci-fi). No educational overlays. No physics readouts. No pattern speed controls. Source code corrupted. Unity build (heavy, slow loading).
- **Key technique**: Unity particle system with density wave modulation.
- **Our advantage**: Lightweight single HTML file. Educational focus with physics readouts. Interactive pattern speed / arm controls. Star formation demonstration.

### Reference 6: Existing COSMOS rotation-curve-interactive.html
- **URL**: `experimental/rotation-curve-interactive.html`
- **Source**: This project
- **What it does well**: 8000-particle face-on spiral galaxy with physically correct differential rotation from a three-component mass model (bulge + disk + dark matter halo). Linked rotation curve panel. Dark matter slider. Bloom, circular particles, colour gradient. Already demonstrates that inner stars orbit faster than outer stars. Proven architecture.
- **What it does poorly**: Spiral arms are baked into initial particle positions via logarithmic winding — they wind up over time because there is no density wave pattern holding them. No separate pattern speed. No star formation. No traffic jam overlay. The spiral dissolves as the simulation runs (the winding problem in action).
- **Key technique**: `theta = armAngle + windFactor * ln(R/R_inner) + gaussianScatter`. Keplerian omega(R) = v_total(R) / R. Three-component mass model.
- **Our advantage**: The density wave model IS the fix for exactly what the rotation curve app demonstrates (winding). We maintain the spiral via a separate pattern speed. Star formation adds the key colour gradient. The traffic jam overlay makes the concept tangible.

### What no existing tool does (our unique value)

No existing web interactive combines:
1. True differential rotation (stars orbit at Keplerian speeds)
2. A separate, slower-rotating density wave pattern that maintains spiral structure
3. Visible star formation triggered when stars enter the arms (blue-white glow)
4. Interactive controls for pattern speed, number of arms, and pitch angle
5. A linked Omega(r) vs Omega_p panel marking corotation and Lindblad resonances
6. A "traffic jam" analogy overlay

This combination lets the student viscerally understand that arms are waves, not material — something no static diagram or pre-rendered animation achieves.

---

## Physics / Algorithm

### Core concept: two angular velocities

The key insight is that there are **two** angular velocities:
1. **Material rotation Omega(r)**: the angular velocity of stars at radius r, determined by the galaxy's mass distribution (same as rotation-curve app).
2. **Pattern speed Omega_p**: the angular velocity of the spiral density wave pattern itself, constant at all radii.

Stars orbit at Omega(r) which varies with r (differential rotation). The spiral pattern rotates rigidly at Omega_p. Stars flow through the pattern.

### Angular velocity from mass model

Reuse the three-component mass model from rotation-curve-interactive.html:

```
v_total(R) = sqrt( v_bulge(R)^2 + v_disk(R)^2 + f_DM * v_halo(R)^2 )
Omega(R) = v_total(R) / R    [rad/Myr after unit conversion]
```

Same Hernquist bulge, Freeman exponential disk (with Bessel functions), pseudo-isothermal halo. Same parameters. Same Bessel function implementations from Abramowitz & Stegun.

Unit conversion: `omega_rad_per_Myr = (v_km_s / R_kpc) * 1.0227e-3`

### Spiral density wave pattern

The density wave pattern at time t is a logarithmic spiral:

```
phi_arm(R, t) = (m * Omega_p * t) + (m / tan(i)) * ln(R / R_ref)
```

where:
- m = number of arms (default 2)
- Omega_p = pattern speed (default 25 km/s/kpc, converted to rad/Myr)
- i = pitch angle (default 15 deg)
- R_ref = reference radius (arbitrary, e.g. 1 kpc)

For arm j (j = 0..m-1), the arm ridge is at angle:

```
phi_j(R, t) = (2*pi*j / m) + Omega_p_rad * t + (1 / tan(i)) * ln(R / R_ref)
```

### Star-arm proximity (density wave potential)

Each star at position (R_i, theta_i) has an angular distance from the nearest arm ridge. The density wave perturbation amplitude is:

```
delta_theta = theta_i - phi_nearest_arm(R_i, t)   (mod 2*pi/m, centred on 0)
arm_proximity = cos(m * delta_theta / 2)^2         (smooth, peaks at arm ridge)
```

Alternatively, use a Gaussian proximity:

```
arm_proximity = exp(-(delta_theta^2) / (2 * sigma_arm^2))
```

where `sigma_arm` ~ 0.2-0.3 radians controls arm width.

### Star formation trigger

When a star's `arm_proximity` exceeds a threshold (e.g. > 0.7), it is "in the arm" and its colour shifts toward blue-white with enhanced brightness:

```javascript
if (arm_proximity > threshold) {
  // Lerp toward blue-white (OB star formation)
  const sf_strength = (arm_proximity - threshold) / (1 - threshold);
  color = lerp(baseline_color, OB_blue, sf_strength);
  brightness = 1.0 + sf_strength * 0.5;  // brighter to trigger bloom
} else {
  color = baseline_color;  // old red/yellow stellar population
  brightness = 1.0;
}
```

Baseline colours: bulge = warm yellow (#ffcc66 to #ffaa44), disk = pale yellow-white (#ffeedd), fading to dimmer at large R.

Star formation colours: blue-white (#aaddff) for strong compression, with brightness boost to trigger bloom. The bloom makes arm stars glow, naturally creating the blue-arm visual.

### Corotation radius and Lindblad resonances

```
Corotation:  Omega(R_c) = Omega_p
ILR:         Omega(R_ILR) = Omega_p + kappa(R_ILR) / m
OLR:         Omega(R_OLR) = Omega_p - kappa(R_OLR) / m
```

Epicyclic frequency for a flat rotation curve:
```
kappa(R) = sqrt(2) * v_c / R    (exact for v(R) = const)
```

More generally:
```
kappa(R)^2 = (2 * Omega / R) * d(R^2 * Omega)/dR
           = 4 * Omega^2 + R * dOmega^2/dR
```

For computation, numerically differentiate v_total(R) to get kappa(R), then solve for the resonance radii.

### Particle orbit dynamics

Each star has a fixed galactocentric radius R_i (circular orbit approximation). Each frame:

```javascript
// Material rotation (differential)
theta_i += omega_i * dt;      // omega_i = v_total(R_i) / R_i, converted to rad/Myr

// Position
x_i = R_i * cos(theta_i) * KPC_TO_VIS;
z_i = R_i * sin(theta_i) * KPC_TO_VIS;

// Density wave pattern angle at this radius at current time
phi_arm = Omega_p_rad * simTime + (1/tan(pitch)) * ln(R_i / R_ref);

// Angular distance to nearest arm
delta = (theta_i - phi_arm) mod (2*pi/m);  // fold into one arm period
if (delta > pi/m) delta -= 2*pi/m;         // centre on zero
arm_proximity = exp(-delta*delta / (2 * sigma_arm^2));

// Update colour based on arm proximity
```

### Traffic jam overlay

When toggled, render the density wave pattern as translucent spiral lanes:

```javascript
// Draw m translucent logarithmic spiral curves (thick, low opacity)
for (let j = 0; j < m; j++) {
  const points = [];
  for (let R = R_inner; R <= R_outer; R += 0.1) {
    const phi = (2*PI*j/m) + Omega_p_rad * simTime + (1/tan(pitch)) * Math.log(R / R_ref);
    points.push(new THREE.Vector3(R * Math.cos(phi) * KPC, 0.01, R * Math.sin(phi) * KPC));
  }
  // Render as wide translucent line or ribbon mesh
}
```

Use a flat ribbon mesh (two triangles per segment) with translucent material, or multiple offset THREE.Line with additive blending, to create a visible "lane" that stars flow through.

### Numerical considerations

- **Units**: Same as rotation-curve app. G' = 4.302e4 kpc (km/s)^2 / (10^10 M_sun). M in 10^10 M_sun, R in kpc, v in km/s.
- **Pattern speed conversion**: Omega_p = 25 km/s/kpc. Convert to rad/Myr: `Omega_p_rad = 25 * 1.0227e-3 = 0.02557 rad/Myr`.
- **Time step**: Same as rotation curve. dt in Myr, adjustable via speed slider.
- **Pitch angle**: tan(15 deg) = 0.2679. `1/tan(15 deg) = 3.732`. This controls the tightness of the logarithmic spiral.
- **Performance**: 8000-12000 particles. Colour and size updates each frame (vertex colour array + size attribute). The arm_proximity calculation is O(N) per frame — fast.

### Test values (verify before building)

| R (kpc) | Omega(R) (km/s/kpc) | Omega_p (km/s/kpc) | Relation | Period (Myr) |
|---------|---------------------|---------------------|----------|--------------|
| 2.0     | ~115                | 25                  | Inside corotation, star overtakes arm | ~54 |
| 5.0     | ~50                 | 25                  | Inside corotation | ~125 |
| 8.2     | ~27                 | 25                  | Near corotation | ~234 |
| 12.0    | ~18                 | 25                  | Outside corotation, arm overtakes star | ~345 |
| 20.0    | ~10                 | 25                  | Well outside corotation | ~615 |

For m=2, pitch=15 deg: the corotation radius should be near R ~ 8-9 kpc (where Omega(R) = Omega_p). Stars inside corotation enter arms from behind; stars outside corotation are overtaken by the arms. This reversal should be visible in the animation.

**Lindblad resonances** (approximate, flat curve, m=2):
- kappa(R) ~ sqrt(2) * 220/R km/s/kpc
- ILR: Omega(R) = Omega_p + kappa/(m=2). At R_ILR ~ 3-4 kpc.
- OLR: Omega(R) = Omega_p - kappa/(m=2). At R_OLR ~ 15-20 kpc.

The spiral pattern should only be rendered between ILR and OLR. Inside ILR or outside OLR, the density wave fades out.

---

## Implementation Stages

### Stage 1: Differential rotation galaxy with density wave colouring

**Build:** Start from the rotation-curve-interactive.html galaxy particle system (8000 particles, three-component mass model, differential rotation). Replace the static spiral arm assignment with dynamic density wave colouring: compute arm_proximity for each star each frame based on the logarithmic spiral pattern rotating at Omega_p. Colour stars near the arm ridge blue-white (star formation); colour inter-arm stars warm yellow/red. The spiral pattern should remain stable over time because it rotates rigidly at Omega_p while the stars flow through it.

**Key details:**
- Copy the mass model (Hernquist bulge + Freeman disk + isothermal halo + Bessel functions) from rotation-curve-interactive.html.
- Particle initial distribution: exponential disk radial profile (same as rotation curve). Theta: uniform random (no arm pre-assignment needed — the density wave colouring creates the arms dynamically).
- Each frame: compute `phi_arm(R_i, t)` for each particle, compute `arm_proximity`, update vertex colour array.
- Default: m=2, Omega_p = 25 km/s/kpc, pitch = 15 deg.
- Background stars (two-layer), bloom, circular particles (makeCircleMat with per-vertex colour + size).
- Camera: top-down (y=13, z=0.01), OrbitControls.
- KPC_TO_VIS = 0.5 (same as rotation curve).

**Pass criteria:** Galaxy visible with clear two-arm spiral structure maintained over time. Arms are blue-white, inter-arm regions are warm yellow/red. Differential rotation visible (inner stars lap outer). Spiral does NOT wind up — pattern remains stable. 60fps with 8000+ particles. No console errors.

### Stage 2: Interactive controls — pattern speed, arms, pitch angle

**Build:** Controls bar with:
- **Pattern Speed** slider: Omega_p from 10 to 50 km/s/kpc (default 25). Moving this changes where corotation falls and how fast the pattern rotates.
- **Arms (m)** selector: 1, 2, 3, 4 (default 2). Changes number of spiral arms instantly.
- **Pitch Angle** slider: 5 to 35 deg (default 15). Controls how tightly wound the arms are.
- Play/Pause button, Speed selector (0.01x to 1.0x, default 0.05x — same as rotation curve).
- Spacebar toggles play/pause.

**Key details:**
- Changing Omega_p instantly changes the pattern rotation rate. The corotation radius moves.
- Changing m instantly restructures the arm pattern (more arms = more frequent density peaks per orbit).
- Changing pitch angle changes the tightness: small angles = tight (Sa), large angles = open (Sc).
- All changes are immediate — no particle regeneration needed. Only the density wave formula changes.

**Pass criteria:** All three sliders work. Pattern speed change visibly moves the spiral pattern faster/slower. Arm count change immediately restructures the pattern. Pitch angle change tightens/loosens arms. Play/Pause and Speed work. Spacebar works.

### Stage 3: Traffic jam overlay

**Build:** A toggle button "Traffic Jam" that overlays the density wave pattern as translucent spiral lanes. When ON, render m logarithmic spiral ribbons (thin translucent mesh or multiple additive-blended lines) rotating at Omega_p. The ribbons make the density wave visible as a separate entity from the stars — students see stars flowing through the ribbons.

**Key details:**
- Render each arm as a ribbon: generate points along the logarithmic spiral, create a flat mesh (or thick line via multiple offset THREE.Lines with additive blending).
- Ribbon colour: semi-transparent cyan or white, low opacity (0.15-0.25).
- Ribbon width: proportional to sigma_arm (the Gaussian width of the density wave).
- Ribbons rotate at Omega_p * dt each frame (rigid pattern rotation).
- Label the ribbons: "DENSITY WAVE" (CSS2DObject or sprite text).
- Add arrows or velocity indicators showing Omega(r) vs Omega_p at a few radii (optional enhancement).

**Pass criteria:** Toggle works. Translucent spiral lanes visible, rotating slower than inner stars but faster than outer stars. Students can see stars overtaking the lane (inside corotation) and the lane overtaking stars (outside corotation). Lanes do not interfere with particle rendering (depth/blend correct).

### Stage 4: Omega(r) vs Omega_p panel + resonances

**Build:** A 2D canvas panel (top-right, same pattern as rotation curve plot) showing:
- Omega(R) curve (material angular velocity, white solid line)
- Horizontal line at Omega_p (cyan dashed)
- Omega(R) - kappa(R)/m curve (for OLR, magenta dashed)
- Omega(R) + kappa(R)/m curve (for ILR, orange dashed)
- Vertical markers at corotation radius (where Omega = Omega_p) and Lindblad resonances (where Omega +/- kappa/m = Omega_p)

**Key details:**
- X-axis: R from 0 to 25 kpc. Y-axis: Omega from 0 to 150 km/s/kpc.
- Omega(R) = v_total(R)/R — same mass model.
- kappa(R): compute numerically as `kappa^2 = (2*Omega/R) * d(R^2*Omega)/dR`. Use finite differences.
- When pattern speed slider changes, the Omega_p horizontal line moves, and the resonance markers shift.
- Panel title: "Angular Velocities".
- Canvas: 380x220 fullscreen, 240x140 embedded (same sizing pattern).

**Pass criteria:** Omega(R) curve is correct: high at small R, declining roughly as 1/R at large R. Omega_p line is horizontal at correct value. Corotation marked where curves cross. ILR and OLR marked correctly. Resonance markers move when Omega_p slider changes. Panel updates in real time.

### Stage 5: Info panel, readouts, DM slider, and polish

**Build:**
- Info panel (top-left): title "Density Wave Model", description, live readouts.
- Readouts: Omega_p value, corotation radius, number of arms, pitch angle.
- DM slider (0-100%, default 100%): same as rotation curve. Reducing DM changes v_total(R), therefore Omega(R), therefore where corotation falls. The spiral pattern stays the same (Omega_p doesn't change) but the star velocities change.
- B/T slider or Visible Mass slider (optional, lower priority).
- Labels toggle: show/hide "COROTATION", "ILR", "OLR" zone labels on the galaxy.
- Zone rings: translucent circles at corotation, ILR, OLR radii.
- Embed mode: compact readout only.
- Polish: bloom on arm stars (threshold ~0.3), background stars, credit line.
- Ensure the density wave fades out gracefully outside ILR-OLR range (reduce arm_proximity amplitude).

**Pass criteria:** All readouts correct and updating. DM slider changes Omega(R), corotation shifts. Zone labels and rings at correct radii. Embed mode works. 60fps maintained. Bloom makes arm stars glow without overwhelming. Credit visible.

---

## Features & Controls

### 3D Scene (centre/left)
- Face-on spiral galaxy (8000-12000 particles)
- Differential rotation driven by three-component mass model
- Dynamic density wave colouring: blue-white in arms, warm yellow/red between arms
- Optional traffic jam overlay (translucent spiral lanes)
- Optional zone rings (corotation, ILR, OLR)
- Background stars (two-layer)
- Bloom on arm stars

### 2D Panel (top-right)
- Omega(R) curve (material angular velocity)
- Omega_p horizontal line (pattern speed)
- Omega +/- kappa/m curves (Lindblad resonance curves)
- Corotation, ILR, OLR vertical markers
- Updates when controls change

### Controls (bottom bar)
- **Play/Pause** button (Spacebar toggle)
- **Speed** selector (0.01x, 0.05x, 0.1x, 0.2x, 0.5x, 1.0x)
- **Pattern Speed** slider (10-50 km/s/kpc, default 25)
- **Arms** selector (1, 2, 3, 4; default 2)
- **Pitch** slider (5-35 deg, default 15)
- **DM** slider (0-100%, default 100%)
- **Traffic Jam** toggle button
- **Labels** checkbox

### Info Panel (top-left)
- Title: "Density Wave Model"
- Description: "Spiral arms are density waves — stars flow through them like traffic through a jam."
- Readouts:
  - Omega_p: XX km/s/kpc
  - R_corotation: XX kpc
  - Arms: X, Pitch: XX deg
  - v(8 kpc): XXX km/s

---

## Verification Requirements

### Physics checks (for verifier)

1. **Stable spiral pattern**: Arms must NOT wind up over time. Run at 0.5x speed for several galactic rotations — the m-arm pattern should persist, rotating at Omega_p.
2. **Differential rotation**: Inner stars (R ~ 2 kpc) must orbit faster than the pattern. Outer stars (R > 10 kpc) must orbit slower than the pattern. Both should be visually obvious.
3. **Corotation radius**: At default Omega_p = 25 km/s/kpc, corotation should be near R ~ 8-9 kpc. Stars at that radius should co-move with the arms.
4. **Star formation direction**: Inside corotation, blue star formation should appear on the **leading edge** of the arm (stars catch up to the arm from behind and compress on entry). Outside corotation, blue stars should appear on the **trailing edge** (the arm overtakes the stars).
5. **Omega_p slider**: Increasing Omega_p should move corotation inward (arms need to match faster inner rotation). Decreasing should move it outward.
6. **Arm count**: Changing m=2 to m=4 should produce 4 thinner, more closely spaced arms. m=1 should produce one dominant arm.
7. **Pitch angle**: Decreasing pitch toward 5 deg should produce tightly wound arms (Sa morphology). Increasing toward 30 deg should produce open, loose arms (Sc morphology).
8. **Traffic jam overlay**: The translucent lanes must rotate at Omega_p, NOT at the material velocity. Stars inside corotation must visibly overtake the lanes.
9. **Panel correctness**: Omega(R) curve should be high at small R, declining at large R. Corotation marker must be where Omega(R) = Omega_p. ILR and OLR markers at correct positions.
10. **Prograde rotation**: All stars orbit counter-clockwise from above.

### Visual checks (for verifier)

1. Blue-white arm stars clearly distinguishable from warm inter-arm stars.
2. Spiral structure is visually obvious and stable over many rotations.
3. Traffic jam overlay lanes are translucent and do not obscure stars.
4. Bloom on arm stars creates natural glow without overblowing.
5. Circular particles (no squares). makeCircleMat with per-vertex colour.
6. Background stars present.
7. Performance: 60fps with 8000+ particles.
8. Panel is readable in both fullscreen and embedded modes.
9. Controls bar fits on one line.

---

## Eye Candy & Visual Targets

### What CORRECT looks like
1. **Beltoforion galaxy**: https://beltoforion.de/en/spiral_galaxy_renderer/ — Our galaxy should look at least this good visually: clear arms, warm centre, blue disk. But our arms are dynamically maintained by the density wave, not baked in.
2. **Real face-on spirals**: M51 (Whirlpool), M74 (NGC 628), M101 — reference for blue arms with red inter-arm regions. The colour contrast between arms and inter-arm is the key feature to nail.
3. **Wikipedia density wave animation**: https://en.wikipedia.org/wiki/Density_wave_theory — The third animation (density wave solution) is the canonical educational reference. Our app should produce the same qualitative behaviour, but interactively and in 3D with star formation.

### What WRONG looks like
- **Winding spiral**: If the arms wind up over time, the density wave is not implemented — the spiral is material, not a wave. This is the #1 failure mode.
- **Uniform rotation (solid body)**: All stars at same angular velocity. No differential rotation visible. Arms rotate with stars, not independently.
- **Leading arms**: Arms curve in the direction of rotation. Milky Way arms TRAIL. Check that `1/tan(pitch)` has the correct sign in the logarithmic spiral formula.
- **No colour contrast**: If all stars are the same colour, the star formation trigger is missing. The arms should be blue, the inter-arm warm.
- **Pattern too fast or too slow**: If Omega_p is close to Omega(R) everywhere, there's no flow-through effect. The default must show clear differential behaviour.

---

## Textures/Assets Needed

**None.** Fully procedural visualization. All geometry from particles and canvas drawing. No external textures required.

---

## Complexity Estimate

**Complex (600-900 lines JS)**. Reuses the three-component mass model (with Bessel functions) from rotation-curve-interactive.html. Adds: density wave pattern computation, arm proximity colouring, traffic jam overlay geometry, Omega(R) panel with resonance curves, multiple interactive controls. The per-frame colour update (O(N) per particle) is the main new computation. Comparable to rotation-curve-interactive but with more controls and a second physics layer (pattern speed + resonances).

---

## Closest Existing COSMOS App to Use as Template

**`experimental/rotation-curve-interactive.html`** — because:
1. Same galaxy particle system architecture (8000 particles, BufferGeometry, per-vertex colours, custom ShaderMaterial with size attribute).
2. Same three-component mass model (Hernquist bulge + Freeman disk + isothermal halo + Bessel functions) — copy directly.
3. Same differential rotation (Omega(R) = v_total(R) / R) — already implemented.
4. Same 2D canvas panel pattern (top-right, same sizing).
5. Same controls bar layout (bottom centre, sliders + buttons).
6. The density wave model is the natural "next chapter" after the rotation curve — the rotation curve app shows differential rotation and dark matter; this app shows how spiral structure survives despite that differential rotation.

The coder should start by copying rotation-curve-interactive.html and modifying:
- Remove: static spiral arm assignment in particle generation (the `armAngle + windFactor * ln(R)` approach).
- Remove: rotation curve panel (replace with Omega(R) panel).
- Remove: rotation curve-specific controls (reference curve toggles).
- Add: density wave pattern computation each frame.
- Add: per-frame vertex colour update based on arm proximity.
- Add: pattern speed, arm count, pitch angle controls.
- Add: traffic jam overlay toggle.
- Add: Omega(R) panel with resonance markers.

---

## Reference Implementations (for coder)

### Density wave pattern
- **Beltoforion Galaxy-Renderer-Typescript**: https://github.com/beltoforion/Galaxy-Renderer-Typescript — `Galaxy.ts`: `getAngularOffset(rad)` returns `rad * this._angleOffset`. Our approach differs (we use a separate pattern speed, not baked tilt), but the eccentricity function and star distribution are useful references.
- **Rougier galaxy.py**: https://github.com/rougier/galaxy — Python implementation of same. `stars['angle'] = 90 - R * angular_offset`. Simpler code, easier to read.

### Logarithmic spiral formula
- **Binney & Tremaine, Galactic Dynamics, 2nd ed., Section 6.1**: The standard logarithmic spiral: `R = R_0 * exp((theta - theta_0) * tan(i))`, or equivalently `theta(R) = theta_0 + (1/tan(i)) * ln(R/R_0)`. Pitch angle i is measured from the tangent to the circle.

### Epicyclic frequency
- **Binney & Tremaine, Section 3.2.3**: `kappa^2 = R * d(Omega^2)/dR + 4*Omega^2`. For flat rotation curve (v = const): `kappa = sqrt(2) * Omega`. For solid-body (Omega = const): `kappa = 2*Omega`.

### Lindblad resonances
- **Wikipedia: Density wave theory**: `Omega = Omega_p +/- kappa/m`. The pattern exists only between ILR and OLR.

### Star formation in spiral arms
- **Dobbs & Baba 2014, PASA 31, e035** (Dawes Review 4: Spiral Structures in Disc Galaxies): Comprehensive review. Section 3.3 covers star formation in spiral arms. Available at: http://ned.ipac.caltech.edu/level5/March15/Dobbs/Dobbs2.html

### Existing COSMOS mass model code
- **`experimental/rotation-curve-interactive.html`**: Lines 194-301. Complete implementation of Bessel functions (I0, I1, K0, K1), vBulge, vDisk, vHalo, vTotal, rho0 tuning. Copy directly.

### Pseudocode: core density wave computation (per frame)

```javascript
// Constants
const Omega_p_kms_kpc = 25;  // pattern speed in km/s/kpc
const Omega_p_rad_Myr = Omega_p_kms_kpc * 1.0227e-3;  // ~0.0256 rad/Myr
const m = 2;          // number of arms
const pitch_rad = 15 * Math.PI / 180;  // pitch angle
const cotPitch = 1 / Math.tan(pitch_rad);  // ~3.73
const R_ref = 1.0;    // reference radius (kpc)
const sigma_arm = 0.25;  // arm width in radians

// Each frame, for each particle i:
for (let i = 0; i < N; i++) {
  const p = particles[i];

  // Update position (material rotation)
  p.theta += p.omega_myr * dt;

  // Density wave pattern angle at this radius
  const phi_pattern = Omega_p_rad_Myr * simTime + cotPitch * Math.log(p.R / R_ref);

  // Angular distance to nearest arm ridge
  let delta = ((p.theta - phi_pattern) % (TWO_PI / m) + TWO_PI / m) % (TWO_PI / m);
  if (delta > Math.PI / m) delta -= TWO_PI / m;

  // Arm proximity (Gaussian)
  const proximity = Math.exp(-delta * delta / (2 * sigma_arm * sigma_arm));

  // Colour: lerp from baseline to blue-white based on proximity
  const sf = Math.max(0, (proximity - 0.4) / 0.6);  // threshold at 0.4
  // Update vertex colour: baseline warm -> blue-white
  colArr[i*3]   = baseR + (0.67 - baseR) * sf;  // toward #aaddff
  colArr[i*3+1] = baseG + (0.87 - baseG) * sf;
  colArr[i*3+2] = baseB + (1.0  - baseB) * sf;

  // Size: slightly larger in arms (star formation regions are brighter)
  sizeArr[i] = baseSize * (1.0 + 0.3 * sf);

  // Position
  const vis = p.R * KPC_TO_VIS;
  posArr[i*3]     = vis * Math.cos(p.theta);
  posArr[i*3 + 1] = 0;
  posArr[i*3 + 2] = vis * Math.sin(p.theta);
}

galaxyGeo.attributes.position.needsUpdate = true;
galaxyGeo.attributes.color.needsUpdate = true;
galaxyGeo.attributes.size.needsUpdate = true;
```

**CRITICAL: The coder must verify that:**
1. `v_total(8.2) ~ 220 km/s` (same check as rotation curve).
2. The spiral pattern does NOT wind up over 10+ rotation periods.
3. At the default Omega_p = 25 km/s/kpc, corotation falls near R ~ 8-9 kpc.
4. The modular arithmetic for `delta` correctly wraps to [-pi/m, +pi/m].

---

## Speed ranges

Galaxy simulation: 0.01x to 1.0x, default 0.05x (same as rotation curve). At 0.05x, one galactic rotation at R_sun takes ~4700 Myr / 0.05 = ~94 seconds of wall clock (at 1 Myr/frame * 60 fps -> ~78 seconds). This gives a comfortable pace to watch stars flow through arms.

---

## Notes for CEO

### What went well
- The physics is authoritative and well-documented. Lin-Shu 1964 is the foundational paper; Binney & Tremaine provides all the math. Recent Gaia DR2 measurements pin down the Milky Way pattern speed to ~25 km/s/kpc with small uncertainty.
- The rotation-curve-interactive.html provides an excellent foundation: the entire mass model, Bessel function implementation, differential rotation, particle system, and UI layout can be reused. This is a natural "Part 2" of the rotation curve story.
- The Beltoforion galaxy renderer provides a clear reference for the tilted-ellipse visual approach, though we diverge from it by using a true density wave (separate pattern speed) rather than baked orbit tilts.
- No existing web interactive does what we are building. The Wikipedia animations are the closest educational tool, but they are pre-rendered GIFs. Our interactive version — with controllable pattern speed, arm count, pitch angle, and star formation glow — will be genuinely unique.

### What was hard
- The Beltoforion / Rougier implementations do NOT actually implement density wave theory correctly for our purposes: they bake the spiral into the orbit orientations and use uniform rotation. Our approach (separate Omega_p, Keplerian Omega(R), dynamic colouring) is physically more correct but has no direct code reference to copy from. The coder will need to implement the density wave colouring from the equations in this spec.
- Star formation triggering direction (leading vs trailing edge of arm, depending on inside vs outside corotation) is subtle. Getting the sign conventions right in the modular arithmetic for `delta_theta` will require care.
- The Omega(R) + resonance panel is analytically straightforward but the epicyclic frequency requires numerical differentiation of the rotation curve, which can be noisy. Use a smoothed or analytical approximation for kappa(R) rather than raw finite differences.

### What's missing
- Orbital eccentricity response to the density wave: in reality, the density wave perturbs stellar orbits into slightly eccentric ellipses aligned with the potential minimum. We approximate this as circular orbits with colour modulation. Adding true orbital perturbation (as Beltoforion does with tilted ellipses) would be a V2 enhancement.
- Gas dynamics: real star formation involves gas compression, not just stellar density. We use stellar arm proximity as a proxy, which is pedagogically adequate but physically simplified.
- Swing amplification and wave modes: the full Lin-Shu theory involves WKB analysis and dispersion relations. Beyond scope for this visualisation.

### Pitfalls for coder
1. **Sign of the logarithmic spiral**: `cotPitch * ln(R/R_ref)` must produce TRAILING arms with the same sign convention as the prograde rotation direction. Test: with Omega_p = 0 (frozen pattern) and stars rotating counter-clockwise, the leading edge of each arm should be at smaller theta (behind the rotation direction). If arms are leading, flip the sign of cotPitch.
2. **Modular arithmetic for arm proximity**: `delta = theta - phi_pattern` must be folded into the range `[-pi/m, pi/m]` correctly. JavaScript `%` operator returns negative values for negative operands — use `((x % P) + P) % P` pattern. Getting this wrong will produce flickering or discontinuous colouring.
3. **Per-frame colour updates are expensive**: Updating 8000 colour values every frame should be fine, but ensure `needsUpdate = true` is set on the colour attribute. If performance is an issue, consider updating colours every 2nd or 3rd frame.
4. **Bloom threshold tuning**: Arm stars are brighter to trigger bloom. But the bulge is also bright and dense. Tune bloom threshold so arms glow without the bulge becoming a white blob. Start with strength 0.4, radius 0.7, threshold 0.35.
5. **Traffic jam overlay depth**: The translucent spiral ribbons must render at y=0.01 (just above the particle plane at y=0) with depthWrite: false and additive blending. If they render behind particles, they are invisible; if they obscure particles, they are distracting.
6. **Reuse the Bessel function code verbatim**: Do not re-derive or simplify. Copy lines 194-301 of rotation-curve-interactive.html exactly. The polynomial coefficients are from Abramowitz & Stegun and are validated.
