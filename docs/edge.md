---
title: Edge Runtime
lang: it
description: "Edge Runtime distribuito di SIRVATO — compute autonomo multi-region."
---

# Edge Runtime — Compute Distribuito Autonomo

L'Edge Runtime è il layer di esecuzione di SIRVATO. Ogni nodo Edge è un'istanza autonoma del sistema: può ricevere traffico, eseguire workload, reagire a eventi locali e sincronizzarsi con il Core — il tutto senza un punto centrale di fallimento.

## Principio di Autonomia Locale

Ogni nodo Edge è progettato per sopravvivere all'isolamento. Se la connessione con il Core si interrompe, il nodo:

1. Continua a servire il traffico in base alle policy locali memorizzate
2. Bufferizza gli eventi in un log locale (max 15 min)
3. Al ripristino, sincronizza automaticamente il proprio stato con il Core
4. Notifica il Decision Engine dell'intervallo di operazione autonoma per revisione

Questo garantisce che un'interruzione di rete tra region non si traduca mai in downtime per gli utenti finali.

## Region Attive

### EU-West-1 — Francoforte
Nodo primario per il traffico europeo. Conforme a GDPR e normative di residenza dati europee. Tutti i dati degli utenti EU non lasciano questa region senza consenso esplicito.

### US-East-1 — Virginia
Nodo primario per il traffico nordamericano. Certificato SOC 2 Type II. Replicato in US-West-2 (Oregon) per disaster recovery.

### AP-South-1 — Singapore
Nodo primario per il traffico Asia-Pacifico. Bassa latenza verso i mercati di India, Sud-Est Asiatico e Australia orientale.

## Edge Sync Protocol

Protocollo interno per la sincronizzazione bidirezionale tra Edge node e AI-Brain Core.

- **Latenza di sync:** < 50 ms in condizioni normali
- **Frequenza:** heartbeat ogni 1 secondo; sync completo ogni 30 secondi
- **Formato:** eventi compatti con checksum; deduplicazione automatica
- **Sicurezza:** mTLS con certificati ruotati automaticamente ogni 24 ore

## Zero-Trust al Layer Edge

Ogni connessione in ingresso agli Edge node è trattata come non fidata per default.

- Verifica dell'identità per ogni richiesta (JWT + mTLS per servizi, OAuth2 per utenti)
- Rate limiting adattivo per IP e per account: le soglie si adattano ai pattern storici
- WAF integrato: blocco automatico di SQL injection, XSS e pattern di exploit noti
- DDoS mitigation: assorbimento al layer Edge prima che il traffico raggiunga i workload

## Aggiornamento dei Nodi

Gli Edge node vengono aggiornati in rolling senza downtime.

Il Orchestrator del Core coordina l'aggiornamento region per region: drain del traffico verso altri nodi, aggiornamento, verifica health check, ripristino del traffico. L'intero processo è trasparente per gli utenti finali.

---

*Edge Runtime · SIRVATO Sistema Unico Operativo · Autonomia locale, coerenza globale*
