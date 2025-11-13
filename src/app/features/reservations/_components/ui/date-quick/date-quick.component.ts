// src/app/features/reservations/_components/ui/date-quick/date-quick.component.ts
// ============================================================================
// DateQuickComponent — Picker "rapido" per giorno (oggi/ieri/domani/±1)
// - Input:
//     [selected]       : string ISO YYYY-MM-DD (es. "2025-11-10")
//     [showCalendar]   : se true mostra calendario (default: true)
//     [useNativeDate]  : se true usa <input type="date"> (default: false)
//     [min] / [max]    : boundary opzionali (ISO YYYY-MM-DD)
//     [title]          : opzionale, mantenuto per compat
//     [showTodayLine]  : shim per compat proprietà legacy (non usata qui)
//     [days]           : shim per compat proprietà legacy (non usata qui)
// - Output:
//     (picked)         : string ISO YYYY-MM-DD  ✅ firma invariata
//     (selectedChange) : string ISO YYYY-MM-DD  ✅ retro-compat (non obbligatoria)
// - UI:
//     frecce ←/→, chip Ieri/Oggi/Domani, calendario opzionale (popover o native)
//     + toggle runtime per switchare tra native/popover (solo FE).
// ============================================================================

import { Component, EventEmitter, Input, Output, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton, IonChip, IonIcon, IonPopover, IonDatetime
} from '@ionic/angular/standalone';

@Component({
  standalone: true,
  selector: 'app-date-quick',
  templateUrl: './date-quick.component.html',
  styleUrls: ['./date-quick.component.scss'],
  // 🔒 Evita mirroring automatico forward/back in qualsiasi contesto
  host: { '[attr.dir]': "'ltr'" },
  imports: [CommonModule, FormsModule, IonButton, IonChip, IonIcon, IonPopover, IonDatetime],
})
export class DateQuickComponent implements OnInit {
  // === API ==========================================================
  @Input()  selected: string | null = null;     // ISO "YYYY-MM-DD"
  @Input()  showCalendar = true;
  @Input()  useNativeDate = false;
  @Input()  min?: string;                       // ISO "YYYY-MM-DD"
  @Input()  max?: string;                       // ISO "YYYY-MM-DD"
  @Input()  title?: string;                     // compat
  @Input()  showTodayLine?: boolean;            // compat (non usata)
  @Input()  days?: number;                      // compat (non usata)

  @Output() picked = new EventEmitter<string>();          // firma "ufficiale"
  @Output() selectedChange = new EventEmitter<string>();  // retro-compat per (selectedChange)

  // === Stato locale =================================================
  popOpen = signal<boolean>(false);
  // Modalità UI (native vs popover). Inizializzata da @Input useNativeDate.
  mode = signal<'native' | 'popover'>('popover');

  ngOnInit() {
    this.mode.set(this.useNativeDate ? 'native' : 'popover');
  }

  // === Azioni UI (chip + frecce) ===================================
  onPrev() { this.pickOffset(-1); }
  onNext() { this.pickOffset(+1); }

  pickToday() { this.emitIso(this.todayISO()); }

  pickOffset(days: number) {
    const base = this.selected ? this.parseISO(this.selected) : new Date();
    const d = new Date(base.getFullYear(), base.getMonth(), base.getDate() + days);
    this.emitIso(this.toISO(d));
  }

  isSelectedOffset(days: number): boolean {
    if (!this.selected) return false;
    const t = this.todayStart();
    const d = new Date(t.getFullYear(), t.getMonth(), t.getDate() + days);
    return this.selected === this.toISO(d);
  }

  // === Calendario: NATIVE ==========================================
  onNativeModelChange(val: string) {
    if (val) this.emitIso(val);
  }

  // === Calendario: POPOVER (IonDatetime) ===========================
  openPopover()  { this.popOpen.set(true);  }
  closePopover() { this.popOpen.set(false); }

  onDatetimeChange(ev: CustomEvent) {
    const raw = (ev as any)?.detail?.value;
    const iso = this.normalizeToISODate(raw);
    if (iso) {
      this.emitIso(iso);
      this.closePopover();
    }
  }

  // === Toggle runtime ===============================================
  toggleMode() {
    this.mode.set(this.mode() === 'native' ? 'popover' : 'native');
  }

  // === Emit compat (picked + selectedChange) =======================
  private emitIso(iso: string) {
    console.log('📅 [DateQuick] picked ▶️', iso);
    this.selected = iso;
    this.picked.emit(iso);           // firma richiesta
    this.selectedChange.emit(iso);   // retro-compat per (selectedChange)
  }

  // === Helper date ==================================================
  private todayISO(): string { return this.toISO(this.todayStart()); }

  private todayStart(): Date {
    const n = new Date();
    return new Date(n.getFullYear(), n.getMonth(), n.getDate());
  }

  private toISO(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  private parseISO(iso: string): Date {
    const [y, m, d] = (iso || '').split('-').map(v => Number(v));
    return new Date(y, (m || 1) - 1, d || 1);
  }

  private normalizeToISODate(v: any): string | null {
    if (!v) return null;
    if (typeof v === 'string') {
      if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return v; // già YYYY-MM-DD
      const d = new Date(v);
      if (!isNaN(d.getTime())) return this.toISO(d);
    }
    if (v instanceof Date && !isNaN(v.getTime())) return this.toISO(v);
    return null;
  }
}
