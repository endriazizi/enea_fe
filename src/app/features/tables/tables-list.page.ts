// ============================================================================
// TablesListPage — Vista "Lista tavoli" (oggi) per Admin PWA
// - Card compatte con stato: 🟢 free | 🟡 upcoming | 🔴 busy | 🔵 cleaning (solo FE)
// - Segment per SALA, ricerca testuale, Quick day picker (riuso app-date-quick)
// - Signals + commenti lunghi + log con emoji, nel tuo stile
// - 🆕 Action Sheet: Dettagli / Check-in / Sposta / Stampa / Chiudi tavolo / Libera ora
// - 🛠️ provider overlay (Modal/ActionSheet/Toast) → fix NG0201
// - 🆕 KPI bar
// - 🆕 Check-in (disabilitazione + toast + reload)  ✅ FIX: considera checkin_at
// - 🆕 Check-out + Pulizia 5:00 (solo FE): countdown mm:ss e "Libera ora"
// ============================================================================

import {
  Component, effect, inject, signal, computed, OnInit, OnDestroy, EffectRef
} from '@angular/core';
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

import { ActionSheetController, ToastController, ModalController } from '@ionic/angular';
import { MoveReservationModalComponent } from '../reservations/_components/move-reservation.modal/move-reservation.modal';

type TableState = 'free'|'upcoming'|'busy'|'cleaning';

export type TableCard = {
  id: number;
  number: string;
  room_id: number;
  room_name: string;
  capacity: number;
  state: TableState;
  resNow?: { id:number; start_at:string; end_at:string; customer_name:string; covers:number; kids?:number; notes?:string; has_kid_products?:boolean; checkin_at?:string|null; checkout_at?:string|null; };
  resNext?: { id:number; start_at:string; end_at:string; customer_name:string; covers:number; checkin_at?:string|null; checkout_at?:string|null; };
  cleaningUntilMs?: number;
  cleaningRemainingSec?: number;
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
  ],
  providers: [ModalController, ActionSheetController, ToastController],
})
export class TablesListPage implements OnInit, OnDestroy {
  // === DI ===========================================================
  private api    = inject(ReservationsApi);
  private router = inject(Router);

  private actionSheet = inject(ActionSheetController);
  private toast       = inject(ToastController);
  private modal       = inject(ModalController);

  // === Stato UI =====================================================
  loading      = signal(true);
  roomsSig     = signal<Room[]>([]);
  tablesRawSig = signal<(Table & { room_name?: string })[]>([]);
  dayISO       = signal(this.todayISO());
  filterState  = signal<'all'|'free'|'upcoming'|'busy'|'cleaning'>('all');
  filterRoomId = signal<number|0>(0);
  filterText   = signal<string>('');

  private reservationsTodaySig = signal<Reservation[]>([]);

  // pulizia FE
  private cleaningOverride = signal<Map<number, number>>(new Map());
  private tick = signal<number>(0);
  private timerId: any = null;

  // loading flags per i bottoni
  checkInLoadingId  = signal<number|null>(null);
  checkOutLoadingId = signal<number|null>(null);

  // KPI
  private sumBy = <T>(arr: T[], pick: (x:T)=>number) => (arr || []).reduce((a,c)=>a+(+pick(c)||0),0);

  kpiPeopleTotal   = computed(() => this.sumBy(this.reservationsTodaySig(), r => Number(r.party_size || 0)));
  kpiPeopleCheckIn = computed(() => this.sumBy(this.tablesSig().filter(t => t.state==='busy' && t.resNow), t => Number(t.resNow!.covers || 0)));
  kpiTablesBusy    = computed(() => this.tablesSig().filter(t => t.state==='busy').length);
  kpiTablesUpcoming= computed(() => this.tablesSig().filter(t => t.state==='upcoming').length);
  kpiTablesFree    = computed(() => this.tablesSig().filter(t => t.state==='free').length);
  kpiFreeSeatsTotal= computed(() => this.sumBy(this.tablesSig().filter(t => t.state==='free'), t => t.capacity || 0));
  kpiFreeSeatsDist = computed(() => {
    const free = this.tablesSig().filter(t => t.state==='free');
    const m = new Map<number, number>();
    for (const f of free) { const c = f.capacity || 0; if (!c) continue; m.set(c, (m.get(c) || 0) + 1); }
    return [...m.entries()].sort((a,b)=>a[0]-b[0]).map(([cap,count]) => `${cap}×${count}`).join(' • ');
  });

