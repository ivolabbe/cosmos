# Hertzsprung-Russell Diagram Interactive — Build Spec

## Overview

An animated, interactive HR diagram where the user selects an initial stellar mass (0.5 to 25 M_sun) and watches the star trace its evolutionary track from the zero-age main sequence (ZAMS) through to its final fate — white dwarf or core-collapse supernova. The main canvas is a log(L/L_sun) vs log(T_eff) diagram with a background population of ~2000 scatter points representing a realistic stellar population (main sequence, giants, white dwarfs). A sidebar shows a real-time stellar cross-section diagram with concentric burning shells that update as the star evolves through each phase. Clicking labelled regions of the HR diagram (Main Sequence, Red Giant Branch, Horizontal Branch, White Dwarf cooling track, etc.) highlights that population and displays a description. Controls allow the user to select mass, adjust animation speed, and toggle overlays (iso-radius lines, spectral type axis, instability strip).

This is a **Hardest tier** app: multi-panel layout, animated track with phase-dependent physics, linked cross-section diagram, and clickable population regions.

---

## Fact Sheet

### Key Numbers — ZAMS Properties

| M/M_sun | log(L/L_sun) | T_eff (K) | log(T_eff) | R/R_sun | Spectral Type | MS Lifetime | Source |
|---------|--------------|-----------|------------|---------|---------------|-------------|--------|
| 0.5     | -1.0         | 3840      | 3.584      | 0.46    | M0 V          | >50 Gyr     | Hurley+ 2000; Eker+ 2018 |
| 1.0     | 0.0          | 5780      | 3.762      | 1.0     | G2 V          | 10 Gyr      | IAU; Solar values |
| 2.0     | 1.26         | 8910      | 3.950      | 1.6     | A2 V          | 1.1 Gyr     | Hurley+ 2000 |
| 5.0     | 2.77         | 17400     | 4.241      | 2.7     | B5 V          | 94 Myr      | Hurley+ 2000 |
| 10.0    | 3.77         | 25000     | 4.398      | 4.0     | B0 V          | 20 Myr      | Hurley+ 2000 |
| 25.0    | 4.80         | 37000     | 4.568      | 8.5     | O9 V          | 6.4 Myr     | Hurley+ 2000 |

### Key Numbers — Evolutionary Milestones

| Phase | Condition | Typical log(L) | Typical log(T_eff) | Notes |
|-------|-----------|-----------------|---------------------|-------|
| ZAMS | H ignition begins | Mass-dependent | Mass-dependent | Starting point |
| MS turnoff (TAMS) | Core H exhausted | ~same as ZAMS | drops slightly | Subgiant branch begins |
| RGB tip | Degenerate He core max | ~3.4 (1 M_sun) | ~3.55 | He flash for M < 2.3 M_sun |
| Helium flash | He ignites explosively | ~3.4 | ~3.55 | Only for degenerate cores (M < ~2.3 M_sun) |
| Horizontal Branch (HB) | Core He burning | ~1.6-1.8 | 3.55-3.85 | ~100 Myr duration |
| AGB tip | He shell + H shell | ~3.5-4.0 | ~3.50 | Thermal pulses, mass loss |
| Planetary Nebula | Envelope ejected | drops rapidly | rises to >5.0 | Transition to WD |
| White Dwarf | Cooling | -1 to -4 | 4.5 → 3.7 | Cooling track |
| Core-collapse SN | Fe core collapse | ~5.0-5.5 | 3.5-4.5 | M_initial > ~8 M_sun |

### Key Physics

| Relation | Formula | Source |
|----------|---------|--------|
| Mass-luminosity (MS) | L/L_sun ~ (M/M_sun)^3.5 | Approximate; exponent 2.3 for M < 0.43, ~4 for 2-20, ~3.5 average |
| Stefan-Boltzmann | L = 4 pi R^2 sigma T_eff^4 | Fundamental |
| Iso-radius line on HR diagram | log(L) = 4*log(T_eff) + 2*log(R/R_sun) - 4*log(5780) | From Stefan-Boltzmann in log form |
| MS lifetime | t_MS ~ 10^10 * (M/M_sun)^(-2.5) yr | Approximate; Hurley+ 2000 for precise |
| Chandrasekhar mass | M_Ch = 1.44 M_sun | Maximum WD mass |
| He flash mass limit | M ~ 2.3 M_sun | Below: degenerate He core, He flash. Above: non-degenerate, smooth He ignition |
| SN boundary | M_initial ~ 8 M_sun | Above: core collapse. Below: PN + WD |

### Evolutionary Track Descriptions by Mass Regime

**Low mass (0.5 M_sun):**
ZAMS (cool, dim) -> very slow MS evolution -> barely reaches RGB tip in a Hubble time. For the visualization, show the MS phase only with a note that evolution is slower than the age of the universe.

**Solar-like (1 M_sun):**
ZAMS -> MS (10 Gyr) -> subgiant branch (T drops, L rises slightly) -> RGB (L rises steeply, T ~constant at ~3500 K) -> He flash at RGB tip (log L ~ 3.4) -> Horizontal Branch (L drops to ~50 L_sun, T increases) -> AGB (L rises again) -> thermal pulses -> PN ejection -> WD cooling track (hot, dim, cooling leftward then down).

**Intermediate mass (2 M_sun):**
ZAMS -> MS (~1 Gyr) -> subgiant -> RGB (shorter, no degenerate He core above 2.3 M_sun — smooth He ignition) -> blue loop / HB -> AGB -> PN + WD.

**Intermediate-high mass (5 M_sun):**
ZAMS -> MS (94 Myr) -> rapid crossing of Hertzsprung gap -> short RGB -> He ignition (non-degenerate) -> blue loop (extended excursion back to high T, crossing instability strip — Cepheid variable phase) -> AGB -> PN + massive WD (~1.0 M_sun).

