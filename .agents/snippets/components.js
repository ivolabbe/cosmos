// ====================================================================
//  SAO COSMOS — Reusable Scene Components
//  Copy individual functions into any interactive as needed.
//  Each component is self-contained: just call the function.
// ====================================================================


// ====================================================================
//  SPHERICAL BODY (planet, moon, neutron star, any solid sphere)
//
//  Usage:
//    const earth = makeBody({ radius: 1, segments: 128, texture: 'path.jpg' });
//    scene.add(earth.group);
//
//  For textured bodies: pass texture path.
//  For flat-colour bodies: pass color hex.
//  For self-luminous: pass color + emissive: true.
//  Tilt: set group.rotation.z = THREE.MathUtils.degToRad(tilt).
// ====================================================================

function makeBody(opts) {
  const {
    radius = 1,
    segments = 64,        // 128 for hero objects, 32 for background
    color = 0xcccccc,     // fallback flat colour
    texture = null,       // texture path (overrides color)
    roughness = 0.9,      // 0.0 = mirror, 1.0 = matte
    metalness = 0.0,
    emissive = false,     // true for self-luminous (stars, hot bodies)
    tilt = 0,             // axial tilt in degrees
  } = opts;

  const group = new THREE.Group();
  if (tilt) group.rotation.z = THREE.MathUtils.degToRad(tilt);

  let material;
  if (emissive) {
    material = new THREE.MeshBasicMaterial({ color });
  } else if (texture) {
    const tex = new THREE.TextureLoader().load(texture);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 16; // will be clamped to renderer max
    material = new THREE.MeshStandardMaterial({ map: tex, roughness, metalness });
  } else {
    material = new THREE.MeshStandardMaterial({ color, roughness, metalness });
  }

  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(radius, segments, segments / 2),
    material
  );
  group.add(mesh);

  return { group, mesh, material };
}


// ====================================================================
//  GLOW HALO (BackSide shells for auras around spherical bodies)
//
//  Usage:
//    addGlow(group, { innerR: 1, layers: [
//      { r: 1.15, color: 0x8899cc, opacity: 0.25 },
//      { r: 1.5,  color: 0x4455aa, opacity: 0.08 },
//    ]});
//
//  Rules:
//    - Each layer: ~0.3–0.5× the opacity of the previous
//    - Colour shifts cooler/dimmer with each layer
//    - Bloom amplifies naturally — no extra shader needed
//    - For Sun-like glow: fewer layers, brighter, same hue
//    - For subtle atmosphere hint: 1 layer at ~0.1 opacity
// ====================================================================

function addGlow(parent, opts) {
  const { layers = [] } = opts;
  layers.forEach(({ r, color, opacity }) => {
    parent.add(new THREE.Mesh(
      new THREE.SphereGeometry(r, 32, 32),
      new THREE.MeshBasicMaterial({
        color, transparent: true, opacity,
        side: THREE.BackSide,
      })
    ));
  });
}


// ====================================================================
//  ORBIT RING (elliptical orbit path for any body)
//
//  Usage:
//    const ring = makeOrbitRing({ a: 5.2, e: 0.049, color: 0xeebb88 });
//    scene.add(ring);
//
//  Uses plain THREE.Line — 1px on screen but additive blending makes
//  it glow naturally where lines overlap. Clean, no artifacts at any zoom.
//
//  DO NOT stack THREE.Line copies at Y offsets for thickness — they
//  separate at close zoom and collapse at far zoom.
//
//  For additive-glow orbits (the default for space scenes):
//    pass additive: true (default), and tune opacity.
// ====================================================================

function makeOrbitRing(opts) {
  const {
    a = 1,                // semi-major axis
    e = 0,                // eccentricity
    color = 0xffffff,
    opacity = 0.35,
    segments = 128,       // points around the ellipse
    additive = true,      // AdditiveBlending for glow (default for space)
    yOffset = 0,          // vertical offset of the entire ring
  } = opts;

  const mat = new THREE.LineBasicMaterial({
    color, transparent: true, opacity,
    blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
    depthWrite: additive ? false : true,
  });

  const pts = [];
  for (let i = 0; i <= segments; i++) {
    const M = (i / segments) * Math.PI * 2;
    let E = M;
    for (let j = 0; j < 8; j++) E -= (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
    const x = a * (Math.cos(E) - e);
    const z = -a * Math.sqrt(1 - e * e) * Math.sin(E);
    pts.push(new THREE.Vector3(x, yOffset, z));
  }
  return new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat);
}


// ====================================================================
//  ARC / GREAT CIRCLE (for coordinate systems, meridians, equators)
//
//  Usage:
//    const arc = makeArc({
//      radius: 2, normal: new THREE.Vector3(0,1,0),
//      startAngle: 0, endAngle: Math.PI,
//      color: 0xff4422, dashed: true
//    });
//    scene.add(arc);
// ====================================================================

