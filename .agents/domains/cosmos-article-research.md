# Domain: COSMOS Article Research

*Source hierarchy, fact-gathering methodology, and spec format for encyclopedia article research. Loaded by researcher agents producing article specs.*

---

## Prime Directive

**Completeness first.** The spec is the writer's only source of truth. If a fact isn't in the spec, the writer cannot include it. Every spec must contain enough factual content to write a 200–400 word encyclopedia article without the writer needing to research, extrapolate, or guess about anything.

---

## Resumability — Read Before Starting

**Before doing any research**, check whether the spec file already exists:

```bash
cat .planning/content/specs/{slug}/{slug}-spec.md 2>/dev/null | head -5
```

- If it contains `## STATUS: COMPLETE` → research is done, stop.
- If it exists but lacks `## STATUS: COMPLETE` → research was interrupted. Read the whole file. Continue from the last completed milestone (see milestones below). Do not repeat work already written.
- If it does not exist → start from Milestone 0.

**Write to the spec incrementally.** After each milestone below, append or rewrite the spec file. Do not hold content in memory until the end — write it as you go. A crash between milestones loses at most one milestone of work.

---

## Research Process

The source hierarchy below is a **starting point, not a boundary**. Begin with these sources, then follow the trail — references cited in Wikipedia articles, "Further reading" sections, links to primary papers, observatory press releases, review articles. The goal is to understand the topic well enough to write a spec that a writer can work from without guessing. If a Wikipedia article cites a seminal paper or an excellent review, fetch it. If a NASA page links to mission data, follow it. Use judgment about when you have enough.

**Write the spec incrementally.** After each milestone, append to the spec file. Do not hold content in memory until the end — a crash between milestones loses at most one milestone of work.

### Milestone 0 — Create spec file with header
Write the spec file immediately with the slug, title, category, and an IN-PROGRESS status marker.

```markdown
# {Title} — Article Spec

## STATUS: IN-PROGRESS (milestone: 0 — started)

## Category
{category}
```

### Milestone 1 — Definition + orientation
1. **Google AI Overview** — use `playwright-cli` to fetch the Google AI Overview for the topic. This provides an AI-generated summary and, more importantly, its cited references as starting points:
   ```bash
   # Open browser and navigate to Google search
   playwright-cli open --browser=chrome --persistent "https://www.google.com/search?q={topic}+astronomy"
   
   # If CAPTCHA appears (URL contains /sorry/), run: playwright-cli show
   # and wait for the user to solve it, then retry navigation
   
   # Extract the AI Overview text + cited references
   playwright-cli eval "(function() { var all = document.querySelectorAll('div'); for (var i=0; i<all.length; i++) { var t = all[i].innerText; if (t && t.indexOf('AI Overview') === 0 && t.length > 200) { return t.substring(0, 4000); } } return 'No AI Overview for this query'; })()"
   
   # Close browser when done
   playwright-cli close
   ```
   Treat the AI Overview as **orientation only** — do not cite it. The cited references within it are the valuable part. If no AI Overview appears, try adding qualifying terms ("physics", "definition") or proceed without it.
2. Fetch the Wikipedia article and the Britannica page for the topic
3. Read their reference lists — note any key papers, reviews, or external sources worth following
4. If a seed URL was provided in the task context (from the master article list), fetch that too
5. Extract: 1–2 sentence definition that distinguishes the topic from related concepts
6. Update spec → write `## Definition` + update STATUS to `milestone: 1`

### Milestone 2 — Key numbers + physical properties
1. Fetch quantitative data from NASA Science, HyperPhysics, NASA Fact Sheets, or specialist sources as appropriate
2. Follow references from Milestone 1 that point to primary data (mission pages, instrument papers, catalogs)
3. Extract all values with units and source
4. Update spec → write `## Key Numbers` table + update STATUS to `milestone: 2`

### Milestone 3 — Full content
1. Synthesise from all sources read so far: physical mechanism, sub-types, observational evidence, notable examples, significance
2. Follow references you haven't yet read if gaps remain — review articles, textbook chapters, observatory pages
3. For topics with recent developments: check ArXiv / ADS for key papers from the last 5 years
4. The content should reflect understanding from multiple sources, not paraphrase any single one
5. Update spec → write `## Full Content` + update STATUS to `milestone: 3`

