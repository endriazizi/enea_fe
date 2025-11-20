// src/app/features/tables/tables-list.page.ts
// ============================================================================
// TablesListPage — Vista "Lista tavoli" (oggi) per Admin PWA
// - Card compatte con stato: 🟢 free | 🟡 upcoming | 🔴 busy | 🔵 cleaning (solo FE)
// - Segment per SALA, ricerca testuale, Quick day picker (riuso app-date-quick)
// - Signals + commenti lunghi + log con emoji, nel tuo stile
// - 🆕 Action Sheet: Dettagli / Check-in / Sposta / Stampa / Chiudi tavolo / Libera ora / Nuovo ordine
// - 🛠️ provider overlay (Modal/ActionSheet/Toast) → fix NG0201
// - 🆕 KPI bar
// - 🆕 Check-in (disabilitazione + toast + reload)  ✅ FIX: considera checkin_at
// - 🆕 Check-out + Pulizia 5:00 (solo FE): countdown mm:ss e "Libera ora"
// - 🆕 Ordine dal tavolo → order-builder (prefill se c'è prenotazione)
// - 🆕 Preview ordine (split pane desktop / modal mobile) + azioni builder/stampa/comanda
// - 🆕 Badge “Sessione attiva da …” + bottone “Chiudi sessione” (NFC/QR live)
// ============================================================================

import {
  Component,
  effect,
  inject,
  signal,
  computed,
  OnInit,
  OnDestroy,
  EffectRef,
} from '@angular/core';
import { CommonModule, NgFor, NgIf, DatePipe } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonBadge,
  IonItem,
  IonNote,
  IonSegment,
  IonSegmentButton,
  IonSearchbar,
  IonSpinner,
  IonModal,
  IonChip,
  IonIcon,
  IonLabel,
} from '@ionic/angular/standalone';
import {
  isPlatform,
  ActionSheetController,
  ToastController,
  ModalController,
} from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import {
  ReservationsApi,
  Room,
  Table,
  Reservation,
} from '../../core/reservations/reservations.service';
import { DateQuickComponent } from '../reservations/_components/ui/date-quick/date-quick.component';
import { MoveReservationModalComponent } from '../reservations/_components/move-reservation.modal/move-reservation.modal';

// ⬇️ nostro inspector presentazionale (pane/modal) usato nel template
import { OrderInspectorComponent } from '../orders/order-inspector/order-inspector.component';

// 🆕 Badge sessione attiva / chiusura sessione (NFC API)
import { NfcApi } from '../nfc/nfc.api';

type TableState = 'free' | 'upcoming' | 'busy' | 'cleaning';

export type TableCard = {
  id: number;
  number: string;
  room_id: number;
  room_name: string;
  capacity: number;
  state: TableState;
  resNow?: {
    id: number;
    start_at: string;
    end_at: string | null;
    customer_name: string;
    covers: number;
    kids?: number;
    notes?: string;
    has_kid_products?: boolean;
    checkin_at?: string | null;
    checkout_at?: string | null;
  };
  resNext?: {
    id: number;
    start_at: string;
    end_at: string | null;
    customer_name: string;
    covers: number;
    checkin_at?: string | null;
    checkout_at?: string | null;
  };
  cleaningUntilMs?: number;
  cleaningRemainingSec?: number;
};

// === Tipi leggeri per il Preview ordine (solo ciò che serve a UI) ===
type PreviewItem = {
  id?: number;
  name: string;
  qty: number;
  price: number;
  notes?: string;
};
type PreviewOrder = {
  id: number;
  table_id?: number;
  reservation_id?: number | null;
  customer_name?: string;
  people?: number;
  phone?: string;
  scheduled_at?: string;
  note?: string;
  total: number;
  items: PreviewItem[];
};

