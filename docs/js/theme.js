// SIRVATO OS - Theme (Dark/Light) Toggle

(function() {
  'use strict';

  const STORAGE_KEY = 'sirvato-theme';
  const DEFAULT_THEME = 'dark';

  function getTheme() {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME;
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    // Update toggle icons
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      btn.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    });
  }

  function toggleTheme() {
    const current = getTheme();
    applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  // Apply on load (before paint to avoid flash)
  applyTheme(getTheme());

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.addEventListener('click', toggleTheme);
    });
  });

  // Export
  window.SirvatoTheme = { toggle: toggleTheme, get: getTheme, set: applyTheme };
})();
