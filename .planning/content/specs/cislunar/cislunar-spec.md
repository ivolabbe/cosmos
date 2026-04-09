# Cislunar — Article Spec

## Category
solar-system

## Definition
Cislunar space is the region of space encompassing Earth's immediate gravitational neighborhood out to and including the Moon's orbital path — roughly from geosynchronous orbit (~36,000 km) to the lunar distance (~384,400 km) — characterized by the simultaneous gravitational influence of both Earth and Moon. The term derives from the Latin *cis* ("on this side of") combined with *lunar*, meaning literally "on this side of the Moon."

**Source:** Penn State University (Q&A: What is the space between Earth and the Moon?); https://www.psu.edu/news/engineering/story/qa-what-space-between-earth-and-moon-and-why-does-it-matter

---

## Full Content

### Definition and Boundaries

Cislunar space extends from **geosynchronous orbit (GEO) at ~36,000 km** above Earth's surface out to the Moon's orbital distance of approximately **384,400 km**, spanning a total volume of roughly **550,000 km in radius** — about 14 times Earth's circumference. The region falls within Earth's sphere of gravitational dominance, though the Moon's gravity is everywhere present and becomes dominant near the Moon itself.

The region is three-dimensional, not a corridor: it encompasses all orbital families between GEO and the Moon, including high-Earth orbits, the five Earth-Moon Lagrange points, lunar orbits, and the cislunar transfer pathways between them.

**Source:** The Aerospace Corporation / Medium; https://medium.com/the-aerospace-corporation/its-international-moon-day-let-s-talk-about-cislunar-space-9d108f1a1b0b

### Cislunar vs. Translunar Space

These two terms are closely related but distinct:

- **Cislunar space** — the volume between GEO and the Moon's orbit; Earth-dominated gravitationally but with significant lunar perturbation.
- **Translunar space** — the region of **lunar transfer orbits**, specifically the trajectories *between* Earth and Moon used to travel from one to the other.

In practice, "cislunar" is the broader term used to describe all operations and spacecraft in the Earth-Moon system beyond GEO. "Translunar" most precisely refers to the transit arc itself.

**Source:** Wikipedia: Outer space (cislunar section); https://en.wikipedia.org/wiki/Outer_space

### Orbital Mechanics: Why Cislunar is Different

Within low-Earth orbit, spacecraft follow well-understood two-body Keplerian dynamics — only Earth's gravity matters. Beyond GEO, this clean picture breaks down. Cislunar spacecraft move under the **simultaneous gravitational pull of Earth, Moon, and (to a lesser extent) the Sun**, creating a complex three-body dynamical environment. Standard Keplerian orbital elements become insufficient to describe trajectories, which are more easily disrupted by navigation errors and require ongoing active station-keeping.

This complexity also creates opportunity: careful trajectory design can exploit the three-body geometry to achieve very fuel-efficient transfers. Three broad strategies exist:

| Transfer Type | Transit Time | Fuel Use | Notes |
|--------------|-------------|---------|-------|
| Direct transfer | ~3 days | High | Human-rated missions; Apollo/Artemis profile |
| Low-thrust transfer | Several months | Low | Gradual spiral; suited to electric propulsion |
| Low-energy transfer | 2.5–4 months | Lowest | Exploits solar gravity; most economical |

**Source:** The Aerospace Corporation / Medium; https://medium.com/the-aerospace-corporation/its-international-moon-day-let-s-talk-about-cislunar-space-9d108f1a1b0b

### The Five Lagrange Points

Within cislunar space, five **Lagrange points** (L1–L5) are positions where the gravitational pulls of Earth and Moon, combined with centrifugal effects, balance so that a small spacecraft can remain in a fixed position relative to both bodies while requiring minimal fuel.

**Source:** NASA Science: What is a Lagrange Point?; https://science.nasa.gov/resource/what-is-a-lagrange-point/

