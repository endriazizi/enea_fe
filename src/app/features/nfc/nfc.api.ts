// C:\Users\Endri Azizi\progetti-dev\my_dev\fe\src\app\features\nfc\nfc.api.ts
// ============================================================================
// NfcApi — service FE per NFC/QR
// - GET  /api/rooms          (se 404 → derivo da /api/tables)
// - GET  /api/tables?room_id=.
// - POST /api/nfc/bind
// - GET  /api/nfc/resolve?token=.   → { table_id, session_id, ... }
// - POST /api/nfc/session/close       → chiude la sessione attiva del tavolo
// - GET  /api/nfc/session/cart?session_id=SID
// - PUT  /api/nfc/session/cart { session_id, version, cart }
// - GET  /api/nfc/session/active?table_id=. → badge “Sessione attiva da …”
//   (alias retro-compat: entry(token) → resolve(token))
// ============================================================================

import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, of, throwError, firstValueFrom } from 'rxjs';

// === Tipi base ==============================================================

export interface NfcRoom {
  id: number;
  name?: string;
}

export interface NfcTable {
  id: number;
  room_id: number;
  table_number: number;
  label?: string;
  capacity?: number;
}

export interface NfcBindPayload {
  table_id: number;
  note?: string;
}

export interface NfcBindResult {
  token: string;
  url: string;
  qr_svg?: string | null;
}

export interface NfcResolveResult {
  table_id: number;
  room_id?: number;
  table_number?: number;
  reservation_id?: number | null;
  session_id?: number | null;
  redirect_url?: string | null;
  started_at?: string | null;
  room_name?: string | null;
}

// snapshot carrello sessione
export interface NfcSessionCartGet {
  ok: boolean;
  session_id: number;
  version: number;
  cart: any | null;
  updated_at?: string | null;
}

export interface NfcSessionCartSave {
  ok: boolean;
  session_id: number;
  version: number;
  updated_at?: string | null;
}

@Injectable({ providedIn: 'root' })
export class NfcApi {
  private http = inject(HttpClient);

  // === Rooms & Tables =======================================================
  /** Lista sale. Se /api/rooms non esiste, derivo da /api/tables. */
  listRooms() {
    return this.http.get<NfcRoom[]>('/api/rooms').pipe(
      catchError(err => {
        console.warn('⚠️ [NfcApi] /api/rooms non disponibile, provo a derivare da /api/tables', err);
        return this.http.get<any[]>('/api/tables').pipe(
          map(rows => {
            const mapRooms = new Map<number, NfcRoom>();
            (rows || []).forEach((t: any) => {
              const id = Number(t.room_id || 0) || 0;
              if (!id) return;
              if (!mapRooms.has(id)) {
                mapRooms.set(id, {
                  id,
                  name: t.room_name || `Sala ${id}`,
                });
              }
            });
            return Array.from(mapRooms.values());
          })
        );
      })
    );
  }

  /** Lista tavoli, opzionalmente filtrata per room_id. */
  listTables(roomId?: number) {
    if (!roomId) {
      return this.http.get<NfcTable[]>('/api/tables').pipe(
        map((rows) => (rows || []).map(this.enrichTable))
      );
    }
    const params = new HttpParams().set('room_id', String(roomId));
    return this.http.get<NfcTable[]>('/api/tables', { params }).pipe(
      map((rows) => (rows || []).map(this.enrichTable))
    );
  }

  /** Normalizza la shape del tavolo (id, room_id, table_number, ecc.). */
  private enrichTable = (raw: any): NfcTable => ({
    id: Number(raw.id),
    room_id: Number(raw.room_id || 0),
    table_number: Number(raw.table_number || raw.table_no || raw.number),
    label: raw.label || raw.name || raw.caption || undefined,
    capacity: raw.capacity ? Number(raw.capacity) : undefined,
  });

  // === Bind / Resolve =======================================================

  /** Crea/rigenera token NFC/QR per un tavolo. */
  async bind(payload: NfcBindPayload): Promise<NfcBindResult> {
    try {
      const res = await firstValueFrom(
        this.http.post<NfcBindResult>('/api/nfc/bind', payload)
      );
      console.log('🧲 [NfcApi] bind ▶️', res);
      return res;
    } catch (e: any) {
      console.error('❌ [NfcApi] bind error', e);
      throw e;
    }
  }

