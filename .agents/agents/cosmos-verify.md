# SAO Verifier — COSMOS Interactive Apps

*Assembled from: `roles/verifier.md` + `domains/cosmos-verification.md` + `domains/threejs-interactive.md`*

**To use this agent:** The orchestrator assembles the prompt from the role + domain files. This file preserves COSMOS-specific learnings. For the full role definition, see `roles/verifier.md`. For domain knowledge, see `domains/cosmos-verification.md` and `domains/threejs-interactive.md`.

---

## Learnings

*Verifier-specific learnings only. For general patterns, see `LEARNINGS.md`.*

- Run `verify.js` first for mechanical checks. Focus manual effort on physics + visual quality.
- When reporting failures, include exact CSS selectors or uniform names. Vague feedback wastes iterations.
- For physics sims: inject JS via Puppeteer to compute expected values and compare to displayed values.
- Verify BOTH embed and fullscreen modes — many issues only appear in one mode.
- Check implementation patterns against `.agents/snippets/` — wrong patterns break under different conditions.
- A report without screenshots is automatically FAIL.
- Article preservation: now automated via `verify.js --article`. Manual check is only for content quality.
