/* ============================================
   PREMIUM JS — Enhanced Interactions
   Sachivalayam Portal · Telangana
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  // ── Font Size Controls ──
  window.changeFontSize = function(dir) {
    const root = document.documentElement;
    const current = parseFloat(getComputedStyle(root).fontSize);
    if (dir === 0) { root.style.fontSize = '16px'; return; }
    const next = current + (dir * 1.5);
    if (next >= 13 && next <= 22) root.style.fontSize = next + 'px';
  };

  // ── Notice Category Filter ──
  const cats = document.querySelectorAll('.notice-cat');
  const items = document.querySelectorAll('.notice-item');
  cats.forEach(btn => {
    btn.addEventListener('click', () => {
      cats.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      items.forEach(item => {
        if (cat === 'all' || item.dataset.cat === cat) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // ── Scroll Reveal ──
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => observer.observe(el));

  // ── Quick Service Card active indicator ──
  const qsCards = document.querySelectorAll('.quick-service-card');
  qsCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.zIndex = '2';
    });
    card.addEventListener('mouseleave', function() {
      this.style.zIndex = '';
    });
  });

  // ── Partner badge hover fix ──
  const partnerBadges = document.querySelectorAll('.partner-badge');
  partnerBadges.forEach(badge => {
    badge.addEventListener('mouseenter', () => {
      badge.querySelector('i').style.color = 'white';
    });
    badge.addEventListener('mouseleave', () => {
      badge.querySelector('i').style.color = '';
    });
  });

  // ── Smooth page load bar animation ──
  const loader = document.getElementById('page-loader');
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 400);
    }, 1200);
  }

});
