// ============================================================================
// GoogleContactsService (SPA + GIS popup)
// - searchContacts(): se 401 → apre consenso READ e ritenta.
// - createContact(): se 401 → consenso READ; se 403 → consenso WRITE; poi ritenta.
// - connectRead(): consenso per lettura
// - ensureWriteScope(): estensione permessi per scrittura
// ============================================================================
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface GContactPick {
  displayName?: string | null;
  givenName?: string | null;
  familyName?: string | null;
  email?: string | null;
  phone?: string | null;
}

@Injectable({ providedIn: 'root' })
export class GoogleContactsService {
  private base = '/api/google';
  searching = signal(false);
  saving    = signal(false);   // 👈 usato dalla pagina per lo stato del bottone

  constructor(private http: HttpClient) {}

  // ---- Utils ---------------------------------------------------------------

  private googleClientId(): string {
    const meta = document.querySelector('meta[name="google-client-id"]') as HTMLMetaElement | null;
    return meta?.content || '512175551489-082s3f7pri0rl9uv0ujkiko31dnoo8o7.apps.googleusercontent.com';
  }

  private async loadGIS(): Promise<void> {
    if ((window as any).google?.accounts?.oauth2) return;
    await new Promise<void>((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://accounts.google.com/gsi/client';
      s.async = true; s.defer = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('gsi_load_failed'));
      document.head.appendChild(s);
    });
  }

  private requestCode(scopes: string[]): Promise<string> {
    return new Promise(async (resolve, reject) => {
      await this.loadGIS();
      try {
        const client = (window as any).google.accounts.oauth2.initCodeClient({
          client_id: this.googleClientId(),
          scope: scopes.join(' '),
          ux_mode: 'popup',
          callback: (resp: { code?: string; error?: string }) => {
            if (resp?.code) resolve(resp.code);
            else reject(new Error(resp?.error || 'no_code'));
          },
        });
        client.requestCode();
      } catch (err) { reject(err); }
    });
  }

  private async exchange(code: string): Promise<boolean> {
    const r: any = await this.http.post(`${this.base}/oauth/exchange`, { code }).toPromise();
    return !!r?.ok;
  }

  // ---- Consensi ------------------------------------------------------------

  /** Consenso per LETTURA contatti */
  async connectRead(): Promise<boolean> {
    const scopes = ['https://www.googleapis.com/auth/contacts.readonly'];
    const code = await this.requestCode(scopes);
    return this.exchange(code);
  }

  /** Estende ai permessi di SCRITTURA contatti */
  async ensureWriteScope(): Promise<boolean> {
    const scopes = [
      'https://www.googleapis.com/auth/contacts.readonly',
      'https://www.googleapis.com/auth/contacts',
    ];
    const code = await this.requestCode(scopes);
    return this.exchange(code);
  }

  // ---- API -----------------------------------------------------------------

  async searchContacts(q: string, limit = 12): Promise<GContactPick[]> {
    const query = (q || '').trim();
    if (query.length < 2) return [];
    this.searching.set(true);
    try {
      const r: any = await this.http
        .get(`${this.base}/people/search`, { params: { q: query, limit } })
        .toPromise();

      return r?.ok ? (r.items || []) : [];
    } catch (e: any) {
      if (e?.status === 401 && e?.error?.reason === 'google_consent_required') {
        try {
          const ok = await this.connectRead();
          if (ok) {
            const rr: any = await this.http
              .get(`${this.base}/people/search`, { params: { q: query, limit } })
              .toPromise();
            return rr?.ok ? (rr.items || []) : [];
          }
        } catch {/* utente ha chiuso il popup */}
      }
      return [];
    } finally {
      this.searching.set(false);
    }
  }

  async createContact(payload: {
    displayName?: string | null;
    givenName?: string | null;
    familyName?: string | null;
    email?: string | null;
    phone?: string | null;
  }): Promise<{ ok: boolean; resourceName?: string | null }> {
    this.saving.set(true);
    try {
      const r: any = await this.http.post(`${this.base}/people/create`, payload).toPromise();
      return r;
    } catch (e: any) {
      // 1) manca consenso → chiedi READ
      if (e?.status === 401 && e?.error?.reason === 'google_consent_required') {
        try {
          const ok = await this.connectRead();
          if (ok) {
            const r2: any = await this.http.post(`${this.base}/people/create`, payload).toPromise();
            return r2;
          }
        } catch {}
      }
      // 2) manca write-scope → chiedi WRITE e ritenta
      if (e?.status === 403 && e?.error?.reason === 'google_scope_write_required') {
        try {
          const ok = await this.ensureWriteScope();
          if (ok) {
            const r2: any = await this.http.post(`${this.base}/people/create`, payload).toPromise();
            return r2;
          }
        } catch {}
      }
      return { ok: false };
    } finally {
      this.saving.set(false);
    }
  }
}
