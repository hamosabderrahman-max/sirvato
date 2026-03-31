// SIRVATO OS - Scroll Animations & Effects

(function() {
  'use strict';

  // Intersection Observer for reveal animations
  function initReveal() {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (!els.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    els.forEach(el => observer.observe(el));
  }

  // Counter animation on reveal
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => observer.observe(el));
  }

  function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    const duration = 1500;
    const start = performance.now();
    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = (target * eased).toFixed(decimals);
      el.textContent = prefix + value + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // Progress bars
  function initProgressBars() {
    const bars = document.querySelectorAll('.progress-fill[data-width]');
    if (!bars.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.width;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    bars.forEach(bar => {
      bar.style.width = '0';
      observer.observe(bar);
    });
  }

  // Particle/matrix canvas background (optional, lightweight)
  function initMatrixCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>?/\\|~`';
    const fontSize = 13;
    let cols;
    const drops = [];
    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      cols = Math.floor(canvas.width / fontSize);
      drops.length = 0;
      for (let i = 0; i < cols; i++) drops[i] = Math.random() * -100;
    }
    resize();
    window.addEventListener('resize', resize);
    function draw() {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0, 245, 255, 0.4)';
      ctx.font = fontSize + 'px monospace';
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }
    const interval = setInterval(draw, 60);
    // Cleanup when hidden
    const observer = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) {
        clearInterval(interval);
        observer.disconnect();
      }
    });
    observer.observe(canvas);
  }

  // Stagger cards on load
  function initCardStagger() {
    const groups = document.querySelectorAll('.grid');
    groups.forEach(grid => {
      const cards = grid.querySelectorAll('.card');
      cards.forEach((card, i) => {
        if (!card.classList.contains('reveal')) {
          card.classList.add('reveal');
          card.style.transitionDelay = (i * 0.07) + 's';
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initReveal();
    initCounters();
    initProgressBars();
    initCardStagger();
    initMatrixCanvas('matrix-canvas');
  });

  window.SirvatoAnimations = { initMatrixCanvas };
})();
