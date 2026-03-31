/* SIRVATO OS — Theme Toggle */
(function () {
  'use strict';

  var STORAGE_KEY = 'sirvato-theme';

  function getTheme() {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var btn = document.querySelector('.btn-theme');
    if (btn) {
      btn.textContent = theme === 'dark' ? '☀' : '🌑';
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme') || 'dark';
    var next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  }

  function init() {
    applyTheme(getTheme());
    var btn = document.querySelector('.btn-theme');
    if (btn) {
      btn.addEventListener('click', toggleTheme);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.SirvatoTheme = { toggle: toggleTheme, getTheme: getTheme };
}());
