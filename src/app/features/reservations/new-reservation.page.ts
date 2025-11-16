import { Component, inject, signal, computed, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { NgIf, NgFor } from '@angular/common';

import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonItem, IonLabel, IonInput, IonButton, IonSelect, IonSelectOption,
  IonTextarea, IonDatetime, IonNote, IonList,
  IonIcon, IonFab, IonFabButton, IonFabList,
  IonSpinner            // 👈 già pronto se vuoi usarlo in futuro nel template
} from '@ionic/angular/standalone';
import { ToastController } from '@ionic/angular';

import { ReservationsApi, Room, Table, Reservation } from '../../core/reservations/reservations.service';
import { DateQuickComponent } from '../../features/reservations/_components/ui/date-quick/date-quick.component';

import {
  GContactsAutocompleteComponent,
  GContactPick
} from './_components/gcontacts-autocomplete/gcontacts-autocomplete.component';
import { GoogleContactsService } from '../../core/google/google-contacts.service';

import { EmailNotifyService } from '../../core/notifications/email-notify.service';
import { WhatsAppService } from '../../core/notifications/whatsapp.service';

@Component({
  standalone: true,
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.page.html',
  styleUrls: ['./new-reservation.page.scss'],
  imports: [
    ReactiveFormsModule, NgIf, NgFor, RouterLink,
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonItem, IonLabel, IonInput, IonButton, IonSelect, IonSelectOption,
    IonTextarea, IonDatetime, IonNote, IonList, IonIcon,
    IonFab, IonFabButton, IonFabList,
    DateQuickComponent,
    GContactsAutocompleteComponent,
    IonSpinner,                         // 👈 import dichiarato (anche se non usato nel template)
  ]
})
export class NewReservationPage implements OnDestroy {
  private fb     = inject(FormBuilder);
  private api    = inject(ReservationsApi);
  private router = inject(Router);
  private toast  = inject(ToastController);
  private gcs    = inject(GoogleContactsService);
  private mail   = inject(EmailNotifyService);
  private wa     = inject(WhatsAppService);

  // ==== UI state ====
  loading = signal(false);
  rooms   = signal<Room[]>([]);
  tables  = signal<Table[]>([]);

  // ==== Google Contacts ====
  gcResults     = signal<GContactPick[]>([]);
  gcSearching   = this.gcs.searching;
  gcSaving      = this.gcs.saving;
  gcNeedsRead   = signal(false);    // mostra CTA "Connetti Google"

  async onGcQueryChange(q: string) {
    const query = (q || '').trim();
    if (query.length < 2) { this.gcResults.set([]); return; }
    try {
      const rows = await this.gcs.searchContacts(query, 12);
      this.gcResults.set(rows || []);
      this.gcNeedsRead.set(false);
    } catch (e: any) {
      this.gcResults.set([]);
      this.gcNeedsRead.set(true);
      console.warn('🔎 [NewReservation] Google search KO', e);
    }
  }

  async onGoogleConnect() {
    try {
      const ok = await this.gcs.connectRead();
      if (ok) {
        this.gcNeedsRead.set(false);
        (await this.toast.create({ message: 'Google collegato ✅', duration: 1300 })).present();
      }
    } catch {
      // popup chiuso dall'utente, nessun alert
    }
  }

  onContactSelected(pick: GContactPick | null) {
    if (!pick) return;
    this.form.patchValue({
      customer_last:  pick.familyName ?? pick.displayName ?? '',
      customer_first: pick.givenName ?? '',
      phone:          pick.phone ?? '',
      email:          pick.email ?? '',
    }, { emitEvent: true });
  }

  // ==== Orari predefiniti ====
  lunchSlots  = ['12:00','12:30','13:00','13:30','14:00'];
  dinnerSlots = ['19:00','19:30','20:00','20:30','21:00','21:30','22:00'];

  // ==== UI data (data/ora) ====
  private pickedDateISO = signal<string>(this.todayISO());
  private pickedTime    = signal<string | null>(null);

