// ============================================================================
// OrdersLivePage — lista ordini in tempo reale (SSE)
// - Prima carica la lista (headers)
// - Poi si iscrive allo stream /api/orders/stream
// ============================================================================

import { Component, OnDestroy, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

// Angular / Common
import { NgIf, NgFor, DecimalPipe } from '@angular/common';

// Ionic
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonList, IonItem, IonLabel, IonNote, IonBadge, IonButtons, IonButton
} from '@ionic/angular/standalone';

import { OrdersApi } from '../../core/orders/orders.service';
import { OrderHeader } from '../../core/orders/types';

@Component({
  standalone: true,
  selector: 'app-orders-live',
  templateUrl: './orders-live.page.html',
  imports: [
    // Angular
    NgIf, NgFor, DecimalPipe, RouterLink,
    // Ionic
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonList, IonItem, IonLabel, IonNote, IonBadge, IonButtons, IonButton,
  ]
})
export class OrdersLivePage implements OnDestroy {
  private api = inject(OrdersApi);

  rows = signal<OrderHeader[]>([]);
  es?: EventSource;

  trackById = (_: number, r: OrderHeader) => r.id;

  statusColor(s: string) {
    switch (s) {
      case 'pending':   return 'warning';
      case 'confirmed': return 'tertiary';
      case 'preparing': return 'primary';
      case 'ready':     return 'success';
      case 'completed': return 'medium';
      case 'cancelled': return 'danger';
      default:          return 'medium';
    }
  }

  // Ionic lifecycle
  async ionViewWillEnter() {
    // 1) primo caricamento
    this.api.list().subscribe({
      next: (rows: OrderHeader[]) => this.rows.set(rows || []),
      error: (e) => console.error('💥 [OrdersLive] list KO', e),
    });

    // 2) stream SSE
    this.es = this.api.stream({
      onOpen:  () => console.log('🧵 [SSE] connesso'),
      onError: (e) => console.warn('🧵 [SSE] errore', e),
      onCreated: (o) => {
        console.log('🧵 event: order-created', o);
        this.rows.set([o, ...this.rows()]);
      },
      onStatus: (p) => {
        console.log('🧵 event: order-status', p);
        const copy = [...this.rows()];
        const idx = copy.findIndex(r => r.id === p.id);
        if (idx >= 0) { copy[idx] = { ...copy[idx], status: p.status as any }; this.rows.set(copy); }
      }
    });
  }

  ngOnDestroy() {
    if (this.es) { this.es.close(); this.es = undefined; }
  }
}
