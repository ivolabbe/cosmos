# Satellites & Orbits Interactive — Dev Log

## Status: Complete (2026-03-28)

## Files
- `experimental/satellites-interactive.html` — Three.js interactive
- `experimental/satellite.html` — COSMOS article with embed
- `experimental/models/satellites/` — glTF model (Earth globe, airline routes)
- `experimental/models/satellites/catalog/` — CelesTrak/SATCAT orbit data
  - `cat_leo.bin` (2000 subsampled from 14,071), `cat_meo.bin` (168), `cat_geo.bin` (595), `cat_heo.bin` (41)
  - `debris_positions.bin` (14,587 objects × 8 points)
  - `all_positions.bin` (14,875 satellite epoch positions — not currently used)
- `experimental/assets/CREDITS.md` — All attributions

## Architecture
- **Engine:** Three.js with importmap CDN
- **Earth globe:** glTF sphere with custom ShaderMaterial (edge-detected coastlines from landmak.png + 8k NASA nightmap city lights as additive overlay)
- **Satellite orbits:** CelesTrak active catalog (OMM CSV), computed via Kepler solver, stored as GL_LINES .bin files
- **Debris:** SATCAT filtered for OBJECT_TYPE DEB/R/B, 8 points per object along ~30° arc, custom point shader (round dots, altitude-based size/brightness, capped on zoom)
- **Atmosphere:** Single FrontSide sphere, ray-marched column density (8 samples, `exp(-alt/H)` integration). Bright at limb (long path), faint face-on (short path)
- **Bloom:** UnrealBloomPass (strength 0.5, radius 0.8, threshold 0.5)
- **Airline routes:** From original Sketchfab glTF, arc heights compressed to 50%

## Key Technical Decisions

### Atmosphere rendering (hardest part)
Tried and failed:
1. Single fresnel rim (BackSide) — just a ring, wrong profile
2. Single fresnel rim (FrontSide) — bright at OUTSIDE edge, not inside
3. Multiple discrete shells with uniform opacity — visible banding
4. Multiple shells with per-fragment fresnel — still bands + wrong profile
5. Stemkoski glow shader — OK for stylized, can't do smooth exponential
6. Many thin uniform shells (BackSide) — correct profile direction but visible banding

**What worked:** Single FrontSide sphere with ray-marched column density. Fragment shader computes view ray, finds intersection with Earth or far atmosphere boundary, numerically integrates `exp(-altitude/scaleHeight)` along 8 sample points. Beer-Lambert `1 - exp(-τ)` for opacity. Intensity = 3.0.

### Orbit generation
- **Coordinate system:** Three.js Y=up. Orbital mechanics Z=polar. Must swap Y/Z in output.
- **Sampling:** Use mean anomaly (uniform in time), solve Kepler M→E→ν. True anomaly sampling clusters points at perigee, leaving apogee arcs jagged for eccentric orbits.
- **Classification:** eccentricity > 0.1 → HEO regardless of altitude (prevents elliptical transfer orbits being classified as GEO).
- **RAAN distribution:** LEO/Tech = random, GPS = 6 discrete planes (60° apart), GEO = equatorial (no rotation).

### Line rendering
- Additive blending for neon glow effect
- Per-type opacity: LEO 0.03, MEO 0.35, GEO 0.12, HEO 0.5, airlines 0.05, comms 0.1
- Dense layers (airlines, LEO) need very low opacity to avoid bloom blowout

### Debris points
- Custom ShaderMaterial (not PointsMaterial) for round dots via `gl_PointCoord`
- Altitude-based: size 0.3×→1× and brightness 8%→60% via `smoothstep(0, 0.5, altitude)`
- Point size capped at 4px to prevent blob on zoom-in

## Data Sources
- **Satellite orbits:** CelesTrak GP data (mirrors Space-Track), downloaded 2026-03-27
- **Debris:** CelesTrak SATCAT (68k objects), filtered for DEB + R/B, non-decayed
- **Earth textures:** Solar System Scope (CC BY 4.0, based on NASA imagery)
- **Globe model:** Loïc Norgeot / Sketchfab (CC BY 4.0) — used for Earth mesh + airline routes only
