// src/app/core/reservations/reservations.service.ts
//
// Service unico per:
//  - Prenotazioni (list/byId/create/update/delete, status, stampa)
//  - Supporto UI: Rooms e Tables (lista, per sala, cambio stato)
//
// Stile: commenti lunghi, tipi chiari, niente sorprese.

import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { API_URL } from '../tokens';

// ---------------------- Tipi Rooms/Tables ----------------------

export interface Room {
  id: number;
  name: string;
  is_active?: 0 | 1 | boolean;
  sort_order?: number | null;
}

export type TableStatus = 'free' | 'reserved' | 'occupied';

export interface Table {
  id: number;
  room_id: number | null;
  table_number?: number | null;
  capacity?: number | null;     // nel BE seats -> capacity
  status?: TableStatus;
  label?: string;               // alias "Tavolo <n>" generato dal BE (opzionale)
  updated_at?: string;          // ISO
}

// ---------------------- Tipi Reservations ----------------------

export type ReservationStatus = 'pending' | 'accepted' | 'rejected' | 'cancelled';

export interface Reservation {
  id: number;
  customer_first?: string | null;
  customer_last?: string | null;
  phone?: string | null;
  email?: string | null;
  party_size: number;
  start_at: string;               // ISO (UTC lato BE)
  end_at: string;                 // ISO (calcolata dal BE)
  status: ReservationStatus;
  table_id?: number | null;
  table_number?: number | null;
  room_id?: number | null;
  table_name?: string | null;     // es. "Tavolo 12" (opzionale)
  notes?: string | null;
  created_at?: string;            // ISO
}

// Filtri lista prenotazioni
export interface ReservationQuery {
  from?: string;                             // YYYY-MM-DD
  to?: string;                               // YYYY-MM-DD
  status?: ReservationStatus | 'all';        // default all
  q?: string;                                // ricerca full-text
}

// DTO creazione
export interface NewReservationDto {
  customer_first?: string | null;
  customer_last?: string | null;
  phone?: string | null;
  email?: string | null;
  party_size: number;
  start_at: string;               // ISO locale dal FE; BE normalizza/usa regole env
  end_at?: string | null;         // opzionale
  notes?: string | null;
  table_id?: number | null;
  client_token?: string | null;
}

// ✅ DTO update (parziale)
export type UpdateReservationDto = Partial<NewReservationDto> & {
  party_size?: number;
  start_at?: string;
};

// ✅ Conteggi per status
export interface CountByStatusResponse {
  pending?: number;
  accepted?: number;
  rejected?: number;
  cancelled?: number;
  total?: number;
};

// Stato → azioni
export type ReservationAction = 'accept' | 'reject' | 'cancel';

@Injectable({ providedIn: 'root' })
export class ReservationsApi {
  private http = inject(HttpClient);
  private base = inject(API_URL); // es. '/api'

  // ---------------------- Reservations ----------------------

  /** Lista prenotazioni con filtri opzionali */
  list(params: ReservationQuery = {}) {
    const httpParams = new HttpParams({ fromObject: toStringParams(params) });
    return this.http.get<Reservation[]>(`${this.base}/reservations`, { params: httpParams });
  }

  /** Dettaglio prenotazione */
  byId(id: number) {
    return this.http.get<Reservation>(`${this.base}/reservations/${id}`);
  }

  /** Crea prenotazione */
  async create(dto: NewReservationDto): Promise<Reservation> {
    return await firstValueFrom(
      this.http.post<Reservation>(`${this.base}/reservations`, dto)
    );
  }

  /** ✅ Aggiorna prenotazione (PATCH) */
  async update(id: number, dto: UpdateReservationDto): Promise<Reservation> {
    return await firstValueFrom(
      this.http.patch<Reservation>(`${this.base}/reservations/${id}`, dto)
    );
  }

  /** ✅ Elimina prenotazione (DELETE) */
  async remove(id: number): Promise<{ ok: boolean }> {
    return await firstValueFrom(
      this.http.delete<{ ok: boolean }>(`${this.base}/reservations/${id}`)
    );
  }

  // ---------------------- Rooms/Tables (supporto UI) ----------------------

  /** Lista sale (separate API /rooms) */
  listRooms() {
    return this.http.get<Room[]>(`${this.base}/rooms`);
  }

  /** Lista TUTTI i tavoli (se hai questa rotta separata) */
  listTables() {
    return this.http.get<Table[]>(`${this.base}/tables`);
  }

  /** Lista tavoli per sala */
  listTablesByRoom(roomId: number) {
    return this.http.get<Table[]>(`${this.base}/tables/by-room/${roomId}`);
  }

  /** Aggiorna lo stato di un tavolo (free|reserved|occupied) */
  updateTableStatus(id: number, status: TableStatus) {
    return this.http.patch<{ ok: boolean; id: number; status: TableStatus }>(
      `${this.base}/tables/${id}/status`,
      { status }
    );
  }

  // ---------------------- Stato + Stampa ------------------------------------

  /** Cambia stato prenotazione (accept|reject|cancel) */
  updateStatus(id: number, action: ReservationAction, reason?: string) {
    const url = `${this.base}/reservations/${id}/status`;
    return this.http.put<{ ok: boolean; reservation: any }>(url, { action, reason });
  }

  /** Stampa riepilogo giornaliero (termica) */
  printDaily(payload: { date?: string; status?: string } = {}) {
    return this.http.post<{ ok: boolean; job_id?: string; printed_count?: number }>(
      `${this.base}/reservations/print/daily`,
      payload
    );
  }

  /** Stampa segnaposti (uno per prenotazione) */
  printPlacecards(date: string, status: string = 'accepted', qrBaseUrl?: string) {
    return this.http.post(
      `${this.base}/reservations/print/placecards`,
      { date, status, qr_base_url: qrBaseUrl }
    );
  }

  /** 🖨️ Stampa segnaposto singolo della prenotazione indicata */
  printPlacecardOne(id: number) {
    // body vuoto by design; se il BE prevede opzioni, aggiungile qui
    return this.http.post<{ ok?: boolean; printed_count?: number }>(
      `${this.base}/reservations/${id}/print/placecard`,
      {}
    );
  }

  /** Conteggio per status nel range */
  countByStatus(params: { from?: string; to?: string }) {
    const httpParams = new HttpParams({ fromObject: cleanParams(params) });
    return this.http.get<CountByStatusResponse>(
      `${this.base}/reservations/support/count-by-status`,
      { params: httpParams }
    );
  }
}

// ---------------------- Helpers ---------------------------------------------

// pulisce undefined/null
function cleanParams<T extends Record<string, any>>(p: T): Record<string, string> {
  const out: Record<string, string> = {};
  Object.keys(p || {}).forEach(k => {
    const v = (p as any)[k];
    if (v !== undefined && v !== null && String(v).trim() !== '') out[k] = String(v);
  });
  return out;
}

// Converte i filtri in stringhe per HttpParams (ignora vuoti/"all")
function toStringParams(q: ReservationQuery): Record<string, string> {
  const out: Record<string, string> = {};
  if (q.from) out['from'] = String(q.from);
  if (q.to) out['to'] = String(q.to);
  if (q.status && q.status !== 'all') out['status'] = String(q.status);
  if (q.q) out['q'] = String(q.q);
  return out;
}
