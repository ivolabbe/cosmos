# Zenith Diagram Interactive — Dev Log

**Files:** `experimental/zenith-interactive.html`
**Status:** Production-ready (article + interactive, 2026-03-29)
**Started:** 2026-03-23

## Overview

Interactive zenith/horizon diagram showing the celestial sphere, observer's local horizon, and key reference points (zenith, nadir, celestial poles). Canvas-based 2D rendering.

## Iteration Log

### v1 — Initial prototype (2026-03-23)
- Basic celestial sphere diagram
- Observer position and horizon plane

### v2 — House style update (2026-03-29)
- CSS/chrome aligned to house style (info panel, controls bar, embedded mode, credit, loading)
- Google Fonts import added, background #000, toneMapping
- Controls: single bar with separators, .val class for slider readout
- Two-layer stars, dampingFactor 0.06, FOV 45°
- Renderer: body.prepend, ACESFilmicToneMapping

## Open Issues

- [x] No article test page → file renamed to `zenith.html` (was `zenith-article.html`)
### v3 — Article written (2026-03-29)
- SAO writer produced `experimental/zenith.html` (511 words, 23 lexicon links)
- Covers: zenith, nadir, horizon, celestial meridian, poles, equator, latitude dependence, circumpolar stars
- Interactive iframe embedded, replacing old static GIF
- SAO verifier: PASS (14/14 checks, screenshots saved)

## Open Issues
- [ ] Consider extending to full celestial coordinates demo

## Plan

- Low priority — consider merging into a broader celestial coordinates app (see INTERACTIVE-DEMOS.md candidates)
