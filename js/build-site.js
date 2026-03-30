#!/usr/bin/env node
/**
 * COSMOS site builder — renders article pages from a canonical template.
 *
 * Usage:
 *   node js/build-site.js render              # Re-render all articles in articles/
 *   node js/build-site.js render articles/     # Same (explicit directory)
 *   node js/build-site.js render articles/star.html  # Single file
 *   node js/build-site.js new <slug> <title>   # Create new article (drafts branch)
 *   node js/build-site.js diff                 # Show which articles differ from template
 *
 * What "render" does:
 *   1. Reads existing HTML
 *   2. Extracts article body (content inside <div class="article__body">)
 *   3. Re-wraps it in the canonical template (site-template.js)
 *   4. Writes back in place
 *
 * The article body is NEVER modified — only the page chrome (header, footer,
 * banner, scripts) is updated to match the current template.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { renderArticlePage } = require('./site-template');

const ARTICLES_DIR = path.join(__dirname, '..', 'articles');
const INDEX_PATH = path.join(ARTICLES_DIR, 'index.json');

// ── Extract article content from existing HTML ────────────
function extractContent(html) {
  // Title from <h1 class="article__title">
  const titleMatch = html.match(/<h1[^>]*class="article__title"[^>]*>([\s\S]*?)<\/h1>/);
  const title = titleMatch
    ? titleMatch[1].replace(/<[^>]+>/g, '').trim()
    : null;

  // Body from <div class="article__body">...</div>
  // Find the opening tag, then match to its closing </div> at the correct depth
  const bodyStart = html.indexOf('class="article__body"');
  if (bodyStart === -1) return null;

  const divOpen = html.lastIndexOf('<div', bodyStart);
  const afterTag = html.indexOf('>', divOpen) + 1;

  // Walk forward counting div depth to find the matching </div>
  let depth = 1;
  let pos = afterTag;
  while (depth > 0 && pos < html.length) {
    const nextOpen = html.indexOf('<div', pos);
    const nextClose = html.indexOf('</div>', pos);
    if (nextClose === -1) break;
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen + 4;
    } else {
      depth--;
      if (depth === 0) {
        const body = html.substring(afterTag, nextClose).trim();
        return { title, body };
      }
      pos = nextClose + 6;
    }
  }
  return null;
}

// ── Commands ──────────────────────────────────────────────

function cmdRender(target) {
  const index = JSON.parse(fs.readFileSync(INDEX_PATH, 'utf8'));
  const slugMap = {};
  index.forEach(a => { slugMap[a.slug] = a; });

  let files;
  if (target && target.endsWith('.html')) {
    files = [path.resolve(target)];
  } else {
    const dir = target || ARTICLES_DIR;
    files = fs.readdirSync(dir)
      .filter(f => f.endsWith('.html'))
      .map(f => path.join(dir, f));
  }

  let updated = 0, skipped = 0, errors = 0;

  for (const filePath of files) {
    const slug = path.basename(filePath, '.html');
    const meta = slugMap[slug];
    if (!meta) { skipped++; continue; }

    const html = fs.readFileSync(filePath, 'utf8');
    const content = extractContent(html);
    if (!content || !content.title || !content.body) {
      console.error(`  SKIP ${slug} (could not extract content)`);
      errors++;
      continue;
    }

    const rendered = renderArticlePage({
      title: content.title,
      letter: meta.letter,
      body: content.body
    });

    fs.writeFileSync(filePath, rendered);
    updated++;
  }

  console.log(`Rendered ${updated} articles (${skipped} skipped, ${errors} errors)`);
}

function cmdNew(slug, title) {
  if (!slug || !title) {
    console.error('Usage: node js/build-site.js new <slug> <title>');
    process.exit(1);
  }

  const filePath = path.join(ARTICLES_DIR, slug + '.html');
  if (fs.existsSync(filePath)) {
    console.error(`Article already exists: ${filePath}`);
    process.exit(1);
  }

  const letter = title.charAt(0).toUpperCase();
  const body = `\t<p>[Article content for "${title}" goes here.]</p>`;

  const rendered = renderArticlePage({ title, letter, body });
  fs.writeFileSync(filePath, rendered);

  // Add to index.json
  const index = JSON.parse(fs.readFileSync(INDEX_PATH, 'utf8'));
  index.push({ slug, title, letter });
  index.sort((a, b) => a.slug.localeCompare(b.slug));
  fs.writeFileSync(INDEX_PATH, JSON.stringify(index, null, 2) + '\n');

  // Track as draft
  const draftPath = path.join(__dirname, '..', 'articles', 'drafts.json');
  let drafts = [];
  try { drafts = JSON.parse(fs.readFileSync(draftPath, 'utf8')); } catch(e) {}
  drafts.push({ slug, title, created: new Date().toISOString().split('T')[0], status: 'draft' });
  fs.writeFileSync(draftPath, JSON.stringify(drafts, null, 2) + '\n');

  console.log(`Created draft: ${filePath}`);
  console.log(`Added to index.json and drafts.json`);
  console.log(`Edit the article body, then commit when ready for review.`);
}

function cmdDiff() {
  const index = JSON.parse(fs.readFileSync(INDEX_PATH, 'utf8'));
  let differs = 0;

  for (const meta of index) {
    const filePath = path.join(ARTICLES_DIR, meta.slug + '.html');
    if (!fs.existsSync(filePath)) { console.log(`  MISSING ${meta.slug}`); continue; }

    const html = fs.readFileSync(filePath, 'utf8');

    // Check for key template markers
    const hasBanner = html.includes('sao-banner');
    const hasScript = html.includes('latest-research.js');
    const hasNewTopBar = !html.includes('Swinburne Astronomy Online</a></li>\n      </ul>');

    if (!hasBanner || !hasScript) {
      console.log(`  OUTDATED ${meta.slug}` +
        (!hasBanner ? ' [no banner]' : '') +
        (!hasScript ? ' [no script]' : ''));
      differs++;
    }
  }

  console.log(`\n${differs} articles need re-rendering. Run: node js/build-site.js render`);
}

// ── Main ──────────────────────────────────────────────────
const cmd = process.argv[2];
const arg1 = process.argv[3];
const arg2 = process.argv.slice(4).join(' ');

switch (cmd) {
  case 'render':  cmdRender(arg1); break;
  case 'new':     cmdNew(arg1, arg2); break;
  case 'diff':    cmdDiff(); break;
  default:
    console.log('COSMOS site builder');
    console.log('  node js/build-site.js render [dir|file]  — Re-render pages from template');
    console.log('  node js/build-site.js new <slug> <title> — Create new draft article');
    console.log('  node js/build-site.js diff                — Show outdated pages');
}
