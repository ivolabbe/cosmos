# Large-Scale Structure Interactive — Build Spec

## Overview

A Three.js fly-through of the cosmic web: tens of thousands of particles representing dark matter and baryonic matter evolving from a nearly uniform density field (z = 10) to the filamentary cosmic web we observe today (z = 0). The user navigates through filaments, voids, and galaxy clusters with depth fog providing a sense of immense scale. A time slider scrubs from z = 10 to z = 0, showing structure growth in real time via the Zel'dovich approximation. A toggle switches between dark matter (showing the full particle set) and baryonic matter (showing only the density peaks where galaxies form). Scale markers and an info panel provide physical context. This is COSMOS's most ambitious interactive — a genuine cosmological simulation running in the browser.

---

## Fact Sheet

### Key Cosmological Parameters (Planck 2018, base LCDM)

| Property | Value | Source |
|----------|-------|--------|
| Hubble constant | H_0 = 67.4 +/- 0.5 km/s/Mpc | Planck 2018 VI (arXiv:1807.06209) |
| Total matter density | Omega_m = 0.315 +/- 0.007 | Planck 2018 VI |
| Baryon density | Omega_b = 0.049 +/- 0.001 | Planck 2018 VI |
| Dark matter density | Omega_c = 0.266 | Omega_m - Omega_b |
| Dark energy density | Omega_Lambda = 0.685 | 1 - Omega_m |
| Amplitude of fluctuations | sigma_8 = 0.811 +/- 0.006 | Planck 2018 VI |
| Spectral index | n_s = 0.965 +/- 0.004 | Planck 2018 VI |
| Baryon fraction | f_b = Omega_b / Omega_m ~ 0.156 | Derived |
| BAO sound horizon | r_s ~ 147 Mpc (comoving) | Planck 2018 VI |
| Age of Universe | 13.80 +/- 0.02 Gyr | Planck 2018 VI |

### Characteristic Scales of the Cosmic Web

| Structure | Typical scale | Volume fraction (z=0) | Mass fraction (z=0) | Source |
|-----------|---------------|----------------------|---------------------|--------|
| Voids | 20-50 Mpc diameter | ~77% | ~15% | Cautun+ 2014, Libeskind+ 2018 |
| Walls/sheets | 5-20 Mpc thickness | ~18% | ~24% | Cautun+ 2014 |
| Filaments | 30-80 Mpc length, ~2 Mpc radius | ~6% | ~50% | Tempel+ 2014, Rost+ 2020 |
| Nodes/clusters | 1-5 Mpc extent | <0.1% | ~11% | Cautun+ 2014 |
| BAO scale | ~150 Mpc comoving | - | - | Eisenstein+ 2005 |
| Supercluster spacing | 120-140 h^-1 Mpc | - | - | Einasto+ 2025 |

### Notes

- The cosmic web is the result of gravitational instability acting on primordial density perturbations set by inflation.
- At z ~ 10, the density field is nearly uniform (delta_rho/rho ~ 0.01). By z = 0, the density contrast in filaments is 1-100 and in cluster cores exceeds 200.
- Dark matter dominates structure formation (Omega_c / Omega_m ~ 0.84). Baryons fall into dark matter potential wells after decoupling.
- The Zel'dovich approximation (1970) captures the essential physics of structure formation in the quasi-linear regime: particles move along straight trajectories determined by the initial displacement field, scaled by the linear growth factor D(z).
- Shell-crossing occurs when particle trajectories intersect, forming the caustics that become filaments, walls, and clusters. The ZA produces pancake-like structures first (walls), then filaments, then nodes — matching the observed morphological sequence.
- The approximation breaks down after shell-crossing (in the fully non-linear regime), but for a pedagogical visualization the visual result is excellent: a realistic-looking cosmic web forms from uniform initial conditions.

### Physics Context (for article writer)

The large-scale structure of the Universe — the cosmic web — is one of the most striking predictions of the cold dark matter model. Starting from tiny density fluctuations imprinted during inflation and measured in the cosmic microwave background, gravity amplifies these fluctuations over billions of years into the vast network of filaments, walls, voids, and galaxy clusters that define the Universe on scales of tens to hundreds of megaparsecs. Roughly half of all matter in the Universe resides in filaments — thread-like structures connecting massive galaxy clusters. Between these filaments lie enormous voids, nearly empty regions tens of megaparsecs across that collectively occupy most of the volume of the Universe. The cosmic web is shaped almost entirely by dark matter, which outweighs ordinary (baryonic) matter by a factor of five. Galaxies, which we observe, are merely luminous tracers that have condensed within the dark matter scaffolding.

---

## State-of-the-Art Survey

### Reference 1: NASA SVS — "Cruising the Cosmic Web"
- **URL**: https://svs.gsfc.nasa.gov/14598
- **Source**: NASA Scientific Visualization Studio
- **What it does well**: Stunning fly-through based on a full cosmological N-body simulation. The camera cruises at ~20 Mly/s through a 437 Mly box. White/bright shows dense baryonic regions (galaxies); purple shows dark matter filaments. Excellent depth cues, scale conveyed viscerally.
- **What it does poorly**: Pre-rendered video — not interactive. No time evolution. No user control of camera or parameters.
- **Key technique**: Volume rendering of density field from N-body simulation (Illustris or similar). Separate colour channels for dark matter and baryons.
- **Our advantage**: Interactive fly-through with user-controlled camera. Time evolution slider. Toggle between DM and baryons in real time.

