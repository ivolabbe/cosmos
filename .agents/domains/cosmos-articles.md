# Domain: COSMOS Encyclopedia Articles

*Voice, tone, structure, and rules for writing and modifying COSMOS encyclopedia articles. Loaded by writer and verifier agents working on article content.*

---

## Voice & Tone

See `COSMOS-STYLE-GUIDE.md` for the full corpus analysis. Key rules:

- **Encyclopedic, third-person, present tense** for current facts; past tense for historical events
- **Open with direct definition** — no preamble, define the term immediately
- **Undergraduate level** — rigorous but accessible
- **No equations** unless strictly necessary
- **Dense lexicon cross-linking** — ~4.5 links per 100 words
- **No `<h2>`/`<h3>` headings** — use bold inline labels (`<strong>`) for sub-types
- Median article is ~210 words. Major topics stay under ~1000 words.

## Grammar Rules

- **"Data" are plural** (Latin: datum/data). Always: "the data are," "data show," "data were collected." Never "the data is."
- Same for other Latin plurals: spectra/spectrum, errata/erratum, criteria/criterion
- SI units preferred, with astronomical units where appropriate (AU, parsec, solar masses)
- HTML entities: `&#215;` (×), `&#176;` (°), `&#8212;` (—), use `<sup>`/`<sub>` for exponents

## Lexicon Links

Use `<a class="lexicon-term" href="SLUG.html">term</a>` for all astronomy terms that have (or should have) COSMOS entries. This builds the knowledge graph.

## Article Template

Use `.agents/code/article-template.html` — Swinburne header/footer, breadcrumb, article body.

### Structure
- Opening paragraph: define the term, give key context (distance, size, classification)
- Interactive embed (if available): iframe after opening paragraph
- Key sections with bold inline labels
- Data table (optional)

### Length Guidelines
- Planet article: 500–1500 words
- Concept article: 200–800 words
- New article matching corpus: ~210 words median

## CRITICAL: Minimal Article Modifications

When adding an interactive to an **existing** article:

1. **Preserve the original text verbatim.** Do not rewrite, expand, restructure, or "enhance."
2. **Add only**: the iframe embed block (after opening paragraph) and its caption.
3. **Do not add**: new sections, data tables, equations, expanded content, restructured headings.
4. **Do not remove**: any existing text, images, links, or content.
5. **Do not correct facts yourself.** Flag in completion report. Verifier decides scope.

The verifier enforces this: `verify.js --article` flags modifications exceeding ~15-20%. Iframe embeds and captions do NOT count against this threshold. A full rewrite is always rejected.

### When writing a NEW article
- Read `COSMOS-STYLE-GUIDE.md` first — match the voice exactly
- Match level, length, and narrative style of existing entries

## File Layout

```
articles_orig/    ← FROZEN snapshot of original 645 articles (never modify)
articles/         ← LIVE articles — may be edited (originals preserved above)
dev/              ← New article pages + interactive HTML files
```

- Writer outputs to `dev/` only. Never write directly to `articles/`.
- Migration from `dev/` to `articles/` is a deliberate later step.
- Always compare against `articles_orig/` to track changes.

## Quality Checklist

- [ ] Existing article text preserved verbatim (if modifying)
- [ ] Only iframe embed + caption added (no new sections or content)
- [ ] Every numerical claim traced to authoritative source
- [ ] All astronomy terms linked as lexicon-term
- [ ] HTML validates (no unclosed tags, proper entities)
- [ ] 3D interactive embedded if available
- [ ] Article matches template structure exactly
- [ ] Tone matches COSMOS encyclopedia voice
- [ ] No speculation — only established science
- [ ] Cross-links to related COSMOS articles included
