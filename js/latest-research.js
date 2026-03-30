// Latest Research — injects ADS paper links into article pages
// Loads ads-research.json, matches by page slug, renders section before footer.
// Include via <script src="../js/latest-research.js" defer></script> in article template.
(function() {
  'use strict';

  var slug = location.pathname.split('/').pop().replace('.html', '');
  var titleEl = document.querySelector('.article__title');
  if (!slug || !titleEl) return;
  var topic = titleEl.textContent.trim();

  // Resolve path to ads-research.json relative to this script's location
  var scripts = document.getElementsByTagName('script');
  var scriptSrc = scripts[scripts.length - 1].src || '';
  var basePath = scriptSrc.replace(/js\/latest-research\.js.*$/, '');
  var jsonURL = basePath + 'dev/ads-research.json';

  function adsSearchURL(t, dateFrom) {
    var q = '"' + t + '"' + (dateFrom ? ' pubdate:[' + dateFrom + ' TO *]' : '') + ' database:astronomy';
    return 'https://ui.adsabs.harvard.edu/search/q=' + encodeURIComponent(q) + '&sort=citation_count+desc';
  }

  function render(entry) {
    var footer = document.querySelector('.site-footer');
    var main = document.querySelector('main') || document.querySelector('.article').parentNode;
    if (!footer && !main) return;

    var now = new Date();
    var Y = now.getFullYear();
    var M = String(now.getMonth() + 1).padStart(2, '0');

    var groups = [
      { tag: 'Recent Impact', papers: entry.recent || [],
        allURL: adsSearchURL(topic, (Y - 1) + '-' + M) },
      { tag: 'Highly Cited', papers: entry.decade || [],
        allURL: adsSearchURL(topic, (Y - 10) + '-01') }
    ];

    var section = document.createElement('section');
    section.className = 'latest-research';

    var html = '<div class="container container--narrow">' +
      '<h2 class="latest-research__title">Latest Research</h2>' +
      '<p class="latest-research__intro">Most cited papers on this topic via ' +
        '<a href="https://ui.adsabs.harvard.edu/" target="_blank" rel="noopener">NASA ADS</a>.</p>' +
      '<div class="lr-groups">';

    groups.forEach(function(g) {
      if (g.papers.length === 0) return;
      html += '<div class="lr-group">' +
        '<div class="lr-group-header">' +
          '<span class="lr-group-tag">' + g.tag + '</span>' +
          '<a class="lr-group-all" href="' + g.allURL + '" target="_blank" rel="noopener">View all &rarr;</a>' +
        '</div>';
      g.papers.forEach(function(p) {
        html += '<a class="lr-item" href="' + p.url + '" target="_blank" rel="noopener">' +
          '<span class="lr-body">' +
            '<span class="lr-label">' + p.authors + ' (' + p.year + ')</span>' +
            '<span class="lr-title">' + p.title + '</span>' +
          '</span>' +
          '<span class="lr-arrow">&rarr;</span>' +
        '</a>';
      });
      html += '</div>';
    });

    html += '</div></div>';
    section.innerHTML = html;

    // Insert research section before footer (or SAO CTA if present)
    var insertBefore = document.querySelector('.sao-footer-cta') || footer;
    if (insertBefore) {
      insertBefore.parentNode.insertBefore(section, insertBefore);
    } else if (main) {
      main.appendChild(section);
    }
  }

  // Fetch the JSON
  var xhr = new XMLHttpRequest();
  xhr.open('GET', jsonURL, true);
  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 400) {
      try {
        var data = JSON.parse(xhr.responseText);
        if (data[slug]) render(data[slug]);
      } catch(e) {}
    }
  };
  xhr.onerror = function() {};
  xhr.send();
})();
