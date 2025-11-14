// C:\Users\Endri Azizi\progetti-dev\my_dev\fe\src\app\features\orders
// ============================================================================
// NfcApi — service FE per NFC/QR
// - GET  /api/rooms          (se 404 → derivo da /api/tables)
// - GET  /api/tables?room_id=...
// - POST /api/nfc/bind
// - GET  /api/nfc/resolve?token=...   → { table_id, session_id, ... }
// - POST /api/nfc/session/close       → chiude la sessione attiva del tavolo
// - 🆕 GET  /api/nfc/session/cart?session_id=SID
// - 🆕 PUT  /api/nfc/session/cart { session_id, version, cart }
// - 🆕 GET  /api/nfc/session/active?table_id=... → badge “Sessione attiva da …”
//   (alias retro-compat: entry(token) → resolve(token))
// ============================================================================

import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, of, throwError, firstValueFrom } from 'rxjs';

export interface NfcRoom { id: number; name?: string; }
export interface NfcTable { id: number; room_id: number; table_number: number; label?: string; capacity?: number; }
export interface NfcBindPayload { table_id: number; note?: string; }
export interface NfcBindResult { token: string; url: string; qr_svg?: string | null; }
export interface NfcResolveResult {
  table_id: number;
  room_id?: number;
  table_number?: number;
  reservation_id?: number | null;
  session_id?: number | null;   // 👈 NEW
  redirect_url?: string;
}

export interface NfcSessionCartGet {
  ok: boolean;
  session_id: number;
  version: number;
  cart: any | null;
  updated_at?: string | null;
}
export interface NfcSessionCartPut { ok: boolean; session_id: number; version: number; updated_at?: string | null; }

@Injectable({ providedIn: 'root' })
export class NfcApi {
  private http = inject(HttpClient);

  listRooms() {
    return this.http.get<any[]>('/api/rooms').pipe(
      map(rows => rows?.map(r => ({
        id: r.id ?? r.room_id ?? r.ID,
        name: r.name ?? r.label ?? `Sala ${r.id ?? r.room_id}`
      })) as NfcRoom[]),
      catchError(err => {
        if (err.status === 404) {
          console.warn('ℹ️ [NFC] /api/rooms non presente → derivo da /api/tables');
          return this.http.get<NfcTable[]>('/api/tables').pipe(
            map(tables => {
              const seen = new Set<number>();
              const rooms: NfcRoom[] = [];
              for (const t of tables || []) {
                if (!seen.has(t.room_id)) { seen.add(t.room_id); rooms.push({ id: t.room_id, name: `Sala ${t.room_id}` }); }
              }
              return rooms;
            })
          );
        }
        return throwError(() => err);
      })
    );
  }

  listTables(roomId?: number) {
    const params = roomId ? new HttpParams().set('room_id', String(roomId)) : undefined;
    return this.http.get<NfcTable[]>('/api/tables', { params }).pipe(
      map(rows => {
        const arr = rows || [];
        return roomId ? arr.filter(t => t.room_id === roomId) : arr;
      })
    );
  }

  bind(payload: NfcBindPayload) {
    return this.http.post<NfcBindResult>('/api/nfc/bind', payload).pipe(
      catchError(err => {
        if (err.status === 404) {
          const tok = 'TEST_' + Math.random().toString(36).slice(2, 10).toUpperCase();
          console.warn('🧪 [NFC] /api/nfc/bind 404 → fallback FE (token finto)');
          return of({ token: tok, url: `/t/${tok}`, qr_svg: null } as NfcBindResult);
        }
        return throwError(() => err);
      })
    );
  }

  async resolve(token: string): Promise<NfcResolveResult> {
    const params = new HttpParams().set('token', token);
    const url = `/api/nfc/resolve`;
    console.log('📡 [NFC API] resolve →', url, { token });
    return await firstValueFrom(this.http.get<NfcResolveResult>(url, { params }));
  }

  closeSession(table_id: number) {
    return this.http.post<{ ok: boolean; closed: number; session_id?: number }>(
      '/api/nfc/session/close', { table_id, by: 'admin' }
    );
  }

  // ===================== Session Cart =====================
  async getSessionCart(sessionId: number): Promise<NfcSessionCartGet> {
    const params = new HttpParams().set('session_id', String(sessionId));
    return await firstValueFrom(this.http.get<NfcSessionCartGet>('/api/nfc/session/cart', { params }));
  }

  async saveSessionCart(sessionId: number, version: number, cart: any): Promise<NfcSessionCartPut> {
    return await firstValueFrom(this.http.put<NfcSessionCartPut>('/api/nfc/session/cart', {
      session_id: sessionId, version, cart
    }));
  }

  // ===================== Session Active (badge Tavoli) =====================
  getActiveSession(tableId: number) {
    const params = new HttpParams().set('table_id', String(tableId));
    return this.http.get<{ ok:boolean; active:boolean; session_id?:number; started_at?:string; updated_at?:string|null }>(
      '/api/nfc/session/active', { params }
    );
  }

  // Retro-compat
  async entry(token: string): Promise<NfcResolveResult> {
    console.warn('ℹ️ [NFC API] entry(token) deprecato → uso resolve(token).');
    return this.resolve(token);
  }
}
