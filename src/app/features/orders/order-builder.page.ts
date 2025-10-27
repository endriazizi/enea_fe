// src/app/features/orders/order-builder.page.ts
// ============================================================================
// OrderBuilderPage — 3 step (Contatti → Ordine → Conferma)
// - Step 1: Cliente (nome obbligatorio)
// - Step 2: Menu reale (API) con fallback mock, carrello con +/-
// - Step 3: Riepilogo e invio → POST /api/orders → redirect a /orders
// UI: mobile-first; su desktop 2 colonne (catalogo a sinistra, carrello a destra)
// ============================================================================

import { Component, inject, signal, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

// Angular / Common
import { NgIf, NgFor, DecimalPipe } from '@angular/common';

// Ionic
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonList, IonItem, IonLabel, IonInput, IonTextarea,
  IonBadge, IonButtons, IonButton, IonNote, IonSegment, IonSegmentButton,
  IonGrid, IonRow, IonCol
} from '@ionic/angular/standalone';

import { OrdersApi } from '../../core/orders/orders.service';
import { MenuCategory, MenuItem, OrderInput } from '../../core/orders/types';

type Step = 1 | 2 | 3;

@Component({
  standalone: true,
  selector: 'app-order-builder',
  templateUrl: './order-builder.page.html',
  imports: [
    // Angular
    NgIf, NgFor, DecimalPipe, RouterLink,
    // Ionic
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonList, IonItem, IonLabel, IonInput, IonTextarea,
    IonBadge, IonButtons, IonButton, IonNote, IonSegment, IonSegmentButton,
    IonGrid, IonRow, IonCol,
  ]
})
export class OrderBuilderPage {
  private api = inject(OrdersApi);
  private router = inject(Router);

  // ===== Stepper =============================================================
  readonly currentStep = signal<Step>(1);
  goNext() { this.currentStep.set(this.currentStep() === 3 ? 3 : (this.currentStep() + 1) as Step); }
  goPrev() { this.currentStep.set(this.currentStep() === 1 ? 1 : (this.currentStep() - 1) as Step); }

  // ===== Dati cliente ========================================================
  customerName = signal('');
  customerPhone = signal('');
  customerEmail = signal('');
  note = signal('');

  onNameInput(ev: CustomEvent)  { this.customerName.set(String((ev as any)?.detail?.value ?? '')); }
  onPhoneInput(ev: CustomEvent) { this.customerPhone.set(String((ev as any)?.detail?.value ?? '')); }
  onEmailInput(ev: CustomEvent) { this.customerEmail.set(String((ev as any)?.detail?.value ?? '')); }
  onNoteInput(ev: CustomEvent)  { this.note.set(String((ev as any)?.detail?.value ?? '')); }

  // ===== Menu (reale + fallback mock) =======================================
  categories = signal<MenuCategory[]>([]);
  itemsAll   = signal<MenuItem[]>([]);
  selectedCat = signal<number | 'all'>('all');

  itemsFiltered = computed(() => {
    const cat = this.selectedCat();
    const i = this.itemsAll();
    return cat === 'all' ? i : i.filter(x => (x.cat_id ?? null) === cat);
  });

  // Mock locale se il BE non espone /orders/menu
  private mockCats: MenuCategory[] = [
    { id: 10, name: 'Pizze' },
    { id: 20, name: 'Bibite' },
  ];
  private mockItems: MenuItem[] = [
    { id: 101, cat_id: 10, name: 'Margherita', price: 6.50 },
    { id: 102, cat_id: 10, name: 'Diavola',    price: 7.50 },
    { id: 103, cat_id: 10, name: '4 Formaggi', price: 8.00 },
    { id: 201, cat_id: 20, name: 'Acqua',      price: 1.50 },
    { id: 202, cat_id: 20, name: 'Bibita',     price: 2.50 },
  ];

  // ===== Carrello ============================================================
  cart = signal<{ id: number; name: string; price: number; qty: number }[]>([]);
  total = computed(() => this.cart().reduce((s, r) => s + r.qty * r.price, 0));

  addItem(m: MenuItem) {
    const copy = [...this.cart()];
    const idx = copy.findIndex(c => c.id === m.id);
    if (idx >= 0) copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
    else copy.push({ id: m.id, name: m.name, price: m.price, qty: 1 });
    this.cart.set(copy);
  }

  // ✅ helper per il bottone “+” nel carrello (evita cast in template)
  incItem(id: number, name: string, price: number) {
    const copy = [...this.cart()];
    const idx = copy.findIndex(c => c.id === id);
    if (idx >= 0) copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
    else copy.push({ id, name, price, qty: 1 });
    this.cart.set(copy);
  }

  decItem(id: number) {
    const copy = [...this.cart()];
    const idx = copy.findIndex(c => c.id === id);
    if (idx < 0) return;
    const q = copy[idx].qty - 1;
    if (q <= 0) copy.splice(idx, 1);
    else copy[idx] = { ...copy[idx], qty: q };
    this.cart.set(copy);
  }

  // ===== Abilitazioni ========================================================
  canNextFrom1 = computed(() => this.customerName().trim().length > 0);
  canNextFrom2 = computed(() => this.cart().length > 0);

  // ===== Lifecycle ===========================================================
  ionViewWillEnter() {
    // menu reale (fallback a mock se vuoto)
    this.api.getMenu().subscribe({
      next: (res) => {
        const cats = (res?.categories || []);
        const items = (res?.items || []);
        if (cats.length && items.length) {
          this.categories.set(cats);
          this.itemsAll.set(items);
          this.selectedCat.set('all');
        } else {
          console.warn('⚠️ [OrderBuilder] menu API vuoto → uso mock');
          this.categories.set(this.mockCats);
          this.itemsAll.set(this.mockItems);
          this.selectedCat.set('all');
        }
      },
      error: (e) => {
        console.warn('⚠️ [OrderBuilder] menu API KO → uso mock', e);
        this.categories.set(this.mockCats);
        this.itemsAll.set(this.mockItems);
        this.selectedCat.set('all');
      }
    });
  }

  // ===== Submit ==============================================================
  loading = signal(false);

  async submit() {
    if (this.loading()) return;
    if (!this.customerName().trim() || !this.cart().length) return;

    this.loading.set(true);
    try {
      const dto: OrderInput = {
        customer_name: this.customerName().trim(),
        phone: this.customerPhone().trim() || null,
        email: this.customerEmail().trim() || null,
        note: this.note().trim() || null,
        channel: 'admin',
        items: this.cart().map(r => ({
          product_id: r.id,
          name: r.name,
          qty: r.qty,
          price: r.price
        }))
      };
      const created = await this.api.create(dto).toPromise();
      console.log('✅ [OrderBuilder] creato', created);

      // Reset UI + redirect
      this.cart.set([]);
      this.customerName.set('');
      this.customerPhone.set('');
      this.customerEmail.set('');
      this.note.set('');
      this.currentStep.set(1);

      this.router.navigateByUrl('/orders');
    } catch (e: any) {
      console.error('💥 [OrderBuilder] create KO', e);
      alert(e?.error?.message || e?.message || 'Errore creazione ordine');
    } finally {
      this.loading.set(false);
    }
  }
}
