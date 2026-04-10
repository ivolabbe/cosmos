# Starlink — Article Spec

## STATUS: COMPLETE

## Category
observing

## Definition
Starlink is a satellite internet constellation operated by SpaceX, comprising over 10,000 satellites in low Earth orbit (LEO) as of early 2026 — roughly 65% of all active satellites. Visible to the naked eye shortly after launch as a "train" of bright dots, the constellation has become a major concern for ground-based optical and radio astronomy due to satellite trail contamination in telescope images and unintended radio-frequency emissions.

## Key Numbers

| Property | Value | Source |
|----------|-------|--------|
| Active satellites (Mar 2026) | >10,020 | [Wikipedia] |
| Fraction of all active satellites | ~65% | [Wikipedia] |
| Subscribers | 10 million (Feb 2026) | [Wikipedia] |
| Operational altitude (Gen1) | 550 km | [Wikipedia] |
| Gen2 authorized altitudes | 525, 530, 535 km (upper); 340-360 km (lower) | [FCC 22-91] |
| Gen2 inclinations | 53, 43, 33 deg | [FCC 22-91] |
| Satellite mass (v1.0) | 260 kg | [Wikipedia] |
| Satellite mass (v1.5) | ~306 kg | [Wikipedia] |
| Satellite mass (v2 mini) | ~740 kg | [Wikipedia] |
| Satellite mass (v2 full) | ~1,250 kg | [Wikipedia] |
| Visual mag (v1.0, no mitigation) | ~5 (optical) | [Tregloan-Reed+ 2021, A&A] |
| Visual mag (DarkSat) | ~6 (optical), ~0.5 mag fainter | [Tregloan-Reed+ 2021, A&A] |
| Visual mag (VisorSat) | ~1.29 mag fainter than v1.0 (31% as bright) | [Mallama 2021, arXiv] |
| Visual mag (v1.5 operational) | ~6.8 | [Mroz+ 2022, ZTF study] |
| SATCON1 target brightness | 7th magnitude or fainter | [SATCON1 2020] |
| Operational lifespan per satellite | 5-7 years | [Wikipedia] |
| Deorbit timeline | ~1 year after end of life | [Wikipedia] |
| FCC authorized total (Gen2) | 7,500 + 7,500 = 15,000 | [FCC 22-91, FCC DA-26-36] |
| Total requested (Gen2 full) | ~29,988 | [FCC filings] |
| Development cost | ~US$10 billion (2018 est.) | [Wikipedia] |

## Full Content

### What Starlink Is
- Starlink is a broadband internet constellation built and operated by SpaceX in low Earth orbit (LEO), designed to provide global internet coverage, especially to underserved and remote areas [Wikipedia]
- As of March 2026, the constellation comprises over 10,000 active satellites — roughly 65% of all operational satellites — making it the largest artificial satellite constellation ever deployed [Wikipedia]
- The satellites operate primarily at ~550 km altitude (Gen1) and 340-535 km (Gen2 shells), using Ku-, Ka-, E-, and V-band radio frequencies [FCC 22-91]

### Visual Appearance and Naked-Eye Visibility
- Starlink satellites are visible to the naked eye, especially in the days immediately following a launch when they fly in a closely-spaced "train" formation before dispersing to operational orbits [Space.com]
- Best viewing occurs 1-2 hours after sunset or before sunrise, when the observer is in darkness but satellites at altitude are still illuminated by the Sun [Space.com]
- Satellites proved unexpectedly bright at launch — operators had not anticipated how reflective they would be [Space.com]
- At operational altitude, individual satellites appear as steady points of light moving across the sky, distinguishable from aircraft by their lack of blinking lights [Space.com]

