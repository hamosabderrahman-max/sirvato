/* =====================================================
   SIRVATO OS — i18n.js
   Simple EN/IT language toggle using data-i18n attributes
   ===================================================== */

const TRANSLATIONS = {
  en: {
    'nav.frameworks':  'Frameworks',
    'nav.interfaces':  'Interfaces',
    'nav.micro':       'MICRO SUPRA',
    'nav.docs':        'Docs',
    'nav.demo':        'Demo',
    'hero.badge':      'PROMPT ENGINEERING OS',
    'hero.subtitle':   'MICRO SUPRA‑TOTALITY System',
    'hero.desc':       'The complete prompt engineering operating system. 8 frameworks, 8 interfaces, and the most advanced MICRO architecture ever built.',
    'hero.cta1':       'Get Started',
    'hero.cta2':       'Live Demo',
    'stats.frameworks':'Frameworks',
    'stats.interfaces':'Interfaces',
    'stats.pages':     'Pages',
    'stats.layers':    'MICRO Layers',
    'section.frameworks': 'Frameworks',
    'section.interfaces': 'Interfaces',
    'section.micro':   'MICRO SUPRA‑TOTALITY',
    'section.docs':    'Documentation',
    'footer.copy':     '© 2024 SIRVATO OS — All rights reserved',
    'quick-start':     'Quick Start',
    'faq':             'FAQ',
  },
  it: {
    'nav.frameworks':  'Framework',
    'nav.interfaces':  'Interfacce',
    'nav.micro':       'MICRO SUPRA',
    'nav.docs':        'Docs',
    'nav.demo':        'Demo',
    'hero.badge':      'SISTEMA OPERATIVO PER PROMPT',
    'hero.subtitle':   'Sistema MICRO SUPRA‑TOTALITY',
    'hero.desc':       'Il sistema operativo completo per il prompt engineering. 8 framework, 8 interfacce, e la più avanzata architettura MICRO mai realizzata.',
    'hero.cta1':       'Inizia Ora',
    'hero.cta2':       'Demo Live',
    'stats.frameworks':'Framework',
    'stats.interfaces':'Interfacce',
    'stats.pages':     'Pagine',
    'stats.layers':    'Layer MICRO',
    'section.frameworks': 'Framework',
    'section.interfaces': 'Interfacce',
    'section.micro':   'MICRO SUPRA‑TOTALITY',
    'section.docs':    'Documentazione',
    'footer.copy':     '© 2024 SIRVATO OS — Tutti i diritti riservati',
    'quick-start':     'Avvio Rapido',
    'faq':             'FAQ',
  }
};

let currentLang = localStorage.getItem('sirvato-lang') || 'en';

function applyTranslations(lang) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = t[key];
      } else {
        el.textContent = t[key];
      }
    }
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (t[key] !== undefined) el.innerHTML = t[key];
  });
  // Update lang toggle button label
  const btn = document.getElementById('lang-toggle');
  if (btn) btn.textContent = lang === 'en' ? 'IT' : 'EN';
  document.documentElement.lang = lang;
}

function toggleLang() {
  currentLang = currentLang === 'en' ? 'it' : 'en';
  localStorage.setItem('sirvato-lang', currentLang);
  applyTranslations(currentLang);
}

document.addEventListener('DOMContentLoaded', () => {
  applyTranslations(currentLang);
  const btn = document.getElementById('lang-toggle');
  if (btn) btn.addEventListener('click', toggleLang);
});
