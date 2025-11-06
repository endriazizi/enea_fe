// ============================================================================
// MoveReservationModalComponent
// - Modal per "Sposta" prenotazione su un altro tavolo
// - Mostra tavoli SUGGERITI (liberi nella fascia & capienza ≥ covers)
//   + Altri liberi (capienza qualsiasi), con filtro capienza minimo
// - Nessuna chiamata BE qui: al "Conferma" restituisce { ok, table_id }
// - Mantiene il tuo stile: commenti lunghi, log con emoji, Ionic standalone
// - 🛠️ trackById per *ngFor
// ============================================================================

import { Component, Input, computed, signal } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
  IonContent, IonList, IonItem, IonLabel, IonBadge, IonNote,
  IonSearchbar, IonRange, IonIcon, IonSelect, IonSelectOption
} from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular';
import { Reservation, Table } from '../../../../core/reservations/reservations.service';

// 🔠 Tipo “enhanced” locale per la view (flag interni)
type UTable = (Table & { room_name?: string }) & { _free?: boolean; _suggested?: boolean };

@Component({
  standalone: true,
  selector: 'app-move-reservation-modal',
  templateUrl: './move-reservation.modal.html',
  styleUrls: ['./move-reservation.modal.scss'],
  imports: [
    CommonModule, NgFor, NgIf,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
    IonContent, IonList, IonItem, IonLabel, IonBadge, IonNote,
    IonSearchbar, IonRange, IonIcon, IonSelect, IonSelectOption
  ]
})
export class MoveReservationModalComponent {
  // === Inputs ===============================================================
  @Input() currentTableId!: number;
  @Input() reservation!: { id:number; start_at:string; end_at:string; covers:number; room_id?:number|null };
  @Input() tables!: (Table & { room_name?: string })[];
  @Input() reservations!: Reservation[];

  // === UI state =============================================================
  search = signal<string>('');
  minCapacity = signal<number>(0);
  roomFilter = signal<number|0>(0); // 0 = tutte
  selectedTableId = signal<number | null>(null);

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    const def = Number(this.reservation?.covers || 0);
    this.minCapacity.set(def > 0 ? def : 0);
  }

  // === Overlap helper =======================================================
  private overlaps(aStart: string, aEnd: string, bStart: string, bEnd: string): boolean {
    const aS = new Date(aStart).getTime();
    const aE = new Date(aEnd).getTime();
    const bS = new Date(bStart).getTime();
    const bE = new Date(bEnd).getTime();
    // [aS, aE) overlap [bS, bE)  <=>  !(aE <= bS || aS >= bE)
    return !(aE <= bS || aS >= bE);
  }

  private tableIsFreeForSlot(tableId: number): boolean {
    const slotS = this.reservation.start_at;
    const slotE = this.reservation.end_at;
    for (const r of this.reservations || []) {
      if (!r.table_id || r.table_id !== tableId) continue;
      if (r.id === this.reservation.id) continue;
      if (!r.start_at || !r.end_at) continue;
      if (this.overlaps(slotS, slotE, r.start_at, r.end_at)) return false;
    }
    return true;
  }

  // === Liste calcolate ======================================================
  private filteredTables = computed<UTable[]>(() => {
    const txt = (this.search() || '').toLowerCase().trim();
    const minCap = Number(this.minCapacity() || 0);
    const roomId = Number(this.roomFilter() || 0);

    return (this.tables || [])
      .filter(t => t.id !== this.currentTableId)
      .filter(t => !roomId || t.room_id === roomId)
      .filter(t => {
        const pool = `${t.label || ''} ${t.room_name || ''} ${t.table_number ?? ''}`.toLowerCase();
        return !txt || pool.includes(txt);
      })
      .map<UTable>(t => {
        const cap = Number(t.capacity || 0);
        const free = this.tableIsFreeForSlot(t.id);
        const suggested = free && cap >= minCap;
        return { ...t, _free: free, _suggested: suggested };
      });
  });

  suggested = computed<UTable[]>(() => this.filteredTables().filter(t => t._suggested));
  others    = computed<UTable[]>(() => this.filteredTables().filter(t => t._free && !t._suggested));

  // trackBy
  trackById = (_: number, t: UTable) => t.id;

  // === Handlers =============================================================
  onPick(tid: number) { this.selectedTableId.set(tid); }
  onCancel() { this.modalCtrl.dismiss({ ok: false }, 'cancel'); }
  onConfirm() {
    const id = this.selectedTableId();
    if (!id) { this.onCancel(); return; }
    this.modalCtrl.dismiss({ ok: true, table_id: id }, 'confirm');
  }
}

// 👉 default export per compat con lazy imports “pick”
export default MoveReservationModalComponent;
