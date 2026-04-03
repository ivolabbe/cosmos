/**
 * Artemis II Trajectory Generator — Free-Return Figure-8
 *
 * Generates a visually correct free-return lunar flyby trajectory.
 * The path forms a figure-8: outbound on one side, loop behind Moon,
 * return on the other side — creating clear visual separation.
 *
 * Coordinate system: Earth-centered J2000 equatorial (ECI)
 *   X → vernal equinox, Z → north celestial pole
 *   Units: km, km/s, ms epoch
 */

'use strict';
const fs = require('fs');
const path = require('path');

// ── Constants ──
const R_EARTH  = 6371.0;
const R_MOON   = 1737.4;
const MOON_DIST = 384400.0;

const LAUNCH_ISO = '2026-04-01T22:35:00Z';
const LAUNCH_MS  = new Date(LAUNCH_ISO).getTime();
const STEP_S     = 240; // 4-minute intervals

// ── Mission timeline (seconds from launch) ──
const T_PARK_END   = 2 * 3600;        // TLI at T+2h
const T_TLI_END    = T_PARK_END + 720; // 12-min burn
const T_LUNAR_CA   = 4.3 * 24 * 3600;  // Lunar closest approach ~T+4.3 days
const T_REENTRY    = 10.0 * 24 * 3600;  // Reentry T+10 days

// Parking orbit
const ALT_PARK = 185.0;
const R_PARK   = R_EARTH + ALT_PARK;
const MU_EARTH = 398600.4418;
const V_PARK   = Math.sqrt(MU_EARTH / R_PARK);
const T_ORB    = 2 * Math.PI * Math.sqrt(R_PARK ** 3 / MU_EARTH);
const INC      = 28.5 * Math.PI / 180;

// ── Moon orbit ──
const MOON_INC = 18.0 * Math.PI / 180; // effective inclination to equatorial
const MOON_PERIOD_S = 27.322 * 24 * 3600;
const MOON_PHASE0 = 0.8; // Moon's orbital phase at launch (radians)

function moonPosAtTime(tSec) {
  const angle = MOON_PHASE0 + (tSec / MOON_PERIOD_S) * 2 * Math.PI;
  const ca = Math.cos(angle), sa = Math.sin(angle);
  return {
    x: MOON_DIST * ca,
    y: MOON_DIST * sa * Math.sin(MOON_INC),
    z: MOON_DIST * sa * Math.cos(MOON_INC),
  };
}

// Sun direction (ecliptic lon ~11° for April 1, +1°/day)
function sunDirAtTime(tSec) {
  const obl = 23.44 * Math.PI / 180;
  const lon = (11.0 + tSec / 86400) * Math.PI / 180;
  return { x: Math.cos(lon), y: Math.sin(lon) * Math.sin(obl), z: Math.sin(lon) * Math.cos(obl) };
}

// ── Vector math ──
function lerp(a, b, t) { return a + (b - a) * t; }
function smoothstep(t) { return t * t * (3 - 2 * t); }
function lerpVec(a, b, t) { return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t), z: lerp(a.z, b.z, t) }; }
function vecLen(v) { return Math.sqrt(v.x*v.x + v.y*v.y + v.z*v.z); }
function vecScale(v, s) { return { x: v.x*s, y: v.y*s, z: v.z*s }; }
function vecAdd(a, b) { return { x: a.x+b.x, y: a.y+b.y, z: a.z+b.z }; }
function vecSub(a, b) { return { x: a.x-b.x, y: a.y-b.y, z: a.z-b.z }; }
function vecNorm(v) { const l = vecLen(v); return l > 0 ? vecScale(v, 1/l) : {x:0,y:0,z:0}; }
function vecCross(a, b) { return { x: a.y*b.z-a.z*b.y, y: a.z*b.x-a.x*b.z, z: a.x*b.y-a.y*b.x }; }

function hermite(p0, p1, m0, m1, t) {
  const t2 = t*t, t3 = t2*t;
  return {
    x: (2*t3-3*t2+1)*p0.x + (t3-2*t2+t)*m0.x + (-2*t3+3*t2)*p1.x + (t3-t2)*m1.x,
    y: (2*t3-3*t2+1)*p0.y + (t3-2*t2+t)*m0.y + (-2*t3+3*t2)*p1.y + (t3-t2)*m1.y,
    z: (2*t3-3*t2+1)*p0.z + (t3-2*t2+t)*m0.z + (-2*t3+3*t2)*p1.z + (t3-t2)*m1.z,
  };
}

