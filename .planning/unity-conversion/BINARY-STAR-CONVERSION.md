# Binary Star Interactive: Three.js → Unity Conversion Path

## 1. Source Analysis (1065 lines, single HTML file)

### What the Three.js app does

Two stars orbit their common center of mass in 3D. The user can adjust mass ratio (q), eccentricity (e), and inclination (i). The camera orbits freely. Bloom makes the stars glow. Orbit trails trace the ellipses. A starfield provides background depth.

### Code breakdown by function

| Section | Lines | Purpose | Unity equivalent | Port effort |
|---------|-------|---------|-----------------|-------------|
| **Kepler solver** | 180–207 | `solveKepler(M,e)`, `trueAnomaly(E,e)`, `radialVelocity()`, `overlapArea()` | C# static methods — verbatim translation | Trivial |
| **Star color from temperature** | 231–245 | Maps T → hex color (M through O stars + WD) | C# `Color StarColor(float T)` | Trivial |
| **Orbital state computation** | 478–569 | `getOrbitalState(t)` — positions, RV, eclipse flux | C# method on simulation MonoBehaviour | Trivial |
| **Star mesh creation** | 358–425 | Custom GLSL shader: sun texture → grayscale → tint by T | Unity emissive material (see §3) | Easy |
| **Orbit trail lines** | 428–476 | Full-ellipse recomputed on param change | Unity `LineRenderer` (see §4) | Easy |
| **Starfield** | 316–335 | Two layers of random `THREE.Points` | Unity `ParticleSystem` or mesh particles | Easy |
| **Bloom post-processing** | 302–311 | `UnrealBloomPass(strength=0.8, radius=0.5, threshold=0.2)` | URP Volume with Bloom override (see §5) | Trivial |
| **Camera + OrbitControls** | 280–300 | Perspective camera, drag-orbit, zoom, damping | Cinemachine or custom orbit script (see §6) | Easy |
| **Presets** | 972–996 | 5 named configs (Algol, Equal, Eccentric, WD+M, Face-on) | ScriptableObject or simple struct array | Trivial |
| **2D Canvas panels** | 624–860 | RV curve + light curve plots drawn via Canvas2D | **NOT NEEDED** for LED wall | Skip |
| **HTML/CSS UI** | 8–87, 910–996 | Sliders, buttons, readouts, embedded mode | **NOT NEEDED** for LED wall | Skip |
| **Resize handler** | 1047–1053 | Window resize | Unity handles natively | Skip |
| **Animation loop** | 1007–1042 | `requestAnimationFrame` → update positions → render | Unity `Update()` | Trivial |

### Lines that actually port: ~350 of 1065

Everything else is web UI, 2D canvas plotting, CSS, and HTML structure — all skipped for the LED wall version.

---

## 2. Unity Project Structure

```
CosmosInteractives/
├── Assets/
│   ├── Scripts/
│   │   ├── Core/
│   │   │   ├── KeplerSolver.cs          ← Pure math (solveKepler, trueAnomaly)
│   │   │   └── StarUtils.cs             ← StarColor(T), temperature-to-Color mapping
│   │   ├── BinaryStar/
│   │   │   ├── BinaryStarSimulation.cs  ← Main MonoBehaviour (orbital state, Update loop)
│   │   │   ├── BinaryStarConfig.cs      ← ScriptableObject: q, e, i, T1, T2, R1, R2
│   │   │   └── BinaryStarPresets.cs     ← Preset definitions (Algol, Equal, etc.)
│   │   └── Shared/
│   │       ├── OrbitCamera.cs           ← Drag-to-orbit, scroll-to-zoom
│   │       └── Starfield.cs             ← Procedural background star particles
│   ├── Materials/
│   │   ├── StarEmissive.mat             ← Emissive material for star spheres
│   │   ├── OrbitTrail.mat               ← Additive-blend line material
│   │   └── Starfield.mat                ← Point particle material
│   ├── Textures/
│   │   └── 8k_sun.jpg                   ← Same sun texture (or procedural)
│   ├── Prefabs/
│   │   ├── Star.prefab                  ← Sphere + emissive material
│   │   └── Starfield.prefab             ← ParticleSystem or mesh particles
│   ├── Scenes/
│   │   ├── BinaryStar.unity             ← This app's scene
│   │   └── MainMenu.unity              ← Scene selector (future)
│   └── Settings/
│       ├── URPAsset.asset               ← URP pipeline config
│       ├── URPRenderer.asset            ← Renderer with post-processing
│       └── GlobalVolume.asset           ← Bloom + any other post-FX
```

### Render Pipeline Choice: **URP** (Universal Render Pipeline)

- HDRP is overkill for stylized astronomy sims — designed for photorealistic AAA
- URP has full bloom support, runs on everything, and supports stereo rendering for future 3D
- Built-in RP is legacy — no reason to start there

---

## 3. Star Visuals — Replacing the Custom GLSL Shader

