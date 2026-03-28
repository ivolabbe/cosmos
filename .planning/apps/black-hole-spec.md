# Black Hole Interactive -- Build Spec

## Overview

A GPU-shader gravitational lensing visualization of a Schwarzschild (non-rotating) black hole. A background starfield is ray-traced through curved spacetime in real-time: the user orbits the camera and sees the Einstein ring, photon sphere, relativistic aberration, and the black hole shadow distorting the star field. A mass slider controls the Schwarzschild radius. An accretion disk toggle adds a Doppler-boosted, gravitationally redshifted thin disk. This is the single most visually dramatic demonstration in the COSMOS collection -- the physics produces the spectacle.

---

## Fact Sheet

### Key Numbers

| Property | Value | Source |
|----------|-------|--------|
| Schwarzschild radius | r_s = 2GM/c^2 | Schwarzschild 1916 |
| Photon sphere radius | r_ph = 3GM/c^2 = 1.5 r_s | Schwarzschild geodesics |
| Critical impact parameter | b_crit = (3 sqrt(3)/2) r_s ~ 2.598 r_s | Null geodesic analysis |
| ISCO (innermost stable circular orbit) | r_ISCO = 6GM/c^2 = 3 r_s | Schwarzschild ISCO |
| Black hole shadow angular radius | theta_sh ~ b_crit / D (distant observer) | Synge 1966 |
| Einstein ring angular radius | theta_E = sqrt(4GM D_LS / (c^2 D_L D_S)) | Einstein 1936 |
| Weak-field deflection angle | delta_phi ~ 4GM/(c^2 b) = 2 r_s / b | GR weak-field limit |
| Schwarzschild radius (1 M_sun) | 2.953 km | r_s = 2GM/c^2 |
| Schwarzschild radius (Sgr A*) | ~1.27 x 10^10 m (~0.085 AU) | M = 4.3 x 10^6 M_sun |
| Schwarzschild radius (M87*) | ~1.93 x 10^13 m (~129 AU) | M = 6.5 x 10^9 M_sun |
| Accretion disk inner edge | r_ISCO = 3 r_s | Novikov & Thorne 1973 |
| Accretion disk temperature profile (Newtonian approx.) | T(r) ~ T_max (r/r_ISCO)^(-3/4) | Page & Thorne 1974 |
| Orbital velocity at ISCO | v = c / sqrt(6) ~ 0.408c | Circular orbit, Schwarzschild |
| Radiative efficiency (Schwarzschild) | eta ~ 5.7% (1 - sqrt(8/9)) | Novikov & Thorne 1973 |

### Notes

- We implement Schwarzschild (non-rotating, a=0) geometry, not Kerr. This is the correct pedagogical starting point. Kerr adds frame-dragging and an asymmetric shadow -- a possible future extension.
- The "black hole shadow" is NOT the event horizon itself. It is the capture cross-section of photons, with angular radius ~ b_crit/D. The shadow is sqrt(27)/2 ~ 2.6 times larger than the Schwarzschild radius would suggest.
- The photon sphere at 1.5 r_s is unstable -- photons there orbit but any perturbation sends them inward or outward. This is what creates the bright photon ring at the edge of the shadow.
- The critical impact parameter b_crit = (3 sqrt(3)/2) r_s separates capture orbits from deflection orbits. Rays with b < b_crit fall in; rays with b > b_crit escape.
- For distant observers, the Einstein ring appears when a background source is exactly behind the black hole. The ring is the locus of images at impact parameter b_crit.
- Accretion disk Doppler boosting: the approaching side of the disk is blue-shifted and beamed (brighter), the receding side is red-shifted and dimmer. The intensity transforms as I_obs = delta^3 I_emit where delta is the Doppler factor.
- The EHT image of M87* (2019) and Sgr A* (2022) are the definitive observational references.

### Physics Context (for article writer)

