import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFooter,
  IonButtons,
  IonButton,
  IonTextarea,
  IonRadioGroup,
  IonRadio,
  IonItem,
  IonList,
  IonLabel,
  IonIcon,
} from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'resv-status-action-modal',
  templateUrl: './status-action.modal.html',
  styleUrls: ['./status-action.modal.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonFooter,
    IonButtons,
    IonButton,
    IonTextarea,
    IonRadioGroup,
    IonRadio,
    IonItem,
    IonList,
    IonLabel,
    IonIcon,
  ],
})
export class StatusActionModalComponent {
  @Input() reservationId!: number;

  action: 'accept' | 'reject' | 'cancel' = 'accept';
  reason = '';

  constructor(private modalCtrl: ModalController) {}

  close() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onConfirm() {
    const reasonTrim = this.reason.trim();
    if ((this.action === 'reject' || this.action === 'cancel') && !reasonTrim) {
      alert('Inserisci un motivo per rifiutare/annullare.');
      return;
    }
    console.log('[StatusActionModal] confirm →', this.action, reasonTrim); // 👈
    this.modalCtrl.dismiss({ action: this.action, reason: reasonTrim || undefined }, 'confirm');
  }
}
