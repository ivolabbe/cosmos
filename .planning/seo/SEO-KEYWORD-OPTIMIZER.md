# SEO Keyword Optimizer — Master Reference

*Generic SEO optimization principles + COSMOS-specific workflow. This document is the single source of truth for all SEO work on the site.*

---

## Part 1: Generic SEO Optimization Rules

These rules apply to **any** content site competing for organic search traffic. They are not COSMOS-specific.

### Rule 1: H2 headings must match search queries exactly

Google matches H2 headings directly to question queries and pulls them into featured snippets. The heading IS the targeting mechanism.

**Bad:** `## Temperature` — generic, matches nothing people search for
**Good:** `## How hot is the Sun?` — matches "how hot is the sun" (27.1K monthly volume) exactly

For every target keyword cluster, there must be an H2 that a searcher would recognise as answering their query. Question-form H2s work best for informational intent queries ("how", "what", "why", "when").

### Rule 2: Answer-first paragraphs

Immediately after each question-H2, the **first 1-2 sentences must directly answer the question**. Then expand with detail.

```html
<h2>How hot is the Sun?</h2>
<p>The Sun's surface temperature is approximately 5,778 K (5,505 °C).
Its core reaches about 15.7 million K, where hydrogen fusion occurs.</p>
<p>The temperature varies dramatically across the Sun's layers...</p>
```

Google's featured snippet extraction targets the first sentence after a matching heading. If the answer is buried in paragraph 3, you lose the snippet to whoever puts it in paragraph 1.

**Key metrics to include in the answer:** numbers, units, comparisons. "The Sun's surface is 5,778 K" beats "The Sun is very hot."

### Rule 3: FAQ structured data (Schema.org)

Add `FAQPage` JSON-LD schema markup for question-based sections. This gives **rich results** in SERPs — expandable Q&A boxes that take up more visual space and increase click-through rate.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "How hot is the Sun?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "The Sun's surface temperature is approximately 5,778 K (5,505 °C). Its core reaches about 15.7 million K."
    }
  }]
}
```

### Rule 4: Internal linking with keyword-rich anchor text

Every article should link TO and FROM related articles using the target keyword as anchor text. This signals to Google what the target page is about.

**Good:** "The photosphere determines [how hot the Sun](../sun/) appears from Earth."
**Bad:** "Learn more about the Sun [here](../sun/)."

Internal linking also distributes page authority across the site — high-traffic pages lift linked pages.

### Rule 5: Dedicated pages for high-volume sub-queries

If a sub-query has **> 10K monthly volume** and the main article only touches it in a sentence, it may warrant its own page. A dedicated page with:
- An H1 matching the query exactly
- 300-500 words of focused content
- Internal links to/from the parent article

...will outrank a brief mention buried in a long encyclopedia article.

**Decision threshold:** Create a dedicated page when:
- Volume > 10K AND the topic is substantive enough for 300+ words
- OR the main article cannot naturally accommodate the H2 without bloating

### Rule 6: Meta description optimization

Each page needs a unique meta description (150-160 chars) that:
- Contains the primary target keyword
- Answers the core question in one sentence
- Includes a differentiator ("with interactive 3D visualization")

### Rule 7: Page speed and Core Web Vitals

Google penalises slow pages. For pages with heavy interactives (Three.js, WebGL):
- Lazy-load the interactive below the fold
- Serve text content first (LCP under 2.5s)
- Keep Cumulative Layout Shift under 0.1

### Rule 8: Mobile responsiveness

Over 60% of educational searches come from mobile. Every page must:
- Render correctly on 375px viewport
- Have tap targets > 48px
- Not require horizontal scrolling

### Rule 9: Embed interactives for engagement signals

Embedded interactive elements (simulations, 3D visualizers, calculators) provide:
- **Longer dwell time** — direct ranking signal
- **Lower bounce rate** — direct ranking signal
- **Backlink magnet** — teachers and educators link to interactive resources
- **Rich result eligibility** — `WebApplication` schema markup
- **Social sharing** — visual interactives get shared more than text

Add `WebApplication` schema for interactive pages:
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Interactive Sun Explorer",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web browser"
}
```

### Rule 10: Structured content hierarchy

