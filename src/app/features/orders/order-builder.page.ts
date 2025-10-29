// src/app/features/orders/order-builder.page.ts
//
// OrderBuilderPage — crea un ordine
// - Campi cliente (nome, telefono, note)
// - Catalogo prodotti (da getMenu) con badge quantità
// - Carrello con +/- rimozione, totale, persistenza sessionStorage
// - Submit → POST /api/orders e redirect a /orders
//
// Stile: commenti lunghi, Signals, Ionic standalone, niente ngModel sui signals.

import { Component, inject, signal, computed } from '@angular/core';
import { NgIf, NgFor, DecimalPipe } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonTextarea,
  IonButton, IonList, IonBadge, IonNote
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { OrdersApi, MenuItem, CreateOrderDto } from '../../core/orders/orders.service';
import { ToastController } from '@ionic/angular';

interface CartItem {
  name: string;
  price: number;
  qty: number;
  product_id?: number | null;
}

const CART_KEY = 'order_builder_cart';

@Component({
  standalone: true,
  selector: 'app-order-builder',
  templateUrl: './order-builder.page.html',
  imports: [
    // Angular
    NgIf, NgFor, DecimalPipe,
    // Ionic
    IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonTextarea,
    IonButton, IonList, IonBadge, IonNote
  ]
})
export class OrderBuilderPage {
  private api = inject(OrdersApi);
  private router = inject(Router);
  private toast = inject(ToastController);

  // UI fields
  readonly customerName  = signal<string>('');
  readonly customerPhone = signal<string>('');
  readonly note          = signal<string>('');

  // Data
  readonly menu = signal<MenuItem[]>([]);
  readonly cart = signal<CartItem[]>([]);

  // Busy submit
  readonly busy = signal(false);

  // Totale
  readonly total = computed(() =>
    this.cart().reduce((sum, it) => sum + (Number(it.price) * Number(it.qty)), 0)
  );

  ionViewWillEnter() {
    // Carrello persistito
    try {
      const raw = sessionStorage.getItem(CART_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) this.cart.set(parsed as CartItem[]);
      }
    } catch {}
    // Menu reale con fallback
    this.api.getMenu().subscribe({
      next: rows => this.menu.set(rows || []),
      error: () => this.menu.set([
        { id: 1, name: 'Margherita', price: 6.5 },
        { id: 2, name: 'Diavola',    price: 7.5 },
        { id: 3, name: 'Acqua',      price: 1.5 },
      ])
    });
  }

  ionViewDidLeave() {
    // salvo il carrello corrente
    try { sessionStorage.setItem(CART_KEY, JSON.stringify(this.cart())); } catch {}
  }

  // ===== Catalog helpers =====================================================

  trackByMenuName = (_: number, r: MenuItem) => String(r.name ?? '');

  qtyInCart(name: string): number {
    const it = this.cart().find(c => c.name === name);
    return it ? it.qty : 0;
  }

  addItem(m: MenuItem) {
    const pid = toNumber(m.id);
    const copy = this.cart().slice();
    const idx = copy.findIndex(c => c.name === m.name);
    if (idx >= 0) copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
    else copy.push({ name: m.name, price: m.price, qty: 1, product_id: pid });
    this.cart.set(copy);
    try { sessionStorage.setItem(CART_KEY, JSON.stringify(copy)); } catch {}
  }

  // ===== Carrello ============================================================

  trackByCartName = (_: number, it: CartItem) => it.name;

  inc(it: CartItem) {
    const copy = this.cart().map(c => c.name === it.name ? { ...c, qty: c.qty + 1 } : c);
    this.cart.set(copy);
    try { sessionStorage.setItem(CART_KEY, JSON.stringify(copy)); } catch {}
  }

  dec(it: CartItem) {
    const copy = this.cart().map(c => c.name === it.name ? { ...c, qty: Math.max(0, c.qty - 1) } : c)
      .filter(c => c.qty > 0);
    this.cart.set(copy);
    try { sessionStorage.setItem(CART_KEY, JSON.stringify(copy)); } catch {}
  }

  remove(it: CartItem) {
    const copy = this.cart().filter(c => c.name !== it.name);
    this.cart.set(copy);
    try { sessionStorage.setItem(CART_KEY, JSON.stringify(copy)); } catch {}
  }

  clearCart() {
    this.cart.set([]);
    try { sessionStorage.removeItem(CART_KEY); } catch {}
  }

  canSubmit(): boolean {
    return !!this.customerName().trim() && this.cart().length > 0 && !this.busy();
  }

  async submit() {
    if (!this.canSubmit()) return;
    this.busy.set(true);
    const dto: CreateOrderDto = {
      customer_name: this.customerName().trim(),
      phone: this.customerPhone().trim() || null,
      note: this.note().trim() || null,
      channel: 'admin',
      items: this.cart().map(it => ({
        product_id: (typeof it.product_id === 'number' && Number.isFinite(it.product_id)) ? it.product_id : null,
        name: it.name,
        qty: it.qty,
        price: it.price
      }))
    };
    this.api.create(dto).subscribe({
      next: async () => {
        this.clearCart();
        this.busy.set(false);
        (await this.toast.create({ message: 'Ordine creato ✅', duration: 1200, color: 'success' })).present();
        this.router.navigateByUrl('/orders');
      },
      error: async (e) => {
        console.error('💥 create KO', e);
        this.busy.set(false);
        (await this.toast.create({ message: 'Errore creazione ordine', duration: 1400, color: 'danger' })).present();
      }
    });
  }
}

// ===== Utils =================================================================
function toNumber(v: unknown): number | null {
  if (v === null || v === undefined) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}
