# COSMOS Website Transfer Guide

Transfer articles from the old Drupal site at `https://astronomy.swin.edu.au/cosmos/` to this static Swinburne-styled site.

**Repository:** `ivolabbe/cosmos`
**Live site:** `https://ivolabbe.github.io/cosmos/`

## Principles

- **No content changes.** Text, images, and structure from the old site are preserved exactly.
- **Only style and internal structure change.** Swinburne house style, local file paths, slug-based URLs.
- **All resources local.** Zero references to `astronomy.swin.edu.au` in final output. Images, icons, TeX PNGs — all downloaded to `images/`.
- **Idempotent.** Running the transfer again for already-transferred articles produces the same result.

---

## Step 1: Inventory — Discover Articles to Transfer

For a given letter (e.g., `C`), scrape the letter index page to get all article URLs:

```bash
curl -sL "https://astronomy.swin.edu.au/cosmos/C" \
  | grep -o 'href="https://astronomy.swin.edu.au/cosmos/C/[^"]*"' \
  | sort -u
```

Each URL has the form `https://astronomy.swin.edu.au/cosmos/LETTER/Title+With+Spaces`.

Skip articles already in `articles/index.json` (by matching slug).

## Step 2: Fetch Article Content

For each article URL, fetch the page and extract:

**Title:** The `<h2>` tag that appears just before the node div (e.g., `<h2>Astronomy</h2>`).

**Body:** Content between `<div class="field-item even" property="content:encoded">` and the `<br style="clear:both;" />` that ends the content. This is the raw article HTML including images, links, tables, and inline styles.

**Important:** The closing pattern is `</div></div></div>  </div>` — three nested field divs plus the content clearfix.

## Step 3: URL-to-Slug Convention

Convert old URL paths to local filenames:

| Old URL path | Slug | Filename |
|---|---|---|
| `A/Astronomy` | `astronomy` | `astronomy.html` |
| `S/Shooting+Star` | `shooting-star` | `shooting-star.html` |
| `H/Hertzsprung-Russell+Diagram` | `hertzsprung-russell-diagram` | `hertzsprung-russell-diagram.html` |
| `S/SI+Units` | `si-units` | `si-units.html` |

Rules:
1. Take the title part after the letter prefix (after the `/`)
2. Replace `+` with `-`
3. Lowercase everything
4. Collapse multiple dashes: `--` → `-`
5. Strip leading/trailing dashes

## Step 4: Download Images and Resources

Scan the extracted body HTML for resources from `astronomy.swin.edu.au`. Patterns:

| Pattern | Example | Local path |
|---|---|---|
| `/cms/cpg15x/albums/userpics/FILE` | `dustgrain1a.jpg` | `images/dustgrain1a.jpg` |
| `/cms/cpg15x/albums/scaled_cache/FILE` | `m14a01_17-628x300.jpg` | `images/m14a01_17-628x300.jpg` |
| `/cosmos/files/tex/HASH.png` | TeX-rendered math | `images/tex-DESCRIPTIVE.png` |

For TeX images, give them descriptive names based on the `alt` attribute (e.g., `alt="$ \hbar $"` → `tex-hbar.png`).

Download each to `images/` using the basename. **Skip if already downloaded** (file exists with non-zero size). Check for filename collisions — prefix with a short hash if needed.

**WARNING: Filenames with `+` characters.** Some CMS filenames contain `+` (e.g., `galacticjets5+0.jpg`). Naive basename extraction splits at the `+`, producing broken names like `0.jpg`. Always use the FULL original filename, replacing `+` with `-` for the local copy.

## Step 5: Transform Content

Apply these transformations to the extracted body HTML:

### 5a. Image paths → local

```
src="/cms/cpg15x/albums/..."                       → src="../images/BASENAME"
src="https://astronomy.swin.edu.au/cms/..."        → src="../images/BASENAME"
src="/cosmos/files/tex/HASH.png"                    → src="../images/tex-DESCRIPTIVE.png"
```

### 5b. Cross-reference links → local slugs

```
href="https://astronomy.swin.edu.au/cosmos/X/Title" → href="slug.html"
href="/cosmos/cosmos/X/title"                        → href="slug.html"
```

This applies even for articles not yet transferred. The `.html` files will exist once transfer is complete.

### 5c. Old SAO links → new Swinburne URL

