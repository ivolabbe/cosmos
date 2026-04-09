#!/usr/bin/env node
/**
 * Render COSMOS agent diagrams to PNG in the house visual style.
 *
 * Run whenever the org chart or process changes:
 *   node .agents/code/render-diagrams.js
 *
 * Outputs:
 *   .agents/cosmos-organisation.png   — roles only (no flow)
 *   .agents/cosmos-process-flow.png   — interactive app pipeline
 *   .agents/cosmos-content-flow.png   — content pipeline
 */
'use strict';

const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..');
const DPR = 2;

// ── Helpers ─────────────────────────────────────
function canvas(w, h) {
  const c = createCanvas(w * DPR, h * DPR);
  const x = c.getContext('2d');
  x.scale(DPR, DPR); x._c = c; x._w = w; x._h = h;
  x.fillStyle = '#0a0a1e'; x.fillRect(0, 0, w, h);
  return x;
}

function save(x, name) {
  fs.writeFileSync(path.join(OUT, name), x._c.toBuffer('image/png'));
  console.log('  ' + name + ' (' + x._w + 'x' + x._h + ')');
}

function rr(x, bx, by, bw, bh, r, fill, stroke, lw) {
  x.beginPath();
  x.moveTo(bx+r,by); x.lineTo(bx+bw-r,by); x.quadraticCurveTo(bx+bw,by,bx+bw,by+r);
  x.lineTo(bx+bw,by+bh-r); x.quadraticCurveTo(bx+bw,by+bh,bx+bw-r,by+bh);
  x.lineTo(bx+r,by+bh); x.quadraticCurveTo(bx,by+bh,bx,by+bh-r);
  x.lineTo(bx,by+r); x.quadraticCurveTo(bx,by,bx+r,by); x.closePath();
  if (fill) { x.fillStyle = fill; x.fill(); }
  if (stroke) { x.strokeStyle = stroke; x.lineWidth = lw || 2; x.stroke(); }
}

function arrow(x, x1, y1, x2, y2, opts) {
  const c = (opts && opts.color) || '#4a8a4a';
  const d = opts && opts.dash;
  const lw = (opts && opts.lw) || 2;
  x.strokeStyle = c; x.lineWidth = lw;
  x.setLineDash(d ? [6, 4] : []);
  x.beginPath(); x.moveTo(x1, y1); x.lineTo(x2, y2); x.stroke();
  const a = Math.atan2(y2-y1, x2-x1), s = 8;
  x.fillStyle = c; x.beginPath();
  x.moveTo(x2, y2);
  x.lineTo(x2 - s*Math.cos(a-0.35), y2 - s*Math.sin(a-0.35));
  x.lineTo(x2 - s*Math.cos(a+0.35), y2 - s*Math.sin(a+0.35));
  x.fill(); x.setLineDash([]);
}

function t(x, s, tx, ty, sz, col, align, bold) {
  x.font = (bold ? 'bold ' : '') + sz + 'px "Helvetica Neue", Arial, sans-serif';
  x.fillStyle = col || '#fff'; x.textAlign = align || 'center'; x.textBaseline = 'middle';
  x.fillText(s, tx, ty);
}

// Agent box — matching the original style
function agentBox(x, bx, by, bw, bh, fill, border, label, sub) {
  rr(x, bx, by, bw, bh, 8, fill, border || fill);
  t(x, label, bx+bw/2, by + (sub ? bh/2 - 9 : bh/2), 15, '#fff', 'center', true);
  if (sub) t(x, sub, bx+bw/2, by + bh/2 + 11, 11, 'rgba(255,255,255,0.55)', 'center', false);
}

function phaseLabel(x, label, y) {
  t(x, label, 90, y, 14, 'rgba(180,180,220,0.55)', 'center', false);
}

function outputLabel(x, label, ox, oy) {
  t(x, '→  ' + label, ox, oy, 12, 'rgba(255,255,255,0.4)', 'left');
}

