// src/app/features/orders/order-builder.page.ts
// ============================================================================
// OrderBuilderPage — UI cameriere "card + sticky cart" (ispirata a Yumgo)
// Fix: COVER_PRICE visibile al template + compatibilità campi Prenotazione
// - Coperti SUBITO — € 1,50 cad.
// - Categorie a pill (un solo "TUTTI")
// - Card con − qty + e “Personalizza” (ingredienti/extra)
// - Importa da Prenotazione (giorno selezionabile)
// - Submit: POST /orders + WhatsApp via BE
// Stile: Ionic standalone + Signals, commenti lunghi, log con emoji 😄
// ============================================================================

import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { NgIf, NgFor, DecimalPipe, DatePipe } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
  IonContent, IonItem, IonLabel, IonInput, IonTextarea, IonList,
  IonBadge, IonNote, IonSegment, IonSegmentButton,
  IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonFooter, IonModal, IonDatetime, IonCheckbox
} from '@ionic/angular/standalone';
import { OrdersApi, CreateOrderDto, MenuItem, OrderFull } from '../../core/orders/orders.service';
import { ReservationsApi, Reservation } from '../../core/reservations/reservations.service';
import { WhatsAppService } from '../../core/notifications/whatsapp.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

interface CartItem {
  key: string;        // chiave unica (base/custom)
  name: string;       // nome visibile (con “senza …”, “+extra …”)
  price: number;      // unit price (base + extra)
  qty: number;
  product_id?: number | null;
  note?: string | null;
  baseName: string;   // per i pulsanti −/qty/+ sulla card base
}

// ⚠️ Il template non vede i const di file-scope → esponiamo via property
const COVER_PRICE_VALUE = 1.50;

@Component({
  standalone: true,
  selector: 'app-order-builder',
  templateUrl: './order-builder.page.html',
  styleUrls: ['./order-builder.page.scss'],
  imports: [
    // Angular
    NgIf, NgFor, DecimalPipe, DatePipe,
    // Ionic
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
    IonContent, IonItem, IonLabel, IonInput, IonTextarea, IonList,
    IonBadge, IonNote, IonSegment, IonSegmentButton,
    IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonFooter, IonModal, IonDatetime, IonCheckbox
  ]
})
export class OrderBuilderPage implements OnInit {
  // === services ==============================================================
  private api = inject(OrdersApi);
  private res = inject(ReservationsApi);
  private wa  = inject(WhatsAppService);
  private router = inject(Router);

  // === constants esposte al template ========================================
  readonly COVER_PRICE = COVER_PRICE_VALUE;

  // === anagrafica + note =====================================================
  customerName = signal<string>('');
  customerPhone = signal<string>('');
  note = signal<string>('');

  // === coperti ===============================================================
  private readonly LS_COVERS = 'order.covers';
  covers = signal<number>(0);                 // 0 → apri modal
  coversModalOpen = signal<boolean>(false);
  coversTotal = computed(() => (this.covers() || 0) * this.COVER_PRICE);

  // === catalogo & categorie ==================================================
  private menuSig = signal<MenuItem[]>([]);
  /** SOLO categorie reali (senza "TUTTI") → evitiamo il doppione */
  categories = computed<string[]>(() => {
    const s = new Set<string>();
    for (const m of this.menuSig()) s.add((m.category ?? 'Altro').toString().trim() || 'Altro');
    return Array.from(s).sort((a,b)=>a.localeCompare(b,'it'));
  });
  selectedCategory = signal<string>('TUTTI');
  filteredMenu = computed<MenuItem[]>(() => {
    const cat = this.selectedCategory();
    const all = this.menuSig();
    return cat === 'TUTTI' ? all : all.filter(m => (m.category ?? 'Altro') === cat);
  });

  // === carrello ==============================================================
  cart = signal<CartItem[]>([]);
  totalProducts = computed(() => this.cart().reduce((s, r) => s + r.price * r.qty, 0));
  total = computed(() => this.totalProducts() + this.coversTotal());
  itemsCount = computed(() => this.cart().reduce((s, r) => s + r.qty, 0));

  // === personalizzazione (modal) ============================================
  customOpen = signal<boolean>(false);
  targetItem = signal<MenuItem | null>(null);
  ingList = signal<string[]>([]);
  removedList = signal<string[]>([]);
  extrasList = signal<Array<{ name: string; price: number; selected: boolean }>>([]);
  itemNote = signal<string>('');

