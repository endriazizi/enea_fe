// src/app/features/reservations/new-reservation.page.ts
// ============================================================================
// Pagina "Nuova Prenotazione"
// - Stile invariato (commenti lunghi, log con emoji, Signals).
// - FIX: aggiunti tutti i metodi/proprietà richiamati dal template (vedi sotto)
// - FIX specifico di questo commit: import e registrazione di IonButtons
//   (altrimenti NG8001: 'ion-buttons' is not a known element).
// - Hook già presente: dopo create(), se status === 'pending' invio 2 email.
// ============================================================================

import { Component, OnDestroy, computed, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';

// Angular common
import { NgIf, NgFor, DatePipe } from '@angular/common';

// Ionic standalone
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonItem, IonLabel, IonInput, IonButton, IonButtons, IonSelect, IonSelectOption,
  IonTextarea, IonDatetime, IonNote, IonList,
  IonIcon, IonFab, IonFabButton, IonFabList, IonSegment, IonSegmentButton
} from '@ionic/angular/standalone';
import { ToastController } from '@ionic/angular';

// API FE
import { ReservationsApi, Room, Table, Reservation } from '../../core/reservations/reservations.service';

// UI riusabile — quick date (se presente nel tuo progetto)
import { DateQuickComponent } from './_components/ui/date-quick/date-quick.component';

// Autocomplete Google Contacts (se presente)
import {
  GContactsAutocompleteComponent,
  GContactPick
} from './_components/gcontacts-autocomplete/gcontacts-autocomplete.component';

// Email su pending (admin + cliente)
import { EmailNotifyService } from '../../core/notifications/email-notify.service';

