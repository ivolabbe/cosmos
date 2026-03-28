# COSMOS Interactive Visualizations — Style Guide & Lessons Learned

*For creating embeddable astronomy visualizations (Three.js / Babylon.js) that replace static images in COSMOS articles.*

> **IMPORTANT:** Always consult this style guide before creating or modifying any interactive web app.

> **Copy-paste snippets:** `.agents/snippets/house-style.css` (complete CSS block) and `.agents/snippets/house-style.js` (renderer, bloom, particles, stars, colours, charts — all as ready-to-use code).

## Architecture

### Single-file, self-contained HTML
Each visualization is ONE `.html` file in `experimental/`. It contains all CSS, HTML, and JS inline. No external JS modules — they break in iframes. Use `<script type="importmap">` + `<script type="module">` with CDN imports.

```html
<script type="importmap">
{ "imports": {
  "three": "https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js",
  "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/"
}}
</script>
<script type="module">
  import * as THREE from 'three';
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
  import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
  // ... all code inline
</script>
```

### Embed via iframe in articles
```html
<div style="width:100%;max-width:800px;height:500px;border-radius:6px;overflow:hidden;margin:24px auto;box-shadow:0 4px 20px rgba(0,0,0,0.2);">
  <iframe src="../experimental/VIZNAME.html" style="width:100%;height:100%;border:none;" loading="lazy"></iframe>
</div>
```

### Info panel & caption pattern
Each interactive has an **info panel** (top-left overlay) with title, description, and live readouts.
- **Fullscreen mode**: info panel shows title, description, hint text, and readouts. Panels should be **generously sized** — readers are exploring and want detail. Use `max-width: 380px`, `font-size: 15px`, readouts `13px`, title `20px`, padding `18px 24px`. 2D plot canvases: `380×220` or larger.
- **Embedded mode** (`body.embedded`): title, description, and hint are hidden — the info panel shows only the compact readout (`max-width: 200px`, `padding: 8px 12px`). 2D canvases shrink via CSS (`width: 240px; height: 140px`). The caption information is provided by the article page underneath the `<iframe>`, not inside the interactive itself.

---

## Visual Style

### Background
- **All space scenes**: pure black `#000` / `0x000000` — planets, orbital diagrams, everything in space
- Deep navy (`#0a0a2e`) was tried for orbital diagrams but makes scenes look murky. Pure black is correct.
- Use `renderer.setClearColor(0x000000)` and `body { background: #000; }` for all 3D interactives
- Exception: `#060618` for abstract data-viz with dense overlapping elements (e.g. GW spacetime mesh)

### Typography (labels)
- Font: `"Open Sans", sans-serif`, weight 600
- Text shadow: `text-shadow: 0 0 6px #000, 0 0 2px #000` — ensures readability over any background
- Pointer events: `auto` on labels for hover tooltips, `cursor: default`
- **Adapt sizes for embed vs fullscreen.** CSS2DObject labels are set in JS via inline styles, so use `isEmbedded` to pick smaller sizes in iframe context:

| Label type | Fullscreen | Embedded | Notes |
|---|---|---|---|
| Object name (planet, feature) | 11px | 11px | Same — already compact |
| Distance scale (AU, kpc) | 15px | 11px | Prominent in fullscreen, compact in embed |
| Secondary scale (light-min) | 13px | 9px | Supplementary info, smaller |
| Feature labels (BELT, TROJANS) | 11px | 11px | Same — already compact |

```javascript
// Pattern for adaptive label sizing:
const sz = isEmbedded ? 11 : 15;
d1.style.cssText = `font-size:${sz}px; ...`;
```

### Label placement
- Labels go **above** their object in screen space
- For top-down views: offset in -Z direction (toward top of screen)
- Use `CSS2DObject` for labels — they project correctly and stay readable at any zoom
- Keep labels short: just the name, no parenthetical data. Details on hover.
- **Keep offsets small** (0.05–0.08 world units) so labels stay close to their object at all zoom levels. Large offsets (0.25+) cause labels to drift away when zoomed in.

### Colors
| Element | Color | Notes |
|---|---|---|
| Sun | `#ffee55` | Bright yellow, with 0.12 opacity glow sphere |
| Mercury | `#cccccc` | Grey |
| Venus | `#eecc66` | Warm yellow |
| Earth | `#44aaee` | Blue |
| Mars | `#ee5533` | Red-orange |
| Jupiter | `#eebb88` | Tan/brown |
| Asteroids (belt) | `#eeeedd` | Warm white |
| Trojans | `#99ffbb` | Light green — distinct from belt |
| Orbit lines | Planet's own color, opacity 0.5 | |
| Grid/scale | `#aaaaaa` at 0.4-0.5 opacity | Subtle |
| Light-minute labels | `rgba(255,200,100,0.3-0.4)` | Warm gold, low opacity |
| Tooltip border | `rgba(220,45,39,0.5)` | Swinburne red accent |
| Feature labels (e.g. "MAIN ASTEROID BELT") | `#bbbbaa` | Muted, all-caps |
| Special feature labels (e.g. "TROJAN ASTEROIDS") | `#88ddaa` | Green, all-caps |

### Spherical Body Rendering — Decision Tree

Choose rendering approach by how prominent the object is on screen:

| Viewing context | Material | Segments | Glow | Example |
|---|---|---|---|---|
| **Hero close-up** (camera 1.5–10 units, object fills view) | ShaderMaterial with texture + day/night + specular | 128×64 | Atmosphere shader (ray-march) + cloud layer | Earth, Mercury |
| **Mid-range featured** (camera 5–20 units, object is main focus) | ShaderMaterial tinting grayscale texture by temperature | 48×32 | BackSide halo spheres (1–2 layers) | Binary star suns |
| **Small schematic marker** (top-down diagram, object is a dot) | MeshBasicMaterial flat colour | 24×24 | None needed — bloom on bright colour suffices | Asteroid-diagram planets |
| **Self-luminous point source** (Sun in orbital diagram) | Sprite with radial-gradient CanvasTexture + AdditiveBlending | n/a | Built into the gradient — smooth falloff, no hard edges | Asteroid-diagram Sun |
| **Self-luminous 3D body** (neutron star, white dwarf) | MeshBasicMaterial bright colour | 48×32 | BackSide halos: r×1.15 @ 0.25α, r×1.5 @ 0.08α | Pulsar neutron star |

