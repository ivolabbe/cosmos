# COSMOS Interactive Apps — Development Index

Master list of all interactive visualizations being developed for the COSMOS encyclopedia.
Per-app dev logs track status, iteration history, open issues, and plans.

## Shared Conventions

- **Architecture:** Single self-contained HTML in `experimental/`. All CSS + JS inline. CDN imports via `<script type="importmap">`.
- **Style guide:** See `../.agents/INTERACTIVE-STYLE-GUIDE.md`.
- **Background:** `#0a0a2e` (deep navy). Controls bar: bottom-centre, one row, `rgba(10,10,46,0.9)`. Accent: Swinburne red `#DC2D27`.
- **Embedding:** `<iframe>` in article pages. Test page: `experimental/TOPIC-article.html`.
- **Testing:** Local HTTP server (`python3 -m http.server 8765`), never `file://`.
- **Candidate list:** See `../INTERACTIVE-DEMOS.md` for prioritised future apps.

## Apps

| App | Files | Status | Dev Log |
|-----|-------|--------|---------|
| **Gravitational Waves** | `gravitational-waves-interactive.html`, `-article.html` | Active development | [gravitational-waves.md](gravitational-waves.md) |
| **Asteroid Belt** | `asteroid-interactive.html`, `-article.html` | Prototype complete | [asteroid-belt.md](asteroid-belt.md) |
| **Zenith Diagram** | `zenith-interactive.html` | Prototype | [zenith.md](zenith.md) |
