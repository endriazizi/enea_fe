import { NgIf } from '@angular/common';
// Component: AppMenu
// - Mostra le voci del menù laterale (split-pane / ion-menu).
// - Usa *ngFor (IMPORTANTE: NgFor importato qui).
// - Icone Ionicons: vengono registrate in src/app/icons.ts (vedi sotto).

import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import {
  IonContent, IonList, IonMenuToggle, IonItem, IonIcon, IonLabel
} from '@ionic/angular/standalone';
import { RouterLink, RouterLinkActive } from '@angular/router';

type MenuItem = { label: string; path: string; icon?: string };

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss'],
  imports: [
    // Angular
    NgIf,NgFor, RouterLink, RouterLinkActive,
    // Ionic
    IonContent, IonList, IonMenuToggle, IonItem, IonIcon, IonLabel,
  ]
})
export class AppMenuComponent {
  // NB: link corretti: lista prenotazioni è "/reservations" (NON "/reservations/list")
  items: MenuItem[] = [
    { label: 'Dashboard',            path: '/diagnostics',     icon: 'home' },
    { label: 'Lista prenotazioni',   path: '/reservations',    icon: 'list' },
    { label: 'Nuova prenotazione',   path: '/reservations/new',icon: 'add-circle' },
    // { label: 'Impostazioni',       path: '/settings',        icon: 'settings' }, // futuro
  ];
}
