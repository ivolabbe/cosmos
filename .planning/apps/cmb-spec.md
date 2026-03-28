# Cosmic Microwave Background (CMB) Interactive — Build Spec

## Overview

A rotatable 3D all-sky CMB sphere that users can spin, zoom, and peel through layers: the raw microwave sky (dominated by the dipole from our motion), the Galaxy foreground, and the intrinsic CMB anisotropies. Clicking on hot/cold spots reveals angular scale information and temperature deviation. A second panel shows the angular power spectrum C_ℓ (D_ℓ vs ℓ) with the Planck 2018 data points and a theoretical curve. Draggable sliders for cosmological parameters (H₀, Ω_m, Ω_b, Ω_Λ) shift the acoustic peaks in real time, interpolating from a pre-computed grid of CAMB spectra. This is a Hard tier app: two tightly linked panels (3D sphere + 2D power spectrum), multiple data layers, and a parameter-driven physics model.

---

## Fact Sheet

### Key Numbers

| Property | Value | Source |
|----------|-------|--------|
| CMB monopole temperature | T₀ = 2.7255 ± 0.0006 K | Fixsen 2009, ApJ 707, 916 |
| CMB dipole amplitude | ΔT = 3.3621 ± 0.0010 mK | Planck 2018 results I |
| Dipole direction (galactic) | (l, b) = (264.021° ± 0.011°, 48.253° ± 0.005°) | Planck 2018 results I |
| Solar system velocity w.r.t. CMB | v = 369.82 ± 0.11 km/s | Planck 2018 results I |
| Intrinsic anisotropy level | ΔT/T ~ 10⁻⁵ (tens of μK) | COBE/WMAP/Planck |
| First acoustic peak | ℓ₁ ≈ 220, D_ℓ ≈ 5775 μK² | Planck 2018 results V |
| Second acoustic peak | ℓ₂ ≈ 540 | Planck 2018 |
| Third acoustic peak | ℓ₃ ≈ 810 | Planck 2018 |
| Hubble constant | H₀ = 67.36 ± 0.54 km/s/Mpc | Planck 2018 VI, TT,TE,EE+lowE+lensing |
| Matter density | Ω_m = 0.3153 ± 0.0073 | Planck 2018 VI |
| Baryon density | Ω_b h² = 0.02237 ± 0.00015 | Planck 2018 VI |
| Dark energy density | Ω_Λ = 0.6847 ± 0.0073 | Planck 2018 VI |
| Cold dark matter density | Ω_c h² = 0.1200 ± 0.0012 | Planck 2018 VI |
| Spectral index | n_s = 0.9649 ± 0.0042 | Planck 2018 VI |
| Optical depth to reionization | τ = 0.0544 ± 0.0073 | Planck 2018 VI |
| Angular acoustic scale | 100 θ_* = 1.04110 ± 0.00031 | Planck 2018 VI |
| Age of universe | t₀ = 13.797 ± 0.023 Gyr | Planck 2018 VI |
| Redshift of last scattering | z_* = 1089.92 ± 0.25 | Planck 2018 VI |
| Sound horizon at last scattering | r_* = 144.43 ± 0.26 Mpc | Planck 2018 VI |
| Photon decoupling temperature | T_dec ≈ 3000 K (~0.26 eV) | Standard cosmology |
| Recombination temperature | T_rec ≈ 3740 K (onset) → 2970 K (end) | Weinberg 2008 |

### Notes

- The CMB is a near-perfect blackbody at 2.725 K — the most perfect blackbody ever measured. COBE/FIRAS measured this with deviations < 50 ppm.
- The dipole anisotropy (ℓ=1) is ~1000x larger than the intrinsic anisotropies (ℓ≥2). It arises from the solar system's peculiar velocity relative to the CMB rest frame (369.8 km/s toward Leo).
- Galactic foregrounds (synchrotron, free-free, thermal dust, anomalous microwave emission) must be subtracted before the primordial CMB anisotropies are visible. Planck used four independent component separation methods (Commander, NILC, SEVEM, SMICA).
- The angular power spectrum encodes the physics of the early universe: baryon-photon acoustic oscillations in the primordial plasma before recombination at z ≈ 1090.
- Odd-numbered peaks (1st, 3rd, 5th) are compression peaks (enhanced by baryons falling into potential wells); even-numbered peaks (2nd, 4th) are rarefaction peaks. Increasing Ω_b raises odd peaks relative to even ones.
- The Sachs-Wolfe effect dominates at large scales (low ℓ): photons climbing out of gravitational potential wells at last scattering lose energy, producing ΔT/T ≈ −Φ/3.
- Silk damping exponentially suppresses power at high ℓ (small angular scales, ℓ > 1000) as photons diffuse out of density perturbations before recombination.
- The integrated Sachs-Wolfe (ISW) effect adds power at low ℓ in a universe with dark energy (potential wells decay as Ω_Λ dominates).

### Physics Context (for article writer)

The Cosmic Microwave Background is the afterglow of the Big Bang — thermal radiation released when the universe cooled enough for hydrogen atoms to form and photons to travel freely, about 380,000 years after the Big Bang. Today these photons fill all of space with a blackbody spectrum at 2.725 K, shifted into the microwave band by the expansion of the universe. Tiny temperature fluctuations (±200 μK) across the sky encode the seeds of all cosmic structure: the slight overdensities that gravity amplified into galaxies, clusters, and the cosmic web. The pattern of these fluctuations — their angular power spectrum — is one of the most powerful tools in cosmology, pinning down the age, geometry, composition, and expansion rate of the universe with percent-level precision.

---

## State-of-the-Art Survey

### Reference 1: thecmb.org (Damien George, Cambridge)
- **Source**: University/educational, WebGL
- **URL**: http://thecmb.org/
- **What it does well**: Interactive 3D full-sky CMB map rendered with Three.js using HEALPix tiling. Click-drag to rotate, scroll to zoom. Multiple frequency bands selectable. 50 million pixels at highest resolution. Smooth, responsive, familiar Google-Maps-like interaction model.
- **What it does poorly**: No power spectrum panel. No parameter sliders. No dipole/foreground layer peeling. Pure data browser — no pedagogical explanation of what the features mean.
- **Key technique**: HEALPix pixels rendered as WebGL tiles on a sphere. Progressive resolution loading.
- **Our advantage**: We add the pedagogical dimension — layer peeling to show what the raw sky looks like before foreground removal, angular scale annotation on click, and the linked power spectrum panel.

