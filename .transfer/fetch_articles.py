#!/usr/bin/env python3
"""Fetch and transform COSMOS encyclopedia articles for letters B, R, L, F."""

import json
import os
import re
import subprocess
import sys
import urllib.parse
from pathlib import Path

BASE_DIR = Path("/Users/ivo/Documents/Astro/SWIN/SAO/cosmos")
MANIFEST_PATH = BASE_DIR / ".transfer" / "manifest.json"
TEMPLATE_PATH = BASE_DIR / ".agents" / "article-template.html"
ARTICLES_DIR = BASE_DIR / "articles"
IMAGES_DIR = BASE_DIR / "images"

LETTERS = {"B", "R", "L", "F"}

SAO_REPLACEMENT = (
    "https://www.swinburne.edu.au/research/centres-groups-clinics/"
    "centre-for-astrophysics-supercomputing/our-study-options/"
    "swinburne-astronomy-online/"
)


def fetch_url(url: str) -> str:
    """Fetch a URL using curl and return the content."""
    result = subprocess.run(
        ["curl", "-sL", url],
        capture_output=True, text=True, timeout=30
    )
    return result.stdout


def download_image(url: str, dest: Path) -> bool:
    """Download an image if it doesn't already exist."""
    if dest.exists():
        return True
    try:
        result = subprocess.run(
            ["curl", "-sL", "-o", str(dest), url],
            capture_output=True, timeout=30
        )
        return result.returncode == 0 and dest.exists() and dest.stat().st_size > 0
    except Exception as e:
        print(f"  WARNING: Failed to download {url}: {e}", file=sys.stderr)
        return False


def extract_title(html: str) -> str:
    """Extract the title from the <h2> tag before <div id='node-'."""
    # Look for <h2> ... </h2> that appears before <div id="node-
    match = re.search(r'<h2[^>]*>(.*?)</h2>\s*<div\s+id="node-', html, re.DOTALL)
    if match:
        title = match.group(1).strip()
        # Remove any HTML tags from the title
        title = re.sub(r'<[^>]+>', '', title)
        return title.strip()
    return ""


def extract_body(html: str) -> str:
    """Extract the body content from the article."""
    # Find the start marker
    start_marker = '<div class="field-item even" property="content:encoded">'
    start_idx = html.find(start_marker)
    if start_idx == -1:
        return ""
    start_idx += len(start_marker)

    # Find the end marker - try multiple patterns
    remaining = html[start_idx:]

    # Try: </div></div></div>  </div>
    end_match = re.search(r'</div>\s*</div>\s*</div>\s*</div>', remaining)
    # Also try: <br style="clear:both;" />
    br_match = re.search(r'<br\s+style="clear:both;"\s*/>', remaining)

    if br_match and end_match:
        # Use whichever comes first
        end_idx = min(br_match.start(), end_match.start())
    elif br_match:
        end_idx = br_match.start()
    elif end_match:
        end_idx = end_match.start()
    else:
        return ""

    body = remaining[:end_idx].strip()
    return body


def cosmos_link_to_slug(title_part: str) -> str:
    """Convert a COSMOS link title to a slug filename."""
    # Decode URL encoding
    title_part = urllib.parse.unquote(title_part)
    # Replace + with -
    slug = title_part.replace("+", "-").replace(" ", "-").lower()
    # Clean up any double hyphens
    slug = re.sub(r'-+', '-', slug)
    return slug + ".html"