A black hole is a region of spacetime where gravity is so extreme that nothing -- not even light -- can escape once it crosses the event horizon. The Schwarzschild solution (1916) describes the simplest black hole: non-rotating, uncharged, eternal. Around it, light rays follow curved paths (geodesics) through spacetime. Far from the hole, deflection is small (the weak-field limit recovers Newton plus a small GR correction). Closer in, deflection becomes extreme: at the photon sphere (r = 1.5 r_s), light orbits the hole in unstable circles. Closer still, light spirals inward and is captured. An observer looking at a black hole against a starfield sees the "shadow" -- a dark disc surrounded by a bright photon ring where light from behind the hole is focused. With an accretion disk, Doppler boosting from relativistic orbital motion makes one side dramatically brighter than the other -- the hallmark asymmetry seen in the EHT images and the Interstellar movie.

---

## State-of-the-Art Survey

### Reference 1: oseiskar/black-hole (WebGL + Three.js)
- **URL**: https://github.com/oseiskar/black-hole | Live: https://oseiskar.github.io/black-hole/
- **Source**: GitHub (researcher)
- **What it does well**: Full Schwarzschild geodesic ray tracing in a GLSL fragment shader. Leapfrog integration of the Binet equation u'' = -u(1 - 1.5 u^2). Milky Way background texture with Doppler shift. Accretion disk with plane-crossing detection. Togglable relativistic effects (Doppler, aberration, time dilation, Lorentz contraction). Uses Three.js. Detailed physics documentation (physics.html). Normalized unit system (r_s = 1).
- **What it does poorly**: Modest visual quality -- functional but not cinematic. Low ODE step count causes slight over-bending of light near the photon sphere. Accretion disk texture is "striped" placeholder, not physically motivated color.
- **Key technique**: Binet equation in GLSL, leapfrog integrator, camera ray -> (u, du/dphi) initial conditions, Milky Way equirectangular texture lookup.
- **Our advantage**: Higher visual polish (bloom, circular particles for stars, proper accretion disk temperature/color mapping). Same physics but better presentation.

### Reference 2: Bruneton black_hole_shader (WebGL2)
- **URL**: https://ebruneton.github.io/black_hole_shader/ | Paper: arxiv.org/abs/2010.08735
- **Source**: Published researcher (Eric Bruneton), BSD-3 license
- **What it does well**: The gold standard for real-time black hole rendering. Precomputed lookup tables for beam tracing -- constant-time per pixel, no per-frame ODE integration. Includes Gaia star catalog background, accurate Doppler boosting, gravitational redshift, relativistic beaming, accretion disk with proper shading model. Publication-quality output.
- **What it does poorly**: Complex C++/JS/GLSL build pipeline. Requires precomputation step. Harder to integrate into single-file COSMOS architecture. WebGL2 only.
- **Key technique**: Precomputed deflection tables indexed by impact parameter. Beam tracing rather than ray tracing. Custom texture filtering for star rendering.
- **Our advantage**: Simpler single-file architecture. Interactive mass slider (Bruneton has fixed mass). Educational UI with readouts. The precomputed table approach could be adopted as an optimization if per-frame integration proves too slow, but we start with direct integration (simpler to understand and implement).

### Reference 3: rantonels/starless (Python) + rantonels/schwarzschild (WebGL)
- **URL**: https://rantonels.github.io/starless/ (Python) | https://github.com/rantonels/schwarzschild (WebGL)
- **Source**: GitHub (physics grad student)
- **What it does well**: Starless is the best-documented derivation of the "magic potential" trick: the Binet equation u'' + u = (3/2) u^2 can be simulated as a Newtonian particle under force F = -(3/2) h^2 r_hat / r^5. Accretion disk with blackbody temperature profile T ~ r^(-3/4), Doppler and gravitational redshift, alpha compositing of multiple disk images. The schwarzschild WebGL version uses a precomputed deflection texture (scipy ODE solve offline, lookup in shader).
- **What it does poorly**: Starless is Python-only (not real-time). The WebGL version has no accretion disk. Visually dated.
- **Key technique**: The "magic potential" formulation for the Binet equation. Precomputed deflection texture for the WebGL version.
- **Our advantage**: Real-time in-browser with full accretion disk. Combined approach: direct ODE integration in shader (like oseiskar) for flexibility, or precomputed table (like rantonels) if performance requires it.