### Three.js approach (lines 364–411)
Custom vertex/fragment shader that:
1. Samples sun texture
2. Converts to grayscale luminance: `lum = dot(rgb, vec3(0.299, 0.587, 0.114))`
3. Tints by star color: `col = uColor * lum * uBrightness`
4. Bloom pass makes it glow

### Unity approach: Emissive material (no custom shader needed)

```
Material setup (URP/Lit or URP/Simple Lit):
  - Base Map: 8k_sun.jpg (same texture)
  - Base Color: StarColor(T)  ← tints the texture
  - Emission: enabled
  - Emission Color: StarColor(T) * brightness_multiplier
  - Emission intensity: 2.0–5.0 (drives bloom)
  - Surface Type: Opaque
  - Rendering: Forward
```

The URP Lit shader already does grayscale-modulated tinting when you set the base color — the texture's luminance structure is preserved while being tinted. Combined with emission + bloom, this produces the same visual result.

**If more control is needed**: Use Shader Graph to replicate the exact luminance extraction:
- Sample Texture 2D → Split → Dot Product (0.299, 0.587, 0.114) → Multiply by Color → Emission

But try the standard material first — it will likely be indistinguishable on the LED wall.

### Runtime color changes (presets, parameter adjustment)

```csharp
// In BinaryStarSimulation.cs
void UpdateStarAppearance(Renderer starRenderer, float temperature)
{
    var block = new MaterialPropertyBlock();
    Color col = StarUtils.StarColor(temperature);
    float brightness = temperature > 20000f ? 3f : temperature > 10000f ? 2f :
                       temperature > 7000f ? 1.5f : temperature > 4000f ? 0.8f : 0.5f;
    block.SetColor("_BaseColor", col);
    block.SetColor("_EmissionColor", col * brightness);
    starRenderer.SetPropertyBlock(block);
}
```

`MaterialPropertyBlock` avoids creating new material instances — efficient for runtime changes.

---

## 4. Orbit Trail Lines

### Three.js approach (lines 428–476)
`THREE.LineBasicMaterial` with additive blending, opacity 0.3, recomputed as `BufferGeometry.setFromPoints()` on parameter change.

### Unity approach: `LineRenderer`

```csharp
// In BinaryStarSimulation.cs or a dedicated OrbitTrail component
void UpdateOrbitTrail(LineRenderer lr, float semiMajor, float ecc, Color color, int nPoints = 256)
{
    lr.positionCount = nPoints + 1;
    lr.startWidth = 0.02f;
    lr.endWidth = 0.02f;
    lr.material = orbitTrailMaterial; // Additive blend, semi-transparent
    lr.startColor = new Color(color.r, color.g, color.b, 0.3f);
    lr.endColor = lr.startColor;

    for (int i = 0; i <= nPoints; i++)
    {
        float M = (i / (float)nPoints) * 2f * Mathf.PI;
        float E = KeplerSolver.Solve(M, ecc);
        float v = KeplerSolver.TrueAnomaly(E, ecc);
        float r = semiMajor * (1f - ecc * ecc) / (1f + ecc * Mathf.Cos(v));
        lr.SetPosition(i, new Vector3(r * Mathf.Cos(v), 0f, r * Mathf.Sin(v)));
    }
}
```

Material: Create an **Additive** particle/unlit shader material:
- Shader: `Universal Render Pipeline/Particles/Unlit`
- Blending: Additive
- Color: star color with alpha ~0.3

---

## 5. Bloom Post-Processing

### Three.js approach (lines 302–311)
```javascript
new UnrealBloomPass(resolution, strength=0.8, radius=0.5, threshold=0.2)
```

### Unity URP approach

1. **Enable post-processing** on the camera (checkbox in Camera component)
2. **Create a Global Volume** in the scene
3. **Add Volume Profile** → Add Override → **Bloom**:

| Three.js param | URP Bloom param | Value |
|----------------|----------------|-------|
| `strength: 0.8` | **Intensity** | `0.8` (may need tuning — URP scale differs) |
| `radius: 0.5` | **Scatter** | `0.5–0.7` |
| `threshold: 0.2` | **Threshold** | `0.9` (URP default; lower = more bloom) |

**Tuning note**: The LED wall's extreme resolution and brightness may need different bloom parameters than a browser. Start with these, adjust by eye. The emission intensity on the star materials is what primarily drives how much bloom appears.

No code needed — this is entirely editor configuration, saved in the Volume Profile asset.

---

## 6. Camera System

### Three.js approach (lines 280–300, 946–957)
`OrbitControls` with damping, min/max distance, inclination-driven position. Two-way binding between inclination slider and camera elevation.

### Unity approach: Simple orbit camera script