**High mass (10 M_sun):**
ZAMS -> MS (20 Myr) -> rapid supergiant evolution -> He burning as blue/yellow supergiant -> advanced burning stages (C, Ne, O, Si — too fast to resolve) -> core-collapse supernova. No WD. Cross-section shows onion-shell structure.

**Very high mass (25 M_sun):**
ZAMS -> MS (6 Myr) -> blue supergiant -> red supergiant -> possible Wolf-Rayet phase (if mass loss strips envelope) -> core-collapse SN. Track stays at very high L. Cross-section shows full onion shell: H, He, C, Ne, O, Si, Fe core.

### Stellar Cross-Section — Shell Structure by Phase

| Phase | Core | Shell 1 | Shell 2 | Shell 3+ | Envelope |
|-------|------|---------|---------|----------|----------|
| MS | H -> He (pp or CNO) | — | — | — | H-rich |
| RGB | Inert He (degenerate for M<2.3) | H -> He | — | — | H-rich, convective |
| HB | He -> C,O | H -> He | — | — | H-rich |
| AGB | Inert C,O | He -> C,O | H -> He | — | H-rich, convective |
| Pre-SN (>8 M_sun) | Fe | Si -> Fe | O -> Si | Ne, C, He, H shells | H (if not stripped) |

### Physics Context (for article writer)

The Hertzsprung-Russell diagram is arguably the single most important diagram in all of stellar astrophysics. By plotting stellar luminosity against surface temperature, it reveals that stars are not randomly distributed but cluster into distinct groups — the main sequence, red giant branch, horizontal branch, asymptotic giant branch, and white dwarf cooling sequence — each corresponding to a different stage of nuclear evolution. A star's position on the diagram tells us its internal structure, energy source, and evolutionary state. The HR diagram transformed stellar astronomy from a descriptive science into a predictive one: given a star's mass and composition, we can calculate its entire life history as a track on the diagram.

---

## State-of-the-Art Survey

### Reference 1: NAAP HR Diagram Explorer (University of Nebraska-Lincoln)
- **URL**: https://astro.unl.edu/naap/hr/animations/hrExplorer.html
- **Source**: University educational tool
- **What it does well**: Clean interactive HR diagram with draggable marker. Toggle overlays for main sequence, luminosity classes, iso-radius lines, instability strip. Axis options: T_eff vs spectral type, luminosity vs absolute magnitude. Shows a star image that updates size and colour with position. Excellent pedagogical scaffolding.
- **What it does poorly**: No evolutionary tracks. No animation of a star evolving through time. No cross-section view. Flash-era aesthetics (now HTML5 but visually dated). Static — the user drags a point but doesn't see evolution happen.
- **Key technique**: 2D canvas/SVG with overlaid regions and a draggable marker. Star appearance (colour + size) derived from HR position via Stefan-Boltzmann.
- **Our advantage**: Animated evolutionary tracks, cross-section sidebar, clickable population regions, modern Three.js aesthetic with bloom and glow.

### Reference 2: Illinois Digital Demo Room — Stellar Evolution Simulator
- **URL**: https://rainman.astro.illinois.edu/ddr/stellar/index.html
- **Source**: University of Illinois, built on Hurley SSE code
- **What it does well**: Computes evolutionary tracks using the Hurley+ (2000) analytic formulae — accurate to ~5% of full MESA models. Creates a stellar population with IMF-weighted masses and animates them on an HR diagram. Shows radius changes and star spinning/expanding. Can toggle tracks on/off. Runs hundreds of tracks per second.
- **What it does poorly**: Dated Java/Flash-era interface. No 3D. No cross-section view. Visual design is minimal — plain scatter plot. No explanation of what each phase means. No interactivity beyond start/stop.
- **Key technique**: Hurley SSE analytic formulae provide L(t), T(t), R(t) for any mass and metallicity. This is the physics engine we should adopt — analytic formulae are fast enough for real-time animation and accurate enough for educational purposes.
- **Our advantage**: Modern visual design, interactive mass selection, cross-section sidebar, clickable region labels, gorgeous star rendering with bloom.

### Reference 3: ESA Gaia DR2 HR Diagram
- **URL**: https://sci.esa.int/web/gaia/-/60198-gaia-hertzsprung-russell-diagram
- **Source**: ESA/Gaia mission
- **What it does well**: The gold standard observational HR diagram. 4+ million stars with exquisite parallax distances from Gaia. Reveals fine structure: main sequence width, red clump, subgiant branch, white dwarf sequence, binary sequence. Density rendering with colour mapping shows population statistics. Breathtakingly detailed.
- **What it does poorly**: Static image (not interactive in the ESA page). No evolutionary tracks overlaid. No educational labelling of regions. Requires astronomical background to interpret.
- **Key technique**: Density-mapped scatter plot of M_G vs (G_BP - G_RP). Colour encodes point density (log scale).
- **Our advantage**: We overlay evolutionary tracks on top of a population scatter plot, label the regions, and animate the evolution. We make the Gaia-style diagram comprehensible by guiding the user through it.

### Reference 4: Paul Belfrage HR Diagram (D3.js)
- **URL**: https://hr-diagram.netlify.app/
- **Source**: GitHub (paubel/HR-diagram), MIT license
- **What it does well**: Interactive D3.js scatter plot of real stellar data. Hover for individual star properties. Filter by spectral type, magnitude, mass. Clean modern web design. Responsive.
- **What it does poorly**: No evolutionary tracks. No animation. No cross-section. Purely observational — plots data but doesn't explain evolution. Limited colour palette.
- **Key technique**: D3.js scatter plot with tooltip hover. Data from star catalogues.
- **Our advantage**: Evolutionary animation, physics-driven tracks, cross-section sidebar, region labelling. We use a similar scatter backdrop but add the dynamic evolutionary narrative.

