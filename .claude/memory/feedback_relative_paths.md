---
name: Use relative paths
description: Always use relative paths in HTML/JS unless absolutely necessary — no absolute URLs to localhost or deployment domains
type: feedback
---

Use relative paths everywhere in COSMOS HTML and JS files.

**Why:** Absolute paths break when the site moves between localhost, GitHub Pages, or a custom domain. Relative paths work everywhere.

**How to apply:** For JS that needs to resolve paths, use `element.getAttribute('src')` (returns raw relative value) not `element.src` (returns resolved absolute URL). For iframe embeds, texture loads, and JSON fetches — always relative from the current file.