**Rules:**
- Always use textures when available and the object is large enough to show detail
- Never use double-FrontSide spheres for glow — use BackSide halos or sprites
- **Never add wide diffuse halo sprites** (e.g. 2× scale at 0.3α stacked behind the core) — this is ugly. One compact sprite is enough; let bloom handle the soft glow naturally
- **Minimal per-mode rendering differences.** Prefer identical 3D settings for embed and fullscreen. Never change bloom strength, sprite scales, or line widths per mode. The ONE exception: **particle opacity and size** may be reduced in embedded mode when dense particle fields (thousands of points) compound with bloom to create an overblown white mass. In that case, reduce opacity (e.g. 0.7→0.35) and size (e.g. 0.22→0.16) for embedded only. Test both modes side by side.
- Sprite glow (CanvasTexture radial gradient + AdditiveBlending) is the best approach for point-source stars in diagrams
- BackSide halo colours: same hue as core, shifted cooler, each layer ~0.3× the opacity of the previous

### Object sizes (Three.js units, orbital diagrams)
- Sun: 0.7 sprite scale (radial gradient)
- Inner planets: 0.05–0.075 radius
- Jupiter: 0.25 radius
- Asteroid points: 0.15 ShaderMaterial size (makeCircleMat)
- These are NOT to scale — they're sized for visibility

### Stars background
Every 3D interactive needs a star field. **Prefer a pre-rendered star texture** (equirectangular skybox or CubeTexture) when available — it looks more polished. When no texture is available, use two-layer procedural stars with `makeCircleMat`:
```javascript
// Dim background stars
const N = 800, pos = new Float32Array(N * 3);
for (let i = 0; i < N; i++) {
  const th = Math.random()*Math.PI*2, ph = Math.acos(2*Math.random()-1), r = 50+Math.random()*70;
  pos[i*3] = r*Math.sin(ph)*Math.cos(th);
  pos[i*3+1] = r*Math.sin(ph)*Math.sin(th);
  pos[i*3+2] = r*Math.cos(ph);
}
const geo = new THREE.BufferGeometry();
geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
scene.add(new THREE.Points(geo, makeCircleMat(0xffffff, 0.25, 0.3)));

// Bright stars that trigger bloom
const NB = 80, bpos = new Float32Array(NB * 3);
for (let i = 0; i < NB; i++) {
  const th = Math.random()*Math.PI*2, ph = Math.acos(2*Math.random()-1), r = 40+Math.random()*60;
  bpos[i*3] = r*Math.sin(ph)*Math.cos(th);
  bpos[i*3+1] = r*Math.sin(ph)*Math.sin(th);
  bpos[i*3+2] = r*Math.cos(ph);
}
const bgeo = new THREE.BufferGeometry();
bgeo.setAttribute('position', new THREE.BufferAttribute(bpos, 3));
scene.add(new THREE.Points(bgeo, makeCircleMat(0xffffff, 0.5, 0.9)));
```
- Bloom settings for planet viewers: strength 0.35, radius 0.6, threshold 0.4
- The bright stars exceed the bloom threshold and produce soft halos
- For small-scale scenes (zenith R=2): scale distances proportionally (e.g. `R * 3` to `R * 8`)

---

## Lines

### Preferred: `THREE.Line` + additive blending
Plain `THREE.Line` with `LineBasicMaterial` is artifact-free at any zoom. Use additive blending for a soft glow where lines overlap:
```javascript
new THREE.Line(
  new THREE.BufferGeometry().setFromPoints(pts),
  new THREE.LineBasicMaterial({
    color, transparent: true, opacity: 0.35,
    blending: THREE.AdditiveBlending, depthWrite: false,
  })
);
```
This renders as 1px on screen but additive blending makes it glow naturally. Clean, simple, no artifacts.

### DON'T: Use `Line2`/`LineMaterial` with transparency
`Line2` produces dotted/stippled artifacts with any transparent or additive material. **Only use Line2 for fully opaque elements** like scale bar ticks where `transparent: false`.

### DON'T: Stack THREE.Line copies for thickness
The `±0.008 Y offset` hack separates at close zoom and collapses at far zoom.

### Dashed lines
`THREE.LineDashedMaterial` + `line.computeLineDistances()` for grid elements. Keep `dashSize: 0.15, gapSize: 0.1`.

### Opaque thick lines (scale bar ticks only)
`Line2` with `transparent: false` — works perfectly. No artifacts when fully opaque.

---

## Controls Bar

### Position and layout
```css
#controls {
  position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%);
  display: flex; align-items: center; gap: 14px; flex-wrap: nowrap;
  background: rgba(10,10,46,0.9); border: 1px solid rgba(255,255,255,0.12);
  border-radius: 8px; padding: 12px 20px; z-index: 10;
}
```
- Always at bottom center
- `flex-wrap: nowrap` — all controls on one line
- Semi-transparent background matching the viz bg

### Standard controls
Every visualization should have:
1. **Play/Pause** button (red accent when active). **Spacebar must also toggle play/pause** (project-wide rule — add `keydown` listener for `Space` in every app).
2. **Speed** selector (0.5x, 1x, 3x, 10x, 30x)
3. **Orbits** checkbox (toggle orbit lines)
4. **Labels** checkbox (toggle all text labels)

### Button style
```css
button { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
  color: #fff; padding: 6px 14px; border-radius: 4px; }
button.active { background: rgba(220,45,39,0.5); border-color: #DC2D27; }
select { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
  color: #fff; padding: 4px 8px; border-radius: 4px; }
```

### No time slider, no element count selectors
Keep controls minimal. Fixed parameters are better than options that confuse.

---

## Tooltips

