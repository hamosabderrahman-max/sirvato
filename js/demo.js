/**
 * SIRVATO OS — Demo Page JavaScript
 * Interactive FULLSCREEN TOTALITY canvas with live prompt generation
 */

(function () {
  'use strict';

  const FIELDS = [
    { id: 'target',      label: '⚡ TARGET',      placeholder: 'What do you want to achieve right now?',     trigger: 'Activates: ROLE + MESSAGE' },
    { id: 'role',        label: '🟣 ROLE (R)',     placeholder: 'Define the AI role...',                       trigger: 'Activates: CONTEXT + INTENTION' },
    { id: 'message',     label: '🔵 MESSAGE (M)',  placeholder: 'Core message or focus...',                    trigger: 'Paired with ROLE' },
    { id: 'context',     label: '🔵 CONTEXT (C)',  placeholder: 'Scenario, objective, audience, constraints...', trigger: 'Activates: REQUEST + RHYTHM' },
    { id: 'intention',   label: '🟣 INTENTION (I²)', placeholder: 'Desired effect or transformation...',       trigger: 'Paired with CONTEXT' },
    { id: 'request',     label: '🟡 REQUEST (R)',  placeholder: 'Precisely what you want to obtain...',        trigger: 'Activates: EXAMPLES + OUTPUT' },
    { id: 'rhythm',      label: '🔵 RHYTHM (R)',   placeholder: 'Tone, energy, intensity...',                  trigger: 'Paired with REQUEST' },
    { id: 'examples',    label: '🟪 EXAMPLES (E)', placeholder: 'Models, references, counter-examples...',     trigger: 'Activates: CONSTRAINTS' },
    { id: 'output_fmt',  label: '🔵 OUTPUT (O)',   placeholder: 'Final form: list, schema, email, code...',    trigger: 'Paired with EXAMPLES' },
    { id: 'constraints', label: '🟡 CONSTRAINTS (C)', placeholder: 'Limits, style, exclusions...',             trigger: 'Activates: ICDF ENGINE' },
    { id: 'instruction', label: '🟣 ICDF — INSTRUCTION (I)', placeholder: 'Action verb + specific task...',    trigger: 'ICDF Engine' },
    { id: 'data',        label: '🟡 ICDF — DATA (D)',       placeholder: 'Material, facts, content...',        trigger: 'ICDF Engine' },
    { id: 'format',      label: '🔵 ICDF — FORMAT (F)',     placeholder: 'Output format specification...',     trigger: 'ICDF Engine' },
  ];

  const AI_CHECKS = [
    { id: 'check-role',        label: 'Role coherence + Instruction',  field: 'role' },
    { id: 'check-rhythm',      label: 'Rhythm defined',                 field: 'rhythm' },
    { id: 'check-data',        label: 'Data complete',                  field: 'data' },
    { id: 'check-output',      label: 'Output unambiguous',             field: 'output_fmt' },
    { id: 'check-constraints', label: 'Constraints present',            field: 'constraints' },
  ];

  function getValue(id) {
    const el = document.getElementById('field-' + id);
    return el ? el.value.trim() : '';
  }

  function generatePrompt() {
    const v = {};
    FIELDS.forEach(f => { v[f.id] = getValue(f.id); });

    const lines = [];
    lines.push('════════════════════════════════════════');
    lines.push('🌑  S I R V A T O   O S — FULLSCREEN TOTALITY');
    lines.push('Modalità: Totale · Immersiva · Unificata · Reattiva');
    lines.push('════════════════════════════════════════');
    lines.push('');

    const add = (icon, label, val) => {
      if (val) lines.push(`${icon} ${label}\n→ ${val}\n`);
    };

    add('⚡', 'TARGET — OBIETTIVO IMMEDIATO', v.target);
    add('🟣', 'ROLE (R)', v.role);
    add('🔵', 'MESSAGE (M)', v.message);
    add('🔵', 'CONTEXT (C)', v.context);
    add('🟣', 'INTENTION (I²)', v.intention);
    add('🟡', 'REQUEST (R)', v.request);
    add('🔵', 'RHYTHM (R)', v.rhythm);
    add('🟪', 'EXAMPLES (E)', v.examples);
    add('🔵', 'OUTPUT (O)', v.output_fmt);
    add('🟡', 'CONSTRAINTS (C)', v.constraints);

    if (v.instruction || v.data || v.format) {
      lines.push('🟣 ICDF ENGINE — STRUTTURA');
      if (v.instruction) lines.push(`I — Instruction → ${v.instruction}`);
      if (v.context)     lines.push(`C — Context → (see above)`);
      if (v.data)        lines.push(`D — Data → ${v.data}`);
      if (v.format)      lines.push(`F — Format → ${v.format}`);
      lines.push('');
    }

    lines.push('🔥 AI TRIGGER PROTOCOL — LIVE CHECK');
    lines.push(`• Coerenza Role + Instruction: ${v.role && v.instruction ? '✅' : '⏳'}`);
    lines.push(`• Ritmo definito: ${v.rhythm ? '✅' : '⏳'}`);
    lines.push(`• Dati completi: ${v.data ? '✅' : '⏳'}`);
    lines.push(`• Output non ambiguo: ${v.output_fmt ? '✅' : '⏳'}`);
    lines.push(`• Vincoli presenti: ${v.constraints ? '✅' : '⏳'}`);
    lines.push('');

    const allReady = v.role && v.instruction && v.rhythm && v.data && v.output_fmt && v.constraints;
    lines.push(`→ Sistema: ${allReady ? '🟢 READY' : '🟡 IN PROGRESS'}`);
    lines.push('');

    lines.push('🧩 UNIFIED MODE — SISTEMA UNICO');
    const components = [
      ['1. Role', v.role], ['2. Instruction', v.instruction], ['3. Message', v.message],
      ['4. Intention', v.intention], ['5. Request', v.request], ['6. Context', v.context],
      ['7. Data', v.data], ['8. Examples', v.examples], ['9. Rhythm', v.rhythm],
      ['10. Constraints', v.constraints], ['11. Output', v.output_fmt]
    ];
    components.forEach(([label, val]) => {
      if (val) lines.push(`${label}: ${val}`);
    });
    lines.push('');

    lines.push('🚀 EXECUTE — OUTPUT FINALE');
    const filled = FIELDS.filter(f => getValue(f.id)).length;
    if (filled === 0) {
      lines.push('→ [ Fill fields above to generate your SIRVATO prompt ]');
    } else {
      lines.push('→ Prompt generated from Sistema Unico. Ready to execute.');
    }
    lines.push('');
    lines.push('████████████████████████████████████████');

    return lines.join('\n');
  }

  function updateOutput() {
    const out = document.getElementById('demo-output');
    if (!out) return;
    out.textContent = generatePrompt();
  }

  function updateAIChecks() {
    AI_CHECKS.forEach(check => {
      const el = document.getElementById(check.id);
      if (!el) return;
      const val = getValue(check.field);
      const ok = !!val;
      const icon = el.querySelector('.ai-check-icon');
      const status = el.querySelector('.ai-check-status');
      if (icon) icon.textContent = ok ? '✅' : '⚪';
      if (status) {
        status.textContent = ok ? 'OK' : 'PENDING';
        status.className = 'ai-check-status ' + (ok ? 'ok' : 'pending');
      }
    });

    const allOk = AI_CHECKS.every(c => getValue(c.field));
    const dot = document.querySelector('.trigger-dot');
    const label = document.querySelector('.trigger-value');
    if (dot) dot.classList.toggle('ready', allOk);
    if (label) {
      label.textContent = allOk ? 'READY' : 'IN PROGRESS';
      label.className = 'trigger-value ' + (allOk ? 'ready' : 'pending');
    }
  }

  function updateProgress() {
    const filled = FIELDS.filter(f => getValue(f.id)).length;
    const pct = Math.round((filled / FIELDS.length) * 100);
    const bar = document.getElementById('demo-progress');
    const label = document.getElementById('demo-progress-label');
    if (bar) bar.style.width = pct + '%';
    if (label) label.textContent = pct + '% complete · ' + filled + '/' + FIELDS.length + ' fields';
  }

  function buildForm() {
    const container = document.getElementById('demo-fields');
    if (!container) return;
    container.innerHTML = '';

    FIELDS.forEach(f => {
      const div = document.createElement('div');
      div.className = 'demo-field';

      const label = document.createElement('label');
      label.htmlFor = 'field-' + f.id;
      label.textContent = f.label;

      const ta = document.createElement('textarea');
      ta.id = 'field-' + f.id;
      ta.rows = 2;
      ta.placeholder = f.placeholder;
      ta.addEventListener('input', () => {
        updateOutput();
        updateAIChecks();
        updateProgress();
      });

      const trigger = document.createElement('div');
      trigger.className = 'field-trigger';
      trigger.innerHTML = `Trigger: <span>${f.trigger}</span>`;

      div.appendChild(label);
      div.appendChild(ta);
      div.appendChild(trigger);
      container.appendChild(div);
    });
  }

  function buildAIPanel() {
    const container = document.getElementById('ai-checks');
    if (!container) return;
    container.innerHTML = '';

    AI_CHECKS.forEach(check => {
      const div = document.createElement('div');
      div.className = 'ai-check';
      div.id = check.id;
      div.innerHTML = `
        <span class="ai-check-icon">⚪</span>
        <span class="ai-check-label">${check.label}</span>
        <span class="ai-check-status pending">PENDING</span>
      `;
      container.appendChild(div);
    });

    const status = document.createElement('div');
    status.className = 'trigger-status';
    status.innerHTML = `
      <span class="trigger-dot"></span>
      <span class="trigger-label">System Status:</span>
      <span class="trigger-value pending">IN PROGRESS</span>
    `;
    container.appendChild(status);
  }

  function initTabs() {
    document.querySelectorAll('.demo-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-panel');
        document.querySelectorAll('.demo-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.demo-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const panel = document.getElementById('panel-' + target);
        if (panel) panel.classList.add('active');
        // Update mode-specific fields visibility
        updateModeFields(target);
        updateOutput();
      });
    });
  }

  function updateModeFields(mode) {
    // All fields visible by default for FULLSCREEN TOTALITY
    // For simpler modes, hide advanced fields
    const icdfIds = ['instruction', 'data', 'format'];
    icdfIds.forEach(id => {
      const el = document.getElementById('field-' + id);
      const wrapper = el ? el.closest('.demo-field') : null;
      if (wrapper) wrapper.style.display = (mode === 'basic') ? 'none' : '';
    });
  }

  function initReset() {
    const btn = document.getElementById('btn-reset');
    if (!btn) return;
    btn.addEventListener('click', () => {
      FIELDS.forEach(f => {
        const el = document.getElementById('field-' + f.id);
        if (el) el.value = '';
      });
      updateOutput();
      updateAIChecks();
      updateProgress();
    });
  }

  function initCopyOutput() {
    const btn = document.getElementById('btn-copy-output');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const out = document.getElementById('demo-output');
      if (out && window.SIRVATO) window.SIRVATO.copyText(out.textContent);
    });
  }

  function init() {
    buildForm();
    buildAIPanel();
    initTabs();
    initReset();
    initCopyOutput();
    updateOutput();
    updateAIChecks();
    updateProgress();
    updateModeFields('fullscreen');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
