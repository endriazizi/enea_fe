// ============================================================================
// OrderBuilderPage
// - Stepper 1/2/3 (Dati → Articoli → Conferma)
// - Crea ordine via OrdersApi.create() e redirige a /orders
// - Stile: log emoji + commenti chiari
// ============================================================================

import { Component, OnDestroy, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';

// Angular / Common
import { NgIf, NgFor, DecimalPipe, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';

// Ionic standalone
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonButtons, IonButton, IonBackButton,
  IonSegment, IonSegmentButton, IonLabel,
  IonList, IonItem, IonInput, IonTextarea, IonNote, IonIcon
} from '@ionic/angular/standalone';

import { OrdersApi, } from '../../core/orders/orders.service';
import { OrderInput, OrderItemInput } from '../../core/orders/types';

@Component({
  standalone: true,
  selector: 'app-order-builder',
  templateUrl: './order-builder.page.html',
  imports: [
    // Angular
    NgIf, NgFor, DecimalPipe, NgSwitch, NgSwitchCase, NgSwitchDefault,
    // Ionic
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonButtons, IonButton, IonBackButton,
    IonSegment, IonSegmentButton, IonLabel,
    IonList, IonItem, IonInput, IonTextarea, IonNote, IonIcon,
  ],
})
export class OrderBuilderPage implements OnDestroy {
  private router = inject(Router);
  private api    = inject(OrdersApi);

  // ===== Stepper =============================================================
  readonly currentStep = signal<1 | 2 | 3>(1);
  private clampStep(n: number): 1 | 2 | 3 {
    if (n <= 1) return 1; if (n >= 3) return 3; return (n as 1|2|3);
  }
  next() { this.currentStep.set(this.clampStep(this.currentStep() + 1)); }
  prev() { this.currentStep.set(this.clampStep(this.currentStep() - 1)); }

  // ===== Dati cliente ========================================================
  customerName = signal('');
  customerPhone = signal('');
  note = signal('');

  onNameInput(ev: CustomEvent)  { this.customerName.set(((ev as any).detail?.value ?? '').toString()); }
  onPhoneInput(ev: CustomEvent) { this.customerPhone.set(((ev as any).detail?.value ?? '').toString()); }
  onNoteInput(ev: CustomEvent)  { this.note.set(((ev as any).detail?.value ?? '').toString()); }

  // ===== Articoli (mock semplici per prova end-to-end) ======================
  // Puoi sostituire con un menu reale via OrdersApi.getMenu()
  items = signal<OrderItemInput[]>([]);
  total = computed(() => this.items().reduce((acc, r) => acc + (r.price * r.qty), 0));

  addPreset(name: string, price: number) {
    const copy = [...this.items()];
    const ix = copy.findIndex(i => i.name === name && i.price === price);
    if (ix >= 0) copy[ix] = { ...copy[ix], qty: copy[ix].qty + 1 };
    else copy.push({ name, price, qty: 1 });
    this.items.set(copy);
  }
  decItem(name: string, price: number) {
    const copy = this.items().map(it => ({ ...it }));
    const ix = copy.findIndex(i => i.name === name && i.price === price);
    if (ix < 0) return;
    copy[ix].qty = Math.max(0, copy[ix].qty - 1);
    this.items.set(copy.filter(i => i.qty > 0));
  }

  // ===== Conferma ============================================================
  loading = signal(false);
  errorMsg = signal<string | null>(null);

  async submit() {
    if (!this.customerName().trim()) {
      this.errorMsg.set('Nome cliente obbligatorio');
      this.currentStep.set(1);
      return;
    }
    if (this.items().length === 0) {
      this.errorMsg.set('Aggiungi almeno un articolo');
      this.currentStep.set(2);
      return;
    }

    const payload: OrderInput = {
      customer_name: this.customerName().trim(),
      phone: this.customerPhone().trim() || null,
      note: this.note().trim() || null,
      channel: 'admin',
      items: this.items(),
    };

    this.loading.set(true);
    this.errorMsg.set(null);
    try {
      const order = await this.api.create(payload).toPromise();
      console.log('✅ [OrderBuilder] creato', order);
      // reset rapido
      this.items.set([]);
      this.customerName.set('');
      this.customerPhone.set('');
      this.note.set('');
      // redirect lista
      this.router.navigate(['/orders']);
    } catch (e: any) {
      console.error('💥 [OrderBuilder] create KO', e);
      this.errorMsg.set(e?.message || 'Errore creazione ordine');
    } finally {
      this.loading.set(false);
    }
  }

  ngOnDestroy(): void {}
}
