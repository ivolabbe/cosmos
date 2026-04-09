# Planet Interactive Apps — Dev Log

## Overview
3D interactive globe viewers for all 8 planets, embedded in COSMOS encyclopedia articles.
Pattern: textured Three.js sphere + OrbitControls + bloom + starfield.

## Textures
All textures compressed to ~1/3 size via JPEG quality reduction (same pixels).
Stored in `dev/assets/textures/planets/web/`.
- Mercury: 8k, 4.8MB (q51)
- Venus: 8k surface (3.9MB q67) + 4k atmosphere (497K q88)
- Earth: 8k daymap (1.4MB), nightmap (1.0MB), clouds (3.7MB), normal (2.2MB), specular (591K)
- Mars: 8k, 2.6MB (q69)
- Jupiter: 4k, 969K (q89)
- Saturn: 4k (330K) + ring alpha (63K PNG)
- Neptune: 2k, 75K (q89)
- Uranus: **NO TEXTURE — needs sourcing**
- Moon: 8k, 4.8MB (q47)
- Sun: 4k, 1.2MB (q89)

## Mercury Interactive ✅
**Status**: Working, verified in headed Puppeteer 2026-03-28
**File**: `dev/mercury-interactive.html`
**Features**:
- 8K texture on SphereGeometry(1, 128, 64)
- MeshStandardMaterial (roughness 0.95, metalness 0.0)
- DirectionalLight (warm white, intensity 2.5) + subtle AmbientLight
- OrbitControls with auto-rotate (0.5 speed)
- UnrealBloomPass (subtle: strength 0.15, radius 0.4, threshold 0.85)
- 600 random star points (r=50-120, opacity 0.4)
- Controls: Auto-rotate checkbox, Speed selector (0.3x/1x/3x/10x)
- Info panel hidden in embedded mode
- Responsive resize handler
**Verified**: WebGL context OK, canvas 1200x800, texture loads, loading indicator hides
**404**: Only favicon (harmless)

## Mars Interactive ✅
**Status**: Working, verified 2026-03-28
**File**: `dev/mars-interactive.html`
**Features**: 8K texture, thin warm CO₂ atmosphere (ray-marched, color #dd8855), 25.19° axial tilt
**Verified**: Puppeteer headed, canvas OK, texture loads

## Venus Interactive ✅
**Status**: Working, verified 2026-03-28
**File**: `dev/venus-interactive.html`
**Features**: 8K surface + 4K cloud layer (toggleable), 177.4° axial tilt (retrograde), dense golden atmosphere (#eebb66), cloud super-rotation animation
**Controls**: Auto-rotate, Speed, Clouds toggle

## Earth Interactive ✅
**Status**: Working, verified 2026-03-28
**File**: `dev/earth-interactive.html`
**Features**: Custom day/night shader (blends daymap/nightmap based on sun direction), cloud layer, city lights (toggleable), specular ocean highlights, blue ray-marched atmosphere, 23.44° tilt
**Controls**: Auto-rotate, Speed, Clouds toggle, City lights toggle

## Jupiter Interactive ✅
**Status**: Working, verified 2026-03-28
**File**: `dev/jupiter-interactive.html`
**Features**: 4K texture showing bands + Great Red Spot, warm atmosphere haze (#ccaa77), 3.13° tilt, fast auto-rotate (0.8 speed)

## Saturn Interactive ✅
**Status**: Working, verified 2026-03-28
**File**: `dev/saturn-interactive.html`
**Features**: 4K texture, RingGeometry (inner 1.2, outer 2.3) with alpha texture, DoubleSide rendering, 26.73° tilt via parent Group, atmosphere (#ddcc88)
**Controls**: Auto-rotate, Speed, Rings toggle

## Uranus Interactive ✅
**Status**: Working, verified 2026-03-28
**File**: `dev/uranus-interactive.html`
**Features**: 2K texture (downloaded from Solar System Scope), 97.77° extreme axial tilt, cyan-green atmosphere (#55aacc)
**Note**: Texture sourced during development — not in original ~/Downloads set

## Neptune Interactive ✅
**Status**: Working, verified 2026-03-28
**File**: `dev/neptune-interactive.html`
**Features**: 2K texture, blue methane atmosphere (#3366dd), 28.32° tilt

## Style updates (2026-03-28)
- Background changed from #0a0a2e to pure black (#000 / 0x000000) per user feedback
- Stars: two-layer system (800 dim + 80 bright) with bloom (strength 0.35, radius 0.6, threshold 0.4)
- Style guide updated with new background and star patterns
