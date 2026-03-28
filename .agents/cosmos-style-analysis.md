# COSMOS Encyclopedia -- Writing Style Analysis

**Based on:** 10 in-depth article readings (pulsar, binary-star, dark-matter, supernova, galaxy, neutron-star, black-hole, redshift, big-bang, stellar-evolution) plus corpus-wide word count statistics across all 643 articles.

---

## 1. Summary

The COSMOS Encyclopedia reads like a university-level reference written by working astronomers for an educated but non-specialist audience. The voice is authoritative, measured, and precise -- the kind of prose a lecturer would write for a study guide rather than a popular-science magazine or a dry textbook. Articles explain physical concepts using plain language and analogies, but do not shy away from technical vocabulary; instead, they hyperlink every technical term to its own COSMOS entry, making the encyclopedia self-contained. The overall effect is approachable expertise: the reader feels they are learning from a scientist who respects their intelligence but does not assume prior training.

---

## 2. Reading Level

**Audience:** Educated general public, undergraduate astronomy students, and adult learners (Swinburne Astronomy Online students are the primary audience).

- **Not pop-science:** Articles do not use jokes, clickbait hooks, or rhetorical questions to grab attention.
- **Not a textbook:** Articles do not assign homework, derive equations step-by-step, or use numbered-theorem formatting.
- **Comparable to:** A well-written Wikipedia article on a scientific topic, or an introductory university lecture note.
- **Estimated Flesch-Kincaid grade level:** 12--15 (late high school to early college). Sentences are moderately long (20--35 words typical), with embedded subordinate clauses, but they remain parseable.

---

## 3. Typical Article Structure

1. **Opening definition** -- the first sentence defines the term directly. There is no preamble, anecdote, or scene-setting. Examples:
   - "A pulsar is an extra-terrestrial source of radiation that has a regular periodicity..."
   - "A galaxy is a gravitationally bound entity, typically consisting of dark matter, gas, dust and stars."
   - "A black hole is a region of space... within which the force of gravity is so strong that nothing, not even light, can escape."

2. **Elaboration paragraphs** -- expand on the definition with physical context, mechanisms, observational evidence, and historical background. These are flowing prose paragraphs, not bullet lists (though bullets appear for classification sub-types).

3. **Sub-type classification** (where applicable) -- bold inline headings or `<strong>` labels introduce sub-categories (e.g., "Radio pulsars", "X-ray pulsars", "Visual Binaries", "Spectroscopic Binaries"). These are not `<h2>`/`<h3>` tags but bold text within `<p>` or standalone `<p><strong>` blocks.

4. **Images with captioned credit** -- 1--2 images per article (sometimes 0, sometimes up to 5 for image-rich articles like Galaxy), floated left or right with descriptive captions and source credits.

5. **Closing context or "See also"** -- some articles end with a brief forward-pointing remark or a "See also:" list linking to related entries. There is no summary, no conclusion heading, and no call-to-action.

**What is absent:** No abstract, no introduction heading, no section numbers, no bibliography, no footnotes, no author attribution per article.

---

## 4. Tone and Register

- **Register:** Semi-formal academic. Contractions are avoided ("it is", not "it's"). Sentences use the declarative mood almost exclusively.
- **Voice:** Predominantly passive and impersonal ("it is generally accepted that...", "they are classified according to...", "observations reveal that..."). The word "we" appears occasionally to mean "humanity" or "observers on Earth" ("we see", "we can determine"), never to mean "we the authors".
- **Attitude toward the reader:** Respectful, not condescending. Concepts are explained but the reader is assumed to know what "gravity", "light", "temperature", and "orbit" mean at an everyday level.
- **Emotional tone:** Neutral and factual. Excitement comes through implicit wonder at the subject matter, not through exclamation marks or superlatives. Occasional restrained colour: "beautiful objects", "the enigmatic Geminga", "incredibly strong magnetic fields".
- **Historical asides:** Brief and factual, citing discoverers by name and date without hagiography ("The first radio pulsar was discovered in 1967 by Jocelyn Bell", "Karl Schwarzschild (1873-1916) and the little-known Johannes Droste").