  todayLabel = computed(() =>
    new Intl.DateTimeFormat('it-IT', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' })
      .format(new Date())
  );

  selectedDateISO() { return this.pickedDateISO(); }
  selectedTime()    { return this.pickedTime() || ''; }
  selectedDayForPicker() { return this.selectedDateISO(); }
  onQuickFilterDay(dateISO: string) { this.onQuickDate(dateISO); }

  onQuickDate(dateISO: string) {
    this.pickedDateISO.set(dateISO);
    if (this.pickedTime()) this.patchStartFromPick();
  }

  onSelectTime(t: string) {
    this.pickedTime.set(t);
    this.patchStartFromPick();
  }

  isSlotDisabled(dateISO: string, t: string): boolean {
    const todayISO = this.todayISO();
    if (dateISO !== todayISO) return false;
    const now = new Date();
    const [hh, mm] = t.split(':').map(n => +n);
    return now.getHours() > hh || (now.getHours() === hh && now.getMinutes() > mm);
  }

  selectedDateHuman(): string {
    const [y,m,d] = this.pickedDateISO().split('-').map(n => +n);
    return new Intl.DateTimeFormat('it-IT', { weekday:'long', day:'2-digit', month:'2-digit', year:'numeric' })
      .format(new Date(y, m-1, d));
  }

  // ==== Calendario avanzato (ripristino funzioni) ====
  private advancedOpen = signal(false);
  showAdvanced() { return this.advancedOpen(); }
  toggleAdvanced() { this.advancedOpen.set(!this.advancedOpen()); }
  advancedValue() {
    const v = this.form.value.start_at || (this.pickedDateISO() + 'T' + (this.pickedTime() || '20:00'));
    return v;
  }
  onAdvancedPick(ev: CustomEvent) {
    const raw = (ev.detail as any)?.value as string | null;
    if (raw) this.form.patchValue({ start_at: raw, end_at: null });
    const dt = raw?.split('T') ?? null;
    if (dt?.length === 2) {
      this.pickedDateISO.set(dt[0]);
      this.pickedTime.set(dt[1].slice(0,5));
    }
  }

  // ==== Form ====
  form = this.fb.group({
    customer_last : ['' as string | null, [Validators.required]],
    customer_first: ['' as string | null, [Validators.required]],
    phone         : ['' as string | null],
    email         : ['' as string | null, Validators.email],
    party_size    : [2,  [Validators.required, Validators.min(1)]],
    start_at      : ['' as string | null, [Validators.required]],
    end_at        : ['' as string | null],
    room_id       : [null as number | null],
    table_id      : [{ value: null as number | null, disabled: true }],
    notes         : ['' as string | null],
  });

  get emailCtrl(): AbstractControl { return this.form.controls.email!; }
  get startCtrl(): AbstractControl { return this.form.controls.start_at!; }

  // Uppercase reale solo su blur/submit
  upperOnBlur(ctrl: 'customer_last'|'customer_first') {
    const raw  = (this.form.controls[ctrl].value ?? '') as string;
    const next = raw ? raw.toLocaleUpperCase('it-IT') : raw;
    this.form.controls[ctrl].setValue(next, { emitEvent: false });
  }

  incParty() {
    const n = (this.form.value.party_size || 1) + 1;
    this.form.patchValue({ party_size: n });
  }

  decParty() {
    const n = Math.max(1, (this.form.value.party_size || 1) - 1);
    this.form.patchValue({ party_size: n });
  }

  // ==== Sale/Tavoli ====
  async ngOnInit() {
    try {
      const rooms = await firstValueFrom(this.api.listRooms());
      console.log('🏨 Rooms loaded', rooms?.length ?? 0);
      this.rooms.set(rooms || []);
      const initialRoom = this.form.value.room_id || this.rooms()[0]?.id || null;
      if (initialRoom) {
        this.form.patchValue({ room_id: initialRoom });
        await this.onRoomChange(initialRoom);
      } else {
        this.disableTableSelect();
      }
    } catch (e) {
      console.warn('🏨 Rooms load KO', e);
      this.disableTableSelect();
    }
  }

  ngOnDestroy() {}

  private disableTableSelect() {
    try { this.form.controls.table_id.disable({ emitEvent: false }); } catch {}
    this.tables.set([]);
  }

  private enableTableSelect() {
    try { this.form.controls.table_id.enable({ emitEvent: false }); } catch {}
  }

  async onRoomChange(roomId?: number) {
    const rid = (roomId ?? this.form.value.room_id) || null;
    this.tables.set([]);
    this.form.patchValue({ table_id: null });
    if (!rid) { this.disableTableSelect(); return; }

    try {
      const tables = await firstValueFrom(this.api.listTablesByRoom(rid));
      console.log('🪑 Tables for room', rid, '→', tables?.length ?? 0);
      this.tables.set(tables || []);
      if ((this.tables().length || 0) > 0) this.enableTableSelect();
      else this.disableTableSelect();
    } catch (e) {
      console.warn('🪑 Tables load KO', e);
      this.disableTableSelect();
    }
  }

  // ==== Submit prenotazione ====
  onSubmit() { this.submit(); }

  async submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.upperOnBlur('customer_last');
    this.upperOnBlur('customer_first');

    this.loading.set(true);
    try {
      const startIsoLocal = this.form.value.start_at as string;
      const payload = {
        customer_first: this.form.value.customer_first?.trim() || null,
        customer_last : this.form.value.customer_last?.trim()  || null,
        phone         : this.form.value.phone?.trim()          || null,
        email         : this.form.value.email?.trim()          || null,
        party_size    : this.form.value.party_size || 1,
        start_at      : startIsoLocal,
        end_at        : null,
        room_id       : this.form.value.room_id || null,
        table_id      : this.form.value.table_id || null,
        notes         : this.form.value.notes || null,
      };

      const created = await firstValueFrom(this.api.create(payload));
      await (await this.toast.create({ message: 'Prenotazione creata ✅', duration: 1400 })).present();

      if ((created as any)?.status === 'pending') {
        this.mail.sendReservationPendingAdmin(created as Reservation).subscribe(r => {
          console.log('📧 [Mail] admin pending OK?', r.ok);
        });
        this.mail.sendReservationPendingCustomer(created as Reservation).subscribe(r => {
          console.log('📧 [Mail] customer pending OK?', r.ok);
        });
        this.wa.sendReservationPending('twilio', created as Reservation).subscribe(r => {
          console.log('💬 [WA] pending OK?', r.ok);
        });
      }

      this.router.navigate(['/reservations']);
    } catch (err: any) {
      const msg = err?.message || 'Errore creazione';
      (await this.toast.create({ message: msg, duration: 2200, color: 'danger' })).present();
    } finally {
      this.loading.set(false);
    }
  }

