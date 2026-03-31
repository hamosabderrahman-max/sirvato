// SIRVATO OS - Interactive Demo Terminal

(function() {
  'use strict';

  const DEMO_SEQUENCES = [
    {
      prompt: 'sirvato',
      cmd: 'init --mode=autopilot --region=multi',
      output: [
        '⚡ Initializing SIRVATO OS v3.1.0...',
        '  ✓ AUTOPILOT mode enabled',
        '  ✓ Multi-region routing: us-east-1, eu-west-1, ap-south-1',
        '  ✓ Zero-Trust security policies loaded',
        '  ✓ Observability stack initialized',
        '',
        '🚀 System ready. RTO < 5s | Uptime target: 99.99%'
      ]
    },
    {
      prompt: 'sirvato',
      cmd: 'deploy --framework=auto-flow-pro --scale=auto',
      output: [
        '📦 Deploying with AUTO-FLOW PRO framework...',
        '  [Step 1/9] Intent Analysis ................. ✓',
        '  [Step 2/9] Context Extraction .............. ✓',
        '  [Step 3/9] Constraint Mapping .............. ✓',
        '  [Step 4/9] Resource Allocation ............ ✓',
        '  [Step 5/9] Multi-region Routing ........... ✓',
        '  [Step 6/9] Security Policy Injection ...... ✓',
        '  [Step 7/9] Observability Config ........... ✓',
        '  [Step 8/9] Failover Verification .......... ✓',
        '  [Step 9/9] Final Validation ............... ✓',
        '',
        '✅ Deployment complete in 2.3s'
      ]
    },
    {
      prompt: 'sirvato',
      cmd: 'status --full',
      output: [
        '📊 SIRVATO OS System Status',
        '  ─────────────────────────────────────────',
        '  Uptime:          99.99% (last 30 days)',
        '  Active Regions:  3 (us-east-1, eu-west-1, ap-south-1)',
        '  Active Nodes:    247 compute | 89 storage',
        '  Requests/sec:    142,847',
        '  Avg Latency:     12ms p50 | 45ms p99',
        '  Error Rate:      0.001%',
        '  Security:        Zero-Trust ACTIVE',
        '  AI Decisions:    8,291 autonomous (last hour)',
        '  ─────────────────────────────────────────',
        '  All systems nominal ●'
      ]
    },
    {
      prompt: 'sirvato',
      cmd: 'micro-supra --mode=totality --activate',
      output: [
        '🌌 Activating MICRO SUPRA-TOTALITY++...',
        '  ✓ MICRO Core kernel loaded',
        '  ✓ SUPRA-OS layer initialized',
        '  ✓ HOLOFIELD 5-layer architecture active',
        '  ✓ OMNIMODE integration complete',
        '  ✓ AUTO-TRIGGER system armed',
        '',
        '💫 SUPRA-TOTALITY++ ACTIVE',
        '   All frameworks unified | All interfaces synchronized',
        '   Consciousness layer: ONLINE'
      ]
    }
  ];

  class Terminal {
    constructor(bodyEl) {
      this.body = bodyEl;
      this.seqIndex = 0;
      this.lines = [];
    }

    async type(text, className, speed = 30) {
      const line = document.createElement('div');
      line.className = className;
      this.body.appendChild(line);
      this.body.scrollTop = this.body.scrollHeight;
      for (const char of text) {
        line.textContent += char;
        await sleep(speed);
      }
    }

    async printLine(text, className = 'terminal-output', delay = 0) {
      if (delay) await sleep(delay);
      const line = document.createElement('div');
      line.className = className;
      line.textContent = text;
      this.body.appendChild(line);
      this.body.scrollTop = this.body.scrollHeight;
    }

    async runSequence(seq) {
      // Print prompt + command with typing effect
      const promptLine = document.createElement('div');
      promptLine.innerHTML = `<span class="terminal-prompt">${seq.prompt}@autopilot:~$ </span><span class="terminal-cmd"></span>`;
      this.body.appendChild(promptLine);
      const cmdEl = promptLine.querySelector('.terminal-cmd');
      for (const char of seq.cmd) {
        cmdEl.textContent += char;
        this.body.scrollTop = this.body.scrollHeight;
        await sleep(35 + Math.random() * 30);
      }
      await sleep(200);
      // Print output
      for (const out of seq.output) {
        await this.printLine(out, 'terminal-output', 60);
        this.body.scrollTop = this.body.scrollHeight;
      }
      await this.printLine('', 'terminal-output');
    }

    async run() {
      await sleep(500);
      for (const seq of DEMO_SEQUENCES) {
        await this.runSequence(seq);
        await sleep(800);
      }
      // Loop
      await sleep(3000);
      this.body.innerHTML = '';
      this.run();
    }
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function initDemo() {
    const body = document.getElementById('terminal-body');
    if (!body) return;
    const term = new Terminal(body);
    term.run();
  }

  document.addEventListener('DOMContentLoaded', initDemo);
})();
