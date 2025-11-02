// src/app/features/orders/orders-live.page.ts
// ============================================================================
// OrdersLivePage — LISTA/KANBAN ordini "live" con AUDIO
// - Filtri: status + ore (default 6h) + search + range from/to
// - Realtime: SSE ("created", "status") con ping sonoro + toast
// - Audio: di default ON; sblocco su mobile al primo tap (HostListener)
// - Azioni veloci: bottoniera su card per cambiare stato (confirm/prep/ready/done/cancel)
// - Doppio-tap sulla card → completed (scorciatoia)
// Stile: Ionic standalone + Signals, commenti lunghi, log con emoji 😄
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
    // Angular
    NgIf, NgFor, AsyncPipe, DatePipe, DecimalPipe, UpperCasePipe,
    // Ionic standalone
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon,
    IonContent, IonItem, IonLabel, IonBadge, IonSearchbar, IonInput,
    IonSegment, IonSegmentButton, IonList, IonBackButton, IonNote,
    IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonModal, IonToggle
  ]
})
export class OrdersLivePage {
  // === services & costanti ===================================================
  private api   = inject(OrdersApi);
  private toast = inject(ToastController);
  private readonly defaultHours = 6;
  private es?: EventSource; // chiusa in ngOnDestroy

  // sorgenti audio: primaria + fallback
  private readonly pingPrimary = '/assets/sounds/ping.mp3';
  private readonly pingFallback = '/assets/notification-ping-372476.mp3';

  readonly statuses: OrderStatus[] = ['pending','confirmed','preparing','ready','completed','cancelled'];

  // === state (signals) =======================================================
  status  = signal<OrderStatus | 'all'>('all');
  hours   = signal<number>(this.defaultHours);
  query   = signal<string>('');
  rows    = signal<OrderHeader[]>([]);
  busyId  = signal<number | null>(null);
  view    = signal<'list'|'kanban'>('kanban'); // default "kanban"
  compact = signal<boolean>(false);            // vista compatta per tante card

  // range data/ora (datetime-local)
  fromDT  = signal<string | null>(null);
  toDT    = signal<string | null>(null);

  // Audio ON di default + elemento Audio + flag "unlocked"
  public sound = {
    enabled:  signal<boolean>(true),  // ✅ ON di default
    el:       signal<HTMLAudioElement | null>(null),
    unlocked: signal<boolean>(false)
  };

  // Modal inline (niente ModalController)
  detailOpen = signal<boolean>(false);
  detail     = signal<OrderFull | null>(null);

  // per doppio-tap
  private lastTapAt = new Map<number, number>();
  private readonly dblTapMs = 350;

  // === sblocco audio al primo tap in pagina =================================
  @HostListener('document:click')
  onDocClick() { if (this.sound.enabled() && !this.sound.unlocked()) this.unlockSoundOnce(); }

  @HostListener('document:touchstart')
  onDocTouch() { if (this.sound.enabled() && !this.sound.unlocked()) this.unlockSoundOnce(); }

  // === helpers ==============================================================

  toNumber(v: unknown): number { const n = Number(v); return Number.isFinite(n) ? n : 0; }

