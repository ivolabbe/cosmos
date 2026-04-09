# Content Pipeline — Quick Start

*How to continue producing COSMOS encyclopedia articles from a fresh context.*

---

## Hard rules

1. **One fresh agent per article.** Never batch multiple articles into a single agent. No exceptions.
2. **Agents read their own domain files.** The orchestrator tells the agent which files to read — never summarise, excerpt, or inline the content. The agent reads the actual files itself.
3. **Mechanical work is scripted.** Cross-linking, image copying, preflight checks, status updates — all handled by scripts, zero tokens.

---

## 1. Orient yourself

Read these files:
```
.agents/pipelines/article-production.md         # pipeline phases + agent assembly table
.planning/content/pipeline-status.md            # which articles are done / pending
```

## 2. Pick articles

Open `.planning/content/pipeline-status.md`:
- **Tier 1 first**, then Tier 2, then Tier 3
- Skip rows with `existing:` in notes — those are not rewritten
- Skip rows already marked `done` in earlier phases — continue from the next phase

To find the category and seed URL for a topic:
```bash
grep -i "{keyword}" .planning/content/cosmos-all-merged-scored-final.md
```
The `url` column is the seed URL. For the category, check `dev/cosmos-categories.json` (the `articles` object maps slug → category) or use `dev/categories-list.txt` for the 13 category labels.

---

## 3. Phase 1: Research

### Pre-flight
```bash
# Check spec state: COMPLETE → skip, IN-PROGRESS → resume, missing → start fresh
grep -m1 "STATUS:" .planning/content/specs/{slug}/{slug}-spec.md 2>/dev/null || echo "no spec"
```

- `STATUS: COMPLETE` → skip research, move to Phase 2
- `STATUS: IN-PROGRESS (milestone: N)` → dispatch researcher with the same prompt — the domain file tells it to read the partial spec and resume from milestone N+1
- `no spec` → dispatch researcher from scratch

### Dispatch researcher (model: opus)

Spawn one agent per article with this exact prompt:

```
You are a COSMOS encyclopedia researcher.

Read these files before doing anything else:
1. .agents/roles/researcher.md
2. .agents/domains/cosmos-article-research.md

Then research this topic and produce a complete spec:
  Topic: {keyword}
  Slug: {slug}
  Category: {category}
  Seed URL: {url from master list, or omit if none}
  Output: .planning/content/specs/{slug}/
```

That's the entire prompt. Do NOT add voice rules, source lists, spec templates, or other guidance — the domain file contains all of it.

### Post-research scripts
```bash
node dev/check-spec.js {slug}                                    # mechanical check
node dev/update-pipeline-status.js {slug} phase-1-research done  # update tracking
```

If `check-spec.js` fails, either fix manually or re-dispatch the researcher (it will resume from the last milestone).

---

## 4. Phase 1b: Spec Review (optional)

```bash
node dev/check-spec.js {slug}   # always run this — catches mechanical issues for free
```

Dispatch a verifier agent (sonnet) only if the topic is complex/contentious or the researcher flagged gaps. For routine articles, the mechanical check is sufficient.

---

## 5. Phase 2: Write

### Pre-write scripts
```bash
# Scaffold (will error if article already exists — that's fine, means it was scaffolded before)
node dev/new-article.js "{Title}" 2>/dev/null || echo "Already scaffolded"

# Copy recommended image — prints dest path (e.g. images/solar-system-montage.jpg)
node dev/copy-recommended-image.js {slug}
```

Note the image path printed by `copy-recommended-image.js`. The matching caption file is in `.planning/content/specs/{slug}/` (same base name + `-caption.md`).

### Dispatch writer (model: sonnet)

Spawn one agent per article with this exact prompt:

```
You are a COSMOS encyclopedia writer.

Read these files before doing anything else:
1. .agents/roles/writer.md
2. .agents/COSMOS-STYLE-GUIDE.md
3. .agents/domains/cosmos-articles.md

Then write the article:
  Topic: {keyword}
  Slug: {slug}
  Spec: .planning/content/specs/{slug}/{slug}-spec.md
  Article: articles/{slug}.html
  Image: {path from copy-recommended-image.js}
  Image caption: .planning/content/specs/{slug}/{image-name}-caption.md
```

That's the entire prompt. Do NOT add voice rules, length guidance, style examples, or anti-fluff instructions — the files contain all of it.