// ═══════════════════════════════════════════════
// INTERACTIVE PROCESS FLOW
// ═══════════════════════════════════════════════
function renderProcessFlow() {
  const W = 1100, H = 950;
  const x = canvas(W, H);

  t(x, 'COSMOS Interactive — Process Flow (per app)', W/2, 35, 22, '#fff', 'center', true);

  // Orchestrator at top
  agentBox(x, 300, 65, 300, 55, '#1a3a4a', '#2a5a6a', 'ORCHESTRATOR', 'phase tracker · dispatcher · knowledge mgr');

  // Pipeline modes (top right)
  t(x, 'Modes:', 790, 68, 11, 'rgba(255,255,255,0.5)', 'right');
  rr(x, 800, 58, 80, 22, 4, '#6a3030'); t(x, 'Fresh', 840, 69, 10, '#fff');
  rr(x, 890, 58, 80, 22, 4, '#6a6a20'); t(x, 'Iterate', 930, 69, 10, '#fff');
  rr(x, 980, 58, 80, 22, 4, '#4a2020'); t(x, 'Do-Over', 1020, 69, 10, '#fff');

  // SPEC artifact
  rr(x, 830, 230, 150, 55, 6, null, '#aaaa40', 2);
  x.setLineDash([6, 4]); x.strokeStyle = '#aaaa40'; x.lineWidth = 2;
  x.beginPath();
  x.moveTo(836, 230); x.lineTo(974, 230); x.lineTo(974, 285); x.lineTo(836, 285); x.closePath();
  x.stroke(); x.setLineDash([]);
  t(x, 'SPEC', 905, 250, 14, '#dddd60', 'center', true);
  t(x, '(central artifact)', 905, 270, 11, '#aaaa40');

  // Phase 1
  const p1 = 225;
  phaseLabel(x, 'Phase 1', p1 + 27);
  agentBox(x, 160, p1, 260, 55, '#2d6a2e', '#3a8a3a', 'RESEARCHER', 'science + reference code');
  arrow(x, 420, p1+27, 450, p1+27, { color: '#4a8a4a' });
  outputLabel(x, 'spec.md', 650, p1+27);
  // Arrow to spec
  arrow(x, 650, p1+27, 830, p1+27, { color: '#aaaa40', dash: true });

  // Phase 2
  const p2 = 360;
  phaseLabel(x, 'Phase 2', p2 + 27);
  agentBox(x, 160, p2, 260, 55, '#6a5a20', '#8a7a30', 'WRITER', 'article + iframe');
  arrow(x, 420, p2+27, 500, p2+27, { color: '#e08030' });
  agentBox(x, 500, p2, 200, 55, '#cc3030', '#dd4040', 'VERIFIER', 'article preservation');
  outputLabel(x, 'article.html', 750, p2+27);
  // Fail feedback
  arrow(x, 500, p2+55, 380, p2+65, { color: '#cc5030', dash: true });
  t(x, 'feedback (max 3×)', 450, p2+72, 10, 'rgba(255,180,150,0.6)');

  // Phase 3
  const p3 = 500;
  phaseLabel(x, 'Phase 3', p3 + 27);
  agentBox(x, 160, p3, 260, 55, '#2d5a6e', '#3a7a8e', 'CODER', 'Three.js build');
  arrow(x, 420, p3+27, 500, p3+27, { color: '#e08030' });
  agentBox(x, 500, p3, 200, 55, '#cc3030', '#dd4040', 'VERIFIER', 'physics + visual QA');
  // Visual sub-agent
  arrow(x, 700, p3+27, 780, p3+27, { color: '#8a6aaa', dash: true });
  t(x, 'dispatches', 740, p3+12, 10, 'rgba(200,180,240,0.6)');
  agentBox(x, 780, p3-3, 150, 60, '#6b4a8a', '#8b6aaa', 'VISUAL', 'sub-agent');
  outputLabel(x, 'interactive.html', 780, p3+72);
  // Fail feedback
  arrow(x, 500, p3+55, 380, p3+65, { color: '#cc5030', dash: true });
  t(x, 'feedback (max 3×)', 450, p3+72, 10, 'rgba(255,180,150,0.6)');

  // Dispatch arrows from orchestrator down to each phase
  arrow(x, 370, 120, 290, p1, { color: 'rgba(100,150,200,0.35)', lw: 1 });
  arrow(x, 420, 120, 290, p2, { color: 'rgba(100,150,200,0.35)', lw: 1 });
  arrow(x, 480, 120, 290, p3, { color: 'rgba(100,150,200,0.35)', lw: 1 });

  // Phase 4
  const p4 = 650;
  phaseLabel(x, 'Phase 4', p4 + 27);
  arrow(x, 290, p3+55, 290, p4, { color: '#5aaa5a' });
  agentBox(x, 160, p4, 400, 55, '#2a5a2a', '#3a7a3a', 'DONE', 'learnings · commit · status update');

  // Feedback loop
  const fy = p4 + 85;
  rr(x, 130, fy, 830, 80, 8, 'rgba(40,40,70,0.4)', 'rgba(70,70,110,0.35)');
  t(x, 'Feedback Loop (closed)', 545, fy+18, 13, 'rgba(170,170,220,0.6)', 'center', true);
  t(x, 'Collect agent reports  →  Distill patterns  →  Update agent defs · style guide · process rules', 545, fy+48, 11, 'rgba(160,160,210,0.6)');
  // Arrows back up
  arrow(x, 250, fy, 250, p1+55, { color: 'rgba(120,120,200,0.25)', dash: true, lw: 1 });
  arrow(x, 650, fy, 650, p3+55, { color: 'rgba(120,120,200,0.25)', dash: true, lw: 1 });
  t(x, 'improved instructions', 250, p1+70, 9, 'rgba(140,140,210,0.5)');
  t(x, 'updated patterns', 650, p3+85, 9, 'rgba(140,140,210,0.5)');

  // Alt modes
  const my = 835;
  t(x, 'Alternative Modes', 200, my, 14, 'rgba(255,255,255,0.5)', 'center', true);
  agentBox(x, 160, my+15, 250, 35, '#5a5a18', '#7a7a28', 'ITERATION MODE');
  t(x, '→ Updated spec, coder modifies existing file', 430, my+25, 11, 'rgba(255,255,255,0.5)', 'left');
  t(x, '→ "What to keep / what to change" sections', 430, my+40, 11, 'rgba(255,255,255,0.5)', 'left');
  agentBox(x, 160, my+60, 250, 35, '#5a2020', '#7a3030', 'DO-OVER MODE');
  t(x, '→ Archive existing → fresh spec with lessons', 430, my+70, 11, 'rgba(255,255,255,0.5)', 'left');
  t(x, '→ Coder starts from template, NOT archived file', 430, my+85, 11, 'rgba(255,255,255,0.5)', 'left');

  // Hard gates
  rr(x, 50, H-45, W-100, 32, 4, 'rgba(100,30,30,0.25)', 'rgba(140,50,50,0.35)');
  t(x, 'HARD GATES:  No coder self-verification  ·  Screenshots required  ·  No skipping phases  ·  Coder ≠ Verifier', W/2, H-29, 11, 'rgba(255,190,190,0.55)');

  save(x, 'cosmos-process-flow.png');
}

