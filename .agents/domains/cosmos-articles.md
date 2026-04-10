# Domain: COSMOS Encyclopedia Articles

*Voice, tone, structure, and rules for writing and modifying COSMOS encyclopedia articles. Loaded by writer and verifier agents working on article content.*

---

## Voice & Tone

**You MUST read `COSMOS-STYLE-GUIDE.md` before writing any article.** It is the single source of truth for voice, tone, and style. This section is a quick reference, not a replacement.

- **Encyclopedic, third-person, present tense** for current facts; past tense for historical events
- **Open with direct definition** — first sentence = "[Term] is/are [definition]." Variants: historical/etymological, contrast, problem-statement — but always lead with the term
- **Varied voice** — mix active and passive naturally. Active is often clearer ("New Horizons revealed" not "it was revealed by"). Passive is fine when the agent is unimportant. Use "we" only for "humanity/observers", never "we the authors"
- **Approachable expert — this is the #1 priority.** Write like someone who understands the topic so deeply that their explanation feels simple and easy to follow. A keen high schooler should be able to read the article without stopping. Talk like a person, not a paper. If you would not say a phrase out loud to a friend, do not write it. "Tried" not "pursued". "Hit hardest" not "disproportionately affected". "Dimmer" not "reduced optical brightness". Not pop-science, not a textbook, and absolutely not a journal paper
- **Australian/British spelling** — colour, ionisation, metres, favouring
- **No editorial fluff** — no dramatic qualifiers ("profound", "groundbreaking"), no rhetorical questions, no filler. State facts neutrally
- **Analogies sparingly** — effective when making extreme quantities relatable ("a teaspoon of neutron star material would weigh around a billion tonnes")
- **Single quotes** for non-literal usage ('dark' matter, 'rainbows')
- **Equations:** use only when they define a key relationship. Render with KaTeX (`$$...$$` display, `\(...\)` inline). No derivations
- **Headings:** Short articles (< 300 words) use bold inline labels (`<strong>`). Longer articles (300+ words) with sub-topics use `<h2>`
- **Suggest split** if article exceeds ~700 words — consider a sub-article

## Grammar Rules

- **"Data" are plural** (Latin). Always: "the data are," "data show." Same for spectra, errata, criteria
- **No contractions** — "do not", "it is", "cannot"
- **Acronyms** spelled out on first use: "High-mass X-ray binaries (HMXBs)"
- **Numbers:** convey scale not precision ("between 10 and 20 km", "over 100 billion"). Small numbers spelled out ("two neutrons"), large use digits ("719 PHAs"). Units always explicit and metric
- SI units preferred, with astronomical units where conventional (AU, pc, M☉)
- HTML entities: `&#215;` (×), `&#176;` (°), `&#8212;` (—), `<sup>`/`<sub>` for exponents

## Lexicon Links

**Do NOT add cross-links manually.** Cross-linking is handled automatically by `node dev/cross-link-articles.js` after writing. Write plain prose without `<a class="lexicon-term">` tags. The script matches terms against the article index and wraps them.

## Article Template

Use `.agents/code/article-template.html` — Swinburne header/footer, breadcrumb, article body.

### Structure
- Opening paragraph: define the term, give key context (distance, size, classification)
- Interactive embed (if available): iframe after opening paragraph
- Key sections with bold inline labels
- Data table (optional)

### Image Placement

The image is already copied to `images/` before you start — the path is in your task context. Read the corresponding `-caption.md` file from the spec directory for caption text and credit.

**Image placement classes:**

| Class | Use when |
|-------|----------|
| `imageRight` | **Default.** Text wraps left; best reading flow. Use for most articles. |
| `imageCenter` | Image is very wide, or a diagram needing full size, or article is a stub (<150 words) |
| `imageLeft` | Rare. Image leads into the explanation that follows it. |

**Placement rules:**
- Set `width` on the `<div>` (not `<img>`), 300–400px
- Place after the first or second `<p>`, not before any text
- One floated image per direction at a time — do not stack two `imageRight` divs
- On mobile, floated images drop to full-width block automatically (CSS handles this)

**HTML format:**
```html
<div class="imageRight" style="width:350px;">
  <img src="../images/{slug}-{description}.jpg" width="350" alt="{alt text}" />
  <div class="caption">
    {Caption from caption file}<br/>
    <a href="{source-url}">{Credit}</a>
  </div>
</div>
```

### Length Guidelines

Use judgment — let the topic's richness determine length, not a fixed target:

| Topic type | Examples | Target length |
|-----------|----------|---------------|
| Simple definition | Wavelength, Parsec, Arcsecond | 100–200 words |
| Standard concept | Blackbody, Redshift, Cepheid Variable | 200–400 words |
| Rich topic (many sub-concepts, connections) | Solar System, Black Hole, Stellar Evolution, Galaxy | 400–800 words |

Do not pad short topics to meet a minimum. Do not compress rich topics that warrant depth. The spec's breadth signals the appropriate length.

## CRITICAL: Minimal Article Modifications

When adding an interactive to an **existing** article:

