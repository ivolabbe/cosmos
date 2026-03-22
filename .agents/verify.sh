#!/bin/bash
# COSMOS Transfer Verification Script
# Run from the repository root after any transfer batch.
# Exit code 0 = all critical checks pass. Non-zero = failure.

set -e
cd "$(dirname "$0")/.."

FAIL=0
WARN=0

echo "=== COSMOS Transfer Verification ==="
echo ""

# 1. No references to old site (CRITICAL)
echo "1. Checking for astronomy.swin.edu.au references..."
count=$(grep -rc 'astronomy\.swin\.edu\.au' --include='*.html' . 2>/dev/null | grep -v ':0$' | wc -l | tr -d ' ')
if [ "$count" -ne 0 ]; then
  echo "   FAIL: $count files still reference astronomy.swin.edu.au"
  grep -rl 'astronomy\.swin\.edu\.au' --include='*.html' . | head -5
  FAIL=1
else
  echo "   OK"
fi

# 2. No absolute /cosmos/ paths (CRITICAL)
echo "2. Checking for /cosmos/ absolute paths..."
count=$(grep -rc '"/cosmos/' --include='*.html' . 2>/dev/null | grep -v ':0$' | wc -l | tr -d ' ')
if [ "$count" -ne 0 ]; then
  echo "   FAIL: $count files have /cosmos/ absolute paths"
  grep -rn '"/cosmos/' --include='*.html' . | head -5
  FAIL=1
else
  echo "   OK"
fi

# 3. No broken image references (CRITICAL)
echo "3. Checking for broken image references..."
broken_imgs=0
for f in articles/*.html; do
  grep -oh 'src="\.\./images/[^"]*"' "$f" 2>/dev/null | sed 's/src="\.\.\/images\///;s/"//' | while read img; do
    if [ ! -f "images/$img" ]; then
      echo "   MISSING: images/$img (referenced in $f)"
      broken_imgs=$((broken_imgs + 1))
    fi
  done
done
if [ "$broken_imgs" -eq 0 ]; then
  echo "   OK"
else
  echo "   FAIL: $broken_imgs broken image references"
  FAIL=1
fi

# 4. Index consistency (CRITICAL)
echo "4. Checking index consistency..."
python3 -c "
import json, glob
with open('articles/index.json') as f:
    index = {a['slug'] for a in json.load(f)}
files = {f.replace('articles/','').replace('.html','') for f in glob.glob('articles/*.html')}
missing_index = files - index
missing_files = index - files
ok = True
if missing_index:
    print(f'   FAIL: In articles/ but not in index.json: {missing_index}')
    ok = False
if missing_files:
    print(f'   FAIL: In index.json but no HTML file: {missing_files}')
    ok = False
if ok:
    print(f'   OK ({len(index)} articles indexed)')
exit(0 if ok else 1)
" || FAIL=1

# 5. Cross-link integrity (REPORT ONLY)
echo "5. Checking cross-link integrity..."
python3 -c "
import re, glob
existing = {f.split('/')[-1] for f in glob.glob('articles/*.html')}
broken = set()
for f in glob.glob('articles/*.html'):
    with open(f) as fh:
        for m in re.findall(r'href=\"([a-z][a-z0-9-]*\.html)\"', fh.read()):
            if m not in existing:
                broken.add(m)
if broken:
    print(f'   INFO: {len(broken)} cross-links to not-yet-transferred articles')
else:
    print(f'   OK: All cross-links resolve')
"

# 6. Transfer progress (REPORT ONLY)
echo "6. Transfer progress..."
transferred=$(ls articles/*.html 2>/dev/null | wc -l | tr -d ' ')
echo "   $transferred / 643 articles transferred"

echo ""
if [ "$FAIL" -ne 0 ]; then
  echo "=== VERIFICATION FAILED ==="
  exit 1
else
  echo "=== ALL CHECKS PASSED ==="
  exit 0
fi
