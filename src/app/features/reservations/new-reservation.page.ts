// src/app/features/reservations/new-reservation.page.ts
//
// Pagina "Nuova prenotazione" — stile originale
// - Stepper coperti, date quick, fallback calendario
// - Caricamento sale/tavoli onChange
// - Autocomplete Google Contacts (parent-driven): query → service, select → patch campi cliente
// - Signals @angular/core, reactive forms, niente ngModel sui signals

import { Component, inject, signal, computed, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';

// Angular common
import { NgIf, NgFor } from '@angular/common';

// Ionic standalone
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonItem, IonLabel, IonInput, IonButton, IonSelect, IonSelectOption,
  IonTextarea, IonDatetime, IonNote, IonList,
  IonIcon, IonFab, IonFabButton, IonFabList, IonSegment, IonSegmentButton
} from '@ionic/angular/standalone';
import { ToastController } from '@ionic/angular';

// Service API FE
import { ReservationsApi, Room, Table } from '../../core/reservations/reservations.service';

// UI riusabile — scroller 7 giorni
import { DateQuickComponent } from '../../features/reservations/_components/ui/date-quick/date-quick.component';

// Google Contacts (component figlio + tipo pick)
import {
  GContactsAutocompleteComponent,
  GContactPick
} from './_components/gcontacts-autocomplete/gcontacts-autocomplete.component';

// Service reale (GIS + People API) — espone .searching (signal) e .searchContacts(q, limit)
import { GoogleContactsService } from '../../core/google/google-contacts.service';

@Component({
  standalone: true,
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.page.html',
  imports: [
    IonSegmentButton, IonSegment,
    // Angular
    ReactiveFormsModule, NgIf, NgFor, RouterLink,
    // Ionic
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonItem, IonLabel, IonInput, IonButton, IonSelect, IonSelectOption,
    IonTextarea, IonDatetime, IonNote, IonList, IonIcon,
    IonFab, IonFabButton, IonFabList,
    // Shared UI
    DateQuickComponent,
    // Autocomplete Google Contacts
    GContactsAutocompleteComponent,
  ]
})
export class NewReservationPage implements OnDestroy {
  private fb     = inject(FormBuilder);
  private api    = inject(ReservationsApi);
  private router = inject(Router);
  private toast  = inject(ToastController);
  private gcs    = inject(GoogleContactsService); // ✅ People API

  // Stato UI (signals semplici)
  loading = signal(false);
  rooms   = signal<Room[]>([]);
  tables  = signal<Table[]>([]);

  // ===== Google Contacts (parent-driven) =====================================
  // Risultati mostrati nel componente figlio
  gcResults   = signal<GContactPick[]>([]);
  // Spinner "ricerca..." fornito dalla service
  gcSearching = this.gcs.searching;

  /**
   * Query dall'autocomplete → People API
   * - ignoro query < 2 char
   * - salvo i risultati tipizzati (GContactPick)
   */
  async onGcQueryChange(q: string) {
    const query = (q || '').trim();
    if (query.length < 2) { this.gcResults.set([]); return; }
    try {
      const rows = await this.gcs.searchContacts(query, 12);
      this.gcResults.set(rows || []);
    } catch (e) {
      console.warn('🔎 [NewReservation] Google search KO', e);
      this.gcResults.set([]);
    }
  }

  /**
   * Selezione contatto dall'autocomplete:
   * - patcha SOLO i campi cliente (niente reset del resto)
   * - il child svuota già la query; qui svuotiamo la lista risultati
   */
  onContactSelected(pick: GContactPick) {
    this.form.patchValue({
      customer_first: (pick.givenName ?? '') || (pick.displayName?.split(' ')[0] ?? ''),
      customer_last : (pick.familyName ?? '') || (pick.displayName?.split(' ').slice(1).join(' ') ?? ''),
      phone         : pick.phone ?? '',
      email         : pick.email ?? '',
    }, { emitEvent: false });
    this.gcResults.set([]);
  }
  // ==========================================================================

  // Form reattivo
  form = this.fb.group({
    customer_first: [''],
    customer_last : [''],
    phone         : [''],
    email         : ['', Validators.email],
    party_size    : [1,  [Validators.required, Validators.min(1)]],
    start_at      : ['', [Validators.required]],  // ISO UTC
    end_at        : [''],                         // opzionale (BE la calcola)
    room_id       : [null as number | null],
    table_id      : [null as number | null],
    notes         : ['']
  });

