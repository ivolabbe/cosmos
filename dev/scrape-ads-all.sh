#!/bin/bash
# Scrape ADS for all COSMOS articles in parallel.
# Each instance writes to its own temp file, then merge.
# Usage: bash dev/scrape-ads-all.sh [concurrency]
set -e
cd "$(dirname "$0")/.."

CONCURRENCY=${1:-8}
TMPDIR=$(mktemp -d /tmp/ads-scrape-XXXX)

node -e "JSON.parse(require('fs').readFileSync('articles/index.json','utf8')).forEach(a=>console.log(a.slug))" > "$TMPDIR/slugs.txt"
TOTAL=$(wc -l < "$TMPDIR/slugs.txt" | tr -d ' ')

echo "Scraping ADS for $TOTAL articles ($CONCURRENCY parallel)"
echo "Temp: $TMPDIR"

cat "$TMPDIR/slugs.txt" | xargs -P "$CONCURRENCY" -I {} node dev/scrape-ads.js {} "$TMPDIR"

# Merge individual files into one JSON
node -e "
  const fs = require('fs'), path = require('path');
  const dir = '$TMPDIR';
  const result = {};
  fs.readdirSync(dir).filter(f=>f.endsWith('.json')).forEach(f => {
    try { result[f.replace('.json','')] = JSON.parse(fs.readFileSync(path.join(dir,f),'utf8')); } catch(e){}
  });
  const sorted = {};
  Object.keys(result).sort().forEach(k => sorted[k] = result[k]);
  fs.writeFileSync('dev/ads-research.json', JSON.stringify(sorted, null, 2));
  console.log('Merged ' + Object.keys(sorted).length + '/$TOTAL into dev/ads-research.json');
"

rm -rf "$TMPDIR"
echo "Done."
