// ============================================================================
// Service FE - Prenotazioni
// - Hard delete: remove(id,{force?,notify?})
// - Compat: updateStatus(id, action, reason?) e printDaily({date,status})
// - Lookup: listRooms(), listTablesByRoom(roomId), listAllTablesAcrossRooms()
// - 🆕 changeTable(id, table_id): PUT /reservations/:id/table con fallback su update(...)
// - 🆕 checkIn(id) / checkOut(id): POST /:id/checkin|checkout con fallback su updateStatus
// - Fix RxJS imports per listAllTablesAcrossRooms
// ============================================================================

import { Injectable, inject, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, catchError, switchMap, forkJoin, of, throwError } from 'rxjs';
import { API_URL } from '../tokens';

export type ReservationStatus = 'pending' | 'accepted' | 'rejected' | 'cancelled';

export interface Reservation {
  id: number;

  // anagrafica/contatti (presenti anche in BE)
  customer_first?: string | null;
  customer_last?: string | null;
  display_name?: string | null;
  phone?: string | null;
  email?: string | null;

  party_size: number;
  start_at: string;           // ISO
  end_at?: string | null;     // ISO

  room_id?: number | null;
  table_id?: number | null;

  status: ReservationStatus;
  notes?: string | null;

  // audit/tempi
  created_at?: string;
  updated_at?: string;

  // 🆕 tempi sala
  checkin_at?: string | null;
  checkout_at?: string | null;
  dwell_sec?: number | null;

  // opzionale (tracciamento server: strada B)
  created_by?: string | null;
  updated_by?: string | null;

  // compat template/lista
  table_number?: number | null;
  table_name?: string | null;
}

export interface Room { id: number; name: string; }

export interface Table {
  id: number;
  room_id?: number;
  table_number?: number;
  seats?: number;

  // compat UI
  name?: string;
  label?: string | null;
  capacity?: number | null;
}

export interface ListFilter {
  from?: string; // YYYY-MM-DD
  to?: string;   // YYYY-MM-DD
  status?: ReservationStatus | 'all';
  q?: string;
}

export interface CountByStatusRes {
  pending: number;
  accepted: number;
  rejected: number;
  cancelled: number;
}

export type StatusAction = 'accept' | 'reject' | 'cancel' | 'restore' | 'complete';
export interface StatusChangeBody {
  action: StatusAction;
  reason?: string;
  notify?: boolean;
  email?: string;
  reply_to?: string;
  whatsapp?: boolean;
}

export type CreateReservationPayload = Partial<Reservation>;

@Injectable({ providedIn: 'root' })
export class ReservationsApi {
  private http = inject(HttpClient);
  constructor(@Inject(API_URL) private baseUrl: string) {}

  // -------------------- Helpers ---------------------------------------------

  private enrichTable = (t: Table): Table => ({
    ...t,
    label: t.label ?? t.name ?? (t.table_number != null ? `Tavolo ${t.table_number}` : null),
    capacity: t.capacity ?? (t.seats != null ? Number(t.seats) : null),
  });

  private unwrapReservation = <T = any>(res: any): T => (res?.reservation ?? res);

  // -------------------- CRUD -------------------------------------------------

  list(filter: ListFilter): Observable<Reservation[]> {
    let params = new HttpParams();
    if (filter.from)   params = params.set('from', filter.from);
    if (filter.to)     params = params.set('to', filter.to);
    if (filter.status && filter.status !== 'all') params = params.set('status', filter.status);
    if (filter.q)      params = params.set('q', filter.q);
    return this.http.get<Reservation[]>(`${this.baseUrl}/reservations`, { params });
  }