| Point | Location | Stability | Notes |
|-------|----------|-----------|-------|
| L1 | Between Earth and Moon (~58,000 km from Moon) | Unstable | Access to near-side lunar surface; needs periodic station-keeping |
| L2 | Beyond Moon, opposite Earth (~65,000 km from Moon) | Unstable | Far-side access; radio astronomy site (shielded from Earth) |
| L3 | On the far side of Earth, opposite Moon | Unstable | Rarely used operationally |
| L4 | 60° ahead of Moon in its orbit | Stable | Long-term stable; Kordylewski dust clouds reside here |
| L5 | 60° behind Moon in its orbit | Stable | Long-term stable; equilateral triangle with Earth and Moon |

L1, L2, and L3 lie along the Earth-Moon line and are **dynamically unstable** — a spacecraft displaced slightly will drift away. L4 and L5, at the vertices of equilateral triangles, are **stable** provided the mass ratio of the primary bodies exceeds 24.96:1 (satisfied by the Earth-Moon system).

**Source:** NASA Science: What is a Lagrange Point?; https://science.nasa.gov/resource/what-is-a-lagrange-point/

### Key Orbital Families in Cislunar Space

Several distinct orbital families are operationally important:

**Near-Rectilinear Halo Orbits (NRHO):** Highly elongated, approximately 7-day polar orbits looping from ~1,500 km above one lunar pole to ~70,000 km above the other. NRHOs are associated with the L1 or L2 Lagrange points and offer near-continuous Earth communication, stable station-keeping, and efficient access to the lunar surface (~730 m/s delta-v, half-day transit). NASA chose the **L2 southern NRHO** for the Gateway station.

**Distant Retrograde Orbits (DRO):** Very large, retrograde (counter-lunar-motion) orbits far from the Moon, notable for exceptional dynamical stability and near-zero station-keeping fuel. Proposed for long-duration habitats or propellant depots.

**Halo Orbits around L1/L2:** Three-dimensional periodic orbits near unstable Lagrange points, enabling access to both lunar vicinity and Earth communications simultaneously.

**Sources:**
- Maxar Technologies (blog); https://blog.maxar.com/space-infrastructure/2019/what-is-cislunar-space-and-a-near-rectilinear-halo-orbit
- Wikipedia: Lunar Gateway; https://en.wikipedia.org/wiki/Lunar_Gateway

### The Artemis Program and Cislunar Exploration

NASA's **Artemis program**, formally established in 2017, is the principal ongoing effort to return humans to the Moon and establish sustained cislunar operations. Key milestones:

- **Artemis I (November 2022):** Uncrewed Orion spacecraft completed a lunar flyby and distant retrograde orbit, demonstrating the cislunar trajectory and re-entry systems.
- **Artemis II (April 2026):** Four-person crew made the first crewed cislunar voyage since Apollo 17 (1972), performing a lunar flyby aboard Orion — the first humans to travel to cislunar space in over 50 years.
- **Artemis IV (planned ~2028):** Targeted for the first crewed lunar landing since Apollo 17.

NASA projects that **traffic in cislunar space over the next decade will exceed all activity in the region since the start of the Space Age**.

**Sources:**
- Wikipedia: Artemis program; https://en.wikipedia.org/wiki/Artemis_program
- Penn State University; https://www.psu.edu/news/engineering/story/qa-what-space-between-earth-and-moon-and-why-does-it-matter

### The Gateway Station

The **Lunar Gateway** was a planned NASA-led international space station in lunar NRHO, intended as a staging point for Artemis crewed surface missions and as a cislunar science platform. International partners included ESA, JAXA, CSA, and MBRSC (UAE). In **March 2026**, NASA announced the Gateway as originally designed would be paused indefinitely, with resources redirected toward establishing a lunar surface base between 2029 and 2036. Gateway hardware is being repurposed where possible.

