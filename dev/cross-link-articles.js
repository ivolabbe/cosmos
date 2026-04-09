#!/usr/bin/env node
// Cross-link COSMOS articles by wrapping technical terms in lexicon-term anchors.
//
// Usage:
//   node dev/cross-link-articles.js articles/solar-system.html    # one article
//   node dev/cross-link-articles.js articles/*.html               # all articles
//   node dev/cross-link-articles.js --dry-run articles/solar-system.html  # preview changes
//
// What it does:
//   1. Reads articles/index.json to build a term → slug lookup
//   2. For each article, finds terms in the body text that match article titles
//   3. Wraps first occurrence of each term in <a class="lexicon-term" href="{slug}.html">
//   4. Skips terms that are already linked, and skips self-links
//
// Does NOT use any AI tokens. Pure string matching.

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const files = args.filter(a => !a.startsWith('--'));

if (files.length === 0) {
  console.error('Usage: node dev/cross-link-articles.js [--dry-run] <article.html> [...]');
  process.exit(1);
}

// ── Build term lookup from index.json ──
const index = JSON.parse(fs.readFileSync('articles/index.json', 'utf8'));

// Build map: lowercase title → { slug, title }
// Also add common variants (singular/plural, with/without parentheticals)
const termMap = new Map();

for (const entry of index) {
  const title = entry.title;
  const slug = entry.slug;

  // Skip very short terms (1-2 chars) that would match everywhere
  if (title.length < 3) continue;

  termMap.set(title.toLowerCase(), { slug, title });

  // Add without parenthetical: "Andromeda Galaxy (M31)" → "Andromeda Galaxy"
  const noParen = title.replace(/\s*\(.*?\)\s*$/, '').trim();
  if (noParen !== title && noParen.length >= 3) {
    termMap.set(noParen.toLowerCase(), { slug, title: noParen });
  }
}

// Sort terms by length descending — match longer terms first to avoid
// "Type Ia supernova" being partially matched by "supernova"
const sortedTerms = [...termMap.entries()].sort((a, b) => b[0].length - a[0].length);

// ── Process each article ──
let totalLinksAdded = 0;

for (const filePath of files) {
  if (!fs.existsSync(filePath)) {
    console.error(`  SKIP: ${filePath} does not exist`);
    continue;
  }

  const html = fs.readFileSync(filePath, 'utf8');

  // Extract the article slug from filename
  const articleSlug = path.basename(filePath, '.html');

  // Find the article__body content
  const bodyMatch = html.match(/<div class="article__body">([\s\S]*?)<\/div>\s*<\/div>\s*<\/article>/);
  if (!bodyMatch) {
    console.error(`  SKIP: ${filePath} — no article__body found`);
    continue;
  }

  let body = bodyMatch[1];
  const originalBody = body;

  // Track which terms have been linked (first occurrence only)
  const linked = new Set();
  let linksAdded = 0;

  // First, find all terms that are ALREADY linked and mark them
  const existingLinks = body.matchAll(/<a[^>]*class="lexicon-term"[^>]*>([^<]+)<\/a>/gi);
  for (const match of existingLinks) {
    linked.add(match[1].toLowerCase());
  }

  // Process each term
  for (const [termLower, { slug, title }] of sortedTerms) {
    // Skip self-links
    if (slug === articleSlug) continue;

    // Skip if already linked
    if (linked.has(termLower)) continue;

    // Build regex to match the term in body text (not inside HTML tags or existing links)
    // Word boundary matching, case-insensitive
    const escaped = termLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(?<![<\\w/])\\b(${escaped})\\b(?![^<]*>)(?![^<]*<\\/a>)`, 'i');

    const match = body.match(regex);
    if (match) {
      const matchedText = match[1]; // preserve original casing
      const replacement = `<a class="lexicon-term" href="${slug}.html">${matchedText}</a>`;
      body = body.substring(0, match.index) + replacement + body.substring(match.index + matchedText.length);
      linked.add(termLower);
      linksAdded++;
    }
  }

  if (linksAdded === 0) {
    console.log(`  ${filePath}: no new links`);
    continue;
  }

  totalLinksAdded += linksAdded;

  if (dryRun) {
    console.log(`  ${filePath}: would add ${linksAdded} links`);
    // Show which terms would be linked
    const newLinks = body.matchAll(/<a class="lexicon-term" href="([^"]+)">([^<]+)<\/a>/gi);
    const origLinks = new Set();
    for (const m of originalBody.matchAll(/<a class="lexicon-term" href="([^"]+)">/gi)) {
      origLinks.add(m[1]);
    }
    for (const m of body.matchAll(/<a class="lexicon-term" href="([^"]+)">([^<]+)<\/a>/gi)) {
      if (!origLinks.has(m[1])) {
        console.log(`    + ${m[2]} → ${m[1]}`);
      }
    }
  } else {
    const updated = html.replace(bodyMatch[1], body);
    fs.writeFileSync(filePath, updated);
    console.log(`  ${filePath}: added ${linksAdded} links`);
  }
}

console.log(`\nTotal: ${totalLinksAdded} links ${dryRun ? 'would be ' : ''}added across ${files.length} file(s)`);
