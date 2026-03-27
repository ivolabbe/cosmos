# Sun Interactive — Dev Log

## Status: Complete (2026-03-28)

## Files
- `experimental/sun-interactive.html` — Babylon.js particle sun
- `experimental/sun-article.html` — Article page with embed
- `experimental/textures/sun/T_SunSurface.png`, `T_SunFlare.png`, `T_Star.png` — Particle textures (Patrick Ryan / Microsoft)

## Architecture
- **Engine:** Babylon.js (not Three.js) — uses `ParticleHelper.CreateAsync("sun", scene)` preset
- **3 particle sub-systems:** sunSystem (1600 particles, surface), flareParticles (20, billboard flares), glareParticles (600, corona glow)
- **Post-load tweaks:** damped updateSpeed (60%), boosted flare emitRate (4×), widened flare scale (0.3–3.0), shortened flare lifetime (4–8s)

## Controls
- **Speed:** multiplies updateSpeed on all systems
- **Activity:** cubic scaling on flares (`a³ × 10`), gentle ramp on glare (`0.35 + a×0.55`), moderate on surface (`0.6 + a×0.8`)
- **Auto-rotate:** camera alpha decrement (clockwise)

## Key Decisions
- Babylon.js chosen because the `ParticleHelper` sun preset gives a visually stunning result that would be very hard to replicate from scratch
- Manual particle parameter recreation (attempted first) did NOT match the preset — always use `CreateAsync`
- Limb darkening: fresnel sphere (power 4, 45% opacity at edge) rendered after particles
- Embedded info panel widened to 220px to fit luminosity readout on one line

## Lessons Learned
- `ParticleHelper.CreateAsync` loads from Babylon CDN — needs network
- Particle system capacity is set at creation time, can't be changed after
- Flare emitRate × lifetime must stay below capacity for steady state
- The "undulating" look comes from high updateSpeed — damping to 60% fixes it
