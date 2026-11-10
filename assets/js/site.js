/* vanderveer.io: small progressive enhancements. Everything works without this file. */
(function () {
  'use strict';
  var root = document.documentElement;

  /* ── Theme: Auto / Light / Dark ───────────────────────────────────────── */
  var mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: light)') : null;
  function readMode() {
    var m = 'auto';
    try { m = localStorage.getItem('theme') || 'auto'; } catch (e) {}
    return (m === 'light' || m === 'dark') ? m : 'auto';
  }
  function applyTheme(mode) {
    var resolved = mode === 'auto' ? ((mq && mq.matches) ? 'light' : 'dark') : mode;
    root.setAttribute('data-theme', resolved);
    root.setAttribute('data-theme-mode', mode);
    var buttons = document.querySelectorAll('.theme-switch button[data-mode]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-pressed', buttons[i].getAttribute('data-mode') === mode ? 'true' : 'false');
    }
  }
  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('.theme-switch button[data-mode]');
    if (!btn) return;
    var mode = btn.getAttribute('data-mode');
    try {
      if (mode === 'auto') localStorage.removeItem('theme');
      else localStorage.setItem('theme', mode);
    } catch (err) {}
    applyTheme(mode);
  });
  if (mq) {
    var onSystem = function () { if (readMode() === 'auto') applyTheme('auto'); };
    if (mq.addEventListener) mq.addEventListener('change', onSystem);
    else if (mq.addListener) mq.addListener(onSystem);
  }
  applyTheme(readMode());

  /* ── Reading: pick a book from the shelf ──────────────────────────────── */
  var panel = document.getElementById('book-panel');
  var shelf = document.querySelector('.shelf');
  if (panel && shelf) {
    shelf.addEventListener('click', function (e) {
      var btn = e.target.closest('.shelf__book');
      if (!btn) return;
      var tpl = document.getElementById('book-' + btn.getAttribute('data-book'));
      if (!tpl) return;
      panel.innerHTML = '';
      panel.appendChild(tpl.content.cloneNode(true));
      var all = shelf.querySelectorAll('.shelf__book');
      for (var i = 0; i < all.length; i++) all[i].setAttribute('aria-pressed', all[i] === btn ? 'true' : 'false');
      var r = panel.getBoundingClientRect();
      if (r.top < 0 || r.top > window.innerHeight * 0.6) panel.scrollIntoView({ block: 'start' });
    });
  }

  /* ── Posts: language label + copy button on code blocks ───────────────── */
  var names = { py: 'python', python: 'python', cs: 'C#', csharp: 'C#', js: 'JavaScript', javascript: 'JavaScript', json: 'JSON', sql: 'SQL', bash: 'bash', sh: 'shell', shell: 'shell', yaml: 'YAML', yml: 'YAML', xml: 'XML', html: 'HTML', bicep: 'Bicep', stl: 'STL', txt: 'text', text: 'text', plaintext: 'text' };
  var copyIcon = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"></rect><path d="M5 15V5a1 1 0 0 1 1-1h10"></path></svg>';
  var blocks = document.querySelectorAll('.prose div.highlighter-rouge');
  for (var b = 0; b < blocks.length; b++) {
    (function (block) {
      var m = /(?:^|\s)language-([\w+-]+)/.exec(block.className);
      var lang = m ? (names[m[1].toLowerCase()] || m[1]) : 'code';
      var bar = document.createElement('div');
      bar.className = 'code-bar';
      var label = document.createElement('span');
      label.textContent = lang;
      bar.appendChild(label);
      if (navigator.clipboard) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.setAttribute('aria-label', 'Copy code');
        btn.innerHTML = copyIcon + '<span>Copy</span>';
        btn.addEventListener('click', function () {
          var code = block.querySelector('code');
          navigator.clipboard.writeText(code ? code.innerText : '').then(function () {
            btn.lastChild.textContent = 'Copied';
            setTimeout(function () { btn.lastChild.textContent = 'Copy'; }, 1600);
          });
        });
        bar.appendChild(btn);
      }
      block.insertBefore(bar, block.firstChild);
    })(blocks[b]);
  }

  /* ── Posts: an image title becomes its caption ────────────────────────── */
  var imgs = document.querySelectorAll('.prose p > img[title]');
  for (var k = 0; k < imgs.length; k++) {
    var img = imgs[k];
    var p = img.parentNode;
    if (p.children.length !== 1 || p.textContent.trim() !== '') continue;
    var fig = document.createElement('figure');
    var cap = document.createElement('figcaption');
    cap.textContent = img.getAttribute('title');
    img.removeAttribute('title');
    fig.appendChild(img);
    fig.appendChild(cap);
    p.parentNode.replaceChild(fig, p);
  }
})();