function prefixVel(v) { return { vx: v.x, vy: v.y, vz: v.z }; }

// ── Generate trajectory ──
function generateTrajectory() {
  const states = [];

  // Orbit plane basis vectors (inclined 28.5°)
  const orbitX = { x: 1, y: 0, z: 0 };
  const orbitNormal = { x: 0, y: -Math.sin(INC), z: Math.cos(INC) };
  const orbitY = vecNorm(vecCross(orbitNormal, orbitX));

  // ═══ Phase 1: Parking orbit (2 orbits) ═══
  for (let t = 0; t < T_PARK_END; t += STEP_S) {
    const angle = (t / T_ORB) * 2 * Math.PI;
    const pos = vecAdd(vecScale(orbitX, R_PARK * Math.cos(angle)), vecScale(orbitY, R_PARK * Math.sin(angle)));
    const vel = vecAdd(vecScale(orbitX, -V_PARK * Math.sin(angle)), vecScale(orbitY, V_PARK * Math.cos(angle)));
    states.push({ t, ...pos, ...prefixVel(vel), phase: 'parking_orbit' });
  }

  // ═══ TLI point ═══
  const tliAngle = (T_PARK_END / T_ORB) * 2 * Math.PI;
  const tliPos = vecAdd(vecScale(orbitX, R_PARK * Math.cos(tliAngle)), vecScale(orbitY, R_PARK * Math.sin(tliAngle)));
  const tliVelDir = vecNorm(vecAdd(vecScale(orbitX, -Math.sin(tliAngle)), vecScale(orbitY, Math.cos(tliAngle))));
  const V_TLI = 10.84;
  const tliVel = vecScale(tliVelDir, V_TLI);

  // ═══ Phase 2: TLI burn (12 min) ═══
  for (let t = T_PARK_END; t < T_TLI_END; t += STEP_S) {
    const frac = (t - T_PARK_END) / (T_TLI_END - T_PARK_END);
    const speed = lerp(V_PARK, V_TLI, smoothstep(frac));
    const pos = vecAdd(tliPos, vecScale(tliVelDir, (t - T_PARK_END) * lerp(V_PARK, V_TLI, frac * 0.5)));
    states.push({ t, ...pos, ...prefixVel(vecScale(tliVelDir, speed)), phase: 'tli_burn' });
  }

  // ═══ Build figure-8 free-return waypoints ═══
  //
  // The key to a visually correct free-return:
  // - Moon at CA time defines the target
  // - Outbound leg curves ABOVE the Earth-Moon line (in orbit plane)
  // - Return leg curves BELOW the Earth-Moon line
  // - This creates the visible figure-8 separation
  //
  const moonAtCA = moonPosAtTime(T_LUNAR_CA);
  const toMoon = vecNorm(moonAtCA);         // Earth → Moon direction
  const upDir = { x: 0, y: 0, z: 1 };       // Rough "up" in J2000
  const perpDir = vecNorm(vecCross(toMoon, upDir)); // Perpendicular in orbital plane

  // Flyby: pass BEHIND Moon (farside from Earth) with offset to create the loop
  // Spacecraft passes on the "left" side of Moon (perpDir), gets deflected to "right"
  const flybyOffset = vecAdd(vecScale(toMoon, R_MOON + 200), vecScale(perpDir, 5000));
  const flybyPos = vecAdd(moonAtCA, flybyOffset);

  // Outbound: curves to the LEFT of the Earth-Moon line (positive perpDir)
  const outMidT = (T_TLI_END + T_LUNAR_CA) * 0.5;
  const outMidPos = vecAdd(
    vecScale(toMoon, 190000),       // halfway to Moon
    vecScale(perpDir, 50000),        // offset LEFT to create visible separation
  );
  const outMidVel = vecScale(vecNorm(vecSub(flybyPos, tliPos)), 1.3);

  // At flyby: velocity tangent to the loop, curving around the Moon
  const flybyVel = vecScale(vecNorm(vecAdd(
    vecScale(perpDir, -0.8),  // sweeping from left to right around Moon
    vecScale(toMoon, 0.2),    // slight outward component
  )), 0.85);

  // Post-flyby waypoint: just past Moon, now heading back on the RIGHT side
  const postFlybyT = T_LUNAR_CA + 12 * 3600; // 12 hours after CA
  const postFlybyPos = vecAdd(
    vecScale(toMoon, MOON_DIST * 0.9),   // still near Moon distance
    vecScale(perpDir, -40000),             // offset RIGHT (opposite side)
  );
  const postFlybyVel = vecScale(vecNorm(vecAdd(
    vecScale(toMoon, -0.8),    // heading back to Earth
    vecScale(perpDir, -0.3),   // continuing rightward
  )), 1.0);

  // Return midpoint: curves to the RIGHT of Earth-Moon line (negative perpDir)
  const retMidT = (T_LUNAR_CA + T_REENTRY) * 0.55;
  const retMidPos = vecAdd(
    vecScale(toMoon, 160000),       // roughly halfway back
    vecScale(perpDir, -60000),       // offset RIGHT — creates the figure-8 separation
  );
  const retMidVel = vecScale(vecNorm(vecSub({ x: 0, y: 0, z: 0 }, retMidPos)), 1.8);

  // Reentry: arrive at Earth from a slightly different angle
  const reentryPos = vecScale(vecNorm(vecAdd(toMoon, vecScale(perpDir, -0.4))), R_EARTH + 130);
  const reentryVel = vecScale(vecNorm(vecScale(reentryPos, -1)), 11.0);

  // ═══ Phases 3-6: Hermite interpolation through waypoints ═══
  const waypoints = [
    { t: T_TLI_END,   pos: vecAdd(tliPos, vecScale(tliVelDir, 500)), vel: tliVel },
    { t: outMidT,      pos: outMidPos, vel: outMidVel },
    { t: T_LUNAR_CA,   pos: flybyPos,  vel: flybyVel },
    { t: postFlybyT,   pos: postFlybyPos, vel: postFlybyVel },
    { t: retMidT,      pos: retMidPos, vel: retMidVel },
    { t: T_REENTRY,    pos: reentryPos, vel: reentryVel },
  ];

  for (let t = T_TLI_END; t <= T_REENTRY; t += STEP_S) {
    let segIdx = 0;
    for (let i = 0; i < waypoints.length - 1; i++) {
      if (t >= waypoints[i].t && t <= waypoints[i + 1].t) { segIdx = i; break; }
    }
    if (t > waypoints[waypoints.length - 1].t) segIdx = waypoints.length - 2;

    const wp0 = waypoints[segIdx];
    const wp1 = waypoints[segIdx + 1];
    const segDur = wp1.t - wp0.t;
    const frac = Math.max(0, Math.min(1, (t - wp0.t) / segDur));

    const m0 = vecScale(wp0.vel, segDur);
    const m1 = vecScale(wp1.vel, segDur);
    const pos = hermite(wp0.pos, wp1.pos, m0, m1, frac);

    // Velocity by finite difference
    const dt = 10;
    const frac2 = Math.min(1, (t + dt - wp0.t) / segDur);
    const pos2 = hermite(wp0.pos, wp1.pos, m0, m1, frac2);
    const vel = vecScale(vecSub(pos2, pos), 1 / dt);

    // Phase assignment
    let phase = 'outbound_coast';
    if (t < T_TLI_END + 60) phase = 'tli_burn';
    else if (t >= T_LUNAR_CA - 6 * 3600 && t <= T_LUNAR_CA + 6 * 3600) phase = 'lunar_flyby';
    else if (t > T_LUNAR_CA + 6 * 3600 && t < T_REENTRY - 1800) phase = 'return_coast';
    else if (t >= T_REENTRY - 1800) phase = 'reentry';

    states.push({ t, ...pos, ...prefixVel(vel), phase });
  }

  return states;
}