```
http(s)://astronomy.swin.edu.au/sao... →
https://www.swinburne.edu.au/research/centres-groups-clinics/centre-for-astrophysics-supercomputing/our-study-options/swinburne-astronomy-online/
```

### 5d. Swinburne staff/department credit links → new domain

Credit links to Swinburne staff or departments on the old domain must also be rewritten:
```
http://astronomy.swin.edu.au/staff/...    → https://www.swinburne.edu.au/research/centres-groups-clinics/centre-for-astrophysics-supercomputing/
http://astronomy.swin.edu.au/cosmology/   → (same CAS URL)
http://www.astronomy.swin.edu.au/         → (same CAS URL)
```

### 5e. Keep external credit links

Links to NASA, Hubble, AAO, NOAO, JPL etc. are legitimate credit links — leave them as-is.

## Step 6: Wrap in Article Template

Each article gets a full HTML page using the template in `.agents/article-template.html`.

Placeholders: `{TITLE}`, `{LETTER}`, `{BODY}`.

All site resources use `../` relative paths from `articles/`.

## Step 7: Update Index

After transferring articles:

1. **Read** existing `articles/index.json`
2. **Append** new entries: `{"slug": "nebula", "title": "Nebula", "letter": "N"}`
3. **Sort** by title
4. **Write** back to `articles/index.json`
5. **Regenerate** `js/cosmos-index.js`:

```python
import json
with open('articles/index.json') as f:
    articles = json.load(f)
with open('js/cosmos-index.js', 'w') as f:
    f.write('var COSMOS_INDEX = ' + json.dumps(articles, indent=2) + ';')
```

## Step 8: Verification

Run these checks after every transfer batch. See `.agents/verify.sh` for the full script.

| Check | Command | Must pass? |
|---|---|---|
| No old-site refs | `grep -r 'astronomy\.swin\.edu\.au' --include='*.html' .` | Yes — zero matches |
| No `/cosmos/` paths | `grep -r '"/cosmos/' --include='*.html' .` | Yes — zero matches |
| No broken images | Check every `src` in articles resolves to a file in `images/` | Yes |
| Index consistency | Every `.html` in `articles/` has a matching `index.json` entry | Yes |
| Cross-link integrity | Count links to not-yet-transferred articles | Report only |
| Live site check | `curl` deployed site, grep for old domain | Yes (after push) |

---

## Old Site Reference

- **CMS:** Drupal 7
- **Total articles:** 643
- **Article counts by letter:** A:55 B:27 C:59 D:30 E:27 F:19 G:41 H:32 I:19 J:5 K:8 L:25 M:36 N:16 O:10 P:46 Q:2 R:25 S:83 T:28 U:5 V:14 W:15 X:7 Y:1 Z:8
- **Status:** All 644 articles transferred including About page (March 2026)

## Lessons Learned

These issues were encountered during the bulk transfer and should be pre-empted in any re-transfer:

1. **Image filenames with `+`:** CMS filenames like `galacticjets5+0.jpg` get split at `+` during basename extraction, producing `0.jpg`. Fix: use FULL basename, replace `+` with `-`.
2. **Swinburne staff credit links:** Some articles have `http://astronomy.swin.edu.au/staff/...` or `/cosmology/` credit links — not article links but still old domain. Fix: rewrite ALL `astronomy.swin.edu.au` URLs to new CAS URL.
3. **`/cosmos/cosmos/` double-path links:** Internal Drupal links use double prefix. Fix: regex for both `https://astronomy.swin.edu.au/cosmos/X/Title` AND `/cosmos/cosmos/X/title`.
4. **Non-article `/cosmos/` paths:** Links like `/cosmos/cosmos/-/-About` or `/cosmos/S/S0+galaxy` don't follow standard convention. Fix: convert to slug anyway, flag as warnings.
5. **Agent load balancing:** Letter S has 83 articles (3x average). Assign biggest letters to dedicated agents, batch smaller ones together.
6. **Post-transfer fixup pass is essential:** Even with good transform rules, a verify + fixup pass catches edge cases agents miss (filename collisions, unusual URL patterns).
7. **Special pages outside A-Z:** The About page (`/cosmos/-/-About`) has no letter category. Naive slug produces `-about.html` (leading dash). Fix: transfer manually as `about.html`, use a modified breadcrumb (no letter link), and grep-fix any references to the broken slug (`-about.html` → `about.html`).
