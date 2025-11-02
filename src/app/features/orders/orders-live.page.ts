// src/app/features/orders/orders-live.page.ts
// Pagina “live” (griglie + azioni veloci), usa OrdersApi e SSE
import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { CommonModule, UpperCasePipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonSegment, IonSegmentButton, IonButton, IonModal, IonCard, IonCardHeader, IonCardTitle,
  IonCardContent, IonRow, IonCol, IonNote, IonItem, IonLabel, IonInput
} from '@ionic/angular/standalone';

import { OrdersApi, OrderHeader, OrderFull } from '../../core/orders/orders.service';

@Component({
  standalone: true,
  selector: 'app-orders-live',
  templateUrl: './orders-live.page.html',
  imports: [
    CommonModule, UpperCasePipe, DecimalPipe, NgFor, NgIf,
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonSegment, IonSegmentButton, IonButton, IonModal,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonRow, IonCol, IonNote, IonItem, IonLabel, IonInput
  ]
})
export class OrdersLivePage implements OnInit, OnDestroy {
  private api = inject(OrdersApi);

  // UI state (Signals)
  readonly statuses = ['all','pending','confirmed','preparing','ready','completed'];
  status = signal<'all' | 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed'>('all');
  hours  = signal<number>(6);
  rows   = signal<OrderHeader[]>([]);

  // dettaglio
  detailOpen = signal(false);
  detail?: OrderFull;
  es?: EventSource;

  async load() {
    const data = await this.api.list({ status: this.status(), hours: this.hours() }).toPromise();
    this.rows.set(data || []);
  }

  openDetail = async (o: OrderHeader) => {
    this.detail = await this.api.getById(o.id).toPromise();
    this.detailOpen.set(true);
  };

  closeDetail = () => this.detailOpen.set(false);

  async setStatus(o: OrderHeader, s: string) {
    await this.api.updateStatus(o.id, s).toPromise();
    await this.load();
  }

  ngOnInit() { this.load(); this.bindSse(); }
  ngOnDestroy() { try { this.es?.close(); } catch {} }

  private bindSse() {
    this.es = this.api.stream();
    this.es.addEventListener('created', async () => this.load());
    this.es.addEventListener('status', async () => this.load());
    this.es.onerror = (e) => console.warn('🧵 [SSE] errore', e);
  }
}
