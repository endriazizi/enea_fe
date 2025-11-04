import { Component, inject, signal, computed, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';

// Angular
import { NgIf, NgFor } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';

// Ionic standalone
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonItem, IonLabel, IonInput, IonButton, IonSelect, IonSelectOption,
  IonTextarea, IonDatetime, IonNote, IonList,
  IonIcon, IonFab, IonFabButton, IonFabList
} from '@ionic/angular/standalone';
import { ToastController } from '@ionic/angular';

// API FE
import { ReservationsApi, Room, Table, Reservation } from '../../core/reservations/reservations.service';

// UI: date quick (7 giorni)
import { DateQuickComponent } from '../../features/reservations/_components/ui/date-quick/date-quick.component';

// Google contacts: solo tipi per compatibilità
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
  private http   = inject(HttpClient);

  // ==== UI state ====
  loading = signal(false);
  rooms   = signal<Room[]>([]);
  tables  = signal<Table[]>([]);

  // ==== Google Contacts (pagina) ============================================
  // Nota importante: per non far bloccare il popup dai browser, lo apriamo SOLO
  // su gesto esplicito (click) → vedi onGcConnectClick().
  gcResults      = signal<GContactPick[]>([]);
  gcSearching    = signal(false);
  gcNeedsConsent = signal(true);   // ⬅️ di base TRUE, si spegne alla prima ricerca OK
  private lastGcQuery = '';

  private googleApiBase() { return '/api/google'; }
  private googleClientId(): string {
    const meta = document.querySelector('meta[name="google-client-id"]') as HTMLMetaElement | null;
    return meta?.content || '512175551489-082s3f7pri0rl9uv0ujkiko31dnoo8o7.apps.googleusercontent.com';
  }
  private googleScopes(): string {
    return 'https://www.googleapis.com/auth/contacts.readonly';
  }

  // Carica GIS una sola volta
  private _gsiPromise: Promise<void> | null = null;
  private async loadGIS(): Promise<void> {
    if (this._gsiPromise) return this._gsiPromise;
    this._gsiPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://accounts.google.com/gsi/client';
      s.async = true; s.defer = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('gsi_load_failed'));
      document.head.appendChild(s);
    });
    return this._gsiPromise;
  }

  // 🔐 Ottiene il code in popup (gesto esplicito)
  private async obtainAuthCodeViaPopup(): Promise<string> {
    await this.loadGIS();
    const g: any = (window as any).google;
    if (!g?.accounts?.oauth2?.initCodeClient) throw new Error('gsi_unavailable');
    return new Promise<string>((resolve, reject) => {
      try {
        const client = g.accounts.oauth2.initCodeClient({
          client_id: this.googleClientId(),
          scope: this.googleScopes(),
          ux_mode: 'popup',
          callback: (resp: any) => {
            if (resp?.code) resolve(resp.code);
            else reject(new Error(resp?.error || 'no_code'));
          },
        });
        client.requestCode();
      } catch (e) {
        reject(e);
      }
    });
  }

  // 🔄 Scambia il code sul BE e persiste i token (owner='default')
  private async exchangeCodeOnBackend(code: string): Promise<boolean> {
    try {
      const r: any = await firstValueFrom(
        this.http.post(`${this.googleApiBase()}/oauth/exchange`, { code })
      );
      return !!r?.ok;
    } catch {
      return false;
    }
  }

  // 🔎 Ricerca "raw": se 401 → attiva banner "Connetti Google"
  private async searchGoogleContactsRaw(query: string, limit = 12): Promise<GContactPick[]> {
    const params = new HttpParams().set('q', query).set('limit', String(limit));
    try {
      const r: any = await firstValueFrom(
        this.http.get(`${this.googleApiBase()}/people/search`, { params })
      );
      if (r?.ok) {
        this.gcNeedsConsent.set(false);
        return r.items || [];
      }
      return [];
    } catch (e: any) {
      if (e?.status === 401 && e?.error?.reason === 'google_consent_required') {
        // ⚠️ Non aprire popup qui: siamo fuori dal gesto utente → verrebbe bloccato.
        this.gcNeedsConsent.set(true);
      }
      return [];
    }
  }

  async onGcQueryChange(q: string) {
    const query = (q || '').trim();
    this.lastGcQuery = query;
    if (query.length < 2) { this.gcResults.set([]); return; }
    this.gcSearching.set(true);
    try {
      const rows = await this.searchGoogleContactsRaw(query, 12);
      this.gcResults.set(rows || []);
    } finally {
      this.gcSearching.set(false);
    }
  }

  async onGcConnectClick() {
    try {
      const code = await this.obtainAuthCodeViaPopup();      // 🪟 popup su gesto esplicito
      const ok   = await this.exchangeCodeOnBackend(code);   // 💾 persistenza token
      if (ok) {
        this.gcNeedsConsent.set(false);
        if (this.lastGcQuery.length >= 2) {
          this.gcSearching.set(true);
          const rows = await this.searchGoogleContactsRaw(this.lastGcQuery, 12);
          this.gcResults.set(rows || []);
          this.gcSearching.set(false);
        }
        (await this.toast.create({ message: 'Google connesso ✅', duration: 1400 })).present();
      } else {
        (await this.toast.create({ message: 'Connessione annullata/negata', duration: 1600, color: 'medium' })).present();
      }
    } catch (e) {
      console.warn('🔐 [GC] Popup/Exchange KO', e);
      (await this.toast.create({ message: 'Accesso Google annullato', duration: 1400, color: 'medium' })).present();
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

  // Uppercase reale su blur/submit (IME Android friendly)
  upperOnBlur(ctrl: 'customer_last'|'customer_first') {
    const raw  = (this.form.controls[ctrl].value ?? '') as string;
    const next = raw ? raw.toLocaleUpperCase('it-IT') : raw;
    this.form.controls[ctrl].setValue(next, { emitEvent: false });
  }

  incParty() { const n = (this.form.value.party_size || 1) + 1; this.form.patchValue({ party_size: n }); }
  decParty() { const n = Math.max(1, (this.form.value.party_size || 1) - 1); this.form.patchValue({ party_size: n }); }

  // ==== Calendario avanzato ====
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

  // ==== Submit ====
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