### Reference 2: Illustris Explorer
- **URL**: https://www.illustris-project.org/explorer/
- **Source**: Illustris Project / MIT-Harvard CfA
- **What it does well**: Deep-zoom browser interface for the Illustris simulation. Three.js + Leaflet for pan/zoom. Shows a 15 Mpc/h thick projection of the full simulation box. Can drill down to individual halos. Colour encodes gas temperature, density, metallicity.
- **What it does poorly**: 2D projection only — no true 3D fly-through. Requires server-side rendering for deep zoom. Large data volumes.
- **Key technique**: Server-rendered tiles (like Google Maps) with Three.js/WebGL overlays.
- **Our advantage**: True 3D with fly-through camera. Procedural generation (no server dependency). Time evolution. Runs entirely client-side.

### Reference 3: Kim Albrecht — "The Network Behind the Cosmic Web"
- **URL**: https://cosmicweb.kimalbrecht.com/
- **Source**: Kim Albrecht / Barabasi Lab / Scientific American
- **What it does well**: Beautiful interactive network visualization of 24,000 galaxies with 100,000+ connections. Three different cosmic web models compared. Elegant visual design. Pan, zoom, filter. Published in Scientific American.
- **What it does poorly**: Network/graph representation, not a true 3D point cloud. No time evolution. No physics — purely topological.
- **Key technique**: Force-directed graph layout in WebGL. Colour-coded connections.
- **Our advantage**: Physically motivated 3D distribution from ZA, not a graph. Time evolution shows structure actually forming. DM vs baryon toggle.

### Reference 4: Map of the Universe (Johns Hopkins)
- **URL**: https://mapoftheuniverse.net/
- **Source**: Brice Menard & Nikita Shtarkman, Johns Hopkins University
- **What it does well**: 200,000 SDSS galaxies shown at their actual 3D positions with real colours. Beautiful colour gradient from nearby spirals (blue) through distant ellipticals (yellow) to high-z quasars (blue again). Smooth scrolling from local to cosmological scales.
- **What it does poorly**: 2D wedge/slice projection, not 3D. No fly-through. No time evolution. Static.
- **Key technique**: D3.js-like scroll-driven visualization with SDSS photometric data.
- **Our advantage**: True 3D with camera navigation. Time evolution. Shows the physics of structure formation, not just a map.

### Reference 5: Andrew Campbell — WebGL N-body Galaxy Sim
- **URL**: https://andrewdcampbell.github.io/galaxy-sim-report
- **Source**: Stanford University CS project
- **What it does well**: Real-time N-body simulation in WebGL with 20,000 particles. GPU-accelerated gravity. Beautiful particle rendering with bloom. Smooth 60 fps.
- **What it does poorly**: Galaxy-scale (single galaxy), not cosmological. No cosmic web. No redshift evolution.
- **Key technique**: GPU compute for N-body gravity (Barnes-Hut). Points with circular particle shader and additive blending.
- **Our advantage**: Cosmological scale. Time evolution. Cosmic web topology. Educational labelling. The particle rendering technique is directly applicable.

### Reference 6: Existing COSMOS — Satellites Interactive
- **URL**: `experimental/satellites-interactive.html`
- **Source**: This project
- **What it does well**: 14,875 satellite orbits + 14,587 debris points rendered as colour-coded point clouds with toggles. ShaderMaterial with round particles, altitude-dependent size and brightness. Smooth performance. Clean toggle UI.
- **What it does poorly**: Earth-scale, not cosmological. No time evolution. No physics simulation.
- **Key technique**: BufferGeometry + ShaderMaterial for large point clouds. Toggle visibility per category. Additive blending for density visualization.
- **Our advantage**: The satellites app proves our architecture handles large point clouds. We adopt the same ShaderMaterial + toggle pattern for the LSS app.

### What no existing tool does (our unique value)

No existing browser-based interactive combines:
1. A true 3D fly-through of the cosmic web with physically motivated particle positions
2. A time slider showing structure formation from z = 10 to z = 0
3. A real-time toggle between dark matter and baryonic matter distributions
4. Scale markers providing physical context (Mpc)
5. All of this running client-side with no server dependency

This combination — watching the cosmic web form from nothing and flying through it — is what makes this app extraordinary.

---

## Physics / Algorithm

### The Zel'dovich Approximation (ZA)

The ZA is the first-order Lagrangian perturbation theory for cosmological structure formation. Each particle's comoving position x at time t (or redshift z) is:

```
x(q, t) = q + D(t) * Psi(q)
```

where:
- `q` = initial (Lagrangian) position on a regular grid
- `D(t)` = linear growth factor, normalized so D(z=0) = 1
- `Psi(q)` = displacement field, computed from the initial density perturbations

The displacement field is the gradient of the gravitational potential:

```
Psi(q) = -nabla Phi(q)
```