### Reference 4: NASA SVS Black Hole Visualizations
- **URL**: https://svs.gsfc.nasa.gov/14619/ (with accretion disk) | https://svs.gsfc.nasa.gov/14620/ (isolated)
- **Source**: NASA Goddard / Caltech-IPAC
- **What it does well**: Authoritative visual reference. Shows correct Einstein ring, photon ring at shadow boundary, Doppler-beamed accretion disk with bright approaching side and dim receding side. Qualitatively correct simplified optical model. Created by Robert Hurt and NASA/JPL.
- **What it does poorly**: Pre-rendered video, not interactive. "Simplified optical model" rather than full GR ray tracing.
- **Key technique**: Offline rendering with physically motivated but simplified model.
- **Our advantage**: Real-time interactivity. User controls camera and mass. Educational readouts. The NASA videos are our primary visual quality target.

### Reference 5: Interstellar / DNGR (film)
- **URL**: arxiv.org/abs/1502.03808 (James, von Tunzelmann, Franklin & Thorne 2015)
- **Source**: DNEG + Kip Thorne, published in Classical and Quantum Gravity
- **What it does well**: The definitive cinematic black hole visualization. Kerr geometry with spin a = 0.999. Ray-bundle (beam) tracing for IMAX-quality smoothness. Correct Doppler boosting, gravitational lensing, multiple images of the accretion disk visible above and below the shadow. This paper defined what the public expects a black hole to look like.
- **What it does poorly**: Kerr, not Schwarzschild (more complex). Film-quality offline renderer, not real-time. The artistic decision to reduce Doppler asymmetry for the movie makes it less physically accurate than it could have been.
- **Key technique**: Ray-bundle propagation through Kerr spacetime. DNGR (Double Negative Gravitational Renderer).
- **Our advantage**: Interactivity and education. The Interstellar paper is our physics reference, but we implement Schwarzschild (simpler, still dramatic). Users can explore what the movie shows them.

### Reference 6: peabrainiac/black-hole-renderer (WebGL)
- **URL**: https://github.com/peabrainiac/black-hole-renderer
- **Source**: GitHub
- **What it does well**: Clean JS/WebGL implementation based on Moroz geodesic tracing. Uses NASA Goddard Milky Way skybox (svs.gsfc.nasa.gov/4851). Separate BlackHoleNumerics.js for geodesic calculations. Artistic (non-physical) volumetric accretion disk from Shadertoy.
- **What it does poorly**: Accretion disk is "definitely artistic and not physically based." Documentation is sparse.
- **Key technique**: Geodesic ray tracing in separate numerics module. NASA Milky Way panorama as skybox.
- **Our advantage**: Physically motivated accretion disk. Educational annotations. Single-file architecture.

### What no existing web interactive does (our unique value)

No existing WebGL black hole visualization combines:
1. Real-time Schwarzschild geodesic ray tracing with correct lensing
2. Interactive mass control that rescales all physics in real-time
3. Togglable accretion disk with Doppler boosting and gravitational redshift
4. Educational annotations (photon sphere, ISCO, shadow radius readouts)
5. COSMOS house style (info panel, controls bar, embed/fullscreen modes)

The closest is oseiskar/black-hole, but it lacks visual polish and educational framing. Bruneton is higher quality but not interactive (fixed parameters) and too complex to integrate. Our app sits between: oseiskar's physics + Bruneton's visual quality + COSMOS educational framing.

---

## Physics / Algorithm

### Core equation: photon geodesics in Schwarzschild spacetime

Using natural units where r_s = 1 (the Schwarzschild radius), the orbital equation for null geodesics (photons) in the equatorial plane, expressed in terms of u = 1/r, is:

```
d^2 u / d phi^2 = -u + (3/2) u^2        ... (Binet equation)
```

This is equivalent to the first-order form:

```
(du/dphi)^2 = (1/b^2) - u^2 + u^3        ... (first integral)
```

where b is the impact parameter of the ray.

### Initial conditions from camera ray

Given a camera at position p0, casting a ray in direction d0:

1. Compute the plane of the ray: the geodesic lies in the plane spanned by p0 and d0.
2. Build an orthonormal basis in this plane:
   - n = p0 / |p0| (radial unit vector)
   - t = ((n x d0) x n) / |...| (tangential unit vector)
3. Initial values:
   - u(0) = 1 / |p0|
   - du/dphi(0) = -u(0) * dot(d0, n) / dot(d0, t)
4. The impact parameter is b = 1 / sqrt((du/dphi)^2 + u^2 - u^3) (from the first integral at the initial point).