---

## 5. Length Statistics (full corpus, N=643)

| Metric | Value |
|---|---|
| Minimum | ~5 words (stub entries) |
| 25th percentile | ~130 words |
| Median | ~210 words |
| Mean | ~259 words |
| 75th percentile | ~321 words |
| Maximum | ~2100 words |

**Distribution:**
- 15% of articles are under 100 words (brief definitions/stubs)
- 46% are 100--250 words (short encyclopedia entries)
- 31% are 250--500 words (standard entries)
- 6% are 500--800 words (substantial entries)
- 2% are 800--1200 words (major topic articles)
- <1% exceed 1200 words

**Major topic articles** in the sample ranged from 246 words (supernova -- a hub article that links out to sub-types) to 1014 words (black hole). The sweet spot for a significant topic is 500--900 words.

---

## 6. Technical Depth

### Numbers and units
- Scientific notation uses HTML superscript: `10<sup>17</sup> kg/m<sup>3</sup>`, `10<sup>31</sup> J s<sup>-1</sup>`
- Solar mass symbol: `M<sub>sun-symbol</sub>` rendered via HTML entities
- Approximate values use the tilde: "~ 10^7", "about 2.5 km", "around 10^11 stronger"
- Numbers are given to convey scale, not precision: "between 10 and 20 km across", "over 100 billion stars", "about 50 kpc in diameter"

### Equations
- Extremely rare. Only 1 of the 10 sampled articles (redshift) contains an equation, rendered as a pre-generated PNG image (`<img class="teximage">`).
- The albedo article also uses a tex-image equation.
- Equations are kept to simple ratios or definitions; no multi-line derivations.

### Jargon handling
- Technical terms are used freely but **each is hyperlinked** as `<a class="lexicon-term" href="...">` to its own COSMOS entry on first use (and often on repeated use).
- Acronyms are spelled out on first use: "Massive Compact Halo Objects" then "(MACHOs)", "High-mass X-ray binaries (HMXBs)".
- Analogies are used sparingly but effectively: "This is analogous to the increased spin of an iceskater if she concentrates her mass around her spin axis by bringing her arms close to her body", "imagine squeezing twice the mass of the Sun into an object about the size of a small city".

---

## 7. Cross-Linking

Cross-linking is **extremely dense**. Every article links copiously to other COSMOS entries using the `class="lexicon-term"` anchor pattern.

| Article | Word count | Lexicon links | Links per 100 words |
|---|---|---|---|
| Pulsar | 649 | 26 | 4.0 |
| Binary Star | 308 | 15 | 4.9 |
| Dark Matter | 825 | 35 | 4.2 |
| Supernova | 246 | 19 | 7.7 |
| Galaxy | 646 | 29 | 4.5 |
| Neutron Star | 871 | 34 | 3.9 |
| Black Hole | 1014 | 34 | 3.4 |
| Redshift | 480 | 28 | 5.8 |
| Big Bang | 852 | 30 | 3.5 |
| Stellar Evolution | 885 | 31 | 3.5 |

**Average: ~4.5 lexicon-term links per 100 words.** This is the most distinctive structural feature of COSMOS. Nearly every noun that has its own entry is linked, often multiple times within the same article (the same term can be linked each time it appears). This makes the encyclopedia deeply interconnected and encourages browsing.

---

## 8. Style Rules -- Do/Don't List

