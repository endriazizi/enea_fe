// src/app/core/orders/orders.service.ts
// ============================================================================
// OrdersApi — HTTP + SSE per Ordini (tipi + utility di mapping prodotti)
// - GET  /orders           (lista con filtri)
// - GET  /orders/:id       (full: header + items)
// - POST /orders           (create)
// - PATCH /orders/:id/...  (stato)
// - SSE  /orders/stream    (created/status)
// - GET  /products         (catalogo → MenuItem[])
// ============================================================================

import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { API_URL } from '../tokens';

export type OrderStatus =
  | 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';

export interface OrderItem {
  id?: number;
  order_id?: number;
  name: string;
  qty: number;
  price: number;              // € (DECIMAL lato BE)
  product_id?: number | null;
  notes?: string | null;
}

export interface OrderHeader {
  id: number;
  customer_name?: string | null;
  phone?: string | null;
  email?: string | null;
  channel?: string | null;
  status: OrderStatus;
  note?: string | null;
  created_at?: string | null;
  total?: number;
  people?: number | null;
}

export interface OrderFull extends OrderHeader { items: OrderItem[]; }

export interface CreateOrderDto {
  customer_name: string;
  phone?: string | null;
  email?: string | null;
  channel?: string | null; // 'admin'
  note?: string | null;
  people?: number | null;
  items: Array<{
    name: string;
    qty: number;
    price: number;
    product_id?: number | null;
    notes?: string | null;
  }>;
}

export interface MenuItem {
  id?: number;
  name: string;
  price: number;
  category?: string | null;
  // opzionali (se presenti nel tuo DB/JSON li useremo per “Personalizza”)
  ingredients?: string[] | string | null;
  extras?: Array<{ name: string; price: number }>;
}

@Injectable({ providedIn: 'root' })
export class OrdersApi {
  private http = inject(HttpClient);
  private base = inject(API_URL); // '/api' via app.config.ts

  list(params: {
    status?: OrderStatus | 'all';
    hours?: number;
    from?: string;
    to?: string;
    q?: string;
  }): Observable<OrderHeader[]> {
    let hp = new HttpParams();
    if (params.status && params.status !== 'all') hp = hp.set('status', String(params.status));
    if (params.hours) hp = hp.set('hours', String(params.hours));
    if (params.from)  hp = hp.set('from', params.from);
    if (params.to)    hp = hp.set('to', params.to);
    if (params.q)     hp = hp.set('q', params.q);
    return this.http.get<OrderHeader>(`${this.base}/orders`, { params: hp }) as any;
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

  // SSE (nativo)
  stream(): EventSource {
    return new EventSource(`${this.base}/orders/stream`);
  }

  // Catalogo → mappo differenze nomi colonne
  getMenu(): Observable<MenuItem[]> {
    return this.http.get<any[]>(`${this.base}/products`).pipe(
      map((rows) => (Array.isArray(rows) ? rows : [])),
      map((rows) =>
        rows.map((r) => {
          const name = String(r.name ?? r.title ?? 'Prodotto');
          const priceStr = (r.price ?? r.prezzo ?? 0).toString();
          const price = Number.parseFloat(priceStr.replace(',', '.'));
          const category = (r.category ?? r.categoria ?? null) as string | null;

          // opzionali per personalizzazione
          const ingredients = r.ingredients ?? r.base_ingredients ?? null;
          const extras = r.extras ?? null;

          const id = r.id != null ? Number(r.id) : undefined;
          return {
            id,
            name,
            price: Number.isFinite(price) ? price : 0,
            category,
            ingredients,
            extras
          } as MenuItem;
        })
      )
    );
  }
}
