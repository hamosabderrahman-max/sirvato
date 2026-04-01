---
title: Core Control Plane
lang: it
description: "AI-Brain Core Control Plane di SIRVATO — orchestrazione autonoma e AUTOPILOT mode."
---

# Core Control Plane — AI-Brain

Il cuore del Sistema Unico Operativo. L'AI-Brain Core è il componente che rende SIRVATO autonomo: ogni decisione operativa passa da qui, viene valutata in tempo reale e viene eseguita senza attesa di input umani.

## AUTOPILOT Mode

AUTOPILOT è la modalità operativa standard di SIRVATO. In questa modalità:

- Il sistema monitora continuamente ogni metrica disponibile (latenza, error rate, throughput, CPU, memoria, disk I/O)
- Il Decision Engine valuta lo stato globale ogni 100 ms e genera azioni correttive quando necessario
- Le azioni vengono eseguite direttamente — senza approvazioni, senza ticket, senza ritardi
- Ogni azione è registrata nell'Audit Log immutabile con contesto completo (trigger, dati osservati, azione eseguita, esito)

**Non esiste una modalità manuale permanente.** Gli operator possono emettere override temporanei dalla Console, ma ogni override scade automaticamente e il sistema ritorna in AUTOPILOT.

## Decision Engine

Il motore decisionale centrale. Opera su un grafo di regole appreso dai pattern operativi storici e aggiornato continuamente.

- Valuta 10.000+ segnali al secondo per region
- Priorità basata su impatto stimato sull'SLA
- Rollback automatico se l'azione genera effetti indesiderati entro 60 secondi
- Ogni decisione include un confidence score: le decisioni a bassa confidenza vengono registrate per revisione

## Orchestrator

Gestisce il ciclo di vita di ogni workload nel sistema.

- **Deploy**: rolling deploy con health check automatico a ogni step
- **Scaling**: orizzontale (nuovi pod/nodi) o verticale (resize) in base al tipo di workload
- **Drain & Replace**: sostituzione trasparente di nodi degradati senza impatto sugli utenti
- **Rollback**: ritorno alla versione precedente in < 30 secondi se il deploy fallisce

## Anomaly Detector

Modello ML che analizza la telemetria in tempo reale per identificare deviazioni dai pattern normali.

Non usa soglie fisse: la baseline viene calcolata dinamicamente per ogni componente, ora del giorno e giorno della settimana. Un picco di CPU alle 3:00 UTC è trattato diversamente dallo stesso picco alle 14:00 UTC.

**Tipi di anomalie rilevate:**
- Latency spike (p99 > baseline × 2.5)
- Error rate anomaly (tasso di errori fuori dalla banda attesa)
- Resource saturation (CPU/RAM/disk I/O tendenza a saturazione in < 10 min)
- Traffic pattern deviation (cambio improvviso di distribuzione geografica o per-endpoint)

## Capacity Planner

Previsione del fabbisogno di risorse basata su serie storiche e modelli predittivi.

- Orizzonte a breve termine (24h): usato per pre-scaling proattivo
- Orizzonte a medio termine (7 giorni): usato per pianificazione dei costi
- Integrato con il costo per-region in tempo reale: scala verso la region più economica se la latenza è equivalente

---

*AI-Brain Core · SIRVATO Sistema Unico Operativo · Ogni decisione è tracciata, auditabile e reversibile*
