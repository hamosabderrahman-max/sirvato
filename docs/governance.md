---
title: Governance
lang: it
description: "Governance, audit log immutabile e compliance di SIRVATO — Sistema Unico Operativo."
---

# Governance — Audit, Compliance e Reversibilità

Il Governance Framework è il layer trasversale di SIRVATO. Non esegue workload: definisce e applica le regole con cui ogni altro componente opera. È un invariante architetturale — nessuna azione del Core o dell'Edge può bypassarlo.

## Audit Log Immutabile

Ogni decisione autonoma del sistema viene registrata in un audit log immutabile prima di essere eseguita.

**Struttura di ogni entry:**
- `timestamp` — epoch in nanosecondi (UTC)
- `component` — componente che ha generato l'azione (es. `AI-Brain/DecisionEngine`)
- `trigger` — segnale o combinazione di segnali che ha avviato la decisione
- `action` — azione eseguita con parametri completi
- `outcome` — esito verificato (successo, fallimento, parziale)
- `confidence` — score di confidenza del Decision Engine (0–1)
- `signature` — firma crittografica HMAC-SHA256 dell'entry

Le entry non possono essere modificate o cancellate. Il log è replicato in tre copie indipendenti. È esportabile in formato SIEM-compatible (CEF, LEEF, JSON) per integrazione con strumenti di compliance esterni.

## Policy Engine

Il Policy Engine applica vincoli dichiarativi a ogni azione del sistema.

I team definiscono le policy in formato YAML-based. Esempi:

- **Quote**: "Il workload X non può occupare più di 40% della capacità della region EU-West-1"
- **RBAC**: "Solo i membri del team Ops possono emettere override temporanei sulla region US-East-1"
- **SLA**: "La latenza p99 del servizio API non deve superare 50 ms per più di 30 secondi"
- **Data residency**: "I dati degli utenti con flag `eu_resident=true` non possono lasciare EU-West-1"

Ogni policy è versionata, testabile in ambiente sandbox prima del deploy, e il suo impatto storico è tracciato nell'Audit Log.

## Compliance Continua

SIRVATO monitora la conformità normativa in modo continuo, non periodico.

**Standard supportati:**
- **SOC 2 Type II** — logging, accessi e availability
- **ISO 27001** — information security management
- **GDPR** — data residency, right-to-erasure, data processing records
- **PCI-DSS** — per workload che gestiscono dati di pagamento (opzionale)

Il Compliance Monitor genera automaticamente i report di evidenza richiesti per audit esterni. Gli auditor possono richiedere un export firmato del log per qualsiasi intervallo di tempo.

## Reversibilità

Ogni azione del sistema può essere invertita.

- **Rollback workload**: ritorno alla versione precedente in < 30 secondi
- **Undo scaling**: riduzione della capacità con drain automatico
- **Policy revert**: ripristino della versione precedente di una policy con effetto immediato
- **Snapshot restore**: ripristino dello stato di un componente a qualsiasi punto nel tempo (limitato alla retention configurata)

La reversibilità non è una feature opzionale: è un requisito architetturale di SIRVATO. Il sistema non esegue azioni irreversibili senza una conferma esplicita registrata nell'Audit Log.

## Secrets & Certificate Management

Rotazione automatica di tutte le credenziali del sistema.

- Certificati TLS: rotazione ogni 24 ore su tutti gli Edge node
- API key interne: rotazione ogni 7 giorni
- Credenziali di accesso ai datastore: rotazione ogni 30 giorni
- Ogni rotazione è registrata nel Audit Log con hash del vecchio e del nuovo segreto (mai il valore in chiaro)

---

*Governance Framework · SIRVATO Sistema Unico Operativo · Ogni azione è auditabile, reversibile e conforme*
