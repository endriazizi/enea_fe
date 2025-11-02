// src/app/app.config.ts
// ============================================================================
// Router & Providers principali dell’app
// - Rotte pubbliche (NO auth): /prenota, /prenota/grazie
// - Rotte Admin (con auth):
//     • /orders            → tua pagina esistente OrdersLivePage (rimane com’è)
//     • /orders/new        → OrderBuilder
//     • /orders-list       → NUOVA pagina OrdersListLivePage (lista live SSE)
// ----------------------------------------------------------------------------
// Stile: Ionic standalone + Signals, commenti lunghi, log emoji
// ============================================================================

import { ApplicationConfig, isDevMode, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { provideServiceWorker } from '@angular/service-worker';

import { ShellPage } from './shell/shell.page';
import { DiagnosticsPage } from './features/diagnostics/diagnostics.page';
import { LoginPage } from './features/auth/login.page';

import { API_URL } from './core/tokens';
import { environment } from './environments/environment';
import { apiErrorInterceptor } from './core/interceptors';
import { authInterceptor } from './core/auth/auth.interceptor';
import { authGuard } from './core/auth/auth.guard';
import { AuthService } from './core/auth/auth.service';

// Ionicons registrate una volta all’avvio (coerente con il tuo stile)
import { registerAppIcons } from './icons';
registerAppIcons();

const routes: Routes = [
  // === Public (no auth, no shell) ============================================
  { path: 'login', component: LoginPage },
  { path: 'logout', loadComponent: () => import('./features/auth/logout.page').then(m => m.LogoutPage) },

  // 🔧 Flusso pubblico di prenotazione: NO auth, NO Shell admin
  { path: 'prenota', loadComponent: () => import('./features/public-booking/public-booking.page').then(m => m.PublicBookingPage) },
  { path: 'prenota/grazie', loadComponent: () => import('./features/public-booking/thank-you.page').then(m => m.ThankYouPage) },

  // === Admin shell ===========================================================
  {
    path: '',
    component: ShellPage,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'diagnostics' },
      { path: 'diagnostics', component: DiagnosticsPage },

      // Prenotazioni
      {
        path: 'reservations',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/reservations/reservations-list.page')
                .then(m => m.ReservationsListPage),
            canActivate: [authGuard],
          },
          {
            path: 'new',
            loadComponent: () =>
              import('./features/reservations/new-reservation.page')
                .then(m => m.NewReservationPage),
            canActivate: [authGuard],
          },
          {
            path: ':id/edit',
            loadComponent: () =>
              import('./features/reservations/edit-reservation.page')
                .then(m => m.EditReservationPage),
            canActivate: [authGuard],
          }
        ]
      },

      // ====================== Ordini (Admin) ===========================
      {
        path: 'orders',
        children: [
          // 👇 tua pagina ESISTENTE, non toccata
          {
            path: '',
            loadComponent: () =>
              import('./features/orders/orders-live.page')
                .then(m => m.OrdersLivePage),
            canActivate: [authGuard],
          },
          {
            path: 'new',
            loadComponent: () =>
              import('./features/orders/order-builder.page')
                .then(m => m.OrderBuilderPage),
            canActivate: [authGuard],
          }
        ]
      },

      // 👇 NUOVO path separato per la nuova pagina "orders-list-live.page"
      {
        path: 'orders-list',
        loadComponent: () =>
          import('./features/orders/orders-list-live.page')
            .then(m => m.OrdersListLivePage),
        canActivate: [authGuard],
      },

      { path: '**', redirectTo: 'diagnostics' }
    ]
  }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideIonicAngular(),
    { provide: LOCALE_ID, useValue: 'it-IT' },

    // HTTP + intercettori (stile invariato)
    provideHttpClient(withInterceptors([authInterceptor, apiErrorInterceptor])),

    // API base (env)
    { provide: API_URL, useValue: environment.apiBaseUrl },

    // Bootstrap auth (inizializza il profilo/token ecc.)
    {
      provide: APP_INITIALIZER,
      useFactory: (auth: AuthService) => () => auth.init(),
      deps: [AuthService],
      multi: true
    },

    // PWA
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
};
