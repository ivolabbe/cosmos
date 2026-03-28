// ====================================================================
//  SAO COSMOS Interactive — House Style JS Reference
//  Copy relevant blocks into every new interactive's <script>.
//  This file is a REFERENCE — not a module import.
// ====================================================================


// ====================================================================
//  DESIGN PRINCIPLES  (read before adapting for new app types)
// ====================================================================
//
//  BLOOM
//  Every Three.js app must have bloom. It's what makes the scene feel
//  like space rather than a flat diagram. Tune the strength by content:
//    - Low glow (diagrams, subtle):     strength 0.3–0.4, threshold 0.4–0.5
//    - Medium glow (planets, sims):     strength 0.4–0.6, threshold 0.3–0.4
//    - High glow (stars, explosions):   strength 0.7–1.0, threshold 0.2–0.3
//  The radius controls how far the glow spreads. 0.5–0.8 works for most.
//  If a scene has both bright and dim elements, favour the dim — they
//  need the threshold low enough to trigger, and the bright ones will
//  bloom naturally regardless.
//
//  PARTICLES
//  Never use THREE.PointsMaterial. It renders squares. Always use the
//  makeCircleMat ShaderMaterial below, or the per-vertex variant for
//  heterogeneous particle systems (galaxies, populations).
//  Size calibration: pixelSize ≈ uSize × pixelRatio × 200 / distance.
//  Target 2–4px on screen for individual particles. For dense fields,
//  go smaller (1–2px) to avoid bloomy mush.
//
//  LIGHTING
//  Two patterns:
//    A) Physical object lit by the Sun: ambient (faint cool fill 0.08–0.15)
//       + directional (warm white 0xfff8ee, intensity 2–3, from upper-right).
//    B) Self-luminous / diagrammatic: ambient only (0x222244, 0.2–0.3),
//       objects use MeshBasicMaterial or emissive ShaderMaterial.
//  The choice follows from content: if the object has a dayside/nightside,
//  use A. If it's a schematic, data-viz, or self-luminous thing, use B.
//
//  CAMERA
//  FOV 45° except for wide-field scenes (GW: 50°). dampingFactor always
//  0.06. Distance limits: tight for object viewers (1.5–10), loose for
//  scene explorers (3–40+). For top-down orbital views, place camera at
//  (0, height, 0.01) with the 0.01 Z offset to dodge gimbal lock.
//
//  ADDITIVE BLENDING
//  Use for anything that should GLOW: orbit trails, atmospheric halos,
//  dense line networks, particle fields. Overlapping regions brighten
//  naturally, creating a neon-light effect. Always pair with
//  depthWrite: false to prevent z-fighting.
//  Tune opacity PER DENSITY: dense data (thousands of lines) needs very
//  low opacity (0.02–0.05); sparse data (a few trails) needs more (0.3–0.5).
//
//  2D CHARTS
//  Always draw on a dedicated <canvas>, never in the 3D scene.
//  Dark navy background (rgba(6,6,30,1)), white grid at 6% opacity,
//  data curves at 1.5–3px, Swinburne-red playhead/marker.
//  The glow-then-sharp technique: draw the curve twice, first thick and
//  faint (the "glow": 3–5px, 0.25–0.3 alpha), then thin and bright
//  (the "sharp": 1–1.5px, full colour). This gives a neon-tube look.
//
//  COLOUR FOR DATA
//  Pick from the established palette and extend by analogy:
//    Warm gold #ffdd66  — photometric (brightness-based) quantities
//    Pulse blue #6ab4ff — periodic/time-domain signals
//    Signal orange #ff8844 — frequency-domain, spectral quantities
//    Teal #55ddcc — secondary/comparison data
//    Magenta rgba(220,100,220,0.7) — dark matter, invisible/inferred
//    White #ffffff — totals, observed/combined quantities
//  Component curves (partial contributions) are dashed, totals are solid.
//  Each curve's legend swatch matches its colour exactly.
//
//  AUDIO
//  Optional. Two patterns established:
//    A) Continuous tone mapped to a physical frequency (GW chirp).
//    B) Click/pulse at the physical repetition rate (pulsar).
//  Keep gain modest (≤0.5). Ramp with setTargetAtTime, never abrupt.
//  Always off by default if the sound could surprise (explosions, loud).
//  Checkbox in controls bar: "Sound" or "Audio".
//
// ====================================================================


