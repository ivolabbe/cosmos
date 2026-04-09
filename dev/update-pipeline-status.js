#!/usr/bin/env node
// Update a single article's phase status in pipeline-status.md
//
// Usage:
//   node dev/update-pipeline-status.js <slug> <phase> <status>
//
// Examples:
//   node dev/update-pipeline-status.js solar-system phase-1-research done
//   node dev/update-pipeline-status.js blackbody phase-2-writing done
//   node dev/update-pipeline-status.js cepheid-variable phase-3-review approved
//
// Valid phases: phase-1-research, phase-2-writing, phase-3-review
// Valid statuses: -, in-progress, done, revision, approved

const fs = require('fs');

const [slug, phase, status] = process.argv.slice(2);

if (!slug || !phase || !status) {
  console.error('Usage: node dev/update-pipeline-status.js <slug> <phase> <status>');
  console.error('  Phases: phase-1-research, phase-2-writing, phase-3-review');
  console.error('  Statuses: -, in-progress, done, revision, approved');
  process.exit(1);
}

const phaseIdx = { 'phase-1-research': 3, 'phase-2-writing': 4, 'phase-3-review': 5 };
if (!(phase in phaseIdx)) {
  console.error(`Invalid phase: ${phase}. Use: ${Object.keys(phaseIdx).join(', ')}`);
  process.exit(1);
}

const validStatuses = ['-', 'in-progress', 'done', 'queued', 'revision', 'approved', 'skipped'];
if (!validStatuses.includes(status)) {
  console.error(`Invalid status: ${status}. Use: ${validStatuses.join(', ')}`);
  process.exit(1);
}

const filePath = '.planning/content/pipeline-status.md';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

let found = false;
for (let i = 0; i < lines.length; i++) {
  if (!lines[i].startsWith('|')) continue;

  // Split keeping empty columns
  const cols = lines[i].split('|').map(c => c.trim());
  // cols[0] = '', cols[1] = slug, cols[2] = title, cols[3] = tier, cols[4-6] = phases, cols[7] = notes

  if (cols[1] === slug) {
    const col = phaseIdx[phase] + 1; // +1 because cols[0] is empty
    cols[col] = ` ${status} `;
    lines[i] = cols.map((c, idx) => idx === 0 || idx === cols.length - 1 ? '' : ` ${c.trim()} `).join('|');
    // Reconstruct with leading/trailing pipes
    lines[i] = '|' + cols.slice(1, -1).map(c => ` ${c.trim()} `).join('|') + '|';
    found = true;
    console.log(`Updated ${slug}: ${phase} → ${status}`);
    break;
  }
}

if (!found) {
  console.error(`Slug "${slug}" not found in ${filePath}`);
  process.exit(1);
}

fs.writeFileSync(filePath, lines.join('\n'));
