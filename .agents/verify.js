#!/usr/bin/env node
/**
 * SAO Verify — Reusable Puppeteer verification script
 *
 * Usage:
 *   node .agents/verify.js <url> [--screenshots <dir>] [--checks <json>] [--wait <ms>]
 *
 * Examples:
 *   node .agents/verify.js http://localhost:8765/experimental/mercury-interactive.html
 *   node .agents/verify.js http://localhost:8765/experimental/earth-interactive.html \
 *     --screenshots /tmp --checks '{"rotate":"#cb-rotate","day":"#cb-day","clouds":"#cb-clouds"}'
 *
 * Returns JSON to stdout:
 * {
 *   "pass": true/false,
 *   "url": "...",
 *   "screenshots": ["path1.png", "path2.png", ...],
 *   "checks": { "canvas": "1200x800", "loading": "none", ... },
 *   "errors": [],
 *   "warnings": []
 * }
 */

let puppeteer;
try { puppeteer = require('puppeteer'); }
catch { puppeteer = require('/tmp/node_modules/puppeteer'); }
const path = require('path');

async function verify(url, opts = {}) {
  const screenshotDir = opts.screenshots || '/tmp';
  const extraChecks = opts.checks || {};
  const waitMs = opts.wait || 4000;
  const slug = url.split('/').pop().replace('.html', '');

  const result = {
    pass: true,
    url,
    slug,
    screenshots: [],
    checks: {},
    errors: [],
    warnings: [],
  };

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: false,  // MUST be headed for WebGL
      args: ['--no-sandbox', '--window-size=1200,800'],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });

    // Collect errors
    page.on('pageerror', err => result.errors.push(`[pageerror] ${err.message}`));
    page.on('console', msg => {
      if (msg.type() === 'error'
          && !msg.text().includes('favicon')
          && !msg.text().includes('404'))  // favicon is the only 404; real asset failures caught by loading check
        result.errors.push(`[console] ${msg.text()}`);
    });

    // Navigate
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 20000 });
    await new Promise(r => setTimeout(r, waitMs));

    // --- Screenshot 1: initial render ---
    const ss1 = path.join(screenshotDir, `${slug}-initial.png`);
    await page.screenshot({ path: ss1 });
    result.screenshots.push(ss1);

    // --- Core checks ---
    result.checks.canvas = await page.evaluate(() => {
      const c = document.querySelector('canvas');
      return c ? `${c.width}x${c.height}` : 'NONE';
    });
    if (result.checks.canvas === 'NONE') {
      result.pass = false;
      result.errors.push('No canvas element found');
    }

    result.checks.loading = await page.evaluate(() => {
      const el = document.getElementById('loading');
      return el ? window.getComputedStyle(el).display : 'not found';
    });
    if (result.checks.loading !== 'none' && result.checks.loading !== 'not found') {
      result.pass = false;
      result.errors.push('Loading indicator still visible — texture may not have loaded');
    }

    // --- Control checks ---
    for (const [name, selector] of Object.entries(extraChecks)) {
      const exists = await page.evaluate((sel) => !!document.querySelector(sel), selector);
      result.checks[`control_${name}`] = exists;
      if (!exists) {
        result.pass = false;
        result.errors.push(`Control "${name}" not found at selector "${selector}"`);
      }
    }

    // Standard controls
    for (const [name, id] of [['rotate', '#cb-rotate'], ['speed', '#speed-select'], ['day', '#cb-day']]) {
      const exists = await page.evaluate((sel) => !!document.querySelector(sel), id);
      result.checks[`std_${name}`] = exists;
      if (!exists) result.warnings.push(`Standard control "${name}" (${id}) not found`);
    }

    // Speed default check
    result.checks.speed_default = await page.evaluate(() => {
      const sel = document.getElementById('speed-select');
      return sel ? sel.options[sel.selectedIndex]?.value : 'N/A';
    });
    if (result.checks.speed_default !== '0.5') {
      result.warnings.push(`Speed default is "${result.checks.speed_default}", expected "0.5"`);
    }

    // --- Screenshot 2: after rotation (verify shadow moves) ---
    await new Promise(r => setTimeout(r, 5000));
    const ss2 = path.join(screenshotDir, `${slug}-rotated.png`);
    await page.screenshot({ path: ss2 });
    result.screenshots.push(ss2);

    // --- Screenshot 3: Day mode ---
    const dayCheckbox = await page.$('#cb-day');
    if (dayCheckbox) {
      await dayCheckbox.click();
      await new Promise(r => setTimeout(r, 1500));
      const ss3 = path.join(screenshotDir, `${slug}-day.png`);
      await page.screenshot({ path: ss3 });
      result.screenshots.push(ss3);
      // Toggle back
      await dayCheckbox.click();
      await new Promise(r => setTimeout(r, 500));
    }

    // --- Screenshot 4: any extra toggle states ---
    for (const [name, selector] of Object.entries(extraChecks)) {
      if (selector.startsWith('#cb-') && selector !== '#cb-rotate' && selector !== '#cb-day') {
        const el = await page.$(selector);
        if (el) {
          await el.click();
          await new Promise(r => setTimeout(r, 1000));
          const ssExtra = path.join(screenshotDir, `${slug}-${name}-toggled.png`);
          await page.screenshot({ path: ssExtra });
          result.screenshots.push(ssExtra);
          await el.click(); // toggle back
          await new Promise(r => setTimeout(r, 500));
        }
      }
    }

    // --- Check for iframe (article pages) ---
    result.checks.iframe = await page.evaluate(() => {
      const f = document.querySelector('iframe');
      return f ? `${f.offsetWidth}x${f.offsetHeight} src=${f.src}` : 'none';
    });

    // --- Final error tally ---
    if (result.errors.length > 0) result.pass = false;

  } catch (err) {
    result.pass = false;
    result.errors.push(`[fatal] ${err.message}`);
  } finally {
    if (browser) await browser.close();
  }

  return result;
}

// --- CLI entry point ---
(async () => {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('Usage: node verify.js <url> [--screenshots <dir>] [--checks <json>] [--wait <ms>]');
    process.exit(1);
  }

  const url = args[0];
  const opts = {};

  for (let i = 1; i < args.length; i += 2) {
    if (args[i] === '--screenshots') opts.screenshots = args[i + 1];
    if (args[i] === '--checks') opts.checks = JSON.parse(args[i + 1]);
    if (args[i] === '--wait') opts.wait = parseInt(args[i + 1]);
  }

  const result = await verify(url, opts);
  console.log(JSON.stringify(result, null, 2));
  process.exit(result.pass ? 0 : 1);
})();
