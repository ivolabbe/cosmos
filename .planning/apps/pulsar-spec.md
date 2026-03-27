# Pulsar Interactive — Build Spec

## Overview

A 3D interactive visualization of a rotating neutron star (pulsar) with tilted magnetic dipole. The user sees a small glowing sphere (the neutron star) spinning on its rotation axis, with magnetic dipole field lines and two emission beam cones emanating from the magnetic poles. As the star rotates, the beams sweep through space in the classic lighthouse pattern. A real-time pulse profile panel at the bottom shows intensity vs rotational phase — when the beam sweeps past the observer's line of sight, a pulse peak appears. Controls allow adjusting spin period (millisecond to multi-second), magnetic axis tilt, and observer viewing angle. Audio mode converts pulse detections into audible clicks/tones: millisecond pulsars buzz, slow pulsars produce a heartbeat-like thump.

---

## Fact Sheet

### Key Numbers

| Property | Value | Source |
|----------|-------|--------|
| Typical mass | ~1.4 M_sun | NRAO Essential Radio Astronomy Ch.6; canonical value |
| Typical radius | ~10 km | NRAO ERA Ch.6; NASA Imagine the Universe |
| Typical density | ~10^14 g/cm^3 | NRAO ERA Ch.6 |
| Moment of inertia | I ~ 10^45 g cm^2 (= 2MR^2/5) | NRAO ERA Ch.6 |
| Surface magnetic field (normal) | ~10^12 G | NRAO ERA Ch.6 |
| Surface magnetic field (millisecond) | ~10^8 G | NRAO ERA Ch.6 |
| Period range | 1.4 ms to 8.5 s | NRAO ERA Ch.6 |
| Crab pulsar period | P = 33.1 ms | NRAO ERA Ch.6 |
| Crab pulsar P-dot | ~4.2 x 10^-13 s/s | NRAO ERA Ch.6 |
| Crab pulsar B-field | ~4 x 10^12 G | NRAO ERA Ch.6 |
| Crab spin-down luminosity | ~4 x 10^38 erg/s (~10^5 L_sun) | NRAO ERA Ch.6 |
| Vela pulsar period | ~89 ms (~11.2 Hz) | Chandra/NASA |
| Beam half-opening angle (outer cone) | rho ~ 5.75 * P^{-1/2} degrees (P in seconds) | Rankin 1993; MNRAS 485, 640 (2019) |
| Beam half-opening angle (inner cone) | rho ~ 4.33 * P^{-1/2} degrees | Rankin 1993 |
| Polar cap angular radius | Delta_PC ~ 2.45 * P^{-1/2} degrees | Rankin 1993 |
| Typical duty cycle | ~5% of period | MNRAS 414, 1314; Nature 224, 1188 |
| Characteristic age formula | tau_c = P / (2 P-dot) | NRAO ERA Eq. 6.31 |
| Magnetic field formula | B > 3.2 x 10^19 * sqrt(P * P-dot) G | NRAO ERA Eq. 6.26 |
| Spin-down luminosity formula | -E-dot = 4 pi^2 I P-dot / P^3 | NRAO ERA Eq. 6.20 |
| Braking index (pure dipole) | n = 3 (observed: 1.4 to 3) | NRAO ERA Eq. 6.37 |
| Known radio pulsars (2024) | ~3500+ | ATNF Pulsar Catalogue |

### Notes

- The fastest known pulsar is PSR J1748-2446ad at 716 Hz (1.396 ms period).
- The COSMOS article states "fastest pulsars can rotate at up to ~650 times a second" — this is slightly outdated (716 Hz is the current record).
- The COSMOS article states "number of known radio pulsars was near 1600" as of 2008 — now ~3500+.
- Magnetic inclination angles are broadly distributed. Observations show no strong preference for aligned or orthogonal rotators, though there is evidence that inclination decreases with age (alignment over time).
- Magnetars have B ~ 10^14–10^15 G (not in scope for this visualization but worth noting).

---

## State-of-the-Art Survey

