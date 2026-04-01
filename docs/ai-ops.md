---
title: AI-Ops
lang: it
description: "SIRVATO AI-Ops — intelligenza operativa autonoma: anomaly detection, self-healing e predictive analytics."
---

# AI-Ops — Intelligenza Operativa

AI-Ops è il modulo di SIRVATO responsabile della trasformazione dei dati osservativi in azioni operative. Non è un dashboard: è un sistema attivo che rileva, decide e agisce senza attendere input umani.

## Anomaly Detection

Il modello di anomaly detection di SIRVATO non usa soglie fisse. Usa una baseline dinamica per ogni segnale, calcolata su finestre temporali mobili e corretta per stagionalità (ora del giorno, giorno della settimana, eventi ricorrenti).

**Come funziona:**
1. Ogni metrica osservata viene confrontata con la distribuzione statistica attesa (media ± deviazioni standard adattive)
2. Le anomalie vengono correlate tra loro: un singolo spike di CPU non genera un alert; una combinazione di CPU alta + latenza crescente + error rate anomalo sì
3. Il segnale composito viene valutato dal Decision Engine che assegna un severity score
4. Azioni correttive vengono generate solo se il severity supera la soglia configurata dalla policy

**Risultato:** zero false positives da segnali isolati. Alert significativi che richiedono attenzione reale.

## Self-Healing

Il modulo di self-healing esegue automaticamente le azioni correttive più comuni senza interazione umana.

**Azioni autonome standard:**
- Riavvio di un container che non risponde al health check (con drain automatico prima del riavvio)
- Sostituzione di un nodo con hardware degradato (volume sostituito, workload migrato, nodo rimosso)
- Ribilanciamento del traffico verso region con capacità disponibile
- Svuotamento della coda di messaggi in backlog con scale-out temporaneo dei consumer
- Blocco automatico di un IP o CIDR che mostra pattern di abuso (con sblocco automatico dopo il timeout)

Ogni azione self-healing è registrata nell'Audit Log con trigger, azione, esito e confidence score. Gli operator possono configurare quali azioni sono delegate al sistema e quali richiedono approvazione.

## Predictive Analytics

Il modulo predittivo analizza le serie storiche per anticipare problemi prima che si manifestino.

**Previsioni attive:**
- **Saturazione risorse**: "Il disco di /var/log raggiungerà il 95% in 4 ore se il pattern attuale continua" → compattazione anticipata o alert
- **Degrado delle performance**: "La latenza p99 dell'API /checkout tende ad aumentare il venerdì tra le 18:00 e le 22:00" → pre-scaling proattivo
- **Scadenza certificati**: avviso 30 giorni prima con rotazione automatica pianificata
- **Drift di configurazione**: "Questo nodo Edge ha parametri che divergono dal template baseline del 12%" → sync automatico o flag per revisione

## Observability Integration

SIRVATO raccoglie e correla tre tipi di segnali: metriche, log ed eventi di traccia.

**Metriche:** collezionate ogni 5 secondi da ogni componente. Retention: 90 giorni a granularità piena, 1 anno downsampled.

**Log:** strutturati (JSON), con indice full-text per query ad-hoc. Retention: 30 giorni hot, 1 anno cold (compresso).

**Trace:** distributed tracing end-to-end su ogni richiesta. Sampling adattivo: 100% per le richieste con errore, 1% per il traffico normale. Retention: 7 giorni.

Tutti e tre i tipi sono correlati automaticamente: da un alert è possibile navigare direttamente ai log e alle trace delle richieste coinvolte nell'intervallo di tempo dell'anomalia.

---

*AI-Ops · SIRVATO Sistema Unico Operativo · Da segnale a azione, in autonomia*
