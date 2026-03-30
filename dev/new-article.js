#!/usr/bin/env node
// Create a new COSMOS article with all site features.
// Usage: node dev/new-article.js "Article Title" [--scrape] [--interactive]
//
// What it does:
//   1. Creates articles/<slug>.html from template
//   2. Adds entry to articles/index.json + js/cosmos-index.js
//   3. Optionally scrapes ADS research data (--scrape)
//   4. Optionally scaffolds an interactive page (--interactive)
//
// The generated article automatically gets (via JS injection):
//   - Top SAO "Study Astronomy Online" banner
//   - A-Z explorer with cross-linked articles
//   - Latest Research section (if ADS data exists)
//   - Bottom "Interested in astronomy?" CTA
//
// Example:
//   node dev/new-article.js "Neutron Star Merger" --scrape
//   node dev/new-article.js "Tidal Disruption Event" --scrape --interactive

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ── Parse args ──
const args = process.argv.slice(2);
const flags = args.filter(a => a.startsWith('--'));
const title = args.filter(a => !a.startsWith('--')).join(' ').trim();

if (!title) {
  console.error('Usage: node dev/new-article.js "Article Title" [--scrape] [--interactive]');
  process.exit(1);
}

const doScrape = flags.includes('--scrape');
const doInteractive = flags.includes('--interactive');

// ── Derive slug and letter ──
const slug = title.toLowerCase()
  .replace(/['']/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');
const letter = title[0].toUpperCase();

console.log(`Creating article: "${title}"`);
console.log(`  Slug: ${slug}`);
console.log(`  Letter: ${letter}`);

// ── Check if already exists ──
const articlePath = `articles/${slug}.html`;
if (fs.existsSync(articlePath)) {
  console.error(`Error: ${articlePath} already exists`);
  process.exit(1);
}

// ── 1. Create article from template ──
const template = fs.readFileSync('.agents/article-template.html', 'utf8');
const html = template
  .replace(/\{\{TITLE\}\}/g, title)
  .replace(/\{\{LETTER\}\}/g, letter)
  .replace(/\{\{BODY\}\}/g, `<p><!-- Article content goes here --></p>`);

fs.writeFileSync(articlePath, html);
console.log(`  Created ${articlePath}`);

// ── 2. Add to index.json ──
const indexPath = 'articles/index.json';
const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
const entry = { slug, title, letter };

// Insert in alphabetical order
const insertIdx = index.findIndex(a => a.title.localeCompare(title) > 0);
if (insertIdx === -1) {
  index.push(entry);
} else {
  index.splice(insertIdx, 0, entry);
}
fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
console.log(`  Added to ${indexPath} (${index.length} total)`);

// ── 3. Rebuild cosmos-index.js ──
const jsIndex = 'var COSMOS_INDEX = ' + JSON.stringify(index, null, 2) + ';';
fs.writeFileSync('js/cosmos-index.js', jsIndex);
console.log(`  Rebuilt js/cosmos-index.js`);

// ── 4. Scrape ADS (optional) ──
if (doScrape) {
  console.log(`  Scraping ADS for "${title}"...`);
  try {
    execSync(`node dev/scrape-ads.js "${slug}"`, { stdio: 'inherit' });
  } catch(e) {
    console.error('  ADS scrape failed (non-fatal)');
  }
}

// ── 5. Scaffold interactive (optional) ──
if (doInteractive) {
  const interactivePath = `articles/${slug}-interactive.html`;
  const interactiveHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title} Interactive | COSMOS</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #0a0a1a; overflow: hidden; font-family: 'Open Sans', sans-serif; }
  canvas { display: block; }
  #info { position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%);
    color: rgba(255,255,255,0.5); font-size: 11px; pointer-events: none; }
</style>
</head>
<body>
<div id="info">Scroll to zoom · Drag to rotate</div>
<script src="https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js"><\/script>
<script src="https://cdn.jsdelivr.net/npm/three@0.160.0/examples/js/controls/OrbitControls.js"><\/script>
<script>
// ${title} Interactive — COSMOS Encyclopedia
// TODO: Implement visualization
</script>
</body>
</html>`;

  fs.writeFileSync(interactivePath, interactiveHTML);
  console.log(`  Created ${interactivePath}`);

  // Add iframe embed to the article
  const articleHTML = fs.readFileSync(articlePath, 'utf8');
  const embed = `<div style="width:100%;max-width:800px;height:500px;border-radius:6px;overflow:hidden;margin:24px auto;box-shadow:0 4px 20px rgba(0,0,0,0.2);">
<iframe src="${slug}-interactive.html" style="width:100%;height:100%;border:none;" loading="lazy"></iframe>
</div>
<p style="text-align:center;font-size:0.8rem;color:#808285;">Interactive ${title} visualization. Drag to rotate, scroll to zoom. <a href="${slug}-interactive.html" target="_blank">Open fullscreen</a>.</p>

`;
  const updated = articleHTML.replace(
    '<p><!-- Article content goes here --></p>',
    embed + '<p><!-- Article content goes here --></p>'
  );
  fs.writeFileSync(articlePath, updated);
  console.log(`  Embedded interactive iframe in article`);
}

console.log(`\nDone! Next steps:`);
console.log(`  1. Edit ${articlePath} — add article content`);
if (doInteractive) console.log(`  2. Edit articles/${slug}-interactive.html — build visualization`);
console.log(`  ${doInteractive ? '3' : '2'}. Verify at http://localhost:8000/${articlePath}`);
