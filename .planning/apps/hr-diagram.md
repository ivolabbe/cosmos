# HR Diagram Interactive — Development Log

## Verification Log

### FAIL: HR Diagram Interactive

**Screenshots**: Puppeteer: `/tmp/hr-diagram-interactive-initial.png`, `/tmp/hr-diagram-interactive-rotated.png`. Browser screenshots taken in Chrome via MCP at multiple states (initial, 1 M_sun WD endpoint, 10 M_sun SN endpoint, 25 M_sun SN endpoint, overlays enabled, WD region highlight, embedded mode).

**Agent instructions checked**: `.agents/sao-coder.md`

### Checklist

| # | Category | Check | Result | Detail |
|---|----------|-------|--------|--------|
| 1 | Agent compliance | Coder followed its instructions | FAIL | Deviated from spec architecture: used 2D Canvas instead of Three.js+OrthographicCamera as specified. Missing bloom pipeline. Missing `?embed=1` URL param detection. |
| 2 | Preservation | Original text preserved | N/A | Interactive, not article |
| 3 | Rendering | Scene renders without errors | PASS | No console errors. Canvas renders correctly at 920x800. Loading indicator hidden. |
| 4 | Rendering | Bloom pipeline present | FAIL | No Three.js, no EffectComposer/UnrealBloomPass/OutputPass. Spec explicitly requested bloom on animated marker (strength 0.3, radius 0.5, threshold 0.7). Marker uses a canvas radial gradient as a substitute. |
| 5 | Rendering | Circular particles (no PointsMaterial) | N/A | 2D Canvas used, not Three.js Points. Population rendered via `ctx.arc()` circles, which are inherently circular. No square-particle issue. |
| 6 | Style | House style CSS matches snippets | PASS | Info panel, controls bar, tooltip, credit line all match house style. Glass panel background, border-radius, button styling all correct. |
| 7 | Style | Embedded mode works | FAIL | Only checks `window.self !== window.top`. Does NOT check `?embed=1` URL param. Other COSMOS apps (density-wave, large-scale-structure, cmb) check both. When loaded via `?embed=1`, the `embedded` class is not applied. |
| 8 | Controls | All controls functional | PASS | Mass buttons (0.5, 1, 2, 5, 10, 25 M_sun), Play/Pause, Speed (0.5x, 1x, 2x, 5x), Iso-radius toggle, Spectral type toggle, Instability strip toggle -- all functional. |
| 9 | Controls | Spacebar play/pause | PASS | Verified via synthetic KeyboardEvent dispatch: spacebar toggles `playing` correctly. Handler at lines 1190-1201. |
| 10 | Physics | Axis orientation (T increases LEFT, L increases UP) | PASS | `plotX(4.5) < plotX(3.5)` confirmed. `plotY(4.0) < plotY(-2.0)` confirmed. Hot on left, bright on top. |
| 11 | Physics | MS slope correct (lower-right to upper-left) | PASS | Cool MS stars (logT<3.6): avg logL = -1.62. Hot MS stars (logT>4.2): avg logL = 3.44. Slope is correct. |
| 12 | Physics | 1 M_sun track: ZAMS -> RGB -> HB -> AGB -> WD | PASS | ZAMS at (3.762, 0.00) correct. RGB tip at (3.55, 3.4) nearly vertical. HB at (3.70, 1.7). Final state: Cool WD at (3.80, -3.50). Track shape matches textbook. |
| 13 | Physics | 10+ M_sun track: stays high L, ends in SN | PASS | 10 M_sun: min logL = 3.77, ends "Core Collapse SN" at (3.56, 4.60). 25 M_sun: ends "Core Collapse SN" at (3.58, 5.40). Neither produces a WD. |
| 14 | Physics | RGB nearly vertical | PASS | 1 M_sun RGB: logT range 3.55-3.68, while logL rises from 1.2 to 3.4. Near-vertical ascent confirmed. |
| 15 | Physics | Blue loops present for 5 and 10 M_sun | PASS | 5 M_sun: "Blue loop (hot)" at logT=4.05. 10 M_sun: "Blue loop" at logT=4.10. Both cross back to high T after He ignition. |
| 16 | Physics | Background population ~60% MS | PASS | 932/1732 = 53.8% MS. Slightly below 60% target due to IMF sampling filtering, but within acceptable range. |
| 17 | Physics | Iso-radius R=1 passes through Sun position | PASS | Formula `logL = 4*logT + 2*log(R) - 4*log(5780)` at logT=3.762, R=1: logL = 0.0003. Passes through Sun. |
| 18 | Physics | Cross-section phases correct | PASS | MS: H->He core + H envelope. RGB: inert He (degen.) + H->He shell + convective envelope. HB: He->C,O + H->He + envelope. AGB: inert C,O + He->C,O + H->He + convective envelope. Pre-SN 10 M_sun: 8-shell onion (Fe, Si, O, Ne, C, He, H shells). WD: C,O degenerate + thin H/He layer. All correct. |
| 19 | Physics | Radius readout from Stefan-Boltzmann | PASS | Sun: 1.000 R_sun. RGB tip: 133 R_sun. Cool WD: 0.015 R_sun. All physically reasonable. |
| 20 | Physics | WD track descends to lower-left | PASS | 1 M_sun WD track: PN nucleus (4.70, 2.00) -> Hot WD (4.60, 0.00) -> Cooling WD (4.20, -1.50) -> Cool WD (3.80, -3.50). Descends correctly. |
| 21 | Visual | Diagram readable, population recognizable | PASS | MS band, giant branch clump, HB/red clump, WD sequence, supergiants all clearly visible and distinguishable. Temperature colouring correct (red M-dwarfs through blue O-stars). |
| 22 | Visual | Track smooth (no sharp corners) | PASS | Catmull-Rom interpolation between waypoints produces smooth curves. No sharp kinks visible in screenshots. |
| 23 | Visual | Marker colour matches temperature | PASS | Marker colour updates correctly via `tempToCSS()` with 16-point interpolated colour table. Red at cool T, blue at hot T. |
| 24 | Visual | Cross-section updates with phase | PASS | Verified visually: cross-section shows correct shell structure at MS (2 layers), RGB (3 layers), HB (3 layers), AGB (4 layers), pre-SN (8 layers), WD (2 layers). Shell structure animates smoothly. |
| 25 | Visual | Region click highlights correct population | PASS | Clicked WD region: WD population brightened (alpha 0.9, size 2.8), all other points dimmed (alpha 0.08). Dashed red boundary drawn. Description panel shows correct text. |
| 26 | Visual | Credit line present | PASS | "Evolutionary tracks based on MESA/MIST models (Choi+ 2016). Stellar properties from Hurley+ (2000). COSMOS / Swinburne Astronomy Online." |
| 27 | Style | Dark background | PASS | Background: `#000` (pure black). `body { background: #000; }` and `hrCtx.fillStyle = '#000'`. |

