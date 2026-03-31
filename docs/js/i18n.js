/* SIRVATO OS — i18n (Internationalization) */
(function () {
  'use strict';

  const translations = {
    en: {
      // Navigation
      nav_home: 'Home',
      nav_frameworks: 'Frameworks',
      nav_interfaces: 'Interfaces',
      nav_docs: 'Docs',
      nav_demo: 'Demo',
      nav_github: 'GitHub',
      nav_lang: 'IT',
      nav_theme: '☀',

      // Hero
      hero_badge: 'SIRVATO OS — Sistema Unico',
      hero_title: 'SIRVATO OS',
      hero_subtitle: 'The unified AI prompt operating system. ICDF + MICRO + RCR-EOC + Auto-Flow fused into one reactive system.',
      hero_cta_demo: 'Try Interactive Demo',
      hero_cta_docs: 'View Documentation',
      hero_cta_github: 'GitHub Repository',

      // Stats
      stat_frameworks: 'Frameworks',
      stat_interfaces: 'Interfaces',
      stat_components: 'Components',
      stat_status: 'Operational',

      // Sections
      section_frameworks: 'Frameworks',
      section_frameworks_desc: 'Eight powerful prompt engineering frameworks for every workflow.',
      section_interfaces: 'Interfaces',
      section_interfaces_desc: 'Seven interface modes from minimal HUD to full immersive canvas.',

      // Footer
      footer_status: 'All Systems Operational',
      footer_copy: '© 2025 SIRVATO OS. Open source.',

      // Demo
      demo_title: 'Interactive Demo',
      demo_target: 'Target — Immediate Goal',
      demo_role: 'Role (R)',
      demo_message: 'Message (M)',
      demo_context: 'Context (C)',
      demo_intention: 'Intention (I²)',
      demo_request: 'Request (R)',
      demo_rhythm: 'Rhythm (R)',
      demo_examples: 'Examples (E)',
      demo_output: 'Output Format (O)',
      demo_constraints: 'Constraints (C)',
      demo_framework: 'Select Framework',
      demo_generate: '⚡ Generate Prompt',
      demo_copy: '📋 Copy',
      demo_reset: '↺ Reset',
      demo_placeholder: '// SIRVATO OS ready. Fill the fields and press Generate.\n// Sistema Unico · Operativo · Reattivo',

      // Docs
      docs_quickstart: 'Quick Start',
      docs_comparison: 'Framework Comparison',
      docs_practices: 'Best Practices',
      docs_api: 'API Reference',
      docs_faq: 'FAQ',
    },
    it: {
      // Navigation
      nav_home: 'Home',
      nav_frameworks: 'Framework',
      nav_interfaces: 'Interfacce',
      nav_docs: 'Docs',
      nav_demo: 'Demo',
      nav_github: 'GitHub',
      nav_lang: 'EN',
      nav_theme: '☀',

      // Hero
      hero_badge: 'SIRVATO OS — Sistema Unico',
      hero_title: 'SIRVATO OS',
      hero_subtitle: "Il sistema operativo unificato per prompt AI. ICDF + MICRO + RCR-EOC + Auto-Flow fusi in un unico sistema reattivo.",
      hero_cta_demo: 'Prova la Demo Interattiva',
      hero_cta_docs: 'Leggi la Documentazione',
      hero_cta_github: 'Repository GitHub',

      // Stats
      stat_frameworks: 'Framework',
      stat_interfaces: 'Interfacce',
      stat_components: 'Componenti',
      stat_status: 'Operativo',

      // Sections
      section_frameworks: 'Framework',
      section_frameworks_desc: 'Otto potenti framework di prompt engineering per ogni flusso di lavoro.',
      section_interfaces: 'Interfacce',
      section_interfaces_desc: 'Sette modalità di interfaccia, dal HUD minimale alla canvas immersiva.',

      // Footer
      footer_status: 'Tutti i Sistemi Operativi',
      footer_copy: '© 2025 SIRVATO OS. Open source.',

      // Demo
      demo_title: 'Demo Interattiva',
      demo_target: 'Target — Obiettivo Immediato',
      demo_role: 'Ruolo (R)',
      demo_message: 'Messaggio (M)',
      demo_context: 'Contesto (C)',
      demo_intention: 'Intenzione (I²)',
      demo_request: 'Richiesta (R)',
      demo_rhythm: 'Ritmo (R)',
      demo_examples: 'Esempi (E)',
      demo_output: 'Formato Output (O)',
      demo_constraints: 'Vincoli (C)',
      demo_framework: 'Seleziona Framework',
      demo_generate: '⚡ Genera Prompt',
      demo_copy: '📋 Copia',
      demo_reset: '↺ Reset',
      demo_placeholder: '// SIRVATO OS pronto. Compila i campi e premi Genera.\n// Sistema Unico · Operativo · Reattivo',

      // Docs
      docs_quickstart: 'Guida Rapida',
      docs_comparison: 'Confronto Framework',
      docs_practices: 'Buone Pratiche',
      docs_api: 'Riferimento API',
      docs_faq: 'FAQ',
    }
  };

  let currentLang = localStorage.getItem('sirvato-lang') || 'en';

  function t(key) {
    return (translations[currentLang] || translations.en)[key] || key;
  }

  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      const val = t(key);
      if (val) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = val;
        } else {
          el.textContent = val;
        }
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-placeholder');
      el.placeholder = t(key);
    });

    document.documentElement.lang = currentLang;
  }

  function toggleLang() {
    currentLang = currentLang === 'en' ? 'it' : 'en';
    localStorage.setItem('sirvato-lang', currentLang);
    applyTranslations();
    const langBtn = document.querySelector('.btn-lang');
    if (langBtn) {
      langBtn.textContent = t('nav_lang');
    }
  }

  function init() {
    applyTranslations();
    const langBtn = document.querySelector('.btn-lang');
    if (langBtn) {
      langBtn.textContent = t('nav_lang');
      langBtn.addEventListener('click', toggleLang);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.SirvatoI18n = { t: t, toggleLang: toggleLang, getLang: function () { return currentLang; } };
}());