```csharp
// OrbitCamera.cs — attach to camera, reusable across all COSMOS scenes
public class OrbitCamera : MonoBehaviour
{
    public Transform target;
    public float distance = 11f;
    public float minDistance = 5f;
    public float maxDistance = 40f;
    public float rotationSpeed = 5f;
    public float zoomSpeed = 2f;
    public float damping = 6f;

    private float azimuth = 0f;
    private float elevation = 8f; // degrees from edge-on (= 90 - inclination)

    void Update()
    {
        // Mouse drag → orbit
        if (Input.GetMouseButton(0))
        {
            azimuth += Input.GetAxis("Mouse X") * rotationSpeed;
            elevation -= Input.GetAxis("Mouse Y") * rotationSpeed;
            elevation = Mathf.Clamp(elevation, 0f, 90f);
        }

        // Scroll → zoom
        distance -= Input.GetAxis("Mouse ScrollWheel") * zoomSpeed;
        distance = Mathf.Clamp(distance, minDistance, maxDistance);

        // Compute position
        float elRad = elevation * Mathf.Deg2Rad;
        float azRad = azimuth * Mathf.Deg2Rad;
        Vector3 pos = new Vector3(
            distance * Mathf.Cos(elRad) * Mathf.Sin(azRad),
            distance * Mathf.Sin(elRad),
            distance * Mathf.Cos(elRad) * Mathf.Cos(azRad)
        );

        transform.position = Vector3.Lerp(transform.position, target.position + pos, Time.deltaTime * damping);
        transform.LookAt(target);
    }
}
```

For the LED wall: camera control will likely come from a separate control interface (tablet, secondary screen), not mouse input. The script just needs public methods like `SetInclination(float deg)` and `SetDistance(float d)` that the control interface calls.

---

## 7. Core Physics — Line-by-Line Translation

### KeplerSolver.cs

```csharp
public static class KeplerSolver
{
    /// <summary>Solve Kepler's equation M = E - e*sin(E) by Newton-Raphson.</summary>
    public static float Solve(float M, float e, int iterations = 12)
    {
        float E = M;
        for (int i = 0; i < iterations; i++)
            E -= (E - e * Mathf.Sin(E) - M) / (1f - e * Mathf.Cos(E));
        return E;
    }

    /// <summary>True anomaly from eccentric anomaly.</summary>
    public static float TrueAnomaly(float E, float e)
    {
        float sinV = Mathf.Sqrt(1f - e * e) * Mathf.Sin(E) / (1f - e * Mathf.Cos(E));
        float cosV = (Mathf.Cos(E) - e) / (1f - e * Mathf.Cos(E));
        return Mathf.Atan2(sinV, cosV);
    }
}
```

### StarUtils.cs

```csharp
public static class StarUtils
{
    public static Color StarColor(float T)
    {
        if (T < 3500f) return new Color32(0xAA, 0x11, 0x00, 0xFF); // M
        if (T < 5000f) return new Color32(0xFF, 0xAA, 0x33, 0xFF); // K
        if (T < 6000f) return new Color32(0xFF, 0xDD, 0x66, 0xFF); // G
        if (T < 7500f) return new Color32(0xFF, 0xEE, 0xDD, 0xFF); // F
        if (T < 10000f) return new Color32(0xAA, 0xCC, 0xFF, 0xFF); // A
        if (T < 20000f) return new Color32(0x88, 0xAA, 0xFF, 0xFF); // B
        return new Color32(0xDD, 0xEE, 0xFF, 0xFF);                 // O/WD
    }
}
```

### BinaryStarSimulation.cs — Main loop

```csharp
public class BinaryStarSimulation : MonoBehaviour
{
    [Header("Parameters")]
    public float q = 0.5f;        // mass ratio M2/M1
    public float ecc = 0f;        // eccentricity
    public float speedMul = 0.5f; // playback speed

    [Header("Star Properties")]
    public float T1 = 10000f, T2 = 5000f;
    public float R1Frac = 0.12f, R2Frac = 0.08f;

    [Header("References")]
    public Transform star1, star2;
    public LineRenderer orbit1, orbit2;
    public Renderer star1Renderer, star2Renderer;

    const float A_VIS = 5f;   // semi-major axis in scene units
    const float P_BASE = 4f;  // period in seconds at 1x

    float simTime = 0f;
    bool playing = true;

    void Update()
    {
        if (playing)
            simTime += Time.deltaTime * speedMul;

        // Orbital state
        float Mtot = 1f + q;
        float a1 = A_VIS * q / Mtot;
        float a2 = A_VIS * 1f / Mtot;

        float phase = 2f * Mathf.PI * (simTime / P_BASE);
        float M = ((phase % (2f * Mathf.PI)) + 2f * Mathf.PI) % (2f * Mathf.PI);
        float E = KeplerSolver.Solve(M, ecc);
        float v = KeplerSolver.TrueAnomaly(E, ecc);

        float r1 = a1 * (1f - ecc * ecc) / (1f + ecc * Mathf.Cos(v));
        float r2 = a2 * (1f - ecc * ecc) / (1f + ecc * Mathf.Cos(v));

        // Position stars (star1 opposite side of COM)
        star1.position = new Vector3(-r1 * Mathf.Cos(v), 0f, -r1 * Mathf.Sin(v));
        star2.position = new Vector3( r2 * Mathf.Cos(v), 0f,  r2 * Mathf.Sin(v));
    }
}
```

