#!/usr/bin/env node
// Scrape ADS for all COSMOS articles in parallel.
// Usage: node dev/scrape-ads-all.js [concurrency]
// Default concurrency: 8. Output: dev/ads-research.json

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const CONCURRENCY = parseInt(process.argv[2]) || 8;
const ROWS = 3;
const DELAY = 1500; // ms between requests per worker
const OUT_PATH = 'dev/ads-research.json';

const QUERY_OVERRIDES = {
  'cluster-environment': 'galaxy cluster environment',
  'group-environment': 'galaxy group environment',
  'hierarchical-clustering': 'hierarchical galaxy clustering',
  'hierarchical-merging': 'hierarchical galaxy merging',
};

const index = JSON.parse(fs.readFileSync('articles/index.json', 'utf8'));
let existing = {};
try { existing = JSON.parse(fs.readFileSync(OUT_PATH, 'utf8')); } catch(e) {}

function adsSearchURL(topic, dateFrom, rows) {
  const q = `"${topic}" ${dateFrom ? `pubdate:[${dateFrom} TO *] ` : ''}database:astronomy`;
  const params = new URLSearchParams({ q, sort: 'citation_count desc', rows: String(rows) });
  return `https://ui.adsabs.harvard.edu/search?${params.toString()}`;
}

function fetchHTML(url) {
  try {
    return execSync(
      `curl -s -L -b /tmp/ads_cosmos_jar -c /tmp/ads_cosmos_jar "${url}"`,
      { encoding: 'utf8', maxBuffer: 5 * 1024 * 1024, timeout: 30000 }
    );
  } catch(e) { return ''; }
}

function parseResults(html) {
  const results = [];
  const titleRe = /class="s-results-title">([^<]+)/g;
  let m;
  while ((m = titleRe.exec(html))) {
    const title = m[1].trim();
    const before = html.substring(Math.max(0, m.index - 2000), m.index);
    const bibMatch = before.match(/\/abs\/([^\/\"]+)\/abstract/g);
    const bibcode = bibMatch ? bibMatch[bibMatch.length - 1].match(/\/abs\/([^\/]+)\//)[1] : null;
    if (!bibcode) continue;
    const year = bibcode.substring(0, 4);
    const after = html.substring(m.index, m.index + 2000);
    const authorMatches = [...after.matchAll(/<li class="article-author">([^<]+)/g)];
    const authors = authorMatches.map(a => a[1].replace(/[;,\s]+$/, '').trim());
    const first = authors[0] || '';
    const authorStr = authors.length > 3 ? first + ' et al.' : authors.join('; ');
    results.push({
      bibcode, title, year,
      authors: authorStr || 'Unknown',
      url: `https://ui.adsabs.harvard.edu/abs/${bibcode}/abstract`
    });
  }
  return results;
}

function sleep(ms) { execSync(`sleep ${ms / 1000}`); }

function scrapeOne(slug, topic) {
  const Y = new Date().getFullYear();
  const M = String(new Date().getMonth() + 1).padStart(2, '0');

  const r1 = fetchHTML(adsSearchURL(topic, `${Y - 1}-${M}`, ROWS));
  sleep(DELAY);
  const r2 = fetchHTML(adsSearchURL(topic, `${Y - 10}-01`, ROWS));

  return {
    recent: parseResults(r1).slice(0, 2),
    decade: parseResults(r2).slice(0, 2)
  };
}

// --- Main ---
console.log(`Scraping ADS for ${index.length} articles (${CONCURRENCY} parallel)...`);

// Init cookies
execSync('curl -s -c /tmp/ads_cosmos_jar -b /tmp/ads_cosmos_jar -L "https://ui.adsabs.harvard.edu/core/always/" -o /dev/null');

// Build queue
const queue = index.map(a => ({
  slug: a.slug,
  title: a.title,
  topic: QUERY_OVERRIDES[a.slug] || a.title
}));

let idx = 0;
let done = 0;
let failed = 0;

function saveResults() {
  const sorted = {};
  Object.keys(existing).sort().forEach(k => sorted[k] = existing[k]);
  fs.writeFileSync(OUT_PATH, JSON.stringify(sorted, null, 2));
}

function processNext() {
  if (idx >= queue.length) return;
  const item = queue[idx++];
  const num = idx;

  try {
    const data = scrapeOne(item.slug, item.topic);
    existing[item.slug] = {
      title: item.title,
      scraped: new Date().toISOString().split('T')[0],
      ...data
    };
    const papers = data.recent.length + data.decade.length;
    console.log(`[${num}/${queue.length}] ${item.slug} — ${papers} papers`);
  } catch(e) {
    failed++;
    console.log(`[${num}/${queue.length}] FAIL ${item.slug}: ${e.message}`);
  }

  done++;
  // Save periodically
  if (done % 10 === 0) saveResults();

  processNext();
}

// Launch workers
for (let w = 0; w < CONCURRENCY; w++) {
  processNext();
}

saveResults();
console.log(`\nDone: ${done - failed} OK, ${failed} failed. Saved to ${OUT_PATH}`);
