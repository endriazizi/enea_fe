import { Component, inject, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

// Angular common
import { NgIf, NgFor, DatePipe } from '@angular/common';

// Ionic standalone
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonItem, IonLabel, IonInput, IonButton, IonSelect, IonSelectOption,
  IonTextarea, IonDatetime, IonNote, IonList, IonIcon,
  IonFab, IonFabButton, IonFabList, IonButtons
} from '@ionic/angular/standalone';

import { ToastController } from '@ionic/angular';

// Service
import {
  ReservationsApi,
  Room, Table, Reservation
} from '../../core/reservations/reservations.service';

@Component({
  standalone: true,
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.page.html',
  imports: [IonButtons,
    // Angular
    ReactiveFormsModule, NgIf, NgFor, DatePipe,
    // Ionic
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonItem, IonLabel, IonInput, IonButton, IonSelect, IonSelectOption,
    IonTextarea, IonDatetime, IonNote, IonList, IonIcon,
    IonFab, IonFabButton, IonFabList
  ]
})
export class EditReservationPage implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private api = inject(ReservationsApi);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private toast = inject(ToastController);

  // id dalla rotta
  private id = Number(this.route.snapshot.paramMap.get('id'));

  // Stato UI
  loading = signal(false);
  printing = signal(false);
  entity = signal<Reservation | null>(null); // ✅ mai undefined

  rooms = signal<Room[]>([]);
  tables = signal<Table[]>([]);

  // Form reattivo
  form = this.fb.group({
    customer_first: [''],
    customer_last : [''],
    phone         : [''],
    email         : ['', Validators.email],
    party_size    : [1,  [Validators.required, Validators.min(1)]],
    start_at      : ['', [Validators.required]],   // ISO UTC
    end_at        : [''],                          // opzionale
    room_id       : [null as number | null],
    table_id      : [null as number | null],
    notes         : ['']
  });

  // Helper getter per template
  get startCtrl() { return this.form.controls.start_at; }
  get emailCtrl() { return this.form.controls.email; }

  // Label data “oggi”
  now = signal(new Date());
  todayLabel = computed(() =>
    new Intl.DateTimeFormat('it-IT', {
      weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric'
    }).format(this.now())
  );

  private clock?: any;

  async ngOnInit() {
    // clock “soft” come nella new (opzionale, utile per UI/validazioni)
    this.clock = setInterval(() => this.now.set(new Date()), 60_000);

    // Carica sale in parallelo (non blocca)
    this.loadRooms();

    // Carica entità da BE e popola form
    await this.loadEntity();
    // Reazione al cambio sala → carica tavoli
    this.form.get('room_id')!.valueChanges.subscribe(async (roomId) => {
      this.form.patchValue({ table_id: null }, { emitEvent: false });
      if (!roomId) { this.tables.set([]); return; }
      try {
        const rows = await firstValueFrom(this.api.listTablesByRoom(Number(roomId)));
        this.tables.set(rows || []);
      } catch (e) {
        console.warn('[EditReservation] listTablesByRoom KO', e);
        this.tables.set([]);
      }
    });
  }

  ngOnDestroy() {
    if (this.clock) clearInterval(this.clock);
  }

  // Forza MAIUSCOLO live su un controllo (nome/cognome/notes)
  forceUpper(ctrl: 'customer_first' | 'customer_last' | 'notes', ev: any) {
    const raw = (ev?.detail?.value ?? '').toString();
    const upper = raw.toLocaleUpperCase('it-IT');
    if (raw !== upper) {
      this.form.patchValue({ [ctrl]: upper } as any, { emitEvent: false });
    }
  }

  private async loadRooms() {
    try {
      const rows = await firstValueFrom(this.api.listRooms());
      this.rooms.set(rows || []);
    } catch (e) {
      console.warn('[EditReservation] listRooms KO', e);
      this.rooms.set([]);
    }
  }

  private async loadEntity() {
    if (!Number.isFinite(this.id)) {
      alert('ID prenotazione non valido');
      this.router.navigateByUrl('/reservations');
      return;
    }

    this.loading.set(true);
    try {
      const r = await firstValueFrom(this.api.byId(this.id));
      if (!r) {
        alert('Prenotazione non trovata');
        this.router.navigateByUrl('/reservations');
        return;
      }

      this.entity.set(r); // ✅ mai undefined

      // Carica tavoli se ho room_id
      if (r.room_id) {
        try {
          const rows = await firstValueFrom(this.api.listTablesByRoom(Number(r.room_id)));
          this.tables.set(rows || []);
        } catch (e) {
          console.warn('[EditReservation] listTablesByRoom KO', e);
          this.tables.set([]);
        }
      }

      // Popola form
      this.form.patchValue({
        customer_first: r.customer_first || '',
        customer_last : r.customer_last  || '',
        phone         : r.phone || '',
        email         : r.email || '',
        party_size    : r.party_size,
        start_at      : r.start_at,
        end_at        : r.end_at,
        room_id       : r.room_id || null,
        table_id      : r.table_id || null,
        notes         : r.notes || ''
      }, { emitEvent: false });

    } catch (e: any) {
      console.error('💥 [EditReservation] load KO', e);
      alert(e?.message || 'Errore caricamento prenotazione');
      this.router.navigateByUrl('/reservations');
    } finally {
      this.loading.set(false);
    }
  }

  // === Azioni principali =====================================================

  async onSave() {
    if (this.form.invalid || !this.entity()) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    try {
      const v = this.form.value;
      const dto = {
        customer_first: v.customer_first?.trim() ?? null,
        customer_last : v.customer_last?.trim()  ?? null,
        phone         : v.phone?.trim()          ?? null,
        email         : v.email?.trim()          ?? null,
        party_size    : Number(v.party_size)     || 1,
        start_at      : v.start_at!,                // ISO UTC
        end_at        : v.end_at || null,
        room_id       : v.room_id || null,
        table_id      : v.table_id || null,
        notes         : v.notes?.trim() || null,
      };

      // ⚠️ api.update restituisce una Promise — niente .toPromise()
      await this.api.update(this.entity()!.id, dto);

      (await this.toast.create({ message: 'Salvato ✅', duration: 1200 })).present();
      this.router.navigateByUrl('/reservations');
    } catch (e: any) {
      console.error('💥 [EditReservation] update KO', e);
      (await this.toast.create({
        message: e?.error?.error || e?.message || 'Errore salvataggio',
        duration: 2200
      })).present();
    } finally {
      this.loading.set(false);
    }
  }

  async onDelete() {
    if (!this.entity()) return;
    const ok = confirm('Eliminare definitivamente la prenotazione?');
    if (!ok) return;

    this.loading.set(true);
    try {
      // ⚠️ api.remove restituisce una Promise — niente .toPromise()
      await this.api.remove(this.entity()!.id);
      (await this.toast.create({ message: 'Eliminata 🗑️', duration: 1200 })).present();
      this.router.navigateByUrl('/reservations');
    } catch (e: any) {
      console.error('💥 [EditReservation] delete KO', e);
      (await this.toast.create({
        message: e?.error?.error || e?.message || 'Errore eliminazione',
        duration: 2200
      })).present();
    } finally {
      this.loading.set(false);
    }
  }

  goToList() {
    this.router.navigateByUrl('/reservations');
  }

  // === Stampa (batch) ========================================================

  async printTodayThermal() {
    if (this.printing()) return;
    this.printing.set(true);
    try {
      const t = new Date();
      const date = `${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,'0')}-${String(t.getDate()).padStart(2,'0')}`;
      const res = await firstValueFrom(this.api.printDaily({ date, status: 'all' }));
      (await this.toast.create({
        message: res?.ok
          ? `Job inviato alla termica${res?.printed_count ? ` (${res.printed_count} righe)` : ''}`
          : 'Invio stampante fallito',
        duration: 1800
      })).present();
    } catch (err: any) {
      (await this.toast.create({
        message: `Errore stampa: ${err?.error?.error || err?.message || 'unknown'}`,
        duration: 2500
      })).present();
    } finally {
      this.printing.set(false);
    }
  }

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
      (await this.toast.create({
        message: `Errore stampa: ${err?.error?.error || err?.message}`,
        duration: 2500
      })).present();
    } finally {
      this.printing.set(false);
    }
  }

  // === 🖨️ Stampa segnaposto SINGOLO =========================================
  async onPrintPlacecardOne() {
    if (this.printing()) return;
    if (!this.entity()) {
      (await this.toast.create({ message: 'Prenotazione non caricata', duration: 1500 })).present();
      return;
    }
    this.printing.set(true);
    try {
      (await this.toast.create({ message: 'Invio segnaposto alla termica…', duration: 900 })).present();
      const res = await firstValueFrom(this.api.printPlacecardOne(this.entity()!.id));
      const r: any = res ?? {};
      const msgOk = `Segnaposto inviato ✅${r?.printed_count ? ` (${r.printed_count} righe)` : ''}`;
      (await this.toast.create({ message: r?.ok ? msgOk : 'Comando di stampa inviato ✅', duration: 1800 })).present();
    } catch (err: any) {
      console.error('🖨️❌ [EditReservation] printPlacecardOne KO', err);
      (await this.toast.create({
        message: `Errore stampa segnaposto: ${err?.error?.error || err?.message || 'unknown'}`,
        duration: 2500, color: 'danger'
      })).present();
    } finally {
      this.printing.set(false);
    }
  }
}
