/* SIRVATO OS — Main JS */
(function () {
  'use strict';

  /* ─── Mobile Nav ─── */
  function initMobileNav() {
    var toggle = document.querySelector('.nav-toggle');
    var menu = document.querySelector('.mobile-menu');
    if (!toggle || !menu) return;

    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'mobile-menu');

    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? '✕' : '☰';
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '☰';
      }
    });

    // Close on link click
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '☰';
      });
    });
  }

  /* ─── Active Nav Link ─── */
  function initActiveNav() {
    var current = window.location.pathname;
    document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href) return;
      var linkPath = new URL(href, window.location.href).pathname;
      if (current === linkPath || (current.endsWith('/') && linkPath === current + 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  /* ─── Copy to Clipboard ─── */
  function initCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-copy-target');
        var text = '';
        if (target) {
          var el = document.querySelector(target);
          if (el) text = el.textContent || el.value || '';
        } else {
          var block = btn.closest('.copy-block');
          if (block) {
            var pre = block.querySelector('pre');
            if (pre) text = pre.textContent;
          }
        }
        if (!text) return;

        navigator.clipboard.writeText(text.trim()).then(function () {
          var original = btn.textContent;
          btn.textContent = '✓ Copied';
          btn.classList.add('copied');
          setTimeout(function () {
            btn.textContent = original;
            btn.classList.remove('copied');
          }, 2000);
        }).catch(function () {
          // Fallback for older browsers
          var ta = document.createElement('textarea');
          ta.value = text.trim();
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          btn.textContent = '✓';
          btn.classList.add('copied');
          setTimeout(function () {
            btn.textContent = '📋 Copy';
            btn.classList.remove('copied');
          }, 2000);
        });
      });
    });
  }

  /* ─── Smooth Scroll ─── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var id = link.getAttribute('href').slice(1);
        var target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        var offset = 80;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  }

  /* ─── Scroll Reveal ─── */
  function initScrollReveal() {
    if (!window.IntersectionObserver) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card, .framework-block').forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      observer.observe(el);
    });
  }

  /* ─── Sidebar Toggle (mobile) ─── */
  function initSidebarToggle() {
    var btn = document.querySelector('.sidebar-toggle');
    var sidebar = document.querySelector('.sidebar-nav');
    if (!btn || !sidebar) return;

    btn.addEventListener('click', function () {
      sidebar.classList.toggle('mobile-open');
    });
  }

  /* ─── Init ─── */
  function init() {
    initMobileNav();
    initActiveNav();
    initCopyButtons();
    initSmoothScroll();
    initScrollReveal();
    initSidebarToggle();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
