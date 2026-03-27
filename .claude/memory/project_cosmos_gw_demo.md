---
name: COSMOS GW interactive demo status
description: Gravitational wave Three.js demo implementation details, known issues, and architecture decisions for the COSMOS encyclopedia
type: project
---

Interactive gravitational wave visualization at `cosmos/experimental/gravitational-waves-interactive.html`.

**Architecture:** Single self-contained HTML file. Three.js 0.170 via CDN importmap. Custom GLSL vertex/fragment shaders for spacetime mesh. EffectComposer + UnrealBloomPass. WebAudio chirp. 2D canvas spectrogram panel.

**Key bugs found & fixed:**
- `performance.now()` in click handler vs rAF timestamp can produce negative dt → NaN propagation → invisible mesh. Fix: `Math.max(0, dt)` and clamp simTime/idx.
- Duplicate `const` declarations in same scope cause SyntaxError (silent module failure).
- GLSL variable named `pos` can shadow built-ins on some drivers.

**Physics:** Leading-order PN inspiral (RK4 on df/dt), extends to 2× f_ISCO, damped sinusoid ringdown. Chirp mass, ISCO frequency, QNM frequency all computed from input masses.

**Auto-speed profile:** Sigmoid-based: cruise at 1.5× for bulk of sim, steep decel in last ~5% to 0.028× (≈1 orbit/sec at f_orb=35 Hz for 30+30 M☉).

**Files:**
- `experimental/gravitational-waves-interactive.html` — standalone demo
- `experimental/gravitational-waves-article.html` — article page with 800px iframe embed
- `css/style.css` — added `.viz-embed` reusable classes

**How to apply:** When resuming work on this demo or building new COSMOS interactives, follow the same single-file pattern (inline CSS + importmap + module JS). Test with local HTTP server (`python3 -m http.server`) + Chrome console.