```css
#tooltip {
  position: absolute; display: none;
  background: rgba(10,10,46,0.95); border: 1px solid rgba(220,45,39,0.5);
  border-radius: 6px; padding: 10px 14px; font-size: 12px; max-width: 280px;
  line-height: 1.5; pointer-events: none; z-index: 20; color: #e0e0e0;
}
```
- Show on label hover via `mouseenter`/`mouseleave`
- Position at cursor + (10px, -8px) offset
- Content: `<b>Name</b><br>Description<br><em style="opacity:0.5">Technical details</em>`
- Disappear on `mouseleave`

---

## Camera

### Top-down view (default for orbital diagrams)
```javascript
camera.position.set(0, 20, 0.01); // nearly straight down
```
- Slight Z offset (0.01) prevents gimbal lock
- FOV 45° gives good view of ±8 AU at height 20

### OrbitControls
```javascript
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 3;
controls.maxDistance = 40;
```

---

## Distance Scale

### Approach: HTML overlay (not 3D geometry)
The distance scale is an HTML `<div>` with a `<canvas>` for the vertical line and tick marks, plus absolutely-positioned label elements for each AU value. It is positioned at a fixed screen X (left side) and tracks zoom via camera FOV projection, but does NOT rotate or tilt with the scene. This ensures the scale is always readable and always in the same screen position.

```javascript
// Create container div (pointer-events:none so it doesn't block interaction)
const scaleEl = document.createElement('div');
scaleEl.style.cssText = 'position:absolute;left:16px;top:0;bottom:0;width:80px;z-index:5;pointer-events:none;';
document.body.appendChild(scaleEl);

// Canvas for vertical line + tick marks
const scaleCanvas = document.createElement('canvas');
scaleCanvas.width = 20; scaleCanvas.height = window.innerHeight;
scaleEl.appendChild(scaleCanvas);

// Tick labels: AU (white, 14px fullscreen / 11px embed) + light-minutes (warm gold, 12px / 9px)
// Position each label at: centreY - au * pxPerAU
// where pxPerAU = innerHeight / (2 * tan(fov/2) * cameraDistance)
```

### Key rules
- **HTML overlay, not 3D geometry.** 3D scale bars rotate and tilt with the scene, becoming unreadable.
- Scale tracks zoom (camera distance) so 1 AU on scale = 1 AU in scene
- Does NOT track rotation or tilt — fixed screen position, correct at any zoom
- Adaptive font sizes via `isEmbedded` check (see Typography section)
- `Line2` with `transparent: false` for tick marks is acceptable (opaque = no artifacts)
- DON'T put scale at top or bottom — it gets hidden by controls or cut off

---

## Physics

### Kepler solver
```javascript
function solveKepler(M, e) {
  let E = M;
  for (let i = 0; i < 10; i++)
    E -= (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
  return E;
}
```

### Prograde orbits
All solar system bodies orbit counter-clockwise from above. Use negative Z for the prograde direction:
```javascript
function orbitXZ(a, e, period, time) {
  const M = (2 * Math.PI / period) * time;
  const E = solveKepler(M, e);
  return [a * (Math.cos(E) - e), -a * Math.sqrt(1 - e*e) * Math.sin(E)];
}
```

### Resonant bodies (Trojans)
- Compute the L-point position ON the parent body's actual orbit at ±60° offset
- Apply local scatter (tangential + radial relative to orbit direction), NOT radial from Sun
- Scatter offsets must be FRACTIONAL (scale with orbital radius), not fixed AU values
- Never use random `omega` rotation for resonant bodies — it scatters them everywhere

### Kirkwood gaps
Model as exclusion zones at known resonance semi-major axes. Widths must be exaggerated for visual clarity — real gaps are narrower but the density dip must be unmistakable at typical particle counts (5000-10000):
```javascript
const gaps = [
  { c: 2.502, w: 0.18 }, // 3:1 resonance — wide and obvious
  { c: 2.825, w: 0.14 }, // 5:2 resonance
  { c: 2.958, w: 0.12 }, // 7:3 resonance
  { c: 3.278, w: 0.20 }, // 2:1 resonance (strongest — widest gap)
];
```

### Hilda asteroids (3:2 resonance)
Hildas orbit independently on eccentric ellipses — they are NOT trapped at equilibrium points like Trojans. The triangular pattern is a "traffic jam" (density peaks at 3 aphelion directions 120 degrees apart). Key implementation rules:
- **Derive Hilda time from Jupiter's time**: `hildaTime = (3/2) * jupTime` to enforce resonance lock. Pure Keplerian orbits drift without this coupling.
- **Force all Hildas to the same period** (`P = a0^1.5` for reference `a0`). Individual `a` values can vary (3.7-4.1 AU spread) for visual width.
- **Aphelion direction**: In `orbitXYZ` coordinates, aphelion is at angle `(pi - omega)`. Set `omega = pi - targetAngle` to aim aphelion at `targetAngle`.
- **Phase bias**: 60% near M=pi (aphelion), 40% uniform. Mimics resonance libration.

---

## Performance

