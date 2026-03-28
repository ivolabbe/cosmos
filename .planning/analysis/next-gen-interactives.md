# Next-Generation Interactive Apps for COSMOS

*Strategic analysis of the highest-impact interactive apps to build after the current 21 are complete.*

*2026-03-29 — SAO Analyst*

---

## Executive Summary

COSMOS has 15 production apps and 6 in development, all Three.js physics simulations or planet globes. This analysis identifies **22 concrete new interactive apps** that diversify beyond physics simulations into D3.js data explorers, animated visual explainers, calculators, and catalog browsers. These fill the largest remaining gaps in the competitive landscape and cover the most-searched astronomy education topics that COSMOS articles address but currently illustrate only with static images or text.

The highest-impact additions are:

1. A **D3.js knowledge graph explorer** of the 643-article cross-link network (no competitor has this)
2. A **spectroscopy visual explainer** (the #1 most-taught, least-well-visualised topic in intro astronomy)
3. An **exoplanet catalog explorer** using real NASA data (massive student demand, no good free interactive)
4. A **cosmic distance ladder step-through** (conceptually difficult topic that benefits enormously from interactivity)
5. A **Drake equation calculator** (universally engaging, trivial to build, shareable)

The recommendations deliberately balance high-effort Three.js builds with quick-win D3.js and calculator apps. The 22 apps span an estimated 6 Simple, 10 Medium, and 6 Hard builds.

---

## What We Have vs. What Students Search For

### Coverage by topic area (built + in-progress)

| Topic area | Built? | Student demand | Gap |
|-----------|--------|---------------|-----|
| Solar system (planets, asteroids, satellites, Sun) | 11 apps | High | Covered well |
| Compact objects (pulsars, binary stars, black holes) | 3 built + 1 in progress | Very high | BH in progress |
| Galaxy dynamics (rotation curve, density wave) | 1 built + 1 in progress | Medium-high | Good |
| Gravitational waves | 1 built | High (post-LIGO) | Covered |
| Stellar physics (HR diagram, Roche lobe) | 2 in progress | Very high | In progress |
| Cosmology (CMB, large-scale structure) | 2 in progress | High | In progress |
| **Spectroscopy / EM spectrum** | **None** | **Very high** | **Critical gap** |
| **Exoplanets / habitability** | **None** | **Very high** | **Critical gap** |
| **Distance measurement** | **None** | **High** | **Major gap** |
| **Galaxy classification** | **None** | **High** | **Major gap** |
| **Calculators / converters** | **None** | **Medium-high** | **Entire category missing** |
| **Data exploration (catalogs, surveys)** | **None** | **High** | **Entire category missing** |
| **Stellar nucleosynthesis / elements** | **None** | **Medium** | **Gap** |
| **Timelines / history of astronomy** | **None** | **Medium** | **Gap** |
| **Observational tools (sky maps, telescopes)** | **None** | **Medium** | **Gap** |
| **Knowledge graph / site navigation** | **None** | **High** | **Unique opportunity** |

---

## The 22 Recommended Apps

### Scoring methodology

Each app is scored on four dimensions (1-5 scale):

- **Student demand** — how often do students search for this topic?
- **Educational impact** — how much does interactivity improve understanding vs. static text?
- **Competitive gap** — is there already a good free interactive version elsewhere?
- **Effort** — how hard is it to build? (inverted: 5 = simple, 1 = very hard)

**Score = demand x impact x gap x effort** (max 625). Higher is better. Apps are ranked by this score.

---

### Tier 1: Highest Priority (score >= 200)

---

#### 1. Knowledge Graph Explorer

| | |
|---|---|
| **Type** | D3.js force-directed network graph |
| **Score** | 4 x 5 x 5 x 4 = **400** |
| **Embed in** | Standalone page (`explore.html`), linked from site header/nav |
| **Effort** | Medium |

**What it does.** A full-screen interactive D3.js force-directed graph of all 643 COSMOS articles. Each node is an article; edges are cross-links (the existing `lexicon-term` links). Users click a node to expand its neighbourhood, see clusters of related topics, filter by letter or topic domain, and click through to read any article. Zoom, pan, drag. Colour-code nodes by domain (solar system, stellar physics, cosmology, instrumentation, etc.).

**Why it matters.** This is the single highest-impact non-content feature because (a) the data already exist in the cross-link structure, (b) no astronomy site offers anything like it (HyperPhysics had crude 1998 bubble maps, now barely functional), (c) it transforms COSMOS from a flat alphabetical list into a navigable knowledge landscape, and (d) it directly serves the "how is X connected to Y?" question that students constantly ask.

**What exists.** HyperPhysics concept maps (1998 design, static, no zoom, visually outdated). Wikipedia has Wikidata but no visual explorer for astronomy specifically. No astronomy encyclopedia offers a D3 knowledge graph.

**Unique value.** First interactive knowledge graph of an astronomy encyclopedia. Makes the 643-article corpus feel like a connected universe rather than a dictionary.

---

#### 2. Spectroscopy Visual Explainer

| | |
|---|---|
| **Type** | D3.js + Canvas animated diagram |
| **Score** | 5 x 5 x 4 x 4 = **400** |
| **Embed in** | `spectroscopy.html`, `absorption-line.html`, `emission-line.html`, `spectral-line.html`, `spectral-classification.html`, `balmer-series.html` |
| **Effort** | Medium |

**What it does.** An interactive spectroscopy workbench. A light source (star, gas cloud, or lamp) passes through a prism/grating. The user sees: (1) the full continuous spectrum, (2) absorption lines when cool gas sits between source and observer, (3) emission lines when viewing a hot gas cloud directly. Kirchhoff's three laws illustrated by toggling source/absorber/observer geometry. Click any spectral line to identify the element. Slide temperature to see Wien's law shift the peak. Toggle between hydrogen Balmer series, helium, calcium, sodium, iron lines. Spectral classification mode: show O-B-A-F-G-K-M sequence with line strengths changing.

**Why it matters.** Spectroscopy is the #1 tool of observational astronomy and the single most-taught topic in intro astro courses. It is inherently visual (spectra are colour!) but almost never interactively taught. Students struggle with the abstract leap from "absorption line" to "element identification." An interactive where they see lines appear/disappear as they change conditions would be transformative.

**What exists.** PhET has no spectroscopy sim. NAAP (Nebraska) has a dated Java applet. Some YouTube animations exist. No modern, web-based, free interactive spectroscopy workbench exists.

**Unique value.** The definitive web spectroscopy interactive, directly linked to COSMOS's 6+ spectroscopy articles. Real element line wavelengths from NIST. Kirchhoff's laws made visual.

---

#### 3. Exoplanet Catalog Explorer

| | |
|---|---|
| **Type** | D3.js scatter plot / data explorer |
| **Score** | 5 x 4 x 5 x 4 = **400** |
| **Embed in** | `planet.html`, `radial-velocity.html`, `doppler-shift.html`, `orbit.html` |
| **Effort** | Medium |

**What it does.** An interactive D3.js scatter plot of all ~5,700 confirmed exoplanets from the NASA Exoplanet Archive. Default view: mass vs. orbital period (the classic exoplanet parameter space). Toggle axes to: radius vs. equilibrium temperature, semi-major axis vs. eccentricity, discovery year vs. count (histogram), detection method breakdown (pie/bar). Hover any planet for name, host star, discovery method, year. Colour-code by detection method (transit, RV, imaging, microlensing). Filter by method, discovery year range, stellar type. Highlight Solar System planets for comparison. Click to link to NASA Exoplanet Archive entry.

**Data source.** NASA Exoplanet Archive TAP service or a pre-fetched JSON snapshot (updated periodically via GitHub Actions).

**Why it matters.** Exoplanets are the hottest topic in astronomy education. Student demand is enormous. The NASA Exoplanet Archive is powerful but intimidating for students. An accessible, visual explorer that lets students discover patterns (hot Jupiters, super-Earths, the transit detection bias) would be enormously valuable.

**What exists.** NASA Exoplanet Archive has a table and basic plotting. Some research groups have made scatter plots. No free, interactive, educational exoplanet explorer with COSMOS-quality design exists.

**Note:** COSMOS does not currently have an "exoplanet" article (the slug does not exist). This app would embed in `planet.html` and `radial-velocity.html` which do exist. Consider creating an exoplanet article as a companion.

**Unique value.** Beautiful D3 interface, educational annotations explaining what each cluster of points means, direct links to COSMOS articles on detection methods.

---

#### 4. Cosmic Distance Ladder

| | |
|---|---|
| **Type** | D3.js animated step-through diagram |
| **Score** | 4 x 5 x 5 x 3 = **300** |
| **Embed in** | `distance.html`, `trigonometric-parallax.html`, `cepheid-variable-stars.html`, `type-ia-supernova.html`, `standard-candle.html`, `distance-modulus.html`, `hubble-law.html`, `redshift.html` |
| **Effort** | Medium-Hard |

**What it does.** A vertical "ladder" diagram where each rung is an interactive distance measurement technique. Start at the bottom: (1) radar ranging (Solar System), (2) parallax (click to see Earth's orbit baseline, drag star to see parallax angle shrink with distance), (3) main-sequence fitting, (4) Cepheid period-luminosity relation (animated light curve, adjust period, see luminosity change), (5) Type Ia supernovae (standardisable candle concept), (6) Hubble's Law (redshift-distance plot). Each rung shows its range in parsecs and which objects it can reach. Overlap zones highlighted. Click any rung to expand a mini-interactive showing how that method works.

**Why it matters.** "How do we know how far away things are?" is one of the most common questions in astronomy education, and one of the hardest to answer well. The distance ladder is inherently sequential and cumulative, making it perfect for an interactive step-through. It ties together 8+ COSMOS articles into one coherent narrative.

**What exists.** Some static diagrams. A few YouTube explainers. No interactive step-through exists on the web.

**Unique value.** The only interactive distance ladder on the web. Each rung links to the corresponding COSMOS article. Students can see exactly how one method calibrates the next.

---

#### 5. Drake Equation Explorer

| | |
|---|---|
| **Type** | Calculator / slider tool |
| **Score** | 5 x 3 x 5 x 5 = **375** |
| **Embed in** | `seti.html` |
| **Effort** | Simple |

**What it does.** Seven sliders, one per Drake equation parameter (R*, fp, ne, fl, fi, fc, L). Each slider shows its name, description, and plausible range with annotations (e.g., "Drake's 1961 estimate: ...", "Modern estimate: ..."). As users adjust sliders, the running product N updates in real-time. Preset buttons for "Drake 1961", "Optimistic modern", "Pessimistic modern". A bar chart showing which parameter dominates the uncertainty. Optional: Monte Carlo mode that samples from distributions and shows a histogram of N.

**Why it matters.** The Drake equation is one of the most engaging topics in all of astronomy. Every intro astro course covers it. It is perfectly suited to a slider-based calculator, and the subjective nature of the parameters makes it inherently interactive (students argue about their choices). It generates shareable results ("My Drake equation gives N = ...").

**What exists.** Several basic Drake equation calculators exist (BBC, Omni Calculator, various hobby sites), but none are visually polished, none show parameter uncertainty, and none are embedded in an encyclopedia article with authoritative context.

**Unique value.** Embedded in COSMOS's SETI article with astronomer-written context. Shows uncertainty ranges. Beautiful design matching COSMOS house style.

---

#### 6. Electromagnetic Spectrum Explorer

| | |
|---|---|
| **Type** | D3.js / Canvas animated diagram |
| **Score** | 5 x 4 x 4 x 4 = **320** |
| **Embed in** | `electromagnetic-spectrum.html`, `electromagnetic-radiation.html`, `infrared.html`, `ultraviolet.html`, `x-rays.html`, `radio-astronomy.html` |
| **Effort** | Medium |

**What it does.** A horizontal spectrum strip from radio to gamma. Drag a slider or click anywhere to select a wavelength. At each position, show: (1) wavelength/frequency/energy with unit conversions, (2) what astronomical objects/phenomena emit at this wavelength, (3) which telescopes/missions observe this band (with images: ALMA, Hubble, Chandra, JWST, etc.), (4) atmospheric opacity (can ground-based telescopes see this?), (5) a real astronomical image taken at this wavelength. Toggle between wavelength, frequency, and energy axes. Zoom into specific bands (e.g., visible light showing Fraunhofer lines).

**Why it matters.** Multi-wavelength astronomy is a core concept that students find abstract until they see it visually. Connecting wavelengths to actual telescopes and images makes the abstract concrete.

**What exists.** NASA has some EM spectrum pages with static images. Chrome Experiments had a music-focused EM spectrum tool. No astronomy-focused interactive EM explorer with real telescope data exists.

**Unique value.** Astronomy-specific: every wavelength linked to the COSMOS articles on that band, plus real telescope images. Atmospheric opacity overlay is unique.

---

#### 7. Galaxy Classification (Hubble Tuning Fork)

| | |
|---|---|
| **Type** | D3.js interactive diagram + image gallery |
| **Score** | 4 x 4 x 5 x 4 = **320** |
| **Embed in** | `hubble-classification.html`, `galaxy-morphology.html`, `galaxy-types.html`, `elliptical-galaxy.html`, `spiral-galaxy.html`, `lenticular-galaxy.html`, `irregular-galaxy.html` |
| **Effort** | Medium |

**What it does.** An interactive Hubble tuning fork diagram. The classic Y-shaped layout with ellipticals on the left (E0-E7), lenticulars at the fork (S0), normal spirals on one branch (Sa-Sb-Sc-Sd), barred spirals on the other (SBa-SBb-SBc-SBd), and irregulars off to the side. Click any morphological type to: (1) see 3-5 real galaxy images of that type (from SDSS or Hubble), (2) read a summary of that type's properties (colour, gas fraction, star formation rate, typical environment), (3) link to the corresponding COSMOS article. Optional "classify this galaxy" mode: show a random galaxy image, user guesses the type, gets feedback.

**Why it matters.** Galaxy classification is taught in every intro astro course and is inherently visual. The tuning fork is one of the most iconic diagrams in astronomy but is usually presented as a static image. Making it clickable with real images transforms it from memorisation to exploration.

**What exists.** Galaxy Zoo is the gold standard for citizen-science classification but is a research project, not an educational tool. No interactive tuning fork diagram exists.

**Unique value.** Interactive tuning fork with real images, linked to COSMOS's 7+ galaxy classification articles. Optional "quiz mode" for self-testing.

---

#### 8. Redshift-Distance-Age Calculator

| | |
|---|---|
| **Type** | Calculator with D3.js plot |
| **Score** | 4 x 4 x 4 x 5 = **320** |
| **Embed in** | `redshift.html`, `cosmological-redshift.html`, `hubble-law.html`, `lookback-time.html`, `comoving-distance.html`, `hubble-distance.html` |
| **Effort** | Simple |

**What it does.** Enter any one of: redshift (z), comoving distance, luminosity distance, lookback time, or age of the universe at that epoch. The calculator computes all the others using the concordance cosmology (H_0 = 67.4, Omega_m = 0.315, Omega_Lambda = 0.685). Displays results in a clean table. A D3 line plot shows the relationship between z and each distance measure, with the user's chosen point highlighted. Toggle cosmological parameters with sliders to see how distances change. Presets for famous objects (CMB at z=1089, most distant galaxy, most distant quasar, Andromeda).

**Why it matters.** Cosmological distance calculations are confusing even for graduate students. A tool that instantly converts between redshift, distance, and lookback time is immensely practical. Every observational astronomer uses Ned Wright's cosmology calculator; students need a friendlier version.

**What exists.** Ned Wright's Cosmology Calculator (functional but 1990s design, no plots). Astropy has `cosmology` module but requires Python. No visually modern, plot-equipped, educational cosmology calculator exists.

**Unique value.** Beautiful design, embedded in 6 COSMOS articles, instant visual feedback via D3 plot, adjustable cosmological parameters.

---

### Tier 2: High Priority (score 150-200)

---

#### 9. Magnitude Calculator

| | |
|---|---|
| **Type** | Calculator |
| **Score** | 4 x 3 x 4 x 5 = **240** |
| **Embed in** | `apparent-magnitude.html`, `absolute-magnitude.html`, `distance-modulus.html`, `bolometric-magnitude.html`, `luminosity.html` |
| **Effort** | Simple |

**What it does.** Three-way calculator: enter any two of apparent magnitude (m), absolute magnitude (M), and distance (d in parsec or Mpc), and it computes the third via the distance modulus formula m - M = 5 log10(d/10). Shows the calculation step by step. Presets for familiar objects (Sun, Sirius, Andromeda, most distant SN). Visual scale showing where common objects fall on the magnitude scale. Extension: bolometric correction, flux conversion.

**Why it matters.** Magnitude calculations are taught in every intro astro course and are a common source of confusion (the logarithmic, inverted scale is unintuitive). Having an instant calculator with visual context helps enormously.

**What exists.** Some basic magnitude calculators on astro education sites, but none with visual magnitude scales or step-by-step explanations.

**Unique value.** Embedded in 5 COSMOS articles, step-by-step solution display, visual magnitude scale with familiar objects.

---

#### 10. Solar System Orrery

| | |
|---|---|
| **Type** | Three.js / D3.js orbital animation |
| **Score** | 5 x 3 x 3 x 4 = **180** |
| **Embed in** | `planet.html`, `orbit.html`, `orbital-elements.html`, `astronomical-unit.html` |
| **Effort** | Medium |

**What it does.** A top-down animated orrery showing all 8 planets orbiting the Sun. Two modes: (1) scaled distances (inner planets visible, outer planets off-screen — demonstrates the vastness), (2) compressed distances (all planets visible, logarithmic scaling). Orbital periods are accurate relative to each other. Click any planet to see its orbital elements and link to its COSMOS article. Time controls: pause, speed up (1 day/sec to 1 year/sec), set date. Show current real planet positions. Toggle: show orbital eccentricity (ellipses vs. circles), show asteroid belt, show dwarf planets.

**Why it matters.** A solar system orrery is one of the most requested astronomy visualizations. Our 8 individual planet globes are excellent but isolated; an orrery connects them into a system. The scaled vs. compressed toggle teaches the crucial lesson that the solar system is mostly empty space.

**What exists.** NASA Eyes on the Solar System (excellent but heavyweight, requires WebGL2, not embeddable). Several simple orreries exist (e.g., solarsystemscope.com) but lack educational annotations.

**Unique value.** Integrated with 8 existing planet articles. Scaled/compressed toggle. Astronomical unit scale bar. Embedded in COSMOS rather than a standalone site.

---

#### 11. Stellar Lifetime Calculator

| | |
|---|---|
| **Type** | Calculator with D3.js plot |
| **Score** | 3 x 4 x 5 x 5 = **300** |
| **Embed in** | `main-sequence-lifetime.html`, `stellar-evolution.html`, `hertzsprung-russell-diagram.html`, `zero-age-main-sequence.html` |
| **Effort** | Simple |

**What it does.** Enter a star's mass (in solar masses). The calculator returns: main-sequence lifetime (using t ~ t_sun * (M/M_sun)^(-2.5)), approximate spectral type, surface temperature, luminosity (mass-luminosity relation), and ultimate fate (white dwarf, neutron star, or black hole). A D3 plot shows the mass-lifetime relation with the user's star highlighted. Presets for the Sun, Sirius, Betelgeuse, Proxima Centauri. A "fate diagram" shows which mass ranges end in which remnant.

**Why it matters.** The relationship between mass and stellar lifetime is a cornerstone of stellar astrophysics. Students are always surprised that massive stars live shorter lives. A calculator that makes this visceral (type "60 solar masses" and see "3 million years") is pedagogically powerful.

**What exists.** No dedicated stellar lifetime calculator exists as a web tool. Some textbook appendices have tables.

**Unique value.** Only web-based stellar lifetime calculator. Linked to 4 COSMOS articles. Visual fate diagram.

---

#### 12. Blackbody Radiation / Wien's Law Explorer

| | |
|---|---|
| **Type** | D3.js interactive plot |
| **Score** | 4 x 4 x 4 x 4 = **256** |
| **Embed in** | `blackbody-radiation.html`, `thermal-radiation.html`, `effective-temperature.html`, `spectral-type.html` |
| **Effort** | Medium |

**What it does.** A D3 plot of the Planck function B(lambda, T). A temperature slider (or text input) adjusts T from 1,000 K to 50,000 K. The curve reshapes in real-time. Wien's displacement law peak is marked and tracked. Stefan-Boltzmann total flux (area under curve) updates numerically. Overlay mode: plot multiple temperatures simultaneously (e.g., 3000K red dwarf, 5800K Sun, 10000K Sirius, 30000K O-star). Colour the curve area by visible colour at each wavelength. Show the visible band highlighted. Link temperature to spectral type (O through M).

**Why it matters.** Blackbody radiation is foundational to understanding stellar classification, the CMB, and thermal emission throughout astrophysics. The Planck function is elegant but abstract until students see the curve shift with temperature.

**What exists.** PhET has a basic blackbody sim. Some educational sites have static plots. No polished, astronomy-focused interactive Planck curve with spectral type overlays exists.

**Unique value.** Astronomy-specific: ties to COSMOS spectral classification articles. Multi-star overlay mode. Visible colour rendering.

---

#### 13. Variable Star Light Curve Explorer

| | |
|---|---|
| **Type** | D3.js data explorer |
| **Score** | 3 x 4 x 5 x 4 = **240** |
| **Embed in** | `variable-stars.html`, `cepheid-variable-stars.html`, `rr-lyrae.html`, `instability-strip.html` |
| **Effort** | Medium |

**What it does.** Display real light curves of famous variable stars from the AAVSO International Database or pre-processed data. Categories: (1) Cepheids (delta Cephei, Polaris) showing the period-luminosity relation, (2) RR Lyrae (shorter period, lower luminosity), (3) eclipsing binaries (Algol), (4) Mira variables (long-period, large amplitude), (5) cataclysmic variables (dwarf novae). User selects a star, sees the phased light curve. Overlay the period-luminosity relation for Cepheids (this directly connects to the distance ladder). Interactive period-folding tool: give students raw data and let them find the period.

**Why it matters.** Variable stars are fundamental to distance measurement and stellar physics. Real data are far more compelling than schematic diagrams. Period-folding is a skill every observational astronomer learns, and making it interactive teaches the concept far better than a textbook.

**What exists.** AAVSO has data but no educational interactive explorer. Some university lab exercises use variable star data but are not publicly accessible.

**Unique value.** Real data from real stars. Period-folding tool. Direct link to distance ladder (Cepheid P-L relation). Embedded in 4 COSMOS articles.

---

#### 14. Doppler Shift Interactive

| | |
|---|---|
| **Type** | Canvas/D3.js animated diagram |
| **Score** | 4 x 4 x 4 x 4 = **256** |
| **Embed in** | `doppler-shift.html`, `radial-velocity.html`, `redshift.html`, `spectral-line.html` |
| **Effort** | Medium |

**What it does.** A source emits waves (circles expanding from a point). The user drags the source to move it, and sees wavefronts compress ahead (blueshift) and stretch behind (redshift). A spectrum bar at the top shifts colour in real-time. Modes: (1) sound analogy (ambulance siren), (2) light from a star — spectrum shifts, absorption lines move, (3) cosmological redshift (space itself stretching, wavelengths stretch with it — distinct from kinematic Doppler). Show the Doppler formula and compute v from the observed shift. Link to radial velocity method for exoplanet detection.

**Why it matters.** The Doppler effect is one of the most important concepts in astronomy but is widely misunderstood (students confuse kinematic Doppler with cosmological redshift). An interactive that shows both — and visually distinguishes them — addresses a persistent pedagogical challenge.

**What exists.** PhET has a sound wave interference sim but not an astronomy-specific Doppler shift tool. Some YouTube animations. COSMOS already has a video on the article page but not an interactive.

**Unique value.** Distinguishes kinematic vs. cosmological redshift visually. Spectrum display with real absorption lines. Links to exoplanet detection.

---

### Tier 3: Medium Priority (score 100-150)

---

#### 15. Telescope Comparison Tool

| | |
|---|---|
| **Type** | D3.js comparison chart + image gallery |
| **Score** | 3 x 3 x 5 x 4 = **180** |
| **Embed in** | `telescope.html`, `aperture.html`, `resolution.html`, `rayleigh-criterion.html` |
| **Effort** | Medium |

**What it does.** A visual comparison of major telescopes past, present, and future. Each telescope shown as a circle scaled to its primary mirror diameter. Arranged on axes of: aperture vs. wavelength band, or aperture vs. year of first light. Click any telescope for: specifications, location, key discoveries, an image, and link to relevant COSMOS articles. Filter by wavelength band (optical, radio, infrared, X-ray, gamma). Show: angular resolution calculation (Rayleigh criterion) for the selected aperture and wavelength. "What can this telescope resolve?" examples at each scale.

**Why it matters.** Students often struggle with the practical meaning of aperture and resolution. Seeing telescopes at relative scale — and computing what they can resolve — makes these concepts concrete.

**What exists.** Wikipedia has lists and tables. Some infographics exist. No interactive comparison tool with resolution calculations.

**Unique value.** Visual scale comparison, resolution calculator, wavelength filtering, linked to COSMOS optics articles.

---

#### 16. Periodic Table of Cosmic Origins

| | |
|---|---|
| **Type** | D3.js interactive periodic table |
| **Score** | 3 x 4 x 5 x 3 = **180** |
| **Embed in** | `element.html`, `chemical-composition.html`, `chemical-evolution.html`, `abundance-ratio.html`, `triple-alpha-process.html`, `cno-cycle.html` |
| **Effort** | Medium |

**What it does.** An interactive periodic table where each element is colour-coded by its primary nucleosynthetic origin: Big Bang (H, He, some Li), stellar fusion (C, N, O through Fe), neutron capture s-process (Sr, Ba, Pb), neutron capture r-process (Eu, Pt, Au, U), cosmic ray spallation (Li, Be, B), or human-made (Tc, most transuranic). Click any element to see: which astrophysical process made it, at what stage of stellar evolution, in what type of star, and the cosmic abundance. Toggle between colour-by-origin and colour-by-abundance (solar abundance pattern). Overlay: the "onion shell" model of a massive star showing which layers produce which elements.

**Why it matters.** "We are made of star stuff" is one of the most powerful ideas in astronomy, but students rarely see the details. Where does gold come from? (Neutron star mergers.) Where does carbon come from? (Triple-alpha process in red giants.) This table makes cosmic nucleosynthesis tangible.

**What exists.** Jennifer Johnson's famous "Periodic Table of Element Origins" infographic (static image, widely shared). No interactive version with click-through detail exists.

**Unique value.** Interactive version of the most-shared astronomy infographic on the internet. Click-through detail. Linked to 6 COSMOS articles on nucleosynthesis and chemical evolution. Stellar cross-section overlay.

---

#### 17. Gravitational Redshift Interactive

| | |
|---|---|
| **Type** | Canvas/Three.js animated diagram |
| **Score** | 3 x 4 x 4 x 4 = **192** |
| **Embed in** | `gravitational-redshift.html`, `event-horizon.html`, `schwarzschild-radius.html` |
| **Effort** | Medium |

**What it does.** A photon climbs out of a gravitational potential well. Its wavelength stretches (shifts red) as it gains altitude. Sliders for: mass of the central object (Earth, white dwarf, neutron star, near black hole), emission height. Shows the wavelength/colour shift in real-time. At the event horizon limit, the photon redshifts to infinity (visual freeze). Compare with the Doppler shift side-by-side to show they are distinct effects. Display the gravitational redshift formula.

**Why it matters.** Gravitational redshift is predicted by general relativity and confirmed observationally (Pound-Rebka, GPS corrections). It is conceptually distinct from Doppler shift but students frequently conflate them. A visual interactive clarifies the distinction.

**What exists.** Already listed as an honourable mention in INTERACTIVE-DEMOS.md. No good web interactive exists for this.

**Unique value.** Side-by-side comparison with Doppler shift. Extreme gravity regime (near black holes). Linked to COSMOS GR articles.

---

#### 18. Moon Phases Interactive

| | |
|---|---|
| **Type** | Three.js / Canvas animated diagram |
| **Score** | 5 x 3 x 3 x 4 = **180** |
| **Embed in** | `phases.html`, `moon.html`, `ecliptic.html` |
| **Effort** | Medium |

**What it does.** A top-down view of the Sun-Earth-Moon system. The Moon orbits Earth. A second panel shows what the Moon looks like from Earth at each orbital position. Drag the Moon around its orbit (or use a day slider) to see: (1) the phase name (new, waxing crescent, first quarter, etc.), (2) the illumination fraction, (3) rise/set times, (4) position in the sky at different times of day. Optional: show ecliptic tilt to explain why eclipses don't happen every month. Toggle to show the current real Moon phase.

**Why it matters.** Moon phases are universally taught (K-12 through university) and universally confusing. The "why does the Moon have phases?" question is one of the most common in astronomy education. The top-down-to-observer-view duality is the key pedagogical insight that an interactive delivers far better than any static diagram.

**What exists.** Several Moon phase tools exist (timeanddate.com, USNO), but they show the phase, not the geometry that causes it. NAAP has a dated Java applet. No modern web interactive shows the top-down geometry linked to the observer's view.

**Unique value.** Dual-panel geometry + observer view. Day slider shows rise/set times. Current real phase. Embedded in COSMOS articles with astronomer-written context.

---

#### 19. Quasar / AGN Unified Model

| | |
|---|---|
| **Type** | Three.js interactive 3D model |
| **Score** | 3 x 4 x 5 x 3 = **180** |
| **Embed in** | `quasar.html`, `active-galactic-nuclei.html`, `supermassive-black-hole.html`, `galactic-jets.html` |
| **Effort** | Medium-Hard |

**What it does.** A 3D cutaway model of an AGN: central supermassive black hole, accretion disk, broad-line region, dusty torus, narrow-line region, relativistic jets. The user rotates the viewing angle. As the angle changes, the classification label updates: face-on with jets toward us = blazar, angled = Seyfert 1, edge-on (torus blocks broad lines) = Seyfert 2, high luminosity = quasar. The key insight: it is the same object viewed from different angles. Toggle components on/off. Show the spectral differences (broad vs. narrow emission lines) at each angle.

**Why it matters.** The AGN unified model is one of the most elegant ideas in extragalactic astronomy, and it is inherently 3D — understanding it requires seeing how viewing angle changes the observed properties. A static diagram cannot convey this; a rotatable 3D model can.

**What exists.** Some static diagrams in textbooks. No interactive 3D AGN model exists on the web.

**Unique value.** First interactive 3D AGN unified model. Viewing angle directly controls the classification label. Linked to 4 COSMOS articles.

---

#### 20. Cosmic Timeline / Big Bang Scrubber

| | |
|---|---|
| **Type** | D3.js interactive timeline |
| **Score** | 4 x 3 x 4 x 3 = **144** |
| **Embed in** | `big-bang.html`, `cosmic-microwave-background.html`, `epoch-of-recombination.html`, `concordance-model.html` |
| **Effort** | Medium-Hard |

**What it does.** A logarithmic timeline from the Planck epoch (10^-43 s) to the present (13.8 Gyr). Drag a scrubber or click epoch markers. At each epoch, show: time since Big Bang, temperature, density, scale factor, dominant energy component (radiation/matter/dark energy), and key events (inflation, baryogenesis, nucleosynthesis, recombination, dark ages, first stars, reionisation, galaxy formation, Solar System formation, today). Visual: the background colour/temperature shifts from white-hot to orange to red to the CMB to black as the universe cools. Zoom into any epoch for more detail.

**Why it matters.** The history of the universe is taught in every cosmology course. The logarithmic timescale is crucial (most interesting physics happened in the first second) but hard to convey with a linear diagram. An interactive timeline with zoom and temperature display makes the thermal history of the universe visceral.

**What exists.** Some static timelines. NASA has a "History of the Universe" infographic. No interactive, zoomable timeline with physics data at each epoch exists.

**Unique value.** Logarithmic zoom. Temperature and density gauges. Background colour matches temperature. Linked to COSMOS cosmology articles.

---

#### 21. Constellation Sky Map

| | |
|---|---|
| **Type** | D3.js / Canvas spherical projection |
| **Score** | 4 x 3 x 3 x 3 = **108** |
| **Embed in** | `constellation.html`, `asterism.html`, `zodiac.html`, `celestial-sphere.html`, `celestial-coordinates.html` |
| **Effort** | Medium-Hard |

**What it does.** An interactive sky map showing the 88 IAU constellations. Set location (latitude/longitude or pick a city) and date/time. The map shows the current visible sky with constellation boundaries, stick figures, and star names. Click any constellation for: mythology/history, brightest stars, deep-sky objects, and link to COSMOS articles. Toggle: constellation art overlays, ecliptic line, celestial equator, Milky Way band, altitude/azimuth grid. Demonstrate which constellations are circumpolar at the chosen latitude.

**Why it matters.** Constellation recognition is the gateway to amateur astronomy and is taught in every intro course. While Stellarium Web exists, it is a full planetarium application aimed at observers, not an educational tool embedded in an encyclopedia.

**What exists.** Stellarium Web (excellent but complex, separate site). Various star chart apps. None are embedded in an astronomy encyclopedia with educational annotations.

**Unique value.** Embedded in COSMOS with links to constellation articles. Educational focus (circumpolar demonstration, ecliptic explanation). Simpler and more focused than Stellarium.

---

#### 22. Nebula Gallery / Star Formation Sequence

| | |
|---|---|
| **Type** | D3.js image gallery + animated sequence |
| **Score** | 3 x 3 x 4 x 3 = **108** |
| **Embed in** | `nebula.html`, `emission-nebula.html`, `dark-nebula.html`, `reflection-nebula.html`, `planetary-nebulae.html`, `molecular-cloud.html`, `protostar.html`, `hii-region.html` |
| **Effort** | Medium |

**What it does.** Two modes. (1) **Nebula taxonomy**: an interactive gallery of the major nebula types (emission, reflection, dark, planetary, supernova remnant), with real Hubble/JWST images, colour-coded by type, clickable for detail and COSMOS article links. (2) **Star formation sequence**: an animated step-through from molecular cloud to protostar to T Tauri star to main sequence, with density, temperature, and size gauges updating at each stage. Each stage links to the corresponding COSMOS article.

**Why it matters.** Nebulae produce some of the most beautiful images in astronomy and are a gateway to understanding star formation and death. A taxonomy gallery connected to the formation sequence tells a complete story.

**What exists.** Many image galleries exist (Hubble, ESO) but none are taxonomic or connected to an educational sequence.

**Unique value.** Taxonomy + formation sequence in one tool. Linked to 8 COSMOS articles. Educational annotations with real images.

---

## Summary Table

| # | App | Type | Effort | Score | Key articles |
|---|-----|------|--------|-------|-------------|
| 1 | Knowledge Graph Explorer | D3.js network | Medium | 400 | All 643 (standalone) |
| 2 | Spectroscopy Workbench | D3.js/Canvas | Medium | 400 | spectroscopy, absorption-line, emission-line, spectral-classification, balmer-series |
| 3 | Exoplanet Catalog Explorer | D3.js scatter | Medium | 400 | planet, radial-velocity, doppler-shift |
| 4 | Cosmic Distance Ladder | D3.js step-through | Medium-Hard | 300 | distance, trigonometric-parallax, cepheid-variable-stars, type-ia-supernova, standard-candle, hubble-law, redshift |
| 5 | Drake Equation Explorer | Calculator | Simple | 375 | seti |
| 6 | EM Spectrum Explorer | D3.js/Canvas | Medium | 320 | electromagnetic-spectrum, electromagnetic-radiation, infrared, ultraviolet, x-rays, radio-astronomy |
| 7 | Galaxy Classification | D3.js diagram | Medium | 320 | hubble-classification, galaxy-morphology, galaxy-types, elliptical-galaxy, spiral-galaxy |
| 8 | Redshift-Distance Calculator | Calculator + D3.js | Simple | 320 | redshift, cosmological-redshift, hubble-law, lookback-time, comoving-distance |
| 9 | Magnitude Calculator | Calculator | Simple | 240 | apparent-magnitude, absolute-magnitude, distance-modulus, bolometric-magnitude |
| 10 | Solar System Orrery | Three.js/D3.js | Medium | 180 | planet, orbit, orbital-elements, astronomical-unit |
| 11 | Stellar Lifetime Calculator | Calculator + D3.js | Simple | 300 | main-sequence-lifetime, stellar-evolution, hertzsprung-russell-diagram |
| 12 | Blackbody / Wien's Law | D3.js plot | Medium | 256 | blackbody-radiation, thermal-radiation, effective-temperature, spectral-type |
| 13 | Variable Star Light Curves | D3.js data explorer | Medium | 240 | variable-stars, cepheid-variable-stars, rr-lyrae, instability-strip |
| 14 | Doppler Shift Interactive | Canvas/D3.js | Medium | 256 | doppler-shift, radial-velocity, redshift |
| 15 | Telescope Comparison Tool | D3.js chart | Medium | 180 | telescope, aperture, resolution, rayleigh-criterion |
| 16 | Periodic Table of Origins | D3.js periodic table | Medium | 180 | element, chemical-composition, chemical-evolution, triple-alpha-process, cno-cycle |
| 17 | Gravitational Redshift | Canvas/Three.js | Medium | 192 | gravitational-redshift, event-horizon, schwarzschild-radius |
| 18 | Moon Phases | Three.js/Canvas | Medium | 180 | phases, moon, ecliptic |
| 19 | AGN Unified Model | Three.js 3D | Medium-Hard | 180 | quasar, active-galactic-nuclei, supermassive-black-hole, galactic-jets |
| 20 | Cosmic Timeline | D3.js timeline | Medium-Hard | 144 | big-bang, cosmic-microwave-background, epoch-of-recombination |
| 21 | Constellation Sky Map | D3.js/Canvas | Medium-Hard | 108 | constellation, asterism, zodiac, celestial-sphere |
| 22 | Nebula Gallery + Star Formation | D3.js gallery | Medium | 108 | nebula, emission-nebula, dark-nebula, reflection-nebula, planetary-nebulae, molecular-cloud, protostar |

---

## Effort Breakdown

| Effort level | Count | Examples |
|-------------|-------|---------|
| **Simple** (1-2 days) | 4 | Drake Equation, Redshift Calculator, Magnitude Calculator, Stellar Lifetime Calculator |
| **Medium** (3-7 days) | 12 | Knowledge Graph, Spectroscopy, Exoplanet Explorer, EM Spectrum, Galaxy Classification, Blackbody, Variable Stars, Doppler, Telescope Comparison, Periodic Table, Gravitational Redshift, Nebula Gallery |
| **Medium-Hard** (1-2 weeks) | 4 | Distance Ladder, Cosmic Timeline, Constellation Sky Map, Moon Phases |
| **Hard** (2+ weeks) | 2 | AGN Unified Model, Solar System Orrery (if Three.js with real orbits) |

---

## Recommended Build Sequence

### Wave 1: Quick wins + flagship (first month)

Build the 4 Simple calculators and the Knowledge Graph simultaneously:

1. **Drake Equation Explorer** — trivially simple, universally engaging, shareable
2. **Redshift-Distance Calculator** — replaces Ned Wright's calculator with modern UI
3. **Magnitude Calculator** — every intro astro student needs this
4. **Stellar Lifetime Calculator** — elegant and surprising
5. **Knowledge Graph Explorer** — medium effort but transformative for site navigation

**Rationale:** The 4 calculators are quick wins that demonstrate a new category of interactive (not just Three.js sims). The knowledge graph is the single biggest UX improvement possible.

### Wave 2: Core visual explainers (months 2-3)

6. **Spectroscopy Workbench** — fills the biggest topic gap
7. **EM Spectrum Explorer** — natural companion to spectroscopy
8. **Blackbody / Wien's Law** — foundational physics, complements spectroscopy
9. **Galaxy Classification** — visual, popular, many linked articles
10. **Doppler Shift Interactive** — complements existing radial-velocity work

**Rationale:** These 5 apps cover the most-taught topics that currently have zero interactivity. They are all D3.js/Canvas-based, so they diversify the tech stack and are lighter than Three.js builds.

### Wave 3: Data exploration (months 3-4)

11. **Exoplanet Catalog Explorer** — massive student demand, real data
12. **Variable Star Light Curves** — real data, ties to distance ladder
13. **Cosmic Distance Ladder** — the capstone explainer, ties many articles together

**Rationale:** These apps use real astronomical data, which is a major differentiator from competitors. The distance ladder is the most ambitious of the three but has the highest educational payoff.

### Wave 4: Observational and supplementary (months 4-6)

14. **Moon Phases** — universal topic, high demand
15. **Solar System Orrery** — connects 8 existing planet apps
16. **Telescope Comparison Tool** — practical and unique
17. **Periodic Table of Origins** — visually stunning, widely shareable
18. **Gravitational Redshift** — already flagged as honourable mention

### Wave 5: Advanced and ambitious (months 6+)

19. **AGN Unified Model** — Three.js 3D build, niche but unique
20. **Cosmic Timeline** — complex but powerful
21. **Constellation Sky Map** — useful but competitors exist
22. **Nebula Gallery** — beautiful but lower educational impact than above

---

## Competitive Positioning After These 22 Apps

With the current 15 built + 6 in progress + these 22 new apps, COSMOS would have **43 interactive experiences** spanning:

- **Physics simulations** (Three.js): gravitational waves, black hole, density wave, Roche lobe, rotation curve, pulsar, binary star, AGN, gravitational redshift, moon phases
- **Planet/object globes** (Three.js): 8 planets, Sun
- **Data explorers** (D3.js): exoplanet catalog, variable star light curves, knowledge graph, satellite orbits, asteroid belt
- **Visual explainers** (D3.js/Canvas): spectroscopy, EM spectrum, blackbody, Doppler shift, galaxy classification, distance ladder, cosmic timeline, nebula gallery, telescope comparison, periodic table of origins
- **Calculators**: Drake equation, redshift-distance, magnitude, stellar lifetime
- **System views** (Three.js/D3.js): solar system orrery, constellation sky map

No competitor comes close to this breadth. Wikipedia has zero interactives. NASA Eyes covers only the solar system. PhET has physics sims but no astronomy focus. NAAP has university-level sims but dated Java applets. Stellarium covers only sky observation. COSMOS would be the only site combining encyclopedic articles with 43 interactive tools spanning the full range of astronomy topics.

---

## Key Gaps Remaining After This List

Even after these 22 apps, some notable gaps remain:

1. **No exoplanet article** — the slug does not exist in the 643. This is arguably the biggest content gap in the encyclopedia given the field's importance.
2. **No nucleosynthesis article** — triple-alpha and CNO cycle exist but no overview article.
3. **No Kepler/Kepler's Laws article** — `keplerian-disk` exists but not Kepler's Laws of planetary motion as a standalone topic.
4. **No Drake equation article** — SETI exists but Drake himself has no article.
5. **No habitable zone article** — relevant to exoplanets.
6. **No parallax overview** — only `trigonometric-parallax`.

These content gaps are worth flagging for the COSMOS content team.

---

## Data Sources for D3.js Apps

| App | Data source | Format | Update frequency |
|-----|-----------|--------|-----------------|
| Exoplanet Explorer | NASA Exoplanet Archive TAP | JSON snapshot | Monthly via GitHub Actions |
| Variable Star Light Curves | AAVSO International Database | CSV → JSON | One-time + additions |
| Knowledge Graph | COSMOS cross-link parsing | Generated graph.json | On each article update |
| Galaxy Classification | SDSS SkyServer or Hubble Legacy Archive | JPEG images | One-time |
| Telescope Comparison | Hand-curated database | JSON | As new telescopes are built |
| Periodic Table | Literature values (Kasen+ 2017, Johnson 2019) | Hardcoded JSON | Rarely changes |
| Constellation Sky Map | Yale Bright Star Catalog + IAU boundaries | JSON | Static |

---

*This analysis identifies 22 concrete interactive apps that would make COSMOS the most comprehensive interactive astronomy education resource on the web. The recommended build sequence prioritises quick wins and high-impact D3.js tools before tackling complex Three.js simulations, ensuring steady delivery of new features while the current 6 physics sim apps are completed.*
