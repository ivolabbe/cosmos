# COSMOS Encyclopedia — Upgrade Path

*March 2026 — Ranked by impact/effort ratio (highest first)*

## Current Position

COSMOS is the **only** substantial astronomy encyclopedia (644 articles) written entirely by active research astronomers, free, for a general audience, with established external credibility (cited by Universe Today, Astronomy Cast, APOD, timeanddate.com). The recent rebuild gives it a modern Swinburne-branded static site with client-side search, letter browsing, and responsive design.

**Competitive advantages nobody else has:**
- Expert-written and curated (unlike Wikipedia)
- Free and open (unlike Britannica)
- Astronomy-focused with real depth (unlike NASA's fragmented glossaries)
- Full control over the entire site (unlike contributing to someone else's platform)
- 20+ years of content and reputation

---

## 1. Interactive Visualizations Replacing Static Images

**Impact: Very High | Effort: Medium**

Replace outdated static diagrams with interactive Three.js visualizations users can rotate, zoom, and explore. This is the single biggest differentiator — nobody in the astronomy education landscape does this well.

**Prototype built:** `experimental/zenith-interactive.html` — 3D celestial sphere with adjustable latitude, labelled zenith/poles/meridian/equator, hover tooltips.

**High-value targets:**
- **Hertzsprung-Russell Diagram** — hover stars to see names, spectral types, luminosity; click to jump to article
- **Galaxy classification** (Hubble tuning fork) — click each morphological type to see examples and link to articles
- **Cosmic distance ladder** — step through parallax → Cepheids → Type Ia SNe → redshift, each rung interactive
- **Orbital mechanics** — adjustable eccentricity, inclination, period with Kepler's laws visualised
- **Electromagnetic spectrum** — slide through wavelengths, see which telescopes observe each band
- **Celestial coordinates** — extend the zenith prototype to cover RA/Dec, alt-az, hour angle
- **Stellar evolution tracks** — animate a star's life from main sequence through giant/supergiant to remnant
- **Solar System** — scaled/unscaled toggle, orbital periods, click planets for articles

**Technical approach:** Self-contained HTML+JS per visualisation (Three.js from CDN, no build step). Can be embedded in article pages via iframe or integrated directly. Each visualisation links back to relevant COSMOS articles.

---

## 2. Knowledge Graph / Concept Map Visualisation

**Impact: High | Effort: Low-Medium**

COSMOS already has 644 densely cross-linked articles (the `lexicon-term` links). Nobody visualises these connections. Build a navigable force-directed graph where users see how concepts connect — e.g., clicking "Black Hole" reveals links to Event Horizon, Singularity, Hawking Radiation, Neutron Star, Supernova, General Relativity.

HyperPhysics pioneered concept-map navigation in 1998 with crude bubble diagrams. Doing this with modern D3.js/force-directed layout would be visually striking and educationally powerful.

**Data already exists** — cross-links can be parsed from the article HTML. A graph JSON can be generated automatically.

**Implementation:** A single `explore.html` page with D3.js force-directed graph. Nodes = articles, edges = cross-links. Click a node to read the article. Filter by letter/topic. Zoom into clusters.

---

## 3. Structured Data API (JSON-LD / REST)

**Impact: High | Effort: Low**

No astronomy encyclopedia offers its content as structured, queryable data. COSMOS already has `articles/index.json` and cross-link data.

**Actions:**
- Add JSON-LD Schema.org markup to every article page (Article schema with `about`, `author`, `publisher`, `educationalLevel`). Immediate SEO benefit — enables Google Knowledge Panels.
- Expose `articles/index.json` as a de facto API (already accessible)
- Generate a machine-readable cross-link graph (`graph.json`) mapping article → linked articles
- Add OpenGraph and Twitter Card meta tags for social sharing

**SEO impact:** Schema markup is the single highest-ROI SEO action. Google explicitly recommends it for educational content.

---

## 4. "Latest Research" Sidebar Per Article

**Impact: High | Effort: Medium**

Bridge the gap between canonical definitions (COSMOS) and current research (arXiv/ADS). For each article, auto-query NASA ADS for the 3-5 most recent papers matching that topic. Display as a sidebar.

Nobody links textbook definitions to current papers in one place. Astrobites covers daily papers but doesn't connect back to reference definitions.

**Implementation:** A GitHub Actions workflow runs weekly, queries ADS API for each article's keywords, writes results to a `research/` JSON directory. Article pages load this JSON client-side to display the sidebar. No manual maintenance needed.

---

## 5. Multi-Level Reading Depth

**Impact: Medium-High | Effort: Medium**

Each article could offer 3 depth levels:
- **Quick** — 2-3 sentences (glossary-style)
- **Standard** — current article (default)
- **Deep** — extended with equations, references, connections to related research

Toggle between levels with tabs or a slider. Nobody does this — Britannica has separate Kids/Student/Adult editions as separate products. Having it in-page serves everyone from curious 12-year-olds to undergraduate students.

**Implementation:** AI-assisted generation of Quick summaries (reviewed by astronomers). Deep versions could incorporate additional content or links to academic papers.

---

## 6. PWA / Offline Capability

**Impact: Medium | Effort: Low**

Add a service worker and manifest. COSMOS is already a static site — making it installable as a Progressive Web App and usable offline is straightforward. No astronomy encyclopedia works offline.

Useful for: students in areas with poor connectivity, observers in the field, classroom use without internet dependency.

**Implementation:** ~50 lines of JS for the service worker + a `manifest.json`.

---

## 7. Embeddable Widgets for Educators

**Impact: Medium | Effort: Medium**

Offer iframe-embeddable components:
- Definition tooltip (embed a COSMOS definition in any page)
- Interactive diagram (embed an HR diagram or celestial sphere)
- Mini article card (title + first paragraph + image)

Educators currently screenshot or copy-paste. First-class embed support would drive adoption in LMS platforms (Canvas, Moodle, Google Classroom) and presentation tools.

**Implementation:** Lightweight embed endpoint (`/embed/black-hole.html`) with minimal styling, designed for iframe use. An embed code generator page.

---

## 8. Multilingual Expansion

**Impact: Medium | Effort: High**

The IAU OAE glossary covers 6 languages at glossary depth. Deep multilingual astronomy content is an unserved market globally.

**Approach:** AI-assisted translation with astronomer review. Start with high-demand languages (Mandarin, Spanish, Hindi, Arabic). Each translation would be a parallel article set.

This is the highest effort item and requires ongoing commitment, but the addressable audience expands dramatically.

---

## Recommended Sequencing

### Phase 1 (Quick wins — weeks)
- JSON-LD schema markup on all pages (#3)
- PWA manifest + service worker (#6)
- Knowledge graph data extraction (parse cross-links into `graph.json`)

### Phase 2 (Showcase — 1-2 months)
- 5 flagship interactive visualisations (#1): HR diagram, galaxy classification, cosmic distance ladder, celestial sphere, EM spectrum
- Knowledge graph explorer page (#2)
- OpenGraph/Twitter cards for social sharing

### Phase 3 (Sustained value — ongoing)
- ADS research sidebar integration (#4)
- Multi-level reading depth for top 50 articles (#5)
- Embeddable widgets (#7)

### Phase 4 (Scale — longer term)
- Multilingual expansion (#8)
- New article contributions from CAS researchers
- Community contribution pipeline (astronomer-reviewed submissions)
