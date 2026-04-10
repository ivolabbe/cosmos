# Sunyaev–Zel'dovich Process — Article Spec

## STATUS: COMPLETE

## Category
cosmology

## Definition

The Sunyaev–Zel'dovich (SZ) effect is the spectral distortion of the cosmic microwave background (CMB) caused by inverse Compton scattering of CMB photons off hot electrons in the intracluster medium of galaxy clusters, shifting photon energies and producing a characteristic decrement below ~217 GHz and an increment above that frequency — a signal that does not fade with redshift. [Wikipedia; Carlstrom et al. 2002, ARA&A]

## Key Numbers

| Property | Value | Source |
|----------|-------|--------|
| Frequency null (thermal SZ) | ~217–218 GHz | Carlstrom et al. 2002; ESA/Planck |
| Typical CMB temperature distortion | ~1 mK | Wikipedia; Carlstrom et al. 2002 |
| Typical Compton y-parameter | ~10⁻⁴ | Carlstrom et al. 2002 |
| ICM electron temperature range | k_B T_e ~ 2–17 keV | Carlstrom et al. 2002 |
| Scattering probability (cluster centre) | ~1% | Carlstrom et al. 2002 |
| Central optical depth (CL 0016+16 example) | τ_e0 ≈ 0.01 h₁₀₀^(−1/2) | Birkinshaw 1999 |
| Central ΔT (CL 0016+16 example) | ~−0.84 h₁₀₀^(−1/2) mK | Birkinshaw 1999 |
| Kinematic SZ amplitude (supercluster scale) | < 8 μK | Wikipedia |
| kSZ relativistic correction (10 keV, 1000 km/s peculiar v) | ~8% | Carlstrom et al. 2002 |
| H₀ from SZ+X-ray (41-cluster sample) | ~61 ± 3 ± 18 km s⁻¹ Mpc⁻¹ | Reese 2004/NED |
| SPT-SZ optically confirmed clusters (2500 deg²) | 516 | arXiv:1409.0850 |
| ACT DR6 clusters discovered | 10,040 (incl. 1,180 at high-z) | ACT DR6 catalog 2024 |
| First observational detection | 1984 | Wikipedia |
| Ωm from tSZ cluster counts + power spectrum | 0.32 ± 0.02 | A&A 2018 |
| σ₈ from tSZ cluster counts + power spectrum | 0.76 ± 0.03 | A&A 2018 |

## Full Content

### Physical Mechanism

- CMB photons (microwave photons from the recombination epoch, T_CMB ≈ 2.725 K) travel through the hot, ionised gas — the intracluster medium (ICM) — that fills the space between galaxies in a cluster [Wikipedia; Carlstrom et al. 2002]
- The ICM is a tenuous plasma at electron temperatures of k_B T_e ~ 2–17 keV (roughly 10⁷–10⁸ K), far hotter than the CMB photons; free electrons vastly outenergise the photons [Carlstrom et al. 2002]
- Through **inverse Compton scattering**, photons receive an energy boost of order k_B T_e / m_e c² per scattering; roughly 1% of photons scatter as they pass through the cluster centre [Carlstrom et al. 2002]
- The net effect is a shift of photons from the Rayleigh–Jeans to the Wien part of the CMB spectrum, characterised by the **Compton y-parameter**: y = ∫ (σ_T n_e k_B T_e / m_e c²) dl, integrated along the line of sight [Carlstrom et al. 2002]
- The spectral distortion is ΔT_SZ / T_CMB = y · f(x), where x = hν / k_B T_CMB; f(x) changes sign at the **null frequency ~217–218 GHz** [Carlstrom et al. 2002; ESA/Planck]
- Below ~217 GHz: CMB intensity is **decreased** (photons scattered to higher frequencies leave a deficit) [ESA/Planck]
- Above ~217 GHz: CMB intensity is **increased** [ESA/Planck]
- Typical distortion for a massive cluster is ~1 mK — tiny relative to the 2.725 K CMB background but detectable with modern radio and millimetre-wave telescopes [Wikipedia]

### Redshift Independence

