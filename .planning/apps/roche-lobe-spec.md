# Roche Lobe Interactive -- Build Spec

## Overview

A 3D interactive visualization of the Roche potential in a close binary star system. The user sees two orbiting stars surrounded by their teardrop-shaped Roche lobes, rendered as translucent equipotential surfaces. Sliders control the mass ratio and stellar fill factor. When a star fills its Roche lobe, a particle stream flows through the L1 Lagrange point toward the companion, forming an accretion disk. A 2D panel shows the equipotential contour map in the orbital plane with Lagrange points marked. The user can toggle between a "potential surface" view (translucent lobes + contours) and a "glowing gas" view (emissive particles tracing the mass transfer stream and accretion disk). This is a Hard tier app -- the most physics-dense COSMOS interactive yet, combining isosurface rendering, particle dynamics, and real-time potential field computation.

---

## Fact Sheet

### Key Numbers

| Property | Value | Source |
|----------|-------|--------|
| Roche potential (co-rotating frame) | Phi = -q/((q+1) r1) - 1/((q+1) r2) - 0.5(x^2 + y^2) | Rozwadowski (GitHub); standard textbook form |
| Eggleton 1983 Roche lobe radius | r_L/a = 0.49 q^(2/3) / (0.6 q^(2/3) + ln(1 + q^(1/3))) | Eggleton 1983, ApJ 268, 368 |
| Eggleton accuracy | Better than 1% for all q in (0, infinity) | Eggleton 1983 |
| L1 position (approximate, M2 << M1) | r_L1 ~ a * (mu/3)^(1/3), mu = M2/(M1+M2) | Wikipedia: Lagrange point |
| L4, L5 positions | Equilateral triangle vertices with the two masses | Standard celestial mechanics |
| L4/L5 stability condition | M1/M2 > 24.96 | Lagrange stability theorem |
| Circularization radius | R_circ = a * (1 + q) * (0.5 - 0.227 log10(q))^4 | Verbunt & Rappaport 1988 |
| Stream velocity at L1 | v ~ c_s (sound speed at L1) ~ few km/s | Frank, King & Raine, Ch.4 |
| Typical Algol system | M1=3.17 Msun, M2=0.70 Msun, P=2.87d, q=0.22 | Standard reference |
| AM Her / Polar (no disk) | B ~ 10-200 MG, direct stream to magnetic pole | Warner 1995, CV book |

### Notes

- The Roche potential is defined in the **co-rotating frame** where both stars are stationary. In this frame, the effective potential includes gravitational terms from both masses plus a centrifugal term from the frame rotation.
- The dimensionless form places the two masses at x = 1/(q+1) and x = -q/(q+1) with unit separation, where q = M2/M1 is the mass ratio.
- Lagrange points L1, L2, L3 lie along the x-axis (line joining the stars). L4, L5 are at the equilateral triangle vertices.
- The **critical equipotential** passes through L1. The volume enclosed by this surface on each side defines the Roche lobe.
- Material that overflows the Roche lobe through L1 cannot return -- it is captured by the companion's gravitational well.
- The mass stream is approximately **ballistic** after leaving L1. Angular momentum conservation prevents direct radial infall; instead, the stream overshoots and wraps around the accretor, forming an accretion disk at the circularization radius.
- The "Algol paradox" (less massive star is more evolved) is explained by prior mass transfer -- the originally more massive star donated mass to its companion via Roche lobe overflow.
- Accretion disk temperature increases inward (T ~ r^(-3/4)); the inner disk radiates in X-rays for compact accretors.

### Roche Potential Levels and Topology

| Potential level | Surface shape |
|----------------|---------------|
| Deep inside (Phi << Phi_L1) | Nearly spherical around each star |
| Approaching Phi_L1 | Teardrop / pear-shaped, elongated toward companion |
| At Phi_L1 (critical) | Figure-of-eight; the two Roche lobes meet at L1 |
| Between Phi_L1 and Phi_L2 | Single dumbbell-shaped surface enveloping both stars |
| At Phi_L2 | Surface pinches off at L2; material beyond escapes |
| Beyond Phi_L2 | Open equipotentials; unbound material |

---

## State-of-the-Art Survey

### Visual Reference 1: artist rendering of rochelobe transfer in x-ray binary
- **Source**: university researcher
- **URL**: https://vikdhillon.staff.shef.ac.uk/seminars/ras/xrb.html
- **What it does well**: beautiful rendering of scene, with light shining onto companion star.
- **What it does poorly**: image only
- **Our advantage**: Full 3D visualization with equipotential surfaces. Particle stream shows mass transfer, not just test particle trajectories. Accretion disk formation.