where Phi is determined by the initial density field delta(q) via the Poisson equation:

```
nabla^2 Phi(q) = delta(q)
```

### Computing the Displacement Field

In Fourier space, the displacement field for mode k is:

```
Psi_hat(k) = -i * k / |k|^2 * delta_hat(k)
```

where delta_hat(k) is the Fourier transform of the initial density field.

The initial density field is a Gaussian random field with power spectrum P(k):

```
|delta_hat(k)|^2 = P(k) = A * k^n_s * T^2(k)
```

where T(k) is the transfer function (we use a simplified Eisenstein-Hu fitting formula or simply a power-law with exponential cutoff for visual purposes).

### Simplified Implementation for Browser

For a pedagogical visualization, we do NOT need a full FFT-based power spectrum. Instead, we use a **multi-scale Gaussian random field** approach:

```javascript
// Generate displacement field from superposition of random Fourier modes
// Each mode has a random direction, amplitude drawn from P(k), and random phase
function generateDisplacementField(N_particles, boxSize, N_modes) {
  const psi_x = new Float32Array(N_particles);
  const psi_y = new Float32Array(N_particles);
  const psi_z = new Float32Array(N_particles);

  for (let m = 0; m < N_modes; m++) {
    // Random wavevector
    const k_mag = k_min + Math.random() * (k_max - k_min);
    const theta = Math.acos(2 * Math.random() - 1);
    const phi = Math.random() * 2 * Math.PI;
    const kx = k_mag * Math.sin(theta) * Math.cos(phi);
    const ky = k_mag * Math.sin(theta) * Math.sin(phi);
    const kz = k_mag * Math.cos(theta);

    // Amplitude from power spectrum: P(k) ~ k^n * exp(-k^2 / k_damp^2)
    const amplitude = Math.sqrt(powerSpectrum(k_mag)) / Math.sqrt(N_modes);
    const phase = Math.random() * 2 * Math.PI;

    for (let i = 0; i < N_particles; i++) {
      const dot = kx * q_x[i] + ky * q_y[i] + kz * q_z[i];
      const cosine = Math.cos(dot + phase);
      // Displacement is -i * k/|k|^2 * delta, real part:
      const factor = amplitude * cosine / (k_mag * k_mag);
      psi_x[i] += kx * factor;
      psi_y[i] += ky * factor;
      psi_z[i] += kz * factor;
    }
  }
  return { psi_x, psi_y, psi_z };
}
```

**Performance note**: With N_particles = 50,000 and N_modes = 40-60, this loop is ~2-3 million iterations. Precompute once at init (takes ~0.5-1s). The time slider only scales by D(z), which is instant.

### Simplified Power Spectrum

For visual correctness without exact cosmological precision:

```javascript
function powerSpectrum(k) {
  // CDM-like: rises as k^n_s at low k, turns over and falls at high k
  const n_s = 0.965;
  const k_eq = 0.01;  // Mpc^-1, matter-radiation equality scale
  const T_k = 1.0 / (1.0 + (k / k_eq) ** 2);  // simplified transfer function
  return Math.pow(k, n_s) * T_k * T_k;
}
```

This produces the correct qualitative shape: more power on large scales, suppressed on small scales (due to radiation damping). The exact transfer function shape is not critical for visual quality.

### Linear Growth Factor D(z)

For a flat LCDM universe (Omega_m + Omega_Lambda = 1), a good approximation (Carroll, Press & Turner 1992):

```javascript
function growthFactor(z) {
  const a = 1.0 / (1.0 + z);
  const Omega_m_z = Omega_m / (Omega_m + Omega_Lambda * a * a * a);
  const Omega_L_z = 1.0 - Omega_m_z;
  // Approximate growth factor (Carroll+ 1992, eq. 29):
  const D = (5.0 / 2.0) * Omega_m_z / (
    Math.pow(Omega_m_z, 4.0/7.0) - Omega_L_z + (1.0 + Omega_m_z / 2.0) * (1.0 + Omega_L_z / 70.0)
  );
  return D * a;  // unnormalized; we normalize to D(0) = 1
}

// Normalize
const D0 = growthFactor(0);
function D_normalized(z) {
  return growthFactor(z) / D0;
}
```

### Test values for D(z)

| z | D(z)/D(0) | Note |
|---|-----------|------|
| 0 | 1.000 | Present day — full cosmic web |
| 0.5 | 0.773 | Structure partially developed |
| 1 | 0.613 | Half the present amplitude |
| 2 | 0.394 | Early web forming |
| 5 | 0.155 | Faint filaments emerging |
| 10 | 0.079 | Nearly uniform — barely any structure |

The coder MUST verify these values from the growth factor formula before proceeding. At z = 10, displacements should be ~8% of their z = 0 values, making the distribution nearly uniform.

### Baryon Distribution

Baryons trace dark matter on large scales but are biased toward density peaks. For the visualization:

```
baryon_visible(i) = local_density(i) > density_threshold
```

In practice: compute a local density estimate for each particle (count neighbours within a smoothing radius). Show only particles above a threshold when "Baryons" mode is selected. This mimics the observational reality that galaxies (baryons) are found only at density peaks.

