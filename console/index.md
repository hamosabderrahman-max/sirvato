---
title: Console
lang: it
description: "La Console AUTOPILOT di Sirvato — controlla l'intera infrastruttura AI-First in real-time."
---

# Console AUTOPILOT

La console centrale di controllo. Ogni metrica, ogni decisione e ogni azione del sistema sono visibili qui, in tempo reale.

## Pannello di Stato

| Componente | Regione | Stato | Latenza |
|---|---|---|---|
| AI-Brain Control Plane | Global | ✅ Operativo | 2 ms |
| Edge Runtime | EU-West-1 | ✅ Operativo | 4 ms |
| Edge Runtime | US-East-1 | ⚠ Performance Ridotta | 18 ms |
| Edge Runtime | AP-South-1 | ✅ Operativo | 6 ms |
| Storage & Replication | Multi-AZ | ✅ Operativo | — |
| Networking Mesh | Global | ✅ Operativo | — |

## Moduli Disponibili

### ⚡ AUTOPILOT Core
Il cuore del sistema. Gestisce orchestrazione, decision-making autonomo e recovery automatico. Nessuna configurazione richiesta — l'AI-Brain adatta il comportamento in base al carico osservato.

### 📊 Metriche in Tempo Reale
Dashboard live su CPU, RAM, throughput di rete e latenza end-to-end per ogni region. Aggiornamento automatico ogni 5 secondi. Visualizzazione storica fino a 90 giorni.

### 🔔 Alert Engine
Sistema di alerting autonomo che correla anomalie su più segnali prima di notificare. Zero false positives grazie al modello di baseline adattivo. Integrazione nativa con PagerDuty, Slack e webhook custom.

### 🔒 Zero-Trust Access
Ogni sessione operativa è autenticata e autorizzata con granularità per-risorsa. Accesso revocabile in tempo reale. Ogni azione è firmata e tracciata nell'Audit Log immutabile.

### 📋 Audit Log
Registro immutabile di ogni decisione autonoma, ogni cambio di configurazione e ogni evento di sistema. Esportabile in formato SIEM-compatible per compliance enterprise.

### 🛠 Deployment Manager
Gestione del ciclo di vita dei workload: deploy, rollback, canary release e blue/green switch — tutti eseguiti dall'AI-Brain senza downtime.

## Quick Actions

- **Scala manuale region** — Override temporaneo della capacità su una region specifica
- **Forza failover** — Trasferisci traffico a region di backup in un click
- **Snapshot stato** — Cattura lo stato completo del sistema per debug o audit
- **Riavvia componente** — Riavvio controllato di un singolo microservizio con drain automatico

---

*Console AUTOPILOT · Sirvato AI-First Cloud Provider · Tutti i log sono immutabili e audit-ready*