  private logFiltersEffect?: EffectRef;

  constructor() {
    // effect in injection context (fix NG0203)
    this.logFiltersEffect = effect(() => {
      console.log('🧭 [TablesList] filters:', { day: this.dayISO(), state: this.filterState(), room: this.filterRoomId(), text: this.filterText() });
    });
  }

  ngOnInit() {
    this.reload();
    this.timerId = setInterval(() => this.tick.update(v => v + 1), 1000);

    // hook socket best-effort: se l'app ha già window.io aperto altrove, leggilo
    try {
      const w: any = (window as any);
      const socket = w?.__tables_socket || w?.socket || null;
      if (socket && !w.__tables_list_hooked) {
        w.__tables_list_hooked = true;
        // quando arriva un checkout, forza la finestra di pulizia anche sui client passivi
        socket.on('reservation-checkout', (payload: { table_id?: number|null, cleaning_until?: string }) => {
          const tId = Number(payload?.table_id || 0);
          const untilIso = payload?.cleaning_until || null;
          if (!tId || !untilIso) return;
          const until = new Date(untilIso).getTime();
          const cloned = new Map(this.cleaningOverride());
          cloned.set(tId, until);
          this.cleaningOverride.set(cloned);
          console.log('🔵 [Tables] cleaning override via socket', { table_id: tId, untilIso });
        });
      }
    } catch (e) {
      console.warn('⚠️ socket hook non disponibile', e);
    }
  }

  ngOnDestroy() {
    if (this.timerId) clearInterval(this.timerId);
    this.logFiltersEffect?.destroy();
  }

  selectedDayForPicker = () => this.dayISO();
  onQuickFilterDay = (iso: string) => { this.dayISO.set(iso); this.reload(); };

  roomOptions = computed(() => [{ id: 0, name: 'Tutte' }, ...this.roomsSig().map(r => ({ id: r.id, name: r.name }))]);

  // === Costruzione card ============================================
  private CLEAN_SEC = 5 * 60; // 5 minuti

