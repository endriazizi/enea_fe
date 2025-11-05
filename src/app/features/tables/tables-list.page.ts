// ============================================================================
// TablesListPage — Vista "Lista tavoli" (oggi) per Admin PWA
// - Card compatte con stato: 🟢 free | 🟡 upcoming | 🔴 busy | 🔵 cleaning (opz.)
// - Segment per SALA, ricerca testuale, Quick day picker (riuso app-date-quick)
// - Signals + commenti lunghi + log con emoji, nel tuo stile
// - 🆕 Action Sheet su tap card: Dettagli / Check-in / Sposta / Stampa
//    • Pulsanti dinamici in base allo stato corrente del tavolo
//    • Niente cambio logiche esistenti: chiama i tuoi metodi openDetails/checkIn/printKitchen/newReservation
//    • “Sposta” per ora mostra un toast (placeholder), pronto a collegare un modal/flow
// ============================================================================

import { Component, effect, inject, signal, computed } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
  IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader,
  IonCardTitle, IonCardContent, IonBadge, IonItem, IonNote,
  IonSegment, IonSegmentButton, IonSearchbar, IonSpinner
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';

import { ReservationsApi, Room, Table, Reservation } from '../../core/reservations/reservations.service';
import { DateQuickComponent } from '../reservations/_components/ui/date-quick/date-quick.component';

// 🆕: servizi runtime (non componenti) per sheet/toast
import { ActionSheetController, ToastController } from '@ionic/angular';

type TableState = 'free'|'upcoming'|'busy'|'cleaning';

export type TableCard = {
  id: number;
  number: string;
  room_id: number;
  room_name: string;
  capacity: number;
  state: TableState;
  resNow?: { id:number; start_at:string; end_at:string; customer_name:string; covers:number; kids?:number; notes?:string; has_kid_products?:boolean; };
  resNext?: { id:number; start_at:string; end_at:string; customer_name:string; covers:number; };
};

@Component({
  standalone: true,
  selector: 'app-tables-list',
  templateUrl: './tables-list.page.html',
  styleUrls: ['./tables-list.page.scss'],
  imports: [
    CommonModule, NgFor, NgIf, RouterLink,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
    IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader,
    IonCardTitle, IonCardContent, IonBadge, IonItem, IonNote,
    IonSegment, IonSegmentButton, IonSearchbar, IonSpinner,
    DateQuickComponent
  ]
})
export class TablesListPage {
  // === DI ===========================================================
  private api    = inject(ReservationsApi);
  private router = inject(Router);

  // 🆕 Controller runtime per sheet/toast (stile Ionic)
  private actionSheet = inject(ActionSheetController);
  private toast       = inject(ToastController);

  // === Stato UI =====================================================
  loading      = signal(true);
  roomsSig     = signal<Room[]>([]);
  tablesRawSig = signal<(Table & { room_name?: string })[]>([]);
  dayISO       = signal(this.todayISO());     // giorno selezionato (default oggi)
  filterState  = signal<'all'|'free'|'upcoming'|'busy'|'cleaning'>('all');
  filterRoomId = signal<number|0>(0);         // 0 = tutte le sale
  filterText   = signal<string>('');          // ricerca per nome/telefono

  // === Dati composti ================================================
  private reservationsTodaySig = signal<Reservation[]>([]);

  selectedDayForPicker = () => this.dayISO();
  onQuickFilterDay = (iso: string) => { this.dayISO.set(iso); this.reload(); };

  roomOptions = computed(() => [{ id: 0, name: 'Tutte' }, ...this.roomsSig().map(r => ({ id: r.id, name: r.name }))]);

  tablesSig = computed<TableCard[]>(() => {
    const day = this.dayISO();
    const isToday = (day === this.todayISO());
    const now = new Date();
    const res = this.reservationsTodaySig();
    const byTable = groupBy(res, r => Number((r as any).table_id || 0));

    return this.tablesRawSig().map(t => {
      const list = (byTable.get(Number(t.id)) || []).filter(r => (r.start_at && r.end_at));
      const [resNow, resNext] = pickNowAndNext(list, day, isToday ? now : null);
      const state: TableState = resNow ? 'busy' : (resNext ? 'upcoming' : 'free');
      return {
        id: t.id,
        number: String(t.table_number || t.label || t.id),
        room_id: t.room_id!,
        room_name: t.room_name || '',
        capacity: Number(t.capacity || 0),
        state,
        resNow:  resNow  ? decorateRes(resNow)   : undefined,
        resNext: resNext ? decorateResNext(resNext) : undefined
      };
    });
  });

  tablesFilteredSig = computed<TableCard[]>(() => {
    const state = this.filterState(); const roomId = this.filterRoomId(); const txt = (this.filterText() || '').toLowerCase().trim();
    return this.tablesSig().filter(t => {
      if (state !== 'all' && t.state !== state) return false;
      if (roomId && t.room_id !== roomId) return false;
      if (!txt) return true;
      const pool = [
        t.number, t.room_name,
        t.resNow?.customer_name || '',
        t.resNext?.customer_name || '',
        t.resNow?.notes || ''
      ].join(' ').toLowerCase();
      return pool.includes(txt);
    });
  });

  constructor() {
    this.reload();
    effect(() => {
      console.log('🧭 [TablesList] filters:', { day: this.dayISO(), state: this.filterState(), room: this.filterRoomId(), text: this.filterText() });
    });
  }