- **Critical advantage**: the SZ signal does not diminish with distance (unlike X-ray or optical emission, which fade as 1/D²) [Wikipedia; Carlstrom et al. 2002]
- A cluster at z = 2 produces the same SZ signal as an identical cluster at z = 0.1 — the effect depends only on the cluster's physical properties, not its angular diameter distance [Carlstrom et al. 2002]
- The integrated SZ flux (the Compton y summed over the cluster's angular extent) scales with temperature-weighted mass divided by D_A², giving a near-redshift-independent mass threshold for blind cluster surveys [Carlstrom et al. 2002]

### Thermal SZ Effect (tSZ)

- Dominant variant; caused by random thermal motions of ICM electrons [Wikipedia]
- Produces the characteristic spectral distortion with a null at ~217 GHz; decrement below, increment above [Carlstrom et al. 2002]
- Proportional to the integrated electron pressure along the line of sight (the y-parameter) [Carlstrom et al. 2002]
- Amplitude scales with cluster mass and temperature; typical y ~ 10⁻⁴ [Carlstrom et al. 2002]
- Relativistic corrections become important at T_e > ~5 keV — a few percent in the Rayleigh–Jeans portion of the spectrum for 10 keV clusters [Carlstrom et al. 2002]

### Kinematic (Kinetic) SZ Effect (kSZ)

- Caused by bulk motion of the cluster relative to the CMB rest frame (peculiar velocity) via the Doppler effect [Wikipedia; Carlstrom et al. 2002]
- Distortion: ΔT_kin = −T_CMB (V_p/c) τ_e, where V_p is line-of-sight peculiar velocity and τ_e is optical depth [Wikipedia]
- Sign indicates direction of motion: cluster moving toward observer → increment; moving away → decrement [Wikipedia]
- Amplitude typically < 8 μK for superclusters — roughly 10× smaller than the thermal effect [Wikipedia]
- Lacks a spectral null at 217 GHz; spectrally distinguishable from tSZ only through multi-frequency decomposition [Carlstrom et al. 2002]
- Also known as the Ostriker–Vishniac effect in the context of large-scale structure formation [Wikipedia]
- First statistical detection achieved with ACT in 2012; individual detection in cluster MACS J0717.5+3745 [Wikipedia]

### Cosmological Applications

1. **Galaxy cluster surveys**: SZ surveys find clusters above a near-redshift-independent mass threshold, enabling statistically clean, volume-complete samples; SPT confirmed 516 clusters in 2500 deg²; ACT DR6 found 10,040 clusters [arXiv:1409.0850; ACT DR6 2024]
2. **Hubble constant measurement**: SZ ∝ n_e while X-ray ∝ n_e², so combining both breaks the density degeneracy and yields angular diameter distance directly; from ~41 clusters, H₀ ~ 61 ± 3 ± 18 km s⁻¹ Mpc⁻¹ [Reese 2004; Carlstrom et al. 2002]
3. **Cluster mass estimation**: Integrated SZ flux tightly correlates with total cluster mass, providing mass estimates independent of X-ray spectroscopy [Carlstrom et al. 2002]
4. **Cosmological parameters**: Cluster abundance from SZ surveys constrains Ωm and σ₈; tSZ-based constraints give Ωm = 0.32 ± 0.02, σ₈ = 0.76 ± 0.03 [A&A 2018]
5. **Missing baryons**: kSZ has been used to probe warm–hot intergalactic medium (WHIM) in cosmic web filaments [A&A 2019]

### Polarisation (future)
- SZ effect produces tiny CMB polarisation signals: ~10 nK from cluster velocity effects and ~50(τ_e/0.01) nK from CMB quadrupole coupling — currently below detection thresholds but a target for future satellite missions [Carlstrom et al. 2002]

## Historical Context

- **1970**: Rashid Sunyaev and Yakov B. Zel'dovich (Soviet astrophysicists) predict that hot electrons in galaxy clusters would distort the CMB spectrum through inverse Compton scattering [Sunyaev & Zel'dovich 1970, Comm. Astrophys. Space Phys. 2, 66]
- **1972**: Sunyaev & Zel'dovich publish the full thermal and kinematic effect derivations; the kinematic (Doppler) variant from cluster peculiar motion is described in this paper [Sunyaev & Zel'dovich 1972]
- **1984**: First observational detection of the SZ effect from galaxy clusters by the Cambridge Radio Astronomy Group and Owens Valley Radio Observatory [Wikipedia]
- **1993**: Detection in the Coma Cluster by Herbig, Lawrence, Readhead & Gulkis [ResearchGate]
- **1994**: Ryle Telescope produces the first resolved cluster image using the SZ effect [Wikipedia]
- **2005**: Dedicated SZ instruments achieve first light: APEX-SZ and the Sunyaev–Zel'dovich Array (SZA) [Wikipedia]
- **2012**: ACT achieves first statistical kinematic SZ detection; individual kSZ detection in MACS J0717.5+3745 [Wikipedia]
- **2015**: SPT reports 415 galaxy clusters discovered via the SZ effect over its 2500 deg² survey [Wikipedia]
- **2024**: ACT DR6 catalog released with 10,040 SZ-detected clusters — the largest SZ cluster sample to date [ACT DR6 2024]

**Naming**: Named after Rashid Sunyaev (b. 1943, Tashkent) and Yakov Borisovich Zel'dovich (1914–1987, Minsk), two of the most influential Soviet astrophysicists and cosmologists of the 20th century. Zel'dovich also made foundational contributions to the theory of large-scale structure and the cosmic web.

## Sub-types / Classifications