  /** Resolve di un token NFC/QR → info tavolo + sessione. */
  async resolve(token: string): Promise<NfcResolveResult> {
    const params = new HttpParams().set('token', token);
    try {
      const res = await firstValueFrom(
        this.http.get<NfcResolveResult>('/api/nfc/resolve', { params })
      );
      console.log('🧲 [NfcApi] resolve ▶️', res);
      return res;
    } catch (e: any) {
      console.error('❌ [NfcApi] resolve error', e);
      throw e;
    }
  }

  /** Alias retro-compat: entry(token) → resolve(token). */
  async entry(token: string): Promise<NfcResolveResult> {
    return this.resolve(token);
  }

  // === Sessione tavolo (open/close lato BE) =================================

  /**
   * Chiude la sessione attiva per table_id, se esiste.
   * Ritorna { ok:true, closed:0|1, session_id?:number|null }.
   */
  async closeSession(table_id: number): Promise<{ ok: boolean; closed?: number; session_id?: number | null }> {
    try {
      const res = await firstValueFrom(
        this.http.post<{ ok: boolean; closed?: number; session_id?: number | null }>(
          '/api/nfc/session/close',
          { table_id }
        )
      );
      console.log('🧲 [NfcApi] closeSession ▶️', res);
      return res;
    } catch (e: any) {
      console.error('❌ [NfcApi] closeSession error', e);
      throw e;
    }
  }

  // === Carrello sessione (DB snapshot) ======================================

  /**
   * GET /api/nfc/session/cart?session_id=SID
   * - Se 200: ritorna snapshot { ok, session_id, version, cart, updated_at }
   * - Se 404: ritorna null (nessun carrello salvato per quella sessione)
   */
  async getSessionCart(session_id: number): Promise<NfcSessionCartGet | null> {
    const params = new HttpParams().set('session_id', String(session_id));
    try {
      const res = await firstValueFrom(
        this.http.get<NfcSessionCartGet>('/api/nfc/session/cart', { params })
      );
      console.log('🧲 [NfcApi] getSessionCart ▶️', res);
      return res;
    } catch (e: any) {
      if (e?.status === 404) {
        console.warn('⚠️ [NfcApi] getSessionCart 404 → nessun carrello salvato', e);
        return null;
      }
      console.error('❌ [NfcApi] getSessionCart error', e);
      throw e;
    }
  }

  /**
   * PUT /api/nfc/session/cart { session_id, version, cart }
   * - Implementa optimistic locking via version.
   */
  async saveSessionCart(session_id: number, version: number, cart: any): Promise<NfcSessionCartSave> {
    try {
      const res = await firstValueFrom(
        this.http.put<NfcSessionCartSave>('/api/nfc/session/cart', {
          session_id,
          version,
          cart,
        })
      );
      console.log('🧲 [NfcApi] saveSessionCart ▶️', res);
      return res;
    } catch (e: any) {
      console.error('❌ [NfcApi] saveSessionCart error', e);
      throw e;
    }
  }

  // === Sessione attiva per tavolo (badge in Lista Tavoli / Board) ===========

  /**
   * GET /api/nfc/session/active?table_id=XX
   * - Se non c'è sessione: 200 { ok:true, active:false }
   * - Se c'è: 200 { ok:true, active:true, session_id, started_at, cart_updated_at? }
   *
   * Qui normalizzo in un NfcResolveResult "ridotto" per riusare la shape.
   */
  async getActiveSessionForTable(table_id: number): Promise<NfcResolveResult | null> {
    const params = new HttpParams().set('table_id', String(table_id));
    try {
      const res = await firstValueFrom(
        this.http.get<{
          ok: boolean;
          active: boolean;
          session_id?: number | null;
          started_at?: string | null;
          cart_updated_at?: string | null;
        }>('/api/nfc/session/active', { params })
      );
      console.log('🧲 [NfcApi] getActiveSessionForTable ▶️', res);

      if (!res?.active || !res.session_id) return null;

      return {
        table_id,
        session_id: res.session_id,
        started_at: res.started_at || null,
      };
    } catch (e: any) {
      if (e?.status === 404) {
        console.warn('⚠️ [NfcApi] getActiveSessionForTable 404 → nessuna sessione attiva', e);
        return null;
      }
      console.error('❌ [NfcApi] getActiveSessionForTable error', e);
      throw e;
    }
  }
}
