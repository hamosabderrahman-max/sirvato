---
title: Service Map
lang: it
description: "Mappa completa dei servizi e dell'architettura SIRVATO — Sistema Unico Operativo."
---

# Service Map

Mappa completa dei layer e microservizi che compongono il Sistema Unico Operativo SIRVATO. Ogni componente è autonomo, orchestrato dall'AI-Brain e collegato al Governance Framework.

## AI-Brain Control Plane

Il cervello centrale del sistema. Coordina ogni decisione operativa in tempo reale.

- **Decision Engine** — Valuta continuamente lo stato globale del sistema e genera azioni correttive ottimali
- **Orchestrator** — Gestisce il ciclo di vita dei workload: deploy, scaling, draining e rollback
- **Anomaly Detector** — Modello ML che correla segnali di telemetria per identificare deviazioni prima dell'impatto
- **Capacity Planner** — Previsione autonoma del fabbisogno di risorse su orizzonte 24h / 7 giorni

## Edge Runtime

Compute distribuito autonomo. Elabora i dati vicino alla sorgente, riduce la latenza e aumenta la resilienza.

- **EU-West-1** (Francoforte) — Nodo primario per traffico europeo
- **US-East-1** (Virginia) — Nodo primario per traffico nordamericano
- **AP-South-1** (Singapore) — Nodo primario per traffico Asia-Pacifico
- **Edge Sync Protocol** — Sincronizzazione bidirezionale < 50 ms tra ogni nodo e il Core

## Networking & Mesh

Infrastruttura di rete zero-trust che collega ogni componente.

- **Service Mesh** — Comunicazione cifrata mTLS tra ogni microservizio
- **Global Load Balancer** — Distribuisce il traffico in base a latenza, capacità e health check real-time
- **CDN Layer** — Caching al bordo per asset statici e API ad alta frequenza
- **DDoS Mitigation** — Filtro autonomo del traffico anomalo prima che raggiunga l'infrastruttura applicativa

## Storage & Replication

Persistenza dei dati con consistenza forte e recovery istantaneo.

- **Object Store** — Storage distribuito multi-region con replica sincrona tra AZ
- **Block Store** — Volumi ad alta performance per workload stateful
- **Snapshot Engine** — Snapshot incrementali automatici ogni 15 minuti; retention configurabile
- **Geo-Replication** — Replica asincrona verso region secondaria per disaster recovery cross-region

## Governance Framework

Layer trasversale di policy, audit e compliance. Opera su tutti gli altri componenti.

- **Audit Log** — Registro immutabile e firmato di ogni azione autonoma del sistema
- **Policy Engine** — Applica i vincoli operativi definiti (RBAC, quote, SLA) a ogni componente
- **Compliance Monitor** — Verifica continua della conformità a SOC 2, ISO 27001 e GDPR
- **Secrets Manager** — Rotazione automatica di credenziali, certificati e chiavi crittografiche

---

*Architettura SIRVATO v2.0 · Sistema Unico Operativo · Ogni componente è governato, auditabile e reversibile*