```
H1: Page title (one per page, contains primary keyword)
  H2: Major section / target keyword question
    H3: Sub-topic within section
  H2: Next major section / target keyword question
    H3: Sub-topic
```

Never skip heading levels (H1 → H3). Never use more than one H1. Use H2s for every distinct keyword target.

---

## Part 2: COSMOS-Specific Considerations

### The COSMOS voice

COSMOS articles are written in an **authoritative but accessible encyclopedia voice** — third person, present tense, precise language. SEO optimization must NOT break this voice.

**Compatible:** Question-H2s ("How hot is the Sun?") followed by authoritative answer-first paragraphs
**Incompatible:** Clickbait H2s ("You won't believe how hot the Sun is!"), keyword stuffing, thin content

Read `.agents/COSMOS-STYLE-GUIDE.md` before writing any SEO-optimized content.

### The interactive advantage

COSMOS's unique competitive position: **encyclopedic coverage (643 articles) + interactive 3D visualizations**. No competitor does both. Every SEO strategy should identify where an interactive gives COSMOS an edge that text-only competitors (Wikipedia, Britannica) cannot match.

### Article modification rules

COSMOS articles in `articles/` are maintained through a separate pipeline. SEO changes to articles must follow the existing content workflow:
- Heading restructures and answer-first paragraphs go through the writer agent
- Schema markup goes in the HTML template (shared infrastructure)
- Internal linking changes are batched and applied site-wide

### Target audience

Primary: undergraduate astronomy students and curious adults
Secondary: high school students, educators
Tertiary: researchers looking for quick reference

Keyword targeting should prioritize **informational intent** queries at the undergraduate level.

---

## Part 3: The SEO Analysis Workflow

### Overview

```
1. Pick a COSMOS article topic
2. Identify competitor page(s) for that topic
3. Extract top 100 keywords from Semrush (by traffic + by volume)
4. Deduplicate, cluster, filter noise
5. Audit current COSMOS article against clusters
6. Produce two outputs:
   a) Keyword report — the raw data and clusters
   b) SEO optimizer spec — specific instructions for the writer agent
```

### Semrush extraction procedure

#### Step 1: Navigate to Semrush Organic Research

URL pattern:
```
https://www.semrush.com/analytics/organic/positions/?db=us&q=[COMPETITOR_URL]&searchType=subfolder
```

**Use `subfolder` search type** — `exact URL` returns no data for most Wikipedia pages.

#### Step 2: Note overview metrics

From the summary bar, record:
- Total organic keywords
- Total monthly traffic
- Traffic cost (proxy for keyword value)
- Intent breakdown (informational / navigational / commercial / transactional)

#### Step 3: Extract keywords — two passes

**Pass 1: Sort by traffic** (default) — captures keywords actually driving visitors now.
**Pass 2: Sort by volume** (`&sortField=volume`) — captures high-opportunity keywords regardless of current ranking.

Extract top 100 from each pass using browser JavaScript:
```javascript
const rows = document.querySelectorAll('[role="row"]');
const out = [];
for (let i = 1; i <= 100 && i < rows.length; i++) {
  const r = rows[i];
  const kw = r.querySelector('a[href*="keywordoverview"]');
  if (!kw) continue;
  const cells = r.querySelectorAll('[role="gridcell"]');
  const pos = cells[3]?.textContent.trim();
  const traffic = cells[5]?.textContent.trim();
  const vol = cells[7]?.textContent.trim();
  out.push(kw.textContent.trim() + '|' + pos + '|' + traffic + '|' + vol);
}
out.join('\n');
```

For pages with > 100 rows, paginate and re-run.

#### Step 4: Cluster and filter

1. **Merge** both passes (traffic-sorted + volume-sorted), removing exact duplicates
2. **Filter noise:** navigational queries for other brands, unrelated topics, unit conversions
3. **Cluster variants:** group by semantic similarity
   - "how hot is the sun" + "temperature of the sun" + "sun temperature" → **Temperature cluster**
4. **Sum cluster volume** across all variants
5. **Rank clusters** by total volume descending

#### Step 5: Audit COSMOS article

For each cluster, check the current COSMOS article:

