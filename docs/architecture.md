---
title: Architettura
lang: it
description: "I tre layer architetturali di SIRVATO — Sistema Unico Operativo."
---

# Architettura SIRVATO

SIRVATO è costruito su tre layer distinti e coordinati. La separazione delle responsabilità garantisce che ogni layer possa evolvere, scalare e guastarsi in modo indipendente, mentre l'AI-Brain mantiene la coerenza globale.

## Layer 1 — AI-Brain Core

Il layer di controllo e decisione. È l'unico componente con visibilità completa sull'intero sistema.

L'AI-Brain Core riceve la telemetria da ogni Edge node, applica modelli ML per rilevare anomalie e opportunità di ottimizzazione, e genera azioni operative che vengono eseguite con priorità garantita. Non esistono configurazioni manuali da aggiornare: il sistema apprende e si adatta continuamente.

**Componenti chiave:**
- Decision Engine — valuta 10.000+ segnali al secondo
- Orchestrator — governa deploy, scaling e rollback
- Anomaly Detector — ML-based, soglie adattive
- Capacity Planner — previsione a 24h e 7 giorni

## Layer 2 — Edge Runtime

Il layer di esecuzione distribuita. Opera ai margini della rete per avvicinare il compute agli utenti.

Ogni nodo Edge è completamente autonomo: può prendere decisioni locali (es. rifiutare traffico anomalo, scrivere su cache locale) senza dover consultare il Core. La sincronizzazione con il Core avviene via Edge Sync Protocol con latenza < 50 ms.

**Region attive:**
- EU-West-1 (Francoforte) — primario Europa
- US-East-1 (Virginia) — primario Nord America
- AP-South-1 (Singapore) — primario Asia-Pacifico

## Layer 3 — Governance Framework

Il layer trasversale che si applica a tutti gli altri. Non esegue workload: definisce le regole con cui i workload vengono eseguiti.

Il Governance Framework espone un policy engine dichiarativo: i team definiscono i vincoli (quote, RBAC, SLA target, requisiti di compliance), e il sistema li applica automaticamente a ogni azione del Core e dell'Edge. Ogni violazione viene bloccata prima dell'esecuzione.

**Funzioni:**
- Policy enforcement in real-time
- Audit log immutabile e firmato
- Compliance continua (SOC 2, ISO 27001, GDPR)
- Secrets & certificate rotation automatica

---

I tre layer comunicano tramite un bus di eventi interno cifrato con mTLS. Nessun componente può bypassare il Governance Framework: è un invariante architetturale, non una convenzione.
