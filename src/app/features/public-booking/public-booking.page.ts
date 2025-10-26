// ============================================================================
// Public Booking Wizard (no-auth)
// Macro-step: CONTATTI · PRENOTAZIONE · CONFERMA
// Steps:
// 1) Nome + Cognome (obbligatori)
// 2) Telefono (prefisso + numero) (obbligatorio, IT +39 default)
// 3) Email (obbligatoria)
// 4) Numero persone
// 5) Data (default oggi)
// 6) Orario (time slots 30’ 18:00→23:00)
// 7) Motivo (radio)
// 8) Intolleranze (checklist)
// 9) Note + Consensi (privacy obbligatoria)
// Submit: crea Reservation con “Fonte: Online” e redirect a /prenota/grazie
// ============================================================================

import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';

// Angular common (⚠️ includo anche NgSwitch*)
import {
  NgIf, NgFor, AsyncPipe, DatePipe,
  NgSwitch, NgSwitchCase, NgSwitchDefault
} from '@angular/common';

// Ionic
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonLabel, IonInput, IonButton, IonIcon, IonList,
  IonSelect, IonSelectOption, IonTextarea, IonNote, IonBadge,
  IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonDatetime, IonProgressBar, IonCheckbox, IonRadio, IonRadioGroup
} from '@ionic/angular/standalone';

import { ReservationsApi, Reservation } from '../../core/reservations/reservations.service';