### Reference 2: Chris North / Planck CMB Simulator
- **Source**: University (Cardiff) / Planck outreach
- **URL**: https://chrisnorth.github.io/planckapps/Simulator/
- **What it does well**: Sliders for cosmological parameters (H₀, Ω_b, Ω_CDM, Ω_Λ) with live power spectrum update. Toggle between power spectrum and sky map view. Pre-computed spectra with interpolation for fast response. Used at the Royal Society Summer Science Exhibition 2013.
- **What it does poorly**: The sky map is a flat 2D Mollweide projection, not a 3D sphere. The power spectrum and map cannot be viewed simultaneously. Visual style is dated. No foreground layers.
- **Key technique**: Pre-computed grid of CAMB spectra, client-side interpolation. Generates random CMB sky realization from the power spectrum.
- **Our advantage**: 3D rotatable sphere + simultaneous power spectrum panel. Modern visual style. Layer peeling for foregrounds.

### Reference 3: NASA WMAP CMB Power Spectrum Analyzer
- **Source**: NASA LAMBDA
- **URL**: https://map.gsfc.nasa.gov/resources/camb_tool/index.html
- **What it does well**: Official NASA educational tool. Shows WMAP data points with error bars. User adjusts parameters (H₀, Ω_b, Ω_CDM, Ω_Λ, n_s) to fit the model (blue line) to data (red line). Simple, clear, authoritative.
- **What it does poorly**: No 3D visualization at all — purely a 2D plot tool. Dated Flash-era UI (rebuilt in HTML5). No physical explanation of what each parameter does. No sky map connection.
- **Key technique**: Server-side CAMB computation (not client-side).
- **Our advantage**: Client-side pre-computed grid means instant response. Linked 3D sphere gives spatial context to the abstract power spectrum. Tooltips explain what each parameter controls.

### Reference 4: CosmoSlider (Heymans et al., 2026)
- **Source**: Research/educational (arXiv:2601.16919)
- **URL**: Web app + iOS app
- **What it does well**: TensorFlow Lite neural network emulator — evaluates power spectra in 5–10 ms. Extremely responsive slider interaction. Multiple parameters simultaneously. Modern UI. Both web and mobile versions.
- **What it does poorly**: No 3D sky visualization. Power spectrum only. No Planck data overlay. Research-focused — may be less accessible to undergraduates.
- **Key technique**: Neural network emulator trained on CAMB outputs. TFLite for client-side inference.
- **Our advantage**: We pair the spectrum with a 3D CMB sphere, making it visceral. We show Planck data points so the user can see how well their parameters fit real data. Our approach (pre-computed grid + interpolation) is simpler to implement and debug than ML emulation.

### Reference 5: redshiftzero/cosmowebapp (d3.js)
- **Source**: GitHub (researcher)
- **URL**: https://github.com/redshiftzero/cosmowebapp
- **Live**: https://redshiftzero.com/cosmowebapp/
- **What it does well**: d3.js interactive visualization of how matter and CMB power spectra change with cosmological parameters. Pre-computed CAMB spectra with linear interpolation. Open source — we can study the interpolation approach and data format.
- **What it does poorly**: No 3D visualization. Minimal visual polish. Planck 2015 fiducial (not 2018).
- **Key technique**: Pre-computed grid of CAMB spectra stored as JSON/CSV. Client-side linear interpolation between nearest grid points.
- **Our advantage**: Modern Three.js visual. 3D sphere. Planck 2018 data. COSMOS house style.

### Reference 6: Planck Legacy Archive / ESA multimedia
- **Source**: ESA official
- **URL**: https://sci.esa.int/web/planck/-/60505-planck-s-cosmic-microwave-background-equirectangular-projection
- **What it does well**: Provides the authoritative CMB map images in equirectangular projection — ready to wrap onto a sphere. Multiple color schemes available. Based on 2018 Planck Legacy data release. Also provides foreground-included frequency maps for different Planck bands.
- **What it does poorly**: Static images — no interactivity.
- **Key technique**: HEALPix → equirectangular reprojection.
- **Our advantage**: We make the static image interactive — rotatable sphere, clickable features, layered views.

### What no existing tool does (our unique value)

No existing web interactive combines:
1. A 3D rotatable CMB sphere with layered views (dipole → foreground → anisotropies)
2. A linked angular power spectrum panel with Planck data points
3. Cosmological parameter sliders that update the theoretical curve in real time
4. Click-to-inspect hot/cold spot angular scale annotation

This combination — connecting the visual sky to the abstract power spectrum while letting users tune the universe — is genuinely new.

---

## Physics / Algorithm

### Panel 1: CMB Sphere

#### Sphere layers (toggle between them)

The sphere has three texture layers, toggled via buttons or a slider:

1. **Raw microwave sky** (dipole-dominated): An equirectangular texture showing the CMB + dipole + galactic foreground. Dominated by the dipole pattern (warm in direction of motion, cool opposite) and the bright Milky Way band across the equator. Source: Planck single-frequency map (e.g. 143 GHz) or a composite.

2. **Foreground-subtracted (dipole still present)**: The galaxy foreground is removed but the dipole remains. This shows the ℓ=1 mode clearly — one hemisphere ~3.4 mK warmer than the other. Can be generated by adding a dipole pattern to the CMB-only texture. Source: Planck CMB map + computed dipole overlay.

3. **CMB anisotropies only**: The Planck SMICA (or Commander) CMB map with dipole and foregrounds removed. This is the canonical image — the mottled red/blue all-sky pattern at ΔT ~ ±200 μK. Source: ESA equirectangular projection of the Planck 2018 SMICA map.

#### Texture approach