  // === prenotazioni (import) ================================================
  pickModalOpen = signal<boolean>(false);
  pickDate = signal<string>(new Date().toISOString());
  pickList = signal<Reservation[]>([]);

  // === utils view ============================================================
  trackByMenuName = (_: number, m: MenuItem) => m.name;
  trackByCartKey  = (_: number, r: CartItem) => r.key;

  // ==========================================================================
  ngOnInit(): void {
    console.log('🧱 [OrderBuilder] init');

    // Coperti: ripristina ultimo valore
    const prev = Number(localStorage.getItem(this.LS_COVERS) || '0') || 0;
    this.covers.set(prev);
    if (prev <= 0) this.coversModalOpen.set(true);

    // Catalogo
    this.api.getMenu().subscribe({
      next: (rows) => { console.log('📦 Menu ricevuto', rows?.length); this.menuSig.set(rows || []); },
      error: (err) => { console.error('💥 /products KO', err); this.menuSig.set([]); }
    });
  }

  // ==== Covers ==============================================================
  decCovers() { this.covers.update(n => Math.max(1, (n || 1) - 1)); }
  incCovers() { this.covers.update(n => Math.min(20, (n || 0) + 1)); }
  confirmCovers() {
    const n = this.covers();
    if (!n || n <= 0) this.covers.set(2);
    localStorage.setItem(this.LS_COVERS, String(this.covers()));
    this.coversModalOpen.set(false);
  }

  // ==== Input handlers ======================================================
  onNameInput(ev: any)  { this.customerName.set(String(ev?.target?.value ?? '')); }
  onPhoneInput(ev: any) { this.customerPhone.set(String(ev?.target?.value ?? '')); }
  onNoteInput(ev: any)  { this.note.set(String(ev?.target?.value ?? '')); }

  // ==== Cart base (− qty +) su card ========================================
  addToCart(m: MenuItem)           { this.addBaseByName(m.name, +1, m); }
  decCartByBaseName(name: string)  { this.addBaseByName(name, -1); }
  qtyBaseInCart(name: string) {
    return this.cart().filter(r => r.baseName === name && r.key.startsWith(`${name}|base`))
                      .reduce((s,r) => s + r.qty, 0);
  }
  private addBaseByName(name: string, delta: number, mRef?: MenuItem) {
    const copy = [...this.cart()];
    const idx = copy.findIndex(r => r.key.startsWith(`${name}|base`));
    if (idx >= 0) {
      const next = copy[idx].qty + delta;
      if (next <= 0) copy.splice(idx, 1);
      else copy[idx] = { ...copy[idx], qty: next };
      this.cart.set(copy);
    } else if (delta > 0 && mRef) {
      copy.push({
        key: `${name}|base`,
        baseName: name,
        name,
        price: mRef.price,
        qty: 1,
        product_id: mRef.id ?? null
      });
      this.cart.set(copy);
    }
  }

  // ==== Personalizza ========================================================
  canCustomize(m: MenuItem) {
    const hasIng = this.readIngredients(m).length > 0;
    const hasEx  = this.readExtras(m).length > 0;
    return hasIng || hasEx;
  }
  openCustomize(m: MenuItem) {
    this.targetItem.set(m);
    this.ingList.set(this.readIngredients(m));
    this.removedList.set([]);
    this.extrasList.set(this.readExtras(m).map(x => ({ ...x, selected: false })));
    this.itemNote.set('');
    this.customOpen.set(true);
  }
  onToggleIngredient(ing: string, checked: boolean) {
    const arr = new Set(this.removedList());
    checked ? arr.delete(ing) : arr.add(ing);
    this.removedList.set(Array.from(arr));
  }
  onToggleExtra(idx: number, checked: boolean) {
    const copy = [...this.extrasList()];
    if (copy[idx]) copy[idx].selected = checked;
    this.extrasList.set(copy);
  }
  confirmCustomization() {
    const m = this.targetItem();
    if (!m) return;
    const removed = this.removedList();
    const chosenExtras = this.extrasList().filter(e => e.selected);

    const suffix: string[] = [];
    if (removed.length)    suffix.push(`senza ${removed.join(', ')}`);
    if (chosenExtras.length) suffix.push('+' + chosenExtras.map(e => e.name).join(', '));

    const name = suffix.length ? `${m.name} [${suffix.join('; ')}]` : m.name;
    const extraSum = chosenExtras.reduce((s, e) => s + e.price, 0);
    const key = `${m.name}|custom|${removed.join(',')}|${chosenExtras.map(e=>e.name).join(',')}|${this.itemNote().trim()}`;

    const copy = [...this.cart()];
    const idx = copy.findIndex(r => r.key === key);
    if (idx >= 0) copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
    else copy.push({
      key, baseName: m.name, name,
      price: (m.price + extraSum),
      qty: 1, product_id: m.id ?? null,
      note: this.itemNote().trim() || null
    });
    this.cart.set(copy);
    this.customOpen.set(false);
  }

