/* ============================================
   MAIN JS — Sachivalayam Portal
   Scroll Reveal | Back To Top | Accordion
   Page Loader | Toast | Stagger Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Page Load Bar ── */
  const loader = document.createElement('div');
  loader.id = 'page-loader';
  document.body.prepend(loader);
  setTimeout(() => loader.remove(), 1400);

  /* ── Scroll Reveal Observer ── */
  const revealEls = document.querySelectorAll(
    '.service-card, .scheme-card, .stat-card, .step-card, .dept-card, ' +
    '.testimonial-card, .notice-item, .downloads-list li, .hstat, ' +
    '.section-header, .notice-board, .notice-right, .helpline-card'
  );

  revealEls.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 8) * 0.06}s`;
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ── Back To Top ── */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Sticky Navbar Shadow ── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.style.boxShadow = window.scrollY > 10
        ? '0 4px 24px rgba(13,71,161,0.3)'
        : '0 4px 16px rgba(13,71,161,0.25)';
    });
  }

  /* ── Accordion ── */
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item    = header.parentElement;
      const body    = item.querySelector('.accordion-body');
      const isOpen  = header.classList.contains('open');

      // Close all
      document.querySelectorAll('.accordion-header').forEach(h => {
        h.classList.remove('open');
        h.parentElement.querySelector('.accordion-body')?.classList.remove('open');
      });

      // Open clicked (if was closed)
      if (!isOpen) {
        header.classList.add('open');
        body?.classList.add('open');
      }
    });
  });

  /* ── Toast Notifications ── */
  window.showToast = function(msg, type = 'info', duration = 4000) {
    const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', warning: 'fa-exclamation-triangle', info: 'fa-info-circle' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i> <span>${msg}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'fadeIn 0.3s ease reverse';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  };

  /* ── Application Track Form ── */
  const trackBtn = document.querySelector('.btn-track');
  if (trackBtn) {
    trackBtn.addEventListener('click', () => {
      const input = document.querySelector('.track-form input');
      if (input && input.value.trim()) {
        showToast('Searching for application: ' + input.value.trim(), 'info');
      } else {
        showToast('Please enter a valid application or token number.', 'warning');
      }
    });
  }

  /* ── Smooth Anchor Scrolling ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 56; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── Font Size Accessibility (A- A A+) ── */
  let currentSize = 16;
  document.querySelectorAll('.utility-left span').forEach(span => {
    if (span.textContent.includes('A-')) {
      span.style.cursor = 'pointer';
      span.addEventListener('click', () => {
        currentSize = Math.max(13, currentSize - 1);
        document.documentElement.style.fontSize = currentSize + 'px';
      });
    }
    if (span.textContent === 'A') {
      span.style.cursor = 'pointer';
      span.addEventListener('click', () => {
        currentSize = 16;
        document.documentElement.style.fontSize = '16px';
      });
    }
    if (span.textContent.includes('A+')) {
      span.style.cursor = 'pointer';
      span.addEventListener('click', () => {
        currentSize = Math.min(20, currentSize + 1);
        document.documentElement.style.fontSize = currentSize + 'px';
      });
    }
  });

  /* ── Active Nav Link ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  /* ── Marquee Ticker ── */
  const marqueeWraps = document.querySelectorAll('.marquee-wrap');
  marqueeWraps.forEach(wrap => {
    const inner = wrap.querySelector('.marquee-inner');
    if (inner) {
      inner.innerHTML += inner.innerHTML; // duplicate for seamless loop
    }
  });

  /* ── Service Card hover colour sync ── */
  document.querySelectorAll('.service-card').forEach(card => {
    const iconWrap = card.querySelector('.service-icon-wrap');
    if (iconWrap) {
      const color = iconWrap.style.getPropertyValue('--color') ||
                    getComputedStyle(iconWrap).getPropertyValue('--color');
      card.style.setProperty('--color', color);
    }
  });

  /* ── Print Button (if any) ── */
  document.querySelectorAll('[data-action="print"]').forEach(btn => {
    btn.addEventListener('click', () => window.print());
  });

  /* ── Status Filter Table ── */
  const statusFilter = document.getElementById('statusFilter');
  if (statusFilter) {
    statusFilter.addEventListener('change', function() {
      const val = this.value.toLowerCase();
      document.querySelectorAll('.gov-table tbody tr').forEach(row => {
        const status = row.querySelector('.status-badge')?.textContent.toLowerCase() || '';
        row.style.display = (!val || status.includes(val)) ? '' : 'none';
      });
    });
  }

  /* ── Lazy Image Loading ── */
  const lazyImages = document.querySelectorAll('img[data-src]');
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imgObserver.unobserve(img);
      }
    });
  });
  lazyImages.forEach(img => imgObserver.observe(img));

  /* ── Welcome Toast ── */
  setTimeout(() => {
    showToast('Welcome to Sachivalayam Citizen Portal 🏛️', 'info', 4500);
  }, 1800);

});
