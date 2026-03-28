# COSMOS Interactive Demonstration Candidates

Ranked list of encyclopedia pages most suitable for interactive browser-based visualizations (Three.js, WebGL shaders, D3.js, WebAudio). Analyzed 2026-03-26.

## Top 10

### 1. Gravitational Waves (`gravitational-waves.html`) ✅ BUILT
Three.js spacetime fabric mesh deforming in real-time as two compact objects inspiral. User controls mass ratio, separation, eccentricity. Mesh ripples propagate outward. WebAudio oscillator maps wave frequency to sound — user hears the chirp accelerate to merger.

### 2. Black Hole (`black-hole.html`)
GPU-shader gravitational lensing. Starfield ray-traced through Schwarzschild geometry in real-time. User orbits camera, sees Einstein ring, photon sphere, relativistic aberration. Slider controls mass. Accretion disk mode adds Doppler-boosted thin disk.

### 3. Density Wave Model (`density-wave-model.html`)
Top-down galaxy with thousands of particle-stars at Keplerian velocities passing through a slow-moving spiral potential. Stars entering arm trigger "star formation" (glow blue-white). Controls: pattern speed, number of arms, pitch angle. Toggle overlays "traffic jam" analogy.

### 4. Roche Lobe (`roche-lobe.html`)
3D equipotential surface rendering. Two orbiting stars with adjustable mass ratio and separation reshape Roche lobes in real-time. When star fills lobe, particle stream flows through L1 into accretion disk. Toggle between potential contour view and glowing gas mode.

### 5. Hertzsprung-Russell Diagram (`hertzsprung-russell-diagram.html`)
Animated HR diagram: pick initial mass, watch evolutionary track (MS → RGB → AGB → WD/SN). Sidebar shows stellar cross-section with burning shells. Click diagram regions to highlight stellar populations.

### 6. Rotation Curve (`rotation-curve.html`) ✅ BUILT
Face-on spiral galaxy with test particles. Linked v(R) plot builds in real-time. Sliders for visible mass and dark matter halo. Remove dark matter → curve drops Keplerian, outer galaxy flies apart. Toggle Keplerian/solid-body/flat curves.

### 7. Cosmic Microwave Background (`cosmic-microwave-background.html`)
Rotatable 3D all-sky CMB sphere. Peel layers: dipole → Galaxy foreground → anisotropies. Click hot/cold spots for angular scale info. Second panel: angular power spectrum with draggable cosmological parameters (H₀, Ω_m, Ω_Λ, Ω_b) shifting peaks.

### 8. Large-Scale Structure (`large-scale-structure.html`)
Three.js fly-through of cosmic web (N-body simulation or survey point cloud). Navigate filaments, voids, clusters with depth fog and scale markers. Time slider z=10→0 shows structure growth. Toggle dark matter vs. baryons.

### 9. Pulsar (`pulsar.html`) ✅ BUILT
3D neutron star with tilted magnetic dipole. Adjustable spin period, axis tilt, viewing angle. Beam sweep triggers pulse profile panel. Audio mode: millisecond pulsars buzz, slow pulsars heartbeat. Slow-down mode shows aging.

### 10. Binary Star (`binary-star.html`) ✅ BUILT
Two orbiting stars with adjustable mass ratio, eccentricity, inclination. Linked panels: (a) 3D orbit, (b) radial velocity curves, (c) eclipse light curve. "Fit mode" lets users match observed RV curve by adjusting parameters.

## Additional Built Apps (not in original Top 10)

| App | Status | Notes |
|-----|--------|-------|
| Sun | ✅ BUILT | Babylon.js particle system, limb darkening, activity slider |
| Satellites | ✅ BUILT | CelesTrak catalog, 14K+ orbits, glTF Earth, debris, airlines |
| Asteroid Belt | ✅ BUILT | 10K particles, realistic distribution, Kirkwood gaps, Greeks/Trojans, Hildas (3:2 resonance), Ceres/Vesta, histogram |
| Mercury–Neptune (8 planets) | ✅ BUILT | Textured globes, day/night shader (Earth), ring system (Saturn), atmosphere |
| Zenith / Celestial Sphere | ✅ BUILT | Coordinate system diagram, latitude slider, celestial poles/meridian/equator |

## Honorable Mentions
- **Gravitational Redshift** (`gravitational-redshift.html`) — photons climbing potential well with real-time wavelength/color shift
- **Doppler Shift** (`doppler-shift.html`) — already has video; interactive version where user moves relative to source
- **Spiral Galaxy / Spiral Arms** — combine with Density Wave demo
- **Stellar Evolution** (`stellar-evolution.html`) — extends the HR diagram demo
- **Big Bang** (`big-bang.html`) — timeline scrubber through universe history with temperature/density/scale-factor gauges
