// ============================================================================
// CustomerDetailPage — crea/modifica cliente + storico ordini
// Stile: commenti lunghi in italiano, log a emoji, Angular standalone + Ionic
// ============================================================================
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
  IonContent, IonItem, IonLabel, IonList, IonInput, IonTextarea,
  IonButton, IonIcon, IonSpinner, IonNote, IonBadge
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CustomersApi, Customer } from '../../core/customers/customers.api';

@Component({
  standalone: true,
  selector: 'app-customer-detail',
  imports: [
    CommonModule, FormsModule, NgIf, NgFor, RouterLink,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
    IonContent, IonItem, IonLabel, IonList, IonInput, IonTextarea,
    IonButton, IonIcon, IonSpinner, IonNote, IonBadge
  ],
  template: `
<ion-header>
  <ion-toolbar>
    <ion-buttons slot="start"><ion-back-button defaultHref="/customers"></ion-back-button></ion-buttons>
    <ion-title>{{ id() ? 'Cliente' : 'Nuovo cliente' }}</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>
  <!-- Stato caricamento -->
  <div *ngIf="loading()" style="padding:12px; display:flex; align-items:center; gap:8px;">
    <ion-spinner name="dots"></ion-spinner> Carico…
  </div>

  <!-- Form -->
  <ion-list *ngIf="!loading()">
    <ion-item>
      <ion-label position="stacked">Nome completo</ion-label>
      <ion-input [(ngModel)]="model.full_name" placeholder="Mario Rossi"></ion-input>
    </ion-item>

    <ion-item>
      <ion-label position="stacked">Telefono</ion-label>
      <ion-input [(ngModel)]="model.phone" placeholder="333..."></ion-input>
    </ion-item>

    <ion-item>
      <ion-label position="stacked">Email</ion-label>
      <ion-input [(ngModel)]="model.email" type="email" placeholder="mario@example.com"></ion-input>
    </ion-item>

    <ion-item>
      <ion-label position="stacked">Tag</ion-label>
      <ion-input [(ngModel)]="model.tags" placeholder="VIP, residente, …"></ion-input>
    </ion-item>

    <ion-item>
      <ion-label position="stacked">Note</ion-label>
      <ion-textarea [(ngModel)]="model.note" autoGrow="true"></ion-textarea>
    </ion-item>

    <div style="padding:12px; display:flex; gap:8px; flex-wrap:wrap;">
      <ion-button color="primary" (click)="save()" [disabled]="saving()">
        {{ id() ? 'Salva' : 'Crea' }}
      </ion-button>

      <ion-button color="medium" (click)="reload()" [disabled]="saving()">Ricarica</ion-button>

      <ion-button color="danger" *ngIf="id()" (click)="disable()" [disabled]="saving()">Disattiva</ion-button>
      <ion-button color="success" *ngIf="id()" (click)="enable()" [disabled]="saving()">Riattiva</ion-button>
    </div>

    <ion-item lines="none" *ngIf="id()">
      <ion-note>Stato: <b>{{ activeLabel() }}</b></ion-note>
      <ion-badge slot="end" [color]="isActive() ? 'success':'medium'">
        {{ isActive() ? 'ATTIVO' : 'DISATTIVO' }}
      </ion-badge>
    </ion-item>
  </ion-list>

  <!-- Storico ordini del cliente -->
  <div *ngIf="id()" style="padding:12px;">
    <h3 style="margin:0 0 8px 0;">Storico ordini</h3>

    <div *ngIf="ordersLoading()" style="display:flex; align-items:center; gap:8px;">
      <ion-spinner name="dots"></ion-spinner> Carico ordini…
    </div>

    <div *ngIf="!ordersLoading() && orders().length===0" style="opacity:.7">Nessun ordine trovato.</div>

    <ion-list *ngIf="orders().length>0">
      <ion-item *ngFor="let o of orders()">
        <ion-label>
          <div style="font-weight:600">#{{ o.id }} — {{ o.status || '—' }}</div>
          <div style="opacity:.85; font-size:.92em">{{ o.created_at || o.scheduled_at || '' }}</div>
        </ion-label>
        <ion-note slot="end">€ {{ (o.total||0) | number:'1.2-2' }}</ion-note>
      </ion-item>
    </ion-list>
  </div>
</ion-content>
`
})
export class CustomerDetailPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private api = inject(CustomersApi);

  // id cliente (null => nuovo)
  id = signal<number | null>(null);

  // modello editabile
  model: Partial<Customer> = {
    full_name: '',
    phone: '',
    email: '',
    tags: '',
    note: '',
    is_active: 1
  };

  // stato UI
  loading = signal(false);
  saving = signal(false);

  // storico ordini
  orders = signal<any[]>([]);
  ordersLoading = signal(false);

  ngOnInit() {
    const p = this.route.snapshot.paramMap.get('id');
    this.id.set(p && p !== 'new' ? Number(p) : null);
    if (this.id()) this.load();
  }

  // === Helpers ===============================================================
isActive() {
  const v = this.model.is_active;
  if (v === true) return true;
  if (v === false || v == null) return false; // null/undefined/false
  return Number(v) === 1;
}
  activeLabel() {
    return this.isActive() ? 'ATTIVO' : 'DISATTIVO';
  }

  // === CRUD ==================================================================
  reload() { if (this.id()) this.load(); }

  load() {
    if (!this.id()) return;
    this.loading.set(true);
    this.api.getById(this.id()!).subscribe({
      next: (c: Customer) => {
        this.model = { ...c };
        console.log('✅ [Customer] load OK', c);
      },
      error: (err: any) => {
        console.warn('⚠️ [Customer] load KO', err);
      },
      complete: () => {
        this.loading.set(false);
        this.loadOrders();
      }
    });
  }

  save() {
    this.saving.set(true);
    const payload: Partial<Customer> = { ...this.model };

    const obs = this.id()
      ? this.api.update(this.id()!, payload)
      : this.api.create(payload);

    obs.subscribe({
      next: (res: any) => {
        console.log('💾 [Customer] save OK', res);
        const newId = (res?.id ?? this.id()) as number;
        if (!this.id()) {
          this.router.navigate(['/customers', newId]);
          this.id.set(newId);
        } else {
          this.load();
        }
      },
      error: (err: any) => {
        console.warn('⚠️ [Customer] save KO', err);
      },
      complete: () => this.saving.set(false)
    });
  }

  disable() {
    if (!this.id()) return;
    this.saving.set(true);
    this.api.disable(this.id()!).subscribe({
      next: () => { console.log('🛑 [Customer] disattivato'); this.load(); },
      error: (err: any) => console.warn('⚠️ [Customer] disable KO', err),
      complete: () => this.saving.set(false)
    });
  }

  enable() {
    if (!this.id()) return;
    this.saving.set(true);
    this.api.enable(this.id()!).subscribe({
      next: () => { console.log('🟢 [Customer] riattivato'); this.load(); },
      error: (err: any) => console.warn('⚠️ [Customer] enable KO', err),
      complete: () => this.saving.set(false)
    });
  }

  // === Storico ordini ========================================================
  loadOrders() {
    if (!this.id()) return;
    this.ordersLoading.set(true);
    this.api.orders(this.id()!).subscribe({
      next: (rows: any[]) => this.orders.set(rows || []),
      error: (err: any) => { console.warn('⚠️ [Customer] orders KO', err); this.orders.set([]); },
      complete: () => this.ordersLoading.set(false)
    });
  }
}
