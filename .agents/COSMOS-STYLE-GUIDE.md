# COSMOS Encyclopedia -- Writing Style Analysis

**Based on:** 100 randomly sampled in-depth article readings plus corpus-wide word count statistics across all 643 articles. Sample includes stubs (60 words), short entries (100--200 words), standard entries (200--500 words), and major topic articles (500--1200 words), providing representative coverage of the full range.

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
   - "Bremsstrahlung radiation is the radiation given off by a charged particle..."
   - "Stellar evolution is a description of the way that stars change with time."
   - "An electron volt (eV) is the amount of kinetic energy gained by an electron as it passes through an electric potential difference of 1 Volt."

   **Opening variants** (all begin with the term, but framing differs):
   - **Direct "is" definition** (most common): "[Term] is/are [definition]."
   - **Historical/etymological**: "The word planet was originally derived from the Greek word for wanderer..."
   - **Problem-statement**: "The problem with most calendar systems is that they are based on 24-hour days, but..."
   - **Contrast**: "A shooting star is not actually a star at all, but rather the result of something much tinier."

2. **Elaboration paragraphs** -- expand on the definition with physical context, mechanisms, observational evidence, and historical background. These are flowing prose paragraphs, not bullet lists (though bullets appear for classification sub-types).

3. **Sub-type classification** (where applicable) -- formatted in one of three ways:
   - **Bold inline labels** (most common): `<strong>` labels introduce sub-categories within flowing prose (e.g., "**Radio pulsars**", "**Type I outbursts**"). These are not `<h2>`/`<h3>` tags.
   - **Bulleted or numbered lists**: Used for enumerated categories (e.g., Non-thermal Radiation lists three types; Friedmann-Lemaitre lists three universe models; Planet lists IAU criteria).
   - **Table layout**: Rare, used for side-by-side comparison of mechanisms (e.g., Glitch article comparing starquakes vs. vortex unpinning).

   **H2 sub-headings:** Consider using H2s when they help readability, typically for articles over ~300 words with distinct thematic sections. For articles over ~500 words it would be unusual if H2s did not help. There are no hard rules -- use judgment.

4. **Images with captioned credit** -- 1--2 images per article (sometimes 0, sometimes up to 5 for image-rich articles like Galaxy), floated left or right with descriptive captions and source credits. Captions are 1--3 sentences, descriptive and sometimes explanatory ("The hydrogen lines in the SNII spectrum have prominent P Cygni profiles, while..."). Credits always attributed (NASA, STScI, AAO, Swinburne, etc.).

5. **Closing context or "See also"** -- some articles end with a brief forward-pointing remark or a "See also:" list linking to related entries (e.g., Spectroscopy: "See also: abundance ratio"; Supernova: "See also: Type Ib supernova, Type Ic supernova..."). Most articles simply end when the content is covered -- there is no summary, no conclusion heading, and no call-to-action.

**What is absent:** No abstract, no introduction heading, no section numbers, no bibliography, no footnotes, no author attribution per article, no "Further Reading" section.

---

## 4. Tone and Register

**Target register: approachable expert.** Think of that person you know who is so brilliant that when they explain something it seems simple, logical, and easy to understand — even if you could not repeat it yourself. That is the voice. The writer deeply understands the topic and uses that understanding to make it clear, not to show off. The reader should never have to re-read a sentence to parse its structure. A keen high schooler or curious adult should be able to follow the article without a physics degree.

- **Accessible, not dumbed down.** Use straightforward language for the connective tissue of sentences. Reserve jargon for terms that have their own COSMOS entry (and link them). If a technical word does not add precision that a plain word lacks, use the plain word.
- **Varied voice.** Mix active and passive naturally. Do not default to passive for everything. Active voice is often clearer and more engaging. Passive is fine when the agent is unknown or unimportant.
- **Sentence structure: one idea per sentence.** Avoid packing three facts and two parenthetical asides into one sentence. Shorter, varied sentences read better than long compound ones. If a sentence runs past ~30 words, consider splitting it.
- **No contractions** in article text (see Section 4a below for rare legacy exceptions).
- **"We"** may mean "humanity/observers" ("we observe", "our Galaxy"), never "we the authors".
- **Attitude toward the reader:** Respectful, not condescending. The reader is assumed to know everyday words like "gravity", "light", "temperature", and "orbit".
- **Emotional tone:** Neutral and factual. Wonder comes through the subject matter itself, not through superlatives or exclamation marks.
- **Historical asides:** Brief and factual, citing discoverers by name and date without hagiography.

### 4b. Plain Language — Before and After

