# COSMOS Content Orchestrator

How to create, update, and publish COSMOS encyclopedia content.

## Architecture

Every article page is powered by 3 independent JS injectors + static HTML:

```
┌─────────────────────────────────────────┐
│  .top-bar (static)                       │
│  SAO banner (injected by sao-cta.js)     │
│  .site-header (static)                   │
│  .breadcrumb (static)                    │
│                                          │
│  ARTICLE CONTENT (static HTML)           │
│    └─ optional: iframe interactive       │
│                                          │
│  A-Z Explorer (cosmos-explore.js)        │
│    └─ default: cross-linked articles     │
│    └─ click letter: index entries        │
│    └─ Knowledge Graph link               │
│                                          │
│  Latest Research (latest-research.js)    │
│    └─ from dev/ads-research.json         │
│    └─ only renders if data exists        │
│                                          │
│  SAO CTA (sao-cta.js)                   │
│    └─ "Interested in astronomy?"         │
│                                          │
│  .site-footer (static)                   │
└─────────────────────────────────────────┘
```

## Creating a New Article

### Quick (automated)

```bash
# Article only
node dev/new-article.js "Neutron Star Merger" --scrape

# Article + interactive scaffold
node dev/new-article.js "Tidal Disruption Event" --scrape --interactive
```

This handles:
1. HTML from `.agents/article-template.html`
2. Entry in `articles/index.json` + `js/cosmos-index.js`
3. ADS research scrape → `dev/ads-research.json`
4. Interactive scaffold + iframe embed (if `--interactive`)

### Manual steps after

1. **Write content** — edit `articles/<slug>.html`, add text inside `.article__body`
2. **Cross-link** — use `<a class="lexicon-term" href="other-topic.html">` for encyclopedia links (these drive the explorer's default view)
3. **Images** — place in `images/`, reference as `../images/filename.jpg`
4. **Interactive** — if building one, edit `articles/<slug>-interactive.html`
5. **Verify** — `http://localhost:8000/articles/<slug>.html`

## Updating Research Data

```bash
# Single article
node dev/scrape-ads.js <slug>

# All articles (8 parallel, ~15 min)
bash dev/scrape-ads-all.sh 8
```

Run quarterly to keep research links fresh.

## Key Files

| File | Purpose |
|------|---------|
| `.agents/article-template.html` | HTML template with placeholders |
| `js/cosmos-explore.js` | A-Z explorer widget (auto-injects) |
| `js/sao-cta.js` | Top + bottom SAO banners (auto-injects) |
| `js/latest-research.js` | ADS research section (auto-injects if data) |
| `js/cosmos-index.js` | Article index (drives explorer + browse) |
| `articles/index.json` | Source of truth for article list |
| `dev/ads-research.json` | ADS paper data for all articles |
| `dev/new-article.js` | Article creation script |
| `dev/scrape-ads.js` | Single-article ADS scraper |
| `dev/scrape-ads-all.sh` | Parallel ADS scraper for all articles |
| `assets/` | Central asset location (textures, models) |
| `explore.html` | Knowledge Graph (root level) |

## Adding an Interactive App

1. Run `node dev/new-article.js "Topic" --scrape --interactive`
2. Edit the interactive HTML — use Three.js, follow `.agents/INTERACTIVE-STYLE-GUIDE.md`
3. Textures go in `assets/textures/`, reference as `../assets/textures/...`
4. The iframe embed + "Open fullscreen" caption are auto-added to the article

## Script Load Order

In every article, scripts are in this order:
```html
<script src="../js/cosmos-explore.js" defer></script>
<script src="../js/sao-cta.js" defer></script>
<script src="../js/latest-research.js" defer></script>
```

Injection order (regardless of load timing):
1. `sao-cta.js` runs first (sync, defer) → inserts CTA before footer
2. `cosmos-explore.js` loads `cosmos-index.js` async → inserts explorer before CTA
3. `latest-research.js` fetches JSON async → inserts research before CTA

Result: content → explorer → research → CTA → footer

## Keeping the Index Current

**Researcher agent responsibility:** When writing a new spec or promoting an app, update `.planning/apps/README.md`:
- Add to the Production or In Development table
- Add spec to the Specs table if applicable
- Move from dev → production table when promoted to `articles/`

The app index is the single source of truth for what exists and where.

## Deployment

Push to `main` → GitHub Pages deploys in ~30s → live at the configured URL.
