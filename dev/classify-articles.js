#!/usr/bin/env node
// Classify COSMOS articles into astronomy categories by title keywords
const fs = require('fs');

const index = JSON.parse(fs.readFileSync('articles/index.json', 'utf8'));

// Category definitions: ordered by specificity (first match wins)
const categories = [
  { id: 'pulsars', label: 'Pulsars & Neutron Stars', color: '#e6194b',
    patterns: [/pulsar/i, /neutron star/i, /magnetar/i, /glitch/i, /dispersion measure/i,
      /millisecond pulsar/i, /PSR/i, /RRAT/i, /spin-flip/i, /roemer delay/i, /shapiro delay/i] },
  { id: 'black-holes', label: 'Black Holes & Compact Objects', color: '#3cb44b',
    patterns: [/black hole/i, /event horizon/i, /singularity/i, /schwarzschild/i,
      /cosmic censorship/i, /gravitational (wave|radiation)/i, /LIGO/i, /roche.lobe/i] },
  { id: 'supernovae', label: 'Supernovae & Transients', color: '#ffe119',
    patterns: [/supernov/i, /nova[e]?\b/i, /hypernov/i, /gamma ray burst/i, /GRB/i,
      /x-ray (burst|flash|transient)/i, /core.collapse/i, /chandrasekhar/i,
      /type i[abc]/i, /type ii/i, /cataclysmic/i, /fast radio burst/i, /fireball/i] },
  { id: 'cosmology', label: 'Cosmology & Big Bang', color: '#4363d8',
    patterns: [/cosmolog/i, /big bang/i, /big crunch/i, /dark energy/i, /dark matter/i,
      /cosmic microwave/i, /concordance/i, /friedmann/i, /flatness/i, /hubble (law|flow|distance)/i,
      /deceleration param/i, /critical density/i, /density param/i, /epoch of recomb/i,
      /baryonic acoustic/i, /primordial/i, /tired light/i, /alternative cosmol/i,
      /comoving/i, /large.scale struct/i, /power spectrum/i, /lookback/i, /MACHO/i,
      /redshift$/i, /cosmological redshift/i, /relativistic cosmol/i] },
  { id: 'galaxies', label: 'Galaxies', color: '#f58231',
    patterns: [/galax/i, /milky way/i, /andromeda/i, /magellanic/i, /virgo cluster/i,
      /morpholog/i, /hubble classif/i, /spiral (arm|galaxy|formation)/i, /elliptical/i,
      /lenticular/i, /irregular gal/i, /disk gal/i, /starburst/i, /bars$/i, /bulge/i,
      /warp/i, /galactic/i, /centre of the milky/i, /density wave/i, /winding problem/i,
      /rotation curve/i, /toomre/i, /NGC$/i, /butcher/i, /brightest cluster/i,
      /morphology.density/i, /CD galax/i, /early.type gal/i, /late.type gal/i,
      /surface brightness prof/i, /van den bergh/i, /kormendy/i, /scaling relation/i,
      /colour gradient/i, /S0 gal/i, /flocculent/i, /grand design/i, /fossil group/i,
      /hickson/i, /group environment/i, /cluster environment/i, /ram pressure/i,
      /galaxy (harass|strangu|form|type)/i, /tidal tail/i, /interacting gal/i,
      /disturbed gal/i, /asymmetric/i, /thick disk/i, /thin disk/i, /secular evol/i,
      /six.degree/i, /baade/i, /local group/i, /shells/i, /zone of avoid/i] },
  { id: 'stars', label: 'Stars & Stellar Evolution', color: '#911eb4',
    patterns: [/^star$/i, /stellar/i, /main sequence/i, /red (giant|dwarf)/i, /white dwarf/i,
      /brown dwarf/i, /cepheid/i, /variable star/i, /hertzsprung/i, /HR diagram/i,
      /wolf.rayet/i, /T tauri/i, /protostar/i, /blue stragg/i, /Be star/i,
      /binary star/i, /binary pulsar/i, /spectral (class|type)/i, /harvard spectral/i,
      /morgan.keenan/i, /luminosity class/i, /horizontal branch/i, /instability strip/i,
      /RR lyrae/i, /W virginis/i, /ZZ ceti/i, /U geminorum/i, /herbig.haro/i,
      /stellar (pop|wind|halo|assoc|evolution|jet|luminosity|lifetime)/i,
      /single stellar/i, /^sun$/i, /sunspot/i, /chromosphere/i, /photosphere/i,
      /corona$/i, /solar (flare|wind|mass|day|cosmic)/i, /zero age/i,
      /CNO cycle/i, /triple alpha/i, /planetary nebula/i, /proto.planet/i,
      /population [iI]/i, /degenerate electron/i, /electron degeneracy/i,
      /hydrostatic/i, /mass$/i, /luminosity$/i] },
  { id: 'solar-system', label: 'Solar System', color: '#42d4f4',
    patterns: [/asteroid/i, /comet/i, /meteor/i, /planet\b/i, /kuiper/i, /oort cloud/i,
      /mars$/i, /mercury$/i, /jupiter/i, /^moon$/i, /ceres$/i, /plutino/i,
      /trojan/i, /kirkwood/i, /trans.neptun/i, /scattered disk/i, /centaur/i,
      /amor/i, /apollo ast/i, /aten ast/i, /near earth/i, /potentially hazard/i,
      /bolide/i, /crater$/i, /chondri/i, /gas giant/i, /jovian/i, /planetesimal/i,
      /sun.grazing/i, /albedo$/i, /zodiac/i, /ablation/i, /differentiated/i,
      /inferior planet/i, /superior planet/i, /self.gravitat/i] },
  { id: 'observing', label: 'Observational Astronomy & Telescopes', color: '#f032e6',
    patterns: [/telescope/i, /ALMA$/i, /APEX$/i, /ATCA$/i, /parkes/i, /mopra/i,
      /lovell/i, /VLBI/i, /VSOP/i, /SKA$/i, /VLA/i, /MERLIN/i, /SEST$/i, /HIPASS/i,
      /long baseline/i, /radio (astron|interfer|supernov)/i, /interferometer/i,
      /correlator/i, /aperture$/i, /resolution$/i, /bandpass/i, /broadband/i,
      /narrowband/i, /filter[s]?$/i, /focal/i, /mirror$/i, /objective lens/i,
      /airy disk/i, /rayleigh/i, /baseline$/i, /nyquist/i, /fourier/i,
      /fast fourier/i, /field prog/i, /pierre auger/i, /hubble space/i,
      /spectroscop/i, /cross.staff/i, /astrolabe/i, /SETI$/i, /limiting mag/i,
      /real image/i, /virtual image/i, /jansky$/i] },
  { id: 'ism', label: 'Nebulae & Interstellar Medium', color: '#fabebe',
    patterns: [/nebula/i, /interstellar/i, /intercloud/i, /intergalactic/i, /intra.cluster/i,
      /molecular (cloud|hydrogen)/i, /HI cloud/i, /HII region/i, /bok globul/i,
      /dark nebula/i, /emission nebula/i, /reflection nebula/i, /dust grain/i,
      /column density/i, /extinction$/i, /masers/i, /high velocity cloud/i,
      /warm intercloud/i, /hot coronal/i, /neutral hydrogen/i, /ionised hydrogen/i,
      /bremsstrahlung/i, /synchrotron/i, /absorption line$/i] },
  { id: 'high-energy', label: 'Cosmic Rays & High-Energy', color: '#9a6324',
    patterns: [/cosmic ray/i, /ultra.high energy/i, /greisen/i, /forbush/i,
      /x-ray (binary|halo|pulsar)/i, /Be x-ray/i, /high.mass x-ray/i, /low.mass x-ray/i,
      /anomalous x-ray/i, /soft gamma/i, /geomagnetic/i, /aurora/i, /giant pulse/i] },
  { id: 'coordinates', label: 'Time, Coordinates & Celestial Mechanics', color: '#808000',
    patterns: [/coordinate/i, /celestial/i, /ecliptic/i, /equator\b/i, /meridian/i,
      /declination/i, /right ascension/i, /altitude$/i, /azimuth/i, /nadir$/i,
      /zenith$/i, /epoch$/i, /equinox/i, /solstice/i, /season/i, /tropic of/i,
      /arctic circle/i, /antarctic circle/i, /sidereal/i, /diurnal/i, /orbit\b/i,
      /orbital/i, /conjunction/i, /opposition/i, /elongation/i, /perihelion/i,
      /aphelion/i, /periapsis/i, /apoapsis/i, /perigee/i, /apogee/i, /periastron/i,
      /apastron/i, /ascending node/i, /descending node/i, /argument of/i,
      /anomalistic/i, /julian/i, /gregorian/i, /leap year/i, /UTC\b/i, /greenwich/i,
      /local noon/i, /day$/i, /year$/i, /tropical year/i, /second$/i, /phases$/i,
      /moon.*phase|quarter|crescent|gibbous|full moon|new moon|waning|waxing/i,
      /constellation/i, /asterism/i, /proper motion/i, /north galactic/i,
      /south galactic/i, /supergalactic/i, /galactic equator/i] },
  { id: 'physics', label: 'Physics, Units & Mathematics', color: '#aaffc3',
    patterns: [/planck/i, /newton/i, /coulomb/i, /wave (eq|period)/i, /wavelength/i,
      /frequency$/i, /hertz$/i, /kelvin$/i, /radian$/i, /steradian/i, /parsec/i,
      /kiloparsec/i, /megaparsec/i, /light year/i, /astronomical unit/i, /SI unit/i,
      /electron volt/i, /angular/i, /velocity$/i, /speed$/i, /speed of light/i,
      /acceleration/i, /momentum$/i, /energy$/i, /kinetic energy/i, /force$/i,
      /centripetal/i, /inertia$/i, /moment of inertia/i, /pressure$/i, /radiation pressure/i,
      /virial/i, /mach.s principle/i, /gravitational constant/i, /gravitational red/i,
      /doppler/i, /thermal/i, /photon$/i, /electron$/i, /proton$/i, /neutron$/i,
      /positron$/i, /atom$/i, /ion$/i, /ionis/i, /isotope/i, /lepton/i, /hadron/i,
      /quark/i, /baryon[s]?$/i, /baryonic matter/i, /molecule$/i, /element$/i,
      /hydrogen$/i, /helium$/i, /oxygen$/i, /metal[s]?$/i, /chemical/i,
      /abundance ratio/i, /electromagnetic/i, /infrared$/i, /ultraviolet$/i, /x-rays$/i,
      /light$/i, /non.thermal/i, /emission line$/i, /spectral (line|continuum)/i,
      /equivalent width/i, /flux$/i, /radiant flux/i, /zeeman/i,
      /interference/i, /ellipse$/i, /parabola$/i, /conic section/i, /gaussian/i,
      /^area$/i, /^volume$/i, /^length$/i, /^distance$/i, /displacement$/i,
      /^errors$/i, /linearly/i, /summation$/i, /time average/i, /correlated$/i,
      /solid angle/i, /degree \(ang/i, /degree \(temp/i, /arcmin/i, /arcsec/i,
      /apparent (diameter|magnitude)/i, /absolute magnitude/i, /bolometric/i,
      /distance modulus/i, /scale (height|length)/i, /standard candle/i,
      /effective (radius|temp)/i, /half.light/i, /luminosity.decline/i,
      /colour$/i, /vacuum$/i, /sublimation$/i, /dissociation$/i, /photodis/i,
      /centre of mass/i, /dark halo$/i, /halo$/i, /peculiar velocity/i,
      /radial velocity/i, /transverse velocity/i, /velocity dispersion/i,
      /trigonometric/i, /projected semi/i, /semi.major/i, /semi.minor/i,
      /period$/i, /period derivative/i, /amplitude$/i, /harmonic$/i, /angle$/i,
      /density$/i, /redshift$/i, /magnitude$/i, /hubble law$/i, /hubble flow$/i] },
  { id: 'history', label: 'History & Philosophy', color: '#800000',
    patterns: [/anaxim/i, /thales/i, /heraclit/i, /callippus/i, /xenophanes/i,
      /ionian/i, /homocentric/i, /^astronomy$/i, /history of/i, /early.*theor/i,
      /wolf number/i, /zurich/i] },
];

const classified = {};
const unclassified = [];

for (const article of index) {
  let found = false;
  for (const cat of categories) {
    for (const pat of cat.patterns) {
      if (pat.test(article.title)) {
        classified[article.slug] = cat.id;
        found = true;
        break;
      }
    }
    if (found) break;
  }
  if (!found) unclassified.push(article.title);
}

// Build output
const categoryMap = {};
categories.forEach(c => { categoryMap[c.id] = { label: c.label, color: c.color }; });

const result = {
  categories: categoryMap,
  articles: classified
};

// Stats
const counts = {};
for (const slug in classified) {
  const cat = classified[slug];
  counts[cat] = (counts[cat] || 0) + 1;
}
console.log('Category counts:');
for (const [cat, count] of Object.entries(counts).sort((a,b) => b[1] - a[1])) {
  console.log(`  ${categoryMap[cat].label}: ${count}`);
}
console.log(`\nUnclassified (${unclassified.length}):`);
unclassified.forEach(t => console.log(`  ${t}`));

console.log(`\nTotal classified: ${Object.keys(classified).length} / ${index.length}`);

fs.writeFileSync('dev/cosmos-categories.json', JSON.stringify(result, null, 2));
console.log('\nWritten to dev/cosmos-categories.json');
