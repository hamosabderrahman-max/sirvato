/**
 * SIRVATO OS — Official Website Core JavaScript
 * Dark Mode · Language Selector · Mobile Nav · Clipboard · Animations
 */

(function () {
  'use strict';

  /* ── Theme ── */
  const THEME_KEY = 'sirvato-theme';
  const html = document.documentElement;

  function getTheme() {
    return localStorage.getItem(THEME_KEY) ||
      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  }

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.setAttribute('title', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    });
  }

  function toggleTheme() {
    applyTheme(getTheme() === 'dark' ? 'light' : 'dark');
  }

  /* ── Language ── */
  const LANG_KEY = 'sirvato-lang';

  const translations = {
    en: {
      'nav.home': 'Home',
      'nav.frameworks': 'Frameworks',
      'nav.interfaces': 'Interfaces',
      'nav.docs': 'Docs',
      'nav.demo': 'Demo',
      'hero.badge': 'SIRVATO OS · v8.0 FINAL',
      'hero.cta.primary': 'Launch Demo',
      'hero.cta.secondary': 'Read Docs',
      'footer.copy': '© 2025 SIRVATO OS. All rights reserved.',
      'toast.copied': '✓ Copied to clipboard',
    },
    it: {
      'nav.home': 'Home',
      'nav.frameworks': 'Framework',
      'nav.interfaces': 'Interfacce',
      'nav.docs': 'Docs',
      'nav.demo': 'Demo',
      'hero.badge': 'SIRVATO OS · v8.0 FINALE',
      'hero.cta.primary': 'Avvia Demo',
      'hero.cta.secondary': 'Leggi Docs',
      'footer.copy': '© 2025 SIRVATO OS. Tutti i diritti riservati.',
      'toast.copied': '✓ Copiato negli appunti',
    }
  };

  function getLang() {
    return localStorage.getItem(LANG_KEY) || 'en';
  }

  function applyLang(lang) {
    localStorage.setItem(LANG_KEY, lang);
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = translations[lang]?.[key];
      if (val) el.textContent = val;
    });
    document.querySelectorAll('.lang-select').forEach(sel => {
      sel.value = lang;
    });
  }

  /* ── Toast ── */
  function showToast(msg) {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2400);
  }

  /* ── Clipboard ── */
  function copyText(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        const lang = getLang();
        showToast(translations[lang]?.['toast.copied'] || '✓ Copied');
      });
    } else {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast('✓ Copied');
    }
  }

  /* ── Mobile Nav ── */
  function initMobileNav() {
    const toggle = document.querySelector('.nav-mobile-toggle');
    const links = document.querySelector('.nav-links');
    if (!toggle || !links) return;
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.innerHTML = links.classList.contains('open') ? '✕' : '☰';
    });
    document.addEventListener('click', e => {
      if (!e.target.closest('.nav') && links.classList.contains('open')) {
        links.classList.remove('open');
        toggle.innerHTML = '☰';
      }
    });
  }

  /* ── Active Nav Link ── */
  function setActiveNav() {
    const path = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href') || '';
      const active = (path.endsWith(href) || (path === '/' && href === 'index.html') ||
        (path.endsWith('/') && href === 'index.html'));
      link.classList.toggle('active', active);
    });
  }

  /* ── Scroll Animations ── */
  function initScrollAnimations() {
    const els = document.querySelectorAll('.animate-on-scroll');
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('fade-in'));
      return;
    }
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
  }

  /* ── Accordions ── */
  function initAccordions() {
    document.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        const body = header.nextElementSibling;
        const isOpen = header.classList.contains('open');
        // Close all in same accordion
        const accordion = header.closest('.accordion');
        if (accordion) {
          accordion.querySelectorAll('.accordion-header').forEach(h => {
            h.classList.remove('open');
            const b = h.nextElementSibling;
            if (b) b.classList.remove('open');
          });
        }
        if (!isOpen) {
          header.classList.add('open');
          if (body) body.classList.add('open');
        }
      });
    });
  }

  /* ── Copy Buttons ── */
  function initCopyButtons() {
    document.querySelectorAll('[data-copy]').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-copy');
        const el = target ? document.getElementById(target) : null;
        const text = el ? (el.textContent || el.value) : btn.getAttribute('data-copy-text');
        if (text) copyText(text);
      });
    });
  }

  /* ── Smooth Scroll for anchor links ── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const id = link.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ── Init ── */
  function init() {
    applyTheme(getTheme());
    applyLang(getLang());
    setActiveNav();
    initMobileNav();
    initScrollAnimations();
    initAccordions();
    initCopyButtons();
    initSmoothScroll();

    // Theme toggle buttons
    document.addEventListener('click', e => {
      if (e.target.closest('.theme-toggle')) toggleTheme();
    });

    // Language select
    document.querySelectorAll('.lang-select').forEach(sel => {
      sel.addEventListener('change', () => applyLang(sel.value));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose globally for demo.js
  window.SIRVATO = { copyText, showToast, getLang, translations };

})();
