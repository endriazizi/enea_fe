// src/app/core/notifications/email-notify.service.ts
import { Injectable, Inject, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../tokens';
import { Observable, map } from 'rxjs';
import { Reservation } from '../reservations/reservations.service';

@Injectable({ providedIn: 'root' })
export class EmailNotifyService {
  private http = inject(HttpClient);
  constructor(@Inject(API_URL) private baseUrl: string) {}

  /** Mail all'admin quando una prenotazione è PENDING */
  sendReservationPendingAdmin(reservation: Reservation): Observable<{ ok: boolean }> {
    const payload = { kind: 'reservation-pending-admin', reservation };
    return this.http.post<{ ok: boolean }>(`${this.baseUrl}/notifications/email`, payload)
      .pipe(map(res => ({ ok: !!res?.ok })));
  }

  /** Mail al cliente quando una prenotazione è PENDING */
  sendReservationPendingCustomer(reservation: Reservation): Observable<{ ok: boolean }> {
    const payload = { kind: 'reservation-pending-customer', reservation };
    return this.http.post<{ ok: boolean }>(`${this.baseUrl}/notifications/email`, payload)
      .pipe(map(res => ({ ok: !!res?.ok })));
  }
}
