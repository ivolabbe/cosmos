#!/usr/bin/env python3
"""Fetch COSMOS articles for letters I, N, V, W, O and write to articles/."""

import json
import os
import re
import subprocess
import sys
from pathlib import Path
from urllib.parse import unquote

BASE_DIR = Path("/Users/ivo/Documents/Astro/SWIN/SAO/cosmos")
MANIFEST = BASE_DIR / ".transfer" / "manifest.json"
TEMPLATE = BASE_DIR / ".agents" / "article-template.html"
ARTICLES_DIR = BASE_DIR / "articles"
IMAGES_DIR = BASE_DIR / "images"
LETTERS = {"I", "N", "V", "W", "O"}

SAO_REPLACEMENT = (
    "https://www.swinburne.edu.au/research/centres-groups-clinics/"
    "centre-for-astrophysics-supercomputing/our-study-options/"
    "swinburne-astronomy-online/"
)


def fetch_url(url: str) -> str:
    """Fetch URL content using curl."""
    result = subprocess.run(
        ["curl", "-sL", url], capture_output=True, text=True, timeout=30
    )
    return result.stdout


def download_image(url: str, filename: str) -> bool:
    """Download image to images/ dir if it doesn't already exist."""
    dest = IMAGES_DIR / filename
    if dest.exists():
        return True
    # Make URL absolute if needed
    if url.startswith("/"):
        url = "https://astronomy.swin.edu.au" + url
    result = subprocess.run(
        ["curl", "-sL", "-o", str(dest), url], capture_output=True, timeout=30
    )
    return result.returncode == 0


def extract_title(html: str) -> str:
    """Extract title from <h2> tag before node div."""
    # Pattern: <h2>Title</h2> followed by <div id="node-
    m = re.search(r'<h2>([^<]+)</h2>\s*<div id="node-', html)
    if m:
        return m.group(1).strip()
    return ""


def extract_body(html: str) -> str:
    """Extract article body content."""
    # Start marker
    start_marker = '<div class="field-item even" property="content:encoded">'
    start_idx = html.find(start_marker)
    if start_idx == -1:
        return ""
    start_idx += len(start_marker)

    # End marker: try </div></div></div>  </div> first
    # The body ends before the closing divs of the field structure
    # Look for <br style="clear:both;" /> as the end of content
    end_marker = '<br style="clear:both;" />'
    end_idx = html.find(end_marker, start_idx)
    if end_idx != -1:
        body = html[start_idx:end_idx + len(end_marker)]
    else:
        # Fallback: find the closing </div></div></div>  </div>
        end_marker2 = '</div></div></div>  </div>'
        end_idx = html.find(end_marker2, start_idx)
        if end_idx != -1:
            body = html[start_idx:end_idx]
        else:
            return ""

    return body.strip()


def cosmos_link_to_slug(href: str) -> str:
    """Convert a COSMOS link like /cosmos/X/Title+Name to slug.html."""
    # Extract the title part (last segment)
    # Handle both https://astronomy.swin.edu.au/cosmos/X/Title and /cosmos/X/Title
    # Also handle double /cosmos/cosmos/X/Title
    m = re.search(r'/cosmos/[A-Z*]/(.+?)(?:#.*)?$', href)
    if not m:
        return href
    title_part = m.group(1)
    # URL decode
    title_part = unquote(title_part)
    # + becomes -, lowercase
    slug = title_part.replace("+", "-").replace(" ", "-").lower()
    # Handle percent-encoded characters that might remain
    slug = unquote(slug)
    return slug + ".html"


