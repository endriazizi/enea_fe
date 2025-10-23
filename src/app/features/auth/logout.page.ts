// Standalone "pagina" che esegue il logout all'istante e reindirizza al login.
// Utile se in futuro vuoi linkare /logout da altrove.

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-logout',
  imports: [IonContent],
  template: `<ion-content class="ion-padding">Uscita…</ion-content>`
})
export class LogoutPage {
  private auth = inject(AuthService);
  private router = inject(Router);

  constructor() {
    console.log('🔐 [LogoutPage] logout immediato');
    this.auth.logout();
    this.router.navigate(['/login'], { queryParams: { redirect: '/diagnostics' } });
  }
}
