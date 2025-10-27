// src/app/features/orders/orders-live.page.ts
// ============================================================================
// OrdersLivePage — lista ordini in tempo reale (SSE)
// - Filtri: stato + timeframe + search (client-side)
// - Azioni rapide: cambio stato con toast
// - UI mobile-first, ottima anche su desktop (badge + griglia info)
// ============================================================================

import { Component, OnDestroy, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';

// Angular / Common
import { NgIf, NgFor, DecimalPipe, DatePipe } from '@angular/common';

// Ionic
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonList, IonItem, IonLabel, IonNote, IonBadge,
  IonButtons, IonButton, IonSearchbar, IonSegment, IonSegmentButton,
  IonSelect, IonSelectOption, IonIcon
} from '@ionic/angular/standalone';
import { ToastController } from '@ionic/angular';

import { OrdersApi } from '../../core/orders/orders.service';
import { OrderHeader, OrderStatus } from '../../core/orders/types';
import { firstValueFrom } from 'rxjs';

type Timeframe = '1h' | '3h' | 'today' | '7d' | 'all';

@Component({
  standalone: true,
  selector: 'app-orders-live',
  templateUrl: './orders-live.page.html',
  imports: [
    // Angular
    NgIf, NgFor, DecimalPipe, DatePipe, RouterLink,
    // Ionic
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonList, IonItem, IonLabel, IonNote, IonBadge,
    IonButtons, IonButton, IonSearchbar, IonSegment, IonSegmentButton,
    IonSelect, IonSelectOption, IonIcon,
  ]
})
export class OrdersLivePage implements OnDestroy {
  private api = inject(OrdersApi);
  private toast = inject(ToastController);

  rows = signal<OrderHeader[]>([]);
  es?: EventSource;

  // ===== Filtri (signals) ====================================================
  status = signal<OrderStatus | 'all'>('all');
  timeframe = signal<Timeframe>('today');
  q = signal<string>('');

  // Helper: parse "YYYY-MM-DD HH:mm:ss" → Date (best effort)
  private parseDate(s?: string) {
    if (!s) return null;
    // iOS-safe: 'YYYY-MM-DDTHH:mm:ss'
    const t = s.includes('T') ? s : s.replace(' ', 'T');
    const d = new Date(t);
    if (isNaN(d.getTime())) return null;
    return d;
  }

  // Filtro timeframe
  private inTimeframe(d?: string | null): boolean {
    if (!d) return true;
    const ts = this.parseDate(d);
    if (!ts) return true;
    const now = new Date();
    const tf = this.timeframe();
    if (tf === 'all') return true;
    if (tf === '1h')  return (now.getTime() - ts.getTime()) <= 60 * 60 * 1000;
    if (tf === '3h')  return (now.getTime() - ts.getTime()) <= 3 * 60 * 60 * 1000;
    if (tf === 'today') {
      const start = new Date(now); start.setHours(0,0,0,0);
      return ts >= start;
    }
    if (tf === '7d') {
      const start = new Date(now.getTime() - 7*24*60*60*1000);
      return ts >= start;
    }
    return true;
  }

  // Computed: righe filtrate
  filtered = computed(() => {
    const s = this.status();
    const q = this.q().toLowerCase().trim();
    return this.rows().filter(r => {
      const okS = s === 'all' ? true : (r.status === s);
      const okT = this.inTimeframe(r.created_at);
      const okQ = !q
        || (r.customer_name?.toLowerCase().includes(q))
        || (String(r.id).includes(q))
        || (r.channel?.toLowerCase().includes(q));
      return okS && okT && okQ;
    });
  });

  // ===== Utils UI ============================================================
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

  // Azioni rapide per stato
  quickActions(s: OrderStatus): OrderStatus[] {
    if (s === 'pending')   return ['confirmed', 'cancelled'];
    if (s === 'confirmed') return ['preparing', 'cancelled'];
    if (s === 'preparing') return ['ready', 'cancelled'];
    if (s === 'ready')     return ['completed', 'cancelled'];
    return []; // completed/cancelled → niente
  }

  async changeStatus(o: OrderHeader, next: OrderStatus) {
    try {
      const updated = await firstValueFrom(this.api.updateStatus(o.id, next));
      if (!updated) throw new Error('Nessuna risposta dal server');
      const copy = [...this.rows()];
      const idx = copy.findIndex(r => r.id === o.id);
      if (idx >= 0) copy[idx] = { ...copy[idx], status: updated.status };
      this.rows.set(copy);
      (await this.toast.create({ message: `Stato #${o.id} → ${next}`, duration: 1100 })).present();
    } catch (e: any) {
      console.error('💥 [OrdersLive] updateStatus KO', e);
      (await this.toast.create({ message: `Errore cambio stato: ${e?.error?.message || e?.message || 'unknown'}`, duration: 2000, color: 'danger' })).present();
    }
  }

  // ===== Lifecycle ===========================================================
  ionViewWillEnter() {
    // 1) lista iniziale
    this.api.list().subscribe({
      next: (rows) => this.rows.set(rows || []),
      error: (e) => console.error('💥 [OrdersLive] list KO', e),
    });

    // 2) SSE live
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
        if (idx >= 0) {
          copy[idx] = { ...copy[idx], status: p.status as any };
          this.rows.set(copy);
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.es) { this.es.close(); this.es = undefined; }
  }
}