**Simple implementation**: At z = 0, sort particles by local density. The top ~16% (matching f_b ~ Omega_b / Omega_m) are "baryonic" and shown in baryon mode. The rest are "dark matter only." At higher z, the threshold shifts because fewer regions are above the collapse threshold.

### Depth Fog

Depth fog is essential for conveying 3D structure in a large point cloud:

```javascript
scene.fog = new THREE.FogExp2(0x000000, fogDensity);
```

The fog density should scale with the box size so that particles at ~1/2 box distance are significantly faded. For a 200 Mpc box: `fogDensity ~ 0.008` (in Three.js units where 1 unit = 1 Mpc).

### Scale Markers

3D wireframe cubes or gridlines at known intervals:
- 50 Mpc grid (main)
- 150 Mpc highlight (BAO scale — show as a distinct coloured wireframe sphere or cube)

---

## Implementation Stages

### Stage 1: Static cosmic web at z = 0
**Build:** Generate ~50,000 particles on a regular 3D grid (cube root ~37 per axis) spanning a 200 Mpc comoving box. Apply the Zel'dovich displacement field (40-60 random Fourier modes with CDM-like power spectrum, amplitude calibrated so sigma_8 ~ 0.8 equivalent visual contrast). Render with `THREE.Points` + `ShaderMaterial` (circular particles per style guide). Depth fog. Fly-through camera (OrbitControls with large maxDistance, or FlyControls for true fly-through). Background stars (two-layer per style guide). Pure black background.

**Key details:**
- Box: 200 Mpc comoving, centered at origin. Particles span [-100, +100] in each axis.
- Grid: ~37^3 = 50,653 particles. Each starts at grid position q_i.
- Displacement: precomputed at init. At z = 0, x_i = q_i + D(0) * Psi(q_i) = q_i + Psi(q_i).
- Power spectrum: use simplified CDM P(k) with n_s = 0.965 and transfer function turnover.
- Amplitude calibration: scale Psi so that the RMS displacement is ~5-10 Mpc (produces visible filaments without excessive shell-crossing artifacts).
- Particle colour: white/light blue base. Brightness proportional to local density (brighter in filaments/clusters, dimmer in voids).
- Particle size: 0.3-0.5 Mpc (sizeAttenuation: true). Smaller in dense regions, larger in sparse regions (counterintuitive but prevents overlapping blobs in clusters — per LEARNINGS "bloom via size not brightness").
- Fog: `FogExp2(0x000000, 0.008)` — particles beyond ~150 Mpc significantly faded.
- Camera: start at [0, 0, 120], looking at origin. OrbitControls with minDistance = 5, maxDistance = 250.

**Pass criteria:** Cosmic web structure visible — filaments, voids, and dense knots clearly distinguishable. Not a uniform scatter. Not a single blob. The structure should qualitatively resemble N-body simulation outputs (filamentary network with voids). 60 fps with 50K particles. No console errors.

### Stage 2: Time evolution slider (z = 10 to z = 0)
**Build:** A slider in the controls bar labelled "Redshift" (or "Cosmic Time") ranging from z = 10 (left) to z = 0 (right), default z = 0. Moving the slider updates all particle positions in real time:

```javascript
x_i = q_i + D(z) * Psi_i
```

Since Psi_i is precomputed, this is just a scalar multiply + add on the position array — extremely fast.

**Key details:**
- Slider: range 0 to 10, step 0.1, displayed as "z = X.X". Invert display so left = z = 10 (early), right = z = 0 (now).
- Position update: modify the BufferGeometry position attribute directly, then set `needsUpdate = true`.
- At z = 10: D ~ 0.08, so displacements are ~8% of z = 0 values. Distribution is nearly uniform grid.
- At z = 0: D = 1.0, full cosmic web.
- Readout: show z, corresponding lookback time, and scale factor a = 1/(1+z).
- Lookback time: approximate using standard LCDM formula or precomputed table.
- Optional: "Play" button that auto-scrubs from z = 10 to z = 0 over ~10 seconds.

**Pass criteria:** At z = 10, particles form a nearly uniform distribution (faint grid visible). As z decreases, structure progressively emerges — first faint walls, then filaments, then dense clusters. At z = 0, full cosmic web. Transition is smooth with no popping or discontinuities.

### Stage 3: Dark matter vs. baryons toggle
**Build:** A toggle in the controls bar: "Dark Matter" / "Baryons" (or "All Matter" / "Galaxies").