**This is the single most important rule in this guide.** If the article reads like a textbook or a journal paper, it has failed. Every sentence must pass this test: would you say it this way to a smart friend who is not a scientist? If not, rewrite it.

These examples show the kind of register shift writers must make. The "before" versions are technically correct but stiff. The "after" versions say the same thing in plain English.

| Before (too formal / too dense) | After (COSMOS voice) |
|---|---|
| Pluto's interior is thought to be differentiated, with a rocky silicate core roughly 1,700 km across surrounded by a water-ice mantle. | Pluto's interior appears to be layered, with a rocky core roughly 1,700 km across surrounded by a mantle of water ice. |
| It is locked in a 3:2 mean-motion resonance with Neptune, completing two orbits for every three of Neptune's, placing it in the dynamical class known as plutinos. | Pluto orbits in a 3:2 resonance with Neptune: it completes two orbits for every three of Neptune's. Objects sharing this rhythm are called plutinos. |
| Data from the New Horizons spacecraft provide evidence for a liquid water ocean 100–180 km thick at the core–mantle boundary, sustained by radioactive heating. | New Horizons data suggest a liquid water ocean, 100–180 km thick, lies between the core and mantle, kept from freezing by heat from radioactive decay. |
| The dark equatorial band Cthulhu Regio owes its reddish-brown colour to tholins, complex organic compounds produced by ultraviolet irradiation of methane and nitrogen. | The dark equatorial band called Cthulhu Regio gets its reddish-brown colour from tholins, complex organic molecules that form when ultraviolet light breaks down methane and nitrogen. |
| Newly deployed satellites travel together in a closely-spaced formation before dispersing to their operational orbits, producing a chain of bright, evenly-spaced points of light moving in unison across the sky. | Fresh batches travel in a tight line, producing a chain of bright, evenly spaced dots that drift together across the sky. |
| The best viewing conditions occur one to two hours after sunset or before sunrise, when the observer is in darkness but the satellites at altitude are still illuminated by the Sun. | They are easiest to spot one to two hours after sunset or before sunrise, when the ground is dark but the satellites are still lit by the Sun. |
| Twilight observations are disproportionately affected, because the satellites are brightest and most numerous in the sky during twilight. | Twilight observations are hit hardest, because that is when the satellites are brightest and most numerous. |
| The Vera C. Rubin Observatory, with its wide field of view and high sensitivity, is projected to be more severely affected than ZTF. | The Vera C. Rubin Observatory, with its wider field of view and higher sensitivity, will be even more affected. |
| Later satellite versions emit significantly more unintended radio radiation than earlier ones. | Newer satellites are worse. |
| SpaceX has pursued several approaches to reducing the optical brightness of its satellites. | SpaceX has tried several ways to make its satellites dimmer. |

**Key patterns in the rewrites:**
- Replace passive pileups with active subjects ("New Horizons data suggest..." not "Data provide evidence for...")
- Split compound sentences at natural breaks
- Gloss jargon inline on first use ("tholins, complex organic molecules that...") rather than assuming the reader knows
- Use the ordinary word for non-technical vocabulary
- Keep the same facts and precision, only the packaging changes
- Say it shorter. "Newer satellites are worse" beats "Later satellite versions emit significantly more unintended radio radiation than earlier ones"

### Word choice — use the ordinary word

**This is a hard rule, not a suggestion.** Technical jargon that names a specific concept (redshift, nucleosynthesis, ecliptic) must stay. But non-technical vocabulary must use everyday words. If you would not say it aloud to a friend, do not write it.

| Don't write | Write instead |
|---|---|
| inaugurated | marked the start of / began |
| designated | called / named |
| was substituted | was used instead / replaced it |
| the implied ability | what it meant was / this showed |
| compounding the anxiety | adding to the worry / making it worse |
| significant scientific return | important scientific result |
| competitive context | rivalry / competition |
| from antiquity | since ancient times |
| commensurability | (describe what it means, or drop it) |
| empirically | by observation |
| residing in | in |
| inaugurated the Space Age | marked the beginning of the Space Age |
| dispersing to their operational orbits | spreading out to their working orbits |
| without optical aid | with the unaided eye / without a telescope |
| disproportionately affected | hit hardest |
| is projected to be more severely affected | will be even more affected |
| pursued several approaches to reducing | tried several ways to reduce / cut |
| unintended electromagnetic radiation | stray radio signals / radio leakage |
| the original unmitigated v1.0 design | the original v1.0 |
| viewing conditions occur | easiest to spot when / best seen when |
| moving in unison | drifting together / moving together |

