---
title: Design System
lang: it
description: "Design System di SIRVATO — principi visivi e architetturali del Sistema Unico Operativo."
---

# Design System SIRVATO

Il design system di SIRVATO riflette i principi architetturali del sistema: chiarezza, autonomia, controllo.

## Principi visivi

**Dark-first:** il sistema opera H24 in ambienti ad alto contrasto. Il tema scuro riduce l'affaticamento visivo e mette in evidenza i segnali critici (alert, anomalie, stati degradati).

**Gerarchia cromatica:** ogni colore ha un significato preciso e non viene usato a scopo decorativo.
- Viola (`#6a00ff`) — azioni primarie, accento del brand, elementi interattivi
- Ciano (`#00e0ff`) — link, titoli di sezione, valori di sistema
- Verde (`#00e5a0`) — stato operativo, successo, health check positivo
- Giallo (`#ffc72c`) — warning, performance ridotta, attenzione richiesta
- Rosso (`#ff4d6a`) — errore, downtime, azione bloccata

**Tipografia:** `system-ui` — nessuna dipendenza da font esterni. Il testo del sistema deve essere leggibile senza latenza di caricamento.

## Principi architetturali

### AI-First
L'intelligenza artificiale non è un layer opzionale aggiunto sopra un sistema tradizionale. È integrata al centro del control plane: ogni decisione operativa passa per il Decision Engine.

### Zero-Trust
Nessuna fiducia implicita tra componenti. Ogni comunicazione è autenticata e cifrata. Il perimetro non esiste: la sicurezza è applicata a ogni layer.

### Autonomia con Governance
Il sistema è autonomo, ma ogni azione è vincolata dal Governance Framework. Autonomia non significa assenza di controllo: significa che il controllo è applicato dal sistema stesso, in modo sistematico e verificabile.

### Reversibilità
Nessuna azione permanente senza consenso esplicito. Ogni modifica può essere annullata. Questa garanzia è architettata nel sistema, non affidata alla disciplina degli operator.

---

*Design System SIRVATO v2.0 · Sistema Unico Operativo*
