# Domain: Astronomy Research & Spec Production

*Source hierarchy, fact-gathering methodology, and spec format for astronomy education content. Loaded by researcher agents working on astronomical topics.*

---

## Prime Directive

**Physical correctness first.** A beautiful visualization built on wrong physics is worse than no visualization. Every equation, every parameter, every approximation must be traceable to an authoritative source. If you can't find the correct physics, say so — don't guess.

## Source Hierarchy (priority order)

1. **NASA Planetary Fact Sheets / mission pages** — `nssdc.gsfc.nasa.gov/planetary/factsheet/`
2. **IAU definitions and nomenclature** — official body
3. **NASA/ESA mission-specific data** — authoritative observational data
4. **ArXiv / ADS** — for cutting-edge results, peer-reviewed
5. **Wikipedia** — cross-reference only, never sole source

### Authoritative URLs

| Domain | URL |
|--------|-----|
| Solar System | `nssdc.gsfc.nasa.gov/planetary/factsheet/` |
| Exoplanets | `exoplanetarchive.ipac.caltech.edu` |
| Stars | `simbad.u-strasbg.fr/simbad/` |
| Cosmology | Planck 2018 parameters |
| Textures | `solarsystemscope.com/textures` (CC BY 4.0) |
| 3D references | `eyes.nasa.gov`, `solarsystem.nasa.gov` |

## Fact Sheet Format

```markdown
## [Topic] — Fact Sheet

### Key Numbers
| Property | Value | Source |
|----------|-------|--------|
| ...      | ...   | ...    |

### Notes
- [discrepancies, caveats, recent updates]
```

## Reference Code Search Strategy

**CRITICAL:** Before writing any physics formula, search GitHub for existing simulation code first. Existing implementations solve both physics and rendering in one shot.

### GitHub search queries
- `"[topic] simulation" language:javascript` or `language:python`
- `"[topic] visualization" three.js OR webgl OR d3`
- `"[topic] interactive" astronomy OR physics`
- `"[physics keyword]" shader OR glsl OR webgl`

### What to look for
- Repos that render the thing we're building (WebGL/Canvas/Three.js/D3)
- Repos that implement the core physics (even Python — math translates to JS)
- Repos with live demos (GitHub Pages)
- Well-documented repos (README explains physics + algorithm)

### Scientific packages to check
1. astropy, galpy, pynbody, MESA
2. Published scientists' GitHub repos
3. NASA / STScI / ESA tools
4. University course materials
5. Peer-reviewed papers with supplementary code

For each reference: document the **specific function/formula/algorithm**, URL, relevant code snippet, and how it maps to our implementation.

## Visual Competition Survey (mandatory)

Survey these sources (all mandatory, in order):

1. **Wikipedia** — canonical visual representation students see first
2. **NASA/ESA interactive tools** — `eyes.nasa.gov`, `svs.gsfc.nasa.gov`
3. **GitHub repos** — `[topic] WebGL`, `[topic] Three.js`, `[topic] simulation`
4. **University/educational** — PhET, NAAP (`astro.unl.edu`), AstroBaki, Wolfram Demonstrations
5. **Commercial apps** — Celestia, Universe Sandbox, SpaceEngine, NASA Eyes
6. **Existing project interactives** — which existing app is closest?

Per reference, document:
```markdown
### Visual Reference: [Name/URL]
- **Source**: [Wikipedia / NASA / GitHub / university / commercial]
- **What it does well**: [specific visual qualities]
- **What it does poorly**: [limitations we can beat]
- **Key technique**: [how they achieved the core visual]
- **Our advantage**: [what we can do better]
```

Aim for 4–6 strong references covering: composition, element rendering, colour palette, interaction design, pedagogical value.

## Spec Template

```markdown
# [Topic] Interactive — Build Spec

## Overview
[One paragraph: what the user will see and interact with]

## Core visualization
- **Geometry**: [shapes — sphere, particles, mesh, custom?]
- **Technique**: [textured sphere? procedural shader? particle system?]
- **Data source**: [texture files? computed positions? API data?]

## Visual targets
- **Reference 1**: [URL] — [what to adopt]
- **Reference 2**: [URL] — [what to adopt]
- **Our approach**: [how we'll achieve similar or better quality]

## Key physics/parameters
| Parameter | Value | Source |
|-----------|-------|--------|
| ...       | ...   | ...    |

## Features & controls
- [interactive features]
- [controls: toggles, sliders]
- [what "Day" mode shows]

## Physics / Algorithm
[The actual math — equations, integration schemes, key parameters.
This section is CRITICAL for complex apps.]
- Key equation 1: [LaTeX or code]
- Reference implementation: [URL]
- Numerical pitfalls: [precision, stability, edge cases]
- Test values: [input → expected output for validation]

## Implementation stages (each verified before proceeding)
1. [Stage 1]: [what to build] → [what "pass" looks like]
2. [Stage 2]: ...
3. [Stage N]: Polish (controls, info panel, stars, credits)

## Reference implementations (for coder)
- [URL 1]: [language, what it implements, what to adopt]
- [code snippet or pseudocode if short enough]

## Verification targets (for verifier)
- [Screenshot/URL]: "Our render should look like this"
- Physical correctness checks:
  - [e.g. "Einstein ring radius should be ~5 pixels at default zoom"]

## Textures/assets needed
- [list with sources and format]

## Complexity estimate
- [Simple / Medium / Hard / Hardest] — [line count estimate]

## Closest existing app to use as template
- [filename] — because [reason]
```

## Common Pitfalls

- Moon/satellite counts change frequently — always check latest IAU data
- Atmospheric composition: specify volume% vs mass%
- "Surface temperature" for gas giants: specify the pressure level (1 bar convention)
- Historical discovery dates vary by source (observation vs publication)
- Don't confuse apparent magnitude with absolute magnitude
- Spec pseudocode can have bugs — include "test these values" section
- Unit consistency is the #1 pitfall for dynamics sims (always verify v(8 kpc) ~ 220 km/s, etc.)
- Specify physically meaningful readout quantities (actual masses in proper units), not just slider percentages
- State sensible speed ranges for the physics per topic
- State whether reference curves should be clamped or extend beyond plot range