- Default asteroid count: 10000 (sufficient density to show Kirkwood gaps and belt structure). 2000 is too sparse.
- Use `THREE.Points` with `BufferGeometry` for large particle sets
- **Circular particles (mandatory):** Default `PointsMaterial` renders squares. **Never use `PointsMaterial`** — always use the `makeCircleMat` helper below. Copy-paste this into every app that uses `THREE.Points`:
```javascript
function makeCircleMat(color, size, opacity) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(color) },
      uSize: { value: size },
      uOpacity: { value: opacity },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    },
    vertexShader: `
      uniform float uSize;
      uniform float uPixelRatio;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = max(uSize * uPixelRatio * (200.0 / -mv.z), 1.2);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uOpacity;
      void main() {
        float d = length(gl_PointCoord - 0.5) * 2.0;
        if (d > 1.0) discard;
        float alpha = exp(-d * d * 3.0) * uOpacity;
        gl_FragColor = vec4(uColor, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
  });
}
// Usage: new THREE.Points(geometry, makeCircleMat(0xeeeedd, 0.15, 0.9))
```
**Size calibration:** At camera distance `d`, pixel size ≈ `uSize × pixelRatio × 200 / d`. For a 3px dot at distance 20: `uSize = 0.15`. For per-vertex sizes (galaxy particles), use an attribute instead — see `rotation-curve-interactive.html`.
- Update position arrays in-place, set `needsUpdate = true`
- Stars: 400-800 points, far away (r=40-120), no animation needed
- `requestAnimationFrame` loop, update time only when `playing`

---

## Common Mistakes to Avoid

1. **Separate JS modules** — break in iframes. Keep everything inline.
2. **`Line2` with transparency** — causes dotted artifacts. Use plain `THREE.Line` + additive blending instead.
3. **`linewidth > 1` on `LineBasicMaterial`** — silently ignored on most WebGL implementations.
4. **Random `omega` for resonant bodies** — scatters them around the full orbit instead of clustering.
5. **Fixed AU offsets for orbital scatter** — doesn't scale with elliptical orbit distance. Use fractional.
6. **Labels overlapping objects** — offset labels in -Z for top-down views, not just +Y.
7. **Too many controls** — keep minimal: Play, Speed, Orbits, Labels. No sliders, no selectors.
8. **Separate standalone vs embed versions** — maintain ONE file, embed it everywhere via iframe.
9. **Info panels and chrome** — unnecessary in an embed context. The article text provides context.
10. **Forgetting `computeLineDistances()`** — required for `LineDashedMaterial` to render dashes.

---

## Workflow: Creating a New Interactive Visualization

### Step 1: Create the visualization
- File: `experimental/TOPIC-interactive.html` (single self-contained HTML)
- Follow all style, controls, and architecture guidelines above

### Step 2: Create the article page with embed
- File: `experimental/TOPIC.html`
- Copy the existing article from `articles/TOPIC.html`
- Replace the static image with the iframe embed:
```html
<div style="width:100%;max-width:800px;height:500px;border-radius:6px;overflow:hidden;margin:24px auto;box-shadow:0 4px 20px rgba(0,0,0,0.2);">
  <iframe src="TOPIC-interactive.html" style="width:100%;height:100%;border:none;" loading="lazy"></iframe>
</div>
<p style="text-align:center;font-size:0.8rem;color:#808285;">Interactive: drag to rotate, scroll to zoom, hover labels for details.</p>
```

### Step 3: Run verification tests
Start a local server (`python3 -m http.server 8765`) and open the article page. Run through ALL checks below.

### Step 4: Update embed-demo.html
Add the new visualization to `experimental/embed-demo.html`.

---

## Verification Checklist

Run these tests for every new interactive visualization before considering it done. Use the browser (Chrome) with the local server.

### Rendering
- [ ] **Visualization renders** — 3D scene is visible, not blank/black
- [ ] **No console errors** — open DevTools (F12), check Console tab for JS errors
- [ ] **Labels visible** — all text labels render and are readable against the background
- [ ] **Labels don't overlap objects** — labels are offset above/beside their targets
- [ ] **Colors match style guide** — background `#000`, correct planet/element colors
- [ ] **Stars background visible** — subtle star field provides depth

### Embed in article
- [ ] **Iframe renders** — open `TOPIC.html`, scroll to the embed, viz is visible and running
- [ ] **Correct size** — fills the 700×500 container, no overflow, no scrollbars inside iframe
- [ ] **Controls visible** — control bar is fully visible within the iframe, not cut off
- [ ] **Controls on one line** — Play/Speed/Orbits/Labels all fit on a single row
- [ ] **No standalone chrome** — no info panels, time displays, or extra UI outside the control bar
- [ ] **Article text unaffected** — surrounding article content renders normally

### Controls
- [ ] **Play/Pause works** — button toggles animation, icon changes ▶/⏸
- [ ] **Speed selector works** — changing speed visibly affects animation rate
- [ ] **Orbits toggle works** — unchecking hides orbit lines, checking restores them
- [ ] **Labels toggle works** — unchecking hides all text labels, checking restores them

### Interaction
- [ ] **Drag to rotate** — click-drag rotates the view smoothly
- [ ] **Scroll to zoom** — mouse wheel zooms in/out with limits (not too close, not too far)
- [ ] **Hover tooltips** — hovering a label shows tooltip with name + description
- [ ] **Tooltip follows cursor** — moves with mouse, disappears on mouse leave
- [ ] **Touch works** — pinch-zoom and drag work on mobile/tablet (if accessible)

### Physics accuracy
- [ ] **Objects at correct distances** — verify against the distance scale (e.g. Earth at 1 AU)
- [ ] **Prograde motion** — all orbiting objects move counter-clockwise from top view
- [ ] **Orbital periods proportional** — inner objects orbit faster than outer ones
- [ ] **Elliptical orbits** — orbits with non-zero eccentricity are visibly elliptical (e.g. Mercury)
- [ ] **Resonant bodies stay locked** — Trojans/co-orbital objects maintain their relative position
- [ ] **No drifting** — objects don't gradually shift away from their correct orbits over time

### Visual quality
- [ ] **Orbit lines solid** — no dotted/stippled artifacts, smooth continuous lines
- [ ] **Lines visible** — orbit lines and scale bar are clearly visible, not too faint
- [ ] **Distance scale readable** — AU labels and light-minute labels are legible
- [ ] **Distance scale matches orbits** — the N AU ring passes through the correct orbit
- [ ] **No z-fighting** — no flickering where elements overlap
- [ ] **Consistent density** — particle fields (asteroids, etc.) look natural, no obvious gaps or clumps (except intended ones like Kirkwood gaps)

### Performance
- [ ] **Smooth animation** — 30+ fps, no stuttering
- [ ] **Responsive resize** — resizing browser window updates the viewport correctly
- [ ] **Reasonable load time** — page loads and renders within 3 seconds

---

## File Naming Convention

