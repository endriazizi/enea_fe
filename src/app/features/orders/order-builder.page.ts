// src/app/features/orders/order-builder.page.ts
//
// OrderBuilderPage — builder ordini (mobile-first, desktop 2-colonne)
// - Catalogo: tenta getMenu(); fallback mock se 404
// - Carrello: +/- articoli, totale, persistenza in sessionStorage
// - Submit: POST /api/orders poi redirect → /orders
// Stile: commenti lunghi, Signals + log con emoji.

import { Component, inject, signal, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIf, NgFor, DecimalPipe } from '@angular/common';

import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonItem, IonLabel, IonInput, IonTextarea, IonNote, IonBadge,
  IonList, IonButtons, IonButton, IonBackButton
} from '@ionic/angular/standalone';

import { OrdersApi, MenuItem, OrderItem, CreateOrderDto } from '../../core/orders/orders.service';

type CartItem = OrderItem & { name: string };

// ---- helpers ----------------------------------------------------------------

function toNumber(v: any): number | null {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}
function loadCart(): CartItem[] {
  try { return JSON.parse(sessionStorage.getItem('cart') || '[]'); } catch { return []; }
}
function saveCart(rows: CartItem[]) {
  try { sessionStorage.setItem('cart', JSON.stringify(rows)); } catch {}
}

// -----------------------------------------------------------------------------

@Component({
  standalone: true,
  selector: 'app-order-builder',
  templateUrl: './order-builder.page.html',
  imports: [
    // Angular
    NgIf, NgFor, DecimalPipe, RouterLink,
    // Ionic (includo TUTTO ciò che uso in html)
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonItem, IonLabel, IonInput, IonTextarea, IonNote, IonBadge,
    IonList, IonButtons, IonButton, IonBackButton,
  ]
})
export class OrderBuilderPage {
  private api = inject(OrdersApi);
  private router = inject(Router);

  // campi anagrafica
  readonly customerName = signal<string>('');
  readonly customerPhone = signal<string>('');
  readonly note = signal<string>('');

  // stato invio
  readonly busy = signal<boolean>(false);

  // catalogo + carrello
  readonly menu = signal<MenuItem[]>([]);
  readonly cart = signal<CartItem[]>(loadCart());

  // totale calcolato
  readonly total = computed(() =>
    this.cart().reduce((acc, r) => acc + r.price * r.qty, 0)
  );

  constructor() {
    // carico menu
    this.api.getMenu().subscribe({
      next: rows => this.menu.set(rows || []),
      error: e => console.warn('🍕 getMenu KO', e)
    });
  }

  // trackBy distinti per tipi coerenti
  trackByMenuName(_i: number, m: MenuItem) { return `${m.name}`; }
  trackByCartName(_i: number, it: CartItem) { return `${it.name}`; }

  // azioni carrello
  addItem(m: MenuItem) {
    const copy = [...this.cart()];
    const idx = copy.findIndex(x => x.name === m.name);
    if (idx >= 0) copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
    else copy.push({ name: m.name, price: Number(m.price || 0), qty: 1, product_id: toNumber(m.id) });
    this.cart.set(copy); saveCart(copy);
  }
  inc(it: CartItem)   { const c = this.cart().map(x => x === it ? { ...x, qty: x.qty + 1 } : x); this.cart.set(c); saveCart(c); }
  dec(it: CartItem)   { const c = this.cart().map(x => x === it ? { ...x, qty: Math.max(1, x.qty - 1) } : x); this.cart.set(c); saveCart(c); }
  remove(it: CartItem){ const c = this.cart().filter(x => x !== it); this.cart.set(c); saveCart(c); }
  clearCart()         { this.cart.set([]); saveCart([]); }

  canSubmit(): boolean {
    return !!this.customerName().trim() && this.cart().length > 0 && !this.busy();
  }

  async submit() {
    if (!this.canSubmit()) return;
    const dto: CreateOrderDto = {
      customer_name: this.customerName().trim(),
      phone: this.customerPhone().trim() || null,
      note: this.note().trim() || null,
      channel: 'admin',
      items: this.cart().map(x => ({
        product_id: x.product_id ?? null,
        name: x.name, qty: x.qty, price: x.price, notes: x.notes ?? null
      }))
    };

    try {
      this.busy.set(true);
      console.log('📤 [Builder] POST /api/orders …', dto);
      const created = await this.api.create(dto).toPromise();
      console.log('✅ [Builder] creato', created);
      this.clearCart();
      this.customerName.set(''); this.customerPhone.set(''); this.note.set('');
      this.router.navigateByUrl('/orders');
    } catch (e) {
      console.error('💥 [Builder] create KO', e);
      alert('Errore creazione ordine');
    } finally {
      this.busy.set(false);
    }
  }
}