### Visual Reference 2: Wolfram Demonstrations -- Trajectory of a Test Mass in a Roche Potential
- **Source**: Wolfram Demonstrations Project
- **URL**: https://demonstrations.wolfram.com/TrajectoryOfATestMassInARochePotential/
- **What it does well**: Interactive particle trajectory in the Roche potential. User adjusts mass ratio, initial position, and velocity. Shows the effective potential contour underneath. Excellent pedagogical tool for understanding the restricted three-body problem.
- **What it does poorly**: 2D only (orbital plane). Mathematica CDF player required. No 3D surface. No accretion disk.
- **Key technique**: Numerical ODE integration of equations of motion in the co-rotating frame, with Coriolis and centrifugal forces.
- **Our advantage**: Full 3D visualization with equipotential surfaces. Particle stream shows mass transfer, not just test particle trajectories. Accretion disk formation.


### Visual Reference 3: Penn State ASTRO 801 -- Roche Lobe Wireframe
- **Source**: University educational material
- **URL**: https://courses.ems.psu.edu/astro801/content/l6_p6.html
- **What it does well**: Clear 3D wireframe representation of the Roche potential showing the "gravitational wells" of each star and the saddle point at L1. Good pedagogical explanation of how Roche lobe overflow works.
- **What it does poorly**: Static wireframe image. No interactivity. Dated visual quality.
- **Key technique**: 3D surface plot of -Phi(x,y) (inverted so wells appear as actual depressions).
- **Our advantage**: Interactive 3D. Smooth isosurface rendering with translucency and bloom. Mass transfer particles.

### Visual Reference 4: rozwadowski/Roche-lobe (GitHub)
- **Source**: GitHub research code
- **URL**: https://github.com/rozwadowski/Roche-lobe
- **What it does well**: Clean Python implementation of the Roche potential with contour plots and volume calculation. The Roche potential formula is clear and validated. Animated GIFs show lobes reshaping as q varies. Computes Lagrange points via numerical derivative.
- **What it does poorly**: Matplotlib only; no 3D interactivity. Low resolution. No mass transfer visualization.
- **Key technique**: Grid evaluation of Phi(x,y,0), contourf at Phi_L1, numerical L-point finding via derivative zero-crossing.
- **Our advantage**: Port the exact same potential formula to WebGL. Add 3D isosurface, particle stream, and real-time interaction.

### Visual Reference 5: COSMOS Binary Star Interactive (our own)
- **Source**: Existing COSMOS app
- **URL**: `experimental/binary-star-interactive.html`
- **What it does well**: Two orbiting stars with adjustable mass ratio. RV + light curve panels. Established COSMOS visual style. Bloom, star shaders, orbit trails.
- **What it does poorly**: No Roche lobes, no equipotentials, no mass transfer.
- **Key technique**: Two-body Kepler orbit, luminance-tint star shader, 2D canvas panels.
- **Our advantage**: This IS our template. We add Roche lobes as isosurfaces around each star, a 2D equipotential contour panel, and a particle mass transfer stream.

---

## Physics / Algorithm

for source code see also: https://github.com/morganemacleod/RLOF/

### 1. Coordinate System

**Co-rotating frame** with the binary. The orbital plane is the XZ plane (COSMOS convention: Y is up, camera default from +Y).

- Origin at the center of mass.
- Binary separation normalized to a = 1 (dimensionless units).
- Star 1 (mass M1) at position x1 = 1/(1+q), where q = M2/M1.
- Star 2 (mass M2) at position x2 = -q/(1+q).
- Angular velocity Omega = 1 (unit orbital frequency in dimensionless units).

### 2. Roche Potential

In the co-rotating frame, the effective potential at point (x, y, z) is:

```
Phi(x,y,z) = -q / ((q+1) * r1) - 1 / ((q+1) * r2) - 0.5 * (x^2 + y^2)
```

where:
```
r1 = sqrt((x - 1/(q+1))^2 + y^2 + z^2)    // distance to star 1
r2 = sqrt((x + q/(q+1))^2 + y^2 + z^2)     // distance to star 2
```

**Source**: rozwadowski/Roche-lobe (GitHub), validated against PyAstronomy's `rochepot_dl()`.

The three terms are:
1. Gravitational potential of star 1 (mass fraction q/(q+1))
2. Gravitational potential of star 2 (mass fraction 1/(q+1))
3. Centrifugal potential from co-rotating frame

**IMPORTANT**: For the visualization, we compute -Phi (negate) so that the potential surface appears as a "landscape" with wells where the stars are (intuitive for users). The isosurface level for the Roche lobe is at -Phi_L1.

### 3. Finding Lagrange Points

**L1** (between the stars): Solve dPhi/dx = 0 along the x-axis (y=z=0), between x2 and x1.

```
dPhi/dx = q/((q+1)) * (x - 1/(q+1)) / r1^3 + 1/((q+1)) * (x + q/(q+1)) / r2^3 - x = 0
```

On the x-axis with y=z=0:
```
r1 = |x - 1/(q+1)|
r2 = |x + q/(q+1)|
```

Use bisection or Newton-Raphson to find x_L1 in the interval (x2, x1). Convergence is fast (10 iterations sufficient).

**L2** (beyond star 2, away from star 1): Solve dPhi/dx = 0 for x < x2. Search in (-2, x2).

**L3** (beyond star 1, away from star 2): Solve dPhi/dx = 0 for x > x1. Search in (x1, 2).

