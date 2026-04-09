#!/usr/bin/env node
/**
 * SAO Verify — Automated verification for interactives and articles
 *
 * Usage:
 *   node .agents/code/verify.js <url> [--screenshots <dir>] [--checks <json>] [--wait <ms>]
 *   node .agents/code/verify.js <url> --article --original <path> [--screenshots <dir>]
 *
 * Interactive mode (default):
 *   Checks: canvas, loading, controls, bloom pipeline, circular particles,
 *   spacebar handler, embedded mode, credit line, screenshots at multiple states.
 *
 * Article mode (--article):
 *   Checks: iframe, text preservation diff against original, word count ratio,
 *   lexicon links, "data are" not "data is", Swinburne chrome.
 *
 * Returns JSON to stdout:
 * {
 *   "pass": true/false,
 *   "url": "...",
 *   "mode": "interactive" | "article",
 *   "screenshots": ["path1.png", ...],
 *   "checks": { ... },
 *   "errors": [],
 *   "warnings": []
 * }
 */

let puppeteer;
try { puppeteer = require('puppeteer'); }
catch { puppeteer = require('/tmp/node_modules/puppeteer'); }
const path = require('path');
const fs = require('fs');

// ---- Shared browser setup ----
async function launchAndNavigate(url, waitMs) {
  const browser = await puppeteer.launch({
    headless: false,  // MUST be headed for WebGL
    args: ['--no-sandbox', '--window-size=1200,800'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });
  const errors = [];
  page.on('pageerror', err => errors.push(`[pageerror] ${err.message}`));
  page.on('console', msg => {
    if (msg.type() === 'error'
        && !msg.text().includes('favicon')
        && !msg.text().includes('404'))
      errors.push(`[console] ${msg.text()}`);
  });
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 20000 });
  await new Promise(r => setTimeout(r, waitMs));
  return { browser, page, errors };
}

