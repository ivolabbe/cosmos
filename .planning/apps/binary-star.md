# Binary Star Interactive — Dev Log

## Overview
3D interactive binary star system: two stars orbiting center of mass, linked radial velocity curves and eclipse light curve panels. Most complex COSMOS interactive to date (two synchronized 2D diagnostic panels + 3D scene).

## Status: Complete (2026-03-28)

### Files
- Interactive: `experimental/binary-star-interactive.html` (946 lines)
- Article: `experimental/binary-star.html` (246 lines)
- Spec: `.planning/apps/binary-star-spec.md` (666 lines)

### Features
- Two color-coded stars (blue-white hot + yellow-orange cool) orbiting center of mass
- Kepler solver (mean anomaly → eccentric anomaly → true anomaly → position)
- Orbit trails color-coded to match each star
- Radial velocity panel (v_r vs phase, two curves, asymmetric for e>0)
- Eclipse light curve panel (flux vs phase, circle-circle overlap model)
- Mass ratio slider (q = 0.1 to 1.0)
- Eccentricity slider (0 to 0.9)
- Inclination slider (0° to 90°): controls camera angle AND physics (RV amplitude, eclipses)
- Speed selector (0.5x to 10x)
- Orbit trail toggle
- Preset dropdown (e.g. Algol-like system)
- Proper eclipse depth: primary eclipse (hotter star eclipsed) is deeper than secondary
- Stars glow with MeshBasicMaterial + additive blending halos

### Physics
- Two-body Kepler problem: a1 = a × M2/(M1+M2), a2 = a × M1/(M1+M2)
- RV: v_r = K × [cos(ω+ν) + e×cos(ω)]
- Eclipse: circle-circle overlap area (Wolfram MathWorld formula)
- Surface brightness: B ∝ T⁴ (blackbody)
- K1/K2 = M2/M1 = 1/q

### Template used
`experimental/gravitational-waves-interactive.html` — structure (orbiting objects + 2D panels + sliders)

### Bugs found & fixed
- **orbitControls hoisting (critical)**: `const orbitControls` declared after `updateCameraFromInclination()` call that referenced it. `const` doesn't hoist — caused ReferenceError that blocked entire animation loop. Fixed by moving OrbitControls init before the function call.

### Lessons learned
1. `const` declarations in modules don't hoist — any function that references a const must be called AFTER the const is defined
2. Camera-from-inclination approach (camera position = f(i)) is cleaner than rotating the orbit group
3. Two stacked 2D canvas panels work well on the right side for multi-diagnostic views
4. Precompute full curves (360 points) on parameter change, draw with playhead every frame — fast and smooth
5. Surface brightness B ~ T⁴ gives good eclipse depth contrast; R2 scaling with q^0.3 keeps secondary visible at low mass ratios
