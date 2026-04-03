# Pipeline: Article Transfer

*Batch transfer of encyclopedia articles from the old Drupal site to the new Swinburne-styled site. Parallelizable at the letter level.*

---

## Overview

```
1. cosmos-inventory          (once, fast)
2. cosmos-fetch-letter × N   (parallel, one per letter)
3. cosmos-reindex            (once, after all fetches)
4. cosmos-verify             (once, after reindex)
5. git commit + push         (manual)
```

## Agent Assembly

| Phase | Role | Domain files | Model |
|-------|------|-------------|-------|
| 1 (inventory) | `roles/researcher.md` | `domains/cosmos-infrastructure.md` | haiku |
| 2 (fetch) | `roles/coder.md` | `domains/cosmos-articles.md` + `domains/cosmos-infrastructure.md` | sonnet |
| 3 (reindex) | `roles/coder.md` | `domains/cosmos-infrastructure.md` | haiku |
| 4 (verify) | `roles/verifier.md` | `domains/cosmos-verification.md` | sonnet |

## Wave Scheduling

- **Wave 1**: Inventory (1 agent)
- **Wave 2**: Fetch letters (up to 6 concurrent, biggest first: S, C, A, P, G)
- **Wave 3**: Reindex (1 agent, after all fetches complete)
- **Wave 4**: Verify (1 agent, after reindex)

## Verification Checks

### Must pass (fail pipeline)
- No old-site references (`astronomy.swin.edu.au`)
- No absolute `/cosmos/` paths
- No broken image references
- Index consistency (files ↔ index.json)

### Report only (don't fail)
- Cross-link integrity (links to not-yet-transferred articles)
- Transfer progress count

## Details

See `AGENTS.md` for the full fetch-letter protocol, reindex script, and verification commands.