| Check | Status values |
|-------|---------------|
| H2 heading matches query? | exact / close / missing |
| Answer-first paragraph? | yes / buried / missing |
| Quantitative answer (numbers, units)? | yes / vague / missing |
| Internal links from related articles? | yes / some / none |
| Interactive supports this topic? | yes / partially / no |
| Dedicated sub-page warranted? | yes (>10K vol, thin coverage) / no |

### Output: two documents per article

#### Document 1: Keyword Report

Raw data and analysis. Saved to `.planning/seo/keywords/[article-name].md`.

```markdown
# SEO Keyword Report: [Article Name]

**Date:** [date]
**Competitor:** [URL] | **Keywords:** [count] | **Traffic:** [monthly] | **DB:** [US/AU]

## Top 100 keywords (deduplicated, by traffic)

| # | Keyword | Position | Traffic | Volume |
|---|---------|----------|---------|--------|
| 1 | ...     | ...      | ...     | ...    |
...
| 100 | ...   | ...      | ...     | ...    |

## Keyword clusters (by total volume)

| Cluster | Example queries | Total Volume | Best Pos | Intent |
|---------|----------------|--------------|----------|--------|
| ...     | ...            | ...          | ...      | ...    |

## Noise filtered out
- [keyword] — [reason: navigational / branded / irrelevant]
```

#### Document 2: SEO Optimizer Spec (for the writer agent)

Specific, actionable instructions. Saved to `.planning/seo/keywords/[article-name]-spec.md`.

This is the document the **writer agent reads** when restructuring or writing an article. It must be quantitative — every recommendation backed by volume numbers.

```markdown
# SEO Optimizer Spec: [Article Name]

**Target article:** `articles/[slug].html`
**Date:** [date]
**Based on:** [competitor URL] keyword analysis

## Current state

Current H2 headings:
1. [heading] — matches cluster: [X] / no match
2. [heading] — matches cluster: [Y] / no match
...

Overall SEO readiness: [poor / partial / good]

## Required H2 headings (ranked by volume)

Each heading below MUST appear as an H2 in the article, in the recommended order.
The first 1-2 sentences after each H2 MUST directly answer the question with specific numbers.

| Priority | H2 Heading | Target Cluster Volume | Answer must include |
|----------|------------|----------------------|---------------------|
| 1        | How hot is the Sun? | ~55K | Surface temp (5,778 K), core temp (15.7M K) |
| 2        | What color is the Sun? | ~45K | White (all wavelengths), appears yellow through atmosphere |
| 3        | How far is the Sun from Earth? | ~35K | 1 AU = 149.6 million km, light travel time 8m 20s |
| ...      | ...        | ...                  | ...                 |

## Answer-first paragraph drafts

For each H2, a draft opening paragraph the writer can adapt to COSMOS voice:

### How hot is the Sun? (~55K volume)
> The Sun's surface (photosphere) temperature is approximately 5,778 K (5,505 °C). The core temperature reaches about 15.7 million K, hot enough for hydrogen nuclei to fuse into helium.

### What color is the Sun? (~45K volume)
> The Sun emits light across all visible wavelengths and is technically white. It appears yellow or orange from Earth's surface because the atmosphere scatters shorter (blue) wavelengths.

[...continue for each H2...]

## Internal linking instructions

These links should be added to OTHER articles pointing TO this article:

| Source article | Suggested anchor text | Context |
|---------------|----------------------|---------|
| photosphere   | "how hot is the Sun"  | In the section about temperature measurement |
| stellar-evolution | "what type of star is the Sun" | When discussing main-sequence stars |
| astronomical-unit | "how far the Sun is from Earth" | In the definition section |
| hydrogen      | "what the Sun is made of" | When discussing stellar composition |
| ...           | ...                  | ...     |

## Dedicated sub-pages to create

| Keyword cluster | Volume | Recommended slug | Rationale |
|----------------|--------|------------------|-----------|
| What color is the Sun? | ~45K | sun-color | High volume, substantive topic (atmospheric scattering, stellar classification), brief mention in main Sun article |
| When will the Sun die? | ~22K | sun-death OR sun-lifecycle | High volume, connects to stellar evolution, red giant, planetary nebula articles |

## Schema markup

Add to the article's `<head>`:
- [ ] `FAQPage` schema with all question-H2s and their answer-first paragraphs
- [ ] `Article` schema with author (Swinburne Centre for Astrophysics), datePublished, dateModified
- [ ] `WebApplication` schema if interactive is embedded

## Meta description

Draft (155 chars max):
> "[Primary answer]. Learn about [topic] with Swinburne's interactive encyclopedia — featuring 3D visualizations and expert explanations."

## Priority ranking

1. **[Highest impact action]** — [volume] — [what to do]
2. **[Next action]** — [volume] — [what to do]
...

Each action ranked by: (keyword volume) × (current gap severity). A missing H2 for a 50K cluster outranks a weak paragraph for a 5K cluster.
```

