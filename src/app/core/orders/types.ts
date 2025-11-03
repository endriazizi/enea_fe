// src/app/core/orders/types.ts
// ============================================================================
// Tipi condivisi per Ordini (FE) — estesi per ingredienti/varianti
// - Aggiunta: ProductIngredient per chips (+/-) nel builder
// - Nessuna rottura sulle interfacce esistenti
// ============================================================================

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'completed'
  | 'cancelled';

// === Carrello / Creazione ====================================================

export interface OrderItemInput {
  product_id?: number | null;
  name: string;
  qty: number;
  price: number;           // € (BE DECIMAL(10,2))
  notes?: string | null;   // es. "SENZA cipolla, +olive"
}

export interface OrderHeader {
  id: number;
  customer_name?: string | null;
  phone?: string | null;
  email?: string | null;
  channel?: string | null;
  status: OrderStatus;
  status_note?: string | null;
  note?: string | null;
  created_at?: string | null;
  total?: number | null;
}

export interface Order {
  id: number;
  items: Array<{
    id: number;
    name: string;
    qty: number;
    price: number;
    notes?: string | null;
  }>;
  total?: number | null;
}

export interface OrderInput {
  customer_name?: string | null;
  phone?: string | null;
  note?: string | null;
  items: OrderItemInput[];
}

// === Menu (catalogo) =========================================================

export interface MenuCategory {
  id: number;
  name: string;
  sort?: number | null;
}

export interface MenuItem {
  id: number;
  category_id: number;
  name: string;
  price_cents: number; // per il carrello locale (cent)
  description?: string | null;
  sort?: number | null;
}

// === Ingredienti per chips ===================================================

export interface ProductIngredient {
  id: number;                 // id ingrediente (o ingredient_id lato BE)
  name: string;               // es. "mozzarella"
  included: boolean;          // true = incluso di default; false = non incluso
  is_extra?: 0 | 1 | boolean; // 1/true = extra opzionale
  price_extra_cents?: number | null;
  sort_order?: number | null;
}