This is not about dumbing down. "Began" and "inaugurated" carry the same information; "began" is invisible, "inaugurated" makes the reader pause. The test is always: does the fancy word add precision that the plain word lacks? If not, use the plain word.

### Em-dashes — avoid

Em-dashes (—) are an AI writing tell and they complicate sentences. Almost every em-dash can be replaced by a comma, a full stop, parentheses, or a colon. **Default to not using them.** An entire article with zero em-dashes is fine. If one genuinely helps readability, allow it, but more than one or two in an entire article should raise a flag. When in doubt, rewrite the sentence without it.

**Key patterns in the rewrites:**
- Replace passive pileups with active subjects ("New Horizons data suggest..." not "Data provide evidence for...")
- Split compound sentences at natural breaks
- Gloss jargon inline on first use ("tholins — complex organic molecules that...") rather than assuming the reader knows
- Use the ordinary word for non-technical vocabulary
- Keep the same facts and precision — nothing is lost, only the packaging changes

### 4a. Rare Register Breaks

Across 100 articles, a small number of register-breaking patterns were found. These are exceptions, not rules:

- **1--2 contractions** in the entire corpus: "couldn't" appears in GRB History. This is anomalous -- the no-contraction rule holds for ~99% of articles.
- **Occasional informal phrasing** (2--3 instances): "you just have to be very quick to see it!" (GRB Afterglow), "a handy quantity" (Pulsar DM), "a slew of secondary particles" (Dark Matter).
- **Rare exclamation marks** (2--3 instances): Pierre Auger Observatory ("making it arguably the largest observatory in the world!"), GRB History ("It was not even clear whether these objects were part of the local or distant Universe!"). These are historical-drama emphasis, not pop-science excitement.
- **Occasional editorial aside**: "Somewhat surprisingly, current observational data favours the delicately balanced flat over both the open and closed models" (Friedmann-Lemaitre).

These are not style patterns to emulate. New articles should avoid them.

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

**Suggest split** if an article is over 700 words, consider splitting off a more detailed sub article.

### Topic importance calibration — match length to topic prominence

Before writing, ask: *how well-known is this topic?* A topic that appears in every introductory astronomy textbook warrants more depth than one only specialists encounter. Use the scale below:

| Topic type | Typical word count | What to include |
|---|---|---|
| Core concept (black hole, galaxy, star) | 500–900 words | Full treatment: definition, physics, types, history, significance |
| Standard undergraduate topic (pulsar, redshift, spectral type) | 300–500 words | Definition, key physics, observational role |
| Specialist/secondary topic (Stark effect, Sunyaev-Zel'dovich, barium stars) | 150–300 words | Definition + explanation of the key effect; history only if it is genuinely interesting |
| Minor or fringe topic (obscure catalog objects, rarely observed phenomena) | 100–200 words | Brief definition and one explanatory paragraph; nothing more |

**Practical test:** Ask whether a working astronomer outside the specific sub-field would recognise the term. If the answer is "probably not", keep the article short. Do not add a history section, a biography, or elaboration beyond what is needed to define and explain the concept. A 150-word article on a fringe topic is not a failure — it is correct calibration.

**Concrete example:** The Zeeman effect (universally taught, diagnostic for stellar magnetic fields) warrants ~250 words. The Stark effect (rarely observed directly in astrophysics; mainly appears as line broadening) warrants ~150 words: definition, the linear vs. quadratic distinction, and its role in Stark broadening — nothing more. If you find yourself adding a history section to a specialist topic, stop and ask whether it adds value a reader would actually want.

---

## 6. Technical Depth

### Numbers and units
- Scientific notation uses HTML superscript: `10<sup>17</sup> kg/m<sup>3</sup>`, `10<sup>31</sup> J s<sup>-1</sup>`
- Solar mass symbol: `M<sub>sun-symbol</sub>` rendered via HTML entities
- Approximate values use the tilde: "~ 10^7", "about 2.5 km", "around 10^11 stronger", "roughly 10^-16 grams"
- Numbers are given to convey scale, not precision: "between 10 and 20 km across", "over 100 billion stars", "about 50 kpc in diameter"
- High precision reserved for physical constants: "1.6726231 x 10^-27 kg" (proton mass), "1.60217733 x 10^-19 C" (proton charge)
- Units always explicit and metric: km/s, Mpc, eV, K, AU, mag. No imperial conversions.
- Small numbers often spelled out: "two neutrons", "eight protons"; large numbers use digits: "719 PHAs", "100 billion galaxies"

### Equations
- More common than a casual glance suggests -- found in ~15--20% of articles across the 100-article sample (Angular Velocity, Aperture, Abundance Ratio, Ellipse, Errors, Destructive Interference, Period Derivative, Proper Motion, Speed, Virial Theorem, Wavelength, Time Average, Gregorian Calendar, Linearly Proportional, Rotation Curve, Pulsar DM, Comoving Distance, Cross-staff).
- Rendered as PNG images of TeX output (`<img class="teximage">`) for complex expressions, or inline HTML sup/sub for simple formulas.
- Equations are presented matter-of-factly without derivation -- the encyclopedia assumes readers can understand the notation.
- Use only when the equation significantly aids comprehension or defines a key relationship.
- For new articles, use KaTeX:
  ```html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
  <script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"></script>

  <script>
    document.addEventListener("DOMContentLoaded", function() {
      renderMathInElement(document.body, {
        delimiters: [
          {left: "$$", right: "$$", display: true},
          {left: "\\(", right: "\\)", display: false}
        ]
      });
    });
  </script>
  ```
  `$$...$$` for display (block) equations, `\(...\)` for inline.

### Jargon handling
- Technical terms are used freely but **each is hyperlinked** as `<a class="lexicon-term" href="...">` to its own COSMOS entry on first use (and often on repeated use).
- Acronyms are spelled out on first use: "Massive Compact Halo Objects" then "(MACHOs)", "High-mass X-ray binaries (HMXBs)", "Very Long Baseline Interferometry (VLBI)".
- Analogies are used sparingly but effectively: "This is analogous to the increased spin of an iceskater if she concentrates her mass around her spin axis by bringing her arms close to her body", "imagine squeezing twice the mass of the Sun into an object about the size of a small city".
- **Where possible, follow abstract statements with a concrete example or analogy.** When a sentence makes a formal or abstract claim, grounding it in the next sentence (or a brief parenthetical) helps the reader. Example: "Electromagnetic radiation spans radio waves to gamma rays, but is absorbed or scattered by intervening matter and cannot escape the interiors of dense objects — the centre of the Sun, for instance, takes around 100,000 years to radiate a photon to the surface." This is a judgement call; not every sentence needs an example, but mechanism statements and scope statements often benefit from one.
- **Prefer plain words over sophisticated ones for non-technical vocabulary.** Jargon terms (spectral class, nucleosynthesis, redshift) must be used and linked — they are precise and cannot be paraphrased. But the connective tissue of a sentence should lean toward everyday words where they are equally accurate: "are directly related to" rather than "encode", "show" rather than "manifest", "come from" rather than "originate in", "use" rather than "employ". This is a judgement call — if the plain word is genuinely less precise, keep the sophisticated one.
- **Single quotes for non-standard usage**: Terms used idiomatically or metaphorically are flagged with single quotes: 'dark' (Dark Matter), 'rainbows' (Spectroscopy), 'bullets' (Stellar Jets), 'planetary nebula' (when noting misnomer). This signals the word is being used in a specialised or non-literal sense.
- ** try to avoid superfluous definition **: Avoid redefining a subject when it already has a dedicated article, simply link or very succinctly describe as part of the sentence. 

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

**Average: ~4.5 lexicon-term links per 100 words** (range: ~3 to ~8 per 100 words; shorter articles tend toward the higher end). This is the most distinctive structural feature of COSMOS. Nearly every noun that has its own entry is linked, often multiple times within the same article (the same term can be linked each time it appears). This makes the encyclopedia deeply interconnected and encourages browsing.

**Linking strategy**: First occurrence of a key term is always linked. Subsequent mentions are often re-linked (unlike Wikipedia's first-occurrence-only convention). Links appear in both body text and image captions.

---

## 8. Spelling and Typography

- **Australian/British English** throughout: "vapourisation", "ionisation", "colour", "metres", "favours", "defence". Consistent with Swinburne's location.
- **Curly quotes and typographic dashes**: HTML entities used for en-dashes (&#8211;), em-dashes, and curly apostrophes (&#8217;). Encoding is somewhat dated (HTML entities rather than UTF-8 native).
- **Capitalisation**: "Sun", "Earth", "Moon" capitalised when referring to our specific bodies; lowercase for generic usage ("a sun-like star"). Roman numeral classifications: "Pop I", "Pop II", "Type Ia". Some inconsistency exists in the original corpus.

---

## 9. Style Rules -- Do/Don't List

### DO:
- **Open with a direct definition.** First sentence = "[Term] is/are [definition]." No lead-in.
- **Vary active and passive voice.** Use active where it reads more naturally ("New Horizons revealed" not "it was revealed by New Horizons"). Passive is fine when the agent is unimportant.
- **Hyperlink technical terms** to their COSMOS entries using `class="lexicon-term"`. Link generously, including common terms like "star", "mass", "orbit". Re-link terms on subsequent use.
- **Give numbers for scale** -- approximate values, orders of magnitude, ranges. Use HTML `<sup>` and `<sub>` for exponents and subscripts.
- **Use bulleted/numbered lists** when enumerating three or more categories.
- **Credit discoveries** with brief historical context: name, date, institution.
- **Use analogies sparingly but effectively** to make extreme quantities relatable ("a teaspoon of neutron star material would weigh around a billion tonnes").
- **Include images** with descriptive captions (1--3 sentences) and source credit lines.
- **End with forward links** ("See also: ...") where appropriate, or simply stop when the content is covered.
- **Spell out acronyms** on first use.
- **Keep articles concise.** Most entries are 150--500 words. Even major topics stay under 1000 words. Match depth to topic richness: a narrow term or minor object may need only 150--300 words; do not pad a thin topic to hit a word-count floor. A short article with no image is perfectly fine if the topic does not warrant more.
- **Use single quotes** to flag non-literal or idiomatic use of a term ('dark', 'rainbows').
- **Use Australian/British spelling** (colour, ionisation, metres, etc.).

### DON'T:
- **Don't use conversational hooks** ("Have you ever wondered...?", "Imagine this:").
- **Don't use contractions** ("don't" -> "do not" in the article text; the original articles avoid them with ~99% consistency).
- **Don't use first person** ("I", "we the authors"). Use "we" only to mean "humans/observers" and only sparingly.
- **Don't editorialize or express opinion.** State facts; note debates neutrally ("is still not universally accepted").
- **Don't use editorial fluff or dramatic language.** The voice is that of professional researchers stating facts, not journalists crafting a narrative. Avoid:
  - Dramatic qualifiers: "profound", "groundbreaking", "revolutionary", "remarkable", "extraordinary", "stunning"
  - Dramatic verbs: "shattered", "overturned", "transformed", "unravelled"
  - Rhetorical questions: "what is the ultimate fate of the universe?"
  - Needless intensifiers: "incredibly", "unassailable", "unabated", "astonishing"
  - Editorial commentary: "This reasoning seemed unassailable", "The implications are profound"
  - Filler sentences that add no information: "This is one of the most important discoveries in modern physics"
  - Instead, simply state what happened and what it means: "In 1998, two independent teams discovered..." not "In 1998, two teams shattered expectations with a groundbreaking discovery..."
- **Don't pad articles to seem substantial.** If a topic can be covered well in 200 words, do not stretch it to 600. The corpus median is ~210 words; 46% of articles are 100--250 words. Adding sections, examples, or historical context just to fill space makes the article worse, not better. An article without an image is also fine.
- **Don't write conclusions or summaries.** The article simply ends when the content is covered.
- **Don't use exclamation marks** for emphasis (the original corpus uses them extremely rarely -- perhaps 2--3 across 643 articles -- and only for historical-drama emphasis, never pop-science excitement).
- **Don't add bibliographic references unless they are key research papers.** Credit for images only, not inline citations.
- **Don't oversimplify.** Use the correct technical term and link it, rather than substituting a vague paraphrase.
- **Avoid leaving abstract statements unsupported where a brief example would help.** Mechanism statements ("X causes Y") and scope statements ("X spans the full range of...") often benefit from a concrete illustration. Use judgement — not every sentence needs one.
- **Avoid reaching for sophisticated vocabulary when a plain word works just as well.** "Encode", "manifest", "underpin", "mediate", "constitute" — ask whether "show", "cause", "support", or "make up" would do the job. If the plain word is less precise, keep the sophisticated one.

---

## 10. Representative Excerpts

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

### Excerpt 5 -- Short stub entry (Megaparsec)
> "A megaparsec is a measurement of distance equal to one million parsecs or 3.26 million light years. It is a commonly used unit when describing distances between neighbouring galaxies or between galaxy clusters."

Note: direct definition, numbers for scale, no elaboration beyond what is needed, abrupt ending.

### Excerpt 6 -- Technical definition with equation context (Virial Theorem)
> "The virial theorem relates the total kinetic energy of a self-gravitating body due to the motions of its constituent parts, T, to the gravitational potential energy, U, of the body: 2T + U = 0."

Note: equation presented inline and matter-of-factly, variables defined in prose, no derivation.

---

## Usage Note

This analysis should be used by the writer agent to match the COSMOS voice when:
- Adding interactive embed descriptions or contextual paragraphs to existing articles
- Writing new encyclopedia entries
- Ensuring that any new text is indistinguishable in register, density, and structure from the existing 643-article corpus