// ============================================================
//  INTERACTIVE VERIFICATION
// ============================================================
async function verifyInteractive(url, opts = {}) {
  const screenshotDir = opts.screenshots || '/tmp';
  const extraChecks = opts.checks || {};
  const waitMs = opts.wait || 4000;
  const slug = url.split('/').pop().replace('.html', '');

  const result = {
    pass: true, url, slug, mode: 'interactive',
    screenshots: [], checks: {}, errors: [], warnings: [],
  };

  let browser;
  try {
    const ctx = await launchAndNavigate(url, waitMs);
    browser = ctx.browser;
    const page = ctx.page;
    result.errors.push(...ctx.errors);

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
      result.errors.push('Loading indicator still visible');
    }

    // --- House style: bloom pipeline ---
    result.checks.bloom_pipeline = await page.evaluate(() => {
      const src = document.querySelector('script[type="module"]')?.textContent || '';
      const hasBloom = src.includes('UnrealBloomPass');
      const hasOutput = src.includes('OutputPass');
      const hasComposer = src.includes('EffectComposer');
      return { hasBloom, hasOutput, hasComposer,
               pass: hasBloom && hasOutput && hasComposer };
    });
    if (!result.checks.bloom_pipeline.pass) {
      result.pass = false;
      result.errors.push('Missing bloom pipeline (need EffectComposer + UnrealBloomPass + OutputPass)');
    }

    // --- House style: circular particles (no PointsMaterial) ---
    result.checks.particles = await page.evaluate(() => {
      const src = document.querySelector('script[type="module"]')?.textContent || '';
      const hasPointsMaterial = /new\s+THREE\.PointsMaterial/.test(src);
      const hasCircleShader = src.includes('gl_PointCoord');
      const hasPoints = src.includes('THREE.Points');
      if (!hasPoints) return { hasPoints: false, pass: true, note: 'no particles used' };
      return { hasPoints, hasPointsMaterial, hasCircleShader,
               pass: !hasPointsMaterial && hasCircleShader };
    });
    if (!result.checks.particles.pass) {
      result.pass = false;
      result.errors.push('PointsMaterial detected — must use ShaderMaterial with gl_PointCoord');
    }

    // --- House style: spacebar handler ---
    result.checks.spacebar = await page.evaluate(() => {
      const src = document.querySelector('script[type="module"]')?.textContent || '';
      return src.includes("'Space'") || src.includes('"Space"')
          || src.includes('code === "Space"') || src.includes("code === 'Space'")
          || src.includes('key === " "');
    });
    if (!result.checks.spacebar) {
      result.warnings.push('No spacebar play/pause handler detected');
    }

    // --- House style: embedded mode ---
    result.checks.embedded_mode = await page.evaluate(() => {
      const src = document.querySelector('script[type="module"]')?.textContent || '';
      const css = document.querySelector('style')?.textContent || '';
      const hasCheck = src.includes('window.self !== window.top')
                    || src.includes('self !== top');
      const hasClass = css.includes('.embedded') || css.includes('body.embedded');
      return { hasCheck, hasClass, pass: hasCheck && hasClass };
    });
    if (!result.checks.embedded_mode.pass) {
      result.warnings.push('Missing embedded mode detection or .embedded CSS');
    }

    // --- House style: credit line ---
    result.checks.credit = await page.evaluate(() => {
      const el = document.getElementById('credit');
      return el ? el.textContent.trim().substring(0, 80) : 'NONE';
    });
    if (result.checks.credit === 'NONE') {
      result.warnings.push('No #credit element found');
    }

    // --- Control checks ---
    for (const [name, selector] of Object.entries(extraChecks)) {
      const exists = await page.evaluate((sel) => !!document.querySelector(sel), selector);
      result.checks[`control_${name}`] = exists;
      if (!exists) {
        result.pass = false;
        result.errors.push(`Control "${name}" not found at "${selector}"`);
      }
    }

    // Standard controls
    for (const [name, id] of [['rotate', '#cb-rotate'], ['speed', '#speed-select'], ['day', '#cb-day']]) {
      const exists = await page.evaluate((sel) => !!document.querySelector(sel), id);
      result.checks[`std_${name}`] = exists;
      if (!exists) result.warnings.push(`Standard control "${name}" (${id}) not found`);
    }

    // Speed default
    result.checks.speed_default = await page.evaluate(() => {
      const sel = document.getElementById('speed-select');
      return sel ? sel.options[sel.selectedIndex]?.value : 'N/A';
    });
    if (result.checks.speed_default !== '0.5') {
      result.warnings.push(`Speed default "${result.checks.speed_default}", expected "0.5"`);
    }

    // --- Screenshot 2: after animation ---
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
      await dayCheckbox.click();
      await new Promise(r => setTimeout(r, 500));
    }

    // --- Extra toggle screenshots ---
    for (const [name, selector] of Object.entries(extraChecks)) {
      if (selector.startsWith('#cb-') && selector !== '#cb-rotate' && selector !== '#cb-day') {
        const el = await page.$(selector);
        if (el) {
          await el.click();
          await new Promise(r => setTimeout(r, 1000));
          const ssX = path.join(screenshotDir, `${slug}-${name}-toggled.png`);
          await page.screenshot({ path: ssX });
          result.screenshots.push(ssX);
          await el.click();
          await new Promise(r => setTimeout(r, 500));
        }
      }
    }

    if (result.errors.length > 0) result.pass = false;

  } catch (err) {
    result.pass = false;
    result.errors.push(`[fatal] ${err.message}`);
  } finally {
    if (browser) await browser.close();
  }
  return result;
}

