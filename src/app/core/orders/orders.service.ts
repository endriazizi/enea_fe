// src/app/core/orders/orders.service.ts
// ============================================================================
// ORDERS API client (Http + SSE) — stile Endri (commenti lunghi, emoji)
// ============================================================================
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../core/tokens';
import { Observable } from 'rxjs';

export type OrderHeader = {
  id: number; customer_name: string; phone: string | null; email: string | null;
  people: number | null; scheduled_at: string | null; status: string; total: number;
  channel: string; note: string | null; created_at: string; updated_at: string | null;
};
export type OrderItem = {
  id: number; order_id: number; product_id: number | null; name: string;
  qty: number; price: number; notes: string | null; category?: string;
};
export type OrderFull = OrderHeader & { items: OrderItem[] };

export type MenuProduct = {
  id: number; name: string; description: string | null;
  price: number | string; is_active: 0 | 1; sort_order: number;
  category_id: number | null; category: string | null; icon?: string | null;
};

// Ingredienti collegati al prodotto (BASE)
export type ProductIngredientChip = {
  ingredient_id: number;
  name: string;
  is_default: 0 | 1;
  is_extra: 0 | 1;
  price_extra: number | null;
  allergen: 0 | 1;
  sort_order: number;
};

// Ingredienti GLOBALI (per gli Extra = ALL − BASE)
export type Ingredient = { id: number; name: string; price_extra: number | null };

export type OrderCreateItem = {
  product_id: number | null; name: string; qty: number; price: number; notes?: string | null;
};
export type OrderCreatePayload = {
  customer_name: string; phone?: string | null; email?: string | null;
  people?: number | null; scheduled_at?: string | null; note?: string | null;
  channel?: string; items: OrderCreateItem[];
};

@Injectable({ providedIn: 'root' })
export class OrdersApi {
  private http = inject(HttpClient);
  private base = inject(API_URL); // es. http://localhost:3000/api

  list(params: { hours?: number; from?: string; to?: string; status?: string; q?: string } = {}): Observable<OrderHeader[]> {
    const p: Record<string,string> = {};
    if (params.hours != null) p.hours = String(params.hours);
    if (params.from) p.from = params.from;
    if (params.to) p.to = params.to;
    if (params.status) p.status = params.status;
    if (params.q) p.q = params.q;
    return this.http.get<OrderHeader[]>(`${this.base}/orders`, { params: p });
  }

  getById(id: number): Observable<OrderFull> {
    return this.http.get<OrderFull>(`${this.base}/orders/${id}`);
  }

  updateStatus(id: number, status: string): Observable<{ ok: true }> {
    return this.http.patch<{ ok: true }>(`${this.base}/orders/${id}/status`, { status });
  }

  print(id: number): Observable<{ ok: boolean }> {
    return this.http.post<{ ok: boolean }>(`${this.base}/orders/${id}/print`, {});
  }

  stream(): EventSource {
    return new EventSource(`${this.base}/orders/stream`, { withCredentials: true });
  }

  getMenu(): Observable<MenuProduct[]> {
    return this.http.get<MenuProduct[]>(`${this.base}/products`);
  }

  create(payload: OrderCreatePayload): Observable<OrderFull> {
    return this.http.post<OrderFull>(`${this.base}/orders`, payload);
  }

  // === INGREDIENTI ===========================================================
  // Tutti gli ingredienti attivi (per "Extra globali")
  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(`${this.base}/ingredients`);
  }

  // Ingredienti del prodotto (BASE)
  getProductIngredients(productId: number): Observable<ProductIngredientChip[]> {
    return this.http.get<ProductIngredientChip[]>(
      `${this.base}/product-ingredients/by-product/${productId}`
    );
  }
}
