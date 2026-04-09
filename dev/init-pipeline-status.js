#!/usr/bin/env node
// Generate .planning/content/pipeline-status.md from the master article list.
// Usage: node dev/init-pipeline-status.js
//
// Reads: .planning/content/cosmos-all-merged-scored-final.md
// Writes: .planning/content/pipeline-status.md

const fs = require('fs');
const path = require('path');

const inputPath = '.planning/content/cosmos-all-merged-scored-final.md';
const outputPath = '.planning/content/pipeline-status.md';

// ── Parse the markdown table ──
const content = fs.readFileSync(inputPath, 'utf8');
const lines = content.split('\n');

// Find the table header line
const headerIdx = lines.findIndex(l => l.startsWith('| keyword |'));
if (headerIdx === -1) {
  console.error('Could not find table header "| keyword |" in', inputPath);
  process.exit(1);
}

// Parse rows (skip header + separator)
const articles = [];
for (let i = headerIdx + 2; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line.startsWith('|')) continue;

  // Split on | but keep empty columns (don't filter) — first and last are empty from leading/trailing |
  const cols = line.split('|').map(c => c.trim());
  // cols[0] = '' (before first |), cols[1] = keyword, cols[2] = pop, ..., cols[7] = cosmos, cols[8] = url
  if (cols.length < 8) continue;

  const keyword = cols[1];
  const pop = parseInt(cols[2], 10);
  const imp = parseInt(cols[3], 10);
  const cosmos = cols[7] || '';

  if (isNaN(pop) || isNaN(imp)) continue;

  // Derive slug from keyword
  const slug = keyword.toLowerCase()
    .replace(/['']/g, '')
    .replace(/\(.*?\)/g, '')  // remove parentheticals
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  const score = imp * pop;
  let tier;
  if (score >= 72) tier = 1;
  else if (score >= 42) tier = 2;
  else tier = 3;

  const hasExisting = cosmos && cosmos !== '';

  articles.push({
    slug,
    title: keyword,
    tier,
    score,
    pop,
    imp,
    existing: hasExisting ? cosmos : '',
  });
}

console.log(`Parsed ${articles.length} articles from ${inputPath}`);

// ── Count tiers ──
const t1 = articles.filter(a => a.tier === 1).length;
const t2 = articles.filter(a => a.tier === 2).length;
const t3 = articles.filter(a => a.tier === 3).length;
const existing = articles.filter(a => a.existing).length;
const newArticles = articles.length - existing;

console.log(`  Tier 1 (score ≥ 72): ${t1}`);
console.log(`  Tier 2 (score ≥ 42): ${t2}`);
console.log(`  Tier 3 (score < 42): ${t3}`);
console.log(`  Existing articles: ${existing}`);
console.log(`  New articles: ${newArticles}`);

// ── Generate output ──
const header = `# COSMOS Article Pipeline Status

Generated: ${new Date().toISOString().split('T')[0]}
Source: \`${inputPath}\`

## Summary

| Metric | Count |
|--------|-------|
| Total articles | ${articles.length} |
| Tier 1 (imp×pop ≥ 72) | ${t1} |
| Tier 2 (imp×pop ≥ 42) | ${t2} |
| Tier 3 (imp×pop < 42) | ${t3} |
| With existing COSMOS page | ${existing} |
| New topics to write | ${newArticles} |

## Pipeline Status

| slug | title | tier | phase-1-research | phase-2-writing | phase-3-review | notes |
|------|-------|------|------------------|-----------------|----------------|-------|
`;

const rows = articles.map(a => {
  const notes = a.existing ? `existing: ${a.existing}` : '';
  return `| ${a.slug} | ${a.title} | ${a.tier} | - | - | - | ${notes} |`;
});

const output = header + rows.join('\n') + '\n';

fs.writeFileSync(outputPath, output);
console.log(`\nWrote ${outputPath} (${articles.length} rows)`);
