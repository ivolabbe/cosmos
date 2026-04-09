#!/usr/bin/env node
// Copy the recommended image from a spec directory to images/.
//
// Usage: node dev/copy-recommended-image.js <slug>
//
// Reads caption files in .planning/content/specs/{slug}/, finds the one marked
// "Recommended: yes", copies that image to images/{slug}-{name}.{ext}
// Prints the destination path (for use by the writer/orchestrator).

const fs = require('fs');
const path = require('path');

const slug = process.argv[2];
if (!slug) {
  console.error('Usage: node dev/copy-recommended-image.js <slug>');
  process.exit(1);
}

const specDir = `.planning/content/specs/${slug}`;
if (!fs.existsSync(specDir)) {
  console.error(`Spec directory not found: ${specDir}`);
  process.exit(1);
}

const files = fs.readdirSync(specDir);
const captionFiles = files.filter(f => f.endsWith('-caption.md'));

let recommended = null;

for (const cf of captionFiles) {
  const content = fs.readFileSync(path.join(specDir, cf), 'utf8');
  if (/\*\*Recommended:\*\*\s*yes/i.test(content)) {
    // Derive image filename from caption filename: {name}-caption.md → {name}.{ext}
    const baseName = cf.replace('-caption.md', '');
    // Find the actual image file
    const imageFile = files.find(f => {
      const fBase = f.replace(/\.(jpg|jpeg|png|gif|svg|webp)$/i, '');
      return fBase === baseName && f !== cf;
    });
    if (imageFile) {
      recommended = { captionFile: cf, imageFile, baseName };
      break;
    }
  }
}

if (!recommended) {
  // Fallback: pick the first image that has a caption file
  for (const cf of captionFiles) {
    const baseName = cf.replace('-caption.md', '');
    const imageFile = files.find(f => {
      const fBase = f.replace(/\.(jpg|jpeg|png|gif|svg|webp)$/i, '');
      return fBase === baseName && f !== cf;
    });
    if (imageFile) {
      recommended = { captionFile: cf, imageFile, baseName };
      console.error(`WARN: No image marked Recommended: yes — using first available: ${imageFile}`);
      break;
    }
  }
}

if (!recommended) {
  console.error('No image with caption file found in spec directory');
  process.exit(1);
}

const ext = path.extname(recommended.imageFile);
const destName = `${slug}-${recommended.baseName}${ext}`;
const destPath = `images/${destName}`;

fs.copyFileSync(
  path.join(specDir, recommended.imageFile),
  destPath
);

console.log(destPath);
