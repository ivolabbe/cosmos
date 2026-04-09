#!/usr/bin/env node
/**
 * Stage articles for expert review.
 *
 * Usage:
 *   node dev/stage-for-review.js --reviewer="Name <email>" slug1 slug2 slug3
 *   node dev/stage-for-review.js --reviewer="Name <email>" --notify slug1 slug2 slug3
 *
 * Without --notify:
 *   1. Updates pipeline-status.md: phase-3-review → queued
 *   2. Creates assignment rows in Google Sheet
 *   3. Prints review URL (no email sent)
 *   → Check the Google Sheet to verify assignments look correct
 *
 * With --notify:
 *   Same as above, plus sends notification email to the reviewer.
 *
 * Requires: dev/review/config.json with api_url, or COSMOS_REVIEW_API env var
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ── Parse args ─────────────────────────────────────────────────

const args = process.argv.slice(2);
let reviewerArg = '';
let sendNotify = false;
const slugs = [];

for (const arg of args) {
  if (arg.startsWith('--reviewer=')) {
    reviewerArg = arg.replace('--reviewer=', '');
  } else if (arg === '--notify') {
    sendNotify = true;
  } else if (!arg.startsWith('-')) {
    slugs.push(arg);
  }
}

if (!reviewerArg || !slugs.length) {
  console.error('Usage: node dev/stage-for-review.js --reviewer="Name <email>" [--notify] slug1 slug2 ...');
  console.error('');
  console.error('  Without --notify: creates assignments in sheet (inspect first)');
  console.error('  With --notify:    also sends the review email');
  console.error('');
  console.error('Example:');
  console.error('  node dev/stage-for-review.js --reviewer="Ivo <ivolabbe@gmail.com>" me-stars metal-rich-stars');
  console.error('  # check Google Sheet, then:');
  console.error('  node dev/stage-for-review.js --reviewer="Ivo <ivolabbe@gmail.com>" --notify me-stars metal-rich-stars');
  process.exit(1);
}

// Parse "Name <email>" format
const emailMatch = reviewerArg.match(/<(.+)>/);
const reviewerEmail = emailMatch ? emailMatch[1] : reviewerArg;
const reviewerName = emailMatch ? reviewerArg.replace(/<.+>/, '').trim() : '';

// ── Load API URL ───────────────────────────────────────────────

function getApiUrl() {
  if (process.env.COSMOS_REVIEW_API) return process.env.COSMOS_REVIEW_API;

  const configPath = path.join(__dirname, 'review', 'config.json');
  if (fs.existsSync(configPath)) {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    if (config.api_url) return config.api_url;
  }

  return '';
}

const API_URL = getApiUrl();

// ── Step 1: Update pipeline-status.md ──────────────────────────

console.log('\n=== Updating pipeline-status.md ===\n');

for (const slug of slugs) {
  try {
    execSync(`node dev/update-pipeline-status.js ${slug} phase-3-review queued`, { stdio: 'inherit' });
  } catch (err) {
    console.error(`Failed to update ${slug}`);
  }
}

// ── Step 2: Create assignments in Google Sheet ─────────────────

async function callApi() {
  if (!API_URL) {
    console.log('\n=== API_URL not configured — skipping Google Sheet ===');
    console.log('Set COSMOS_REVIEW_API env var or create dev/review/config.json:');
    console.log('  { "api_url": "https://script.google.com/macros/s/.../exec" }\n');
  } else {
    console.log('\n=== Creating assignments in Google Sheet ===\n');

    try {
      const assignRes = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'assign',
          reviewer_email: reviewerEmail,
          reviewer_name: reviewerName,
          slugs: slugs
        })
      });
      const assignData = await assignRes.json();
      console.log(`Assignments: ${assignData.added} added, ${assignData.skipped} already existed`);
    } catch (err) {
      console.error('Failed to create assignments:', err.message);
    }

    // ── Step 3: Optionally send email ─────────────────────────────

    if (sendNotify) {
      console.log('\n=== Sending notification email ===\n');

      try {
        const notifyRes = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'notify',
            reviewer_email: reviewerEmail,
            reviewer_name: reviewerName,
            slugs: slugs
          })
        });
        const notifyData = await notifyRes.json();
        console.log(`Email sent to: ${notifyData.emailed}`);
      } catch (err) {
        console.error('Failed to send email:', err.message);
      }
    } else {
      console.log('\n=== Email NOT sent (use --notify to send) ===');
      console.log('Check the Google Sheet first, then re-run with --notify.\n');
    }
  }

  // ── Print review URL ───────────────────────────────────────────

  const reviewUrl = 'https://ivolabbe.github.io/cosmos/review/?reviewer=' + encodeURIComponent(reviewerEmail);

  console.log('\n=== Review URL ===\n');
  console.log(reviewUrl);
  console.log('');
}

callApi();