@Component({
  standalone: true,
  selector: 'app-tables-list',
  templateUrl: './tables-list.page.html',
  styleUrls: ['./tables-list.page.scss'],
  imports: [
    CommonModule,
    NgFor,
    NgIf,
    RouterLink,
    DatePipe,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonBadge,
    IonItem,
    IonNote,
    IonSegment,
    IonSegmentButton,
    IonSearchbar,
    IonSpinner,
    // 👇 per gli elementi usati in template:
    IonModal,
    IonChip,
    IonIcon,
    IonLabel,
    // 👇 date quick + inspector
    DateQuickComponent,
    OrderInspectorComponent,
  ],
  providers: [ModalController, ActionSheetController, ToastController],
})
export class TablesListPage implements OnInit, OnDestroy {
  // === DI ===========================================================
  private api = inject(ReservationsApi);
  private router = inject(Router);
  private http = inject(HttpClient);
  private nfc = inject(NfcApi); // 🆕 badge sessione/close

  private actionSheet = inject(ActionSheetController);
  private toast = inject(ToastController);
  private modal = inject(ModalController);

  // === Stato UI (lista + filtri) ====================================
  loading = signal(true);
  roomsSig = signal<Room[]>([]);
  tablesRawSig = signal<(Table & { room_name?: string })[]>([]);
  dayISO = signal(this.todayISO());
  filterState = signal<'all' | 'free' | 'upcoming' | 'busy' | 'cleaning'>('all');
  filterRoomId = signal<number | 0>(0);
  filterText = signal<string>('');

  private reservationsTodaySig = signal<Reservation[]>([]);

  // pulizia FE
  private cleaningOverride = signal<Map<number, number>>(new Map());
  private tick = signal<number>(0);
  private timerId: any = null;

  // loading flags per i bottoni
  checkInLoadingId = signal<number | null>(null);
  checkOutLoadingId = signal<number | null>(null);

  // viewport (per split layout desktop/mobile)
  vp = signal<{ w: number; h: number }>({
    w: window.innerWidth,
    h: window.innerHeight,
  });
  onResize = () =>
    this.vp.set({
      w: window.innerWidth,
      h: window.innerHeight,
    });
  isDesktop = () => this.vp().w >= 992; // usato nel template come funzione

  // === Piattaforma (mode dinamico per i segment) =====================
  isIOS = isPlatform('ios');

  // === Preview ordine (split panel + modal) =========================
  previewOpen = signal<boolean>(false);
  previewTable = signal<TableCard | null>(null);
  previewBusy = signal<boolean>(false);
  previewList = signal<PreviewOrder[]>([]); // ordini recenti del tavolo (se >1)
  previewActive = signal<PreviewOrder | null>(null); // quello selezionato/attivo

  // === KPI ==========================================================
  private sumBy = <T>(arr: T[], pick: (x: T) => number) =>
    (arr || []).reduce((a, c) => a + (+pick(c) || 0), 0);

  kpiPeopleTotal = computed(() =>
    this.sumBy(
      this.reservationsTodaySig(),
      (r) => Number((r as any).party_size || (r as any).covers || 0),
    ),
  );
  kpiPeopleCheckIn = computed(() =>
    this.sumBy(
      this.tablesSig().filter((t) => t.state === 'busy' && t.resNow),
      (t) => Number(t.resNow!.covers || 0),
    ),
  );
  kpiTablesBusy = computed(
    () => this.tablesSig().filter((t) => t.state === 'busy').length,
  );
  kpiTablesUpcoming = computed(
    () => this.tablesSig().filter((t) => t.state === 'upcoming').length,
  );
  kpiTablesFree = computed(
    () => this.tablesSig().filter((t) => t.state === 'free').length,
  );
  kpiFreeSeatsTotal = computed(() =>
    this.sumBy(
      this.tablesSig().filter((t) => t.state === 'free'),
      (t) => t.capacity || 0,
    ),
  );
  kpiFreeSeatsDist = computed(() => {
    const m = new Map<number, number>();
    for (const f of this.tablesSig().filter((t) => t.state === 'free')) {
      const c = f.capacity || 0;
      if (!c) continue;
      m.set(c, (m.get(c) || 0) + 1);
    }
    return [...m.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([cap, count]) => `${cap}×${count}`)
      .join(' • ');
  });

