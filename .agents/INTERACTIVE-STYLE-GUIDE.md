# COSMOS Interactive Visualizations — Style Guide & Lessons Learned

*For creating embeddable Three.js astronomy visualizations that replace static images in COSMOS articles.*

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
<div style="width:100%;max-width:700px;height:500px;border-radius:6px;overflow:hidden;margin:24px auto;box-shadow:0 4px 20px rgba(0,0,0,0.2);">
  <iframe src="../experimental/VIZNAME.html" style="width:100%;height:100%;border:none;" loading="lazy"></iframe>
</div>
```

### Info panel & caption pattern
Each interactive has an **info panel** (top-left overlay) with title, description, and live readouts.
- **Fullscreen mode**: info panel shows title, description, hint text, and readouts.
- **Embedded mode** (`body.embedded`): title, description, and hint are hidden — the info panel shows only the compact readout. The caption information (title + description) is provided by the article page underneath the `<iframe>`, not inside the interactive itself. This avoids duplicating text and keeps the embed compact.

---

## Visual Style

### Background
- Deep navy: `#0a0a2e` — matches the astronomy theme, high contrast with white/colored elements

### Typography (labels)
- Font: `sans-serif` (system font, no Google Fonts load needed inside the viz)
- Size: 10-11px for labels, weight 600
- Text shadow: `text-shadow: 0 0 6px #000, 0 0 2px #000` — ensures readability over any background
- Pointer events: `auto` on labels for hover tooltips, `cursor: default`

### Label placement
- Labels go **above** their object in screen space
- For top-down views: offset in -Z direction (toward top of screen)
- Use `CSS2DObject` for labels — they project correctly and stay readable at any zoom
- Keep labels short: just the name, no parenthetical data. Details on hover.

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

### Object sizes (Three.js units)
- Sun: 0.14 radius sphere + 0.22 glow
- Inner planets: 0.05–0.075 radius
- Jupiter: 0.25 radius
- Asteroid points: 0.05 size, sizeAttenuation: true
- These are NOT to scale — they're sized for visibility

### Stars background
- 400-800 random points at r = 40-120 units
- Color white, size 0.08, opacity 0.25
- Provides depth without distraction

---

## Lines

### DO: Use `THREE.Line` with stacked copies for thickness
```javascript
function createThickLine(points, color, opacity) {
  const group = new THREE.Group();
  const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
  for (const dy of [-0.008, 0, 0.008]) {
    const pts = points.map(p => new THREE.Vector3(p.x, p.y + dy, p.z));
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat));
  }
  return group;
}
```

### DON'T: Use `Line2`/`LineMaterial` with transparency
Fat lines (`Line2`) produce dotted/stippled artifacts when `transparent: true`. Only use `Line2` for opaque elements like scale bar ticks.

### Dashed lines
Use `THREE.LineDashedMaterial` + `line.computeLineDistances()` only for subtle grid elements (AU rings). Keep `dashSize: 0.15, gapSize: 0.1`.

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
1. **Play/Pause** button (red accent when active)
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

### Placement: left side, vertical
```javascript
const scaleX = -6.5;
// Vertical bar from 0 to 5 AU along -Z axis
// Tick marks at each AU (use Line2 for thickness, opaque)
// AU labels: white, 10px, weight 600
// Light-minute labels: warm gold, 9px, below AU label
```

### DO use `Line2` for scale ticks (opaque, no transparency artifacts)
### DON'T put scale at top or bottom — it gets hidden by controls or cut off

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
Model as exclusion zones at known resonance semi-major axes:
```javascript
const gaps = [{c:2.502,w:0.05},{c:2.825,w:0.04},{c:2.958,w:0.04},{c:3.278,w:0.05}];
```

---

## Performance

- Default asteroid count: 2000 (good balance of density and performance)
- Use `THREE.Points` with `BufferGeometry` for large particle sets
- Update position arrays in-place, set `needsUpdate = true`
- Stars: 400-800 points, far away (r=40-120), no animation needed
- `requestAnimationFrame` loop, update time only when `playing`

---

## Common Mistakes to Avoid

1. **Separate JS modules** — break in iframes. Keep everything inline.
2. **`Line2` with transparency** — causes dotted artifacts. Use stacked `THREE.Line` instead.
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
- File: `experimental/TOPIC-article.html`
- Copy the existing article from `articles/TOPIC.html`
- Replace the static image with the iframe embed:
```html
<div style="width:100%;max-width:700px;height:500px;border-radius:6px;overflow:hidden;margin:24px auto;box-shadow:0 4px 20px rgba(0,0,0,0.2);">
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
- [ ] **Colors match style guide** — background `#0a0a2e`, correct planet/element colors
- [ ] **Stars background visible** — subtle star field provides depth

### Embed in article
- [ ] **Iframe renders** — open `TOPIC-article.html`, scroll to the embed, viz is visible and running
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

- `experimental/TOPIC-interactive.html` — the embeddable visualization
- `experimental/TOPIC-article.html` — article page with the embed (for testing)

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
