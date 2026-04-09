---
description: Fetch Google AI Overview summary + cited references for a topic using playwright-cli
---

Fetch the Google AI Overview for the given topic using playwright-cli. This extracts the AI-generated summary and its cited references from Google Search.

**Topic:** $ARGUMENTS

## Steps

1. Open a browser and navigate to the Google search page:

```bash
playwright-cli open --browser=chrome --persistent "https://www.google.com/search?q=$ARGUMENTS"
```

2. If Google shows a CAPTCHA/sorry page (check if the page URL contains `/sorry/`), run `playwright-cli show` so the user can solve it, then wait for confirmation and retry the navigation.

3. Extract the AI Overview text and cited references:

```bash
playwright-cli eval "(function() { var all = document.querySelectorAll('div'); for (var i=0; i<all.length; i++) { var t = all[i].innerText; if (t && t.indexOf('AI Overview') === 0 && t.length > 200) { return t.substring(0, 4000); } } return 'No AI Overview for this query — try rephrasing with more specific terms'; })()"
```

4. Close the browser:

```bash
playwright-cli close
```

5. Present the results:
   - The AI Overview summary (if present)
   - The cited sources/references listed within it
   - Note: treat the AI Overview as **orientation only**, not a citable source — the cited references are the valuable part

**Tips for better results:**
- Add qualifying terms to the query (e.g. "physics", "astronomy", "definition") if the first query returns no AI Overview
- Not all queries generate an AI Overview — niche or ambiguous topics may not have one
- The AI Overview may contain errors — always verify facts against primary sources
