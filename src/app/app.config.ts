// src/app/app.config.ts
// ============================================================================
// Router & Providers
// - Pubbliche: /prenota, /prenota/grazie
// - Admin: /orders (live), /orders/new, /orders-list (lista live nuova)
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

import { registerAppIcons } from './icons';
registerAppIcons();

const routes: Routes = [
  { path: 'login', component: LoginPage },
  { path: 'logout', loadComponent: () => import('./features/auth/logout.page').then(m => m.LogoutPage) },

  // pubblico
  { path: 'prenota', loadComponent: () => import('./features/public-booking/public-booking.page').then(m => m.PublicBookingPage) },
  { path: 'prenota/grazie', loadComponent: () => import('./features/public-booking/thank-you.page').then(m => m.ThankYouPage) },

  {
    path: '',
    component: ShellPage,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'diagnostics' },
      { path: 'diagnostics', component: DiagnosticsPage },

      // Prenotazioni (immutato)
      {
        path: 'reservations',
        children: [
          { path: '', loadComponent: () => import('./features/reservations/reservations-list.page').then(m => m.ReservationsListPage), canActivate: [authGuard] },
          { path: 'new', loadComponent: () => import('./features/reservations/new-reservation.page').then(m => m.NewReservationPage), canActivate: [authGuard] },
          { path: ':id/edit', loadComponent: () => import('./features/reservations/edit-reservation.page').then(m => m.EditReservationPage), canActivate: [authGuard] }
        ]
      },

      // Ordini
      {
        path: 'orders',
        children: [
          { path: '', loadComponent: () => import('./features/orders/orders-live.page').then(m => m.OrdersLivePage), canActivate: [authGuard] },
          { path: 'new', loadComponent: () => import('./features/orders/order-builder.page').then(m => m.OrderBuilderPage), canActivate: [authGuard] }
        ]
      },

      // nuova lista live
      { path: 'orders-list', loadComponent: () => import('./features/orders/orders-list-live.page').then(m => m.OrdersListLivePage), canActivate: [authGuard] },

      { path: '**', redirectTo: 'diagnostics' }
    ]
  }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideIonicAngular(),
    { provide: LOCALE_ID, useValue: 'it-IT' },
    provideHttpClient(withInterceptors([authInterceptor, apiErrorInterceptor])),
    { provide: API_URL, useValue: environment.apiBaseUrl },
    {
      provide: APP_INITIALIZER,
      useFactory: (auth: AuthService) => () => auth.init(),
      deps: [AuthService], multi: true
    },
    provideServiceWorker('ngsw-worker.js', { enabled: !isDevMode(), registrationStrategy: 'registerWhenStable:30000' })
  ]
};
