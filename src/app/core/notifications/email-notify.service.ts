// src/app/core/notifications/email-notify.service.ts
// ============================================================================
// EmailNotifyService — invio mail admin/cliente su nuovo ordine
// - separato, così puoi scambiare provider senza toccare le pagine
// - endpoint placeholder: /notifications/email
// ============================================================================

import { Injectable, Inject, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../tokens';
import { Observable, map } from 'rxjs';
import { Order } from '../orders/types';

@Injectable({ providedIn: 'root' })
export class EmailNotifyService {
  private http = inject(HttpClient);
  constructor(@Inject(API_URL) private baseUrl: string) {}

  sendNewOrderAdmin(order: Order): Observable<{ ok: boolean }> {
    const payload = { kind: 'new-order-admin', order };
    return this.http.post<{ ok: boolean }>(`${this.baseUrl}/notifications/email`, payload).pipe(
      map(res => ({ ok: !!res?.ok }))
    );
  }

  sendNewOrderCustomer(order: Order): Observable<{ ok: boolean }> {
    const payload = { kind: 'new-order-customer', order };
    return this.http.post<{ ok: boolean }>(`${this.baseUrl}/notifications/email`, payload).pipe(
      map(res => ({ ok: !!res?.ok }))
    );
  }
}
