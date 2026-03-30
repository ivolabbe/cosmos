// COSMOS A-Z Explorer widget — auto-injects between </main> and <footer>
// Reads cross-links from article body as default entries, letter-click switches to index.
// Include via <script src="../js/cosmos-explore.js" defer></script> in article template.
(function() {
  'use strict';

  // Derive relative prefix from this script's src attribute (e.g. "../js/X" → "../")
  var scripts = document.getElementsByTagName('script');
  var prefix = '';
  for (var i = 0; i < scripts.length; i++) {
    var raw = scripts[i].getAttribute('src') || '';
    if (raw.indexOf('cosmos-explore.js') !== -1) {
      prefix = raw.replace(/js\/cosmos-explore\.js.*$/, '');
      break;
    }
  }

  // Load cosmos-index.js dynamically
  var s = document.createElement('script');
  s.src = prefix + 'js/cosmos-index.js';
  s.onload = init;
  document.head.appendChild(s);

  function init() {
    if (typeof COSMOS_INDEX === 'undefined') return;

    var slug = location.pathname.split('/').pop().replace('.html', '');
    var max = 15;

    // Collect cross-linked slugs from lexicon-term links
    var linked = [];
    var seen = {};
    document.querySelectorAll('.article__body a.lexicon-term').forEach(function(a) {
      var href = a.getAttribute('href');
      if (!href) return;
      var ls = href.split('/').pop().replace('.html', '');
      if (ls === slug || seen[ls]) return;
      seen[ls] = true;
      var entry = COSMOS_INDEX.find(function(e) { return e.slug === ls; });
      if (entry) linked.push(entry);
    });

    // Build nav element
    var nav = document.createElement('nav');
    nav.className = 'cosmos-explore';
    nav.setAttribute('aria-label', 'Explore encyclopedia');
    nav.innerHTML = '<div class="container">' +
      '<div class="cosmos-explore__az" id="explore-az"></div>' +
      '<div class="cosmos-explore__entries" id="explore-entries"></div>' +
      '</div>';

    // Inject styles
    var style = document.createElement('style');
    style.textContent =
      '.cosmos-explore{border-top:1px solid #e0e0e0;border-bottom:1px solid #e0e0e0;padding:1.2em 0 1.5em;background:#f8f8f8;margin:0}' +
      '.cosmos-explore .container{max-width:960px;margin:0 auto;padding:0 24px}' +
      '.cosmos-explore__az{display:flex;flex-wrap:wrap;gap:4px;justify-content:center;margin-bottom:1em}' +
      '.cosmos-explore__az a{display:inline-block;width:28px;height:28px;line-height:28px;text-align:center;font-size:.75rem;font-weight:600;color:#555;text-decoration:none;border-radius:4px;transition:background .15s,color .15s}' +
      '.cosmos-explore__az a:hover{background:#ddd}' +
      '.cosmos-explore__az a.active{background:#c60c30;color:#fff}' +
      '.cosmos-explore__entries{display:flex;flex-wrap:wrap;gap:6px 16px;justify-content:center;font-size:.82rem}' +
      '.cosmos-explore__entries a{color:#c60c30;text-decoration:none}' +
      '.cosmos-explore__entries a:hover{text-decoration:underline}' +
      '.cosmos-explore__entries .explore-more{color:#808285;font-style:italic}';
    document.head.appendChild(style);

    // Insert before SAO CTA if present, otherwise before footer
    var insertBefore = document.querySelector('.sao-footer-cta') || document.querySelector('.site-footer');
    if (insertBefore) {
      insertBefore.parentNode.insertBefore(nav, insertBefore);
    } else {
      document.body.appendChild(nav);
    }

    // Build A-Z bar
    var azEl = document.getElementById('explore-az');
    var el = document.getElementById('explore-entries');
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(function(L) {
      var a = document.createElement('a');
      a.href = prefix + 'browse.html?letter=' + L;
      a.textContent = L;
      a.addEventListener('click', function(e) {
        e.preventDefault();
        showLetter(L);
        azEl.querySelectorAll('a').forEach(function(x) { x.classList.remove('active'); });
        a.classList.add('active');
      });
      azEl.appendChild(a);
    });

    function showLetter(L) {
      var entries = COSMOS_INDEX.filter(function(a) { return a.letter === L; });
      var html = entries.slice(0, max).map(function(a) {
        var cls = a.slug === slug ? ' style="font-weight:700"' : '';
        return '<a href="' + prefix + 'articles/' + a.slug + '.html"' + cls + '>' + a.title + '</a>';
      }).join(' &middot; ');
      if (entries.length > max) {
        html += ' &middot; <a class="explore-more" href="' + prefix + 'browse.html?letter=' + L + '">' + (entries.length - max) + ' more &rarr;</a>';
      }
      html += ' &middot; <a class="explore-more" href="' + prefix + 'explore.html">Knowledge Graph &rarr;</a>';
      el.innerHTML = html;
    }

    // Default: show graph-based linked articles
    var html = linked.map(function(a) {
      return '<a href="' + prefix + 'articles/' + a.slug + '.html">' + a.title + '</a>';
    }).join(' &middot; ');
    if (linked.length > 0) {
      html += ' &middot; ';
    }
    html += '<a class="explore-more" href="' + prefix + 'explore.html">Knowledge Graph &rarr;</a>';
    el.innerHTML = html;
  }
})();
