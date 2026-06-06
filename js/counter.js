/* ============================================
   COUNTER JS — Animated Number Counters
   Triggers on scroll-into-view
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  const counterEls = document.querySelectorAll('[data-count], .stat-count, .hstat-num');

  if (!counterEls.length) return;

  /* ── Easing function ── */
  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  /* ── Format large numbers ── */
  function formatNumber(n, target) {
    if (target >= 1000000) {
      return (n / 1000000).toFixed(n >= 100000 ? 1 : 2) + 'M';
    }
    if (target >= 100000) {
      return Math.floor(n).toLocaleString('en-IN');
    }
    return Math.floor(n).toLocaleString('en-IN');
  }

  /* ── Animate counter ── */
  function animateCounter(el) {
    const target   = parseInt(el.getAttribute('data-count') || el.textContent, 10);
    if (isNaN(target)) return;

    const duration = 2000; // ms
    const start    = performance.now();
    const startVal = 0;

    el.setAttribute('data-count', target);

    function tick(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeOutExpo(progress);
      const current  = startVal + (target - startVal) * eased;

      el.textContent = formatNumber(current, target);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = formatNumber(target, target);
        el.classList.add('count-animated');
      }
    }

    requestAnimationFrame(tick);
  }

  /* ── Intersection Observer ── */
  const observed = new Set();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !observed.has(entry.target)) {
        observed.add(entry.target);
        // Slight stagger for multiple counters in same section
        const siblings = Array.from(entry.target.closest('section, .hero-stats-bar')
          ?.querySelectorAll('[data-count], .stat-count, .hstat-num') || [entry.target]);
        const idx = siblings.indexOf(entry.target);

        setTimeout(() => animateCounter(entry.target), idx * 120);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  counterEls.forEach(el => observer.observe(el));

  /* ── Also handle data-count on hstat-num specifically ── */
  document.querySelectorAll('.hstat-num[data-count]').forEach(el => {
    if (!observed.has(el)) observer.observe(el);
  });

});
