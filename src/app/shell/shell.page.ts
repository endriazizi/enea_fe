import { Component, inject, signal } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonMenuButton,
  IonSplitPane, IonMenu, IonContent, IonList, IonMenuToggle, IonItem, IonIcon, IonLabel, IonBadge, 
  IonRouterOutlet} from '@ionic/angular/standalone';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';
import { ReservationsApi } from '../core/reservations/reservations.service';

// === INIZIO MODIFICA (tipizzazione MenuItem con 'badge?') ===
// ✅ Aggiunto: interfaccia forte per gli item del menu, con 'badge' opzionale.
//    Così il template può leggere item.badge senza errori TS.
interface MenuItem {
  label: string;
  path: string;
  icon?: string;
  badge?: boolean; // <- opzionale: se true, mostro il badge sul lato destro
}
// === FINE MODIFICA ===

// type MenuItem = { label: string; path: string; icon?: string };

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [IonBadge, 
    // Angular
    CommonModule, NgFor, RouterLink, RouterLinkActive,
    // Ionic
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonMenuButton,
    IonSplitPane, IonMenu, IonContent, IonList, IonMenuToggle, IonItem, IonIcon, IonLabel,IonRouterOutlet,
    // Router outlet
    RouterOutlet,
  ],
  templateUrl: './shell.page.html',
  styleUrls: ['./shell.page.scss'],
})


export class ShellPage {
  private auth = inject(AuthService);
  private router = inject(Router);
   private api = inject(ReservationsApi);

  // 🔖 Voci del menù (rotta + icona)
  items: MenuItem[] = [
    { label: 'Dashboard',            path: '/diagnostics',      icon: 'home' },
    { label: 'Lista prenotazioni',   path: '/reservations',     icon: 'list' ,   badge: true },
    { label: 'Nuova prenotazione',   path: '/reservations/new', icon: 'add-circle' },
    
  ];
// === INIZIO MODIFICA (badge "In attesa") ===
  // ✅ Aggiunto: signal con il numero di prenotazioni 'pending' di oggi.
  pendingToday = signal<number>(0);

  // Aggiorno il badge all'avvio e ogni 60s (leggero).
  private timer: any;

  constructor() {
    this.refreshPendingBadge();
    this.timer = setInterval(() => this.refreshPendingBadge(), 60_000);
      console.log('🧭 [Shell] menu items:', this.items);
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  // Calcolo YYYY-MM-DD locale (coerente con FE → BE)
  private todayISO(): string {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  // Chiama il BE per aggiornare il conteggio; log a emoji per debug veloce
  refreshPendingBadge() {
    const from = this.todayISO();
    const to = from;
    this.api.countByStatus({ from, to }).subscribe({
      next: (res) => {
        const n = Number(res?.pending ?? 0);
        this.pendingToday.set(n);
        console.log('🟡 [Shell] pending today =', n);
      },
      error: (err) => {
        console.warn('⚠️ [Shell] countByStatus KO', err);
        this.pendingToday.set(0);
      }
    });
  }
  // === FINE MODIFICA ===



  onLogout() {
    console.log('🔐 [Shell] logout()');
    this.auth.logout();
    this.router.navigate(['/login'], { queryParams: { redirect: '/diagnostics' } });
  }
}