That's the entire simulation loop — 15 lines of C# replacing 60 lines of JS.

---

## 8. Starfield Background

### Three.js approach (lines 316–335)
Two layers of `THREE.Points`: 800 faint + 80 bright, randomly distributed on spherical shells.

### Unity approach: ParticleSystem

Create a `ParticleSystem` prefab:
- **Emission**: 0 rate (burst 880 at start)
- **Shape**: Sphere, radius 50–120
- **Renderer**: Billboard, point material (white, additive)
- **Size over lifetime**: constant (0.02–0.05)
- **Start speed**: 0
- **Simulation space**: World
- **Max particles**: 880
- **Play on Awake**: true
- **Looping**: false (one-shot, particles live forever)

Or use a simple script that creates a mesh with 880 vertices rendered as points — same as Three.js but more performant for static particles.

---

## 9. Starfield, CoM Marker, and Scene Hierarchy

```
Scene: BinaryStar
├── Main Camera (OrbitCamera.cs, Post-Processing enabled)
├── Global Volume (Bloom profile)
├── Directional Light (minimal — stars are self-illuminated)
├── [Empty] BinarySystem
│   ├── Star1 (Sphere mesh, StarEmissive material)
│   ├── Star2 (Sphere mesh, StarEmissive material)
│   ├── OrbitTrail1 (LineRenderer)
│   ├── OrbitTrail2 (LineRenderer)
│   └── CenterOfMass (tiny sphere, semi-transparent)
├── Starfield (ParticleSystem)
└── BinaryStarSimulation (MonoBehaviour on BinarySystem)
```

---

## 10. LED Wall Considerations

### Resolution
The 100 m² LED wall likely runs at very high resolution (potentially 8K+ across multiple panels). Unity handles this natively — just set the output resolution. The star spheres use standard geometry (48×32 segments in Three.js → Unity default sphere is 20×20, increase to 64×32 for close-ups).

### Frame rate
The Three.js version targets 60fps in a browser with WebGL overhead. Unity with URP on dedicated GPUs will comfortably hit 60+ fps for this scene — it's geometrically trivial (2 spheres, 2 lines, 880 points).

### Controls
On the LED wall, the audience doesn't hold a mouse. Options:
- **OSC/MIDI controller** — Unity has OSC plugins, presenter adjusts q/e/i from a physical controller
- **Tablet companion app** — simple WebSocket or UDP connection to Unity
- **Pre-scripted sequences** — Timeline or DOTween animations cycling through presets
- **Keyboard shortcuts** — simplest: arrow keys adjust parameters, space toggles play

### Future stereoscopic 3D
URP supports **single-pass stereo rendering** (XR Plugin Management). When you're ready:
1. Install XR Plugin Management package
2. Configure for your display system's SDK
3. Enable stereo rendering on the camera
The scene itself needs zero changes — Unity handles the stereo camera pair automatically.

---

## 11. Conversion Checklist

```
[ ] Create Unity project (URP template)
[ ] Configure URP pipeline asset + post-processing
[ ] Create Bloom volume profile (intensity ~0.8, scatter ~0.6, threshold ~0.9)
[ ] Write KeplerSolver.cs (static math — 20 lines)
[ ] Write StarUtils.cs (color mapping — 15 lines)
[ ] Create star emissive material (URP/Lit + emission)
[ ] Import 8k_sun.jpg texture
[ ] Create Star prefab (sphere + material)
[ ] Create orbit trail material (additive unlit)
[ ] Write BinaryStarSimulation.cs (main sim — ~60 lines)
[ ] Set up LineRenderers for orbit trails
[ ] Create starfield (ParticleSystem, 880 particles)
[ ] Write OrbitCamera.cs (orbit + zoom — ~40 lines)
[ ] Add CoM marker (tiny sphere)
[ ] Create BinaryStar scene, wire up references
[ ] Add presets as ScriptableObjects or struct array
[ ] Test: verify orbits match Kepler's laws
[ ] Test: verify star colors match spectral types
[ ] Test: bloom appearance on target display
[ ] Test: camera controls feel smooth
```

### Estimated effort
- **Experienced Unity dev**: 1 day (including setup and tuning)
- **Comfortable with C# but new to Unity**: 2–3 days
- The shared infrastructure (KeplerSolver, StarUtils, OrbitCamera, Starfield, bloom profile) carries over to every subsequent app

---

## 12. What Ports to Other Apps

| Shared asset | Used by |
|-------------|---------|
| `KeplerSolver.cs` | Binary star, asteroid belt, satellites, pulsar (timing), planets |
| `StarUtils.cs` | Binary star, HR diagram, any scene with stars |
| `OrbitCamera.cs` | All 15 apps |
| `Starfield` prefab | All 15 apps |
| `Bloom` volume profile | All 15 apps |
| `Star` prefab + material | Binary star, HR diagram, sun |
| Orbit trail material | Binary star, asteroid belt, satellites, planets |

After the binary star is done, the next app (e.g. pulsar, rotation curve) reuses 70%+ of the infrastructure and only needs its unique physics script.