function makeArc(opts) {
  const {
    center = new THREE.Vector3(0, 0, 0),
    radius = 1,
    normal = new THREE.Vector3(0, 1, 0),
    startAngle = 0,
    endAngle = Math.PI * 2,
    segments = 64,
    color = 0xffffff,
    opacity = 0.5,
    dashed = false,
    dashSize = 0.12,
    gapSize = 0.06,
  } = opts;

  const axis1 = new THREE.Vector3();
  const axis2 = new THREE.Vector3();
  if (Math.abs(normal.x) < 0.9) axis1.crossVectors(normal, new THREE.Vector3(1, 0, 0)).normalize();
  else axis1.crossVectors(normal, new THREE.Vector3(0, 1, 0)).normalize();
  axis2.crossVectors(normal, axis1).normalize();

  const pts = [];
  for (let i = 0; i <= segments; i++) {
    const a = startAngle + (endAngle - startAngle) * i / segments;
    pts.push(new THREE.Vector3()
      .addScaledVector(axis1, Math.cos(a) * radius)
      .addScaledVector(axis2, Math.sin(a) * radius)
      .add(center));
  }

  const geo = new THREE.BufferGeometry().setFromPoints(pts);
  const mat = dashed
    ? new THREE.LineDashedMaterial({ color, transparent: true, opacity, dashSize, gapSize })
    : new THREE.LineBasicMaterial({ color, transparent: true, opacity });

  const line = new THREE.Line(geo, mat);
  if (dashed) line.computeLineDistances();
  return line;
}


// ====================================================================
//  CSS2D LABEL (hoverable text label in 3D space)
//
//  Usage:
//    const label = makeLabel('Jupiter', pos, '#eebb88',
//      'The largest planet. 318 Earth masses.');
//    labelGroup.add(label);
//
//  Requires CSS2DRenderer to be set up.
//  Labels are pointer-events:auto for hover tooltips.
//  Font: 11px weight 600, black text-shadow for readability.
// ====================================================================

function makeLabel(text, position, color, description, tooltipEl) {
  const div = document.createElement('div');
  div.textContent = text;
  div.style.cssText = `
    color: ${color}; font-size: 11px; font-weight: 600;
    font-family: "Open Sans", sans-serif;
    text-shadow: 0 0 8px rgba(0,0,0,1), 0 0 3px rgba(0,0,0,1);
    pointer-events: auto; cursor: default; padding: 2px 4px;
  `;

  if (description && tooltipEl) {
    div.addEventListener('mouseenter', ev => {
      tooltipEl.innerHTML = `<strong>${text}</strong><br>${description}`;
      tooltipEl.style.display = 'block';
      tooltipEl.style.left = (ev.clientX + 14) + 'px';
      tooltipEl.style.top = (ev.clientY - 10) + 'px';
    });
    div.addEventListener('mousemove', ev => {
      tooltipEl.style.left = (ev.clientX + 14) + 'px';
      tooltipEl.style.top = (ev.clientY - 10) + 'px';
    });
    div.addEventListener('mouseleave', () => {
      tooltipEl.style.display = 'none';
    });
  }

  const label = new CSS2DObject(div);
  label.position.set(position.x || 0, position.y || 0, position.z || 0);
  return label;
}


// ====================================================================
//  DISTANCE SCALE BAR (HTML overlay — fixed screen X, projected Y)
//
//  The scale is an HTML overlay, NOT 3D geometry. It sits at a fixed
//  screen X position (left side) and tracks zoom via camera FOV projection,
//  but does NOT rotate or tilt with the scene.
//
//  Structure:
//    - Container div (position:absolute, pointer-events:none)
//    - Canvas for vertical line + tick marks
//    - Label elements for each AU value (+ optional light-minute labels)
//
//  Key formula:
//    pxPerAU = innerHeight / (2 * tan(fov/2) * cameraDistance)
//    labelY = centreY - au * pxPerAU
//
//  Call updateScale() every frame in the animation loop.
//  See asteroid-interactive.html for the full reference implementation
//  with AU + light-minute labels and adaptive embed/fullscreen sizing.
// ====================================================================


// ====================================================================
//  2D CHART HELPER (Canvas 2D drawing utilities)
//
//  Usage:
//    const chart = new ChartHelper(canvasEl, { l: 28, r: 4, t: 4, b: 30 });
//    chart.clear();
//    chart.drawGrid(xTicks, yTicks);
//    chart.drawCurve(data, '#ffdd66', 1.5);
//    chart.drawPlayhead(phase);
// ====================================================================

