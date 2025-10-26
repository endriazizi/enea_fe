// src/app/core/notifications/email-notify.service.ts
// ============================================================================
// EmailNotifyService — invio mail admin/cliente
// - Ordini: new-order-(admin|customer)
// - Prenotazioni: reservation-pending-(admin|customer)  ⬅️ NUOVO
// Endpoint BE placeholder: POST /notifications/email  (ritorna { ok: boolean })
// NB: Mantengo lo stile semplice + logica separata dal resto dell'app.
// ============================================================================

import { Injectable, Inject, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { API_URL } from '../tokens';
import { Order } from '../orders/types';
import { Reservation } from '../reservations/reservations.service';

@Injectable({ providedIn: 'root' })
export class EmailNotifyService {
  private http = inject(HttpClient);
  constructor(@Inject(API_URL) private baseUrl: string) {}

  // ===== ORDINI =====
  sendNewOrderAdmin(order: Order): Observable<{ ok: boolean }> {
    const payload = { kind: 'new-order-admin', order };
    return this.http
      .post<{ ok: boolean }>(`${this.baseUrl}/notifications/email`, payload)
      .pipe(map(res => ({ ok: !!res?.ok })));
  }

  sendNewOrderCustomer(order: Order): Observable<{ ok: boolean }> {
    const payload = { kind: 'new-order-customer', order };
    return this.http
      .post<{ ok: boolean }>(`${this.baseUrl}/notifications/email`, payload)
      .pipe(map(res => ({ ok: !!res?.ok })));
  }

  // ===== PRENOTAZIONI (NUOVO) =====
  sendReservationPendingAdmin(resv: Reservation): Observable<{ ok: boolean }> {
    const payload = { kind: 'reservation-pending-admin', reservation: resv };
    return this.http
      .post<{ ok: boolean }>(`${this.baseUrl}/notifications/email`, payload)
      .pipe(map(res => ({ ok: !!res?.ok })));
  }

  sendReservationPendingCustomer(resv: Reservation): Observable<{ ok: boolean }> {
    const payload = { kind: 'reservation-pending-customer', reservation: resv };
    return this.http
      .post<{ ok: boolean }>(`${this.baseUrl}/notifications/email`, payload)
      .pipe(map(res => ({ ok: !!res?.ok })));
  }
}