### Verdict: FAIL
- Passed: 23/27
- Failed: #1 (agent compliance), #4 (bloom pipeline), #7 (embedded mode)

### Failed checks detail:

1. **Check #1 — Agent compliance**: The spec explicitly states "Use WebGL (Three.js OrthographicCamera + Points with ShaderMaterial for circular particles) for the scatter plot" (Stage 1) and "Bloom: subtle, on the animated marker only (threshold high enough that population points don't bloom). Bloom strength 0.3, radius 0.5, threshold 0.7" (Stage 6). The coder used 2D Canvas instead, which means no bloom pipeline is possible. The 2D canvas approach is clean and functional, but it deviates from the spec architecture.
   **Rule violated**: Spec Stage 1 "Use WebGL (Three.js OrthographicCamera + Points with ShaderMaterial)" and sao-coder.md "The spec — your blueprint".
   **Suggested fix**: This is a fundamental architecture choice. The 2D Canvas implementation works well visually. **Two options**: (a) Accept the 2D Canvas approach and mark bloom as N/A for this app type. The radial gradient on the marker serves as a bloom substitute. (b) Rewrite using Three.js OrthographicCamera + Points with ShaderMaterial + bloom pipeline. Option (a) is pragmatic; option (b) is spec-faithful.

2. **Check #4 — Bloom pipeline**: See #1 above. No Three.js means no bloom. The radial gradient marker glow is an acceptable visual substitute.
   **Suggested fix**: If keeping 2D Canvas, no fix needed — the glow effect is adequate. If switching to Three.js, add `UnrealBloomPass(res, 0.3, 0.5, 0.7)` + `OutputPass`.

