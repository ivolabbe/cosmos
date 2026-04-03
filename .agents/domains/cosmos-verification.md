# Domain: COSMOS Verification & Quality Standards

*Verification infrastructure, automated checks, evidence requirements, and quality standards for COSMOS interactives and articles. Loaded by verifier agents.*

---

## Verification Infrastructure

### Local Server
```bash
cd /Users/ivo/Documents/Astro/SWIN/SAO/cosmos && python3 -m http.server 8765
```

### Automated Verification (verify.js)

```bash
# Interactive mode:
node .agents/code/verify.js http://localhost:8765/dev/[topic]-interactive.html \
  --screenshots /tmp --checks '{"toggle":"#cb-toggle"}'

# Article mode:
node .agents/code/verify.js http://localhost:8765/dev/[topic].html \
  --article --original articles/[topic].html --screenshots /tmp
```

Requires Puppeteer in `/tmp/node_modules/` (`cd /tmp && npm install puppeteer`).
Must run **headed** (`headless: false`) — WebGL requires GPU.

### What verify.js Checks (Interactive)
- Canvas exists, loading hidden, no JS errors
- Bloom pipeline (EffectComposer + UnrealBloomPass + OutputPass)
- Circular particles (gl_PointCoord present, no PointsMaterial)
- Spacebar handler, embedded mode, credit line
- Standard controls (rotate, speed, day)
- Screenshots at multiple states

### What verify.js Checks (Article)
- iframe exists with correct src
- Text preservation diff (word count ratio < 20%)
- Lexicon links present
- "data are" not "data is"
- Swinburne chrome (header, breadcrumb, title)
- Screenshot

## Evidence Ladder (mandatory for PASS verdict)

Every verification MUST progress through these levels. No skipping.

| Level | Check | How | Fail means |
|-------|-------|-----|-----------|
| 1. Existence | File exists, non-zero size | `ls -la dev/[topic]-interactive.html` | Artifact missing |
| 2. Substantive | Has `<canvas>`, `<script>`, expected controls | Read file, grep for elements | Stub or skeleton |
| 3. Mechanical | verify.js passes all automated checks | Run verify.js | House style violations |
| 4. Physics | Equations correct, values match expected | Console.log injection, manual calc | Wrong physics |
| 5. Visual | Screenshot comparison against references | Puppeteer screenshots + visual sub-agent | Below quality bar |

**A PASS requires all 5 levels.** "I read the code and it looks right" is not verification.

## Physics Verification (manual — core job)

### Direction & Geometry Sanity
For every visual physics element, verify:
- **Direction**: things point/flow the right way (beams diverge, orbits prograde)
- **Shape**: geometries match physics (dipole loops not rays, ellipses not circles when e > 0)
- **Scale relationships**: relative sizes/distances physically reasonable

### Spec-Based Checks
Read the spec's verification criteria. For each:
- Measure/verify against actual render
- If measurable: inject `console.log` via Puppeteer to read values
- If behavioral: test by interacting with controls
- If visual: compare screenshot to reference

### Cross-Check Against External References
- Compare to spec's reference code (astropy, galpy, published repos)
- Check against university educational resources or NASA tools
- Derive test values if spec doesn't provide them

### Interaction ↔ Controls Consistency
When camera rotation and a control parameter are linked to the same physical quantity:
- Document whether camera rotation is cosmetic-only or physics-linked
- If linked: ensure rotating camera updates relevant physics and readouts
- Example: binary star inclination slider vs camera angle must agree

## Verification Report Format

```markdown
## [PASS/FAIL]: [topic] [interactive/article]

**Screenshots**: [paths — MANDATORY]
**Agent instructions checked**: [which .md file was read]
**Evidence level reached**: [1-5, all must be 5 for PASS]

### Checklist

| # | Category | Check | Result | Detail |
|---|----------|-------|--------|--------|
| 1 | Existence | File exists, non-zero | PASS/FAIL | [size] |
| 2 | Substantive | Canvas + script + controls | PASS/FAIL | [what's present] |
| 3 | Mechanical | verify.js passes | PASS/FAIL | [output summary] |
| 4 | Physics | [spec check 1] | PASS/FAIL | [measured vs expected] |
| ... | Physics | [spec check N] | PASS/FAIL | [measured vs expected] |
| N | Visual | Quality vs references | PASS/FAIL | [visual report summary] |

### Verdict: [PASS / FAIL]
- Passed: X/N
- Failed: [list failed check numbers]

### Failed checks detail (if any):
1. **Check #[N]**: [expected] vs [found].
   **Suggested fix**: [specific, actionable].

### Passed checks: [list — so agent doesn't break these on retry]
```

**This report MUST be appended to `.planning/apps/[topic].md`** under `## Verification Log`.

## Failure Diagnosis Tools

| Symptom | Tool | Diagnosis |
|---------|------|-----------|
| Black screen | Puppeteer screenshot | WebGL failed — check headed mode |
| Wrong colors | Screenshot + spec | Material/uniform values wrong |
| No controls | DOM query `#cb-rotate` | HTML missing or wrong IDs |
| Console errors | `page.on('console')` | JS bug — report error text |
| Texture 404 | Network request log | Wrong asset path |
| No rotation | Two screenshots 5s apart | Animation bug |

## Visual Quality Gate

Visual assessment is context-heavy. The verifier dispatches a visual-qa sub-agent:

```
Dispatch visual-qa agent:
- Spec: .planning/apps/[topic]-spec.md
- Build URL: http://localhost:8765/dev/[topic]-interactive.html
- Style guide: .agents/INTERACTIVE-STYLE-GUIDE.md (or domain equivalent)
```

### Visual Rules (never change physics to match visuals)
Only adjust: zoom, camera position, brightness, opacity, bloom, colour, line thickness, point size, particle count, material properties, shader uniforms, visual scale.

Never change: orbital mechanics, rotation rates, field line equations, beam angles, force laws, mass ratios, or any simulation parameter.

## Article Verification

If verify.js fails on preservation → automatic FAIL. Writer must strip excess modifications.

Manual checks after verify.js passes:
| Check | Pass criteria |
|-------|---------------|
| Interactive renders in iframe | 3D scene visible, not blank |
| Caption quality | Mentions drag/rotate/zoom, has "Open fullscreen" link |
| Facts match spec | No contradictions introduced |