### Integration: Leapfrog (symplectic)

The Binet equation is integrated with a leapfrog (Stormer-Verlet) scheme:

```glsl
// Per step (step = delta_phi):
u += du * step;
float ddu = -u * (1.0 - 1.5 * u * u);
du += ddu * step;
phi += step;
```

Termination conditions:
- **Capture**: u > 1.0 (ray crosses event horizon, r < r_s). Color = black.
- **Escape**: u < 0.0 (ray has escaped to infinity). Sample background texture at final direction.
- **Max steps**: typically 200-400 steps. Adaptive step size: smaller near the BH (where curvature is high), larger far away.

Adaptive step size (ad hoc but effective):
```glsl
float step = 0.02 + 0.01 / (u * u + 0.001);
```

### Background sampling

When a ray escapes, reconstruct its 3D direction from (u, phi) in the ray's plane, then transform back to world coordinates. Sample an equirectangular Milky Way texture:

```glsl
vec2 uv = vec2(atan(dir.x, dir.y) / (2.0 * PI) + 0.5, asin(dir.z) / PI + 0.5);
color = texture(milkyWayTex, uv);
```

### Accretion disk

The disk lies in the equatorial plane (z=0). During ray integration, detect plane crossings:

```glsl
if (old_z * new_z < 0.0) {
    // Ray crossed z=0 between this step and last
    float r_cross = 1.0 / u_at_crossing;
    if (r_cross > r_ISCO) {
        // Hit the disk -- compute color
    }
}
```

Disk physics:
- **Inner edge**: r_ISCO = 3 r_s (in our units, r_ISCO = 3.0)
- **Outer edge**: arbitrary cutoff, e.g. r_outer = 20 r_s
- **Temperature**: T(r) proportional to (r/r_ISCO)^(-3/4) * f(r) where f(r) is the Novikov-Thorne stress-free boundary correction
- **Simplified temperature**: For visualization, T(r) ~ T_max * (r_ISCO / r)^(3/4) is sufficient
- **Color mapping**: Map temperature to RGB via a precomputed blackbody color ramp texture (hot = white-blue, warm = yellow-orange, cool = red-dark)
- **Doppler boosting**: The disk orbits at v_phi = sqrt(r_s / (2r)) = sqrt(1/(2r)) in our units. The Doppler factor delta = 1 / (gamma * (1 - v * cos(angle_to_observer))). Intensity scales as delta^3.
- **Gravitational redshift**: Additional factor of sqrt(1 - r_s/r) = sqrt(1 - 1/r) for photons escaping from radius r.

### Key radii summary (r_s = 1 units)

| Radius | Value | Significance |
|--------|-------|--------------|
| Event horizon | r = 1.0 | Point of no return |
| Photon sphere | r = 1.5 | Unstable circular photon orbits |
| ISCO | r = 3.0 | Inner edge of accretion disk |
| Shadow boundary | b = sqrt(27)/2 ~ 2.598 | Critical impact parameter |

### Numerical pitfalls

1. **Step size near photon sphere**: Rays with b ~ b_crit orbit many times before escaping or being captured. Need small steps (or many steps) to resolve this correctly. If steps are too large, rays that should barely escape get captured (or vice versa), smearing the photon ring.
2. **Coordinate singularity at u=0**: When u approaches 0 (ray escaping to infinity), the phi step size should be limited to prevent overshooting.
3. **Multiple disk crossings**: A single ray can cross the disk plane multiple times (the far side of the disk is visible above AND below the shadow). Must accumulate all crossings with alpha compositing.
4. **Performance**: At 200 steps per pixel, a 1920x1080 frame requires ~400M floating-point operations per frame. This is feasible on modern GPUs at 60fps, but a mass slider that triggers re-rendering must not cause stutter. Consider: (a) reducing resolution during slider drag, (b) precomputed deflection lookup table (Bruneton approach), or (c) fewer steps with larger step size away from the BH.

### Test values (for verifier cross-check)

