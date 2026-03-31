/* SIRVATO OS — Interactive Demo JS */
(function () {
  'use strict';

  var frameworks = {
    unified: {
      label: 'Unified Mode (All Frameworks)',
      fields: ['target','role','message','intention','request','context','data','examples','rhythm','constraints','output'],
      template: function (v) {
        return [
          '════════════════════════════════════════',
          '🌑  SIRVATO OS — UNIFIED PROMPT',
          '════════════════════════════════════════',
          '',
          v.target     ? '⚡ TARGET\n→ ' + v.target     : '',
          v.role       ? '\n🟣 ROLE\n→ ' + v.role       : '',
          v.message    ? '\n🔵 MESSAGE\n→ ' + v.message    : '',
          v.intention  ? '\n🟣 INTENTION\n→ ' + v.intention  : '',
          v.request    ? '\n🟡 REQUEST\n→ ' + v.request    : '',
          v.context    ? '\n🔵 CONTEXT\n→ ' + v.context    : '',
          v.data       ? '\n🟡 DATA\n→ ' + v.data       : '',
          v.examples   ? '\n🟪 EXAMPLES\n→ ' + v.examples   : '',
          v.rhythm     ? '\n🔵 RHYTHM\n→ ' + v.rhythm     : '',
          v.constraints? '\n🟡 CONSTRAINTS\n→ ' + v.constraints: '',
          v.output     ? '\n🚀 OUTPUT FORMAT\n→ ' + v.output     : '',
          '',
          '════════════════════════════════════════',
          '✅ PROMPT READY — SISTEMA UNICO',
          '════════════════════════════════════════'
        ].filter(function (l) { return l !== ''; }).join('\n');
      }
    },
    icdf: {
      label: 'ICDF Engine',
      fields: ['role','context','data','output'],
      template: function (v) {
        return [
          '🟣 ICDF ENGINE',
          '────────────────────────────────────────',
          'I — Instruction: ' + (v.role || ''),
          'C — Context:     ' + (v.context || ''),
          'D — Data:        ' + (v.data || ''),
          'F — Format:      ' + (v.output || ''),
          '────────────────────────────────────────'
        ].join('\n');
      }
    },
    micro: {
      label: 'MICRO Layer',
      fields: ['message','intention','context','rhythm','output'],
      template: function (v) {
        return [
          '🔵 MICRO LAYER',
          '────────────────────────────────────────',
          'M — Message:   ' + (v.message || ''),
          'I² — Intention: ' + (v.intention || ''),
          'C — Context:   ' + (v.context || ''),
          'R — Rhythm:    ' + (v.rhythm || ''),
          'O — Output:    ' + (v.output || ''),
          '────────────────────────────────────────'
        ].join('\n');
      }
    },
    rcreoc: {
      label: 'RCR-EOC Framework',
      fields: ['role','context','request','examples','output','constraints'],
      template: function (v) {
        return [
          '🟪 RCR-EOC FRAMEWORK',
          '────────────────────────────────────────',
          'Role:        ' + (v.role || ''),
          'Context:     ' + (v.context || ''),
          'Request:     ' + (v.request || ''),
          'Examples:    ' + (v.examples || ''),
          'Output:      ' + (v.output || ''),
          'Constraints: ' + (v.constraints || ''),
          '────────────────────────────────────────'
        ].join('\n');
      }
    },
    autoflow: {
      label: 'Auto-Flow (Sequential)',
      fields: ['role','context','request','examples','output','constraints','target'],
      template: function (v) {
        return [
          '🔄 AUTO-FLOW — SEQUENTIAL',
          '────────────────────────────────────────',
          'Step 1 — Role:        ' + (v.role || ''),
          'Step 2 — Context:     ' + (v.context || ''),
          'Step 3 — Request:     ' + (v.request || ''),
          'Step 4 — Examples:    ' + (v.examples || ''),
          'Step 5 — Output:      ' + (v.output || ''),
          'Step 6 — Constraints: ' + (v.constraints || ''),
          'Step 7 — ICDF:        [auto-structured]',
          'Step 8 — Unified:     [fused]',
          'Step 9 — Execute ✅',
          '────────────────────────────────────────'
        ].join('\n');
      }
    },
    hud: {
      label: 'HUD Minimal',
      fields: ['target','output'],
      template: function (v) {
        return [
          '🎛 HUD MINIMAL',
          '──────────────',
          'TARGET:  ' + (v.target || ''),
          'ICDF:    [auto]',
          'MICRO:   [auto]',
          'OUTPUT:  ' + (v.output || ''),
          'EXECUTE ✅',
          '──────────────'
        ].join('\n');
      }
    }
  };

  var currentFramework = 'unified';
  var outputEl;

  function getFieldValue(name) {
    var el = document.querySelector('[data-field="' + name + '"]');
    return el ? el.value.trim() : '';
  }

  function generatePrompt() {
    var fw = frameworks[currentFramework];
    if (!fw) return;

    var values = {};
    fw.fields.forEach(function (f) {
      values[f] = getFieldValue(f);
    });

    var result = fw.template(values);
    if (outputEl) {
      outputEl.textContent = result;
    }
  }

  function resetDemo() {
    document.querySelectorAll('.demo-form input, .demo-form textarea').forEach(function (el) {
      el.value = '';
    });
    if (outputEl) {
      var placeholder = outputEl.getAttribute('data-placeholder') || '// SIRVATO OS ready.\n// Fill the fields and press Generate.';
      outputEl.textContent = placeholder;
    }
  }

  function updateFieldVisibility() {
    var fw = frameworks[currentFramework];
    if (!fw) return;

    document.querySelectorAll('.demo-field').forEach(function (el) {
      var name = el.getAttribute('data-field-name');
      if (!name) return;
      if (fw.fields.indexOf(name) >= 0) {
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
    });
  }

  function initDemo() {
    outputEl = document.getElementById('demo-output');
    if (!outputEl) return;

    var placeholder = '// SIRVATO OS ready.\n// Fill the fields and press Generate.\n// Sistema Unico · Operativo · Reattivo';
    outputEl.textContent = placeholder;
    outputEl.setAttribute('data-placeholder', placeholder);

    // Framework selector
    var selector = document.getElementById('framework-selector');
    if (selector) {
      // Populate options
      selector.innerHTML = '';
      Object.keys(frameworks).forEach(function (key) {
        var opt = document.createElement('option');
        opt.value = key;
        opt.textContent = frameworks[key].label;
        selector.appendChild(opt);
      });

      selector.addEventListener('change', function () {
        currentFramework = selector.value;
        updateFieldVisibility();
      });
    }

    updateFieldVisibility();

    // Generate button
    var genBtn = document.getElementById('demo-generate');
    if (genBtn) {
      genBtn.addEventListener('click', generatePrompt);
    }

    // Reset button
    var resetBtn = document.getElementById('demo-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', resetDemo);
    }

    // Copy output button
    var copyBtn = document.getElementById('demo-copy');
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        var text = outputEl.textContent;
        if (!text) return;
        navigator.clipboard.writeText(text).then(function () {
          copyBtn.textContent = '✓ Copied!';
          setTimeout(function () { copyBtn.textContent = '📋 Copy'; }, 2000);
        }).catch(function () {
          var ta = document.createElement('textarea');
          ta.value = text;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          copyBtn.textContent = '✓';
          setTimeout(function () { copyBtn.textContent = '📋 Copy'; }, 2000);
        });
      });
    }

    // Live auto-generate on Enter (except textarea)
    document.querySelectorAll('.demo-form input').forEach(function (el) {
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          generatePrompt();
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDemo);
  } else {
    initDemo();
  }
}());