  // Data selezionata (YYYY-MM-DD) per il componente rapido
  selectedDateISO = signal(toTodayISO());

  // Slot orari (personalizzabili)
  lunchSlots  = buildTimeRange('12:00', '15:00', 30);
  dinnerSlots = buildTimeRange('19:00', '22:30', 30);

  // ora selezionata (HH:mm)
  selectedTime = signal<string | null>(null);

  // calendario avanzato (fallback)
  showAdvanced = signal(false);

  // Etichetta “Oggi: …”
  now = signal(new Date());
  private clock?: any;
  graceMinutes = 10;

  todayLabel = computed(() =>
    new Intl.DateTimeFormat('it-IT', {
      weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric'
    }).format(this.now())
  );

  selectedDateHuman = computed(() =>
    new Intl.DateTimeFormat('it-IT', {
      weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric'
    }).format(new Date(this.selectedDateISO() + 'T00:00:00'))
  );

  advancedValue = computed(() => {
    const d = this.selectedDateISO();
    const t = this.selectedTime();
    return t ? `${d}T${t}:00` : `${d}T12:00:00`;
  });

  // ====== Ionic lifecycle ======
  /** Entra in vista → voglio un form pulito (utile quando torni qui dalla nav dell’app). */
  ionViewWillEnter() {
    this.resetFormToDefaults(/*autoselectRoom*/ true);
  }

  /** Esce dalla vista → svuoto così la cache dell’outlet non conserva i dati. */
  ionViewDidLeave() {
    this.resetFormToDefaults(/*autoselectRoom*/ false);
  }

  // ===== Interazioni =====

  onQuickDate(dateISO: string) {
    // Cambio giorno → resetta orario e start_at
    this.selectedDateISO.set(dateISO);
    this.selectedTime.set(null);
    this.form.patchValue({ start_at: '' });
  }

  forceUpper(ctrl: 'customer_first' | 'customer_last' | 'notes', ev: any) {
    const raw = (ev?.detail?.value ?? '').toString();
    const upper = raw.toLocaleUpperCase('it-IT');
    if (raw !== upper) this.form.patchValue({ [ctrl]: upper } as any, { emitEvent: false });
  }

  incParty() {
    const cur = Number(this.form.value.party_size || 1);
    const next = Math.min(20, cur + 1);
    this.form.patchValue({ party_size: next });
  }
  decParty() {
    const cur = Number(this.form.value.party_size || 1);
    const next = Math.max(1, cur - 1);
    this.form.patchValue({ party_size: next });
  }

  isSlotDisabled(dateISO: string, hhmm: string): boolean {
    if (dateISO !== toTodayISO()) return false;
    const [h, m] = hhmm.split(':').map(Number);
    const slotMin = h * 60 + m;
    const now = this.now();
    const nowMin = now.getHours() * 60 + now.getMinutes();
    return slotMin <= nowMin + this.graceMinutes;
  }

  onSelectTime(t: string) {
    if (this.isSlotDisabled(this.selectedDateISO(), t)) return;
    this.selectedTime.set(t);
    const isoUTC = localDateTimeToUTCISO(this.selectedDateISO(), t);
    this.form.patchValue({ start_at: isoUTC });
  }

  toggleAdvanced() { this.showAdvanced.set(!this.showAdvanced()); }

  onAdvancedPick(ev: CustomEvent) {
    const isoLocal = (ev.detail as any).value as string;
    if (!isoLocal) return;
    const [d, time] = isoLocal.split('T');
    const hhmm = (time || '').slice(0, 5);
    this.selectedDateISO.set(d);
    this.selectedTime.set(hhmm);
    const isoUTC = localDateTimeToUTCISO(d, hhmm);
    this.form.patchValue({ start_at: isoUTC });
  }

  get startCtrl() { return this.form.controls.start_at; }
  get emailCtrl() { return this.form.controls.email; }

