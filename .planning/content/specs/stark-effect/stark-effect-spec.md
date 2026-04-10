# Stark Effect — Article Spec

## STATUS: COMPLETE

## Category
physics

---

## Definition

The Stark effect is the splitting and shifting of atomic or molecular spectral lines when the emitting or absorbing atom is placed in an external electric field. It is the electric-field analogue of the Zeeman effect (which involves magnetic fields), and its explanation was one of the early triumphs of quantum mechanics.

---

## Key Numbers

| Property | Value | Source |
|----------|-------|--------|
| Electric field applied by Stark (1913) | ~100,000 V/cm | Britannica |
| Linear energy shift in H n=2 level | ΔE = ±(3/2) e a₀ F (a₀ = Bohr radius, F = field) | starkeffects.com |
| Sublevels for principal quantum number n | 2n − 1 (symmetrically split) | Wikipedia |
| Quadratic energy shift | ΔE = −½ α₀ F² (α₀ = static polarizability) | Wikipedia |
| White dwarf T_eff range where Stark broadening dominates | 45,000–120,000 K | MDPI Universe 9(12):511 |
| Nobel Prize awarded to Stark | 1919 | Wikipedia / Britannica |

---

## Full Content

- **Core definition**: The Stark effect is the shifting and splitting of spectral lines in atoms, ions, or molecules subjected to an external electric field. [Wikipedia; NED/IPAC Glossary]
- The applied field alters electron energy levels by breaking the degeneracy of states with the same principal quantum number n but different orbital angular momentum ℓ. [Wikipedia]
- The perturbation operator is V = −**F** · **μ**, where **F** is the applied electric field and **μ** is the electric dipole moment of the atom. States whose dipole moment aligns with the field are lowered in energy; anti-aligned states are raised. [Wikipedia]
- For hydrogen, a level with principal quantum number n splits into 2n − 1 distinct sublevels, symmetric about the unperturbed energy. [Wikipedia]
- **Linear (first-order) Stark effect**: energy shift directly proportional to field strength F. Occurs in hydrogen and hydrogen-like atoms with n > 1, which possess degenerate states of opposite parity (2s and 2p mix to form hybrid states with a permanent dipole). For the n=2 level: ΔE = ±(3/2) e a₀ F. Also occurs in symmetric-top molecules. [starkeffects.com; Wikipedia]
- **Quadratic (second-order) Stark effect**: energy shift proportional to F². Applies to most atoms and molecules lacking permanent electric dipole moments, where inversion symmetry forbids a linear term. Shift = −½ α₀ F², where α₀ is the static electric polarizability. [Wikipedia]
- The effect is the electric-field analogue of the Zeeman effect (magnetic-field splitting). Both break degeneracy of atomic energy levels, but the underlying symmetry and selection rules differ. [Wikipedia; Britannica]
- **Polarization of components**: spectral components are polarized — those with the electric vector parallel to the field (π components) and those perpendicular (σ components) are observed at different angles. Viewed transversely, both π and σ are visible; viewed longitudinally (along the field), only σ appear. [Britannica]
- **Even-numbered Balmer lines** (Hβ, Hδ, …) have a distinctive Stark signature: they lack a central undisplaced component, which can produce a dip in emission line peaks or a bump in absorption troughs. [LibreTexts Stellar Atmospheres (Tatum)]
- **Stellar atmospheres**: a stellar atmosphere is a hot, highly ionized plasma and therefore an electrical conductor that cannot sustain macroscopic electric potential gradients. Classical resolved Stark splitting is therefore *not* directly observed in stellar spectra. [NED/IPAC Glossary; LibreTexts Stellar Atmospheres]
- **Stark broadening** (collisional/pressure broadening): passing ions and electrons in dense plasmas exert momentary micro-electric fields on radiating atoms, broadening rather than resolving the spectral lines. This broadening is proportional to the local electron and ion density. [NED/IPAC Glossary; LibreTexts Stellar Atmospheres]
- Van der Waals broadening is related: approaching neutral atoms induce transient electric dipoles on each other (origin of van der Waals forces, ∝ r⁻⁶), and the resulting micro-fields cause Stark-type broadening. [LibreTexts Stellar Atmospheres]
- **Balmer line widths as luminosity indicator**: broader hydrogen Balmer lines indicate denser, higher-gravity photospheres. This is a key criterion distinguishing main-sequence stars (wide Balmer lines) from supergiants (narrow lines) in the MK spectral classification system. [NED/IPAC Glossary; LibreTexts Stellar Atmospheres]
- **White dwarf diagnostics**: Stark broadening of hydrogen Balmer lines is the primary method for measuring surface gravity (log g) and T_eff in DA (hydrogen-atmosphere) white dwarfs. The Balmer line profile widths directly constrain the photospheric electron density. [ADS 2009ApJ...696.1755T; Bergeron et al. 1993]
- In DO white dwarfs (He-atmosphere, T_eff = 45,000–120,000 K), Stark broadening is larger than Doppler broadening for most plasma conditions, making it the dominant spectral diagnostic. Neglecting it significantly distorts element abundance determinations. [MDPI Universe 9(12):511]
- **Radio recombination lines**: Stark broadening of high-n hydrogen radio recombination lines (e.g., H110α at ~6 cm) has been used to measure electron density in dense HII regions such as DR 21 and W 3. [ADS 1985PAZh...11...17S]
- **Modern applications** beyond astronomy: electro-optic modulators in optical communications; quantum dot qubits in quantum computing; voltage-sensitive dye imaging of neuronal activity; manipulation and deflection of polar molecular beams. [starkeffects.com]
- The **AC (optical) Stark effect** — also called the Autler–Townes effect — involves oscillating (optical or microwave) fields rather than static DC fields and produces light-shifted energy levels; it is related but distinct from the classical Stark effect. [Wikipedia]

