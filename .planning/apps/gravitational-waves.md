# Gravitational Waves Interactive — Dev Log

**Files:** `experimental/gravitational-waves-interactive.html`, `experimental/gravitational-waves-article.html`
**Status:** Active development
**Started:** 2026-03-26

## Overview

Binary black hole inspiral & merger visualization. Three.js spacetime mesh with GLSL shader ripples, WebAudio chirp, 2D canvas spectrogram. 2D mode (spacetime fabric) and 3D mode (volumetric GW strain). Embeddable via iframe in article page.

## Architecture

- Three.js 0.170 via CDN importmap
- Custom GLSL vertex/fragment shaders for spacetime deformation (2D mode)
- Volumetric ray-marched sphere shader for 3D GW strain (3D mode, 32 steps)
- EffectComposer + UnrealBloomPass for glow effects
- WebAudio oscillator for chirp sound
- 2D canvas for frequency-vs-time spectrogram + waveform panel
- Leading-order PN inspiral (RK4 on df/dt), extends to 2x f_ISCO, damped QNM ringdown
- Configurable binary masses via sliders (5-80 Msun each)

## Iteration Log

### v1 — Initial prototype (2026-03-26)
- Full inspiral physics, spectrogram, audio, orbital animation
- Known issues fixed: NaN from negative dt, duplicate const, GLSL variable shadowing

### v2 — Speed profile + 3D mode (2026-03-27)

**Speed profile — multiple iterations converging on progress-based sigmoid:**
- Frequency-based blend tried first — failed because df/dt ∝ f^(11/3) causes frame-skipping at high frequencies (sim jumps past decel zone in 2-3 frames)
- dtSim cap tried — too jerky (discrete speed drops)
- Final solution: **smooth progress-based sigmoid** (progress advances smoothly by construction)
  - Start: 0.04 speed, ramp over 0→25% progress (user sees ~4 slow demo orbits)
  - Cruise: 2.0
  - Sigmoid decel: center=0.88, k=60
  - END_SPEED = 2/(1.5×f_ISCO) — mass-adaptive, ~1 orbit/s at ISCO for 30+30
  - Merger boost: 0.1 at p=0.998
  - VIS_DURATION=16
  - Total: ~58.6s for 30+30 Msun

**3D mode — gwpv-style volumetric GW strain:**
- Replaced stacked transparent planes with single ray-marched sphere
- Proper (l=2, m=2) h+ quadrupolar pattern: `(1+cos²θ)/2 × cos(2φ + ωt - kr)`
- Outward propagation, co-rotating with BH orbit direction
- Smooth inner fade (`smoothstep(1,4,r)`) — no hard black sphere cutoff
- gwpv-style diverging colormap: positive→green/yellow/red, negative→teal/blue
- BHs positioned at y=0 in 3D mode (centered in volume, not elevated for mesh)
- Same camera rotation limits as 2D mode (maxPolarAngle = 0.48π)
- Additive blending, BackSide rendering

**Opacity tuning iterations:**
- 0.08 density — too faint (barely visible)
- 0.35 density — too bright/opaque
- 0.12 density, 1.6 multiplier — user-approved level

## Open Issues

- [ ] Test with different mass configurations (light 5+5, heavy 60+60)
- [ ] Spectrogram readability during slow final moments
- [ ] Mobile/touch support
- [ ] Test article iframe embed with 3D mode
- [ ] Consider adding h× polarisation for richer volumetric pattern
- [ ] Performance profiling of ray-marched shader on lower-end GPUs

## Plan

1. User visual testing of current build
2. Polish 3D colormap to better match gwpv reference
3. Test mass slider interaction in 3D mode
4. Article page embed testing
5. Consider adding camera preset angles for 3D (face-on vs edge-on views)
