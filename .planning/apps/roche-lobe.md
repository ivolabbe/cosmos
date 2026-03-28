# Roche Lobe Interactive -- Dev Log

## Verification Log

### FAIL: Roche Lobe Interactive (v1)

**Date**: 2026-03-29
**Screenshots**: `/tmp/roche-lobe-interactive-initial.png`, `/tmp/roche-lobe-interactive-rotated.png`, plus in-browser screenshots at multiple states
**Agent instructions checked**: `.agents/sao-coder.md`, `.agents/INTERACTIVE-STYLE-GUIDE.md`
**Spec**: `.planning/apps/roche-lobe-spec.md`

### Checklist

| # | Category | Check | Result | Detail |
|---|----------|-------|--------|--------|
| 1 | Agent compliance | Coder followed instructions | FAIL | Default fill factor 0.80, spec says 1.05 (see #10). Missing `#loading` element. Missing `?embed` URL parameter support. |
| 2 | Rendering | Scene renders without errors | PASS | No JS console errors. WebGL renders correctly. |
| 3 | Rendering | Bloom pipeline present | PASS | EffectComposer + UnrealBloomPass + OutputPass all present. |
| 4 | Rendering | Circular particles (no PointsMaterial) | PASS | ShaderMaterial with `gl_PointCoord` discard + Gaussian falloff used throughout. No PointsMaterial. |
| 5 | Style | House style CSS matches snippets | PASS | Background #000, controls bar bottom-center, info panel top-left, credit line, correct fonts. |
| 6 | Style | Embedded mode works | FAIL | Only iframe detection (`window.self !== window.top`). Missing `?embed` URL parameter support per style guide pattern used by other apps. CSS rules for `.embedded` class are correct. |
| 7 | Controls | All controls functional | PASS | q slider, fill slider, speed selector, mode toggle, orbits checkbox, labels checkbox, presets dropdown -- all work. |
| 8 | Controls | Spacebar play/pause | PASS | Spacebar toggles play/pause correctly. |
| 9 | Physics | Roche potential formula | PASS | Formula matches rozwadowski/Roche-lobe convention. Internally consistent: body at x=1/(q+1) has mass fraction q/(q+1), body at x=-q/(q+1) has mass fraction 1/(q+1). COM at origin, separation a=1. |
| 10 | Physics | Default fill factor | FAIL | Defaults to 0.80 (mass transfer inactive on first load). Spec appendix "Sensible Defaults" says fill=1.05 so mass transfer is visible immediately. The key feature is hidden on first load. |
| 11 | Physics | L1 position correct | PASS | For q=0.5, L1 at x=0.237 confirmed by independent bisection. L1 is between the two stars, closer to the less massive body (at +x). For q=1.0, L1 at x=-0.000 (midpoint). |
| 12 | Physics | L4/L5 equilateral triangles | PASS | For q=0.5: L4 at (0.167, 0, 0.866). Distance to both stars = 1.000 (perfect equilateral triangle). |
| 13 | Physics | Roche lobe shape (isosurface) | PASS | Marching cubes at Phi=Phi_L1 produces correct teardrop shapes. For q=1.0, lobes are symmetric. For q<1, the more massive body has the larger lobe. Lobes meet at L1 with cusp. |
| 14 | Physics | Contour panel topology | PASS | Figure-of-eight at critical potential. Inner contours are separate closed curves. Outer contours envelop both stars. L1-L5 correctly marked. Star positions marked. |
| 15 | Physics | Mass transfer direction | PASS | Stream flows from donor (fills its lobe, at +x) through L1 toward accretor (at -x). Correct direction. |
| 16 | Physics | Coriolis deflection | PASS | Stream curves away from the line joining stars. Coriolis acceleration is +2*vz for x and -2*vx for z (Omega along +Y). Stream curves in prograde direction in the co-rotating frame. |
| 17 | Physics | Accretion disk | PASS | Disk particles orbit around the accretor at approximately the circularization radius. Keplerian angular velocity used. Disk rotates in prograde direction. |
| 18 | Physics | Eggleton formula | PASS | `eggleton(q)` gives donor's Roche lobe radius (donor has mass fraction q/(q+1)). For q=0.5: r_L=0.321. For q=1.0: r_L=0.379. Values are self-consistent with the potential convention. |
| 19 | Physics | Symmetry at q=1 | PASS | Both lobes identical in contour panel. L1 at midpoint. Both stars equidistant from COM. |
| 20 | Visual | Translucent lobes visible | PASS | Alpha=0.18 in Potential mode, 0.04 in Gas mode. Stars visible through lobes. |
| 21 | Visual | Particle stream smooth | PASS | Circular particles, color gradient orange-to-white-to-blue, no gaps. |
| 22 | Visual | Gas vs Potential modes | PASS | Gas mode: higher bloom (0.8), brighter particles, lobes nearly invisible. Potential mode: standard bloom (0.5), lobes prominent. Visually distinct. |
| 23 | Visual | Star rendering | PASS | Luminance-tint shader on sun texture. Donor T=5000K (yellow), accretor T=10000K (blue-white). Correct for Algol-type system. |
| 24 | Visual | Two-layer stars background | PASS | 800 dim + 80 bright stars per style guide pattern. |
| 25 | Visual | Contour panel quality | PASS | Smooth contour lines, critical contour bright yellow, L-points marked, filled potential map with color gradient. |
| 26 | Code | Opacity inconsistency | FAIL | Isosurface built with alpha=0.18 (Potential) / 0.04 (Gas) but mode toggle sets alpha=0.12 (Potential) / 0.03 (Gas). After toggling modes, Potential opacity drops from 0.18 to 0.12. |
| 27 | Code | Missing loading indicator | FAIL | No `#loading` element. Style guide coder template includes one. |

### Verdict: FAIL
- Passed: 22/27
- Failed: #1, #6, #10, #26, #27

### Failed checks detail:

1. **Check #1 (Agent compliance)**: Default fill factor is 0.80, not 1.05. The spec's "Sensible Defaults for First Load" section explicitly states: "Fill factor = 1.05 (star slightly overflowing, stream visible)." This means the key feature (mass transfer) is not visible when the page first loads.
   **Rule violated**: Spec appendix "Sensible Defaults for First Load."
   **Suggested fix**: Change line 513 from `let fillFactor = 0.8;` to `let fillFactor = 1.05;` and update the HTML slider default from `value="0.8"` to `value="1.05"`.

2. **Check #6 (Embedded mode URL parameter)**: The embedded mode detection only uses `window.self !== window.top`. Other COSMOS apps (density-wave, cmb, large-scale-structure) also support `new URLSearchParams(location.search).has('embed')`.
   **Rule violated**: Consistency with other COSMOS apps; verify.js tests `?embed=1`.
   **Suggested fix**: Change line 161 to: `const isEmbedded = window.self !== window.top || new URLSearchParams(location.search).has('embed');`

3. **Check #10 (Default fill factor)**: Same as #1 -- fill factor must default to 1.05 per spec.

4. **Check #26 (Opacity inconsistency)**: Building the isosurface uses `const alpha = gasMode ? 0.04 : 0.18;` (line 925) but the mode toggle handler sets `lobeMesh.material.opacity = gasMode ? 0.03 : 0.12;` (line 1485). After the first mode toggle, the opacity values differ from the initial build.
   **Suggested fix**: Make both code paths use the same values. Use 0.15 for Potential and 0.03 for Gas in both locations (or whatever the intended values are).

5. **Check #27 (Missing loading indicator)**: The style guide coder template includes a `#loading` overlay. This app omits it.
   **Suggested fix**: Add a simple `<div id="loading">Loading...</div>` with appropriate styling that hides after the scene initializes.

### Passed checks (do not break on retry):
- #2, #3, #4, #5, #7, #8, #9, #11, #12, #13, #14, #15, #16, #17, #18, #19, #20, #21, #22, #23, #24, #25

### Notes for CEO

**Physics correctness**: The Roche potential implementation is solid. The potential formula, Lagrange point finders, marching cubes isosurface, ballistic stream with Coriolis, and accretion disk are all physically correct. The coordinate convention from rozwadowski is self-consistent. The naming in the code ("Star 1" = donor at +x, less massive) is confusing but internally consistent -- the donor has mass fraction q/(q+1) and the Eggleton formula `eggleton(q)` correctly gives its Roche lobe.

**Visual quality**: The app looks good. The translucent Roche lobes, luminance-tinted stars, contour panel, and particle stream are all well-rendered. Gas mode provides a dramatic alternative view. The bloom is well-calibrated. The contour panel is particularly nice -- smooth lines with clear topology.

**What needs fixing**: Only minor issues. The most important fix is the default fill factor (1.05 instead of 0.80) so mass transfer is visible on first load. The embedded mode URL parameter and opacity consistency are quick fixes. The loading indicator is a minor omission.

**This is the first browser-based interactive Roche lobe visualization with real-time mass transfer.** Zero prior art in JavaScript. The implementation is impressive for a Hard-tier app.
