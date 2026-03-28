# COSMOS Transfer — Agent Architecture

The transfer of 643 articles from the old Drupal COSMOS site is parallelizable at the letter level. These agent definitions enable reliable, repeatable, parallel execution.

## Pipeline Overview

```
1. cosmos-inventory          (once, fast)
   │
   ▼
2. cosmos-fetch-letter × N   (parallel, one per letter)
   │  │  │  │  │  │
   ▼  ▼  ▼  ▼  ▼  ▼
3. cosmos-reindex            (once, after all fetches)
   │
   ▼
4. cosmos-verify             (once, after reindex)
   │
   ▼
5. git commit + push         (manual or on confirmation)
```

---

## Agent 1: `cosmos-inventory`

**Run:** Once, at the start of a transfer session.

**Purpose:** Scrape all 26 letter index pages from the old site, build a complete article manifest, and identify what still needs transferring.

**Input:** None (reads `articles/index.json` for already-transferred articles).

**Steps:**
1. For each letter A–Z, fetch `https://astronomy.swin.edu.au/cosmos/LETTER`
2. Extract all article URLs matching `href="https://astronomy.swin.edu.au/cosmos/LETTER/[^"]*"`
3. For each URL, compute the slug (see URL-to-Slug Convention in TRANSFER-GUIDE.md)
4. Cross-reference against existing `articles/index.json` to mark already-transferred
5. Write manifest to `.transfer/manifest.json`

**Output:** `.transfer/manifest.json` — array of:
```json
{
  "url": "https://astronomy.swin.edu.au/cosmos/N/Nebula",
  "letter": "N",
  "title": "Nebula",
  "slug": "nebula",
  "transferred": false
}
```

**Duration:** ~30 seconds (26 HTTP requests).

---

## Agent 2: `cosmos-fetch-letter`

**Run:** In parallel, one instance per letter (or per batch of letters). Up to 6 concurrent.

**Purpose:** Transfer all articles for a single letter. This is the main workhorse agent.

**Input:** A letter (e.g., `C`) and the list of article URLs for that letter from the manifest.

**Steps per article:**
1. `curl -sL` the article URL
2. Extract title from `<h2>` tag before the node div
3. Extract body from `<div class="field-item even" property="content:encoded">`
4. Scan body for image/resource URLs from `astronomy.swin.edu.au`:
   - `/cms/cpg15x/albums/` paths
   - `/cosmos/files/tex/` paths
   - Any `src` or `href` pointing to `astronomy.swin.edu.au`
5. Download images to `images/` (skip if file already exists with non-zero size)
6. Transform body HTML:
   - Rewrite image `src` to `../images/BASENAME`
   - Convert all `https://astronomy.swin.edu.au/cosmos/X/Title` links to `slug.html`
   - Convert all `/cosmos/cosmos/X/title` links to `slug.html`
   - Replace `astronomy.swin.edu.au/sao` with new Swinburne SAO URL
7. Wrap transformed body in article template (see `.agents/article-template.html`)
8. Write to `articles/SLUG.html`

**Output:** List of `{slug, title, letter}` for articles transferred, plus list of downloaded image filenames.

**Parallelism notes:**
- Dispatch biggest letters first for load balancing: S(83), C(59), A(55), P(46), G(41)
- Each agent writes to `articles/` (no slug collisions across letters) and `images/` (skip-if-exists prevents write conflicts)
- No shared mutable state — `index.json` is NOT updated by this agent

**Error handling:**
- If an article URL returns 404, log and skip
- If image download fails, log the URL and continue (the article will have a broken image ref that verification will catch)
- If body extraction fails (no matching div), log the URL with the raw HTML length for debugging

---

## Agent 3: `cosmos-reindex`

**Run:** Once, after ALL fetch agents have completed.

**Purpose:** Rebuild `articles/index.json` and `js/cosmos-index.js` from the actual files on disk. This is the single source of truth — no merge conflicts possible.

