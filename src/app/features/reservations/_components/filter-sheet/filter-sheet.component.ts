// Bottom sheet per filtri: preset (oggi/7d/tutte/custom), stato, range custom.
// Standalone, aperto con ModalController. Ritorna {preset,status,from,to}.
//
// NOTE UX:
// - Footer fisso in basso (ion-footer) → i pulsanti "Applica/Pulisci" restano
//   SEMPRE visibili anche quando il calendario occupa spazio in verticale.
// - Nessuna logica "complessa" nel template: gli handler TS gestiscono i valori
//   di ion-datetime (che possono essere string|string[]|null).

import { Component, Input, OnInit, inject, signal, WritableSignal } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
  IonContent, IonItem, IonLabel, IonSelect, IonSelectOption,
  IonList, IonDatetime, IonFooter
} from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular';
import { ReservationStatus } from '../../../../core/reservations/reservations.service';

export type FilterPreset = 'today'|'7d'|'all'|'custom';
export interface FilterSheetResult {
  preset: FilterPreset;
  status: ReservationStatus|'all';
  from?: string;
  to?: string;
}

@Component({
  standalone: true,
  selector: 'app-filter-sheet',
  template: `
<ion-header>
  <ion-toolbar>
    <ion-title>Filtri</ion-title>
    <ion-buttons slot="end">
      <ion-button (click)="dismissClear()" fill="clear">Pulisci</ion-button>
      <ion-button (click)="dismissCancel()" fill="clear">Chiudi</ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-content>
  <ion-list inset="true" style="margin-top:8px;">
    <ion-item>
      <ion-label position="stacked">Periodo</ion-label>
      <ion-select [value]="presetSig()" (ionChange)="onPreset($event)" interface="popover">
        <ion-select-option value="today">Oggi</ion-select-option>
        <ion-select-option value="7d">Ultimi 7 giorni</ion-select-option>
        <ion-select-option value="all">Tutte</ion-select-option>
        <ion-select-option value="custom">Intervallo…</ion-select-option>
      </ion-select>
    </ion-item>

    <div *ngIf="presetSig()==='custom'">
      <ion-item style="margin-top:8px;">
        <ion-label position="stacked">Dal</ion-label>
        <ion-datetime
          presentation="date"
          [value]="fromSig() || ''"
          (ionChange)="onFromChange($event)">
        </ion-datetime>
      </ion-item>

      <ion-item style="margin-top:8px;">
        <ion-label position="stacked">Al</ion-label>
        <ion-datetime
          presentation="date"
          [value]="toSig() || ''"
          (ionChange)="onToChange($event)">
        </ion-datetime>
      </ion-item>
    </div>

    <ion-item style="margin-top:12px;">
      <ion-label position="stacked">Stato</ion-label>
      <ion-select
        [value]="statusSig()"
        (ionChange)="statusSig.set($event.detail.value)"
        interface="popover">
        <ion-select-option value="all">Tutti</ion-select-option>
        <ion-select-option value="pending">In attesa</ion-select-option>
        <ion-select-option value="accepted">Accettate</ion-select-option>
        <ion-select-option value="rejected">Rifiutate</ion-select-option>
        <ion-select-option value="cancelled">Cancellate</ion-select-option>
      </ion-select>
    </ion-item>
  </ion-list>
</ion-content>

<!-- Footer STICKY: i bottoni sono sempre accessibili su mobile -->
<ion-footer class="ion-padding">
  <div style="display:flex; gap:8px; justify-content:flex-end;">
    <ion-button fill="outline" (click)="dismissClear()">Pulisci</ion-button>
    <ion-button (click)="apply()">Applica</ion-button>
  </div>
</ion-footer>
  `,
  imports: [
    NgIf,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
    IonContent, IonItem, IonLabel, IonSelect, IonSelectOption,
    IonList, IonDatetime, IonFooter
  ]
})
export class FilterSheetComponent implements OnInit {
  private modal = inject(ModalController);

  // Input iniziali dal chiamante
  @Input() preset: FilterPreset = 'today';
  @Input() status: ReservationStatus|'all' = 'all';
  @Input() from?: string | null;
  @Input() to?: string | null;

  // State (signals) — nomi diversi dagli @Input
  presetSig: WritableSignal<FilterPreset> = signal<FilterPreset>('today');
  statusSig: WritableSignal<ReservationStatus|'all'> = signal<ReservationStatus|'all'>('all');
  fromSig:   WritableSignal<string | undefined> = signal<string|undefined>(undefined);
  toSig:     WritableSignal<string | undefined> = signal<string|undefined>(undefined);

  ngOnInit() {
    this.presetSig.set(this.preset ?? 'today');
    this.statusSig.set(this.status ?? 'all');
    this.fromSig.set(this.from || undefined);
    this.toSig.set(this.to || undefined);
  }

  onPreset(ev: any) {
    const v = (ev?.detail?.value as FilterPreset) ?? 'today';
    this.presetSig.set(v);
    if (v !== 'custom') { this.fromSig.set(undefined); this.toSig.set(undefined); }
  }

  // Normalizza valore da ion-datetime (string|string[]|null) → 'YYYY-MM-DD' | undefined
  private extractYmd(val: unknown): string | undefined {
    const raw = Array.isArray(val) ? (val[0] ?? null) : (val as string | null);
    const s = (raw ?? '').toString();
    const ymd = s.slice(0, 10);
    return ymd || undefined;
  }

  onFromChange(ev: any) { this.fromSig.set(this.extractYmd(ev?.detail?.value)); }
  onToChange(ev: any)   { this.toSig.set(this.extractYmd(ev?.detail?.value)); }

  dismissCancel() { this.modal.dismiss(undefined, 'cancel'); }
  dismissClear()  { this.modal.dismiss(undefined, 'clear'); }

  apply() {
    const res: FilterSheetResult = {
      preset: this.presetSig(),
      status: this.statusSig(),
      from: this.presetSig()==='custom' ? (this.fromSig() || undefined) : undefined,
      to:   this.presetSig()==='custom' ? (this.toSig()   || undefined) : undefined,
    };
    this.modal.dismiss(res, 'apply');
  }
}
