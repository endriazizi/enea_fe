// src/app/core/orders/orders.service.ts
//
// OrdersApi (FE) — wrapper pulito per /api/orders
// - Tipi chiari (OrderHeader, OrderStatus, CreateOrderDto, MenuItem)
// - Metodi: list, create, updateStatus, getMenu, stream (SSE)
// - Nessuna logica di UI; solo chiamate HTTP e utilità SSE
//
// NB: il BE invia mail/WhatsApp da solo: la FE NON tocca notifiche.

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { API_URL } from '../tokens';

export type OrderStatus = 'pending'|'confirmed'|'preparing'|'ready'|'completed'|'cancelled';

export interface OrderHeader {
  id: number;
  customer_name: string;
  phone?: string | null;
  email?: string | null;
  note?: string | null;
  channel?: 'online'|'walkin'|'phone'|'admin'|'kiosk';
  status: OrderStatus;
  total: number;
  created_at: string; // ISO string or 'YYYY-MM-DD HH:mm:ss' UTC dal BE
  updated_at?: string | null;
}

export interface CreateOrderDto {
  customer_name: string;
  phone?: string | null;
  email?: string | null;
  note?: string | null;
  channel?: 'online'|'walkin'|'phone'|'admin'|'kiosk';
  items: Array<{ product_id?: number|null; name: string; qty: number; price: number; notes?: string|null }>;
  // opzionali per futuro:
  people?: number;
  scheduled_at?: string|null; // 'YYYY-MM-DD HH:mm:ss' UTC
}

export interface MenuItem {
  id?: number | string | null;
  name: string;
  price: number;
  category?: string | null;
}

@Injectable({ providedIn: 'root' })
export class OrdersApi {
  private http = inject(HttpClient);
  private base = inject(API_URL);

  list(opts?: { status?: OrderStatus|'all'; hours?: number; from?: string; to?: string; q?: string }): Observable<OrderHeader[]> {
    let p = new HttpParams();
    if (opts?.status && opts.status !== 'all') p = p.set('status', String(opts.status));
    if (opts?.hours !== undefined && opts.hours !== null) p = p.set('hours', String(opts.hours));
    if (opts?.from) p = p.set('from', opts.from);
    if (opts?.to) p = p.set('to', opts.to);
    if (opts?.q) p = p.set('q', opts.q);
    return this.http.get<OrderHeader[]>(`${this.base}/orders`, { params: p });
  }

  create(dto: CreateOrderDto): Observable<OrderHeader> {
    return this.http.post<OrderHeader>(`${this.base}/orders`, dto);
  }

  updateStatus(id: number, status: OrderStatus): Observable<OrderHeader> {
    return this.http.patch<OrderHeader>(`${this.base}/orders/${id}/status`, { status });
  }

  // Mock semplice se /api/products non esiste — restituisce un set minimo
  getMenu(): Observable<MenuItem[]> {
    return this.http.get<any>(`${this.base}/products`).pipe(
      map((rows: any[]) => {
        if (Array.isArray(rows) && rows.length) {
          // Mappo campi basilari (id, name, price). Se il BE ha shape diverso, qui è il punto da adattare.
          return rows
            .filter(r => (r?.is_active ?? 1) === 1)
            .map(r => ({
              id: (r.id ?? null),
              name: String(r.name ?? r.title ?? 'Prodotto'),
              price: Number(r.price ?? r.unit_price ?? 0),
              category: (r.category ?? r.cat ?? null)
            })) as MenuItem[];
        }
        // fallback mock
        return [
          { id: 1, name: 'Margherita', price: 6.5 },
          { id: 2, name: 'Diavola',    price: 7.5 },
          { id: 3, name: 'Acqua',      price: 1.5 },
        ] as MenuItem[];
      })
    );
  }

  // ===== SSE: aggiornamenti in tempo reale ==================================
  stream(cb: {
    onOpen?: () => void;
    onError?: (e: any) => void;
    onCreated?: (o: OrderHeader) => void;
    onStatus?: (p: { id: number; status: OrderStatus }) => void;
  }): EventSource {
    const es = new EventSource(`${this.base}/orders/stream`);
    es.addEventListener('open', () => cb.onOpen?.());
    es.addEventListener('error', (e) => cb.onError?.(e));
    es.addEventListener('created', (ev: any) => {
      try { cb.onCreated?.(JSON.parse(ev.data)); } catch {}
    });
    es.addEventListener('status', (ev: any) => {
      try { cb.onStatus?.(JSON.parse(ev.data)); } catch {}
    });
    return es;
  }
}
