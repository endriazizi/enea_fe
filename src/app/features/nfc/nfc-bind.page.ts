// src/app/features/nfc/nfc-bind.page.ts
// ============================================================================
// NfcBindPage — Admin: genera/rigenera il token per un tavolo, copia l'URL
// pubblico e mostra l'eventuale QR (se fornito dal BE).
// Stile: Ionic standalone + Signals, commenti lunghi, log con emoji.
// ============================================================================

import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonButton, IonItem, IonLabel, IonSelect, IonSelectOption, IonTextarea, IonNote, IonIcon
} from '@ionic/angular/standalone';
import { ToastController } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { NfcApi, NfcRoom, NfcTable } from './nfc.api';

@Component({
  standalone: true,
  selector: 'app-nfc-bind',
  templateUrl: './nfc-bind.page.html',
  styleUrls: ['./nfc-bind.page.scss'],
  imports: [
    // Angular
    CommonModule, NgIf, NgFor, RouterLink,
    // Ionic
    IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonButton, IonItem, IonLabel, IonSelect, IonSelectOption, IonTextarea, IonNote, IonIcon
  ],
})
export class NfcBindPage implements OnInit {
  private api   = inject(NfcApi);
  private toast = inject(ToastController);
  private safe  = inject(DomSanitizer);

  // stato UI
  rooms   = signal<NfcRoom[]>([]);
  tables  = signal<NfcTable[]>([]);
  roomId  = signal<number | null>(null);
  tableId = signal<number | null>(null);
  note    = signal<string>('');
  url     = signal<string | null>(null);
  qrHtml  = signal<SafeHtml | null>(null);

  // URL assoluto per mostrare/copiare
  absoluteUrl = computed(() => this.url() ? `${location.origin}${this.url()}` : '-');

  async ngOnInit() {
    await this.loadRooms();
    await this.loadTables(); // popolo anche senza sala selezionata
  }

  async loadRooms() {
    try {
      const rows = await firstValueFrom(this.api.listRooms());
      this.rooms.set(rows || []);
      console.log('🏷️ [NFC] rooms:', rows);
    } catch (e) {
      console.warn('⚠️ [NFC] listRooms KO', e);
    }
  }

  async loadTables() {
    try {
      const rows = await firstValueFrom(this.api.listTables(this.roomId() ?? undefined));
      this.tables.set(rows || []);
      console.log('🪑 [NFC] tables:', rows);
    } catch (e) {
      console.warn('⚠️ [NFC] listTables KO', e);
    }
  }

  async onGenerate() {
    if (!this.tableId()) return;
    try {
      const res = await firstValueFrom(this.api.bind({ table_id: this.tableId()!, note: this.note() }));
      this.url.set(res.url);
      this.qrHtml.set(res.qr_svg ? this.safe.bypassSecurityTrustHtml(res.qr_svg) : null);
      console.log('✅ [NFC] bind ok:', res);
      (await this.toast.create({ message: 'Token generato', duration: 1200, color: 'success' })).present();
    } catch (e) {
      console.warn('⚠️ [NFC] bind KO', e);
      (await this.toast.create({ message: 'Errore generazione', duration: 1500, color: 'danger' })).present();
    }
  }

  copyUrl() {
    const u = this.absoluteUrl();
    if (!u || u === '-') return;
    navigator.clipboard?.writeText(u).then(async () => {
      (await this.toast.create({ message: 'URL copiato', duration: 1200, color: 'primary' })).present();
    });
  }
}