### Milestone 4 — Historical context + classifications
1. Discovery history, key dates, naming etymology — draw from all sources already read
2. Follow biographical references for key discoverers if needed
3. Update spec → write `## Historical Context` + `## Sub-types / Classifications` + update STATUS to `milestone: 4`

### Milestone 5 — Cross-links
1. Read `articles/slugs.txt` (NOT index.json — slugs.txt is 6× smaller)
2. Identify 7–15 relevant COSMOS article slugs
3. Update spec → write `## Related COSMOS Articles` + update STATUS to `milestone: 5`

### Milestone 6 — Images
1. Search for 3–5 candidate images (see Image Sourcing below)
2. Download each: `node dev/download-image.js "<direct-file-url>" .planning/content/specs/{slug}/{name}.jpg`
3. For each successful download, create `{name}-caption.md` (see caption format below)
4. Update spec → write `## Images` table + update STATUS to `milestone: 6`

### Milestone 7 — Sources + Handoff
1. Compile the full source list (every source actually consulted, not just the hierarchy)
2. Write the Handoff section
3. Update STATUS to `## STATUS: COMPLETE`

### Milestone 8 — Run mandatory scripts

After the spec is complete, you MUST run these scripts. They are not optional.

```bash
# 1. Verify your own spec mechanically — catches missing sections, invalid images, missing captions
node dev/check-spec.js {slug}

# 2. Update pipeline tracking
node dev/update-pipeline-status.js {slug} phase-1-research done
```

If `check-spec.js` fails, fix the issues and re-run it until it passes. Do not consider research complete until it exits 0.

---

## Source Hierarchy (priority order)

**Always use in this order:**

1. **Wikipedia** — WikiProject Astronomy articles; every spec starts here
2. **Britannica** — `britannica.com/science`, `/place`, `/biography`; cross-checks Wikipedia
3. **NASA Science** — `science.nasa.gov` — authoritative for Solar System, missions, space science
4. **NASA Planetary Fact Sheets** — `nssdc.gsfc.nasa.gov/planetary/factsheet/` — numerical data
5. **HyperPhysics** — `hyperphysics.phy-astr.gsu.edu` — physics fundamentals
6. **Astro4Edu / IAU OAE** — `astro4edu.org/resources/glossary/` — educational definitions
7. **NED/IPAC glossary** — `ned.ipac.caltech.edu/level5/Glossary/` — professional definitions
8. **ESA/Hubble / ESO press releases** — observational milestones and images
9. **Astrobites** — `astrobites.org/guides/` — accessible summaries of current research
10. **ArXiv / ADS** — `arxiv.org`, `ui.adsabs.harvard.edu` — cutting-edge and peer-reviewed

**Always trace to the original source.** If you find a fact via an aggregator, follow the citation chain. The spec must cite the original.

---

## Image Sourcing

### Where to find images
- NASA Image Gallery — `images.nasa.gov`
- NASA Photojournal — `photojournal.jpl.nasa.gov`
- ESA/Hubble — `esahubble.org/images/`
- ESO — `eso.org/public/images/`
- APOD archive — `apod.nasa.gov`
- Wikimedia Commons — public domain or CC-BY only

### Image rules

**Download 3–5 candidate images** per article.

```bash
node dev/download-image.js "<direct-file-url>" .planning/content/specs/{slug}/{image-name}.jpg
```

Validates Content-Type and magic bytes. Exit non-zero = failed, skip it.

**Finding direct file URLs:**

| Source | Direct file URL pattern |
|--------|------------------------|
| ESA/Hubble | `cdn.esahubble.org/archives/images/screen/{id}.jpg` |
| ESO | `cdn.eso.org/images/screen/{id}.jpg` |
| NASA Images | Check JSON: `images-api.nasa.gov/asset/{id}` |
| Wikimedia | `upload.wikimedia.org/wikipedia/commons/.../{name}` |
| APOD | Parse the `<img>` src from the page |

