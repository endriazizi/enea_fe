// src/app/features/orders/order-builder.page.ts
// ============================================================================
// OrderBuilderPage — creazione ordine semplice lato Admin
// - Catalogo da /api/products (name, price, category)
// - Carrello con qty, totale, note ordine, recapiti cliente
// - Submit → POST /api/orders (CreateOrderDto) e redirect a /orders
// Stile: Ionic standalone + Signals, commenti lunghi, log con emoji
// ============================================================================

import { Component, computed, inject, signal } from '@angular/core';
import { NgIf, NgFor, DecimalPipe } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon,
  IonContent, IonItem, IonLabel, IonInput, IonTextarea, IonList,
  IonBadge, IonNote, IonSegment, IonSegmentButton
} from '@ionic/angular/standalone';

import { OrdersApi, CreateOrderDto, MenuItem } from '../../core/orders/orders.service';
import { Router } from '@angular/router';

interface CartItem {
  name: string;
  price: number;
  qty: number;
  product_id?: number | null;
}

@Component({
  standalone: true,
  selector: 'app-order-builder',
  templateUrl: './order-builder.page.html',
  imports: [
    // Angular
    NgIf, NgFor, DecimalPipe,
    // Ionic standalone
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon,
    IonContent, IonItem, IonLabel, IonInput, IonTextarea, IonList,
    IonBadge, IonNote, IonSegment, IonSegmentButton
  ]
})
export class OrderBuilderPage {
  // === services ==============================================================
  private api = inject(OrdersApi);
  private router = inject(Router);

  // === form signals ==========================================================
  customerName = signal<string>('');
  customerPhone = signal<string>('');
  note = signal<string>('');

  // === catalogo & categorie ==================================================
  private menuSig = signal<MenuItem[]>([]);
  categories = computed<string[]>(() => {
    const set = new Set<string>();
    for (const m of this.menuSig()) {
      const c = (m.category ?? 'Altro').toString().trim() || 'Altro';
      set.add(c);
    }
    const arr = Array.from(set).sort((a, b) => a.localeCompare(b, 'it'));
    return ['TUTTI', ...arr];
  });
  selectedCategory = signal<string>('TUTTI');

  filteredMenu = computed<MenuItem[]>(() => {
    const cat = this.selectedCategory();
    const all = this.menuSig();
    if (cat === 'TUTTI') return all;
    return all.filter(m => (m.category ?? 'Altro') === cat);
  });

  // === carrello ==============================================================
  private readonly KEY = 'builder:cart';
  cart = signal<CartItem[]>([]);
  busy = signal<boolean>(false);

  total = computed<number>(() => this.cart().reduce((s, it) => s + it.price * it.qty, 0));

  // === helpers ==============================================================

  qtyInCart(name: string): number {
    return this.cart().find(c => c.name === name)?.qty ?? 0;
  }

  trackByMenuName = (_: number, m: MenuItem) => m.name;
  trackByCartName = (_: number, it: CartItem) => it.name;

  // === lifecycle =============================================================
  async ngOnInit() {
    // pre-carico catalogo
    this.api.getMenu().subscribe({
      next: rows => {
        console.log('📦 menu:', rows.length);
        this.menuSig.set(rows);
      },
      error: e => console.warn('💥 menu KO', e)
    });

    // ripristino carrello
    try {
      const raw = sessionStorage.getItem(this.KEY);
      if (raw) this.cart.set(JSON.parse(raw));
    } catch {}
  }

  // === form handlers (parser robusto) =======================================
  onNameInput(ev: any)  { this.customerName.set((ev?.detail?.value ?? '').toString()); }
  onPhoneInput(ev: any) { this.customerPhone.set((ev?.detail?.value ?? '').toString()); }
  onNoteInput(ev: any)  { this.note.set((ev?.detail?.value ?? '').toString()); }

  // === carrello actions ======================================================
  addToCart(m: MenuItem) {
    const copy = [...this.cart()];
    const i = copy.findIndex(c => c.name === m.name);
    if (i >= 0) copy[i] = { ...copy[i], qty: copy[i].qty + 1 };
    else copy.push({ name: m.name, price: m.price, qty: 1, product_id: m.id ?? null });
    this.cart.set(copy);
    sessionStorage.setItem(this.KEY, JSON.stringify(this.cart()));
  }

  decCart(name: string) {
    const copy = this.cart().map(c => ({ ...c }));
    const i = copy.findIndex(c => c.name === name);
    if (i < 0) return;
    copy[i].qty = Math.max(0, copy[i].qty - 1);
    this.cart.set(copy.filter(c => c.qty > 0));
    sessionStorage.setItem(this.KEY, JSON.stringify(this.cart()));
  }

  clearCart() {
    this.cart.set([]);
    sessionStorage.removeItem(this.KEY);
  }

  // === submit ================================================================
  async submit() {
    if (this.busy()) return;
    const items = this.cart().filter(c => c.qty > 0).map(c => ({
      name: c.name,
      qty: c.qty,
      price: c.price,
      product_id: c.product_id ?? null
    }));
    if (items.length === 0) { alert('Carrello vuoto'); return; }

    const dto: CreateOrderDto = {
      customer_name: this.customerName().trim() || 'Cliente',
      phone: this.customerPhone().trim() || null,
      email: null,
      channel: 'admin',
      note: this.note().trim() || null,
      items
    };

    this.busy.set(true);
    this.api.create(dto).subscribe({
      next: (o) => {
        console.log('✅ creato ordine', o?.id);
        this.clearCart();
        this.router.navigate(['/orders']);
      },
      error: (e) => {
        console.warn('💥 create KO', e);
        this.busy.set(false);
      }
    });
  }
}