  // ==== Google: salva contatto ====
  async onGoogleSave() {
    const data = {
      displayName: `${this.form.value.customer_first || ''} ${this.form.value.customer_last || ''}`.trim() || null,
      givenName:   this.form.value.customer_first || null,
      familyName:  this.form.value.customer_last  || null,
      email:       this.form.value.email || null,
      phone:       this.form.value.phone || null,
    };

    const r = await this.gcs.createContact(data);
    if (r?.ok) {
      (await this.toast.create({ message: 'Contatto salvato su Google ✅', duration: 1400 })).present();
    } else {
      (await this.toast.create({ message: 'Salvataggio Google non riuscito', duration: 1800, color: 'warning' })).present();
    }
  }

  clearForm() {
    this.form.reset({
      party_size: 2,
      start_at: null,
      end_at: null,
      room_id: null,
      table_id: null,
      notes: null,
      customer_last: '',
      customer_first: '',
      phone: '',
      email: '',
    });
    this.pickedDateISO.set(this.todayISO());
    this.pickedTime.set(null);
    this.disableTableSelect();
  }

  // ==== helpers ====
  private patchStartFromPick() {
    if (!this.pickedTime()) return;
    const v = `${this.pickedDateISO()}T${this.pickedTime()}`;
    this.form.patchValue({ start_at: v, end_at: null });
  }

  private todayISO(): string {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }
}