@Component({
  standalone: true,
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.page.html',
  imports: [
    // Angular
    ReactiveFormsModule, NgIf, NgFor, RouterLink, DatePipe,
    // Ionic
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonItem, IonLabel, IonInput, IonButton, IonButtons, IonSelect, IonSelectOption,
    IonTextarea, IonDatetime, IonNote, IonList, IonIcon,
    IonFab, IonFabButton, IonFabList, IonSegment, IonSegmentButton,
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
  private mail   = inject(EmailNotifyService);

  // ========================== Signals / Stato UI ==============================
  loading      = signal(false);
  rooms        = signal<Room[]>([]);
  tables       = signal<Table[]>([]);
  step         = signal(1);
  maxStep      = 9;

  // Mostra/nasconde calendario avanzato (IonDatetime) — default: chiuso
  private _showAdvanced = signal(false);
  showAdvanced = () => this._showAdvanced();

  // Slot orari "rapidi"
  readonly lunchSlots  = ['12:00','12:30','13:00','13:30','14:00'];
  readonly dinnerSlots = ['19:00','19:30','20:00','20:30','21:00','21:30','22:00'];

  // ============================== Form =======================================
  form = this.fb.group({
    customer_first: ['', [Validators.required]],
    customer_last : ['', [Validators.required]],
    phone         : [''],
    email         : ['', [Validators.email]],
    party_size    : [2,  [Validators.required, Validators.min(1)]],
    date          : ['', [Validators.required]], // YYYY-MM-DD
    time          : ['', [Validators.required]], // HH:mm
    reason        : [''],
    notes         : [''],
    room_id       : [null as number | null],
    table_id      : [null as number | null],
  });

  // ===== Getter comodi per template (invalid/dirty/touched) ===================
  get emailCtrl(): AbstractControl<any, any> { return this.form.controls.email; }
  get startCtrl(): AbstractControl<any, any> { return this.form.controls.time; }

  // =============================== Stepper ===================================
  canGoNext(): boolean {
    const s = this.step();
    const c = this.form.controls;
    if (s === 1) return c.customer_first.valid && c.customer_last.valid;
    if (s === 2) return true; // telefono opzionale
    if (s === 3) return c.email.valid;
    if (s === 4) return c.party_size.valid;
    if (s === 5) return c.date.valid;
    if (s === 6) return c.time.valid;
    if (s >= 7) return true;
    return true;
  }
  next() { if (this.step() < this.maxStep) this.step.update(n => n + 1); else this.submit(); }
  prev() { if (this.step() > 1) this.step.update(n => n - 1); }

  // ============================ Utility template =============================
  onSubmit() { this.submit(); }

  onContactSelected(p: GContactPick | null) {
    if (!p) return;
    // Patch SOLO i campi cliente (senza toccare altro)
    this.form.patchValue({
      customer_first: p.givenName || '',
      customer_last : p.familyName || '',
      email         : p.email || '',
      phone         : p.phone || ''
    }, { emitEvent: false });
    console.log('👤 [GC] Contatto selezionato → form patchato');
  }

  forceUpper(field: 'customer_first'|'customer_last', ev: any) {
    // IonInput (ionInput) espone ev.detail.value; fallback a ev.target.value
    const raw = (ev?.detail?.value ?? ev?.target?.value ?? '') as string;
    const val = raw.toUpperCase();
    this.form.controls[field].setValue(val);
  }

  decParty() {
    const ctrl = this.form.controls.party_size;
    const n = Number(ctrl.value || 1);
    ctrl.setValue(Math.max(1, n - 1));
  }
  incParty() {
    const ctrl = this.form.controls.party_size;
    const n = Number(ctrl.value || 1);
    ctrl.setValue(n + 1);
  }

  selectedDateISO(): string {
    const d = (this.form.controls.date.value || '') as string;
    if (d) return d;
    // fallback: oggi (YYYY-MM-DD)
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth()+1).padStart(2,'0');
    const dd = String(now.getDate()).padStart(2,'0');
    const today = `${yyyy}-${mm}-${dd}`;
    this.form.controls.date.setValue(today);
    return today;
  }

  onQuickDate(dateISO: string) {
    if (!dateISO) return;
    this.form.controls.date.setValue(dateISO);
    console.log('📅 [QuickDate] selezionato', dateISO);
  }

  selectedTime(): string {
    return (this.form.controls.time.value || '') as string;
  }

  isSlotDisabled(dateISO: string, t: string): boolean {
    // Disabilita slot già passati se la data è oggi
    try {
      const [H, M] = t.split(':').map(n => parseInt(n, 10));
      const slot = new Date(`${dateISO}T${String(H).padStart(2,'0')}:${String(M).padStart(2,'0')}:00`);
      const now  = new Date();
      const dateOnly = new Date(`${dateISO}T00:00:00`);
      const todayOnly = new Date(`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}T00:00:00`);
      if (dateOnly < todayOnly) return true;
      if (dateOnly > todayOnly) return false;
      return slot.getTime() < (now.getTime() - 10 * 60 * 1000);
    } catch { return false; }
  }

  onSelectTime(t: string) {
    this.form.controls.time.setValue(t);
    console.log('🕒 [Time] selezionato', t);
  }

  selectedDateHuman(): string {
    try {
      const d = this.selectedDateISO();
      const [y,m,dd] = d.split('-').map(n => parseInt(n, 10));
      const dt = new Date(y, (m-1), dd);
      return dt.toLocaleDateString('it-IT', { weekday:'long', day:'2-digit', month:'2-digit', year:'numeric' });
    } catch { return ''; }
  }

  toggleAdvanced() { this._showAdvanced.update(v => !v); }

  advancedValue(): string {
    // Restituisce un ISO string per IonDatetime basato su form.date + form.time
    const d = this.selectedDateISO();
    const t = this.selectedTime() || '19:00';
    return `${d}T${t}:00`;
  }

  onAdvancedPick(ev: CustomEvent) {
    // IonDatetime (ionChange) → ev.detail.value è un ISO string
    const iso = (ev as any)?.detail?.value as string;
    if (!iso) return;
    const dt = new Date(iso);
    const yyyy = dt.getFullYear();
    const mm = String(dt.getMonth()+1).padStart(2,'0');
    const dd = String(dt.getDate()).padStart(2,'0');
    const HH = String(dt.getHours()).padStart(2,'0');
    const MM = String(dt.getMinutes()).padStart(2,'0');
    this.form.patchValue({ date: `${yyyy}-${mm}-${dd}`, time: `${HH}:${MM}` }, { emitEvent: false });
    this.form.controls.time.markAsDirty();
    this.form.controls.date.markAsDirty();
    console.log('🗓️ [AdvancedPick] →', `${yyyy}-${mm}-${dd}`, `${HH}:${MM}`);
  }

  clearForm() {
    this.form.reset({
      customer_first: '',
      customer_last : '',
      phone         : '',
      email         : '',
      party_size    : 2,
      date          : '',
      time          : '',
      reason        : '',
      notes         : '',
      room_id       : null,
      table_id      : null,
    });
    console.log('🧹 Form pulito');
    this.step.set(1);
  }

  // ================================ SUBMIT ====================================
  async submit() {
    if (!this.canGoNext()) return;

    const v = this.form.getRawValue();
    if (!v.date || !v.time) {
      (await this.toast.create({ message: 'Seleziona data e ora', duration: 1600, color: 'warning' })).present();
      return;
    }

    // Calcolo start_at / end_at (durata 90')
    const start_at = `${v.date} ${v.time}:00`;
    const [hh, mm] = (v.time as string).split(':').map(n => parseInt(n, 10));
    const base = new Date(`${v.date}T${String(hh).padStart(2,'0')}:${String(mm).padStart(2,'0')}:00`);
    const end_at = new Date(base.getTime() + 90 * 60 * 1000);
    const end = `${v.date} ${String(end_at.getHours()).padStart(2,'0')}:${String(end_at.getMinutes()).padStart(2,'0')}:00`;

    const payload: Partial<Reservation> = {
      customer_first: (v.customer_first ?? '').trim(),
      customer_last : (v.customer_last  ?? '').trim(),
      phone         : v.phone || null,
      email         : v.email || null,
      party_size    : Number(v.party_size ?? 2),
      start_at,
      end_at: end,
      room_id       : v.room_id ?? null,
      table_id      : v.table_id ?? null,
      notes         : v.notes || null,
    };

    this.loading.set(true);
    try {
      const r = await firstValueFrom(this.api.create(payload));

      // 🔔 Se nasce "pending" → invia 2 email (admin + cliente) in fire-and-forget
      if ((r as any)?.status === 'pending') {
        try {
          this.mail.sendReservationPendingAdmin(r).subscribe({
            next: res => console.log('📧 [Mail] admin pending OK?', res.ok),
            error: e  => console.warn('⚠️ [Mail] admin pending KO', e),
          });
          this.mail.sendReservationPendingCustomer(r).subscribe({
            next: res => console.log('📧 [Mail] customer pending OK?', res.ok),
            error: e  => console.warn('⚠️ [Mail] customer pending KO', e),
          });
        } catch (e) {
          console.warn('⚠️ [Mail] invio pending non riuscito', e);
        }
      }

      // Redirect “grazie” (invariato)
      this.router.navigate(['/prenota/grazie'], {
        queryParams: {
          id: r.id,
          name: `${r.customer_first || ''} ${r.customer_last || ''}`.trim(),
          date: (r.start_at || '').slice(0,10),
          time: (r.start_at || '').slice(11,16),
          party: r.party_size || 1
        },
        replaceUrl: true
      });
    } catch (err: any) {
      console.error('❌ Invio prenotazione fallito', err);
      (await this.toast.create({ message: `Errore: ${err?.error?.error || err.message}`, duration: 2200, color: 'danger' })).present();
    } finally {
      this.loading.set(false);
    }
  }

  ngOnDestroy() {}
}
