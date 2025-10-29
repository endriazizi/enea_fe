// src/app/features/orders/orders-live.page.ts
//
// OrdersLivePage — board "live" degli ordini
// - Filtri base: status (default 6h "live"), hours, q
// - Bottoni stato completi: pending→confirmed→preparing→ready→completed + cancel
// - Spinner su patch stato, toast esito
// - SSE per aggiornamenti in tempo reale
//
// Stile: commenti lunghi, Signals, Ionic standalone, niente sorprese.

import { Component, OnDestroy, signal, inject } from '@angular/core';
import { NgIf, NgFor, DecimalPipe } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent,
  IonItem, IonLabel, IonButton, IonSegment, IonSegmentButton, IonBadge, IonNote, IonInput
} from '@ionic/angular/standalone';
import { OrdersApi, OrderHeader, OrderStatus } from '../../core/orders/orders.service';
import { ToastController } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-orders-live',
  templateUrl: './orders-live.page.html',
  imports: [
    // Angular
    NgIf, NgFor, DecimalPipe,
    // Ionic
    IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent,
    IonItem, IonLabel, IonButton, IonSegment, IonSegmentButton, IonBadge, IonNote, IonInput
  ]
})
export class OrdersLivePage implements OnDestroy {
  private api = inject(OrdersApi);
  private toast = inject(ToastController);

  // Stato filtri (default live = 6h)
  readonly status = signal<OrderStatus | 'all'>('all');
  readonly hours  = signal<number>(6);
  readonly q      = signal<string>('');

  // Dati
  readonly rows = signal<OrderHeader[]>([]);
  private es?: EventSource;

  // UI stato azione
  readonly busyId = signal<number|null>(null);

  ionViewWillEnter() {
    this.reload();
    // Attacco SSE
    this.es = this.api.stream({
      onOpen: () => console.log('🧵 [SSE] open'),
      onError: (e) => console.warn('🧵 [SSE] errore', e),
      onCreated: (o) => this.rows.set([o, ...this.rows()]),
      onStatus: (p) => {
        const copy = this.rows().slice();
        const idx = copy.findIndex(r => r.id === p.id);
        if (idx >= 0) copy[idx] = { ...copy[idx], status: p.status };
        this.rows.set(copy);
      }
    });
  }

  ionViewDidLeave() {
    if (this.es) { this.es.close(); this.es = undefined; }
  }

  ngOnDestroy() { if (this.es) this.es.close(); }

  reload() {
    this.api.list({
      status: this.status(),
      hours: this.hours(),
      q: this.q()
    }).subscribe({
      next: rows => this.rows.set(rows || []),
      error: e => console.error('💥 [OrdersLive] list KO', e)
    });
  }

  onStatusTab(v: any) {
    const val = String(v || 'all') as ('all' | OrderStatus);
    this.status.set(val);
    this.reload();
  }

  onHoursChange(v: any) {
    const n = Number((v ?? '').toString().trim() || '0');
    this.hours.set(Number.isFinite(n) ? n : 6);
    this.reload();
  }

  onSearchChange(v: any) {
    this.q.set((v ?? '').toString());
    this.reload();
  }

  trackById = (_: number, r: OrderHeader) => r.id;

  statusColor(s: OrderStatus) {
    switch (s) {
      case 'pending': return 'medium';
      case 'confirmed': return 'primary';
      case 'preparing': return 'warning';
      case 'ready': return 'tertiary';
      case 'completed': return 'success';
      case 'cancelled': return 'danger';
      default: return 'medium';
    }
  }

  // Sequenza semplice degli stati "positivi"
  nextStates(s: OrderStatus): OrderStatus[] {
    switch (s) {
      case 'pending': return ['confirmed', 'cancelled'];
      case 'confirmed': return ['preparing', 'cancelled'];
      case 'preparing': return ['ready', 'cancelled'];
      case 'ready': return ['completed', 'cancelled'];
      case 'completed': return ['cancelled'];
      case 'cancelled': return ['confirmed'];
      default: return ['confirmed'];
    }
  }

  async patchStatus(o: OrderHeader, s: OrderStatus) {
    if (this.busyId() === o.id) return;
    this.busyId.set(o.id);
    this.api.updateStatus(o.id, s).subscribe({
      next: async (updated) => {
        // aggiorno local subito
        const copy = this.rows().slice();
        const idx = copy.findIndex(r => r.id === o.id);
        if (idx >= 0) copy[idx] = updated;
        this.rows.set(copy);
        this.busyId.set(null);
        (await this.toast.create({ message: `Stato aggiornato: ${updated.status}`, duration: 1000, color: 'success' })).present();
      },
      error: async (e) => {
        console.error('💥 patchStatus KO', e);
        this.busyId.set(null);
        (await this.toast.create({ message: 'Errore cambio stato', duration: 1200, color: 'danger' })).present();
      }
    });
  }
}
