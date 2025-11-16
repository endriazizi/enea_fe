// src/app/shell/shell.page.ts
// Shell contenitore dell’app.
// ✅ Menu in OVERLAY, chiuso di default (anche su desktop).
// ✅ Auto-close del menu ad ogni navigazione (utile su mobile).
// ✅ Badge “in attesa” per prenotazioni come prima.
// ✅ NUOVA VOCE di menu per "orders-list-live.page" (/orders-list).
// ✅ NUOVA VOCE di menu "NFC / QR" (/nfc/bind) — provisioning adesivi NFC/QR.
// Stile: commenti lunghi, log con emoji, Ionic standalone + Signals.

import { Component, inject, signal, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonMenuButton,
  IonMenu, IonContent, IonList, IonMenuToggle, IonItem, IonIcon,
  IonLabel, IonBadge, IonRouterOutlet
} from '@ionic/angular/standalone';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../core/auth/auth.service';
import { ReservationsApi } from '../core/reservations/reservations.service';
import { filter, Subscription } from 'rxjs';

// === Tipizzazione voce di menu (badge opzionale) ============================
interface MenuItem {
  label: string;
  path: string;
  icon?: string;
  badge?: boolean; // se true, mostro il badge "In attesa"
}

@Component({
  selector: 'app-shell',
  standalone: true,
  templateUrl: './shell.page.html',
  styleUrls: ['./shell.page.scss'],
  imports: [
    // Angular
    CommonModule, NgFor, RouterLink, RouterLinkActive,
    // Ionic
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonMenuButton,
    IonMenu, IonContent, IonList, IonMenuToggle, IonItem, IonIcon,
    IonLabel, IonBadge, IonRouterOutlet,
    // Router outlet
    RouterOutlet,
  ],
})
export class ShellPage implements OnInit, OnDestroy {
  private auth   = inject(AuthService);
  private router = inject(Router);
  private api    = inject(ReservationsApi);
  private menu   = inject(MenuController);

  // 🔖 Voci del menù (rotta + icona)
  // NB: aggiunta nuova voce "/orders-list" per la pagina OrdersListLivePage
  // NB: aggiunta nuova voce "/nfc/bind" per provisioning NFC/QR
 items: MenuItem[] = [
  { label: 'Dashboard',             path: '/diagnostics',     icon: 'home' },
  { label: 'Lista prenotazioni',    path: '/reservations',    icon: 'list',       badge: true },
  { label: 'Nuova prenotazione',    path: '/reservations/new',icon: 'add-circle' },

  { label: 'Tavoli',                path: '/tables',          icon: 'grid' },

  // 🆕 Clienti
  { label: 'Clienti',               path: '/customers',       icon: 'people-outline' },

  { label: 'NFC / QR',              path: '/nfc/bind',        icon: 'scan-outline' },

  { label: 'Ordini (live)',         path: '/orders',          icon: 'time-outline' },
  { label: 'Ordini (lista live)',   path: '/orders-list',     icon: 'pulse-outline' },
  { label: 'Nuovo ordine',          path: '/orders/new',      icon: 'create-outline' },
  { label: 'Prenota',               path: '/prenota',         icon: 'time-outline' },
];
  // === Badge "in attesa" =====================================================
  pendingToday = signal<number>(0);
  private timer?: any;
  private navSub?: Subscription;

  constructor() {
    this.refreshPendingBadge();
    // Aggiorna badge prenotazioni ogni 60s (leggero)
    this.timer = setInterval(() => this.refreshPendingBadge(), 60_000);
    console.log('🧭 [Shell] menu items:', this.items);
  }

  async ngOnInit() {
    // 👇 Forzo menu CHIUSO all’avvio (anche se il browser ricordava "aperto")
    try { await this.menu.close(); } catch {}

    // 👇 Auto-close del menu a ogni navigazione (utile su mobile/tablet)
    this.navSub = this.router.events
      .pipe(filter(ev => ev instanceof NavigationEnd))
      .subscribe(async () => {
        try { await this.menu.close(); } catch {}
      });
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
    if (this.navSub) this.navSub.unsubscribe();
  }

  // Calcolo YYYY-MM-DD locale (coerente FE → BE)
  private todayISO(): string {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  // Chiamo il BE per aggiornare il conteggio; log a emoji per debug veloce
  refreshPendingBadge() {
    const from = this.todayISO();
    const to = from;
    this.api.countByStatus({ from, to }).subscribe({
      next: (res) => {
        const n = Number((res as any)?.pending ?? 0);
        this.pendingToday.set(n);
        console.log('🟡 [Shell] pending today =', n);
      },
      error: (err) => {
        console.warn('⚠️ [Shell] countByStatus KO', err);
        this.pendingToday.set(0);
      }
    });
  }

  onLogout() {
    console.log('🔐 [Shell] logout()');
    this.auth.logout();
    this.router.navigate(['/login'], { queryParams: { redirect: '/diagnostics' } });
  }
}
