# COSMOS Encyclopedia — Complete Topic List with Scores

Date: 2026-04-06

## Methodology

### Sources scraped
- **NED/IPAC Glossary** (ned.ipac.caltech.edu) — 4,000 terms, alphabetical A–Z
- **Britannica Astronomy** (britannica.com/browse/Astronomy) — 1,499 entries across 17 pages
- **HyperPhysics** (hyperphysics.phy-astr.gsu.edu) — 643 terms, astronomy + physics
- **Astro4Edu / IAU OAE** (astro4edu.org) — 497 glossary terms 

### Scoring
- **Popularity** (1–10): Estimated search volume. 10 = millions of searches (e.g. Sun, Moon), 1 = almost no public search interest. Scored by LLM semantic matching against 830 reference topics from topic-scores.md (derived from SEMrush volumes + Wikipedia page views).
- **Importance** (1–10): Educational value for an astronomy encyclopedia. 10 = fundamental concept every student needs, 1 = trivially unimportant. Boosted +1 for terms appearing in 3 sources, +2 for 4 sources.

### Pre-consolidation scrubbing (6,604 → 5,124 cleaned entries)
- **510 biographies removed**: Britannica biography URLs (`/biography/`) dropped unless the person appears in topic-scores.md as a famous astronomer (e.g. Galileo, Kepler, Hubble kept).
- **150 near-duplicates removed**: Case-insensitive + normalized string similarity > 0.92 (e.g. 'black hole' vs 'Black Hole', 'boson' vs 'bosons').
- **10 esoteric catalog objects removed**: Entries matching catalog patterns (NGC, IC, HD, HR, HIP, SAO, BD, PSR, PKS, 3C, Abell, UGC numbers) unless present in topic-scores.md.
- **41 irrelevant entries removed**: Entries < 2 characters, pure digits, or FAQ-style queries ('How...', 'What...', 'Define...').

### Consolidation criteria (5,124 → 1,767 pages)
Each of 5,124 entries was reviewed by an LLM editor calibrated against the existing 669 COSMOS articles and 830 topic-scores (used only as benchmarks for appropriate detail level, not for dedup/filtering), then classified as KEEP, MERGE, or DROP. Two subsequent passes applied relaxed recovery criteria and manual corrections.

**KEEP** — the keyword is a distinct topic that deserves its own encyclopedia page:
- Concept is educationally distinct (a student or professional would look it up separately)
- Famous astronomical objects (Crab Nebula, Andromeda Galaxy, Sagittarius A*)
- Categories and types of objects (T Tauri stars, Cepheid variables, Type Ia supernovae)
- **Spectral subtypes of stars**: each type (Bp, Ap, Me, Be, B[e], Carbon, Wolf-Rayet, etc.) gets its own page
- **Physics/thermodynamics laws** relevant to astrophysics (Stefan-Boltzmann, Wien, Planck, Saha, virial theorem)
- **Radiation and optics** topics (diffraction, polarization, spectroscopy, Zeeman effect, Compton scattering)
- **Detector/CCD electronics** related to astronomical cameras (readout noise, quantum efficiency, flat field)
- **Professional astronomy abbreviations** in common use (AGN, CMB, IMF, ISM, PSF, FWHM, FITS)
- **Niche astrophysics concepts** that help students understand deeper physics (Jeans mass, Strömgren sphere, Rosseland mean, optical depth, curve of growth, mass-luminosity relation)
- Telescope/instrument types (radio telescope, interferometer, spectrograph, echelle, grism)
- Constellations, named stars, dwarf planets, major moons

**MERGE** — the keyword is truly redundant with a broader page:
- True synonyms: 'Earthlight' = 'Earthshine', 'QSO' = 'Quasar'
- Duplicate casing/plurals: 'boson' and 'Boson'
- Sub-variants that add no distinct educational content: 'Black-Hole Entropy' → Black Hole
- Multiple missions to same planet: Mars Express, Mars Pathfinder → Mars (missions)
- Magnitude/phase variants of same phenomenon: 'Magnitude of Lunar Eclipse' → Lunar Eclipse
- Note: spectral subtypes are NOT merged into Spectral Classification — each type is its own page

**DROP** — clearly not relevant to an astronomy/astrophysics encyclopedia:
- Not astronomy: religious references (Star of Bethlehem), weather instruments (mercury barometer), pure chemistry, mythology without astronomical objects
- Pure particle physics internals with no astrophysical application: individual meson types, quark flavors, gauge theory, SUSY particles
- Pure lab electronics unrelated to astronomical detectors (FET, diodes, printed circuits)
- Computing terms (HTML, HTTP, GUI)
- Non-astronomer biographies, space agency administration
- Britannica FAQ/list articles ('Was the Big Bang Actually an Explosion?')
- Note: thermodynamics, radiation, optics, and detector electronics ARE kept when astronomically relevant
- Note: professional abbreviations and niche astrophysics concepts ARE kept for educational depth

### Post-processing (1,855 → 1,767 pages)
- **Slug dehyphenation**: Keywords imported as hyphenated slugs from topic-scores.md (e.g. `cosmic-microwave-background`) were replaced with proper keywords (e.g. `Cosmic microwave background`). All remaining hyphenated slugs converted to space-separated titles, preserving syntactically correct hyphens (e.g. X-ray, Stefan-Boltzmann, Hertzsprung-Russell).
- **Deduplication**: Slug/keyword pairs that produced duplicates after dehyphenation were merged (e.g. `great-attractor` + `Great Attractor` → one entry).
- **Synonym merging**: Obvious synonym groups within KEEP entries collapsed (e.g. wolf-rayet-star / wolf-rayet-wr-star / wr-or-wolf-rayet-stars → Wolf-Rayet Star; cepheid / cepheid-variable → Cepheid Variable; visual binaries / visual-binary-star → Visual Binary).
- **Manual adds**: Singularity, Astronomy, Starburst Galaxy, B Emission Line Stars, Little Red Dot, List of Galaxy Clusters, Balmer Break, Refraction, Interference, Destructive Interference, Stellar/Galaxy/Halo Mass Function.
- **Manual removes**: non-astronomy physics (Fermi-Dirac-Sommerfeld Law, Maxwell-Boltzmann Statistics, beat frequency, bicycle wheel precession), non-astronomy optics/sound (reflection/refraction/interference/resonance of sound, AM/FM Radio, Harvard Tower experiment), non-astrophysics entries (Image Intensifier, Dilute Aperture, Infrared Slavery, Lorentz-FitzGerald contraction), duplicates and low-value entries (Collapsed Star, Companion Star, 2024 YR4, JD, P-L Relation, various grating sub-entries merged into Diffraction Grating).

### COSMOS article merge (articles_orig/)
- **644 original COSMOS articles** (from articles_orig/, excluding "2.html" duplicates) cross-referenced against the consolidated glossary.
- **323 matched** to glossary entries (by slug matching with plural/singular variants).
- **329 COSMOS-only articles** added (existing encyclopedia pages not found in any external glossary source).
- COSMOS-only entries scored from topic-scores.md where available, LLM-scored otherwise.
- The `cosmos` column shows the article slug where a COSMOS page already exists.

### Manual pruning
- **36 entries removed** in final editorial review: remaining non-astronomy terms, over-specific physics entries, and low-value duplicates that survived automated processing.

### Result summary

| Metric | Count |
|--------|-------|
| Raw scraped entries (4 glossaries) | 6,604 |
| After dedup + scrub | 5,124 |
| KEEP (initial LLM pass) | 849 |
| Recovered: relaxed criteria (physics, optics, detectors, abbreviations) | +340 |
| Recovered: star/galaxy subtypes, astrophysics concepts | +340 |
| MERGE (folded into parent pages) | 1,136 |
| DROP (not relevant) | 2,273 |
| Post-processing (dedup, dehyphenation, manual edits) | −61 |
| COSMOS article merge (articles_orig/) | +329 |
| Manual pruning | −36 |
| **Final encyclopedia pages** | **2,060** |
| With existing COSMOS page | 652 |
| New topics (no page yet) | 1,408 |

## Score Distribution

Popularity: 10=4 9=101 8=91 7=140 6=189 5=340 4=489 3=483 2=190 1=33
Importance: 10=259 9=277 8=214 7=693 6=249 5=268 4=82 3=7 2=11

## All Pages (sorted by importance desc, then popularity desc)

## All Pages (sorted by importance desc, then popularity desc)

## All Pages (sorted by importance desc, then popularity desc)