  // === Sessione attiva (NFC/QR) =====================================
  activeMap = signal<
    Record<number, { session_id: number; started_at: string | null; updated_at?: string | null }>
  >({});
  hasActive = (tableId: number) => !!this.activeMap()[tableId];
  activeFor = (tableId: number) => this.activeMap()[tableId] || null;

  // === Effetti ======================================================
  private logFiltersEffect?: EffectRef;

  constructor() {
    // piccolo log reattivo per capire come ci muoviamo con i filtri
    this.logFiltersEffect = effect(() => {
      console.log('🧭 [TablesList] filters:', {
        day: this.dayISO(),
        state: this.filterState(),
        room: this.filterRoomId(),
        text: this.filterText(),
      });
    });
  }

  ngOnInit() {
    this.reload();
    this.timerId = setInterval(() => this.tick.update((v) => v + 1), 1000);
    window.addEventListener('resize', this.onResize, { passive: true });

    // hook socket best-effort (pulizia override via evento)
    try {
      const w: any = window as any;
      const socket = w?.__tables_socket || w?.socket || null;
      if (socket && !w.__tables_list_hooked) {
        w.__tables_list_hooked = true;
        socket.on(
          'reservation-checkout',
          (payload: { table_id?: number | null; cleaning_until?: string }) => {
            const id = Number(payload?.table_id || 0);
            if (!id) return;
            const until = payload?.cleaning_until
              ? new Date(payload.cleaning_until).getTime()
              : 0;
            console.log('🔵 [TablesList] checkout socket per tavolo', id, '→', until);
            this.cleaningOverride.update((old) => {
              const m = new Map(old || new Map());
              if (until) m.set(id, until);
              else m.delete(id);
              return m;
            });
          },
        );
      }
    } catch (e) {
      console.warn('ℹ️ [TablesList] socket hook non disponibile', e);
    }
  }

  ngOnDestroy() {
    if (this.timerId) clearInterval(this.timerId);
    window.removeEventListener('resize', this.onResize);
    if (this.logFiltersEffect) this.logFiltersEffect.destroy();
  }

  // === Helpers data =================================================
  private todayISO(): string {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  }

  selectedDayForPicker(): string {
    return this.dayISO();
  }

  onQuickFilterDay(iso: string) {
    console.log('📅 [TablesList] quick filter day', iso);
    this.dayISO.set(iso);
    this.reload();
  }

  roomOptions = computed(() => [
    { id: 0, name: 'Tutte' },
    ...this.roomsSig().map((r) => ({ id: r.id, name: r.name })),
  ]);

  private readonly CLEAN_SEC = 5 * 60; // 5 minuti dopo fine effettiva

  // === Computed tavoli (stato + pulizia) ============================
  tablesSig = computed<TableCard[]>(() => {
    const day = this.dayISO();
    const now = new Date();
    const nowMs = now.getTime();
    const isToday = day === this.todayISO();
    const resAll = this.reservationsTodaySig();
    const byTable = groupBy(resAll, (r) => Number((r as any).table_id || 0));
    const override = this.cleaningOverride();
    const list = this.tablesRawSig() || [];

    return list.map((t) => {
      const tableId = Number((t as any).id);
      const listRes = byTable.get(tableId) || [];

      const checkedIn = findCheckedIn(listRes);
      const [byTimeNow, byTimeNext] = pickNowAndNext(listRes, day, now);

      let resNow: Reservation | undefined =
        (checkedIn as Reservation | null) || (byTimeNow as Reservation | undefined) || undefined;
      let resNext: Reservation | undefined =
        resNow ? (byTimeNext as Reservation | undefined) : (byTimeNext as Reservation | undefined);

      let state: TableState = resNow ? 'busy' : resNext ? 'upcoming' : 'free';

      // Pulizia (solo FE): ultima fine effettiva + override (socket/Libera ora)
      let cleaningUntilMs: number | undefined;
      if (!resNow && !resNext) {
        const last = lastEndTodayBefore(listRes, day, now);
        const candidateFromEnd = last ? last.getTime() + this.CLEAN_SEC * 1000 : 0;

        const hasOverride = override.has(tableId);
        const ov = hasOverride ? override.get(tableId)! : undefined;
        const effective = ov !== undefined ? ov : candidateFromEnd;

        if (isToday && effective > nowMs) {
          state = 'cleaning';
          cleaningUntilMs = effective;
        }
      }

      const remaining = cleaningUntilMs
        ? Math.max(0, Math.floor((cleaningUntilMs - nowMs) / 1000))
        : undefined;

      return {
        id: tableId,
        number: String(
          (t as any).table_number || (t as any).label || (t as any).name || tableId,
        ),
        room_id: (t as any).room_id!,
        room_name: (t as any).room_name || '',
        capacity: Number((t as any).capacity ?? (t as any).seats ?? 0),
        state,
        resNow: resNow ? decorateRes(resNow) : undefined,
        resNext: resNext ? decorateResNext(resNext) : undefined,
        cleaningUntilMs,
        cleaningRemainingSec: remaining,
      } as TableCard;
    });
  });

