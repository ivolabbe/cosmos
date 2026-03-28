# Density Wave Model Interactive — Dev Log

## Verification Log

### PASS: density-wave interactive (2026-03-29)

**Screenshots**: `/tmp/dw-initial.png`, `/tmp/dw-after6s.png`, `/tmp/dw-traffic.png`, `/tmp/dw-zones.png`, `/tmp/dw-4arms.png`, `/tmp/dw-1arm.png`, `/tmp/dw-pitch5.png`, `/tmp/dw-pitch30.png`, `/tmp/dw-omegap40.png`, `/tmp/dw-dm0.png`, `/tmp/dw-embedded.png`, `/tmp/dw-panel-closeup.png`, `/tmp/dw-info-closeup.png`, `/tmp/dw-controls-closeup.png`
**Agent instructions checked**: `.agents/sao-coder.md`, `.agents/sao-verify.md`

#### Checklist

| # | Category | Check | Result | Detail |
|---|----------|-------|--------|--------|
| 1 | Agent compliance | Coder followed instructions | PASS | All house style rules followed; single-file HTML, inline CSS/JS, importmap pattern, black background, bloom pipeline, circular particles, spacebar handler, embedded mode, credit line |
| 2 | Rendering | Scene renders without errors | PASS | No JS errors (only a favicon 404 which is harmless) |
| 3 | Rendering | Bloom pipeline present | PASS | EffectComposer + UnrealBloomPass + OutputPass all present; strength 0.5, radius 0.7, threshold 0.3 |
| 4 | Rendering | Circular particles (no PointsMaterial) | PASS | gl_PointCoord used with discard + exp(-d*d*2.0) Gaussian falloff; no PointsMaterial anywhere |
| 5 | Style | Background #000 | PASS | body background and renderer clearColor both rgb(0,0,0) |
| 6 | Style | Embedded mode works | PASS | ?embed=1 hides title, desc, hint; body gets .embedded class; panel shrinks to 240x140; credit hidden |
| 7 | Style | Controls bar fits one line | PASS | flex-wrap: nowrap, width 807px, no overflow |
| 8 | Style | Credit line present | PASS | "COSMOS - Swinburne Astronomy Online" |
| 9 | Controls | All controls functional | PASS | Play/Pause, Speed (0.01x-1.0x), Omega_p slider (10-50), Arms selector (1-4), Pitch slider (5-35), DM slider (0-100%), Traffic Jam toggle, Zones checkbox -- all tested |
| 10 | Controls | Spacebar play/pause | PASS | Toggles active state correctly (true -> false confirmed) |
| 11 | Physics | v(8.2 kpc) ~ 220 km/s | PASS | Console log: v(8.2 kpc) = 220.0 km/s. Readout v(8) = 219 km/s (slight difference from R=8 vs 8.2, correct) |
| 12 | Physics | Corotation radius at Omega_p=25 | PASS | R_cor = 8.9 kpc (spec expected ~8-9 kpc) |
| 13 | Physics | Stable spiral pattern (no winding) | PASS | Arms clearly visible and stable after 6s at 0.5x speed. Two-arm structure maintained. Pattern rotates rigidly while stars flow through. |
| 14 | Physics | Differential rotation visible | PASS | Inner stars orbit visibly faster than outer stars. At 1.0x speed, inner lapping is obvious. |
| 15 | Physics | Prograde rotation (CCW from above) | PASS | theta += omega_myr * dt (positive), position from cos(theta)/sin(theta) standard CCW convention |
| 16 | Physics | Trailing arms (not leading) | PASS | phi_arm = omP_rad_myr * simTime - invTanPitch * log(R/Rref). Minus sign produces correct trailing spiral. Visually confirmed from screenshots. |
| 17 | Physics | Star formation colouring | PASS | Blue-white (#88ccff) in arms, warm yellow-orange (#ffcc88) between arms. Clear colour contrast visible in all screenshots. Bloom enhances arm glow. |
| 18 | Physics | Omega_p slider moves corotation | PASS | Omega_p=40 -> R_cor=5.2 kpc (moved inward). Omega_p=15 -> R_cor=15.6 kpc (moved outward). Correct behavior. |
| 19 | Physics | Arm count (m) changes instantly | PASS | m=1: single dominant arm. m=2: standard two-arm spiral. m=4: four thinner arms. All respond instantly. |
| 20 | Physics | Pitch angle controls tightness | PASS | 5 deg: tightly wound (Sa morphology). 30 deg: open loose arms (Sc morphology). Correct. |
| 21 | Physics | Traffic jam overlay at Omega_p | PASS | Translucent cyan spiral ribbons rotate rigidly at pattern speed. Stars visibly flow through them. Ribbons don't obscure particles. |
| 22 | Physics | Omega(R) panel correct curves | PASS | White Omega(R) curve high at small R, declining. Cyan Omega_p horizontal at 25. Orange Omega+kappa/m (ILR). Magenta Omega-kappa/m (OLR). All present with correct shapes. |
| 23 | Physics | Panel resonance markers correct | PASS | CR at ~8.9 kpc (green), ILR at ~3.5 kpc (orange), OLR at ~16 kpc (magenta). Markers at correct intersections. Move when Omega_p slider changes. |
| 24 | Physics | DM slider effect | PASS | DM=0%: v(8)=148 km/s (reduced from 219), R_cor=6.3 kpc (shifted inward). Physically correct -- removing dark matter reduces rotation speed and shifts corotation. |
| 25 | Physics | Density wave fades outside ILR-OLR | PASS | Code fades arm_proximity outside ILR/OLR range with 2 kpc transition zones |
| 26 | Physics | Zone rings at correct radii | PASS | Corotation, ILR, OLR rings with labels at physically correct positions. Match panel markers. |
| 27 | Visual | Background stars (two-layer) | PASS | 800 dim (opacity 0.3) + 80 bright (opacity 0.9) with makeCircleMat |
| 28 | Visual | Bulge rendering | PASS | Central glow sphere (0.04 opacity additive), warm yellow bulge particles with pressure-supported orbits (inclination, eccentricity, ascNode) |
| 29 | Performance | 60fps with 10000 particles | PASS | Measured 61 fps |
| 30 | Panel | Readable in both modes | PASS | Fullscreen: 380x220 canvas with clear legend and labels. Embedded: shrinks to 240x140 via CSS. |

#### Verdict: PASS
- Passed: 30/30
- Failed: none

#### Notes

All five implementation stages from the spec are complete:
1. Differential rotation galaxy with density wave colouring -- working
2. Interactive controls (pattern speed, arms, pitch) -- all functional
3. Traffic jam overlay -- working with correct rigid rotation
4. Omega(R) panel with resonance markers -- correct curves and markers
5. Info panel, readouts, DM slider, zone rings, embedded mode, bloom -- all present

The mass model is correctly reused from rotation-curve-interactive.html with tuned rho0 for v(8.2)=220 km/s. The density wave computation is faithful to the spec pseudocode. The ILR/OLR finding algorithms scan in the correct directions.

The only minor note is a favicon 404 error in the console, which is harmless and not related to the app.
