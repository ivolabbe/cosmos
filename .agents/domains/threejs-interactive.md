# Domain: Three.js Interactive Visualizations

*Three.js patterns, rendering rules, and architecture for single-file HTML interactives. Loaded by any agent that builds or verifies Three.js apps.*

---

## File Structure

Single-file HTML in `dev/`. All CSS + JS inline:

```
1. <style> — standard controls/info/loading styles
2. <body>
   - #loading indicator
   - #info panel (title, desc, hint — hidden in embedded mode)
   - #controls bar (Rotate, Speed 0.2x/0.5x/1x/3x/10x, Day, topic-specific)
   - #credit line with attribution
3. <script type="importmap"> — Three.js 0.170.0 CDN
4. <script type="module"> — all code inline
   - Renderer (black bg, ACES tonemapping)
   - Scene, Camera, OrbitControls (user drag only, no autoRotate)
   - Lights (named ambientLight + sunLight)
   - Bloom (0.35, 0.6, 0.4)
   - Planet rotation state (rotating, speedMul, BASE_ROT, dayMode)
   - The visualization (from spec)
   - Stars (800 dim + 80 bright bloom)
   - Controls wiring + Day mode toggle
   - Animation loop (planet.rotation.y += BASE_ROT * speedMul)
   - Resize handler
```

## Standard Parameters

```javascript
renderer.setClearColor(0x000000);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;

// Bloom
new UnrealBloomPass(res, 0.35, 0.6, 0.4);

// Rotation
const BASE_ROT = 0.002;
let speedMul = 0.5;

// Day mode
ambientLight.color.set(0xffffff);
ambientLight.intensity = 4.0;
sunLight.visible = false;
```

## Rendering Rules

### Bloom & Glow
- Bloom pipeline: `EffectComposer` + `UnrealBloomPass` + `OutputPass` (OutputPass required in Three.js 0.170.0+)
- Subtle bloom (strength 0.2–0.4) adds atmosphere; heavy bloom (>0.6) washes out detail
- Control bloom via particle SIZE not brightness — dense regions = tiny bright particles, sparse regions = larger particles
- No wide diffuse halos. Let bloom handle glow naturally. One compact sprite is enough
- No painted glow — bright MeshBasicMaterial + bloom looks better than stacked halo layers

### Blending & Lines
- Favour `THREE.AdditiveBlending` for glowing elements (beams, halos, orbits)
- Orbit lines: plain `THREE.Line` with additive blending — 1px on screen, natural glow from additive overlap
- Do NOT stack THREE.Line copies at Y offsets (breaks at zoom)
- Do NOT use `Line2` with transparency (stippled artifacts)
- If truly opaque thick lines needed (scale bar ticks), use `Line2` with `transparent: false`

### Particles
- Mandatory circular particles for all particle apps: ShaderMaterial with `if (d > 1.0) discard; alpha = exp(-d*d*2.0);`
- Default PointsMaterial = ugly squares — never use it
- Point/particle density: 2000–6000 for galaxy-scale, 800+80 for star background

### Objects
- Spherical bodies: always find appropriate texture maps. Check `dev/assets/textures/` first, then Solar System Scope (CC BY 4.0), NASA public domain
- Planet globe: `SphereGeometry(1, 128, 64)` + `MeshStandardMaterial`, roughness 0.75–0.95
- Stars (as points): two-layer (800 dim opacity 0.3 + 80 bright opacity 0.9) with bloom threshold 0.4
- Saturn rings: `MeshBasicMaterial` (self-lit), not Standard
- Self-luminous objects (CMB, radiation): `MeshBasicMaterial` — no directional lighting
- Axes/indicators: dashed lines, low opacity (0.2–0.35), labelled in fullscreen mode

### Atmosphere
- Ray-marched column density on a single FrontSide sphere is the ONLY approach that works
- Rejected: single fresnel rim, multiple discrete shells, Stemkoski glow, per-fragment fresnel
- Use the shader from `satellites-interactive.html`. Key params: `scaleHeight`, `intensity` (2–4), `atmosRadius`

### 2D Panels
- Content must be readable — peaks/curves/labels not clipped by panel edges
- Phase/offset: if periodic signal has peak at 0°/360°, offset so peak is centred
- Min text sizes: tick values 11px, axis titles 12px, legends 14px, panel titles (CSS) 13px
- Text opacity: 0.6 minimum. Never use 0.35
- Multi-panel: prefer side-by-side horizontally; stack vertically only when width limited
- Place panels at top to keep 3D scene unobstructed below
- Playhead must visually track the 3D animation
- Panels must not overlap the 3D scene or controls
- Fullscreen panels: generous sizing (380px, 15px font, 380×220 canvases). Embedded: shrink via CSS

### Composition
- **Black background** (`#000`) for ALL space scenes. Deep navy (`#0a0a2e`) only for non-space abstract data-viz
- Depth: stars at different distances (near bright, far dim) + bloom
- Camera: default position showcases the most informative view

## Architecture Patterns

### Physics Sim Layout
`(3D scene center/left)` + `(stacked 2D canvas panels right)` + `(controls bar bottom)` + `(info panel top-left)`. Proven in GW, pulsar, binary star, rotation curve apps.

### Embedded Mode
- `?embed=true` URL parameter hides info panel and shows compact view
- Must work in both fullscreen and embedded modes
- Visual agent checks both

### Controls
- Spacebar: play/pause toggle (mandatory)
- Rotate checkbox: auto-rotation toggle
- Speed buttons: 0.2x / 0.5x / 1x / 3x / 10x
- Day mode checkbox: bright ambient, disable directional light
- Topic-specific: sliders, toggles per spec

## Technical Gotchas

- `const` declarations don't hoist — functions referencing a const must be called AFTER the const is defined
- Headless Puppeteer CANNOT render WebGL — always `headless: false` for verification
- Earth shader: MUST use world-space normals for day/night, not view-space
- RingGeometry UVs need manual fix: map radius linearly to U for alpha strip textures
- ConeGeometry apex is at +Y — must flip (rotate PI) for beams diverging outward from source
- Negative modulo in JS: `((M % TWO_PI) + TWO_PI) % TWO_PI`
- Logarithmic spirals: NEGATIVE `1/tan(pitch)` for trailing arms with CCW rotation

## Complexity Tiers

| Tier | Examples | Lines JS | Coder sessions |
|------|----------|----------|----------------|
| Simple | Textured sphere + atmosphere + controls | < 200 | 1 |
| Medium | Custom shader, multiple layers, data | 200–500 | 1 |
| Hard | Physics simulation, real-time computation | 500–1000 | 1–2 (checkpoint) |
| Hardest | Multi-mode sim, sub-apps, complex math | 1000+ | 2+ (staged) |

## Reference Implementations

### Simple tier
- `mercury-interactive.html` — bare rocky planet, simplest template
- `earth-interactive.html` — custom day/night shader, cloud layer, city lights
- `saturn-interactive.html` — ring system (RingGeometry + alpha)

### Complex tier
- `gravitational-waves-interactive.html` — canonical physics sim template (GLSL mesh, WebAudio, spectrogram)
- `pulsar-interactive.html` — dipole field lines, beam cones, pulse profile, audio
- `binary-star-interactive.html` — Kepler orbits, RV curves, eclipse light curve
- `rotation-curve-interactive.html` — galaxy particles, DM slider, component decomposition