### Reference 1: NASA SVS — Pulsars and their Magnetic Field (Vacuum Solution)
- **URL**: https://svs.gsfc.nasa.gov/4637/
- **What it does well**: Scientifically accurate dipole field line rendering based on the Brambilla Pulsar Model. Shows field lines as 3D glyphs with arrows indicating direction. Multiple viewpoints: inertial frame, co-rotating frame, polar view. HD/4K resolution.
- **What it does poorly**: Pre-rendered video, not interactive. No pulse profile. No adjustable parameters.
- **Key technique**: Magnetic field line glyphs computed from the vacuum dipole solution, rendered with arrows. Multiple camera tours around the structure.
- **Applicable to our build?**: Yes — gold standard for visual accuracy of field line geometry. Our dipole field lines should match this topology.

### Reference 2: NASA SVS — Pulsar Current Sheets (Magnetic Field Solution)
- **URL**: https://svs.gsfc.nasa.gov/4638
- **What it does well**: Shows the full magnetosphere including current sheets from PIC simulations. Charged particle flows (electrons blue, positrons red). Higher-energy particles shown with lighter colors.
- **What it does poorly**: Computationally intensive PIC simulation — far beyond what a browser can do.
- **Key technique**: Particle-in-cell simulation. We will NOT replicate this; we use the simpler vacuum dipole solution.
- **Applicable to our build?**: Visual reference only. The current-sheet morphology is too complex for real-time WebGL. The vacuum dipole is the correct simplification for an educational tool.

### Reference 3: Sketchfab — Pulsar, a Magnetized Rotating Neutron Star
- **URL**: https://sketchfab.com/3d-models/pulsar-a-magnetized-rotating-neutron-star-c876c7449be643f196beed027b1b14b4
- **What it does well**: 3D interactive model viewable in browser. Shows neutron star, tilted magnetic axis (light blue lines), emission beams from poles. 756K triangles, 380K vertices. Can orbit around the model.
- **What it does poorly**: Static mesh (not animating rotation). No pulse profile. No controls. Not educational — just a 3D model viewer. NoAI license.
- **Key technique**: Pre-built 3D mesh with separate elements for star, field lines, and beams.
- **Applicable to our build?**: Visual reference for layout. We build our own geometry procedurally (no licensing issues). Our version rotates and produces a live pulse profile.

### Reference 4: Chandra X-ray Observatory — Vela Pulsar in 3D
- **URL**: https://chandra.harvard.edu/deadstar/vela.html
- **What it does well**: Sonification mapping (distance from center = pitch, 11 Hz oscillation matching pulsar period). Accessibility features (visual description tours). 3D printable STL models. Multi-sensory: audio + visual + text.
- **What it does poorly**: Hosted on external Smithsonian Voyager platform. Shows the nebula/remnant, not the lighthouse model.
- **Key technique**: Sonification: pitch mapped to distance, oscillation rate matched to pulsar period.
- **Applicable to our build?**: Sonification approach is directly applicable. Map pulse detection to an audio click/tone, with timing matching the spin period.

### Reference 5: SimPulse (PulsarAstronomy.net)
- **URL**: https://www.pulsarastronomy.net/pulsar/software/simpulse
- **What it does well**: Web-based pulsar signal simulator with adjustable parameters (periodic and single-pulse modes). Designed for education and research.
- **What it does poorly**: Generates downloadable datasets — not a visual 3D experience. No 3D rendering.
- **Key technique**: Signal simulation from pulsar parameters.
- **Applicable to our build?**: Concept only — we provide the visual+audio experience that SimPulse lacks.

### Reference 6: Procedural Star Rendering (bpodgursky.com)
- **URL**: https://bpodgursky.com/2017/02/01/procedural-star-rendering-with-three-js-and-webgl-shaders/
- **What it does well**: Procedural glowing sphere using Three.js custom shaders. Demonstrates how to make a convincing stellar surface with WebGL.
- **What it does poorly**: Not pulsar-specific.
- **Key technique**: Custom fragment shader for stellar surface glow. Additive blending for corona.
- **Applicable to our build?**: Useful technique for rendering the neutron star as a glowing hot sphere.

