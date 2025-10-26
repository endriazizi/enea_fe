// src/app/core/orders/types.ts
// ============================================================================
// Tipi condivisi per Ordini (FE)
// - Ordini header / item / input / status
// - Menu (categoria + item) per il builder
// ============================================================================

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'completed'
  | 'cancelled';

export interface OrderItemInput {
  product_id?: number | null;
  name: string;
  qty: number;
  price: number;           // € interi/decimali (BE usa DECIMAL(10,2))
  notes?: string | null;
}

export interface OrderHeader {
  id: number;
  customer_name: string;
  phone?: string | null;
  email?: string | null;
  people?: number | null;
  scheduled_at?: string | null; // "YYYY-MM-DD HH:mm:ss"
  note?: string | null;
  channel?: 'online' | 'walkin' | 'phone' | 'admin' | 'kiosk';
  status: OrderStatus;
  total: number;
  created_at?: string;
  updated_at?: string | null;
}

export interface Order extends OrderHeader {
  items: Array<{
    id: number;
    order_id: number;
    product_id?: number | null;
    name: string;
    qty: number;
    price: number;
    notes?: string | null;
    created_at?: string;
  }>;
}

export interface OrderInput {
  customer_name: string;
  phone?: string | null;
  email?: string | null;
  people?: number | null;
  scheduled_at?: string | null;
  note?: string | null;
  channel?: 'online' | 'walkin' | 'phone' | 'admin' | 'kiosk';
  items: OrderItemInput[];
}

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