  async reload() {
    this.loading.set(true);
    try {
      const rooms = await this.api.listRooms().toPromise();
      this.roomsSig.set(rooms || []);

      const allTables = await this.api.listAllTablesAcrossRooms().toPromise();
      this.tablesRawSig.set(allTables || []);

      const from = this.dayISO(); const to = this.dayISO();
      const reservations = await this.api.list({ from, to }).toPromise();
      this.reservationsTodaySig.set(reservations || []);

      console.log('📊 [TablesList] rooms:', rooms?.length ?? 0, 'tables:', allTables?.length ?? 0, 'res:', reservations?.length ?? 0);
    } catch (e) {
      console.warn('⚠️ [TablesList] reload KO', e);
      this.roomsSig.set([]); this.tablesRawSig.set([]); this.reservationsTodaySig.set([]);
    } finally {
      this.loading.set(false);
    }
  }

  onFilterChange(ev: CustomEvent) { this.filterState.set(String((ev.detail as any)?.value || 'all') as any); }
  onRoomChange(ev: CustomEvent)   { this.filterRoomId.set(Number((ev.detail as any)?.value || 0)); }
  onSearchChange(ev: CustomEvent) { this.filterText.set(String((ev.detail as any)?.value || '')); }

  // === Azioni "di base" già presenti (logiche esistenti, NON toccate) ========
  openDetails(t: TableCard)   { if (t.resNow) this.router.navigate(['/reservations', t.resNow.id, 'edit']); }
  checkIn(t: TableCard)       { console.log('✅ [TablesList] check-in', t); /* TODO: integrare flow check-in */ }
  printKitchen(t: TableCard)  { console.log('🖨️ [TablesList] print kitchen for table', t.id); /* TODO: integrare stampa */ }
  newReservation(t?: TableCard) {
    const extras = t ? { queryParams: { room_id: t.room_id, table_id: t.id } } : undefined;
    this.router.navigate(['/reservations/new'], extras);
  }

  // 🆕 Placeholder "Sposta": mostra un toast; pronto per aprire un modal/flow
  private async moveReservation(t: TableCard) {
    console.log('🔀 [TablesList] sposta prenotazione — tavolo', t);
    const toast = await this.toast.create({
      message: 'Sposta: pronto per collegare un modal di selezione tavolo ✅',
      duration: 1500
    });
    await toast.present();
  }

  // === Action Sheet su tap card =============================================
  async openActions(t: TableCard) {
    try {
      const isFree = t.state === 'free';
      const isUpcoming = t.state === 'upcoming';
      const isBusy = t.state === 'busy';

      // Costruisco dinamicamente i pulsanti mantenendo le etichette chiare
      const buttons: any[] = [];

      if (!isFree) {
        buttons.push({
          text: 'Dettagli',
          icon: 'information-circle-outline',
          handler: () => this.openDetails(t)
        });
      }

      if (isUpcoming) {
        buttons.push({
          text: 'Check-in',
          icon: 'log-in-outline',
          handler: () => this.checkIn(t)
        });
      }

      // Sposta sempre visibile se ho una prenotazione di riferimento (now/next)
      if (t.resNow || t.resNext) {
        buttons.push({
          text: 'Sposta',
          icon: 'swap-horizontal-outline',
          handler: () => this.moveReservation(t)
        });
      }

      if (isBusy) {
        buttons.push({
          text: 'Stampa',
          icon: 'print-outline',
          handler: () => this.printKitchen(t)
        });
      }

      if (isFree) {
        buttons.push({
          text: 'Nuova prenotazione',
          icon: 'add-circle-outline',
          handler: () => this.newReservation(t)
        });
      }

      // Pulsante chiudi (ruolo 'cancel' = chiude sempre lo sheet)
      buttons.push({
        text: 'Chiudi',
        role: 'cancel',
        icon: 'close'
      });

      const sheet = await this.actionSheet.create({
        header: `Tav. ${t.number} • ${t.room_name}`,
        buttons
      });
      await sheet.present();
    } catch (e) {
      console.warn('⚠️ [TablesList] openActions KO', e);
    }
  }

  // === Altri util ===================================================
  trackByTableId = (_: number, t: TableCard) => t.id;

  private todayISO(): string {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }
}

// ===== Utils ========================================================
function groupBy<T>(arr: T[], key: (x:T)=>number): Map<number, T[]> {
  const m = new Map<number, T[]>(); for (const it of arr || []) { const k = key(it); const list = m.get(k) || []; list.push(it); m.set(k, list); } return m;
}
function pickNowAndNext(res: Reservation[], dayISO: string, now: Date | null): [Reservation|undefined, Reservation|undefined] {
  const inDay = res.filter(r => (r.start_at || '').startsWith(dayISO)); if (!inDay.length) return [undefined, undefined];
  inDay.sort((a,b) => String(a.start_at).localeCompare(String(b.start_at)));
  if (!now) return [undefined, inDay[0]];
  const nowMs = now.getTime(); let cur: Reservation|undefined; let next: Reservation|undefined;
  for (const r of inDay) { const s = new Date(r.start_at!).getTime(); const e = new Date(r.end_at!).getTime(); if (nowMs >= s && nowMs < e) cur = r; if (!next && s > nowMs) next = r; }
  return [cur, cur ? next : (next || undefined)];
}
function decorateRes(r: any) {
  return { id: r.id, start_at: r.start_at, end_at: r.end_at,
    customer_name: r.customer_fullname || r.customer_name || `${r.customer_first || ''} ${r.customer_last || ''}`.trim(),
    covers: Number(r.party_size || r.covers || 0), kids: Number(r.kids || 0) || undefined,
    notes: r.notes || undefined, has_kid_products: !!r.has_kid_products };
}
function decorateResNext(r: any) {
  return { id: r.id, start_at: r.start_at, end_at: r.end_at,
    customer_name: r.customer_fullname || r.customer_name || `${r.customer_first || ''} ${r.customer_last || ''}`.trim(),
    covers: Number(r.party_size || r.covers || 0) };
}

// 👉 default export per compat con import lazy nel router
export default TablesListPage;
