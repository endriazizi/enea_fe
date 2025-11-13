// src/app/features/orders/order-inspector/order-inspector.component.ts
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, Signal, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonBadge, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonItem, IonLabel, IonList, IonNote, IonSpinner } from '@ionic/angular/standalone';

/**
 * OrderInspectorComponent
 * -----------------------------------------------------------------------------
 * Componente "read-only" che mostra il dettaglio ordine per un tavolo.
 * - Non altera le tue logiche di builder o di stampa.
 * - Emette eventi che la pagina genitore mappa ai metodi già esistenti.
 * - UI identica su desktop (pane destro) e mobile (modal).
 *
 * INPUT:
 *  - table:     meta tavolo (numero, sala, ecc.)
 *  - orders:    lista ordini recenti per quel tavolo (opzionale)
 *  - active:    ordine attivo da mostrare in dettaglio
 *  - busy:      stato "caricamento"
 *
 * OUTPUT:
 *  - openBuilder: click su "Apri in builder"
 *  - printBill:   click su "Stampa conto"
 *  - printComanda(center: 'pizzeria'|'cucina')
 *  - close:       chiudi pannello/modal
 */
@Component({
  selector: 'app-order-inspector',
  standalone: true,
  imports: [
    CommonModule,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonButton, IonBadge, IonList, IonItem, IonLabel, IonNote, IonIcon, IonSpinner
  ],
  templateUrl: './order-inspector.component.html',
  styleUrls: ['./order-inspector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderInspectorComponent {
  // ====== INPUT ======
  @Input() table: any | null = null;
  @Input() orders: any[] = [];       // ordini recenti (se >1 mostro pick)
  @Input() active: any | null = null; // ordine attivo
  @Input() busy = false;

  // ====== OUTPUT ======
  @Output() openBuilder = new EventEmitter<void>();
  @Output() printBill = new EventEmitter<void>();
  @Output() printComanda = new EventEmitter<'pizzeria' | 'cucina'>();
  @Output() close = new EventEmitter<void>();

  // ====== STATE LOCALE (solo visuale) ======
  picked = signal<any | null>(null);

  constructor() {
    // 🧠 default: se non scelto esplicitamente, uso l'active passato dal parent
    this.picked.set(this.active);
  }

  // Quando cambia @Input active (Angular non-signal), aggiorno picked.
  ngOnChanges() {
    if (!this.picked() && this.active) {
      this.picked.set(this.active);
    }
  }

  // 👀 Helpers
  titleRoom(): string {
    return (this.table?.room_name || this.table?.room || 'Sala');
  }
  titleTable(): string {
    const n = this.table?.number ?? this.table?.table_number ?? '?';
    return `Tav. ${n} • ${this.titleRoom()}`;
  }
  customerLine(o: any): string {
    return (o?.customer_name || 'Cliente');
  }
  scheduledLine(o: any): string {
    if (!o?.scheduled_at) return '';
    // NB: il formato data lo gestisci dal parent col pipe |date
    return o.scheduled_at;
  }
  totalOf(o: any): number {
    return Number(o?.total || 0);
  }

  // ====== EMITTER WRAPPERS (log con emoji, come piace a te) ======
  onOpenBuilder() {
    console.log('🧱 [OrderInspector] Apri in builder richiesto');
    this.openBuilder.emit();
  }
  onPrintBill() {
    console.log('🧾 [OrderInspector] Stampa CONTO richiesta');
    this.printBill.emit();
  }
  onPrintComanda(center: 'pizzeria'|'cucina') {
    console.log(`🍕 [OrderInspector] COMANDA → ${center.toUpperCase()} richiesta`);
    this.printComanda.emit(center);
  }
  onClose() {
    console.log('🗂️ [OrderInspector] Chiudi pannello/modal');
    this.close.emit();
  }

  onPickOrder(o: any) {
    console.log('🔎 [OrderInspector] Seleziona ordine nella lista', o?.id);
    this.picked.set(o);
  }
}