1. **Preserve the original text verbatim.** Do not rewrite, expand, restructure, or "enhance."
2. **Add only**: the iframe embed block (after opening paragraph) and its caption.
3. **Do not add**: new sections, data tables, equations, expanded content, restructured headings.
4. **Do not remove**: any existing text, images, links, or content.
5. **Do not correct facts yourself.** Flag in completion report. Verifier decides scope.

The verifier enforces this: `verify.js --article` flags modifications exceeding ~15-20%. Iframe embeds and captions do NOT count against this threshold. A full rewrite is always rejected.

### When writing a NEW article
- Follow the voice rules in this file — match the voice exactly
- Match level, length, and narrative style described in this file and the style guide. Do NOT read other articles for reference — the style guide is sufficient.

## Resumability — Write Incrementally

**Before starting**, check if the article already has content:
```bash
grep -c "WRITER_STATUS" articles/{slug}.html 2>/dev/null
```

- If `WRITER_STATUS: COMPLETE` is in the file → writing is done, stop.
- If `WRITER_STATUS: PARTIAL` is in the file → read the article, continue from where it left off. Do not rewrite sections that are already present.
- If no WRITER_STATUS → start fresh.

**Write incrementally.** After writing each section, save the file. Add a status comment inside `article__body`:
```html
<!-- WRITER_STATUS: PARTIAL (sections: opening, mass-distribution) -->
```

When the article is complete, update to:
```html
<!-- WRITER_STATUS: COMPLETE -->
```

This ensures that if you are interrupted mid-article, a re-dispatched writer can read the partial file and continue without losing work.

## File Layout

```
articles_orig/    ← FROZEN baseline (never modify)
articles/         ← All articles (new + existing). Writer outputs here.
images/           ← Article images
```

- `articles_orig/` is immutable — diff against it to track changes
- New articles go directly into `articles/` (scaffolded by `node dev/new-article.js`)
- Never overwrite existing articles that have `existing:` in `pipeline-status.md`

## Mandatory Post-Write Scripts

After writing the article, you MUST run these scripts in order. They are not optional.

```bash
# 1. Add cross-links — matches terms against article index, wraps in lexicon-term anchors
node dev/cross-link-articles.js articles/{slug}.html

# 2. Mechanical check — catches contractions, "data is", missing image, word count
node dev/check-article.js articles/{slug}.html

# 3. Update pipeline tracking
node dev/update-pipeline-status.js {slug} phase-2-writing done
```

If `check-article.js` fails, fix the issues in the article and re-run until it exits 0. Do not consider writing complete until it passes.

## Rejecting an insufficient spec

If the spec lacks enough factual content to write the article at the appropriate length, **do not guess or pad**. Instead:
1. Write a brief rejection note explaining what is missing (e.g. "Spec has no sub-type classification for a topic that clearly has variants")
2. Save it to the article file as an HTML comment: `<!-- WRITER_REJECTION: {reason} -->`
3. Do NOT run the post-write scripts
4. The orchestrator will re-dispatch the researcher to deepen the spec

## Quality Checklist (for self-review before running scripts)

- [ ] All facts from spec only — nothing invented
- [ ] Tone matches COSMOS voice — no fluff, no contractions, "data are" plural
- [ ] Length appropriate to topic richness
- [ ] Image placed correctly with caption + credit
- [ ] No inline citations in article text
- [ ] No cross-links added manually (the script handles this)
- [ ] **Language clarity pass** (see below)

## Language Clarity Pass (MANDATORY — do not skip)

**This pass is not optional.** If you skip it, the article will be rejected. After writing the article and before running the post-write scripts, re-read every sentence out loud in your head. Apply these checks:

1. **Talk like a person, not a paper.** Read each sentence and ask: would I say this to a smart friend? "SpaceX has pursued several approaches to reducing the optical brightness" is something nobody would say. "SpaceX has tried several ways to make its satellites dimmer" is what a person would say. Use the second version. This is the single most common failure mode.
2. **Fancy words are a bug.** If a non-technical word has a plainer synonym, the plain one is correct. "Began" not "inaugurated". "Hit hardest" not "disproportionately affected". "Tried" not "pursued". "Stray signals" not "unintended electromagnetic radiation". See the word-choice table in the style guide (Section 4b) — read it, memorise it, apply it.
3. **One idea per sentence.** If a sentence has more than two facts, split it. Long compound sentences with embedded clauses are the hallmark of academic writing. Break them up.
4. **Vary active and passive.** If three sentences in a row are passive, rewrite at least one with an active subject.
5. **No em-dashes.** They are an AI writing tell. Use a comma, full stop, or colon instead. Zero em-dashes in an article is ideal. More than two is too many.
6. **Say it shorter.** If you can say the same thing in fewer words without losing meaning, do it. "Newer satellites are worse" beats "Later satellite versions emit significantly more unintended radio radiation than earlier ones."
7. **Plain headings.** A 16-year-old scanning the page should know what each section covers from the heading alone.
8. **The high-schooler test.** Read the whole article as if you are 16 and interested in space but have no physics training. If any sentence makes you pause or re-read, simplify it.

Technical terms that have COSMOS entries must stay and be linked. The goal is that everything *around* those terms reads like natural, clear English.