**Steps:**
```python
import os, json, re

articles = []
for fname in sorted(os.listdir('articles')):
    if not fname.endswith('.html'):
        continue
    slug = fname.replace('.html', '')
    with open(f'articles/{fname}') as f:
        content = f.read()
    title_match = re.search(r'<h1 class="article__title">([^<]+)</h1>', content)
    letter_match = re.search(r'browse\.html\?letter=([A-Z])', content)
    if title_match and letter_match:
        articles.append({
            'slug': slug,
            'title': title_match.group(1),
            'letter': letter_match.group(1)
        })

with open('articles/index.json', 'w') as f:
    json.dump(articles, f, indent=2)

with open('js/cosmos-index.js', 'w') as f:
    f.write('var COSMOS_INDEX = ' + json.dumps(articles, indent=2) + ';')

print(f'Indexed {len(articles)} articles')
```

**Why rebuild from disk?** Avoids merge conflicts from parallel agents appending to `index.json`. The filesystem IS the index — `cosmos-reindex` just reads it.

---

## Agent 4: `cosmos-verify`

**Run:** Once, after reindex.

**Purpose:** Run all verification checks. Fail the pipeline if critical checks fail.

**Checks (must pass — fail pipeline if not):**

### No old-site references
```bash
count=$(grep -rc 'astronomy\.swin\.edu\.au' --include='*.html' . | grep -v ':0$' | wc -l)
[ "$count" -eq 0 ] || { echo "FAIL: $count files still reference astronomy.swin.edu.au"; exit 1; }
```

### No absolute /cosmos/ paths
```bash
count=$(grep -rc '"/cosmos/' --include='*.html' . | grep -v ':0$' | wc -l)
[ "$count" -eq 0 ] || { echo "FAIL: $count files have /cosmos/ absolute paths"; exit 1; }
```

### No broken image references
```bash
broken=0
for f in articles/*.html; do
  grep -oh 'src="../images/[^"]*"' "$f" | sed 's/src="..\/images\///;s/"//' | while read img; do
    [ -f "images/$img" ] || { echo "MISSING IMAGE: $img (in $f)"; broken=$((broken+1)); }
  done
done
[ "$broken" -eq 0 ] || { echo "FAIL: $broken broken image references"; exit 1; }
```

### Index consistency
```bash
python3 -c "
import json, glob
with open('articles/index.json') as f:
    index = {a['slug'] for a in json.load(f)}
files = {f.replace('articles/','').replace('.html','') for f in glob.glob('articles/*.html')}
missing_index = files - index
missing_files = index - files
ok = True
if missing_index:
    print(f'FAIL: In articles/ but not in index.json: {missing_index}')
    ok = False
if missing_files:
    print(f'FAIL: In index.json but no HTML file: {missing_files}')
    ok = False
if ok:
    print(f'OK: Index consistent ({len(index)} articles)')
exit(0 if ok else 1)
"
```

**Checks (report only — do not fail pipeline):**

### Cross-link integrity
```bash
python3 -c "
import re, glob
existing = {f.split('/')[-1] for f in glob.glob('articles/*.html')}
broken = set()
for f in glob.glob('articles/*.html'):
    with open(f) as fh:
        for m in re.findall(r'href=\"([a-z][a-z0-9-]*\.html)\"', fh.read()):
            if m not in existing:
                broken.add(m)
total = len(existing)
if broken:
    print(f'INFO: {len(broken)} cross-links to not-yet-transferred articles ({total} transferred)')
else:
    print(f'OK: All cross-links resolve ({total} articles)')
"
```

### Transfer progress
```bash
transferred=$(ls articles/*.html 2>/dev/null | wc -l | tr -d ' ')
echo "Progress: $transferred / 643 articles transferred"
```

---

## Incremental Transfer

For transferring a subset of letters (e.g., just C and D):

1. Run `cosmos-fetch-letter` for C and D only (parallel)
2. Run `cosmos-reindex`
3. Run `cosmos-verify`
4. Commit and push

The pipeline handles partial transfers gracefully — cross-links to untransferred articles use the correct slug format and will resolve once those articles are transferred later.

---

## File Layout

```
cosmos/
├── .agents/                    # Transfer documentation (this directory)
│   ├── AGENTS.md               # Agent definitions (this file)
│   ├── TRANSFER-GUIDE.md       # Step-by-step transfer process
│   ├── article-template.html   # HTML template for article pages
│   └── verify.sh               # Verification script
├── .github/workflows/
│   └── pages.yml               # GitHub Pages auto-deploy
├── articles/
│   ├── index.json              # Master article index
│   ├── astronomy.html          # Article pages (slug-named)
│   └── ...
├── css/
│   └── style.css               # Swinburne house style
├── images/                     # All images, icons, TeX PNGs
├── js/
│   └── cosmos-index.js         # Generated JS index for search/browse
├── index.html                  # Landing page (original COSMOS content)
├── browse.html                 # Dynamic letter index
└── search.html                 # Client-side search
```

