// SIRVATO OS - Internationalization (EN/IT)

(function() {
  'use strict';

  const translations = {
    en: {
      'nav.home': 'Home',
      'nav.frameworks': 'Frameworks',
      'nav.interfaces': 'Interfaces',
      'nav.micro-supra': 'MICRO SUPRA',
      'nav.docs': 'Docs',
      'nav.demo': 'Demo',
      'nav.tools': 'Tools',
      'hero.badge': 'AUTOPILOT MODE ACTIVE',
      'hero.title': 'AI-First Cloud Provider',
      'hero.subtitle': 'AUTOPILOT Mode. Zero Configuration. Real-Time Decisions.',
      'hero.cta.start': 'Get Started',
      'hero.cta.demo': 'View Demo',
      'footer.tagline': 'The AI-First Cloud Operating System. Autonomous. Secure. Infinite.',
      'footer.copyright': '© 2025 SIRVATO OS. All rights reserved.',
      'status.uptime': 'Uptime: 99.99%',
      'status.rto': 'RTO < 5s',
      'status.regions': 'Regions: 3',
      'status.security': 'Zero-Trust: ACTIVE',
    },
    it: {
      'nav.home': 'Home',
      'nav.frameworks': 'Framework',
      'nav.interfaces': 'Interfacce',
      'nav.micro-supra': 'MICRO SUPRA',
      'nav.docs': 'Documentazione',
      'nav.demo': 'Demo',
      'nav.tools': 'Strumenti',
      'hero.badge': 'MODALITÀ AUTOPILOT ATTIVA',
      'hero.title': 'Cloud Provider AI-First',
      'hero.subtitle': 'Modalità AUTOPILOT. Zero Configurazione. Decisioni in Tempo Reale.',
      'hero.cta.start': 'Inizia',
      'hero.cta.demo': 'Guarda Demo',
      'footer.tagline': "Il Sistema Operativo Cloud AI-First. Autonomo. Sicuro. Infinito.",
      'footer.copyright': '© 2025 SIRVATO OS. Tutti i diritti riservati.',
      'status.uptime': 'Uptime: 99.99%',
      'status.rto': 'RTO < 5s',
      'status.regions': 'Regioni: 3',
      'status.security': 'Zero-Trust: ATTIVO',
    }
  };

  const STORAGE_KEY = 'sirvato-lang';
  let currentLang = localStorage.getItem(STORAGE_KEY) || 'en';

  function t(key) {
    return (translations[currentLang] || translations.en)[key] || key;
  }

  function applyTranslations(lang) {
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      el.textContent = t(key);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.placeholder = t(el.dataset.i18nPlaceholder);
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      el.title = t(el.dataset.i18nTitle);
    });
    // Update lang toggles
    document.querySelectorAll('.lang-toggle').forEach(btn => {
      btn.dataset.lang === lang ? btn.classList.add('active') : btn.classList.remove('active');
    });
    document.documentElement.lang = lang;
  }

  function initI18n() {
    applyTranslations(currentLang);
    document.querySelectorAll('.lang-toggle').forEach(btn => {
      btn.addEventListener('click', () => applyTranslations(btn.dataset.lang));
    });
  }

  document.addEventListener('DOMContentLoaded', initI18n);

  window.SirvatoI18n = { t, applyTranslations, getLang: () => currentLang };
})();