// ── Build phase metadata ──
function buildPhases(states) {
  const phaseMap = {};
  for (const s of states) {
    if (!phaseMap[s.phase]) phaseMap[s.phase] = { start: s.t, end: s.t };
    phaseMap[s.phase].end = s.t;
  }
  const labels = {
    parking_orbit: 'Earth Parking Orbit',
    tli_burn: 'Trans-Lunar Injection',
    outbound_coast: 'Outbound Coast',
    lunar_flyby: 'Lunar Flyby',
    return_coast: 'Return Coast',
    reentry: 'Reentry',
  };
  return Object.entries(phaseMap).map(([phase, { start, end }]) => ({
    phase, label: labels[phase] || phase,
    startMs: LAUNCH_MS + start * 1000, endMs: LAUNCH_MS + end * 1000,
    startISO: new Date(LAUNCH_MS + start * 1000).toISOString(),
    endISO: new Date(LAUNCH_MS + end * 1000).toISOString(),
  }));
}

// ── Sun directions ──
function buildSunDirections(states) {
  const dirs = [];
  for (let i = 0; i < states.length; i += 15) {
    const s = states[i];
    const sd = sunDirAtTime(s.t);
    dirs.push({ t: LAUNCH_MS + s.t * 1000, x: sd.x, y: sd.y, z: sd.z });
  }
  return dirs;
}

