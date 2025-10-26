// src/app/core/orders/orders.service.ts
// ============================================================================
// Service FE - Ordini (API dell’admin)
// - create(order): POST nuovo ordine
// - list(): GET intestazioni ordini (per la live)
// - updateStatus(id, status): PUT stato
// - stream(): SSE live /api/orders/stream
// ============================================================================

import { Injectable, Inject, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { API_URL } from '../tokens';
import { Order, OrderHeader, OrderInput, OrderStatus, MenuCategory, MenuItem } from './types';

@Injectable({ providedIn: 'root' })
export class OrdersApi {
  private http = inject(HttpClient);
  constructor(@Inject(API_URL) private baseUrl: string) {}

  // (opzionale) menu per il builder; se non disponibile, usa mock lato FE
  getMenu(): Observable<{ categories: MenuCategory[]; items: MenuItem[] }> {
    return this.http.get<{ categories: MenuCategory[]; items: MenuItem[] }>(`${this.baseUrl}/orders/menu`);
  }

  create(dto: OrderInput): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}/orders`, dto);
  }

  list(params?: { status?: OrderStatus | 'all' }): Observable<OrderHeader[]> {
    let p = new HttpParams();
    if (params?.status && params.status !== 'all') p = p.set('status', params.status);
    return this.http.get<OrderHeader[]>(`${this.baseUrl}/orders`, { params: p });
  }

  updateStatus(id: number, status: OrderStatus): Observable<OrderHeader> {
    return this.http.put<OrderHeader>(`${this.baseUrl}/orders/${id}/status`, { status });
  }

  // ===== SSE live =====
  stream(handlers: {
    onOpen?: () => void;
    onError?: (e: any) => void;
    onCreated?: (o: OrderHeader) => void;
    onStatus?: (p: { id: number; status: OrderStatus }) => void;
  }): EventSource {
    const es = new EventSource(`${this.baseUrl}/orders/stream`);
    es.onopen = () => handlers.onOpen?.();
    es.onerror = (e) => handlers.onError?.(e as any);
    es.addEventListener('order-created', (ev) => {
      try { handlers.onCreated?.(JSON.parse((ev as MessageEvent).data)); } catch {}
    });
    es.addEventListener('order-status', (ev) => {
      try { handlers.onStatus?.(JSON.parse((ev as MessageEvent).data)); } catch {}
    });
    return es;
  }
}