  tablesFilteredSig = computed<TableCard[]>(() => {
    const state = this.filterState();
    const room = this.filterRoomId();
    const text = (this.filterText() || '').toLowerCase().trim();

    let out = this.tablesSig();

    if (state !== 'all') out = out.filter((t) => t.state === state);
    if (room && room > 0) out = out.filter((t) => t.room_id === room);
    if (text) {
      out = out.filter((t) => {
        const hay = [
          t.number,
          t.room_name,
          t.resNow?.customer_name,
          t.resNext?.customer_name,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return hay.includes(text);
      });
    }

    return out;
  });

  // === IO ===========================================================
  async reload() {
    this.loading.set(true);
    try {
      const rooms = await this.api.listRooms().toPromise();
      this.roomsSig.set(rooms || []);

      const allTables = await this.api.listAllTablesAcrossRooms().toPromise();
      this.tablesRawSig.set(allTables || []);

      const from = this.dayISO();
      const to = this.dayISO();
      const reservations = await this.api.list({ from, to }).toPromise();
      this.reservationsTodaySig.set(reservations || []);

      // 🆕 Popola badge “Sessione attiva” per ogni tavolo (best-effort)
      try {
        const tables = this.tablesRawSig() || [];
        const svc: any = this.nfc as any;

        if (!svc || typeof svc.getActiveSession !== 'function') {
          console.log(
            'ℹ️ [TablesList] getActiveSession non disponibile su NfcApi → nessun badge sessione attiva',
          );
          this.activeMap.set({});
        } else {
          const res = await Promise.all(
            tables.map(async (t) => {
              const id = Number((t as any).id);
              try {
                const r = await svc.getActiveSession(id); // presumibilmente Promise
                return { id, r };
              } catch (err) {
                console.warn(
                  'ℹ️ [TablesList] getActiveSession KO per tavolo',
                  id,
                  err,
                );
                return { id, r: null };
              }
            }),
          );
          const map: Record<number, any> = {};
          for (const { id, r } of res) {
            if (r?.ok && r.active) {
              map[id] = {
                session_id: r.session_id,
                started_at: r.started_at || null,
                updated_at: r.updated_at || null,
              };
            }
          }
          this.activeMap.set(map);
          console.log(
            '🟢 [TablesList] sessioni attive:',
            Object.keys(map).length,
          );
        }
      } catch (e) {
        console.warn('ℹ️ [TablesList] sessioni attive non disponibili', e);
        this.activeMap.set({});
      }

      console.log(
        '📊 [TablesList] rooms:',
        rooms?.length ?? 0,
        'tables:',
        allTables?.length ?? 0,
        'res:',
        reservations?.length ?? 0,
      );
    } catch (e) {
      console.warn('⚠️ [TablesList] reload KO', e);
      this.roomsSig.set([]);
      this.tablesRawSig.set([]);
      this.reservationsTodaySig.set([]);
      this.activeMap.set({});
    } finally {
      this.loading.set(false);
    }
  }

  onFilterChange(ev: CustomEvent) {
    this.filterState.set(
      String((ev.detail as any)?.value || 'all') as
        | 'all'
        | 'free'
        | 'upcoming'
        | 'busy'
        | 'cleaning',
    );
  }

  onRoomChange(ev: CustomEvent) {
    this.filterRoomId.set(Number((ev.detail as any)?.value || 0));
  }

  onSearchChange(ev: CustomEvent) {
    this.filterText.set(String((ev.detail as any)?.value || ''));
  }

  // === Azioni base ==================================================
  openDetails(t: TableCard) {
    if (t.resNow) {
      this.router.navigate(['/reservations', t.resNow.id, 'edit']);
    } else if (t.resNext) {
      this.router.navigate(['/reservations', t.resNext.id, 'edit']);
    } else {
      this.router.navigate(['/reservations'], {
        queryParams: { table_id: t.id, day: this.dayISO() },
      });
    }
  }

  printKitchen(t: TableCard) {
    console.log('🖨️ [TablesList] print kitchen for table', t.id);
    // TODO: integrazione stampa comanda rapida da lista tavoli (in futuro)
  }

  newReservation(t?: TableCard) {
    const params: any = { day: this.dayISO() };
    if (t) params.table_id = t.id;
    this.router.navigate(['/reservations/new'], { queryParams: params });
  }

  startOrder(t: TableCard) {
    console.log('🧾 [TablesList] startOrder tavolo', t);
    const qp: any = {
      table_id: t.id,
      room_id: t.room_id,
      room_name: t.room_name,
    };
    if (t.resNow) qp.reservation_id = t.resNow.id;
    this.router.navigate(['/orders/new'], { queryParams: qp });
  }

  // === Check-in / Check-out / Pulizia ===============================
  async checkIn(t: TableCard) {
    if (!t.resNow) {
      return;
    }
    const id = t.resNow.id;
    this.checkInLoadingId.set(id);
    try {
      console.log('✅ [TablesList] check-in tavolo/res', t.id, id);
      await this.api.checkIn(id).toPromise();
      this.toast
        .create({
          message: `Check-in eseguito per tavolo ${t.number}`,
          duration: 2000,
          color: 'success',
        })
        .then((t) => t.present());
      await this.reload();
    } catch (e) {
      console.error('⚠️ [TablesList] check-in KO', e);
      this.toast
        .create({
          message: 'Errore durante il check-in',
          duration: 2000,
          color: 'danger',
        })
        .then((t) => t.present());
    } finally {
      this.checkInLoadingId.set(null);
    }
  }

  async checkOut(t: TableCard) {
    if (!t.resNow) return;
    const id = t.resNow.id;
    this.checkOutLoadingId.set(id);
    try {
      console.log('⬅️ [TablesList] check-out tavolo/res', t.id, id);
      await this.api.checkOut(id).toPromise();
      this.toast
        .create({
          message: `Check-out eseguito per tavolo ${t.number}`,
          duration: 2000,
          color: 'success',
        })
        .then((t) => t.present());
      await this.reload();
    } catch (e) {
      console.error('⚠️ [TablesList] check-out KO', e);
      this.toast
        .create({
          message: 'Errore durante il check-out',
          duration: 2000,
          color: 'danger',
        })
        .then((t) => t.present());
    } finally {
      this.checkOutLoadingId.set(null);
    }
  }

  async freeNow(t: TableCard) {
    // “Libera ora” → solo lato FE: ignora countdown e pulizia
    console.log('🧹 [TablesList] Libera ora tavolo', t.id);
    this.cleaningOverride.update((old) => {
      const m = new Map(old || new Map());
      m.delete(t.id);
      return m;
    });
    await this.reload();
  }

  async openActions(t: TableCard) {
    const buttons: any[] = [
      {
        text: 'Dettagli prenotazione',
        icon: 'information-circle-outline',
        handler: () => this.openDetails(t),
      },
      {
        text: 'Nuovo ordine',
        icon: 'receipt-outline',
        handler: () => this.startOrder(t),
      },
      {
        text: 'Nuova prenotazione',
        icon: 'calendar-outline',
        handler: () => this.newReservation(t),
      },
      {
        text: 'Stampa comanda (TODO)',
        icon: 'print-outline',
        handler: () => this.printKitchen(t),
      },
      {
        text: 'Check-in',
        icon: 'log-in-outline',
        disabled: !t.resNow,
        handler: () => this.checkIn(t),
      },
      {
        text: 'Check-out',
        icon: 'log-out-outline',
        disabled: !t.resNow,
        handler: () => this.checkOut(t),
      },
      {
        text: 'Libera ora (stop pulizia)',
        icon: 'broom-outline',
        handler: () => this.freeNow(t),
      },
      {
        text: 'Annulla',
        role: 'cancel',
      },
    ];

    const sheet = await this.actionSheet.create({
      header: `Tavolo ${t.number}`,
      buttons,
    });
    await sheet.present();
  }

  // === Sessione attiva (chiusura) ===================================
  async closeSession(t: TableCard) {
    const current = this.activeFor(t.id);
    if (!current) return;
    try {
      console.log(
        '🧲 [TablesList] close session tavolo',
        t.id,
        'session',
        current.session_id,
      );
      // ⬇️ closeSession restituisce già un Promise → niente .toPromise()
      await this.nfc.closeSession(current.session_id);
      const map = { ...this.activeMap() };
      delete map[t.id];
      this.activeMap.set(map);
      this.toast
        .create({
          message: `Sessione tavolo ${t.number} chiusa`,
          duration: 2000,
          color: 'success',
        })
        .then((t) => t.present());
    } catch (e) {
      console.error('⚠️ [TablesList] close session KO', e);
      this.toast
        .create({
          message: 'Impossibile chiudere la sessione',
          duration: 2000,
          color: 'danger',
        })
        .then((t) => t.present());
    }
  }

  // === Preview ordine (split-desktop / modal-mobile) ================
  async onOpenPreview(t: TableCard) {
    this.previewTable.set(t);
    this.previewOpen.set(true);
    this.previewBusy.set(true);
    this.previewList.set([]);
    this.previewActive.set(null);

    try {
      // Endpoint atteso: GET /api/orders?table_id=...&hours=6  (se non esiste → catch)
      const url = `/api/orders?table_id=${t.id}&hours=6`;
      console.log('🔍 [TablesList] load preview ordini tavolo', t.id, url);
      const data: any = await this.http.get(url).toPromise();
      const list: PreviewOrder[] = (data?.orders || data || []).map((o: any) => ({
        id: o.id,
        table_id: o.table_id,
        reservation_id: o.reservation_id,
        customer_name: o.customer_name,
        people: o.people,
        phone: o.phone,
        scheduled_at: o.scheduled_at,
        note: o.note,
        total: Number(o.total || 0),
        items: (o.items || []).map((it: any) => ({
          id: it.id,
          name: it.name,
          qty: it.qty,
          price: it.price,
          notes: it.notes || '',
        })),
      }));
      this.previewList.set(list);
      this.previewActive.set(list[0] || null);
    } catch (e) {
      console.warn('ℹ️ [TablesList] preview ordini non disponibile', e);
      this.previewList.set([]);
      this.previewActive.set(null);
    } finally {
      this.previewBusy.set(false);
    }
  }

  onClosePreview() {
    this.previewOpen.set(false);
    this.previewTable.set(null);
    this.previewList.set([]);
    this.previewActive.set(null);
  }

  openInBuilderFromPreview() {
    const t = this.previewTable();
    if (!t) return;
    this.startOrder(t);
  }

  printBillFromPreview() {
    const active = this.previewActive();
    if (!active) return;
    console.log('🧾 [TablesList] print bill from preview order', active.id);
    // TODO: integrazione /api/orders/:id/print (conto)
  }

  printComandaFromPreview(center: 'pizzeria' | 'cucina') {
    const active = this.previewActive();
    if (!active) return;
    console.log(
      '🍕 [TablesList] print comanda from preview order',
      active.id,
      '→',
      center,
    );
    // TODO: integrazione /api/orders/:id/print-comanda?center=...
  }

  // === Util per template ============================================
  trackByTableId(_: number, t: TableCard) {
    return t.id;
  }

  formatMMSS(sec?: number) {
    if (!sec || sec <= 0) return '00:00';
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
}

// === Helpers puri (fuori classe) ====================================

function groupBy<T, K extends number | string>(
  list: T[],
  key: (x: T) => K,
): Map<K, T[]> {
  const m = new Map<K, T[]>();
  for (const item of list || []) {
    const k = key(item);
    const prev = m.get(k);
    if (prev) prev.push(item);
    else m.set(k, [item]);
  }
  return m;
}

// ⚠️ non considerare occupante una prenotazione già chiusa (checkout_at)
function pickNowAndNext(
  res: Reservation[],
  dayISO: string,
  now: Date | null,
): [Reservation | undefined, Reservation | undefined] {
  const inDay = res.filter((r) => (r.start_at || '').startsWith(dayISO));
  if (!inDay.length) return [undefined, undefined];
  inDay.sort((a, b) => String(a.start_at).localeCompare(String(b.start_at)));
  const candidates = inDay.filter((r) => !(r as any).checkout_at);
  if (!now) return [undefined, candidates[0]];
  const nowMs = now.getTime();
  let cur: Reservation | undefined;
  let next: Reservation | undefined;
  for (const r of candidates) {
    const s = new Date(r.start_at!).getTime();
    const e = new Date((r as any).end_at || r.start_at!).getTime();
    if (nowMs >= s && nowMs < e) cur = r;
    if (!next && s > nowMs) next = r;
  }
  return [cur, cur ? next : next || undefined];
}

// “fine effettiva”: checkout_at se presente, altrimenti end_at/start_at
function lastEndTodayBefore(
  res: Reservation[],
  dayISO: string,
  now: Date,
): Date | null {
  const inDay = res.filter((r) =>
    ((r as any).end_at || r.start_at || '').startsWith(dayISO),
  );
  const ends = inDay.map(
    (r) => new Date((r as any).checkout_at || (r as any).end_at || r.start_at),
  );
  const before = ends.filter((d) => d.getTime() < now.getTime());
  if (!before.length) return null;
  before.sort((a, b) => b.getTime() - a.getTime());
  return before[0];
}

function findCheckedIn(res: Reservation[]): Reservation | null {
  // ultimo con checkin_at senza checkout_at → occupa il tavolo
  let out: Reservation | null = null;
  for (const r of res) {
    if ((r as any)?.checkin_at && !(r as any)?.checkout_at) out = r;
  }
  return out;
}

function decorateRes(r: any) {
  return {
    id: r.id,
    start_at: r.start_at,
    end_at: r.end_at,
    customer_name:
      r.customer_fullname ||
      r.customer_name ||
      `${r.customer_first || ''} ${r.customer_last || ''}`.trim(),
    covers: Number(r.party_size || r.covers || 0),
    kids: Number(r.kids || 0) || undefined,
    notes: r.notes || undefined,
    has_kid_products: !!r.has_kid_products,
    checkin_at: r.checkin_at || null,
    checkout_at: r.checkout_at || null,
  };
}

function decorateResNext(r: any) {
  return {
    id: r.id,
    start_at: r.start_at,
    end_at: r.end_at,
    customer_name:
      r.customer_fullname ||
      r.customer_name ||
      `${r.customer_first || ''} ${r.customer_last || ''}`.trim(),
    covers: Number(r.party_size || r.covers || 0),
    checkin_at: r.checkin_at || null,
    checkout_at: r.checkout_at || null,
  };
}

export default TablesListPage;
