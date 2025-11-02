// src/app/core/orders/orders.service.ts
// ============================================================================
// OrdersApi — servizio HTTP + SSE per gli Ordini
// - Tipi chiari ed esportati (evitiamo TS2305/TS2339 in altre pagine)
// - Endpoints BE attuali:
//     GET    /api/orders             (lista con filtri status/hours/from/to/q)
//     GET    /api/orders/:id         (header + items)
//     POST   /api/orders             (create)
//     PATCH  /api/orders/:id/status  (update stato)
//     SSE    /api/orders/stream      (created/status)
// - getMenu(): legge /api/products e mappa a {id?, name, price, category?}
// Stile: commenti lunghi, log con emoji, niente sorprese.
// ============================================================================

import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { API_URL } from '../tokens';

// ------------------------------- Tipi ---------------------------------------

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'completed'
  | 'cancelled';

export interface OrderItem {
  id?: number;
  order_id?: number;
  name: string;
  qty: number;
  price: number;              // € (DECIMAL(10,2) lato BE)
  product_id?: number | null;
}

export interface OrderHeader {
  id: number;
  customer_name?: string | null;
  phone?: string | null;
  email?: string | null;
  channel?: string | null;
  status: OrderStatus;
  status_note?: string | null; // alcuni schema
  note?: string | null;        // altri schema (fallback)
  created_at?: string | null;
  total?: number;              // SUM(oi.qty*oi.price)
}

export interface OrderFull extends OrderHeader { items: OrderItem[]; }

export interface CreateOrderDto {
  customer_name: string;
  phone?: string | null;
  email?: string | null;
  channel?: string | null; // es. 'admin'
  note?: string | null;    // o status_note lato BE
  items: Array<{
    name: string;
    qty: number;
    price: number;
    product_id?: number | null;
  }>;
}

export interface MenuItem {
  id?: number;
  name: string;
  price: number;              // € numero
  category?: string | null;
}

// ------------------------------ Servizio ------------------------------------

@Injectable({ providedIn: 'root' })
export class OrdersApi {
  private http = inject(HttpClient);
  private base = inject(API_URL); // '/api' in dev (proxy)

  list(params: {
    status?: OrderStatus | 'all';
    hours?: number;
    from?: string; // 'YYYY-MM-DD HH:mm:ss'
    to?: string;   // 'YYYY-MM-DD HH:mm:ss'
    q?: string;
  }): Observable<OrderHeader[]> {
    let hp = new HttpParams();
    if (params.status && params.status !== 'all') hp = hp.set('status', String(params.status));
    if (params.hours) hp = hp.set('hours', String(params.hours));
    if (params.from)  hp = hp.set('from', params.from);
    if (params.to)    hp = hp.set('to', params.to);
    if (params.q)     hp = hp.set('q', params.q);
    return this.http.get<OrderHeader[]>(`${this.base}/orders`, { params: hp });
  }

  getById(id: number): Observable<OrderFull> {
    return this.http.get<OrderFull>(`${this.base}/orders/${id}`);
  }

  create(dto: CreateOrderDto): Observable<OrderFull> {
    return this.http.post<OrderFull>(`${this.base}/orders`, dto);
  }

  updateStatus(id: number, status: OrderStatus): Observable<OrderHeader> {
    return this.http.patch<OrderHeader>(`${this.base}/orders/${id}/status`, { status });
  }

  // SSE — stream ordini (created/status)
  stream(): EventSource {
    // NB: EventSource nativo per semplicità (ping su 'created' e 'status').
    return new EventSource(`${this.base}/orders/stream`);
  }

  // Catalogo prodotti → MenuItem[]
  getMenu(): Observable<MenuItem[]> {
    return this.http.get<any[]>(`${this.base}/products`).pipe(
      map((rows) => (Array.isArray(rows) ? rows : [])),
      map((rows) =>
        rows.map((r) => {
          const name = String(r.name ?? r.title ?? 'Prodotto');
          const priceStr = (r.price ?? r.prezzo ?? 0).toString();
          const price = Number.parseFloat(priceStr.replace(',', '.'));
          const category = (r.category ?? r.categoria ?? null) as string | null;
          const id = r.id != null ? Number(r.id) : undefined;
          return { id, name, price: Number.isFinite(price) ? price : 0, category } as MenuItem;
        })
      )
    );
  }
}