### Reference 5: Scientific American HR Diagram by Pitch Interactive
- **URL**: https://www.pitchinteractive.com/work/sciamhrdiagram/
- **Source**: Commercial data visualization studio for SciAm
- **What it does well**: Beautiful, publication-quality design. Thoughtful use of colour and typography. Makes a complex diagram accessible to a general audience. Award-winning visual storytelling.
- **What it does poorly**: Print/static illustration, not a full interactive simulation. No animation. No evolutionary tracks.
- **Key technique**: Thoughtful data visualization design: careful colour mapping, clean typography, labelled regions.
- **Our advantage**: Full interactivity, animation, linked cross-section, mass selection. We should match or exceed the visual polish of this illustration.

### Reference 6: Swinburne SSE Interface (Hurley)
- **URL**: https://astronomy.swin.edu.au/~jhurley/stellar.html
- **Source**: Swinburne University — same institution as COSMOS
- **What it does well**: Direct web interface to the Hurley SSE code. Accepts mass and metallicity, returns evolutionary track data. The authoritative implementation of the analytic formulae we will use.
- **What it does poorly**: Returns raw data output (text tables), not a visualization. No graphical interface. No animation.
- **Key technique**: Fortran SSE code via CGI. Outputs L(t), T(t), R(t) tables.
- **Our advantage**: We visualize the same physics in a gorgeous interactive format. A natural complement to Hurley's tool — same university, same physics, modern presentation.

### What no existing tool does (our unique value)

No existing web interactive combines:
1. An animated evolutionary track on an HR diagram with phase labels
2. A linked stellar cross-section showing burning shells that update with evolutionary phase
3. Clickable HR diagram regions that highlight stellar populations
4. Background scatter population providing observational context
5. Multiple mass selections showing how different stars evolve differently

This combination — seeing a star evolve in real time while understanding its internal structure — is what makes this app uniquely educational.

---

## Physics / Algorithm

### Approach: Simplified Analytic Tracks (not full SSE)

For a real-time web animation, we do NOT need the full Hurley SSE formulae (which involve dozens of piecewise polynomial fits). Instead, we define each evolutionary track as a **sequence of waypoints** in (log T_eff, log L) space, with the star interpolating smoothly between them. Each waypoint corresponds to a physically meaningful evolutionary milestone (ZAMS, TAMS, RGB tip, HB, AGB tip, PN/WD or SN).

This approach is:
- Simple to implement (~100 waypoints total across 6 mass tracks)
- Physically correct (waypoints from MESA/MIST/Hurley data)
- Smooth and visually appealing (cubic interpolation between waypoints)
- Easy to extend (add more masses by adding more waypoint arrays)

### Evolutionary Track Waypoints

Each track is an array of objects:
```javascript
{ logT: 3.76, logL: 0.0, phase: "ZAMS", duration: 0.0 }
```

Where `duration` is the fractional time spent at this phase relative to the total track animation time. The animation interpolates position along the track at constant visual speed, with `duration` controlling how long the marker lingers at each waypoint (longer for MS, brief for rapid phases like He flash).

### Track Data (approximate, from MESA/MIST models at Z=0.02)

**1 M_sun track waypoints:**
```javascript
const track_1Msun = [
  { logT: 3.762, logL:  0.00, phase: "ZAMS",        dur: 0.00 },
  { logT: 3.749, logL:  0.30, phase: "Mid-MS",      dur: 0.40 },
  { logT: 3.724, logL:  0.60, phase: "TAMS",         dur: 0.20 },
  { logT: 3.700, logL:  0.80, phase: "Subgiant",     dur: 0.08 },
  { logT: 3.680, logL:  1.20, phase: "Base RGB",     dur: 0.05 },
  { logT: 3.600, logL:  2.00, phase: "Mid RGB",      dur: 0.04 },
  { logT: 3.550, logL:  3.40, phase: "RGB Tip",      dur: 0.03 },
  { logT: 3.550, logL:  3.35, phase: "He Flash",     dur: 0.005},
  { logT: 3.700, logL:  1.70, phase: "HB",           dur: 0.06 },
  { logT: 3.580, logL:  2.50, phase: "Early AGB",    dur: 0.03 },
  { logT: 3.520, logL:  3.50, phase: "AGB Tip",      dur: 0.02 },
  { logT: 3.550, logL:  3.40, phase: "PN ejection",  dur: 0.005},
  { logT: 4.700, logL:  2.00, phase: "PN nucleus",   dur: 0.005},
  { logT: 4.600, logL:  0.00, phase: "Hot WD",       dur: 0.02 },
  { logT: 4.200, logL: -1.50, phase: "Cooling WD",   dur: 0.03 },
  { logT: 3.800, logL: -3.50, phase: "Cool WD",      dur: 0.04 },
];
```

**5 M_sun track waypoints:**
```javascript
const track_5Msun = [
  { logT: 4.241, logL: 2.77,  phase: "ZAMS",        dur: 0.00 },
  { logT: 4.200, logL: 3.00,  phase: "Mid-MS",      dur: 0.35 },
  { logT: 4.100, logL: 3.20,  phase: "TAMS",         dur: 0.15 },
  { logT: 3.800, logL: 3.30,  phase: "Hertzsprung gap", dur: 0.03 },
  { logT: 3.600, logL: 3.40,  phase: "Base RGB",     dur: 0.03 },
  { logT: 3.560, logL: 3.50,  phase: "He ignition",  dur: 0.02 },
  { logT: 4.050, logL: 3.20,  phase: "Blue loop (hot)", dur: 0.08 },
  { logT: 3.700, logL: 3.35,  phase: "Blue loop return", dur: 0.06 },
  { logT: 3.560, logL: 3.80,  phase: "AGB",          dur: 0.05 },
  { logT: 3.520, logL: 4.00,  phase: "AGB Tip",      dur: 0.02 },
  { logT: 4.800, logL: 2.50,  phase: "PN nucleus",   dur: 0.005},
  { logT: 4.500, logL: 0.50,  phase: "Hot WD",       dur: 0.02 },
  { logT: 4.100, logL:-1.00,  phase: "Cooling WD",   dur: 0.03 },
];
```