**Source:** Wikipedia: Lunar Gateway; https://en.wikipedia.org/wiki/Lunar_Gateway

### CAPSTONE: Proving the NRHO

In June 2022, NASA launched **CAPSTONE** (Cislunar Autonomous Positioning System Technology Operations and Navigation Experiment), a 12-unit CubeSat pathfinder. After a 4-month low-energy transfer, CAPSTONE entered the NRHO on 13 November 2022, completing more than 12 orbits. CAPSTONE demonstrated NRHO accessibility, validated station-keeping strategies (reducing maneuver frequency below one per orbit), and tested spacecraft-to-spacecraft navigation relative to the Lunar Reconnaissance Orbiter — eliminating reliance on ground stations.

**Source:** Wikipedia: CAPSTONE; https://en.wikipedia.org/wiki/CAPSTONE

### Strategic and Military Significance

The growth of cislunar activity has drawn the attention of national defense establishments. The region lies beyond the coverage of current space-surveillance networks (designed for GEO and below), creating a **monitoring gap** of strategic concern.

The U.S. Space Force has identified cislunar awareness as a priority, with Gen. Stephen Whiting noting: "We want to make sure that we're not surprised at cislunar space and that some other actor doesn't begin to use it for military advantage." The Air Force Research Laboratory's **Oracle-M** satellite was developed to demonstrate persistent cislunar tracking capability.

A **2024 CSIS study** found no near-term compelling military value for cislunar operations beyond space surveillance, cautioning that "buzz" around the topic exceeds demonstrated operational utility. Nevertheless, U.S. executive policy (2024 onward) explicitly calls for American dominance in cislunar position, navigation, and timing.

**Sources:**
- Aviation Week; https://aviationweek.com/defense/budget-policy-operations/pentagon-eyes-cislunar-space-next-strategic-frontier
- Breaking Defense; https://breakingdefense.com/2024/10/lots-of-buzz-but-no-compelling-military-value-for-cislunar-space-csis/
- Aerospace Center for Space Policy & Strategy; https://csps.aerospace.org/papers/high-ground-or-high-fantasy-defense-utility-cislunar-space

### Economic and Scientific Value

Beyond exploration, cislunar space is increasingly viewed as an **economic zone**:

- **Lunar resources:** Water ice at the lunar poles may be refined into rocket propellant (hydrogen + oxygen), enabling propellant depots in NRHO or DRO that dramatically reduce the cost of deep-space missions. The Moon's gravity (1/6 Earth's) makes launching from its surface far less expensive than from Earth.
- **Radio astronomy:** The lunar far side and L2 region offer shielding from Earth's radio interference — ideal for low-frequency telescopes.
- **In-situ resource utilization (ISRU):** Mining and processing of lunar regolith for oxygen, metals, and construction materials.
- **Deep-space gateway:** Cislunar infrastructure is widely seen as the necessary proving ground for eventual crewed Mars missions.

**Source:** Penn State University; https://www.psu.edu/news/engineering/story/qa-what-space-between-earth-and-moon-and-why-does-it-matter

---

## Key Numbers

| Property | Value | Source |
|----------|-------|--------|
| GEO altitude (inner boundary, practical) | ~36,000 km | Penn State / Maxar |
| Mean Earth-Moon distance (outer boundary) | ~384,400 km | Standard |
| Practical cislunar radius | ~550,000 km | Aerospace Corp. |
| Moon's mean orbital period | 27.3 days | Standard |
| L1 distance from Moon | ~58,000 km (Earth-side) | NASA Science |
| L2 distance from Moon | ~65,000 km (far side) | NASA Science |
| NRHO closest approach to Moon | ~1,500 km (pole) | NASA / Maxar |
| NRHO farthest distance from Moon | ~70,000 km | NASA / Maxar |
| NRHO orbital period | ~7 days | NASA / Maxar |
| NRHO delta-v to lunar surface | ~730 m/s | Wikipedia: Lunar Gateway |
| Direct transfer Earth-Moon | ~3 days | Aerospace Corp. |
| Low-energy transfer time | 2.5–4 months | Aerospace Corp. |
| CAPSTONE NRHO insertion date | 13 November 2022 | Wikipedia: CAPSTONE |
| Artemis I launch date | 16 November 2022 | Wikipedia: Artemis program |
| Artemis II launch date | 1 April 2026 | Wikipedia: Artemis program |
| Mass ratio threshold for L4/L5 stability | > 24.96 | NASA Science |