- `experimental/TOPIC-interactive.html` — the embeddable 3D visualization (stays in experimental/ permanently)
- `experimental/TOPIC.html` — article page with the embed (mirrors `articles/TOPIC.html` for easy migration)

When ready to go live: copy `experimental/TOPIC.html` → `articles/TOPIC.html` and update iframe `src` to `../experimental/TOPIC-interactive.html`.

## Babylon.js Apps

Some visualizations use Babylon.js instead of Three.js (e.g. the Sun particle system).

### CDN setup
```html
<script src="https://cdn.babylonjs.com/babylon.js"></script>
```

### ParticleHelper presets
Babylon ships pre-built particle systems (sun, fire, rain, etc.):
```javascript
const set = await BABYLON.ParticleHelper.CreateAsync("sun", scene);
set.start();
const systems = set.systems; // array of ParticleSystem objects
```
Properties can be tweaked post-load: `emitRate`, `updateSpeed`, `minScaleX/Y`, `maxScaleX/Y`, `minLifeTime/maxLifeTime`.

### Camera
```javascript
const camera = new BABYLON.ArcRotateCamera('cam', alpha, beta, radius, target, scene);
camera.panningSensibility = 0; // disable panning for globe/object viewers
```

---

## Bloom Post-Processing

Bloom makes bright elements glow by blurring pixels above a threshold and compositing them back.

### Three.js �� Mandatory bloom pipeline
**Every Three.js interactive must have bloom.** Copy-paste this complete setup:
```javascript
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

// After renderer, scene, camera are created:
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.35,  // strength — see table below
  0.6,   // radius
  0.4    // threshold
));
composer.addPass(new OutputPass());

// In animation loop: composer.render() — NOT renderer.render()
// In resize handler: composer.setSize(window.innerWidth, window.innerHeight)
```
`OutputPass` is required for correct tone mapping with `ACESFilmicToneMapping`.

### Typical settings
| Use case | Strength | Radius | Threshold | Notes |
|---|---|---|---|---|
| Subtle neon lines | 0.3–0.5 | 0.6–0.8 | 0.5–0.7 | Orbit lines, city lights |
| Dramatic glow | 0.6–1.0 | 0.8–1.0 | 0.3–0.5 | Sun corona, explosions |
| Minimal accent | 0.15–0.25 | 0.4 | 0.8–0.9 | Just the brightest spots |

**Watch out — bloom is effectively density-dependent:** Bloom is a global post-process, but additive blending makes it compound with local particle density. Dense regions (bulge, cluster cores) overlap and create overblown bright blobs; sparse regions (outer disk) look too dim. To balance:
- **Control bloom via particle SIZE, not brightness.** Keep particles individually bright (visible), but make them smaller in dense regions so they overlap less. Less overlap → less additive compounding → less bloom.
- **Dense regions** (bulge, cluster cores): small particles (e.g. 0.035), full colour. The count provides visual mass; the small size prevents bloom blowout.
- **Sparse regions** (outer disk, halo): larger particles (e.g. 0.10–0.14) so individuals are visible and trigger bloom for a soft glow.
- Never dim particles to control bloom — that makes them invisible. Size is the lever.

### Additive blending for orbit/trace lines
```javascript
new THREE.LineBasicMaterial({
  color, transparent: true, opacity,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
});
```
Overlapping lines glow brighter where they cross — neon effect. Per-layer opacity tuning:
- **GPS orbits** (sparse): 0.45
- **Comms/Tech** (moderate density): 0.1–0.2
- **Earth-obs** (dense near surface): 0.02–0.04
- **Airlines** (very dense, 921K verts): 0.03–0.05

---

## Atmospheric Rendering

### Ray-marched column density (recommended)
Single FrontSide sphere at outer atmosphere boundary. Fragment shader ray-marches through the atmosphere shell, integrating `exp(-altitude/scaleHeight)` along the view ray. Produces physically-motivated limb brightening with smooth exponential falloff.

```javascript
// Atmosphere sphere — single mesh, no banding
const ATMOS_R = 1.15;  // outer boundary (Earth r ≈ 1.0)
const atmosMat = new THREE.ShaderMaterial({
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  side: THREE.FrontSide,
  uniforms: {
    atmosColor:  { value: new THREE.Color(0x4499dd) },
    earthRadius: { value: 1.005 },
    atmosRadius: { value: ATMOS_R },
    scaleHeight: { value: 0.04 },   // controls gradient steepness
    intensity:   { value: 3.0 },     // tune to taste
  },
  // ... see satellites-interactive.html for full shader
});
scene.add(new THREE.Mesh(new THREE.SphereGeometry(ATMOS_R, 64, 64), atmosMat));
```

Key shader technique: compute impact parameter `b = |cameraPos × rayDir|`, then numerically integrate `exp(-(|samplePos| - earthR) / H)` along 8 sample points from atmosphere entry to Earth surface (or far atmosphere boundary).

### What doesn't work
- **Single fresnel rim** (BackSide or FrontSide): creates a ring, not a gradient. Wrong profile direction.
- **Multiple discrete shells with uniform opacity**: visible banding.
- **Multiple shells with per-fragment fresnel**: still bands + wrong profile (bright at outside edge of each shell).
- **Stemkoski glow shader** (`pow(c - dot(N, V), p)`): OK for stylized halos but can't produce the smooth exponential column-density look.

---

## Loading glTF/GLB Models

### Three.js
```javascript
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
const gltf = await new GLTFLoader().loadAsync('model.gltf');
scene.add(gltf.scene);

// Override materials after loading:
gltf.scene.traverse(child => {
  if (child.material?.name === 'myMat') {
    child.material = new THREE.LineBasicMaterial({ ... });
  }
});
```

### Texture alignment
- glTF textures use `flipY = false`. Manually loaded textures via `TextureLoader` default to `flipY = true`.
- Set `texture.flipY = false` on any texture that must align with glTF UV mapping.
- Enable anisotropic filtering: `texture.anisotropy = renderer.capabilities.getMaxAnisotropy()`.

---

---

## SAO House Style — Complete Visual Reference

