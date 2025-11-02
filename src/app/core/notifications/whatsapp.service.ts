// src/app/core/notifications/whatsapp.service.ts
import { Injectable, Inject, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../tokens';
import { Observable, map } from 'rxjs';
import { Reservation } from '../reservations/reservations.service';
import { OrderFull } from '../orders/orders.service';

export type WhatsAppProvider = 'twilio' | 'whatsender';

@Injectable({ providedIn: 'root' })
export class WhatsAppService {
  private http = inject(HttpClient);
  constructor(@Inject(API_URL) private baseUrl: string) {}

  /** WhatsApp su prenotazione PENDING */
  sendReservationPending(provider: WhatsAppProvider, reservation: Reservation): Observable<{ ok: boolean }> {
    const url = provider === 'twilio'
      ? `${this.baseUrl}/notifications/whatsapp/twilio`
      : `${this.baseUrl}/notifications/whatsapp/whatsender`;
    const payload = { kind: 'reservation-pending', reservation };
    return this.http.post<{ ok: boolean }>(url, payload).pipe(map(r => ({ ok: !!r?.ok })));
  }

    sendOrderCreated(provider: WhatsAppProvider, order: OrderFull): Observable<{ ok: boolean }> {
    const url = provider === 'twilio'
      ? `${this.baseUrl}/notifications/whatsapp/twilio`
      : `${this.baseUrl}/notifications/whatsapp/whatsender`;
    const payload = { kind: 'order-created', order };
    return this.http.post<{ ok: boolean }>(url, payload).pipe(map(r => ({ ok: !!r?.ok })));
  }
}
