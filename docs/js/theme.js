/* =====================================================
   SIRVATO OS — theme.js
   Toggle dark/light mode, persisted to localStorage
   ===================================================== */

(function () {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const saved = localStorage.getItem('sirvato-theme');

  if (saved) body.classList.toggle('light-mode', saved === 'light');
  if (themeToggle) {
    themeToggle.textContent = body.classList.contains('light-mode') ? '☀️' : '🌙';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('light-mode');
      const isDark = !body.classList.contains('light-mode');
      localStorage.setItem('sirvato-theme', isDark ? 'dark' : 'light');
      themeToggle.textContent = isDark ? '🌙' : '☀️';
    });
  }
})();