// ---- Imports ----
// Always include bloom pipeline imports. Add extras as needed.
/*
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
*/


// ---- Embedded Mode ----
// Always the first executable line.
// if (window.self !== window.top) document.body.classList.add('embedded');


// ---- Renderer ----
// setClearColor must match body CSS background.
// ACESFilmicToneMapping: slightly desaturated, cinematic shoulder curve.
// Exposure 1.0 is default; raise to 1.2 for scenes with many dim elements.
/*
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x000000);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
document.body.prepend(renderer.domElement);
*/


// ---- Camera & Controls ----
// Adjust position/limits to content. These are the established presets:
//   Object viewer:   pos(0, 0.5, 3),  min 1.5, max 10
//   Physics sim:     pos(8, 6, 16),   min 3,   max 30
//   Top-down orbit:  pos(0, 20, 0.01),min 2,   max 50
//   Galaxy:          pos(0, 13, 0.01),min 4,   max 40
//   Satellites/Earth:pos(4, 3, 8),    min 1.5, max 100
//
// For new app types, pick the closest preset and adjust.
// If the scene has no natural "center" (e.g. EM spectrum), consider
// disabling orbit controls and using click/drag for data interaction.
/*
const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 500);
camera.position.set(0, 0.5, 3);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 1.5;
controls.maxDistance = 10;
*/


// ---- Bloom ----
// Per-app presets (strength / radius / threshold):
//   Planet viewer:  0.35 / 0.6 / 0.4     (subtle star glow)
//   Earth:          0.4  / 0.6 / 0.35    (city lights + stars)
//   Pulsar:         0.5  / 0.6 / 0.3     (beams, emissions)
//   Galaxy:         0.5  / 0.7 / 0.3     (additive particle field)
//   Binary star:    0.8  / 0.5 / 0.2     (hot stellar surfaces)
//   Grav waves:     1.0  / 1.0 / 0.4     (dramatic, merger flash to 2.5)
//   Satellites:     0.5  / 0.8 / 0.5     (orbit line glow)
//
// For new apps: start at 0.4/0.6/0.4 and adjust. Lower threshold = more
// elements glow. Higher strength = brighter glow. If unsure, match the
// closest existing app type above.
/*
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(new UnrealBloomPass(
  new THREE.Vector2(innerWidth, innerHeight), 0.4, 0.6, 0.4));
composer.addPass(new OutputPass());
*/


// ====================================================================
//  CIRCULAR PARTICLE MATERIAL
//  Mandatory for all THREE.Points. Never use PointsMaterial.
//
//  Size calibration:
//    pixelSize ≈ uSize × pixelRatio × 200 / cameraDistance
//
//  Examples:
//    Camera 20 units away, want 3px dots: uSize = 0.15
//    Camera 3 units away, want 2px dots:  uSize = 0.015
//    Camera 60 units away, want 1px dots: uSize = 0.15
//
//  Falloff exponent controls softness:
//    exp(-d*d*3.0) — standard, medium-soft edges
//    exp(-d*d*2.0) — softer, more glow (galaxy particles)
//    exp(-d*d*5.0) — sharper, more dot-like
//
//  Min-size clamp: max(..., 1.2) ensures particles remain visible when
//  zoomed far out. Without this, distant particles shrink to sub-pixel
//  and vanish. The 1.2 value is a safe lower bound that keeps particles
//  as tiny but visible dots.
// ====================================================================

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


