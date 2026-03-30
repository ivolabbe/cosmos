# Asset Credits & Licences

All third-party assets used in COSMOS interactive visualizations are listed here with attribution as required by their licences.

---

## Planet & Solar System Textures

**Source:** Solar System Scope (based on NASA imagery)
**URL:** https://www.solarsystemscope.com/textures
**Licence:** [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/)
**Attribution:** Solar System Scope / solarsystemscope.com; original imagery NASA/JPL

**Files:**
- `textures/planets/8k_earth_daymap.jpg`
- `textures/planets/8k_earth_nightmap.jpg`
- `textures/planets/8k_earth_clouds.jpg`
- `textures/planets/8k_earth_normal_map.tif`
- `textures/planets/8k_earth_specular_map.tif`
- `textures/planets/8k_sun.jpg`
- `textures/planets/8k_moon.jpg`
- `textures/planets/8k_mercury.jpg`
- `textures/planets/2k_venus_surface.jpg`
- `textures/planets/4k_venus_atmosphere.jpg`
- `textures/planets/8k_mars.jpg`
- `textures/planets/8k_jupiter.jpg`
- `textures/planets/8k_saturn.jpg`
- `textures/planets/8k_saturn_ring_alpha.png`
- `textures/planets/2k_neptune.jpg`

---

## "Of Planes and Satellites" 3D Model

**Author:** Loïc Norgeot (@norgeotloic)
**URL:** https://sketchfab.com/3d-models/of-planes-and-satellites-db8f1c8cba3b464993e216acbf4a69b9
**Licence:** [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/)
**Attribution:** Loïc Norgeot / Sketchfab

**Files (in `../models/satellites/`):**
- `export.gltf`, `earth.bin`, `landmak.png`, `emission.png`
- `sat_gps_vertices_0.bin`, `sat_comms_vertices_0.bin`, `sat_tech_vertices_0.bin`, `sat_earth_vertices_0.bin`
- `routes_vertices_0.bin` (airline routes, arcs compressed to 50% of original height)

**Modifications:**
- Satellite orbital planes redistributed by type (GPS: 6 planes, GEO: equatorial, LEO/Tech: random RAAN)
- Airline route arc heights compressed to 50%

---

## Real Satellite Orbit Catalogue

**Source:** CelesTrak (mirror of US Space Command GP data)
**URL:** https://celestrak.org/
**Data date:** 2026-03-27
**Licence:** Public domain (US Government data)

**Files (in `../models/satellites/catalog/`):**
- `cat_leo.bin` — 2,000 LEO satellites (subsampled from 14,072)
- `cat_meo.bin` — 194 MEO satellites
- `cat_geo.bin` — 601 GEO satellites
- `cat_heo.bin` — 8 HEO satellites

Orbits computed from OMM orbital elements (inclination, RAAN, SMA, eccentricity, argument of perigee).

---

## Babylon.js Sun Particle Textures

**Author:** Patrick Ryan / Microsoft
**URL:** https://playground.babylonjs.com/#MX2Z99#185
**Licence:** Apache 2.0 (Babylon.js project assets)

**Files (in `../textures/sun/`):**
- `T_SunSurface.png`
- `T_SunFlare.png`
- `T_Star.png`
