/* =====================================================
   SIRVATO OS — animations.js
   IntersectionObserver reveals + Matrix rain canvas
   ===================================================== */

/* ── Scroll Reveal ── */
document.addEventListener('DOMContentLoaded', () => {
  const revealClasses = ['.reveal', '.reveal-left', '.reveal-right'];
  const elements = document.querySelectorAll(revealClasses.join(','));

  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
});

/* ── Matrix Rain Canvas ── */
function initMatrixRain(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const chars = 'SIRVATO01アイウエオカキクケコSYSTEMOSMICROSUPRA∑∆ΩΠΣΨΦ∞';

  let W, H, drops;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    const cols = Math.floor(W / 14);
    drops = Array(cols).fill(1).map(() => Math.random() * H / 14 * -1);
  }

  function draw() {
    ctx.fillStyle = 'rgba(0,0,0,0.04)';
    ctx.fillRect(0, 0, W, H);

    ctx.font = '13px Space Mono, monospace';
    drops.forEach((y, i) => {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const alpha = Math.random() > 0.9 ? 1 : 0.35;
      ctx.fillStyle = `rgba(0, 212, 255, ${alpha})`;
      ctx.fillText(char, i * 14, y * 14);
      if (y * 14 > H && Math.random() > 0.975) drops[i] = 0;
      drops[i] += 0.5;
    });
  }

  resize();
  window.addEventListener('resize', resize);

  let raf;
  function loop() { draw(); raf = requestAnimationFrame(loop); }
  loop();

  // Pause when off-screen to save performance
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!raf) loop();
      } else {
        cancelAnimationFrame(raf);
        raf = null;
      }
    });
  });
  observer.observe(canvas);
}

document.addEventListener('DOMContentLoaded', () => {
  initMatrixRain('matrix-canvas');
});