- A ray at impact parameter b = 3.0 r_s should be deflected by approximately 1.22 radians (~70 degrees).
- A ray at b = b_crit = 2.598 r_s should orbit many times (theoretically infinite for exact b_crit).
- A ray at b = 5.0 r_s should be deflected by approximately 0.44 radians (~25 degrees).
- A ray at b = 10.0 r_s should be deflected by approximately 0.21 radians (~12 degrees).
- The weak-field limit: deflection ~ 2/b radians (in r_s = 1 units). At b = 100, deflection ~ 0.02 rad ~ 1.15 degrees.
- The shadow should subtend an apparent angular diameter of 2 * arcsin(b_crit / D) for an observer at distance D from the BH center. At D = 50 r_s, the shadow diameter is about 5.95 degrees.
- The accretion disk approaching side should be ~3-5x brighter than the receding side at the ISCO.

---

## Visual Targets

The visual quality bar for this app is set by three references:

1. **NASA SVS 14619** (accretion disk): The approaching side is dramatically brighter (white-blue). The disk appears to wrap around the shadow, visible both above and below. The photon ring is a thin bright ring at the shadow edge.

2. **Bruneton shader demo**: Correct star field distortion. Stars near the shadow edge are stretched tangentially. The Einstein ring is visible as a bright band of focused starlight. Gaia catalog background looks stunning.

3. **Interstellar/Gargantua**: The public's mental model. Our Schwarzschild version will be symmetric (no frame dragging), but the accretion disk wrapped above and below the shadow should evoke the same visual.

**Our render should achieve**: Pure black shadow disc, bright photon ring at the edge, visibly distorted starfield that "flows" around the shadow as the camera orbits, and (with disk on) a dramatically asymmetric accretion disk with clear blue-shifted bright side.

---

## Features & Controls

### Core features
- Real-time Schwarzschild gravitational lensing of background starfield
- Black hole shadow with photon ring at the boundary
- Distorted starfield showing Einstein ring when source is behind BH
- OrbitControls for camera (drag to orbit, scroll to zoom)

### Accretion disk mode (toggle)
- Thin disk from ISCO to outer radius
- Doppler-boosted: bright approaching side, dim receding side
- Gravitational redshift: inner regions redder
- Multiple images: disk visible above and below shadow
- Temperature-based color mapping (hot inner = white-blue, cool outer = red-dark)

### Controls bar
- **Mass slider**: 1 -- 100 M_sun (changes r_s, rescales all physics). Default: 10 M_sun.
- **Accretion Disk toggle**: on/off. Default: off (start with pure lensing).
- **Show Annotations toggle**: photon sphere circle, ISCO circle, shadow boundary label. Default: off.
- **Camera Distance readout**: in units of r_s.
- **Play/Pause button**: for accretion disk rotation animation.
- **Speed slider**: 0.1x -- 5.0x for disk rotation speed.

### Info panel readouts
- Mass: X M_sun
- Schwarzschild radius: X km
- Camera distance: X r_s
- Shadow angular diameter: X degrees

### Day mode
The article embedding this interactive will provide the educational context. The info panel in fullscreen mode gives the key physics quantities.

---

## Implementation Stages

### Stage 1: Schwarzschild lensing of starfield (CORE)
**Build**: Full-screen fragment shader that ray-traces each pixel through Schwarzschild geometry. Background is an equirectangular Milky Way texture (NASA Goddard deep star map or similar CC texture). Camera orbit via OrbitControls. Black shadow in the center, distorted stars around it.

**Pass criteria**:
- Black circular shadow visible in center of view
- Stars near the shadow edge are tangentially stretched/magnified
- Stars far from the shadow are minimally affected
- The shadow angular size matches b_crit / D for the camera distance
- Photon ring (thin bright band at shadow edge) is visible where background stars are focused
- Orbiting the camera shows the Einstein ring effect (bright ring of focused background light)
- No visual artifacts at the shadow boundary (no jagged edges, no missing pixels)

### Stage 2: Mass slider + annotations
**Build**: Add mass slider that rescales r_s. Add optional annotation overlays: photon sphere wireframe ring at 1.5 r_s, ISCO wireframe ring at 3 r_s. Add info panel with readouts.

**Pass criteria**:
- Increasing mass visibly enlarges the shadow
- Readouts update correctly (r_s in km, shadow diameter in degrees)
- Annotation rings are at the correct radii
- Performance remains smooth during slider interaction