// utils locali
function todayISO() {
  const t = new Date();
  const y = t.getFullYear();
  const m = String(t.getMonth()+1).padStart(2,'0');
  const d = String(t.getDate()).padStart(2,'0');
  return `${y}-${m}-${d}`;
}
function addMinutes(dt: Date, min: number) { const c = new Date(dt); c.setMinutes(c.getMinutes()+min); return c; }
function fmtHHMM(d: Date) { return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`; }

@Component({
  standalone: true,
  selector: 'app-public-booking',
  templateUrl: './public-booking.page.html',
  imports: [
    // Angular
    ReactiveFormsModule, NgIf, NgFor, AsyncPipe, DatePipe,
    NgSwitch, NgSwitchCase, NgSwitchDefault, RouterLink,
    // Ionic
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonLabel, IonInput, IonButton, IonIcon, IonList,
    IonSelect, IonSelectOption, IonTextarea, IonNote, IonBadge,
    IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonDatetime, IonProgressBar, IonCheckbox, IonRadio, IonRadioGroup
  ]
})
export class PublicBookingPage implements OnInit {
  private fb = inject(FormBuilder);
  private api = inject(ReservationsApi);
  private router = inject(Router);

  step = signal(1);
  readonly maxStep = 9;

  // breadcrumb macro-step
  macro = computed(() => (this.step() <= 3 ? 'CONTATTI' : this.step() <= 8 ? 'PRENOTAZIONE' : 'CONFERMA'));
  progress = computed(() => this.step() / this.maxStep);

  // slot orari (18:00 → 23:00, ogni 30’)
  slots = signal<string[]>([]);
  private slotCfg = { start: '18:00', end: '23:00', deltaMin: 30 };

  form = this.fb.group({
    customer_first: ['', [Validators.required, Validators.minLength(2)]],
    customer_last:  ['', [Validators.required, Validators.minLength(2)]],
    phone_cc: ['+39', [Validators.required]],
    phone_raw: ['', [Validators.required, Validators.pattern(/^\d{6,13}$/)]],
    email: ['', [Validators.required, Validators.email]],
    party_size: [2, [Validators.required, Validators.min(1)]],
    date: [todayISO(), [Validators.required]],
    time: ['', [Validators.required]],
    reason: [''],
    intolerances: this.fb.group({
      lattosio: [false],
      celiaco:  [false],
      arachidi: [false],
    }),
    notes: [''],
    consent_all: [false],
    consent_marketing: [false],
    consent_profiling: [false],
    consent_privacy: [false],
  });

  // master toggle → sincronizza i singoli
  onToggleAllConsents(val: boolean) {
    this.form.patchValue({
      consent_marketing: val,
      consent_profiling: val,
      consent_privacy:  val
    }, { emitEvent: false });
  }
  refreshMasterConsent() {
    const v = this.form.getRawValue();
    const all = !!(v.consent_marketing && v.consent_profiling && v.consent_privacy);
    if (v.consent_all !== all) this.form.patchValue({ consent_all: all }, { emitEvent: false });
  }
  // helper per checklist intolleranze (evita template troppo verboso)
  toggleIntolerance(key: 'lattosio'|'celiaco'|'arachidi', checked: boolean) {
    (this.form.controls.intolerances as any).patchValue({ [key]: checked });
  }

  ngOnInit() {
    this.rebuildSlots();
    // sync master consent
    this.form.get('consent_marketing')!.valueChanges.subscribe(() => this.refreshMasterConsent());
    this.form.get('consent_profiling')!.valueChanges.subscribe(() => this.refreshMasterConsent());
    this.form.get('consent_privacy')!.valueChanges.subscribe(() => this.refreshMasterConsent());
    // ricalcola slot quando cambia la data
    this.form.get('date')!.valueChanges.subscribe(() => this.rebuildSlots());
  }

  private rebuildSlots() {
    const out: string[] = [];
    const [sh, sm] = this.slotCfg.start.split(':').map(n => parseInt(n, 10));
    const [eh, em] = this.slotCfg.end.split(':').map(n => parseInt(n, 10));
    let t = new Date(); t.setHours(sh, sm, 0, 0);
    const end = new Date(); end.setHours(eh, em, 0, 0);
    while (t <= end) { out.push(fmtHHMM(t)); t = addMinutes(t, this.slotCfg.deltaMin); }
    this.slots.set(out);
    // se il time corrente non è più valido → reset
    const current = this.form.controls.time.value;
    if (current && !out.includes(current)) this.form.controls.time.setValue('');
  }

  canGoNext(): boolean {
    const s = this.step();
    const c = this.form.controls;
    if (s === 1) return c.customer_first.valid && c.customer_last.valid;
    if (s === 2) return c.phone_cc.valid && c.phone_raw.valid;
    if (s === 3) return c.email.valid;
    if (s === 4) return c.party_size.valid;
    if (s === 5) return c.date.valid;
    if (s === 6) return c.time.valid;
    if (s === 7) return true;
    if (s === 8) return true;
    if (s === 9) return !!c.consent_privacy.value; // privacy obbligatoria
    return true;
  }

  next() {
    if (!this.canGoNext()) return;
    if (this.step() < this.maxStep) this.step.update(n => n + 1);
    else this.submit();
  }
  prev() { if (this.step() > 1) this.step.update(n => n - 1); }

  async submit() {
    if (!this.canGoNext()) return;

    const v = this.form.getRawValue();
    if (!v.time) return; // guard TS

    const start = `${v.date} ${v.time}:00`;
    const [h, m] = v.time.split(':').map(n => parseInt(n, 10));
    const base = new Date(`${v.date}T${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:00`);
    const endAt = addMinutes(base, 90);
    const end = `${v.date} ${fmtHHMM(endAt)}:00`;

    const intoleranze: string[] = [];
    if (v.intolerances?.lattosio) intoleranze.push('lattosio');
    if (v.intolerances?.celiaco)  intoleranze.push('celiaco');
    if (v.intolerances?.arachidi) intoleranze.push('arachidi');

    const notesArr: string[] = [];
    if (v.reason) notesArr.push(`Motivo: ${v.reason}`);
    if (intoleranze.length) notesArr.push(`Intolleranze: ${intoleranze.join(', ')}`);
    if (v.notes) notesArr.push(`Note: ${v.notes}`);
    notesArr.push('Fonte: Online');

    const payload: Partial<Reservation> = {
      customer_first: (v.customer_first ?? '').trim(),
      customer_last : (v.customer_last  ?? '').trim(),
      email: v.email || null,
      phone: `${v.phone_cc}${v.phone_raw}`,
      party_size: Number(v.party_size || 1),
      start_at: start,
      end_at: end,
      notes: notesArr.join(' — ')
    };

    try {
      const r = await firstValueFrom(this.api.create(payload));
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
    } catch (err) {
      console.error('❌ Invio prenotazione fallito', err);
      alert('Invio non riuscito. Riprova tra poco.');
    }
  }
}
