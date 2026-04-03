# Orion Spacecraft — Inline Three.js Geometry Spec

Build the Orion spacecraft as a Three.js `Group` from primitive geometries.
No external model file required. All dimensions in meters (scaled for scene).

## Coordinate convention

- +Y axis = spacecraft "up" (toward crew module)
- Origin = center of service module bottom
- Spacecraft points in +Y direction; orient in scene by rotating the Group

## Components

All materials use `MeshPhongMaterial` or `MeshStandardMaterial`.

### 1. Heat shield (bottom)
```js
geometry: CylinderGeometry(radiusTop=0.0, radiusBottom=2.0, height=0.3, radialSegments=32)
// flat disk / shallow cone
position: y = -0.15  (relative to group origin)
material: color #1a1a1a (dark charcoal), roughness 0.9
```

### 2. Crew module (capsule)
```js
geometry: CylinderGeometry(radiusTop=1.5, radiusBottom=2.0, height=2.5, radialSegments=32)
// truncated cone / frustum
position: y = 1.25
material: color #c0b090 (tan/gold — thermal blanket), roughness 0.7
```

### 3. Crew module cap (top dome)
```js
geometry: SphereGeometry(radius=1.5, widthSegments=16, heightSegments=8, phiStart=0, phiLength=2π, thetaStart=0, thetaLength=π/2)
// upper hemisphere only
position: y = 2.5
material: same as crew module
```

### 4. Service module (cylinder)
```js
geometry: CylinderGeometry(radiusTop=1.8, radiusBottom=1.8, height=3.0, radialSegments=32)
position: y = -1.5  (below crew module, above heat shield mount)
material: color #888888 (medium grey), roughness 0.6, metalness 0.3
```

### 5. Solar panels (4×, symmetric)
Each panel is a thin box. Mount points at ±90° and ±0° around service module equator.

```js
geometry: BoxGeometry(width=4.0, height=0.05, depth=1.6)
// 4 panels, rotated 0°, 90°, 180°, 270° around Y axis
// each panel extends radially outward from service module surface
position (each): x or z offset = 1.8 + 2.0 = 3.8 from center, y = -1.5
rotation: panel[0] rotY=0,   localX offset +3.8
           panel[1] rotY=90°, localZ offset +3.8
           panel[2] rotY=180°
           panel[3] rotY=270°
material: color #1a2a4a (dark navy blue — solar cells), roughness 0.3, metalness 0.1
// Add a thin silver frame:
//   BoxGeometry(width=4.2, height=0.06, depth=1.7), color #aaaaaa, just behind panel
```

### 6. Main engine nozzle
```js
geometry: CylinderGeometry(radiusTop=0.6, radiusBottom=0.9, height=0.8, radialSegments=16)
// bell-shaped nozzle — open at bottom
position: y = -3.1  (below service module)
material: color #666666 (dark grey), roughness 0.4, metalness 0.6
```

### 7. Small RCS thrusters (optional detail, 8×)
```js
geometry: CylinderGeometry(0.08, 0.12, 0.2, 8)
// placed around crew module / service module junction
// 4 at y=0, radial offset 2.0, every 90°; 4 more at y=-2.5
material: color #999999
```

## Assembly code sketch

```js
function buildOrion() {
  const group = new THREE.Group();

  const matCapsule  = new THREE.MeshStandardMaterial({ color: 0xc0b090, roughness: 0.7 });
  const matService  = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.6, metalness: 0.3 });
  const matShield   = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.9 });
  const matSolar    = new THREE.MeshStandardMaterial({ color: 0x1a2a4a, roughness: 0.3, metalness: 0.1 });
  const matNozzle   = new THREE.MeshStandardMaterial({ color: 0x666666, roughness: 0.4, metalness: 0.6 });

  // Heat shield
  const shield = new THREE.Mesh(new THREE.CylinderGeometry(0, 2.0, 0.3, 32), matShield);
  shield.position.y = -0.15;
  group.add(shield);

  // Crew module
  const crew = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 2.0, 2.5, 32), matCapsule);
  crew.position.y = 1.25;
  group.add(crew);

  // Crew module dome
  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(1.5, 16, 8, 0, Math.PI*2, 0, Math.PI/2),
    matCapsule
  );
  dome.position.y = 2.5;
  group.add(dome);

  // Service module
  const svc = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 1.8, 3.0, 32), matService);
  svc.position.y = -1.5;
  group.add(svc);

  // Solar panels
  for (let i = 0; i < 4; i++) {
    const panel = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.05, 1.6), matSolar);
    panel.position.set(3.8, -1.5, 0);
    panel.rotation.y = (i * Math.PI) / 2;
    // Re-position after rotation: panels extend radially
    // Since rotation is applied to group, offset in local X before rotating
    const pivot = new THREE.Group();
    pivot.rotation.y = (i * Math.PI) / 2;
    const p = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.05, 1.6), matSolar);
    p.position.set(3.8, -1.5, 0);
    pivot.add(p);
    group.add(pivot);
  }

  // Main nozzle
  const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.9, 0.8, 16), matNozzle);
  nozzle.position.y = -3.1;
  group.add(nozzle);

  return group;
}
```

## Scale in scene

The Orion capsule is ~5 m diameter in reality. For a scene where Earth radius = 6371 units (km),
scale the Orion group to approximately `0.1` scene units (100 m visual size at Earth scale
is too small to see; use a fixed screen-space size or scale up to ~50 km for visibility).

Recommended: use a fixed scale of `200` (200 km visual diameter) so it's visible against
Earth, and add a label. At lunar distance (384,400 km from Earth center), reduce scale or
keep constant via `object.onBeforeRender` screen-space sizing.

## Textures (optional)

If adding texture maps:
- Crew module: gold/tan MLI (multi-layer insulation) foil pattern
- Solar panels: blue photovoltaic cell grid pattern
- Service module: grey metallic brushed finish

Suggested UV-mapped texture size: 512×512 px.
