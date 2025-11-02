// src/app/features/orders/order-builder.page.ts
// ============================================================================
// OrderBuilderPage — UI cameriere con dropdown Prenotazioni OGGI
// - Precompila Nome/Telefono/Coperti dalla prenotazione selezionata
// - Aggiunge "Coperto" come riga d'ordine (totale coerente con BE)
// - Dopo il POST → chiama /orders/:id/print (2 copie Pizzeria/Cucina)
// Stile: commenti lunghi + log a emoji, Ionic standalone + Signals
// ============================================================================

import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { NgIf, NgFor, DecimalPipe, DatePipe } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
  IonContent, IonItem, IonLabel, IonInput, IonTextarea, IonList,
  IonBadge, IonNote, IonSegment, IonSegmentButton,
  IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonFooter, IonModal, IonSelect, IonSelectOption
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { API_URL } from '../../core/tokens';
import { OrdersApi } from '../../core/orders/orders.service';
import { ReservationsApi, Reservation } from '../../core/reservations/reservations.service';
import { WhatsAppService } from '../../core/notifications/whatsapp.service';
import { AuthService } from '../../core/auth/auth.service';

// === tipizzazione locale (evito dipendenze incrociate) ======================
interface CatalogItem { id?: number | null; name: string; price: number; category?: string | null; }
interface CartItem   { name: string; price: number; qty: number; product_id?: number | null; }
interface OrderItemInput { name: string; qty: number; price: number; product_id?: number | null; }
interface OrderInputPayload {
  customer_name: string;
  phone: string | null;
  note: string | null;
  people: number | null;
  channel: string;
  items: OrderItemInput[];
  reservation_id?: number;
  room_id?: number | null;
  table_id?: number | null;
  scheduled_at?: string | null;
}

const COVER_PRICE_EUR = 1.50;

@Component({
  standalone: true,
  selector: 'app-order-builder',
  templateUrl: './order-builder.page.html',
  styleUrls: ['./order-builder.page.scss'],
  imports: [
    // Angular
    NgIf, NgFor, DecimalPipe, DatePipe,
    // Ionic
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
    IonContent, IonItem, IonLabel, IonInput, IonTextarea, IonList,
    IonBadge, IonNote, IonSegment, IonSegmentButton,
    IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonFooter, IonModal, IonSelect, IonSelectOption
  ]
})
export class OrderBuilderPage implements OnInit {
  // === services ==============================================================
  private api    = inject(OrdersApi);
  private res    = inject(ReservationsApi);
  private wa     = inject(WhatsAppService);
  private auth   = inject(AuthService);
  private router = inject(Router);

  // === costanti esposte al template =========================================
  readonly COVER_PRICE = COVER_PRICE_EUR;

  // === anagrafica & note =====================================================
  customerName  = signal<string>('');
  customerPhone = signal<string>('');
  note          = signal<string>('');

  // === coperti ===============================================================
  private readonly LS_COVERS = 'order.covers';
  covers = signal<number>(0);

  // === catalogo & categorie ==================================================
  private menuSig = signal<CatalogItem[]>([]);
  categories = computed<string[]>(() => {
    const set = new Set<string>();
    for (const m of this.menuSig()) set.add((m.category ?? 'Altro').toString().trim() || 'Altro');
    return Array.from(set).sort((a,b) => a.localeCompare(b,'it'));
  });
  selectedCategory = signal<string>('TUTTI');
  filteredMenu = computed<CatalogItem[]>(() => {
    const cat = this.selectedCategory(); const all = this.menuSig();
    return cat === 'TUTTI' ? all : all.filter(m => (m.category ?? 'Altro') === cat);
  });

  // === carrello & totale =====================================================
  cart = signal<CartItem[]>([]);
  itemsCount = computed(() => this.cart().reduce((s,r)=>s+r.qty,0));
  total = computed(() =>
    this.cart().reduce((s,r)=>s+r.price*r.qty,0) + (this.covers()>0 ? this.covers()*this.COVER_PRICE : 0)
  );