| Variant | Cause | Spectral Signature | Typical Amplitude |
|---------|-------|--------------------|-------------------|
| **Thermal SZ (tSZ)** | Random thermal motions of ICM electrons (inverse Compton) | Null at ~217 GHz; decrement below, increment above | ~1 mK |
| **Kinematic/Kinetic SZ (kSZ)** | Bulk peculiar velocity of cluster relative to CMB frame (Doppler) | Mimics a pure thermal CMB fluctuation; no spectral null | < 8 μK |
| **Relativistic tSZ** | High-T corrections to non-relativistic Compton formula (T_e > 5 keV) | Modified shape of tSZ spectrum | ~few% correction at 10 keV |
| **Polarisation SZ** | Multiple scattering + CMB quadrupole; cluster velocity | Tiny polarised CMB distortion | ~10–50 nK (not yet detected) |

## Related COSMOS Articles

- `cosmic-microwave-background`
- `intra-cluster-medium`
- `large-scale-structure`
- `blackbody-radiation`
- `baryonic-matter`
- `cosmological-redshift`
- `peculiar-velocity`
- `baryonic-acoustic-oscillations`
- `dark-matter`
- `hubble-flow`
- `non-thermal-radiation`
- `radio-interferometer`

## Images (candidates — writer will select the best)

| File | Description | Recommended? |
|------|-------------|--------------|
| sunyaev-zeldovich-illustration.jpg | NASA/Chandra illustration showing CMB photons interacting with galaxy cluster electrons | yes — public domain, purpose-built explanation of mechanism |
| sunyaev-zeldovich-alma-rxj1347.jpg | ALMA observation of cluster RX J1347.5–1145 showing SZ decrement as a dark "hole" | yes — real observational data, visually striking, CC-BY |
| sunyaev-zeldovich-spiderweb.jpg | ESO composite of Spiderweb protocluster with ALMA SZ data (blue overlay) | no — primarily about the Spiderweb system, less direct for SZ explainer |

See each {image-name}-caption.md for full caption, credit, source, and license.

## Sources

1. Wikipedia — Sunyaev–Zeldovich effect: https://en.wikipedia.org/wiki/Sunyaev%E2%80%93Zeldovich_effect
2. Carlstrom, Holder & Reese (2002), "Cosmology with the Sunyaev-Zel'dovich Effect", ARA&A 40, 643: https://ned.ipac.caltech.edu/level5/Sept05/Carlstrom/Carlstrom2.html / https://arxiv.org/abs/astro-ph/0208192
3. Birkinshaw, M. (1999), "The Sunyaev-Zel'dovich effect" (NED/IPAC review): https://ned.ipac.caltech.edu/level5/Birkinshaw/Birk4_1.html
4. Reese, E.D. (2004), "Measuring the Hubble Constant with the SZ Effect" (NED/IPAC): https://ned.ipac.caltech.edu/level5/March04/Reese/Reese4.html
5. ESA/Planck — "Hunting Galaxy Clusters with Planck – The SZ Effect": https://sci.esa.int/web/planck/-/48227-hunting-galaxy-clusters-with-planck-the-sz-effect
6. ESA/Planck — "Illustration of the Sunyaev-Zel'dovich effect": https://sci.esa.int/web/planck/-/48230-illustration-of-the-sunyaev-zel-dovich-effect
7. Bleem et al. (2015), "Galaxy Clusters Discovered via the SZ Effect in the 2500 deg² SPT-SZ Survey": https://arxiv.org/abs/1409.0850
8. ACT DR6 Sunyaev-Zel'dovich Selected Galaxy Clusters Catalog (2024): https://arxiv.org/html/2507.21459 / https://astro.theoj.org/article/155863
9. Tanimura et al. (2019), "Probing the missing baryons with the SZ effect from filaments", A&A: https://www.aanda.org/articles/aa/full_html/2019/04/aa35159-19/aa35159-19.html
10. Salvati et al. (2018), "Constraints from thermal SZ cluster counts and power spectrum combined with CMB", A&A: https://www.aanda.org/articles/aa/full_html/2018/06/aa31990-17/aa31990-17.html
11. ESO press release eso2304a — Spiderweb protocluster: https://www.eso.org/public/images/eso2304a/

## Handoff: Researcher → Writer

**Target length:** 300–400 words
**Gaps:** No major gaps. The Hubble constant value from SZ+X-ray (H₀ ~ 61 km s⁻¹ Mpc⁻¹) is somewhat low compared to modern measurements — this is because SZ-based H₀ estimates carry large systematic errors and the 41-cluster sample is from ~2004. The writer should mention the technique but note it as a distance-independent method rather than presenting the number as the current best estimate.
**Watch for:** 
- The tSZ effect has a decrement (cluster looks "cold") below 217 GHz and an increment above — this is the opposite of what some readers might expect. Make sure the explanation is clear.
- "Kinematic" and "kinetic" SZ are the same thing — both terms are used in the literature; do not treat them as different effects.
- The Compton y-parameter is not the same as optical depth τ_e; y = τ_e × (fractional energy gain per scatter).
- Do not describe the SZ effect as "the cluster blocking the CMB" — it is a scattering/boosting process, not absorption.
- Data are plural throughout.