| keyword | pop | imp | sources | n_src | children | cosmos | url |
|---------|-----|-----|---------|-------|----------|--------|-----|
| Andromeda Galaxy (M31) | 10 | 10 | NED | 1 |  | andromeda-galaxy | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Solar System | 10 | 10 | Astro4Edu,Britannica,NED | 3 | 1 |  | https://www.britannica.com/science/solar-system |
| Accelerating universe | 9 | 10 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/astro/univacc.html |
| B-type Star | 9 | 10 | Astro4Edu,NED | 2 |  |  | https://astro4edu.org/resources/glossary/term/37/ |
| Barium Stars | 9 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_B.html |
| Black hole | 9 | 10 | Astro4Edu,Britannica,HyperPhysics,NED | 4 | 8 | black-hole | https://www.britannica.com/science/black-hole |
| Blackbody | 9 | 10 | Astro4Edu | 1 | 9 |  | https://astro4edu.org/resources/glossary/term/44/ |
| Boson | 9 | 10 | NED | 1 | 5 |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_B.html |
| Ap and Bp stars | 9 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_B.html |
| Canals of Mars | 9 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Capture | 9 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Carbon Stars | 9 | 10 | NED | 1 | 1 |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Cephei Stars | 9 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Chromosphere | 9 | 10 | Astro4Edu,Britannica,NED | 3 | 2 | chromosphere | https://www.britannica.com/science/chromosphere |
| Cislunar | 9 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| communications satellite | 9 | 10 | Britannica | 1 |  |  | https://www.britannica.com/technology/communications-satellite |
| Coordinate Singularity | 9 | 10 | NED | 1 | 4 |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Earth | 9 | 10 | Astro4Edu,Britannica,NED | 3 | 7 |  | https://www.britannica.com/place/Earth |
| Earth impact hazard | 9 | 10 | Britannica | 1 |  |  | https://www.britannica.com/science/Earth-impact-hazard |
| Earth satellite | 9 | 10 | Britannica | 1 |  |  | https://www.britannica.com/technology/Earth-satellite |
| Earth-Crossing asteroid | 9 | 10 | Britannica | 1 |  |  | https://www.britannica.com/science/Earth-crossing-asteroid |
| earthshine | 9 | 10 | Britannica | 1 | 1 |  | https://www.britannica.com/science/earthshine |
| eclipsing variable star | 9 | 10 | Britannica | 1 |  |  | https://www.britannica.com/science/eclipsing-variable-star |
| Isobars | 9 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_I.html |
| Jet | 9 | 10 | NED | 1 | 2 | jets | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_J.html |
| Jitter | 9 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_J.html#J12 |
| Juno (spacecraft) | 9 | 10 | Britannica,NED | 2 |  |  | https://www.britannica.com/topic/Juno-spacecraft |
| Jupiter | 9 | 10 | Astro4Edu,Britannica,NED | 3 | 2 |  | https://www.britannica.com/place/Jupiter-planet |
| K capture | 9 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_K.html#K4 |
| K-type star | 9 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_K.html#K14 |
| Kerr black hole | 9 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_K.html#K24 |
| Lepus | 9 | 10 | Britannica | 1 |  |  | https://www.britannica.com/place/Lepus |
| Lunar Calendar | 9 | 10 | Astro4Edu,Britannica | 2 |  |  | https://www.britannica.com/science/lunar-calendar |
| Lunar eclipse | 9 | 10 | Astro4Edu,Britannica | 2 | 3 |  | https://www.britannica.com/science/lunar-eclipse |
| M-type Star | 9 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_M.html |
| Magnetar | 9 | 10 | NED | 1 |  | magnetar | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_M.html |
| main sequence of stars | 9 | 10 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/astro/herrus.html |
| Major Axis | 9 | 10 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/187/ |
| Mare | 9 | 10 | Astro4Edu,Britannica,NED | 3 |  |  | https://www.britannica.com/science/mare-lunar-feature |
| Mars | 9 | 10 | Astro4Edu,Britannica,NED | 3 | 12 | mars | https://www.britannica.com/place/Mars-planet |
| mascon | 9 | 10 | Britannica | 1 |  |  | https://www.britannica.com/science/mascon |
| Me Stars | 9 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_M.html |
| Mercury (planet) | 9 | 10 | Astro4Edu,Britannica,HyperPhysics | 3 | 1 | mercury | https://www.britannica.com/place/Mercury-planet |
| Metal Rich Stars | 9 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_M.html |
| Metal Poor Stars | 9 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_M.html |
| midnight Sun | 9 | 10 | Britannica | 1 | 13 |  | https://www.britannica.com/science/midnight-Sun |
| Mizar | 9 | 10 | Britannica,NED | 2 |  |  | https://www.britannica.com/place/Mizar |
| Moon | 9 | 10 | Astro4Edu,Britannica,NED | 3 | 13 | moon | https://www.britannica.com/science/moon-natural-satellite |
| multimessenger astronomy | 9 | 10 | Britannica | 1 |  |  | https://www.britannica.com/science/multimessenger-astronomy |
| N Star | 9 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_N.html |
| Names of Stars | 9 | 10 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/208/ |
| Near Earth Objects | 9 | 10 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/207/ |
| Nearby Stars | 9 | 10 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/starlog/strclos.html |
| Nebular Variable Stars | 9 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_N.html |
| New Moon | 9 | 10 | Astro4Edu | 1 |  | new-moon | https://astro4edu.org/resources/glossary/term/215/ |
| Norma | 9 | 10 | Britannica | 1 |  |  | https://www.britannica.com/place/Norma-constellation |
| North Star | 9 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_N.html |
| Nova | 9 | 10 | Astro4Edu,Britannica,NED | 3 | 6 |  | https://www.britannica.com/science/nova-astronomy |
| O-type Star | 9 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_O.html#O4 |
| Optical Astronomy | 9 | 10 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/229/ |
| P-Cygni Star | 9 | 10 | NED | 1 | 1 |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Peculiar A Star | 9 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Peculiar Stars | 9 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Pluto | 9 | 10 | Astro4Edu,Britannica,NED | 3 | 1 |  | https://www.britannica.com/place/Pluto-dwarf-planet |
| RR Lyrae Stars | 9 | 10 | NED | 1 |  | rr-lyrae | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_L.html |
| Saros | 9 | 10 | Britannica,NED | 2 |  |  | https://www.britannica.com/science/saros |
| Saturn | 9 | 10 | Astro4Edu,Britannica,NED | 3 | 4 |  | https://www.britannica.com/place/Saturn-planet |
| Sputnik | 9 | 10 | Britannica | 1 |  |  | https://www.britannica.com/technology/Sputnik |
| Star | 9 | 10 | Astro4Edu,Britannica,NED | 3 | 4 | star | https://www.britannica.com/science/star-astronomy |
| star catalog | 9 | 10 | Britannica | 1 |  |  | https://www.britannica.com/science/star-catalog |
| Star concepts | 9 | 10 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/starlog/starcon.html |
| Star Counts | 9 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| star spectral types | 9 | 10 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/starlog/staspe.html |
| Star Stream | 9 | 10 | NED | 1 | 1 |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Stark Effect | 9 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Starlight | 9 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| STARLINK | 9 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Subdwarf Star | 9 | 10 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/480/ |
| Subgiant CH Stars | 9 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Submillimeter Astronomy | 9 | 10 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/482/ |
| Sun | 9 | 10 | Astro4Edu,Britannica,HyperPhysics,NED | 4 |  | sun | https://www.britannica.com/place/Sun |
| Sundial | 9 | 10 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/344/ |
| Sunspot Cycle | 9 | 10 | Astro4Edu | 1 | 2 | sunspot-cycle | https://astro4edu.org/resources/glossary/term/346/ |
| Sunyaev Zel'dovich Process | 9 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| supermoon | 9 | 10 | Britannica | 1 |  |  | https://www.britannica.com/science/supermoon |
| Supernova 1987A | 9 | 10 | Britannica | 1 |  |  | https://www.britannica.com/topic/Supernova-1987A |
| Symbiotic Stars | 9 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Triple Star | 9 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_T.html#T88 |
| Tycho's Nova | 9 | 10 | Britannica | 1 | 1 |  | https://www.britannica.com/place/Tychos-Nova |
| U Geminorum Star | 9 | 10 | Britannica,NED | 2 |  | u-geminorum-stars | https://www.britannica.com/science/U-Geminorum-star |
| Venus | 9 | 10 | Astro4Edu,Britannica,NED | 3 | 2 |  | https://www.britannica.com/place/Venus-planet |
| White dwarf | 9 | 10 | HyperPhysics | 1 |  | white-dwarf | https://hyperphysics.phy-astr.gsu.edu/hbase/astro/whdwar.html |
| Absolute Space | 8 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Algol | 8 | 10 | Britannica,NED | 2 |  |  | https://www.britannica.com/place/Algol-star |
| Andromeda (constellation) | 8 | 10 | Astro4Edu,Britannica,NED | 3 | 2 |  | https://www.britannica.com/place/Andromeda-constellation |
| Andromeda Galaxy | 8 | 10 | Astro4Edu,Britannica,HyperPhysics | 3 | 1 | andromeda-galaxy | https://www.britannica.com/place/Andromeda-Galaxy |
| Angstrom | 8 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Annular Eclipse | 8 | 10 | NED | 1 | 1 |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Apastron | 8 | 10 | NED | 1 |  | apastron | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Ariel (moon) | 8 | 10 | NED | 1 | 1 |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Asterism (astronomy) | 8 | 10 | Astro4Edu,Britannica | 2 | 1 | asterism | https://www.britannica.com/science/asterism-astronomy |
| Asteroid | 8 | 10 | Astro4Edu,Britannica,NED | 3 | 10 | asteroid | https://www.britannica.com/science/asteroid |
| Asteroid belt | 8 | 10 | Astro4Edu,NED | 2 |  | asteroid-belt | https://astro4edu.org/resources/glossary/term/18/ |
| Astronomy | 8 | 10 | Astro4Edu,Britannica,NED | 3 | 7 | astronomy | https://www.britannica.com/science/astronomy |
| Auriga | 8 | 10 | Britannica | 1 | 1 |  | https://www.britannica.com/place/Auriga |
| Biela's Comet | 8 | 10 | Britannica | 1 |  |  | https://www.britannica.com/topic/Bielas-Comet |
| California Nebula (IC 1499) | 8 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| cD Galaxy | 8 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Comet | 8 | 10 | Astro4Edu,Britannica,NED | 3 | 15 | comet | https://www.britannica.com/science/comet-astronomy |
| Comet 3I/ATLAS | 8 | 10 | Britannica | 1 |  |  | https://www.britannica.com/topic/Comet-3I-ATLAS |
| Comet Hale Bopp | 8 | 10 | Britannica | 1 |  |  | https://www.britannica.com/topic/Comet-Hale-Bopp |
| Comet Shoemaker Levy 9 | 8 | 10 | Britannica | 1 |  |  | https://www.britannica.com/topic/Comet-Shoemaker-Levy-9 |
| Cometary Nebula | 8 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Compact Galaxy | 8 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Degenerate Gas | 8 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_D.html |
| Damped Lyman Alpha Systems | 8 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_D.html |
| Eclipse | 8 | 10 | Astro4Edu,Britannica,NED | 3 | 5 |  | https://www.britannica.com/science/eclipse |
| Galaxy | 8 | 10 | Astro4Edu,Britannica,HyperPhysics,NED | 4 | 16 | galaxy | https://www.britannica.com/science/galaxy |
| Galaxy Formation Bias | 8 | 10 | NED | 1 | 1 |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_B.html |
| Janus | 8 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_J.html#J7 |
| Lupus | 8 | 10 | Britannica | 1 |  |  | https://www.britannica.com/place/Lupus |
| momentum | 8 | 10 | HyperPhysics | 1 | 2 | momentum | https://hyperphysics.phy-astr.gsu.edu/hbase/mom.html |
| Nebula | 8 | 10 | Astro4Edu,Britannica,NED | 3 | 9 | nebula | https://www.britannica.com/science/nebula |
| Nebular Lines | 8 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_N.html |
| nebulium | 8 | 10 | Britannica | 1 |  |  | https://www.britannica.com/science/nebulium |
| Neptune | 8 | 10 | Astro4Edu,Britannica,NED | 3 | 1 |  | https://www.britannica.com/place/Neptune-planet |
| North America Nebula | 8 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_N.html |
| Omega Nebula | 8 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_O.html#O28 |
| Outer Planets | 8 | 10 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/234/ |
| Owl Nebula | 8 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_O.html#O82 |
| Planck Length | 8 | 10 | NED | 1 |  | planck-length | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Planet | 8 | 10 | Astro4Edu,Britannica,NED | 3 | 5 | planet | https://www.britannica.com/science/planet |
| Planet Formation | 8 | 10 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/254/ |
| Planetarium | 8 | 10 | Astro4Edu,Britannica | 2 |  |  | https://www.britannica.com/science/planetarium |
| planetary defense | 8 | 10 | Britannica | 1 |  |  | https://www.britannica.com/science/planetary-defense |
| Planetary Precession | 8 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| SN 2011fe Type Ia supernovae in Pinwheel Galaxy | 8 | 10 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/astro/pinwheel.html |
| Solar eclipse | 8 | 10 | Astro4Edu,Britannica | 2 | 2 |  | https://www.britannica.com/science/solar-eclipse |
| Solar Plage | 8 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Solar Wind | 8 | 10 | Astro4Edu,Britannica,HyperPhysics,NED | 4 |  | solar-wind | https://www.britannica.com/science/solar-wind |
| Swan Nebula | 8 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Tarantula Nebula | 8 | 10 | Britannica,NED | 2 |  |  | https://www.britannica.com/place/Tarantula-Nebula |
| Trifid Nebula | 8 | 10 | Britannica,NED | 2 |  |  | https://www.britannica.com/place/Trifid-Nebula |
| Trojan asteroid | 8 | 10 | Britannica | 1 |  | trojan-asteroids | https://www.britannica.com/science/Trojan-asteroid |
| Uranus | 8 | 10 | Astro4Edu,Britannica,NED | 3 |  |  | https://www.britannica.com/place/Uranus-planet |
| Active galactic nucleus | 7 | 10 | Astro4Edu,Britannica,NED | 3 |  | active-galactic-nuclei | https://www.britannica.com/science/active-galactic-nucleus |
| Alpha Centauri | 7 | 10 | Astro4Edu,Britannica,HyperPhysics,NED | 4 | 1 |  | https://www.britannica.com/place/Alpha-Centauri |
| Aphelion | 7 | 10 | Astro4Edu,Britannica,NED | 3 |  | aphelion | https://www.britannica.com/science/aphelion |
| Astrophysics | 7 | 10 | Astro4Edu,Britannica,HyperPhysics,NED | 4 |  |  | https://www.britannica.com/science/astrophysics |
| Betelgeuse | 7 | 10 | Britannica | 1 | 1 |  | https://www.britannica.com/place/Betelgeuse-star |
| Carbon Detonation Supernova Model | 7 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Ceres (dwarf planet) | 7 | 10 | Britannica,NED | 2 |  | ceres | https://www.britannica.com/place/Ceres-dwarf-planet |
| Dark matter | 7 | 10 | Astro4Edu,Britannica,HyperPhysics | 3 | 3 | dark-matter | https://www.britannica.com/science/dark-matter |
| Dwarf | 7 | 10 | NED | 1 | 1 |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_D.html |
| Dwarf Nova | 7 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_D.html |
| Dwarf Star | 7 | 10 | Astro4Edu,Britannica | 2 |  |  | https://www.britannica.com/science/dwarf-star |
| Early Type Galaxies | 7 | 10 |  | 1 | 1 | early-type-galaxies |  |
| Earth like Planet | 7 | 10 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/411/ |
| Halley's Comet | 7 | 10 | Astro4Edu,Britannica,NED | 3 |  |  | https://www.britannica.com/topic/Halleys-Comet |
| Hydrogen | 7 | 10 | Astro4Edu | 1 | 7 | hydrogen | https://astro4edu.org/resources/glossary/term/149/ |
| Ionized Hydrogen | 7 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_I.html |
| Metallic Hydrogen | 7 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_M.html |
| Milky Way | 7 | 10 | Astro4Edu,NED | 2 | 4 | milky-way | https://astro4edu.org/resources/glossary/term/199/ |
| Molecular Hydrogen | 7 | 10 | NED | 1 |  | molecular-hydrogen | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_M.html |
| Neutral Hydrogen | 7 | 10 | NED | 1 | 1 | neutral-hydrogen | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_N.html |
| Supernova | 7 | 10 | Astro4Edu,Britannica,HyperPhysics,NED | 4 | 2 | supernova | https://www.britannica.com/science/supernova |
| Zodiac | 7 | 10 | Astro4Edu,Britannica,NED | 3 | 1 | zodiac | https://www.britannica.com/topic/zodiac |
| Chaotic Inflationary Universe Theory | 6 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Cluster of Galaxies | 6 | 10 | Astro4Edu,Britannica,NED | 3 |  |  | https://www.britannica.com/science/cluster-of-galaxies |
| Dark energy | 6 | 10 | Astro4Edu,Britannica,HyperPhysics | 3 |  | dark-energy | https://www.britannica.com/science/dark-energy |
| Disk Galaxies | 6 | 10 |  | 1 | 1 | disk-galaxies |  |
| Eddington Lemaître Universe | 6 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_E.html |
| Einstein Static Universe | 6 | 10 | NED | 1 | 2 |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_E.html |
| Enceladus | 6 | 10 | Britannica,HyperPhysics,NED | 3 |  |  | https://www.britannica.com/place/Enceladus |
| Energy | 6 | 10 | Astro4Edu,HyperPhysics,NED | 3 | 2 |  | https://astro4edu.org/resources/glossary/term/100/ |
| Equinox | 6 | 10 | Astro4Edu,Britannica,HyperPhysics,NED | 4 | 7 |  | https://www.britannica.com/science/equinox-astronomy |
| expanding universe | 6 | 10 | Britannica,HyperPhysics | 2 |  |  | https://www.britannica.com/science/expanding-universe |
| General relativity | 6 | 10 | HyperPhysics,NED | 2 | 3 |  | https://hyperphysics.phy-astr.gsu.edu/hbase/relativ/conrel.html |
| Iron Peak | 6 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_I.html |
| Kuiper belt | 6 | 10 | Astro4Edu,Britannica | 2 | 2 | kuiper-belt | https://www.britannica.com/place/Kuiper-belt |
| Kuiper Belt Objects | 6 | 10 |  | 0 |  | kuiper-belt-objects |  |
| Mass | 6 | 10 | Astro4Edu,HyperPhysics,NED | 3 | 4 | mass | https://astro4edu.org/resources/glossary/term/190/ |
| Multiverse | 6 | 10 | Britannica,NED | 2 | 1 |  | https://www.britannica.com/science/multiverse |
| Neutron star | 6 | 10 | Astro4Edu,Britannica,HyperPhysics,NED | 4 | 1 | neutron-star | https://www.britannica.com/science/neutron-star |
| Oort cloud | 6 | 10 | Astro4Edu,Britannica,NED | 3 |  | oort-cloud | https://www.britannica.com/science/Oort-cloud |
| Orion | 6 | 10 | Astro4Edu,Britannica | 2 | 1 |  | https://www.britannica.com/place/Orion-constellation |
| Orion Nebula | 6 | 10 | Britannica,NED | 2 | 2 |  | https://www.britannica.com/place/Orion-Nebula |
| Outer space | 6 | 10 | Astro4Edu,Britannica | 2 |  |  | https://www.britannica.com/science/outer-space |
| Outer Space Treaty | 6 | 10 | Britannica | 1 |  |  | https://www.britannica.com/event/Outer-Space-Treaty |
| Parallax | 6 | 10 | Astro4Edu,Britannica,HyperPhysics,NED | 4 | 8 |  | https://www.britannica.com/science/parallax |
| Past Light Cone | 6 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Planck Units | 6 | 10 | NED | 1 | 2 | planck-units | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Planet Nine | 6 | 10 | Britannica | 1 |  |  | https://www.britannica.com/science/Planet-Nine |
| Pleiades | 6 | 10 | Astro4Edu,Britannica,HyperPhysics,NED | 4 | 2 |  | https://www.britannica.com/place/Pleiades-astronomy |
| Pulsar | 6 | 10 | Astro4Edu,Britannica,HyperPhysics,NED | 4 | 1 | pulsar | https://www.britannica.com/science/pulsar |
| Quasar | 6 | 10 | Astro4Edu,Britannica,HyperPhysics | 3 | 3 | quasar | https://www.britannica.com/science/quasar |
| Universe | 6 | 10 | Astro4Edu,Britannica,NED | 3 | 9 | universe | https://www.britannica.com/science/universe |
| Vega | 6 | 10 | Britannica,NED | 2 |  |  | https://www.britannica.com/place/Vega-star |
| white dwarf star | 6 | 10 | Britannica,HyperPhysics | 2 |  | white-dwarf | https://www.britannica.com/science/white-dwarf-star |
| Canis Major | 5 | 10 | Britannica | 1 | 2 |  | https://www.britannica.com/place/Canis-Major |
| Cygnus X 1 | 5 | 10 | Britannica,HyperPhysics,NED | 3 | 1 |  | https://www.britannica.com/topic/Cygnus-X-1 |
| Hubble Constant | 5 | 10 | Britannica,HyperPhysics,NED | 3 |  |  | https://www.britannica.com/science/Hubble-constant |
| Larmor Frequency | 5 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_L.html |
| Leo Minor | 5 | 10 | Britannica | 1 |  |  | https://www.britannica.com/place/Leo-Minor |
| Luminosity | 5 | 10 | Astro4Edu,Britannica,NED | 3 | 5 | luminosity | https://www.britannica.com/science/luminosity |
| Main Asteroid Belt | 5 | 10 |  | 0 |  | main-asteroid-belt |  |
| Perigee | 5 | 10 | Astro4Edu,NED | 2 |  | perigee | https://astro4edu.org/resources/glossary/term/523/ |
| Photon | 5 | 10 | Astro4Edu,HyperPhysics,NED | 3 |  | photon | https://astro4edu.org/resources/glossary/term/250/ |
| Pixel | 5 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Rigel | 5 | 10 | Britannica,NED | 2 |  |  | https://www.britannica.com/place/Rigel |
| Solstice | 5 | 10 | Astro4Edu,Britannica,HyperPhysics,NED | 4 | 1 | solstice | https://www.britannica.com/science/solstice |
| Ursa Minor | 5 | 10 | Britannica,NED | 2 |  |  | https://www.britannica.com/place/Ursa-Minor |
| Zero-Age Main Sequence | 5 | 10 | NED | 1 |  | zero-age-main-sequence | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_Z.html#Z10 |
| Beta Decay | 4 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_B.html |
| Brown dwarf | 4 | 10 | Astro4Edu,Britannica,NED | 3 |  | brown-dwarf | https://www.britannica.com/science/brown-dwarf |
| Capella | 4 | 10 | Britannica | 1 | 1 |  | https://www.britannica.com/place/Capella-star |
| Carina (constellation) | 4 | 10 | Britannica,NED | 2 |  |  | https://www.britannica.com/topic/Carina-constellation |
| Celestial sphere | 4 | 10 | Astro4Edu,Britannica,HyperPhysics,NED | 4 | 4 | celestial-sphere | https://www.britannica.com/science/celestial-sphere |
| Constellation | 4 | 10 | Astro4Edu,Britannica,NED | 3 | 6 | constellation | https://www.britannica.com/science/constellation |
| Dust Cloud | 4 | 10 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/438/ |
| Dynamical Parallax | 4 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_D.html |
| Echelle | 4 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_E.html |
| Ecliptic | 4 | 10 | Astro4Edu,Britannica,NED | 3 | 1 | ecliptic | https://www.britannica.com/science/ecliptic |
| Ellipticity | 4 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_E.html |
| Energy Density | 4 | 10 | HyperPhysics,NED | 2 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/quantum/raddens.html |
| HII Region | 4 | 10 |  | 0 |  | hii-region |  |
| Horizon | 4 | 10 | Astro4Edu,Britannica,NED | 3 | 4 |  | https://www.britannica.com/science/horizon-astronomy |
| Hour angle | 4 | 10 | Astro4Edu,Britannica,NED | 3 |  |  | https://www.britannica.com/science/hour-angle |
| Hypothesis | 4 | 10 | Astro4Edu,NED | 2 |  |  | https://astro4edu.org/resources/glossary/term/152/ |
| Interstellar medium | 4 | 10 | Astro4Edu,Britannica,NED | 3 |  |  | https://www.britannica.com/science/interstellar-medium |
| Island Universe Hypothesis | 4 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_I.html |
| Maxwell | 4 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_M.html |
| Nebular Hypothesis | 4 | 10 | NED | 1 | 1 |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_N.html |
| Open cluster | 4 | 10 | Astro4Edu,Britannica,NED | 3 |  |  | https://www.britannica.com/science/open-cluster |
| Parsec | 4 | 10 | Astro4Edu,HyperPhysics,NED | 3 |  | parsec | https://astro4edu.org/resources/glossary/term/238/ |
| Perseus (constellation) | 4 | 10 | Britannica | 1 |  |  | https://www.britannica.com/place/Perseus-constellation |
| Photometry (astronomy) | 4 | 10 | Astro4Edu,Britannica,NED | 3 | 2 |  | https://www.britannica.com/science/photometry-astronomy |
| Sagittarius A* | 4 | 10 | Astro4Edu,Britannica,NED | 3 |  |  | https://www.britannica.com/place/Sagittarius-A-astronomy |
| Scattered Disk Objects | 4 | 10 |  | 0 |  | scattered-disk-objects |  |
| Scattering | 4 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Seeing | 4 | 10 | Britannica,NED | 2 |  |  | https://www.britannica.com/science/seeing |
| Serpens | 4 | 10 | Britannica | 1 | 1 |  | https://www.britannica.com/place/Serpens |
| Uncertainty Principle | 4 | 10 | HyperPhysics,NED | 2 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/uncer.html |
| Variable star | 4 | 10 | Astro4Edu,Britannica,NED | 3 |  | variable-stars | https://www.britannica.com/science/variable-star |
| Globular cluster | 3 | 10 | Astro4Edu,Britannica | 2 | 1 |  | https://www.britannica.com/science/globular-cluster |
| Observable universe | 3 | 10 | Astro4Edu,Britannica,NED | 3 |  |  | https://www.britannica.com/topic/observable-universe |
| Polaris | 3 | 10 | Astro4Edu,Britannica,NED | 3 |  |  | https://www.britannica.com/place/Polaris-star |
| Proton | 3 | 10 | Astro4Edu,Britannica,HyperPhysics,NED | 4 |  | proton | https://www.britannica.com/technology/Proton-Russian-launch-vehicle |
| Star cluster | 3 | 10 | Astro4Edu,Britannica,NED | 3 | 3 |  | https://www.britannica.com/science/star-cluster |
| Telescope | 3 | 10 | Astro4Edu,Britannica,NED | 3 | 17 | telescope | https://www.britannica.com/science/optical-telescope |
| Cassini Huygens | 2 | 10 | Britannica | 1 |  |  | https://www.britannica.com/event/Cassini-Huygens |
| Detached Binaries | 2 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_D.html |
| Epsilon Aurigae | 2 | 10 | Britannica | 1 |  |  | https://www.britannica.com/place/Epsilon-Aurigae |
| Eta Aquilae | 2 | 10 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_E.html |
| Eta Carinae | 2 | 10 | Britannica | 1 |  |  | https://www.britannica.com/place/Eta-Carinae |
| Event Horizon | 2 | 10 | Britannica,HyperPhysics,NED | 3 |  | event-horizon | https://www.britannica.com/topic/event-horizon-black-hole |
| Planetary nebula | 2 | 10 | Astro4Edu,Britannica,NED | 3 |  |  | https://www.britannica.com/science/planetary-nebula |
| Sirius | 2 | 10 | Astro4Edu,Britannica | 2 | 2 |  | https://www.britannica.com/place/Sirius-star |
| Argument of the Perihelion | 9 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Absorption Band | 8 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Atom | 8 | 9 | Astro4Edu,NED | 2 | 4 | atom | https://astro4edu.org/resources/glossary/term/31/ |
| Ellipse | 8 | 9 | Astro4Edu,NED | 2 |  | ellipse | https://astro4edu.org/resources/glossary/term/98/ |
| Epicycle | 8 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_E.html |
| F-type  Star | 8 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_F.html#F10 |
| Field Horizontal Branch Stars | 8 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_F.html |
| Field Star | 8 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_F.html#F42 |
| Flare Star | 8 | 9 | Britannica,NED | 2 |  |  | https://www.britannica.com/science/flare-star |
| FU Ori Stars or Fuors | 8 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_F.html |
| Fundamental Stars | 8 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_F.html#F114 |
| G-type Star | 8 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_G.html |
| LTE | 8 | 9 | NED | 1 | 9 |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_L.html |
| Optical Window | 8 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_O.html#O44 |
| Photodiode | 8 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Sculptor | 8 | 9 | Britannica,NED | 2 |  |  | https://www.britannica.com/place/Sculptor-constellation |
| SFR | 8 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Tide | 8 | 9 | Astro4Edu,Britannica | 2 | 2 |  | https://www.britannica.com/science/tide |
| Latitude | 8 | 9 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/171/ |
| Aberration | 7 | 9 | NED | 1 | 2 |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Absorption | 7 | 9 | NED | 1 | 1 |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Absorption Line | 7 | 9 | Astro4Edu | 1 | 1 | absorption-line | https://astro4edu.org/resources/glossary/term/515/ |
| Absorption Spectrum | 7 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Absorption Trough | 7 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Achernar | 7 | 9 | Britannica,NED | 2 |  |  | https://www.britannica.com/place/Achernar |
| Age of the universe | 7 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Apus | 7 | 9 | Britannica | 1 |  |  | https://www.britannica.com/topic/Apus-astronomy |
| Arcturus | 7 | 9 | Britannica,NED | 2 |  |  | https://www.britannica.com/place/Arcturus |
| Artificial Satellite | 7 | 9 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/293/ |
| Astrobiology | 7 | 9 | Astro4Edu,Britannica | 2 |  |  | https://www.britannica.com/science/astrobiology |
| Astrometry | 7 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Astronomical Color Index | 7 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Astronomical Coordinate Systems | 7 | 9 |  | 1 | 1 |  |  |
| Astronomical Observatory | 7 | 9 | Astro4Edu,Britannica | 2 |  |  | https://www.britannica.com/science/astronomical-observatory |
| Astronomical unit | 7 | 9 |  | 1 | 2 | astronomical-unit |  |
| Atomic Orbital | 7 | 9 | NED | 1 | 11 |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Attenuation | 7 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| B-Band | 7 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_B.html |
| Caelum | 7 | 9 | Britannica | 1 |  |  | https://www.britannica.com/place/Caelum |
| Cold Dark Matter (CDM) | 7 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Cosmic microwave background | 7 | 9 |  | 1 | 16 | cosmic-microwave-background |  |
| electromagnetic spectrum | 7 | 9 |  | 1 | 5 | electromagnetic-spectrum |  |
| Faint Blue Galaxy | 7 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_F.html |
| Field Galaxy | 7 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_F.html#F41 |
| Galaxy Classification | 7 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_G.html |
| Galaxy Correlation Function | 7 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_G.html |
| Galaxy Counts | 7 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_G.html |
| galaxy formation problem | 7 | 9 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/astro/cosmo.html |
| Giant star | 7 | 9 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/astro/redgia.html |
| Gum Nebula | 7 | 9 | Britannica,NED | 2 |  |  | https://www.britannica.com/place/Gum-Nebula |
| Helium | 7 | 9 |  | 0 |  | helium |  |
| High-Velocity Star | 7 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_H.html |
| Hubble Law | 7 | 9 |  | 1 | 8 | hubble-law |  |
| kelvin | 7 | 9 | NED | 1 | 2 | kelvin | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_K.html#K20 |
| Limb | 7 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_L.html |
| Matter | 7 | 9 | Astro4Edu | 1 | 3 |  | https://astro4edu.org/resources/glossary/term/191/ |
| Nicol Prism | 7 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_N.html |
| Nicolaus Copernicus | 7 | 9 | Britannica | 1 |  |  | https://www.britannica.com/biography/Nicolaus-Copernicus |
| Non-Baryonic Matter | 7 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_N.html |
| Plaskett's Star | 7 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Post-Asymptotic Branch Stars | 7 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Primordial Black Holes | 7 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Program Stars | 7 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Ptolemaic system | 7 | 9 | Britannica | 1 |  |  | https://www.britannica.com/science/Ptolemaic-system |
| R Coronae Borealis star | 7 | 9 | Britannica | 1 | 1 |  | https://www.britannica.com/science/R-Coronae-Borealis-star |
| R Star | 7 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| Radio Stars | 7 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| red dwarf star | 7 | 9 | Britannica | 1 |  | red-dwarf | https://www.britannica.com/science/red-dwarf-star |
| Red supergiant | 7 | 9 |  | 1 | 1 |  |  |
| Big Bang | 6 | 9 |  | 1 | 8 | big-bang |  |
| Binding Energy | 6 | 9 |  | 1 | 2 |  |  |
| Bodes Law | 6 | 9 |  | 1 | 1 |  |  |
| Center of Curvature | 6 | 9 |  | 1 |  |  |  |
| Coma Cluster | 6 | 9 |  | 1 | 1 |  |  |
| Cosmological principle | 6 | 9 |  | 1 | 1 |  |  |
| Crab Nebula | 6 | 9 |  | 1 | 1 |  |  |
| Crab Pulsar | 6 | 9 |  | 1 |  |  |  |
| Crux | 6 | 9 | Britannica | 1 | 1 |  | https://www.britannica.com/place/Crux |
| Drake equation | 6 | 9 |  | 1 |  |  |  |
| Eclipsing Binary | 6 | 9 |  | 1 |  |  |  |
| Exoplanet | 6 | 9 | Astro4Edu | 1 | 2 |  | https://astro4edu.org/resources/glossary/term/106/ |
| Extraterrestrial Life | 6 | 9 |  | 1 |  |  |  |
| Gravity | 6 | 9 | Astro4Edu,Britannica,HyperPhysics,NED | 4 |  |  | https://www.britannica.com/science/gravity-physics |
| Great Attractor | 6 | 9 | Britannica,NED | 2 | 1 |  | https://www.britannica.com/topic/Great-Attractor |
| H and K Emission Line Stars | 6 | 9 |  | 1 |  |  |  |
| Hadron | 6 | 9 | NED | 1 | 1 | hadron | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_H.html |
| Herbig Ae Be Stars | 6 | 9 |  | 1 |  |  |  |
| Hertzsprung Gap | 6 | 9 |  | 1 |  |  |  |
| Hertzsprung-Russell Diagram | 6 | 9 | 1 | 5 |  | hertzsprung-russell-diagram |  |
| Hierarchical Clustering | 6 | 9 |  | 1 | 2 | hierarchical-clustering |  |
| Hot Dark Matter | 6 | 9 |  | 1 |  |  |  |
| Inflationary Model | 6 | 9 |  | 1 |  |  |  |
| isotropy | 6 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_I.html |
| Keplers Laws | 6 | 9 |  | 1 | 2 |  |  |
| Lagrange point | 6 | 9 |  | 1 | 3 |  |  |
| Lens Equation | 6 | 9 |  | 1 |  |  |  |
| lisa | 6 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_L.html |
| Local Group | 6 | 9 | Britannica | 1 | 1 | local-group | https://www.britannica.com/place/Local-Group |
| m104 | 6 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_M.html |
| m13 | 6 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_M.html |
| m42 | 6 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_M.html |
| m51 | 6 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_M.html |
| M81 Group | 6 | 9 |  | 1 |  |  |  |
| m87 | 6 | 9 | Britannica,NED | 2 |  |  | https://www.britannica.com/place/Virgo-A |
| Maxwells Equations | 6 | 9 |  | 1 |  |  |  |
| Photon Energy | 6 | 9 |  | 1 |  |  |  |
| Planetary Ring | 6 | 9 |  | 1 |  |  |  |
| protogalaxy | 6 | 9 | Britannica | 1 |  |  | https://www.britannica.com/science/protogalaxy |
| protoplanet | 6 | 9 | Astro4Edu,Britannica | 2 |  |  | https://www.britannica.com/science/protoplanet |
| Ring Galaxy | 6 | 9 |  | 1 |  |  |  |
| Rogue Planet | 6 | 9 |  | 1 |  |  |  |
| Sedna (dwarf planet) | 6 | 9 | Britannica | 1 |  |  | https://www.britannica.com/place/Sedna |
| sextant | 6 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Singularity | 6 | 9 |  | 0 |  | singularity |  |
| Special relativity | 6 | 9 |  | 1 | 2 |  |  |
| Stellar classification | 6 | 9 |  | 1 | 1 |  |  |
| Supermassive black hole | 6 | 9 |  | 1 |  | supermassive-black-hole |  |
| Triton (moon) | 6 | 9 | Astro4Edu,Britannica,NED | 3 |  |  | https://www.britannica.com/place/Triton-astronomy |
| Ursa Major | 6 | 9 |  | 1 |  |  |  |
| Apparent magnitude | 5 | 9 |  | 1 | 12 | apparent-magnitude |  |
| Big Crunch | 5 | 9 |  | 1 | 1 | big-crunch |  |
| Bolometric Magnitude | 5 | 9 |  | 1 | 1 | bolometric-magnitude |  |
| bootes | 5 | 9 | Britannica | 1 | 1 |  | https://www.britannica.com/place/Bootes |
| Canopus | 5 | 9 | Britannica | 1 | 1 |  | https://www.britannica.com/topic/Canopus-star |
| Cassegrain Focus | 5 | 9 |  | 1 |  |  |  |
| Cetus (constellation) | 5 | 9 | Britannica | 1 |  |  | https://www.britannica.com/place/Cetus |
| Cold Emission | 5 | 9 |  | 1 |  |  |  |
| Composite Spectrum Stars | 5 | 9 |  | 1 |  |  |  |
| corona | 5 | 9 | Astro4Edu,Britannica,NED | 3 | 5 | corona | https://www.britannica.com/science/corona-Sun |
| Cosmic ray | 5 | 9 |  | 1 | 5 | cosmic-rays |  |
| Cross Spectrum | 5 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Cygnus A | 5 | 9 |  | 1 | 1 |  |  |
| Draco (constellation) | 5 | 9 | Britannica,NED | 2 |  |  | https://www.britannica.com/place/Draco-constellation |
| entropy | 5 | 9 | HyperPhysics,NED | 2 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/therm/entrop.html |
| Epoch (astronomy) | 5 | 9 | NED | 1 | 6 | epoch | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_E.html |
| Eridanus (constellation) | 5 | 9 | Britannica | 1 | 1 |  | https://www.britannica.com/place/Eridanus |
| Gas Giant Planet | 5 | 9 |  | 0 |  | gas-giant-planet |  |
| Hubble Classification | 5 | 9 |  | 1 |  | hubble-classification |  |
| Hulse Taylor Pulsar | 5 | 9 |  | 1 |  |  |  |
| Interstellar Square Law | 5 | 9 |  | 1 |  |  |  |
| Irregular galaxy | 5 | 9 |  | 1 |  | irregular-galaxy |  |
| Kerr Solution | 5 | 9 |  | 1 |  |  |  |
| Large Magellanic Cloud | 5 | 9 |  | 1 | 2 |  |  |
| Libration Orbits | 5 | 9 |  | 1 |  |  |  |
| Luminosity Distance | 5 | 9 |  | 1 | 2 |  |  |
| Luminous Flux | 5 | 9 |  | 1 |  |  |  |
| Magellanic Clouds | 5 | 9 |  | 1 | 3 | magellanic-clouds |  |
| Mass-Luminosity-Radius Relation | 5 | 9 |  | 1 |  |  |  |
| Mass-Radius Relation | 5 | 9 |  | 1 |  |  |  |
| Minor planet | 5 | 9 |  | 1 |  |  |  |
| Ophiuchus | 5 | 9 | Britannica | 1 | 2 |  | https://www.britannica.com/topic/Ophiuchus |
| Period-Luminosity Relation | 5 | 9 |  | 1 | 1 |  |  |
| Plancks Blackbody Formula | 5 | 9 |  | 1 |  |  |  |
| Positron | 5 | 9 | HyperPhysics,NED | 2 | 1 | positron | https://hyperphysics.phy-astr.gsu.edu/hbase/particles/lepton.html |
| Procyon | 5 | 9 | Britannica,NED | 2 | 1 |  | https://www.britannica.com/place/Procyon |
| Protostar | 5 | 9 | Astro4Edu | 1 |  | protostar | https://astro4edu.org/resources/glossary/term/264/ |
| Ring Nebula | 5 | 9 |  | 1 |  |  |  |
| spectrograph | 5 | 9 | Astro4Edu,NED | 2 |  |  | https://astro4edu.org/resources/glossary/term/326/ |
| Spectroscopy | 5 | 9 | Astro4Edu,NED | 2 | 5 | spectroscopy | https://astro4edu.org/resources/glossary/term/327/ |
| Spiral galaxy | 5 | 9 |  | 1 | 1 | spiral-galaxy |  |
| Stellar evolution | 5 | 9 |  | 1 | 3 | stellar-evolution |  |
| Triangulum Galaxy | 5 | 9 |  | 1 |  |  |  |
| Virgo Supercluster | 5 | 9 |  | 1 | 2 |  |  |
| Wolf-Rayet Star | 5 | 9 |  | 0 |  | wolf-rayet-star |  |
| Balmer Series | 4 | 9 |  | 1 | 2 | balmer-series |  |
| Beehive Cluster | 4 | 9 |  | 1 |  |  |  |
| Beta Centauri | 4 | 9 |  | 1 |  |  |  |
| Binary Galaxies | 4 | 9 |  | 1 |  |  |  |
| Binary Star | 4 | 9 |  | 1 |  | binary-star |  |
| Black Dwarf | 4 | 9 |  | 1 |  |  |  |
| Blue Horizontal Branch Stars | 4 | 9 |  | 1 |  |  |  |
| Blue Supergiant | 4 | 9 |  | 1 |  |  |  |
| Bragg Spectrometer | 4 | 9 |  | 1 |  |  |  |
| calendar | 4 | 9 | Astro4Edu,NED | 2 | 4 |  | https://astro4edu.org/resources/glossary/term/47/ |
| Canis Major Dwarf Galaxy | 4 | 9 |  | 1 |  |  |  |
| castor | 4 | 9 | Britannica | 1 |  |  | https://www.britannica.com/place/Castor-star |
| Celestial Coordinates | 4 | 9 | Astro4Edu,Britannica | 2 | 3 | celestial-coordinates | https://www.britannica.com/science/celestial-coordinates |
| Celestial Mechanics | 4 | 9 |  | 1 | 2 |  |  |
| Centaurus | 4 | 9 | Britannica | 1 | 2 |  | https://www.britannica.com/place/Centaurus |
| Cepheid variable | 4 | 9 | Astro4Edu,Britannica | 2 | 2 | cepheid-variable-stars | https://www.britannica.com/science/Cepheid-variable |
| Cepheus (constellation) | 4 | 9 | Britannica | 1 |  |  | https://www.britannica.com/topic/Cepheus-constellation |
| Cluster Variable | 4 | 9 |  | 1 |  |  |  |
| Cosmic distance ladder | 4 | 9 | NED | 1 | 1 |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Dark Nebula | 4 | 9 |  | 0 |  | dark-nebula |  |
| Declination | 4 | 9 | Astro4Edu,Britannica,HyperPhysics,NED | 4 |  | declination | https://www.britannica.com/science/declination |
| dispersion | 4 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_D.html |
| Dwarf Cepheids | 4 | 9 |  | 1 |  |  |  |
| Dwarf planet | 4 | 9 |  | 1 |  |  |  |
| Einstein Relationship | 4 | 9 |  | 1 |  |  |  |
| Electromagnetic Field | 4 | 9 |  | 1 |  |  |  |
| Equatorial coordinate system | 4 | 9 |  | 1 | 2 | equatorial-coordinate-system |  |
| Evolution of Galaxies | 4 | 9 |  | 0 |  | evolution-of-galaxies |  |
| Fomalhaut | 4 | 9 | Britannica,NED | 2 |  |  | https://www.britannica.com/place/Fomalhaut |
| Galaxy Formation | 4 | 9 |  | 0 |  | galaxy-formation |  |
| Giant planet | 4 | 9 |  | 1 |  |  |  |
| Gravitational lens | 4 | 9 |  | 1 | 2 |  |  |
| Helium Variable Stars | 4 | 9 |  | 1 | 1 |  |  |
| hercules | 4 | 9 | Britannica | 1 | 1 |  | https://www.britannica.com/place/Hercules-constellation |
| Hipparchus | 4 | 9 | Britannica | 1 |  |  | https://www.britannica.com/biography/Hipparchus-Greek-astronomer |
| Hyades (star cluster) | 4 | 9 | NED | 1 | 1 |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_H.html |
| Hydra (constellation) | 4 | 9 | Britannica | 1 | 1 |  | https://www.britannica.com/place/Hydra-constellation |
| Inflationary Hypothesis | 4 | 9 |  | 1 |  |  |  |
| Interstellar Dust | 4 | 9 |  | 1 |  |  |  |
| Interstellar Extinction | 4 | 9 |  | 1 |  |  |  |
| Interstellar Object | 4 | 9 |  | 1 |  |  |  |
| K-Correction | 4 | 9 |  | 1 |  |  |  |
| Keck Observatory | 4 | 9 |  | 1 |  |  |  |
| kiloparsec | 4 | 9 | NED | 1 |  | kiloparsec | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_K.html#K37 |
| Lenticular galaxy | 4 | 9 |  | 1 |  | lenticular-galaxy |  |
| Lick Observatory | 4 | 9 |  | 1 |  |  |  |
| Long period variable star | 4 | 9 |  | 1 |  |  |  |
| Lorentz Transformation | 4 | 9 |  | 1 |  |  |  |
| Main Sequence Turn Off | 4 | 9 |  | 1 |  |  |  |
| Mass Spectrometer | 4 | 9 |  | 1 |  |  |  |
| Maxwell Distribution | 4 | 9 |  | 1 |  |  |  |
| megaparsec | 4 | 9 | NED | 1 |  | megaparsec | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_M.html |
| Metallicity Gradient | 4 | 9 |  | 1 | 3 |  |  |
| Meteoroid | 4 | 9 | Astro4Edu,NED | 2 | 2 | meteoroid | https://astro4edu.org/resources/glossary/term/197/ |
| Molecular cloud | 4 | 9 |  | 1 | 4 | molecular-cloud |  |
| Molecule | 4 | 9 | Astro4Edu | 1 | 3 | molecule | https://astro4edu.org/resources/glossary/term/201/ |
| Observatory | 4 | 9 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/227/ |
| Omega Centauri | 4 | 9 |  | 1 | 2 |  |  |
| Orbit | 4 | 9 |  | 0 |  | orbit |  |
| Order of Magnitude Estimate | 4 | 9 |  | 1 |  |  |  |
| Ortho Spectrum | 4 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_O.html#O71 |
| Palomar Observatory | 4 | 9 |  | 1 |  |  |  |
| Para Spectrum | 4 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Pegasus (constellation) | 4 | 9 | Britannica | 1 |  |  | https://www.britannica.com/place/Pegasus-astronomy |
| Perseus Cluster | 4 | 9 |  | 1 |  |  |  |
| Phases | 4 | 9 | NED | 1 | 7 | phases | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Planck Satellite | 4 | 9 |  | 1 |  |  |  |
| Pre-Main Sequence Star | 4 | 9 |  | 1 |  |  |  |
| Sagittarius (constellation) | 4 | 9 | Astro4Edu,Britannica | 2 | 1 |  | https://www.britannica.com/place/Sagittarius-constellation |
| scintillation | 4 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Scorpius | 4 | 9 | Astro4Edu,Britannica | 2 |  |  | https://www.britannica.com/place/Scorpius |
| Seyfert Galaxies | 4 | 9 |  | 1 |  |  |  |
| Small Magellanic Cloud | 4 | 9 |  | 1 | 1 | small-magellanic-cloud |  |
| Solar Nebula | 4 | 9 |  | 1 |  |  |  |
| Solar Rotation | 4 | 9 |  | 1 |  |  |  |
| Star formation | 4 | 9 |  | 1 |  |  |  |
| stellar | 4 | 9 | NED | 1 | 22 |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Stellar Association | 4 | 9 |  | 1 | 6 | stellar-association |  |
| Strong Interaction | 4 | 9 |  | 1 |  |  |  |
| subgiant | 4 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Supergiant | 4 | 9 | NED | 1 | 1 |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Taurus (constellation) | 4 | 9 | Astro4Edu,Britannica | 2 |  |  | https://www.britannica.com/place/Taurus |
| Thermal Convection | 4 | 9 |  | 1 |  |  |  |
| Tidal Friction | 4 | 9 |  | 1 |  |  |  |
| Virgo Cluster | 4 | 9 |  | 0 |  | virgo-cluster |  |
| Visual Binary | 4 | 9 |  | 1 | 2 |  |  |
| Yerkes Observatory | 4 | 9 |  | 1 |  |  |  |
| Cassegrain Reflecting Telescope | 3 | 9 |  | 1 |  |  |  |
| Hubble Flow | 3 | 9 |  | 1 | 2 | hubble-flow |  |
| Kirchhoffs Laws | 3 | 9 |  | 1 |  |  |  |
| Lepton | 3 | 9 |  | 0 |  | lepton |  |
| Lepton epoch | 3 | 9 | HyperPhysics,NED | 2 | 3 |  | https://hyperphysics.phy-astr.gsu.edu/hbase/particles/lepton.html |
| prominence | 3 | 9 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Rabi Frequency | 3 | 9 |  | 1 |  |  |  |
| Redshift | 3 | 9 |  | 1 | 8 | redshift |  |
| Seasons | 3 | 9 | Astro4Edu | 1 | 3 | seasons | https://astro4edu.org/resources/glossary/term/300/ |
| Standard Candle | 3 | 9 |  | 1 | 2 | standard-candle |  |
| Stefan-Boltzmann Law | 3 | 9 |  | 1 |  |  |  |
| Subaru Telescope | 3 | 9 |  | 1 |  |  |  |
| Subgiant Star | 3 | 9 |  | 1 |  |  |  |
| Supergiant Star | 3 | 9 |  | 1 |  |  |  |
| telescopium | 3 | 9 | Britannica | 1 |  |  | https://www.britannica.com/topic/Telescopium |
| Thermodynamics First Law | 3 | 9 |  | 1 |  |  |  |
| Thermodynamics Second Law | 3 | 9 |  | 1 | 1 |  |  |
| Thermodynamics Zeroth Law | 3 | 9 |  | 1 |  |  |  |
| Transit Telescope | 3 | 9 |  | 1 |  |  |  |
| Binary System | 2 | 9 |  | 1 |  |  |  |
| Distance Modulus | 2 | 9 |  | 1 | 1 | distance-modulus |  |
| Dwarf galaxy | 2 | 9 |  | 1 |  | dwarf-galaxy |  |
| Elliptical galaxy | 2 | 9 |  | 1 |  | elliptical-galaxy |  |
| Eruptive Variable | 2 | 9 |  | 1 |  |  |  |
| Planetary Nebulae | 2 | 9 |  | 0 |  | planetary-nebulae |  |
| Planetary system | 2 | 9 |  | 1 |  |  |  |
| Star System | 2 | 9 |  | 1 |  |  |  |
| Advanced Camera for Surveys | 10 | 8 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/solar/hubinst.html |
| Ara | 10 | 8 | Britannica | 1 | 1 |  | https://www.britannica.com/place/Ara-constellation |
| Full Moon | 9 | 8 |  | 0 |  | full-moon |  |
| Hubble Space Telescope | 9 | 8 |  | 1 | 4 | hubble-space-telescope |  |
| Space | 9 | 8 | Astro4Edu,NED | 2 | 4 |  | https://astro4edu.org/resources/glossary/term/319/ |
| Spicule | 9 | 8 | Britannica,NED | 2 |  |  | https://www.britannica.com/science/spicule-solar-feature |
| A-type Star | 8 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Adiabatic Demagnetization | 8 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Akari | 8 | 8 | Britannica | 1 |  |  | https://www.britannica.com/topic/Akari |
| Alcor | 8 | 8 | Britannica | 1 |  |  | https://www.britannica.com/place/Alcor |
| Am Stars | 8 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Apex | 8 | 8 | NED | 1 | 1 | apex | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Apollo Asteroid | 8 | 8 | NED | 1 |  | apollo-asteroids | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Aquila (constellation) | 8 | 8 | Britannica | 1 |  |  | https://www.britannica.com/place/Aquila-constellation |
| Aries | 8 | 8 | Astro4Edu,Britannica | 2 |  |  | https://www.britannica.com/place/Aries |
| Avalanche | 8 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| B Star | 8 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_B.html |
| Back Focal Length | 8 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_B.html |
| Speed of Light | 8 | 8 |  | 0 |  | speed-of-light |  |
| AI Velorum Stars | 7 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_V.html#V26 |
| Antalgol Star | 7 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Antimatter | 7 | 8 | Astro4Edu,HyperPhysics,NED | 3 |  |  | https://astro4edu.org/resources/glossary/term/12/ |
| Aperture | 7 | 8 | NED | 1 | 1 | aperture | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Aurigae Stars | 7 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Cataclysmic Variable | 7 | 8 |  | 1 | 3 | cataclysmic-variable |  |
| Electromagnetic Force | 7 | 8 | Astro4Edu,HyperPhysics,NED | 3 |  |  | https://astro4edu.org/resources/glossary/term/95/ |
| Europa (moon) | 7 | 8 | Britannica,HyperPhysics | 2 | 1 |  | https://www.britannica.com/place/Europa-satellite-of-Jupiter |
| Fermi Level | 7 | 8 | HyperPhysics,NED | 2 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/solids/fermi.html |
| Fermi Statistics | 7 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_F.html |
| Fermi's Question | 7 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_F.html#F34 |
| Fermi-Dirac Statistics | 7 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_F.html#F27 |
| Fermi-Dirac statistics | 7 | 8 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/quantum/disfd.html |
| Fermilab | 7 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_F.html#F31 |
| Fermion | 7 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_F.html |
| Fermium | 7 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_F.html |
| Galileo (spacecraft) | 7 | 8 | Britannica | 1 |  |  | https://www.britannica.com/topic/Galileo-spacecraft |
| Newton's Laws of Motion | 7 | 8 | Astro4Edu,Britannica,NED | 3 |  |  | https://www.britannica.com/science/Newtons-laws-of-motion |
| Ursa Minor Dwarf Galaxy | 7 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_U.html#U32 |
| UV Ceti Stars | 7 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| van Biesbroeck's Star | 7 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_V.html#V5 |
| van Maanen's Star | 7 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_V.html#V7 |
| Vela Pulsar | 7 | 8 | NED | 1 | 1 |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_V.html#V15 |
| VV Cephei Stars | 7 | 8 | NED | 1 | 1 |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| W Ursae Majoris Stars | 7 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_U.html#U30 |
| W Virginis Star | 7 | 8 | NED | 1 |  | w-virginis-stars | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_W.html#54 |
| Wide Field and Planetary Camera | 7 | 8 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/solar/wfpc.html |
| YY Ori stars | 7 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_Y.html |
| 4 Vesta | 6 | 8 | Britannica,NED | 2 |  |  | https://www.britannica.com/place/Vesta-asteroid |
| Altair | 6 | 8 | Britannica,NED | 2 |  |  | https://www.britannica.com/place/Altair-star |
| Bernoulli's Theorem | 6 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_B.html |
| Callisto (moon) | 6 | 8 | Britannica,NED | 2 |  |  | https://www.britannica.com/place/Callisto-satellite-of-Jupiter |
| Concordance Model | 6 | 8 |  | 1 | 4 | concordance-model |  |
| Cosmic Censorship Conjecture | 6 | 8 |  | 1 | 2 | cosmic-censorship-conjecture |  |
| Cosmology | 6 | 8 | Astro4Edu,Britannica,HyperPhysics | 3 | 10 | cosmology | https://www.britannica.com/science/cosmology-astronomy |
| Density | 6 | 8 | Astro4Edu,HyperPhysics,NED | 3 | 6 | density | https://astro4edu.org/resources/glossary/term/80/ |
| Eratosthenes | 6 | 8 | Britannica | 1 |  |  | https://www.britannica.com/biography/Eratosthenes |
| Eris (dwarf planet) | 6 | 8 | Britannica | 1 |  |  | https://www.britannica.com/place/Eris-astronomy |
| Fermi Interaction | 6 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_F.html#F30 |
| GALEX | 6 | 8 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/solar/galex.html |
| General Theory of Relativity | 6 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_G.html |
| Great Red Spot | 6 | 8 | Astro4Edu,Britannica,NED | 3 |  |  | https://www.britannica.com/place/Great-Red-Spot |
| Harmonic | 6 | 8 |  | 1 | 1 | harmonic |  |
| Haumea | 6 | 8 | Britannica | 1 |  |  | https://www.britannica.com/place/Haumea |
| Keck | 6 | 8 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/solar/palomar.html |
| Makemake | 6 | 8 | Britannica | 1 |  |  | https://www.britannica.com/place/Makemake |
| Neutrino | 6 | 8 | Astro4Edu,HyperPhysics,NED | 3 |  |  | https://astro4edu.org/resources/glossary/term/461/ |
| Photoelectric Effect | 6 | 8 | Astro4Edu,HyperPhysics,NED | 3 |  |  | https://astro4edu.org/resources/glossary/term/248/ |
| Planck's Constant | 6 | 8 |  | 0 |  | planck%27s-constant |  |
| Si Units | 6 | 8 |  | 1 | 5 | si-units |  |
| Solar Flare | 6 | 8 |  | 1 | 5 | solar-flare |  |
| Sunspot | 6 | 8 | Astro4Edu,Britannica,NED | 3 | 2 |  | https://www.britannica.com/science/sunspot |
| Yellow Dwarf | 6 | 8 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/502/ |
| Yellow Giant | 6 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_Y.html#Y5 |
| Zenith | 6 | 8 | Astro4Edu,Britannica,NED | 3 | 1 | zenith | https://www.britannica.com/science/zenith-astronomy |
| Accretion disk | 5 | 8 | Astro4Edu,Britannica,NED | 3 |  |  | https://www.britannica.com/science/accretion-disk |
| Bandpass | 5 | 8 |  | 1 | 2 | bandpass |  |
| Circinus | 5 | 8 | Britannica | 1 |  |  | https://www.britannica.com/topic/Circinus |
| Circular polarization | 5 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Clock Frequency | 5 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Coherent Scattering | 5 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Columba | 5 | 8 | Britannica | 1 |  |  | https://www.britannica.com/place/Columba-constellation |
| Coma | 5 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Cometary Coma | 5 | 8 | Astro4Edu | 1 | 1 | cometary-coma | https://astro4edu.org/resources/glossary/term/61/ |
| Compton Wavelength | 5 | 8 | HyperPhysics,NED | 2 | 3 |  | https://hyperphysics.phy-astr.gsu.edu/hbase/quantum/compton.html |
| Conservative Scattering | 5 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Coronagraph | 5 | 8 | Britannica,NED | 2 |  |  | https://www.britannica.com/science/coronagraph |
| Coronal Hole | 5 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Corvus (constellation) | 5 | 8 | Britannica | 1 |  |  | https://www.britannica.com/place/Corvus-constellation |
| Crab Nebula (M1) | 5 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| cross section, scattering | 5 | 8 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/nuclear/crosec.html |
| Cygnus (constellation) | 5 | 8 | Britannica | 1 |  |  | https://www.britannica.com/place/Cygnus-constellation |
| de Broglie Wavelength | 5 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_D.html |
| Deceleration Parameter | 5 | 8 | NED | 1 |  | deceleration-parameter | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_D.html |
| Delphinus | 5 | 8 | Britannica | 1 |  |  | https://www.britannica.com/place/Delphinus-constellation |
| Gamma-Ray burst | 5 | 8 |  | 1 | 4 | gamma-ray-burst |  |
| Ganymede (moon) | 5 | 8 | Britannica | 1 | 1 |  | https://www.britannica.com/place/Ganymede-satellite-of-Jupiter |
| Gravitational Radiation | 5 | 8 | NED | 1 |  | gravitational-radiation | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_G.html |
| Interference | 5 | 8 |  | 0 |  |  |  |
| International Gamma-Ray Astrophysics Laboratory | 5 | 8 | Britannica | 1 |  |  | https://www.britannica.com/topic/International-Gamma-Ray-Astrophysics-Laboratory |
| International Ultraviolet Explorer | 5 | 8 | Britannica | 1 |  |  | https://www.britannica.com/topic/International-Ultraviolet-Explorer |
| Io (moon) | 5 | 8 | Astro4Edu,Britannica,NED | 3 | 55 |  | https://www.britannica.com/place/Io-satellite-of-Jupiter |
| Large-Scale Structure | 5 | 8 |  | 1 | 4 | large-scale-structure |  |
| Light Curve | 5 | 8 | Astro4Edu,Britannica,NED | 3 |  |  | https://www.britannica.com/science/light-curve |
| RS CVn Stars | 5 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| Semi Convection | 5 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Solar Constant | 5 | 8 | Astro4Edu,Britannica,NED | 3 |  |  | https://www.britannica.com/science/solar-constant |
| Spectral Classification | 5 | 8 | NED | 1 | 10 | spectral-classification | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Spectroscopic Binaries | 5 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Spiral Arm | 5 | 8 |  | 1 | 2 | spiral-arm |  |
| Starburst Galaxy | 5 | 8 |  | 0 |  | starburst-galaxy |  |
| Visible Spectrum | 5 | 8 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/378/ |
| Zel'dovich Spectrum | 5 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_Z.html#Z6 |
| B-type Emission Line Stars | 4 | 8 |  | 0 |  |  |  |
| Chandrasekhar limit | 4 | 8 | Britannica,HyperPhysics,NED | 3 | 1 | chandrasekhar-limit | https://www.britannica.com/science/Chandrasekhar-limit |
| conservation of baryon number | 4 | 8 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/particles/parint.html |
| Convection | 4 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Copernican Revolution | 4 | 8 | Astro4Edu,Britannica,NED | 3 |  |  | https://www.britannica.com/topic/Copernican-Revolution |
| Core Collapse Supernovae | 4 | 8 |  | 0 |  | core-collapse-supernovae |  |
| Cosmological Redshift | 4 | 8 |  | 0 |  | cosmological-redshift |  |
| Deneb | 4 | 8 | Britannica,HyperPhysics,NED | 3 |  |  | https://www.britannica.com/place/Deneb |
| Doppler effect | 4 | 8 | Astro4Edu,HyperPhysics,NED | 3 |  |  | https://astro4edu.org/resources/glossary/term/84/ |
| Dual Resonance Theory | 4 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_D.html |
| Equivalence principle | 4 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_E.html |
| Fermi Gamma-Ray Space Telescope | 4 | 8 | Britannica | 1 |  |  | https://www.britannica.com/topic/Fermi-Gamma-ray-Space-Telescope |
| Field Curvature | 4 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_F.html#F39 |
| Field Lens | 4 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_F.html |
| Flat Field | 4 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_F.html |
| Gravitational Force | 4 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_G.html |
| Gravitational Redshift | 4 | 8 |  | 0 |  | gravitational-redshift |  |
| Image Spectrometers | 4 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_I.html |
| Inverse Square Law | 4 | 8 | HyperPhysics,NED | 2 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/forces/isq.html |
| Laser Interferometer Space Antenna | 4 | 8 | Britannica | 1 |  |  | https://www.britannica.com/topic/Laser-Interferometer-Space-Antenna |
| Main Sequence Lifetime | 4 | 8 |  | 0 |  | main-sequence-lifetime |  |
| Mirror Symmetry | 4 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_M.html |
| nuclear reaction cross section | 4 | 8 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/nuclear/nucrea.html |
| Occultation | 4 | 8 | Astro4Edu,Britannica,NED | 3 |  |  | https://www.britannica.com/science/occultation |
| Pollux (star) | 4 | 8 | Britannica | 1 | 1 |  | https://www.britannica.com/place/Pollux-star |
| PSR 1257+12 | 4 | 8 | Britannica | 1 |  |  | https://www.britannica.com/place/PSR-1257-12 |
| Radio telescope | 4 | 8 | Astro4Edu,Britannica,NED | 3 |  |  | https://www.britannica.com/science/radio-telescope |
| Refractor | 4 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| Right ascension | 4 | 8 | Britannica,HyperPhysics,NED | 3 |  | right-ascension | https://www.britannica.com/science/right-ascension |
| Rotation | 4 | 8 | Astro4Edu,HyperPhysics,NED | 3 |  |  | https://astro4edu.org/resources/glossary/term/473/ |
| Runaway Stars | 4 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| Saha Equation | 4 | 8 | Britannica,NED | 2 |  |  | https://www.britannica.com/science/Saha-equation |
| Salpeter Function | 4 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Secondary Mirror | 4 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Semi-Forbidden Lines | 4 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Semi-Minor Axis | 4 | 8 | NED | 1 |  | semi-minor-axis | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Small Magellanic Cloud (SMC) | 4 | 8 | Astro4Edu | 1 |  | small-magellanic-cloud | https://astro4edu.org/resources/glossary/term/500/ |
| Solid Angle | 4 | 8 | NED | 1 |  | solid-angle | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| South Atlantic Anomaly | 4 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Speckle Interferometry | 4 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Spectrum Variables | 4 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Synchrotron Radiation | 4 | 8 | Britannica,HyperPhysics,NED | 3 |  |  | https://www.britannica.com/science/synchrotron-radiation |
| Type Ia Supernova | 4 | 8 |  | HyperPhysics |  | type-ia-supernova | https://hyperphysics.phy-astr.gsu.edu/hbase/astro/snovcn.html |
| Type II Supernova | 4 | 8 |  | 0 |  | type-ii-supernova |  |
| Ultra Deep Field | 4 | 8 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/astro/deepfield.html |
| Very Large Array | 4 | 8 | Britannica,HyperPhysics,NED | 3 |  |  | https://www.britannica.com/topic/Very-Large-Array |
| X-Ray Binary | 4 | 8 |  | 0 |  | x-ray-binary |  |
| Zodiacal light | 4 | 8 | Astro4Edu,Britannica,NED | 3 |  | zodiacal-light | https://www.britannica.com/science/zodiacal-light |
| Balmer Break | 3 | 8 |  | 0 |  |  |  |
| Beta Crucis | 3 | 8 | Britannica | 1 |  |  | https://www.britannica.com/place/Beta-Crucis |
| Beta Pictoris | 3 | 8 | Britannica | 1 |  |  | https://www.britannica.com/place/Beta-Pictoris |
| Boltzmann Factor | 3 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_B.html |
| Escape velocity | 3 | 8 | Astro4Edu,HyperPhysics,NED | 3 |  |  | https://astro4edu.org/resources/glossary/term/105/ |
| Galaxy Mass Function | 3 | 8 |  | 0 |  |  |  |
| Galilean Telescope | 3 | 8 | Astro4Edu,Britannica,NED | 3 |  |  | https://www.britannica.com/science/Galilean-telescope |
| Hale Telescope | 3 | 8 | Britannica | 1 |  |  | https://www.britannica.com/topic/Hale-Telescope |
| Halo Mass Function | 3 | 8 |  | 0 |  |  |  |
| Herbig Haro Object | 3 | 8 | NED | 1 |  | herbig-haro-object | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_H.html |
| Hysteresis | 3 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_Q.html |
| Infrared astronomy | 3 | 8 | Astro4Edu,Britannica,NED | 3 | 6 |  | https://www.britannica.com/science/infrared-astronomy |
| Meteorite | 3 | 8 | Astro4Edu,Britannica,NED | 3 | 16 | meteorite | https://www.britannica.com/science/meteorite |
| Opposition | 3 | 8 | Astro4Edu,Britannica,NED | 3 |  | opposition | https://www.britannica.com/science/opposition-astronomy |
| Photosphere | 3 | 8 | Astro4Edu,Britannica,NED | 3 | 1 | photosphere | https://www.britannica.com/science/photosphere |
| Pictor | 3 | 8 | Britannica | 1 |  |  | https://www.britannica.com/place/Pictor |
| Population II Stars | 3 | 8 |  | 0 |  | population-ii |  |
| Population III Stars | 3 | 8 |  | 0 |  | population-iii |  |
| Proton Proton Chain | 3 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Proton Proton Fusion | 3 | 8 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/astro/procyc.html |
| Quantum Efficiency | 3 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_Q.html#Q15 |
| Radio | 3 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| Radio Waves | 3 | 8 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/274/ |
| Roche limit | 3 | 8 | Astro4Edu,Britannica,NED | 3 |  |  | https://www.britannica.com/science/Roche-limit |
| S Doradus | 3 | 8 | Britannica,NED | 2 |  |  | https://www.britannica.com/place/S-Doradus |
| Scattering Matrix | 3 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Stellar Mass Function | 3 | 8 |  | 0 |  |  |  |
| Supernova remnant | 3 | 8 | Astro4Edu,Britannica,NED | 3 | 1 | supernova-remnant | https://www.britannica.com/science/supernova-remnant |
| Type Ib Supernova| 3 | 8 |  | 0 |  | supernova-type-ib |  |
| Temperature | 3 | 8 | Astro4Edu,HyperPhysics,NED | 3 | 1 |  | https://astro4edu.org/resources/glossary/term/353/ |
| Type Ia Supernova Explosion Mechanism | 3 | 8 |  | 0 |  | type-ia-supernova-explosion-mechanism |  |
| Type Ia Supernova Light Curves | 3 | 8 |  | 0 |  | type-ia-supernova-light-curves |  |
| Type Ia Supernova Progenitors | 3 | 8 |  | 0 |  | type-ia-supernova-progenitors |  |
| Type Ib Supernova Spectra | 3 | 8 |  | 0 |  | type-ib-supernova-spectra |  |
| Type Ic Supernova | 3 | 8 |  | 0 |  | type-ic-supernova |  |
| Type II Supernova Light Curves | 3 | 8 |  | 0 |  | type-ii-supernova-light-curves |  |
| Type IIn Supernova | 3 | 8 |  | 0 |  | type-iin-supernova |  |
| White Hole | 3 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_W.html |
| X-ray astronomy | 3 | 8 | Astro4Edu,Britannica,NED | 3 |  |  | https://www.britannica.com/science/X-ray-astronomy |
| Diurnal Motion | 2 | 8 | Astro4Edu,Britannica,NED | 3 |  | diurnal-motion | https://www.britannica.com/science/diurnal-motion |
| Equation of State | 2 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_E.html |
| Equation of time | 2 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_E.html |
| Hickson Compact Groups | 2 | 8 |  | 1 | 1 | hickson-compact-groups |  |
| Homocentric Sphere Model | 2 | 8 |  | 1 | 1 | homocentric-sphere-model |  |
| Perihelion | 2 | 8 | Astro4Edu,Britannica,NED | 3 |  | perihelion | https://www.britannica.com/science/perihelion |
| Praesepe | 2 | 8 | Britannica,NED | 2 |  |  | https://www.britannica.com/place/Praesepe |
| Precession | 2 | 8 | Astro4Edu,HyperPhysics,NED | 3 | 8 |  | https://astro4edu.org/resources/glossary/term/498/ |
| Quadrature | 2 | 8 | Britannica,NED | 2 |  |  | https://www.britannica.com/science/quadrature-astronomy |
| Quasi Stellar Radio Source | 2 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_Q.html#Q34 |
| Refraction | 2 | 8 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/282/ |
| Sagitta | 2 | 8 | Britannica | 1 |  |  | https://www.britannica.com/place/Sagitta-constellation |
| Density Wave Theory | 1 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_D.html |
| Exclusion Principle | 1 | 8 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_E.html |
| Baryons | 8 | 7 |  | 1 | 2 | baryons |  |
| Monoceros | 8 | 7 | Britannica | 1 |  |  | https://www.britannica.com/place/Monoceros-astronomy |
| Strong Force | 8 | 7 | HyperPhysics,NED | 2 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/forces/funfor.html |
| Titan (moon) | 8 | 7 | Astro4Edu,Britannica,HyperPhysics,NED | 4 |  |  | https://www.britannica.com/place/Titan-astronomy |
| AB Magnitude System | 7 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Achromatic Objective | 7 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Alpha Crucis | 7 | 7 | Britannica | 1 |  |  | https://www.britannica.com/place/Alpha-Crucis |
| Altitude | 7 | 7 | Astro4Edu,NED | 2 |  | altitude | https://astro4edu.org/resources/glossary/term/6/ |
| Amplitude | 7 | 7 | NED | 1 |  | amplitude | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Anastigmastic Lens | 7 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| angular velocity | 7 | 7 | HyperPhysics | 1 |  | angular-velocity | https://hyperphysics.phy-astr.gsu.edu/hbase/rotq.html |
| Anomalistic Year | 7 | 7 | NED | 1 | 1 | anomalistic-year | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Antikythera mechanism | 7 | 7 | Britannica | 1 |  |  | https://www.britannica.com/topic/Antikythera-mechanism |
| Arcminute | 7 | 7 | NED | 1 | 1 | arcminute | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Arcsecond | 7 | 7 | NED | 1 |  | arcsecond | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Arecibo | 7 | 7 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/solar/aricebo.html |
| Artemis (program) | 7 | 7 | Britannica | 1 |  |  | https://www.britannica.com/topic/Artemis-program |
| Astrometric Binaries | 7 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Baade's Window | 7 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_B.html |
| Chandra | 7 | 7 | HyperPhysics,NED | 2 | 1 |  | https://hyperphysics.phy-astr.gsu.edu/hbase/solar/chandra.html |
| Chandrayaan | 7 | 7 | Britannica | 1 |  |  | https://www.britannica.com/technology/Chandrayaan |
| electromagnetic energy | 7 | 7 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/astro/engrad.html |
| Electromagnetic Radiation | 7 | 7 | Astro4Edu,NED | 2 |  | electromagnetic-radiation | https://astro4edu.org/resources/glossary/term/96/ |
| Electromagnetic Wave | 7 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_E.html |
| Electromagnetism | 7 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_E.html |
| Electron | 7 | 7 |  | 0 |  | electron |  |
| Fermi Gas | 7 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_F.html#F29 |
| Hobby Eberly Telescope | 7 | 7 | Britannica | 1 |  |  | https://www.britannica.com/topic/Hobby-Eberly-Telescope |
| Knock On Spectrum | 7 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_K.html#K50 |
| Machos | 7 | 7 |  | 1 | 1 | machos |  |
| Newtons First Law of Motion | 7 | 7 |  | 0 |  | newton%27s-first-law-of-motion |  |
| Newtons Second Law of Motion | 7 | 7 |  | 0 |  | newton%27s-second-law-of-motion |  |
| Newtons Third Law of Motion | 7 | 7 |  | 0 |  | newton%27s-third-law-of-motion |  |
| Newton's Laws | 7 | 7 | HyperPhysics,NED | 2 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/newt.html |
| Oxygen | 7 | 7 |  | 0 |  | oxygen |  |
| Thermodynamics Laws | 7 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_T.html#T42 |
| Autumnal Equinox | 6 | 7 |  | 0 |  | autumnal-equinox |  |
| Bernoulli Effect | 6 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_B.html |
| Bernoulli Probability | 6 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_B.html |
| Big Dipper | 6 | 7 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/39/ |
| Blackbody Radiation | 6 | 7 |  | 0 |  | blackbody-radiation |  |
| Centre of the Milky Way | 6 | 7 |  | 0 |  | centre-of-the-milky-way |  |
| cosmic neutrino background | 6 | 7 | Britannica | 1 |  |  | https://www.britannica.com/science/cosmic-neutrino-background |
| Cosmic Strings | 6 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Cosmic Year | 6 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| de Sitter Universe | 6 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_D.html |
| Degree (Angular) | 6 | 7 |  | 0 |  | degree-%28angular%29 |  |
| Second (Angular) | 6 | 7 |  | 0 |  |   |  |
| Minute (Angular) | 6 | 7 |  | 0 |  |  |  |
| Deuterium | 6 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_D.html |
| Displacement | 6 | 7 | NED | 1 |  | displacement | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_D.html |
| Doppler Shift | 6 | 7 |  | 1 | 3 | doppler-shift |  |
| Einstein-de Sitter Cosmology | 6 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_E.html |
| Fermi Constant | 6 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_F.html |
| Galactic Center | 6 | 7 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/116/ |
| Hawking radiation | 6 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_H.html |
| heliopause | 6 | 7 | Britannica | 1 |  |  | https://www.britannica.com/science/heliopause |
| James Webb Space Telescope | 6 | 7 | Britannica,HyperPhysics | 2 |  |  | https://www.britannica.com/topic/James-Webb-Space-Telescope |
| Lense Thirring Effect | 6 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_L.html |
| Mean Free Path | 6 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_M.html |
| N-body Simulations | 6 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_N.html |
| Newton's Universal Theory of Gravity | 6 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_N.html |
| North Polar Spur | 6 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_N.html |
| nuclear fusion | 6 | 7 | Astro4Edu,HyperPhysics,NED | 3 | 2 |  | https://astro4edu.org/resources/glossary/term/221/ |
| Opacity | 6 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_O.html#O33 |
| Packing Fraction | 6 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Pair Annihilation | 6 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Paschen-Back Effect | 6 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Perfect Gas | 6 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Planck Time | 6 | 7 | HyperPhysics,NED | 2 | 1 | planck-time | https://hyperphysics.phy-astr.gsu.edu/hbase/astro/planck.html |
| Ptolemy | 6 | 7 | Britannica | 1 | 1 |  | https://www.britannica.com/biography/Ptolemy |
| SETI | 6 | 7 | Britannica,NED | 2 | 3 | seti | https://www.britannica.com/event/SETI |
| Space exploration | 6 | 7 | Britannica | 1 |  |  | https://www.britannica.com/science/space-exploration |
| Space Time | 6 | 7 | Britannica,NED | 2 | 3 |  | https://www.britannica.com/science/space-time |
| Supergravity | 6 | 7 | Britannica,NED | 2 |  |  | https://www.britannica.com/science/supergravity |
| Surface Gravity | 6 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| The Little Dipper | 6 | 7 | Britannica | 1 |  |  | https://www.britannica.com/topic/Little-Dipper |
| Tropic of Capricorn | 6 | 7 | Astro4Edu | 1 |  | tropic-of-capricorn | https://astro4edu.org/resources/glossary/term/494/ |
| Wavelength | 6 | 7 |  | 0 |  | wavelength |  |
| Ablation | 5 | 7 | NED | 1 |  | ablation | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Absolute Luminosity | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Absolute magnitude | 5 | 7 | Astro4Edu,NED | 2 | 1 | absolute-magnitude | https://astro4edu.org/resources/glossary/term/2/ |
| Absolute Temperature | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Absorption of Radiation | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Accretion | 5 | 7 | Astro4Edu,NED | 2 |  |  | https://astro4edu.org/resources/glossary/term/425/ |
| Accumulation Theory | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Actinic Radiation | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Active Optics | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Adaptive Optics | 5 | 7 | Astro4Edu,NED | 2 |  |  | https://astro4edu.org/resources/glossary/term/427/ |
| Advance of the Perihelion | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Advection | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Airy Disk | 5 | 7 |  | 1 | 1 | airy-disk |  |
| Albedo | 5 | 7 | HyperPhysics,NED | 2 | 2 | albedo | https://hyperphysics.phy-astr.gsu.edu/hbase/phyopt/albedo.html |
| Aldebaran | 5 | 7 | Britannica,NED | 2 |  |  | https://www.britannica.com/place/Aldebaran |
| Allende meteorite | 5 | 7 | Britannica | 1 |  |  | https://www.britannica.com/science/Allende-meteorite |
| Almagest | 5 | 7 | Britannica,NED | 2 | 1 |  | https://www.britannica.com/topic/Almagest |
| Anamorphic Magnification | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Angular Acceleration | 5 | 7 | HyperPhysics,NED | 2 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/rotq.html |
| Angular diameter | 5 | 7 | Astro4Edu | 1 |  | angular-diameter | https://astro4edu.org/resources/glossary/term/9/ |
| Angular Frequency | 5 | 7 | NED | 1 |  | angular-frequency | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Angular Momentum | 5 | 7 | HyperPhysics,NED | 2 |  | angular-momentum | https://hyperphysics.phy-astr.gsu.edu/hbase/amom.html |
| Angular resolution | 5 | 7 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/284/ |
| Annihilation | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Annual Aberration | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html#aa |
| Annual Variation | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Antapex | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Antares | 5 | 7 | Britannica,NED | 2 |  |  | https://www.britannica.com/place/Antares-star |
| Antenna Temperature | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Anti Reflection Coating | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| AO Cassiopeiae | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Apodization | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Apparition | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Aristarchus of Samos | 5 | 7 | Britannica | 1 |  |  | https://www.britannica.com/biography/Aristarchus-of-Samos |
| Astration | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Astrochemistry | 5 | 7 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/21/ |
| Astronomer | 5 | 7 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/24/ |
| Astronomical Survey | 5 | 7 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/529/ |
| Astronomical Twilight | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Atmosphere | 5 | 7 | Astro4Edu,NED | 2 | 8 |  | https://astro4edu.org/resources/glossary/term/29/ |
| Atmospheric Dispersion Corrector | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Atmospheric Extinction | 5 | 7 | Astro4Edu,NED | 2 |  |  | https://astro4edu.org/resources/glossary/term/30/ |
| Atomic Mass Number | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Atomic Mass Unit | 5 | 7 | HyperPhysics,NED | 2 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/nuclear/nucuni.html |
| Atomic Number | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Atomic spectra | 5 | 7 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/quantum/atspect.html |
| Axion | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Background Count | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_B.html |
| Background radiation | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_B.html |
| Baily's Beads | 5 | 7 | Britannica,NED | 2 |  |  | https://www.britannica.com/science/Bailys-beads |
| Barnard's Star | 5 | 7 | Britannica,HyperPhysics,NED | 3 |  |  | https://www.britannica.com/place/Barnards-star |
| Bolide | 5 | 7 | NED | 1 |  | bolide | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_B.html |
| Boltzmann Constant | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_B.html |
| Bremsstrahlung | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_B.html |
| Bremsstrahlung Radiation | 5 | 7 |  | 0 |  | bremsstrahlung-radiation |  |
| Centre of Mass | 5 | 7 |  | 0 |  | centre-of-mass |  |
| Chaotic Inflation | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Chromatic Aberration | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Collimate | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Coronal mass ejection | 5 | 7 | Britannica | 1 | 1 |  | https://www.britannica.com/science/coronal-mass-ejection |
| Cosmological constant | 5 | 7 | Britannica,HyperPhysics | 2 | 1 |  | https://www.britannica.com/science/cosmological-constant |
| Coudé Focus | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Dielectronic Recombination | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_D.html |
| Einstein velocity addition | 5 | 7 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/relativ/einvel.html |
| Element | 5 | 7 | NED | 1 | 4 | element | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_E.html |
| Equuleus | 5 | 7 | Britannica | 1 |  |  | https://www.britannica.com/topic/Equuleus |
| Event | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_E.html |
| Flash Spectrum | 5 | 7 | Britannica,NED | 2 |  |  | https://www.britannica.com/science/flash-spectrum |
| Fraction of power in a wavelength range. | 5 | 7 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/quantum/radfrac.html |
| Frequency | 5 | 7 | Astro4Edu,NED | 2 | 4 | frequency | https://astro4edu.org/resources/glossary/term/112/ |
| Fusion | 5 | 7 | Astro4Edu,HyperPhysics,NED | 3 |  |  | https://astro4edu.org/resources/glossary/term/114/ |
| Gacrux | 5 | 7 | Britannica | 1 |  |  | https://www.britannica.com/topic/Gacrux |
| Galactic Anti Centre | 5 | 7 |  | 1 | 1 | galactic-anti-centre |  |
| Gemini (constellation) | 5 | 7 | Astro4Edu,Britannica | 2 | 1 |  | https://www.britannica.com/place/Gemini-constellation-and-astrological-sign |
| Gravitation | 5 | 7 | NED | 1 | 2 |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_G.html |
| Gravity Darkening | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_G.html |
| Gravity Probe A | 5 | 7 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/solar/gravprobA.html |
| Great Looped Nebula | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_G.html |
| Great Year | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_G.html |
| Halo Stars | 5 | 7 | NED | 1 |  | halo | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_H.html |
| Harvard Classification | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_H.html |
| harvest moon | 5 | 7 | Britannica | 1 |  |  | https://www.britannica.com/topic/harvest-moon-full-moon |
| Helium Abundance | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_H.html |
| Helium Burning | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_H.html |
| Herschel Infrared Observatory | 5 | 7 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/solar/herschel.html |
| Horologium | 5 | 7 | Britannica | 1 |  |  | https://www.britannica.com/topic/Horologium |
| Hourglass Nebula | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_H.html |
| Hydromagnetics | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_H.html |
| Iapetus (moon) | 5 | 7 | Britannica,NED | 2 |  |  | https://www.britannica.com/topic/Iapetus-astronomy |
| Impact event | 5 | 7 | Britannica | 1 |  |  | https://www.britannica.com/topic/impact-event |
| Inflation | 5 | 7 | NED | 1 | 2 |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_I.html |
| ISO | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_I.html |
| Julian Calendar | 5 | 7 | NED | 1 | 1 | julian-calendar | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_J.html#J19 |
| Kapteyn Universe | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_K.html#K17 |
| Keyhole Nebula | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_K.html#K32 |
| Las Campanas Observatory | 5 | 7 | Britannica | 1 |  |  | https://www.britannica.com/topic/Las-Campanas-Observatory |
| LBG | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_L.html |
| Lens | 5 | 7 | Astro4Edu | 1 | 1 |  | https://astro4edu.org/resources/glossary/term/451/ |
| Leo (constellation) | 5 | 7 | Astro4Edu,Britannica | 2 | 2 |  | https://www.britannica.com/place/Leo-constellation |
| Light Cylinder | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_L.html |
| Light Year | 5 | 7 |  | 0 |  | light-year |  |
| LIGO | 5 | 7 | NED | 1 | 1 | ligo | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_L.html |
| Longitude | 5 | 7 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/179/ |
| Magnetic Bremsstrahlung | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_M.html |
| Magneton | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_M.html |
| Messier object | 5 | 7 | Astro4Edu | 1 | 1 |  | https://astro4edu.org/resources/glossary/term/194/ |
| Near Earth Asteroids | 5 | 7 |  | 0 |  | near-earth-asteroids |  |
| Node | 5 | 7 | Britannica,NED | 2 | 3 |  | https://www.britannica.com/science/node-astronomy |
| Nuclear Density | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_N.html |
| Nuclide | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_N.html |
| Objective Prism | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_O.html#O12 |
| Oort's Constants | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_O.html#O31 |
| Orbital Magnetic Moment | 5 | 7 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/quantum/orbmag.html |
| Order of Magnitude | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_O.html |
| Peculiar Velocity | 5 | 7 | NED | 1 |  | peculiar-velocity | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Planck Constant | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Planetary Aberration | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html#ap |
| Potentially Hazardous Asteroids | 5 | 7 |  | 0 |  | potentially-hazardous-asteroids |  |
| Proxima Centauri | 5 | 7 | Astro4Edu,Britannica,NED | 3 |  |  | https://www.britannica.com/science/Proxima-Centauri |
| Red dwarf | 5 | 7 | Astro4Edu,NED | 2 |  | red-dwarf | https://astro4edu.org/resources/glossary/term/276/ |
| Regulus | 5 | 7 | Britannica | 1 | 1 |  | https://www.britannica.com/place/Regulus-star |
| Roche Lobe | 5 | 7 |  | 1 | 1 | roche-lobe |  |
| Rosetta | 5 | 7 | Britannica | 1 |  |  | https://www.britannica.com/topic/Rosetta-European-Space-Agency-spacecraft |
| Schmidt Camera | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Sco Cen Association | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Sextans Dwarf | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| sizes of the planets | 5 | 7 | Britannica | 1 |  |  | https://www.britannica.com/science/sizes-of-the-planets-2229261 |
| Skylab | 5 | 7 | Britannica | 1 |  |  | https://www.britannica.com/topic/Skylab |
| slingshot orbit | 5 | 7 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/doubal.html |
| SOFIA | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Solar Day | 5 | 7 | Astro4Edu | 1 | 1 | solar-day | https://astro4edu.org/resources/glossary/term/309/ |
| Space Curvature | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Space Debris | 5 | 7 | Astro4Edu,Britannica | 2 |  |  | https://www.britannica.com/technology/space-debris |
| Space Station | 5 | 7 | Astro4Edu,Britannica | 2 |  |  | https://www.britannica.com/technology/space-station |
| Space Telescope | 5 | 7 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/322/ |
| Space Weather | 5 | 7 | Astro4Edu,Britannica | 2 |  |  | https://www.britannica.com/science/space-weather |
| Stefan-Boltzmann Constant | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| synthesis of the heavy elements | 5 | 7 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/astro/nucsyn.html |
| Thick Disk | 5 | 7 |  | 1 | 1 | thick-disk |  |
| Thin Disk | 5 | 7 | NED | 1 | 2 | thin-disk | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_T.html#T46 |
| Tidal locking | 5 | 7 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/484/ |
| Topocentric | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_T.html#T69 |
| ULIRG | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_U.html |
| Veil Nebula | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_V.html#V14 |
| Whirlpool Galaxy | 5 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_W.html |
| Zeeman Effect | 5 | 7 |  | 1 | 3 | zeeman-effect |  |
| Apsidal Motion | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Barred spiral galaxy | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_B.html |
| Baryogenesis | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_B.html |
| Baryon to Photon Ratio | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_B.html |
| Baryonic Acoustic Oscillations | 4 | 7 |  | 0 |  | baryonic-acoustic-oscillations |  |
| Baryonic Matter | 4 | 7 |  | 0 |  | baryonic-matter |  |
| Big Bang Nucleosynthesis | 4 | 7 | Astro4Edu,HyperPhysics | 2 | 4 |  | https://astro4edu.org/resources/glossary/term/430/ |
| Big Blue Bump | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_B.html |
| BL Lac Object | 4 | 7 | NED | 1 | 1 |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_L.html |
| Bound Free Transitions | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_B.html |
| Brans Dicke Theory | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_B.html |
| Brightness | 4 | 7 | Astro4Edu,NED | 2 | 1 |  | https://astro4edu.org/resources/glossary/term/45/ |
| Celestial | 4 | 7 |  | 0 |  | celestial |  |
| centrifugal force | 4 | 7 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/corf.html |
| centripetal force | 4 | 7 | HyperPhysics | 1 |  | centripetal-force | https://hyperphysics.phy-astr.gsu.edu/hbase/cf.html |
| Chandra X-ray Observatory | 4 | 7 | Britannica | 1 |  |  | https://www.britannica.com/topic/Chandra-X-Ray-Observatory |
| Charge Bleeding | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Chemical Composition | 4 | 7 |  | 0 |  | chemical-composition |  |
| Christoffel Symbols | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Cometary Tails | 4 | 7 |  | 0 |  | cometary-tails |  |
| Destructive Interference | 4 | 7 |  | 0 |  | destructive-interference |  |
| Differential Rotation | 4 | 7 | NED | 1 |  | differential-rotation | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_D.html |
| Diffraction | 4 | 7 | NED | 1 | 1 |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_D.html |
| Dispersion Relations | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_D.html |
| Dissociative Recombination | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_D.html |
| Doppler Broadening | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_D.html |
| Elevation | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_E.html |
| elongation | 4 | 7 | Britannica | 1 | 3 | elongation | https://www.britannica.com/science/elongation-astronomy |
| Evection | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_E.html |
| Evershed Effect | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_E.html |
| Extinction (astronomy) | 4 | 7 | Astro4Edu,NED | 2 | 1 | extinction | https://astro4edu.org/resources/glossary/term/107/ |
| Fast Radio Bursts | 4 | 7 |  | 0 |  | fast-radio-bursts |  |
| Fokker Planck Equation | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_F.html#F71 |
| Force | 4 | 7 | HyperPhysics,NED | 2 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/force.html |
| Free-Free Radiation | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_F.html#F99 |
| Fringes | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_F.html |
| fundamental forces | 4 | 7 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/forces/funfor.html |
| Galaxy cluster | 4 | 7 | Astro4Edu,NED | 2 |  |  | https://astro4edu.org/resources/glossary/term/120/ |
| Galaxy Morphology | 4 | 7 |  | 0 |  | galaxy-morphology |  |
| Galaxy Types | 4 | 7 |  | 0 |  | galaxy-types |  |
| Gemini Observatory | 4 | 7 | Britannica | 1 |  |  | https://www.britannica.com/topic/Gemini-Observatory |
| Giant | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_G.html |
| Giant Molecular Cloud | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_G.html |
| Gould Belt | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_G.html |
| Grand Unified Theory | 4 | 7 | NED | 1 | 1 |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_G.html |
| Gravitational Constant | 4 | 7 | Astro4Edu,NED | 2 |  | gravitational-constant | https://astro4edu.org/resources/glossary/term/133/ |
| Gravitational Field Lines | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_G.html |
| Gravitational Mass | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_G.html |
| Gravitational Waves | 4 | 7 | Astro4Edu,HyperPhysics,NED | 3 |  | gravitational-waves | https://astro4edu.org/resources/glossary/term/447/ |
| Grazing Incidence Telescope | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_G.html |
| H II region | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_H.html |
| Haro Galaxies | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_H.html |
| Helicity | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_H.html |
| Helmholtz Contraction | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_H.html |
| Hercules X 1 | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_H.html |
| Hidalgo | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_H.html |
| Hydrostatic equilibrium | 4 | 7 | NED | 1 |  | hydrostatic-equilibrium | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_H.html |
| ideal gas law | 4 | 7 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/kinetic/idegas.html |
| Impact Craters | 4 | 7 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/154/ |
| Infrared (IR) | 4 | 7 | Astro4Edu | 1 |  | infrared | https://astro4edu.org/resources/glossary/term/155/ |
| Infrared Astronomical Satellite | 4 | 7 | Britannica | 1 |  |  | https://www.britannica.com/topic/Infrared-Astronomical-Satellite |
| Inner Planet | 4 | 7 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/449/ |
| Insolation | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_I.html |
| Integrating Detector | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_I.html |
| Intensity | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_I.html |
| Interaction of radiation with matter | 4 | 7 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/mod3.html |
| Intercloud Gas | 4 | 7 |  | 1 | 1 | intercloud-gas |  |
| International Astronomical Union | 4 | 7 | Astro4Edu,Britannica | 2 |  |  | https://www.britannica.com/topic/International-Astronomical-Union |
| interplanetary medium | 4 | 7 | Britannica | 1 |  |  | https://www.britannica.com/science/interplanetary-medium |
| Ionisation | 4 | 7 |  | 0 |  | ionisation |  |
| Ionised Hydrogen | 4 | 7 |  | 0 |  | ionised-hydrogen |  |
| IRAF | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_I.html |
| IRAM | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_I.html |
| IRAS | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_I.html |
| Jovian Planet | 4 | 7 |  | 0 |  | jovian-planet |  |
| Karman line | 4 | 7 | Britannica | 1 |  |  | https://www.britannica.com/science/Karman-line |
| Keplerian telescope | 4 | 7 | Britannica | 1 |  |  | https://www.britannica.com/science/Keplerian-telescope |
| Kleinmann Low nebula | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_K.html#K48 |
| Libra (constellation) | 4 | 7 | Astro4Edu,Britannica | 2 |  |  | https://www.britannica.com/place/Libra-constellation |
| Libration | 4 | 7 | Britannica,NED | 2 |  |  | https://www.britannica.com/science/libration |
| Light Clock | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_L.html |
| Light Cone | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_L.html |
| Light pollution | 4 | 7 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/177/ |
| Limb Brightening | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_L.html |
| Lindblad Resonance | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_L.html |
| list of galaxies | 4 | 7 | Britannica | 1 |  |  | https://www.britannica.com/topic/list-of-galaxies-and-galaxy-clusters-2056030 |
| List of Galaxy Clusters | 4 | 7 |  | 0 |  |  |  |
| Little Red Dot | 4 | 7 |  | 0 |  |  |  |
| Local Thermodynamic Equilibrium | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_L.html |
| Lorentz force law | 4 | 7 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/magnetic/magfor.html |
| Lunation | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_L.html |
| Magnetic Monopole | 4 | 7 | NED | 1 | 1 |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_M.html |
| Magnetic Poles | 4 | 7 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/184/ |
| Magnetopause | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_M.html |
| Magnetosphere | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_M.html |
| Mass-to-Light Ratio | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_M.html |
| Meridian | 4 | 7 |  | 0 |  | meridian |  |
| Metals | 4 | 7 |  | 0 |  | metals |  |
| Mira | 4 | 7 | NED | 1 | 1 |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_M.html |
| Mira Ceti | 4 | 7 | Britannica | 1 |  |  | https://www.britannica.com/place/Mira-Ceti |
| Mira Variables | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_M.html |
| Miranda | 4 | 7 | Britannica,NED | 2 |  |  | https://www.britannica.com/place/Miranda-astronomy |
| Mirror | 4 | 7 | Astro4Edu | 1 | 1 | mirror | https://astro4edu.org/resources/glossary/term/459/ |
| Nereid | 4 | 7 | Britannica,NED | 2 |  |  | https://www.britannica.com/topic/Nereid-astronomy |
| Novae | 4 | 7 |  | 0 |  | novae |  |
| Nuclear Statistical Equilibrium | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_N.html |
| Nutation | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_N.html |
| Orbital eccentricity | 4 | 7 |  | 1 | 2 | orbital-eccentricity |  |
| Orbital Elements | 4 | 7 | NED | 1 | 4 | orbital-elements | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_O.html#O50 |
| Out Gassing | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_O.html |
| Pair production | 4 | 7 | HyperPhysics,NED | 2 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/relativ/releng.html |
| Particle horizon | 4 | 7 | Astro4Edu,NED | 2 |  |  | https://astro4edu.org/resources/glossary/term/241/ |
| Particle Physics | 4 | 7 | Astro4Edu,NED | 2 |  |  | https://astro4edu.org/resources/glossary/term/242/ |
| Particle to Antiparticle Ratio | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Perseus A | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Perseus Arm | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Photon to Baryon Ratio | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Pickering Series | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Pinwheel Galaxy | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Prime meridian | 4 | 7 | Astro4Edu,NED | 2 | 4 |  | https://astro4edu.org/resources/glossary/term/193/ |
| Protoplanetary disk | 4 | 7 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/417/ |
| Refracting telescope | 4 | 7 | Astro4Edu,NED | 2 |  |  | https://astro4edu.org/resources/glossary/term/281/ |
| ROSAT | 4 | 7 | Britannica,NED | 2 |  |  | https://www.britannica.com/topic/ROSAT |
| Rosette Nebula | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| Rossby Waves | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| Rossiter Effect | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| Rotational Transition | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| RW Aurigae | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Saturn Nebula | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Scale Height | 4 | 7 | NED | 1 |  | scale-height | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Schmidt Telescope | 4 | 7 | Britannica,NED | 2 |  |  | https://www.britannica.com/science/Schmidt-telescope |
| Schwarzschild Black Hole | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Schwarzschild Radius | 4 | 7 |  | 1 | 3 | schwarzschild-radius |  |
| Scientific Revolution | 4 | 7 | Britannica | 1 |  |  | https://www.britannica.com/science/Scientific-Revolution |
| Self Absorption | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Spectra | 4 | 7 | NED | 1 | 12 |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Spectral Line | 4 | 7 |  | 0 |  | spectral-line |  |
| Spectral Series | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Spica | 4 | 7 | Britannica,NED | 2 |  |  | https://www.britannica.com/place/Spica |
| Spin | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Spring Equinox | 4 | 7 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/406/ |
| Square Kilometre Array | 4 | 7 |  | 0 |  | square-kilometre-array |  |
| Stellar Black Hole | 4 | 7 |  | 0 |  | stellar-black-hole |  |
| Stellar population | 4 | 7 | Astro4Edu,NED | 2 |  |  | https://astro4edu.org/resources/glossary/term/336/ |
| Sublimation | 4 | 7 | NED | 1 |  | sublimation | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Synchronous Rotation | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Thermal Radiation | 4 | 7 | Astro4Edu,NED | 2 |  | thermal-radiation | https://astro4edu.org/resources/glossary/term/358/ |
| Tidal force | 4 | 7 | Astro4Edu,NED | 2 |  |  | https://astro4edu.org/resources/glossary/term/501/ |
| Transition Radiation | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_T.html#T79 |
| Transuranic Elements | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_T.html |
| ultraviolet telescope | 4 | 7 | Britannica | 1 |  |  | https://www.britannica.com/science/ultraviolet-telescope |
| Very Large Array %28VLA%29 | 4 | 7 |  | 0 |  | very-large-array-%28vla%29 |  |
| Virial Theorem | 4 | 7 |  | 0 |  | virial-theorem |  |
| Vis Viva Equation | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_V.html#V57 |
| Vlasov Maxwell Equations | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_V.html#V59 |
| Vogt Russell Theorem | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_V.html#V60 |
| von Zeipel's Theorem | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_V.html#V63 |
| Wave Particle Duality | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_W.html#15 |
| Weak (Nuclear) Force | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_W.html |
| Wien displacement law | 4 | 7 | HyperPhysics | 1 | 1 |  | https://hyperphysics.phy-astr.gsu.edu/hbase/wien.html |
| X-Ray Pulsars | 4 | 7 | NED | 1 |  | x-ray-pulsar | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_X.html#X6 |
| X-ray Telescope | 4 | 7 | Astro4Edu,Britannica | 2 |  |  | https://www.britannica.com/science/X-ray-telescope |
| Zeroth Law of Thermodynamics | 4 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_Z.html#Z13 |
| 47 Tucanae | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_T.html#T102 |
| 51 Pegasi b | 3 | 7 | Britannica | 1 |  |  | https://www.britannica.com/place/51-Pegasi-b-planet |
| ALMA | 3 | 7 |  | 0 |  | alma |  |
| Anomalous Cosmic Rays | 3 | 7 |  | 0 |  | anomalous-cosmic-rays |  |
| Anomalous X-Ray Pulsar | 3 | 7 |  | 0 |  | anomalous-x-ray-pulsar |  |
| Balmer Jump | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_B.html |
| Bars | 3 | 7 |  | 0 |  | bars |  |
| Be X-Ray Binaries | 3 | 7 |  | 0 |  | be-x-ray-binaries |  |
| Bellatrix | 3 | 7 | Britannica | 1 | 1 |  | https://www.britannica.com/place/Bellatrix |
| Binary Mass Function | 3 | 7 |  | 0 |  | binary-mass-function |  |
| Binary Pulsars | 3 | 7 |  | 0 |  | binary-pulsars |  |
| Binning | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_B.html |
| Blaze Angle | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_B.html |
| Blazed Grating | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_B.html |
| Blue Dwarf, Blue Giant | 3 | 7 |  | 1 |  |  |  |
| Blue giant | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_B.html |
| Blue Stragglers | 3 | 7 |  | 1 | 2 | blue-stragglers |  |
| Bok globule | 3 | 7 | NED | 1 |  | bok-globule | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_B.html |
| Boltzmann distribution | 3 | 7 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/quantum/disfcn.html |
| Boltzmann Saha Theory | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_B.html |
| Brackett Series | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_B.html |
| Bright Blue Variables | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_B.html |
| Bulges | 3 | 7 |  | 1 | 1 | bulges |  |
| Canis Major Dwarf | 3 | 7 |  | 0 |  | canis-major-dwarf |  |
| Carbon Burning | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Carbonaceous chondrite | 3 | 7 | Britannica | 1 | 1 |  | https://www.britannica.com/science/carbonaceous-chondrite |
| Cassegrain reflector | 3 | 7 | Britannica | 1 |  |  | https://www.britannica.com/science/Cassegrain-reflector |
| Cassiopeia (constellation) | 3 | 7 | Britannica | 1 | 1 |  | https://www.britannica.com/place/Cassiopeia-astronomy |
| Cassiopeia A | 3 | 7 | Britannica | 1 |  |  | https://www.britannica.com/place/Cassiopeia-A |
| Celestial equator | 3 | 7 | Astro4Edu,NED | 2 | 2 |  | https://astro4edu.org/resources/glossary/term/51/ |
| Celestial Meridian | 3 | 7 |  | 0 |  | celestial-meridian |  |
| Celestial pole | 3 | 7 | Astro4Edu | 1 | 2 | celestial-poles | https://astro4edu.org/resources/glossary/term/52/ |
| center of mass | 3 | 7 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/cm.html |
| Chemical Differentiation | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Chemical Enrichment | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Chemical Evolution | 3 | 7 |  | 0 |  | chemical-evolution |  |
| Cherenkov Detector | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Classical Novae | 3 | 7 |  | 0 |  | classical-novae |  |
| Cluster Environment | 3 | 7 |  | 0 |  | cluster-environment |  |
| Cometary Nucleus | 3 | 7 |  | 0 |  | cometary-nucleus |  |
| Comoving Distance | 3 | 7 |  | 1 | 1 | comoving-distance |  |
| Copernican principle | 3 | 7 | Astro4Edu,NED | 2 |  |  | https://astro4edu.org/resources/glossary/term/434/ |
| Core Collapse Progenitors | 3 | 7 |  | 0 |  | core-collapse-progenitors |  |
| Cosmic Background Explorer | 3 | 7 | Britannica | 1 |  |  | https://www.britannica.com/topic/Cosmic-Background-Explorer |
| Cosmic Microwave Background Dipole | 3 | 7 |  | 0 |  | cosmic-microwave-background-dipole |  |
| Cosmic Ray Energies | 3 | 7 |  | 0 |  | cosmic-ray-energies |  |
| Cosmic Rays | 3 | 7 |  | 1 | 1 | cosmic-rays |  |
| Dark Halo | 3 | 7 |  | 0 |  | dark-halo |  |
| Density Parameter | 3 | 7 |  | 0 |  | density-parameter |  |
| Density Wave Model | 3 | 7 |  | 0 |  | density-wave-model |  |
| Detector | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_D.html |
| Differentiated Object | 3 | 7 |  | 1 | 1 | differentiated-object |  |
| diffraction, sound | 3 | 7 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/sound/diffrac.html |
| Dissociation | 3 | 7 | NED | 1 |  | dissociation | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_D.html |
| Dorado | 3 | 7 | Britannica | 1 |  |  | https://www.britannica.com/place/Dorado-constellation |
| Dwarf Novae | 3 | 7 |  | 0 |  | dwarf-novae |  |
| Dynamical Friction | 3 | 7 | NED | 1 |  | dynamical-friction | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_D.html |
| Early Black Hole Theories | 3 | 7 |  | 0 |  | early-black-hole-theories |  |
| Effective temperature | 3 | 7 | Astro4Edu | 1 | 1 | effective-temperature | https://astro4edu.org/resources/glossary/term/440/ |
| Einstein Bose condensation | 3 | 7 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/particles/spinc.html |
| Einstein Coefficient | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_E.html |
| Einstein ring | 3 | 7 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/astro/einring.html |
| Electron Degeneracy Pressure | 3 | 7 |  | 1 | 1 | electron-degeneracy-pressure |  |
| Electron Temperature | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_E.html |
| Electron Volt | 3 | 7 | HyperPhysics | 1 | 2 | electron-volt | https://hyperphysics.phy-astr.gsu.edu/hbase/electric/ev.html |
| Electroweak Interactions | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_E.html |
| Emission | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_E.html |
| Emission Coefficient | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_E.html |
| Environments of Galaxies | 3 | 7 |  | 0 |  | environments-of-galaxies |  |
| Epoch of Recombination | 3 | 7 |  | 0 |  | epoch-of-recombination |  |
| Eros | 3 | 7 | Britannica,NED | 2 |  |  | https://www.britannica.com/topic/Eros-asteroid |
| European Southern Observatory | 3 | 7 | Britannica | 1 | 1 |  | https://www.britannica.com/topic/European-Southern-Observatory |
| Fraunhofer Lines | 3 | 7 | Britannica,NED | 2 |  |  | https://www.britannica.com/science/Fraunhofer-lines |
| Friedmann Lemaitre Universe | 3 | 7 |  | 0 |  | friedmann-lemaitre-universe |  |
| Galactic bulge | 3 | 7 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/115/ |
| Galactic Cosmic Rays | 3 | 7 |  | 0 |  | galactic-cosmic-rays |  |
| Galactic Halo | 3 | 7 | Astro4Edu,Britannica,NED | 3 |  |  | https://www.britannica.com/science/galactic-halo |
| Galactic Jets | 3 | 7 |  | 0 |  | galactic-jets |  |
| Galactic Nuclei | 3 | 7 |  | 0 |  | galactic-nuclei |  |
| Galactic Voids | 3 | 7 |  | 0 |  | galactic-voids |  |
| Galaxy Harassment | 3 | 7 |  | 0 |  | galaxy-harassment |  |
| Gamma Ray Telescope | 3 | 7 | Britannica | 1 |  |  | https://www.britannica.com/science/gamma-ray-telescope |
| Gamma-Ray astronomy | 3 | 7 | Britannica,NED | 2 |  |  | https://www.britannica.com/science/gamma-ray-astronomy |
| Gamma-Ray Burst Afterglow | 3 | 7 |  | 0 |  | gamma-ray-burst-afterglow |  |
| Gamma-Ray Burst History | 3 | 7 |  | 0 |  | gamma-ray-burst-history |  |
| Gamma-Ray Burst Mass Extinction | 3 | 7 |  | 0 |  | gamma-ray-burst-mass-extinction |  |
| Gamma-Ray Burst Progenitors | 3 | 7 |  | 0 |  | gamma-ray-burst-progenitors |  |
| Gamma-Ray Burst Types | 3 | 7 |  | 0 |  | gamma-ray-burst-types |  |
| Gaussian Gravitational Constant | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_G.html |
| Grand Design Spiral | 3 | 7 |  | 0 |  | grand-design-spiral |  |
| Gregorian Telescope | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_G.html |
| H I region | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_H.html |
| Half Light Radius | 3 | 7 |  | 0 |  | half-light-radius |  |
| Halley Type Comets | 3 | 7 |  | 0 |  | halley-type-comets |  |
| Harvard Spectral Classification | 3 | 7 |  | 0 |  | harvard-spectral-classification |  |
| Hayashi track | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_H.html |
| Helium flash | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_H.html |
| Hierarchical Merging | 3 | 7 |  | 0 |  | hierarchical-merging |  |
| High Mass X-Ray Binaries | 3 | 7 |  | 0 |  | high-mass-x-ray-binaries |  |
| High Velocity Cloud | 3 | 7 |  | 0 |  | high-velocity-cloud |  |
| HIPPARCOS | 3 | 7 | Britannica,NED | 2 |  |  | https://www.britannica.com/topic/Hipparcos |
| History of Galaxy Classification | 3 | 7 |  | 0 |  | history-of-galaxy-classification |  |
| Horizontal branch | 3 | 7 | Astro4Edu,NED | 2 |  | horizontal-branch-stars | https://astro4edu.org/resources/glossary/term/146/ |
| Horizontal Branch Star | 3 | 7 | NED | 1 |  | horizontal-branch-stars | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_H.html |
| Horizontal Coordinate System | 3 | 7 |  | 0 |  | horizontal-coordinate-system |  |
| Hubble Distance | 3 | 7 |  | 0 |  | hubble-distance |  |
| Inclination | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_I.html |
| Infrared telescope | 3 | 7 | Astro4Edu,Britannica | 2 |  |  | https://www.britannica.com/science/infrared-telescope |
| Instability strip | 3 | 7 | NED | 1 |  | instability-strip | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_I.html |
| Interstellar Absorption Lines | 3 | 7 |  | 0 |  | interstellar-absorption-lines |  |
| Interstellar Gas Cloud | 3 | 7 |  | 0 |  | interstellar-gas-cloud |  |
| Interstellar Reddening | 3 | 7 |  | 0 |  | interstellar-reddening |  |
| Intra-Cluster Medium | 3 | 7 |  | 0 |  | intra-cluster-medium |  |
| Ionization | 3 | 7 | Astro4Edu,NED | 2 |  |  | https://astro4edu.org/resources/glossary/term/160/ |
| ionization energy | 3 | 7 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/chemical/bondd.html |
| Ionization Potential | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_I.html |
| Isochrones | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_I.html |
| Isotope | 3 | 7 | Astro4Edu,NED | 2 |  | isotope | https://astro4edu.org/resources/glossary/term/165/ |
| Jeans Instability Criterion | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_J.html#J8 |
| Jeans Mass | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_J.html |
| Jupiter Family Comets | 3 | 7 |  | 0 |  | jupiter-family-comets |  |
| Keplerian Disk | 3 | 7 |  | 0 |  | keplerian-disk |  |
| Keplerian rotation curve | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_K.html#K28 |
| Kitt Peak National Observatory | 3 | 7 | Britannica | 1 |  |  | https://www.britannica.com/topic/Kitt-Peak-National-Observatory |
| Late Type Galaxies | 3 | 7 |  | 0 |  | late-type-galaxies |  |
| Limiting Magnitude | 3 | 7 |  | 0 |  | limiting-magnitude |  |
| Long Period Comets | 3 | 7 |  | 0 |  | long-period-comets |  |
| Lookback Time | 3 | 7 |  | 0 |  | lookback-time |  |
| Low Mass X-Ray Binaries | 3 | 7 |  | 0 |  | low-mass-x-ray-binaries |  |
| Low Surface Brightness Galaxy | 3 | 7 | NED | 1 |  | low-surface-brightness-galaxy | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_L.html |
| Luminosity Function | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_L.html |
| Luminous Blue Variables | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_L.html |
| Lyman Alpha | 3 | 7 | NED | 1 | 2 |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_L.html |
| Machs Principle | 3 | 7 |  | 0 |  | mach%27s-principle |  |
| Masers | 3 | 7 |  | 0 |  | masers |  |
| Mauna Kea Observatory | 3 | 7 | Britannica | 1 |  |  | https://www.britannica.com/topic/Mauna-Kea-Observatory |
| Maxwell's Theory | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_M.html |
| Millisecond Pulsar | 3 | 7 |  | 0 |  | millisecond-pulsar |  |
| Milne Eddington Approximation | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_M.html |
| Morgan Keenan Luminosity Class | 3 | 7 |  | 0 |  | morgan-keenan-luminosity-class |  |
| Morphology-Density Relation | 3 | 7 |  | 0 |  | morphology-density-relation |  |
| Mount Wilson Observatory | 3 | 7 | Britannica | 1 | 1 |  | https://www.britannica.com/topic/Mount-Wilson-Observatory |
| Ngc | 3 | 7 |  | 0 |  | ngc |  |
| Non Destructive Readout | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_N.html |
| North Galactic Pole | 3 | 7 | NED | 1 | 1 | north-galactic-pole | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_N.html |
| nuclear binding energy | 3 | 7 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/nucene/nucbin.html |
| OB Association | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_O.html#O5 |
| Observational cosmology | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_O.html#O17 |
| Optical Depth | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_O.html#O42 |
| Optical telescope | 3 | 7 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/230/ |
| Optics | 3 | 7 | Astro4Edu,NED | 2 | 1 |  | https://astro4edu.org/resources/glossary/term/231/ |
| Orbital Inclination | 3 | 7 |  | 0 |  | orbital-inclination |  |
| Origin of Spiral Arms | 3 | 7 |  | 0 |  | origin-of-spiral-arms |  |
| P-process | 3 | 7 | NED | 1 | 2 |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Parkes 64 Metre Radio Telescope | 3 | 7 |  | 0 |  | parkes-64-metre-radio-telescope |  |
| Periastron | 3 | 7 | Astro4Edu,NED | 2 | 1 | periastron | https://astro4edu.org/resources/glossary/term/522/ |
| Perturbation (astronomy) | 3 | 7 | Britannica,NED | 2 | 2 |  | https://www.britannica.com/science/perturbation-astronomy |
| Photodisintegration | 3 | 7 |  | 0 |  | photodisintegration |  |
| Photoionization | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Photomultiplier | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Photomultiplier Tube | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Photon Detectors | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Photon Quantum Energy | 3 | 7 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/mod2.html |
| Photonics | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Pierre Auger Observatory | 3 | 7 |  | 0 |  | pierre-auger-observatory |  |
| Planck Energy | 3 | 7 |  | 0 |  | planck-energy |  |
| Planck Era | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Planck Mass | 3 | 7 |  | 0 |  | planck-mass |  |
| Planck Scale | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Planck Temperature | 3 | 7 |  | 0 |  | planck-temperature |  |
| Planck Tension | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Planetary science | 3 | 7 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/257/ |
| Planetesimal | 3 | 7 | Astro4Edu,Britannica | 2 |  | planetesimals | https://www.britannica.com/science/planetesimal |
| Plutinos | 3 | 7 |  | 0 |  | plutinos |  |
| Primordial Fireball | 3 | 7 |  | 0 |  | primordial-fireball |  |
| Proper motion | 3 | 7 | Britannica,NED | 2 | 1 | proper-motion | https://www.britannica.com/science/proper-motion |
| Proto Planetary Nebulae | 3 | 7 |  | 0 |  | proto-planetary-nebulae |  |
| Pulsar Evolution | 3 | 7 |  | 0 |  | pulsar-evolution |  |
| Pulsar Timing | 3 | 7 |  | 0 |  | pulsar-timing |  |
| Quantum cosmology | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_Q.html |
| R-process | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| Radial Pulsation | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| Radial velocity | 3 | 7 | Astro4Edu,NED | 2 |  | radial-velocity | https://astro4edu.org/resources/glossary/term/269/ |
| Radiation pressure | 3 | 7 | HyperPhysics,NED | 2 | 3 | radiation-pressure | https://hyperphysics.phy-astr.gsu.edu/hbase/astro/transp.html |
| Radiative zone | 3 | 7 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/271/ |
| Radio astronomy | 3 | 7 | Astro4Edu,NED | 2 | 3 | radio-astronomy | https://astro4edu.org/resources/glossary/term/272/ |
| Recurrent Novae | 3 | 7 |  | 0 |  | recurrent-novae |  |
| Reflecting telescope | 3 | 7 | Astro4Edu,NED | 2 |  |  | https://astro4edu.org/resources/glossary/term/279/ |
| Reflection nebula | 3 | 7 | Britannica,NED | 2 |  | reflection-nebula | https://www.britannica.com/science/reflection-nebula |
| Relativistic Cosmology | 3 | 7 |  | 0 |  | relativistic-cosmology |  |
| Robertson-Walker Metric | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| Roche Lobe Overflow | 3 | 7 |  | 0 |  | roche-lobe-overflow |  |
| Rotation Curve | 3 | 7 | NED | 1 |  | rotation-curve | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| RR Lyrae Star | 3 | 7 | Astro4Edu,Britannica | 2 | 1 | rr-lyrae | https://www.britannica.com/science/RR-Lyrae-star |
| RV Tau Variables | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| RV Tauri Stars | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_T.html#T11 |
| S process | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| S0 Galaxy | 3 | 7 |  | 0 |  | s0-galaxy |  |
| Satellite galaxy | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Scaling Relations | 3 | 7 |  | 0 |  | scaling-relations |  |
| Schmidt Plates | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Schwarzschild Lens | 3 | 7 |  | 0 |  | schwarzschild-lens |  |
| Scorpius X 1 | 3 | 7 | Britannica,NED | 2 |  |  | https://www.britannica.com/topic/Scorpius-X-1 |
| Sculptor Dwarf | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Secular Evolution | 3 | 7 |  | 0 |  | secular-evolution |  |
| Semi-Regular Variable | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Short Period Comets | 3 | 7 |  | 0 |  | short-period-comets |  |
| Single Stellar Populations | 3 | 7 |  | 0 |  | single-stellar-populations |  |
| Solar Cosmic Rays | 3 | 7 |  | 0 |  | solar-cosmic-rays |  |
| Solar Mass | 3 | 7 | Astro4Edu,NED | 2 |  | solar-mass | https://astro4edu.org/resources/glossary/term/312/ |
| South Galactic Pole | 3 | 7 | NED | 1 | 1 | south-galactic-pole | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Spectral Continuum | 3 | 7 |  | 0 |  | spectral-continuum |  |
| Spectral Line Broadening | 3 | 7 |  | 0 |  | spectral-line-broadening |  |
| Spectral Line Profile | 3 | 7 |  | 0 |  | spectral-line-profile |  |
| Spherical Aberration | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Spin Flip Transition | 3 | 7 |  | 0 |  | spin-flip-transition |  |
| Spiral Galaxy Formation | 3 | 7 |  | 0 |  | spiral-galaxy-formation |  |
| Spitzer Space Telescope | 3 | 7 | Britannica,HyperPhysics | 2 |  |  | https://www.britannica.com/topic/Spitzer-Space-Telescope |
| Steady State Theory | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Stellar Activity | 3 | 7 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/479/ |
| Stellar Core | 3 | 7 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/478/ |
| Stellar Flare | 3 | 7 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/530/ |
| Stellar halo | 3 | 7 | NED | 1 | 1 | stellar-halo | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Stellar Jets | 3 | 7 |  | 0 |  | stellar-jets |  |
| Stellar Luminosity Class | 3 | 7 |  | 0 |  | stellar-luminosity-class |  |
| Stellar parallax | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Stellar Populations of Globular Clusters | 3 | 7 |  | 0 |  | stellar-populations-of-globular-clusters |  |
| Stellar Remnants | 3 | 7 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/337/ |
| Stellar structure | 3 | 7 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/338/ |
| Stellar wind | 3 | 7 | Astro4Edu,NED | 2 |  | stellar-winds | https://astro4edu.org/resources/glossary/term/531/ |
| Stimulated Emission | 3 | 7 | HyperPhysics,NED | 2 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/mod5.html |
| Sun Grazing Comet | 3 | 7 |  | 0 |  | sun-grazing-comet |  |
| Supergalactic Coordinate System | 3 | 7 |  | 1 | 1 | supergalactic-coordinate-system |  |
| Supernova Classification | 3 | 7 |  | 0 |  | supernova-classification |  |
| Supernova Remnant Type | 3 | 7 |  | 0 |  | supernova-remnant-type |  |
| Supernova Search | 3 | 7 |  | 0 |  | supernova-search |  |
| Surface Brightness Profiles | 3 | 7 |  | 0 |  | surface-brightness-profiles |  |
| Synchrotron Emission | 3 | 7 |  | 0 |  | synchrotron-emission |  |
| T Tauri star | 3 | 7 | Britannica | 1 |  | t-tauri-stars | https://www.britannica.com/science/T-Tauri-star |
| Telluric Lines | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_T.html#T19 |
| Thermal Doppler Broadening | 3 | 7 |  | 0 |  | thermal-doppler-broadening |  |
| Thomas Fermi Theory | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_T.html#T49 |
| Three Body Problem | 3 | 7 | Britannica,NED | 2 |  |  | https://www.britannica.com/science/three-body-problem |
| Tidal Tails | 3 | 7 |  | 0 |  | tidal-tails |  |
| Tidal Theory | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_T.html#T59 |
| Tired Light | 3 | 7 |  | 0 |  | tired-light |  |
| Trigonometric Parallax | 3 | 7 |  | 0 |  | trigonometric-parallax |  |
| Triple alpha process | 3 | 7 |  | 1 | 2 | triple-alpha-process |  |
| Tully-Fisher Relation | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_T.html#T103 |
| Ultra High Energy Cosmic Rays | 3 | 7 |  | 0 |  | ultra-high-energy-cosmic-rays |  |
| Ultraviolet astronomy | 3 | 7 | Britannica,NED | 2 |  |  | https://www.britannica.com/science/ultraviolet-astronomy |
| Ultraviolet Ga Stars | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_U.html |
| Ultraviolet Stars | 3 | 7 | NED | 1 |  | ultraviolet | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_U.html#U14 |
| Vela Supernova Remnant | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_V.html#V17 |
| Very Long Baseline Array | 3 | 7 |  | 0 |  | very-long-baseline-array |  |
| Virtual Interaction | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_V.html |
| Weak Interaction | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_W.html |
| White Supergiant | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_W.html#33 |
| Wide-Field Infrared Survey Explorer | 3 | 7 | Britannica | 1 |  |  | https://www.britannica.com/topic/Wide-field-Infrared-Survey-Explorer |
| X-Ray Burst | 3 | 7 |  | 0 |  | x-ray-burst |  |
| Yellow Supergiant | 3 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_Y.html#Y6 |
| Baade's Window | 2 | 7 |  | 0 |  | baade%27s-window |  |
| Butcher Oemler Effect | 2 | 7 |  | 0 |  | butcher-oemler-effect |  |
| Dark Burst | 2 | 7 |  | 0 |  | dark-burst |  |
| Galaxy Strangulation | 2 | 7 |  | 0 |  | galaxy-strangulation |  |
| Gamma-Ray Burst Energies | 2 | 7 |  | 0 |  | gamma-ray-burst-energies |  |
| Gamma-Ray Burst Light Curves | 2 | 7 |  | 0 |  | gamma-ray-burst-light-curves |  |
| Gamma-Ray Burst Optical Transient | 2 | 7 |  | 0 |  | gamma-ray-burst-optical-transient |  |
| Giant Pulses | 2 | 7 |  | 0 |  | giant-pulses |  |
| Greisen Zatsepin Kuzmin Limit | 2 | 7 |  | 0 |  | greisen-zatsepin-kuzmin-limit |  |
| Hot Coronal Gas | 2 | 7 |  | 0 |  | hot-coronal-gas |  |
| Kormendy Relation | 2 | 7 |  | 0 |  | kormendy-relation |  |
| Lorentz Invariant | 2 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_L.html |
| Luminosity Decline Rate Relation | 2 | 7 |  | 0 |  | luminosity-decline-rate-relation |  |
| Monolithic Collapse | 2 | 7 |  | 0 |  | monolithic-collapse |  |
| Orphan Afterglow | 2 | 7 |  | 0 |  | orphan-afterglow |  |
| Pulsar Characteristic Age | 2 | 7 |  | 0 |  | pulsar-characteristic-age |  |
| Pulsar Dispersion Measure | 2 | 7 |  | 0 |  | pulsar-dispersion-measure |  |
| Radio Supernova | 2 | 7 |  | 0 |  | radio-supernova |  |
| Red giant | 2 | 7 | Astro4Edu,NED | 2 |  | red-giant-stars | https://astro4edu.org/resources/glossary/term/277/ |
| Red Giant phase of the Sun | 2 | 7 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/astro/redgia.html |
| Rotating RAdio Transients | 2 | 7 |  | 0 |  | rrats |  |
| Shapiro Delay | 2 | 7 |  | 0 |  | shapiro-delay |  |
| Signal-to-Noise Ratio | 2 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Soft Gamma Repeater | 2 | 7 |  | 0 |  | soft-gamma-repeater |  |
| Soft X-Ray Transient | 2 | 7 |  | 0 |  | soft-x-ray-transient |  |
| Standardised Candle Method For Snii | 2 | 7 |  | 0 |  | standardised-candle-method-for-snii |  |
| Supernova Gamma-Ray Burst Connection | 2 | 7 |  | 0 |  | supernova-gamma-ray-burst-connection |  |
| Toomre Sequence | 2 | 7 |  | 0 |  | toomre-sequence |  |
| Van Den Bergh Luminosity Class | 2 | 7 |  | 0 |  | van-den-bergh-luminosity-class |  |
| Warm Intercloud Medium | 2 | 7 |  | 0 |  | warm-intercloud-medium |  |
| Winding Problem | 2 | 7 |  | 0 |  | winding-problem |  |
| X-Ray Flash | 2 | 7 |  | 0 |  | x-ray-flash |  |
| X-Ray Halos | 2 | 7 |  | 0 |  | x-ray-halos |  |
| Zz Ceti Stars | 2 | 7 |  | 0 |  | zz-ceti-stars |  |
| Diffraction Limited | 1 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_D.html |
| Diffraction Pattern | 1 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_D.html |
| Dispersion Measure | 1 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_D.html |
| Diverging Lens | 1 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_D.html |
| Double Radio Source | 1 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_D.html |
| Double star | 1 | 7 | Astro4Edu,NED | 2 |  |  | https://astro4edu.org/resources/glossary/term/528/ |
| Dumbbell Nebula | 1 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_D.html |
| Eddington Limit | 1 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_E.html |
| Effective Radius | 1 | 7 | NED | 1 | 1 | effective-radius | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_E.html |
| Emission Line | 1 | 7 | Astro4Edu | 1 | 2 | emission-line | https://astro4edu.org/resources/glossary/term/516/ |
| Emission nebula | 1 | 7 | Britannica,NED | 2 | 2 | emission-nebula | https://www.britannica.com/science/emission-nebula |
| Emission Spectrum | 1 | 7 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_E.html |
| Interacting Galaxies | 1 | 7 |  | 1 | 1 | interacting-galaxies |  |
| Aurora Borealis (Northern Lights) | 9 | 6 |  | 0 |  | aurora-borealis-%28northern-lights%29 |  |
| Bose-Einstein Nuclei | 9 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_B.html |
| Bose-Einstein Statistics | 9 | 6 | HyperPhysics,NED | 2 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/quantum/disbe.html |
| Einsteinium | 9 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_E.html |
| ADC | 8 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Aurora Australis (Southern Lights) | 8 | 6 |  | 0 |  | aurora-australis-%28southern-lights%29 |  |
| Tau Ceti | 8 | 6 | NED | 1 | 1 |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_T.html#T10 |
| Asymptotic Branch (AGB) Stars | 7 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Kinetic Energy | 7 | 6 |  | 0 |  | kinetic-energy |  |
| Leap Year | 7 | 6 |  | 0 |  | leap-year |  |
| Nadir | 7 | 6 | Astro4Edu,Britannica,NED | 3 |  | nadir | https://www.britannica.com/science/nadir |
| 2024 Solar Eclipse FAQ | 6 | 6 | Britannica | 1 |  |  | https://www.britannica.com/topic/2024-Solar-Eclipse-FAQ |
| Coordinated Universal Time | 6 | 6 |  | 0 |  | coordinated-universal-time |  |
| First Quarter Moon | 6 | 6 |  | 0 |  | first-quarter-moon |  |
| Greenwich Mean Time | 6 | 6 |  | 0 |  | greenwich-mean-time |  |
| Gregorian Calendar | 6 | 6 |  | 0 |  | gregorian-calendar |  |
| Ion | 6 | 6 |  | 0 |  | ion |  |
| K2 18b | 6 | 6 | Britannica | 1 |  |  | https://www.britannica.com/place/K2-18b |
| Voyager 1 | 6 | 6 | Britannica | 1 |  |  | https://www.britannica.com/topic/Voyager-1 |
| Voyager program | 6 | 6 |  | 1 | 1 |  |  |
| A Shell Stars | 5 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Abundance Ratio | 5 | 6 | NED | 1 |  | abundance-ratio | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Ae or A Emission Stars | 5 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Aperture Efficiency | 5 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Aperture Function | 5 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Aperture Ratio | 5 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Aperture Synthesis | 5 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Asinh Magnitude | 5 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Azimuth | 5 | 6 | Astro4Edu,Britannica,NED | 3 |  | azimuth | https://www.britannica.com/science/azimuth |
| Cno Cycle | 5 | 6 |  | 1 | 6 | cno-cycle |  |
| define penumbra | 5 | 6 | Astro4Edu,Britannica,NED | 3 |  |  | https://www.britannica.com/science/penumbra-eclipse |
| diffuse ionized gas | 5 | 6 | Britannica | 1 |  |  | https://www.britannica.com/science/diffuse-ionized-gas |
| Distance | 5 | 6 |  | 0 |  | distance |  |
| Expansion of Universe | 5 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_E.html |
| Galactic Winds | 5 | 6 |  | 1 | 1 | galactic-winds |  |
| Geomagnetic Storms | 5 | 6 |  | 1 | 1 | geomagnetic-storms |  |
| Gibbous Moon | 5 | 6 |  | 0 |  | gibbous-moon |  |
| Krzeminski's star | 5 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_K.html#K57 |
| Landau Damping | 5 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_L.html |
| Last Quarter Moon | 5 | 6 |  | 0 |  | last-quarter-moon |  |
| Radiation | 5 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| Rhea (moon) | 5 | 6 | Britannica,NED | 2 |  |  | https://www.britannica.com/topic/Rhea-astronomy |
| Silicon Burning | 5 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Solar cycle | 5 | 6 | Astro4Edu,Britannica,NED | 3 | 1 |  | https://www.britannica.com/science/solar-cycle |
| Solar Prominence | 5 | 6 | Astro4Edu,Britannica,NED | 3 |  |  | https://www.britannica.com/science/solar-prominence |
| Spectral Type | 5 | 6 | Astro4Edu,HyperPhysics,NED | 3 |  | spectral-type | https://astro4edu.org/resources/glossary/term/325/ |
| Tropic of Cancer | 5 | 6 |  | 0 |  | tropic-of-cancer |  |
| Van Allen (Radiation) Belts | 5 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_V.html#V4 |
| Waning Crescent Moon | 5 | 6 |  | 0 |  | waning-crescent-moon |  |
| Waning Gibbous Moon | 5 | 6 |  | 0 |  | waning-gibbous-moon |  |
| Wave Equation | 5 | 6 |  | 0 |  | wave-equation |  |
| Waxing Crescent Moon | 5 | 6 |  | 0 |  | waxing-crescent-moon |  |
| Waxing Gibbous Moon | 5 | 6 |  | 0 |  | waxing-gibbous-moon |  |
| Aberration, Stellar | 4 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Astrology | 4 | 6 | Astro4Edu,NED | 2 |  |  | https://astro4edu.org/resources/glossary/term/22/ |
| Aurora | 4 | 6 | Astro4Edu,NED | 2 | 3 | aurora | https://astro4edu.org/resources/glossary/term/33/ |
| Centaurs | 4 | 6 |  | 1 | 2 | centaurs |  |
| Comoving Volume | 4 | 6 |  | 0 |  | comoving-volume |  |
| Constructive Interference | 4 | 6 |  | 1 | 2 | constructive-interference |  |
| Diffraction reveals the geometry of the diffracting object. | 4 | 6 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/phyopt/millcross.html |
| Eddington's Standard Model | 4 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_E.html |
| Einstein A and B coefficients | 4 | 6 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/optmod/eincoef.html |
| Explosive Variables | 4 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_E.html |
| Extreme Ultraviolet Explorer | 4 | 6 | Britannica | 1 |  |  | https://www.britannica.com/topic/Extreme-Ultraviolet-Explorer |
| F-type Star | 4 | 6 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/110/ |
| Faber-Jackson Relation | 4 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_F.html#F14 |
| Fabry-Perot | 4 | 6 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/phyopt/fabry.html |
| Filters | 4 | 6 |  | 0 |  | filters |  |
| Fireball | 4 | 6 | NED | 1 | 1 | fireball | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_F.html#F51 |
| FITS | 4 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_F.html |
| Flatness problem | 4 | 6 |  | 1 | 1 | flatness-problem |  |
| Flocculent Spiral | 4 | 6 |  | 1 | 1 | flocculent-spiral |  |
| Flux | 4 | 6 | NED | 1 | 2 | flux | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_F.html#F67 |
| Flux Density | 4 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_F.html#F68 |
| Flux Tube | 4 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_F.html#F69 |
| Focal Ratio | 4 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_F.html |
| Focal Reducer | 4 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_F.html |
| follows this curvature | 4 | 6 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/relativ/grel.html |
| Forbidden Lines | 4 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_F.html#F74 |
| Forbush Decrease | 4 | 6 | NED | 1 |  | forbush-decrease | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_F.html#F75 |
| Fornax | 4 | 6 | Britannica,NED | 2 | 1 |  | https://www.britannica.com/place/Fornax |
| Fossil Groups | 4 | 6 |  | 1 | 1 | fossil-groups |  |
| Fossil Strömgren Sphere | 4 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_F.html#F85 |
| Fourier Transform | 4 | 6 |  | 1 | 4 | fourier-transform |  |
| FOV | 4 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_F.html |
| Frame of Reference | 4 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_F.html#F93 |
| Friedmann equations | 4 | 6 | HyperPhysics,NED | 2 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/astro/fried.html |
| Full Width at Half Maximum | 4 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_F.html#F111 |
| Fwhm | 4 | 6 | NED | 1 | 1 |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_F.html |
| Galactic coordinate system | 4 | 6 |  | 1 | 4 | galactic-coordinate-system |  |
| Galactic Rotation | 4 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_G.html |
| Gegenschein | 4 | 6 | Britannica,NED | 2 |  |  | https://www.britannica.com/science/gegenschein |
| Geminga | 4 | 6 | Britannica | 1 |  |  | https://www.britannica.com/place/Geminga |
| Geocentric | 4 | 6 | NED | 1 | 1 |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_G.html |
| GPS Radio Source | 4 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_G.html |
| Gran Telescopio Canarias | 4 | 6 | Britannica | 1 |  |  | https://www.britannica.com/topic/Gran-Telescopio-Canarias |
| gravitational red shift | 4 | 6 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/relativ/gratim.html |
| gravitational time dilation | 4 | 6 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/relativ/gratim.html |
| Grism | 4 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_G.html |
| Heavy Fermion Systems | 4 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_H.html |
| Heliocentric Cosmology | 4 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_H.html |
| Hydrogen Fusion | 4 | 6 | Astro4Edu,HyperPhysics | 2 |  |  | https://astro4edu.org/resources/glossary/term/150/ |
| Hydrogen Helium Abundance | 4 | 6 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/astro/hydhel.html |
| Impact Parameter | 4 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_I.html |
| Inertial Frame | 4 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_I.html |
| Initial Mass Function | 4 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_I.html |
| International Atomic Time | 4 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_I.html |
| International Space Station | 4 | 6 | Britannica | 1 |  |  | https://www.britannica.com/topic/International-Space-Station |
| Keller Meyerott opacity | 4 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_K.html#K19 |
| magnetic flux | 4 | 6 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/magnetic/fluxmg.html |
| Natural satellite | 4 | 6 | Astro4Edu,Britannica,NED | 3 | 2 |  | https://www.britannica.com/science/satellite |
| Oberon (moon) | 4 | 6 | Britannica,NED | 2 |  |  | https://www.britannica.com/place/Oberon-astronomy |
| Period | 4 | 6 |  | 0 |  | period |  |
| Resolution | 4 | 6 |  | 0 |  | resolution |  |
| Sidereal Day | 4 | 6 |  | 0 |  | sidereal-day |  |
| Titania (moon) | 4 | 6 | Britannica,NED | 2 |  |  | https://www.britannica.com/place/Titania-astronomy |
| Transit | 4 | 6 | Astro4Edu,Britannica,NED | 3 |  |  | https://www.britannica.com/science/transit-astronomy |
| Tropical Year | 4 | 6 |  | 0 |  | tropical-year |  |
| Alternative Cosmologies | 3 | 6 |  | 0 |  | alternative-cosmologies |  |
| Amor Asteroids | 3 | 6 |  | 0 |  | amor-asteroids |  |
| Apparent Diameter | 3 | 6 |  | 0 |  | apparent-diameter |  |
| Argument of Perihelion | 3 | 6 |  | 0 |  | argument-of-perihelion |  |
| Ascending Node | 3 | 6 |  | 0 |  | ascending-node |  |
| Asymmetrical Galaxies | 3 | 6 |  | 0 |  | asymmetrical-galaxies |  |
| Aten Asteroids | 3 | 6 |  | 0 |  | aten-asteroids |  |
| Color Temperature | 3 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Column Density | 3 | 6 |  | 0 |  | column-density |  |
| Cometary Dust Tail | 3 | 6 |  | 0 |  | cometary-dust-tail |  |
| Cometary Gas Tail | 3 | 6 |  | 0 |  | cometary-gas-tail |  |
| Crossing Time | 3 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Degenerate Electron Pressure | 3 | 6 |  | 1 | 4 | degenerate-electron-pressure |  |
| Descending Node | 3 | 6 |  | 0 |  | descending-node |  |
| Diffraction Grating | 3 | 6 | HyperPhysics,NED | 2 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/phyopt/grating.html |
| Disturbed Galaxies | 3 | 6 |  | 0 |  | disturbed-galaxies |  |
| Epsilon Eridani | 3 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_E.html |
| Fabry-Perot Interferometer | 3 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_F.html#F15 |
| Far Ultraviolet Spectroscopic Explorer | 3 | 6 | Britannica | 1 |  |  | https://www.britannica.com/topic/Far-Ultraviolet-Spectroscopic-Explorer |
| Fine Structure | 3 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_F.html |
| Fresnel Diffraction | 3 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_F.html |
| Fresnel Lens | 3 | 6 | HyperPhysics,NED | 2 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/geoopt/fresnellens.html |
| Galactic Plane | 3 | 6 |  | 1 | 1 | galactic-plane |  |
| Giant Branch | 3 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_G.html |
| gravitational microlensing | 3 | 6 | Britannica | 1 |  |  | https://www.britannica.com/science/gravitational-microlensing |
| Great Observatories | 3 | 6 | Britannica | 1 | 1 |  | https://www.britannica.com/topic/Great-Observatories |
| Gregorian | 3 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_G.html |
| Group Environment | 3 | 6 |  | 0 |  | group-environment |  |
| Hale Observatories | 3 | 6 | Britannica | 1 |  |  | https://www.britannica.com/topic/Hale-Observatories |
| Hellas | 3 | 6 | Britannica | 1 |  |  | https://www.britannica.com/place/Hellas-impact-basin-Mars |
| Henyey Track | 3 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_H.html |
| High-Velocity Object | 3 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_H.html |
| Hoba meteorite | 3 | 6 | Britannica | 1 |  |  | https://www.britannica.com/topic/Hoba-meteorite |
| Inertia | 3 | 6 | NED | 1 | 1 | inertia | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_I.html |
| Inferior Conjunction | 3 | 6 |  | 0 |  | inferior-conjunction |  |
| Inferior Planet | 3 | 6 |  | 0 |  | inferior-planet |  |
| Intergalactic Medium | 3 | 6 | Britannica,NED | 2 | 1 | intergalactic-medium | https://www.britannica.com/science/intergalactic-medium |
| Isolated Galaxies | 3 | 6 |  | 0 |  | isolated-galaxies |  |
| Loose Groups | 3 | 6 |  | 0 |  | loose-groups |  |
| Maxwell Boltzmann Distribution | 3 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_M.html |
| Meridian Transit | 3 | 6 |  | 0 |  | meridian-transit |  |
| Meteor Stream | 3 | 6 |  | 0 |  | meteor-stream |  |
| Micrometeorite | 3 | 6 |  | 0 |  | micrometeorite |  |
| Orbital resonance | 3 | 6 |  | 1 | 2 |  |  |
| Power Spectrum | 3 | 6 |  | 0 |  | power-spectrum |  |
| Radiant | 3 | 6 |  | 0 |  | radiant |  |
| Radiant Flux Density | 3 | 6 |  | 0 |  | radiant-flux-density |  |
| Rayleigh-Jeans Spectrum | 3 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| retrograde motion | 3 | 6 | Britannica | 1 |  |  | https://www.britannica.com/science/retrograde-motion |
| Scale Length | 3 | 6 |  | 1 | 1 | scale-length |  |
| Self Gravitating Bodies | 3 | 6 |  | 0 |  | self-gravitating-bodies |  |
| Self Gravitation | 3 | 6 |  | 0 |  | self-gravitation |  |
| Shells | 3 | 6 |  | 0 |  | shells |  |
| Superior Conjunction | 3 | 6 |  | 0 |  | superior-conjunction |  |
| Superior Planet | 3 | 6 |  | 0 |  | superior-planet |  |
| Transverse Velocity | 3 | 6 |  | 0 |  | transverse-velocity |  |
| Zurich Sunspot Number | 3 | 6 |  | 0 |  | zurich-sunspot-number |  |
| Canis Minor | 2 | 6 | Britannica | 1 |  |  | https://www.britannica.com/place/Canis-Minor |
| Celestial Poles | 2 | 6 |  | 1 | 2 | celestial-poles |  |
| Colour Gradients in Galaxies | 2 | 6 |  | 0 |  | colour-gradients-in-galaxies |  |
| Coma Berenices | 2 | 6 | Britannica | 1 |  |  | https://www.britannica.com/topic/Coma-Berenices |
| Comet Hyakutake | 2 | 6 | Britannica | 1 |  |  | https://www.britannica.com/topic/Comet-Hyakutake |
| Cometary Hydrogen Cloud | 2 | 6 |  | 0 |  | cometary-hydrogen-cloud |  |
| Cometary Neutral Tail | 2 | 6 |  | 0 |  | cometary-neutral-tail |  |
| Corona Australis | 2 | 6 | Britannica | 1 |  |  | https://www.britannica.com/place/Corona-Australis |
| Corona Borealis | 2 | 6 | Britannica | 1 |  |  | https://www.britannica.com/place/Corona-Borealis |
| EB CCD | 2 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_E.html |
| European Vlbi Network | 2 | 6 |  | 0 |  | european-vlbi-network |  |
| Galactic Sheets | 2 | 6 |  | 0 |  | galactic-sheets |  |
| Grus (constellation) | 2 | 6 | Britannica | 1 |  |  | https://www.britannica.com/place/Grus-constellation |
| Hi Cloud | 2 | 6 |  | 0 |  | hi-cloud |  |
| Kramers's opacity | 2 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_K.html#K53 |
| Local Flow | 2 | 6 |  | 0 |  | local-flow |  |
| Long Baseline Array | 2 | 6 |  | 0 |  | long-baseline-array |  |
| Lovell 76M Telescope | 2 | 6 |  | 0 |  | lovell-76m-telescope |  |
| Lyman Series | 2 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_L.html |
| Meniscus Mirror | 2 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_M.html |
| Morphological Peculiarities | 2 | 6 |  | 0 |  | morphological-peculiarities |  |
| Musca | 2 | 6 | Britannica | 1 |  |  | https://www.britannica.com/place/Musca-constellation |
| Nyquist Rate | 2 | 6 |  | 1 | 1 | nyquist-rate |  |
| Period Derivative | 2 | 6 |  | 0 |  | period-derivative |  |
| Piscis Austrinus | 2 | 6 | Britannica | 1 |  |  | https://www.britannica.com/place/Piscis-Austrinus |
| Plano Concave Lens | 2 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Plano Convex Lens | 2 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Plasma | 2 | 6 | Astro4Edu,NED | 2 |  |  | https://astro4edu.org/resources/glossary/term/258/ |
| Polarization | 2 | 6 | NED | 1 | 3 |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Population I Stars | 2 | 6 | HyperPhysics,NED | 2 | 2 | population-i | https://hyperphysics.phy-astr.gsu.edu/hbase/starlog/pop12.html |
| Pressure Ionization | 2 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Primary Mirror | 2 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Primordial Nucleosynthesis | 2 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Projected Semi Major Axis | 2 | 6 |  | 0 |  | projected-semi-major-axis |  |
| Protostellar Core | 2 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| PSR J0437 4715 | 2 | 6 |  | 0 |  | psr-j0437-4715 |  |
| PSR J1141 6545 | 2 | 6 |  | 0 |  | psr-j1141-6545 |  |
| Radiation Era | 2 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| Radiation Temperature | 2 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| Radiative Recombination | 2 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| Radiative Transfer | 2 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| Radio Interferometer | 2 | 6 | Britannica,NED | 2 |  | radio-interferometer | https://www.britannica.com/science/radio-interferometer |
| Radio Lobes | 2 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| Radio Recombination Lines | 2 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| radioactive dating | 2 | 6 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/nuclear/raddat.html |
| Radiometer | 2 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| Radiosonde | 2 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| Ram Pressure Stripping | 2 | 6 |  | 1 | 1 | ram-pressure-stripping |  |
| Rayleigh | 2 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| Rayleigh criterion | 2 | 6 | HyperPhysics | 1 |  | rayleigh-criterion | https://hyperphysics.phy-astr.gsu.edu/hbase/phyopt/raylei.html |
| Rayleigh-Jeans Limit | 2 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| Recombination (cosmology) | 2 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| relativistic plasma | 2 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| Roemer Delay | 2 | 6 |  | 0 |  | roemer-delay |  |
| Selective Absorption | 2 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Six Degree Field Galaxy Survey | 2 | 6 |  | 0 |  | six-degree-field-galaxy-survey |  |
| Spontaneous Emission | 2 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Thuban | 2 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_T.html#T57 |
| Triangulum | 2 | 6 | Britannica | 1 |  |  | https://www.britannica.com/place/Triangulum |
| Triangulum Australe | 2 | 6 | Britannica | 1 |  |  | https://www.britannica.com/place/Triangulum-Australe |
| Tucana | 2 | 6 | Britannica | 1 |  |  | https://www.britannica.com/topic/Tucana |
| Umbriel | 2 | 6 | Britannica,NED | 2 |  |  | https://www.britannica.com/topic/Umbriel |
| Absorption Coefficient | 1 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| FM radio | 1 | 6 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/audio/bcast.html |
| Plasmapause | 1 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Radio Source Counts | 1 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| Radioactive Half Life | 1 | 6 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/nuclear/halfli.html |
| Radioactivity | 1 | 6 | HyperPhysics,NED | 2 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/nuclear/radact.html |
| Radiometric Dating | 1 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| Rayleigh Limit | 1 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| Red Giant Tip | 1 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| Refractive Index | 1 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| Resolving Power | 1 | 6 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| resonant frequency | 1 | 6 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/sound/reson.html |
| Fermi paradox | 7 | 5 | Britannica | 1 | 1 |  | https://www.britannica.com/science/Fermi-paradox |
| Kardashev scale | 7 | 5 | Britannica | 1 |  |  | https://www.britannica.com/science/Kardashev-scale |
| Kelvin timescale | 7 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_K.html#K23 |
| Moons of Jupiter | 7 | 5 | Britannica | 1 |  |  | https://www.britannica.com/topic/moons-of-Jupiter-2236909 |
| Adiabatic Index | 6 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Charon (moon) | 6 | 5 | Britannica | 1 |  |  | https://www.britannica.com/place/Charon-astronomy |
| Degree (Temperature) | 6 | 5 |  | 0 |  | degree-%28temperature%29 |  |
| Ergosphere | 6 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_E.html |
| Heliosphere | 6 | 5 | Britannica | 1 |  |  | https://www.britannica.com/science/heliosphere |
| Light | 6 | 5 | Astro4Edu,NED | 2 | 7 | light | https://astro4edu.org/resources/glossary/term/175/ |
| Lunar phase | 6 | 5 | Astro4Edu,Britannica | 2 |  |  | https://www.britannica.com/science/lunar-phases |
| Meteor Shower | 6 | 5 | Britannica,NED | 2 |  | meteor-shower | https://www.britannica.com/science/meteor-shower |
| Moons of Neptune | 6 | 5 | Britannica | 1 |  |  | https://www.britannica.com/topic/moons-of-Neptune-2237322 |
| Moons of Saturn | 6 | 5 | Britannica | 1 |  |  | https://www.britannica.com/place/moons-of-Saturn-2237282 |
| New Horizons | 6 | 5 | Britannica | 1 |  |  | https://www.britannica.com/topic/New-Horizons |
| Periapsis | 6 | 5 | Astro4Edu,NED | 2 | 2 | periapsis | https://astro4edu.org/resources/glossary/term/524/ |
| Phobos | 6 | 5 | Britannica,NED | 2 |  |  | https://www.britannica.com/place/Phobos-moon-of-Mars |
| Pressure | 6 | 5 |  | 0 |  | pressure |  |
| Strömgren Spheres | 6 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Twilight | 6 | 5 | Astro4Edu,NED | 2 |  |  | https://astro4edu.org/resources/glossary/term/509/ |
| Wormhole | 6 | 5 | Britannica | 1 |  |  | https://www.britannica.com/science/wormhole |
| Absolute Zero | 5 | 5 | Astro4Edu,NED | 2 |  |  | https://astro4edu.org/resources/glossary/term/3/ |
| Abundance | 5 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Achromatic Lens | 5 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Adhara | 5 | 5 | Britannica | 1 |  |  | https://www.britannica.com/place/Adhara |
| Adiabatic Change | 5 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Angle | 5 | 5 |  | 0 |  | angle |  |
| Antarctic Circle | 5 | 5 |  | 1 | 2 | antarctic-circle |  |
| Anti Baryon | 5 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Antlia | 5 | 5 | Britannica | 1 |  |  | https://www.britannica.com/topic/Antlia |
| Aplanatic Lens | 5 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Apogee | 5 | 5 | Astro4Edu,NED | 2 | 1 | apogee | https://astro4edu.org/resources/glossary/term/519/ |
| Arctic Circle | 5 | 5 | Astro4Edu | 1 | 1 | arctic-circle | https://astro4edu.org/resources/glossary/term/488/ |
| Area | 5 | 5 |  | 0 |  | area |  |
| Ariel (astronomy) | 5 | 5 | Britannica | 1 |  |  | https://www.britannica.com/topic/Ariel-astronomy |
| Astrometric Ephemeris | 5 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Atacama Large Millimeter Array | 5 | 5 | Britannica | 1 |  |  | https://www.britannica.com/topic/Atacama-Large-Millimeter-Array |
| Beta Lyrae | 5 | 5 | Britannica | 1 |  |  | https://www.britannica.com/place/Beta-Lyrae |
| Blue moon | 5 | 5 | Britannica | 1 |  |  | https://www.britannica.com/science/blue-moon-astronomy |
| Conic Sections | 5 | 5 |  | 0 |  | conic-sections |  |
| Cosmogony | 5 | 5 | Britannica,NED | 2 |  |  | https://www.britannica.com/science/cosmogony |
| Coulombs Law | 5 | 5 |  | 0 |  | coulomb%27s-law |  |
| Fast Fourier Transform | 5 | 5 |  | 0 |  | fast-fourier-transform |  |
| Focal Length | 5 | 5 |  | 0 |  | focal-length |  |
| Focal Point | 5 | 5 |  | 0 |  | focal-point |  |
| Gas giant | 5 | 5 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/125/ |
| Gaussian Function | 5 | 5 |  | 0 |  | gaussian-function |  |
| Heliometer | 5 | 5 | Britannica,NED | 2 |  |  | https://www.britannica.com/science/heliometer |
| Helix Nebula | 5 | 5 | HyperPhysics,NED | 2 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/astro/helix.html |
| index of refraction | 5 | 5 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/geoopt/refr.html |
| Induced Emission | 5 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_I.html |
| Infrared Space Observatory | 5 | 5 | Britannica | 1 |  |  | https://www.britannica.com/topic/Infrared-Space-Observatory |
| Jodrell Bank Observatory | 5 | 5 | Britannica | 1 |  |  | https://www.britannica.com/topic/Jodrell-Bank-Observatory |
| Kapteyn's Star | 5 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_K.html#K16 |
| Kepler 452b | 5 | 5 | Britannica | 1 |  |  | https://www.britannica.com/place/Kepler-452b |
| Large Binocular Telescope Observatory | 5 | 5 | Britannica | 1 |  |  | https://www.britannica.com/topic/Large-Binocular-Telescope-Observatory |
| Length | 5 | 5 |  | 0 |  | length |  |
| Lorentz Invariance | 5 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_L.html |
| Lyra | 5 | 5 | Britannica | 1 | 2 |  | https://www.britannica.com/place/Lyra-constellation |
| Mimas | 5 | 5 | Britannica,NED | 2 |  |  | https://www.britannica.com/place/Mimas |
| Moment of Inertia | 5 | 5 |  | 0 |  | moment-of-inertia |  |
| Month | 5 | 5 | Astro4Edu,NED | 2 | 3 |  | https://astro4edu.org/resources/glossary/term/202/ |
| Moons of Uranus | 5 | 5 | Britannica | 1 |  |  | https://www.britannica.com/place/moons-of-Uranus-2237295 |
| Orbital period | 5 | 5 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/233/ |
| Parabola | 5 | 5 |  | 0 |  | parabola |  |
| Royal Greenwich Observatory | 5 | 5 | Britannica,NED | 2 |  |  | https://www.britannica.com/topic/Royal-Greenwich-Observatory |
| satellite observatory | 5 | 5 | Britannica | 1 |  |  | https://www.britannica.com/science/satellite-observatory |
| Second | 5 | 5 |  | 0 |  | second |  |
| Sidereal Period | 5 | 5 | Britannica,NED | 2 |  | sidereal-period | https://www.britannica.com/science/sidereal-period |
| Sidereal time | 5 | 5 | Astro4Edu,NED | 2 |  |  | https://astro4edu.org/resources/glossary/term/303/ |
| Solar and Heliospheric Observatory | 5 | 5 | Britannica | 1 |  |  | https://www.britannica.com/topic/Solar-and-Heliospheric-Observatory |
| Solar Dynamics Observatory | 5 | 5 | Britannica | 1 |  |  | https://www.britannica.com/topic/Solar-Dynamics-Observatory |
| Speed | 5 | 5 |  | 0 |  | speed |  |
| Summer solstice | 5 | 5 | Astro4Edu,Britannica | 2 |  | summer-solstice | https://www.britannica.com/science/summer-solstice-astronomy |
| Sunlight | 5 | 5 | Britannica | 1 |  |  | https://www.britannica.com/science/sunlight-solar-radiation |
| Super Earth | 5 | 5 | Britannica | 1 |  |  | https://www.britannica.com/topic/super-Earth |
| Synodic Period | 5 | 5 | Britannica,NED | 2 |  |  | https://www.britannica.com/science/synodic-period |
| Time Dilation | 5 | 5 | HyperPhysics,NED | 2 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/relativ/tdil.html |
| Trans Neptunian Objects | 5 | 5 |  | 1 | 1 | trans-neptunian-objects |  |
| Ultraviolet | 5 | 5 | Astro4Edu,HyperPhysics,NED | 3 | 6 | ultraviolet | https://astro4edu.org/resources/glossary/term/371/ |
| Volume | 5 | 5 |  | 0 |  | volume |  |
| Winter solstice | 5 | 5 | Astro4Edu,Britannica | 2 |  | winter-solstice | https://www.britannica.com/science/winter-solstice |
| Zone of Avoidance | 5 | 5 |  | 1 | 3 | zone-of-avoidance |  |
| Barycentric Dynamical Time (TDB) | 4 | 5 |  | 1 |  |  |  |
| Baryon Number Conservation | 4 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_B.html |
| Beat Cepheids | 4 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_B.html |
| Calculation of expansion time | 4 | 5 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/astro/expand.html |
| Cancer (constellation) | 4 | 5 | Astro4Edu,Britannica | 2 | 1 |  | https://www.britannica.com/place/Cancer-constellation |
| Canes Venatici | 4 | 5 | Britannica | 1 |  |  | https://www.britannica.com/place/Canes-Venatici |
| Capricornus | 4 | 5 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/48/ |
| Caroline Herschel | 4 | 5 | Britannica | 1 |  |  | https://www.britannica.com/biography/Caroline-Lucretia-Herschel |
| Catadioptric Lens | 4 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| CCD | 4 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Celestial Ephemeris Pole | 4 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Chondrite | 4 | 5 |  | 0 |  | chondrite |  |
| Chondrule | 4 | 5 | Britannica | 1 | 1 | chondrule | https://www.britannica.com/science/chondrule |
| Clyde Tombaugh | 4 | 5 | Britannica | 1 |  |  | https://www.britannica.com/biography/Clyde-Tombaugh |
| Core Collapse | 4 | 5 |  | 1 | 1 | core-collapse |  |
| Degenerate matter | 4 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_D.html |
| Dione (moon) | 4 | 5 | Britannica,NED | 2 |  |  | https://www.britannica.com/topic/Dione-moon-of-Saturn |
| Dust Grain | 4 | 5 |  | 1 | 1 | dust-grain |  |
| Einstein equation | 4 | 5 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/relativ/releng.html |
| Ephemeris | 4 | 5 | Britannica,NED | 2 |  |  | https://www.britannica.com/science/ephemeris |
| Equator | 4 | 5 |  | 0 |  | equator |  |
| Exchange Interaction | 4 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_E.html |
| Focal Plane | 4 | 5 |  | 0 |  | focal-plane |  |
| Focal Plane Scale | 4 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_F.html |
| Gaia (spacecraft) | 4 | 5 | Britannica | 1 |  |  | https://www.britannica.com/topic/Gaia-European-Space-Agency-satellite |
| Gain | 4 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_G.html |
| Galactic Equator | 4 | 5 |  | 1 | 1 | galactic-equator |  |
| Galactic Filaments | 4 | 5 |  | 1 | 1 | galactic-filaments |  |
| gamma radioactivity | 4 | 5 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/nuclear/radact2.html |
| Glitch | 4 | 5 | NED | 1 | 1 | glitch | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_G.html |
| Granulation | 4 | 5 | Astro4Edu,NED | 2 |  |  | https://astro4edu.org/resources/glossary/term/446/ |
| Gravitational Instability | 4 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_G.html |
| Greenhouse Effect | 4 | 5 | Astro4Edu,NED | 2 |  |  | https://astro4edu.org/resources/glossary/term/137/ |
| Habitable zone | 4 | 5 | Astro4Edu,Britannica | 2 |  |  | https://www.britannica.com/science/habitable-zone |
| Hagedorn Equation of State | 4 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_H.html |
| Heliocentrism | 4 | 5 | Britannica | 1 | 2 |  | https://www.britannica.com/science/heliocentrism |
| High Luminosity Early Type Objects | 4 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_H.html |
| Hohmann Orbit | 4 | 5 | Britannica | 1 |  |  | https://www.britannica.com/science/Hohmann-orbit |
| Homogeneous Expansion | 4 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_H.html |
| Honeycomb Mirrors | 4 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_H.html |
| Horsehead Nebula | 4 | 5 | Britannica,NED | 2 |  |  | https://www.britannica.com/place/Horsehead-Nebula |
| Hubble Ultra Deep Field | 4 | 5 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/astro/deepfield.html |
| Hyperion (moon) | 4 | 5 | Britannica,NED | 2 |  |  | https://www.britannica.com/topic/Hyperion-astronomy |
| Hypernova | 4 | 5 |  | 0 |  | hypernova |  |
| Ice giant | 4 | 5 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/153/ |
| Ideal Gas | 4 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_I.html |
| Jeans Length | 4 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_J.html#J9 |
| Kepler 186f | 4 | 5 | Britannica | 1 |  |  | https://www.britannica.com/topic/Kepler-186f |
| Lagoon Nebula | 4 | 5 | Britannica,NED | 2 |  |  | https://www.britannica.com/place/Lagoon-Nebula |
| Limb Darkening | 4 | 5 | Britannica,NED | 2 |  |  | https://www.britannica.com/science/limb-darkening |
| Local Bubble | 4 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_L.html |
| Lorentz Contraction | 4 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_L.html |
| Mach's Principle | 4 | 5 |  | 1 | 1 |  |  |
| Magellanic Stream | 4 | 5 |  | 1 | 1 | magellanic-stream |  |
| Magnetohydrodynamics | 4 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_M.html |
| Mass Function | 4 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_M.html |
| Maunder Minimum | 4 | 5 | Britannica | 1 |  |  | https://www.britannica.com/science/Maunder-minimum |
| Mean Solar Time | 4 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_M.html |
| Microwave Radiation | 4 | 5 | Astro4Edu,NED | 2 |  |  | https://astro4edu.org/resources/glossary/term/198/ |
| Monochromatic Radiation | 4 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_M.html |
| Newtonian | 4 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_N.html |
| Non-Thermal Radiation | 4 | 5 | NED | 1 |  | non-thermal-radiation | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_N.html |
| Objective Lens | 4 | 5 |  | 0 |  | objective-lens |  |
| Olbers' Paradox | 4 | 5 |  | 1 |  |  |  |
| Orion Arm | 4 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_O.html#O56 |
| OSIRIS REx | 4 | 5 | Britannica | 1 |  |  | https://www.britannica.com/topic/OSIRIS-REx |
| Pallas | 4 | 5 | Britannica,NED | 2 |  |  | https://www.britannica.com/topic/Pallas |
| Paschen Series | 4 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Phoebe (moon) | 4 | 5 | Britannica,NED | 2 |  |  | https://www.britannica.com/place/Phoebe-astronomy |
| Pisces | 4 | 5 | Astro4Edu,Britannica | 2 |  |  | https://www.britannica.com/place/Pisces |
| Pole star | 4 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Real Image | 4 | 5 |  | 0 |  | real-image |  |
| Regolith | 4 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| Scutum | 4 | 5 | Britannica | 1 |  |  | https://www.britannica.com/place/Scutum-constellation |
| Shell Star | 4 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Shooting Star | 4 | 5 | Astro4Edu,NED | 2 |  | shooting-star | https://astro4edu.org/resources/glossary/term/302/ |
| Sombrero Galaxy | 4 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Southern African Large Telescope | 4 | 5 | Britannica | 1 |  |  | https://www.britannica.com/topic/Southern-African-Large-Telescope |
| stellar lifetimes | 4 | 5 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/astro/startime.html |
| Tektite | 4 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_T.html#T17 |
| Tethys | 4 | 5 | Britannica,NED | 2 |  |  | https://www.britannica.com/topic/Tethys |
| Time | 4 | 5 | Astro4Edu,NED | 2 | 9 |  | https://astro4edu.org/resources/glossary/term/361/ |
| Very Large Telescope | 4 | 5 | Britannica | 1 |  |  | https://www.britannica.com/topic/Very-Large-Telescope |
| Virtual Image | 4 | 5 |  | 0 |  | virtual-image |  |
| VY Canis Majoris | 4 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Wave Period | 4 | 5 |  | 0 |  | wave-period |  |
| White Giant | 4 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_W.html#31 |
| A-type Star | 3 | 5 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/1/ |
| Ap Stars | 3 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Apoapsis | 3 | 5 | Astro4Edu | 1 | 2 | apoapsis | https://astro4edu.org/resources/glossary/term/520/ |
| Apophis | 3 | 5 | Britannica | 1 |  |  | https://www.britannica.com/topic/Apophis |
| Arecibo Observatory | 3 | 5 | Britannica | 1 |  |  | https://www.britannica.com/topic/Arecibo-Observatory |
| Astrolabe | 3 | 5 | Britannica,NED | 2 | 3 | astrolabe | https://www.britannica.com/science/astrolabe-instrument |
| Astronaut | 3 | 5 | Astro4Edu,Britannica | 2 |  |  | https://www.britannica.com/topic/astronaut |
| Baseline | 3 | 5 |  | 0 |  | baseline |  |
| Bolometer | 3 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_B.html |
| Brillouin Scattering | 3 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_B.html |
| Broadband | 3 | 5 |  | 0 |  | broadband |  |
| Compton scattering | 3 | 5 | HyperPhysics,NED | 2 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/quantum/comptint.html |
| Correlated | 3 | 5 |  | 0 |  | correlated |  |
| Electron Phonon Scattering | 3 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_E.html |
| Field Programmable Gate Array | 3 | 5 |  | 0 |  | field-programmable-gate-array |  |
| Fluence | 3 | 5 |  | 0 |  | fluence |  |
| Imperfect Scattering | 3 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_I.html |
| Inverse Plasmon Scattering | 3 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_I.html |
| Kirkwood Gaps | 3 | 5 |  | 1 | 1 | kirkwood-gaps |  |
| Linearly Proportional | 3 | 5 |  | 0 |  | linearly-proportional |  |
| Local Noon | 3 | 5 |  | 0 |  | local-noon |  |
| Maximum Entropy Method | 3 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_M.html |
| Meteor | 3 | 5 |  | 0 |  | meteor |  |
| Mie Scattering | 3 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_M.html |
| Narrowband | 3 | 5 |  | 0 |  | narrowband |  |
| Newton and Infinite Series | 3 | 5 | Britannica | 1 |  |  | https://www.britannica.com/topic/Newton-and-Infinite-Series-1368282 |
| Non Coherent Scattering | 3 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_N.html |
| Non Conservative Scattering | 3 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_N.html |
| Oppenheimer Volkoff Limit | 3 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_O.html#O40 |
| Orrery | 3 | 5 | Britannica | 1 |  |  | https://www.britannica.com/science/orrery-astronomical-model |
| Photoelectric Filtering | 3 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Photon Counting | 3 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Photon Decoupling | 3 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Radiation Damping | 3 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| Ritchey Chrétien | 3 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| Rocard Scattering | 3 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| Rutherford scattering | 3 | 5 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/rutcon.html |
| Schwarzschild Filling Factor | 3 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Segmented Mirrors | 3 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Semi-Major Axis | 3 | 5 | Astro4Edu,NED | 2 |  | semi-major-axis | https://astro4edu.org/resources/glossary/term/393/ |
| Spitzer Schwarzschild Scattering Mechanism | 3 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Stephan's Quintet | 3 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Steradian | 3 | 5 |  | 0 |  | steradian |  |
| Subdwarf (sd) | 3 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Summation | 3 | 5 |  | 0 |  | summation |  |
| Super High Frequency | 3 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Synchrotron | 3 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html |
| Tertiary (mirror) | 3 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_T.html |
| Thales | 3 | 5 |  | 0 |  | thales |  |
| Thermodynamic Potential | 3 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_T.html |
| Thermodynamics | 3 | 5 | HyperPhysics,NED | 2 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/heacon.html |
| Thermohaline Convection | 3 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_T.html#T43 |
| Thomson Scattering | 3 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_T.html#T50 |
| Three Phase CCD | 3 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_T.html |
| Time Average | 3 | 5 |  | 0 |  | time-average |  |
| Uhuru | 3 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_U.html#U5 |
| Ultra High Frequency | 3 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_U.html |
| Umbra | 3 | 5 | Astro4Edu,Britannica,NED | 3 |  |  | https://www.britannica.com/science/umbra-eclipse |
| Anaximander | 2 | 5 |  | 0 |  | anaximander |  |
| Anaximenes | 2 | 5 |  | 0 |  | anaximenes |  |
| Australia Telescope Compact Array | 2 | 5 |  | 0 |  | atca |  |
| Brightest Cluster Galaxies | 2 | 5 |  | 1 | 1 | brightest-cluster-galaxies |  |
| Callippus | 2 | 5 |  | 0 |  | callippus |  |
| Conjunction | 2 | 5 | Astro4Edu,Britannica,NED | 3 |  | conjunction | https://www.britannica.com/science/conjunction-astronomy |
| Constant of Precession | 2 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Coulomb's Law | 2 | 5 | HyperPhysics,NED | 2 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/electric/elefor.html |
| Cross Staff | 2 | 5 |  | 0 |  | cross-staff |  |
| Curvature Constant | 2 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Edmond Halley | 2 | 5 | Britannica | 1 |  |  | https://www.britannica.com/biography/Edmond-Halley |
| Equatorial Mount | 2 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_E.html |
| Equivalent Width | 2 | 5 | NED | 1 |  | equivalent-width | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_E.html |
| G-Type Star | 2 | 5 | Astro4Edu,NED | 2 |  |  | https://astro4edu.org/resources/glossary/term/442/ |
| Heraclitus | 2 | 5 |  | 0 |  | heraclitus |  |
| Hertz | 2 | 5 | NED | 1 |  | hertz | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_H.html |
| Hipass | 2 | 5 |  | 0 |  | hipass |  |
| Ionian Philosophers | 2 | 5 |  | 0 |  | ionian-philosophers |  |
| Jansky | 2 | 5 | NED | 1 |  | jansky | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_J.html |
| K-type Star | 2 | 5 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/168/ |
| Late Type Stars | 2 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_L.html |
| Lower Meridian | 2 | 5 |  | 0 |  | lower-meridian |  |
| M-type Star | 2 | 5 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/453/ |
| Merlin | 2 | 5 |  | 0 |  | merlin |  |
| Mopra Telescope | 2 | 5 |  | 0 |  | mopra-telescope |  |
| O-type star | 2 | 5 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/463/ |
| Post Newtonian Effects | 2 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Poynting-Robertson Effect | 2 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Radiocarbon Dating | 2 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| Rayleigh-Jeans Law | 2 | 5 | HyperPhysics,NED | 2 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/mod6.html |
| Refraction, Law of | 2 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| Rosseland Mean Absorption Coefficient | 2 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| Sest | 2 | 5 |  | 0 |  | sest |  |
| Sky | 2 | 5 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/305/ |
| Upper Meridian | 2 | 5 |  | 0 |  | upper-meridian |  |
| Vsop | 2 | 5 |  | 0 |  | vsop |  |
| Xenophanes | 2 | 5 |  | 0 |  | xenophanes |  |
| 40 Eridani | 1 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_E.html |
| Early Type Spiral | 1 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_E.html |
| Elastic Scattering | 1 | 5 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_E.html |
| Pleione (star) | 1 | 5 | Britannica,NED | 2 |  |  | https://www.britannica.com/place/Pleione |
| Northern Cross | 9 | 4 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_N.html |
| gamma ray | 6 | 4 | Astro4Edu,NED | 2 |  |  | https://astro4edu.org/resources/glossary/term/123/ |
| quark | 6 | 4 | NED | 1 | 11 | quark | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_Q.html#Q30 |
| Ultrashort Period Cepheids | 6 | 4 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_U.html#U7 |
| Wilkinson Microwave Anisotropy Probe (WMAP) | 6 | 4 | Britannica | 1 |  |  | https://www.britannica.com/topic/Wilkinson-Microwave-Anisotropy-Probe |
| Young Disk Cepheids | 6 | 4 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_Y.html#Y9 |
| Ultraviolet Excess | 5 | 4 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_U.html#U10 |
| Amalthea | 4 | 4 | Britannica,NED | 2 |  |  | https://www.britannica.com/place/Amalthea |
| f Number | 4 | 4 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_F.html#F7 |
| Prime Focus | 4 | 4 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Radian | 4 | 4 | NED | 1 |  | radian | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| Velocity | 4 | 4 | HyperPhysics,NED | 2 | 8 | velocity | https://hyperphysics.phy-astr.gsu.edu/hbase/vel2.html |
| Velocity Dispersion | 4 | 4 | NED | 1 |  | velocity-dispersion | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_V.html#V20 |
| Virial Mass | 4 | 4 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_V.html#V49 |
| Henry Draper Catalogue | 3 | 4 | Britannica | 1 |  |  | https://www.britannica.com/topic/Henry-Draper-Catalogue |
| Prograde Motion | 3 | 4 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| PSF | 3 | 4 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Puppis | 3 | 4 | Britannica | 1 |  |  | https://www.britannica.com/topic/Puppis |
| Pyxis | 3 | 4 | Britannica | 1 |  |  | https://www.britannica.com/topic/Pyxis |
| Ras Algethi | 3 | 4 | Britannica | 1 |  |  | https://www.britannica.com/place/Ras-Algethi |
| Rayleigh Taylor Instability | 3 | 4 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| Ulysses | 3 | 4 | Britannica | 1 |  |  | https://www.britannica.com/topic/Ulysses-space-probe |
| Umklapp Scattering | 3 | 4 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_U.html#U17 |
| Uraniborg | 3 | 4 | Britannica | 1 |  |  | https://www.britannica.com/topic/Uraniborg |
| Vacuum | 3 | 4 | Astro4Edu,NED | 2 |  | vacuum | https://astro4edu.org/resources/glossary/term/376/ |
| van Allen Belts | 3 | 4 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/solar/solwin.html |
| Vela X | 3 | 4 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_V.html#V18 |
| Vernal Equinox | 3 | 4 | Britannica,NED | 2 | 1 | vernal-equinox | https://www.britannica.com/science/vernal-equinox |
| Very Long Baseline Interferometry | 3 | 4 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_V.html#V34 |
| Vignetting | 3 | 4 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_V.html#V38 |
| Virgo (constellation) | 3 | 4 | Astro4Edu,Britannica | 2 | 5 |  | https://www.britannica.com/place/Virgo |
| VLA | 3 | 4 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_V.html |
| VLBI | 3 | 4 | NED | 1 | 1 | vlbi | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_V.html |
| VLT | 3 | 4 | HyperPhysics,NED | 2 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/solar/vlt.html |
| Voids | 3 | 4 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_V.html#V61 |
| Voigt Profile | 3 | 4 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_V.html#V62 |
| Volans | 3 | 4 | Britannica | 1 |  |  | https://www.britannica.com/place/Volans |
| Vulpecula | 3 | 4 | Britannica | 1 |  |  | https://www.britannica.com/topic/Vulpecula |
| Waning Crescent | 3 | 4 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/379/ |
| Waning Gibbous | 3 | 4 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/380/ |
| Warp | 3 | 4 | NED | 1 |  | warps | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_W.html#8 |
| Widmanstatten pattern | 3 | 4 | Britannica | 1 |  |  | https://www.britannica.com/science/Widmanstatten-pattern |
| Wolf Lundmark Melotte System | 3 | 4 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_W.html#42 |
| Wolf Number | 3 | 4 |  | 1 | 2 | wolf-number |  |
| Wollaston Prism | 3 | 4 | HyperPhysics,NED | 2 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/phyopt/cdopt.html |
| X-ray | 3 | 4 | Astro4Edu | 1 | 10 | x-rays | https://astro4edu.org/resources/glossary/term/487/ |
| XMM | 3 | 4 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_X.html |
| XMM Newton | 3 | 4 | Britannica,HyperPhysics | 2 |  |  | https://www.britannica.com/topic/XMM-Newton |
| Year | 3 | 4 | Astro4Edu,NED | 2 | 7 | year | https://astro4edu.org/resources/glossary/term/389/ |
| Yerkes System | 3 | 4 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_Y.html#Y7 |
| Yohkoh | 3 | 4 | Britannica | 1 |  |  | https://www.britannica.com/topic/Yohkoh |
| Cd Galaxies | 2 | 4 |  | 1 | 1 | cd-galaxies |  |
| Coalsack | 2 | 4 | Britannica,NED | 2 |  |  | https://www.britannica.com/place/Coalsack |
| Collimator | 2 | 4 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Collisionless Damping | 2 | 4 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Color-Magnitude Diagram | 2 | 4 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Compact HII Region | 2 | 4 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Compact Infrared Sources | 2 | 4 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Compact Radio Source | 2 | 4 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Convective Zone | 2 | 4 | Astro4Edu | 1 |  |  | https://astro4edu.org/resources/glossary/term/433/ |
| Convolution | 2 | 4 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Cor Caroli | 2 | 4 | Britannica | 1 |  |  | https://www.britannica.com/place/Cor-Caroli |
| Correlator | 2 | 4 | NED | 1 |  | correlator | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Cosmological Distances | 2 | 4 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Crater | 2 | 4 | Astro4Edu,Britannica | 2 |  | crater | https://www.britannica.com/place/Crater-constellation |
| Critical Density | 2 | 4 | HyperPhysics,NED | 2 |  | critical-density | https://hyperphysics.phy-astr.gsu.edu/hbase/astro/fried.html |
| Cross Section | 2 | 4 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Curvature | 2 | 4 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Curve of Growth | 2 | 4 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Damping | 2 | 4 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_D.html |
| Dark Current | 2 | 4 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_D.html |
| Dark Matter Halo | 2 | 4 | NED | 1 | 2 |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_D.html |
| Decoupling | 2 | 4 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_D.html |
| Deflection of Light | 2 | 4 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_D.html |
| Deimos | 2 | 4 | Britannica,NED | 2 |  |  | https://www.britannica.com/place/Deimos-moon-of-Mars |
| Delta Cephei | 2 | 4 | Britannica,NED | 2 |  |  | https://www.britannica.com/place/Delta-Cephei |
| Demon Star | 2 | 4 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_D.html |
| Plasma Clouds | 2 | 4 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_P.html |
| Rayleigh Number | 2 | 4 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| Relaxation Time | 2 | 4 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| Resonance Particles | 2 | 4 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| Rayleigh Scattering | 1 | 4 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_R.html |
| neutron | 6 | 3 | Astro4Edu,HyperPhysics,NED | 3 | 1 | neutron | https://astro4edu.org/resources/glossary/term/213/ |
| Faraday Effect | 5 | 3 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_F.html#F20 |
| 21-cm Radiation | 3 | 3 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_T.html |
| 30 Doradus (NGC 2070) | 3 | 3 | NED | 1 | 2 |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_D.html |
| A-type Star| 3 | 3 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_A.html |
| Anthropic Principle | 3 | 3 | Britannica,NED | 2 |  |  | https://www.britannica.com/science/anthropic-principle |
| Axis | 3 | 3 | Astro4Edu,NED | 2 | 1 | axis | https://astro4edu.org/resources/glossary/term/35/ |
| day | 7 | 2 | Astro4Edu,NED | 2 | 10 | day | https://astro4edu.org/resources/glossary/term/436/ |
| Neutron | 6 | 2 |  | 0 |  | neutron |  |
| neutron degeneracy | 6 | 2 | HyperPhysics | 1 |  |  | https://hyperphysics.phy-astr.gsu.edu/hbase/astro/pulsar.html |
| Neutron Drip | 6 | 2 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_N.html |
| Neutron Lifetime | 6 | 2 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_N.html |
| Neutron Matter | 6 | 2 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_N.html |
| compton effect | 3 | 2 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_C.html |
| Inverse Compton Effect | 3 | 2 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_I.html |
| Mass Absorption Coefficient | 3 | 2 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_M.html |
| Aquarius (constellation) | 2 | 2 | Astro4Edu,Britannica | 2 |  |  | https://www.britannica.com/place/Aquarius-astronomy |
| Einstein Effect | 1 | 2 | NED | 1 |  |  | https://ned.ipac.caltech.edu/level5/Glossary/Glossary_E.html |