### Stage 3: Accretion disk
**Build**: Add thin accretion disk in the equatorial plane (z=0). Detect disk plane crossings during ray integration. Color by temperature profile. Apply Doppler boosting for orbital motion. Apply gravitational redshift. Handle multiple plane crossings (disk visible above and below shadow).

**Pass criteria**:
- Disk is visible as a ring around the BH from edge-on view
- Disk wraps around the shadow (far side visible above and below) from inclined view
- Approaching side is distinctly brighter/bluer than receding side
- Inner edge at ISCO (no disk inside r = 3 r_s)
- Disk brightness and color are physically motivated (not just a flat texture)
- Multiple images of the disk are visible (primary image + one or two secondary images near the photon ring)

### Stage 4: Polish (controls, info panel, stars, credits)
**Build**: Add COSMOS house style: info panel (top-left), controls bar (bottom-center), embed/fullscreen modes. Two-layer star background (dim + bright with bloom). Play/pause for disk rotation. Speed slider. Bloom pass for photon ring glow. Final visual polish.

**Pass criteria**:
- Matches COSMOS house style (glass panels, Swinburne red accent, Open Sans)
- Bloom enhances photon ring and bright disk regions without washing out
- Embedded mode hides description, shows compact readouts
- Spacebar toggles play/pause
- All controls responsive, no stutter
- Star background visible where not distorted by BH

---

## Reference Implementations (for coder)

### Primary: oseiskar/black-hole
- **URL**: https://github.com/oseiskar/black-hole
- **Language**: JavaScript + GLSL (Three.js)
- **What to adopt**: The complete ray-tracing architecture. Key file: `raytracer.glsl`. The Binet equation integration: `u += du*step; ddu = -u*(1.0 - 1.5*u*u); du += ddu*step`. Initial conditions from camera ray (see physics.html). Accretion disk plane-crossing detection. Milky Way background texture sampling via equirectangular projection.
- **Physics doc**: https://oseiskar.github.io/black-hole/docs/physics.html
- **Caveats**: Use more integration steps than oseiskar (they acknowledge "light paths bend a bit more than they should" due to low step count). Use at least 200 steps.

### Secondary: Bruneton black_hole_shader (for optimization if needed)
- **URL**: https://github.com/ebruneton/black_hole_shader
- **Language**: C++ / JS / GLSL (WebGL2), BSD-3 license
- **What to adopt**: If per-frame ODE integration proves too slow, adopt Bruneton's precomputed deflection table approach. The key insight: precompute the total deflection angle as a function of impact parameter b, store in a 1D texture, and look up during rendering. This makes the shader O(1) per pixel instead of O(N_steps).
- **Paper**: arxiv.org/abs/2010.08735

### Tertiary: rantonels/starless (for accretion disk physics)
- **URL**: https://rantonels.github.io/starless/
- **Language**: Python (numpy)
- **What to adopt**: The accretion disk temperature and color model. Blackbody temperature T(r) ~ r^(-3/4). Color via Planck spectrum integration. Doppler factor delta. Alpha compositing of multiple disk images. The "magic potential" formulation as a cross-check.

### Key shader pseudocode

```glsl
// Fragment shader: for each pixel
void main() {
    vec3 rayOrigin = cameraPosition;
    vec3 rayDir = computeRayDirection(gl_FragCoord.xy, resolution, cameraMatrix);

    // Transform to ray-plane coordinates
    float r = length(rayOrigin);
    float u = 1.0 / r;
    vec3 n = normalize(rayOrigin);                    // radial
    vec3 t = normalize(cross(cross(n, rayDir), n));   // tangential
    float du = -u * dot(rayDir, n) / dot(rayDir, t);  // du/dphi
    float phi = 0.0;

    vec4 color = vec4(0.0);  // accumulated color (for disk compositing)

    for (int i = 0; i < MAX_STEPS; i++) {
        float old_u = u;
        float old_phi = phi;

        // Adaptive step size
        float step = 0.015 + 0.005 / (u * u + 0.0001);

        // Leapfrog integration
        u += du * step;
        float ddu = -u * (1.0 - 1.5 * u * u);
        du += ddu * step;
        phi += step;

        // Check capture (event horizon)
        if (u >= 1.0) {
            color = vec4(0.0, 0.0, 0.0, 1.0);  // black
            break;
        }

        // Check escape
        if (u <= 0.0) {
            // Reconstruct 3D direction from (phi) in ray plane
            vec3 dir = n * cos(phi) + t * sin(phi);
            // Transform to world coords, sample background
            color = mix(color, sampleBackground(dir), 1.0 - color.a);
            break;
        }

        // Check accretion disk crossing (if enabled)
        if (diskEnabled) {
            // Reconstruct 3D position
            vec3 pos = (n * cos(phi) + t * sin(phi)) / u;
            vec3 oldPos = (n * cos(old_phi) + t * sin(old_phi)) / old_u;
            if (pos.z * oldPos.z < 0.0) {
                // Crossed equatorial plane
                float r_cross = 1.0 / u;  // approximate
                if (r_cross > 3.0 && r_cross < outerDiskR) {
                    vec4 diskColor = computeDiskColor(r_cross, phi);
                    color = mix(color, diskColor, diskColor.a * (1.0 - color.a));
                }
            }
        }
    }

    gl_FragColor = color;
}
```

