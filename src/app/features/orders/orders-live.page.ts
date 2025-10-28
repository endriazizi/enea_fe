// src/app/features/orders/orders-live.page.ts
//
// OrdersLivePage — board con filtri e azioni di cambio stato.
// NIENTE campi del builder qui. Template snello, mobile-first.
// Stile: Signals + log con emoji.

import { Component, inject, signal, computed } from '@angular/core';
import { NgIf, NgFor, DecimalPipe } from '@angular/common';
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonButtons, IonBackButton, IonButton,
  IonList, IonItem, IonLabel, IonBadge, IonSegment, IonSegmentButton,
  IonSearchbar, IonNote
} from '@ionic/angular/standalone';

import { OrdersApi, OrderHeader, OrderStatus } from '../../core/orders/orders.service';

@Component({
  standalone: true,
  selector: 'app-orders-live',
  templateUrl: './orders-live.page.html',
  imports: [
    NgIf, NgFor, DecimalPipe,
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonButtons, IonBackButton, IonButton,
    IonList, IonItem, IonLabel, IonBadge, IonSegment, IonSegmentButton,
    IonSearchbar, IonNote
  ]
})
export class OrdersLivePage {
  private api = inject(OrdersApi);

  // filtri
  readonly q = signal<string>('');
  readonly status = signal<'all' | OrderStatus>('all');
  readonly hours = signal<number>(6); // default “live”: ultime 6 ore

  // dati
  readonly rows = signal<OrderHeader[]>([]);
  readonly loading = signal<boolean>(false);

  readonly filtered = computed(() => {
    const q = this.q().toLowerCase().trim();
    const st = this.status();
    return this.rows().filter(r => {
      const bySt = st === 'all' ? true : r.status === st;
      const byQ  = !q ? true : (
        String(r.id).includes(q) ||
        (r.customer_name||'').toLowerCase().includes(q) ||
        (r.channel||'').toLowerCase().includes(q)
      );
      return bySt && byQ;
    });
  });

  constructor() {
    this.reload();
    // SSE live
    this.api.stream({
      onCreated: (o) => { console.log('🆕 created', o); this.rows.set([o, ...this.rows()]); },
      onStatus : (p) => {
        const copy = [...this.rows()];
        const i = copy.findIndex(x => x.id === p.id);
        if (i >= 0) { copy[i] = { ...copy[i], status: p.status }; this.rows.set(copy); }
      },
      onError  : (e) => console.warn('🧵 SSE errore', e)
    });
  }

  trackById(_i:number, r:OrderHeader){ return r.id; }

  statusColor(s: OrderStatus): 'danger'|'warning'|'primary'|'success'|'medium' {
    switch (s) {
      case 'cancelled': return 'danger';
      case 'pending': return 'warning';
      case 'confirmed': return 'primary';
      case 'preparing': return 'primary';
      case 'ready': return 'success';
      case 'completed': return 'medium';
      default: return 'medium';
    }
  }

  async reload() {
    this.loading.set(true);
    this.api.list({ status: this.status(), hours: this.hours(), q: this.q() })
      .subscribe({
        next: rows => this.rows.set(rows || []),
        error: e => console.error('💥 list KO', e),
        complete: () => this.loading.set(false)
      });
  }

  onStatusTab(val: any) {
    const s = (val as any) as ('all'|OrderStatus) ?? 'all';
    this.status.set(s);
    this.reload();
  }

  onHoursChange(v: any) {
    const n = Number(v);
    this.hours.set(Number.isFinite(n) ? n : 6);
    this.reload();
  }

  patchStatus(r: OrderHeader, status: OrderStatus) {
    this.loading.set(true);
    this.api.updateStatus(r.id, status).subscribe({
      next: up => {
        console.log('🔁 status patch OK', up);
        const copy = [...this.rows()];
        const i = copy.findIndex(x => x.id === r.id);
        if (i >= 0) { copy[i] = { ...copy[i], status: up.status }; this.rows.set(copy); }
      },
      error: e => console.error('💥 patch KO', e),
      complete: () => this.loading.set(false)
    });
  }
}
