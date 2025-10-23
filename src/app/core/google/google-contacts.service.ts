// src/app/core/google/google-contacts.service.ts
//
// GoogleContactsService
// - OAuth con Google Identity Services (GIS) lato SPA
// - People API: /v1/people:searchContacts
// - Ritorna GContactPick (compatibile col tuo componente)
// - Fix: usa environment.googleScopes (aggiunto) e controllo revoke come funzione.

import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';

export interface GContactPick {
  displayName?: string | null;
  givenName?: string | null;
  familyName?: string | null;
  phone?: string | null;
  email?: string | null;
}

@Injectable({ providedIn: 'root' })
export class GoogleContactsService {
  private accessToken: string | null = null;
  private expiresAt = 0; // epoch seconds

  searching = signal(false);

  /** Richiede/riusa il token GIS. Prompt solo se serve. */
  private async ensureToken(prompt: '' | 'consent' = ''): Promise<string> {
    const now = Math.floor(Date.now() / 1000);
    if (this.accessToken && this.expiresAt - 60 > now) {
      return this.accessToken;
    }

    if (!window.google?.accounts?.oauth2) {
      throw new Error('Google Identity Services non è disponibile (script non caricato?)');
    }

    const scopes =
      environment.googleScopes?.trim() ||
      'https://www.googleapis.com/auth/contacts.readonly';

    const token = await new Promise<string>((resolve, reject) => {
      const client = window.google!.accounts.oauth2.initTokenClient({
        client_id: environment.googleClientId,
        scope: scopes,
        prompt,
        callback: (resp) => {
          const at = (resp as any)?.access_token as string | undefined;
          const ttl = (resp as any)?.expires_in as number | undefined;
          if (!at) return reject(new Error('Token mancante'));
          this.accessToken = at;
          const nowS = Math.floor(Date.now() / 1000);
          this.expiresAt = nowS + (ttl ?? 3000);
          resolve(at);
        },
        error_callback: (err) => reject(err),
      });

      client.requestAccessToken({ prompt });
    });

    return token;
  }

  /** Opzionale: revoca token esplicita */
  async revoke(): Promise<void> {
    // ✅ evita TS2774: verifica che sia proprio una funzione
    const canRevoke =
      typeof window.google?.accounts?.oauth2?.revoke === 'function';
    if (this.accessToken && canRevoke) {
      await new Promise<void>((r) =>
        window.google!.accounts.oauth2.revoke(this.accessToken!, r)
      );
    }
    this.accessToken = null;
    this.expiresAt = 0;
  }

  /**
   * Autocomplete: cerca tra i contatti dell’utente.
   * @param query stringa (min 2 char)
   * @param pageSize default 10
   */
  async searchContacts(query: string, pageSize = 10): Promise<GContactPick[]> {
    const q = (query || '').trim();
    if (q.length < 2) return [];

    this.searching.set(true);
    try {
      const token = await this.ensureToken('');
      const url = new URL('https://people.googleapis.com/v1/people:searchContacts');
      url.searchParams.set('query', q);
      url.searchParams.set('pageSize', String(pageSize));
      url.searchParams.set('readMask', 'names,emailAddresses,phoneNumbers');

      const res = await fetch(url.toString(), {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        const newToken = await this.ensureToken('consent');
        const retry = await fetch(url.toString(), {
          headers: { Authorization: `Bearer ${newToken}` },
        });
        return this.mapPeople(await retry.json());
      }

      if (!res.ok) {
        const errText = await res.text().catch(() => '');
        throw new Error(`People API error ${res.status}: ${errText || res.statusText}`);
      }

      const json = await res.json();
      return this.mapPeople(json);
    } finally {
      this.searching.set(false);
    }
  }

  // -------------------- Helpers --------------------

  private mapPeople(json: any): GContactPick[] {
    const people = Array.isArray(json?.results) ? json.results : [];
    return people.map((r: any) => {
      const p = r.person || r;
      const nameObj = (p.names && p.names[0]) || {};
      const displayName = nameObj.displayName || null;
      const givenName = nameObj.givenName || null;
      const familyName = nameObj.familyName || null;
      const email = (p.emailAddresses && p.emailAddresses[0]?.value) || null;
      const phone = (p.phoneNumbers && p.phoneNumbers[0]?.value) || null;
      return { displayName, givenName, familyName, email, phone };
    });
  }
}