  // === prenotazioni oggi =====================================================
  pickList = signal<Reservation[]>([]);
  selectedReservation = signal<Reservation | null>(null);
  reservationMeta = signal<{ id: number; table_id?: number|null; room_id?: number|null; start_at?: string|null } | null>(null);

  // === personalizzazione (stub compat) ======================================
  customOpen = signal<boolean>(false);
  private _targetItem: CatalogItem | null = null;
  targetItem = () => this._targetItem;
  canCustomize(_m: CatalogItem) { return false; }
  openCustomize(m: CatalogItem) { this._targetItem = m; this.customOpen.set(true); }

  // === lifecycle =============================================================
  async ngOnInit() {
    console.log('🧱 [OrderBuilder] init');
    this.covers.set(Number(localStorage.getItem(this.LS_COVERS) || '0') || 0);
    await this.loadMenu();
    await this.loadReservationsToday();
  }

  // === header: logout ========================================================
  onLogout() {
    console.log('🔐 [OrderBuilder] logout()');
    this.auth.logout();
    this.router.navigate(['/login'], { queryParams: { redirect: '/orders/new' } });
  }

  // === helpers ===============================================================
  private todayISO(): string {
    const d = new Date(); const y=d.getFullYear(); const m=String(d.getMonth()+1).padStart(2,'0'); const day=String(d.getDate()).padStart(2,'0');
    return `${y}-${m}-${day}`;
  }
  private normalizeReservation(r: any): Reservation {
    const first = r.customer_first ?? r.first_name ?? '';
    const last  = r.customer_last ?? r.last_name ?? '';
    const display_name = r.display_name ?? r.customer_name ?? r.name ?? `${first} ${last}`.trim();
    const party_size = Number(r.party_size ?? r.people ?? r.persons ?? r.covers ?? 0) || 0;
    const start_at = r.start_at ?? r.date ?? new Date().toISOString();
    return {
      id: Number(r.id),
      customer_first: first || null,
      customer_last: last || null,
      display_name: display_name || null,
      phone: r.phone ?? r.phone_number ?? null,
      email: r.email ?? null,
      party_size,
      start_at,
      end_at: r.end_at ?? null,
      room_id: r.room_id ?? null,
      table_id: r.table_id ?? null,
      status: r.status ?? 'pending',
      notes: r.notes ?? r.note ?? r.status_note ?? null,
      created_at: r.created_at ?? null,
      updated_at: r.updated_at ?? null,
      table_number: r.table_number ?? null,
      table_name: r.table_name ?? null,
    };
  }

  private async loadReservationsToday() {
    try {
      const day = this.todayISO();
      const rows = await firstValueFrom(this.res.list({ from: day, to: day, status: 'all' }));
      const norm = (rows || []).map(r => this.normalizeReservation(r));
      this.pickList.set(norm);
      console.log('📥 [OrderBuilder] prenotazioni oggi:', norm.length);
    } catch (e) {
      console.warn('⚠️ [OrderBuilder] loadReservationsToday KO', e);
      this.pickList.set([]);
    }
  }

  private async loadMenu() {
    try {
      const menu = await firstValueFrom(this.api.getMenu());
      const mapped: CatalogItem[] = (menu || []).map(m => ({ id: m.id ?? null, name: m.name, price: Number(m.price || 0), category: (m.category ?? null) }));
      this.menuSig.set(mapped);
      console.log('📥 [OrderBuilder] menu items:', mapped.length);
    } catch (e) {
      console.error('💥 [OrderBuilder] getMenu KO', e);
      this.menuSig.set([]);
    }
  }