// ═══════════════════════════════════════════════
// CONTENT FLOW
// ═══════════════════════════════════════════════
function renderContentFlow() {
  const W = 1000, H = 800;
  const x = canvas(W, H);
  t(x, 'COSMOS Content — Process Flow', W/2, 35, 22, '#fff', 'center', true);

  // Orchestrator
  agentBox(x, 250, 60, 300, 50, '#1a3a4a', '#2a5a6a', 'ORCHESTRATOR', 'audit · SEO · learns');

  const p1 = 140;
  phaseLabel(x, 'Phase 1', p1+27);
  agentBox(x, 160, p1, 260, 55, '#2d5a6e', '#3a7a8e', 'AUDITOR', 'scores · gaps · priorities');
  outputLabel(x, 'audit report', 460, p1+27);

  const p2 = 270;
  phaseLabel(x, 'Phase 2', p2+27);
  agentBox(x, 160, p2, 260, 55, '#6a5a20', '#8a7a30', 'WRITER', 'edit · write · SEO');
  outputLabel(x, 'articles/', 460, p2+27);
  // Interactive coordination
  agentBox(x, 650, p2-20, 200, 45, '#3a3a5a', '#5a5a7a', 'Interactive Team');
  arrow(x, 650, p2, 420, p2+20, { color: 'rgba(100,100,180,0.35)', dash: true, lw: 1 });
  t(x, 'app recommendations ↔ delivered apps', 650, p2+40, 9, 'rgba(150,150,200,0.5)');

  const p3 = 410;
  phaseLabel(x, 'Phase 3', p3+27);
  agentBox(x, 160, p3, 260, 55, '#cc3030', '#dd4040', 'REVIEWER', 'grammar · voice · facts');
  arrow(x, 290, p3, 290, p2+55, { color: '#cc5030', dash: true });
  t(x, 'fail → feedback (max 3)', 340, p2+80, 10, 'rgba(255,180,150,0.4)', 'left');

  // Dispatch arrows from orchestrator
  arrow(x, 350, 110, 290, p1, { color: 'rgba(100,150,200,0.35)', lw: 1 });
  arrow(x, 400, 110, 290, p2, { color: 'rgba(100,150,200,0.35)', lw: 1 });
  arrow(x, 450, 110, 290, p3, { color: 'rgba(100,150,200,0.35)', lw: 1 });

  const p4 = 530;
  phaseLabel(x, 'Phase 4', p4+27);
  arrow(x, 290, p3+55, 290, p4, { color: '#5aaa5a' });
  agentBox(x, 160, p4, 400, 55, '#2a5a2a', '#3a7a3a', 'DONE', 'commit · track metrics');

  const fy = p4+80;
  rr(x, 130, fy, 730, 70, 8, 'rgba(40,40,70,0.4)', 'rgba(70,70,110,0.35)');
  t(x, 'Feedback Loop', 495, fy+15, 13, 'rgba(170,170,220,0.6)', 'center', true);
  t(x, 'Collect → Update style guide · SEO targets · agent defs → Next audit uses improved criteria', 495, fy+42, 10, 'rgba(160,160,210,0.6)');
  arrow(x, 250, fy, 250, p1+55, { color: 'rgba(120,120,200,0.25)', dash: true, lw: 1 });

  rr(x, 50, H-42, W-100, 30, 4, 'rgba(100,30,30,0.25)', 'rgba(140,50,50,0.35)');
  t(x, 'HARD GATES:  No publish without reviewer  ·  Preserve originals  ·  SEO validation required  ·  Data are plural', W/2, H-27, 11, 'rgba(255,190,190,0.55)');

  save(x, 'cosmos-content-flow.png');
}