**L4, L5**: At equilateral triangle vertices:
```
x_L4 = x_L5 = 0.5 - q/(1+q)   // = (1 - 2q) / (2(1+q)) when M1 at origin shifted
L4: (x_L4, 0, +sqrt(3)/2)      // above orbital plane
L5: (x_L5, 0, -sqrt(3)/2)      // below orbital plane
```

**Note**: In our coordinate system with COM at origin, M1 at x=1/(1+q), M2 at x=-q/(1+q), and the orbital plane in XZ:
```
L4 = (0.5 - q/(1+q), 0, +sqrt(3)/2)
L5 = (0.5 - q/(1+q), 0, -sqrt(3)/2)
```

### 4. Equipotential Contour Map (2D Panel)

Evaluate Phi(x, 0, z) on a grid (orbital plane, y=0) and draw contours. Key contour levels:

| Level | Meaning | Color |
|-------|---------|-------|
| Phi_L1 | Roche lobe boundary (critical) | Bright white/yellow |
| Phi_L2 | Outer Lagrange point | Dimmer |
| Phi_L3 | Opposite Lagrange point | Dimmer |
| Several between Phi_max and Phi_L1 | Interior equipotentials | Faint |
| Several between Phi_L1 and Phi_L2 | Exterior equipotentials | Faint |

Mark L1-L5 positions with small symbols. Mark star positions with larger symbols.

Grid resolution: 200x200 is sufficient for smooth contours at 280x280 canvas.

### 5. Roche Lobe Isosurface (3D)

We render the critical equipotential surface Phi = Phi_L1 as a translucent 3D mesh using marching cubes.

**Approach A -- Three.js MarchingCubes addon**:
```javascript
import { MarchingCubes } from 'three/addons/objects/MarchingCubes.js';
```
The built-in `MarchingCubes` uses `addBall()` for 1/r^2 metaballs, which is NOT the Roche potential (it lacks the centrifugal term). We need `setCell()` to fill a custom scalar field.

**Approach B -- Custom marching cubes** (recommended):
Evaluate Phi on a 3D grid (resolution 48-64 per axis), extract the isosurface at Phi_L1 using the classic marching cubes algorithm. This gives us full control over the potential formula and isosurface level.

**Implementation**:
1. Allocate a Float32Array of size N^3 (N=48 for performance, 64 for quality).
2. For each grid point (i,j,k), compute Phi(x,y,z).
3. Extract the isosurface at level Phi_L1 using marching cubes (edge table + tri table lookup).
4. Build a THREE.BufferGeometry from the resulting vertices and faces.
5. Render with translucent MeshPhysicalMaterial (transmission + opacity).
6. Recompute when q changes (cache the grid for the current q).

**Performance note**: A 48^3 grid = 110,592 evaluations. Each evaluation is ~20 floating-point operations. This takes <5ms on modern hardware. Marching cubes extraction is similarly fast. Recomputing on slider change is feasible at interactive rates.

**Alternative (simpler but less accurate)**: Use the Eggleton formula to compute the lobe radius, approximate the lobe shape as a deformed sphere using a parametric formula:
```
r(theta) = r_L * f(theta, q)
```
where f accounts for the pear shape. This avoids marching cubes entirely but is less physically accurate and cannot show nested equipotentials. Use this as a Stage 1 fallback.

### 6. Stellar Fill Factor and Mass Transfer Onset

Define the **fill factor** f = R_star / R_Roche. When f >= 1.0, the star fills its Roche lobe and mass transfer begins.

- f < 0.8: Star is well within its Roche lobe. No mass transfer.
- 0.8 <= f < 1.0: Star is approaching its Roche lobe. Show the star expanding toward the lobe surface.
- f >= 1.0: Roche lobe overflow! Activate mass transfer particles.

The user controls f via a "Fill Factor" slider (0.3 to 1.2). The star's visual radius = f * R_Roche.

### 7. Mass Transfer Stream (Particle System)

When fill factor >= 1.0, particles are emitted from the L1 point and follow ballistic trajectories in the co-rotating frame.

**Equations of motion in the co-rotating frame** (2D, orbital plane):
```
x'' = 2 * Omega * z' - dPhi/dx
z'' = -2 * Omega * x' - dPhi/dz
```

The first terms (2 Omega z', -2 Omega x') are the **Coriolis acceleration**. The gradient terms are the combined gravitational + centrifugal force.

**Numerical integration**: Use Velocity Verlet or RK4 with dt = 0.001 (dimensionless). Each particle is integrated for ~2 orbital periods before being recycled.

**Initial conditions at L1**:
- Position: (x_L1, 0, 0)
- Velocity: Small perturbation toward star 2, v ~ (0, 0, -0.01 to -0.05) in dimensionless units. Add slight random scatter for visual richness.

**Particle rendering**: Use ShaderMaterial with `makeCircleMat` (circular particles, mandatory per style guide). Color gradient from cool (donor side, orange/red) to hot (accretor side, blue-white). Additive blending for glow.

**Particle count**: 500-1000 active particles. Emit 5-10 per frame. Recycle when particles reach the accretion disk radius or leave the simulation volume.

