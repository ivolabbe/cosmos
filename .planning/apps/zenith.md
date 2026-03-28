# Zenith Diagram Interactive — Dev Log

**Files:** `experimental/zenith-interactive.html`
**Status:** House-style updated (2026-03-29)
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
- [ ] Consider extending to full celestial coordinates demo

## Plan

- Low priority — consider merging into a broader celestial coordinates app (see INTERACTIVE-DEMOS.md candidates)