### Impact on Optical Astronomy
- Ground-based telescopes record satellite trails as bright streaks across long-exposure images, contaminating science data [SATCON1 2020]
- ZTF archival data (Nov 2019 - Sep 2021): 5,301 satellite streaks detected; twilight images affected grew from 0.5% (2019) to nearly 20% (2021) [Mroz+ 2022, Caltech]
- At 10,000+ satellites, nearly all twilight images are expected to contain at least one streak [Mroz+ 2022, Caltech]
- Twilight observations are disproportionately affected — these are critical for detecting near-Earth asteroids, outer Solar System objects, and optical counterparts of gravitational-wave sources [SATCON1 2020]
- The Vera C. Rubin Observatory (LSST) is expected to be more severely affected than ZTF due to its wider field of view and greater sensitivity [Mroz+ 2022, Caltech]
- Each streak affects less than 0.1% of pixels in a single ZTF image, but the cumulative effect across a survey is significant [Mroz+ 2022, Caltech]

### Impact on Radio Astronomy
- Starlink satellites continuously beam radio signals to Earth for internet service, creating interference for radio telescopes [Space.com]
- Analysis of 76 million images from an SKA prototype station found Starlink emissions in up to 30% of images in some datasets [Space.com]
- 112,000+ radio emissions were detected from 1,806 Starlink satellites, including 703 satellites emitting at 150.8 MHz — a frequency band protected for radio astronomy [Space.com]
- Starlink v2-mini satellites emit up to 32 times more unintended electromagnetic radiation (UEMR) than earlier versions — about 10 million times brighter in radio than faint objects targeted by LOFAR [Astronomy.com]
- Radio wave "spillover" cannot be sharply cut off at frequency boundaries, making full mitigation physically impossible [Space.com]

### Mitigation Efforts by SpaceX
- **DarkSat** (STARLINK-1130): experimental satellite with darkened coating; reduced optical brightness by ~0.5 mag but effectiveness decreased at longer (NIR) wavelengths; abandoned due to thermal management issues [Tregloan-Reed+ 2021, A&A]
- **VisorSat**: deployable sunshade blocking sunlight from phased-array and parabolic antennas; reduced brightness by 1.29 mag (satellites 31% as bright as unmitigated v1.0); deployed on all satellites from Aug 2020 - Jun 2021 [Mallama 2021]
- **v1.5 satellites**: brightness mitigation reduced scattered sunlight by ~40%; operational brightness ~6.8 mag — still above the SATCON1 target of 7th magnitude [Mroz+ 2022]
- **v2 mini**: despite 4x greater surface area than v1.0, brightness is comparable to v1.0 due to dielectric mirrors, off-pointed solar arrays, and black paint on exposed components [arXiv 2306.06657]
- During orbit-raising, v2 mini satellites are much brighter (mag ~2.7 below 357 km) before brightness mitigation engages at operational altitude (mag ~6.5) [arXiv 2405.12007]

### Astronomical Community Response
- **SATCON1** (Jun-Jul 2020): AAS/NOIRLab workshop with 250+ participants; concluded large LEO constellations will "fundamentally change ground-based optical and infrared astronomy"; recommended satellites below 600 km altitude and 7th magnitude or fainter [SATCON1 2020, AURA]
- **SATCON2** (Jul 2021): follow-up workshop, 350+ participants from 40 countries; established working groups on Observations, Algorithms, Community Engagement, and Policy; called for funded collaborative mitigation effort [SATCON2 2021, AAS/AURA]
- Tools developed: TrailMask (flag/mask/repair satellite trails), PassPredict (predict trail timing), simulation frameworks to assess scientific impact [SATCON2 2021]
- IAU has raised formal concerns about satellite constellations' impact on the night sky and astronomical heritage [IAU 2019]

### Broader Context
- Starlink is not alone — OneWeb, Amazon Kuiper, and other operators plan their own mega-constellations, compounding the problem [SATCON1 2020]
- OneWeb satellites at ~1,200 km altitude are of particular concern: they remain sunlit longer and affect observations throughout summer nights [SATCON1 2020]
- Satellites below 600 km move faster across the sky, producing shorter streaks in images, and enter Earth's shadow sooner — hence the preference for lower orbits [SATCON1 2020]
- Deorbiting: each satellite is designed to propulsively deorbit within ~1 year of end-of-life, with a 5-7 year operational lifespan [Wikipedia]

