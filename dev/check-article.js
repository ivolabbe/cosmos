#!/usr/bin/env node
// Pre-flight check for a written article. Catches mechanical issues before
// dispatching the (expensive) verifier agent.
//
// Usage: node dev/check-article.js articles/<slug>.html
//
// Checks:
//   1. Article file exists and has content in article__body
//   2. No contractions (don't, isn't, can't, won't, it's, doesn't, etc.)
//   3. No "data is/shows/was/has" (data must be plural)
//   4. Word count in reasonable range (50–1200)
//   5. Image file referenced in article exists and is valid
//   6. Cross-links present (lexicon-term anchors added by cross-link script)
//   7. No placeholder content (<!-- Article content goes here -->)
//
// Exits 0 if all pass, 1 if any fail.

const fs = require('fs');
const { execSync } = require('child_process');

const filePath = process.argv[2];
if (!filePath) {
  console.error('Usage: node dev/check-article.js articles/<slug>.html');
  process.exit(1);
}

let failures = 0;

function fail(msg) {
  console.error(`  FAIL: ${msg}`);
  failures++;
}

function warn(msg) {
  console.log(`  WARN: ${msg}`);
}

function pass(msg) {
  console.log(`  OK: ${msg}`);
}

console.log(`Checking article: ${filePath}`);

// 1. File exists
if (!fs.existsSync(filePath)) {
  fail(`File not found: ${filePath}`);
  process.exit(1);
}

const html = fs.readFileSync(filePath, 'utf8');

// Extract body
const bodyMatch = html.match(/<div class="article__body">([\s\S]*?)<\/div>\s*<\/div>\s*<\/article>/);
if (!bodyMatch) {
  fail('No article__body found');
  process.exit(1);
}

const body = bodyMatch[1];

// Strip HTML tags for text analysis
const text = body.replace(/<[^>]+>/g, ' ').replace(/&[^;]+;/g, ' ').replace(/\s+/g, ' ').trim();

// 2. No placeholder
if (body.includes('<!-- Article content goes here -->') && text.length < 100) {
  fail('Article still has placeholder content');
}

// 3. Contractions
const contractions = text.match(/\b(don't|isn't|can't|won't|it's|doesn't|wasn't|weren't|couldn't|shouldn't|wouldn't|haven't|hasn't|hadn't|aren't|they're|we're|you're|he's|she's|that's|there's|here's|who's|what's|let's)\b/gi);
if (contractions && contractions.length > 0) {
  fail(`Contractions found: ${[...new Set(contractions)].join(', ')}`);
} else {
  pass('No contractions');
}

// 4. "Data is" (data must be plural)
const dataErrors = text.match(/\bdata\s+(is|shows|was|has|does|remains|seems|appears|suggests|indicates|demonstrates|reveals|confirms|provides)\b/gi);
if (dataErrors && dataErrors.length > 0) {
  fail(`"Data" used as singular: ${[...new Set(dataErrors)].join(', ')}`);
} else {
  pass('"Data" treated as plural (or not used)');
}

// 5. Word count
const words = text.split(/\s+/).filter(w => w.length > 0).length;
if (words < 50) {
  fail(`Word count too low: ${words}`);
} else if (words > 1200) {
  warn(`Word count high: ${words} — consider splitting`);
} else {
  pass(`Word count: ${words}`);
}

// 6. Image check
const imgMatch = body.match(/src="([^"]*?)"/);
if (imgMatch) {
  // Resolve relative path
  const imgSrc = imgMatch[1];
  const imgPath = imgSrc.replace('../', '');
  if (fs.existsSync(imgPath)) {
    try {
      const fileType = execSync(`file "${imgPath}"`, { encoding: 'utf8' });
      if (fileType.includes('HTML') || fileType.includes('text')) {
        fail(`Image ${imgPath} is HTML, not an image`);
      } else {
        pass(`Image valid: ${imgPath}`);
      }
    } catch (e) {
      fail(`Could not check image: ${e.message}`);
    }
  } else {
    fail(`Image not found: ${imgPath}`);
  }
} else {
  warn('No image in article (may be fine for abstract topics)');
}

// 7. Cross-links
const linkCount = (body.match(/class="lexicon-term"/g) || []).length;
const linksPerHundred = words > 0 ? (linkCount / words * 100).toFixed(1) : 0;
if (linkCount === 0) {
  fail('No cross-links — run: node dev/cross-link-articles.js ' + filePath);
} else if (linksPerHundred < 2) {
  warn(`Cross-link density low: ${linkCount} links, ${linksPerHundred}/100 words`);
} else {
  pass(`Cross-links: ${linkCount} (${linksPerHundred}/100 words)`);
}

// Summary
console.log(`\n${failures === 0 ? 'ALL CHECKS PASSED' : `${failures} FAILURE(S)`}`);
process.exit(failures > 0 ? 1 : 0);
