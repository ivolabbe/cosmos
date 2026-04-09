---
name: cos-wiki-targets
description: Fetch Wikipedia WikiProject Astronomy article ratings and popular pages, merge and filter for COSMOS encyclopedia targets
---

# Wikipedia Astronomy Target List Builder

Fetch, merge, and filter Wikipedia's WikiProject Astronomy article ratings and popular pages to produce a prioritised target list for the COSMOS encyclopedia.

## Data sources

1. **Article Ratings** — via Wikipedia API category queries
   - Base URL: `https://en.wikipedia.org/w/api.php`
   - Action: `query`, list: `categorymembers`, limit: 500
   - Category naming: `Category:{Quality}-Class_Astronomy_articles_of_{Importance}-importance`

2. **Popular Pages** — via WebFetch
   - URL: `https://en.wikipedia.org/wiki/Wikipedia:WikiProject_Astronomy/Popular_pages`
   - Extract: rank, title, quality, importance, monthly views

## Selection criteria

Fetch articles matching EITHER:
- **(GA or better quality) AND (Top, High, or Mid importance)** — quality classes: FA, FL, GA
- **(Top or High importance) AND (any quality)** — quality classes: FA, FL, GA, B, C, Start, Stub

Quality×Importance combinations to query via API:

```
GA+ quality, Top/High/Mid:
  FA-Class: Top, High, Mid
  FL-Class: Top, High, Mid  
  GA-Class: Top, High, Mid

All quality, Top/High only:
  B-Class: Top, High
  C-Class: Top, High
  Start-Class: Top, High
  Stub-Class: Top, High
```

## Exclusion filters

Remove entries that do not belong in a general astronomy encyclopedia:

### Categories to remove
- **Films/TV/media** — TV series, films, novels, video games
- **Non-astronomy topics** — software (Google Earth), idioms, pseudoscience, cultural/religious practices, meteorology
- **Date-specific events** — individual dated eclipses (e.g. "Solar eclipse of February 17, 2026")
- **Organisations/memorabilia** — societies, commemorative items
- **Wikipedia list articles** — "List of..." entries, award articles
- **Mythology/fiction** — mythology entries, fictional planets, books about astronomy

### People filter
Remove ALL individual biographies EXCEPT these exemptions:
- Stephen Hawking
- Albert Einstein
- Isaac Newton
- Leonardo da Vinci
- Vera Rubin
- Henrietta Swan Leavitt
- Caroline Herschel (manually added — not in Wikipedia rated lists)

## Output files

Write three files to `.planning/seo/`:

1. **`wiki-astronomy-rated-articles.md`** — rated articles only, sorted by importance then quality
2. **`wiki-astronomy-popular-pages.md`** — top 250 popular pages with monthly views
3. **`wiki-astronomy-merged.md`** — unified deduplicated list, sorted by views descending

All files use this table format:
```
| # | Article | Quality | Importance | Views/mo | URL |
```

## Execution steps

1. Query Wikipedia API for each quality×importance category combination (parallel where possible)
2. WebFetch the Popular Pages wiki page, extract full table
3. Cross-reference: attach view counts from popular pages to rated articles
4. Apply exclusion filters (categories + people - exemptions)
5. Merge rated + popular, deduplicate by title
6. Add Caroline Herschel as manual entry
7. Sort merged list by views descending (no-views entries alphabetical at end)
8. Write all three output files
9. Print summary: total articles, by quality, by importance, with/without views

## API query template

```bash
curl -s "https://en.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:${QUALITY}-Class_Astronomy_articles_of_${IMPORTANCE}-importance&cmlimit=500&cmtype=page&format=json"
```

Response contains Talk: namespace pages — strip "Talk:" prefix to get article titles.
