# SEMrush Keyword Extraction

Extract the top organic keywords for a given website from SEMrush, merge, deduplicate, and save.

## Arguments
- `$SITE` — the domain or subdomain to analyze (e.g. `science.nasa.gov`)
- `$SEARCH_TYPE` — `subdomain` (default), `domain`, or `subfolder`
- `$TOP_N` — how many keywords from each sort (default 100, i.e. 1 page; use 200 for 2 pages, etc.)

## SEMrush SPA navigation notes

**Critical**: SEMrush is a React SPA. These rules avoid getting stuck:
- Always use explicit `sortField=traffic` or `sortField=volume` in URLs (never rely on default/omission)
- After any navigation or sort change, **wait 10 seconds** before reading the table
- For pagination, use JS `.click()` on the Next button, then **wait 10 seconds**
- When switching sorts, open a **new tab** rather than re-navigating in the same tab (SPA caches state)
- Verify the page loaded correctly by checking first keyword before extracting

## Procedure

### 1. Extract by traffic (pages 1..N)

Open a new tab and navigate to:
```
https://www.semrush.com/analytics/organic/positions/?sortField=traffic&sortOrder=desc&db=us&q=$SITE&searchType=$SEARCH_TYPE
```

Wait 10s. Extract 100 rows. If $TOP_N > 100, click Next via JS:
```javascript
const buttons = document.querySelectorAll('button');
let nextBtn = null;
buttons.forEach(b => { if (b.textContent.trim() === 'Next') nextBtn = b; });
if (nextBtn) nextBtn.click();
```
Wait 10s, then extract again. Repeat for each additional page needed.

### 2. Extract by volume (pages 1..N)

Open a new tab and navigate to:
```
https://www.semrush.com/analytics/organic/positions/?sortField=volume&sortOrder=desc&db=us&q=$SITE&searchType=$SEARCH_TYPE
```

Same process: wait 10s, extract, click Next + wait 10s for each additional page.

### 3. JavaScript extraction template

Use this pattern to extract rows from the SEMrush table:
```javascript
const rows = document.querySelectorAll('[role="grid"] [role="row"]');
const lines = [];
rows.forEach((row) => {
  const cells = row.querySelectorAll('[role="gridcell"], [role="cell"]');
  if (cells.length >= 8) {
    const kw = cells[1]?.textContent.trim().replace(/\s+/g,' ').replace(/,/g,';');
    if (!kw) return;
    const pos = cells[3]?.textContent.trim().split(/\s/)[0] || '—';
    const tr = cells[5]?.textContent.trim();
    const vol = cells[7]?.textContent.trim();
    const kd = cells[8]?.textContent.trim();
    const urlCell = cells[9];
    const urlLink = urlCell?.querySelector('a');
    const url = (urlLink ? urlLink.textContent.trim() : urlCell?.textContent.trim()).replace(/,/g,';');
    lines.push(`${kw},${pos},${tr},${vol},${kd},${url}`);
  }
});
```

Store results in window variables, then read in chunks (slice 0-50, 50-100) to avoid output truncation.

### 4. Merge, deduplicate, sort

Combine all pages from both sorts, then:
1. **Deduplicate by keyword**: if the same keyword appears multiple times, keep only the entry with the highest traffic.
2. **Sort by volume descending**.

Use Python locally for this step (parse K/M suffixes to numeric values for comparison).

### 5. Scrub non-astronomy/astrophysics keywords

Remove any keyword that is not related to astronomy or astrophysics. Remove:
- Generic single words that are not astronomical terms (e.g. "what", "we", "images", "photos", "facts", "light", "black", "spirit", "ice", "science", "rover", "space")
- Climate/earth science keywords (e.g. "climate change", "co2", "greenhouse effect", "temperature", "oceanography", "water cycle", "carbon dioxide", "photosynthesis", "what is solar power", "what is global warming")
- Geography/biology/weather/news (e.g. "bahamas", "tundra", "lichen", "hurricane", "desert", "fires", "nebraska", "appalachian mountains", "aleutian islands", "richat structure", "science news")
- Junk/unrelated (e.g. "avatar", "ist time now", "jupiter ed", "ace", "aura", "phoenix", "2026 calendar", "2 minute timer", "utc", "force forces")

Keep:
- All solar system bodies (planets, moons, asteroids, comets)
- Space missions and telescopes (hubble, jwst, voyager, juno, perseverance, dragonfly, galileo)
- Astronomical phenomena (eclipse, aurora, northern lights, big bang, dark matter, black holes, nova, nebula)
- Astronomical concepts (stargazing, universe, stars, galaxy, astrophysics, electromagnetic spectrum)
- Space history (sally ride)
- Aurora/space weather keywords count as astronomy
- Tides count as astronomy (lunar influence)

### 6. Save to file

Save as `.planning/seo/semrush-{sanitized-site-name}.md` with this format:

```markdown
# SEMrush Organic Keywords: {site}

Source: {url}
Date: {today}
Database: US, Desktop
Merged from: top {N} by traffic + top {N} by volume, deduplicated (keep highest traffic per keyword), sorted by volume descending.
Post-processed: removed non-astronomy/astrophysics keywords.

{count} unique astronomy/astrophysics keywords.

| keyword | position | traffic | volume | KD | url |
|---------|----------|---------|--------|-----|-----|
| ... | ... | ... | ... | ... | ... |
```

### 7. Extract Top Pages

Navigate to:
```
https://www.semrush.com/analytics/toppages/?db=us&q=$SITE&searchType=$SEARCH_TYPE
```

Wait 10s. The table uses `[role="grid"]` with `[role="row"]` rows (skip row 0 = header).
Columns: 0=URL, 1=Traffic, 2=Traffic Diff, 3=(empty), 4=Traffic%, 5=Keywords, 6=Ads keywords, 7=Show.

Extract with:
```javascript
const grid = document.querySelector('[role="grid"]');
const rows = grid.querySelectorAll('[role="row"]');
const lines = [];
rows.forEach((r, i) => {
  if (i === 0) return;
  const cells = r.querySelectorAll('[role="gridcell"], [role="cell"]');
  if (cells.length >= 6) {
    const url = cells[0]?.textContent.trim().replace(/,/g,';');
    const traffic = cells[1]?.textContent.trim();
    const trafficPct = cells[4]?.textContent.trim();
    const keywords = cells[5]?.textContent.trim();
    if (url) lines.push(`${url},${traffic},${trafficPct},${keywords}`);
  }
});
```

For $TOP_N > 100, click Next via JS and wait 10s for each additional page.

### 8. Scrub and append Top Pages

Apply the same astronomy/astrophysics scrub to Top Pages by URL path. Remove pages about:
- Climate change (urls containing climate-change/, greenhouse, carbon-dioxide, global-temperature, carbon-cycle, ice-sheets, air-pollution)
- Earth science/biology/geography (urls containing kids/earth/mission-biomes/, earth-observatory/ for non-astro topics like hurricanes/volcanoes/mountains/fires/phytoplankton/permafrost, water-cycle, how-do-clouds-form)

Keep: earth/facts/ (comparative planetology), solar-system-temperatures, earth-atmosphere (spectroscopy context).

Append to the same output file as a new section:

```markdown

## Top Pages (sorted by traffic)

Source: https://www.semrush.com/analytics/toppages/?db=us&q={site}&searchType={searchType}
Date: {today}

{N} astronomy/astrophysics pages (scrubbed from {total} total).

| # | url | traffic | traffic % | keywords |
|---|-----|---------|-----------|----------|
| 1 | ... | ... | ... | ... |
```