**10 M_sun track waypoints:**
```javascript
const track_10Msun = [
  { logT: 4.398, logL: 3.77,  phase: "ZAMS",         dur: 0.00 },
  { logT: 4.350, logL: 4.00,  phase: "Mid-MS",       dur: 0.35 },
  { logT: 4.250, logL: 4.20,  phase: "TAMS",          dur: 0.15 },
  { logT: 3.800, logL: 4.25,  phase: "Hertzsprung gap", dur: 0.02 },
  { logT: 3.600, logL: 4.30,  phase: "RSG",           dur: 0.05 },
  { logT: 4.100, logL: 4.10,  phase: "Blue loop",     dur: 0.08 },
  { logT: 3.580, logL: 4.50,  phase: "RSG (He shell)", dur: 0.05 },
  { logT: 3.560, logL: 4.60,  phase: "Pre-SN",        dur: 0.02 },
  { logT: 3.560, logL: 4.60,  phase: "Core Collapse SN", dur: 0.01 },
];
```

**25 M_sun track waypoints:**
```javascript
const track_25Msun = [
  { logT: 4.568, logL: 4.80,  phase: "ZAMS",         dur: 0.00 },
  { logT: 4.530, logL: 5.00,  phase: "Mid-MS",       dur: 0.35 },
  { logT: 4.450, logL: 5.20,  phase: "TAMS",          dur: 0.15 },
  { logT: 4.000, logL: 5.10,  phase: "Yellow SG",     dur: 0.05 },
  { logT: 3.600, logL: 5.30,  phase: "RSG",           dur: 0.08 },
  { logT: 4.200, logL: 5.20,  phase: "Blue loop / WR", dur: 0.06 },
  { logT: 3.580, logL: 5.40,  phase: "RSG return",    dur: 0.04 },
  { logT: 3.580, logL: 5.40,  phase: "Core Collapse SN", dur: 0.01 },
];
```

**0.5 M_sun and 2 M_sun:** Similar structure, derived from the same sources. The 0.5 M_sun track barely leaves the MS; the 2 M_sun track is intermediate between 1 and 5 M_sun (no He flash, shorter RGB, modest blue loop).

### Star Colour from Temperature

Map log(T_eff) to an RGB colour using a blackbody-to-sRGB lookup. Reference: Harre & Heller (2021), "Digital color codes of stars" (Astronomische Nachrichten 342, 578). Also: Mitchell Charity's star color table (vendian.org/mncharity/dir3/starcolor/).

Simplified lookup for the visualization:
```javascript
function tempToColor(logT) {
  const T = Math.pow(10, logT);
  // Approximate blackbody -> sRGB
  if (T < 3500)  return '#ff6030';  // M-type, deep red-orange
  if (T < 4500)  return '#ff8f40';  // K-type, orange
  if (T < 5500)  return '#ffc070';  // G-type, warm yellow
  if (T < 6500)  return '#fff4e0';  // F-type, yellowish white
  if (T < 8000)  return '#f8f0ff';  // A-type, white
  if (T < 15000) return '#c8d0ff';  // B-type, blue-white
  return '#9bb0ff';                  // O-type, blue
}
```
For smoother results, interpolate between these anchor points. The coder may use a finer 20-point table or compute from Planck function directly.

### Star Radius from L and T

For the cross-section and for scaling the star marker on the diagram:
```
R/R_sun = sqrt(L/L_sun) / (T_eff/5780)^2
```
This is the Stefan-Boltzmann relation rearranged.

### Iso-radius Lines

On the HR diagram, lines of constant radius are straight lines in log space:
```
log(L/L_sun) = 4 * log(T_eff/5780) + 2 * log(R/R_sun)
```
Draw lines for R = 0.01, 0.1, 1, 10, 100, 1000 R_sun. These are diagonal lines from upper-left to lower-right.

### Background Population

Generate ~2000 scatter points representing a realistic stellar population:
- **Main sequence** (~1200 points): distribute along the MS band with Gaussian scatter in log(L) of ~0.15 dex. Weight by IMF (Salpeter: dN/dM ~ M^{-2.35}) so most stars are low-mass red dwarfs.
- **Red giant branch** (~300 points): vertical strip at log(T) ~ 3.55-3.65, log(L) ~ 0.5-3.5.
- **Red clump / HB** (~200 points): concentrated cluster at log(T) ~ 3.68, log(L) ~ 1.7.
- **White dwarf sequence** (~200 points): band at log(L) ~ -1 to -4, log(T) ~ 3.8-4.5.
- **Supergiants** (~50 points): sparse, high-L, spread across temperatures.
- **Subgiants** (~50 points): bridge between MS turnoff and RGB base.

Each point is coloured by its temperature using `tempToColor()`. Points are rendered as small circles with ShaderMaterial (circular particles, per style guide). The population provides the observational context that makes the diagram meaningful.

### Clickable Regions

Define rectangular regions in (logT, logL) space:
```javascript
const regions = [
  { name: "Main Sequence", logT: [3.45, 4.70], logL: [-1.5, 5.5],
    desc: "Stars fusing hydrogen in their cores. 90% of all stars. Hotter = more luminous." },
  { name: "Red Giant Branch", logT: [3.50, 3.70], logL: [0.5, 3.5],
    desc: "Stars with inert He cores and H-burning shells. Expanding and cooling." },
  { name: "Horizontal Branch", logT: [3.55, 3.90], logL: [1.4, 2.0],
    desc: "Core helium burning. The 'red clump' in observational diagrams." },
  { name: "AGB", logT: [3.45, 3.65], logL: [3.0, 4.5],
    desc: "Double-shell burning: He and H shells around a C/O core. Thermal pulses." },
  { name: "White Dwarfs", logT: [3.70, 4.60], logL: [-4.0, -0.5],
    desc: "Stellar remnants. No fusion — cooling via stored thermal energy. Electron-degenerate." },
  { name: "Supergiants", logT: [3.50, 4.50], logL: [4.0, 6.0],
    desc: "Massive stars in advanced evolutionary stages. Short-lived. Progenitors of supernovae." },
  { name: "Instability Strip", logT: [3.80, 3.90], logL: [1.5, 4.5],
    desc: "Stars pulsating due to the kappa mechanism. Cepheids, RR Lyrae, Delta Scuti." },
];
```
Clicking a region highlights its population points (brightens them, dims others) and shows the description.

