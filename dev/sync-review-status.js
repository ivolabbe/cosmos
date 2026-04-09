#!/usr/bin/env node
/**
 * Sync review results from Google Sheet back to pipeline-status.md.
 *
 * Usage:
 *   node dev/sync-review-status.js
 *
 * What it does:
 *   1. GETs all assignments from Google Sheet via Apps Script /export
 *   2. For each assignment with status approved/revision/skipped,
 *      updates pipeline-status.md phase-3-review to match
 *
 * Requires: API_URL environment variable or dev/review/config.json
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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
  const API_URL = getApiUrl();

  if (!API_URL) {
    console.error('API_URL not configured.');
    console.error('Set COSMOS_REVIEW_API env var or create dev/review/config.json');
    process.exit(1);
  }

  console.log('Fetching assignments from Google Sheet...\n');

  const res = await fetch(API_URL + '?action=export');
  if (!res.ok) {
    console.error('HTTP error:', res.status);
    process.exit(1);
  }

  const assignments = await res.json();
  const terminal = assignments.filter(a =>
    ['approved', 'revision', 'skipped'].includes(a.status)
  );

  if (!terminal.length) {
    console.log('No completed reviews to sync.');
    return;
  }

  console.log(`Found ${terminal.length} completed review(s):\n`);

  let updated = 0;
  for (const a of terminal) {
    // Map sheet status to pipeline-status.md status
    const status = a.status; // approved, revision, skipped all valid
    try {
      execSync(
        `node dev/update-pipeline-status.js ${a.slug} phase-3-review ${status}`,
        { stdio: 'inherit' }
      );
      updated++;
    } catch (err) {
      console.error(`Failed to update ${a.slug}: ${err.message}`);
    }
  }

  console.log(`\nSynced ${updated} of ${terminal.length} assignments to pipeline-status.md`);
}

main();
