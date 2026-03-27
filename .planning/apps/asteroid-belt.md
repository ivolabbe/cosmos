# Asteroid Belt Interactive — Dev Log

**Files:** `experimental/asteroid-interactive.html`, `experimental/asteroid-article.html`
**Status:** Prototype complete
**Started:** 2026-03-23

## Overview

Top-down solar system view showing the main asteroid belt, Kirkwood gaps, and Jupiter Trojans. Three.js with CSS2D labels and tooltips. Embeddable via iframe.

## Architecture

- Three.js 0.170 via CDN importmap + CSS2DRenderer for labels
- ~2000 asteroid particles via THREE.Points + BufferGeometry
- Kepler solver for elliptical orbits
- Kirkwood gap exclusion zones at known resonance semi-major axes
- Trojan asteroids clustered at L4/L5 using tangential+radial scatter
- Distance scale (AU + light-minutes) on left side

## Iteration Log

### v1 — Initial prototype (2026-03-23)
- Full solar system (Sun, inner planets, Jupiter) with asteroid belt
- Kirkwood gaps visible at correct resonance locations
- Trojan clusters at L4/L5
- Controls: Play/Pause, Speed, Orbits, Labels

## Open Issues

- [ ] Review visual density of asteroids
- [ ] Tooltip content accuracy check

## Plan

- Currently on hold while gravitational waves app is being developed
- Consider adding hover info for Kirkwood gap resonances