3. **Check #7 — Embedded mode detection**: Line 183 only checks `window.self !== window.top`. Missing `new URLSearchParams(location.search).has('embed')` check.
   **Rule violated**: House style pattern used by other COSMOS apps (density-wave, cmb, large-scale-structure all check both iframe AND URL param).
   **Suggested fix**: Change line 183 from:
   ```javascript
   if (window.self !== window.top) document.body.classList.add('embedded');
   ```
   to:
   ```javascript
   if (window.self !== window.top || new URLSearchParams(location.search).has('embed'))
     document.body.classList.add('embedded');
   ```

### Passed checks (do not break on retry):
#3 (renders without errors), #5 (circular particles via arc), #6 (house style CSS), #8 (all controls), #9 (spacebar), #10 (axis orientation), #11 (MS slope), #12 (1 M_sun track), #13 (10+ M_sun ends SN), #14 (RGB vertical), #15 (blue loops), #16 (population stats), #17 (iso-radius), #18 (cross-section), #19 (radius readout), #20 (WD track), #21 (readable), #22 (smooth track), #23 (marker colour), #24 (cross-section updates), #25 (region clicks), #26 (credit line), #27 (dark background).

### Minor notes (not failures):
- **WD background population**: generated with independent random logT and logL (no T-L correlation). Real WDs follow a cooling track. The spec only requires WDs in the correct region, which is satisfied. A minor improvement would be to generate WD points along a diagonal band.
- **Population count**: 1732 total vs spec target of ~2000. 268 MS stars were filtered out because their logT or logL fell outside the plot range after Salpeter IMF + scatter. This is acceptable for "~2000".
- **verify.js false positives**: The automated script flagged missing "rotate" and "day" controls, but these are standard for 3D orbital diagrams and are not relevant for a 2D HR diagram. Also flagged speed default as "1" vs expected "0.5", but the spec says 1x is the default speed.

### Notes for CEO (Hardest tier)

**What went well:**
- Physics correctness is excellent. All evolutionary tracks match textbook shapes. Cross-section shell structures are accurate for every phase. The 6 mass tracks cover the full range from barely-evolving red dwarfs to core-collapse supernovae.
- The Catmull-Rom interpolation between waypoints produces smooth, visually appealing tracks.
- The clickable region feature is well-implemented and pedagogically valuable.
- Population statistics are physically realistic (Salpeter IMF weighting, correct regional distributions).
- The cross-section sidebar is a genuine unique feature not found in any existing HR diagram tool.

**What needs attention:**
- The 2D Canvas vs Three.js architecture decision should be resolved. The spec called for Three.js, but the 2D Canvas approach arguably suits this data-visualization-style app better than a 3D scene. If the project accepts 2D Canvas for diagram-type apps, update the spec.
- Embedded mode detection is an easy one-line fix.

**Spec feedback:**
- The spec says to use Three.js OrthographicCamera for a fundamentally 2D scatter plot. This is debatable — 2D Canvas is simpler, faster, and produces the same visual result for a non-3D diagram. Future specs for diagram-type apps (not 3D scenes) should clarify whether Three.js is mandatory or if 2D Canvas is acceptable.
