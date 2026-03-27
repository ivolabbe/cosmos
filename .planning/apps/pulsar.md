# Pulsar Interactive — Dev Log

## Overview
3D interactive pulsar visualization: rotating neutron star with tilted magnetic dipole, emission beam cones (lighthouse sweep), real-time pulse profile panel, audio sonification. First medium-tier physics sim app.

## Status: Complete (2026-03-28)

### Files
- Interactive: `experimental/pulsar-interactive.html` (895 lines)
- Article: `experimental/pulsar-article.html` (206 lines)
- Spec: `.planning/apps/pulsar-spec.md` (581 lines)

### Features
- 3D neutron star (glowing sphere + bloom halo)
- 8 magnetic dipole field lines (r = r0 * sin²θ), 4 azimuthal × 2 radial
- Two emission beam cones with custom radial/axial fade shader (additive blending)
- Pulse profile panel (2D canvas, Gaussian beam model, playhead)
- Interpulse support (both magnetic poles)
- Logarithmic period slider: 1.4 ms to 8.5 s
- Magnetic inclination (tilt) slider: 0° to 90°
- Observer viewing angle slider: 0° to 90°
- Observer line-of-sight indicator (dashed line)
- Web Audio API pulse sounds (clicks for slow, continuous buzz for millisecond)
- Real-time readouts: period, beam angle, B-field, characteristic age, spin-down luminosity
- Visual spin cap at 2 Hz for fast pulsars (physics runs at correct rate)
- Stars (two-layer: 800 dim + 80 bright bloom)
- Embed mode with compact readout

### Physics
- Beam half-angle: ρ = 5.75° × P^{-1/2} (Rankin 1993), clamped at 80° for visual quality
- Pulse detection: cos(θ_beam) = sin(α)sin(ζ)cos(ωt) + cos(α)cos(ζ)
- Anti-pole: θ_anti = π - θ_north
- Gaussian profile: I(φ) = exp(-θ²/(2σ²)), σ = ρ/2.35 (FWHM = ρ)
- Characteristic age: τ_c = P/(2Ṗ)
- B-field: B = 3.2×10^19 × √(PṖ) G
- Spin-down luminosity: Ė = 4π²IṖ/P³

### Template used
`experimental/gravitational-waves-interactive.html` — structure (2D panel, sliders, audio, readouts)

### Verified
- Puppeteer headed: canvas renders, no JS errors, loading hides
- 12 screenshot states tested (default, alpha=0, alpha=90/zeta=90, various periods, no-pulse, interpulse)
- All physics checks passed after interpulse fix
- Article renders correctly with embedded iframe

### Bugs found & fixed
- **Anti-pole interpulse (critical)**: Spec's formula `pulseIntensity(phase, PI-alpha, zeta, rho)` gives I1=I2 when alpha=90°. Fixed to use θ_anti = π - θ_north. Verifier caught this via code analysis.

### Lessons learned
1. Spec pseudocode should be unit-tested before giving to coder
2. GW interactive is an excellent template for physics sims (not just planet globes)
3. Procedural apps (no textures) need no loading wait — remove indicator immediately
4. ConeGeometry + custom shader with radial/axial fade = convincing beam look
5. Quaternion rotation order matters: qSpin * qTilt (spin first in world frame)
6. Visual spin cap essential for millisecond pulsars (too fast to see otherwise)
7. Web Audio: continuous oscillator for P < 50ms, discrete clicks for P > 50ms
