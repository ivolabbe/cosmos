# COSMOS Interactive Apps — Development Index

Master list of all interactive visualizations. Per-app dev logs and specs live alongside this file.

## Conventions

- **Location:** Production interactives in `articles/`, in-progress in `dev/`
- **Architecture:** Single self-contained HTML. All CSS + JS inline. CDN imports via `<script type="importmap">`
- **Style guide:** `.agents/INTERACTIVE-STYLE-GUIDE.md`
- **Assets:** `assets/textures/planets/web/`, `assets/models/satellites/` (central, top-level)
- **Embedding:** `<iframe>` in article pages with same-directory relative `src`
- **Article template:** `.agents/article-template.html` — includes explorer, SAO banners, ADS research
- **New article script:** `node dev/new-article.js "Title" --scrape --interactive`
- **Content workflow:** `.agents/CONTENT-WORKFLOW.md`
- **Background:** `#0a0a2e` (deep navy). Controls: bottom-centre, one row, `rgba(10,10,46,0.9)`. Accent: `#DC2D27`

## Production (in `articles/`)

| App | Interactive | Article | Type | Dev Log |
|-----|-----------|---------|------|---------|
| Gravitational Waves | `gravitational-waves-interactive.html` | `gravitational-waves.html` | Physics sim | [gravitational-waves.md](gravitational-waves.md) |
| Pulsar | `pulsar-interactive.html` | `pulsar.html` | Physics sim | [pulsar.md](pulsar.md) |
| Binary Star | `binary-star-interactive.html` | `binary-star.html` | Physics sim | [binary-star.md](binary-star.md) |
| Rotation Curve | `rotation-curve-interactive.html` | `rotation-curve.html` | Physics sim | [rotation-curve.md](rotation-curve.md) |
| Roche Lobe | `roche-lobe-interactive.html` | `roche-lobe.html` | Physics sim | [roche-lobe.md](roche-lobe.md) |
| Asteroid Belt | `asteroid-interactive.html` | `asteroid.html` | Orbital mech | [asteroid-belt.md](asteroid-belt.md) |
| Sun | `sun-interactive.html` | `sun.html` | Babylon.js | [sun.md](sun.md) |
| Satellites | `satellites-interactive.html` | `satellite.html` | Data viz | [satellites.md](satellites.md) |
| Zenith | `zenith-interactive.html` | `zenith.html` | Diagram | [zenith.md](zenith.md) |
| Mercury | `mercury-interactive.html` | `mercury.html` | Planet globe | [planets.md](planets.md) |
| Venus | `venus-interactive.html` | `venus.html` | Planet globe | [planets.md](planets.md) |
| Earth | `earth-interactive.html` | `earth.html` | Planet globe | [planets.md](planets.md) |
| Mars | `mars-interactive.html` | `mars.html` | Planet globe | [planets.md](planets.md) |
| Jupiter | `jupiter-interactive.html` | `jupiter.html` | Planet globe | [planets.md](planets.md) |
| Saturn | `saturn-interactive.html` | `saturn.html` | Planet globe | [planets.md](planets.md) |
| Uranus | `uranus-interactive.html` | `uranus.html` | Planet globe | [planets.md](planets.md) |
| Neptune | `neptune-interactive.html` | `neptune.html` | Planet globe | [planets.md](planets.md) |

## In Development (in `dev/`)

| App | Interactive | Article | Type | Spec |
|-----|-----------|---------|------|------|
| Black Hole | `black-hole-interactive.html` | `black-hole.html` | Physics sim | [black-hole-spec.md](black-hole-spec.md) |
| Density Wave | `density-wave-interactive.html` | `density-wave-model.html` | Physics sim | [density-wave-spec.md](density-wave-spec.md) |
| HR Diagram | `hr-diagram-interactive.html` | `hertzsprung-russell-diagram.html` | Physics sim | [hr-diagram-spec.md](hr-diagram-spec.md) |
| CMB | `cmb-interactive.html` | `cosmic-microwave-background.html` | Physics sim | [cmb-spec.md](cmb-spec.md) |
| Large-Scale Structure | `large-scale-structure-interactive.html` | `large-scale-structure.html` | Physics sim | [large-scale-structure-spec.md](large-scale-structure-spec.md) |
| Blackbody Radiation | `blackbody-interactive.html` | `blackbody-radiation.html` | Calculator | — |
| EM Spectrum | `em-spectrum-interactive.html` | `electromagnetic-spectrum.html` | Diagram | — |
| Drake Equation | `drake-equation-interactive.html` | `seti.html` | Calculator | — |
| Spectroscopy | `spectroscopy-interactive.html` | `spectroscopy.html` | Diagram | — |
| Galaxy Classification | `galaxy-classification-interactive.html` | `hubble-classification.html` | Diagram | — |
| Stellar Lifetime | `stellar-lifetime-interactive.html` | `main-sequence-lifetime.html` | Calculator | — |
| Magnitude Calculator | `magnitude-calculator-interactive.html` | `apparent-magnitude.html` | Calculator | — |
| Redshift Calculator | `redshift-calculator-interactive.html` | `redshift.html` | Calculator | — |

## Specs

Build blueprints for physics sims — used by the coder agent:

| Spec | App |
|------|-----|
| [binary-star-spec.md](binary-star-spec.md) | Binary Star |
| [rotation-curve-spec.md](rotation-curve-spec.md) | Rotation Curve |
| [roche-lobe-spec.md](roche-lobe-spec.md) | Roche Lobe |
| [pulsar-spec.md](pulsar-spec.md) | Pulsar |
| [black-hole-spec.md](black-hole-spec.md) | Black Hole |
| [density-wave-spec.md](density-wave-spec.md) | Density Wave |
| [hr-diagram-spec.md](hr-diagram-spec.md) | HR Diagram |
| [cmb-spec.md](cmb-spec.md) | CMB |
| [large-scale-structure-spec.md](large-scale-structure-spec.md) | Large-Scale Structure |

## Site Features (JS-injected on every article)

| Script | What it does |
|--------|-------------|
| `js/cosmos-explore.js` | A-Z explorer bar + cross-linked articles + Knowledge Graph link |
| `js/sao-cta.js` | Top SAO banner + bottom "Interested in astronomy?" CTA |
| `js/latest-research.js` | ADS research papers (from `dev/ads-research.json`) |

Order on page: content → explorer → research → SAO CTA → footer