// ═══════════════════════════════════════════════
// ORGANISATION (structure only, no flow)
// ═══════════════════════════════════════════════
function renderOrg() {
  const W = 1000, H = 580;
  const x = canvas(W, H);
  t(x, 'COSMOS — Agent Organisation', W/2, 35, 22, '#fff', 'center', true);

  // Interactive Team box
  rr(x, 40, 80, 430, 290, 10, 'rgba(40,70,50,0.2)', 'rgba(80,130,90,0.3)');
  t(x, 'Interactive Team', 255, 97, 15, 'rgba(130,200,140,0.7)', 'center', true);

  agentBox(x, 140, 115, 230, 50, '#1a3a4a', '#2a5a6a', 'ORCHESTRATOR', 'dispatches · tracks · learns');
  agentBox(x, 55, 190, 160, 42, '#2d6a2e', '#3a8a3a', 'RESEARCHER', 'science · spec');
  agentBox(x, 55, 245, 160, 42, '#2d5a6e', '#3a7a8e', 'CODER', 'builds HTML');
  agentBox(x, 255, 190, 160, 42, '#cc3030', '#dd4040', 'VERIFIER', 'Puppeteer · QA');
  agentBox(x, 255, 245, 160, 42, '#6b4a8a', '#8b6aaa', 'VISUAL', 'sub-agent');
  agentBox(x, 55, 305, 160, 42, '#6a5a20', '#8a7a30', 'WRITER', 'shared agent');

  // Content Team box
  rr(x, 530, 80, 430, 290, 10, 'rgba(40,40,70,0.2)', 'rgba(80,80,130,0.3)');
  t(x, 'Content Team', 745, 97, 15, 'rgba(130,130,200,0.7)', 'center', true);

  agentBox(x, 630, 115, 230, 50, '#1a3a4a', '#2a5a6a', 'ORCHESTRATOR', 'audit · SEO · learns');
  agentBox(x, 560, 195, 160, 42, '#2d5a6e', '#3a7a8e', 'AUDITOR', 'scores · gaps');
  agentBox(x, 760, 195, 160, 42, '#cc3030', '#dd4040', 'REVIEWER', 'voice · facts');
  agentBox(x, 560, 255, 160, 42, '#6a5a20', '#8a7a30', 'WRITER', 'shared agent');

  // Responsibilities
  const ry = 415;
  t(x, 'Roles & Responsibilities', W/2, ry, 14, 'rgba(255,255,255,0.6)', 'center', true);
  const roles = [
    ['Orchestrator', 'Dispatch agents, track phases, collect learnings, update agent definitions & style guide'],
    ['Researcher',   'Science facts, visual references, implementation plan → spec.md'],
    ['Writer',       'Article content, embeds, captions — shared between both teams'],
    ['Coder',        'Build interactive HTML from spec, iterate on verifier feedback'],
    ['Verifier',     'Browser testing via Puppeteer, physics + visual QA, article preservation'],
    ['Auditor',      'Score articles, identify quality & SEO gaps, prioritise work batches'],
    ['Reviewer',     'Grammar, voice consistency, factual accuracy — final content gate'],
    ['Visual',       'Sub-agent: screenshot comparison, style guide compliance check'],
  ];
  roles.forEach(function(r, i) {
    const y = ry + 22 + i * 18;
    t(x, r[0], 210, y, 11, 'rgba(255,255,255,0.65)', 'right', true);
    t(x, r[1], 225, y, 10, 'rgba(255,255,255,0.5)', 'left');
  });

  save(x, 'cosmos-organisation.png');
}

// ── Run ──
console.log('Rendering diagrams...');
renderOrg();
renderProcessFlow();
renderContentFlow();
console.log('Done.');