---

## 13. Unity Asset File Formats — Reference for Programmatic Generation

All Unity serialized files (.unity, .mat, .asset, .prefab) are YAML when "Force Text" serialization is enabled (default for version control). The format is deterministic and uses constant GUIDs for built-in shaders and components.

### YAML header format (all files)
```yaml
%YAML 1.1
%TAG !u! tag:unity3d.com,2011:
--- !u!<classID> &<fileID>
<ClassName>:
  serializedVersion: <n>
  m_ObjectHideFlags: 0
  ...
```

### Constant GUIDs (same across all URP projects)

These are stable identifiers that Unity uses internally. We can use them to generate valid asset files without the Editor.

| Asset | GUID |
|-------|------|
| **URP/Lit shader** | `933532a4fcc9baf4fa0491de14d08ed7` |
| **URP/SimpleLit shader** | `8d2bb70cbf9db8d4da26e15b26e74248` |
| **URP Particles/Unlit shader** | `0406db5a14f94604a8c57ccfbc9f3b46` |
| **Built-in sphere mesh** | `fileID: 10207, guid: 0000000000000000e000000000000000` |
| **Volume Profile script** | `d7fd9488000d3734a9e00ee676215985` |
| **Bloom component script** | `0b2db86121404754db890f4c8dfe81b2` |
| **Tonemapping component script** | `97c23e3b12dc18c42a140437e53d3951` |
| **Vignette component script** | `899c54efeace73346a0a16faa3afe726` |
| **URP Pipeline Asset script** | `bf2edee5c58d82540a51f03df9d42094` |
| **URP Renderer Data script** | `de640fe3d0db1804a85f9fc8f5cadab6` |

### Emissive material recipe (for glowing stars)

From studying `BlueEmission.mat` and `EmissionOn.mat` in the Graphics repo:

```yaml
# Key properties for a URP/Lit emissive material:
m_ValidKeywords: [_EMISSION]
_BaseColor: {r: <star_r>, g: <star_g>, b: <star_b>, a: 1}
_EmissionColor: {r: <hdr_r>, g: <hdr_g>, b: <hdr_b>, a: 1}  # values > 1.0 trigger bloom
_BaseMap: {fileID: <texFileID>, guid: <texGUID>}               # sun texture
_Smoothness: 0                                                  # stars aren't shiny
m_LightmapFlags: 2                                              # emission bake flag
```

**HDR emission examples from real Unity projects:**
- Blue-hot star equivalent: `_EmissionColor: {r: 0.5, g: 5.08, b: 8.0}` (from `BlueEmission.mat`)
- Full white emission: `_EmissionColor: {r: 8, g: 8, b: 8}` (from `EmissionOn.mat`)
- Intense red (laser): `_EmissionColor: {r: 178.9, g: 0, b: 0}` (from `ECSGalaxySample/Laser.mat`)

For our binary star, emission intensity 2.0–8.0 should produce good bloom glow depending on the star temperature.

### Additive particle material recipe (for orbit trails + starfield)

From `AdditiveParticle.mat`:

```yaml
# Key properties for URP Particles/Unlit additive material:
m_ShaderKeywords: _SURFACE_TYPE_TRANSPARENT
_Surface: 1          # transparent
_Blend: 2            # additive
_SrcBlend: 5         # SrcAlpha
_DstBlend: 1         # One (additive)
_ZWrite: 0           # no depth write (transparent)
_BaseColor: {r: 1, g: 1, b: 1, a: 0.3}
```

### Volume Profile recipe (bloom for star glow)

From `GlobalVolumeProfile.asset` in URP SceneTemplates:

```yaml
# Bloom override in Volume Profile:
# Component GUID: 0b2db86121404754db890f4c8dfe81b2
threshold:
  m_Value: 0.9        # only bright pixels bloom (emission HDR values)
intensity:
  m_Value: 0.5        # overall bloom strength (start here, tune up)
scatter:
  m_Value: 0.7        # bloom radius (0=tight, 1=wide)

# Tonemapping override (pair with bloom):
# Component GUID: 97c23e3b12dc18c42a140437e53d3951
m_Value: 2             # ACES filmic (matches Three.js ACESFilmicToneMapping)
```

### Prefab format (sphere + material)

From `ECSGalaxySample/Planet.prefab`:

```yaml
# Minimal prefab structure for a sphere:
--- !u!1 &<gameObjectFileID>
GameObject:
  m_Name: Star
  m_Component:
  - component: {fileID: <transformFileID>}
  - component: {fileID: <meshFilterFileID>}
  - component: {fileID: <meshRendererFileID>}

--- !u!4 &<transformFileID>
Transform:
  m_LocalPosition: {x: 0, y: 0, z: 0}
  m_LocalScale: {x: 1, y: 1, z: 1}

--- !u!33 &<meshFilterFileID>
MeshFilter:
  m_Mesh: {fileID: 10207, guid: 0000000000000000e000000000000000}  # built-in sphere

--- !u!23 &<meshRendererFileID>
MeshRenderer:
  m_Materials:
  - {fileID: 2100000, guid: <materialGUID>}  # reference to StarEmissive.mat
```

