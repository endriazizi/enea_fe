// src/app/features/orders/orders-live.page.ts
// ============================================================================
// OrdersLivePage — lista/kanban real-time con SSE + ping sonoro
// (file ripristinato: prima era stato sovrascritto col builder)
// ============================================================================

import { Component, HostListener, computed, inject, signal } from '@angular/core';
import { NgIf, NgFor, AsyncPipe, DatePipe, DecimalPipe, UpperCasePipe } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon,
  IonContent, IonItem, IonLabel, IonBadge, IonSearchbar, IonInput,
  IonSegment, IonSegmentButton, IonList, IonBackButton, IonNote,
  IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonModal, IonToggle
} from '@ionic/angular/standalone';
import { ToastController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { OrdersApi, OrderHeader, OrderStatus, OrderFull } from '../../core/orders/orders.service';

@Component({
  standalone: true,
  selector: 'app-orders-live',
  templateUrl: './orders-live.page.html',
  styleUrls: ['./orders-live.page.scss'],
  imports: [
    NgIf, NgFor, AsyncPipe, DatePipe, DecimalPipe, UpperCasePipe,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon,
    IonContent, IonItem, IonLabel, IonBadge, IonSearchbar, IonInput,
    IonSegment, IonSegmentButton, IonList, IonBackButton, IonNote,
    IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonModal, IonToggle
  ]
})
export class OrdersLivePage {
  private api   = inject(OrdersApi);
  private toast = inject(ToastController);
  private es?: EventSource;

  readonly statuses: OrderStatus[] = ['pending','confirmed','preparing','ready','completed','cancelled'];

  // state
  status  = signal<OrderStatus | 'all'>('all');
  hours   = signal<number>(6);
  query   = signal<string>('');
  rows    = signal<OrderHeader[]>([]);
  busyId  = signal<number | null>(null);

  // detail (modal)
  detailOpen = signal<boolean>(false);
  detail = signal<OrderFull | null>(null);
  detailTotal = computed(() => {
    const d = this.detail();
    if (!d) return 0;
    if (typeof d.total === 'number') return d.total;
    return (d.items || []).reduce((s,i)=>s + i.qty * i.price, 0);
  });

  // audio
  private pingUrl = '/assets/sounds/ping.mp3';
  private unlocked = false;
  @HostListener('document:click') unlockAudio() { this.unlocked = true; }

  // lifecycle
  async ionViewWillEnter() { await this.load(); this.attachSse(); }
  ionViewWillLeave() { if (this.es) { this.es.close(); this.es = undefined; } }

  // load + filters
  async load() {
    const params: any = {};
    if (this.status() !== 'all') params.status = this.status();
    params.hours = this.hours();
    const list = await firstValueFrom(this.api.list(params));
    this.rows.set(list || []);
  }

  // status helpers
  async setStatus(o: OrderHeader, next: OrderStatus) {
    this.busyId.set(o.id);
    try {
      const updated = await firstValueFrom(this.api.updateStatus(o.id, next));
      const copy = [...this.rows()];
      const idx = copy.findIndex(r => r.id === o.id);
      if (idx >= 0) copy[idx] = { ...copy[idx], status: updated.status };
      this.rows.set(copy);
      await this.toastOk(`Ordine #${o.id} → ${updated.status}`, 'medium');
      this.playPing();
    } finally { this.busyId.set(null); }
  }

  async openDetail(o: OrderHeader) {
    try {
      const full = await firstValueFrom(this.api.getById(o.id));
      this.detail.set(full);
      this.detailOpen.set(true);
    } catch (e) { console.warn('💥 openDetail KO', e); }
  }
  closeDetail() { this.detailOpen.set(false); this.detail.set(null); }

  // SSE
  private attachSse() {
    try {
      this.es = this.api.stream();

      this.es.addEventListener('created', async (ev: MessageEvent) => {
        try {
          const o: OrderHeader = JSON.parse(ev.data);
          this.rows.set([o, ...this.rows()]);
          this.playPing();
          await this.toastOk(`Nuovo ordine #${o.id}`, 'tertiary');
        } catch (err) { console.warn('💥 [SSE] created parse KO', err); }
      });

      this.es.addEventListener('status', async (ev: MessageEvent) => {
        try {
          const p = JSON.parse(ev.data) as { id:number; status:OrderStatus };
          const copy = [...this.rows()];
          const idx = copy.findIndex(r => r.id === p.id);
          if (idx >= 0) copy[idx] = { ...copy[idx], status: p.status };
          this.rows.set(copy);
          this.playPing();
          await this.toastOk(`Ordine #${p.id} → ${p.status}`, 'success');
        } catch (err) { console.warn('💥 [SSE] status parse KO', err); }
      });

      this.es.onerror = (e) => console.warn('🧵 [SSE] errore', e);
    } catch (e) {
      console.warn('💥 SSE init KO', e);
    }
  }

  // UI helpers
  async toastOk(msg: string, color: 'tertiary'|'success'|'medium'='success') {
    const t = await this.toast.create({ message: msg, duration: 1800, color });
    await t.present();
  }
  private playPing() {
    if (!this.unlocked) return;
    const a = new Audio(this.pingUrl);
    a.play().catch(()=>{});
  }
}