*Extracted from deep analysis of all 7 production interactives. Every value is exact, copy-pasteable, and verified against the source files. When building or verifying any interactive, match these values precisely.*

### Per-App Reference Table

| App | clearColor | FOV | Camera pos | minDist | maxDist | Bloom S/R/T | OutputPass | Lights |
|---|---|---|---|---|---|---|---|---|
| mercury | `0x000000` | 45 | (0, 0.5, 3) | 1.5 | 10 | 0.35/0.6/0.4 | No | Ambient `0x222233`@0.15 + Dir `0xfff8ee`@2.5 at (5,2,3) |
| earth | `0x000000` | 45 | (0, 0.5, 3) | 1.5 | 10 | 0.4/0.6/0.35 | No | Ambient `0x111122`@0.08 + Dir `0xfff8ee`@2.5 at sunDir×10 |
| binary-star | `0x000000` | 45 | dynamic | 5 | 40 | 0.8/0.5/0.2 | Yes | None (emissive materials) |
| pulsar | `0x000000` | 45 | (8, 6, 16) | 3 | 30 | 0.5/0.6/0.3 | Yes | Ambient `0x222244`@0.3 |
| rotation-curve | `0x000000` | 45 | (0, 13, 0.01) | 4 | 40 | 0.5/0.7/0.3 | Yes | None (emissive/additive) |
| grav-waves | `0x060618` | 50 | (0, 12, 18) | 4 | 40 | 1.0/1.0/0.4 | Yes | None (unlit shaders) |
| satellites | `0x000000` | 45 | (4, 3, 8) | 1.5 | 100 | 0.5/0.8/0.5 | No | Ambient `0x111122`@0.3 + Dir `0xffffff`@0.6 at (5,3,5) |
| asteroid | `0x000000` | 45 | (0, 16, 0.01) | 2 | 50 | 0.45/0.7/0.4 | Yes | None (emissive/additive) |

**Notes:** All use `dampingFactor: 0.06`. All use `ACESFilmicToneMapping` + exposure `1.0` except GW (no toneMapping) and satellites (exposure `1.2`). All use `pixelRatio: Math.min(devicePixelRatio, 2)`.

### CSS Chrome — Complete Copy-Paste Block

```css
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: "Open Sans", sans-serif; background: #000; color: #e0e0e0; overflow: hidden; }
canvas { display: block; }

/* --- Info panel (top-left) --- */
#info {
  position: absolute; top: 16px; left: 16px;
  background: rgba(10,10,46,0.92); border: 1px solid rgba(255,255,255,0.12);
  border-radius: 8px; padding: 18px 24px; max-width: 380px;
  font-size: 15px; line-height: 1.6; z-index: 10; pointer-events: none;
}
#info h2 { font-size: 20px; font-weight: 300; margin-bottom: 6px; color: #fff; }
#info .desc { font-size: 13px; color: rgba(255,255,255,0.7); margin-bottom: 4px; }
#info .hint { font-size: 11px; color: rgba(255,255,255,0.35); margin-top: 8px; }
.readout { margin-top: 10px; font-size: 13px; font-family: "Courier New", monospace; color: rgba(255,255,255,0.8); }
.readout div { margin-bottom: 2px; }
.readout span { color: #fff; font-weight: 600; }

/* --- Embedded mode --- */
body.embedded #info h2, body.embedded #info .desc, body.embedded #info .hint { display: none; }
body.embedded #info { max-width: 200px; padding: 8px 12px; top: 8px; left: 8px; font-size: 13px; }
body.embedded #info .readout { margin-top: 0; font-size: 11px; }
body.embedded #credit { display: none; }

/* --- Tooltip --- */
#tooltip {
  position: absolute; display: none;
  background: rgba(10,10,46,0.95); border: 1px solid rgba(220,45,39,0.5);
  border-radius: 6px; padding: 10px 14px; font-size: 12px; max-width: 280px;
  line-height: 1.5; pointer-events: none; z-index: 20; color: #e0e0e0;
}

/* --- Controls bar (bottom center) --- */
#controls {
  position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%);
  display: flex; align-items: center; gap: 10px; flex-wrap: nowrap;
  background: rgba(10,10,46,0.9); border: 1px solid rgba(255,255,255,0.12);
  border-radius: 8px; padding: 8px 16px; z-index: 10; max-width: 95vw;
}
#controls label { font-size: 11px; display: flex; align-items: center; gap: 4px; white-space: nowrap; }
#controls input[type="range"] { width: 55px; accent-color: #DC2D27; cursor: pointer; }
#controls input[type="checkbox"] { accent-color: #DC2D27; }
#controls select {
  background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
  color: #fff; padding: 3px 6px; border-radius: 4px; font-family: inherit; font-size: 11px;
}
#controls button {
  background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
  color: #fff; padding: 4px 10px; border-radius: 4px; font-family: inherit; font-size: 11px; cursor: pointer;
}
#controls button:hover { background: rgba(255,255,255,0.18); }
#controls button.active { background: rgba(220,45,39,0.5); border-color: #DC2D27; }
.val { min-width: 28px; text-align: right; display: inline-block; font-size: 11px; }
.sep { width: 1px; height: 18px; background: rgba(255,255,255,0.12); flex-shrink: 0; }

/* --- 2D chart panels (top-right) --- */
.panel-box {
  background: rgba(10,10,46,0.92); border: 1px solid rgba(255,255,255,0.12);
  border-radius: 8px; padding: 10px 12px 6px;
}
.panel-box h3 { font-size: 11px; font-weight: 400; color: rgba(255,255,255,0.5); margin-bottom: 4px; text-align: center; }
.panel-box canvas { display: block; border-radius: 3px; }

/* --- Loading / Credit --- */
#loading {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
  font-size: 16px; font-weight: 300; color: rgba(255,255,255,0.4); z-index: 20; pointer-events: none;
}
#credit {
  position: absolute; bottom: 52px; left: 50%; transform: translateX(-50%);
  font-size: 10px; color: rgba(255,255,255,0.25); z-index: 10; pointer-events: none; white-space: nowrap;
}
#credit a { color: rgba(255,255,255,0.35); }

@media (max-width: 700px) { #controls { flex-wrap: wrap; justify-content: center; } }
```

