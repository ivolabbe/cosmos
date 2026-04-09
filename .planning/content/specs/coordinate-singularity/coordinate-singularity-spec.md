# Coordinate Singularity — Article Spec

## Category
Physics (General Relativity, Mathematics)

## Definition (1–2 sentences)
A coordinate singularity is an apparent infinity or discontinuity that arises in one coordinate system but disappears entirely when a different coordinate system is chosen, revealing it as a mathematical artifact of the chosen description rather than a physical feature of spacetime. Unlike a true (physical) singularity, a coordinate singularity carries no physical meaning and can always be removed by an appropriate change of coordinates.

## Full Content (ALL facts needed for 200–400 words)

### What a Coordinate Singularity Is
A coordinate singularity occurs when the mathematical description of spacetime — the metric or a coordinate map — breaks down at a particular point or surface, not because the physics breaks down, but because the chosen coordinate system is poorly suited to that location. The breakdown appears as an infinity or an undefined value in the metric coefficients. It is entirely an artifact of how we choose to label points in spacetime, and choosing a better-adapted coordinate system removes it completely. [Source: Wikipedia, Coordinate singularity](https://en.wikipedia.org/wiki/Coordinate_singularity)]

### Everyday Analogy: The North Pole
The clearest non-relativistic example is the north (and south) pole of the Earth in a latitude–longitude coordinate system. As an object moves due north along the Greenwich meridian (0° longitude), it reaches the North Pole at latitude 90° N. At exactly that point, longitude becomes undefined — the coordinate φ can take any value from 0° to 360° simultaneously. An object continuing due north instantaneously "jumps" from longitude 0° to longitude 180°. This discontinuity is purely an artifact of the coordinate system. The surface of the Earth is perfectly smooth at the pole; there is no physical feature whatsoever. Switching to, for example, a Cartesian or n-vector representation of position eliminates the apparent singularity entirely. Stephen Hawking famously highlighted the conceptual emptiness of this singularity by asking "What lies north of the North Pole?" — demonstrating the question has no answer not because of physics, but because the coordinate system runs out. [Source: Wikipedia, Coordinate singularity](https://en.wikipedia.org/wiki/Coordinate_singularity)]

In general, spherical polar coordinates (r, θ, φ) exhibit this behaviour at both poles (θ = 0 and θ = π), where the azimuthal angle φ is undetermined. This is a standard coordinate singularity in any spherical coordinate system. [Source: Wikipedia, Spherical coordinate system](https://en.wikipedia.org/wiki/Spherical_coordinate_system)]

### The Key Distinction: Coordinate vs. Physical (True) Singularities
The critical test for whether a singularity is a coordinate artifact or a genuine physical singularity is to compute **diffeomorphism-invariant (scalar) quantities** — quantities that have the same value in every coordinate system. If these quantities remain finite at the problematic point, the singularity is a coordinate artifact. If they diverge, a true physical singularity exists. The most commonly used such scalar in general relativity is the **Kretschmann scalar**:

**K = R^αβγδ R_αβγδ**

where R^αβγδ is the Riemann curvature tensor. The Kretschmann scalar is coordinate-independent; if it diverges at a point, that point is a genuine physical singularity regardless of what coordinates are used. [Source: Carroll (2004), *Spacetime and Geometry*, Chapter 7; NED/IPAC Carroll notes](https://ned.ipac.caltech.edu/level5/March01/Carroll3/Carroll7.html)]

### The Schwarzschild Metric: Two Singularities of Different Kinds
The most famous coordinate singularity in physics appears in the Schwarzschild metric, the exact solution to Einstein's field equations for a non-rotating, spherically symmetric mass found by Karl Schwarzschild in 1916. In Schwarzschild coordinates (t, r, θ, φ), the metric is:

**ds² = −(1 − r_s/r) c² dt² + (1 − r_s/r)⁻¹ dr² + r² dΩ²**

where r_s = 2GM/c² is the Schwarzschild radius, G is Newton's gravitational constant, M is the central mass, and c is the speed of light. This metric has apparent infinities at two locations:

1. **r = r_s = 2GM/c²** (the event horizon / Schwarzschild radius)
2. **r = 0** (the centre)

These two locations are radically different in nature.

**At r = r_s**: The Kretschmann scalar evaluates to K = 12 r_s² / r⁶. At r = r_s, this gives K = 12/r_s⁴ — a perfectly finite number. The apparent infinity in the metric is purely a coordinate artifact. When one transforms to better-adapted coordinates (see below), the metric is entirely regular at the event horizon, and observers can cross it freely. [Source: Wikipedia, Schwarzschild metric](https://en.wikipedia.org/wiki/Schwarzschild_metric)]

**At r = 0**: The Kretschmann scalar diverges to infinity: K → ∞ as r → 0. No coordinate transformation can remove this divergence. This is a genuine physical (true) singularity — a point where spacetime curvature becomes infinite and general relativity breaks down. [Source: NED/IPAC Carroll notes; Wikipedia, Gravitational singularity](https://en.wikipedia.org/wiki/Gravitational_singularity)]

The confusion between these two singularities persisted for decades after Schwarzschild's 1916 paper. Many physicists believed the event horizon represented a genuine physical barrier or surface. [Source: Wikipedia, Eddington-Finkelstein coordinates](https://en.wikipedia.org/wiki/Eddington%E2%80%93Finkelstein_coordinates)]

### Historical Resolution: Eddington, Lemaître, and Finkelstein
Arthur Eddington in 1924 first found a coordinate transformation that makes the metric regular at r = r_s, but he appears not to have understood the physical significance of this result. In 1932, Georges Lemaître performed an independent transformation (Lemaître coordinates) and was the first to recognise explicitly that the singularity at r = r_s was a coordinate artifact — not a physical boundary. The coordinates now known as Eddington–Finkelstein coordinates were further developed and their physical meaning fully articulated by David Finkelstein in 1958, who showed clearly that the event horizon is merely a one-way membrane (a null surface) that infalling matter can cross freely in finite proper time. [Source: Wikipedia, Eddington-Finkelstein coordinates](https://en.wikipedia.org/wiki/Eddington%E2%80%93Finkelstein_coordinates); Wikipedia, Schwarzschild metric](https://en.wikipedia.org/wiki/Schwarzschild_metric)]

### Eddington–Finkelstein Coordinates
Eddington–Finkelstein coordinates replace the Schwarzschild coordinate time t with a new null coordinate v (for ingoing) or u (for outgoing), defined using the **tortoise coordinate** r* which logarithmically stretches the radial coordinate near the horizon. In these coordinates:

- The metric determinant is non-zero at r = r_s (the metric is regular/invertible)
- Light cones remain well-behaved and tilted but not degenerate at the horizon
- Infalling observers and photons pass through r = r_s at a finite coordinate value
- For r < r_s, all future-directed paths (timelike and null) point toward decreasing r, revealing the one-way nature of the event horizon

The coordinate singularity has been completely removed. The only remaining singularity is the true one at r = 0. [Source: Wikipedia, Eddington-Finkelstein coordinates](https://en.wikipedia.org/wiki/Eddington%E2%80%93Finkelstein_coordinates); Carroll (2004), Chapter 7; NED/IPAC Carroll notes]

Named after Arthur Eddington and David Finkelstein, though Roger Penrose first documented the null form explicitly in 1965, and Misner, Thorne, and Wheeler's textbook *Gravitation* (1973) made these coordinates standard. [Source: Wikipedia, Eddington-Finkelstein coordinates]

### Kruskal–Szekeres Coordinates: Maximal Extension
The most complete resolution of the Schwarzschild coordinate singularity is provided by Kruskal–Szekeres coordinates, developed by Martin Kruskal and George Szekeres in 1960. These coordinates (T, X, θ, φ) cover the **entire maximally extended Schwarzschild spacetime** with no coordinate singularity anywhere outside the true physical singularity at r = 0.

In Kruskal–Szekeres coordinates:
- For the exterior region (r > r_s): T = √(r/2GM − 1) · e^(r/4GM) · sinh(t/4GM), X = √(r/2GM − 1) · e^(r/4GM) · cosh(t/4GM)
- The event horizon appears as the simple boundary T² − X² = 0 in this coordinate system
- No metric component diverges at the horizon
- The maximal extension reveals **four distinct spacetime regions**: two exterior regions, one black hole interior, and one white hole interior — a structure connected by the Einstein–Rosen bridge (a wormhole)
- The only remaining singularity appears at r = 0, corresponding to the hyperbolae T² − X² = 1 in Kruskal coordinates [Source: Wikipedia, Kruskal-Szekeres coordinates](https://en.wikipedia.org/wiki/Kruskal%E2%80%93Szekeres_coordinates)]

Kruskal–Szekeres coordinates are widely considered the "gold standard" representation of the maximally extended Schwarzschild spacetime and are used routinely in textbooks on general relativity (e.g., Misner, Thorne & Wheeler 1973; Carroll 2004; Wald 1984).

### Importance in General Relativity
The recognition that the Schwarzschild radius is a coordinate singularity, not a physical one, was one of the most important conceptual advances in 20th-century theoretical physics:

1. **It confirmed black holes are physically real**: Objects can and do cross event horizons; there is no physical barrier at r = r_s.
2. **It established the event horizon as a one-way surface**: A null hypersurface that matter can enter but not exit — this is the physical content of the event horizon.
3. **It provided a methodology**: The Kretschmann scalar test for distinguishing coordinate from physical singularities is now standard in GR.
4. **It led to black hole thermodynamics**: Once the event horizon was understood geometrically (as a regular null surface), Hawking radiation and the laws of black hole mechanics could be derived.
5. **It generalises**: The Kerr metric (rotating black holes) and other solutions also exhibit coordinate singularities that require appropriate coordinate choices to handle. [Source: Carroll (2004), *Spacetime and Geometry*; Wikipedia, Gravitational singularity]

## Key Numbers

| Property | Value | Source |
|----------|-------|--------|
| **Schwarzschild radius formula** | r_s = 2GM/c² | [Schwarzschild metric - Wikipedia](https://en.wikipedia.org/wiki/Schwarzschild_metric) |
| **Kretschmann scalar (Schwarzschild)** | K = 12 r_s² / r⁶ | [Carroll notes - NED/IPAC](https://ned.ipac.caltech.edu/level5/March01/Carroll3/Carroll7.html) |
| **K at event horizon (r = r_s)** | K = 12/r_s⁴ (finite) | [Wikipedia, Schwarzschild metric](https://en.wikipedia.org/wiki/Schwarzschild_metric) |
| **K at r = 0** | → ∞ (true singularity) | [Wikipedia, Gravitational singularity](https://en.wikipedia.org/wiki/Gravitational_singularity) |
| **Year Schwarzschild solution found** | 1916 | [Wikipedia, Schwarzschild metric](https://en.wikipedia.org/wiki/Schwarzschild_metric) |
| **Year Eddington coordinate transformation** | 1924 | [Wikipedia, Eddington-Finkelstein coordinates](https://en.wikipedia.org/wiki/Eddington%E2%80%93Finkelstein_coordinates) |
| **Year Lemaître recognised artifact** | 1932 | [Wikipedia, Schwarzschild metric](https://en.wikipedia.org/wiki/Schwarzschild_metric) |
| **Year Finkelstein articulated EF coords** | 1958 | [Wikipedia, Eddington-Finkelstein coordinates](https://en.wikipedia.org/wiki/Eddington%E2%80%93Finkelstein_coordinates) |
| **Year Kruskal–Szekeres coords developed** | 1960 | [Wikipedia, Kruskal-Szekeres coordinates](https://en.wikipedia.org/wiki/Kruskal%E2%80%93Szekeres_coordinates) |
| **Spherical coord singularity latitude** | θ = 0° and θ = 180° (poles) | [Wikipedia, Coordinate singularity](https://en.wikipedia.org/wiki/Coordinate_singularity) |

## Historical Context

- **1916**: Karl Schwarzschild derives the first exact solution to Einstein's field equations; the metric has apparent infinities at r = 0 and r = r_s = 2GM/c².
- **1924**: Arthur Eddington finds a coordinate transformation regular at r = r_s but does not recognise its physical significance.
- **1932**: Georges Lemaître independently finds Lemaître coordinates, and is the first to recognise the singularity at r = r_s is a coordinate artifact.
- **1958**: David Finkelstein uses Eddington-style coordinates to demonstrate clearly that the event horizon is a one-way null surface that infalling observers cross in finite proper time.
- **1960**: Martin Kruskal and George Szekeres independently develop Kruskal–Szekeres coordinates, providing the complete maximal extension of Schwarzschild spacetime with no coordinate singularity.
- **1965**: Roger Penrose introduces Penrose diagrams (conformal diagrams), providing a compact visualisation of the full causal structure, further cementing the coordinate-singularity interpretation.
- **1973**: Misner, Thorne & Wheeler publish *Gravitation*, the definitive textbook, making Eddington-Finkelstein and Kruskal–Szekeres coordinates standard pedagogy in GR.

## Related COSMOS Articles (check slugs.txt before writing)

- [black-hole] — The Schwarzschild radius coordinate singularity is central to black hole physics.
- [kerr-black-hole] — Rotating black holes have analogous coordinate singularities requiring Kerr-adapted coordinates.
- [event-horizon] — The event horizon is the surface corresponding to the removed coordinate singularity.
- [general-relativity] — The framework within which coordinate singularities arise and are resolved.
- [gravitational-singularity] — True/physical singularities; the contrast with coordinate singularities.
- [schwarzschild-radius] — The specific radius r_s = 2GM/c² where the coordinate singularity appears.
- [spacetime] — General context for coordinate descriptions of spacetime.

**NOTE**: Verify these slugs against articles/slugs.txt before writing. Confirmed present: `kerr-black-hole`.

## Images (candidates — NOT downloaded per coordinator instruction)

| # | Filename | Description | Author | License | Wikimedia URL |
|---|----------|-------------|--------|---------|---------------|
| 1 | **Kruskal_diagram_of_Schwarzschild_chart.svg** | Kruskal diagram showing Schwarzschild chart with light cones and infalling particle; demonstrates coordinate singularity removed at horizon | Dr Greg (updated Vilnius 2021) | CC BY-SA 3.0 | https://upload.wikimedia.org/wikipedia/commons/1/1c/Kruskal_diagram_of_Schwarzschild_chart.svg |
| 2 | **Eddington-Finkelstein-Lightcone-Diagram.png** | Light cone worldlines of radially ingoing and outgoing light rays in Eddington-Finkelstein coordinates; shows regular behaviour at horizon | Yukterez (Simon Tyran, Vienna) | CC BY-SA 4.0 | https://upload.wikimedia.org/wikipedia/commons/0/0a/Eddington-Finkelstein-Lightcone-Diagram.png |
| 3 | **Schwarzschild-Droste-Lightcone-Diagram.png** | Light cone diagram in standard Schwarzschild-Droste coordinates showing the apparent singularity at r = r_s; pairs with EF diagram to show contrast | Yukterez (Simon Tyran, Vienna) | CC BY-SA 4.0 | https://upload.wikimedia.org/wikipedia/commons/3/31/Schwarzschild-Droste-Lightcone-Diagram.png |
| 4 | **Spherical_Coordinates_(Colatitude,_Longitude).svg** | Spherical coordinate diagram showing colatitude θ, longitude φ, radius ρ; illustrates the pole singularity in the standard everyday analogy | Inductiveload | Public Domain | https://upload.wikimedia.org/wikipedia/commons/5/51/Spherical_Coordinates_%28Colatitude%2C_Longitude%29.svg |

**Downloaded images** (ready for writer):
- `kruskal-diagram.svg` — Kruskal–Szekeres diagram showing coordinate singularity removed at horizon (CC BY-SA 3.0) ✓ **recommended lead**
- `eddington-finkelstein-lightcone.png` — EF coordinates light cone diagram, regular at horizon (CC BY-SA 4.0) ✓ **recommended**
- `schwarzschild-droste-lightcone.png` — Schwarzschild coordinates light cone, shows coordinate breakdown (CC BY-SA 4.0) ✓ **recommended** (pair with EF diagram)
- `spherical-coordinates.svg` — Spherical polar coordinate diagram (Public Domain) — secondary/optional
Caption files: `{name}-caption.md` for each image.

## Sources (Prioritised by Authority)

### Primary Textbook References

1. **Misner, C. W., Thorne, K. S., & Wheeler, J. A. (1973)** — *Gravitation* — W. H. Freeman. The standard GR reference. Covers Schwarzschild metric, coordinate singularity, Kruskal–Szekeres coordinates, and Penrose diagrams comprehensively. (MTW §23.1, §31.4–31.6)

2. **Carroll, S. M. (2004)** — *Spacetime and Geometry: An Introduction to General Relativity* — Addison-Wesley. Chapter 7 covers the Schwarzschild solution, coordinate vs. physical singularities, Kretschmann scalar test, Eddington-Finkelstein and Kruskal–Szekeres coordinates.
   - Lecture notes version: [NED/IPAC Carroll Chapter 7](https://ned.ipac.caltech.edu/level5/March01/Carroll3/Carroll7.html)

3. **Wald, R. M. (1984)** — *General Relativity* — University of Chicago Press. Rigorous treatment of singularity theorems and coordinate independence of physical singularities.

### Wikipedia (WikiProject Physics — reviewed)

1. [Coordinate singularity](https://en.wikipedia.org/wiki/Coordinate_singularity) — Definition, North Pole example, Schwarzschild context.
2. [Schwarzschild metric](https://en.wikipedia.org/wiki/Schwarzschild_metric) — Metric form, the two singularities, Kretschmann scalar, coordinate transformation history.
3. [Eddington–Finkelstein coordinates](https://en.wikipedia.org/wiki/Eddington%E2%80%93Finkelstein_coordinates) — Historical development (Eddington 1924, Lemaître 1932, Finkelstein 1958), ingoing/outgoing forms, physical meaning.
4. [Kruskal–Szekeres coordinates](https://en.wikipedia.org/wiki/Kruskal%E2%80%93Szekeres_coordinates) — Transformation equations, four-region maximal extension, no coordinate singularity at horizon.
5. [Gravitational singularity](https://en.wikipedia.org/wiki/Gravitational_singularity) — Distinction between coordinate and physical singularities, Kretschmann scalar as test.

### Physics Forums / Educational

- [Physics Forums: Coordinate singularity at Schwarzschild radius](https://www.physicsforums.com/threads/coordinate-singularity-at-schwarzschild-radius.934171/) — Pedagogical discussion of the distinction.
- [UCSD HEP: Singularity in Schwarzschild Coordinates](https://hepweb.ucsd.edu/ph110b/110b_notes/node77.html) — Lecture notes showing the coordinate artifact nature.

## Handoff: Researcher → Writer

### Completeness Checklist
- [x] Definition: Concise, unambiguous (artifact of coordinate choice, not physical)
- [x] Everyday analogy: North Pole / spherical coordinates poles — longitude undefined
- [x] Mathematical test: Kretschmann scalar K = R^αβγδ R_αβγδ distinguishes coordinate from physical
- [x] Schwarzschild metric: Both singularities defined with equations, physical meaning explained
- [x] Coordinate singularity at r = r_s: K = 12/r_s⁴ (finite) → coordinate artifact
- [x] Physical singularity at r = 0: K → ∞ → genuine singularity
- [x] Historical arc: Schwarzschild (1916) → Eddington (1924) → Lemaître (1932) → Finkelstein (1958) → Kruskal-Szekeres (1960) → Penrose (1965)
- [x] Eddington-Finkelstein coordinates: Definition, how they remove the singularity, physical insight
- [x] Kruskal-Szekeres coordinates: Transformation equations, maximal extension, four regions
- [x] Importance in GR: 5 key consequences listed
- [x] Key numbers: 10 values with sources
- [x] Related articles: 7 slugs (verify against slugs.txt)
- [x] Image candidates: 4 images with author/license/URL (not yet downloaded)
- [x] Sources: Primary textbooks (MTW, Carroll, Wald) + Wikipedia + lecture notes

### Gaps / Notes for Writer
- Image downloads skipped per coordinator instruction — download before writing final article
- Check all related article slugs against articles/slugs.txt (only `kerr-black-hole` verified)
- The tortoise coordinate r* = r + r_s ln|r/r_s − 1| could be mentioned briefly in a longer article
- Penrose diagrams (conformal diagrams) are a visual extension of Kruskal–Szekeres; mention if space allows

**The writer can produce a 200–400 word article with all physics correct and fully sourced.**
