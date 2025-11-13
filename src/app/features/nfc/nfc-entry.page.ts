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

  private async handle() {
    const token = (this.route.snapshot.paramMap.get('token') || '').trim();
    if (!token) {
      this.router.navigate(['/nfc/error'], { queryParams: { reason: 'no_token' }, replaceUrl: true });
      return;
    }
    try {
      console.log('📲 [NFC] token letto ▶️', token);
      // 🔎 endpoint corretto
      const res = await this.api.resolve(token);
      const tableId = Number(res.table_id);
      const target  = res.redirect_url ?? `/orders/new?table_id=${tableId}`;
      console.log('➡️ [NFC] redirect a:', target);
      this.router.navigateByUrl(target, { replaceUrl: true });
    } catch (e: any) {
      console.warn('⚠️ [NFC] resolve KO', e);
      this.router.navigate(['/nfc/error'], { queryParams: { reason: e?.message ?? 'resolve_error' }, replaceUrl: true });
    }
  }

  // fallback manuale (usato nell’HTML come “apri comunque”)
  fallbackUrl() { return '/orders/new'; }
}