  // helper: leggi ingredienti/extras da MenuItem “libero”
  private readIngredients(m: MenuItem): string[] {
    const raw = (m as any).ingredients ?? null;
    if (!raw) return [];
    if (Array.isArray(raw)) return raw.map(x => String(x).trim()).filter(Boolean);
    return String(raw).split(',').map(s => s.trim()).filter(Boolean);
  }
  private readExtras(m: MenuItem): Array<{ name: string; price: number }> {
    const raw = (m as any).extras ?? null;
    if (!raw) return [];
    if (Array.isArray(raw)) return raw.map((x: any) => ({
      name: String(x.name ?? x.label ?? x.nome ?? 'Extra').trim(),
      price: Number.parseFloat(String(x.price ?? x.prezzo ?? 0).replace(',', '.')) || 0
    }));
    return String(raw).split(';').map(s => s.trim()).filter(Boolean).map(pair => {
      const [n, p] = pair.split(':').map(v => v.trim());
      const price = Number.parseFloat(String(p ?? 0).replace(/[+€ ]/g,'')) || 0;
      return { name: n, price };
    });
  }

  // ==== Cart utils ==========================================================
  clearCart() {                      // ✅ FIX: mancava → errore nel template
    this.cart.set([]);
  }

  // ==== Prenotazioni: carica e applica ======================================
  async loadReservations() {
    const d = new Date(this.pickDate());
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const from = `${yyyy}-${mm}-${dd} 00:00:00`;
    const to   = `${yyyy}-${mm}-${dd} 23:59:59`;
    try {
      const list = await firstValueFrom(this.res.list({ from, to }));
      this.pickList.set(list || []);
    } catch (e) {
      console.warn('💥 Prenotazioni KO', e);
      this.pickList.set([]);
    }
  }

  applyReservation(r: Reservation) {
    // ⚙️ compat: usiamo i campi più comuni con fallback
    const anyR: any = r as any;
    const name =
      anyR.display_name ||
      anyR.customer_name ||
      [anyR.customer_first, anyR.customer_last].filter(Boolean).join(' ') ||
      '';
    const phone = anyR.phone || anyR.customer_phone || '';
    const ppl = Number(anyR.party_size ?? anyR.people ?? anyR.persons ?? anyR.covers ?? 0) || 0;
    const notes = String(anyR.notes ?? anyR.note ?? anyR.status_note ?? '').trim();

    this.customerName.set(name);
    this.customerPhone.set(phone);
    this.covers.set(Math.max(1, ppl));
    if (notes) this.note.set(notes);
    this.pickModalOpen.set(false);
  }

  // ==== submit ==============================================================
  busy = signal<boolean>(false);

  async submit() {
    if (this.covers() <= 0) { this.coversModalOpen.set(true); return; }
    if (this.cart().length === 0) { alert('Aggiungi almeno un prodotto'); return; }

    this.busy.set(true);
    try {
      const dto: CreateOrderDto = {
        customer_name: this.customerName().trim(),
        phone: this.customerPhone().trim() || null,
        channel: 'admin',
        note: [ `Coperti: ${this.covers()}`, this.note()?.trim() || null ].filter(Boolean).join(' — '),
        people: this.covers(),
        items: [
          // righe prodotto
          ...this.cart().map(r => ({
            name: r.name, qty: r.qty, price: r.price,
            product_id: r.product_id ?? null, notes: r.note ?? null
          })),
          // riga coperti
          ...(this.covers() > 0 ? [{
            name: 'Coperto', qty: this.covers(), price: this.COVER_PRICE
          }] : [])
        ]
      };

      console.log('🚀 Invio ordine…', dto);
      const created: OrderFull = await firstValueFrom(this.api.create(dto));
      console.log('✅ Ordine creato', created);

      if (created?.phone) {
        this.wa.sendOrderCreated('twilio', created).subscribe(r => {
          console.log('💬 [WA] order-created ok?', r.ok);
        });
      }

      this.clearCart();
      this.router.navigate(['/orders']);
    } catch (err: any) {
      console.error('💥 submit KO', err);
      alert(err?.message || 'Errore creazione ordine');
    } finally {
      this.busy.set(false);
    }
  }
}