---

## Part 4: Worked Example — Wikipedia Sun Page

*(Full analysis from 2026-03-30 session)*

### Competitor data (Semrush, March 2026, US database)

Wikipedia `en.wikipedia.org/wiki/Sun`:
- **11.3K** organic keywords
- **136.5K** monthly traffic
- **89%** informational intent

### Top keywords by traffic

| Keyword                       | Wiki Pos | Traffic | Volume |
|-------------------------------|----------|---------|--------|
| sun                           | 1        | 39.7K   | 301K   |
| the sun                       | 2        | 3.5K    | 135K   |
| how hot is the sun            | 3        | 1.8K    | 27.1K  |
| thesun                        | 2        | 1.6K    | 12.1K  |
| is the sun a star             | 1        | 1.3K    | 9.9K   |
| how far is the sun from earth | 1        | 1.2K    | 14.8K  |
| what color is the sun         | 4        | 1.2K    | 27.1K  |
| what type of star is the sun  | 1        | 1.1K    | 8.1K   |
| what is the sun made of       | 2        | 992     | 12.1K  |
| how old is the sun            | 2        | 962     | 14.8K  |
| distance from earth to sun    | 1        | 871     | 6.6K   |
| temperature of the sun        | 1        | 871     | 6.6K   |
| how big is the sun            | 1        | 811     | 9.9K   |
| how far is the sun            | 1        | 811     | 9.9K   |
| what colour is sunlight       | 5        | 633     | 18.1K  |
| what is the sun                | 2        | 541     | 6.6K   |
| how far away is the sun       | 2        | 526     | 8.1K   |
| is the sun white              | 3        | 526     | 8.1K   |
| how far the earth from sun    | 3        | 532     | 12.1K  |
| sun temperature               | 1        | 580     | 4.4K   |

### Keyword clusters

| Cluster         | Example queries                                     | Total Vol | Recommended H2                  |
|-----------------|-----------------------------------------------------|-----------|---------------------------------|
| Temperature     | how hot is the sun, sun temperature, temperature of the sun | ~55K | How hot is the Sun?            |
| Color           | what color is the sun, what colour is sunlight, is the sun white | ~45K | What color is the Sun? |
| Distance        | how far is the sun from earth, distance from earth to sun | ~35K | How far is the Sun from Earth? |
| Death/lifecycle | when will the sun explode, when will the sun die    | ~22K      | When will the Sun die?          |
| Composition     | what is the sun made of, sun composition             | ~20K      | What is the Sun made of?        |
| Age             | how old is the sun, age of the sun                   | ~20K      | How old is the Sun?             |
| Classification  | is the sun a star, what type of star is the sun      | ~18K      | Is the Sun a star?              |
| Size            | how big is the sun, size of the sun                  | ~15K      | How big is the Sun?             |

### What COSMOS can't compete on

- **"sun" (301K)** — Wikipedia owns #1, query is ambiguous/navigational
- **"thesun" (12.1K)** — navigational query for The Sun newspaper
- **"70 fahrenheit to celsius"** — irrelevant, Wikipedia ranks by accident

### Where COSMOS wins

- **Educational long-tail** — all "how/what/why" questions are COSMOS's bread and butter
- **"Interactive" + "simulation" queries** — Wikipedia has zero interactives
- **Featured snippets** — concise answer-first paragraphs beat Wikipedia's dense prose
- **Dwell time** — interactive Sun explorer keeps visitors engaged longer than a wall of text
