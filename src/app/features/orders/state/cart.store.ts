// src/app/features/orders/state/cart.store.ts
// ============================================================================
// CartStore — stato locale del carrello con signals
// - add/remove/setQty
// - total calcolato in centesimi (da price in €)
// - 🆕 sessione tavolo: memorizza session_id e resetta il carrello se cambia
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
  private readonly LS_SESSION = 'order.session_id';

  // 🆕 sessione corrente (id restituito dal BE quando entri da /t/:token)
  sessionId = signal<string | number | null>(null);

  rows = signal<CartRow[]>([]);

  constructor() {
    // Ripristino session id salvato (non ripristino il carrello di proposito)
    const saved = localStorage.getItem(this.LS_SESSION);
    if (saved !== null) this.sessionId.set(saved);
  }

  // Se entra una sessione diversa → AZZERO carrello e salvo sessione
  ensureSession(next: string | number | null | undefined) {
    const cur = this.sessionId();
    const val = (typeof next === 'number' || typeof next === 'string') ? String(next) : null;
    if (val && String(cur ?? '') !== val) {
      console.log('🧹 [Cart] nuova sessione → reset carrello', { from: cur, to: val });
      this.rows.set([]);
      this.sessionId.set(val);
      try { localStorage.setItem(this.LS_SESSION, val); } catch {}
    }
  }

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
