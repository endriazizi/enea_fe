import { Component, computed, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { NgFor, NgIf, DatePipe, AsyncPipe } from '@angular/common';

import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel,
  IonBadge, IonButtons, IonButton, IonIcon, IonRefresher, IonRefresherContent,
  IonSearchbar, IonSegment, IonSegmentButton,
  IonFab, IonFabButton, IonFabList
} from '@ionic/angular/standalone';
import { Router, RouterLink, NavigationEnd, ActivatedRoute } from '@angular/router';

import { ModalController, ToastController, ActionSheetController, AlertController } from '@ionic/angular';
import { StatusActionModalComponent } from './_components/status-action.modal';
import { FilterSheetComponent, FilterSheetResult } from './_components/filter-sheet/filter-sheet.component';
import { filter, map, distinctUntilChanged, Subscription, firstValueFrom } from 'rxjs';

import {
  ReservationsApi,
  Reservation,
  ReservationStatus,
} from '../../core/reservations/reservations.service';

import { addDays, fmtDate, todayISO } from '../../shared/utils.date';
import { DateQuickComponent } from './_components/ui/date-quick/date-quick.component';

@Component({
  standalone: true,
  selector: 'app-reservations-list',
  templateUrl: './reservations-list.page.html',
  imports: [
    NgFor, NgIf, DatePipe, AsyncPipe, RouterLink,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonBadge, IonButtons, IonButton, IonIcon,
    IonRefresher, IonRefresherContent, IonSearchbar, IonSegment, IonSegmentButton,
    IonFab, IonFabButton, IonFabList, DateQuickComponent
  ],
  providers: [ModalController, ToastController, ActionSheetController, AlertController],
})
export class ReservationsListPage implements OnInit, OnDestroy {
  private api = inject(ReservationsApi);
  private router = inject(Router);
  private route  = inject(ActivatedRoute);
  private modalCtrl = inject(ModalController);
  private toast = inject(ToastController);
  private sheet = inject(ActionSheetController);
  private alert = inject(AlertController);

  // 🔧 switch da query (?force=&?notify=)
  private forceDelete  = (this.route.snapshot.queryParamMap.get('force')  ?? '').toLowerCase() === 'true';
  private notifyDelete = (this.route.snapshot.queryParamMap.get('notify') ?? '').toLowerCase() !== 'false';

  // Giorno selezionato per il quick filter (se non è custom singolo, mostro oggi)
  selectedDayForPicker = computed(() => {
    const isSingleDay = this.rangePreset() === 'custom' && !!this.from() && this.from() === this.to();
    return isSingleDay ? (this.from() as string) : todayISO();
  });

  // handler quick day
  onQuickFilterDay(dateISO: string) {
    this.rangePreset.set('custom');
    this.from.set(dateISO);
    this.to.set(dateISO);
    this.load();
  }

  private sub?: Subscription;

  printing = signal(false);

  // Oggi + label leggibile
  today = signal(new Date());
  todayLabel = computed(() =>
    new Intl.DateTimeFormat('it-IT', {
      weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric'
    }).format(this.today())
  );

  // Filtri
  rangePreset = signal<'today' | '7d' | 'all' | 'custom'>('today');
  status = signal<ReservationStatus | 'all'>('all');
  q = signal<string>('');
  from = signal<string | undefined>(undefined);
  to   = signal<string | undefined>(undefined);

  // Etichetta compatta del range
  rangeLabel = computed(() => {
    const p = this.rangePreset();
    const fmt = (d: Date) =>
      new Intl.DateTimeFormat('it-IT', {
        weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric'
      }).format(d);
    const today = new Date();
    if (p === 'today') return `Oggi, ${fmt(today)}`;
    if (p === '7d') {
      const from = addDays(new Date(), -7);
      return `${fmt(from)} → ${fmt(today)}`;
    }
    if (p === 'custom') {
      const a = this.from() ?? '—';
      const b = this.to()   ?? '—';
      return `${a} → ${b}`;
    }
    return 'Tutte le date';
  });

  // Dati
  loading = signal(false);
  error = signal<string | null>(null);
  rows = signal<Reservation[]>([]);
  resultsCount = computed(() => this.rows().length);

