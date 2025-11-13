// ============================================================================
// NfcApi — service FE per NFC/QR
// - GET  /api/rooms          (se 404 → derivo da /api/tables)
// - GET  /api/tables?room_id=...
// - POST /api/nfc/bind       (se 404 → fallback FE di test)
// - GET  /api/nfc/resolve?token=...   ✅ endpoint corretto
//   (alias retro-compat: entry(token) → resolve(token))
// ============================================================================

import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, of, throwError, firstValueFrom } from 'rxjs';

export interface NfcRoom { id: number; name?: string; }
export interface NfcTable { id: number; room_id: number; table_number: number; label?: string; capacity?: number; }
export interface NfcBindPayload { table_id: number; note?: string; }
export interface NfcBindResult { token: string; url: string; qr_svg?: string | null; }
export interface NfcResolveResult { table_id: number; redirect_url?: string; }

@Injectable({ providedIn: 'root' })
export class NfcApi {
  private http = inject(HttpClient);

  // ---- ROOMS -------------------------------------------------------
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

  // ---- TABLES ------------------------------------------------------
  listTables(roomId?: number) {
    const params = roomId ? new HttpParams().set('room_id', String(roomId)) : undefined;
    return this.http.get<NfcTable[]>('/api/tables', { params }).pipe(
      map(rows => {
        const arr = rows || [];
        return roomId ? arr.filter(t => t.room_id === roomId) : arr;
      })
    );
  }

  // ---- BIND --------------------------------------------------------
  bind(payload: NfcBindPayload) {
    return this.http.post<NfcBindResult>('/api/nfc/bind', payload).pipe(
      catchError(err => {
        if (err.status === 404) {
          // Fallback FE per test rapido
          const tok = 'TEST_' + Math.random().toString(36).slice(2, 10).toUpperCase();
          console.warn('🧪 [NFC] /api/nfc/bind 404 → fallback FE (token finto)');
          return of({ token: tok, url: `/t/${tok}`, qr_svg: null } as NfcBindResult);
        }
        return throwError(() => err);
      })
    );
  }

  // ---- RESOLVE token (endpoint corretto) ---------------------------
  // GET /api/nfc/resolve?token=XYZ
  async resolve(token: string): Promise<NfcResolveResult> {
    const params = new HttpParams().set('token', token);
    const url = `/api/nfc/resolve`;
    console.log('📡 [NFC API] resolve →', url, { token });
    return await firstValueFrom(this.http.get<NfcResolveResult>(url, { params }));
  }

  // ---- Alias RETRO-COMPAT -----------------------------------------
  // Qualche codice vecchio potrebbe ancora chiamare entry(token).
  // Inoltro su resolve(token) per evitare 404 su /api/nfc/entry/:token
  async entry(token: string): Promise<NfcResolveResult> {
    console.warn('ℹ️ [NFC API] entry(token) deprecato → uso resolve(token).');
    return this.resolve(token);
  }
}