  byId(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.baseUrl}/reservations/${id}`);
  }

  create(dto: CreateReservationPayload): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.baseUrl}/reservations`, dto);
  }

  update(id: number, dto: Partial<Reservation>): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.baseUrl}/reservations/${id}`, dto);
  }

  /** 🗑️ Hard delete — supporta ?force=&notify= */
  remove(id: number, opts?: { force?: boolean; notify?: boolean }): Observable<{ ok: boolean }> {
    let params = new HttpParams();
    if (opts?.force !== undefined)  params = params.set('force',  String(!!opts.force));
    if (opts?.notify !== undefined) params = params.set('notify', String(!!opts.notify));
    return this.http.delete<{ ok: boolean }>(`${this.baseUrl}/reservations/${id}`, { params });
  }

  // -------------------- Stato & Notifiche -----------------------------------

  updateStatus(id: number, body: StatusChangeBody): Observable<Reservation>;
  updateStatus(id: number, action: StatusAction, reason?: string): Observable<Reservation>;
  updateStatus(id: number, a: any, b?: any): Observable<Reservation> {
    const payload = typeof a === 'string' ? { action: a, reason: b } : a;
    return this.http
      .put<any>(`${this.baseUrl}/reservations/${id}/status`, payload)
      .pipe(map(res => this.unwrapReservation<Reservation>(res)));
  }

  rejectAndNotify(
    id: number,
    reason: string,
    extra?: { email?: string; reply_to?: string; whatsapp?: boolean }
  ): Observable<{ ok: boolean }> {
    return this.http.post<{ ok: boolean }>(`${this.baseUrl}/reservations/${id}/reject-notify`, {
      reason, ...extra
    });
  }

  // -------------------- Stampe ----------------------------------------------

  printDaily(arg1: any, maybeStatus?: ReservationStatus | 'all') {
    const payload = typeof arg1 === 'string'
      ? { date: arg1, status: (maybeStatus || 'all') }
      : arg1;
    return this.http.post(`${this.baseUrl}/reservations/print/daily`, payload)
      .pipe(map(() => ({ ok: true })));
  }

  printPlacecards(date: string, status: ReservationStatus | 'all' = 'accepted') {
    return this.http.post(`${this.baseUrl}/reservations/print/placecards`, { date, status })
      .pipe(map(() => ({ ok: true })));
  }

  printPlacecardOne(id: number) {
    return this.http.post(`${this.baseUrl}/reservations/${id}/print/placecard`, {})
      .pipe(map(() => ({ ok: true })));
  }

  // -------------------- Supporto UI / Lookup --------------------------------

  listRooms(): Observable<Room[]> {
    const primary = this.http.get<Room[]>(`${this.baseUrl}/rooms`);
    const fallback = () => this.http.get<Room[]>(`${this.baseUrl}/rooms`);
    return primary.pipe(catchError(() => fallback()));
  }

  listTablesByRoom(roomId: number): Observable<Table[]> {
    const primary = this.http.get<Table[]>(`${this.baseUrl}/reservations/support/tables/by-room/${roomId}`);
    const fallback = () => this.http.get<Table[]>(`${this.baseUrl}/tables/by-room/${roomId}`);
    return primary.pipe(
      catchError(() => fallback()),
      map(rows => (rows || []).map(this.enrichTable))
    );
  }

  rooms(): Observable<Room[]> { return this.listRooms(); }

  tables(roomId?: number): Observable<Table[]> {
    if (!roomId) {
      return this.http.get<Table[]>(`${this.baseUrl}/tables`).pipe(
        map((rows) => (rows || []).map(this.enrichTable))
      );
    }
    const params = new HttpParams().set('room_id', String(roomId));
    return this.http.get<Table[]>(`${this.baseUrl}/tables`, { params }).pipe(
      map((rows) => (rows || []).map(this.enrichTable))
    );
  }

  countByStatus(params: { from: string; to: string }): Observable<CountByStatusRes> {
    const p = new HttpParams().set('from', params.from).set('to', params.to);
    return this.http.get<CountByStatusRes>(`${this.baseUrl}/reservations/support/count-by-status`, { params: p })
      .pipe(catchError(() => this.http.get<CountByStatusRes>(`${this.baseUrl}/support/count-by-status`, { params: p })));
  }

  // === TAVOLI: ottiene "tutti" i tavoli con room_name ========================
  listAllTablesAcrossRooms(): Observable<(Table & { room_name?: string })[]> {
    return this.listRooms().pipe(
      switchMap((rooms) => {
        if (!rooms || !rooms.length) return of([]);
        const calls = rooms.map(r => this.listTablesByRoom(r.id).pipe(
          map(rows => (rows || []).map(t => ({ ...t, room_name: r.name })))
        ));
        return forkJoin(calls).pipe(map((chunks: (Table & { room_name?: string })[][]) => chunks.flat()));
      })
    );
  }

  // === 🆕 Sposta prenotazione su un altro tavolo =============================
  changeTable(id: number, table_id: number): Observable<Reservation> {
    const primary = this.http.put<any>(`${this.baseUrl}/reservations/${id}/table`, { table_id });
    return primary.pipe(
      map(res => this.unwrapReservation<Reservation>(res)),
      catchError(() => this.update(id, { table_id }))
    );
  }

  // === 🆕 CHECK-IN / CHECK-OUT ===============================================

  /**
   * Check-in esplicito:
   * - prova POST /reservations/:id/checkin { at? }
   * - fallback su updateStatus(id,'accept') se 404/501 o rotta assente
   * - unwrap {reservation} se il BE incapsula
   */
  checkIn(id: number, at?: string): Observable<Reservation> {
    return this.http.post<any>(`${this.baseUrl}/reservations/${id}/checkin`, at ? { at } : {})
      .pipe(
        map(res => this.unwrapReservation<Reservation>(res)),
        catchError((err) => {
          // degrado solo se è rotta mancante/501
          const code = Number(err?.status || 0);
          if (code === 404 || code === 501) {
            return this.updateStatus(id, 'accept');
          }
          return throwError(() => err);
        })
      );
  }

  /**
   * Check-out esplicito:
   * - prova POST /reservations/:id/checkout { at? }
   * - fallback su updateStatus(id,'complete') se 404/501
   * - unwrap {reservation}
   */
  checkOut(id: number, at?: string): Observable<Reservation> {
    return this.http.post<any>(`${this.baseUrl}/reservations/${id}/checkout`, at ? { at } : {})
      .pipe(
        map(res => this.unwrapReservation<Reservation>(res)),
        catchError((err) => {
          const code = Number(err?.status || 0);
          if (code === 404 || code === 501) {
            return this.updateStatus(id, 'complete');
          }
          return throwError(() => err);
        })
      );
  }
}