## Appendix: Merge Map

Keywords merged into parent pages (listed as sub-sections or redirects).

- **Solar System**: Pioneer
- **Be or B Emission Line Stars**: H- ion, ion
- **Black Hole**: Black hole concepts, Black-Hole Entropy, Black-Hole Thermodynamics, Ergoregion, Massive Black Hole, Mini Black Holes, Penrose Process, photon sphere
- **Blackbody**: Blackbody Curve, Blackbody radiation concepts, blackbody spectrum, blackbody-radiation, Planck Distribution, Planck radiation formula, Planck's Radiation Law, Ultraviolet Catastrophe, Wien peak
- **Boson**: bosons, W and Z Particles, W Boson, W particle, Weak Gauge Boson
- **C Stars**: Carbon Stars
- **Chromosphere**: Atmosphere (Solar), Chromospheric Network
- **Coordinate Singularity**: Gravitational Singularity, Naked Singularity, Singularity, Singularity Theorems
- **Earth**: Coriolis Effect, coriolis force, Coriolis Force (Coriolis Effect), Earth's Axis, Earth's Rotation, Geology, Near Earth Asteroid Rendezvous Shoemaker
- **earthshine**: Earthlight
- **Jet**: Head-Tail Galaxies, radio jet
- **Jupiter**: Galilean Satellites, Red Spot
- **Lunar Eclipse**: Magnitude of a Lunar Eclipse, Partial Lunar Eclipse, Total Lunar Eclipse
- **Mars**: Curiosity, Mariner, Mars Atmosphere and Volatile Evolution, Mars Exploration Rover, Mars Express, Mars Global Surveyor, Mars Orbiter Mission, Mars Pathfinder, Mars Polar Lander, Mars Reconnaissance Orbiter, Viking, Viking Space Probes
- **Mercury**: Messenger
- **midnight Sun**: Active Sun, Fictitious Mean Sun, Granules, Mean Sun, Quiet Sun, Solar, Solar Energy, Solar Motion, solar neutrino problem, Solar Neutrinos, Sun Concepts, Sun Path (Day Arc), Sunrise/Sunset
- **Moon**: Clementine, full-moon, Gibbous, Luna, Luna 25, Luna-Resource, Lunar, Lunar Cycle, Lunar Orbiter, Moon exploration, Moonrise, Moonset, Moons, Zond
- **Nova**: Cygnus Loop, Nova Herculis, Nova Persei, Pulsating Nova, Puppis A, Slow Nova
- **P Cygni Star**: P Cyg Stars
- **Pluto**: moons of Pluto
- **Saturn**: Cassini's Division, D Ring, Ring, Saturn's Rings
- **Star**: Neutron Excess (), wolf-rayet-star, wolf-rayet-wr-star, wr-or-wolf-rayet-stars
- **Star Stream**: Star Streaming
- **Sunspot Cycle**: F-Spot, Sunspot Number
- **Tycho's Nova**: Tycho's Star
- **Venus**: Venera, Venus Express
- **Andromeda**: Andromeda I, II, III, m31
- **Andromeda Galaxy**: S Andromedae
- **Annular Eclipse**: Annular Solar Eclipse
- **Ariel**: Ariel (satellite)
- **Asterism**: Hyades (astronomy)
- **Asteroid**: Achilles, Apollo, Asteroid Family, Dawn, Deep Space 1, Hirayama Families, planetoids, Psyche, Small Solar System Body, Trojans
- **Astronomy**: Extragalactic Astronomy, FIRST, Galactic Astronomy, radio map of the sky, Radio Scintillation, Radio Source, Radio Window
- **Auriga**: AE Aurigae
- **Biased Galaxy Formation**: Merger
- **Comet**: Comet Arend-Roland, Comet Ikeya-Seki, Comet Morehouse, Comet Nucleus, Comet Schwassmann-Wachmann 1, Cometary Tail, Comets, Family of, Comets, Group of, Comets, Nomenclature, Deep Impact, Encke's Comet, head (of comet), long-period-variables, Nucleus (of a comet), Stardust/NExT
- **Eclipse**: eclipse, eclipse-annular, eclipse-lunar, eclipse-solar, eclipse-year
- **Galaxy**: B Galaxy, C Galaxies, cluster, clustering, Dumbbell Galaxies (db), E galaxy, Eruptive Galaxy, Exploding Galaxy, Galactic, Galaxy concepts, Galaxy M61, group, L Galaxy, LSBG, Protogalactic Gas Cloud, seyfert-galaxy
- **momentum**: Conservation of Angular Momentum, orbital-angular-momentum
- **Nebula**: dark-nebula, Eagle, Harman-Seaton Sequence, Hubble nebula, Loop Nebula, Ney-Allen Nebula, Orion A, Orion B, proto-solar-nebula
- **Neptune**: Neptunium
- **Planet**: Jovian, Planetocentric Coordinates, Planetographic Coordinates, Superior Planets, terrestrial-planet
- **Solar Eclipse**: Partial Solar Eclipse, Total Solar Eclipse
- **Alpha Centauri**: Centauri
- **Betelgeuse**: Betelgeuse ( Ori)
- **Dark Matter**: Missing Mass, Missing Mass Problem, Missing Matter
- **Dwarf**: Luyten 726-8
- **Early-Type Galaxies**: Early-Type Stars
- **Hydrogen**: H I, Hydrogen Burning, hydrogen cloud, Hydrogen concepts, Negative Hydrogen Ion, Ortho-Hydrogen, Para-Hydrogen
- **Milky Way**: Diffuse Galactic Light, Expanding Arm, Mass of the Galaxy, Milky Way Galaxy
- **Neutral Hydrogen**: Atomic Hydrogen
- **Supernova**: Kepler's Nova, Kepler's Supernova
- **Zodiac**: Zodiac Sign Calculator
- **Disk Galaxies**: Disk Galaxy
- **Einstein Static Universe**: Einstein Universe, Static Universe
- **Energy**: kinetic-energy, planck-energy
- **Equinox**: Autumn, Autumn Equinox, catalog-equinox, dynamical-equinox, equation-equinoxes, equinoxes-precession-of-the, mean-equator-and-mean-equinox
- **General Relativity**: Einstein's General Theory of Relativity, kinematic relativity, Theory of General Relativity
- **Kuiper Belt**: Kuiper Airborne Observatory, Kuiper bands
- **Mass**: Atomic Weight, Barycenter, centre of gravity, Proper Mass
- **Multiverse**: Ensemble (of universes)
- **Neutron Star**: URCA process
- **Orion**: Orion Spur
- **Orion Nebula**: Barnard's Loop, KL nebula
- **Parallax**: Annual Parallax, distance measurement, Horizontal Parallax, Secular Parallax, Solar Parallax, Spectroscopic Parallax, Statistical Parallax, Triangulation
- **Planck Units**: Planck Mass, Planck's hypothesis
- **Pleiades**: Alcyone, m45
- **Pulsar**: PSR
- **Quasar**: Local Hypothesis (of quasars), mini-quasar, QSO
- **Universe**: de Sitter Model, expansion models, Exponential Expansion, Field Equations, Friedmann Models, Friedmann Universe, lemaitre-universe, Open Universe, Oscillating Universe
- **Canis Major**: Canis Majoris, Canis Majoris Star
- **Cygnus X-1**: NML Cygnus
- **Luminosity**: Intrinsic Brightness, intrinsic-luminosity, luminosity-class, Mass-Luminosity Ratio, Sub-Luminous Stars
- **Solstice**: Summer
- **Capella**: Capella ( Aur)
- **Celestial Sphere**: Celestial, Celestial Body, celestial globe, Navigation
- **Constellation**: astronomical map, B Cassiopeiae, Capricorn, Leo Systems, Persei, Persei stars
- **Ecliptic**: ecliptic plane
- **Horizon**: altitude and azimuth, Altitude-Azimuth, Static Limit, Stationary Limit
- **Nebular Hypothesis**: Spitzer-Oort Hypothesis
- **Photometry**: ubv-photometric-system, ubv-system
- **Serpens**: Serpentis
- **Globular Cluster**: Most luminous globular clusters
- **Star Cluster**: Double Cluster in Perseus, Galactic Cluster, Trumpler Stars
- **Telescope**: Aberration, Spherical, Achromat, Antenna Gain, Aplanatic System, cassegrain-focus-telescope, Compound lens, conjugate points, lens, Converging lens, CoRoT, coude-telescope, FAST, Fiber Optics, Field Rotation, Kepler, Keplerian telescope (astronomical telescope), maksutov-telescope, Pulkovo Observatory
- **Sirius**: Companion of Sirius (Sirius B), Sirius ( CMa)
- **Atom**: Atomic Structure, Atomic structure concepts, Atoms, Mass Number
- **LTE**: Color, Color Index, Color-Color Plot, Copernican system, Copernicus, Extended Inflationary Universe, Interference Filter, Ptolemaic Model of the Universe, UBVRI
- **Tide**: Galactic Tide, Tides
- **Aberration**: Aberration, Aberration, E-terms of
- **Absorption**: Absorption Edges
- **Absorption Line**: absorption, quantum
- **Active-Galactic-Nuclei**: nucleus, Relativistic Beaming, Violent Galaxy
- **Astronomical Coordinate Systems**: Astronomical Coordinates
- **Astronomical-Unit**: astronomical-unit, AU
- **Atomic Orbital**: Anomaly, Commensurate Orbits, Equation of Center, Kepler's 3rd law, Keplerian orbit, orbit, orbit-circular, orbit-concepts, orbit-velocity, osculating-orbit, Regression of the Nodes
- **Cosmic-Microwave-Background**: 3K background radiation, Adiabatic Fluctuations, Background Noise, background radiation, 3K, COBE, cosmic background radiation, Cosmic Background Radiation (CBR), Cosmic Microwave Background Radiation (CMBR), cosmic-microwave-background, cosmic-microwave-background-cmb, Fluctuations, Microwave Background Radiation, microwave-background, Primordial Fireball Radiation, Quantum Fluctuations, Thermal Background
- **Electromagnetic-Spectrum**: Electromagnetic Spectrum, Energy Spectrum, microwave, spectrum, waves, electromagnetic
- **Hubble-Law**: Hubble Parameter, hubble-constant-and-red-shifts, hubble-diagram, hubble-law, hubble-lemaitre-law, hubble-radius, Newtonian model of expansion, Velocity-Distance Relation
- **kelvin**: kelvin (K), Kelvin scale
- **Matter**: Baryonic, Nuclear Matter, Shadow Matter
- **R Coronae Borealis star**: R CrB Stars
- **red-supergiant**: Red Supergiant
- **Big-Bang**: big-bang, big-bang-expansion, big-bang-model, big-bang-theory, hot-big-bang, Primeval Fireball, Primordial Chaos, Standard Big Bang Model
- **binding-energy**: binding-energy-curve, binding-energy-nuclear
- **bodes-law**: bodes-law
- **coma-cluster**: Coma Cluster
- **Cosmic Microwave Background**: Dipole Anisotropy, Microwave Background Anisotropy Experiment, Planck, WMAP mission
- **Cosmological-Principle**: isotropic
- **crab-nebula**: taurus-a
- **crux**: Southern Cross
- **exoplanet**: CoRoT-7b, extrasolar planet
- **Great Attractor**: Attractor
- **Hadron**: hadron
- **hertzsprung-russell-diagram**: CMD, H-R Diagram, hertzsprung-russell-hr-diagram, Hess Diagram, turn-off-point
- **Hierarchical-Clustering**: hierarchical-clustering, hierarchical-clustering-model
- **keplers-laws**: keplers-second-law, understanding-keplers-laws
- **lagrange-point**: Fixed Point, lagrangian, lagrangian-points
- **Local Group**: Sculptor Group
- **Milky-Way**: Apogalacticon, Galactic Bar, Galactic Disk, Galactic Light, local-arm
- **special-relativity**: Proper Time, Relativistic
- **stellar-classification**: mkk-system
- **Apparent-Magnitude**: h-magnitude, J magnitude, K magnitude, L-magnitude, M magnitude, magnitudes, N-Magnitude, O Magnitude, Photoelectric Magnitude, Photographic Magnitude, Photovisual Magnitude, Visual Magnitude
- **Big-Crunch**: big-crunch
- **Bolometric-Magnitude**: bolometric-correction
- **bootes**: bootis
- **canopus**: canopus-car
- **corona**: Coronal Equilibrium, Coronal Green Line, F Corona, Geocorona, K corona
- **cosmic-ray**: burst-cosmic-ray, Cosmic -Ray Bursts, Cosmic Radiation, Cosmic Rays, Cosmic Ray Astronomy, Primary Cosmic Rays
- **cygnus-a**: Cygnus A
- **Epoch**: Ephemeris Longitude, Ephemeris Second, Ephemeris Time, Ephemeris Transit, epoch, Standard Epoch
- **eridanus**: eri
- **General-Relativity**: curvature of space-time, general-relativity-ideas, Principle of Equivalence
- **Large-Magellanic-Cloud**: large-magellanic-cloud, large-magellanic-cloud-lmc
- **luminosity-distance**: Diameter Distance, Horizon Distance
- **Magellanic-Clouds**: Clouds of Magellan, magellan, magellanic-cloud
- **Ophiuchus**: ophiuchi, ophiuchus
- **period-luminosity-relation**: period
- **Positron**: positron
- **Procyon**: procyon
- **Spectroscopy**: Polarimeter, Spectroheliograph, spectrometer, spectroscopic-notation, spectroscopy
- **spiral-galaxy**: Spiral Nebula
- **stellar-evolution**: B2FH, Neutrino Process, Photoneutrinos
- **virgo-supercluster**: local-supercluster, supercluster
- **William-Herschel**: herschel
- **Balmer-Series**: balmer-formula, hydrogen spectrum
- **calendar**: Gregorian Calendar, Julian Date, Julian Date, Modified, Julian Year
- **Celestial Coordinates**: Celestial Longitude, Coordinates, Latitude, Celestial
- **celestial-mechanics**: Dynamics, mechanics
- **centaurus**: cen-a, centaurus-cluster
- **Cepheid Variable**: cepheid, cepheid-variable
- **Cosmic Distance Ladder**: Extragalactic Distance Scale
- **cosmic-distance-ladder**: distance-ladder, long-distance-scale
- **Equatorial-Coordinate-System**: celestial-coordinates, Position Angle
- **gravitational-lens**: Gravitational Lensing, Gravitational-Lens Effect
- **helium-variable-stars**: liquid helium
- **hercules**: hercules-cluster
- **Hour-Angle**: ephemeris-hour-angle
- **Hyades**: hyades
- **Hydra**: hydra
- **metallicity-gradient**: metal, metal-rich, metallicity
- **Meteoroid**: meteor-and-meteoroid, meteoroid
- **Molecular-Cloud**: Gas Cloud, molecular-cloud, molecular-cloud-complex, orion-molecular-cloud-1
- **Molecule**: Gas, Hydrocarbon, molecule
- **Omega-Centauri**: omega, omega-centauri
- **Phases**: Crescent Moon, Gibbous Moon, Half Moon, Phase, Phase Angle, Quarter Moon, Solar Phase Angle
- **sagittarius**: sagittarius-b2
- **Small-Magellanic-Cloud**: small-magellanic-cloud
- **stellar**: Evolution, Explosive Nucleosynthesis, fueling of the stars, Halo Population, heaviest elements, Interstellar Cloud, interstellar-gas, interstellar-hydrogen, interstellar-lines, interstellar-matter, interstellar-molecules, interstellar-reddening, interstellar-space, kinematics, magnetic-field, nucleosynthetic-era, Old Stars, Population, Population Inversion, Populations I and II, Reddening, Star processes
- **stellar-association**: Association, Carina OB 2, Perseus OB1, Perseus OB2, Scorpius OB1, t-associations
- **supergiant**: most-luminous-supergiants
- **Visual Binary**: visual binaries, visual-binary-star
- **Hubble Law**: Hubble Time
- **hubble-flow**: expansion, Hubble Expansion
- **Lepton**: lepton, lepton-era, leptonic-era
- **Redshift**: Blue Shift, Cosmological Redshift, parameter z, red-shift, redshift-distance-relation, redshift-magnitude-test, redshift-survey, z parameter
- **Seasons**: Polar Night, seasons, Winter
- **Standard-Candle**: standard-candle, standard-ruler
- **thermodynamics-second-law**: Atomic Second
- **Distance-Modulus**: distance-modulus
- **ara**: Density Parameter
- **hubble-space-telescope**: deep field, Extreme Deep Field, HST, Hubble Program
- **Space**: Dragon, Genesis, Starliner, Starship
- **Apex**: Solar Apex
- **Aperture**: Aperture Photometry
- **Cataclysmic-Variable**: SS Cygni Stars, WZ Sagittae, Z Camelopardalis Stars
- **Europa**: Europa (J II)
- **Vela Pulsar**: vela
- **VV Cephei Stars**: VV Cep Stars
- **Concordance-Model**: Cosmological Model, Flat Universe, Metric, Standard Model of Cosmology
- **Cosmic-Censorship-Conjecture**: Cosmic Censorship, Penrose's Theorem
- **Cosmology**: Bianchi Cosmology, Cosmos, Dirac Large Number Hypothesis, Geocentric Cosmology, hierarchical-cosmology, Milne Cosmological Model, Newtonian Cosmology, Physical keys to cosmology, Relativistic Cosmology, Scale Factor
- **Density**: Column Density (N), Cosmic Matter Density, Critical Mass Density, Density Wave, Mass Models, Spiral Density Wave
- **Harmonic**: Overtone
- **Si-Units**: International System of Units, Newton (N), Second, SI Units, units
- **Solar-Flare**: Burst (Solar), Flare, Solar, Reconnection, Solar Burst, solar radiation
- **Sunspot**: P-Spot, Spörer's Law of Zones
- **Zenith**: Zenith Distance
- **Bandpass**: Bandpass Filter, Spectral Bandwidth
- **Cometary Coma**: Coma (of a comet)
- **Compton Wavelength**: Wave, Wavelength, Waves
- **Gamma-Ray-Burst**: Compton Gamma Ray Observatory, Gamma, Gamma Decay, gamma-rays
- **Ganymede**: Ganymede (J III)
- **Io**: 21-centimetre radiation, Arm Population, Auto-Ionization, brehmsstrahlung radiation, Copernican Model of the Universe, Decoupling Epoch/Era, Five-Minute Oscillations, Fusion concepts, gravitational acceleration g, Gravitational Encounter, Gravitational Energy, gravitational field, gravitational potential energy*, Gravity and the photon, gravity-waves, H II Condensation, Henry Draper system, high resolution, Inner Bremsstrahlung, Intensity Interferometry, Interferometer, Inverse Bremsstrahlung, Ionization Radiation, Ionized, ionizing radiation, law of gravity, law-of-universal-attraction, Lensing, Light, Deflection of, Most luminous H II regions, Neutrino Bremsstrahlung, New Inflationary Universe, Newton's 2nd Law, Newton's 3rd Law, Newton's second law, Newton's second law for rotation, Newton's third law, newtons-constant-g, newtons-first-law, newtons-law-of-gravitation, newtons-universal-gravitational-constant, Oe, Open Inflationary Universe Theory, Recombination Radiation, Relativistic Bremsstrahlung, Resolution, Retrograde, Right Ascension (RA), rotational motion, Space Motion, Spin-Flip Collisions, Supra-Thermal Proton Bremsstrahlung, Thermal Bremsstrahlung, Weak G-band Stars, Weak-Line Stars
- **Large-Scale-Structure**: Great Wall, Large-Scale Motions, Large-Scale Structure, Structure
- **Spectral Classification**: Bootis Stars, Bw Stars, Calcium Star, dKe, dMe Stars, Early-Type Emission Stars, HZ Stars, Manganese Stars, MS Stars, P-Strong Stars, Star Classification
- **Spiral-Arm**: Interarm Region, Spiral Arm
- **Chandrasekhar Limit**: Eddington mass limit
- **Equivalence-Principle**: Einstein Equivalence Principle
- **General-Theory-Of-Relativity**: Principle of Relativity, Relativity
- **Pollux**: Pollux ( Gem)
- **Infrared Astronomy**: FIR, Infrared, Infrared Photometry, infrared source, IR, Stratospheric Observatory for Infrared Astronomy
- **Meteorite**: Aerolite, ALH84001, Antarctic meteorite, cohenite, Ensisheim meteorite, Fall, Iron Meteorite, Meteor, Meteoritical Society, meteoritics, micrometeoroid, Murchison Meteorite, Murray Meteorite, Orgueil Meteorite, stony iron meteorite, stony meteorite
- **Photosphere**: Photosphere of the Sun
- **Supernova Remnant**: SNR
- **Temperature**: Brightness Temperature
- **Hickson-Compact-Groups**: Rich Clusters
- **Homocentric-Sphere-Model**: Epicycle Theory
- **Precession**: General Precession, Geodetic Precession, Lunisolar Precession, Polar Motion, Precession of the Equinoxes, Precession, Constant of, Secular Acceleration, top precession
- **Baryons**: Baryon, Baryon Number
- **Anomalistic Year**: Anomalistic Month
- **Arcminute**: Minute of Arc
- **Chandra**: Chandrasekhar-Schönberg Limit
- **Machos**: MACHO
- **Big-Dipper**: Big Dipper, the
- **Doppler-Shift**: Doppler effect, relativistic, Doppler Shift, relativistic doppler shift
- **Nuclear Fusion**: Fission, Nuclear Fission
- **Planck Time**: Planck Epoch/Planck Time
- **Ptolemy**: Tycho
- **SETI**: Extraterrestrial Intelligence, Intelligence, Project Ozma
- **Space-Time**: Space-Like Path, Space-Time Continuum, Space-Time Foam
- **Absolute Magnitude**: Absolute Brightness
- **Airy-Disk**: Airy Diffraction Disk
- **Albedo**: Bond Albedo, Geometric Albedo
- **Almagest**: ESA
- **Angular-Diameter**: Angular Dispersion, Angular Displacement, Angular Size, Semi-Diameter
- **Apparent Magnitude**: magnitude of star
- **Atmosphere**: atmospheric pressure, Gray Atmosphere, Ionosphere, Mesosphere, Non-Gray Atmosphere, Plane-Parallel Atmosphere, Refraction, Astronomical, Stratosphere
- **coronal mass ejection**: Coronal Mass Ejection (CME)
- **cosmological constant**: Cosmological Constant Problem
- **Cosmological-Constant**: Lambda (), Lambda Term
- **Disk-Galaxies**: Disk
- **Element**: Chemical Elements, elements-orbital, longitude-of-the-perihelion, Mean Elements
- **Frequency**: Frequency Distribution, Frequency Standard, Fundamental Frequency, Harmonic Motion
- **Galactic-Anti-Centre**: Anticenter
- **Gemini**: Gem
- **Gravitation**: Gravity concepts, gravity field
- **Inflation**: New Inflation, Old Inflation
- **Julian Calendar**: Julian Proleptic Calendar
- **Lens**: lenses
- **Leo**: Leo I, Leo II
- **LIGO**: laser-interferometer-gravitational-wave-observatory
- **Messier Object**: Messier catalog
- **Node**: Ascending Node, Descending Node, Nodes, Line of
- **Regulus**: Regulus
- **Roche Lobe**: Inner Lagrangian Point (L1)
- **Solar Day**: Mean Solar Second
- **Thick-Disk**: Thick Disk
- **Thin Disk**: Disk Star, Old Thin Disk
- **Thin-Disk**: Thin Disk, Young Thin Disk
- **Zeeman-Effect**: Anomalous Zeeman Effect, spin-orbit effect, spin-orbit interaction
- **Balmer Series**: Pfund Series
- **Big Bang Nucleosynthesis**: Electroweak Force, Inflationary Cosmology, Matter Era, modeling of nucleosynthesis
- **BL Lac Object**: BL Lacertae
- **Brightness**: Surface Brightness
- **Diffraction**: Diffraction concepts
- **elongation**: Elongation, Greatest, Elongation, Planetary, elongation-satellite
- **Extinction**: Color Excess
- **Grand Unified Theory**: Unified Field Theory
- **Hydrostatic-Equilibrium**: Equilibrium, Gravitational Equilibrium, Radiative Equilibrium, Statistical Equilibrium, Thermal Equilibrium, Thermodynamic Equilibrium
- **Intercloud-Gas**: Intercloud Medium
- **Large-Scale Structure**: Density Fluctuations, Density Perturbations, Isothermal Fluctuations, Perseus-Pisces Region
- **Magnetic Monopole**: Magnetic Monopole Problem
- **Meridian**: celestial-meridian, Culmination, Lower Culmination, Upper Culmination
- **Mira**: o Ceti
- **Mirror**: Converging mirror
- **Orbital Elements**: Eccentric Anomaly, Mean Anomaly, Mean Motion, Osculating Elements
- **Orbital-Eccentricity**: Eccentric, Eccentricity
- **Schwarzschild-Radius**: Gravitational Radius, Schwarzschild, Schwarzschild Solution
- **Spectra**: Band Spectrum, continuous-spectrum, Hyperfine Structure, Lambda Doublet, Line Broadening, Line Profile, Line Spectrum, Pressure Broadening, Resonance Line, Spectral Line, U line, Werner Lines
- **Wien displacement law**: Wien's Law
- **Arthur Eddington**: Eddington Approximation
- **Bellatrix**: Bellatrix ( Orionis)
- **Blue-Stragglers**: blue straggler star, Blue Stragglers
- **Bulges**: Bulge
- **Carbonaceous Chondrite**: achondrite
- **Cassiopeia**: WZ Cassiopeiae
- **Celestial Equator**: Equator, True Equator and Equinox
- **Celestial Pole**: North Celestial Pole (NCP), Polar Axis
- **Comoving Distance**: Co-Moving Coordinates
- **Cosmic Rays**: Secondary Cosmic Rays
- **Cosmological Principle**: Perfect Cosmological Principle
- **Differentiated Object**: Differentiation
- **Effective Temperature**: kinetic temperature
- **Electron Degeneracy Pressure**: electron degeneracy
- **Electron Volt**: electron volt, Electron Volt (eV)
- **European Southern Observatory**: ESO
- **Lyman Alpha**: Lyman Alpha Clouds, Lyman Alpha Line
- **Mount Wilson Observatory**: Mt. Wilson
- **North Galactic Pole**: North Galactic Pole
- **Optics**: Deformable Mirror
- **P-Process**: e-Process, X Process
- **Periastron**: Periastron
- **Perturbation**: Perturbation Expansion, Perturbation Method
- **Proper Motion**: Reduced Proper Motion
- **Radiation Pressure**: Light Pressure, Magnetic Pressure, Pressure
- **Radio Astronomy**: Faraday Rotation, National Radio Astronomy Observatory, radio and radar astronomy
- **Roche Lobe**: Roche Lobe
- **RR Lyrae Star**: Lyrae
- **South Galactic Pole**: South Galactic Pole
- **Stellar Halo**: Blue Halo Stars
- **Supergalactic Coordinate System**: Supergalactic Plane
- **Triple Alpha Process**: Triple- process, Triple-alpha process
- **Effective Radius**: Effective Radius
- **Emission Line**: emission, quantum, emission, stimulated
- **Emission Nebula**: Diffuse Nebula, Gaseous Nebula
- **Interacting Galaxies**: Double Galaxies
- **Tau Ceti**: Ceti
- **Voyager Program**: Voyager
- **Cno-Cycle**: Bethe-Weizsäcker Cycle, Carbon Cycle, Carbon Cycle (carbon-nitrogen cycle), CNO Bi-Cycle, CNO Stars, CNO Tri-Cycle
- **Galactic Anti-Centre**: Galactic Anticenter
- **Galactic Winds**: Galactic Wind
- **Geomagnetic Storms**: Geomagnetic Storm
- **Solar Cycle**: Dynamo
- **Aurora**: Airglow, Aurora Australis, Aurora Borealis
- **Centaurs**: Centaur object, Chiron
- **Constructive-Interference**: interference, Interference Pattern
- **Fireball**: Fireball
- **Flatness-Problem**: Flat
- **Flocculent-Spiral**: Flocculus
- **Flux**: Flux Unit, Irradiance
- **Forbush-Decrease**: Forbush effect
- **Fornax**: Fornax A
- **Fossil-Groups**: Fossils
- **Fourier-Transform**: Fourier Analysis, Fourier Component, Fourier series, Fourier Theorem
- **Fwhm**: FWHM
- **Galactic-Coordinate-System**: galactic coordinate, Galactic Latitude, Galactic Longitude, Galactic Pole
- **Geocentric**: Geocentric Model
- **Grand-Unified-Theory**: Grand Unification
- **Satellite**: Explorer, Vanguard
- **Schwarzschild Radius**: Schwarzschild Singularity
- **Bok-Globule**: Globule
- **Celestial-Coordinates**: Geocentric Coordinates, Geodetic Coordinates
- **CNO Cycle**: carbon fusion, Carbon-Nitrogen Cycle
- **Degenerate-Electron-Pressure**: Degeneracy Pressure, Degeneracy Temperature, Degenerate, Zero-Point Pressure
- **Epsilon-Eridani**: Epsilon Indi
- **Galactic-Plane**: Galactic Plane
- **Great Observatories**: Mount Stromlo and Siding Spring Observatories
- **Inertia**: Moment of Inertia
- **Interacting-Galaxies**: Interaction
- **Intergalactic Medium**: Intergalactic Matter
- **Intergalactic-Medium**: Intergalactic Gas, Intergalactic Medium
- **Orbital-Resonance**: Resonance, Resonance Capture
- **Scale-Length**: Scale Length
- **Triple-Alpha-Process**: Coulomb Barrier, Helium Fusion, Helium Shell Flash
- **Canis-Minor**: Canis Minoris
- **Celestial-Poles**: South Celestial Pole (SCP), South Pole
- **Fraunhofer-Lines**: Fraunhofer Diffraction
- **Nyquist-Rate**: Nyquist Sampling
- **Polarization**: Polarization (polarimeter), Polarization Modulator, Polarization of Light
- **Population I**: Population I & II stars, Population I, II, and III
- **Ram-Pressure-Stripping**: Ram Pressure
- **Scale-Height**: Pressure Scale Height
- **Fermi paradox**: Fermi
- **Light**: Light Year, light, speed of, Light-Time, refraction, light, Speed of Light, Tired Light, visible light
- **Meteor-Shower**: Leonid Meteor Shower, meteorite shower, Perseid Meteor Shower
- **Periapsis**: Periapsis, Perigalacticon
- **Antarctic-Circle**: Antarctic Circle, Arctic Circle
- **Apogee**: Apogee
- **Arctic Circle**: Polar Circle
- **Artemis-Program**: Artemis Accords, Artemis II
- **Lyra**: Bailey Types, RR Lyr
- **Month**: Draconic Month, Nodical Month, Synodic Month
- **Solar Flare**: Solar Flare
- **Trans-Neptunian-Objects**: Trans-Neptunian Object
- **Ultraviolet**: Ultraviolet Excess Screening, Ultraviolet Light, Ultraviolet Radiation, Ultraviolet-Bright Stars, UV, UV Stars
- **Zone-Of-Avoidance**: Avoidance, avoidance, zone of, Zone of Avoidance
- **Cancer**: Tropic of Cancer
- **Chondrule**: chondrule
- **Core-Collapse**: Gravitational Collapse
- **Dust-Grain**: Dust
- **Galactic-Equator**: Galactic Equator
- **Galactic-Filaments**: Filament
- **Glitch**: Glitch
- **Habitable-Zone**: Life Zone
- **Heliocentrism**: Heliocentric, Heliocentric Model
- **Mach%27S-Principle**: Mach's Principle
- **Magellanic-Stream**: Magellanic Stream
- **Time**: Atomic Time, Chronometer, Coordinated Universal Time (UTC), Greenwich Mean Time Zone (GMT), International Date Line, Look-Back Time, Universal Time (UT), UT1, UTC
- **Zone Of Avoidance**: Great Rift
- **Apoapsis**: Apoapsis, Apocenter
- **Astrolabe**: Armillary Sphere, Astrolabe, Quadrant
- **Kirkwood-Gaps**: Kirkwood gaps
- **Brightest-Cluster-Galaxies**: BCG
- **Quark**: Anti-Quark, charm quark, down quark, Primordial Quarks, quark confinement, Quark Jet, Quark-Hadron Phase Transition, quarks, strange quark, top quark, up quark
- **Velocity**: Acceleration, Solar Velocity, Space Velocity, Tangential Velocity, Terminal Velocity, Transverse Velocity, U Velocity, Velocity Field
- **Vernal Equinox**: First Point of Aries
- **Virgo**: Virginis, Virgo A, Virgo Infall, Virgo X-1, virgo-cluster
- **VLBI**: VLTI
- **Wolf-Number**: Wolf Diagram, Wolf Number (R)
- **X-ray**: Cen X-2 and Cen X-4, cosmic X-ray background, Cygnus X-2, Cygnus X-3, Cygnus X-5, Perseus X-1, SMC X-1, Transient X-Ray Sources, X-ray source, X-Rays
- **Year**: Aeon (or Eon), Solar Calendar, Solar Year, Tropical Year, Tropical Year (Solar Year), Year (Besselian), Year (Tropical)
- **Cd-Galaxies**: Core-Halo Galaxies
- **Celestial-Sphere**: Circumpolar Stars
- **Dark Halo**: Halo, Massive Halos
- **Dark-Halo**: Dark Halo
- **Degree-(Angular)**: Degree
- **Neutron**: Anti-Neutrino
- **30 Doradus (NGC 2070)**: NGC, NGC catalog
- **Axis**: minor-axis
- **Day**: Apparent Solar Day, Apparent Solar Time, Greenwich Sidereal Date, Local Sidereal Time, Mean Solar Day, Night, Polar Day, Sidereal, Sidereal Day, Sidereal Hour Angle