---

## Implementation Stages

### Stage 1: HR Diagram Canvas with Background Population

**Build:** A 2D canvas (the main view, occupying ~65% of the viewport width) showing the HR diagram. X-axis: log(T_eff), reversed (hot on left, cool on right) — range 4.7 to 3.4. Y-axis: log(L/L_sun) — range -4.5 to 6.0. Draw axis labels ("log(T_eff / K)" on X, "log(L / L_sun)" on Y), gridlines, and tick marks. Generate ~2000 background population points as described above, each rendered as a small coloured circle. Use WebGL (Three.js OrthographicCamera + Points with ShaderMaterial for circular particles) for the scatter plot — this is a 2D diagram but rendered with Three.js for consistent style with other COSMOS apps. Background: black (#000). Stars (background field) per style guide.

**Key details:**
- The X-axis is REVERSED: high T (left) to low T (right). This is the standard HR diagram convention.
- Axis tick labels at log(T) = 3.5, 3.6, ..., 4.6 (or equivalent: 3000 K, 4000 K, ..., 40000 K).
- Axis tick labels at log(L) = -4, -3, ..., 5 (or L = 0.0001, 0.001, ..., 100000 L_sun).
- Population points: size 2-4 px, opacity 0.4-0.6, temperature-coloured.
- The diagram is essentially a 2D scatter plot, but using Three.js with an orthographic camera so we get bloom, circular particles, and consistent COSMOS styling.
- Info panel (top-left): title "Hertzsprung-Russell Diagram", description, readouts.
- Use the house CSS from the style guide snippets.

**Pass criteria:** Diagram is visible with correct axis orientation (hot left, cool right; bright top, dim bottom). Population points cluster in recognizable groups: a diagonal main sequence, a giant branch clump, white dwarfs at lower left. Axes are labelled. No console errors.

### Stage 2: Evolutionary Track Animation

**Build:** A mass selector (discrete buttons or slider) in the controls bar: 0.5, 1, 2, 5, 10, 25 M_sun. When a mass is selected, draw its evolutionary track as a faint line on the diagram, then animate a bright glowing marker along the track. The marker is a larger circle (8-12 px) coloured by instantaneous temperature, with a subtle bloom glow. A trailing "ghost trail" (the portion of the track already traversed) is drawn as a brighter line. The current phase name is displayed as a label near the marker (CSS2DObject or HTML overlay).

**Key details:**
- Track waypoints are pre-defined arrays (see Physics section above).
- Interpolation between waypoints: use Catmull-Rom or cubic Bezier for smooth curves. Linear interpolation will produce sharp corners at waypoints.
- Animation speed: the marker traverses the track over ~30-60 seconds total (adjustable via speed slider). The `dur` field at each waypoint controls the fractional dwell time. MS phase gets ~50% of the time; rapid phases (He flash, PN ejection) are brief but visible.
- The phase label updates as the marker passes each waypoint.
- Previous track is cleared when a new mass is selected.
- At SN endpoint: flash effect (bright white burst, then fade). At WD endpoint: marker settles and dims.
- Play/Pause button controls animation.
- Speed slider: 0.5x, 1x, 2x, 5x.

**Pass criteria:** Selecting 1 M_sun shows a track going from mid-MS to RGB to HB to AGB to WD. Selecting 10 M_sun shows a track that ends in SN. Animation is smooth. Phase labels update correctly. Track shape matches standard textbook HR diagram evolutionary tracks.

### Stage 3: Stellar Cross-Section Sidebar

**Build:** A sidebar panel (~30% viewport width, right side) showing a circular cross-section of the star. This is a 2D diagram (canvas or SVG) with concentric coloured rings representing the interior structure. Each ring is labelled with its composition/process (e.g., "H -> He", "He -> C,O", "Inert Fe core"). The cross-section updates in real time as the animated marker moves along the track.

**Key details:**
- Cross-section is schematic, not to scale (otherwise the envelope would dwarf everything).
- Use a logarithmic radial scale so the core structure is visible.
- Colour coding: H-burning shell = yellow-orange, He-burning shell = orange-red, C-burning = red, inert cores = grey, H-rich envelope = blue-ish, convective zones = hatched or stippled.
- Phase-dependent structure (see the Shell Structure table in the Fact Sheet).
- Transition between shell structures should be animated (layers appear/disappear smoothly as the star evolves through phases).
- Labels: short text labels inside or next to each shell ("H → He", "He → C", "inert He", "Fe core").
- The overall radius of the cross-section scales qualitatively with the star's actual radius (small on MS, large on RGB, tiny on WD).
- Panel title: "Stellar Interior" with current phase name.

**Pass criteria:** At MS phase, cross-section shows a single H-burning core with H-rich envelope. At RGB, shows inert He core + H-burning shell + H envelope (convective). At HB, shows He-burning core + H-burning shell. At pre-SN for 25 M_sun, shows onion-shell structure (H, He, C, O, Si, Fe). Transitions are smooth and labelled.

### Stage 4: Clickable Regions and Population Highlighting

**Build:** Implement the clickable regions defined in the Physics section. When the user clicks within a defined region on the HR diagram, the population points within that region brighten (opacity -> 0.9, size increase), points outside dim (opacity -> 0.15), and a description panel appears. Clicking outside all regions (or clicking the same region again) resets to default view. Region boundaries are drawn as faint dashed outlines when hovered.

**Key details:**
- Raycasting or coordinate mapping from screen to (logT, logL) space.
- Highlighted points pulse gently (sinusoidal opacity modulation, subtle).
- Description appears in a tooltip or in the info panel.
- The instability strip is a special vertical band crossing the diagram — highlight it differently (dashed border, label "Cepheids", "RR Lyrae").
- Regions should not interfere with the track animation — both can be active simultaneously.

**Pass criteria:** Clicking on the main sequence highlights MS stars and shows description. Clicking on WD region highlights white dwarfs. Clicking on supergiants highlights those points. Clicking outside resets. Region labels are legible.

### Stage 5: Overlay Toggles (Iso-radius, Spectral Type, Instability Strip)

**Build:** Checkbox toggles in the controls bar:
- **Iso-radius lines**: Diagonal lines for R = 0.01, 0.1, 1, 10, 100, 1000 R_sun, each labelled. These are straight lines in log space (see formula in Physics section). Colour: subtle white at 0.2 opacity.
- **Spectral type axis**: A secondary X-axis showing O, B, A, F, G, K, M at the corresponding temperatures.
- **Instability strip**: A vertical shaded band from log(T) ~ 3.80 to 3.90, spanning the full luminosity range.

**Key details:**
- Iso-radius lines: calculate from `log(L) = 4*log(T) + 2*log(R) - 4*log(5780)`. For R=1: passes through (log T=3.762, log L=0), i.e., the Sun's position.
- Label each line at the top of the diagram: "0.01 R_sun", "1 R_sun", "100 R_sun", etc.
- Spectral type positions: O (>30000 K, logT > 4.48), B (10000-30000, 4.0-4.48), A (7500-10000, 3.88-4.0), F (6000-7500, 3.78-3.88), G (5200-6000, 3.72-3.78), K (3700-5200, 3.57-3.72), M (2400-3700, 3.38-3.57).
- Default: all toggles OFF to keep the diagram clean.

**Pass criteria:** Each toggle shows/hides its overlay. Iso-radius lines are correctly positioned (the 1 R_sun line passes through the Sun's position). Spectral types align with the correct temperature ranges. Instability strip is a semi-transparent band at the correct temperature.

### Stage 6: Polish, Readouts, Embed Mode

**Build:**
- **Readouts** (info panel): Current mass, current phase, log(T_eff), log(L/L_sun), R/R_sun, time elapsed (Myr or Gyr), time remaining.
- **Embed mode** (body.embedded): Hide info panel text, compact readout only, cross-section panel hidden or minimized, controls simplified.
- **Spacebar** toggles play/pause.
- **Hover on track**: show a tooltip with phase name and properties at that point.
- **"Day" mode** hint text: "Select a stellar mass to watch its evolution."
- **Bloom**: subtle, on the animated marker only (threshold high enough that population points don't bloom). Bloom strength 0.3, radius 0.5, threshold 0.7.
- **Credits**: "Evolutionary tracks based on MESA/MIST models (Choi+ 2016). Stellar properties from Hurley+ (2000)."
- **Performance**: ensure 60fps with 2000 population points + animated marker + cross-section redraws.

**Pass criteria:** All readouts update correctly during animation. Embed mode is functional and compact. Spacebar works. Bloom is tasteful. Performance is smooth.

---

## Features & Controls

### Main Canvas (left/center, ~65% width)
- HR diagram: log(T_eff) vs log(L/L_sun), reversed X-axis
- Background population scatter (~2000 points, temperature-coloured)
- Evolutionary track (line + animated marker)
- Phase label tracking the marker
- Clickable regions with highlight + description
- Optional overlays: iso-radius lines, spectral type axis, instability strip

### Cross-Section Panel (right sidebar, ~30% width)
- Concentric shell diagram
- Labels for each shell (composition + process)
- Updates with evolutionary phase
- Radius scales qualitatively with stellar radius

### Controls (bottom bar)
- **Mass selection**: 6 buttons (0.5, 1, 2, 5, 10, 25 M_sun) — active button highlighted
- **Play/Pause** button
- **Speed** selector (0.5x, 1x, 2x, 5x)
- **Iso-radius** checkbox
- **Spectral type** checkbox
- **Instability strip** checkbox

### Info Panel (top-left)
- Title: "Hertzsprung-Russell Diagram"
- Description: "Watch a star evolve across the most important diagram in stellar astrophysics."
- Readouts:
  - Mass: XX M_sun
  - Phase: [current phase name]
  - log T_eff: X.XX
  - log L/L_sun: X.XX
  - Radius: XX R_sun
  - Age: XX Myr / Gyr
- Hint: "Select a mass. Click diagram regions to explore."

---

## Verification Requirements

### Physics checks (for verifier)

1. **Axis orientation**: Temperature INCREASES to the LEFT (reversed X-axis). Luminosity increases UPWARD. This is the fundamental convention — getting it wrong makes the entire diagram meaningless.
2. **Main sequence slope**: The MS runs from lower-right (cool, dim) to upper-left (hot, bright). Slope in log-log: approximately `log L ~ 3.5 * log T - constant`.
3. **1 M_sun track shape**: ZAMS at (3.76, 0.0) -> RGB climbs nearly vertically at log T ~ 3.55 -> HB at (3.70, 1.7) -> AGB climbs again -> WD track drops to lower-left.
4. **10 M_sun track**: Stays at high luminosity (log L > 3.5 throughout). Crosses the diagram horizontally. Ends in SN, not WD.
5. **RGB is nearly vertical**: Stars ascend the RGB at roughly constant temperature (log T ~ 3.55-3.60). The track should NOT arc to the right on the RGB.
6. **Blue loops**: The 5 and 10 M_sun tracks should show blue loops (excursions back toward higher T after He ignition). These cross the instability strip — this is what makes Cepheids.
7. **White dwarf track**: Descends from high-T, low-L (upper left of WD region) toward cool and dim (lower right of WD region).
8. **Population statistics**: Main sequence should contain ~60% of all points, giants ~15%, WD ~10%, other ~15%.
9. **Iso-radius lines**: The 1 R_sun line must pass through the Sun's approximate position (logT=3.76, logL=0.0). Lines of larger R are above and to the right; smaller R below and to the left.
10. **Cross-section correctness**: On the MS, there should be only one burning zone (core). On the RGB, there must be an inert core + shell. On the pre-SN of a massive star, there must be multiple concentric shells (onion structure).

### Visual checks (for verifier)

1. Diagram is readable: axis labels visible, population points form recognizable groups.
2. Evolutionary track is smooth (no sharp corners between waypoints).
3. Animated marker is visible and has correct colour for its temperature.
4. Cross-section updates correctly with phase changes.
5. Clickable regions highlight the correct population.
6. Bloom is subtle — population points should NOT bloom (only the animated marker).
7. Performance: 60fps with all features active.
8. Embed mode: compact, functional, no overlapping elements.
9. Background stars (stellar field) present per style guide.

---

## Eye Candy & Visual Targets

### Reference images

1. **ESA Gaia DR2 HR diagram** (https://sci.esa.int/web/gaia/-/60198-gaia-hertzsprung-russell-diagram): The density-mapped population is the gold standard for what the background scatter should evoke. We won't match 4 million stars, but our ~2000 points should cluster in recognizable groups with the same overall morphology.
2. **Pitch Interactive / SciAm HR diagram**: Publication-quality design is our visual target. Clean typography, thoughtful colour mapping, elegant labels.
3. **Standard textbook HR diagram with evolutionary tracks**: Any introductory astronomy textbook (Carroll & Ostlie, Kippenhahn & Weigert) shows the canonical track shapes. Our tracks must match these.
4. **NAAP HR Explorer**: The overlays (iso-radius, spectral type, instability strip) should be at least as clear and correct as NAAP's, but with modern styling.

### What WRONG looks like
- **Reversed axes** (hot on right): The #1 most common mistake. Fatal if made.
- **Linear axes**: The HR diagram MUST use logarithmic scales on both axes. Linear scales compress the diagram nonsensically.
- **Tracks that cross incorrectly**: RGB should be nearly vertical. Blue loops should return to the giant branch. WD tracks descend to lower-left, not lower-right.
- **Uniform star colour**: All population points the same colour. They MUST be temperature-coloured (red to blue).
- **Giant cross-section with no shells**: The whole point of the cross-section is to show internal structure changing. If it's just a uniform circle, it adds nothing.

---

## Textures/Assets Needed

**None.** This is a fully procedural visualization. All geometry is canvas drawing, Three.js points, and HTML overlays. No textures required.

Optional: a subtle noise texture for the cross-section envelope to suggest convection, but this can be achieved procedurally with ShaderMaterial.

---

## Complexity Estimate

**Hardest (800-1200 lines JS)**. Multi-panel layout (HR diagram + cross-section sidebar), 6 evolutionary track datasets with interpolation, animated marker with phase-dependent behaviour, clickable regions with highlighting, 3 overlay toggles, linked cross-section that redraws per phase, embed mode. Comparable to the most complex COSMOS apps. The physics is simpler than the rotation curve (no Bessel functions — just waypoint interpolation), but the UI complexity is higher (two linked panels, 6 mass tracks, clickable regions, overlays).

---

## Closest Existing COSMOS App to Use as Template

**`experimental/binary-star-interactive.html`** — because:
1. Multi-panel layout: 3D scene (or main canvas) + diagnostic panel on the right
2. Physics-driven animation with discrete parameter selection
3. Controls bar with buttons and sliders
4. Linked panels that update together (3D orbit + RV plot + light curve ~ HR diagram + cross-section)
5. Phase-dependent behaviour (binary orbit phase ~ evolutionary phase)

Alternative: **`experimental/gravitational-waves-interactive.html`** — for the spectrogram panel positioning and the animated physics with time progression.

The HR diagram is unique in that its main canvas is more 2D diagram than 3D scene, so the coder should use an orthographic camera or a pure 2D canvas for the scatter plot. The cross-section sidebar is also 2D. This app is more "data visualization" than "3D simulation," which is a different flavour from the other COSMOS physics sims.

---

## Reference Implementations (for coder)

### Evolutionary track data
- **Hurley, Pols & Tout 2000** (MNRAS 315, 543): "Comprehensive analytic formulae for stellar evolution as a function of mass and metallicity." The authoritative analytic SSE formulae. Available at https://arxiv.org/abs/astro-ph/0001295. The Swinburne SSE web interface (https://astronomy.swin.edu.au/~jhurley/stellar.html) uses this code.
- **MIST/MESA isochrones**: https://waps.cfa.harvard.edu/MIST/ — grid of tracks from 0.1-300 M_sun. Download solar-metallicity tracks for the 6 target masses to extract waypoints.
- **Choi+ 2016** (ApJ 823, 102): MIST paper describing the track computation. https://arxiv.org/abs/1604.08592

### Star colour mapping
- **Harre & Heller 2021**: "Digital color codes of stars," Astronomische Nachrichten 342, 578. https://arxiv.org/abs/2101.06254 — tabulated hex colour codes for T_eff = 2300-55000 K.
- **Mitchell Charity star color table**: http://www.vendian.org/mncharity/dir3/starcolor/details.html — widely used reference for blackbody-to-sRGB conversion.

### HR diagram background population
- **Gaia DR2 HR diagram** data: for realistic population morphology. We don't load real Gaia data (too large), but generate synthetic populations that mimic the observed structure.
- **Salpeter IMF**: dN/dM ~ M^{-2.35} for mass function weighting.

### Cross-section diagrams
- **Kippenhahn & Weigert, "Stellar Structure and Evolution"**: Standard textbook with cross-section diagrams of burning shells.
- **ASTRO 801 (Penn State)**: https://courses.ems.psu.edu/astro801/content/l5_p5.html — clear evolutionary track diagrams.

### D3.js HR diagram (code reference)
- **paubel/HR-diagram**: https://github.com/paubel/HR-diagram — MIT license D3.js scatter plot of stellar data. Useful reference for axis setup and tooltip implementation, though we use Three.js not D3.

### Illinois DDR (algorithm reference)
- **Digital Demo Room**: https://rainman.astro.illinois.edu/ddr/stellar/code.html — documents the SSE-based algorithm for computing evolutionary tracks on an HR diagram.

---

## Test Values (verify before building)

### Star positions on the HR diagram

| Star | log(T_eff) | log(L/L_sun) | Check |
|------|-----------|--------------|-------|
| Sun | 3.762 | 0.00 | Must be on the main sequence, left of centre |
| Betelgeuse | ~3.55 | ~4.9 | Upper right — red supergiant region |
| Sirius A | ~3.98 | ~1.4 | Upper main sequence, blue-white |
| Proxima Centauri | ~3.50 | ~-2.5 | Lower right main sequence, red dwarf |
| Sirius B | ~4.40 | ~-1.8 | White dwarf region (hot, dim) |

### Iso-radius line positions

| R/R_sun | Passes through (logT, logL) | Check |
|---------|----------------------------|-------|
| 0.01 | (4.0, -5.3) and (4.5, -3.3) | WD region |
| 1.0 | (3.762, 0.0) — the Sun | Must pass through Sun |
| 10 | (3.762, 2.0) and (4.0, 3.0) | Giant region |
| 100 | (3.55, 3.0) and (3.8, 4.0) | Red giant tip |
| 1000 | (3.55, 5.0) | Supergiant region |

### Track endpoint checks

| Mass | Final state | Final log(T), log(L) region |
|------|-------------|----------------------------|
| 0.5 M_sun | Still on MS | Barely moves from ZAMS |
| 1 M_sun | White dwarf | log(T) ~ 3.8-4.2, log(L) ~ -2 to -4 |
| 5 M_sun | White dwarf (massive) | log(T) ~ 4.0-4.5, log(L) ~ -1 to -2 |
| 10 M_sun | Core-collapse SN | log(T) ~ 3.5-3.6, log(L) ~ 4.5-4.6 |
| 25 M_sun | Core-collapse SN | log(T) ~ 3.5-3.6, log(L) ~ 5.3-5.5 |

---

## Speed Ranges

- Default animation: 1x = full track traversed in ~45 seconds.
- Slow: 0.5x = 90 seconds.
- Fast: 2x = 22 seconds.
- Very fast: 5x = 9 seconds.
- The MS phase should consume ~50% of the animation time at 1x (reflecting its dominance in real stellar lifetimes).

---

## Notes for CEO

### What went well
- The physics of stellar evolution on the HR diagram is among the best-documented topics in all of astrophysics. Textbooks (Carroll & Ostlie, Kippenhahn & Weigert), review papers (Hurley+ 2000), and model grids (MIST, PARSEC) provide authoritative data for every mass and evolutionary phase.
- The Hurley SSE code lives at Swinburne — the same university hosting COSMOS. This is a natural connection to highlight.
- The NAAP HR Explorer is the main competitor and it has no evolutionary tracks, no animation, no cross-section. Our unique value is clear and strong.
- The ESA Gaia DR2 diagram provides a gorgeous observational target for the background population morphology.

### What was hard
- **No existing WebGL HR diagram with animated tracks exists.** We are building something genuinely new. The closest (Illinois DDR) uses dated Java and lacks visual polish. There is no Three.js or D3.js codebase to port.
- **Evolutionary track waypoint data must be curated by hand.** MESA outputs millions of time steps per track; we need ~10-15 waypoints per mass carefully chosen at evolutionary milestones. The waypoint values in this spec are approximate (derived from textbook figures and MIST documentation). The coder should cross-check against MIST tracks (downloadable from https://waps.cfa.harvard.edu/MIST/) and refine if shapes look wrong.
- **The cross-section sidebar is architecturally different from previous COSMOS panels.** Previous sidebars are 2D plots (rotation curve, RV curve, light curve). This one is a schematic diagram with concentric rings, labels, and phase-dependent structure. It may need its own dedicated canvas with custom drawing routines.

### Risks
1. **Track shapes**: If the waypoint interpolation produces unphysical shapes (e.g., RGB going right instead of up, blue loops missing), the diagram will be misleading. Mitigation: verify every track against textbook figures before moving to Stage 3.
2. **Cross-section complexity**: The pre-SN onion-shell structure for 25 M_sun has 6+ concentric shells with labels. Drawing this legibly in a sidebar panel is a layout challenge. Mitigation: use a logarithmic radial scale and short labels ("H→He", "He→C").
3. **2D vs 3D architecture**: This app is fundamentally a 2D data visualization, not a 3D scene. Using Three.js with an orthographic camera for the HR scatter plot is viable but slightly unconventional. Alternative: use a pure HTML5 Canvas2D for the diagram and Three.js only for bloom on the animated marker. The coder should choose whichever is simpler.
4. **Clickable regions overlapping with track animation**: Both the track animation and region clicking need to work simultaneously. This is a UI coordination challenge. Mitigation: region clicking modifies point opacity only; it doesn't pause or redirect the track animation.

### Approach recommendation
Build in strict stage order. Stage 1 (HR diagram canvas + population) is the foundation — it must be correct and beautiful before any animation is added. The coder should spend significant time on Stage 1 getting the axis orientation, population distribution, and colour mapping right. Stage 2 (track animation) is the core feature. Stage 3 (cross-section) is the unique differentiator. Stages 4-6 are polish.

If the cross-section sidebar proves too complex for the initial build, it can be deferred to a second pass — the HR diagram with animated tracks is already valuable without it. But the cross-section is what elevates this from "nice interactive diagram" to "best-in-class stellar evolution tool."
