# Domain: COSMOS Project Infrastructure

*File layout, branches, deployment, and project conventions. Loaded by any agent that needs to understand where things live.*

---

## File Layout

```
cosmos/
├── .agents/                    # Agent system (roles, domains, pipelines)
│   ├── STARTUP.md              # Orchestrator bootstrap
│   ├── AGENTS.md               # Architecture overview
│   ├── LEARNINGS.md            # Accumulated rules & patterns
│   ├── INTERACTIVE-STYLE-GUIDE.md
│   ├── COSMOS-STYLE-GUIDE.md
│   ├── roles/                  # Portable role definitions
│   ├── domains/                # Project-specific knowledge
│   ├── pipelines/              # Pipeline definitions
│   ├── agents/                 # Assembled COSMOS agents (role + domain)
│   ├── code/                   # Verification & template code
│   │   ├── verify.js
│   │   ├── verify.sh
│   │   └── article-template.html
│   └── snippets/               # Copy-paste house-style code
│       ├── house-style.css
│       ├── house-style.js
│       └── components.js
├── .planning/
│   ├── PROJECT-STATUS.md       # Master status
│   ├── phase-tracker.json      # Orchestrator state (compaction-resistant)
│   └── apps/                   # Per-app specs & dev logs
├── articles/                   # Live article pages
│   └── index.json              # Master article index
├── articles_orig/              # Frozen originals (never modify)
├── dev/                        # Interactive HTML files + new article pages
├── css/style.css               # Swinburne house style
├── images/                     # All images, icons, TeX PNGs
├── js/cosmos-index.js          # Generated JS index for search/browse
├── index.html                  # Landing page
├── browse.html                 # Dynamic letter index
└── search.html                 # Client-side search
```

## Branches

- `main` — production
- `dev-agent` — agent architecture development
- Feature branches as needed per app

## Key Conventions

### Output Directories
- **Interactives** → `dev/[topic]-interactive.html`
- **New articles** → `dev/[topic].html`
- Never write directly to `articles/` — that's production
- Migration from `dev/` to `articles/` is a deliberate step

### Originals
- `articles_orig/` contains 645 frozen articles — NEVER modify
- Compare against `articles_orig/` to track article changes

### Assets
- Textures: `dev/assets/textures/`
- Solar System Scope (CC BY 4.0) for planet textures
- NASA public domain for other imagery

### Naming
- Interactive files: `[topic]-interactive.html` (kebab-case)
- Article files: `[topic].html` (kebab-case, matching slug)
- Spec files: `.planning/apps/[topic]-spec.md`
- Dev logs: `.planning/apps/[topic].md`

## Local Development

```bash
# Start local server
cd /Users/ivo/Documents/Astro/SWIN/SAO/cosmos && python3 -m http.server 8765

# Install Puppeteer (one-time)
cd /tmp && npm install puppeteer

# Run interactive verification
node .agents/code/verify.js http://localhost:8765/dev/[topic]-interactive.html \
  --screenshots /tmp

# Run article verification
node .agents/code/verify.js http://localhost:8765/dev/[topic].html \
  --article --original articles/[topic].html --screenshots /tmp
```

## Current State

See `.planning/PROJECT-STATUS.md` for what's built, what's pending, and full history.
See `.planning/phase-tracker.json` for current pipeline state per app.
