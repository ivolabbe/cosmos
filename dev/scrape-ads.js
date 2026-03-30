#!/usr/bin/env node
// Scrape ADS basic HTML for top cited papers per COSMOS article topic.
// Run quarterly: node dev/scrape-ads.js [slug]
// Output: dev/ads-research.json

const { execSync } = require('child_process');
const fs = require('fs');

const index = JSON.parse(fs.readFileSync('articles/index.json', 'utf8'));
const DELAY = 2000; // ms between requests (be polite)
const ROWS = 3;
const COOKIE_JAR = '/tmp/ads_cosmos_jar';

// Keyword overrides — when an article title is ambiguous, use a better ADS query.
// Key = slug, value = search string to use instead of the article title.
const QUERY_OVERRIDES = {
  'cluster-environment': 'galaxy cluster environment',
  'group-environment': 'galaxy group environment',
  'hierarchical-clustering': 'hierarchical galaxy clustering',
  'hierarchical-merging': 'hierarchical galaxy merging',
};

function adsSearchURL(topic, dateFrom, rows) {
  const q = `"${topic}" ${dateFrom ? `pubdate:[${dateFrom} TO *] ` : ''}database:astronomy`;
  const params = new URLSearchParams({
    q, sort: 'citation_count desc', rows: String(rows)
  });
  return `https://ui.adsabs.harvard.edu/search?${params.toString()}`;
}

// Set the basic-HTML cookie once
function initCookies() {
  execSync(`curl -s -c ${COOKIE_JAR} -b ${COOKIE_JAR} -L "https://ui.adsabs.harvard.edu/core/always/" -o /dev/null`);
}

function fetchHTML(url) {
  return execSync(
    `curl -s -L -b ${COOKIE_JAR} -c ${COOKIE_JAR} "${url}"`,
    { encoding: 'utf8', maxBuffer: 5 * 1024 * 1024 }
  );
}

function parseResults(html) {
  const results = [];
  // Find each title, then look backward for bibcode and forward for authors
  const titleRe = /class="s-results-title">([^<]+)/g;
  let m;
  while ((m = titleRe.exec(html))) {
    const title = m[1].trim();
    // Look backward for the nearest abs link
    const before = html.substring(Math.max(0, m.index - 2000), m.index);
    const bibMatch = before.match(/\/abs\/([^\/\"]+)\/abstract/g);
    const bibcode = bibMatch ? bibMatch[bibMatch.length - 1].match(/\/abs\/([^\/]+)\//)[1] : null;
    if (!bibcode) continue;
    const year = bibcode.substring(0, 4);

    // Look forward for authors (within next 2000 chars)
    const after = html.substring(m.index, m.index + 2000);
    const authorMatches = [...after.matchAll(/<li class="article-author">([^<]+)/g)];
    const authors = authorMatches.map(a => a[1].replace(/[;,\s]+$/, '').trim());
    const firstAuthor = authors[0] || '';
    const authorStr = authors.length > 3
      ? firstAuthor + ' et al.'
      : authors.join('; ');

    results.push({
      bibcode, title, year,
      authors: authorStr || 'Unknown',
      url: `https://ui.adsabs.harvard.edu/abs/${bibcode}/abstract`
    });
  }
  return results;
}

function sleep(ms) { execSync(`sleep ${ms / 1000}`); }

function scrapeArticle(title) {
  const now = new Date();
  const Y = now.getFullYear();
  const M = String(now.getMonth() + 1).padStart(2, '0');

  const recentHTML = fetchHTML(adsSearchURL(title, `${Y - 1}-${M}`, ROWS));
  sleep(DELAY);
  const decadeHTML = fetchHTML(adsSearchURL(title, `${Y - 10}-01`, ROWS));

  return {
    recent: parseResults(recentHTML).slice(0, 2),
    decade: parseResults(decadeHTML).slice(0, 2)
  };
}

// --- Main ---
const slug = process.argv[2] || 'cluster-environment';
const outDir = process.argv[3] || null; // optional: write to outDir/slug.json instead
const article = index.find(a => a.slug === slug);
if (!article) { console.error('Article not found:', slug); process.exit(1); }

const searchTerm = QUERY_OVERRIDES[slug] || article.title;
console.log(`[${slug}] Scraping "${searchTerm}"...`);
initCookies();
const data = scrapeArticle(searchTerm);

const entry = {
  title: article.title,
  scraped: new Date().toISOString().split('T')[0],
  ...data
};

if (outDir) {
  // Write individual file for parallel mode
  fs.writeFileSync(`${outDir}/${slug}.json`, JSON.stringify(entry));
} else {
  // Merge into main file
  const outPath = 'dev/ads-research.json';
  let existing = {};
  try { existing = JSON.parse(fs.readFileSync(outPath, 'utf8')); } catch(e) {}
  existing[slug] = entry;
  fs.writeFileSync(outPath, JSON.stringify(existing, null, 2));
}

const papers = data.recent.length + data.decade.length;
console.log(`[${slug}] ${papers} papers found`);
data.recent.forEach(p => console.log(`  Recent: ${p.authors} (${p.year})`));
data.decade.forEach(p => console.log(`  Decade: ${p.authors} (${p.year})`));
