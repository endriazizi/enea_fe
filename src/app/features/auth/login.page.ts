// src/app/features/auth/login.page.ts
// Login semplice, con credenziali precompilate in DEV per velocizzare i test.
// Logica:
// - se valido → auth.login → redirect a ?redirect=... oppure /reservations
// - mostra errori chiari, ha un mini ping di debug (opzionale)

import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonItem, IonLabel, IonInput, IonButton, IonNote
} from '@ionic/angular/standalone';

import { AuthService } from '../../core/auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    NgIf, ReactiveFormsModule,
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonItem, IonLabel, IonInput, IonButton, IonNote
  ],
  templateUrl: './login.page.html',
})
export class LoginPage {
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);

  loading = signal(false);
  error = signal<string | null>(null);

  // 🔧 Prefill credenziali DEV (puoi modificare qui se necessario)
  form = new FormGroup({
    email: new FormControl<string>('admin@demo.it', {
      nonNullable: true, validators: [Validators.required, Validators.email],
    }),
    password: new FormControl<string>('admin', {
      nonNullable: true, validators: [Validators.required],
    }),
  });

  get email() { return this.form.controls.email; }
  get password() { return this.form.controls.password; }

  async onSubmit() {
    if (this.form.invalid) return;

    // (Opzionale) PING di debug lato FE per capire proxy/server
    this.http.get('/api/ping').subscribe({
      next: (v) => console.log('[LoginPage] PING OK', v),
      error: (e) => console.error('[LoginPage] PING KO', e),
    });

    this.loading.set(true);
    this.error.set(null);

    try {
      const { email, password } = this.form.getRawValue();
      await this.auth.login(email, password);

      // Redirect post-login
      const redirect = this.route.snapshot.queryParamMap.get('redirect')
        || '/reservations'; // 👈 lista prenotazioni; se preferisci 'new', metti '/reservations/new'
      this.router.navigateByUrl(redirect);

    } catch (e: any) {
      this.error.set(e?.message ?? 'Credenziali non valide');
    } finally {
      this.loading.set(false);
    }
  }
}
