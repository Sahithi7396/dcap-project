/**
 * schemes-api.js
 * Fetches scheme data from the backend API and renders cards dynamically.
 * Handles loading state, error state, search, and category filtering.
 */

(function () {
  'use strict';

  const API_BASE = 'http://localhost:5001/api';

  // ── State ──────────────────────────────────────────────────────────────────
  let allSchemes = [];          // master list from API
  let activeCategory = 'all';  // current category filter
  let searchQuery = '';         // current search query

  // ── Category → icon/color mapping (best-effort from department name) ───────
  const CATEGORY_ICONS = {
    'General': { icon: 'fa-users',           bg: '#E3F0FF', color: '#0D47A1' },
    'Student': { icon: 'fa-graduation-cap',  bg: '#FFF3E0', color: '#E65100' },
    'Farmer':  { icon: 'fa-tractor',         bg: '#E8F5E9', color: '#2E7D32' },
  };

  // Keyword-based icon detection for richer visuals
  function resolveIcon(scheme) {
    const dept = (scheme.department || '').toLowerCase();
    const name = (scheme.scheme_name || '').toLowerCase();
    const text = dept + ' ' + name;

    if (text.includes('health') || text.includes('medical') || text.includes('hospital'))
      return { icon: 'fa-heartbeat', bg: '#FCE4EC', color: '#C62828' };
    if (text.includes('house') || text.includes('housing') || text.includes('shelter'))
      return { icon: 'fa-home', bg: '#E3F0FF', color: '#0D47A1' };
    if (text.includes('pension') || text.includes('old age') || text.includes('widow'))
      return { icon: 'fa-coins', bg: '#E8F5E9', color: '#2E7D32' };
    if (text.includes('education') || text.includes('school') || text.includes('fee'))
      return { icon: 'fa-graduation-cap', bg: '#FFF3E0', color: '#E65100' };
    if (text.includes('transport') || text.includes('bus') || text.includes('travel'))
      return { icon: 'fa-bus-alt', bg: '#EDE7F6', color: '#6A1B9A' };
    if (text.includes('women') || text.includes('maternity') || text.includes('child'))
      return { icon: 'fa-female', bg: '#FCE4EC', color: '#C62828' };
    if (text.includes('farmer') || text.includes('ryth') || text.includes('agriculture') || text.includes('crop'))
      return { icon: 'fa-hand-holding-heart', bg: '#E8F5E9', color: '#2E7D32' };
    if (text.includes('insurance') || text.includes('bima'))
      return { icon: 'fa-shield-alt', bg: '#E8F5E9', color: '#2E7D32' };

    // Fallback from category
    const cat = CATEGORY_ICONS[scheme.category];
    if (cat) return cat;
    return { icon: 'fa-star', bg: '#E3F0FF', color: '#0D47A1' };
  }

  // ── Build card HTML from API scheme object ─────────────────────────────────
  function buildSchemeCard(scheme) {
    const { icon, bg, color } = resolveIcon(scheme);
    const name    = scheme.scheme_name   || 'Unknown Scheme';
    const dept    = scheme.department    || 'Government of Telangana';
    const cat     = scheme.category      || '';
    const benefit = scheme.benefits      || 'Contact department for details.';
    const elig    = scheme.eligibility   || 'Check eligibility criteria with department.';
    const docs    = scheme.required_documents || '';
    const link    = scheme.apply_link    || 'dashboard.html';

    // Build 2 highlight tiles from available data
    const highlights = [
      { label: 'Department',  val: dept,   faIcon: 'fa-building' },
      { label: 'Category',    val: cat,    faIcon: 'fa-tag' },
      { label: 'Eligibility', val: elig.length > 60 ? elig.slice(0, 57) + '…' : elig, faIcon: 'fa-id-card' },
      { label: 'Documents',   val: docs ? (docs.length > 50 ? docs.slice(0, 47) + '…' : docs) : 'As per guidelines', faIcon: 'fa-file-alt' },
    ];

    const highlightHtml = highlights.map(h => `
      <div class="sdc-highlight">
        <div class="hl-label">${h.label}</div>
        <div class="hl-val"><i class="fas ${h.faIcon}"></i> ${h.val}</div>
      </div>`).join('');

    // Tags from category + department keywords
    const tagSet = new Set([cat]);
    ['health', 'farmer', 'housing', 'education', 'pension', 'women', 'transport', 'welfare', 'student']
      .forEach(kw => {
        if ((dept + name).toLowerCase().includes(kw)) tagSet.add(kw.charAt(0).toUpperCase() + kw.slice(1));
      });
    const tagsHtml = [...tagSet].slice(0, 4).map(t => `<span>${t}</span>`).join('');

    const benefitShort = benefit.length > 130 ? benefit.slice(0, 127) + '…' : benefit;
    const applyHref = link.startsWith('http') ? link : 'dashboard.html';
    const applyTarget = link.startsWith('http') ? ' target="_blank" rel="noopener"' : '';

    return `
      <div class="scheme-detail-card" data-scat="${cat}" data-scheme-name="${name.toLowerCase()}" data-scheme-text="${(name + dept + benefit + elig).toLowerCase()}">
        <div class="sdc-header">
          <div class="sdc-icon" style="background:${bg};">
            <i class="fas ${icon}" style="color:${color};font-size:26px;"></i>
          </div>
          <div class="sdc-title">
            <h3>${name}</h3>
            <span class="dept-tag">${dept}</span>
          </div>
        </div>
        <div class="sdc-body">
          <p>${benefitShort}</p>
          <div class="sdc-highlights">
            ${highlightHtml}
          </div>
          <div class="sdc-tags">
            ${tagsHtml}
          </div>
        </div>
        <div class="sdc-footer">
          <a href="${applyHref}"${applyTarget} class="btn-scheme-apply"><i class="fas fa-paper-plane"></i> Apply Now</a>
          <a href="#" class="btn-scheme-info"><i class="fas fa-file-pdf"></i> Guidelines</a>
        </div>
      </div>`;
  }

  // ── Render cards into the grid ─────────────────────────────────────────────
  function renderSchemes(schemes) {
    const grid = document.getElementById('schemesGrid');
    if (!grid) return;

    if (!schemes || schemes.length === 0) {
      grid.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:60px 20px;">
          <i class="fas fa-search" style="font-size:48px;color:var(--navy);opacity:0.2;"></i>
          <p style="margin-top:16px;color:var(--text-muted);font-size:15px;">No schemes found matching your search.</p>
        </div>`;
      return;
    }

    grid.innerHTML = schemes.map(buildSchemeCard).join('');
  }

  // ── Apply current filter + search on allSchemes ────────────────────────────
  function applyFilters() {
    let filtered = allSchemes;

    // Category filter
    if (activeCategory !== 'all') {
      filtered = filtered.filter(s => (s.category || '').toLowerCase() === activeCategory.toLowerCase());
    }

    // Search filter (client-side, across name + dept + benefits + eligibility)
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(s => {
        const haystack = [s.scheme_name, s.department, s.benefits, s.eligibility]
          .filter(Boolean).join(' ').toLowerCase();
        return haystack.includes(q);
      });
    }

    renderSchemes(filtered);
  }

  // ── Show error state ───────────────────────────────────────────────────────
  function showError(message) {
    const grid = document.getElementById('schemesGrid');
    if (!grid) return;
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:60px 20px;">
        <i class="fas fa-exclamation-triangle" style="font-size:48px;color:#E65100;opacity:0.6;"></i>
        <p style="margin-top:16px;color:var(--text);font-size:16px;font-weight:600;">Unable to load schemes</p>
        <p style="margin-top:8px;color:var(--text-muted);font-size:14px;">${message}</p>
        <button onclick="SchemesAPI.load()" style="margin-top:20px;background:var(--navy);color:white;border:none;padding:10px 24px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;">
          <i class="fas fa-redo"></i> Retry
        </button>
      </div>`;
  }

  // ── Fetch from API ─────────────────────────────────────────────────────────
  async function loadSchemes() {
    const grid = document.getElementById('schemesGrid');
    if (grid) {
      grid.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:60px 20px;">
          <i class="fas fa-spinner fa-spin" style="font-size:36px;color:var(--navy);opacity:0.5;"></i>
          <p style="margin-top:16px;color:var(--text-muted);font-size:15px;">Loading schemes...</p>
        </div>`;
    }

    try {
      // Fetch all schemes (limit=100 to get full list)
      const res = await fetch(`${API_BASE}/schemes?limit=100`);
      if (!res.ok) throw new Error(`Server responded with status ${res.status}`);

      const json = await res.json();

      // Support both response shapes: { schemes } or { data: { schemes } }
      const schemes = json.schemes || (json.data && json.data.schemes) || [];

      if (!Array.isArray(schemes)) throw new Error('Unexpected response format from API.');

      allSchemes = schemes.filter(s => s.is_active !== false); // only active
      applyFilters();

    } catch (err) {
      console.error('[SchemesAPI] Error loading schemes:', err);
      showError(err.message || 'Could not connect to the server. Please ensure the backend is running.');
    }
  }

  // ── Category filter click handling ─────────────────────────────────────────
  function initCategoryFilter() {
    document.querySelectorAll('.scheme-cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.scheme-cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.dataset.scat || 'all';
        applyFilters();
      });
    });
  }

  // ── Search input handling ──────────────────────────────────────────────────
  function initSearch() {
    const input = document.getElementById('schemeSearchInput');
    const btn   = document.getElementById('schemeSearchBtn');

    if (input) {
      input.addEventListener('input', () => {
        searchQuery = input.value;
        applyFilters();
      });
      input.addEventListener('keydown', e => {
        if (e.key === 'Enter') applyFilters();
      });
    }

    if (btn) {
      btn.addEventListener('click', () => {
        if (input) searchQuery = input.value;
        applyFilters();
      });
    }
  }

  // ── Bootstrap ─────────────────────────────────────────────────────────────
  function init() {
    initCategoryFilter();
    initSearch();
    loadSchemes();
  }

  // Expose reload for the retry button
  window.SchemesAPI = { load: loadSchemes };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