## Historical Context
- January 2015: SpaceX CEO Elon Musk announced plans for a satellite internet constellation at a Seattle event [Wikipedia]
- February 2018: two test satellites (Tintin A and B) launched aboard Falcon 9 [Wikipedia]
- March 2018: FCC authorized initial constellation of 4,425 satellites [Wikipedia]
- May 2019: first operational batch of 60 Starlink satellites launched; widely observed as a bright "train" of lights, sparking immediate concern among astronomers and the public [Wikipedia, Space.com]
- October 2020: Starlink beta service ("Better Than Nothing Beta") opened to customers [Wikipedia]
- June-July 2020: SATCON1 workshop convened by AAS and NOIRLab to assess impact on astronomy [AURA]
- August 2020: VisorSat brightness-mitigation design deployed on new satellites [Mallama 2021]
- July 2021: SATCON2 follow-up workshop, 350+ participants from 40 countries [AAS/AURA]
- December 2022: FCC granted partial Gen2 authorization for 7,500 satellites [FCC 22-91]
- February 2023: first v2 mini satellites launched [Wikipedia]
- January 2026: FCC authorized additional 7,500 Gen2 satellites at lower altitudes (340-360 km), bringing total Gen2 authorization to 15,000 [FCC DA-26-36]
- February 2026: Starlink reached 10 million subscribers globally [Wikipedia]
- March 2026: constellation exceeded 10,000 active satellites [Wikipedia]
- The name "Starlink" was chosen by SpaceX; no astronomical etymology [Wikipedia]

## Sub-types / Classifications

### Satellite Versions
| Version | Mass | Period | Key Features |
|---------|------|--------|--------------|
| v0.9 (test) | 227 kg | 2019 | No inter-satellite laser links |
| v1.0 | 260 kg | 2019-2020 | First operational version |
| v1.5 | ~306 kg | 2021-2022 | Laser inter-satellite links, improved brightness mitigation |
| v2 mini | ~740 kg | 2023-present | 4x surface area of v1.0, dielectric mirrors, direct-to-cell capability |
| v2 (full) | ~1,250 kg | Planned for Starship | Full-size Gen2 satellite, awaiting Starship launch capability |

### Brightness Mitigation Approaches
| Approach | Satellite | Method | Effectiveness |
|----------|-----------|--------|---------------|
| DarkSat | STARLINK-1130 | Dark coating on chassis | ~0.5 mag reduction; abandoned (thermal issues) |
| VisorSat | v1.0 (Aug 2020+) | Deployable sunshade | 1.29 mag reduction (31% as bright) |
| v1.5 design | v1.5 | Integrated brightness reduction | ~40% scattered-sunlight reduction |
| Dielectric mirror + paint | v2 mini | Mirror film, black paint, solar array off-pointing | Comparable brightness to v1.0 despite 4x area |

## Related COSMOS Articles
- earth-satellite
- communications-satellite
- optical-astronomy
- radio-astronomy
- telescope
- apparent-magnitude
- near-earth-objects
- near-earth-asteroids
- square-kilometre-array
- electromagnetic-spectrum
- infrared
- light
- orbit
- radio-interferometer
- resolution

## Images (candidates — writer will select the best)

| File | Description | Recommended? |
|------|-------------|--------------|
| starlink-ctio-trails.jpg | 333-second exposure from CTIO Blanco 4m telescope showing 19+ Starlink streaks | yes — iconic professional telescope image showing direct science impact |
| starlink-galaxy-group-trails.jpg | NGC 5353/4 galaxy group with 25+ trails from first Starlink launch (May 2019) | yes — one of earliest documented trail contamination images |
| starlink-train-overhead.jpg | Starlink satellite train over Carson National Forest, NM | yes — shows naked-eye "train" phenomenon most people encounter |
| starlink-pleiades-trails.jpg | Venus and Pleiades with satellite trails (IAU OAE contest) | no — Venus dominates; trails less prominent than other candidates |