---

# SAO Interactive App Agents

Autonomous development of 3D interactive visualizations and encyclopedia articles.

## Architecture

```
          ┌──────────────────────────────────────┐
          │  ORCHESTRATOR  (tracks phases only)   │
          │  Dispatches agents, recovers failures │
          └──────────┬───────────────────────────┘
                     │
    ┌────────────────┼────────────────┐
    ▼                ▼                ▼
  App 1            App 2            App N  (parallel)
    │                │                │
    ▼                ▼                ▼
┌─────────┐    ┌─────────┐    ┌─────────┐
│RESEARCHER│    │RESEARCHER│    │RESEARCHER│  Phase 1
│→ SPEC    │    │→ SPEC    │    │→ SPEC    │
└────┬─────┘    └────┬─────┘    └────┬─────┘
     │               │               │
     ▼               ▼               ▼
  ┌──────┐        ┌──────┐        ┌──────┐
  │CODER │◄──────►│CODER │◄──────►│CODER │  Phase 2
  └──┬───┘feedback└──┬───┘        └──┬───┘
     │   ▲           │               │
     ▼   │           ▼               ▼
  ┌──────┴──┐     ┌─────────┐    ┌─────────┐
  │VERIFIER │     │VERIFIER │    │VERIFIER │
  └─────────┘     └─────────┘    └─────────┘
     │               │               │
     ▼               ▼               ▼
  ┌──────┐        ┌──────┐        ┌──────┐
  │WRITER│        │WRITER│        │WRITER│  Phase 3
  └──┬───┘        └──┬───┘        └──┬───┘
     ▼               ▼               ▼
  VERIFIER         VERIFIER        VERIFIER
     │               │               │
     ▼               ▼               ▼
   Done             Done            Done     Phase 4
```

**The SPEC is the central artifact.** Researcher produces it. Coder, Verifier, and Writer all consume it.

## Agent Files

| Agent | File | Role | Runs as |
|-------|------|------|---------|
| **Orchestrator** | `sao-orchestrator.md` | Phase tracker. Dispatches agents, recovers failures. | Main context (lean) |
| **Researcher** | `sao-researcher.md` | Produces the SPEC: science facts, state-of-the-art survey, implementation plan, verification requirements, comparison data. | Background agent |
| **Coder** | `sao-coder.md` | Builds the interactive from the spec. Receives feedback from verifier, iterates. | Background agent |
| **Verifier** | `sao-verify.md` | Quality gate. Physics checks in-house, dispatches visual sub-agent. Gives structured feedback to coder or writer. Does NOT fix — only reports. | Background agent |
| **Visual Designer** | `sao-visual.md` | Visual quality specialist. Researches reference styles, compares screenshots, reports to verifier. Dispatched BY verifier, not by orchestrator. | Sub-agent of verifier |
| **Writer** | `sao-writer.md` | Adds iframe embed to existing articles (minimal modifications). Writes new articles matching COSMOS voice. | Background agent |

## Key Architecture Decisions

1. **SPEC-driven.** Researcher produces `.planning/apps/[topic]-spec.md` containing everything: facts, reference code, visual references, implementation approach, verification criteria. All other agents read from it.

2. **Orchestrator = phase tracker.** Knows which phase each app is in. Dispatches the right agent for the next phase. Puts things back on track when they go awry. Does NOT touch code, screenshots, or content.

3. **Verifier is the single quality gate.** Combines physics checks (in-house, lightweight) with visual quality (delegated to visual sub-agent, context-heavy). This separation keeps the verifier lean while allowing deep visual research. The verifier gives specific, actionable feedback to the coder.

4. **Parallel by default.** Independent apps run through the pipeline simultaneously. Orchestrator manages 2-4 concurrent pipelines.

## Self-Improvement

Every agent file has a `## Learnings` section at the bottom. After each app is built, the orchestrator appends what worked and what failed. This makes each subsequent app faster and more reliable.
