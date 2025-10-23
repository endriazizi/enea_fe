// src/app/shared/date.util.ts
//
// 🕒 Utilità piccole ma solide per gestire date/ore tra FE e BE.
// Policy che stiamo seguendo:
// - DB/sessione in UTC (MySQL DATETIME salvato come tempo UTC).
// - FE mostra in locale (es. Europe/Rome) e quando invia al BE converte in UTC.
// - I campi dei form usano <input type="datetime-local"> → stringhe "YYYY-MM-DDTHH:mm" (locale).
//
// In questo file trovi:
// - fmtDate / todayISO / startOfDayISO / addDays  → helper “giornalieri” (già usati).
// - toLocalDateTimeInputValue(Date|string)        → converte un istante in valore per <input datetime-local> (locale).
// - toUTCFromLocalDateTimeInput("YYYY-MM-DDTHH:mm") → converte l’input locale in stringa UTC "YYYY-MM-DD HH:mm:ss" (per MySQL).
//
// Nota parsing stringhe di origine BE:
// - Se arriva "YYYY-MM-DD HH:mm:ss" (senza 'T' / 'Z'), la interpretiamo come UTC (perché dal DB).
// - Se arriva ISO con 'Z' è già UTC, ok.
// - Qualsiasi altro formato con 'T' ma senza 'Z' verrà considerato dal costruttore Date come locale (comportamento standard JS).
//

/* ------------------------------- Helper base ------------------------------- */

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

/** Ritorna "YYYY-MM-DD" in **locale** (comodo per filtri, ecc.) */
export function fmtDate(d: Date) {
  const y = d.getFullYear();
  const m = pad2(d.getMonth() + 1);
  const day = pad2(d.getDate());
  return `${y}-${m}-${day}`;
}

/** Oggi in "YYYY-MM-DD" (locale) */
export function todayISO() {
  return fmtDate(new Date());
}

/** Inizio giorno in "YYYY-MM-DD" (locale) — utile per preset OGGI */
export function startOfDayISO(d = new Date()) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return fmtDate(x);
}

/** Aggiunge N giorni ad una data e ritorna un nuovo Date */
export function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

/* --------------------------- Conversioni Local/UTC -------------------------- */

/**
 * Converte un istante (Date o stringa) nel valore richiesto da
 * <input type="datetime-local">, cioè "YYYY-MM-DDTHH:mm" **in fuso locale**.
 *
 * Esempi:
 *  - toLocalDateTimeInputValue(new Date()) → "2025-10-12T14:30"
 *  - toLocalDateTimeInputValue("2025-10-11 19:30:00") → "2025-10-11T21:30" (se locale = UTC+2)
 *    ↑ stringa senza 'T' e 'Z' è trattata come UTC (perché proviene dal DB)
 */
export function toLocalDateTimeInputValue(dateLike?: Date | string | null): string {
  const d = normalizeToDate(dateLike);

  // Estraggo i componenti in **locale** per popolare il controllo HTML
  const y = d.getFullYear();
  const m = pad2(d.getMonth() + 1);
  const day = pad2(d.getDate());
  const hh = pad2(d.getHours());
  const mm = pad2(d.getMinutes());

  return `${y}-${m}-${day}T${hh}:${mm}`;
}

/**
 * Converte il valore di un <input type="datetime-local"> (es. "2025-10-12T20:15")
 * in una stringa UTC **per MySQL DATETIME**: "YYYY-MM-DD HH:mm:ss".
 *
 * Flusso:
 *  - Prende la stringa locale e costruisce un Date **locale**.
 *  - Converte quel momento in UTC e formatta "YYYY-MM-DD HH:mm:ss".
 *
 * Esempio (locale = Europe/Rome, UTC+2):
 *  - Input:  "2025-10-12T20:15"
 *  - UTC:    "2025-10-12 18:15:00"  ← pronto per salvarlo in DATETIME (UTC).
 */
export function toUTCFromLocalDateTimeInput(value: string): string {
  if (!value) throw new Error('datetime-local value mancante');

  // value è "YYYY-MM-DDTHH:mm" (locale)
  const [datePart, timePart] = value.split('T');
  if (!datePart || !timePart) throw new Error('Formato datetime-local non valido');

  const [y, m, d] = datePart.split('-').map((s) => parseInt(s, 10));
  const [hh, mm] = timePart.split(':').map((s) => parseInt(s, 10));

  // Costruisco una data **locale**
  const local = new Date(y, (m || 1) - 1, d || 1, hh || 0, mm || 0, 0, 0);

  // Estraggo i componenti **UTC** per generare stringa MySQL-friendly
  const uy = local.getUTCFullYear();
  const um = pad2(local.getUTCMonth() + 1);
  const ud = pad2(local.getUTCDate());
  const uh = pad2(local.getUTCHours());
  const umin = pad2(local.getUTCMinutes());
  const us = pad2(local.getUTCSeconds());

  return `${uy}-${um}-${ud} ${uh}:${umin}:${us}`;
}

/* --------------------------------- Interni -------------------------------- */

/**
 * Normalizza in Date:
 * - Date → ritorna clone
 * - stringa:
 *    * "YYYY-MM-DD HH:mm:ss"   → trattata come UTC (tipica dal DB), aggiungo 'Z'
 *    * ISO con 'Z'             → è già UTC, ok
 *    * altro con 'T' senza 'Z' → lasciamo al costruttore (locale)
 * - null/undefined → uso new Date()
 */
function normalizeToDate(input?: Date | string | null): Date {
  if (!input) return new Date();

  if (input instanceof Date) {
    return new Date(input.getTime()); // clone
  }

  const s = String(input).trim();

  // Caso classico dal DB: "YYYY-MM-DD HH:mm:ss" (senza T/Z) → interpreta come UTC
  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(s)) {
    return new Date(s.replace(' ', 'T') + 'Z');
  }

  // ISO con Z → già UTC
  if (s.endsWith('Z')) {
    return new Date(s);
  }

  // Altri casi (con 'T' ma senza 'Z') → il costruttore li interpreta in locale
  return new Date(s);
}

/* ------------------------------- Esempi d'uso ------------------------------
 *
 * // In una pagina "Nuova prenotazione":
 * form.patchValue({
 *   // Mostra di default il prossimo quarto d'ora nel controllo datetime-local
 *   start_at_local: toLocalDateTimeInputValue(new Date())
 * });
 *
 * // In submit:
 * const startUtc = toUTCFromLocalDateTimeInput(this.form.value.start_at_local!);
 * // → invia al BE come start_at (UTC, "YYYY-MM-DD HH:mm:ss")
 *
 * -------------------------------------------------------------------------- */
