import { CustomerDetailPage } from './features/customers/customer-detail.page';
// src/app/app.config.ts
// ============================================================================
// Router & Providers
// - Pubbliche: /prenota, /prenota/grazie, /t/:token (entry NFC), /nfc/error
// - Admin: /orders (live), /orders/new, /orders-list (lista live nuova), /nfc/bind
// - 🆕 Clienti: /customers, /customers/new, /customers/:id
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

const pick = <T = any>(mod: any, named: string): T => (mod?.[named] ?? mod?.default) as T;

const routes: Routes = [
  // --- PUBBLICHE -------------------------------------------------------------
  { path: 'login', component: LoginPage },
  {
    path: 'logout',
    loadComponent: () => import('./features/auth/logout.page').then(m => pick(m, 'LogoutPage'))
  },
  { path: 'prenota', loadComponent: () => import('./features/public-booking/public-booking.page').then(m => pick(m, 'PublicBookingPage')) },
  { path: 'prenota/grazie', loadComponent: () => import('./features/public-booking/thank-you.page').then(m => pick(m, 'ThankYouPage')) },

  // NFC entry + pagina errore (pubbliche)
  { path: 't/:token', loadComponent: () => import('./features/nfc/nfc-entry.page').then(m => pick(m, 'NfcEntryPage')) },
  { path: 'nfc/error', loadComponent: () => import('./features/nfc/nfc-error.page').then(m => pick(m, 'NfcErrorPage')) },

  // --- SHELL AUTENTICATA ----------------------------------------------------
  {
    path: '',
    component: ShellPage,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'diagnostics' },
      { path: 'diagnostics', component: DiagnosticsPage },

      // Tavoli (già tuo)
      { path: 'tables', canActivate: [authGuard], loadComponent: () => import('./features/tables/tables-list.page').then(m => pick(m, 'TablesListPage')) },

      // Prenotazioni (immutato)
      {
        path: 'reservations',
        children: [
          { path: '', canActivate: [authGuard], loadComponent: () => import('./features/reservations/reservations-list.page').then(m => pick(m, 'ReservationsListPage')) },
          { path: 'new', canActivate: [authGuard], loadComponent: () => import('./features/reservations/new-reservation.page').then(m => pick(m, 'NewReservationPage')) },
          { path: ':id/edit', canActivate: [authGuard], loadComponent: () => import('./features/reservations/edit-reservation.page').then(m => pick(m, 'EditReservationPage')) }
        ]
      },

      // Ordini
      {
        path: 'orders',
        children: [
          { path: '', canActivate: [authGuard], loadComponent: () => import('./features/orders/orders-live.page').then(m => pick(m, 'OrdersLivePage')) },
          { path: 'new', canActivate: [authGuard], loadComponent: () => import('./features/orders/order-builder.page').then(m => pick(m, 'OrderBuilderPage')) }
        ]
      },
      { path: 'orders-list', canActivate: [authGuard], loadComponent: () => import('./features/orders/orders-list-live.page').then(m => pick(m, 'OrdersListLivePage')) },

      // NFC provisioning (admin)
      { path: 'nfc/bind', canActivate: [authGuard], loadComponent: () => import('./features/nfc/nfc-bind.page').then(m => pick(m, 'NfcBindPage')) },

      // 🆕 Clienti
      { path: 'customers', canActivate: [authGuard], loadComponent: () => import('./features/customers/customers-list.page').then(m => pick(m, 'CustomersListPage')) },
      { path: 'customers/new', canActivate: [authGuard], loadComponent: () => import('./features/customers/customer-detail.page').then(m => pick(m, 'CustomerDetailPage')) },
      { path: 'customers/:id', canActivate: [authGuard], loadComponent: () => import('./features/customers/customer-detail.page').then(m => pick(m, 'CustomerDetailPage')) },

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
      deps: [AuthService],
      multi: true
    },
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
};
