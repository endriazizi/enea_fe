// src/app/features/orders/state/cart.store.ts
// ============================================================================
// CartStore — stato locale del carrello con signals
// - add/remove/setQty
// - total calcolato in centesimi
// ============================================================================

import { Injectable, signal, computed } from '@angular/core';
import { MenuItem } from '../../../core/orders/types';

export interface CartRow {
  item: MenuItem;
  qty: number;
  notes?: string | null;
}

@Injectable({ providedIn: 'root' })
export class CartStore {
  rows = signal<CartRow[]>([]);

  totalCents = computed(() =>
    this.rows().reduce((acc, r) => acc + r.item.price_cents * r.qty, 0)
  );

  add(item: MenuItem) {
    const copy = [...this.rows()];
    const i = copy.findIndex(r => r.item.id === item.id);
    if (i >= 0) copy[i] = { ...copy[i], qty: copy[i].qty + 1 };
    else copy.push({ item, qty: 1 });
    this.rows.set(copy);
  }

  dec(itemId: number) {
    const copy = this.rows().map(r => ({ ...r }));
    const i = copy.findIndex(r => r.item.id === itemId);
    if (i < 0) return;
    copy[i].qty = Math.max(0, copy[i].qty - 1);
    const filtered = copy.filter(r => r.qty > 0);
    this.rows.set(filtered);
  }

  remove(itemId: number) {
    this.rows.set(this.rows().filter(r => r.item.id !== itemId));
  }

  setNotes(itemId: number, notes: string | null) {
    const copy = this.rows().map(r => r.item.id === itemId ? { ...r, notes } : r);
    this.rows.set(copy);
  }

  clear() { this.rows.set([]); }
}
