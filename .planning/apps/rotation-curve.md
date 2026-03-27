# Rotation Curve Interactive — Dev Log

## Overview
Face-on spiral galaxy with orbiting particle-stars and linked rotation curve v(R) panel. Dark matter halo slider demonstrates evidence for dark matter: removing it causes the curve to drop Keplerian and outer particles to slow. Third physics sim app.

## Status: Complete (2026-03-28)

### Files
- Interactive: `experimental/rotation-curve-interactive.html` (878 lines)
- Article: `experimental/rotation-curve-article.html` (211 lines)
- Spec: `.planning/apps/rotation-curve-spec.md` (510 lines)

### Features
- Face-on spiral galaxy (3000+ particle-stars in orbital motion)
- Rotation curve panel (2D canvas, v vs R with component curves)
- Dark matter halo slider (0-100%): removing DM → Keplerian decline
- Component curves: bulge (red), disk (green), halo (blue), total (white)
- Distance scale ring (5 kpc label)
- Central bulge glow
- Top-down camera view
- Stars background with bloom

### Physics
- Bulge: point-mass approximation v_bulge(R) = sqrt(G×M_bulge/R)
- Disk: exponential disk contribution
- Halo: isothermal/NFW v_halo(R) — flat at large R
- Total: v_total = sqrt(v_bulge² + v_disk² + v_halo²)
- Milky Way values: v_c ≈ 220 km/s at R_sun ≈ 8.2 kpc

### Template used
Asteroid interactive (top-down particle view) + binary star (2D panel pattern)

### Lessons learned
1. THREE.Points with BufferGeometry handles 3000+ particles smoothly at 60fps
2. Update positions in-place with needsUpdate = true
3. Dark matter visualization is powerful pedagogically — the slider makes an abstract concept tangible
4. Face-on galaxy with orbital particles is visually compelling even without spiral arm structure