class ChartHelper {
  constructor(canvas, padding) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.pad = padding; // { l, r, t, b }
    this.w = canvas.width;
    this.h = canvas.height;
    this.plotW = this.w - padding.l - padding.r;
    this.plotH = this.h - padding.t - padding.b;
  }

  // Map data coordinates to pixel coordinates
  mapX(val, min, max) { return this.pad.l + (val - min) / (max - min) * this.plotW; }
  mapY(val, min, max) { return this.pad.t + this.plotH - (val - min) / (max - min) * this.plotH; }

  // Clear with standard background
  clear() {
    this.ctx.fillStyle = 'rgba(6,6,30,1)';
    this.ctx.fillRect(0, 0, this.w, this.h);
  }

  // Draw grid lines
  drawGrid(xTicks, yTicks, xMin, xMax, yMin, yMax) {
    const ctx = this.ctx;
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 0.5;
    xTicks.forEach(x => {
      const px = this.mapX(x, xMin, xMax);
      ctx.beginPath(); ctx.moveTo(px, this.pad.t); ctx.lineTo(px, this.pad.t + this.plotH); ctx.stroke();
    });
    yTicks.forEach(y => {
      const py = this.mapY(y, yMin, yMax);
      ctx.beginPath(); ctx.moveTo(this.pad.l, py); ctx.lineTo(this.pad.l + this.plotW, py); ctx.stroke();
    });
  }

  // Draw axis labels
  drawAxisLabels(xTicks, yTicks, xMin, xMax, yMin, yMax, xFmt, yFmt) {
    const ctx = this.ctx;
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = '11px "Open Sans", sans-serif';
    ctx.textAlign = 'center';
    xTicks.forEach(x => {
      ctx.fillText(xFmt ? xFmt(x) : x, this.mapX(x, xMin, xMax), this.h - this.pad.b + 14);
    });
    ctx.textAlign = 'right';
    yTicks.forEach(y => {
      ctx.fillText(yFmt ? yFmt(y) : y, this.pad.l - 4, this.mapY(y, yMin, yMax) + 4);
    });
  }

  // Draw a data curve (array of {x, y})
  drawCurve(data, color, lineWidth, xMin, xMax, yMin, yMax) {
    const ctx = this.ctx;
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    data.forEach((d, i) => {
      const px = this.mapX(d.x, xMin, xMax);
      const py = this.mapY(d.y, yMin, yMax);
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    });
    ctx.stroke();
  }

  // Draw glow-then-sharp curve (neon tube effect)
  drawGlowCurve(data, color, glowColor, xMin, xMax, yMin, yMax) {
    this.drawCurve(data, glowColor, 5, xMin, xMax, yMin, yMax);
    this.drawCurve(data, color, 1.5, xMin, xMax, yMin, yMax);
  }

  // Draw fill under a curve
  drawFill(data, fillColor, xMin, xMax, yMin, yMax) {
    const ctx = this.ctx;
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    const baseY = this.mapY(yMin, yMin, yMax);
    data.forEach((d, i) => {
      const px = this.mapX(d.x, xMin, xMax);
      const py = this.mapY(d.y, yMin, yMax);
      i === 0 ? ctx.moveTo(px, baseY) : ctx.lineTo(px, py);
    });
    if (data.length) {
      ctx.lineTo(this.mapX(data[data.length - 1].x, xMin, xMax), baseY);
    }
    ctx.closePath();
    ctx.fill();
  }

  // Draw playhead / phase marker (Swinburne red)
  drawPlayhead(x, xMin, xMax) {
    const ctx = this.ctx;
    const px = this.mapX(x, xMin, xMax);
    ctx.strokeStyle = 'rgba(220,45,39,0.8)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(px, this.pad.t);
    ctx.lineTo(px, this.pad.t + this.plotH);
    ctx.stroke();
  }

  // Draw border
  drawBorder() {
    const ctx = this.ctx;
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(this.pad.l, this.pad.t, this.plotW, this.plotH);
  }

  // Draw legend
  drawLegend(items, x, y) {
    const ctx = this.ctx;
    ctx.font = '14px "Open Sans", sans-serif';
    items.forEach((item, i) => {
      const iy = y + i * 18;
      ctx.strokeStyle = item.color;
      ctx.lineWidth = item.dash ? 2.5 : 3;
      if (item.dash) ctx.setLineDash(item.dash);
      ctx.beginPath(); ctx.moveTo(x, iy); ctx.lineTo(x + 16, iy); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = item.color;
      ctx.textAlign = 'left';
      ctx.fillText(item.label, x + 20, iy + 4);
    });
  }
}


// ====================================================================
//  KEPLER SOLVER (universal, for any orbit)
//
//  Usage:
//    const E = solveKepler(M, e);
//    const [x, z] = orbitXZ(a, e, period, time);
// ====================================================================

function solveKepler(M, e) {
  let E = M;
  for (let i = 0; i < 10; i++) E -= (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
  return E;
}

function orbitXZ(a, e, period, time) {
  const M = (2 * Math.PI / period) * time;
  const E = solveKepler(M, e);
  return [a * (Math.cos(E) - e), -a * Math.sqrt(1 - e * e) * Math.sin(E)];
}

// With inclination and argument of periapsis:
function orbitXYZ(a, e, period, time, incl, omega) {
  const M = (2 * Math.PI / period) * time;
  const E = solveKepler(M, e);
  const xO = a * (Math.cos(E) - e);
  const yO = a * Math.sqrt(1 - e * e) * Math.sin(E);
  const co = Math.cos(omega), so = Math.sin(omega);
  const ci = Math.cos(incl), si = Math.sin(incl);
  return [co * xO - so * yO, (so * xO + co * yO) * si, -(so * xO + co * yO) * ci];
}
