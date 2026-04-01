<!--
SUPRA-OS
D: Documentare il framework di integrazione SUPRA-OS per Sirvato
F: docs/supra-os.md
P: STEADY
S(ICDF):
  I: Produrre guida operativa completa con template e regole
  C: Non duplicare ciò che esiste — integrarsi sopra
  D: Punti di integrazione: decisione, codice, verifica
  F: Documento leggibile, template pronti all'uso
-->

# SUPRA-OS — Guida Operativa per Sirvato

SUPRA-OS **non si sostituisce** a ciò che già esiste.
Si innesta come strato decisionale sopra i processi attuali.

L'integrazione avviene in **3 punti**:

1. **Dove decidi** — issue, task, backlog
2. **Dove scrivi** — codice, doc, commenti
3. **Dove verifichi** — PR, output, release

---

## 1. Punto di Decisione — Directive Template

Ogni nuova attività nasce come **Directive**, non come lista di task.

```
D — DIRECTIVE
→ Cosa deve accadere (una frase)

F — FIELD
→ Dove avviene (repo, modulo, processo)

P — PULSE
→ FAST | STEADY | DEEP

M — MANIFEST
→ Come capisco che è finito
```

**Livelli PULSE:**

| Livello | Significato |
|---------|-------------|
| `FAST`  | Azione rapida, impatto limitato, reversibile |
| `STEADY`| Lavoro strutturato, iterazioni pianificate |
| `DEEP`  | Cambiamento architetturale, analisi approfondita |

**Effetto:**
- Riduce ambiguità all'origine
- Allinea persone e strumenti prima dell'esecuzione
- SUPRA-OS diventa il filtro di ingresso del lavoro

---

## 2. Punto di Scrittura — Blocco SUPRA-OS nei File

Ogni nuovo file o modulo inizia con un blocco SUPRA-OS.

### Formato Markdown / Documentazione

```markdown
<!--
SUPRA-OS
D: <cosa deve accadere>
F: <percorso file>
P: FAST | STEADY | DEEP
S(ICDF):
  I: <cosa implementare>
  C: <vincoli>
  D: <dati / input>
  F: <risultato atteso>
-->
```

### Formato TypeScript / JavaScript

```typescript
/**
 * SUPRA-OS
 * D: <cosa deve accadere>
 * F: <percorso file>
 * P: FAST | STEADY | DEEP
 * S(ICDF):
 *   I: <cosa implementare>
 *   C: <vincoli>
 *   D: <dati / input>
 *   F: <risultato atteso>
 */
```

### Schema S(ICDF)

| Chiave | Significato |
|--------|-------------|
| `I`    | Implement — cosa fare |
| `C`    | Constraints — cosa non fare / limiti |
| `D`    | Data — input, strutture dati |
| `F`    | Flow/Return — output o risultato atteso |

---

## 3. Punto di Verifica — PR e Release

Ogni PR e release include una sezione SUPRA-OS di verifica.

```
SUPRA-OS VERIFY
→ Directive soddisfatta: SÌ / NO
→ Manifest check: <descrizione verifica>
→ Effetti collaterali: <nessuno / lista>
→ Reversibile: SÌ / NO
```

---

## Integrazione con l'Architettura Sirvato

SUPRA-OS si allinea ai principi esistenti di Sirvato:

- **AUTOPILOT** — Le Directive guidano le decisioni autonome del sistema
- **Zero-Trust** — Ogni cambiamento è tracciato, verificato, reversibile
- **Immutable Logging** — Le Directive diventano parte dell'audit trail
- **AI-Brain** — SUPRA-OS alimenta il layer decisionale del Control Plane

---

## Template Pronti

- Issue / Task → [`.github/ISSUE_TEMPLATE/directive.md`](../.github/ISSUE_TEMPLATE/directive.md)
- Pull Request → [`.github/pull_request_template.md`](../.github/pull_request_template.md)
