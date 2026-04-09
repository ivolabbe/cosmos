# COSMOS Project Memory

## Project knowledge lives in the repo

All project-specific learnings, status, and feedback rules have been consolidated into the repo under `.agents/` so co-authors get the same context.

| Repo file | What it contains |
|-----------|-----------------|
| `.agents/STARTUP.md` | Generic orchestrator bootstrap — information landscape, startup checklist, team plans |
| `.agents/PROJECT-STATUS.md` | App inventory, branch state, pending review items |
| `.agents/LEARNINGS.md` | Accumulated rules, technical patterns, external references |
| `.agents/INTERACTIVE-STYLE-GUIDE.md` | Three.js visual/architecture rules |
| `.agents/COSMOS-STYLE-GUIDE.md` | 643-article corpus style characterization |

**At session start:** Read `.agents/STARTUP.md` — it maps all available information.

## Private memory (personal context only)

### Active — high signal
- [App inventory](project_app_tracking.md) — 30 interactive apps across 6 categories; Top 10 complete, 8 of 22 next-gen built
- [SAO agent system](project_sao_agent_system.md) — 7 agents, 3 pipeline modes (fresh/iteration/do-over), proven at 6-parallel scale
- [SEO strategy](project_seo_performance.md) — Semrush Mar 2026: 49.6K traffic; moon phases (~400K vol) biggest untapped cluster
- [Resource locations](reference_interactive_resources.md) — where to find specs, style guide, analysis, agents, testing setup

### Feedback rules — always apply
- [Visual polish directive](feedback_visual_polish.md) — circular particles, bloom, stars, visual gorgeousness non-negotiable
- [Verify dispatch rule](feedback_verify_dispatch.md) — always dispatch sao-verify with Puppeteer; never substitute code-reading
- [Minimal article mods](feedback_article_minimal_mods.md) — only iframe embed + caption; iframe/caption don't count against 15-20% threshold
- [Interactive dev style](feedback_interactive_dev_style.md) — rapid visual iteration, physical accuracy, queue corrections while Claude works
- [Autonomous verification](feedback_autonomous_verify.md) — always test in browser, check console, screenshot; work autonomously when user is away
- [Learning pattern](feedback_learning_pattern.md) — log learnings after every result, improve agent skills over time
- [Physics correctness](feedback_gw_physics_first.md) — never sacrifice correctness for appearance; say "I don't know" rather than guess
- [Atmosphere rendering](feedback_atmosphere_rendering.md) — ray-marched column density only; fresnel/shell approaches all fail
- [Never edit articles/](feedback_no_edit_articles.md) — articles are managed separately; inject features via shared JS/CSS
- [Use libraries](feedback_use_libraries.md) — use D3.js/proven libs, don't reinvent force layout, physics, etc.
- [Re-render diagrams](feedback_rerender_diagrams.md) — run `.agents/code/render-diagrams.js` when org/flow changes; no Mermaid
- [Relative paths](feedback_relative_paths.md) — always relative paths in HTML/JS; use getAttribute('src') not .src

- [Latest Research / ADS](project_latest_research.md) — ADS scraper + injection script for most-cited papers on article pages

### Historical — still valid but low-frequency
- [Pending user review](project_pending_review.md) — physics + visual review of pulsar/binary/rotation-curve pending since 2026-03-28
- [GW demo status](project_cosmos_gw_demo.md) — milestone 1 complete, speed profile + 3D volume rendering decisions
- [Sun & Satellites](project_cosmos_sun_satellites.md) — atmosphere shader, CelesTrak catalog, Babylon.js sun
- [Planet pages](project_planet_pages.md) — all 8 planet globes complete
- [Pulsar app](project_pulsar_app.md) — first physics sim through pipeline, proved it works

### Superseded — kept for reference only
- [Batch 2 apps](project_batch2_apps.md) — merged into project_app_tracking.md
- [Black hole ref](reference_black_hole_playground.md) — merged into reference_interactive_resources.md
