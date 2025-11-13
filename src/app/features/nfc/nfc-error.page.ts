// src/app/features/nfc/nfc-error.page.ts
// ============================================================================
// NfcErrorPage — rotta pubblica /nfc/error
// Mostra un messaggio leggibile (query ?reason=...) e un link per tornare alla home.
// ============================================================================

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';

@Component({
  standalone: true,
  selector: 'app-nfc-error',
  templateUrl: './nfc-error.page.html',
  styleUrls: ['./nfc-error.page.scss'],
  imports: [CommonModule, RouterLink, IonHeader, IonToolbar, IonTitle, IonContent, IonButton]
})
export class NfcErrorPage {
  private route = inject(ActivatedRoute);

  reason(): string {
    const r = this.route.snapshot.queryParamMap.get('reason') || 'Errore NFC';
    return r;
  }
}
