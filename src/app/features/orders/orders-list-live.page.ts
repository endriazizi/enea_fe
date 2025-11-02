// src/app/features/orders/orders-list-live.page.ts
// ============================================================================
// OrdersListLivePage — board ordini in tempo reale (SSE)
// - Usa OrdersApi.list()/getById()/stream()
// - Signals per stato, lista, dettaglio
// - SSE robusta con definite assignment per EventSource
// - Calcolo del totale spostato dal template al TS
// - Selector e class diversi dalla tua orders-live.page per evitare collisioni
// ============================================================================

import { Component, OnInit, OnDestroy, computed, signal, inject } from '@angular/core';
import { NgIf, NgFor, DatePipe, DecimalPipe } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
  IonContent, IonList, IonItem, IonLabel, IonBadge, IonCard,
  IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol,
  IonSpinner
} from '@ionic/angular/standalone';
import { OrdersApi, OrderHeader, OrderFull, OrderStatus } from '../../core/orders/orders.service';
import { firstValueFrom } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-orders-list-live',            // 👈 diverso dal tuo 'app-orders-live'
  templateUrl: './orders-list-live.page.html',
  styleUrls: ['./orders-list-live.page.scss'],
  imports: [
    // Angular
    NgIf, NgFor, DatePipe, DecimalPipe,
    // Ionic
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
    IonContent, IonList, IonItem, IonLabel, IonBadge,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonGrid, IonRow, IonCol, IonSpinner
  ]
})
export class OrdersListLivePage implements OnInit, OnDestroy {

  // === services ==============================================================
  private api = inject(OrdersApi);

  // === stato UI ==============================================================

  // filtro status (default: tutti)
  status = signal<OrderStatus | 'all'>('all');

  // lista + loading
  list = signal<OrderHeader[]>([]);
  loading = signal<boolean>(false);

  // dettaglio selezionato
  detail = signal<OrderFull | null>(null);

  // SSE stream
  private es!: EventSource;

  // computata: lista filtrata
  filtered = computed(() => {
    const s = this.status();
    const rows = this.list();
    return s === 'all' ? rows : rows.filter(o => o.status === s);
  });

  // colore badge per stato (semplice, estendibile)
  statusColor(s: OrderStatus): 'warning' | 'tertiary' | 'success' | 'medium' | 'danger' {
    switch (s) {
      case 'pending':    return 'warning';
      case 'preparing':  return 'tertiary';
      case 'ready':      return 'success';
      case 'completed':  return 'medium';
      case 'cancelled':  return 'danger';
      default:           return 'medium';
    }
  }

  // trackBy
  trackById = (_: number, r: OrderHeader) => r.id;

  // Totale dettaglio calcolato lato TS
  getDetailTotal(): number {
    const d = this.detail();
    if (!d) return 0;
    if (typeof d.total === 'number') return d.total;
    const items = Array.isArray(d.items) ? d.items : [];
    let sum = 0;
    for (const it of items) {
      const qty = Number(it?.qty ?? 0);
      const price = Number(it?.price ?? 0);
      sum += qty * price;
    }
    return sum;
  }

  // === lifecycle =============================================================
  ngOnInit(): void {
    this.refreshList();
    this.startSse();
  }

  ngOnDestroy(): void {
    try { this.es && this.es.close(); } catch { /* noop */ }
  }

  // === azioni UI =============================================================

  async refreshList() {
    this.loading.set(true);
    try {
      const rows = await firstValueFrom(this.api.list({ status: 'all', hours: 24 }));
      this.list.set(rows || []);
      console.log('📥 [OrdersListLive] lista aggiornata:', rows?.length);
    } catch (e) {
      console.error('💥 [OrdersListLive] list KO', e);
    } finally {
      this.loading.set(false);
    }
  }

  async openOrder(id: number) {
    try {
      console.log('🔎 [OrdersListLive] open order', id);
      const full: OrderFull = await firstValueFrom(this.api.getById(id));
      this.detail.set(full);
    } catch (e) {
      console.error('💥 [OrdersListLive] getById KO', e);
    }
  }

  // === SSE ===================================================================

  private startSse() {
    console.log('🧵 [OrdersListLive] SSE start…');
    this.es = this.api.stream();

    // nuovo ordine creato → aggiorna lista e, se serve, apri il dettaglio
    this.es.addEventListener('created', async (ev: MessageEvent) => {
      try {
        const payload = JSON.parse(ev.data || '{}');
        const o = payload?.order || payload;
        console.log('🆕 [SSE] created', o?.id);
        await this.refreshList();
        if (o?.id) {
          const full: OrderFull = await firstValueFrom(this.api.getById(o.id));
          if (!this.detail()) { this.detail.set(full); }
        }
      } catch (e) {
        console.warn('⚠️ [SSE] created parse KO', e);
      }
    });

    // cambio di stato → aggiorna lista, aggiorna eventuale dettaglio aperto
    this.es.addEventListener('status', async (ev: MessageEvent) => {
      try {
        const payload = JSON.parse(ev.data || '{}');
        const o = payload?.order || payload;
        console.log('🔁 [SSE] status', o?.id, o?.status);
        await this.refreshList();
        const cur = this.detail();
        if (cur && o?.id === cur.id) {
          const full: OrderFull = await firstValueFrom(this.api.getById(cur.id));
          this.detail.set(full);
        }
      } catch (e) {
        console.warn('⚠️ [SSE] status parse KO', e);
      }
    });

    this.es.onerror = (e) => console.warn('🧵 [SSE] errore', e);
  }
}
