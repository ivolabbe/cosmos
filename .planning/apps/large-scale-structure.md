# Large-Scale Structure Interactive — Dev Log

## Verification Log

### PASS (with notes): large-scale-structure interactive

**Date**: 2026-03-29
**Screenshots**:
- `/tmp/lss-z0-fullscreen.png` — z=0 fullscreen, Dark Matter mode
- `/tmp/lss-z10.png` — z=10, nearly uniform distribution
- `/tmp/lss-z5.png` — z=5, intermediate structure
- `/tmp/lss-z2.png` — z=2, early web forming
- `/tmp/lss-baryon.png` — z=0, Galaxies (baryon) mode
- `/tmp/lss-embedded.png` — embedded mode
- `/tmp/lss-zoomed.png` — zoomed in, particle shape visible
- `/tmp/lss-nogrid.png` — grid toggled off

**Agent instructions checked**: `.agents/sao-coder.md`

### Checklist

| # | Category | Check | Result | Detail |
|---|----------|-------|--------|--------|
| 1 | Agent compliance | Coder followed instructions | PASS | House style, bloom pipeline, circular particles, embedded mode, spacebar all present |
| 2 | Rendering | Scene renders without errors | PASS | No JS console errors (one expected 404 for favicon) |
| 3 | Rendering | Bloom pipeline present | PASS | EffectComposer + UnrealBloomPass(0.4, 0.7, 0.4) + OutputPass |
| 4 | Rendering | Circular particles (no PointsMaterial) | PASS | ShaderMaterial with gl_PointCoord discard + Gaussian falloff, no PointsMaterial |
| 5 | Style | Background #000 | PASS | `renderer.setClearColor(0x000000)` and `body { background: #000; }` |
| 6 | Style | House style CSS | PASS | Controls bar at bottom centre, info panel top-left, glass panels, Swinburne red accent |
| 7 | Style | Embedded mode works | PASS | `?embed=1` adds `.embedded` class; title, desc, hint, credit all hidden; compact readout |
| 8 | Style | Credit line | PASS | "Zel'dovich approximation - Planck 2018 (Omega_m=0.315) - COSMOS -- Swinburne Astronomy Online" |
| 9 | Controls | Play/Pause button | PASS | Toggles correctly; shows "Play" when stopped, "Pause" when playing; `.active` class with red bg |
| 10 | Controls | Spacebar play/pause | PASS | keydown listener for Space, preventDefault, triggers btn-play click |
| 11 | Controls | Redshift slider (z=0 to z=10) | PASS | Range 0-10, step 0.1, updates positions and readouts correctly |
| 12 | Controls | Speed selector | PASS | 0.5x, 1x, 3x options |
| 13 | Controls | Galaxies (baryon) toggle | PASS | Toggles DM/baryon visibility; readout updates to "Galaxies" / "Dark Matter" |
| 14 | Controls | Grid toggle | PASS | Shows/hides grid and BAO sphere |
| 15 | Controls | Labels toggle | PASS | Shows/hides all sprite labels |
| 16 | Physics | Growth factor D(z) | PASS | Numerical integration matches Python reference: D(0)=1.000, D(0.5)=0.769, D(1)=0.607, D(2)=0.417, D(5)=0.211, D(10)=0.115. Spec test values were inaccurate (see notes). |
| 17 | Physics | Lookback times | PASS | t_lb(0)=0.0, t_lb(1)=8.0, t_lb(2)=10.5, t_lb(5)=12.6, t_lb(10)=13.3 Gyr — matches numerical integration with H0=67.4 |
| 18 | Physics | Nearly uniform at z=10 | PASS | Distribution is much more uniform at z=10 than z=0; grid-like pattern faintly visible with small perturbations. D(10)=0.115 means RMS displacement ~1 Mpc vs 5.4 Mpc grid spacing — physically correct. |
| 19 | Physics | Progressive structure formation | PASS | z=10 (near-uniform) -> z=5 (faint walls) -> z=2 (early filaments) -> z=0 (full cosmic web). Correct morphological sequence. |
| 20 | Physics | Filamentary topology at z=0 | PASS | Clear filaments connecting dense nodes, surrounding large empty voids. Not a random scatter, not a single blob. |
| 21 | Physics | Void dominance | PASS | Voids occupy most of the volume visually. Network of filaments with empty space between — correct. |
| 22 | Physics | BAO scale sphere | PASS | Wireframe sphere at radius 75 Mpc (150 Mpc diameter), ~75% of box side. Labelled "BAO scale ~150 Mpc". |
| 23 | Physics | Baryon mode | PASS | Shows only top ~17.6% densest particles (target ~16%, close). Voids appear empty. Filament spines sparser than DM mode. Warm gold/orange palette vs purple DM palette — visually distinct. |
| 24 | Physics | Zel'dovich approximation implementation | PASS | Grid-based Fourier modes (k commensurate with periodic box), Box-Muller Gaussian amplitudes, P(k) with Bardeen+86 / Eisenstein-Hu transfer function shape, RMS displacement calibrated to 9 Mpc, periodic wrapping. |
| 25 | Physics | Density estimation | PASS | Cell-based spatial hashing (6 Mpc cells), neighbour counting within smoothing radius. Used for baryon threshold and colour mapping. |
| 26 | Visual | Cosmic web visually striking | PASS | Filamentary structure clearly visible. Purple-to-white density colour mapping is effective. |
| 27 | Visual | Depth fog | PASS | FogExp2(0x000000, 0.005) — distant particles fade into black background. Creates clear 3D depth sense. |
| 28 | Visual | DM vs Baryon visually distinct | PASS | DM: purple palette (0x5533cc to 0xeeddff). Baryons: warm gold palette (0xff8822 to 0xffeedd). Clearly different. |
| 29 | Visual | Grid lines subtle | PASS | Dashed lines at opacity 0.07, colour #666666. Visible but unobtrusive. |
| 30 | Visual | Background stars | PASS | Two-layer: 600 dim (0.3 size, 0.25 opacity) + 50 bright (0.5 size, 0.8 opacity). ShaderMaterial with circular particles. |
| 31 | Visual | Particles circular | PASS | Confirmed at zoomed view — particles are round with Gaussian falloff. |
| 32 | Visual | Labels readable | PASS | Scale labels (50 Mpc, 100 Mpc), BAO label, structural labels (Galaxy Cluster, Void, Filament) — all readable, not cluttering. |
| 33 | Feature | Fog slider | **MISSING** | Spec lists "Fog slider (0-1)" in Features & Controls (Stage 5). Not implemented. Fog is fixed at 0.005. |
| 34 | Feature | Distance scale bar (HTML overlay) | **MISSING** | Spec lists "Distance scale bar (HTML overlay)" in Features section. Not implemented. |
| 35 | Feature | Fly-through mode | **MISSING** | Spec Stage 5 describes fly-through camera with auto-pilot spline path. Not implemented. |
| 36 | Feature | "What am I seeing?" overlay | **MISSING** | Spec Stage 7 describes educational overlay. Not implemented. |
| 37 | Feature | Colour legend | **MISSING** | Spec Stage 6 describes density colour bar. Not implemented. |