---

## 14. Reference Projects on GitHub

### Primary: Unity-Technologies/Graphics
**URL:** https://github.com/Unity-Technologies/Graphics
**Branch:** `master`

The definitive source for URP file format references.

| Path | Contents |
|------|----------|
| `Templates/com.unity.template-universal/` | Complete URP project scaffold: ProjectSettings, quality tiers, pipeline assets |
| `Templates/.../Assets/Settings/SampleSceneProfile.asset` | Volume Profile with Bloom + Tonemapping + Vignette |
| `Templates/.../Assets/Settings/UniversalRP-HighQuality.asset` | Full pipeline asset (HDR, MSAA, shadows, cascades) |
| `Packages/.../Editor/SceneTemplates/Materials/Emissive.mat` | URP/Lit emissive material — key reference |
| `Packages/.../Samples~/URPPackageSamples/Shaders/Lit/Materials/BlueEmission.mat` | HDR emissive: `{r: 0.5, g: 5.08, b: 8.0}` — star-like glow |
| `Packages/.../Samples~/URPPackageSamples/Shaders/Lit/Materials/EmissionOn.mat` | Emissive with texture + `{r: 8, g: 8, b: 8}` |
| `Packages/.../Samples~/.../KeepFrame/AdditiveParticle.mat` | Additive transparent particle material |
| `Packages/.../Samples~/.../CameraStacking/3D Skybox/Materials/Planet 1.mat` | Planet material |
| `Packages/.../Editor/Volume/DefaultVolumeProfile.asset` | ALL post-processing components with defaults |
| `Packages/.../Runtime/Data/UniversalRendererData.asset` | Default renderer with shader references |

### Secondary: Unity-Technologies/ECSGalaxySample
**URL:** https://github.com/Unity-Technologies/ECSGalaxySample
**Branch:** `main`

Space-themed project with directly relevant assets.

| Path | Contents |
|------|----------|
| `Assets/Materials/Laser.mat` | Extreme HDR emission `{r: 178.9}` — how intense glow works |
| `Assets/Materials/Planet.mat` | Planet sphere material |
| `Assets/Prefabs/Planet.prefab` | Sphere + Transform + MeshFilter + MeshRenderer — our Star prefab template |
| `Assets/DefaultVolumeProfile.asset` | Production bloom/tonemapping for a space scene |

### Also noted (less directly useful)
- **Unity-Technologies/BoatAttack** — URP showcase, useful for complex post-processing scenes
- **Unity-Technologies/SpaceshipDemo** — HDRP (not URP), but shows space VFX patterns
- **Unity-Technologies/HDR-Calibration-Sample** — has URP variant, useful for HDR display tuning on the LED wall

---

## 15. Local Project Analysis (`/Users/ivo/cosmos/`)

### Project overview

URP 3D project (Unity 6.x) with two imported asset packs:
- **ParallelCascades/ECSNBodySimulation** — ECS-based N-body gravity sim with Burst-compiled systems
- **Stagit/SkyboxEarthPlanets** — 23 cubemap skybox materials (Earth, Moon, Mars, Jupiter variants + stars-only)

**Render pipeline**: URP 17.4.0 with dual quality profiles (PC + Mobile).

### What we can reuse directly

| Asset | Path | How to use |
|-------|------|------------|
| **Star Unlit shader graph** | `ParallelCascades/ProceduralShaders/Shaders/Star Unlit.shadergraph` | Already does procedural star coloring with Color_A/Color_B gradient + optional Fresnel glow. Use as-is for binary star spheres |
| **Star.mat** | `ParallelCascades/ProceduralShaders/Materials/Star.mat` | Orange-yellow star material. Clone + modify Color_A/Color_B per star temperature |
| **Sun.prefab** | `ParallelCascades/ECSNBodySimulation/Samples/Prefabs/Sun.prefab` | Sphere mesh (scale 30) + Star.mat + Rigidbody + NBody components. Strip ECS components, keep mesh+material structure |
| **Stars-only skybox** | `Stagit/SkyboxEarthPlanets/skyboxes/skyboxv1_starsonly.mat` | 6-sided cubemap starfield — replaces the procedural Three.js starfield entirely. Drop-in background |
| **Space skyboxes** | `Stagit/SkyboxEarthPlanets/skyboxes/skyboxv1_moon_earth.mat` etc. | Beautiful alternatives for different presentations |
| **FlyCamera.cs** | `ParallelCascades/Common/Runtime/FlyCamera.cs` | WASD+mouse fly camera with sprint. Can use as-is or adapt for orbit-style camera |
| **PC_RPAsset.asset** | `Assets/Settings/PC_RPAsset.asset` | URP pipeline: HDR enabled, 2048 shadows, 4 cascades, SRP Batcher. Ready for high-quality rendering |
| **PC_Renderer.asset** | `Assets/Settings/PC_Renderer.asset` | Forward renderer with SSAO + post-processing enabled |
| **VFX Skybox.prefab** | `ParallelCascades/ProceduralSpaceSkybox/Core/VFX/VFX Skybox.prefab` | VFX Graph procedural starfield (alternative to cubemap skybox) |