  tablesSig = computed<TableCard[]>(() => {
    this.tick(); // aggiorna countdown

    const day = this.dayISO();
    const isToday = (day === this.todayISO());
    const now = new Date();
    const nowMs = now.getTime();

    const res = this.reservationsTodaySig();
    const byTable = groupBy(res, r => Number((r as any).table_id || 0));
    const override = this.cleaningOverride();

    return this.tablesRawSig().map(t => {
      const list = (byTable.get(Number(t.id)) || []).filter(r => (r.start_at && r.end_at));
      const [byTimeNow, byTimeNext] = pickNowAndNext(list, day, isToday ? now : null);

      // 🧠 FIX: se qualcuno ha fatto check-in, consideralo "occupante" anche se siamo in anticipo.
      const checkedIn = findCheckedIn(list);
      let resNow = byTimeNow || checkedIn || undefined;
      let resNext = (!resNow ? byTimeNext : undefined); // se ho checkin, quella non è più "next"

      let state: TableState = resNow ? 'busy' : (resNext ? 'upcoming' : 'free');

      // Pulizia (solo FE): se non busy né upcoming, valuta ultimo end_at o override locale
      let cleaningUntilMs: number | undefined;
      if (!resNow && !resNext) {
        const last = lastEndTodayBefore(list, day, now);
        const candidateFromEnd = last ? last.getTime() + this.CLEAN_SEC*1000 : 0;
        const candidateFromOverride = override.get(t.id) || 0;
        const effective = Math.max(candidateFromEnd, candidateFromOverride);
        if (isToday && effective > nowMs) {
          state = 'cleaning';
          cleaningUntilMs = effective;
        }
      }
      const remaining = cleaningUntilMs ? Math.max(0, Math.floor((cleaningUntilMs - nowMs)/1000)) : undefined;

      return {
        id: t.id,
        number: String(t.table_number || t.label || t.id),
        room_id: t.room_id!,
        room_name: t.room_name || '',
        capacity: Number(t.capacity || 0),
        state,
        resNow : resNow  ? decorateRes(resNow)      : undefined,
        resNext: resNext ? decorateResNext(resNext) : undefined,
        cleaningUntilMs,
        cleaningRemainingSec: remaining
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

  // === IO ===========================================================
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

  // === Azioni base ==================================================
  openDetails(t: TableCard)   { if (t.resNow) this.router.navigate(['/reservations', t.resNow.id, 'edit']); }
  printKitchen(t: TableCard)  { console.log('🖨️ [TablesList] print kitchen for table', t.id); /* TODO */ }
  newReservation(t?: TableCard) {
    const extras = t ? { queryParams: { room_id: t.room_id, table_id: t.id } } : undefined;
    this.router.navigate(['/reservations/new'], extras);
  }

  // === Check-in =====================================================
  async checkIn(t: TableCard) {
    const ref = t.resNext ?? t.resNow;
    if (!ref) return;
    try {
      this.checkInLoadingId.set(ref.id);
      console.log('✅ [TablesList] check-in ▶️', { res_id: ref.id });
      await this.api.checkIn(ref.id).toPromise(); // POST /checkin → fallback updateStatus('accept')
      (await this.toast.create({ message: 'Check-in registrato ✅', duration: 1200 })).present();
      await this.reload();
    } catch (e) {
      console.warn('⚠️ [TablesList] check-in KO', e);
      (await this.toast.create({ message: 'Check-in non riuscito', color: 'warning', duration: 1600 })).present();
    } finally {
      this.checkInLoadingId.set(null);
    }
  }

  // === Check-out + Pulizia 5:00 (solo FE) ===========================
  async checkOut(t: TableCard) {
    const ref = t.resNow;
    if (!ref) return;
    try {
      this.checkOutLoadingId.set(ref.id);
      console.log('🧹 [TablesList] check-out ▶️', { res_id: ref.id, table_id: t.id });

      await this.api.checkOut(ref.id).toPromise(); // POST /checkout → fallback updateStatus('complete')

      // forzo subito finestra pulizia in FE
      const until = Date.now() + this.CLEAN_SEC * 1000;
      const cloned = new Map(this.cleaningOverride());
      cloned.set(t.id, until);
      this.cleaningOverride.set(cloned);

      (await this.toast.create({ message: 'Tavolo chiuso • Pulizia 5:00 🔵', duration: 1400 })).present();
      await this.reload();
    } catch (e) {
      console.warn('⚠️ [TablesList] check-out KO', e);
      (await this.toast.create({ message: 'Check-out non riuscito', color: 'warning', duration: 1600 })).present();
    } finally {
      this.checkOutLoadingId.set(null);
    }
  }

  async freeNow(t: TableCard) {
    const map = new Map(this.cleaningOverride());
    map.set(t.id, Date.now()); // scade adesso
    this.cleaningOverride.set(map);
    (await this.toast.create({ message: 'Tavolo liberato ✅', duration: 900 })).present();
  }

  // === Sposta =======================================================
  private async moveReservation(t: TableCard) {
    try {
      const ref = t.resNow ?? t.resNext;
      if (!ref) return;

      const modal = await this.modal.create({
        component: MoveReservationModalComponent,
        componentProps: {
          currentTableId: t.id,
          reservation: { id: ref.id, start_at: ref.start_at, end_at: ref.end_at, covers: ref.covers, room_id: t.room_id },
          tables: this.tablesRawSig(),
          reservations: this.reservationsTodaySig()
        },
        cssClass: 'modal--move-reservation'
      });
      await modal.present();
      const res = await modal.onDidDismiss<{ ok: boolean; table_id?: number }>();
      if (!res?.data?.ok || !res.data.table_id) return;

      await this.api.changeTable(ref.id, res.data.table_id).toPromise();
      (await this.toast.create({ message: 'Prenotazione spostata ✅', duration: 1400 })).present();
      await this.reload();
    } catch (e) {
      console.warn('⚠️ [TablesList] moveReservation KO', e);
      (await this.toast.create({ message: 'Spostamento non riuscito', color: 'warning', duration: 1600 })).present();
    }
  }

  async openActions(t: TableCard) {
    try {
      const isFree = t.state === 'free';
      const isUpcoming = t.state === 'upcoming';
      const isBusy = t.state === 'busy';
      const isCleaning = t.state === 'cleaning';

      const buttons: any[] = [];
      if (!isFree) buttons.push({ text: 'Dettagli', icon: 'information-circle-outline', handler: () => this.openDetails(t) });
      if (isUpcoming) buttons.push({ text: 'Check-in', icon: 'log-in-outline', handler: () => this.checkIn(t) });
      if (t.resNow || t.resNext) buttons.push({ text: 'Sposta', icon: 'swap-horizontal-outline', handler: () => this.moveReservation(t) });
      if (isBusy) {
        buttons.push({ text: 'Chiudi tavolo', icon: 'close-circle-outline', handler: () => this.checkOut(t) });
        buttons.push({ text: 'Stampa', icon: 'print-outline', handler: () => this.printKitchen(t) });
      }
      if (isCleaning) buttons.push({ text: 'Libera ora', icon: 'checkmark-done-outline', handler: () => this.freeNow(t) });
      if (isFree) buttons.push({ text: 'Nuova prenotazione', icon: 'add-circle-outline', handler: () => this.newReservation(t) });
      buttons.push({ text: 'Chiudi', role: 'cancel', icon: 'close' });

      const sheet = await this.actionSheet.create({ header: `Tav. ${t.number} • ${t.room_name}`, buttons });
      await sheet.present();
    } catch (e) {
      console.warn('⚠️ [TablesList] openActions KO', e);
    }
  }

  // === Util =========================================================
  trackByTableId = (_: number, t: TableCard) => t.id;

  private todayISO(): string {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }

  formatMMSS(sec?: number) {
    const s = Math.max(0, Number(sec || 0));
    const m = Math.floor(s/60);
    const r = s % 60;
    return `${String(m).padStart(1,'0')}:${String(r).padStart(2,'0')}`;
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
  for (const r of inDay) { const s = new Date(r.start_at!).getTime(); const e = new Date(r.end_at || r.start_at!).getTime(); if (nowMs >= s && nowMs < e) cur = r; if (!next && s > nowMs) next = r; }
  return [cur, cur ? next : (next || undefined)];
}
function lastEndTodayBefore(res: Reservation[], dayISO: string, now: Date): Date | null {
  const inDay = res.filter(r => (r.end_at || '').startsWith(dayISO));
  const ends = inDay.map(r => new Date(r.end_at || r.start_at));
  const before = ends.filter(d => d.getTime() < now.getTime());
  if (!before.length) return null;
  before.sort((a,b)=>b.getTime()-a.getTime());
  return before[0];
}
function findCheckedIn(res: Reservation[]): Reservation | null {
  // ultimo con checkin_at senza checkout_at (o checkout futuro) → occupa il tavolo
  let out: Reservation | null = null;
  for (const r of res) {
    if (r?.checkin_at && !r?.checkout_at) out = r;
  }
  return out;
}
function decorateRes(r: any) {
  return { id: r.id, start_at: r.start_at, end_at: r.end_at,
    customer_name: r.customer_fullname || r.customer_name || `${r.customer_first || ''} ${r.customer_last || ''}`.trim(),
    covers: Number(r.party_size || r.covers || 0), kids: Number(r.kids || 0) || undefined,
    notes: r.notes || undefined, has_kid_products: !!r.has_kid_products,
    checkin_at: r.checkin_at || null, checkout_at: r.checkout_at || null };
}
function decorateResNext(r: any) {
  return { id: r.id, start_at: r.start_at, end_at: r.end_at,
    customer_name: r.customer_fullname || r.customer_name || `${r.customer_first || ''} ${r.customer_last || ''}`.trim(),
    covers: Number(r.party_size || r.covers || 0),
    checkin_at: r.checkin_at || null, checkout_at: r.checkout_at || null };
}

// 👉 default export per compat con import lazy nel router
export default TablesListPage;