**Key details:**
- **Dark matter mode** (default): all ~50,000 particles visible. Colour: purple/violet (#8844cc) with brightness modulated by local density. This represents the full matter distribution.
- **Baryon mode**: only the densest ~16% of particles visible (threshold based on local density at current z). Colour: warm white/gold (#ffeedd). These represent galaxies — luminous matter tracing the densest regions of the dark matter web.
- Local density estimation: at init, for each particle at z = 0, count neighbours within a smoothing radius of ~5 Mpc. Store as a per-particle density value. Use this to rank particles for the baryon threshold.
- At higher z, fewer particles exceed the density threshold (fewer collapsed structures), so baryon mode shows fewer points — physically correct.
- Smooth transition: when toggling, fade opacity over 200ms.
- The density calculation only needs to be done at z = 0 (rank order is approximately preserved across z for the ZA).

**Pass criteria:** In DM mode, the full web is visible with filaments and voids. In baryon mode, only the densest knots and filament spines are visible — the voids appear truly empty. The contrast between the two modes viscerally demonstrates that galaxies are the "tip of the iceberg."

### Stage 4: Scale markers and grid
**Build:** Visual scale references embedded in the 3D scene.

**Key details:**
- **Grid lines**: subtle wireframe grid at 50 Mpc intervals across the box. Use `THREE.LineSegments` with dashed material, very low opacity (0.15). Colour: `#666666`.
- **BAO scale indicator**: a wireframe sphere or cube of radius/side 75 Mpc (~150 Mpc diameter), positioned at center. Colour: `#4488cc` at opacity 0.2, dashed. Label: "BAO scale ~150 Mpc".
- **Axis labels**: "50 Mpc" markers along edges using CSS2DObject.
- **Distance ruler**: a small fixed-screen-position scale bar (HTML overlay) showing the projected length of 50 Mpc at the current zoom level, similar to the asteroid belt distance scale.
- Toggle: checkbox to show/hide grid and scale markers. Default: ON.

**Pass criteria:** Grid provides spatial reference without visual clutter. BAO sphere is visible but unobtrusive. Scale bar updates correctly with zoom.

### Stage 5: Depth fog control and camera improvements
**Build:** Polish the 3D navigation and visual depth cues.

**Key details:**
- **Fog slider**: range from 0 (no fog) to 1 (maximum fog). Default: 0.5. Maps to `FogExp2` density parameter.
- **Fly-through mode**: add a "Fly" button that switches from OrbitControls to a simple auto-pilot camera path (spline through the box). The camera moves at ~10 Mpc/s through the densest filament, giving a NASA-SVS-style fly-through experience. Play/Pause controls the fly-through.
- **Camera speed control**: when in fly-through mode, slider from 0.5x to 5x speed.
- **Particle brightness boost in fly-through**: when the camera is inside the web (distance to nearest dense region < 20 Mpc), increase nearby particle size slightly for immersion.

**Pass criteria:** Fog enhances depth perception without washing out the scene. Fly-through follows a visually interesting path through filaments. Camera transitions smoothly between orbit and fly modes.

### Stage 6: Info panel, readouts, and polish
**Build:** Standard COSMOS info panel and final visual polish.

**Key details:**
- **Info panel** (top-left):
  - Title: "The Cosmic Web"
  - Description: "Dark matter filaments connecting galaxy clusters — the largest structures in the Universe."
  - Hint: "Drag to orbit | Scroll to zoom | Slider to travel through cosmic time"
  - Readouts:
    - Redshift: z = X.X
    - Lookback time: X.X Gyr
    - Scale factor: a = X.XX
    - Mode: Dark Matter / Baryons
    - Visible particles: XX,XXX
    - Box size: 200 Mpc comoving
- **Colour legend**: small colour bar showing density scale (DM: dark purple to bright purple; Baryons: dim gold to bright white).
- **Controls bar**: Play/Pause (for auto-evolution), Speed (0.5x-3x), Redshift slider, DM/Baryon toggle, Grid toggle, Fog slider.
- **Bloom**: subtle, strength 0.3, radius 0.5, threshold 0.6 — only the brightest cluster nodes glow.
- **Embed mode**: hide description and hint. Compact readout only. Fog default slightly higher (fewer distant particles rendered helps perf in iframe).
- **Play/Pause + Spacebar**: auto-scrub from z = 10 to z = 0 over ~15 seconds. Spacebar toggles.

**Pass criteria:** All readouts update correctly. Embed mode works. Performance maintained at 60 fps. Visual quality comparable to or exceeding the Kim Albrecht cosmic web visualization.

### Stage 7: Annotations and educational overlays
**Build:** Optional educational overlays toggled via checkbox.

**Key details:**
- **Structure labels**: when enabled, CSS2DObject labels appear at the densest cluster node ("Galaxy Cluster"), along the most prominent filament ("Filament"), in the centre of the largest void ("Void ~40 Mpc"), and on a wall-like region ("Wall/Sheet").
- **BAO annotation**: when the BAO scale sphere is visible and labels are on, a brief explanation appears: "The BAO scale (~150 Mpc) is imprinted by sound waves in the early Universe."
- **"What am I seeing?"** overlay: a small toggle that shows a 3-sentence explanation panel in the centre of the screen, then fades after 5 seconds.

**Pass criteria:** Labels are positioned at physically meaningful locations. They do not overlap or clutter. They hide cleanly in embed mode.

---

## Features & Controls

### 3D Scene (full viewport)
- 50,000 particle cosmic web from Zel'dovich approximation
- Depth fog for scale perception
- 50 Mpc grid lines (toggleable)
- BAO scale sphere (toggleable)
- Distance scale bar (HTML overlay)
- Two-layer background stars

### Controls (bottom bar)
- **Play/Pause** button (auto-evolution z = 10 to z = 0)
- **Speed** selector (0.5x, 1x, 3x)
- **Redshift** slider (z = 10 to z = 0)
- **Dark Matter / Baryons** toggle
- **Grid** checkbox
- **Labels** checkbox
- **Fog** slider (0-1)

### Info Panel (top-left)
- Title: "The Cosmic Web"
- Description and hint (fullscreen only)
- Readouts: z, lookback time, a, mode, particle count, box size

---

## Verification Requirements

### Physics checks (for verifier)

1. **Nearly uniform at z = 10**: When the slider is at z = 10, the particle distribution should appear nearly uniform — no large-scale structure visible, just a faint regular-ish grid with tiny perturbations. The RMS displacement should be ~8% of the z = 0 value.
2. **Progressive structure formation**: As z decreases from 10 to 0, structure should emerge in the physically correct order: first faint walls/sheets, then filaments, then dense cluster nodes. NOT clusters first.
3. **Filamentary topology**: At z = 0, the cosmic web should show the characteristic topology: thin filaments connecting dense nodes, surrounding large empty voids. NOT a random scatter. NOT a single central blob.
4. **Void dominance**: Voids should occupy most of the volume. The visual impression should be "mostly empty with a network of filaments," not "mostly filled."
5. **BAO scale**: The 150 Mpc reference sphere should visually span a significant fraction of the 200 Mpc box (~75% of the box side length). This provides physical context.
6. **Baryon mode**: In baryon mode, only the densest regions should be visible. Voids should appear completely empty. Filament spines should be thinner/sparser than in DM mode.
7. **Growth factor values**: D(z=10)/D(0) should be ~0.08. D(z=2)/D(0) should be ~0.39. Verify with the readout.
8. **Cosmological parameters**: Readout should show physically correct lookback times: z = 0 -> 0 Gyr, z = 1 -> ~7.7 Gyr, z = 2 -> ~10.3 Gyr, z = 5 -> ~12.5 Gyr, z = 10 -> ~13.2 Gyr.

### Visual checks (for verifier)

1. Cosmic web structure is visually striking and clearly filamentary at z = 0.
2. The visual quality is comparable to or better than the Kim Albrecht cosmic web network visualization.
3. Depth fog creates a strong sense of 3D depth — near particles bright, distant particles faded.
4. Dark matter mode (purple) and baryon mode (gold/white) are visually distinct.
5. Grid lines are subtle and do not overwhelm the scene.
6. Background stars present, bloom subtle (not overwhelming).
7. Fly-through (if implemented) is smooth and visually engaging.
8. Performance: 60 fps with 50K particles.
9. Particles are circular (ShaderMaterial), NOT square (PointsMaterial).
10. Labels and scale markers are readable but unobtrusive.

---

## Eye Candy & Visual Targets

### Reference images

1. **NASA SVS "Cruising the Cosmic Web"**: https://svs.gsfc.nasa.gov/14598 — The gold standard for cosmic web fly-throughs. Our fly-through mode should capture this aesthetic: bright nodes, purple filaments, deep black voids.
2. **Illustris TNG visualizations**: https://www.tng-project.org/ — Their media page shows the cosmic web at various scales and times. Our z = 0 should qualitatively match these: filaments connecting massive clusters.
3. **Kim Albrecht cosmic web**: https://cosmicweb.kimalbrecht.com/ — Our baryon mode should match this aesthetic: bright connected nodes on a dark background.
4. **Map of the Universe**: https://mapoftheuniverse.net/ — Colour palette inspiration: the warm-to-cool gradient as a function of distance/redshift.

### What WRONG looks like
- **Uniform random scatter**: If the displacement field has too little power or wrong spectrum, particles will look randomly scattered with no filaments. The web should be obviously filamentary.
- **Single central blob**: If the displacement field has too much power on large scales, everything collapses to one cluster. There should be multiple clusters connected by a network.
- **Grid artifacts**: If the displacement amplitude is too small, the initial grid pattern will be visible at z = 0. The displacements must be large enough to fully erase the grid.
- **Popcorn/noise**: If the power spectrum is dominated by small scales, the web will look noisy/grainy instead of showing large coherent filaments.
- **No time evolution**: If D(z) is not implemented correctly, the slider will have no effect or will produce discontinuous jumps.

---

## Textures/Assets Needed

**None.** This is a fully procedural visualization. All geometry is generated from the Zel'dovich approximation displacement field. No textures, no external data files.

The displacement field is computed at initialization from random Fourier modes. Different random seeds produce different (but statistically equivalent) cosmic webs. Consider exposing a "Seed" input for reproducibility.

---

## Reference Implementations (for coder)

### Zel'dovich approximation
- **apontzen/zeldovich2d** (Python): https://github.com/apontzen/zeldovich2d — 2D ZA implementation. Clean code showing the displacement field generation from a Gaussian random field. Port the core algorithm to 3D JavaScript.
- **abacusorg/zeldovich-PLT** (C/Python): https://github.com/abacusorg/zeldovich-PLT — Full 3D ZA initial conditions generator for N-body codes. Reference for the correct displacement field formula. Uses FFT-based approach.
- **Wikipedia — Zel'dovich approximation**: https://en.wikipedia.org/wiki/Zeldovich_approximation — concise mathematical summary of x = q + D(t) * Psi(q).

### Growth factor
- **Carroll, Press & Turner 1992** (ApJ 394, 1): "The Cosmological Constant" — Eq. 29 gives the growth factor approximation for flat LCDM. This is the standard reference used in cosmological codes.
- **NED Level 5 — Growth of Linear Perturbations**: https://ned.ipac.caltech.edu/level5/Carroll/Carroll3_5.html — concise derivation with the approximation formula.

### Large point cloud rendering
- **Three.js Points + ShaderMaterial**: the satellites-interactive.html in this project demonstrates the exact pattern for rendering large point clouds with circular particles, altitude-dependent sizing, and additive blending.
- **Potree-style LOD**: https://github.com/pnext/three-loader — if 50K particles prove insufficient and we need 200K+, an octree LOD approach would be needed. But 50K should suffice for visual quality.

### Cosmological parameters
- **Planck 2018 results VI**: https://arxiv.org/abs/1807.06209 — the canonical source for all cosmological parameters.
- **COSMOS BAO article**: https://astronomy.swin.edu.au/cosmos/b/Baryonic+Acoustic+Oscillations — our own encyclopedia entry on the BAO scale.

### Pseudocode: core initialization

```javascript
// === Constants ===
const BOX = 200;           // Mpc comoving
const N_SIDE = 37;         // particles per side (37^3 ~ 50K)
const N_PARTICLES = N_SIDE ** 3;
const N_MODES = 50;        // Fourier modes for displacement field
const Omega_m = 0.315;
const Omega_L = 0.685;

// === Generate initial grid positions ===
const q = new Float32Array(N_PARTICLES * 3);
let idx = 0;
for (let ix = 0; ix < N_SIDE; ix++) {
  for (let iy = 0; iy < N_SIDE; iy++) {
    for (let iz = 0; iz < N_SIDE; iz++) {
      q[idx++] = (ix / N_SIDE - 0.5) * BOX;
      q[idx++] = (iy / N_SIDE - 0.5) * BOX;
      q[idx++] = (iz / N_SIDE - 0.5) * BOX;
    }
  }
}

// === Generate displacement field (once, at init) ===
const psi = new Float32Array(N_PARTICLES * 3);  // displacements at D=1
for (let m = 0; m < N_MODES; m++) {
  const k_mag = k_min + Math.random() * (k_max - k_min);
  // ... (see full algorithm in Physics section)
}

// === Apply displacements for redshift z ===
function updatePositions(z) {
  const D = growthFactor_normalized(z);
  for (let i = 0; i < N_PARTICLES; i++) {
    positions[i * 3]     = q[i * 3]     + D * psi[i * 3];
    positions[i * 3 + 1] = q[i * 3 + 1] + D * psi[i * 3 + 1];
    positions[i * 3 + 2] = q[i * 3 + 2] + D * psi[i * 3 + 2];
  }
  geometry.attributes.position.needsUpdate = true;
}
```

**CRITICAL: The coder must verify that at z = 0 the distribution is visibly filamentary, and at z = 10 it is nearly uniform, before proceeding to Stage 2.** If the web looks wrong, adjust the power spectrum amplitude (RMS displacement ~5-10 Mpc) and the number of modes.

---

## Complexity Estimate

**Hardest (800-1200 lines JS)**. Procedural cosmic web generation via Zel'dovich approximation, growth factor computation, local density estimation, 3D fly-through camera, time evolution, DM/baryon toggle, scale markers, depth fog, educational overlays. The displacement field generation at init is computationally intensive. The per-frame update (scalar multiply on positions) is cheap but requires careful buffer management.

This is more complex than the rotation curve app (which has harder analytic physics but simpler geometry) because of the 3D navigation, the procedural data generation, and the multiple visual modes.

---

## Closest Existing COSMOS App to Use as Template

**`experimental/satellites-interactive.html`** — because:
1. Same core technique: large point cloud (14K+ debris objects) rendered with `ShaderMaterial` + circular particles + additive blending
2. Same toggle pattern: multiple categories of objects shown/hidden via checkboxes
3. Same performance tier: tens of thousands of points at 60 fps
4. OrbitControls with large scene
5. Already uses the established controls bar, info panel, and embed mode patterns

The LSS app extends this pattern by: adding time evolution (position array updates each frame), replacing pre-loaded binary data with procedurally generated positions, adding depth fog, and adding a fly-through camera mode.

Alternative template: `experimental/asteroid-belt-interactive.html` — for the particle shader patterns and the distance scale overlay. The asteroid belt uses ~10K particles with `makeCircleMat`, which is the same approach we need.

---

## Data Approach Decision

### Option 1: Procedural generation via Zel'dovich approximation (RECOMMENDED)
- **Pros**: No external data dependency. Runs entirely client-side. Produces physically motivated structure. Time evolution is trivial (scale displacement by D(z)). Different seeds give different webs.
- **Cons**: Not "real" data. ZA breaks down after shell-crossing (but visually acceptable). Limited resolution compared to real N-body sims.
- **Verdict**: **USE THIS.** The ZA produces a visually compelling and physically motivated cosmic web with minimal code. It is the standard tool for generating initial conditions in cosmology and is well-understood.

### Option 2: Pre-computed N-body snapshot (e.g., Illustris TNG)
- **Pros**: Physically exact. Beautiful structure. Multiple snapshots for time evolution.
- **Cons**: Requires downloading and converting HDF5 data from the TNG API. Large file sizes (even a 50K-particle subsample requires preprocessing). Server dependency for data. Cannot generate different realizations. Complex data pipeline.
- **Verdict**: Reject for initial build. Could be a future enhancement — load a real TNG snapshot as an alternative mode.

### Option 3: Real survey data (SDSS)
- **Pros**: Real galaxy positions. Direct connection to observations.
- **Cons**: SDSS covers only a fraction of the sky (wedge geometry, not a box). No time evolution possible with real data. Selection effects and survey boundaries create artifacts. Requires significant data processing.
- **Verdict**: Reject. Better suited for a separate "Galaxy Survey" app.

---

## Notes for CEO

### What went well
- The physics is remarkably clean for this app. The Zel'dovich approximation is a textbook result (literally — it appears in every cosmology textbook from Peebles to Dodelson to Weinberg). The formula x = q + D(t) * Psi(q) is elegant and trivially parallelizable.
- The growth factor D(z) has well-tested approximations (Carroll+ 1992). Combined with the ZA, the entire time evolution reduces to a single scalar multiply on a precomputed displacement array — this makes the time slider essentially free in terms of computation.
- Multiple excellent visual references exist (NASA SVS, Illustris, Kim Albrecht). The visual target is clear: filamentary network with empty voids on a black background.
- The satellites interactive already proves our architecture handles large point clouds at 60 fps.

### What was hard
- **No existing WebGL cosmic web visualization exists.** Every reference is either a pre-rendered video (NASA SVS), a 2D projection (Illustris Explorer), a network graph (Kim Albrecht), or a non-cosmological N-body sim (Campbell galaxy sim). We are building something genuinely new.
- **No JavaScript ZA implementation exists.** The reference code (apontzen/zeldovich2d, abacusorg/zeldovich-PLT) is in Python/C. The coder will need to port the core algorithm. The 2D version is straightforward; extending to 3D requires careful handling of the Fourier mode superposition.
- **Power spectrum calibration is the trickiest part.** Too little power: no visible structure. Too much: everything collapses to a blob. The amplitude needs to be tuned so that the RMS displacement is ~5-10 Mpc, producing clear filaments without excessive shell-crossing. The coder should expect to iterate on this parameter.

### What's missing
- **No exact transfer function.** We use a simplified P(k) with an exponential cutoff. For a pedagogical visualization this is fine — the web looks correct qualitatively. But it will not match Illustris output pixel-for-pixel.
- **No velocity field visualization.** The ZA gives peculiar velocities as well (v = a * dD/dt * Psi), which could be shown as arrows or streamlines. This is a future enhancement.
- **No halo finder.** We identify "clusters" by local density thresholding, not by a proper Friends-of-Friends or Spherical Overdensity algorithm. For labelling purposes, simple density peaks suffice.

### Pitfalls for coder
1. **Power spectrum amplitude is critical.** If sigma (RMS displacement) is too small (<3 Mpc), the web will be invisible. If too large (>15 Mpc), everything collapses. Start with sigma ~ 7 Mpc and tune visually. Print the RMS displacement to console during development.
2. **k-space sampling matters.** The N_MODES random Fourier modes must span from k_min ~ 2*pi/BOX (largest scale fits in box) to k_max ~ 2*pi/(BOX/N_SIDE) (Nyquist frequency of the grid). Missing large-scale modes produces no large-scale structure. Missing small-scale modes produces overly smooth structure.
3. **Periodic boundary conditions.** The ZA naturally produces a periodic field, but if particles are displaced outside the box, they should wrap around (modular arithmetic). Without wrapping, there will be a density spike at box edges and an empty region outside.
4. **Performance at init.** The displacement field computation is O(N_particles * N_modes) ~ 2.5M operations. This should take <1s on modern hardware, but show a loading indicator. The per-frame position update is O(N_particles) ~ 50K operations — negligible.
5. **Local density estimation** for the baryon toggle: naive O(N^2) neighbour counting for 50K particles is ~2.5 billion operations. Use a spatial hash grid (divide box into cells of ~5 Mpc) and count neighbours in adjacent cells only. This reduces to O(N * average_neighbours) ~ O(N * 30) ~ 1.5M — fast enough to compute once at init.
6. **Particle size in dense regions.** Per LEARNINGS: "control bloom via particle SIZE not brightness." Dense cluster regions will have many overlapping particles. Use smaller particle sizes there and larger sizes in voids/filaments for visual clarity.
7. **Float32 precision.** Positions span [-100, +100] Mpc. Float32 gives ~7 significant digits, so precision is ~0.01 Mpc — more than adequate.
8. **Fog interacts with bloom.** Test that bloom does not make distant (fogged) particles bright again. May need to adjust bloom threshold.