---

## Historical Context

Cislunar space first became a human domain during the **Apollo program (1968–1972)**. Apollo 8 (December 1968) carried the first humans to cislunar space, and Apollo 11 (July 1969) achieved the first crewed lunar landing. Six successful landings (through Apollo 17, December 1972) gave humanity its only experience with sustained cislunar operations. After Apollo, no humans ventured beyond low-Earth orbit for over 50 years — until Artemis II in April 2026.

Robotic exploration continued throughout: the Soviet Luna probes, Lunar Prospector (1998–1999), LADEE (2013–2014), and numerous others mapped the Moon and characterized its environment. NASA's CAPSTONE CubeSat (2022) became the first spacecraft to operate in the NRHO, paving the way for Gateway.

**Sources:**
- Wikipedia: Artemis program; https://en.wikipedia.org/wiki/Artemis_program
- Wikipedia: Apollo program; https://en.wikipedia.org/wiki/Apollo_program

---

## Sub-types / Classifications

### Orbital Families
- **High Earth Orbit (HEO):** Broad category including GEO and beyond
- **Translunar Injection (TLI):** The burn that places a spacecraft on a trajectory to the Moon
- **Lunar Orbit Insertion (LOI):** The burn that captures a spacecraft into lunar orbit
- **Near-Rectilinear Halo Orbit (NRHO):** Elongated polar halo orbit near L1/L2
- **Distant Retrograde Orbit (DRO):** High, stable retrograde orbit far from Moon
- **Frozen Lunar Orbit:** Low lunar orbit designed to resist perturbations from lunar mass concentrations

### Transfer Types
- **Direct (free-return) trajectory:** ~3-day arc; returns to Earth automatically if no burns executed
- **Low-thrust (electric propulsion) transfer:** Months-long spiral
- **Low-energy transfer (ballistic lunar transfer):** Exploits Sun-Earth-Moon three-body dynamics via a "weak stability boundary"

---

## Related COSMOS Articles

- moon
- orbit
- orbital-eccentricity
- orbital-elements
- orbital-inclination
- apollo-asteroids *(for Apollo missions context)*

---

## Images

All images validated and downloaded. Four images provided:

| Filename | Caption (short) | Recommended | Why |
|----------|----------------|-------------|-----|
| lagrange-points-earth-moon.jpg | Effective potential of the Earth-Moon system showing five Lagrange points | **yes** | Essential diagram for understanding cislunar orbital mechanics |
| nrho-infographic.jpg | NASA infographic explaining the Near-Rectilinear Halo Orbit | **yes** | Annotated, quantitative NRHO explanation; bridges mechanics and program context |
| nrho-diagram.png | Simple NRHO visualization in the Earth-Moon rotating frame | **no** | Superseded by the more informative nrho-infographic.jpg |
| artemis-2-earthset.jpg | Earth setting behind the Moon, photographed by Artemis II crew (April 2026) | **yes** | Compelling photographic lead image; shows cislunar spaceflight at human scale |

**Recommended selection:** Use `lagrange-points-earth-moon.jpg`, `nrho-infographic.jpg`, and `artemis-2-earthset.jpg`.

See accompanying `{filename}-caption.md` files for full credit, source URL, and license.

---

## Sources

