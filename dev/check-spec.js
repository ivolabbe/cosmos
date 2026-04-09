#!/usr/bin/env node
// Pre-flight check for a research spec. Catches mechanical issues before
// dispatching the (expensive) verifier agent.
//
// Usage: node dev/check-spec.js <slug>
//
// Checks:
//   1. Spec file exists and has STATUS: COMPLETE
//   2. Required sections present (Definition, Full Content, Key Numbers, Category)
//   3. All images in spec dir are real image files (not HTML)
//   4. Each image has a companion caption file
//   5. At least 1 image marked Recommended: yes
//
// Exits 0 if all pass, 1 if any fail. Prints failures to stderr.

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const slug = process.argv[2];
if (!slug) {
  console.error('Usage: node dev/check-spec.js <slug>');
  process.exit(1);
}

const specDir = `.planning/content/specs/${slug}`;
const specFile = `${specDir}/${slug}-spec.md`;
let failures = 0;

function fail(msg) {
  console.error(`  FAIL: ${msg}`);
  failures++;
}

function pass(msg) {
  console.log(`  OK: ${msg}`);
}

console.log(`Checking spec: ${slug}`);

// 1. Spec file exists
if (!fs.existsSync(specFile)) {
  fail(`Spec file not found: ${specFile}`);
  process.exit(1);
}

const content = fs.readFileSync(specFile, 'utf8');

// 2. STATUS: COMPLETE
if (content.includes('STATUS: COMPLETE')) {
  pass('STATUS: COMPLETE');
} else if (content.includes('STATUS: IN-PROGRESS')) {
  const milestoneMatch = content.match(/milestone:\s*(\d+)/);
  fail(`Research incomplete — stuck at milestone ${milestoneMatch ? milestoneMatch[1] : '?'}`);
} else {
  fail('No STATUS marker found');
}

// 3. Required sections
const requiredSections = ['## Category', '## Definition', '## Full Content', '## Key Numbers'];
for (const section of requiredSections) {
  if (content.includes(section)) {
    // Check it's not just "(pending)"
    const idx = content.indexOf(section);
    const afterSection = content.substring(idx + section.length, idx + section.length + 50);
    if (afterSection.includes('(pending)')) {
      fail(`${section} is still (pending)`);
    } else {
      pass(section);
    }
  } else {
    fail(`Missing section: ${section}`);
  }
}

// 4. Image files are real images
const files = fs.readdirSync(specDir);
const imageFiles = files.filter(f => /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(f));

if (imageFiles.length === 0) {
  fail('No image files found in spec directory');
} else {
  for (const img of imageFiles) {
    const imgPath = path.join(specDir, img);
    try {
      const fileType = execSync(`file "${imgPath}"`, { encoding: 'utf8' });
      if (fileType.includes('HTML') || fileType.includes('text')) {
        fail(`${img} is HTML, not an image`);
      } else {
        pass(`${img} — valid image`);
      }
    } catch (e) {
      fail(`Could not check ${img}: ${e.message}`);
    }
  }
}

// 5. Caption files exist for each image
for (const img of imageFiles) {
  const baseName = img.replace(/\.(jpg|jpeg|png|gif|svg|webp)$/i, '');
  const captionFile = path.join(specDir, `${baseName}-caption.md`);
  if (fs.existsSync(captionFile)) {
    pass(`${baseName}-caption.md exists`);
  } else {
    fail(`Missing caption file: ${baseName}-caption.md`);
  }
}

// 6. At least one recommended image
let hasRecommended = false;
const captionFiles = files.filter(f => f.endsWith('-caption.md'));
for (const cf of captionFiles) {
  const captionContent = fs.readFileSync(path.join(specDir, cf), 'utf8');
  if (/\*\*Recommended:\*\*\s*yes/i.test(captionContent)) {
    hasRecommended = true;
    break;
  }
}
if (hasRecommended) {
  pass('At least one image marked Recommended: yes');
} else if (captionFiles.length > 0) {
  fail('No image marked Recommended: yes in caption files');
}

// Summary
console.log(`\n${failures === 0 ? 'ALL CHECKS PASSED' : `${failures} FAILURE(S)`}`);
process.exit(failures > 0 ? 1 : 0);
