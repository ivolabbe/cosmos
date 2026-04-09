---
description: Fetch Google AI Overview summary + cited references for a topic using playwright-cli
---

Fetch the Google AI Overview for the given topic using playwright-cli. This extracts the AI-generated summary and its cited references from Google Search.

**Topic:** $ARGUMENTS

## Steps

1. Check if a playwright-cli browser is already open. If not, open one with a persistent profile (this preserves cookies and reduces CAPTCHAs):

```bash
playwright-cli open --browser=chrome --persistent "https://www.google.com/search?q=$ARGUMENTS"
```

If a browser is already open from a previous query, reuse it — just navigate:

```bash
playwright-cli goto "https://www.google.com/search?q=$ARGUMENTS"
```

2. Check the page URL. If it contains `/sorry/`, Google is showing a CAPTCHA. Run `playwright-cli show` so the user can solve it in the browser window. Wait for confirmation, then retry the navigation with `playwright-cli goto`.

3. Extract the AI Overview text and cited references:

```bash
playwright-cli eval "(function() { var all = document.querySelectorAll('div'); for (var i=0; i<all.length; i++) { var t = all[i].innerText; if (t && t.indexOf('AI Overview') === 0 && t.length > 200) { return t.substring(0, 4000); } } return 'No AI Overview for this query — try rephrasing with more specific terms'; })()"
```

4. **Do NOT close the browser** after extracting — leave it open for subsequent queries. Only close when fully done with all searches:

```bash
playwright-cli close
```

5. Present the results:
   - The AI Overview summary (if present)
   - The cited sources/references listed within it
   - Note: treat the AI Overview as **orientation only**, not a citable source — the cited references are the valuable part

## Avoiding CAPTCHAs

- **Always use `--persistent`** — saves cookies so Google recognises the browser across sessions
- **Keep the browser open** between queries — use `goto` instead of `close` + `open` for sequential searches
- **Don't rapid-fire searches** — if doing multiple queries, a brief pause between them helps
- **Stay logged in to Google** — a logged-in persistent profile gets far fewer CAPTCHAs
- CAPTCHAs mainly hit on first use of a fresh profile; once solved, subsequent searches in the same session are usually fine

## Tips for better results

- Add qualifying terms to the query (e.g. "physics", "astronomy", "definition") if the first query returns no AI Overview
- Not all queries generate an AI Overview — niche or ambiguous topics may not have one
- The AI Overview may contain errors — always verify facts against primary sources