### Primary Sources (Priority)
1. **NASA Science: What is a Lagrange Point?** — https://science.nasa.gov/resource/what-is-a-lagrange-point/
2. **Wikipedia: Cislunar space** — https://en.wikipedia.org/wiki/Outer_space (cislunar subsection)
3. **Wikipedia: Lunar Gateway** — https://en.wikipedia.org/wiki/Lunar_Gateway
4. **Wikipedia: Artemis program** — https://en.wikipedia.org/wiki/Artemis_program
5. **Wikipedia: CAPSTONE** — https://en.wikipedia.org/wiki/CAPSTONE
6. **Penn State University: What is the space between Earth and the Moon?** — https://www.psu.edu/news/engineering/story/qa-what-space-between-earth-and-moon-and-why-does-it-matter

### Secondary Sources (Supplementary Detail)
7. **The Aerospace Corporation / Medium: It's International Moon Day** — https://medium.com/the-aerospace-corporation/its-international-moon-day-let-s-talk-about-cislunar-space-9d108f1a1b0b
8. **Maxar Technologies: What is Cislunar Space and a Near Rectilinear Halo Orbit?** — https://blog.maxar.com/space-infrastructure/2019/what-is-cislunar-space-and-a-near-rectilinear-halo-orbit
9. **NASA Johnson Space Center: Lunar Near-Rectilinear Halo Orbit Gateway** — https://www.nasa.gov/centers-and-facilities/johnson/lunar-near-rectilinear-halo-orbit-gateway/
10. **Aviation Week: Pentagon Eyes Cislunar Space** — https://aviationweek.com/defense/budget-policy-operations/pentagon-eyes-cislunar-space-next-strategic-frontier
11. **CSIS/Breaking Defense: No compelling military value for cislunar** — https://breakingdefense.com/2024/10/lots-of-buzz-but-no-compelling-military-value-for-cislunar-space-csis/
12. **Aerospace Center for Space Policy & Strategy: Defense Utility of Cislunar Space** — https://csps.aerospace.org/papers/high-ground-or-high-fantasy-defense-utility-cislunar-space
13. **NASA: Earthset (Artemis II)** — https://www.nasa.gov/image-article/earthset/

---

## Handoff: Researcher → Writer

### Completeness Checklist
- [x] Definition complete and authoritative (sourced from Penn State / Aerospace Corp.)
- [x] Full content contains **all** facts needed for 200–400 word article without gaps
- [x] Every value has units and source attribution
- [x] All data are sourced to primary/authoritative sources (NASA, Wikipedia, Penn State, Aerospace Corp., CSIS)
- [x] 4 images downloaded and validated (script exited 0 for all retained images)
- [x] Each image has accompanying caption file with Recommended + Why
- [x] Related article slugs verified against articles/slugs.txt
- [x] No gaps that would force writer to research, extrapolate, or guess

### Writer Instructions
The spec is **complete and self-contained**. You have everything needed to write a 200–400 word encyclopedia article WITHOUT additional research. Key talking points:

1. **Opening:** Definition + etymology (cis = Latin "on this side of")
2. **Boundaries:** GEO (~36,000 km) to Moon (~384,400 km); three-body physics
3. **Lagrange points:** Five points, L4/L5 stable, L1/L2 operationally important (NRHO)
4. **Orbital families:** NRHO, DRO; why they matter
5. **Artemis context:** CAPSTONE 2022, Artemis I/II, Gateway paused 2026, future landings
6. **Strategic/economic value:** Monitoring gap, resource utilization, deep-space gateway

**Cislunar vs. translunar:** Clarify both terms — cislunar = entire region; translunar = the transit arc specifically.

**Tone:** COSMOS house style — engaging, accurate, accessible to general astronomy enthusiast audience. Use the provided numbers and sources. Do NOT research beyond this spec.

**Recommended images:** artemis-2-earthset.jpg (lead), lagrange-points-earth-moon.jpg, nrho-infographic.jpg

**Length:** Target 200–400 words.