**Simple tier** (planet globes): reduce info panel to `padding: 16px 20px; max-width: 340px; font-size: 14px`, h2 `18px`, desc `13px`, hint `11px`.

**Background variants**: `#000` (all space scenes — planets, orbital diagrams, everything). Exception: `#060618` (GW spacetime mesh — abstract data-viz). Sun panels use `rgba(10,6,0,0.92)`.

### Colour Tokens

| Token | Value | Usage |
|---|---|---|
| Swinburne red | `#DC2D27` | Active buttons, accent-color, phase markers |
| Swinburne red 50% | `rgba(220,45,39,0.5)` | Active button bg, tooltip border |
| Swinburne red 80% | `rgba(220,45,39,0.8)` | Chart phase marker line |
| Panel bg (navy glass) | `rgba(10,10,46,0.92)` | All panels, chart boxes |
| Panel bg (controls) | `rgba(10,10,46,0.9)` | Controls bar |
| Chrome border | `rgba(255,255,255,0.12)` | All borders and separators |
| Text bright | `#fff` | Titles, readout values |
| Text body | `#e0e0e0` | Default |
| Text secondary | `rgba(255,255,255,0.7)` | Descriptions |
| Text hint | `rgba(255,255,255,0.35)` | Hints, credits |
| Chart bg | `rgba(6,6,30,1)` | 2D canvas fill |
| Chart grid | `rgba(255,255,255,0.06)` | Grid lines, 0.5px |
| Chart axis | `rgba(255,255,255,0.6)` | Tick labels, 11–13px "Open Sans" |
| Warm gold | `#ffdd66` | Light curves |
| Pulse blue | `#6ab4ff` | Pulse profiles |
| Signal orange | `#ff8844` | GW chirp signal |
| Teal | `#55ddcc` | Waveform traces |

### Stellar Temperature → Colour Mapping

Used by binary-star for star sphere tinting and orbit trails:
```javascript
function starColor(T) {
  if (T < 3500)  return 0xaa1100; // M-star: deep red
  if (T < 5000)  return 0xffaa33; // K-star: orange
  if (T < 6000)  return 0xffdd66; // G-star: yellow
  if (T < 7500)  return 0xffeedd; // F-star: warm white
  if (T < 10000) return 0xaaccff; // A-star: blue-white
  if (T < 20000) return 0x88aaff; // B-star: blue
  return 0xddeeff;                // O/WD: white
}
```

Star brightness (for bloom): T>20000→3.0, T>10000→2.0, T>7000→1.5, T>4000→0.8, else→0.5.

### Star Surface Shader (binary-star)

Tints a grayscale sun texture to a temperature-dependent colour:
```glsl
// Vertex
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }

// Fragment
uniform sampler2D uTex; uniform vec3 uColor; uniform float uBrightness;
varying vec2 vUv;
void main() {
  float lum = dot(texture2D(uTex, vUv).rgb, vec3(0.299, 0.587, 0.114));
  lum = pow(lum, 0.8);
  gl_FragColor = vec4(uColor * lum * uBrightness, 1.0);
}
```
Texture: `8k_sun.jpg` (SRGBColorSpace). Geometry: SphereGeometry(1, 48, 32) scaled by radius.

### Orbit Trail Lines

```javascript
new THREE.LineBasicMaterial({
  color: starColor(T),
  transparent: true, opacity: 0.3,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
});
// 256 points per orbit (computeOrbitPoints)
```

### Earth Day/Night Shader

World-space normals (camera-independent terminator). Full shader in `earth-interactive.html`.
- sunDir: `normalize(5, 2, 3)`
- Terminator: `smoothstep(-0.15, 0.2, NdotL)`
- City lights: nightMap × showLights × 1.5
- Specular: Blinn-Phong, exponent 60, intensity 0.15 (oceans only via specMap)
- Cloud layer: separate sphere r=1.012, MeshStandard opacity 0.7, drift 1.1× planet spin
- Axial tilt: `planetGroup.rotation.z = degToRad(23.44)`

### Atmosphere Shader (ray-marched column density)

Used by earth and satellites. Single FrontSide sphere, additive blending:
```javascript
{ atmosColor: 0x4499dd, earthRadius: 1.005, atmosRadius: 1.12–1.15, scaleHeight: 0.04, intensity: 3.0 }
```
Fragment: 8-sample ray-march integrating `exp(-(|p| - earthR) / H) * dt`. Full GLSL in earth-interactive.html and satellites-interactive.html.

### Satellite Orbit Colours & Opacities

All use `LineBasicMaterial` + `THREE.AdditiveBlending` + `depthWrite: false`:

| Type | Color | Opacity | CSS dot |
|---|---|---|---|
| LEO | `0x44cccc` | 0.03 | `#44cccc` |
| MEO | `0xff4444` | 0.35 | `#ff4444` |
| GEO | `0x4488ff` | 0.12 | `#4488ff` |
| HEO | `0x44ff66` | 0.5 | `#44ff66` |
| Debris | `0xcccccc` | 0.08–0.6 (altitude) | `#ffffff` |
| Airlines | `0xff2200` | 0.05 | `#ff2200` |

Debris uses custom ShaderMaterial: altitude-scaled size (0.3–1.0×, max 4px), round-dot discard, altitude-ramped alpha.

### Pulsar Components

- **Neutron star**: SphereGeometry(1, 48, 32), MeshBasicMaterial `0xccddff`
- **Glow halo 1**: r=1.15, BackSide, `0x8899cc` opacity 0.25
- **Glow halo 2**: r=1.5, BackSide, `0x4455aa` opacity 0.08
- **Field lines**: dipole `r(θ) = r0·sin²(θ)`, 3 radii (2.5, 4, 6) × 8 azimuths, LineBasicMaterial `0x44aadd` opacity 0.5, stacked ±0.012 for thickness
- **Beam cones**: ConeGeometry, custom ShaderMaterial with radial fade, color (0.65, 0.85, 1.0), opacity 0.22, AdditiveBlending, DoubleSide
- **Rotation axis**: LineDashedMaterial `0xffffff` opacity 0.25, dash 0.3/gap 0.15
- **Observer LOS**: LineDashedMaterial `0xffcc44` opacity 0.35, dash 0.25/gap 0.12