Use equirectangular projection images from ESA/Planck:
- **CMB anisotropies**: ESA Planck 2018 SMICA equirectangular image (available from https://sci.esa.int/web/planck/-/60505). Download at ~4096x2048 for good quality on the sphere.
- **Foreground map**: Composite Planck frequency image showing galactic emission. ESA provides multi-frequency composites.
- **Dipole overlay**: Compute analytically as a cosine pattern in the dipole direction and blend with the CMB texture.

Apply each texture to a `SphereGeometry(1, 128, 64)` with `MeshBasicMaterial` (self-lit, since the CMB doesn't need directional lighting — it IS the radiation).

#### Click-to-inspect feature

On click (raycaster hit on sphere), determine:
- The galactic coordinates (l, b) of the clicked point
- The approximate angular scale of the local feature (estimate from texture gradient or pre-computed scale map)
- The temperature deviation ΔT at that point (from a lookup into the texture data, or a pre-baked data array)

Display in a tooltip:
```
(l, b) = (215°, +42°)
ΔT ≈ +180 μK (hot spot)
Angular scale: ~1° (ℓ ~ 200)
```

This is approximate — the texture is not a full HEALPix data product. For educational purposes, reading the pixel color from the texture and mapping it back to ΔT via the known color scale is sufficient.

#### Dipole computation (for analytical overlay)

The dipole pattern in galactic coordinates:

```
ΔT_dipole(l, b) = ΔT_max * [sin(b)*sin(b_d) + cos(b)*cos(b_d)*cos(l - l_d)]
```

where (l_d, b_d) = (264.02°, 48.25°) is the dipole direction and ΔT_max = 3.362 mK.

This is just the dot product between the direction vector of the pixel and the dipole direction vector, scaled by the dipole amplitude.

### Panel 2: Angular Power Spectrum

#### What to plot

The angular power spectrum is conventionally plotted as:

```
D_ℓ = ℓ(ℓ+1) C_ℓ / (2π)    [in μK²]
```

vs multipole ℓ (log scale on x-axis, or linear with compressed low-ℓ region).

**X-axis**: ℓ from 2 to ~2500. Use a quasi-logarithmic scale: logarithmic from ℓ=2 to ℓ=50 (Sachs-Wolfe plateau), then linear from ℓ=50 to ℓ=2500 (acoustic peaks). This is the standard presentation used by Planck.

**Y-axis**: D_ℓ in μK², from 0 to ~6500.

#### Planck data points

Include the binned Planck 2018 TT power spectrum data as points with error bars. This is publicly available from the Planck Legacy Archive:
- URL: https://wiki.cosmos.esa.int/planck-legacy-archive/index.php/CMB_spectrum_%26_Likelihood_Code
- The binned spectrum data (ℓ, D_ℓ, σ_lower, σ_upper) can be extracted and embedded as a JSON array in the HTML file.

At ℓ < 30, use the Planck low-ℓ Commander spectrum (larger error bars). At ℓ > 30, use the Planck high-ℓ Plik TT spectrum (tight error bars through the acoustic peaks).

For a manageable embedded dataset: ~50-80 binned data points covering ℓ = 2-2500 is sufficient to show the Sachs-Wolfe plateau, all visible acoustic peaks, and the Silk damping tail. This is a small JSON array (~5 KB).

#### Theoretical curve: pre-computed CAMB grid

**Strategy**: Pre-compute a grid of CMB TT power spectra using CAMB (Python), varying four parameters:

| Parameter | Range | Steps | Default (Planck best-fit) |
|-----------|-------|-------|--------------------------|
| H₀ (km/s/Mpc) | 60–80 | 5 (60, 65, 67.4, 70, 80) | 67.36 |
| Ω_b h² | 0.018–0.026 | 5 (0.018, 0.020, 0.02237, 0.024, 0.026) | 0.02237 |
| Ω_m | 0.20–0.45 | 5 (0.20, 0.25, 0.3153, 0.35, 0.45) | 0.3153 |
| Ω_Λ | 0.55–0.80 | 5 (0.55, 0.65, 0.6847, 0.72, 0.80) | 0.6847 |

**Note**: Ω_m + Ω_Λ need not equal 1 — allowing non-flat models shifts the first peak position, which is pedagogically important. However, keep curvature within reasonable bounds (|Ω_k| < 0.05 for the grid).

**Constraint**: When Ω_Λ changes, Ω_CDM = Ω_m - Ω_b adjusts accordingly (since Ω_b h² is a separate slider). The grid points should be computed with consistent parameter sets.

**Grid size**: 5 × 5 × 5 × 5 = 625 spectra. Each spectrum is D_ℓ for ℓ = 2..2500, sampled every 1 in ℓ. At ~2500 floats per spectrum and 625 spectra, this is ~6.25 million floats → ~25 MB as raw JSON. **Too large for inline embedding.**

**Compression strategy**:
1. Sample every 5th ℓ value (500 points per spectrum) and interpolate client-side → 625 × 500 × 4 bytes ≈ 1.25 MB.
2. Quantize D_ℓ to integers (μK² values range 0–6500, so 16-bit integers suffice) → ~625 KB.
3. Store as base64-encoded binary → ~830 KB.
4. Or: reduce the grid to 3 × 3 × 3 × 3 = 81 spectra with wider spacing, relying on smooth interpolation. At 81 × 500 × 2 bytes ≈ 81 KB — easily embeddable.

**Recommended approach**: Use a 5-point grid per parameter (625 spectra total), sample every 10th ℓ (250 points per spectrum), store as a compressed JSON blob (~300-500 KB). The coder can generate this using the Python script below.

#### CAMB pre-computation script (for coder)

```python
import camb
import numpy as np
import json

# Parameter grid
H0_vals = [60, 65, 67.36, 70, 80]
ombh2_vals = [0.018, 0.020, 0.02237, 0.024, 0.026]
omm_vals = [0.20, 0.25, 0.3153, 0.35, 0.45]
omL_vals = [0.55, 0.65, 0.6847, 0.72, 0.80]

lmax = 2500
l_sample = list(range(2, lmax+1, 10))  # every 10th ell

grid = {}
for h0 in H0_vals:
    for ombh2 in ombh2_vals:
        for omm in omm_vals:
            for omL in omL_vals:
                h = h0 / 100.0
                omch2 = (omm - ombh2 / h**2) * h**2
                if omch2 < 0.01:
                    continue  # unphysical
                pars = camb.CAMBparams()
                pars.set_cosmology(
                    H0=h0, ombh2=ombh2, omch2=omch2,
                    omk=1 - omm - omL, tau=0.054
                )
                pars.InitPower.set_params(ns=0.9649)
                pars.set_for_lmax(lmax, lens_potential_accuracy=0)
                results = camb.get_results(pars)
                powers = results.get_cmb_power_spectra(pars, CMB_unit='muK')
                totCL = powers['total'][:, 0]  # TT
                # D_ell = ell(ell+1)C_ell/(2pi) -- CAMB returns this already
                Dl = [round(float(totCL[l]), 1) for l in l_sample]
                key = f"{h0}_{ombh2}_{omm}_{omL}"
                grid[key] = Dl

output = {"ells": l_sample, "spectra": grid}
with open("cmb_grid.json", "w") as f:
    json.dump(output, f)
```

#### Client-side interpolation

For a given slider state (H₀, Ω_b h², Ω_m, Ω_Λ), find the nearest grid points in each dimension and perform multi-linear interpolation:

```javascript
function interpolateSpectrum(H0, ombh2, omm, omL) {
  // For each parameter, find the two bracketing grid values and fractional position
  const [iH, fH] = bracket(H0_grid, H0);
  const [iB, fB] = bracket(ombh2_grid, ombh2);
  const [iM, fM] = bracket(omm_grid, omm);
  const [iL, fL] = bracket(omL_grid, omL);

  // 4D linear interpolation (16 corner spectra)
  // Interpolate along each axis successively
  const result = new Float32Array(ells.length);
  for (let d = 0; d < 16; d++) {
    const hIdx = (d & 8) ? iH + 1 : iH;
    const bIdx = (d & 4) ? iB + 1 : iB;
    const mIdx = (d & 2) ? iM + 1 : iM;
    const lIdx = (d & 1) ? iL + 1 : iL;
    const w = ((d & 8) ? fH : 1 - fH) *
              ((d & 4) ? fB : 1 - fB) *
              ((d & 2) ? fM : 1 - fM) *
              ((d & 1) ? fL : 1 - fL);
    const spectrum = getSpectrum(hIdx, bIdx, mIdx, lIdx);
    for (let i = 0; i < result.length; i++) result[i] += w * spectrum[i];
  }
  return result;
}
```

This gives smooth, physically motivated interpolation between pre-computed spectra — no ML emulator needed, no server-side computation.

#### How cosmological parameters affect the power spectrum

This is the core pedagogical content. Each slider should have a tooltip or annotation explaining its effect:

| Parameter | What it controls | Visual effect on power spectrum |
|-----------|-----------------|-------------------------------|
| H₀ | Expansion rate → angular diameter distance to last scattering | Shifts all peaks horizontally (higher H₀ → peaks shift to higher ℓ) |
| Ω_b h² | Baryon density → baryon loading of acoustic oscillations | Changes odd/even peak height ratio (more baryons → odd peaks enhanced, even peaks suppressed) |
| Ω_m | Total matter density → matter-radiation equality epoch | Changes overall peak heights and positions; more matter → earlier equality → larger driving effect → higher peaks |
| Ω_Λ | Dark energy → late-time ISW effect + angular diameter distance | Mainly affects low-ℓ (ISW rise) and shifts peaks via distance (combined with Ω_m for curvature) |

#### Key physical effects in the power spectrum

1. **Sachs-Wolfe plateau** (ℓ < 50): Nearly flat D_ℓ ~ 1000 μK². Reflects primordial fluctuations on scales larger than the sound horizon at recombination. The ISW effect adds a rise at ℓ < 10 in ΛCDM.

2. **Acoustic peaks** (50 < ℓ < 1500): Standing wave pattern in the baryon-photon fluid. Peak spacing is ~Δℓ ≈ 300 (not exactly — shifts due to baryon loading and curvature).
   - 1st peak (ℓ ≈ 220): Fundamental mode — the scale that just completed one compression by recombination. Position constrains spatial curvature.
   - 2nd peak (ℓ ≈ 540): First rarefaction. Height relative to 1st peak constrains Ω_b.
   - 3rd peak (ℓ ≈ 810): Second compression. Height constrains Ω_m.
   - Higher peaks: Progressively damped by Silk damping.

3. **Silk damping tail** (ℓ > 1000): Exponential suppression as photon diffusion washes out small-scale perturbations. Damping scale depends on baryon density and expansion rate.

---

## Core Visualization

- **Geometry (Panel 1)**: `SphereGeometry(1, 128, 64)` with equirectangular texture. `MeshBasicMaterial` (no lighting — the CMB is self-luminous microwave radiation). Three texture layers toggled by the user.
- **Technique (Panel 1)**: Textured sphere with `OrbitControls`. Raycaster for click-to-inspect. Layer toggle swaps the material's map property.
- **Geometry (Panel 2)**: 2D HTML5 Canvas overlay (top-right or right side, same position as GW spectrogram). Standard canvas 2D drawing for the power spectrum plot.
- **Data source**: Planck equirectangular CMB images from ESA (texture files). Pre-computed CAMB power spectrum grid (JSON embedded in HTML). Planck 2018 binned TT data points (JSON array).

---

## Features & Controls

### 3D Scene (left/center)
- Rotatable CMB sphere with three selectable layers
- Layer labels: "Raw Sky", "Galaxy Removed", "CMB Anisotropies"
- Click on sphere to see (l, b) coordinates, ΔT, and approximate angular scale
- Color scale bar (vertical, right of sphere) showing temperature range for current layer
- Background: pure black `#000` with two-layer star field

### 2D Panel (top-right or right side)
- D_ℓ vs ℓ angular power spectrum
- Planck 2018 TT data points with error bars (grey/white points)
- Theoretical curve (smooth line, color-coded or white)
- X-axis: ℓ (quasi-logarithmic: log below ℓ=50, linear above)
- Y-axis: D_ℓ in μK² (0 to ~6500)
- Annotations on first three peaks: "1st peak (ℓ≈220)", etc.
- Panel title: "Angular Power Spectrum"

### Controls (bottom bar)
- **Layer** toggle: three buttons — "Raw Sky" / "Galaxy Removed" / "CMB Only" (default: CMB Only)
- **H₀** slider: 60–80 km/s/Mpc, default 67.4
- **Ω_b h²** slider: 0.018–0.026, default 0.0224
- **Ω_m** slider: 0.20–0.45, default 0.315
- **Ω_Λ** slider: 0.55–0.80, default 0.685
- **Reset** button: returns all parameters to Planck best-fit
- **Labels** checkbox: show/hide peak annotations on the power spectrum

### Info Panel (top-left)
- Title: "Cosmic Microwave Background"
- Description: "The oldest light in the universe — a snapshot of the cosmos at 380,000 years."
- Readouts:
  - Layer: [current layer name]
  - T₀ = 2.7255 K
  - H₀ = XX.X km/s/Mpc
  - Ω_m = X.XXX
  - Ω_b h² = X.XXXXX
  - Ω_Λ = X.XXX
- Hint: "Drag to rotate · Click for details · Adjust sliders to change cosmology"

---

## Implementation Stages

### Stage 1: CMB sphere with texture layers
**Build:** A Three.js scene with a textured sphere showing the Planck CMB anisotropy map (equirectangular projection). OrbitControls for rotation and zoom. Three buttons to toggle between the three texture layers (raw sky, foreground-removed, CMB-only). Background stars (two-layer, per style guide). Info panel with title and description.

**Key details:**
- Download ESA Planck equirectangular CMB image (2018 SMICA) at ~4096x2048 resolution. Convert to JPEG for reasonable file size (~500 KB–1 MB).
- For the "Raw Sky" texture: use a Planck 143 GHz or composite multi-frequency image that shows galactic emission prominently.
- For the "Galaxy Removed" layer: take the SMICA CMB map and add a computed dipole pattern on a canvas before creating the texture. Or use a pre-made image with dipole visible.
- `MeshBasicMaterial` — no directional lighting. The sphere represents radiation, not a solid body.
- SphereGeometry mapping: ensure galactic center is at (l=0, b=0), i.e. front of sphere. Standard equirectangular UV mapping handles this automatically if the texture is in galactic coordinates with l=0 at center.
- Start with camera at distance ~2.5 for a good view of the sphere.

**Pass criteria:** Sphere renders with CMB texture. Three layer buttons switch textures. Rotation and zoom work. Stars visible in background. No console errors.

### Stage 2: Click-to-inspect hot/cold spots
**Build:** Raycaster on the sphere. On click, determine galactic coordinates (l, b) from the intersection point. Read the approximate temperature deviation from the texture color at that point (using a hidden canvas to sample the texture pixel color). Map color → ΔT using the known Planck color scale (blue = cold = −300 μK, red = hot = +300 μK). Display a tooltip with coordinates, ΔT, and estimated angular scale.

**Key details:**
- Intersection point in 3D → (θ, φ) → (l, b): standard spherical coordinate conversion, accounting for texture orientation.
- Color-to-temperature mapping: Planck's CMB color map runs from blue (cold) through black (zero) to red (hot). Sample the RGB, convert to a normalized position along the color ramp, then scale to ΔT range.
- Angular scale estimate: either pre-compute a gradient map from the texture (high gradient = small features = high ℓ) or simply state "Feature angular scale: ~X°" based on a rough rule of thumb (θ ≈ 180°/ℓ, and typical features at ℓ ~ 200 are ~1°).
- Tooltip: HTML overlay positioned at the click point (CSS2DObject or absolute-positioned div).

**Pass criteria:** Clicking on the sphere shows coordinates and temperature. Hot spots show positive ΔT (red), cold spots show negative ΔT (blue). Tooltip is positioned near the click point.

### Stage 3: Angular power spectrum panel
**Build:** A 2D canvas panel (top-right, 380×240 px) showing the D_ℓ vs ℓ angular power spectrum. Plot the Planck 2018 binned TT data points as grey dots with error bars. Plot the Planck best-fit theoretical curve (from CAMB at default parameters) as a solid white line. Label the first three acoustic peaks. Axis labels and gridlines.

**Key details:**
- Canvas positioned in the same style as the GW spectrogram panel.
- X-axis: quasi-logarithmic. Use `x_screen = log10(ℓ)` for ℓ < 50 transitioning to linear for ℓ > 50. Or simply use a linear x-axis from ℓ=2 to ℓ=2500 — the peaks are visible either way. The standard Planck presentation uses linear ℓ with slightly compressed low-ℓ.
- Y-axis: 0 to 6500 μK².
- Data points: ~60-80 binned Planck data points embedded as a JSON array. Error bars as vertical lines.
- Theoretical curve: the best-fit CAMB spectrum at Planck default parameters. This single curve can be stored as ~250 (ℓ, D_ℓ) pairs.
- Peak labels: "1st" at ℓ≈220, "2nd" at ℓ≈540, "3rd" at ℓ≈810. Small text with arrows.

**Pass criteria:** Power spectrum panel shows the characteristic shape: plateau at low ℓ, peaks at ℓ ≈ 220, 540, 810, damping tail at high ℓ. Data points with error bars visible. Theoretical curve passes through the data. First three peaks labeled.

### Stage 4: Cosmological parameter sliders
**Build:** Four sliders in the controls bar (H₀, Ω_b h², Ω_m, Ω_Λ). Pre-computed CAMB grid loaded as embedded JSON. When any slider changes, interpolate the theoretical curve from the grid and redraw on the power spectrum panel. Show the best-fit Planck curve as a dashed reference alongside the user's current curve.

**Key details:**
- The pre-computed grid JSON must be generated before this stage (Python CAMB script provided above). Embed as a `<script>` block with `const CAMB_GRID = {...};`.
- Interpolation: multi-linear (4D) as described in the Algorithm section.
- On slider change: recompute interpolated D_ℓ array, redraw the theoretical curve on the canvas. Keep data points fixed — they represent real measurements.
- Show two curves simultaneously: user's model (colored, e.g. cyan) and Planck best-fit (dashed white) for comparison.
- Reset button returns all sliders to Planck best-fit values.
- Update readouts in info panel as sliders move.
- Slider tooltips: "H₀: Higher → peaks shift right", "Ω_b: Higher → odd peaks grow", etc.

**Pass criteria:** Moving H₀ slider visibly shifts peak positions. Moving Ω_b h² slider changes the odd/even peak ratio. At default values, the model curve matches the data. Reset button works. Interpolation is smooth (no jumps between grid points).

### Stage 5: Polish — color bar, annotations, embed mode
**Build:**
- Vertical color bar next to the sphere showing the temperature scale for the current layer (±300 μK for CMB, ±4 mK for dipole, broader for raw sky).
- "Day" mode annotation linking the sky sphere to the power spectrum: when user clicks a spot, briefly highlight the corresponding ℓ range on the power spectrum.
- Embed mode: hide description, compact readout, hide peak labels. Smaller 2D panel.
- Keyboard shortcut: spacebar toggles layer cycling.
- Smooth texture transition on layer switch (brief crossfade).
- Final visual polish: bloom threshold tuned for the scene (stars only, not the CMB sphere itself).

**Pass criteria:** Color bar updates on layer switch. Embed mode works (compact, readable). All keyboard shortcuts functional. Smooth layer transitions. Performance: 60fps.

---

## Reference Implementations (for coder)

### CMB power spectrum computation
- **CAMB** (Code for Anisotropies in the Microwave Background): https://github.com/cmbant/CAMB — The standard Einstein-Boltzmann solver. Use this to pre-compute the grid of power spectra. Python interface is straightforward. Documentation: https://camb.readthedocs.io/
- **CLASS** (Cosmic Linear Anisotropy Solving System): https://github.com/lesgourg/class_public — Alternative to CAMB. Either works for pre-computation.

### Pre-computed grid interpolation (client-side JavaScript)
- **redshiftzero/cosmowebapp**: https://github.com/redshiftzero/cosmowebapp — Open source d3.js app using pre-computed CAMB spectra with linear interpolation. Study this for the data format and interpolation approach. Key file: the JSON data file with pre-computed spectra.

### CMB sphere rendering
- **thecmb.org**: http://thecmb.org/ — Three.js + HEALPix sphere rendering. If source code is accessible, study the texture-on-sphere approach. If not, a standard equirectangular texture on a Three.js sphere is well-documented.
- **Three.js equirectangular sphere**: Standard approach — `SphereGeometry` + `TextureLoader` + `MeshBasicMaterial`. No special technique needed.

### Planck data
- **Planck Legacy Archive**: https://pla.esac.esa.int/ — Official data archive. Power spectrum data, CMB maps, foreground maps.
- **LAMBDA**: https://lambda.gsfc.nasa.gov/product/ — NASA mirror with educational tools.
- **Planck 2018 power spectrum data**: https://wiki.cosmos.esa.int/planck-legacy-archive/index.php/CMB_spectrum_%26_Likelihood_Code — Binned TT data points for plotting.

### Wayne Hu CMB tutorials
- **CMB physics tutorial**: https://background.uchicago.edu/~whu/intermediate/intermediate.html — The definitive educational explanation of how each parameter affects the power spectrum. Essential reading for tooltip/annotation text.

### CMB Simulator (Cardiff/Planck)
- **Chris North simulator**: https://chrisnorth.github.io/planckapps/Simulator/ — Pre-computed grid approach validated. Study the slider ranges and UI decisions.

---

## Eye Candy & Verification Targets

### Reference images

1. **Planck 2018 CMB all-sky** (ESA): The canonical mottled red-blue oval. Our 3D sphere should look like this unwrapped onto a globe — same colors, same features, same resolution feel.
2. **Planck power spectrum figure** (Planck 2018 V, Fig. 1): The gold-standard D_ℓ vs ℓ plot with data points and best-fit curve. Our 2D panel must match this shape: plateau, peaks at correct positions, damping tail.
3. **Wayne Hu animated spectra**: https://background.uchicago.edu/~whu/intermediate/map5.html — Shows how parameters shift the spectrum. Our slider behavior should match these effects qualitatively.

### What WRONG looks like
- **Peaks at wrong ℓ values**: If the first peak is at ℓ=300 or ℓ=150 instead of ~220, the physics is wrong. This would indicate incorrect cosmological parameters in the computation.
- **Flat power spectrum with no peaks**: The acoustic oscillations are THE feature. A flat or monotonically declining spectrum means the computation failed.
- **Wrong color scale on sphere**: The CMB temperature range is ±300 μK (after dipole/foreground removal). If the sphere shows the wrong dynamic range (e.g. ±3 K), the color mapping is wrong.
- **Sphere orientation wrong**: The galactic plane should run along the equator of the sphere. If the Milky Way foreground (in the raw sky layer) is running vertically or diagonally, the texture mapping is rotated.
- **Odd/even peak ratio not changing with Ω_b**: This is the key Ω_b diagnostic. If the slider has no visible effect on the 1st/2nd peak ratio, the interpolation or grid is wrong.

### Physics checks (for verifier)

1. **First peak position**: At Planck best-fit parameters, the first peak must be at ℓ ≈ 220 ± 10.
2. **First peak height**: D_ℓ ≈ 5775 ± 200 μK² at the first peak.
3. **Second peak suppressed relative to first**: The 2nd peak (ℓ ≈ 540) should be noticeably lower than the 1st peak — this is due to baryon loading.
4. **Damping at high ℓ**: D_ℓ should drop below ~1000 μK² by ℓ ~ 2000.
5. **H₀ effect**: Increasing H₀ from 67 to 80 should visibly shift peaks to higher ℓ (by ~10-15%).
6. **Ω_b effect**: Increasing Ω_b h² from 0.022 to 0.026 should raise odd peaks and lower even peaks (the 1st peak grows, 2nd peak shrinks).
7. **Dipole layer**: Should show a smooth warm/cool dipole pattern with amplitude ~3.4 mK, direction toward (l, b) ≈ (264°, 48°).
8. **Temperature at click**: Hot spots (red) should report positive ΔT; cold spots (blue) should report negative ΔT. Typical values ±50-250 μK.
9. **Sphere orientation**: Galactic center should face the camera at initial view (or be clearly at l=0, b=0).
10. **Low-ℓ plateau**: The Sachs-Wolfe plateau (ℓ ~ 2-30) should be roughly flat at D_ℓ ~ 1000-1500 μK², not rising or falling steeply.

### Test values for power spectrum

| ℓ | D_ℓ (Planck best-fit, approx.) | Feature |
|---|------|---------|
| 2 | ~1000 | Quadrupole (actually measured low — known anomaly) |
| 10 | ~1100 | Sachs-Wolfe plateau |
| 50 | ~1500 | Transition to acoustic regime |
| 220 | ~5775 | First acoustic peak |
| 400 | ~2500 | First trough |
| 540 | ~3500 | Second acoustic peak |
| 810 | ~2800 | Third acoustic peak |
| 1200 | ~1200 | Fourth peak region |
| 2000 | ~300 | Silk damping tail |
| 2500 | ~100 | Deep in damping tail |

These are approximate D_ℓ values for the best-fit Planck 2018 ΛCDM model. The coder should verify against CAMB output.

---

## Textures/Assets Needed

| Asset | Source | Format | Size |
|-------|--------|--------|------|
| Planck CMB anisotropy map (SMICA, equirectangular) | ESA: sci.esa.int/web/planck/-/60505 | JPEG, 4096×2048 | ~500 KB |
| Planck raw microwave sky (143 GHz or composite) | ESA Planck picture gallery | JPEG, 4096×2048 | ~500 KB |
| Pre-computed CAMB power spectrum grid | Generated via Python script (above) | JSON, embedded | ~300-500 KB |
| Planck 2018 binned TT data points | Planck Legacy Archive | JSON array, embedded | ~5 KB |

**Total additional data**: ~1.3-1.5 MB (dominated by textures). Acceptable for a single-file app.

**Texture download note**: The ESA Planck images are publicly available under ESA's terms for educational use. Credit: "ESA and the Planck Collaboration."

The "Galaxy Removed" (dipole-visible) layer can be generated by the coder by adding an analytical dipole overlay to the CMB-only texture on a 2D canvas before creating the Three.js texture. No third image file needed.

---

## Complexity Estimate

**Complex (600-900 lines JS)**. Two linked panels (3D sphere + 2D canvas). Three texture layers with toggle. Click-to-inspect with raycaster and coordinate conversion. Pre-computed power spectrum grid with 4D interpolation. Four parameter sliders updating the spectrum in real time. Comparable to the binary star interactive (~950 lines) in architecture but with different complexity tradeoffs: simpler 3D geometry (just a textured sphere) but more complex data handling (power spectrum grid, interpolation, data points with error bars).

---

## Closest Existing COSMOS App to Use as Template

**`experimental/gravitational-waves-interactive.html`** — because:
1. Same architecture: 3D scene (center/left) + 2D canvas panel (top-right: spectrogram → power spectrum) + sliders in controls bar
2. The 2D canvas panel draws a physics plot that updates in real time from parameters — same pattern as our power spectrum panel
3. Multiple sliders driving physics computations with immediate visual feedback
4. The sphere + panel layout is closer to what we need than the binary star's two-panel layout

Alternative: `experimental/binary-star-interactive.html` — for the multi-slider controls bar pattern. Either works as a starting skeleton.

---

## Sensible Speed / Animation Ranges

This is not a time-evolution simulation — the CMB is a static snapshot. There is no play/pause or speed control. The interactivity is:
- Sphere rotation (user-driven via OrbitControls)
- Layer toggling (button press)
- Clicking to inspect (discrete events)
- Slider adjustment (continuous, updates power spectrum panel)

No animation loop is needed for physics (unlike GW, binary star, rotation curve). The render loop runs at 60fps for smooth OrbitControls interaction but does not advance any simulation time.

---

## Notes for CEO

### What went well
- **Rich reference landscape**: Unlike some other apps (pulsar, rotation curve) where no existing web tool combines our target features, the CMB space has several good reference implementations — CosmoSlider, Chris North's simulator, redshiftzero's d3 app, NASA WMAP Analyzer. This means the pedagogical approach is validated and the physics is well-documented. We are combining the best elements of all of them into one app.
- **Authoritative data readily available**: ESA provides the CMB textures in equirectangular projection ready for sphere mapping. Planck data points are publicly available. CAMB is the standard tool for power spectrum computation.
- **Wayne Hu's tutorials** are an exceptional pedagogical resource — the tooltip text for parameter effects can be adapted directly from his explanations.
- **No custom shaders needed**: The sphere is just a textured mesh. The complexity is in the data handling (grid interpolation, data embedding), not in the rendering.

### What was hard
- **Power spectrum grid size**: A 4D parameter grid of CAMB spectra can be large. The 625-spectrum grid at full ℓ resolution would be ~25 MB — too large to embed. The spec proposes subsampling every 10th ℓ and using 250 points per spectrum, bringing it to ~300-500 KB. This is a tradeoff between precision and file size. The coder must generate this grid before building Stage 4.
- **No simple analytical formula**: Unlike rotation curves (closed-form v(R) for each component), the CMB power spectrum has no useful analytical approximation. The only correct approach is pre-computed spectra from CAMB/CLASS plus interpolation. This means the coder needs Python + CAMB installed to generate the grid — it cannot be hand-computed.
- **Click-to-inspect accuracy**: Mapping a click point on the sphere back to a meaningful ΔT requires sampling the texture color and inverting the color scale. This is approximate — the equirectangular projection has pole distortion, and the color-to-temperature mapping depends on the exact color ramp ESA used. It will be close but not precise to the μK level. For educational purposes this is fine.
- **Non-flat models**: Allowing Ω_m + Ω_Λ ≠ 1 is pedagogically important (shows how curvature shifts the first peak) but means the parameter space is truly 4D, not 3D with a constraint. This increases the grid size. The spec allows it but the coder should be aware.

### What's missing
- **Polarization**: The CMB has polarization (E-modes and B-modes) which is a major area of current research. This app only shows the temperature (TT) power spectrum. Adding a TE or EE panel could be a future enhancement.
- **Lensing**: CMB lensing by intervening matter slightly smooths the power spectrum. The CAMB computation includes it, but we don't explain it in the UI.
- **Anomalies**: The CMB has several interesting anomalies (low quadrupole, axis of evil, cold spot). These could be clickable annotations on the sphere — a future polish feature.
- **Mobile optimization**: The controls bar with four sliders + layer buttons will be wide. May need `flex-wrap: wrap` on narrow screens.

### Pitfalls for coder
1. **Pre-computation is mandatory**: Stage 4 cannot proceed without the CAMB grid JSON. The coder should generate this first using the Python script provided, and verify the output spectra match known Planck results before embedding.
2. **Texture orientation**: Equirectangular textures from ESA are in galactic coordinates with l=0, b=0 at center. Three.js UV mapping on SphereGeometry puts (u=0, v=0.5) at one edge. The coder must verify the sphere orientation — the galactic center should face the default camera direction, or at least the galactic plane should be at the equator.
3. **Color scale inversion**: When reading ΔT from the texture color, be careful about the color ramp direction. Planck's standard palette runs blue (cold) → black (zero) → red (hot). Some alternative color schemes (e.g. planck13-002b) use different palettes.
4. **Quasi-log x-axis**: The standard Planck power spectrum plot uses a compressed low-ℓ region. Implementing this exactly is fiddly. A simple linear x-axis (ℓ = 2 to 2500) works fine — the peaks are clearly visible. Don't over-engineer the axis.
5. **4D interpolation edge cases**: If the user's slider values are outside the grid range, clamp to the boundary. If the interpolated spectrum has negative D_ℓ values (unphysical, possible at extreme parameter combinations), clamp to zero.
6. **File size**: Keep the total HTML file under 2 MB including all embedded data (grid JSON + base64 textures if embedded, or external texture files referenced by URL). If textures are loaded from `experimental/assets/textures/`, the HTML file stays small.

---

## Verification Log

### FAIL: CMB interactive (2026-03-29)

**Screenshots**: `/tmp/cmb-interactive-initial.png`, `/tmp/cmb-interactive-rotated.png`, plus Chrome screenshots during manual review
**Agent instructions checked**: `.agents/sao-coder.md`

### Checklist

| # | Category | Check | Result | Detail |
|---|----------|-------|--------|--------|
| 1 | Agent compliance | Coder followed instructions | FAIL | Procedural noise textures used instead of ESA Planck equirectangular images as specified. Analytical spectrum model used instead of pre-computed CAMB grid with 4D interpolation. Code has TODO comments acknowledging these are placeholders. |
| 2 | Rendering | Scene renders without errors | PASS | No JS console errors. Canvas 1200x800. Loading indicator hidden. |
| 3 | Rendering | Bloom pipeline present | PASS | EffectComposer + UnrealBloomPass(0.3, 0.6, 0.5) + OutputPass. |
| 4 | Rendering | Circular particles (no PointsMaterial) | PASS | ShaderMaterial with gl_PointCoord discard + Gaussian falloff. No PointsMaterial. |
| 5 | Style | Background #000 | PASS | `renderer.setClearColor(0x000000)` and `body { background: #000 }`. |
| 6 | Style | House style CSS matches snippets | WARN | Controls bar: `bottom: 12px` (guide: 16px), `gap: 10px` (guide: 14px), `padding: 8px 16px` (guide: 12px 20px). Minor deviations to accommodate wide controls. |
| 7 | Style | Embedded mode works | FAIL | Info panel compacts correctly (max-width: 200px, title/desc/hint hidden). Credit hidden. BUT spectrum canvas stays at full 400x220 instead of shrinking for embedded (style guide: 240x140). Spec Stage 5 requires "Smaller 2D panel" in embed mode. |
| 8 | Controls | Layer toggle buttons functional | PASS | "Raw Sky", "Galaxy Removed", "CMB Only" buttons switch textures and update readout + color bar. |
| 9 | Controls | Cosmological parameter sliders | PASS | H0, Omega_b h^2, Omega_m, Omega_Lambda sliders all update power spectrum and readouts. |
| 10 | Controls | Reset button | PASS | Returns all sliders to Planck best-fit defaults (67.4, 0.0224, 0.315, 0.685). |
| 11 | Controls | Peak labels checkbox | PASS | Toggling "Peaks" checkbox shows/hides peak annotations on power spectrum. |
| 12 | Controls | Spacebar handler | PASS | Spacebar cycles layers: CMB -> Galaxy Removed -> Raw Sky -> CMB. Spec says "spacebar toggles layer cycling" (not play/pause since no animation). |
| 13 | Physics | First peak position at l~220 | PASS | PLANCK_DATA has l=220 with Dl=5780. Spec says l~220 +/- 10, Dl~5775 +/- 200. |
| 14 | Physics | Second peak suppressed vs first | PASS | l=540, Dl=3500 vs l=220, Dl=5780. Second peak clearly lower. |
| 15 | Physics | Damping tail at high l | PASS | Dl drops to 250 at l=2000 (spec: ~300). Below 1000 at l>1500. |
| 16 | Physics | H0 effect (peak shift) | PASS | H0=80 visibly shifts peaks to higher l relative to Planck reference. Physically correct. |
| 17 | Physics | Omega_b effect (odd/even ratio) | PASS | Omega_b h^2=0.026 enhances odd peaks, suppresses even peaks. Correct baryon loading effect. |
| 18 | Physics | Click-to-inspect shows coordinates and DeltaT | PASS | Tooltip shows (l, b) galactic coords, DeltaT in uK (cold spots negative/blue, hot spots positive/red), angular scale estimate with corresponding l. |
| 19 | Physics | Color bar updates per layer | PASS | CMB: +/-300 uK. Dipole/Raw: +/-4 mK. Correct ranges. |
| 20 | Physics | Sachs-Wolfe plateau | PASS | Low-l (2-30) data shows Dl ~820-1100 uK^2. Roughly flat. Matches spec (~1000-1500). |
| 21 | Data | Planck CMB textures (ESA images) | FAIL | Procedural noise used as placeholder. No actual Planck data images. Spec requires downloading ESA equirectangular projections. Comment in code acknowledges this. |
| 22 | Data | Pre-computed CAMB power spectrum grid | FAIL | Analytical approximation used instead of pre-computed 4D CAMB grid. The approximation produces correct qualitative behavior but is not a faithful CAMB output. Spec explicitly requires CAMB pre-computation. |
| 23 | Visual | Power spectrum panel | PASS | Correct shape: plateau, peaks at l~220/540/810, damping tail. Data points with error bars. Reference curve (dashed) + user model (cyan) comparison. Legend present. |
| 24 | Visual | Star field | PASS | Two-layer stars (800 dim + 80 bright) with circular particle shader. |
| 25 | Visual | Credit line | PASS | "COSMOS -- Swinburne Astronomy Online | CMB data: ESA/Planck Collaboration". |

### Verdict: FAIL

- Passed: 21/25
- Failed: #1, #7, #21, #22

### Failed checks detail

1. **Check #1 (Agent compliance)**: The coder used procedural noise textures and an analytical spectrum model. The spec requires ESA Planck equirectangular images and a pre-computed CAMB grid with 4D interpolation. The code has TODO comments at lines 198-203 acknowledging these are placeholders.
   **Rule violated**: Spec Stage 1 ("Download ESA Planck equirectangular CMB image") and Stage 4 ("Pre-computed CAMB grid loaded as embedded JSON").
   **Suggested fix**: (a) Download Planck 2018 SMICA equirectangular image from ESA and save to `experimental/assets/textures/cmb/planck_smica_2048.jpg`. Download a 143 GHz composite for the Raw Sky layer. (b) Run the CAMB Python script from the spec to generate the 625-spectrum grid JSON. Embed it and implement the 4D multi-linear interpolation.

2. **Check #7 (Embedded mode spectrum panel)**: The power spectrum canvas remains at 400x220 in embedded mode. The style guide requires 2D canvases to shrink to approximately 240x140 in embedded mode.
   **Rule violated**: Style guide: "Embedded mode: ... 2D canvases shrink via CSS (width: 240px; height: 140px)".
   **Suggested fix**: Add CSS rule `body.embedded #spectrum-canvas { width: 240px; height: 140px; }`.

3. **Check #21 (Planck textures)**: All three sphere texture layers (CMB, Galaxy Removed, Raw Sky) are generated procedurally from noise. While they produce a CMB-like visual, they do not represent the actual Planck data.
   **Suggested fix**: Download the ESA images as specified. Generate the Galaxy Removed layer by overlaying the analytical dipole onto the real SMICA CMB texture.

4. **Check #22 (CAMB grid)**: The analytical power spectrum model is an approximation. While it correctly captures qualitative parameter dependencies (H0 peak shift, baryon odd/even ratio, Silk damping), it is not derived from actual Boltzmann code output.
   **Suggested fix**: Install CAMB (`pip install camb`), run the Python script from the spec to generate `cmb_grid.json`, embed the grid data, and implement multi-linear 4D interpolation as specified.

### Passed checks (do not break on retry)
- Bloom pipeline (EffectComposer + UnrealBloomPass + OutputPass)
- Circular particles (ShaderMaterial with gl_PointCoord)
- All layer toggle buttons work correctly
- Click-to-inspect with galactic coords and DeltaT
- Power spectrum shape and data points correct at Planck values
- H0 and Omega_b slider effects are qualitatively correct
- Color bar updates per layer with correct ranges
- Spacebar cycles layers
- Star field (two-layer, circular)
- Credit line with ESA/Planck attribution
- Info panel readouts update with slider changes
- Reset button functional
- Background #000

### Notes

The app is architecturally sound and has all required features implemented. The physics of the power spectrum analytical model is qualitatively correct. The main gaps are data-level: real Planck textures and CAMB-computed spectra. These are prerequisites that require external tools (image download, Python CAMB) before the coder can integrate them. Once the data are available, integrating them should be straightforward -- the texture loading and spectrum interpolation plumbing are already in place.