  private toSqlDateTime(dtLocal: string): string {
    const d = new Date(dtLocal);
    const pad = (x: number) => String(x).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:00`;
  }

  trackById = (_: number, o: OrderHeader) => o.id;
  trackByItem = (i: number, it: any) => (it?.id ?? it?.name ?? i);
  noteOf(o: any): string { return (o?.note ?? o?.status_note ?? '').toString(); }

  statusColor(s: string): string {
    const v = String(s || '').toLowerCase() as OrderStatus | '';
    return v === 'pending'   ? 'warning'
         : v === 'confirmed' ? 'primary'
         : v === 'preparing' ? 'tertiary'
         : v === 'ready'     ? 'success'
         : v === 'completed' ? 'medium'
         : v === 'cancelled' ? 'danger'
         : 'medium';
  }

  filtered = computed(() => {
    const s = this.status();
    const q = this.query().trim().toLowerCase();
    return (this.rows() || []).filter(r => {
      const okStatus = (s === 'all') ? true : (r.status === s);
      const okText =
        !q ||
        r.customer_name?.toLowerCase().includes(q) ||
        r.channel?.toLowerCase().includes(q) ||
        this.noteOf(r).toLowerCase().includes(q) ||
        String(r.id).includes(q);
      return okStatus && okText;
    });
  });

  kanbanColumns = computed(() => {
    const base = this.rows() || [];
    const q = this.query().trim().toLowerCase();
    const map = new Map<OrderStatus, OrderHeader[]>();
    for (const s of this.statuses) map.set(s, []);
    for (const r of base) {
      const note = this.noteOf(r).toLowerCase();
      const okText = !q ||
        r.customer_name?.toLowerCase().includes(q) ||
        r.channel?.toLowerCase().includes(q) ||
        note.includes(q) ||
        String(r.id).includes(q);
      if (!okText) continue;
      map.get(r.status as OrderStatus)!.push(r);
    }
    for (const s of this.statuses) map.get(s)!.sort((a,b)=> (a.created_at! < b.created_at! ? 1 : -1));
    return map;
  });

  // === lifecycle =============================================================
  async ngOnInit() {
    this.initAudio();
    this.reload();
    this.attachSse();
  }
  ngOnDestroy() { try { this.es?.close(); } catch {} }

  // === AUDIO ================================================================

  private initAudio() {
    try {
      const a = new Audio();
      a.src = this.pingPrimary;
      a.preload = 'auto';
      a.addEventListener('error', () => {
        a.src = this.pingFallback; a.load();
      });
      this.sound.el.set(a);
      console.log('🔊 audio init OK (enabled=', this.sound.enabled(), ')');
    } catch (e) {
      console.warn('💥 audio init KO', e);
    }
  }

  private async unlockSoundOnce() {
    if (this.sound.unlocked()) return;
    const el = this.sound.el(); if (!el) return;
    try {
      await el.play(); el.pause(); el.currentTime = 0;
      this.sound.unlocked.set(true);
      console.log('🔓 audio unlocked');
    } catch (e) {
      console.warn('💥 audio unlock KO', e);
    }
  }

  toggleSound(ev?: any) {
    const hasChecked = typeof ev?.detail?.checked === 'boolean';
    const val = hasChecked ? !!ev.detail.checked : !this.sound.enabled();
    this.sound.enabled.set(val);
    if (val) this.unlockSoundOnce();
  }

  toggleCompact(ev?: any) { this.compact.set(!!ev?.detail?.checked); }

  private playPing() {
    if (!this.sound.enabled()) return;
    const el = this.sound.el(); if (!el) return;
    try { el.currentTime = 0; el.play().catch(()=>{}); } catch {}
  }

  // === actions ==============================================================

  private buildQueryParams() {
    const params: Record<string, any> = { status: this.status(), q: this.query() || undefined };
    const f = this.fromDT(); const t = this.toDT();
    if (f && t) { params.from = this.toSqlDateTime(f); params.to = this.toSqlDateTime(t); }
    else { params.hours = this.hours(); }
    return params;
  }

  reload() {
    const params = this.buildQueryParams();
    this.api.list(params).subscribe({
      next: rows => { console.log('📥 [Live] list OK', rows?.length, params); this.rows.set(rows || []); },
      error: e => console.warn('💥 [Live] list KO', e)
    });
  }

  onStatusTab(v: any) {
    const allowed = new Set<OrderStatus | 'all'>(['all','pending','confirmed','preparing','ready','completed','cancelled']);
    const casted = (typeof v === 'string' && allowed.has(v as any)) ? (v as OrderStatus | 'all') : 'all';
    this.status.set(casted);
    this.reload();
  }

  onViewChange(v: 'list'|'kanban'|undefined|null) {
    const next = (v === 'kanban') ? 'kanban' : 'list';
    this.view.set(next);
    if (next === 'kanban' && this.status() !== 'all') this.status.set('all');
    console.log('🧭 [Live] view =', next);
  }

  onHoursInput(ev: Event) {
    const raw = (ev?.target as HTMLInputElement)?.value ?? '';
    const n = this.toNumber(raw);
    this.hours.set(n > 0 ? n : this.defaultHours);
    this.fromDT.set(null); this.toDT.set(null);
    this.reload();
  }

  onQueryInput(ev: any) {
    const value = (ev?.detail?.value ?? '').toString();
    this.query.set(value);
    this.reload();
  }

  onFromInput(ev: Event) { this.fromDT.set(((ev.target as HTMLInputElement)?.value || '').trim() || null); if (this.fromDT() && this.toDT()) this.reload(); }
  onToInput  (ev: Event) { this.toDT.set  (((ev.target as HTMLInputElement)?.value || '').trim() || null); if (this.fromDT() && this.toDT()) this.reload(); }
  clearRange() { this.fromDT.set(null); this.toDT.set(null); this.reload(); }

  private async toastOk(msg: string, color: 'primary'|'success'|'warning'|'tertiary'|'medium'|'danger' = 'primary') {
    const t = await this.toast.create({ message: msg, duration: 1400, position: 'bottom', color });
    t.present();
  }

  // Cambia stato (UI) — uso un unico metodo
  setStatus(o: OrderHeader, to: OrderStatus) {
    if (this.busyId()) return;
    this.busyId.set(o.id);
    this.api.updateStatus(o.id, to).subscribe({
      next: async updated => {
        const copy = [...this.rows()]; const idx = copy.findIndex(r => r.id === updated.id);
        if (idx >= 0) copy[idx] = { ...copy[idx], status: updated.status as OrderStatus };
        this.rows.set(copy);
        // 🔔 suono + toast SEMPRE sul cambio locale
        this.playPing();
        await this.toastOk(`Ordine #${updated.id} → ${updated.status}`, this.statusColor(updated.status) as any);
      },
      error: e => console.warn('💥 patch status KO', e),
      complete: () => this.busyId.set(null)
    });
  }

  // doppio-tap rapido = completed
  onCardTap(o: OrderHeader) {
    const now = Date.now(), last = this.lastTapAt.get(o.id) || 0;
    if (now - last <= this.dblTapMs) {
      if (o.status !== 'completed') this.setStatus(o,'completed');
      this.lastTapAt.delete(o.id);
    } else {
      this.lastTapAt.set(o.id, now);
    }
  }

  // === Dettaglio (modal inline) =============================================
  async openDetail(o: OrderHeader) {
    try {
      const full = await firstValueFrom(this.api.getById(o.id));
      this.detail.set(full);
      this.detailOpen.set(true);
    } catch (e) {
      console.warn('💥 openDetail KO', e);
    }
  }
  closeDetail() { this.detailOpen.set(false); this.detail.set(null); }

  // === SSE ===================================================================
  private attachSse() {
    try {
      this.es = this.api.stream();

      // nuovo ordine
      this.es.addEventListener('created', async (ev: MessageEvent) => {
        try {
          const o: OrderHeader = JSON.parse(ev.data);
          console.log('🧵 [SSE] created', o);
          this.rows.set([o, ...this.rows()]);
          // 🔔 suono + toast SEMPRE
          this.playPing();
          await this.toastOk(`Nuovo ordine #${o.id}`, 'tertiary');
        } catch (err) { console.warn('💥 [SSE] created parse KO', err); }
      });

      // cambio stato
      this.es.addEventListener('status', async (ev: MessageEvent) => {
        try {
          const p = JSON.parse(ev.data) as { id:number; status:OrderStatus };
          console.log('🧵 [SSE] status', p);
          const copy = [...this.rows()]; const idx = copy.findIndex(r => r.id === p.id);
          if (idx >= 0) copy[idx] = { ...copy[idx], status: p.status };
          this.rows.set(copy);
          // 🔔 suono + toast SEMPRE anche se è il mio stesso update
          this.playPing();
          await this.toastOk(`Ordine #${p.id} → ${p.status}`, this.statusColor(p.status) as any);
        } catch (err) { console.warn('💥 [SSE] status parse KO', err); }
      });

      this.es.onerror = (e) => console.warn('🧵 [SSE] errore', e);
    } catch (e) {
      console.warn('💥 SSE init KO', e);
    }
  }
}