### Volume Profile bloom settings (existing)

Two Volume Profiles exist with bloom already configured:

**DefaultVolumeProfile.asset** (project-wide):
```yaml
Bloom:
  threshold: 0.9
  intensity: 0       # disabled — needs to be turned up
  scatter: 0.7
```

**Sample Volume Profile.asset** (N-Body sample scenes):
```yaml
Bloom:
  threshold: 0.7
  intensity: 1        # active — good starting point
  scatter: 0.7
```

The Sample Volume Profile has bloom already working — use this as our starting point, or clone it.

### Star material properties (from Star.mat)

The Star Unlit shader graph uses these properties:
```
_Color_A: {r: 0.915, g: 0.344, b: 0.108}  — inner/hot color (orange-red)
_Color_B: {r: 1.0, g: 0.766, b: 0.0}       — outer color (yellow)
_Fresnel_Color: {r: 2.0, g: 0.654, b: 0.0} — edge glow (HDR orange, r=2 drives bloom)
_FRESNEL_EFFECT: 0                           — Fresnel disabled by default
_Fresnel_Power: 10                           — Fresnel falloff exponent
```

**For binary star conversion**: Create two material instances:
- Star1 (hot, blue-white): `_Color_A: {0.67, 0.8, 1.0}`, `_Color_B: {0.53, 0.67, 1.0}`, Fresnel HDR blue
- Star2 (cool, yellow-orange): keep current Star.mat values or tweak slightly

The shader also supports an `_Equirectangular_Color_Texture` — our 8k_sun.jpg can slot in here for surface detail.

### Sun.prefab structure (our template)

```
Sun (root GameObject)
├── Transform: scale (1,1,1)
├── NBodyAuthoring (DoNotReceiveGravity=true)    ← STRIP for our sim
├── Rigidbody (mass=100000, useGravity=false)    ← STRIP
├── URPPlanetShaderMaterialPropertiesAuthoring   ← STRIP
├── SatelliteSpawnerAuthoring                    ← STRIP
├── MainSpaceLightAuthoring                      ← STRIP (unless we want dynamic lighting)
├── RotatingBodyAuthoring (y: 3 deg/s)           ← KEEP (slow rotation looks good)
└── Sphere (child)
    ├── Transform: scale (30,30,30)              ← Adjust per star radius
    ├── MeshFilter: built-in sphere (fileID: 10207)
    └── MeshRenderer: Star.mat (guid: 41fef224...)
```

For binary star: duplicate this structure twice, strip all ECS/NBody components, add our `BinaryStarSimulation` MonoBehaviour to the parent.

### What NOT to reuse

| Asset | Why skip |
|-------|----------|
| ECS N-Body gravity system | Overkill — our binary star uses analytical Kepler orbits, not numerical integration. The Three.js app solves Kepler's equation directly (exact solution), which is both simpler and more accurate for a two-body system |
| Unity Physics package | Not needed — no collisions, no rigid body dynamics. Stars move on prescribed ellipses |
| Satellite spawner | Designed for random N-body spawning, not prescribed binary orbits |
| VFX Graphs (explosions, hit sparks) | No collisions in binary star sim |
| Orbit line drawing system (ECS) | Uses `Debug.DrawLine` (gizmos only, not rendered in builds). We need `LineRenderer` instead |

### Key architectural decision: MonoBehaviour vs ECS

The N-Body asset uses full ECS (Entities, Burst, Jobs). **We should NOT use ECS** for the binary star:

- **Two bodies** — zero performance benefit from Burst/Jobs for 2 objects
- **Analytical orbits** — we solve Kepler's equation, not integrate forces. The math is O(1) per frame
- **Simple scene** — MonoBehaviour + Update() is simpler, more maintainable, easier to extend
- **Future apps** — most COSMOS interactives have <100 objects; ECS overhead isn't justified
- **Readability** — a single `BinaryStarSimulation.cs` MonoBehaviour with ~60 lines is clearer than 10 ECS components + 5 systems

Exception: if a future app needs thousands of particles (e.g. large-scale structure, galaxy rotation curve with 10K+ star particles), ECS could help. Cross that bridge when we get there.

---

## 16. Revised Implementation Plan

### Architecture: simple MonoBehaviour stack

```
BinaryStar scene
├── Camera (OrbitCamera.cs or FlyCamera.cs)
│   └── Post-processing enabled, references Volume Profile with bloom
├── Global Volume → Volume Profile (clone of Sample Volume Profile)
│   └── Bloom: threshold 0.7, intensity 1.0, scatter 0.7
├── Skybox: skyboxv1_starsonly.mat (Lighting → Environment → Skybox Material)
├── BinarySystem (empty parent, BinaryStarSimulation.cs attached)
│   ├── Star1 (sphere mesh + Star1.mat clone)
│   ├── Star2 (sphere mesh + Star2.mat clone)
│   ├── OrbitTrail1 (LineRenderer, additive material)
│   ├── OrbitTrail2 (LineRenderer, additive material)
│   └── CenterOfMass (tiny sphere, semi-transparent)
└── Optional: Directional Light (dim, for subtle fill)
```

