# Gravitational Waves Interactive — Dev Log

**Files:** `experimental/gravitational-waves-interactive.html`, `experimental/gravitational-waves-article.html`
**Status:** Milestone 1 complete (2026-03-27)
**Started:** 2026-03-26

## Overview

Binary black hole inspiral & merger visualization. Three.js spacetime mesh with GLSL shader ripples, WebAudio chirp, 2D canvas spectrogram. 2D mode (spacetime fabric) and 3D mode (volumetric GW strain). Embeddable via iframe in article page.

## Architecture

- Three.js 0.170 via CDN importmap
- Custom GLSL vertex/fragment shaders for spacetime deformation (2D mode)
- Volumetric ray-marched sphere shader for 3D GW strain (3D mode, 48 steps)
- EffectComposer + UnrealBloomPass for glow effects
- WebAudio oscillator for chirp sound
- 2D canvas for frequency-vs-time spectrogram + waveform panel
- Leading-order PN inspiral (RK4 on df/dt), extends to 2x f_ISCO, damped QNM ringdown
- Configurable binary masses via sliders (1-50 Msun each), default 15+30

## Milestone 1 — Feature-complete demo (2026-03-27)

### Speed profile
- Smooth progress-based sigmoid (center=0.89, k=60)
- Start: 0.04 speed, ramp over 0→25% progress (~4 slow demo orbits)
- Cruise: 2.0, decel to END_SPEED = 2/(1.5×f_ISCO), mass-adaptive
- Merger boost: 0.1 at p=0.998. VIS_DURATION=16. Total ~59s

### 2D mode
- Spacetime mesh with gravity wells (WELL_DEPTH=0.2) and quadrupolar GW ripples
- Diverging colormap: red/blue with HDR bloom
- Grid lines as spacetime fabric. Mesh offset y=-0.6 (BHs at y=0)
- Improved amplitude→color mapping (smoothstep 0.25/0.8)

### 3D mode (volumetric ray-marched sphere)
- Physics: h₊ + h× from (2,±2) modes, correct quadrupolar pattern
- Phase: `u_phase - kr + 2φ` (same as 2D, outward propagation)
- Rendering: premultiplied alpha compositing (CustomBlending One/OneMinusSrcAlpha)
  - Dark gaps truly transparent (not additive fog)
  - Discrete color bands with threshold (|field|<0.45 → skip)
  - Cubic gamma on bandOpacity for peak emphasis
  - Simple additive accumulation matching gwpv playground approach
- Colormap: green → yellow-green → red-orange (positive), dark blue → blue → teal (negative)
- Compressed amplitude (0.3+0.5√a) for visibility across all mass ratios
- Inner/outer radial screening (smoothstep fades)
- Grid-only mesh overlay (translucent white lines, transparent surface)

### UI
- Info panel (380px) with live readouts, caption pattern for embedded mode
- Chirp spectrogram + waveform panel (300×150)
- Controls: mass sliders, play/pause, auto speed, manual speed, sound, 3D toggle
- Reset restores default masses (15+30), auto speed, all state
- Orbital trails: per-vertex alpha fade (transparent not black), visible in 2D+3D
- BHs/remnant always at y=0, consistent between modes
- Darker background (#060618)

### Physics (verified)
- h₊ = (1+cos²θ)/2 × cos(Φ) — symmetric about orbital plane
- h× = cosθ × sin(Φ) — anti-symmetric, creates 90° phase offset between hemispheres
- 1/r amplitude falloff, quadrupolar angular pattern
- Leading-order PN inspiral with RK4, Schwarzschild ISCO, QNM ringdown
- Chirp mass, f_ISCO, f_QNM all computed from input masses
- Counter-clockwise orbits, outward wave propagation

## Iteration Log

### v1 — Initial prototype (2026-03-26)
- Full inspiral physics, spectrogram, audio, orbital animation
- Known issues fixed: NaN from negative dt, duplicate const, GLSL variable shadowing

### v2 — Speed profile iterations (2026-03-27)
- Frequency-based blend → frame-skipping at high f. Rejected.
- dtSim cap → jerky. Rejected.
- Progress-based sigmoid → smooth. Accepted. Tuned center/k/ramp over many iterations.

### v3 — 3D mode iterations (2026-03-27)
- Stacked transparent planes → replaced with ray-marched sphere
- Additive blending → foggy, no dark gaps. Switched to premultiplied alpha.
- Smooth colormap → blobby. Switched to discrete bands from gwpv playground.
- Chirp retarded-time phase tried → negligible effect at our wave speed. Reverted to constant k.
- h² energy density, gamma mapping, threshold-based transfer function all explored
- Final: simple additive accumulation + alpha compositing, discrete bands, cubic gamma

## Open Issues

- [ ] Spiral arm structure not as crisp as gwpv/SXS reference (volume integration smears azimuthal structure)
- [ ] Mobile/touch support
- [ ] Test article iframe embed with 3D mode
- [ ] Performance profiling of ray-marched shader on lower-end GPUs
- [ ] Spacebar play/pause (planned, not yet implemented)
- [ ] Consider dual-channel polarisation mode (h₊ and h× as separate color channels)

## Future Ideas

- Camera preset angles for 3D (face-on vs edge-on views)
- vtk.js integration for higher-quality volume rendering
- Higher-order modes for unequal mass systems
- Spin effects / precession
