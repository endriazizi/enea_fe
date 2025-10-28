// src/app/core/orders/orders.service.ts
//
// OrdersApi (FE) — Tipi + chiamate HTTP + SSE
// - Filtri server-side: status/hours/q (se il BE li supporta; altrimenti ignora)
// - getMenu() con fallback mock se 404
// - stream() via EventSource (SSE)
// Stile: commenti lunghi, log con emoji, nessuna sorpresa.

import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { API_URL } from '../tokens';

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'completed'
  | 'cancelled';

export interface OrderHeader {
  id: number;
  customer_name: string;
  phone?: string | null;
  email?: string | null;
  total: number;
  status: OrderStatus;
  channel?: string | null;
  created_at?: string | null;
}

export interface OrderItem {
  product_id?: number | null;
  name: string;
  qty: number;
  price: number;
  notes?: string | null;
}

export interface MenuItem {
  id: number | string;
  name: string;
  price: number;
  cat?: string | null;
}

// 👈 Nome uniforme usato ovunque
export interface CreateOrderDto {
  customer_name: string;
  phone?: string | null;
  email?: string | null;
  people?: number | null;
  scheduled_at?: string | null;
  note?: string | null;
  channel?: string | null; // es. 'admin'
  items: OrderItem[];
}

export interface OrdersListParams {
  status?: OrderStatus | 'all';
  hours?: number;
  q?: string;
}

@Injectable({ providedIn: 'root' })
export class OrdersApi {
  constructor(
    private http: HttpClient,
    @Inject(API_URL) private baseUrl: string
  ) {}

  list(params?: OrdersListParams): Observable<OrderHeader[]> {
    let hp = new HttpParams();
    if (params?.status && params.status !== 'all') hp = hp.set('status', params.status);
    if (params?.hours) hp = hp.set('hours', String(params.hours));
    if (params?.q) hp = hp.set('q', params.q);

    return this.http.get<OrderHeader[]>(`${this.baseUrl}/orders`, { params: hp }).pipe(
      catchError((e) => {
        console.warn('📦 [OrdersApi] list() KO → []', e);
        return of([]);
      })
    );
  }

  get(id: number): Observable<OrderHeader | null> {
    return this.http.get<OrderHeader>(`${this.baseUrl}/orders/${id}`).pipe(
      catchError((e) => {
        console.warn('📦 [OrdersApi] get() KO', e);
        return of(null);
      })
    );
  }

  create(dto: CreateOrderDto): Observable<OrderHeader> {
    return this.http.post<OrderHeader>(`${this.baseUrl}/orders`, dto).pipe(
      map((r) => {
        console.log('✅ [OrdersApi] create OK', r);
        return r;
      })
    );
  }

  updateStatus(id: number, status: OrderStatus): Observable<OrderHeader> {
    return this.http
      .patch<OrderHeader>(`${this.baseUrl}/orders/${id}/status`, { status })
      .pipe(map((r) => (console.log('🔁 updateStatus OK', { id, status }), r)));
  }

  getMenu(): Observable<MenuItem[]> {
    return this.http.get<any[]>(`${this.baseUrl}/products`).pipe(
      map((rows) =>
        (rows || []).map((p) => ({
          id: p.id ?? p.product_id ?? p.code ?? String(p.name),
          name: p.name,
          price: Number(p.price ?? p.list_price ?? 0),
          cat: p.category ?? null
        }))
      ),
      catchError((e) => {
        console.warn('🍕 [OrdersApi] getMenu() 404/KO → mock', e);
        const mock: MenuItem[] = [
          { id: 1, name: 'Margherita', price: 6.5 },
          { id: 2, name: 'Diavola',    price: 7.5 },
          { id: 3, name: 'Acqua 0.5L', price: 1.5 },
        ];
        return of(mock);
      })
    );
  }

  stream(handlers: {
    onCreated?: (o: OrderHeader) => void;
    onStatus?: (p: { id: number; status: OrderStatus }) => void;
    onError?: (e: any) => void;
  }): EventSource {
    const es = new EventSource(`${this.baseUrl}/orders/stream`, { withCredentials: false });

    es.addEventListener('created', (ev: MessageEvent) => {
      try { handlers.onCreated?.(JSON.parse(ev.data)); } catch (e) { console.warn('🧵 created parse KO', e); }
    });

    es.addEventListener('status', (ev: MessageEvent) => {
      try { handlers.onStatus?.(JSON.parse(ev.data)); } catch (e) { console.warn('🧵 status parse KO', e); }
    });

    es.onerror = (e) => handlers.onError?.(e);
    return es;
  }
}

export { OrdersApi as default };
