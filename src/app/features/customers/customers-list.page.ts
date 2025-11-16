// ============================================================================
// CustomersListPage — elenco clienti (users) con ricerca + stato vuoto
// - Import corretti (FormsModule, IonNote) per ngModel e ion-note
// - Cache-buster gestito dal service
// ============================================================================
import { Component, inject, signal } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonList,
  IonInput, IonButton, IonIcon, IonBadge, IonSpinner, IonNote
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { CustomersApi, Customer } from '../../core/customers/customers.api';

@Component({
  standalone: true,
  selector: 'app-customers-list',
  imports: [
    CommonModule, FormsModule, NgFor, NgIf, RouterLink,
    IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel,
    IonList, IonInput, IonButton, IonIcon, IonBadge, IonSpinner, IonNote
  ],
  template: `
<ion-header><ion-toolbar>
  <ion-title>Clienti</ion-title>
</ion-toolbar></ion-header>

<ion-content>
  <div style="padding:12px; display:flex; gap:8px;">
    <ion-input
      placeholder="Cerca nome/telefono/email"
      [(ngModel)]="q"
      (ionChange)="reload()">
    </ion-input>
    <ion-button (click)="newCustomer()">Nuovo</ion-button>
  </div>

  <!-- Stato vuoto -->
  <div *ngIf="!loading() && list().length === 0" style="padding:12px; opacity:.7">
    Nessun cliente trovato.
  </div>

  <ion-list *ngIf="list().length > 0">
    <ion-item *ngFor="let c of list()" [routerLink]="['/customers', c.id]">
      <ion-label>
        <div style="font-weight:600">{{ c.full_name || '(Senza nome)' }}</div>
        <div style="opacity:.85; font-size:.92em">
          {{ c.phone || '-' }} — {{ c.email || '-' }}
        </div>
      </ion-label>
      <ion-badge color="success" *ngIf="(c.orders_count||0) > 0" slot="end">
        {{ c.orders_count }} ordini
      </ion-badge>
      <ion-note slot="end" *ngIf="c.total_spent != null" style="margin-left:8px">
        € {{ (c.total_spent||0) | number:'1.2-2' }}
      </ion-note>
    </ion-item>
  </ion-list>

  <div *ngIf="loading()" style="padding:12px; display:flex; align-items:center; gap:8px;">
    <ion-spinner name="dots"></ion-spinner> Carico…
  </div>
</ion-content>
`})
export class CustomersListPage {
  private api = inject(CustomersApi);
  private router = inject(Router);

  q = '';
  list = signal<Customer[]>([]);
  loading = signal(false);

  constructor() { this.reload(); }

  reload() {
    this.loading.set(true);
    this.api.list(this.q).subscribe({
      next: (rows) => this.list.set(rows || []),
      error: (err) => {
        console.warn('⚠️ [CustomersList] list() KO', err);
        this.list.set([]);
      },
      complete: () => this.loading.set(false)
    });
  }

  newCustomer() {
    this.router.navigate(['/customers/new']);
  }
}
