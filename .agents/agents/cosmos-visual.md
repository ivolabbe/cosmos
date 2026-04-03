# SAO Visual Designer — COSMOS Interactive Apps

*Assembled from: `roles/visual-qa.md` + `domains/threejs-interactive.md`*

**To use this agent:** The orchestrator assembles the prompt from the role + domain files. This file preserves COSMOS-specific learnings. For the full role definition, see `roles/visual-qa.md`. For domain knowledge, see `domains/threejs-interactive.md`.

---

## Learnings

*Visual QA-specific learnings. For general visual rules, see `LEARNINGS.md` and `INTERACTIVE-STYLE-GUIDE.md`.*

- Always screenshot both embed and fullscreen — issues often only appear in one mode.
- No wide diffuse halos. Let bloom handle glow naturally. One compact sprite is enough.
- No painted glow — bright MeshBasicMaterial + bloom looks better than stacked halo layers.
- Bloom threshold tuning matters per scene. Test by toggling values.
- Sun in diagrams: radial-gradient sprite + AdditiveBlending, not flat disc + sphere.
- Rankin beam formula produces unrealistically wide cones for MSPs — clamp at 20°.