// ── Moon ephemeris ──
function generateMoonEphemeris(states) {
  return states.map(s => {
    const mp = moonPosAtTime(s.t);
    const mp2 = moonPosAtTime(s.t + 1);
    return {
      t: LAUNCH_MS + s.t * 1000,
      x: mp.x, y: mp.y, z: mp.z,
      vx: mp2.x - mp.x, vy: mp2.y - mp.y, vz: mp2.z - mp.z,
      r: vecLen(mp),
    };
  });
}

// ═══ Main ═══
console.log('Generating Artemis II trajectory (figure-8 free-return)...');
const states = generateTrajectory();

const trajectory = states.map(s => ({
  t: LAUNCH_MS + s.t * 1000,
  x: s.x, y: s.y, z: s.z, vx: s.vx, vy: s.vy, vz: s.vz, phase: s.phase,
}));

const phases = buildPhases(states);
const sunDirections = buildSunDirections(states);
const moonEphemeris = generateMoonEphemeris(states);

// Validate
const first = trajectory[0], last = trajectory[trajectory.length - 1];
const rFirst = Math.sqrt(first.x**2 + first.y**2 + first.z**2);
const rLast = Math.sqrt(last.x**2 + last.y**2 + last.z**2);
const maxR = Math.max(...trajectory.map(s => Math.sqrt(s.x**2 + s.y**2 + s.z**2)));

// Check Moon flyby
let minMoonDist = Infinity, flybyIdx = 0;
for (let i = 0; i < trajectory.length && i < moonEphemeris.length; i++) {
  const dx = trajectory[i].x - moonEphemeris[i].x;
  const dy = trajectory[i].y - moonEphemeris[i].y;
  const dz = trajectory[i].z - moonEphemeris[i].z;
  const d = Math.sqrt(dx*dx + dy*dy + dz*dz);
  if (d < minMoonDist) { minMoonDist = d; flybyIdx = i; }
}

console.log(`  Points: ${trajectory.length}`);
console.log(`  Duration: ${((last.t - first.t) / 3.6e6).toFixed(1)} hours`);
console.log(`  Start r: ${rFirst.toFixed(0)} km (alt ${(rFirst - 6371).toFixed(0)} km)`);
console.log(`  End r: ${rLast.toFixed(0)} km (alt ${(rLast - 6371).toFixed(0)} km)`);
console.log(`  Max r: ${maxR.toFixed(0)} km`);
console.log(`  Lunar CA: ${minMoonDist.toFixed(0)} km at T+${((trajectory[flybyIdx].t - first.t) / 3.6e6).toFixed(1)}h`);
console.log(`  Phases: ${phases.map(p => p.label).join(', ')}`);

if (rLast > 10000) console.warn('  ⚠ Last point far from Earth!');
else console.log('  ✓ Returns to Earth');

// Write
const outDir = path.dirname(process.argv[1] || '.');
fs.writeFileSync(path.join(outDir, 'artemis-trajectory.json'), JSON.stringify({
  meta: { description: 'Artemis II free-return (figure-8 parametric)', frame: 'Earth-centered J2000 equatorial', units: { position: 'km', velocity: 'km/s', time: 'ms epoch' }, launchISO: LAUNCH_ISO, launchMs: LAUNCH_MS, stepSeconds: STEP_S },
  phases, sunDirections, trajectory,
}, null, 0));

fs.writeFileSync(path.join(outDir, 'artemis-moon-ephemeris.json'), JSON.stringify({
  meta: { description: 'Moon J2000 equatorial positions', frame: 'Earth-centered J2000 equatorial', units: { position: 'km', velocity: 'km/s', time: 'ms epoch' } },
  ephemeris: moonEphemeris,
}, null, 0));

console.log('\nWrote: artemis-trajectory.json');
console.log('Wrote: artemis-moon-ephemeris.json');