### Post-write scripts
```bash
node dev/cross-link-articles.js articles/{slug}.html             # add lexicon-term links
node dev/check-article.js articles/{slug}.html                   # mechanical check
node dev/update-pipeline-status.js {slug} phase-2-writing done   # update tracking
```

If `check-article.js` fails:
- **Contractions / "data is"**: fix directly in the HTML (small edit, no agent needed)
- **Word count too low**: re-dispatch writer with feedback
- **Image missing**: re-run `copy-recommended-image.js` or check spec images

### Writer rejects spec (feedback loop)

If the writer reports the spec is insufficient (missing key facts, too thin for the topic), do NOT force it to guess:

1. Update status: `node dev/update-pipeline-status.js {slug} phase-2-writing revision`
2. Re-dispatch the researcher with the same prompt — it will read the existing spec (STATUS: COMPLETE) and the writer's feedback
3. Add to the researcher prompt: `The writer reported the spec is too thin. Deepen: {writer's specific feedback}`
4. After researcher updates the spec, re-run `check-spec.js`, then re-dispatch the writer

---

## 6. Phase 2b: Verify (optional for routine articles)

Dispatch verifier (opus) only if:
- `check-article.js` flagged warnings (not failures)
- The article is on a complex/contentious topic
- You want extra confidence before expert review

```
You are a COSMOS encyclopedia verifier.

Read these files before doing anything else:
1. .agents/roles/verifier.md
2. .agents/domains/cosmos-articles.md

Verify this article against its spec. Mechanical checks (contractions, "data is",
word count, image validity, cross-links) are already done by check-article.js.
Your job is judgment only:
  - Are all facts traceable to the spec? (no invention, no extrapolation)
  - Is the tone encyclopedic and neutral? (no fluff, no editorial commentary)
  - Is Australian/British spelling used? (colour, ionisation, metres)
  - Is the length appropriate for the topic's richness?

  Article: articles/{slug}.html
  Spec: .planning/content/specs/{slug}/{slug}-spec.md
```

---

## 7. Parallel execution (overlapped phases)

Articles are independent — research and writing can overlap across articles. **Do not wait for all research to finish before starting writers.** Dispatch a writer as soon as its research completes.

```
Time 0:00 — Dispatch researchers for articles A, B, C, D (4 concurrent)
Time 1:30 — Research A completes → run check-spec + scaffold → dispatch Writer A
             (researchers B, C, D still running)
Time 2:00 — Research B completes → run check-spec + scaffold → dispatch Writer B
             (researchers C, D + writer A running)
Time 3:00 — Research C completes → dispatch Writer C
             (researcher D + writers A, B running)
...and so on
```

This overlaps Phase 1 and Phase 2 across articles, reducing total wall-clock time by ~40% compared to batch-then-batch.

**Practical pattern:** Dispatch 4–6 researchers in one message. As each returns, run post-research scripts and dispatch its writer immediately. Keep dispatching new researchers to fill the slots freed by completed ones.

---

## 8. Key files

| File | Purpose |
|------|---------|
| `.agents/pipelines/article-production.md` | Pipeline definition + agent assembly table |
| `.agents/domains/cosmos-article-research.md` | Researcher: milestones, sources, spec template, scripts |
| `.agents/domains/cosmos-articles.md` | Writer: voice summary, image placement, scripts |
| `.agents/COSMOS-STYLE-GUIDE.md` | Single source of truth for voice (writer reads this) |
| `.planning/content/pipeline-status.md` | Master tracking table |
| `.planning/content/cosmos-all-merged-scored-final.md` | All 2,063 articles with scores + seed URLs |
| `dev/categories-list.txt` | 13 topic categories (compact) |

### Scripts (all zero tokens)

| Script | When | What |
|--------|------|------|
| `dev/new-article.js "{Title}"` | Pre-write | Scaffold HTML, update indexes + slugs.txt |
| `dev/copy-recommended-image.js {slug}` | Pre-write | Copy best image to `images/`, print path |
| `dev/download-image.js {url} {path}` | During research | Download + validate image (reject HTML) |
| `dev/cross-link-articles.js articles/{slug}.html` | Post-write | Add lexicon-term links |
| `dev/check-spec.js {slug}` | Post-research | Verify spec structure + images |
| `dev/check-article.js articles/{slug}.html` | Post-write | Check contractions, "data is", word count, image |
| `dev/update-pipeline-status.js {slug} {phase} {status}` | After each phase | Update tracking table |