### 8. Accretion Disk (Simplified)

The mass stream does not fall directly onto the accretor. Angular momentum conservation causes it to circularize at the **circularization radius**:

```
R_circ / a ~ (1 + q) * (0.500 - 0.227 * log10(q))^4
```

(Verbunt & Rappaport 1988 approximation.)

For the visualization, render the accretion disk as:
1. A flat ring of particles (TorusGeometry or particle ring) at R_circ around star 2.
2. Particles in the ring orbit with Keplerian velocity, color-coded by temperature (hotter = bluer toward center).
3. The stream particles, when they reach ~R_circ, are absorbed into the disk.

**Simpler alternative**: Skip the full ballistic trajectory computation. Instead, draw a curved tube (TubeGeometry along a precomputed Bezier path from L1 to the disk) with animated particles flowing along it. This is visually effective and much simpler to implement.

### 9. Speed and Time

- Orbital period P_BASE = 6 seconds at 1x speed (slower than binary-star's 4s because there is more to observe).
- Speed options: 0.2x, 0.5x, 1x, 3x, 10x.
- Stars orbit their COM on circular orbits (e=0 for simplicity -- eccentric Roche lobes are much harder and rarely shown).
- Roche lobes co-rotate with the stars (they are defined in the co-rotating frame).

---

## Features & Controls

### 3D Scene (center/left)
- Two orbiting stars (luminance-tint shader from binary-star app)
- Translucent Roche lobe isosurfaces around each star
- L1-L5 markers (small dots + CSS2D labels)
- Mass transfer particle stream (when fill factor >= 1)
- Accretion disk (when mass transfer active)
- Star background (two-layer, per style guide)
- Orbit trails (optional toggle)

### 2D Panel: Equipotential Contour Map (top-right)
- Canvas panel showing Phi(x, 0, z) contours in the orbital plane
- Roche lobe boundary highlighted (thick line)
- L1-L5 positions marked
- Star positions marked
- Updates when q changes
- Playhead dot showing current star positions

### Info Panel (top-left)
- Title: "Roche Lobe Overflow"
- Readouts:
  - Mass ratio q: [value]
  - Fill factor: [value]
  - L1 position: [value] a
  - Roche lobe radius: [value] a (Eggleton)
  - Mass transfer: Active / Inactive
  - Mode: Potential / Gas

### Controls Bar (bottom center)
- Play/Pause button (spacebar toggles)
- Speed selector (0.2x, 0.5x, 1x, 3x, 10x)
- Mass ratio q slider: 0.1 to 1.0, step 0.05, default 0.5
- Fill factor slider: 0.3 to 1.2, step 0.05, default 0.8
- Mode toggle: "Potential" / "Gas" (switches rendering style)
- Checkbox: Orbits (show/hide orbit trails)
- Checkbox: Labels (show/hide L-point labels)
- Presets dropdown:
  - "Algol-like" (q=0.22, fill=1.05)
  - "Equal masses" (q=1.0, fill=0.7)
  - "Extreme ratio" (q=0.1, fill=1.1)
  - "Detached" (q=0.5, fill=0.5)
  - "Contact binary" (q=0.8, fill=1.2)

### View Modes

**Potential mode** (default):
- Translucent equipotential surfaces (Roche lobes)
- Wireframe or solid with alpha=0.15
- 2D contour panel prominent
- Stars visible through the translucent lobes
- L-point markers visible
- Color: pale blue/cyan for the equipotential surfaces

**Gas mode**:
- Roche lobe surfaces hidden or very faint (alpha=0.03)
- Mass transfer stream rendered as glowing particles (orange -> white -> blue)
- Accretion disk as a bright particle ring
- More bloom (strength 0.6 vs 0.35)
- Stars glow brighter
- Dramatic, visually stunning mode

### Day Mode (info panel for article)
- Static view at default parameters
- Brief explanation of what the Roche lobe is
- No animation needed

---

## Implementation Stages

### Stage 1: Two orbiting stars with Roche lobe shapes (no marching cubes)
**What to build**: Two stars orbiting their COM (reuse binary-star orbital mechanics). Approximate each Roche lobe as a deformed sphere using the Eggleton radius + an analytical pear-shape formula:
```javascript
function rocheRadius(theta, q) {
  const rE = eggleton(q); // Eggleton formula
  // Approximate shape: larger toward L1, smaller on back side
  // Use a Legendre polynomial fit or simple cos(theta) deformation
  return rE * (1 + 0.2 * Math.cos(theta)); // placeholder
}
```
Render each lobe as a custom SphereGeometry with vertex positions deformed by rocheRadius. Translucent material. Add L1-L5 labels. Add 2D contour panel (grid evaluation of Phi).

**Pass criteria**:
- Two stars orbit at correct positions for given q
- Roche lobe shapes visually change with q (larger lobe for more massive star)
- L1 point is between the stars, closer to the less massive star
- 2D contour panel shows correct figure-of-eight at the critical level
- Eggleton radius matches tabulated values to 1%

**Test values**:
| q | r_L/a (Eggleton) | x_L1 (approx) |
|---|-------------------|----------------|
| 0.1 | 0.238 | ~0.717 |
| 0.3 | 0.344 | ~0.618 |
| 0.5 | 0.401 | ~0.556 |
| 1.0 | 0.500 | ~0.500 |

### Stage 2: True marching cubes isosurface
**What to build**: Replace the deformed-sphere approximation with a proper marching cubes extraction of the Phi = Phi_L1 isosurface. Implement the marching cubes algorithm (edge table, tri table, interpolation). Compute on a 48^3 grid. Rebuild geometry when q changes.

**Pass criteria**:
- Isosurface matches the classic Roche lobe shape (teardrop, pointed at L1)
- The two lobes meet at L1 with a cusp/pinch point
- Shape is symmetric about the orbital plane (XZ)
- Performance: grid recomputation + mesh extraction < 50ms
- Visual: smooth surface with correct normals

### Stage 3: Mass transfer particle stream
**What to build**: When fill factor >= 1.0, emit particles from L1. Integrate ballistic trajectories in the co-rotating frame (gravity + Coriolis + centrifugal). Particles follow a curved stream from donor to accretor. Use circular ShaderMaterial particles with color gradient.

**Pass criteria**:
- Stream curves AWAY from the line joining the stars (Coriolis deflection)
- Stream wraps around the accretor in the prograde direction
- Particles are emitted from L1, not from the star surface
- Stream direction is from the star that fills its lobe toward the companion
- Color: warm (donor side) to hot (accretor side)
- No particles escape to infinity (recycle at boundary)

### Stage 4: Accretion disk
**What to build**: When particles reach the circularization radius, they join a ring of orbiting particles around the accretor. The ring is rendered as circular particles in Keplerian orbits with slight random thickness. Hot spot where the stream impacts the disk.

**Pass criteria**:
- Disk orbits in the prograde direction (same sense as the binary orbit)
- Disk radius approximately matches R_circ from Verbunt & Rappaport formula
- Hot spot visible at the stream-disk impact point
- Disk does not extend beyond the accretor's Roche lobe

### Stage 5: Gas mode toggle + visual polish
**What to build**: Implement the "Gas" vs "Potential" mode toggle. Gas mode: hide isosurfaces, boost bloom, make particles brighter and more numerous. Potential mode: show isosurfaces, standard bloom, particles subdued. Add presets. Tune bloom, colors, translucency.

**Pass criteria**:
- Both modes look visually compelling (not just functional)
- Gas mode: bloom creates a dramatic glow around the stream and disk
- Potential mode: lobes are clearly visible, stars visible through them
- Smooth transition between modes (opacity fade, not instant switch)
- All presets produce recognizable astrophysical configurations

### Stage 6: Polish (controls, info panel, stars, credits, embed mode)
**What to build**: Full controls bar, info panel with live readouts, embedded mode CSS, credit line, spacebar toggle, resize handler. Match binary-star-interactive.html house style exactly.

**Pass criteria**:
- All controls work (sliders, presets, toggles)
- Readouts update in real-time
- Embedded mode hides title/description, shrinks panels
- Spacebar toggles play/pause
- No console errors
- Performance: 60fps on mid-range hardware

---

## Reference Implementations (for coder)

### 1. rozwadowski/Roche-lobe (Python)
- **URL**: https://github.com/rozwadowski/Roche-lobe
- **What to adopt**: The exact Roche potential formula `PHI(x,y,z)`. The coordinate convention (star 1 at x=1/(q+1), star 2 at x=-q/(q+1)). The Lagrange point finder (derivative zero-crossing along x-axis).
- **Port to JS**:
```javascript
function rochePotential(x, y, z, q) {
  const x1 = 1.0 / (q + 1);   // star 1 position
  const x2 = -q / (q + 1);     // star 2 position
  const r1 = Math.sqrt((x - x1)**2 + y**2 + z**2);
  const r2 = Math.sqrt((x - x2)**2 + y**2 + z**2);
  const phi1 = -q / ((q + 1) * r1);
  const phi2 = -1.0 / ((q + 1) * r2);
  const phi3 = -0.5 * (x * x + y * y);  // centrifugal (y is in orbital plane here)
  return phi1 + phi2 + phi3;
}
```
**IMPORTANT coordinate mapping**: In the reference code, x and y are in the orbital plane, z is perpendicular. In COSMOS convention, x and z are in the orbital plane (XZ), y is up. The coder must map: reference (x,y,z) -> COSMOS (x, z_cosmos, y_cosmos). Specifically: evaluate the potential with `rochePotential(x, z_scene, y_scene, q)` where x is along the binary axis, z_scene is the other orbital-plane axis, and y_scene is perpendicular to the orbital plane.

### 2. PyAstronomy Roche module
- **URL**: https://pyastronomy.readthedocs.io/en/latest/pyaslDoc/aslDoc/aslExt_1Doc/roche.html
- **What to adopt**: `rochepot_dl()` for cross-checking potential values. `roche_yz_extent()` for verifying lobe dimensions. The module validates our formula.

### 3. Three.js MarchingCubes
- **URL**: https://threejs.org/docs/pages/MarchingCubes.html
- **What to adopt**: Use `setCell(i, j, k, value)` to fill a custom scalar field, or implement standalone marching cubes. The built-in `addBall()` uses 1/r^2, which is NOT the Roche potential -- do NOT use it. Use `setCell()` to write Phi values directly into the grid, then call `update()`.
- **Alternative**: The Stemkoski marching cubes demo (https://stemkoski.github.io/Three.js/Marching-Cubes.html) shows a clean standalone implementation with custom scalar fields. This may be easier to adapt than the Three.js addon.

### 4. Eggleton 1983 formula
- **Source**: ApJ 268, 368
```javascript
function eggleton(q) {
  // Returns r_L / a for the primary's Roche lobe
  const q23 = Math.pow(q, 2/3);
  const q13 = Math.pow(q, 1/3);
  return 0.49 * q23 / (0.6 * q23 + Math.log(1 + q13));
}
```
For the secondary's Roche lobe, use q_inv = 1/q and multiply by q/(1+q) * a:
```javascript
function eggletonSecondary(q) {
  return eggleton(1/q);  // swap roles
}
```

### 5. Ballistic stream equations of motion
- **Source**: Frank, King & Raine, "Accretion Power in Astrophysics," Ch.4
```javascript
// In co-rotating frame (Omega = 1):
// x'' = 2 * z' + dPhi/dx   (Coriolis + effective force)
// z'' = -2 * x' + dPhi/dz
//
// Note sign convention: Phi is negative, so gradient points
// away from minima. Use numerical gradient.
function streamAcceleration(x, z, vx, vz, q) {
  const dx = 0.001;
  const dPhidx = (rochePotential(x+dx, 0, z, q) - rochePotential(x-dx, 0, z, q)) / (2*dx);
  const dPhidz = (rochePotential(x, 0, z+dx, q) - rochePotential(x, 0, z-dx, q)) / (2*dx);
  // Equations of motion (note: our Phi includes centrifugal term)
  // The gradient of Phi gives gravitational + centrifugal force
  // Coriolis terms: 2*Omega cross v = (2*vz, 0, -2*vx) for Omega along y
  const ax = 2 * vz - dPhidx;   // Coriolis x + gravity+centrifugal x
  const az = -2 * vx - dPhidz;  // Coriolis z + gravity+centrifugal z
  return [ax, az];
}
```

**CAUTION**: The sign conventions here depend on how Phi is defined. The rozwadowski code defines Phi with all negative terms (gravitational wells are negative). The gradient of this Phi points TOWARD the stars (toward lower potential). The equations of motion in the co-rotating frame are:
```
acceleration = -gradient(Phi_eff) + 2*(v cross Omega)
```
where Phi_eff = -Phi_grav - Phi_centrifugal. Since our Phi already includes the centrifugal term with a negative sign, the effective force is -dPhi/dx (negate the gradient). Test this carefully: a particle released at L1 with a small nudge toward star 2 should curve in the prograde direction (positive Coriolis deflection).

### 6. COSMOS Binary Star Interactive (template)
- **URL**: `experimental/binary-star-interactive.html`
- **What to adopt**: Entire HTML/CSS structure. Star shader. Orbit computation. 2D canvas panel pattern. Controls bar. Bloom setup. Embedded mode detection. Resize handler. Play/pause with spacebar.

---

## Eye Candy & Verification Targets (for verifier)

### Physical Correctness Checks

1. **L1 position**: For q=1, L1 is at the midpoint (x=0). For q=0.1, L1 is ~72% of the way from COM to star 1 (closer to the less massive star). Verify against table in Stage 1.

2. **Roche lobe shape**: The lobe around the more massive star is LARGER. For q=1 (equal masses), both lobes are identical. The lobes are teardrop-shaped, pointed toward each other at L1.

3. **Contour topology**: At the critical potential (Phi_L1), the contour forms a figure-of-eight. Below that level (deeper potential), contours are separate closed curves around each star. Above that level (less negative), contours envelop both stars.

4. **Mass transfer direction**: Material flows FROM the star that fills its Roche lobe (the donor, which we make star 1 for simplicity) THROUGH L1 TOWARD star 2 (the accretor). The stream curves in the prograde direction due to Coriolis force. If the stream goes the wrong way, the signs are wrong.

5. **Accretion disk rotation**: The disk orbits in the SAME direction as the binary orbit (prograde). If it orbits retrograde, something is wrong with the angular momentum computation.

6. **L4/L5 positions**: Should form equilateral triangles with the two stars. Verify visually and numerically.

7. **Symmetry**: The Roche potential and lobes should be symmetric about the orbital plane (reflection symmetry in y). The 3D isosurface should be mirror-symmetric above and below the orbital plane.

### Visual Quality Checks

1. **Translucent lobes**: Must not be opaque (stars should be visible through them). Must not be invisible (alpha too low). Target: alpha 0.10-0.20 with slight fresnel effect (brighter at edges).

2. **Particle stream**: Must be visually smooth (no gaps, no clumps). Circular particles (no squares). Color gradient should be visible.

3. **Gas mode**: Should look dramatically different from Potential mode. Bloom should create visible glow around the stream and disk. Stars should be brighter.

4. **2D contour panel**: Contour lines should be smooth (not jagged). Critical contour should be clearly distinguished from others. L-points should be clearly marked.

5. **No visual artifacts**: No z-fighting between isosurface and stars. No bloom artifacts on UI panels. No dotted lines (no Line2 with transparency).

### Gold Standard References
- **"Our Roche lobes should look like"**: The Wikipedia 3D wireframe + the Penn State wireframe, but rendered as smooth translucent surfaces with bloom.
- **"Our mass transfer stream should look like"**: The NC State / Blondin hydrodynamic simulations -- a curved stream from L1 wrapping around the accretor.
- **"This is WRONG"**: A straight line from one star to the other (no Coriolis deflection). Lobes that are spherical (not teardrop). Stream going from accretor to donor (wrong direction).

---

## Textures/Assets Needed

- Sun texture for both stars: `assets/textures/planets/web/8k_sun.jpg` (already available in the project; used by binary-star-interactive.html with luminance-tint shader to color by temperature)
- No additional textures needed. All geometry is procedural.

---

## Complexity Estimate

**Complex (800+ lines JS)**. This app combines:
- Roche potential evaluation (custom scalar field)
- Marching cubes isosurface extraction (either custom or Three.js addon)
- Particle system with physics integration (Coriolis + gravity in co-rotating frame)
- 2D contour plot computation and rendering
- Two rendering modes (Potential / Gas)
- Multiple interactive controls

This is significantly more complex than the binary star app (~500 lines) due to the isosurface rendering and particle physics.

---

## Closest Existing COSMOS App to Use as Template

**`experimental/binary-star-interactive.html`** -- because:
1. Same physical setting (two orbiting stars in a binary system)
2. Same HTML/CSS architecture (info panel + 2D canvas panel + controls bar + 3D scene)
3. Same star rendering (luminance-tint shader on sun texture)
4. Same orbital mechanics (two-body COM orbit, Kepler solver)
5. We literally extend the binary star app by adding Roche lobes, mass transfer, and the contour panel

The coder should **start from a copy** of binary-star-interactive.html and add the Roche-specific features on top.

---

## Notes for CEO

### What went well
- The Roche potential formula is well-established and there are multiple validated reference implementations (PyAstronomy, rozwadowski/Roche-lobe, pyroche). The physics is solid.
- The binary-star-interactive.html is an excellent template -- it already has two orbiting stars, bloom, the star shader, and the panel architecture. This app extends it naturally.
- Three.js has built-in marching cubes support (`MarchingCubes` addon with `setCell()`), which could simplify the isosurface rendering significantly.

### What was hard
- No existing WebGL/Three.js Roche lobe interactive was found anywhere. This will be the first browser-based interactive Roche lobe visualization with real-time mass transfer. Zero prior art in JavaScript.
- The ballistic stream trajectory is the trickiest part. Sign conventions for the Coriolis force in the co-rotating frame are notoriously error-prone. The spec includes detailed sign analysis, but the coder should test carefully: a particle nudged from L1 toward star 2 should curve prograde, not retrograde.
- The marching cubes isosurface is a moderate implementation effort. The Three.js `MarchingCubes` addon uses `setCell()` but is designed for metaballs, not arbitrary scalar fields -- it may need some coaxing. A standalone marching cubes implementation (porting the Stemkoski approach) might be cleaner.

### What is missing
- The mass transfer rate formula (Mdot as a function of how much the star overflows) is not included because it is not needed for the visualization -- we simply turn particles on/off based on the fill factor slider. A future enhancement could add a readout showing Mdot.
- Eccentric orbits are excluded. Roche lobes are only rigorously defined for circular orbits. Adding eccentricity would require time-dependent Roche geometry, which is a research-level problem.
- No limb darkening or gravity darkening on the donor star. The star fills its Roche lobe but is rendered as a sphere, not as a tidally distorted shape. A future enhancement could deform the star mesh to match the Roche lobe surface when fill factor > 0.8.

### Pitfalls for the coder
1. **Coordinate mapping**: The reference code uses (x,y) as the orbital plane, z as perpendicular. COSMOS uses (x,z) as the orbital plane, y as up. The coder MUST swap y and z when evaluating the potential.
2. **Sign conventions in the equations of motion**: The Coriolis term is 2*(v cross Omega). With Omega along +y (COSMOS up), the cross product gives specific signs for x and z components. Get this wrong and the stream curves the wrong way. Test against: "stream should curve prograde (counterclockwise from above)."
3. **Marching cubes resolution vs performance**: 64^3 = 262,144 evaluations. This is fine once, but if the user drags the q slider continuously, it must recompute every frame. Use 48^3 for real-time updates, 64^3 for final quality after slider release.
4. **Isosurface normals**: Marching cubes produces triangles but not smooth normals. Compute normals from the gradient of Phi at each vertex for smooth shading. Without this, the lobes will look faceted.
5. **The built-in Three.js `MarchingCubes.addBall()` computes 1/r^2 falloff, not the Roche potential.** Do not use `addBall()`. Use `setCell()` to fill the grid manually, or implement standalone marching cubes.
6. **Particle recycling**: Without recycling, the simulation accumulates particles and slows down. Particles should be recycled when they (a) reach the disk, (b) fall onto the accretor, or (c) leave the simulation box.
7. **The contour panel must recompute when q changes** but NOT every frame (it is static for a given q). Cache the contour data and only recompute on slider change.

---

## Appendix: Marching Cubes Pseudocode

For the coder's reference, the marching cubes algorithm in brief:

```
For each cube (8 corner values from the scalar field):
  1. Determine which corners are inside (value < isolevel) vs outside
  2. This gives an 8-bit index into the edge table (256 entries)
  3. The edge table tells which of the 12 edges are intersected
  4. For each intersected edge, interpolate the vertex position:
     v = v0 + (isolevel - val0) / (val1 - val0) * (v1 - v0)
  5. The triangle table gives which vertices form triangles (up to 5 per cube)
  6. Emit the triangles
```

The standard lookup tables (edgeTable[256] and triTable[256][16]) are available from Paul Bourke's website and many GitHub implementations. The Stemkoski Three.js demo includes a clean JS port.

---

## Appendix: Sensible Defaults for First Load

The app should show mass transfer on first load (this is the key feature):
- q = 0.5 (moderate mass ratio, clear asymmetry in lobe sizes)
- Fill factor = 1.05 (star slightly overflowing, stream visible)
- Mode = Potential (show the lobes; user can toggle to Gas)
- Speed = 0.5x (slow enough to see the stream)
- Camera: slightly elevated (30-40 degrees above orbital plane) to see both the 3D lobes and the stream trajectory
- Auto-rotate enabled by default (slow orbit around the system)

---

## User-directed changes (Interactive Mode, 2026-03-29)

### Change 1: Donor star must look like a star
The overfilling donor star must be **visibly stellar** — yellow/orange, bloomy, glowing. Currently it's too dim/geometric. Use a luminance-tint shader or bright MeshBasicMaterial with a warm colour that triggers bloom. It's a star — it should glow.

### Change 2: Accretion disk built by gas physics, not pre-populated
**Current problem:** The accretion disk particles are pre-populated in Keplerian orbits — they magically appear. The stream particles just orbit the accretor frictionlessly.

**Required behaviour — gas physics, not just orbits:**
1. The accretion disk starts **empty** (no pre-populated particles)
2. Gas particles flow from L1 along the ballistic stream
3. When a stream particle reaches the vicinity of the accretor, it **impacts the accretion disk** at the circularisation radius
4. At the impact point, a **hotspot** forms — a bright glowing region where kinetic energy dissipates
5. The particle's mass is **added to the disk** — the disk grows over time as mass accumulates
6. The disk is NOT frictionless: viscous dissipation causes gas to **spiral inward** through the disk toward the accretor
7. Gas reaching the inner disk edge **accretes onto the compact object**, releasing energy
8. The accretion disk has a **temperature profile**: T(r) ∝ r^(-3/4) — hotter (bluer/whiter) near the accretor, cooler (redder) at the outer edge
9. The accretion luminosity L_acc = GM_accretor × Mdot / (2 R_inner) should be displayed as a readout

**Implementation approach:**
- Track disk as a set of annular rings (not individual particles), each with a mass and temperature
- Stream particles impact at R_circ, depositing mass into that ring
- Viscous spreading: each timestep, mass moves inward (and some outward) between rings — use simple alpha-disk viscosity
- Inner ring mass accretes onto compact object → luminosity readout
- Render disk as particles coloured by local temperature (blackbody colour ramp)
- The hotspot is a bright glow at the azimuthal angle where the stream meets the disk outer edge

### Change 3: Hotspot at stream-disk impact
Where the ballistic stream hits the outer disk edge:
- A **bright hotspot** (white-yellow glow, ~2× the local disk brightness)
- The hotspot position is fixed in the co-rotating frame (it's always where the stream arrives)
- Hotspot size ≈ H (disk scale height) ≈ a few % of disk radius
- The stream kinetic energy dissipates here — this is often the brightest point in the system

### Change 4: Auto-rotate
- Enable slow auto-rotation by default (OrbitControls autoRotate)
- User can still drag to override

### Summary of physics flow
```
Donor overflows Roche lobe
  → Gas streams through L1 (ballistic trajectory with Coriolis)
  → Stream impacts disk at circularisation radius → HOTSPOT
  → Mass added to outer disk ring
  → Viscous spreading moves mass inward through disk
  → Inner disk accretes onto compact object → releases energy (L_acc readout)
  → Disk colour: T(r) ∝ r^(-3/4) — hot inner (blue-white) to cool outer (red-orange)
```