// ====================================================================
//  PER-VERTEX COLOUR+SIZE VARIANT
//  Use when particles need individual colours AND sizes.
//  Geometry must have 'color' (vec3) and 'size' (float) attributes.
//  Blending: AdditiveBlending for luminous fields (galaxies, nebulae).
//  Use NormalBlending for non-luminous scatter (asteroids, debris).
// ====================================================================
/*
const perVertexMat = new THREE.ShaderMaterial({
  uniforms: { uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) } },
  vertexShader: `
    attribute float size;
    varying vec3 vColor;
    uniform float uPixelRatio;
    void main() {
      vColor = color;
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = size * uPixelRatio * (200.0 / -mv.z);
      gl_Position = projectionMatrix * mv;
    }
  `,
  fragmentShader: `
    varying vec3 vColor;
    void main() {
      float d = length(gl_PointCoord - 0.5) * 2.0;
      if (d > 1.0) discard;
      float alpha = exp(-d * d * 2.0);  // softer for additive fields
      gl_FragColor = vec4(vColor, alpha);
    }
  `,
  transparent: true, depthWrite: false,
  blending: THREE.AdditiveBlending,
  vertexColors: true,
});
*/


// ====================================================================
//  STAR BACKGROUND
//  Prefer a pre-rendered star texture (equirectangular image or CubeTexture)
//  when available — looks more polished than procedural points.
//  Use scene.background = new THREE.CubeTextureLoader().load([...]) or
//  scene.background = textureLoader.load('starfield.jpg').
//
//  When no texture is available, use two-layer procedural stars.
//  The bright layer exceeds bloom threshold → realistic star halos.
//
//  Distance ranges depend on scene scale:
//    Standard (most 3D):  dim 50–120, bright 40–100
//    Close-up (planet):   same (stars are far background)
//    Small-scale (zenith R=2): dim R*3–R*8, bright R*2.5–R*6.5
//
//  For 2D-only apps, omit stars entirely — the background colour is enough.
// ====================================================================

function addStars(scene) {
  const N = 800, pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(2 * Math.random() - 1);
    const r = 50 + Math.random() * 70;
    pos[i*3]   = r * Math.sin(ph) * Math.cos(th);
    pos[i*3+1] = r * Math.sin(ph) * Math.sin(th);
    pos[i*3+2] = r * Math.cos(ph);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  scene.add(new THREE.Points(geo, makeCircleMat(0xffffff, 0.25, 0.3)));

  const NB = 80, bpos = new Float32Array(NB * 3);
  for (let i = 0; i < NB; i++) {
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(2 * Math.random() - 1);
    const r = 40 + Math.random() * 60;
    bpos[i*3]   = r * Math.sin(ph) * Math.cos(th);
    bpos[i*3+1] = r * Math.sin(ph) * Math.sin(th);
    bpos[i*3+2] = r * Math.cos(ph);
  }
  const bgeo = new THREE.BufferGeometry();
  bgeo.setAttribute('position', new THREE.BufferAttribute(bpos, 3));
  scene.add(new THREE.Points(bgeo, makeCircleMat(0xffffff, 0.5, 0.9)));
}


// ====================================================================
//  LIGHTING
//
//  Pattern A — physically lit object (planet, moon, comet):
//    Ambient: cool dim fill (0x111122–0x222233, intensity 0.08–0.15)
//    Directional: warm sunlight (0xfff8ee, intensity 2–3, from upper-right)
//    Day-mode toggle: ambient→white@4.0, hide directional
//
//  Pattern B — self-luminous / diagrammatic (pulsar, orbits, GW mesh):
//    Ambient only: 0x222244, intensity 0.2–0.3
//    Objects use MeshBasicMaterial or emissive shaders
//
//  Pattern C — no lights (binary star, rotation curve):
//    Everything is emissive / unlit ShaderMaterial
//    No ambient, no directional
//
//  For new apps: if the content has a natural light source (star, Sun),
//  use A. If everything emits its own light, use B or C.
// ====================================================================


// ====================================================================
//  STELLAR COLOUR & BRIGHTNESS
//  Temperature→colour mapping for any app showing stars. Use for:
//  sphere tinting, HR diagram points, orbit trail colours, labels.
//  Brightness controls bloom intensity — hotter = brighter = more glow.
// ====================================================================

function starColor(T) {
  if (T < 3500)  return 0xaa1100; // M: deep red
  if (T < 5000)  return 0xffaa33; // K: orange
  if (T < 6000)  return 0xffdd66; // G: yellow
  if (T < 7500)  return 0xffeedd; // F: warm white
  if (T < 10000) return 0xaaccff; // A: blue-white
  if (T < 20000) return 0x88aaff; // B: blue
  return 0xddeeff;                // O/WD: white
}