### DO:
- **Open with a direct definition.** First sentence = "[Term] is/are [definition]." No lead-in.
- **Use passive/impersonal voice** for describing physics ("it is generally accepted", "observations reveal").
- **Hyperlink technical terms** to their COSMOS entries using `class="lexicon-term"`. Link generously, including common terms like "star", "mass", "orbit".
- **Give numbers for scale** -- approximate values, orders of magnitude, ranges. Use HTML `<sup>` and `<sub>` for exponents and subscripts.
- **Use bold inline labels** (`<strong>`) for sub-type headings rather than HTML heading tags.
- **Credit discoveries** with brief historical context: name, date, institution.
- **Use analogies sparingly** to make extreme quantities relatable ("a teaspoon of neutron star material would weigh around a billion tonnes").
- **Include images** with descriptive captions and source credit lines.
- **End with forward links** ("See also: ...") where appropriate.
- **Spell out acronyms** on first use.
- **Keep articles concise.** Most entries are 150--500 words. Even major topics stay under 1000 words.

### DON'T:
- **Don't use conversational hooks** ("Have you ever wondered...?", "Imagine this:").
- **Don't use contractions** ("don't" -> "do not" in the article text; the original articles consistently avoid them).
- **Don't use first person** ("I", "we the authors"). Use "we" only to mean "humans/observers".
- **Don't editorialize or express opinion.** State facts; note debates neutrally ("is still not universally accepted").
- **Don't include equations** unless strictly necessary for the definition. If used, render as images.
- **Don't use section headings** (`<h2>`, `<h3>`). Structure is provided by bold labels, paragraph breaks, and bullet/numbered lists.
- **Don't write conclusions or summaries.** The article simply ends when the content is covered.
- **Don't use exclamation marks** for emphasis (the articles use them extremely rarely, and only within parenthetical asides: "this is an even more extreme state... !").
- **Don't add bibliographic references.** Credit for images only, not inline citations.
- **Don't oversimplify.** Use the correct technical term and link it, rather than substituting a vague paraphrase.

---

## 9. Representative Excerpts

### Excerpt 1 -- Authoritative opening definition (Black Hole)
> "A black hole is a region of space, or rather the mysterious object at the centre of a region of space, within which the force of gravity is so strong that nothing, not even light, can escape."

Note the characteristic pattern: direct definition, no preamble, slight parenthetical colour ("or rather the mysterious object"), precise physical statement.

### Excerpt 2 -- Scale-giving analogy with numbers (Neutron Star)
> "Neutrons stars are extreme objects that measure between 10 and 20 km across. They have densities of 10^17 kg/m^3 (the Earth has a density of around 5x10^3 kg/m^3 and even white dwarfs have densities over a million times less) meaning that a teaspoon of neutron star material would weigh around a billion tonnes. The easiest way to picture this is to imagine squeezing twice the mass of the Sun into an object about the size of a small city!"

Note: numbers for physical context, parenthetical comparison to familiar objects, a single vivid analogy, and a rare exclamation mark.

### Excerpt 3 -- Historical aside with factual precision (Big Bang)
> "The Big Bang model has its roots in the work of Lemaitre, Gamow and colleagues who, by reversing the observed expansion, concluded that the Universe must have began in an initially very hot, dense state. Fred Hoyle, a non-believer, is credited with first mockingly coining the term 'Big Bang', as he favoured steady state theory at the time."

Note: names and roles cited concisely, mild characterisation ("a non-believer", "mockingly coining"), no hagiography.

### Excerpt 4 -- Dense cross-linking in flowing prose (Galaxy)
> "A galaxy is a gravitationally bound entity, typically consisting of dark matter, gas, dust and stars. Galaxies populate the Universe, mainly residing in clusters and groups. There are thought to be over 100 billion galaxies in the observable Universe."

In the HTML, "dark matter", "dust", "stars", "Universe", "clusters", and "groups" are all individually hyperlinked as lexicon terms. The prose reads naturally despite the heavy linking.

---

## Usage Note

This analysis should be used by the writer agent to match the COSMOS voice when:
- Adding interactive embed descriptions or contextual paragraphs to existing articles
- Writing new encyclopedia entries
- Ensuring that any new text is indistinguishable in register, density, and structure from the existing 643-article corpus