  // === UI: prenotazione selezionata =========================================
  onPickReservation(r: Reservation | null) {
    this.selectedReservation.set(r);
    if (!r) { this.reservationMeta.set(null); return; }

    this.reservationMeta.set({ id: r.id, table_id: r.table_id ?? null, room_id: r.room_id ?? null, start_at: r.start_at ?? null });

    const name = r.display_name || `${r.customer_first || ''} ${r.customer_last || ''}`.trim();
    this.customerName.set(name || '');
    this.customerPhone.set(r.phone || '');
    const ppl = Number(r.party_size || 0) || 0;
    this.covers.set(ppl);
    localStorage.setItem(this.LS_COVERS, String(ppl));

    if (!this.note().trim()) {
      const hhmm = r.start_at ? new Date(r.start_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
      const tav = r.table_name || r.table_number ? ` — Tavolo ${r.table_name ?? r.table_number}` : '';
      this.note.set(`Rif. pren. #${r.id}${tav}${hhmm ? ' ('+hhmm+')' : ''}`);
    }
    console.log('🔗 [OrderBuilder] prenotazione selezionata', { id: r.id, ppl });
  }

  // === UI: coperti ===========================================================
  incCovers() { const n=(this.covers()||0)+1; this.covers.set(n); localStorage.setItem(this.LS_COVERS,String(n)); }
  decCovers() { const n=Math.max(0,(this.covers()||0)-1); this.covers.set(n); localStorage.setItem(this.LS_COVERS,String(n)); }

  // === UI: carrello ==========================================================
  trackByMenuId = (_: number, m: CatalogItem) => m.id ?? m.name;
  qtyInCart(baseName: string) { return this.cart().find(r=>r.name===baseName)?.qty || 0; }
  incCartByBaseName(baseName: string, m?: CatalogItem) {
    const price = Number((m as any)?.price ?? this.cart().find(r=>r.name===baseName)?.price ?? 0);
    const next = [...this.cart()];
    const idx = next.findIndex(r=>r.name===baseName);
    if (idx>=0) next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
    else next.push({ name: baseName, price, qty: 1, product_id: (m as any)?.id ?? null });
    this.cart.set(next);
  }
  decCartByBaseName(baseName: string) {
    const next=[...this.cart()]; const idx=next.findIndex(r=>r.name===baseName);
    if (idx>=0) { const cur={...next[idx]}; cur.qty=Math.max(0,cur.qty-1); if(cur.qty===0) next.splice(idx,1); else next[idx]=cur; this.cart.set(next); }
  }
  clearCart(){ this.cart.set([]); }

  // === invio ordine + stampa ================================================
  async confirmOrder() {
    try {
      const items: OrderItemInput[] = this.cart().map(r => ({ name: r.name, qty: r.qty, price: r.price, product_id: r.product_id ?? null }));
      if (this.covers() > 0) items.push({ name: 'Coperto', qty: this.covers(), price: this.COVER_PRICE, product_id: null });

      const payload: OrderInputPayload = {
        customer_name: (this.customerName() || 'Cliente').trim(),
        phone: (this.customerPhone() || '').trim() || null,
        note: (this.note() || '').trim() || null,
        people: this.covers() || null,
        channel: 'admin',
        items
      };

      const meta = this.reservationMeta();
      if (meta) { payload.reservation_id = meta.id; payload.table_id = meta.table_id ?? null; payload.room_id = meta.room_id ?? null; payload.scheduled_at = meta.start_at ?? null; }

      console.log('📤 [OrderBuilder] create order…', payload);
      const created = await firstValueFrom(this.api.create(payload as any));
      console.log('✅ [OrderBuilder] creato', created);

      // 🖨️ stampa immediata (2 copie, categorie/config da .env)
      try {
        await firstValueFrom(this.api.print(created.id));
        console.log('🖨️ [OrderBuilder] print OK');
      } catch (pe) {
        console.warn('🖨️ [OrderBuilder] print KO (non blocco)', pe);
      }

      this.cart.set([]);
      this.router.navigate(['/orders']);
    } catch (e) {
      console.error('💥 [OrderBuilder] create KO', e);
    }
  }
}
