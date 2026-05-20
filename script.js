/* ===== Bayesian Consulting — interactions ===== */

(function () {
  'use strict';

  // ---------- Hex grid in the hero ----------
  function buildHexField() {
    const svg = document.querySelector('.hex-field');
    if (!svg) return;

    const rect = svg.getBoundingClientRect();
    const width = rect.width || window.innerWidth;
    const height = rect.height || 600;

    const size = 30;                    // hex "radius" (center to corner)
    const hexW = Math.sqrt(3) * size;   // pointy-top hex width
    const rowSpacing = 1.5 * size;      // vertical center-to-center

    const cols = Math.ceil(width / hexW) + 2;
    const rows = Math.ceil(height / rowSpacing) + 2;

    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    // A few "accent" hexes — picked once for stable layout
    const accentTargets = new Set([
      `${Math.floor(cols * 0.68)}_${Math.floor(rows * 0.32)}`,
      `${Math.floor(cols * 0.78)}_${Math.floor(rows * 0.5)}`,
      `${Math.floor(cols * 0.6)}_${Math.floor(rows * 0.6)}`
    ]);
    const filledTargets = new Set([
      `${Math.floor(cols * 0.72)}_${Math.floor(rows * 0.4)}`
    ]);

    let html = '';
    for (let row = -1; row < rows; row++) {
      for (let col = -1; col < cols; col++) {
        const cx = col * hexW + (row % 2 === 0 ? 0 : hexW / 2);
        const cy = row * rowSpacing;
        const half = hexW / 2;
        const points = [
          [cx, cy - size],
          [cx + half, cy - size / 2],
          [cx + half, cy + size / 2],
          [cx, cy + size],
          [cx - half, cy + size / 2],
          [cx - half, cy - size / 2]
        ].map(p => `${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(' ');

        const key = `${col}_${row}`;
        let cls = '';
        if (filledTargets.has(key)) cls = ' class="filled"';
        else if (accentTargets.has(key)) cls = ' class="accent"';

        html += `<polygon points="${points}"${cls}/>`;
      }
    }
    svg.innerHTML = html;
  }

  // ---------- Sticky header shadow on scroll ----------
  function watchHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const onScroll = () => {
      if (window.scrollY > 8) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ---------- Mobile nav toggle ----------
  function setupMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.getElementById('mobile-nav');
    if (!toggle || !menu) return;

    const close = () => {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('open');
    };
    const open = () => {
      toggle.setAttribute('aria-expanded', 'true');
      menu.classList.add('open');
    };

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      isOpen ? close() : open();
    });

    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', close);
    });
  }

  // ---------- Reveal-on-scroll for cards & sections ----------
  function setupReveal() {
    const targets = document.querySelectorAll('.card, .section-head, .about-text, .about-facts, .contact-inner');
    if (!('IntersectionObserver' in window)) {
      targets.forEach(t => t.classList.add('in-view'));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(t => io.observe(t));
  }

  // ---------- Footer year ----------
  function setYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = String(new Date().getFullYear());
  }

  // ---------- Re-build hex field on resize (debounced) ----------
  function watchResize() {
    let t;
    window.addEventListener('resize', () => {
      clearTimeout(t);
      t = setTimeout(buildHexField, 150);
    });
  }

  // ---------- Boot ----------
  function init() {
    buildHexField();
    watchHeader();
    setupMobileNav();
    setupReveal();
    setYear();
    watchResize();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
