// src/app/shell/shell.page.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonMenuButton,
  IonSplitPane, IonMenu, IonContent, IonList, IonMenuToggle, IonItem, IonIcon,
  IonLabel, IonBadge, IonRouterOutlet
} from '@ionic/angular/standalone';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';
import { ReservationsApi } from '../core/reservations/reservations.service';

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
    IonSplitPane, IonMenu, IonContent, IonList, IonMenuToggle, IonItem,
    IonIcon, IonLabel, IonBadge, IonRouterOutlet,
    // Router outlet
    RouterOutlet,
  ],
})
export class ShellPage {
  private auth  = inject(AuthService);
  private router = inject(Router);
  private api    = inject(ReservationsApi);

  // 🔖 Voci del menù (rotta + icona)
  items: MenuItem[] = [
    { label: 'Dashboard',            path: '/diagnostics',      icon: 'home' },
    { label: 'Lista prenotazioni',   path: '/reservations',     icon: 'list',       badge: true },
    { label: 'Nuova prenotazione',   path: '/reservations/new', icon: 'add-circle' },
    // { label: 'Ordini (live)',      path: '/orders',           icon: 'time-outline' },
    // { label: 'Nuovo ordine',       path: '/orders/new',       icon: 'create-outline' },
  ];

  // === Badge "in attesa" =====================================================
  pendingToday = signal<number>(0);
  private timer: any;

  constructor() {
    this.refreshPendingBadge();
    this.timer = setInterval(() => this.refreshPendingBadge(), 60_000);
    console.log('🧭 [Shell] menu items:', this.items);
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
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
