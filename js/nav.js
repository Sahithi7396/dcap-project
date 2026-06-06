/* ============================================
   NAV JS — Mobile Menu | Dropdown | Sticky
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const navbar    = document.getElementById('navbar');

  /* ── Hamburger Toggle ── */
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      // Animate hamburger into X
      const spans = hamburger.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
  }

  /* ── Mobile Dropdown Toggle ── */
  document.querySelectorAll('.dropdown > a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth < 1024) {
        e.preventDefault();
        const parent = link.parentElement;
        parent.classList.toggle('open');
      }
    });
  });

  /* ── Close nav on outside click ── */
  document.addEventListener('click', (e) => {
    if (navLinks && hamburger &&
        !navLinks.contains(e.target) &&
        !hamburger.contains(e.target)) {
      navLinks.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  /* ── Close nav on resize ── */
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024 && navLinks) {
      navLinks.classList.remove('open');
    }
  });

  /* ── Sticky Navbar: Add scrolled class ── */
  let lastScroll = 0;
  if (navbar) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      // Hide on scroll down, show on scroll up (only on mobile)
      if (window.innerWidth < 768) {
        if (currentScroll > lastScroll + 4 && currentScroll > 100) {
          navbar.style.transform = 'translateY(-100%)';
        } else if (currentScroll < lastScroll - 4) {
          navbar.style.transform = 'translateY(0)';
        }
      }
      lastScroll = currentScroll;
    });
  }

  /* ── Search bar auto-suggestions (mock) ── */
  const searchInput = document.querySelector('.nav-search input');
  const services    = [
    'Caste Certificate', 'Income Certificate', 'Residence Certificate',
    'Aarogyasri Card', 'Pension Application', 'Rythu Bandhu',
    'Land Records', 'Property Registration', 'Birth Certificate',
    'Death Certificate', 'Marriage Certificate', 'School Transfer',
    'Scholarship', 'Ration Card', 'Water Connection', 'Power Connection'
  ];

  if (searchInput) {
    let suggestionBox = null;

    searchInput.addEventListener('input', () => {
      const q = searchInput.value.trim().toLowerCase();
      if (suggestionBox) suggestionBox.remove();
      if (!q) return;

      const matches = services.filter(s => s.toLowerCase().includes(q)).slice(0, 5);
      if (!matches.length) return;

      suggestionBox = document.createElement('div');
      suggestionBox.style.cssText = `
        position: absolute;
        top: 100%;
        right: 0;
        background: white;
        border: 1.5px solid #D8E2F0;
        border-radius: 8px;
        box-shadow: 0 8px 24px rgba(13,71,161,0.15);
        min-width: 240px;
        z-index: 9999;
        overflow: hidden;
        margin-top: 4px;
      `;

      matches.forEach(m => {
        const item = document.createElement('div');
        item.style.cssText = `
          padding: 10px 16px;
          font-size: 13.5px;
          color: #1A2340;
          cursor: pointer;
          border-bottom: 1px solid #F0F4F9;
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Noto Sans', sans-serif;
          transition: background 0.2s;
        `;
        item.innerHTML = `<i class="fas fa-search" style="color:#0D47A1;font-size:11px;"></i> ${m}`;
        item.addEventListener('mouseenter', () => item.style.background = '#E3F0FF');
        item.addEventListener('mouseleave', () => item.style.background = '');
        item.addEventListener('click', () => {
          searchInput.value = m;
          suggestionBox.remove();
          suggestionBox = null;
          if (window.showToast) showToast(`Searching for "${m}"...`, 'info');
        });
        suggestionBox.appendChild(item);
      });

      const wrap = searchInput.closest('.nav-search');
      wrap.style.position = 'relative';
      wrap.appendChild(suggestionBox);
    });

    document.addEventListener('click', (e) => {
      if (suggestionBox && !searchInput.contains(e.target)) {
        suggestionBox.remove();
        suggestionBox = null;
      }
    });
  }

  /* ── Navbar scrolled style ── */
  const style = document.createElement('style');
  style.textContent = `
    .navbar { transition: transform 0.3s ease, box-shadow 0.3s ease; }
    .navbar.scrolled { box-shadow: 0 6px 28px rgba(13,71,161,0.30); }
  `;
  document.head.appendChild(style);

});