### Reference 7: Lumen Learning / OpenStax Astronomy — Pulsar Lighthouse Model
- **URL**: https://courses.lumenlearning.com/suny-astronomy/chapter/pulsars-and-the-discovery-of-neutron-stars/
- **What it does well**: Clear educational diagrams of the lighthouse model. Shows rotation axis, magnetic axis offset, beam cones, and observer line-of-sight geometry.
- **What it does poorly**: Static 2D diagrams only.
- **Key technique**: Clear diagrammatic representation of the alpha (magnetic inclination) and beam cone geometry.
- **Applicable to our build?**: Reference for correct geometry layout. Our 3D version should match these standard educational diagrams when viewed from the correct angle.

---

## Physics / Algorithm

### 1. Coordinate System and Geometry

Use a right-handed coordinate system with the **rotation axis along Y** (vertical in the scene). The neutron star sits at the origin.

**Key angles:**
- **alpha** (magnetic inclination): angle between the rotation axis (Y) and the magnetic dipole axis. Range: 0 to 90 degrees. At alpha = 0, the magnetic and rotation axes are aligned (no pulsation). At alpha = 90, the magnetic axis is in the equatorial plane (orthogonal rotator, maximum pulsation).
- **zeta** (observer viewing angle): angle between the rotation axis (Y) and the observer's line of sight. Range: 0 to 180 degrees (0 = looking down the rotation axis; 90 = edge-on).
- **rho** (beam half-opening angle): angular radius of the emission cone. Empirically: rho ~ 5.75 * P^{-1/2} degrees, where P is in seconds.
- **beta** (impact parameter): beta = zeta - alpha. The closest approach of the observer's sightline to the magnetic axis.

### 2. Magnetic Dipole Axis as a Function of Time

The magnetic axis rotates around the Y-axis (rotation axis) at angular frequency omega = 2*pi / P.

At time t, the magnetic dipole unit vector is:

```
m_hat(t) = (sin(alpha) * cos(omega*t),
            cos(alpha),
            sin(alpha) * sin(omega*t))
```

The anti-pole (south magnetic pole) is simply -m_hat(t).

### 3. Dipole Field Lines

For a magnetic dipole aligned along m_hat, field lines in the dipole's own coordinate frame satisfy:

```
r(theta) = r_0 * sin^2(theta)
```

where theta is the polar angle from the dipole axis, and r_0 is the equatorial crossing radius of that field line.