function starBrightness(T) {
  if (T > 20000) return 3.0;
  if (T > 10000) return 2.0;
  if (T > 7000)  return 1.5;
  if (T > 4000)  return 0.8;
  return 0.5;
}


// ====================================================================
//  LINE RENDERING
//
//  Glow lines (orbit trails, emission beams):
//    LineBasicMaterial + AdditiveBlending + depthWrite:false
//    Opacity by density:  sparse (1–10 lines)→0.3–0.5
//                         medium (10–100)→0.1–0.2
//                         dense (100–1000)→0.02–0.05
//                         very dense (1000+)→0.01–0.03
//
//  Thick lines: WebGL ignores linewidth>1. Do NOT stack copies at Y offsets
//    — they separate at close zoom and collapse at far zoom. Accept 1px line
//    width; additive blending makes lines glow naturally where they overlap.
//    If you truly need opaque thick lines (e.g. scale bar ticks), use Line2
//    with transparent:false — fully opaque Line2 has no artifacts.
//
//  Dashed lines (grids, axes, reference):
//    LineDashedMaterial + computeLineDistances()
//    dashSize 0.1–0.3, gapSize 0.05–0.15
//
//  For new apps: if unsure between additive and normal blending,
//  ask: "should overlapping lines get brighter?" If yes → additive.
// ====================================================================

/*
// Additive glow line
new THREE.LineBasicMaterial({
  color, transparent: true, opacity: 0.3,
  blending: THREE.AdditiveBlending, depthWrite: false,
});

// Dashed reference line
const mat = new THREE.LineDashedMaterial({
  color, dashSize: 0.12, gapSize: 0.06, transparent: true, opacity: 0.5,
});
line.computeLineDistances();
*/


// ====================================================================
//  ATMOSPHERE RENDERING (ray-marched column density)
//
//  Single FrontSide sphere at outer atmosphere boundary. Fragment shader
//  ray-marches through the shell, integrating exp(-altitude/H).
//  Produces smooth limb brightening with exponential falloff.
//
//  Defaults for Earth-like: atmosColor 0x4499dd, earthRadius 1.005,
//  atmosRadius 1.12–1.15, scaleHeight 0.04, intensity 3.0.
//  Blending: AdditiveBlending. Side: FrontSide. depthWrite: false.
//
//  For other planets, adjust:
//    Mars: atmosColor 0xcc7744, scaleHeight 0.06, intensity 1.5
//    Venus: atmosColor 0xddcc88, scaleHeight 0.08, intensity 4.0
//    Gas giants: atmosColor matching dominant band, larger scaleHeight
//
//  Full GLSL in earth-interactive.html or satellites-interactive.html.
// ====================================================================


// ====================================================================
//  2D CHART DRAWING
//
//  General conventions (all charts):
//    Background:      ctx.fillStyle = 'rgba(6,6,30,1)';
//    Grid (faint):    rgba(255,255,255,0.06), lineWidth 0.5
//    Axes (strong):   rgba(255,255,255,0.3), lineWidth 1
//    Axis labels:     rgba(255,255,255,0.6), 11–13px "Open Sans"
//    Phase/time mark: rgba(220,45,39,0.8) (Swinburne red), 1.5–2px
//    Border:          rgba(255,255,255,0.12), lineWidth 0.5
//    Fill under curve: curve colour at 0.15–0.3 alpha
//    Legend:          14px "Open Sans", 18px vertical spacing, colour=curve
//
//  Glow-then-sharp technique (neon tube effect):
//    1. Draw curve: thick (3–5px), low-alpha (0.25–0.3) — the "glow"
//    2. Draw curve: thin (1–1.5px), full colour — the "sharp"
//    GW spectrogram uses this for both frequency and waveform traces.
//
//  Colour assignments for common data types:
//    Photometric (flux, brightness):     warm gold #ffdd66, fill rgba(255,220,100,0.15)
//    Time-domain (pulse, period):        pulse blue #6ab4ff, fill rgba(100,180,255,0.3)
//    Frequency-domain (spectrum, chirp): signal orange #ff8844
//    Secondary/comparison:               teal #55ddcc
//    Dark matter / inferred:             magenta rgba(220,100,220,0.7)
//    Observed / total:                   white #ffffff, solid 3px
//    Model components:                   dashed [4,3], 2.5px, 0.7 alpha
//
//  For new chart types: pick the closest semantic match from above.
//  If none fits, derive a new colour at similar saturation and lightness
//  to the existing palette — avoid clashing with Swinburne red or the
//  chrome greys.
//
//  Canvas sizing:
//    Design at a native resolution (e.g. 380×200, 420×240, 280×130).
//    CSS scales up for fullscreen (e.g. width:400px; height:185px).
//    CSS scales down for embedded (e.g. width:240px; height:130px).
//    Text must be legible at BOTH sizes — test before shipping.
// ====================================================================