---

## Historical Context

- **1913**: Johannes Stark (German physicist, 1874–1957) discovers the effect by studying canal rays (positive ions) passing through a strong electric field behind a perforated cathode in a discharge tube. He applied fields of ~100,000 V/cm and observed that hydrogen Balmer lines split into multiple symmetrically spaced, polarized components. [Britannica; Wikipedia]
- **1913**: Antonino Lo Surdo (Italian physicist) independently observes the same phenomenon, but Stark's name prevailed in the literature. [Wikipedia]
- Earlier experimenters had failed to observe the effect because luminous gas is electrically conducting; Stark succeeded by keeping gas density very low and using very short electrode gaps. [Britannica]
- **1916**: Paul Epstein and Karl Schwarzschild independently derive theoretical explanations using the Bohr–Sommerfeld ("old") quantum theory, successfully predicting both the linear and quadratic Stark effect in hydrogen. This derivation was considered "one of the great triumphs of early quantum mechanics." [Wikipedia; Britannica]
- Modern quantum mechanics (perturbation theory) later provided a rigorous and general treatment, replacing the Bohr–Sommerfeld approach. [Wikipedia]
- **1919**: Stark awarded the Nobel Prize in Physics for the discovery of the Doppler effect in canal rays and the splitting of spectral lines in electric fields. [Nobel Prize.org]
- Naming: the effect is named solely for Stark despite Lo Surdo's simultaneous independent discovery.

---

## Sub-types / Classifications

1. **Linear (first-order) Stark effect**
   - Energy shift ∝ F
   - Occurs in hydrogen and hydrogen-like atoms (n > 1, degenerate opposite-parity states)
   - Also occurs in symmetric-top molecules with permanent electric dipole moments
   - For H n=2: ΔE = ±(3/2) e a₀ F (four sublevels split symmetrically)

2. **Quadratic (second-order) Stark effect**
   - Energy shift ∝ F²; formula: ΔE = −½ α₀ F²
   - Applies to most atoms and molecules (no permanent dipole moment, inversion symmetry)
   - Governed by the static polarizability α₀
   - Ground-state hydrogen and helium behave quadratically

3. **Stark broadening (pressure/collisional broadening)**
   - Not resolved splitting; line broadening due to random micro-electric fields from nearby charged particles (ions and electrons) in a plasma
   - Proportional to electron/ion density; key diagnostic for log g in white dwarfs and for luminosity class in MK classification
   - Dominant line-broadening mechanism in hot, dense stellar atmospheres

4. **DC vs. AC (optical) Stark effect**
   - DC: static external field (classical Stark effect)
   - AC/optical: oscillating electric field from a laser or microwave source; produces light-shifted (AC-Stark shifted) energy levels; related phenomenon called the Autler–Townes effect when resonant

---

## Related COSMOS Articles

- zeeman-effect
- spectral-classification
- absorption-line
- emission-line
- hydrogen
- balmer-series
- white-dwarf
- hii-region
- doppler-shift
- thermal-doppler-broadening
- morgan-keenan-luminosity-class
- photosphere
- ionisation

---

## Images (candidates — writer will select the best)

