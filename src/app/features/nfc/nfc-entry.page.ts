// C:\Users\Endri Azizi\progetti-dev\my_dev\fe\src\app\features\nfc\nfc-entry.page.ts
// ============================================================================
// NfcEntryPage — rotta pubblica /t/:token
// - legge il token, lo risolve via BE e redirige alla pagina target
// - fallback: /nfc/error con reason
// Stile: commenti lunghi + log con emoji, Ionic standalone.
// ============================================================================

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButton } from '@ionic/angular/standalone';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NfcApi } from './nfc.api';

@Component({
  standalone: true,
  selector: 'app-nfc-entry',
  templateUrl: './nfc-entry.page.html',
  imports: [CommonModule, IonContent, IonHeader, IonToolbar, IonTitle, IonButton, RouterLink],
})
export class NfcEntryPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private api    = inject(NfcApi);

  ngOnInit() { this.handle(); }

  private addOrReplaceParam(url: string, key: string, val: string | number | null | undefined) {
    if (val === null || typeof val === 'undefined' || val === '') return url;
    try {
      const u = new URL(url, window.location.origin);
      u.searchParams.set(key, String(val));
      // Se origin diversa (redirect assoluto), mantengo assoluto; altrimenti relativo
      return u.origin === window.location.origin ? (u.pathname + u.search + u.hash) : u.toString();
    } catch {
      // fallback semplice per URL relativi
      const hasQ = url.includes('?');
      const re = new RegExp(`([?&])${key}=[^&]*`);
      if (re.test(url)) return url.replace(re, `$1${key}=${encodeURIComponent(String(val))}`);
      return url + (hasQ ? '&' : '?') + `${key}=${encodeURIComponent(String(val))}`;
    }
  }

  private async handle() {
    const token = (this.route.snapshot.paramMap.get('token') || '').trim();
    if (!token) {
      this.router.navigate(['/nfc/error'], { queryParams: { reason: 'no_token' }, replaceUrl: true });
      return;
    }
    try {
      console.log('📲 [NFC] token letto ▶️', token);
      const res = await this.api.resolve(token);
      const tableId   = Number(res.table_id);
      const sessionId = res.session_id ?? null;
      const base      = res.redirect_url ?? `/orders/new?table_id=${tableId}`;
      // 👇 Inietto SEMPRE session_id nel target
      const target    = this.addOrReplaceParam(base, 'session_id', sessionId);

      console.log('➡️ [NFC] redirect a:', target, { tableId, sessionId });
      this.router.navigateByUrl(target, { replaceUrl: true });
    } catch (e: any) {
      console.warn('⚠️ [NFC] resolve KO', e);
      this.router.navigate(['/nfc/error'], { queryParams: { reason: e?.message ?? 'resolve_error' }, replaceUrl: true });
    }
  }

  // fallback manuale (usato nell’HTML come “apri comunque”)
  fallbackUrl() { return '/orders/new'; }
}