**Caption file format** — create `{image-name}-caption.md` for each download:
```markdown
**Caption:** [Descriptive caption suitable for the article]
**Credit:** [Original credit line, e.g. "NASA/ESA/STScI"]
**Source:** [URL of the original page where the image was published]
**License:** [Public domain / CC-BY 4.0 / etc.]
**Recommended:** [yes/no]
**Why:** [Brief reason]
```

**Preferences:** Public domain or CC-BY. Photographs over diagrams. Direct illustration of the topic. Never use aggregator URL as source.

**Source attribution:** When an image is found via a secondary source (e.g. Wikimedia Commons, Wikipedia), the `Source:` field in the caption must link to the *original publisher's page* (e.g. the NASA, ESA, or ESO page where the image was first released) — not the wiki or aggregator page. If the original page cannot be found, record the Wikimedia Commons file page (not the article) and note that the original could not be traced.

**If all downloads fail**, note it in the spec. Abstract topics may legitimately have no suitable image.

---

## Incremental Spec Writing

After each milestone, rewrite the spec file with all sections completed so far. Use this running structure — add sections as they are completed, leave later sections as `(pending)`:

```markdown
# {Title} — Article Spec

## STATUS: IN-PROGRESS (milestone: N — {milestone name})

## Category
{category}

## Definition
...

## Key Numbers
...

## Full Content
(pending)

## Historical Context
(pending)

## Sub-types / Classifications
(pending)

## Related COSMOS Articles
(pending)

## Images
(pending)

## Sources
(pending)

## Handoff: Researcher → Writer
(pending)
```

When all sections are done, replace STATUS with:

```markdown
## STATUS: COMPLETE
```

---

## Spec Template (final form)

```markdown
# {Title} — Article Spec

## STATUS: COMPLETE

## Category
{category from dev/categories-list.txt}

## Definition
{1–2 sentences. Distinguishes topic from related concepts. Writer adapts this into the COSMOS opening line.}

## Full Content

{Dense bullet points — NOT prose. Every bullet has a [source].
- Physical description and key properties [source]
- Numerical values with units [source]
- Physical mechanism / how it works [source]
- Observational evidence [source]
- Sub-types or classifications [source]
- Relationship to broader concepts [source]
- Recent developments if any [source]}

## Key Numbers

| Property | Value | Source |
|----------|-------|--------|
| ... | ... | [source] |

## Historical Context
{Discoverers, key dates, naming etymology, milestone observations.}

## Sub-types / Classifications
{Enumerate variants with distinguishing characteristics. Omit if not applicable.}

## Related COSMOS Articles
{7–10 slugs from articles/slugs.txt}

## Images (candidates — writer will select the best)

| File | Description | Recommended? |
|------|-------------|--------------|
| {image-1}.jpg | [what it shows] | yes — [reason] |
| {image-2}.jpg | [what it shows] | no — [reason] |

See each {image-name}-caption.md for full caption, credit, source, and license.

## Sources
{All sources cited in spec, with URLs.}

## Handoff: Researcher → Writer

**Target length:** [100–200 / 200–400 / 400–800] words
**Gaps:** [Anything not found or unverified — "none" if complete]
**Watch for:** [Topic-specific pitfall, e.g. "often confused with X" — omit if none]
```

---

## Output Structure

```
.planning/content/specs/{slug}/
  {slug}-spec.md              # the spec
  {image-1}.jpg               # candidate image (validated)
  {image-1}-caption.md        # caption + credit + source + recommended
  {image-2}.jpg
  {image-2}-caption.md
  ...
```

**No other files.** Do not create README.md or any additional files beyond the spec and image/caption pairs.

---

## Common Pitfalls

- Don't confuse apparent magnitude with absolute magnitude
- Moon/satellite counts change — check latest IAU data
- "Surface temperature" for gas giants: specify pressure level (1 bar convention)
- Historical discovery dates vary by source (observation vs publication vs announcement)
- Spectral types: enumerate each sub-type separately (B, Be, Bp are distinct topics)
- SI units preferred, with astronomical units where conventional (AU, pc, M☉)
- "Data" are plural — spec must use "the data are," "data show," etc.
- Do not read `dev/cosmos-categories.json` (24KB) — use `dev/categories-list.txt`
- Do not read `articles/index.json` — use `articles/slugs.txt` (6× smaller)