---

## Eye Candy & Verification Targets (for verifier)

### Visual targets
- **NASA SVS 14619**: "Our accretion disk render should match this brightness asymmetry and wrapped-disk geometry."
- **NASA SVS 14620**: "Our isolated BH (no disk) should show this quality of star distortion around the shadow."
- **Bruneton demo** (https://ebruneton.github.io/black_hole_shader/): "Our star field distortion quality should approach this level."
- **WRONG examples to avoid**: A flat black circle with no star distortion (shader not working). Symmetric accretion disk brightness (no Doppler). Disk that stops at the shadow edge instead of wrapping around. Square/pixelated photon ring.

### Physical correctness checks
- Shadow angular diameter should be 2 * arctan(b_crit / D) radians. At camera distance D = 30 r_s, this is ~9.9 degrees.
- The photon ring should be very thin (sub-pixel ideally) but bright at the shadow edge.
- With the disk on and viewed edge-on: the disk should appear as a line with the BH shadow cutting through it, and a second (inverted) image of the far-side disk visible above and below the shadow.
- Increasing mass should monotonically increase the shadow size.
- Stars directly behind the BH should be invisible (inside the shadow), but stars just outside the shadow edge should be magnified/brightened (gravitational magnification).
- The disk color temperature gradient should be visible: hotter (whiter) near ISCO, cooler (redder/orange) at larger radii.

---

## Textures / Assets Needed

| Asset | Source | Format | Notes |
|-------|--------|--------|-------|
| Milky Way panorama | NASA Goddard SVS 4851 (svs.gsfc.nasa.gov/4851) | Equirectangular JPEG/PNG | Public domain. The peabrainiac renderer uses this exact image. ~4K resolution sufficient. |
| Blackbody color ramp | Precompute or use Mitchell Charity's table | 1D texture (256x1 PNG) | Maps temperature (2000K-30000K) or Doppler factor to RGB. Can be generated procedurally. |
| Star catalog (optional) | Gaia DR3 (Bruneton uses this) | N/A | Only if we want individual rendered stars instead of a panorama texture. The panorama is simpler and sufficient. |

Note: No planet textures needed. The entire scene is procedural/shader-based except for the background sky texture and the color ramp.

---

## Complexity Estimate

**Hard** (500+ lines JS/GLSL). This is a custom fragment shader performing per-pixel ray tracing through curved spacetime. The physics is non-trivial (geodesic integration, Doppler boosting, gravitational redshift). The accretion disk requires plane-crossing detection and temperature-based coloring. However, the geometry is simple (no meshes beyond a full-screen quad + optional annotation rings), and the entire visualization is driven by a single shader pass.

Expected: ~300 lines GLSL (ray tracer) + ~300 lines JS (Three.js setup, controls, UI) + ~150 lines CSS/HTML = ~750 lines total.

---

## Closest Existing COSMOS App to Use as Template

**`gravitational-waves-interactive.html`** -- because:
1. Same physics-sim tier (GPU-computed physics, not just textured spheres)
2. Same UI pattern (info panel + controls bar + fullscreen/embed)
3. Uses Three.js with bloom post-processing
4. Has mass sliders with physics readouts
5. Demonstrates the COSMOS controls bar + readout pattern perfectly

The black hole app will replace the GW's spacetime mesh with a full-screen shader quad, but the HTML structure, CSS, embed detection, controls bar, and info panel can be copied directly.

**Key architectural difference**: The GW app animates Three.js geometry. The black hole app renders everything in a fragment shader on a full-screen quad. The Three.js scene will contain: (1) a fullscreen quad with the ray-tracing ShaderMaterial, (2) optional annotation rings as Three.js Line objects, (3) the bloom post-processing pipeline. OrbitControls will feed camera position/orientation into the shader as uniforms.

---

## Notes for CEO

### What went well
- The physics for Schwarzschild lensing is well-documented and there are multiple high-quality reference implementations to cross-check against. The Binet equation u'' = -u(1 - 1.5u^2) is elegant and efficient for GPU integration.
- The oseiskar/black-hole repo is an almost-complete reference: same framework (Three.js), same approach (GLSL ray tracing), and includes a detailed physics document. The coder has a working reference to compare against at every stage.
- Bruneton's precomputed table approach (arxiv 2010.08735) is a known fallback if real-time ODE integration proves too slow on lower-end GPUs.

### What is hard
- **Performance**: Per-pixel ODE integration is the most GPU-intensive shader we have attempted. At 200+ steps per pixel and 2M pixels, this is ~400M FP ops per frame. Modern discrete GPUs handle this easily, but integrated GPUs (MacBook Air, etc.) may struggle. The mass slider interaction is the stress test -- dragging it triggers continuous re-renders.
- **Photon ring quality**: Rays near the critical impact parameter orbit many times, requiring many integration steps to resolve correctly. The photon ring will be the hardest visual element to get right -- too few steps and it disappears or becomes jagged.
- **Accretion disk compositing**: A single ray can cross the disk plane 2-4 times (primary image, secondary image behind the BH, etc.). Correctly compositing these with alpha blending while maintaining the integration loop is tricky.
- **The full-screen shader approach is architecturally different from all other COSMOS apps**. Every other app uses Three.js geometry (spheres, particles, meshes). This app renders to a full-screen quad via a fragment shader. OrbitControls still works (it feeds camera uniforms to the shader), but the render pipeline is fundamentally different. The coder needs to be comfortable with ShaderMaterial + full-screen quads.

### What is missing
- I could not access Kelvin van Hoorn's supermassive black hole tutorial (server did not respond), which is reportedly a good step-by-step guide for this type of shader.
- The nilsvu/black-holes-playground is Swift/iPad only -- useful for inspiration but not directly portable. The oseiskar repo is a much better direct reference.
- I have not specified the exact Milky Way background texture to use. The NASA SVS 4851 panorama is the best candidate (public domain, used by peabrainiac), but the coder should verify the resolution and format work with Three.js texture loading.

### Pitfalls for coder
1. **Do NOT use Euler integration** for the Binet equation. Euler is not symplectic and will cause the ray to spiral inward or outward over many steps. Leapfrog (Stormer-Verlet) is the minimum. RK4 is overkill but safe.
2. **The Binet equation uses u = 1/r with r_s = 1 units.** Do not mix coordinate systems. All shader math should be in these natural units. Convert to physical units only for the readouts.
3. **The accretion disk is in the equatorial plane, but the camera can be anywhere.** The shader must handle the full 3D geometry of the ray plane intersection with the z=0 plane, not assume any special camera orientation.
4. **Multiple disk images are physically real and expected.** A ray that passes behind the BH crosses the disk plane twice (once on the way in, once on the way out). Near the photon sphere, rays can cross 3-4 times. The code must handle all crossings, not just the first.
5. **Bloom will interact with the photon ring.** The photon ring is a very thin, very bright feature. With bloom, it should produce a soft glow extending outward from the shadow boundary. This is actually desirable (it matches reality). But bloom threshold must be tuned so the ring glows without washing out the star field.
6. **Background texture resolution matters.** A low-res Milky Way texture will look blurry when magnified by gravitational lensing near the shadow edge. Use at least 4K (4096x2048) equirectangular.
7. **The Doppler factor calculation for the disk requires knowing the orbital velocity direction relative to the ray direction at the crossing point.** This is not trivial in the rotated ray-plane coordinate system. Carefully transform between the ray plane and the disk plane.
