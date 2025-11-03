// src/app/features/orders/_components/item-customize.modal.ts
// ============================================================================
// Modal standalone per personalizzare un prodotto con chips ingredienti.
// - Carica ingredienti via OrdersApi.getProductIngredients(product.id)
// - Toggle chip = include/escludi; opzionale: chip "extra" se is_extra=true
// - Ritorna { notes: string } (es. "SENZA cipolla, +olive")
// ============================================================================

import { Component, input, signal, inject } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon,
  IonContent, IonList, IonItem, IonLabel, IonChip, IonNote, IonSpinner
} from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular';
import { OrdersApi } from '../../../core/orders/orders.service';
import { MenuItem, ProductIngredient } from '../../../core/orders/types';

@Component({
  standalone: true,
  selector: 'app-item-customize-modal',
  template: `
<ion-header>
  <ion-toolbar>
    <ion-title>Personalizza</ion-title>
    <ion-buttons slot="end">
      <ion-button (click)="dismiss()">
        <ion-icon name="close-outline"></ion-icon>
      </ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding">
  <ion-item lines="full">
    <ion-label>
      <div style="font-weight:600">{{ product()?.name }}</div>
      <ion-note>Seleziona/deseleziona gli ingredienti</ion-note>
    </ion-label>
  </ion-item>

  <div *ngIf="loading(); else chipsTpl" style="padding:14px;display:flex;gap:10px;align-items:center;">
    <ion-spinner name="lines"></ion-spinner>
    <span>Carico ingredienti…</span>
  </div>

  <ng-template #chipsTpl>
    <ion-list inset="true">
      <ion-item lines="none">
        <ion-label position="stacked">Ingredienti</ion-label>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          <ion-chip
            *ngFor="let ing of ingredients()"
            [color]="ing.included ? 'primary' : 'medium'"
            (click)="toggle(ing)"
            outline="true">
            <ion-icon [name]="ing.included ? 'checkmark-circle' : 'ellipse-outline'"></ion-icon>
            <ion-label style="margin-left:6px">
              {{ ing.name }}<ng-container *ngIf="ing.is_extra"> (+)</ng-container>
            </ion-label>
          </ion-chip>
        </div>
      </ion-item>
    </ion-list>

    <div class="ion-padding">
      <ion-button expand="block" (click)="confirm()">Conferma</ion-button>
    </div>
  </ng-template>
</ion-content>
  `,
  imports: [
    NgIf, NgFor,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon,
    IonContent, IonList, IonItem, IonLabel, IonChip, IonNote, IonSpinner,
  ]
})
export class ItemCustomizeModalComponent {
  private api = inject(OrdersApi);
  private modal = inject(ModalController);

  product = input.required<MenuItem>();
  loading = signal(true);
  ingredients = signal<ProductIngredient[]>([]);

  async ionViewWillEnter() {
    try {
      const rows = await this.api.getProductIngredients(this.product().id).toPromise();
      this.ingredients.set(rows || []);
    } catch (e) {
      console.warn('🥣 [CustomizeModal] load ingredients KO', e);
      this.ingredients.set([]);
    } finally {
      this.loading.set(false);
    }
  }

  toggle(ing: ProductIngredient) {
    // switch on/off mantenendo il resto immutato
    this.ingredients.set(this.ingredients().map(r => r.id === ing.id ? { ...r, included: !r.included } : r));
  }

  // Crea una nota in stile “SENZA cipolla, +olive”
  private buildNotes(): string | null {
    const removed = this.ingredients().filter(i => i.included === false && !i.is_extra).map(i => i.name);
    const added   = this.ingredients().filter(i => i.included === true  && !!i.is_extra).map(i => i.name);
    const parts: string[] = [];
    if (removed.length) parts.push(`SENZA ${removed.join(', ')}`);
    if (added.length)   parts.push(`+${added.join(', ')}`);
    const note = parts.join(', ');
    return note ? note : null;
  }

  async confirm() {
    const notes = this.buildNotes();
    await this.modal.dismiss({ notes }, 'confirm');
  }

  async dismiss() {
    await this.modal.dismiss(null, 'cancel');
  }
}