### Scripts to write (Claude delivers these as .cs files)

| Script | Lines (est.) | Purpose |
|--------|-------------|---------|
| `KeplerSolver.cs` | ~20 | Static: `Solve(M, e)`, `TrueAnomaly(E, e)` — verbatim from Three.js |
| `StarUtils.cs` | ~20 | Static: `StarColor(T)` temperature → Color mapping |
| `BinaryStarSimulation.cs` | ~120 | MonoBehaviour: orbital state, star positioning, orbit trail updates, preset switching, material color updates. All in one file |
| `OrbitCamera.cs` | ~50 | MonoBehaviour: drag-to-orbit, scroll-to-zoom, smooth damping. Alternative to FlyCamera for orbit-style interaction |

**Total: ~210 lines of C# across 4 files.**

### Materials to create (clone + modify in Editor, or Claude generates .mat YAML)

| Material | Based on | Changes |
|----------|----------|---------|
| `Star1_Hot.mat` | `Star.mat` | `_Color_A`: blue-white, `_Color_B`: pale blue, `_Fresnel_Color`: HDR blue (r:0.5, g:2.0, b:5.0) |
| `Star2_Cool.mat` | `Star.mat` | Keep current orange-yellow, maybe enable Fresnel |
| `OrbitTrail.mat` | New (URP Particles/Unlit) | Additive blend, semi-transparent white |

### Assets that already exist (zero work)

| Need | Already have |
|------|-------------|
| Starfield background | `skyboxv1_starsonly.mat` cubemap skybox |
| Star shader | `Star Unlit.shadergraph` with Color_A/B + Fresnel |
| Bloom post-processing | Sample Volume Profile (threshold 0.7, intensity 1, scatter 0.7) |
| URP pipeline config | `PC_RPAsset.asset` (HDR, SRP Batcher, 2048 shadows) |
| Renderer with post-processing | `PC_Renderer.asset` (SSAO + post-processing enabled) |
| Sun texture (optional) | `star_color.png` in ProceduralShaders/Planet Textures/ |

### Step-by-step execution plan

```
Phase 1: Scripts (Claude writes, drops into Assets/Scripts/Cosmos/)
  [ ] Write KeplerSolver.cs
  [ ] Write StarUtils.cs  
  [ ] Write BinaryStarSimulation.cs
  [ ] Write OrbitCamera.cs

Phase 2: Materials (Claude generates .mat YAML or human clones in Editor)
  [ ] Clone Star.mat → Star1_Hot.mat (blue-white colors)
  [ ] Clone Star.mat → Star2_Cool.mat (adjust if needed)
  [ ] Create OrbitTrail.mat (URP Particles/Unlit, additive)

Phase 3: Scene assembly (human in Editor, ~15 min with instructions)
  [ ] Create new scene "BinaryStar"
  [ ] Set skybox: skyboxv1_starsonly.mat
  [ ] Add Global Volume, assign Sample Volume Profile (or clone with bloom intensity tweaked)
  [ ] Create empty "BinarySystem", attach BinaryStarSimulation.cs
  [ ] Create Star1: child sphere, assign Star1_Hot.mat
  [ ] Create Star2: child sphere, assign Star2_Cool.mat
  [ ] Create OrbitTrail1 + OrbitTrail2: GameObjects with LineRenderer, assign OrbitTrail.mat
  [ ] Create CenterOfMass: tiny sphere, semi-transparent material
  [ ] Add camera, attach OrbitCamera.cs (or use existing FlyCamera.cs)
  [ ] Wire references in BinaryStarSimulation Inspector
  [ ] Hit Play → verify

Phase 4: Tuning
  [ ] Adjust bloom intensity vs star emission HDR values
  [ ] Tune camera orbit speed / limits
  [ ] Test preset switching (keyboard: 1-5)
  [ ] Adjust orbit trail width/opacity
```

### What changed from the original plan

| Original assumption | Reality after project analysis |
|---|---|
| Need custom GLSL→HLSL shader port | Star Unlit shader graph already exists — just set colors |
| Need procedural starfield (ParticleSystem) | Cubemap skybox already exists (23 variants!) |
| Need to create URP pipeline from scratch | PC_RPAsset + PC_Renderer already configured with HDR + post-processing |
| Need to create bloom Volume Profile | Sample Volume Profile already has bloom (threshold 0.7, intensity 1) |
| Need to create star prefab from scratch | Sun.prefab exists as template (strip ECS, keep mesh+material) |
| Need ~350 lines of ported code | ~210 lines total (skybox + existing shader eliminate starfield + shader work) |
| Estimated 1 day for experienced dev | **Estimated 2–3 hours** with existing assets |