def transform_body(body: str, manifest_lookup: dict) -> str:
    """Transform body content: fix images, links, etc."""
    result = body

    # 1. Download and replace /cosmos/files/tex/HASH.png images
    tex_pattern = re.compile(r'(?:src=["\'])(/cosmos/files/tex/([a-f0-9]+)\.png)(["\'])')
    for m in tex_pattern.finditer(body):
        old_path = m.group(1)
        hash_val = m.group(2)
        new_filename = f"tex-{hash_val}.png"
        download_image(old_path, new_filename)
        result = result.replace(old_path, f"../images/{new_filename}")

    # 2. Download and replace CMS images
    # Pattern: src="https://astronomy.swin.edu.au/cms/..." or src="/cms/..."
    cms_pattern = re.compile(
        r'((?:https?://astronomy\.swin\.edu\.au)?/cms/[^"\'>\s]+)'
    )
    for m in cms_pattern.finditer(result):
        old_url = m.group(1)
        basename = os.path.basename(old_url.split("?")[0])
        if basename:
            full_url = old_url
            if old_url.startswith("/cms/"):
                full_url = "https://astronomy.swin.edu.au" + old_url
            download_image(full_url, basename)
            result = result.replace(old_url, f"../images/{basename}")

    # 3. Replace COSMOS article links
    # Full URL: https://astronomy.swin.edu.au/cosmos/X/Title
    cosmos_full = re.compile(
        r'(href=["\'])https?://astronomy\.swin\.edu\.au/cosmos/[A-Z*]/([^"\'#]+)((?:#[^"\']*)?["\'])'
    )
    def replace_full_link(m):
        prefix = m.group(1)
        title_part = m.group(2)
        suffix = m.group(3)
        slug = unquote(title_part).replace("+", "-").replace(" ", "-").lower()
        return f"{prefix}{slug}.html{suffix}"
    result = cosmos_full.sub(replace_full_link, result)

    # Relative: /cosmos/cosmos/X/title or /cosmos/X/title
    cosmos_rel = re.compile(
        r'(href=["\'])(?:/cosmos)?/cosmos/[A-Z*]/([^"\'#]+)((?:#[^"\']*)?["\'])'
    )
    result = cosmos_rel.sub(replace_full_link, result)

    # 4. Replace SAO links
    result = re.sub(
        r'https?://astronomy\.swin\.edu\.au/sao\b',
        SAO_REPLACEMENT,
        result
    )

    return result


def main():
    # Load manifest
    with open(MANIFEST) as f:
        manifest = json.load(f)

    # Load template
    with open(TEMPLATE) as f:
        template = f.read()

    # Build lookup of all articles for cross-referencing
    manifest_lookup = {}
    for entry in manifest:
        manifest_lookup[entry["slug"]] = entry

    # Filter to our target letters, untransferred only
    entries = [
        e for e in manifest
        if e["letter"] in LETTERS and not e["transferred"]
    ]

    total = len(entries)
    transferred = 0
    failures = []

    print(f"Starting transfer of {total} articles for letters {sorted(LETTERS)}")
    print()

    for i, entry in enumerate(entries, 1):
        url = entry["url"]
        slug = entry["slug"]
        letter = entry["letter"]
        title = entry["title"]

        try:
            # Fetch the page
            html = fetch_url(url)
            if not html:
                failures.append((slug, "Empty response"))
                print(f"FAILED: {slug} ({i}/{total}) - Empty response")
                continue

            # Extract title from page (use manifest title as fallback)
            page_title = extract_title(html)
            if page_title:
                title = page_title

            # Extract body
            body = extract_body(html)
            if not body:
                failures.append((slug, "Could not extract body"))
                print(f"FAILED: {slug} ({i}/{total}) - Could not extract body")
                continue

            # Transform body
            body = transform_body(body, manifest_lookup)

            # Fill template
            article_html = template.replace("{TITLE}", title)
            article_html = article_html.replace("{LETTER}", letter)
            article_html = article_html.replace("{BODY}", body)

            # Write article
            output_path = ARTICLES_DIR / f"{slug}.html"
            with open(output_path, "w") as f:
                f.write(article_html)

            # Mark as transferred in manifest
            entry["transferred"] = True
            transferred += 1
            print(f"Transferred: {slug} ({i}/{total})")

        except Exception as e:
            failures.append((slug, str(e)))
            print(f"FAILED: {slug} ({i}/{total}) - {e}")

    # Save updated manifest
    with open(MANIFEST, "w") as f:
        json.dump(manifest, f, indent=2)
        f.write("\n")

    # Summary
    print()
    print(f"=== Transfer Summary ===")
    print(f"Total articles: {total}")
    print(f"Transferred: {transferred}")
    print(f"Failures: {len(failures)}")
    if failures:
        print(f"\nFailed articles:")
        for slug, reason in failures:
            print(f"  - {slug}: {reason}")


if __name__ == "__main__":
    main()
