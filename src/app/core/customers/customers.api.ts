// src/app/core/customers/customers.api.ts
// Wrapper REST per /api/customers — accetta array o oggetto singolo (fallback)

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { API_URL } from '../../core/tokens';

export interface Customer {
  id: number;
  full_name?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  phone?: string | null;
  email?: string | null;
  note?: string | null;
  tags?: string | null;
  is_active?: number | boolean | null;
  orders_count?: number | null;
  total_spent?: number | null;
  last_order_at?: string | null;
}

@Injectable({ providedIn: 'root' })
export class CustomersApi {
  private http = inject(HttpClient);
  private base = inject(API_URL);

  private toArray = (res: any): Customer[] => {
    if (Array.isArray(res)) return res as Customer[];
    if (Array.isArray(res?.rows)) return res.rows as Customer[];
    if (Array.isArray(res?.data)) return res.data as Customer[];
    if (Array.isArray(res?.items)) return res.items as Customer[];
    if (res && typeof res === 'object' && 'id' in res) return [res as Customer]; // 👈 fallback
    return [];
  };

  list(q = '', limit = 50, offset = 0): Observable<Customer[]> {
    let params = new HttpParams()
      .set('limit', limit)
      .set('offset', offset)
      .set('_ts', Date.now().toString());
    if (q) params = params.set('q', q);
    return this.http.get<any>(`${this.base}/customers`, { params })
      .pipe(map(this.toArray));
  }

  get(id: number): Observable<Customer> {
    const params = new HttpParams().set('_ts', Date.now().toString());
    return this.http.get<any>(`${this.base}/customers/${id}`, { params })
      .pipe(map(res => (res?.data ?? res) as Customer));
  }
  getById(id: number) { return this.get(id); }

  create(payload: Partial<Customer>) {
    return this.http.post<Customer>(`${this.base}/customers`, payload);
  }
  update(id: number, payload: Partial<Customer>) {
    return this.http.put<Customer>(`${this.base}/customers/${id}`, payload);
  }
  disable(id: number) {
    return this.http.put<{ ok: true }>(`${this.base}/customers/${id}/disable`, {});
  }
  enable(id: number) {
    return this.http.put<{ ok: true }>(`${this.base}/customers/${id}/enable`, {});
  }
  orders(id: number) {
    const params = new HttpParams().set('_ts', Date.now().toString());
    return this.http.get<any>(`${this.base}/customers/${id}/orders`, { params })
      .pipe(map(this.toArray));
  }
}