**Parametric 3D field line in the dipole frame** (dipole along Z'):

```
For theta from 0 to pi:
  r = r_0 * sin^2(theta)
  x' = r * sin(theta) * cos(phi)
  y' = r * cos(theta)
  z' = r * sin(theta) * sin(phi)
```

where phi is the azimuthal angle of the field line around the dipole axis. Use phi = 0, 90, 180, 270 for four field lines in perpendicular planes.

**To place in the scene**: rotate from the dipole frame to the scene frame by applying the rotation that takes Z' to m_hat(t). This rotation changes every frame as the star spins.

**Implementation**: Generate ~8-12 field lines (4 azimuthal angles, 2-3 different r_0 values for closed field lines). Use `THREE.Line` with `BufferGeometry`. Update vertex positions each frame by rotating the dipole-frame coordinates to the current m_hat(t) orientation. Alternatively, put all field line geometry in a `THREE.Group` and rotate the group.

**Closed vs open field lines**: Field lines with r_0 < r_LC (light cylinder radius) are closed. For visualization, use r_0 values of roughly 2-6 in scene units for a neutron star of radius ~1, producing aesthetically pleasing closed dipole loops. We do NOT need to compute the light cylinder — just show a representative set of closed field lines.

### 4. Emission Beam Cones

The emission cones are aligned with the magnetic dipole axis. Each cone:
- Has its apex at the neutron star surface (at the magnetic pole).
- Has a half-opening angle of rho degrees.
- Extends outward some visual length L (say 5-8 scene units).

**Geometry**: Use `THREE.ConeGeometry` (or a custom shader) for each beam, oriented along +m_hat and -m_hat. The cone mesh is a child of the same rotating group as the field lines.

**Visual**: Semi-transparent, emissive material with additive blending. Color: warm white or pale blue (#aaddff). Fades to transparent at the outer edge. Alternatively, use a custom shader on a cone geometry with a radial gradient that peaks at the center and falls off toward the cone edge.

### 5. Pulse Detection — When the Beam Crosses the Line of Sight

The observer's line of sight direction (from star to observer) is:

```
los_hat = (sin(zeta), cos(zeta), 0)   // in the rotation-axis-up frame
```

(We fix the observer in the XY plane without loss of generality.)

The angle between the magnetic axis and the line of sight at time t:

```
theta_beam(t) = arccos( m_hat(t) . los_hat )
```

A pulse is detected when **theta_beam(t) < rho** (the beam cone encompasses the observer's sightline).

For the opposite pole, compute the angle to -m_hat(t) as well. If both poles produce pulses, the pulsar shows an interpulse at approximately 180 degrees of phase offset.

**Pulse condition (expanded)**:

```
cos(theta_beam) = sin(alpha)*sin(zeta)*cos(omega*t) + cos(alpha)*cos(zeta)
```

A pulse occurs when cos(theta_beam) > cos(rho), i.e.:

```
sin(alpha)*sin(zeta)*cos(omega*t) + cos(alpha)*cos(zeta) > cos(rho)
```

This has solutions only when |beta| = |zeta - alpha| < rho. If |beta| > rho, the beam never crosses the line of sight and the pulsar is not detectable from this viewing angle.

### 6. Pulse Profile Shape

The observed pulse intensity as a function of rotational phase phi = omega*t can be modeled as:

```
I(phi) = exp( -delta(phi)^2 / (2 * sigma^2) )
```

where delta(phi) is the angular distance from the beam center to the line of sight at phase phi, and sigma controls the beam's Gaussian width. A reasonable choice:

```
sigma = rho / 2.35
```

so that the full-width at half-maximum (FWHM) of the beam profile equals approximately rho (since FWHM = 2.35 * sigma for a Gaussian).

The angular distance delta(phi):

```
cos(delta) = sin(alpha)*sin(zeta)*cos(phi) + cos(alpha)*cos(zeta)
delta = arccos(cos(delta))
```

When delta < rho, I > 0 (significant). When delta >> rho, I ~ 0.

**Duty cycle check**: For a 1-second pulsar, rho ~ 5.75 degrees. The pulse width in phase is roughly W ~ 2*rho / (sin(alpha)) degrees for an orthogonal rotator, i.e., ~11.5 degrees out of 360 = ~3.2% duty cycle. This matches the observed ~5% typical duty cycle.

### 7. Spin Period Slider Mapping

Map the slider logarithmically:

```
P = 10^(slider_value)   // slider from -2.85 (1.4 ms) to +0.93 (8.5 s)
```

The beam opening angle rho updates with P:

```
rho = 5.75 * P^{-0.5} degrees
```

For P = 1 ms: rho ~ 182 degrees (almost isotropic — the beam is very wide).
For P = 1 s: rho ~ 5.75 degrees.
For P = 5 s: rho ~ 2.57 degrees (very narrow beam).

### 8. Visual Spin Rate

The actual spin rate of a millisecond pulsar (716 Hz) is far too fast to see. For visualization:

- For P > 0.5 s: animate at real rate (the rotation is visible).
- For P < 0.5 s: animate at a slowed-down visual rate (e.g., 2 Hz rotation) but compute the pulse profile at the correct physical rate.
- Show the actual period value in the readout. The pulse profile panel always reflects the true physics; the 3D rotation is slowed for visual clarity.

### 9. Audio Pulse

Use the Web Audio API. On each pulse detection (beam crossing the line of sight):
- Generate a short click/ping: an `OscillatorNode` burst (5-20 ms duration) with a quick amplitude envelope.
- For slow pulsars (P > 0.3 s): individual clicks are audible as distinct heartbeat-like thumps.
- For millisecond pulsars (P < 30 ms): the rapid clicks merge into a continuous buzz/tone. The perceived pitch corresponds to 1/P.
- Amplitude envelope: Gaussian shape matching the pulse profile width.

### 10. Slow-Down / Aging Mode (Optional, Stage 5)

When enabled, the period increases over time according to:

```
P(t) = P_0 * (1 + t / tau_c)^{1/(n-1)}
```

For pure magnetic dipole braking (n = 3): P(t) = P_0 * sqrt(1 + 2*t/tau_c)

This is a very slow process in reality (timescale ~Myr). For the visualization, use a greatly accelerated rate so the user can see the spin-down over ~30 seconds of wall time.

---

## Implementation Stages

### Stage 1: Neutron Star + Magnetic Dipole Field Lines + Rotation

**Build:**
- Scene: black background (#000), star field (two-layer, matching style guide).
- Neutron star: `SphereGeometry(1, 32, 32)` with emissive white-blue material, subtle glow (bloom or additive blending sprite).
- Rotation axis: thin dashed line along Y, labeled "Rotation axis".
- Magnetic axis: solid colored line (distinct color, e.g., cyan) along m_hat(t), labeled "Magnetic axis".
- Dipole field lines: 8 curves (4 azimuthal * 2 r_0 values) using `THREE.Line`, grouped and rotated with the magnetic axis. Material: semi-transparent cyan/blue.
- Rotation: the magnetic axis group rotates around Y at rate omega.
- OrbitControls for camera.
- Slider for magnetic inclination alpha (0 to 90 degrees).

**Pass criteria:**
- Neutron star glows at center.
- Dipole field lines form recognizable closed loops around the magnetic axis.
- Field lines rotate smoothly with the star.
- When alpha = 0, field lines are symmetric about Y. When alpha = 90, they tumble through the equatorial plane.

### Stage 2: Emission Beam Cones

**Build:**
- Two cone meshes (one at each magnetic pole), oriented along +m_hat and -m_hat.
- Each cone: `ConeGeometry` with half-angle = rho, length ~6 scene units.
- Semi-transparent emissive material (additive blending, pale blue/white), with radial gradient (bright center, fading edges).
- Cones rotate with the dipole group.
- Spin period slider (logarithmic, 1.4 ms to 8.5 s). Beam half-angle rho updates with period via rho = 5.75 * P^{-0.5}.

**Pass criteria:**
- Two beam cones visible emanating from the poles of the neutron star.
- Beams visually sweep through space as the star rotates (lighthouse effect clearly visible).
- At alpha = 45 degrees, the beams trace out a cone in space.
- Changing the period slider changes beam width (wider at short periods, narrower at long periods).

### Stage 3: Pulse Profile Panel

**Build:**
- A 2D canvas panel at the bottom of the screen (or top-right, similar to the GW spectrogram).
- X-axis: rotational phase (0 to 360 degrees, or 0 to 1).
- Y-axis: intensity (0 to 1).
- Compute pulse profile analytically: I(phi) = exp(-delta(phi)^2 / (2*sigma^2)) for each phase bin.
- Draw the profile as a filled curve.
- A vertical "playhead" line sweeps across the profile at the current rotational phase.
- When the playhead crosses a pulse peak, the beam cone brightens (visual feedback that the beam is pointing at the observer).
- Observer viewing angle (zeta) slider.
- When |zeta - alpha| > rho, no pulse appears in the profile — show a flat line and a "Not visible from this angle" message.

**Pass criteria:**
- Profile shows a clear Gaussian peak at the correct phase when the beam sweeps past.
- If alpha and zeta allow both poles to be seen, an interpulse appears at ~180 degrees offset.
- Profile updates in real time when alpha, zeta, or period sliders change.
- Playhead position matches the 3D rotation phase.
- At zeta = alpha (beta = 0), the pulse is at its narrowest (beam center crosses sightline). At zeta = alpha + rho (beta = rho), the pulse is very broad and weak (grazing).

### Stage 4: Controls + Audio

**Build:**
- Control bar (bottom, matching style guide) with:
  - Period slider: logarithmic, 1.4 ms to 8.5 s, labeled with current value.
  - Tilt slider: magnetic inclination alpha, 0 to 90 degrees.
  - Viewing angle slider: observer angle zeta, 0 to 90 degrees.
  - Sound toggle checkbox.
  - Play/Pause button.
- Info panel (top-left) with readouts:
  - Period: P = X ms (or s)
  - Beam angle: rho = X degrees
  - Magnetic field: B ~ X G (computed from P and a representative P-dot)
  - Characteristic age: tau ~ X yr
  - Spin-down power: E-dot ~ X erg/s
- Audio: Web Audio API pulse sounds (see Physics section 9).
- Embedded mode: hide info panel text, show only compact readouts.

**Pass criteria:**
- All three sliders respond smoothly. 3D scene and pulse profile update in real time.
- Audio produces distinct clicks for slow pulsars, continuous buzz for millisecond pulsars.
- Sound can be toggled on/off.
- Readout values update correctly with slider changes.
- No audio glitches or clicks when changing parameters.

### Stage 5: Polish

**Build:**
- Stars background (two-layer, per style guide: 800 dim + 80 bright, bloom).
- Info panel with title "Pulsar", description, and hint text. Hidden in embed mode.
- Axis labels (CSS2DObject): "Rotation axis", "Magnetic axis", "Observer line of sight" (as a dotted line from the star toward the camera direction).
- Optional "slow-down" mode toggle: period increases over time to show aging.
- Credits line.
- Bloom post-processing (subtle: strength 0.3, radius 0.5, threshold 0.6) for the neutron star glow and beam cones.
- Performance: ensure 60 fps. Field line geometry updates are the main cost — pre-compute in dipole frame, rotate via group transform (cheap).
- Responsive resize.
- Embed mode detection (`window.self !== window.top`).

**Pass criteria:**
- Full app works in standalone and embedded modes.
- All style guide requirements met (background, controls, info panel behavior).
- Smooth 60 fps animation.
- Visually compelling: the lighthouse sweep is immediately obvious and beautiful.

---

## Textures / Assets Needed

**None.** This visualization is entirely procedural:
- Neutron star: emissive material + bloom (no texture).
- Field lines: computed geometry.
- Beam cones: procedural shader or semi-transparent geometry.
- Stars: random points (standard pattern from style guide).
- Pulse profile: 2D canvas drawing.
- Audio: Web Audio API synthesis (no audio files).

---

## Complexity Estimate

**Complex (500+ lines JS).** Comparable to the gravitational-waves interactive. The physics (dipole geometry, beam-cone intersection, pulse profile computation) and the pulse profile 2D panel add significant code. Audio adds another ~50 lines. Estimated: 600-800 lines total.

---

## Closest Existing COSMOS App to Use as Template

**`experimental/gravitational-waves-interactive.html`** — because:

1. It is a **physics simulation** (not just a textured globe), same category as the pulsar app.
2. It has a **2D panel** (spectrogram) alongside the 3D scene — directly analogous to our pulse profile panel.
3. It has **physics-driven sliders** (mass, speed) that update the simulation in real time — same pattern as our period/tilt/viewing-angle sliders.
4. It uses **Web Audio API** for sonification — directly reusable for pulse audio.
5. It uses the **same Three.js setup**: importmap, OrbitControls, EffectComposer + bloom, embedded mode detection, info panel + controls bar.
6. It has a **readout panel** with live physics values — same pattern as our period/B-field/age readouts.
7. It demonstrates the **correct approach to time-dependent physics** in the animation loop.

The coder should start from this file's structure (HTML/CSS scaffolding, embed mode, controls pattern, audio setup) and replace the GW physics with pulsar physics.

---

## Eye Candy & Verification Targets (for Verifier)

### Visual targets
1. **NASA SVS vacuum dipole** (https://svs.gsfc.nasa.gov/4637/) — our field lines should look topologically identical: closed loops symmetric about the dipole axis, pinching at the poles.
2. **Sketchfab pulsar model** (https://sketchfab.com/3d-models/pulsar-a-magnetized-rotating-neutron-star-c876c7449be643f196beed027b1b14b4) — overall layout reference: central glowing sphere, two beams, tilted axis. Our version should be at least as clear.
3. **Lumen Learning lighthouse diagram** (https://courses.lumenlearning.com/suny-astronomy/chapter/pulsars-and-the-discovery-of-neutron-stars/) — the geometry (rotation axis, magnetic axis, beam cones, observer sightline) should match standard textbook diagrams.
4. **Chandra Vela sonification** (https://chandra.si.edu/sound/vela.html) — audio quality reference. Our pulse audio should be at least this clear.

### Physical correctness checks
- [ ] **Alpha = 0 produces no pulse**: when magnetic and rotation axes are aligned, the beam traces a dot on the sky, not a sweep. The pulse profile should be constant (always on or always off depending on zeta vs rho).
- [ ] **Alpha = 90 + zeta = 90 produces maximum pulsation**: orthogonal rotator viewed edge-on gives the sharpest, strongest pulse.
- [ ] **Beam width scales with period**: at P = 1 s, rho ~ 5.75 degrees (narrow cone). At P = 10 ms, rho ~ 57.5 degrees (wide cone). Visually check that cones change size.
- [ ] **Duty cycle is ~5% for P = 1 s**: the pulse in the profile panel should occupy roughly 1/20 of the phase.
- [ ] **Interpulse at 180 degrees offset**: when both poles are visible (zeta ~ 90, alpha ~ 90), two pulses per rotation should appear in the profile, separated by half a period.
- [ ] **No pulse when |beta| > rho**: when the observer angle is far from the magnetic axis tilt, the pulse profile should be flat (beam never reaches the observer). Verify with zeta = 0, alpha = 45, rho ~ 6 degrees: |beta| = 45 >> 6, no pulse.
- [ ] **Field lines form closed dipole loops**: lines emerge from one magnetic pole and return to the other. They should NOT be straight rays.
- [ ] **Rotation is prograde**: the magnetic axis should rotate counterclockwise when viewed from above (positive Y direction).
- [ ] **Audio timing matches visual**: pulse clicks should occur exactly when the beam cone visually sweeps past the observer direction.

### What WRONG looks like (avoid these)
- Field lines that are straight radial spikes (not dipole loops).
- Beam cones that don't rotate with the star.
- Pulse profile that doesn't change when sliders move.
- Audio that plays at the wrong rate (e.g., constant tone regardless of period setting).
- Beam cone axis coinciding with the rotation axis (forgetting the tilt).

---

## Reference Implementations (for Coder)

### Dipole field line generation (pseudocode)

```javascript
// Generate one field line in the dipole's own frame (dipole along +Z)
function dipoleFieldLine(r0, phi, nPoints = 100) {
  const points = [];
  for (let i = 0; i <= nPoints; i++) {
    const theta = (i / nPoints) * Math.PI; // 0 to pi
    const r = r0 * Math.sin(theta) ** 2;
    if (r < 0.001) continue; // skip the poles (r ~ 0)
    const x = r * Math.sin(theta) * Math.cos(phi);
    const y = r * Math.cos(theta);           // along dipole axis
    const z = r * Math.sin(theta) * Math.sin(phi);
    points.push(new THREE.Vector3(x, y, z));
  }
  return points;
}

// Generate a set of field lines
const fieldLines = [];
const r0Values = [3, 5];         // two radial distances
const phiValues = [0, Math.PI/2, Math.PI, 3*Math.PI/2]; // four azimuthal planes
for (const r0 of r0Values) {
  for (const phi of phiValues) {
    fieldLines.push(dipoleFieldLine(r0, phi));
  }
}
```

### Rotating the dipole group

```javascript
// dipoleGroup contains all field lines and beam cones
// alpha is magnetic inclination (radians), omega*t is rotation phase
const phase = omega * time;
dipoleGroup.rotation.set(0, 0, 0);
dipoleGroup.rotateY(phase);       // spin around rotation axis (Y)
dipoleGroup.rotateX(alpha);       // tilt magnetic axis away from Y
// (apply in correct order: first tilt in local frame, then spin)
// Better approach: use quaternion or matrix:
const qSpin = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0), phase);
const qTilt = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0), alpha);
dipoleGroup.quaternion.copy(qSpin).multiply(qTilt);
```

### Pulse intensity computation

```javascript
function pulseIntensity(phase, alpha, zeta, rho) {
  // Angle between magnetic axis and line of sight
  const cosTheta = Math.sin(alpha) * Math.sin(zeta) * Math.cos(phase)
                 + Math.cos(alpha) * Math.cos(zeta);
  const theta = Math.acos(Math.max(-1, Math.min(1, cosTheta)));

  // Gaussian beam profile
  const sigma = rho / 2.35; // FWHM = rho
  const intensity = Math.exp(-theta * theta / (2 * sigma * sigma));
  return intensity;
}

// Also check the anti-pole for interpulse:
function pulseIntensityBothPoles(phase, alpha, zeta, rho) {
  const I1 = pulseIntensity(phase, alpha, zeta, rho);
  const I2 = pulseIntensity(phase, Math.PI - alpha, zeta, rho); // anti-pole
  return Math.max(I1, I2);
}
```

### Web Audio pulse generation (sketch)

```javascript
const audioCtx = new AudioContext();

function playPulseClick(intensity) {
  if (intensity < 0.01) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.frequency.value = 800;  // click pitch
  osc.type = 'sine';
  gain.gain.setValueAtTime(intensity * 0.3, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.015);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.02);
}
```

### Pulse profile 2D canvas rendering

```javascript
function drawPulseProfile(ctx, width, height, alpha, zeta, rho, currentPhase) {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = 'rgba(10,10,46,0.92)';
  ctx.fillRect(0, 0, width, height);

  // Draw profile curve
  ctx.beginPath();
  ctx.moveTo(0, height);
  const nBins = 360;
  for (let i = 0; i <= nBins; i++) {
    const phi = (i / nBins) * 2 * Math.PI;
    const I = pulseIntensityBothPoles(phi, alpha, zeta, rho);
    const x = (i / nBins) * width;
    const y = height - I * height * 0.85;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(width, height);
  ctx.closePath();
  ctx.fillStyle = 'rgba(100, 180, 255, 0.4)';
  ctx.fill();
  ctx.strokeStyle = '#6ab4ff';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Playhead
  const px = (currentPhase / (2 * Math.PI)) * width;
  ctx.strokeStyle = '#DC2D27';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(px, 0);
  ctx.lineTo(px, height);
  ctx.stroke();
}
```

---

## Notes for CEO

- **What went well**: The pulsar physics is well-documented in authoritative sources. NRAO's Essential Radio Astronomy chapter 6 is an excellent single reference for all the key equations (characteristic age, B-field, spin-down luminosity). Rankin's beam-width formula (rho ~ 5.75 * P^{-0.5} degrees) is well-established and gives physically reasonable results. The gravitational-waves interactive provides an excellent structural template — this app can reuse its HTML/CSS scaffold, audio pattern, and 2D panel approach almost directly.

- **What was hard**: No existing open-source WebGL pulsar lighthouse visualization was found. Every reference is either a pre-rendered NASA video, a static Sketchfab model, or an academic data-processing tool. We are building this from scratch. The beam-LOS intersection math required careful derivation to get the correct pulse profile formula.

- **What's missing**: The exact pulse profile shape is simplified (single Gaussian per pole). Real pulsars show complex multi-component profiles (core + inner cone + outer cone in Rankin's model). For an educational visualization, the single-Gaussian approximation is physically reasonable and visually clear. If we want to add complexity later, we could allow a "hollow cone" mode where the beam intensity peaks at the cone edge rather than the center.

- **Inconsistencies**: The COSMOS article says "fastest pulsars can rotate at up to ~650 times a second" — the current record is 716 Hz (PSR J1748-2446ad). The article also states ~1600 known pulsars as of 2008; the current count is ~3500+. These should be updated in the article text by the Writer agent.

- **Pitfalls for coder**:
  1. **Rotation order matters**: applying tilt then spin vs spin then tilt gives different results. Use quaternion multiplication: q_spin * q_tilt (spin first in world frame, tilt in local frame).
  2. **Visual spin rate**: millisecond pulsars rotate far too fast to see. Must cap the visual rotation rate and decouple visual animation from physics computation.
  3. **Beam opening angle at very short periods**: rho ~ 5.75 * P^{-0.5} gives rho > 90 degrees for P < 4 ms. This means the beam is almost isotropic — which is physically correct (millisecond pulsars have very wide beams). The cone geometry needs to handle half-angles > 45 degrees gracefully.
  4. **Anti-pole interpulse**: don't forget to check both magnetic poles. When alpha ~ 90 and zeta ~ 90, both poles sweep past the observer, producing an interpulse.
  5. **Web Audio API**: must be initialized on user gesture (click). Use a "Click to start" overlay or initialize on first Play button press.