| File | Description | Recommended? |
|------|-------------|--------------|
| johannes-stark-portrait.jpg | Portrait of Johannes Stark, discoverer; public domain photo from Les Prix Nobel 1919 | yes — human face for Historical Context; public domain |
| stark-splitting-diagram.jpg | SVG energy level diagram showing Stark splitting in hydrogen vs. field strength (CC0); saved as .jpg but is actually an SVG — may need extension corrected | yes — best direct illustration of the core physics |
| stark-splitting-energy.jpg | PNG energy level diagram (Stark splitting in H near n=15); public domain; saved as .jpg but is PNG | yes — good alternative to SVG if SVG rendering is unavailable |
| lithium-stark-spectrum.jpg | Lithium energy level spectrum in an electric field (n=15); CC-BY-SA 3.0 | no — highly technical, shows Li not H, better for advanced QM context |

See each {image-name}-caption.md for full caption, credit, source, and license.

**Note on file extensions**: `stark-splitting-diagram.jpg` is actually an SVG file, and `stark-splitting-energy.jpg` is actually a PNG. Both were downloaded by `download-image.js` with a `.jpg` extension. The article builder should rename them to `.svg` and `.png` respectively (or the download-image.js script may need updating to handle non-JPEG types).

---

## Sources

1. **Wikipedia — Stark effect**: https://en.wikipedia.org/wiki/Stark_effect
2. **Britannica — Stark effect**: https://www.britannica.com/science/Stark-effect
3. **NED/IPAC Glossary (seed URL)**: https://ned.ipac.caltech.edu/level5/Glossary/Glossary_S.html
4. **LibreTexts Stellar Atmospheres (Tatum) §7.26**: https://phys.libretexts.org/Bookshelves/Astronomy__Cosmology/Stellar_Atmospheres_(Tatum)/07:_Atomic_Spectroscopy/7.26:_Stark_Effect
5. **starkeffects.com — Stark effect overview**: http://www.starkeffects.com/stark_effect.shtml
6. **MDPI Universe 9(12):511 — Stark Broadening of N VI lines**: https://www.mdpi.com/2218-1997/9/12/511
7. **Tremblay & Bergeron (2009) — DA White Dwarf Stark Broadening**: https://ui.adsabs.harvard.edu/abs/2009ApJ...696.1755T
8. **Bergeron et al. (1993) — Stark Broadening in White Dwarf Atmospheres**: https://ui.adsabs.harvard.edu/abs/1993ASIC..403..267B/abstract
9. **Smirnov (1985) — Stark broadening of radio recombination lines in DR-21 and W3**: https://ui.adsabs.harvard.edu/abs/1985PAZh...11...17S/abstract
10. **Nobel Prize — Johannes Stark**: https://www.nobelprize.org/prizes/physics/1919/stark/biographical/
11. **Wikimedia Commons — Stark_splitting-en.svg**: https://commons.wikimedia.org/wiki/File:Stark_splitting-en.svg
12. **Wikimedia Commons — Stark_splitting.png**: https://commons.wikimedia.org/wiki/File:Stark_splitting.png
13. **Wikimedia Commons — Johannes_Stark.jpg**: https://commons.wikimedia.org/wiki/File:Johannes_Stark.jpg
14. **Wikimedia Commons — Lfspec1.jpg**: https://commons.wikimedia.org/wiki/File:Lfspec1.jpg

---

## Handoff: Researcher → Writer

**Target length:** 200–400 words

**Gaps:** None significant. The Stark effect is well-documented. The quadratic energy shift formula uses polarizability α₀ — for the article it is sufficient to say the shift scales as the square of the field without the formula. The precise hydrogen n=2 splitting formula may be simplified for the general audience.

**Watch for:**
- Do not confuse Stark effect with Zeeman effect — they look similar (line splitting) but the causes differ (electric vs. magnetic field). The article should clearly state this distinction.
- Do not confuse classical Stark splitting (resolved components) with Stark broadening (unresolved pressure broadening in stellar plasmas) — both are Stark effect manifestations but their observational signatures are completely different.
- Note that resolved Stark splitting is NOT observed in stellar spectra because stellar atmospheres are good conductors; only Stark broadening is astrophysically relevant for stars.
- The AC Stark effect (Autler–Townes) is a related but distinct phenomenon; do not conflate with the DC Stark effect.
- Stark was a problematic historical figure (later a Nazi ideologue) — standard encyclopedia treatment does not dwell on this, but it explains why his independent discovery by Lo Surdo is sometimes emphasised in modern accounts.

**Key narrative arc for writer:**
1. Define the effect (spectral line splitting/shifting in electric field) and contrast with Zeeman.
2. Explain the physics: electric field breaks energy level degeneracy; linear vs. quadratic regimes.
3. Historical context: Stark's 1913 discovery, Nobel 1919, Lo Surdo independently.
4. Astrophysical relevance: classical Stark splitting not seen in stars (good conductors), but Stark broadening is the key diagnostic for white dwarf atmospheres, stellar luminosity class from Balmer line widths.
