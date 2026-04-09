# Spec: Major Axis

**Slug:** major-axis
**Category:** coordinates
**Tier:** 1
**Status:** phase-1-research done; images skipped (coordinator instruction)

---

## Summary

The major axis is the longest diameter of an ellipse — a straight line segment passing through the centre and both foci, with its endpoints on the ellipse. Half this length is the **semi-major axis** (symbol *a*), one of the most important quantities in orbital mechanics. Every bounded gravitational orbit is an ellipse (Kepler's First Law), so the major axis and semi-major axis underpin our description of all orbital motion: planetary orbits, binary star systems, satellite paths, and the shapes of elliptical galaxies.

---

## Key Facts with Sources

### 1. Definition (Geometry)

- The **major axis** of an ellipse is the longest chord: it passes through the centre and through both foci [Wikipedia: Semi-major and semi-minor axes, https://en.wikipedia.org/wiki/Semi-major_and_semi-minor_axes].
- The **semi-major axis** (*a*) is half the major axis. It runs from the centre, through one focus, to the nearest point on the ellipse [Wikipedia: Semi-major and semi-minor axes].
- The **semi-minor axis** (*b*) is perpendicular to the semi-major axis and shorter. Together *a* and *b* define the ellipse: `(x/a)² + (y/b)² = 1` [UNLV Ellipses and Elliptical Orbits, https://www.physics.unlv.edu/~jeffery/astro/orbit/ellipse.html].
- The focal half-distance *c* satisfies `c² = a² − b²` [Wikipedia: Semi-major and semi-minor axes].

### 2. Relationship to Eccentricity

- **Eccentricity** (*e*) measures the departure from circularity: `e = c/a = √(1 − b²/a²)` [Wikipedia: Semi-major and semi-minor axes].
- *e* = 0 → circle; 0 < *e* < 1 → ellipse; *e* = 1 → parabola; *e* > 1 → hyperbola [UNLV Ellipses and Elliptical Orbits].
- Conversely, `b = a√(1 − e²)` [Wikipedia: Semi-major and semi-minor axes].
- Earth's orbital eccentricity is 0.0167, making its orbit nearly circular — only ±1.67% variation from its mean distance [UNLV Ellipses and Elliptical Orbits].

### 3. Apsides on the Major Axis

- The endpoints of the major axis are the **apsides** — the closest and farthest points in the orbit [Wikipedia: Kepler's laws of planetary motion, https://en.wikipedia.org/wiki/Kepler%27s_laws_of_planetary_motion].
- For a planet orbiting the Sun: **perihelion** (closest, θ = 0°) and **aphelion** (farthest, θ = 180°) [Wikipedia: Kepler's laws of planetary motion].
- Distances: `r_min = a(1 − e)` and `r_max = a(1 + e)` [Wikipedia: Semi-major and semi-minor axes].
- Therefore the semi-major axis *a* is the arithmetic mean of perihelion and aphelion distances: `a = (r_min + r_max)/2` [Wikipedia: Kepler's laws of planetary motion].
- Terminology varies by system: perigee/apogee (Earth orbits), periastron/apastron (binary stars), periapsis/apoapsis (general) [UNLV Ellipses and Elliptical Orbits].

### 4. Kepler's First Law

- Every planet orbits the Sun in an ellipse with the Sun at one focus — Kepler's First Law, published in *Astronomia Nova* (1609) [NASA Science: Orbits and Kepler's Laws, https://science.nasa.gov/resource/orbits-and-keplers-laws/].
- The major axis therefore connects the two extreme points of the orbit; the Sun is offset from the centre by focal distance *c* [NASA Science].

### 5. Relationship to Orbital Period — Kepler's Third Law

- Kepler's Third Law (published in *Harmonice Mundi*, 1619): "The ratio of the square of an object's orbital period to the cube of the semi-major axis of its orbit is the same for all objects orbiting the same primary." Symbolically: **T² ∝ a³** [Wikipedia: Kepler's laws of planetary motion].
- In SI units: `T² = (4π²/GM) · a³` where *G* is the gravitational constant and *M* is the central mass. Newton (1687) derived this from his law of universal gravitation [Wikipedia: Kepler's laws of planetary motion].
- Simplified for solar orbits (period in years, *a* in AU): `T = a^(3/2)` [Astronomy Notes: Kepler's Third Law, https://www.astronomynotes.com/gravappl/s9.htm].
- All ellipses with the same semi-major axis share the same orbital period, regardless of eccentricity [Wikipedia: Semi-major and semi-minor axes].
- The semi-major axis is therefore often equated with the **mean orbital distance** from the primary body [CNEOS/JPL Glossary, https://cneos.jpl.nasa.gov/glossary/semimajor_axis.html].

### 6. Binary Star Systems

- In a visual binary, both stars orbit their common **centre of mass** in ellipses; the major axis of each star's relative orbit is the **line of apsides**, passing through the primary (at a focus) and the apsides (periastron and apastron) [Handprint: Double Star Orbital Elements, https://www.handprint.com/ASTRO/bineye3.html].
- The semi-major axis in binary orbits is typically measured in arcseconds (angular semi-major axis). When the system distance *D* (in parsecs) is known, the physical semi-major axis in AU is `a_AU = a_arcsec × D` [Handprint: Double Star Orbital Elements].
- Kepler's Third Law applies to binary systems in the form: `a³/T² = G(M₁ + M₂)/(4π²)`, allowing total system mass to be determined from *a* and *T* [Wikipedia: Kepler's laws of planetary motion].

### 7. Elliptical Galaxies

- The major axis is the primary measurement axis used to classify **elliptical galaxies** [Wikipedia: Elliptical galaxy, https://en.wikipedia.org/wiki/Elliptical_galaxy].
- Hubble's classification uses the ellipticity parameter `10(1 − b/a)` where *a* = major axis and *b* = minor axis; values run E0 (round) to E7 (most elongated, *b/a* ≈ 0.3) [Wikipedia: Elliptical galaxy].
- Galaxy isophote fitting uses ellipse approximations; the major axis orientation (position angle) and axis ratio *b/a* are standard morphological descriptors [MNRAS: Measuring shapes of galaxy images, https://academic.oup.com/mnras/article/343/3/933/1124275].

---

## Article Outline

1. **Introduction** — define major axis as the longest diameter of an ellipse; introduce semi-major axis *a* as the key parameter in orbital astronomy.
2. **Geometry of an Ellipse** — equation `(x/a)² + (y/b)² = 1`; relationship between *a*, *b*, *c*, *e*; labeled diagram showing major axis, semi-major axis, foci.
3. **Apsides: The Endpoints of the Major Axis** — perihelion/aphelion for solar orbits; general apsis terminology; formulas `r_min = a(1−e)`, `r_max = a(1+e)`.
4. **Kepler's Laws and the Semi-Major Axis** — First Law (elliptical orbits); Third Law (T² ∝ a³); Newton's generalisation; solar system examples.
5. **Binary Star Orbits** — relative orbit; line of apsides; angular vs. physical semi-major axis; mass determination.
6. **Galaxy Morphology** — Hubble classification of elliptical galaxies via axis ratio *b/a*.
7. **Summary Table** — key formulas at a glance.

---

## Key Formulas

| Quantity | Formula | Notes |
|----------|---------|-------|
| Ellipse equation | `(x/a)² + (y/b)² = 1` | semi-major *a*, semi-minor *b* |
| Focal distance | `c = ae` | *e* = eccentricity |
| Semi-minor axis | `b = a√(1 − e²)` | |
| Eccentricity | `e = √(1 − b²/a²)` | |
| Periapsis distance | `r_min = a(1 − e)` | |
| Apoapsis distance | `r_max = a(1 + e)` | |
| Kepler's 3rd law (simple) | `T² ∝ a³` | same primary body |
| Kepler's 3rd law (solar, SI) | `T = a^(3/2)` | T in yr, a in AU |
| Kepler's 3rd law (Newtonian) | `T² = 4π²a³ / G(M+m)` | both masses included |
| Hubble ellipticity (galaxies) | `E_n = 10(1 − b/a)` | n = 0..7 |

---

## Related COSMOS Articles (cross-links to check)

- `semi-major-axis` (existing)
- `projected-semi-major-axis` (existing)
- `orbital-eccentricity` (check slug)
- `keplers-laws` (check slug)
- `perihelion` (check slug)
- `aphelion` (check slug)
- `elliptical-galaxy` (check slug)
- `binary-star` (check slug)

---

## Images — Downloaded

3 candidate images downloaded to this spec directory:

1. **ellipse-diagram.jpg** — Labeled ellipse diagram showing semi-major axis (a), semi-minor axis (b), foci — CC0 (public domain). **Recommended lead image.** Clear geometry illustration covering definitions in sections 1–3. Source: `File:Ellipse_semi-major_and_minor_axes.svg` (rendered at 1280px PNG)
2. **kepler-orbit-diagram.jpg** — Kepler's three laws diagram showing elliptical orbit with major axis, equal-area sectors — CC BY-SA 3.0. **Recommended.** Illustrates Kepler's First and Third Laws in context. Source: `File:Kepler_laws_diagram.svg` (rendered at 960px PNG)
3. **hubble-elliptical-sequence.jpg** — Hubble tuning fork diagram showing E0–E7 elliptical galaxy axis ratios — CC BY-SA 3.0. Supporting image for the galaxy morphology section. Source: `File:Hubble_sequence_photo.png`

---

## Sources

1. Wikipedia: Semi-major and semi-minor axes — https://en.wikipedia.org/wiki/Semi-major_and_semi-minor_axes
2. Wikipedia: Kepler's laws of planetary motion — https://en.wikipedia.org/wiki/Kepler%27s_laws_of_planetary_motion
3. NASA Science: Orbits and Kepler's Laws — https://science.nasa.gov/resource/orbits-and-keplers-laws/
4. Astronomy Notes: Kepler's Third Law — https://www.astronomynotes.com/gravappl/s9.htm
5. CNEOS/JPL Glossary: Semi-major axis — https://cneos.jpl.nasa.gov/glossary/semimajor_axis.html
6. UNLV: Ellipses and Elliptical Orbits — https://www.physics.unlv.edu/~jeffery/astro/orbit/ellipse.html
7. Handprint: Double Star Orbital & Dynamic Elements — https://www.handprint.com/ASTRO/bineye3.html
8. Wikipedia: Elliptical galaxy — https://en.wikipedia.org/wiki/Elliptical_galaxy
9. MNRAS: Measuring shapes of galaxy images (Bernstein & Jarvis 2002) — https://academic.oup.com/mnras/article/343/3/933/1124275
10. Lissauer & de Pater (2019) *Fundamental Planetary Science* — cited by Wikipedia as primary reference for orbital mechanics [secondary citation via Wikipedia]
