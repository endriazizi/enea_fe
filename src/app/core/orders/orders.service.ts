// src/app/core/api/orders.api.ts
// ============================================================================
// ORDERS API client (Http + SSE) — stile Endri (commenti lunghi, emoji)
// Espone:
//  - list(params) → OrderHeader[]
//  - getById(id)  → OrderFull
//  - updateStatus(id, status) → { ok: true }
//  - print(id) → { ok: boolean }
//  - stream() → EventSource (SSE /api/orders/stream)
//  - getMenu() → MenuProduct[]  (← usato da OrderBuilderPage)
//  - create(payload) → OrderFull (← usato da OrderBuilderPage)
// ----------------------------------------------------------------------------
// NOTE
// - Base URL arriva via InjectionToken API_URL (environment.apiBaseUrl).
// - Tipi ben specificati per evitare 'unknown' da firstValueFrom.
// - Path BE coerenti con il tuo server: /api/orders, /api/products.
// ============================================================================

import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../core/tokens';
import { Observable } from 'rxjs';

// ---------- Tipi base Ordini ----------
export type OrderHeader = {
  id: number;
  customer_name: string;
  phone: string | null;
  email: string | null;
  people: number | null;
  scheduled_at: string | null;
  status: string;
  total: number;
  channel: string;
  note: string | null;
  created_at: string;
  updated_at: string | null;
};

export type OrderItem = {
  id: number;
  order_id: number;
  product_id: number | null;
  name: string;
  qty: number;
  price: number;
  notes: string | null;
  category?: string; // calcolata lato BE
};

export type OrderFull = OrderHeader & { items: OrderItem[] };

// ---------- Tipi per Catalogo/Menu ----------
export type MenuProduct = {
  id: number;
  name: string;
  description: string | null;
  price: number | string;     // alcune liste rientrano come stringhe → normalizza tu se serve
  is_active: 0 | 1;
  sort_order: number;
  category_id: number | null;
  category: string | null;    // comodo per raggruppare
  icon?: string | null;       // 🍕 se presente
};

// ---------- Payload creazione ordine ----------
export type OrderCreateItem = {
  product_id: number | null;
  name: string;
  qty: number;
  price: number;
  notes?: string | null;
};

export type OrderCreatePayload = {
  customer_name: string;
  phone?: string | null;
  email?: string | null;
  people?: number | null;
  scheduled_at?: string | null;  // "YYYY-MM-DD HH:mm:ss"
  note?: string | null;
  channel?: string;              // default 'admin'
  items: OrderCreateItem[];
};

@Injectable({ providedIn: 'root' })
export class OrdersApi {
  private http = inject(HttpClient);
  private base = inject(API_URL); // es. http://localhost:3000/api

  // ---- Elenco ordini (con filtri leggeri) ----------------------------------
  list(opts: { hours?: number; from?: string; to?: string; status?: string; q?: string } = {}): Observable<OrderHeader[]> {
    const params: Record<string, string> = {};
    if (opts.hours != null) params.hours = String(opts.hours);
    if (opts.from) params.from = opts.from;
    if (opts.to) params.to = opts.to;
    if (opts.status) params.status = opts.status;
    if (opts.q) params.q = opts.q;
    return this.http.get<OrderHeader[]>(`${this.base}/orders`, { params });
  }

  // ---- Dettaglio ordine -----------------------------------------------------
  getById(id: number): Observable<OrderFull> {
    return this.http.get<OrderFull>(`${this.base}/orders/${id}`);
  }

  // ---- Cambio stato ---------------------------------------------------------
  updateStatus(id: number, status: string): Observable<{ ok: true }> {
    return this.http.patch<{ ok: true }>(`${this.base}/orders/${id}/status`, { status });
  }

  // ---- Stampa (best-effort) -------------------------------------------------
  print(id: number): Observable<{ ok: boolean }> {
    return this.http.post<{ ok: boolean }>(`${this.base}/orders/${id}/print`, {});
  }

  // ---- SSE (lista live) -----------------------------------------------------
  stream(): EventSource {
    // NB: niente fetch — usiamo nativo EventSource per semplicità
    return new EventSource(`${this.base}/orders/stream`, { withCredentials: true });
  }

  // ---- MENU / CATALOGO ------------------------------------------------------
  // Il tuo BE espone /api/products → usiamo quello 1:1.
  getMenu(): Observable<MenuProduct[]> {
    return this.http.get<MenuProduct[]>(`${this.base}/products`);
  }

  // ---- CREA ORDINE ----------------------------------------------------------
  // Restituisce l'ordine COMPLETO (OrderFull) come dal tuo BE POST /api/orders
  create(payload: OrderCreatePayload): Observable<OrderFull> {
    // Il BE calcola il totale e torna items già normalizzati
    return this.http.post<OrderFull>(`${this.base}/orders`, payload);
  }
}
