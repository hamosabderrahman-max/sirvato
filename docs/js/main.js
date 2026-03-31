// SIRVATO OS - Main JavaScript

(function() {
  'use strict';

  // Navigation active state
  function setActiveNav() {
    const path = window.location.pathname;
    document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      // Normalize paths for comparison
      const linkPath = href.replace(/^\.\.\//, '/').replace(/^\.\//, '/');
      if (path.includes(linkPath) && linkPath !== '/' && linkPath !== '/sirvato/') {
        link.classList.add('active');
      }
    });
  }

  // Mobile nav toggle
  function initMobileNav() {
    const toggle = document.getElementById('nav-toggle');
    const mobileNav = document.getElementById('nav-mobile');
    if (!toggle || !mobileNav) return;
    toggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });
    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileNav.classList.remove('open'));
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('open');
      }
    });
  }

  // Sticky nav shadow on scroll
  function initNavScroll() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
      } else {
        nav.style.boxShadow = 'none';
      }
    }, { passive: true });
  }

  // Smooth scroll for anchor links
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 64;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  // Counter animation
  function animateCounter(el) {
    const target = parseInt(el.dataset.target || el.textContent) || 0;
    const duration = 1500;
    const start = performance.now();
    const startVal = 0;
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(startVal + (target - startVal) * eased).toLocaleString();
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // FAQ accordion
  function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(q => {
      q.addEventListener('click', () => {
        const item = q.closest('.faq-item');
        const wasOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!wasOpen) item.classList.add('open');
      });
    });
  }

  // Copy code blocks
  function initCodeCopy() {
    document.querySelectorAll('.code-block').forEach(block => {
      const btn = document.createElement('button');
      btn.textContent = 'Copy';
      btn.className = 'btn btn-sm';
      btn.style.cssText = 'position:absolute;top:.75rem;right:3.5rem;opacity:.6;font-size:0.7rem;padding:0.2rem 0.5rem';
      btn.addEventListener('click', () => {
        const text = block.querySelector('pre')?.textContent || block.textContent;
        navigator.clipboard.writeText(text).then(() => {
          btn.textContent = 'Copied!';
          setTimeout(() => btn.textContent = 'Copy', 2000);
        });
      });
      block.style.position = 'relative';
      block.appendChild(btn);
    });
  }

  // Status bar live clock
  function initStatusClock() {
    const el = document.getElementById('status-time');
    if (!el) return;
    function update() {
      el.textContent = new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
    }
    update();
    setInterval(update, 1000);
  }

  // Init all
  document.addEventListener('DOMContentLoaded', () => {
    setActiveNav();
    initMobileNav();
    initNavScroll();
    initSmoothScroll();
    initFAQ();
    initCodeCopy();
    initStatusClock();
  });

})();
