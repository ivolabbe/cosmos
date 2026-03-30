// SAO banners — top "Study Astronomy Online" + bottom "Interested in astronomy?" CTA.
// Both injected via JS so they can be changed or toggled in one place.
// Include via <script src="../js/sao-cta.js" defer></script> in article template.
(function() {
  'use strict';
  var saoURL = 'https://www.swinburne.edu.au/research/centres-groups-clinics/centre-for-astrophysics-supercomputing/our-study-options/swinburne-astronomy-online/';

  // ── Top banner: after .top-bar ──
  var topBar = document.querySelector('.top-bar');
  if (topBar && !document.querySelector('.sao-banner')) {
    var banner = document.createElement('aside');
    banner.className = 'sao-banner';
    banner.setAttribute('aria-label', 'Study astronomy online');
    banner.innerHTML = '<div class="container"><div class="sao-banner__inner">' +
      '<span class="sao-banner__icon">&#x1F393;</span>' +
      '<div class="sao-banner__text">' +
        '<strong>Study Astronomy Online</strong> &mdash; Dive deep into the wonders of modern astronomy. Flexible online courses at the world-class Centre for Astrophysics.' +
      '</div>' +
      '<a class="sao-banner__cta" href="' + saoURL + '" target="_blank" rel="noopener">Explore courses &rarr;</a>' +
    '</div></div>';
    topBar.parentNode.insertBefore(banner, topBar.nextSibling);
  }

  // ── Bottom CTA: always directly before .site-footer ──
  // Other scripts (cosmos-explore, latest-research) insert before this, giving:
  // content → explorer → research → CTA → footer
  var footer = document.querySelector('.site-footer');
  if (footer) {
    var cta = document.createElement('div');
    cta.className = 'sao-footer-cta';
    cta.innerHTML = '<div class="container"><div class="sao-footer-cta__inner">' +
      '<div class="sao-footer-cta__text">' +
        '<strong>Interested in astronomy?</strong> Study online with Swinburne, from introductory units to a full Master\u2019s degree.' +
      '</div>' +
      '<a class="sao-footer-cta__btn" href="' + saoURL + '" target="_blank" rel="noopener">Swinburne Astronomy Online &rarr;</a>' +
    '</div></div>';
    footer.parentNode.insertBefore(cta, footer);
  }
})();