See each {image-name}-caption.md for full caption, credit, source, and license.

## Sources
1. Wikipedia — "Starlink" — https://en.wikipedia.org/wiki/Starlink
2. Space.com — "Starlink satellites: Facts, tracking and impact on astronomy" — https://www.space.com/spacex-starlink-satellites.html
3. Tregloan-Reed et al. 2021, A&A — "Optical-to-NIR magnitude measurements of the Starlink LEO Darksat satellite" — https://www.aanda.org/articles/aa/full_html/2021/03/aa39364-20/aa39364-20.html
4. Mallama 2021, arXiv — "The Brightness of VisorSat-Design Starlink Satellites" — https://arxiv.org/pdf/2101.00374
5. Mroz et al. 2022, Caltech/ZTF — "Palomar Survey Instrument Analyzes Impact of Starlink Satellites" — https://www.caltech.edu/about/news/palomar-survey-instrument-analyzes-impact-of-starlink-satellites
6. Hasan et al. 2023, arXiv — "Starlink Generation 2 Mini Satellites: Photometric Characterization" — https://arxiv.org/pdf/2306.06657
7. Bassa et al. 2024, arXiv — "The Brightness of Starlink Mini Satellites During Orbit-Raising" — https://arxiv.org/pdf/2405.12007
8. SATCON1 Report (2020) — AURA/AAS — https://www.aura-astronomy.org/blog/2020/08/27/satcon1-report-on-effects-of-large-satellite-constellations-on-astronomy/
9. SATCON2 Executive Summary (2021) — AAS BAAS — https://baas.aas.org/pub/2021i0205/release/1
10. NOIRLab — "Conclusions from Satellite Constellations 2 Released" — https://noirlab.edu/public/announcements/ann21034/
11. FCC 22-91 — Gen2 authorization — https://docs.fcc.gov/public/attachments/FCC-22-91A1.pdf
12. FCC DA-26-36 — Additional Gen2 authorization (2026) — https://docs.fcc.gov/public/attachments/DA-26-36A1.pdf
13. Astronomy.com — "New Starlink satellites could be 32 times brighter in radio waves" — https://www.astronomy.com/science/new-starlink-satellites-could-be-32-times-brighter-in-radio-waves-than-before/
14. Space.com — "Scientists analyze 76 million radio telescope images, find Starlink interference" — https://www.space.com/astronomy/scientists-analyze-76-million-radio-telescope-images-find-starlink-satellite-interference-where-no-signals-are-supposed-to-be-present
15. NED/IPAC Glossary — Glossary_S (note: NED defines "STARLINK" as UK astronomy software, not the satellite constellation) — https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html

## Handoff: Researcher → Writer

**Target length:** 400-800 words
**Gaps:** None significant. Exact subscriber numbers and satellite counts will continue to change rapidly; writer should use "more than 10,000" style phrasing rather than precise counts.
**Watch for:**
- The NED/IPAC glossary entry for "STARLINK" refers to a UK astronomy data-analysis software package (Rutherford-Appleton Labs), not the SpaceX satellite constellation. The COSMOS article is about the satellite constellation, not the software.
- "Starlink" is both a proper noun (the constellation/service) and a common cultural reference (the "train of lights"). The article should address both the observing phenomenon and the astronomy impact.
- Brightness mitigation data are version-specific — do not generalize across satellite versions.
- Category is "observing" — the article angle should emphasize what Starlink means for observers (amateur and professional), not serve as a SpaceX corporate profile.
- v2 mini satellites are brighter in radio (32x more UEMR) even though they are comparable in optical brightness to v1.0 — these are distinct issues.
