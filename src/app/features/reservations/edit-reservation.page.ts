// src/app/features/reservations/edit-reservation.page.ts
// ============================================================================
// Pagina EDIT — UI invariata, aggiunti:
// - lettura ?force=&?notify=
// - handler onDeleteDefinitive() che chiama api.remove(...)
// - fix typed forms per evitare errori TS
// ============================================================================

import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
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
import { ToastController, AlertController } from '@ionic/angular';

// Service
import {
  ReservationsApi,
  Room, Table, Reservation
} from '../../core/reservations/reservations.service';

@Component({
  standalone: true,
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.page.html',
  imports: [
    // Angular
    ReactiveFormsModule, NgIf, NgFor, DatePipe,
    // Ionic
    IonButtons, IonContent, IonHeader, IonToolbar, IonTitle,
    IonItem, IonLabel, IonInput, IonButton, IonSelect, IonSelectOption,
    IonTextarea, IonDatetime, IonNote, IonList, IonIcon,
    IonFab, IonFabButton, IonFabList,
  ]
})
export class EditReservationPage implements OnInit, OnDestroy {
  private fb     = inject(FormBuilder);
  private api    = inject(ReservationsApi);
  private router = inject(Router);
  private route  = inject(ActivatedRoute);
  private toast  = inject(ToastController);
  private alert  = inject(AlertController);

  private id = Number(this.route.snapshot.paramMap.get('id'));

  // Switch da query (?force=&?notify=) — default: force=false, notify=true
  private forceDelete  = (this.route.snapshot.queryParamMap.get('force')  ?? '').toLowerCase() === 'true';
  private notifyDelete = (this.route.snapshot.queryParamMap.get('notify') ?? '').toLowerCase() !== 'false';

  // Stato UI
  loading = signal(false);
  printing = signal(false);
  entity = signal<Reservation | null>(null);

  rooms = signal<Room[]>([]);
  tables = signal<Table[]>([]);

  // Typed forms (string|null per evitare TS2345)
  form = this.fb.group({
    customer_first: ['' as string | null],
    customer_last : ['' as string | null],
    phone         : ['' as string | null],
    email         : ['' as string | null, Validators.email],
    party_size    : [1,  [Validators.required, Validators.min(1)]],
    start_at      : ['' as string | null, [Validators.required]],
    end_at        : ['' as string | null],
    room_id       : [null as number | null],
    table_id      : [null as number | null],
    notes         : ['' as string | null],
  });

  async ngOnInit() {
    await this.load();
  }
  ngOnDestroy(): void {}

  // --------------------------------------------------------------------------
  private async load() {
    this.loading.set(true);
    try {
      const [r, rooms] = await Promise.all([
        firstValueFrom(this.api.byId(this.id)),
        firstValueFrom(this.api.listRooms()),
      ]);
      this.entity.set(r);
      this.rooms.set(rooms || []);
      if (r.room_id) {
        const t = await firstValueFrom(this.api.listTablesByRoom(r.room_id));
        this.tables.set(t || []);
      }
      this.form.patchValue({
        customer_first: r.customer_first ?? '',
        customer_last : r.customer_last  ?? '',
        phone         : r.phone ?? '',
        email         : r.email ?? '',
        party_size    : r.party_size ?? 1,
        start_at      : r.start_at ?? '',
        end_at        : (r.end_at ?? '') as any,
        room_id       : r.room_id ?? null,
        table_id      : r.table_id ?? null,
        notes         : r.notes ?? ''
      });
    } finally {
      this.loading.set(false);
    }
  }

  // Uppercase helper senza rompere typed forms
  forceUpper(ctrl: keyof typeof this.form.controls, ev: any) {
    const v: string = (ev?.target?.value ?? '') + '';
    const upper = v.toUpperCase();
    if (v !== upper) {
      this.form.patchValue({ [ctrl]: upper } as any);
    }
  }

  async onRoomChange(roomId: number | null) {
    if (!roomId) { this.tables.set([]); this.form.controls.table_id.setValue(null); return; }
    const t = await firstValueFrom(this.api.listTablesByRoom(Number(roomId)));
    this.tables.set(t || []);
    if (!t?.length) this.form.controls.table_id.setValue(null);
  }

  // --------------------------------------------------------------------------
  async onSave() {
    if (this.form.invalid || this.loading()) return;
    this.loading.set(true);
    try {
      const fv = this.form.getRawValue();
      const payload: Partial<Reservation> = {
        customer_first: fv.customer_first ?? null,
        customer_last : fv.customer_last  ?? null,
        phone         : fv.phone ?? null,
        email         : fv.email ?? null,
        party_size    : Number(fv.party_size ?? (this.entity()?.party_size ?? 1)),
        start_at      : (fv.start_at ?? this.entity()?.start_at) as string,
        end_at        : fv.end_at ?? null,
        room_id       : fv.room_id ?? null,
        table_id      : fv.table_id ?? null,
        notes         : fv.notes ?? null,
      };
      const r = await firstValueFrom(this.api.update(this.id, payload));
      this.entity.set(r);
      (await this.toast.create({ message: 'Salvata ✅', duration: 1200 })).present();
    } catch (err: any) {
      (await this.toast.create({ message: `Errore salvataggio: ${err?.error?.error || err.message}`, duration: 2500, color: 'danger' })).present();
    } finally {
      this.loading.set(false);
    }
  }

  // --------------------------------------------------------------------------
  async onPrintPlacecardOne() {
    if (this.printing()) return;
    this.printing.set(true);
    try {
      await firstValueFrom(this.api.printPlacecardOne(this.id));
      (await this.toast.create({ message: 'Segnaposto inviato ✅', duration: 1400 })).present();
    } catch (err: any) {
      (await this.toast.create({ message: `Errore stampa: ${err?.error?.error || err.message}`, duration: 2500, color: 'danger' })).present();
    } finally {
      this.printing.set(false);
    }
  }

  // --------------------------------------------------------------------------
  // 🗑️ Elimina definitivamente — visibile in HTML solo se status='cancelled'
  async onDeleteDefinitive() {
    const r = this.entity();
    if (!r) return;

    const alert = await this.alert.create({
      header: 'Eliminare definitivamente?',
      message: `Prenotazione #${r.id} — azione irreversibile.`,
      buttons: [
        { text: 'Annulla', role: 'cancel' },
        {
          text: 'Elimina',
          role: 'destructive',
          handler: async () => {
            try {
              const res = await firstValueFrom(
                this.api.remove(r.id, { force: this.forceDelete, notify: this.notifyDelete })
              );
              if (res?.ok) {
                (await this.toast.create({ message: 'Eliminata ✅', duration: 1200 })).present();
                this.router.navigate(['/reservations'], { queryParams: { lastAction: 'deleted' } });
              } else {
                (await this.toast.create({ message: 'Eliminazione non eseguita', duration: 1800 })).present();
              }
            } catch (err: any) {
              (await this.toast.create({ message: `Errore eliminazione: ${err?.error?.error || err.message}`, duration: 2600, color: 'danger' })).present();
            }
          }
        }
      ]
    });
    await alert.present();
  }
}
