// Login semplice, con credenziali precompilate in DEV per velocizzare i test.
// Precedenza prefill: querystring (email/pwd) → environment.devLogin (if enabled) → localStorage('last_email')
// NOTE:
// - Non salviamo MAI la password in storage.
// - In produzione tieni devLogin.disabled o rimuovi le credenziali.
// - Log "parlanti" ma senza mai stampare la password.

import { Component, inject, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonItem, IonLabel, IonInput, IonButton, IonNote
} from '@ionic/angular/standalone';

import { AuthService } from '../../core/auth/auth.service';
import { HttpClient } from '@angular/common/http';

// 🔗 ATTENZIONE al path: da features/auth a environments è ../../../
// Se la tua struttura differisce, adegua il percorso di import.
import { environment } from '../../../environments/environment';

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
export class LoginPage implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);

  loading = signal(false);
  error = signal<string | null>(null);

  // Valori di default MINIMI, poi applyPrefill() applica la precedenza.
  form = new FormGroup({
    email: new FormControl<string>('', {
      nonNullable: true, validators: [Validators.required, Validators.email],
    }),
    password: new FormControl<string>('', {
      nonNullable: true, validators: [Validators.required],
    }),
  });

  get email() { return this.form.controls.email; }
  get password() { return this.form.controls.password; }

  ngOnInit(): void {
    this.applyPrefill(); // 🔥 Applica precedenza QS → devLogin → last_email
  }

  // Applica il prefill secondo la policy concordata
  private applyPrefill() {
    // 1) Querystring
    const qp = this.route.snapshot.queryParamMap;
    const qsEmail = qp.get('email');
    const qsPwd   = qp.get('pwd') ?? qp.get('password');

    if (qsEmail) {
      this.email.setValue(qsEmail);
      console.log('🔧 [LoginPage] Prefill email da querystring.');
    }
    if (qsPwd) {
      this.password.setValue(qsPwd);
      console.log('🔧 [LoginPage] Prefill password da querystring (non loggata).');
    }

    // 2) environment.devLogin (solo se abilitato E se non già coperti da QS)
    const dev = environment?.devLogin as { enabled?: boolean; email?: string; password?: string } | undefined;
    if (dev?.enabled) {
      if (!qsEmail && dev.email) {
        this.email.setValue(dev.email);
        console.log('🧪 [LoginPage] Prefill email da environment.devLogin.');
      }
      if (!qsPwd && dev.password) {
        this.password.setValue(dev.password);
        console.log('🧪 [LoginPage] Prefill password da environment.devLogin (non loggata).');
      }
    }

    // 3) localStorage('last_email') SOLO per l'email (mai password)
    if (!qsEmail && !dev?.email) {
      const last = localStorage.getItem('last_email');
      if (last) {
        this.email.setValue(last);
        console.log('💾 [LoginPage] Prefill email da localStorage(last_email).');
      }
    }
  }

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

      console.log('➡️  [LoginPage] Tentativo login per', email);
      await this.auth.login(email, password);

      // Salviamo SOLO l'email per comodità nei login successivi
      localStorage.setItem('last_email', email);

      // Redirect post-login
      const redirect = this.route.snapshot.queryParamMap.get('redirect')
        || '/reservations'; // 👈 se preferisci 'new': '/reservations/new'
      this.router.navigateByUrl(redirect);

    } catch (e: any) {
      this.error.set(e?.message ?? 'Credenziali non valide');
      console.error('❌ [LoginPage] Login error:', e);
    } finally {
      this.loading.set(false);
    }
  }
}