### GW Spacetime Mesh

- Mesh: PlaneGeometry 30×30, 512 segments, custom ShaderMaterial
- Wave: quadrupolar `cos(phase - k·r + 2θ + π)`, 1/√r falloff, inner cutoff at orbit radius
- Gravity wells: `-depth / max(d, 0.12)` per BH
- Grid: UV×30 frequency, smoothstep(0, 0.06) thickness, edge fade at 0.82
- Colours: zero `(0.06, 0.06, 0.18)`, +displacement `(1.2, 0.22, 0)`, −displacement `(0, 0.25, 1.2)`, hot `(2.4, 1.6, 1.1)` / `(1.1, 1.6, 2.4)`
- BH core: `0x050510`, photon ring `0x6688ff` opacity 0.35 BackSide, halo `0x4466cc` opacity 0.12 BackSide
- Trails: per-vertex colored LineBasicMaterial, 210 points, warm `(1, 0.65, 0.25)` / cool `(0.25, 0.65, 1.0)`, quadratic alpha fade
- Merger flash: bloom strength 1.0→2.5, ringdown ×0.97/frame

### Rotation Curve Galaxy

Full galaxy particle ShaderMaterial (the canonical circular-particle pattern):
```glsl
// Vertex
attribute float size; varying vec3 vColor; uniform float uPixelRatio;
void main() {
  vColor = color;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = size * uPixelRatio * (200.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}
// Fragment
varying vec3 vColor;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  if (d > 1.0) discard;
  float alpha = exp(-d * d * 2.0);
  gl_FragColor = vec4(vColor, alpha);
}
```
Blending: Additive. Per-vertex colors: bulge `0xffcc66`→`0xffaa44`, disk `0xccddff`→`0xaaccff`. Sizes: bulge 0.09, disk 0.06–0.14 (shrinks with radius).

**Rotation curve chart**: native 420×240, padding {l:42, r:12, t:16, b:28}, bg `rgba(5,5,20,0.95)`.

| Curve | Color | Width | Dashed |
|---|---|---|---|
| Bulge | `rgba(255,160,60,0.7)` | 2.5 | yes `[4,3]` |
| Disk | `rgba(80,200,220,0.7)` | 2.5 | yes `[4,3]` |
| Halo | `rgba(220,100,220,0.7)` | 2.5 | yes `[4,3]` |
| Total | `#ffffff` | 3.0 | no |

Observed data: white dots r=2.5, error bars `rgba(255,255,255,0.35)` 0.8px. Legend: 14px, 18px vertical spacing.

### 2D Chart Reference (per chart type)

**All charts share:** bg `rgba(6,6,30,1)`, grid `rgba(255,255,255,0.06)` 0.5px, border `rgba(255,255,255,0.12)` 0.5px, phase marker `rgba(220,45,39,0.8)` 1.5–2px.

**Binary star RV**: native 280×130, CSS 400×185 fullscreen / 280×130 embedded. Padding {l:28, r:4, t:4, b:30}. Zero-line `rgba(255,255,255,0.15)` dashed [4,4]. Star curves: lineWidth 2, color from starColor(T). Labels 11px ticks, 12px titles.

**Binary star LC**: same dimensions/padding. Fill under curve `rgba(255,220,100,0.15)`, curve `#ffdd66` 1.5px. Eclipse label `rgba(255,200,100,0.5)` 11px.

**Pulsar pulse profile**: native 380×200, CSS 240×130 embedded. Padding {l:32, r:8, t:8, b:20}. Fill `rgba(100,180,255,0.3)`, stroke `#6ab4ff` 1.5px, playhead `#DC2D27` 2px, peak dot white r=3.

**GW spectrogram**: native 300×150. Padding {l:38, r:8, t:4, b:20}. Freq glow `rgba(220,100,40,0.3)` 5px, freq sharp `#ff8844` 1.5px. Waveform glow `rgba(80,200,180,0.25)` 3px, waveform sharp `#55ddcc` 1px. Labels 9px.

### Audio Patterns

**GW chirp**: sine oscillator, freq = gwFreq × 2 (AUDIO_SHIFT), gain ramps 0.12→0.5 with amplitude, ramp time constant 0.015.

**Pulsar click**: sine burst 700–1000 Hz, exponential decay from `intensity × 0.3` to 0.001 over `min(0.02, period × 0.1)`. For MSPs: continuous tone at `min(1/period, 800)` Hz, gain `intensity × 0.2`.

### Resize Handler (complete)

```javascript
window.addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  composer.setSize(innerWidth, innerHeight);
  // If CSS2DRenderer:
  // labelRenderer.setSize(innerWidth, innerHeight);
  // If LineMaterial:
  // scene.traverse(o => { if (o.material?.isLineMaterial) o.material.resolution.set(innerWidth, innerHeight); });
});
```

---

## Candidate Visualizations

| Topic | Key Elements | Priority |
|---|---|---|
| HR Diagram | Scatter plot of stars, hover for properties, main sequence highlighted | High |
| Galaxy Classification | Hubble tuning fork, click morphological types | High |
| Cosmic Distance Ladder | Step through rungs: parallax → Cepheids → Type Ia → redshift | High |
| EM Spectrum | Wavelength slider, show telescopes per band | High |
| Stellar Evolution | Animate star life cycle on HR diagram | Medium |
| Celestial Coordinates | RA/Dec grid, extend zenith prototype | Medium |
| Solar System (full) | All 8 planets, correct scale toggle | Medium |
| Orbital Elements | Adjustable a, e, i with 3D orbit | Medium |
