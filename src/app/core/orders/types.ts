// src/app/core/orders/types.ts
// ============================================================================
// Tipi condivisi Ordini (FE)
// - Header / Item / Input / Status
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
  price: number;           // € (BE DECIMAL(10,2))
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

// ==== menu per il builder ====================================================

export interface MenuCategory {
  id: number;
  name: string;
  sort?: number | null;
}

export interface MenuItem {
  id: number;
  cat_id?: number | null;
  name: string;
  price: number;
  desc?: string | null;
}