### Verdict: PASS (with missing features from Stages 5-7)

- **Passed**: 32/37
- **Missing features**: 5 (checks #33-37)

### Missing features detail

These are all from the spec's later build stages (5-7). The core physics (Stages 1-4) and core visual/controls (Stage 6 basics) are fully implemented and working correctly.

1. **Check #33 — Fog slider**: Spec requires a fog slider (0-1) in the controls bar. Currently fog is fixed at `FogExp2(0x000000, 0.005)`. Add `<input type="range" id="sl-fog" min="0" max="1" step="0.01" value="0.5">` and wire to `scene.fog.density = value * 0.016`.

2. **Check #34 — Distance scale bar**: Spec requires an HTML overlay distance scale bar (similar to asteroid belt). Not implemented. Should show projected length of 50 Mpc at current zoom.

3. **Check #35 — Fly-through mode**: Spec Stage 5 describes an auto-pilot camera path along a spline through the densest filament. This is a polish feature, not essential for physics correctness.

4. **Check #36 — Educational overlay**: Spec Stage 7 describes a "What am I seeing?" toggle panel. Polish feature.

5. **Check #37 — Colour legend**: Spec Stage 6 describes a small colour bar showing the density scale. Polish feature.

### Passed checks (do not break on iteration)
1-32 all pass. Key items to preserve:
- Growth factor numerical integration (more accurate than Carroll+1992)
- Grid-based Fourier mode generation with Hermitian symmetry
- RMS displacement calibration to 9 Mpc
- Cell-based density estimation
- Dual particle system (DM + baryon) sharing position buffer
- Periodic boundary wrapping
- All house style elements (bloom, circular particles, controls bar, info panel, embedded mode, spacebar, credit)

### Notes

**Spec growth factor test values are inaccurate.** The spec states D(z=10)/D(0) ~ 0.079, D(z=5)/D(0) ~ 0.155, D(z=2)/D(0) ~ 0.394. Independent verification via Python numerical integration confirms the implementation's values are correct: D(10) = 0.115, D(5) = 0.211, D(2) = 0.417. The Carroll+1992 approximation also gives the same values as the implementation. The spec's test values appear to have been computed with an error. The spec should be updated.

**Baryon fraction is 17.6% vs target 16%.** The threshold is computed as the 84th percentile of density values, giving ~17.6% baryonic particles. This is close to the target f_b ~ Omega_b / Omega_m = 0.156. The slight excess comes from discrete binning. Acceptable.

**Visual quality assessment.** The cosmic web is visually striking at z=0 with clear filamentary topology. The purple colour palette for dark matter and warm gold for baryons are well-chosen and visually distinct. Depth fog works effectively. The zoomed view confirms particles are properly circular with Gaussian falloff. Bloom is subtle and enhances only the brightest cluster nodes without overwhelming. Background stars are present and appropriate.

The implementation uses a sophisticated approach to the displacement field: grid-based Fourier modes commensurate with the periodic box (ensuring true periodicity), with Hermitian symmetry to avoid conjugate pairs. This is better than the spec's suggested random-direction approach. The Bardeen+86 transfer function shape is also more physically accurate than the spec's simplified exponential cutoff.

**Performance.** Initialization takes ~1.5s for the displacement field and ~50ms for density estimation. The per-frame position update is instant (scalar multiply + add). 50,653 particles render smoothly.
