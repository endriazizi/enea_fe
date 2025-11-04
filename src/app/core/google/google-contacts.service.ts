// core/google/google-contacts.service.ts
// ============================================================================
// Flusso "FE-first" con gesto utente esplicito:
// - Se /people/search risponde 401 { reason: 'google_consent_required' } →
//   set needsConsent=true e NON apro il popup autonomamente (browser block).
// - L'utente tocca "Connetti Google" → ottengo `code` dal popup GIS →
//   POST a /api/google/oauth/exchange → salvo token → ritento la ricerca.
// ============================================================================

import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface GContactPick {
  displayName?: string;
  familyName?: string;
  givenName?: string;
  email?: string;
  phone?: string;
}

@Injectable({ providedIn: 'root' })
export class GoogleContactsService {
  searching = signal(false);
  needsConsent = signal(false);         // 👈 stato osservabile dalla UI

  constructor(private http: HttpClient) {}

  private apiBase() { return '/api/google'; }

  private googleClientId(): string {
    const meta = document.querySelector('meta[name="google-client-id"]') as HTMLMetaElement | null;
    return meta?.content || '512175551489-082s3f7pri0rl9uv0ujkiko31dnoo8o7.apps.googleusercontent.com';
  }
  private googleScopes(): string {
    return 'https://www.googleapis.com/auth/contacts.readonly';
  }

  // Carico GIS on-demand
  private _gsiPromise: Promise<void> | null = null;
  private loadGIS(): Promise<void> {
    if (this._gsiPromise) return this._gsiPromise;
    this._gsiPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://accounts.google.com/gsi/client';
      s.async = true; s.defer = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('gsi_load_failed'));
      document.head.appendChild(s);
    });
    return this._gsiPromise;
  }
  private gis(): any { return (window as any).google; }

  // 👇 Chiamata esplicita dalla UI (gesto utente): apre popup e scambia il code
  async connect(): Promise<boolean> {
    await this.loadGIS();
    const g = this.gis();
    if (!g?.accounts?.oauth2?.initCodeClient) return false;

    const code: string = await new Promise((resolve, reject) => {
      try {
        const client = g.accounts.oauth2.initCodeClient({
          client_id: this.googleClientId(),
          scope: this.googleScopes(),
          ux_mode: 'popup',
          callback: (resp: any) => {
            if (resp?.code) resolve(resp.code);
            else reject(new Error(resp?.error || 'no_code'));
          },
        });
        client.requestCode();
      } catch (e) {
        reject(e);
      }
    });

    const r: any = await firstValueFrom(
      this.http.post(`${this.apiBase()}/oauth/exchange`, { code })
    );
    const ok = !!r?.ok;
    if (ok) this.needsConsent.set(false);
    return ok;
  }

  // Ricerca contatti (gestisce 401 → needsConsent)
  async searchContacts(q: string, limit = 12): Promise<GContactPick[]> {
    const query = (q || '').trim();
    if (query.length < 2) return [];
    this.searching.set(true);
    try {
      const r: any = await firstValueFrom(
        this.http.get(`${this.apiBase()}/people/search`, { params: { q: query, limit } })
      );
      return r?.ok ? (r.items || []) : [];
    } catch (e: any) {
      if (e?.status === 401 && e?.error?.reason === 'google_consent_required') {
        this.needsConsent.set(true); // 👈 la UI mostrerà il bottone “Connetti Google”
      }
      return [];
    } finally {
      this.searching.set(false);
    }
  }
}
