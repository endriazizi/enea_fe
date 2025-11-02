// src/app/features/orders/state/cart.store.ts
// ============================================================================
// CartStore — stato locale del carrello con signals
// - add/remove/setQty
// - total calcolato in centesimi (da price in €)
// ============================================================================

import { Injectable, signal, computed } from '@angular/core';
import { MenuItem } from '../../../core/orders/orders.service';

export interface CartRow {
  item: MenuItem;
  qty: number;
  notes?: string | null;
}

@Injectable({ providedIn: 'root' })
export class CartStore {
  rows = signal<CartRow[]>([]);

  // Converte price (in €) → centesimi, arrotondando correttamente
  totalCents = computed(() =>
    this.rows().reduce((acc, r) => acc + Math.round((r.item.price ?? 0) * 100) * r.qty, 0)
  );

  add(item: MenuItem) {
    const copy = [...this.rows()];
    const i = copy.findIndex(r => (r.item.id ?? -1) === (item.id ?? -2) && r.item.name === item.name);
    if (i >= 0) copy[i] = { ...copy[i], qty: copy[i].qty + 1 };
    else copy.push({ item, qty: 1 });
    this.rows.set(copy);
  }

  dec(itemId?: number, name?: string) {
    const copy = this.rows().map(r => ({ ...r }));
    const i = copy.findIndex(r => (r.item.id ?? -1) === (itemId ?? -2) && (!name || r.item.name === name));
    if (i < 0) return;
    copy[i].qty = Math.max(0, copy[i].qty - 1);
    const filtered = copy.filter(r => r.qty > 0);
    this.rows.set(filtered);
  }

  remove(itemId?: number, name?: string) {
    this.rows.set(this.rows().filter(r => (r.item.id ?? -1) !== (itemId ?? -2) || (name && r.item.name !== name)));
  }

  setNotes(itemId: number | undefined, notes: string | null, name?: string) {
    const copy = this.rows().map(r => ((r.item.id ?? -1) === (itemId ?? -2) && (!name || r.item.name === name)) ? { ...r, notes } : r);
    this.rows.set(copy);
  }

  clear() { this.rows.set([]); }
}