def transform_body(body: str) -> str:
    """Transform the body content: fix image URLs, internal links, SAO links."""
    result = body

    # 1. Download and replace /cosmos/files/tex/HASH.png images
    tex_pattern = re.compile(r'(?:https?://astronomy\.swin\.edu\.au)?/cosmos/files/tex/([a-f0-9]+\.png)')
    for match in tex_pattern.finditer(body):
        hash_name = match.group(1)
        img_url = f"https://astronomy.swin.edu.au/cosmos/files/tex/{hash_name}"
        dest = IMAGES_DIR / f"tex-{hash_name}"
        download_image(img_url, dest)
        result = result.replace(match.group(0), f"../images/tex-{hash_name}")

    # 2. Download and replace astronomy.swin.edu.au/cms/ images
    cms_pattern = re.compile(r'(?:https?://astronomy\.swin\.edu\.au)?/cms/cpg15x/albums/[^"\'>\s]+')
    for match in cms_pattern.finditer(body):
        img_url_path = match.group(0)
        if img_url_path.startswith("/cms/"):
            full_url = f"https://astronomy.swin.edu.au{img_url_path}"
        else:
            full_url = img_url_path
        basename = os.path.basename(urllib.parse.urlparse(full_url).path)
        dest = IMAGES_DIR / basename
        download_image(full_url, dest)
        result = result.replace(match.group(0), f"../images/{basename}")

    # 3. Replace COSMOS internal links: https://astronomy.swin.edu.au/cosmos/X/Title
    cosmos_abs_pattern = re.compile(
        r'https?://astronomy\.swin\.edu\.au/cosmos/[A-Z~]/([^"\'<>\s]+)'
    )
    for match in cosmos_abs_pattern.finditer(result):
        title_part = match.group(1)
        slug_file = cosmos_link_to_slug(title_part)
        result = result.replace(match.group(0), slug_file)

    # 4. Replace /cosmos/cosmos/X/title (relative links with doubled path)
    cosmos_rel_double_pattern = re.compile(
        r'/cosmos/cosmos/[A-Z~]/([^"\'<>\s]+)'
    )
    for match in cosmos_rel_double_pattern.finditer(result):
        title_part = match.group(1)
        slug_file = cosmos_link_to_slug(title_part)
        result = result.replace(match.group(0), slug_file)

    # 5. Replace /cosmos/X/Title (relative links)
    cosmos_rel_pattern = re.compile(
        r'(?<!")(?<!=)/cosmos/[A-Z~]/([^"\'<>\s]+)'
    )
    for match in cosmos_rel_pattern.finditer(result):
        title_part = match.group(1)
        slug_file = cosmos_link_to_slug(title_part)
        result = result.replace(match.group(0), slug_file)

    # 6. Replace SAO links
    result = re.sub(
        r'https?://astronomy\.swin\.edu\.au/sao/?',
        SAO_REPLACEMENT,
        result
    )

    return result


def main():
    # Load manifest
    with open(MANIFEST_PATH) as f:
        manifest = json.load(f)

    # Load template
    with open(TEMPLATE_PATH) as f:
        template = f.read()

    # Filter to our letters, not yet transferred
    entries = [e for e in manifest if e["letter"] in LETTERS and not e["transferred"]]
    total = len(entries)
    print(f"Processing {total} articles for letters {', '.join(sorted(LETTERS))}")

    transferred = 0
    failures = []

    for i, entry in enumerate(entries, 1):
        url = entry["url"]
        slug = entry["slug"]
        letter = entry["letter"]
        manifest_title = entry["title"]

        try:
            # Fetch the page
            html = fetch_url(url)
            if not html or len(html) < 200:
                failures.append((slug, "Empty or too-short response"))
                print(f"FAILED:      {slug} ({i}/{total}) - empty response")
                continue

            # Extract title
            title = extract_title(html)
            if not title:
                title = manifest_title  # fallback to manifest title

            # Extract body
            body = extract_body(html)
            if not body:
                failures.append((slug, "Could not extract body"))
                print(f"FAILED:      {slug} ({i}/{total}) - no body extracted")
                continue

            # Transform body (downloads images, fixes links)
            body = transform_body(body)

            # Fill template
            page = template.replace("{TITLE}", title)
            page = page.replace("{LETTER}", letter)
            page = page.replace("{BODY}", body)

            # Write article
            out_path = ARTICLES_DIR / f"{slug}.html"
            with open(out_path, "w", encoding="utf-8") as f:
                f.write(page)

            # Mark as transferred in manifest
            entry["transferred"] = True
            transferred += 1
            print(f"Transferred: {slug} ({i}/{total})")

        except Exception as e:
            failures.append((slug, str(e)))
            print(f"FAILED:      {slug} ({i}/{total}) - {e}")

    # Save updated manifest
    with open(MANIFEST_PATH, "w") as f:
        json.dump(manifest, f, indent=2)
        f.write("\n")

    # Summary
    print(f"\n{'='*60}")
    print(f"Transfer complete: {transferred}/{total} articles transferred")
    if failures:
        print(f"Failures ({len(failures)}):")
        for slug, reason in failures:
            print(f"  - {slug}: {reason}")
    else:
        print("No failures!")


if __name__ == "__main__":
    main()