// ====================================================================
//  RESIZE HANDLER
//  Must update: camera, renderer, composer, and any auxiliary renderers.
// ====================================================================
/*
window.addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  composer.setSize(innerWidth, innerHeight);
  // If CSS2DRenderer:
  // labelRenderer.setSize(innerWidth, innerHeight);
  // If LineMaterial (fat lines):
  // scene.traverse(o => {
  //   if (o.material?.isLineMaterial)
  //     o.material.resolution.set(innerWidth, innerHeight);
  // });
});
*/


// ====================================================================
//  ANIMATION LOOP
//  Always use composer.render(), never renderer.render().
//  Planet rotation: BASE_ROT = 0.002 rad/frame.
//  Speed options: 0.2x, 0.5x, 1x, 3x, 10x via <select>.
//  For physics sims with real-time coupling (pulsar period, GW chirp):
//  accumulate physicsTime separately, cap frame delta at 0.1s.
// ====================================================================
/*
let playing = true;
function animate() {
  requestAnimationFrame(animate);
  if (playing) { // update physics/positions }
  controls.update();
  composer.render();
  // If CSS2DRenderer: labelRenderer.render(scene, camera);
}
animate();
*/


// ====================================================================
//  GLOW OBJECTS (halos, auras, coronas)
//
//  Pattern: BackSide sphere slightly larger than the object, low opacity,
//  MeshBasicMaterial. Stack 1–2 layers at increasing radii for smooth
//  falloff. Bloom amplifies these naturally.
//
//  Neutron star example:
//    Core:  r=1.0,  MeshBasicMaterial 0xccddff
//    Halo1: r=1.15, BackSide, 0x8899cc opacity 0.25
//    Halo2: r=1.5,  BackSide, 0x4455aa opacity 0.08
//
//  Sun glow sphere:
//    Core:  r=0.14, MeshBasicMaterial 0xffee55
//    Glow:  r=0.22, MeshBasicMaterial 0xffee55 opacity 0.12
//
//  For new objects: core colour at full brightness, halo(s) same hue
//  shifted cooler/dimmer, each layer ~0.3–0.5× the opacity of the
//  previous. Bloom does the rest.
// ====================================================================


// ====================================================================
//  AUDIO PATTERNS
//
//  Pattern A — Continuous tone mapped to frequency (GW chirp):
//    OscillatorNode type 'sine', frequency from physics × shift factor
//    Gain: gradual ramp, setTargetAtTime with timeConstant 0.015
//    Good for: anything with a changing frequency
//
//  Pattern B — Percussive pulse at repetition rate (pulsar):
//    Short sine burst (700–1000 Hz), exponential gain decay
//    Duration: min(0.02, period × 0.1)
//    Good for: periodic events, clicks, heartbeats
//
//  Pattern C — Impact/event (merger flash, collision):
//    White noise burst + rapid gain decay
//    Good for: one-shot dramatic events
//
//  General:
//    - AudioContext created on first user interaction (click/play)
//    - Sound off by default unless the physics IS the sound
//    - Gain never exceeds 0.5
//    - Checkbox: "<input type="checkbox" id="cb-sound"> Sound"
// ====================================================================
