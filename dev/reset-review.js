#!/usr/bin/env node
/**
 * Reset review status for articles (for test re-runs).
 *
 * Usage:
 *   node dev/reset-review.js slug1 slug2 slug3
 *
 * What it does:
 *   1. Resets pipeline-status.md phase-3-review → -
 *   2. Deletes assignment + response rows from Google Sheet
 *
 * Requires: API_URL environment variable or dev/review/config.json
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const slugs = process.argv.slice(2).filter(a => !a.startsWith('-'));

if (!slugs.length) {
  console.error('Usage: node dev/reset-review.js slug1 slug2 ...');
  process.exit(1);
}

function getApiUrl() {
  if (process.env.COSMOS_REVIEW_API) return process.env.COSMOS_REVIEW_API;

  const configPath = path.join(__dirname, 'review', 'config.json');
  if (fs.existsSync(configPath)) {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    if (config.api_url) return config.api_url;
  }

  return '';
}

async function main() {
  // Step 1: Reset pipeline-status.md
  console.log('\n=== Resetting pipeline-status.md ===\n');

  for (const slug of slugs) {
    try {
      execSync(`node dev/update-pipeline-status.js ${slug} phase-3-review -`, { stdio: 'inherit' });
    } catch (err) {
      console.error(`Failed to reset ${slug}`);
    }
  }

  // Step 2: Reset Google Sheet
  const API_URL = getApiUrl();

  if (!API_URL) {
    console.log('\n=== API_URL not configured — skipping Google Sheet reset ===\n');
    return;
  }

  console.log('\n=== Resetting Google Sheet ===\n');

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'reset',
        slugs: slugs
      })
    });
    const data = await res.json();
    console.log('Reset in sheet:', data.reset.join(', '));
  } catch (err) {
    console.error('Failed to reset sheet:', err.message);
  }

  console.log('\nDone. Articles can be re-staged for review.\n');
}

main();
