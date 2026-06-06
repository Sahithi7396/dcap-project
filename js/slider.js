/* ============================================
   SLIDER JS — Hero Slideshow
   Auto-advance | Dots | Pause on hover
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Additional Hero Slides Data ── */
  const slides = [
    {
      bg: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=1600&q=80',
      badge: 'Digital India Initiative',
      title: 'Digital Governance<br/><span class="highlight-saffron">At Your Doorstep</span>',
      sub: 'Access 500+ Government Services Online — Anytime, Anywhere.<br/>Transparent · Fast · Reliable Citizen Services',
    },
    {
      bg: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&q=80',
      badge: 'Farmer Welfare',
      title: 'Rythu Bandhu<br/><span class="highlight-saffron">Supporting Farmers</span>',
      sub: 'Investment support for farmers across Telangana. Apply online and track status instantly.',
    },
    {
      bg: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=1600&q=80',
      badge: 'Health For All',
      title: 'Aarogyasri<br/><span class="highlight-saffron">Universal Healthcare</span>',
      sub: 'Health coverage up to ₹5 Lakh for every family. Enroll today through Sachivalayam portal.',
    },
    {
      bg: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&q=80',
      badge: 'Education First',
      title: 'Scholarships &<br/><span class="highlight-saffron">Fee Reimbursement</span>',
      sub: 'Ensuring no student is left behind. Apply for scholarships and track approvals in real-time.',
    },
  ];

  const heroSection  = document.querySelector('.hero');
  const slidesWrap   = document.querySelector('.hero-slides');
  const originalSlide = document.querySelector('.hero-slide');
  if (!heroSection || !slidesWrap || !originalSlide) return;

  let currentSlide = 0;
  let interval     = null;
  const INTERVAL   = 5000;

  /* ── Build slides ── */
  slidesWrap.innerHTML = '';
  slidesWrap.style.position = 'relative';
  slidesWrap.style.height = '';

  const slideEls = slides.map((data, i) => {
    const slide = document.createElement('div');
    slide.className = 'hero-slide' + (i === 0 ? ' active' : '');
    slide.style.setProperty('--bg', `url('${data.bg}')`);
    slide.style.cssText += `
      background-image: url('${data.bg}');
      background-size: cover;
      background-position: center;
    `;
    slide.innerHTML = `
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <div class="hero-badge animate-fade-in">
          <i class="fas fa-star"></i> ${data.badge}
        </div>
        <h1 class="hero-title animate-slide-up">${data.title}</h1>
        <p class="hero-sub animate-slide-up delay-1">${data.sub}</p>
        <div class="hero-actions animate-slide-up delay-2">
          <a href="services.html" class="btn-primary-hero"><i class="fas fa-rocket"></i> Explore Services</a>
          <a href="#track" class="btn-outline-hero"><i class="fas fa-search-location"></i> Track Application</a>
        </div>
        <div class="hero-stats-bar animate-slide-up delay-3">
          <div class="hstat"><span class="hstat-num" data-count="1234567">12,34,567</span><span class="hstat-label">Applications Processed</span></div>
          <div class="hstat-div"></div>
          <div class="hstat"><span class="hstat-num" data-count="500">500</span><span class="hstat-label">Services Available</span></div>
          <div class="hstat-div"></div>
          <div class="hstat"><span class="hstat-num" data-count="33">33</span><span class="hstat-label">Districts Covered</span></div>
          <div class="hstat-div"></div>
          <div class="hstat"><span class="hstat-num" data-count="98">98</span><span class="hstat-label">% Satisfaction Rate</span></div>
        </div>
      </div>
    `;
    slidesWrap.appendChild(slide);
    return slide;
  });

  /* ── Dots ── */
  const dotsWrap = document.createElement('div');
  dotsWrap.style.cssText = `
    position: absolute;
    bottom: 72px;
    right: 32px;
    display: flex;
    gap: 8px;
    z-index: 10;
  `;
  const dots = slides.map((_, i) => {
    const dot = document.createElement('button');
    dot.style.cssText = `
      width: ${i === 0 ? '28px' : '8px'};
      height: 8px;
      border-radius: 4px;
      background: ${i === 0 ? 'var(--saffron)' : 'rgba(255,255,255,0.4)'};
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      padding: 0;
    `;
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
    return dot;
  });
  heroSection.style.position = 'relative';
  heroSection.appendChild(dotsWrap);

  /* ── Navigation Arrows ── */
  ['prev', 'next'].forEach(dir => {
    const btn = document.createElement('button');
    btn.style.cssText = `
      position: absolute;
      top: 50%;
      ${dir === 'prev' ? 'left: 20px' : 'right: 20px'};
      transform: translateY(-50%);
      width: 44px;
      height: 44px;
      background: rgba(255,255,255,0.15);
      border: 1.5px solid rgba(255,255,255,0.3);
      border-radius: 50%;
      color: white;
      font-size: 16px;
      cursor: pointer;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      backdrop-filter: blur(4px);
    `;
    btn.innerHTML = `<i class="fas fa-chevron-${dir === 'prev' ? 'left' : 'right'}"></i>`;
    btn.addEventListener('mouseenter', () => {
      btn.style.background = 'var(--saffron)';
      btn.style.borderColor = 'var(--saffron)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.background = 'rgba(255,255,255,0.15)';
      btn.style.borderColor = 'rgba(255,255,255,0.3)';
    });
    btn.addEventListener('click', () => {
      dir === 'prev' ? goTo(currentSlide - 1) : goTo(currentSlide + 1);
    });
    heroSection.appendChild(btn);
  });

  /* ── Go To Slide ── */
  function goTo(n) {
    slideEls[currentSlide].classList.remove('active');
    dots[currentSlide].style.width = '8px';
    dots[currentSlide].style.background = 'rgba(255,255,255,0.4)';

    currentSlide = (n + slides.length) % slides.length;

    slideEls[currentSlide].classList.add('active');
    dots[currentSlide].style.width = '28px';
    dots[currentSlide].style.background = 'var(--saffron)';

    resetInterval();
  }

  /* ── Auto Advance ── */
  function startInterval() {
    interval = setInterval(() => goTo(currentSlide + 1), INTERVAL);
  }
  function resetInterval() {
    clearInterval(interval);
    startInterval();
  }

  startInterval();

  /* ── Pause on hover ── */
  heroSection.addEventListener('mouseenter', () => clearInterval(interval));
  heroSection.addEventListener('mouseleave', startInterval);

  /* ── Touch/swipe support ── */
  let touchStartX = 0;
  heroSection.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  heroSection.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? currentSlide + 1 : currentSlide - 1);
  });

  /* ── Slide CSS ── */
  const style = document.createElement('style');
  style.textContent = `
    .hero-slides { position: relative; min-height: 580px; overflow: hidden; }
    .hero-slide {
      position: absolute; inset: 0;
      display: flex; align-items: center;
      opacity: 0; pointer-events: none;
      transition: opacity 0.8s ease;
      min-height: 580px;
    }
    .hero-slide.active { opacity: 1; pointer-events: all; }
    @media (max-width: 640px) {
      .hero-slides, .hero-slide { min-height: 480px; }
    }
  `;
  document.head.appendChild(style);

});