  constructor() {
    // 1) Sale all’ingresso
    this.loadRooms();

    // 2) Carica tavoli per sala selezionata
    this.form.get('room_id')!.valueChanges.subscribe(async (roomId: number | null) => {
      this.form.patchValue({ table_id: null }, { emitEvent: false });
      if (!roomId) { this.tables.set([]); return; }
      try {
        const rows = await firstValueFrom(this.api.listTablesByRoom(Number(roomId)));
        this.tables.set(rows || []);
      } catch { this.tables.set([]); }
    });

    // 3) Debug: vedere i cambi di data/ora
    this.form.get('start_at')!.valueChanges.subscribe(v =>
      console.log('⏰ [NewReservation] start_at →', v)
    );

    // 4) Clock → abilita/disabilita slot dinamicamente oggi
    this.clock = setInterval(() => this.now.set(new Date()), 60_000);
  }

  ngOnDestroy() { if (this.clock) clearInterval(this.clock); }

  async loadRooms() {
    try {
      const rows = await firstValueFrom(this.api.listRooms());
      this.rooms.set(rows || []);
      // Se entro la prima volta e non ho ancora una sala, auto-seleziono la prima
      if (this.rooms().length && !this.form.value.room_id) {
        this.form.patchValue({ room_id: this.rooms()[0].id });
      }
    } catch { this.rooms.set([]); }
  }



  async onSubmit() {
  if (this.form.invalid) { this.form.markAllAsTouched(); return; }
  this.loading.set(true);
  try {
    const v = this.form.value;
    const dto = {
      customer_first: v.customer_first?.trim() || null,
      customer_last : v.customer_last?.trim() || null,
      phone         : v.phone?.trim() || null,
      email         : v.email?.trim() || null,
      party_size    : Number(v.party_size ?? 1),
      start_at      : v.start_at!,              // ISO UTC
      end_at        : v.end_at || null,
      notes         : v.notes?.trim() || null,
      room_id       : v.room_id ?? null,        // ✅ aggiunto
      table_id      : v.table_id ?? null
    };

    const res = await firstValueFrom(this.api.create(dto));   // ✅ await corretto
    console.log('✅ [NewReservation] created →', res);

    this.resetFormToDefaults(/*autoselectRoom*/ true);
    this.router.navigateByUrl('/reservations');
  } catch (e: any) {
    console.error('💥 [NewReservation] create KO', e);
    (await this.toast.create({
      message: e?.error?.message || e?.message || 'Errore creazione prenotazione',
      duration: 2200, color: 'danger'
    })).present();
  } finally {
    this.loading.set(false);
  }
}



  async clearForm() {
    this.resetFormToDefaults(/*autoselectRoom*/ true);
    (await this.toast.create({ message: 'Modulo pulito', duration: 1200 })).present();
  }

  // ===== Helpers di reset (riusati in più punti) =====

  /** Valori di default "comodi" quando apro/rientro nella pagina */
  private getDefaultValues() {
    return {
      customer_last: null,
      customer_first: null,
      phone: null,
      email: null,
      party_size: 2,         // default comodo su mobile
      start_at: null,
      end_at: null,
      notes: null,
      room_id: null,
      table_id: null,
    };
  }

  /**
   * Reset completo: form + segnali UI.
   * @param autoselectRoom se true e ho già le sale, imposto la prima.
   */
  private resetFormToDefaults(autoselectRoom: boolean) {
    this.form.reset(this.getDefaultValues());
    this.selectedDateISO.set(toTodayISO());
    this.selectedTime.set(null);
    this.showAdvanced.set(false);
    this.tables.set([]);

    if (autoselectRoom && this.rooms().length) {
      this.form.patchValue({ room_id: this.rooms()[0].id });
    }
  }
}

// ===== Helpers (come prima) =====

function pad(n: number) { return String(n).padStart(2, '0'); }

function toTodayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function buildTimeRange(startHHmm: string, endHHmm: string, stepMin: number) {
  const [sh, sm] = startHHmm.split(':').map(Number);
  const [eh, em] = endHHmm.split(':').map(Number);
  const t = new Date(); t.setSeconds(0, 0); t.setHours(sh, sm, 0, 0);
  const end = new Date(); end.setSeconds(0, 0); end.setHours(eh, em, 0, 0);
  const out: string[] = [];
  while (t <= end) { out.push(`${pad(t.getHours())}:${pad(t.getMinutes())}`); t.setMinutes(t.getMinutes() + stepMin); }
  return out;
}

function localDateTimeToUTCISO(dateISO: string, hhmm: string) {
  const [H, M] = hhmm.split(':').map(Number);
  const [Y, Mo, D] = dateISO.split('-').map(Number);
  const d = new Date(Y, (Mo - 1), D, H, M, 0, 0);
  return d.toISOString();
}