  ngOnInit() {
    this.load();
    this.sub = this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(() => this.router.url.split('?')[0]),
      distinctUntilChanged()
    ).subscribe(url => {
      if (url === '/reservations') this.load();
    });
  }
  ngOnDestroy() { this.sub?.unsubscribe(); }

  getStatusColor(s: ReservationStatus) {
    switch (s) {
      case 'pending':   return 'warning';
      case 'accepted':  return 'success';
      case 'rejected':  return 'danger';
      case 'cancelled': return 'medium';
      default:          return 'medium';
    }
  }

  private buildListParams() {
    const p = this.rangePreset();
    let from: string|undefined;
    let to  : string|undefined;

    if (p === 'today') {
      from = todayISO();
      to   = fmtDate(new Date());
    } else if (p === '7d') {
      from = fmtDate(addDays(new Date(), -7));
      to   = fmtDate(new Date());
    } else if (p === 'custom') {
      from = this.from() || undefined;
      to   = this.to()   || undefined;
    } else {
      from = undefined; to = undefined;
    }

    return { from, to, status: this.status(), q: this.q().trim() || undefined };
  }

  async load(ev?: CustomEvent) {
    this.loading.set(true);
    this.error.set(null);
    try {
      const data = await firstValueFrom(this.api.list(this.buildListParams()));
      this.rows.set(Array.isArray(data) ? data : []);
    } catch (e: any) {
      this.error.set(e?.message ?? 'Errore durante il caricamento');
    } finally {
      this.loading.set(false);
      if (ev) (ev.target as any)?.complete?.();
    }
  }

  onPresetChange(ev: CustomEvent) {
    this.rangePreset.set((ev.detail as any).value || 'today');
    if (this.rangePreset() !== 'custom') { this.from.set(undefined); this.to.set(undefined); }
    this.load();
  }
  onStatusChange(ev: CustomEvent) {
    this.status.set((ev.detail as any).value || 'all');
    this.load();
  }
  onSearchChange(ev: CustomEvent) {
    this.q.set((ev.detail as any).value || '');
    this.load();
  }
  clearSearch() {
    if (this.q()) { this.q.set(''); this.load(); }
  }

  trackById(_i: number, r: Reservation) { return r.id; }

  // Modal dettagli (resta disponibile)
  async openStatusActions(resv: Reservation) {
    const modal = await this.modalCtrl.create({
      component: StatusActionModalComponent,
      componentProps: { reservationId: resv.id },
      backdropDismiss: false,
    });
    await modal.present();
    const { data, role } = await modal.onDidDismiss();
    if (role !== 'confirm' || !data) {
      (await this.toast.create({ message: 'Chiuso senza modifiche', duration: 900 })).present();
      return;
    }
    const { action, reason } = data as { action: 'accept'|'reject'|'cancel'; reason?: string };
    await this.sendStatus(resv.id, action, reason);
  }

  // Policy locale per hard delete
  private canHardDelete(r: Reservation) {
    return r.status === 'cancelled' || this.forceDelete;
  }

  // Quick action sheet (stato + stampa singola + hard delete)
  async openQuickStatus(resv: Reservation) {
    const buttons: any[] = [
      {
        text: 'Accetta',
        icon: 'checkmark-circle-outline',
        handler: () => this.sendStatus(resv.id, 'accept')
      },
      {
        text: 'Rifiuta…',
        icon: 'close-circle-outline',
        handler: async () => {
          const reason = await this.askReason('reject');
          await this.sendStatus(resv.id, 'reject', reason);
        }
      },
      {
        text: 'Cancella…',
        icon: 'trash-outline',
        handler: async () => {
          const reason = await this.askReason('cancel');
          await this.sendStatus(resv.id, 'cancel', reason);
        }
      },
      // 🖨️ Stampa segnaposto singolo
      {
        text: 'Stampa segnaposto',
        icon: 'print-outline',
        handler: async () => {
          if (this.printing()) return;
          this.printing.set(true);
          try {
            (await this.toast.create({ message: 'Invio segnaposto…', duration: 900 })).present();
            await firstValueFrom(this.api.printPlacecardOne(resv.id));
            (await this.toast.create({ message: 'Segnaposto inviato ✅', duration: 1500 })).present();
          } catch (err: any) {
            console.error('🖨️❌ [List] printPlacecardOne KO', err);
            (await this.toast.create({
              message: `Errore stampa: ${err?.error?.error || err?.message || 'unknown'}`,
              duration: 2500, color: 'danger'
            })).present();
          } finally {
            this.printing.set(false);
          }
        }
      },
      {
        text: 'Dettagli…',
        icon: 'information-circle-outline',
        handler: () => this.openStatusActions(resv)
      },
      { text: 'Chiudi', role: 'cancel' }
    ];

    // “Elimina definitivamente” se consentito
    if (this.canHardDelete(resv)) {
      buttons.splice(buttons.length - 1, 0, {
        text: 'Elimina definitivamente',
        icon: 'trash-bin-outline',
        role: 'destructive',
        handler: () => this.onHardDelete(resv)
      });
    }

    const sheet = await this.sheet.create({ header: 'Cambia stato / Azioni rapide', buttons });
    await sheet.present();
  }

  private async askReason(kind: 'reject'|'cancel'): Promise<string | undefined> {
    const header = kind === 'reject' ? 'Motivo rifiuto' : 'Motivo cancellazione';
    const alert = await this.alert.create({
      header,
      inputs: [{ name: 'reason', type: 'textarea', placeholder: 'Motivo (opzionale)' }],
      buttons: [
        { text: 'Annulla', role: 'cancel' },
        { text: 'OK', role: 'confirm' }
      ]
    });
    await alert.present();
    const { role, data } = await alert.onDidDismiss();
    if (role !== 'confirm') return undefined;
    const val = (data?.values?.reason ?? '').toString().trim();
    return val || undefined;
  }

  private async sendStatus(id: number, action: 'accept'|'reject'|'cancel', reason?: string) {
    (await this.toast.create({ message: 'Invio azione…', duration: 800 })).present();
    this.api.updateStatus(id, action, reason).subscribe({
      next: async () => {
        await this.load();
        (await this.toast.create({ message: 'Stato aggiornato ✅', duration: 1500 })).present();
      },
      error: async (err) => {
        (await this.toast.create({
          message: `Errore: ${err?.error?.error || (err as any)?.message}`,
          duration: 2500,
        })).present();
      }
    });
  }

  // Hard delete con conferma
  private async onHardDelete(resv: Reservation) {
    const alert = await this.alert.create({
      header: 'Eliminare definitivamente?',
      message: `Prenotazione #${resv.id} — azione irreversibile.`,
      buttons: [
        { text: 'Annulla', role: 'cancel' },
        {
          text: 'Elimina',
          role: 'destructive',
          handler: async () => {
            try {
              const res = await firstValueFrom(
                this.api.remove(resv.id, { force: this.forceDelete, notify: this.notifyDelete })
              );
              if (res?.ok) {
                (await this.toast.create({ message: 'Eliminata ✅', duration: 1200 })).present();
                await this.load();
              } else {
                (await this.toast.create({ message: 'Eliminazione non eseguita', duration: 1800 })).present();
              }
            } catch (err: any) {
              const msg = err?.error?.message || err?.error?.error || err?.message || 'Errore eliminazione';
              (await this.toast.create({ message: msg, duration: 2600, color: 'danger' })).present();
            }
          }
        }
      ]
    });
    await alert.present();
  }

  // Filter sheet “bottom sheet”
  async openFilterSheet() {
    const modal = await this.modalCtrl.create({
      component: FilterSheetComponent,
      componentProps: {
        preset: this.rangePreset(),
        status: this.status(),
        from: this.from(),
        to: this.to(),
      },
      breakpoints: [0, 0.5, 0.75, 1],
      initialBreakpoint: 0.75,
      backdropBreakpoint: 0.5,
      handle: true,
      cssClass: 'filter-sheet-modal'
    });
    await modal.present();
    const { data, role } = await modal.onDidDismiss<FilterSheetResult>();
    if (role === 'apply' && data) {
      this.rangePreset.set(data.preset);
      this.status.set(data.status);
      if (data.preset === 'custom') {
        this.from.set(data.from);
        this.to.set(data.to);
      } else {
        this.from.set(undefined);
        this.to.set(undefined);
      }
      this.load();
    } else if (role === 'clear') {
      this.rangePreset.set('all');
      this.status.set('all');
      this.from.set(undefined); this.to.set(undefined);
      this.q.set('');
      this.load();
    }
  }

  // Stampa termica (oggi)
  async printTodayThermal() {
    if (this.printing()) return;
    this.printing.set(true);
    try {
      const t = new Date();
      const date = `${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,'0')}-${String(t.getDate()).padStart(2,'0')}`;
      const res = await firstValueFrom(this.api.printDaily({ date, status: this.status() }));
      (await this.toast.create({
        message: res?.ok
          ? `Job inviato alla termica${(res as any)?.printed_count ? ` (${(res as any).printed_count} righe)` : ''}`
          : 'Invio stampante fallito',
        duration: 1800
      })).present();
    } catch (err: any) {
      (await this.toast.create({ message: `Errore stampa: ${err?.error?.error || err?.message || 'unknown'}`, duration: 2500 })).present();
    } finally {
      this.printing.set(false);
    }
  }

  // Stampa segnaposti (oggi)
  async printPlacecardsToday() {
    if (this.printing()) return;
    this.printing.set(true);
    try {
      const t = new Date();
      const date = `${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,'0')}-${String(t.getDate()).padStart(2,'0')}`;
      (await this.toast.create({ message: 'Invio stampa segnaposti…', duration: 900 })).present();
      await firstValueFrom(this.api.printPlacecards(date, 'accepted'));
      (await this.toast.create({ message: 'Segnaposti inviati ✅', duration: 1500 })).present();
    } catch (err: any) {
      (await this.toast.create({ message: `Errore stampa: ${err?.error?.error || err.message}`, duration: 2500 })).present();
    } finally {
      this.printing.set(false);
    }
  }

  // Navigazione all’edit quando si tocca la riga
  openEdit(r: Reservation) {
    this.router.navigate(['/reservations', r.id, 'edit']);
  }

  // Click sul bottone “Azioni”: blocca la riga e apri il quick sheet
  onActionsClick(ev: Event, r: Reservation) {
    ev.stopPropagation();
    ev.preventDefault();
    this.openQuickStatus(r);
  }
}