// ============================================================
//  ARTICLE VERIFICATION
// ============================================================
async function verifyArticle(url, opts = {}) {
  const screenshotDir = opts.screenshots || '/tmp';
  const originalPath = opts.original;
  const waitMs = opts.wait || 3000;
  const slug = url.split('/').pop().replace('.html', '');

  const result = {
    pass: true, url, slug, mode: 'article',
    screenshots: [], checks: {}, errors: [], warnings: [],
  };

  let browser;
  try {
    const ctx = await launchAndNavigate(url, waitMs);
    browser = ctx.browser;
    const page = ctx.page;
    result.errors.push(...ctx.errors);

    // --- Screenshot ---
    const ss = path.join(screenshotDir, `${slug}-article.png`);
    await page.screenshot({ path: ss, fullPage: true });
    result.screenshots.push(ss);

    // --- iframe check ---
    result.checks.iframe = await page.evaluate(() => {
      const f = document.querySelector('iframe');
      if (!f) return { found: false };
      return {
        found: true,
        width: f.offsetWidth, height: f.offsetHeight,
        src: f.getAttribute('src') || f.src,
      };
    });
    if (!result.checks.iframe.found) {
      result.pass = false;
      result.errors.push('No iframe found in article');
    }

    // --- Swinburne chrome ---
    result.checks.chrome = await page.evaluate(() => {
      const header = !!document.querySelector('.swin-header, header, .article__header');
      const breadcrumb = !!document.querySelector('.breadcrumb, .article__breadcrumb');
      const title = document.querySelector('.article__title, h1')?.textContent?.trim() || 'NONE';
      return { header, breadcrumb, title };
    });

    // --- Lexicon links ---
    result.checks.lexicon_links = await page.evaluate(() => {
      const links = document.querySelectorAll('a.lexicon-term');
      return { count: links.length, samples: [...links].slice(0, 5).map(a => a.textContent) };
    });
    if (result.checks.lexicon_links.count === 0) {
      result.warnings.push('No lexicon-term links found');
    }

    // --- "data are" check ---
    result.checks.data_plural = await page.evaluate(() => {
      const text = document.body.innerText;
      const bad = (text.match(/\bdata\s+(is|was|has|shows|indicates|suggests|reveals)\b/gi) || []);
      const good = (text.match(/\bdata\s+(are|were|have|show|indicate|suggest|reveal)\b/gi) || []);
      return { bad: bad.length, good: good.length, badExamples: bad.slice(0, 3) };
    });
    if (result.checks.data_plural.bad > 0) {
      result.warnings.push(`"data" used as singular ${result.checks.data_plural.bad} time(s): ${result.checks.data_plural.badExamples.join(', ')}`);
    }

    // --- Text preservation diff (if original provided) ---
    if (originalPath && fs.existsSync(originalPath)) {
      const originalHTML = fs.readFileSync(originalPath, 'utf8');
      const newText = await page.evaluate(() => {
        // Get article body text (exclude iframe content)
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach(f => f.remove());
        const body = document.querySelector('.article__body, .field-item, main, article');
        return body ? body.innerText : document.body.innerText;
      });

      // Extract text from original HTML
      const origTextMatch = originalHTML.match(/<div[^>]*class="[^"]*field-item[^"]*"[^>]*>([\s\S]*?)<\/div>/);
      let origText = '';
      if (origTextMatch) {
        origText = origTextMatch[1].replace(/<[^>]+>/g, ' ').replace(/&[^;]+;/g, ' ')
          .replace(/\s+/g, ' ').trim();
      }

      const origWords = origText.split(/\s+/).filter(w => w.length > 0).length;
      const newWords = newText.split(/\s+/).filter(w => w.length > 0).length;
      const addedWords = Math.max(0, newWords - origWords);
      const ratio = origWords > 0 ? (addedWords / origWords) : 0;

      result.checks.preservation = {
        originalWords: origWords,
        newWords: newWords,
        addedWords: addedWords,
        ratio: Math.round(ratio * 100) + '%',
      };
      if (ratio > 0.15) {
        // Hard fail unless verifier confirms justified exceptions
        // (error corrections, updates to present day)
        result.pass = false;
        result.errors.push(`Article modification ratio ${result.checks.preservation.ratio} exceeds ~15% (original: ${origWords} words, new: ${newWords} words). FAIL unless verifier confirms changes are justified exceptions (error corrections, updates to present day).`);
      }
    } else if (originalPath) {
      result.warnings.push(`Original file not found: ${originalPath}`);
    }

    if (result.errors.length > 0) result.pass = false;

  } catch (err) {
    result.pass = false;
    result.errors.push(`[fatal] ${err.message}`);
  } finally {
    if (browser) await browser.close();
  }
  return result;
}

// ---- CLI entry point ----
(async () => {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error(`Usage:
  Interactive: node verify.js <url> [--screenshots <dir>] [--checks <json>] [--wait <ms>]
  Article:     node verify.js <url> --article [--original <path>] [--screenshots <dir>]`);
    process.exit(1);
  }

  const url = args[0];
  const opts = {};
  let isArticle = false;

  for (let i = 1; i < args.length; i++) {
    if (args[i] === '--article') { isArticle = true; continue; }
    if (args[i] === '--screenshots') { opts.screenshots = args[++i]; continue; }
    if (args[i] === '--checks') { opts.checks = JSON.parse(args[++i]); continue; }
    if (args[i] === '--wait') { opts.wait = parseInt(args[++i]); continue; }
    if (args[i] === '--original') { opts.original = args[++i]; continue; }
  }

  const result = isArticle
    ? await verifyArticle(url, opts)
    : await verifyInteractive(url, opts);

  console.log(JSON.stringify(result, null, 2));
  process.exit(result.pass ? 0 : 1);
})();
