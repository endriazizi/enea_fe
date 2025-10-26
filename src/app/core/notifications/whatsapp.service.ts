// src/app/core/notifications/whatsapp.service.ts
// ============================================================================
// WhatsAppService — Strategy semplice:
//   provider = 'twilio' | 'whatsender'
//   - Twilio: /notifications/whatsapp/twilio
//   - Whatsender: /notifications/whatsapp/whatsender
// NB: /whatsender può prevedere QR auth sul BE: lato FE ricevi solo {ok}.
// ============================================================================

import { Injectable, Inject, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../tokens';
import { Observable, map } from 'rxjs';
import { Order } from '../orders/types';

export type WhatsAppProvider = 'twilio' | 'whatsender';

@Injectable({ providedIn: 'root' })
export class WhatsAppService {
  private http = inject(HttpClient);
  constructor(@Inject(API_URL) private baseUrl: string) {}

  sendNewOrder(provider: WhatsAppProvider, order: Order): Observable<{ ok: boolean }> {
    const url = provider === 'twilio'
      ? `${this.baseUrl}/notifications/whatsapp/twilio`
      : `${this.baseUrl}/notifications/whatsapp/whatsender`;
    const payload = { kind: 'new-order', order };
    return this.http.post<{ ok: boolean }>(url, payload).pipe(map(r => ({ ok: !!r?.ok })));
  }
}
