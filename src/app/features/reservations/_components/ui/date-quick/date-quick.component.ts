// Componente riutilizzabile: "scroller rapido giorni" (oggi → +N)
// - Mostra header "Data" + riga "Oggi: ..."
// - Segment scrollable di 7/14/... giorni con etichette compatte
// - Espone (selectedChange) con YYYY-MM-DD
//
// Stile: standalone, import minimi, commenti espliciti.

import { Component, EventEmitter, Input, Output, signal, OnChanges, SimpleChanges } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import {
  IonItem, IonLabel, IonSegment, IonSegmentButton
} from '@ionic/angular/standalone';

@Component({
  standalone: true,
  selector: 'app-date-quick',
  templateUrl: './date-quick.component.html',
  imports: [NgFor, NgIf, IonItem, IonLabel, IonSegment, IonSegmentButton],
})
export class DateQuickComponent implements OnChanges {
  /** Titolo sezione (default "Data") */
  @Input() title: string = 'Data';
  /** Mostra riga "Oggi: ..." (default true) */
  @Input() showTodayLine: boolean = true;
  /** Numero di giorni da mostrare (default 7: oggi → +6) */
  @Input() days: number = 7;
  /** Giorno selezionato in formato YYYY-MM-DD (controllato dal parent) */
  @Input() selected: string | null = null;

  /** Emesso quando l’utente sceglie un giorno (YYYY-MM-DD) */
  @Output() selectedChange = new EventEmitter<string>();

  // Lista giorni visualizzati
  daysList = signal<{ iso: string; weekday: string; day: string; month: string }[]>([]);

  ngOnChanges(ch: SimpleChanges): void {
    if (ch['days']) this.daysList.set(buildNextDays(this.days));
  }

  // Label "Oggi: ..."
  todayLabel(): string {
    return new Intl.DateTimeFormat('it-IT', {
      weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric'
    }).format(new Date());
  }

  onChange(ev: CustomEvent) {
    const val = (ev.detail as any).value as string;
    if (val) this.selectedChange.emit(val);
  }
}

// ============ Helpers locali ============

function pad(n: number) { return String(n).padStart(2, '0'); }

/** Costruisce N giorni a partire da oggi (incluso) */
function buildNextDays(n: number) {
  const out: { iso: string; weekday: string; day: string; month: string }[] = [];
  const fmtWeek = new Intl.DateTimeFormat('it-IT', { weekday: 'short' });
  const fmtDay  = new Intl.DateTimeFormat('it-IT', { day: '2-digit' });
  const fmtMon  = new Intl.DateTimeFormat('it-IT', { month: '2-digit' });
  const fmtIso  = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  for (let i = 0; i < n; i++) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + i);
    out.push({
      iso: fmtIso(d),
      weekday: fmtWeek.format(d),
      day: fmtDay.format(d),
      month: fmtMon.format(d),
    });
  }
  return out;
}
