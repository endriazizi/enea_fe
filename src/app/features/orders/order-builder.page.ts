// C:\Users\Endri Azizi\progetti-dev\my_dev\fe\src\app\features\orders\order-builder.page.ts
// ============================================================================
// OrderBuilderPage — riepilogo carrello SEMPRE visibile + Personalizza
// - Base (SENZA) su chip rossi
// - Extra = ingredienti globali - base (chip verdi AGGIUNGI con qty+prezzi)
// - Preset + toggle “Somma EXTRA nel totale”
// - Log verbosi (emoji) per diagnosi rapida in DevTools
// - 🆕 Prefill da query params: ?table_id=XX&reservation_id=YY&room_id=ZZ
// - 🆕 Badge “Tavolo X” + Toggle “Crea prenotazione alla conferma”
// - 🆕 Se toggle ON: creo prenotazione al volo, check-in immediato, lego l’ordine
// - 🆕 FIX: invio customer_first / customer_last / email (+ room_id se noto)
// - 🆕 Scelta post-conferma: STAMPA CONTO oppure invia COMANDA (centro PIZZERIA/CUCINA)
// - 🆕 Sessione tavolo: leggo ?session_id e se cambia → azzero carrello (reset sicuro)
// - 🆕 Persistenza DB per sessione: debounce 400ms + optimistic locking (409)
// - 🆕 Live update via Socket.IO (stanza session:<SID>) + UI merge su conflitto
// - 🆕 Ordine attivo per sessione + pulsanti stampa conto/comanda
// - 🆕 Categorie ordinate via sort_order (BEVANDE ultima)
// ============================================================================

import { Component, OnInit, OnDestroy, computed, inject, signal } from '@angular/core';
import { NgIf, NgFor, DecimalPipe, DatePipe, SlicePipe } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
  IonContent, IonItem, IonLabel, IonInput, IonTextarea, IonList,
  IonBadge, IonNote, IonSegment, IonSegmentButton,
  IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonFooter, IonModal, IonSelect, IonSelectOption, IonIcon, IonChip, IonToggle, IonSpinner
} from '@ionic/angular/standalone';
import { Router, ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { OrdersApi, ProductIngredientChip, Ingredient } from '../../core/orders/orders.service';
import { ReservationsApi, Reservation } from '../../core/reservations/reservations.service';
import { WhatsAppService } from '../../core/notifications/whatsapp.service';
import { AuthService } from '../../core/auth/auth.service';
import { NfcApi } from '../nfc/nfc.api';

// 🆕 live Socket.IO client (assicurati di aver eseguito: npm i socket.io-client)
import { io, Socket } from 'socket.io-client';

// 🆕 categorySort: ci portiamo dietro il sort_order della categoria
interface CatalogItem {
  id?: number | null;
  name: string;
  price: number;
  category?: string | null;
  categorySort?: number | null;
}
interface CartItem { name: string; price: number; qty: number; product_id?: number | null; notes?: string | null; extra_total?: number; }
interface OrderItemInput { name: string; qty: number; price: number; product_id?: number | null; notes?: string | null; }
interface OrderInputPayload {
  customer_name: string; phone: string | null; note: string | null; people: number | null; channel: string;
  items: OrderItemInput[]; reservation_id?: number; room_id?: number | null; table_id?: number | null; scheduled_at?: string | null;
}
interface Preset {
  id: string; baseName: string; notes: string; created_at: number;
  removedBaseIds?: number[]; extraQty?: Record<number, number>; includeExtrasInTotal?: boolean;
}
const COVER_PRICE_EUR = 1.50;
const RES_DEFAULT_DURATION_MIN = 90; // 🕒 durata stimata per prenotazione creata al volo

@Component({
  standalone: true,
  selector: 'app-order-builder',
  templateUrl: './order-builder.page.html',
  styleUrls: ['./order-builder.page.scss'],
  imports: [
    NgIf, NgFor, DecimalPipe, DatePipe, SlicePipe,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
    IonContent, IonItem, IonLabel, IonInput, IonTextarea, IonList,
    IonBadge, IonNote, IonSegment, IonSegmentButton,
    IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonFooter, IonModal, IonSelect, IonSelectOption, IonIcon, IonChip, IonToggle,
    IonSpinner
  ]
})
export class OrderBuilderPage implements OnInit, OnDestroy {
  private api = inject(OrdersApi);
  private res = inject(ReservationsApi);
  private wa  = inject(WhatsAppService);
  private auth = inject(AuthService);
  private router = inject(Router);
  private route  = inject(ActivatedRoute);
  private nfc    = inject(NfcApi); // 🆕 DB snapshot

  // 🆕 Socket live update
  private _sock: Socket | null = null;
  private _joinedSid: number | null = null;

  readonly COVER_PRICE = COVER_PRICE_EUR;

  // 🆕 Sessione tavolo — DB sync
  private readonly LS_SESSION='order.session_id';
  private readonly LS_PRESETS='order.presets';
  sessionId   = signal<number | null>(null);
  cartVersion = signal<number>(0);

  // === Stato & azioni “Ordine attivo” ========================================
  activeOrder = signal<any | null>(null);
  activeOrderLoading = signal<boolean>(false);

  private async _loadActiveOrderForSession(sid: number | null) {
    if (!sid) {
      this.activeOrder.set(null);
      return;
    }
    try {
      this.activeOrderLoading.set(true);
      const res = await firstValueFrom(this.api.getActiveBySession(sid));
      this.activeOrder.set(res?.hasOrder ? (res.order || null) : null);
      console.log('📦 [Builder] ordine attivo per sessione:', sid, '→', this.activeOrder()?.id || '(nessuno)');
    } catch (e) {
      console.warn('⚠️ [Builder] getActiveBySession KO', e);
      this.activeOrder.set(null);
    } finally {
      this.activeOrderLoading.set(false);
    }
  }

  async printActiveOrderBill() {
    const ord = this.activeOrder(); if (!ord?.id) return;
    try { await firstValueFrom(this.api.print(ord.id)); console.log('🖨️ [Builder] CONTO OK', ord.id); }
    catch (e) { console.warn('🖨️ [Builder] CONTO KO', e); }
  }
  async printActiveOrderComanda(center: 'pizzeria'|'cucina' = 'pizzeria') {
    const ord = this.activeOrder(); if (!ord?.id) return;
    try { await firstValueFrom(this.api.printComanda(ord.id, center, 1)); console.log('🧾 [Builder] COMANDA OK', ord.id, center); }
    catch (e) { console.warn('🧾 [Builder] COMANDA KO', e); }
  }

  // 🆕 Merge dialog state (UI non mostrata in questo HTML, ma pronta)
  mergeOpen = signal<boolean>(false);
  private _conflictServer:any = null;
  private _conflictServerVersion:number = 0;
  private _conflictLocal:any = null;
  private _conflictLocalVersion:number = 0;

  // form
  customerName = signal('');  onInputName (ev:any){ this.customerName.set((ev?.detail?.value ?? ev?.target?.value ?? '').toString()); this._debouncedSaveCart(); }
  customerPhone= signal('');  onInputPhone(ev:any){ this.customerPhone.set((ev?.detail?.value ?? ev?.target?.value ?? '').toString()); this._debouncedSaveCart(); }
  customerEmail= signal('');  onInputEmail(ev:any){ this.customerEmail.set((ev?.detail?.value ?? ev?.target?.value ?? '').toString()); this._debouncedSaveCart(); }
  note         = signal('');  onInputNote (ev:any){ this.note.set((ev?.detail?.value ?? ev?.target?.value ?? '').toString()); this._debouncedSaveCart(); }

  // coperti
  private readonly LS_COVERS='order.covers';
  covers=signal<number>(0);
  incCovers(){ const n=(this.covers()||0)+1; this.covers.set(n); localStorage.setItem(this.LS_COVERS,String(n)); this._debouncedSaveCart(); }
  decCovers(){ const n=Math.max(0,(this.covers()||0)-1); this.covers.set(n); localStorage.setItem(this.LS_COVERS,String(n)); this._debouncedSaveCart(); }

  // catalogo
  private menuSig = signal<CatalogItem[]>([]);

  // 🆕 categorie ordinate per sort_order (fallback alfabetico)
  categories = computed(() => {
    // mappa categoria → sort minimo trovato
    const map = new Map<string, { name: string; sort: number }>();

    for (const m of this.menuSig()) {
      const name = (m.category ?? 'Altro').toString().trim() || 'Altro';
      const sort = (typeof m.categorySort === 'number' && !Number.isNaN(m.categorySort))
        ? m.categorySort!
        : 9999; // fallback “in fondo”
      const cur = map.get(name);
      if (!cur || sort < cur.sort) {
        map.set(name, { name, sort });
      }
    }

    const arr = Array.from(map.values());
    arr.sort((a, b) => {
      if (a.sort !== b.sort) return a.sort - b.sort;
      return a.name.localeCompare(b.name, 'it');
    });

    return arr.map(r => r.name);
  });

  selectedCategory=signal('TUTTI');
  filteredMenu = computed(() => {
    const cat=this.selectedCategory(); const all=this.menuSig();
    return cat==='TUTTI' ? all : all.filter(m => (m.category ?? 'Altro')===cat);
  });

  // carrello
  cart = signal<CartItem[]>([]);
  itemsCount = computed(()=> this.cart().reduce((s,r)=>s+r.qty,0));
  includeExtrasInTotal = signal<boolean>(false);

  cartBaseTotal   = computed(()=> this.cart().reduce((sum,l)=> sum + (l.price*l.qty), 0));
  cartExtrasTotal = computed(()=> this.cart().reduce((sum,l)=> sum + ((l.extra_total||0)*l.qty), 0));
  hasExtrasInCart = computed(()=> this.cart().some(l => (l.extra_total||0) > 0));
  total = computed(()=> this.cartBaseTotal() + (this.includeExtrasInTotal()? this.cartExtrasTotal():0) + (this.covers()>0 ? this.covers()*this.COVER_PRICE : 0));
  customLinesCount = computed(()=> this.cart().filter(r => !!(r.notes || '').trim()).length);

  // prenotazioni oggi
  pickList=signal<Reservation[]>([]);
  selectedReservation=signal<Reservation|null>(null);
  reservationMeta = signal<{ id: number; table_id?: number|null; room_id?: number|null; start_at?: string|null } | null>(null);

  // contesto tavolo
  tableId = signal<number|null>(null);
  roomId  = signal<number|null>(null);
  createReservationOnConfirm = signal<boolean>(false);

  // stampa
  printMode = signal<'conto' | 'comanda'>('conto');
  comandaCenter = signal<'pizzeria' | 'cucina'>('pizzeria');

  // 🆕 pannello collassabile per i dettagli ordine (prenotazione + cliente + coperti)
  metaCollapsed = signal<boolean>(false);
  metaSummary = computed(() => {
    const name   = (this.customerName() || '').trim();
    const covers = this.covers() || 0;
    const res    = this.selectedReservation();
    const parts: string[] = [];

    if (name) parts.push(name);
    if (covers > 0) parts.push(`${covers} coperti`);

    if (res && res.start_at) {
      try {
        const d = new Date(res.start_at);
        const hhmm = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        parts.push(`pren. ${hhmm}`);
      } catch {
        // formato data strano → ignoro
      }
    }

    const mode = this.printMode();
    if (mode === 'comanda') {
      const center = this.comandaCenter();
      parts.push(center === 'cucina' ? 'Comanda CUCINA' : 'Comanda PIZZERIA');
    } else {
      parts.push('Stampa conto');
    }

    if (!parts.length) return 'Compila i dettagli ordine';
    return parts.join(' · ');
  });

  toggleMetaCollapsed() {
    const next = !this.metaCollapsed();
    this.metaCollapsed.set(next);
    console.log('🧾 [OrderBuilder] pannello dettagli', next ? 'chiuso' : 'aperto');
  }

  // personalizza
  customOpen=signal(false);
  private _targetItem: CatalogItem | null = null;
  targetItem = () => this._targetItem;
  modalNote=signal('');

  // ingredienti
  ing = signal<ProductIngredientChip[]>([]);
  baseList = computed(()=> {
    const rows = this.ing() || [];
    const withFlag = rows.filter((r:any) => Number((r as any).is_default ?? (r as any).is_base ?? 1) === 1);
    return withFlag.length ? withFlag : rows;
  });

  allIngredients = signal<Ingredient[]>([]);
  extras = signal<Ingredient[]>([]);
  baseRemoved=signal<Record<number,true>>({});
  extraQty=signal<Record<number,number>>({});

  hasExtras = computed(()=> this.extras().length > 0);
  getExtraQty(id:number){ return this.extraQty()[id] || 0; }
  incExtra(id:number){ const next={...this.extraQty()}; next[id]=(next[id]||0)+1; this.extraQty.set(next); this._debouncedSaveCart(); }
  decExtra(id:number){ const next={...this.extraQty()}; next[id]=Math.max(0,(next[id]||0)-1); if(next[id]===0) delete next[id]; this.extraQty.set(next); this._debouncedSaveCart(); }

  // 🆕 piccolo tick per forzare il refresh dei preset in template
  private presetsTick = signal(0);
  private _bumpPresetTick(){ this.presetsTick.set(this.presetsTick()+1); }

  private _saveTimer:any;

  async ngOnInit(){
    console.log('🧱 [OrderBuilder] init');

    // 1) session_id dai query params → reset carrello se cambia (soft) + 🆕 join socket
    this.route.queryParams.subscribe(async (qp) => {
      const sid = Number(qp?.session_id || 0) || null;
      this._ensureSession(sid); // soft-reset LS
      this.sessionId.set(sid);

      // 🆕 live: (ri)collego socket e faccio join stanza
      this._ensureSocketConnected();
      this._joinSocketSession(sid);

      // 1b) se ho SID → ripristino snapshot dal DB
      if (sid) {
        try{
          const got = await this.nfc.getSessionCart(sid);
          this.cartVersion.set(Number(got?.version || 0));
          if (got?.cart) {
            this._restoreCartFromSnapshot(got.cart);
            console.log('🧭 [Builder] session_id=', sid, '→ cart ripristinato (v=', this.cartVersion(), ')');
          } else {
            console.log('🧭 [Builder] session_id=', sid, '→ nessun cart (v=', this.cartVersion(), ')');
          }
        }catch(e){ console.warn('⚠️ [Builder] getSessionCart KO', e); }
      }

      // fetch ordine attivo su cambio SID
      await this._loadActiveOrderForSession(sid);
    });

    this.covers.set(Number(localStorage.getItem(this.LS_COVERS) || '0') || 0);

    await this._loadAllIngredients();
    await this._loadMenu();
    await this._loadReservationsToday();

    // prefill classico table_id/room_id/reservation_id
    this.route.queryParams.subscribe(async (qp) => {
      try{
        const tId = Number(qp?.table_id || 0) || null;
        const rId = Number(qp?.room_id  || 0) || null;
        const resId = Number(qp?.reservation_id || qp?.res_id || 0) || null;

        this.tableId.set(tId);
        this.roomId.set(rId);

        if (tId && !resId) this.createReservationOnConfirm.set(true);

        if (resId) {
          let found: Reservation | null = (this.pickList() || []).find(r => Number(r.id) === resId) || null;
          if (found) {
            console.log('✅ [OrderBuilder] prefill from reservation', { resId, tId });
            this.onPickReservation(found);
          } else {
            console.log('ℹ️ [OrderBuilder] reservation not in today list (no direct fetch)', { resId, tId });
          }
        } else {
          console.log('ℹ️ [OrderBuilder] no reservation_id: start ex-novo', { tId });
        }
      }catch(e){ console.warn('⚠️ [OrderBuilder] prefill KO', e); }
    });
  }

  ngOnDestroy(): void {
    try {
      if (this._sock) {
        if (this._joinedSid) this._sock.emit('leave_session', { session_id: this._joinedSid });
        this._sock.removeAllListeners();
        this._sock.disconnect();
        this._sock = null;
        this._joinedSid = null;
      }
    } catch {}
  }

  onLogout(){ this.auth.logout(); this.router.navigate(['/login'], { queryParams: { redirect: '/orders/new' } }); }

  // 🆕 helper sessione — reset carrello se cambia session_id tra URL e LS
  private _ensureSession(next:any){
    const cur = localStorage.getItem(this.LS_SESSION);
    const val = (next === null || typeof next === 'undefined' || next === '') ? null : String(next);
    if (val && String(cur ?? '') !== val) {
      console.log('🧹 [Builder] nuova sessione → reset carrello', { from: cur, to: val });
      this.cart.set([]);
      try { localStorage.setItem(this.LS_SESSION, val); } catch {}
    }
  }

  // helper — coerci array vari
  private _coerceArray<T>(input:any): T[] {
    if (Array.isArray(input)) return input as T[];
    if (!input || typeof input !== 'object') return [];
    const candidates = ['data','items','rows','result','results','list'];
    for (const k of candidates){ const v = (input as any)[k]; if (Array.isArray(v)) return v as T[]; }
    for (const v of Object.values(input)){ if (Array.isArray(v)) return v as T[]; }
    return [];
  }
  private _todayISO():string{
    const d=new Date(); const y=d.getFullYear(); const m=String(d.getMonth()+1).padStart(2,'0'); const day=String(d.getDate()).padStart(2,'0');
    return `${y}-${m}-${day}`;
  }
  private _fmtLocalYYYYMMDDTHHMM(d:Date){
    const pad=(n:number)=>String(n).padStart(2,'0');
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }
  private _splitName(full:string){
    const s=(full||'').trim().replace(/\s+/g,' ');
    if(!s) return { first:'', last:'' };
    const bits=s.split(' ');
    if(bits.length===1) return { first:bits[0], last:'' };
    const first=bits.shift() as string; const last=bits.join(' ');
    return { first, last };
  }

  private async _loadReservationsToday(){
    try{
      const d=this._todayISO();
      const rows=await firstValueFrom(this.res.list({from:d,to:d,status:'all'}));
      const norm=(rows||[]).map(this._normalizeReservation);
      this.pickList.set(norm);
      console.log('📥 [OrderBuilder] prenotazioni oggi:', norm.length);
    }catch(e){ console.warn('⚠️ [OrderBuilder] loadReservationsToday KO', e); this.pickList.set([]); }
  }
  private _normalizeReservation = (r:any):Reservation => {
    const first=r.customer_first ?? r.first_name ?? '';
    const last =r.customer_last ?? r.last_name ?? '';
    const display_name=r.display_name ?? r.customer_name ?? r.name ?? `${first} ${last}`.trim();
    const party_size=Number(r.party_size ?? r.people ?? r.persons ?? r.covers ?? 0) || 0;
    const start_at=r.start_at ?? r.date ?? new Date().toISOString();
    return { id:Number(r.id), customer_first:first||null, customer_last:last||null, display_name:display_name||null,
      phone:r.phone ?? r.phone_number ?? null, email:r.email ?? null, party_size, start_at, end_at:r.end_at ?? null,
      room_id:r.room_id ?? null, table_id:r.table_id ?? null, status:r.status ?? 'pending',
      notes:r.notes ?? r.note ?? r.status_note ?? null, created_at:r.created_at ?? null, updated_at:r.updated_at ?? null,
      table_number:r.table_number ?? null, table_name:r.table_name ?? null };
  };

  // 🆕 carico menu con categorySort (sort_order categoria)
  private async _loadMenu(){
    try{
      const menu = await firstValueFrom(this.api.getMenu());
      const rows = (menu || []) as any[];

      const norm: CatalogItem[] = rows.map((m:any) => {
        const catName = m.category ?? m.category_name ?? null;
        // supporto più nomi possibili per il sort della categoria
        const sortRaw =
          m.category_sort_order ??
          m.category_sort ??
          m.categorySort ??
          m.sort_order ??
          m.category_order ??
          null;

        const sort = sortRaw != null ? Number(sortRaw) : null;

        return {
          id: m.id ?? null,
          name: m.name,
          price: Number(m.price || 0),
          category: catName,
          categorySort: (sort != null && !Number.isNaN(sort)) ? sort : null
        };
      });

      this.menuSig.set(norm);
      console.log('📥 [OrderBuilder] menu items:', this.menuSig().length);
    }catch(e){
      console.error('💥 [OrderBuilder] getMenu KO', e);
      this.menuSig.set([]);
    }
  }

  private async _loadAllIngredients(){
    try{
      const all=await firstValueFrom(this.api.getIngredients());
      const arr = this._coerceArray<Ingredient>(all);
      const norm = arr.map((r:any)=> ({...r, price_extra: (r.price_extra ?? r.price ?? null)}));
      this.allIngredients.set(norm);
      console.log('🥦 [OrderBuilder] all ingredients:', this.allIngredients().length);
    }catch(e){ console.warn('🥦❌ [OrderBuilder] getIngredients KO', e); this.allIngredients.set([]); }
  }

  onPickReservation(r:Reservation|null){
    this.selectedReservation.set(r);
    if(!r){ this.reservationMeta.set(null); this._debouncedSaveCart(); return; }
    this.reservationMeta.set({ id:r.id, table_id:r.table_id ?? null, room_id:r.room_id ?? null, start_at:r.start_at ?? null });

    const name = r.display_name || `${r.customer_first || ''} ${r.customer_last || ''}`.trim();
    this.customerName.set(name || '');
    this.customerPhone.set((r.phone || '').toString());
    this.customerEmail.set((r.email || '').toString());
    const ppl = Number(r.party_size || 0) || 0;
    this.covers.set(ppl); localStorage.setItem(this.LS_COVERS, String(ppl));

    if(!this.note().trim()){
      const hhmm=r.start_at? new Date(r.start_at).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) : '';
      const tav=r.table_name || r.table_number ? ` — Tavolo ${r.table_name ?? r.table_number}` : '';
      this.note.set(`Rif. pren. #${r.id}${tav}${hhmm ? ' ('+hhmm+')' : ''}`);
    }
    console.log('🔗 [OrderBuilder] prenotazione selezionata', { id:r.id, ppl });
    this._debouncedSaveCart();
  }

  // ====== Carrello base ======================================================
  trackByMenuId= (_:number, m:CatalogItem)=> m.id ?? m.name;
  qtyInCart(baseName:string){ return this.cart().filter(r=>r.name===baseName && !r.notes).reduce((s,r)=>s+r.qty,0); }
  hasCustomFor(baseName:string){ return this.cart().some(r=>r.name===baseName && !!(r.notes||'').trim()); }
  incCartByBaseName(baseName:string, m?:CatalogItem){
    const price=Number((m as any)?.price ?? this.cart().find(r=>r.name===baseName)?.price ?? 0);
    const next=[...this.cart()]; const idx=next.findIndex(r=>r.name===baseName && !r.notes);
    if(idx>=0) next[idx]={...next[idx], qty:next[idx].qty+1};
    else next.push({ name:baseName, price, qty:1, product_id:(m as any)?.id ?? null, notes:null, extra_total:0 });
    this.cart.set(next); this._debouncedSaveCart();
  }
  decCartByBaseName(baseName:string){
    const next=[...this.cart()]; const idx=next.findIndex(r=>r.name===baseName && !r.notes);
    if(idx>=0){ const cur={...next[idx]}; cur.qty=Math.max(0,cur.qty-1); if(cur.qty===0) next.splice(idx,1); else next[idx]=cur; this.cart.set(next); this._debouncedSaveCart(); }
  }
  incLine(line:CartItem){ this.cart.set(this.cart().map(r=> r===line ? {...r, qty:r.qty+1} : r)); this._debouncedSaveCart(); }
  decLine(line:CartItem){
    const next=[...this.cart()]; const idx=next.indexOf(line);
    if(idx>=0){
      const cur={ ...next[idx], qty: Math.max(0, next[idx].qty - 1) };
      if(cur.qty===0) next.splice(idx,1); else next[idx]=cur;
      this.cart.set(next); this._debouncedSaveCart();
    }
  }
  removeCartLine(line:CartItem){
    this.cart.set(this.cart().filter(r =>
      !(r.name===line.name && r.price===line.price && (r.product_id??null)===(line.product_id??null) && (r.notes??null)===(line.notes??null) && (r.extra_total??0)===(line.extra_total??0))
    ));
    this._debouncedSaveCart();
  }
  clearCart(){ this.cart.set([]); this._debouncedSaveCart(); }

  // ====== Personalizzazione ==================================================
  canCustomize(_m:CatalogItem){ return true; }
  async openCustomize(m:CatalogItem){
    this._targetItem=m;
    this.modalNote.set('');
    this.baseRemoved.set({});
    this.extraQty.set({});
    this.ing.set([]);
    this.extras.set([]);
    this.customOpen.set(true);

    if(!this.allIngredients()?.length){ await this._loadAllIngredients(); }
    if(!m?.id){ console.log('🧩⚠️ prodotto senza id → ingredienti base non caricati'); return; }

    try{
      console.log('🧩 [Customize] fetch base + compute extra…', { productId: m.id });
      const baseRaw = await firstValueFrom(this.api.getProductIngredients(m.id!));
      const baseRows = this._coerceArray<ProductIngredientChip>(baseRaw);
      this.ing.set(baseRows || []);
      const baseIds = new Set<number>((baseRows||[]).map(r=>r.ingredient_id));
      const extraList = (this.allIngredients()||[]).filter(i => !baseIds.has(i.id));
      this.extras.set(extraList);
      console.log('🧩 [Customize] base:', baseRows.length, 'extra:', extraList.length);
    }catch(e){
      console.error('🧩❌ load ingredienti KO', e);
      this.ing.set([]); this.extras.set([]);
    }
  }

  isBaseRemoved(id:number){ return !!this.baseRemoved()[id]; }
  toggleBase(id:number){ const next={...this.baseRemoved()}; if(next[id]) delete next[id]; else next[id]=true; this.baseRemoved.set(next); this._debouncedSaveCart(); }

  private _buildNotesFromSelections():string{
    const removed = this.baseList().filter(x=> this.isBaseRemoved(x.ingredient_id)).map(x=>x.name);
    const extraPicked = Object.entries(this.extraQty()).filter(([_,q]) => (q||0)>0).map(([id,q])=>{
      const row=this.extras().find(e => e.id===+id);
      return row ? `${row.name}${(q as number)>1 ? ' x'+q : ''}` : '';
    }).filter(Boolean) as string[];

    const parts:string[]=[];
    if(removed.length) parts.push(`SENZA: ${removed.join(', ')}`);
    if(extraPicked.length) parts.push(`EXTRA: ${extraPicked.join(', ')}`);
    const manual=(this.modalNote()||'').trim(); if(manual) parts.push(manual);
    return parts.join(' — ');
  }

  // 🆕 costo extra selezionati (per la singola riga custom)
  extraCostPreview(): number {
    const qtyMap = this.extraQty();
    const extras = this.extras();
    let tot = 0;
    for (const [idStr, q] of Object.entries(qtyMap)) {
      const id = Number(idStr);
      const row = extras.find(x => x.id === id);
      const px = Number((row as any)?.price_extra ?? 0) || 0;
      tot += (px * (Number(q) || 0));
    }
    return tot;
  }

  // ====== Preset (LocalStorage) =============================================
  private _loadAllPresets(): Preset[] {
    try { return JSON.parse(localStorage.getItem(this.LS_PRESETS) || '[]') as Preset[]; } catch { return []; }
  }
  private _saveAllPresets(rows: Preset[]): void {
    try { localStorage.setItem(this.LS_PRESETS, JSON.stringify(rows)); } catch {}
  }
  presetsForTarget(): Preset[] {
    // piccolo tick per reattività
    const _ = this.presetsTick();
    const base = this._targetItem?.name || '';
    if (!base) return [];
    return this._loadAllPresets().filter(p => p.baseName === base).sort((a,b)=> b.created_at - a.created_at);
  }
  savePresetFromModal(): void {
    const t = this._targetItem; if (!t) return;
    const removedIds = Object.keys(this.baseRemoved()).map(Number).filter(Boolean);
    const extraQty = { ...this.extraQty() };
    const notes = (this._buildNotesFromSelections() || this.modalNote() || 'Preset').trim();
    const row: Preset = {
      id: 'P_' + Math.random().toString(36).slice(2,10),
      baseName: t.name,
      notes,
      created_at: Date.now(),
      removedBaseIds: removedIds.length ? removedIds : undefined,
      extraQty: Object.keys(extraQty).length ? extraQty : undefined,
      includeExtrasInTotal: !!this.includeExtrasInTotal(),
    };
    const all = this._loadAllPresets(); all.push(row); this._saveAllPresets(all);
    console.log('💾 [Preset] salvato', row);
    this._bumpPresetTick();
  }
  applyPresetConfig(p: Preset): void {
    // applichiamo SOLO la configurazione (non aggiunge al carrello)
    const rem: Record<number,true> = {};
    for (const id of (p.removedBaseIds || [])) rem[id] = true;
    this.baseRemoved.set(rem);
    this.extraQty.set({ ...(p.extraQty || {}) });
    if (typeof p.includeExtrasInTotal === 'boolean') this.includeExtrasInTotal.set(!!p.includeExtrasInTotal);
    this.modalNote.set(p.notes || '');
    console.log('⚙️ [Preset] applicata configurazione', p.id);
  }
  applyPresetAdd(p: Preset): void {
    this.applyPresetConfig(p);
    this.addCustomToCartFromModal();
  }
  deletePreset(p: Preset): void {
    const all = this._loadAllPresets().filter(x => x.id !== p.id);
    this._saveAllPresets(all);
    console.log('🗑️ [Preset] eliminato', p.id);
    this._bumpPresetTick();
  }

  addCustomToCartFromModal(){
    const t=this._targetItem; if(!t) return;
    const line:CartItem={
      name:t.name, price:Number(t.price||0), qty:1, product_id:t.id ?? null,
      notes:(this._buildNotesFromSelections() || null),
      extra_total:this.extraCostPreview() || 0
    };
    this.cart.set([...this.cart(), line]);
    console.log('🧾➕ added custom line', line);
    this._debouncedSaveCart();
  }

  // ======================= Snapshot ⇄ Restore (DB) ==========================
  private _collectCartSnapshot(){
    return {
      customer_name: (this.customerName()||'').trim(),
      customer_phone: (this.customerPhone()||'').trim() || null,
      customer_email: (this.customerEmail()||'').trim() || null,
      note: (this.note()||'').trim() || null,
      covers: this.covers() || 0,
      include_extras_in_total: !!this.includeExtrasInTotal(),
      table_id: this.tableId(),
      room_id: this.roomId(),
      reservation_meta: this.reservationMeta(),
      items: this.cart().map(r => ({
        name: r.name, price: r.price, qty: r.qty, product_id: r.product_id ?? null,
        notes: r.notes ?? null, extra_total: r.extra_total ?? 0
      }))
    };
  }

  private _restoreCartFromSnapshot(s: any){
    try{
      if (!s || typeof s !== 'object') return;
      this.customerName.set(String(s.customer_name || ''));
      this.customerPhone.set(String(s.customer_phone || ''));
      this.customerEmail.set(String(s.customer_email || ''));
      this.note.set(String(s.note || ''));
      this.covers.set(Number(s.covers || 0) || 0);
      this.includeExtrasInTotal.set(!!s.include_extras_in_total);
      this.tableId.set(s.table_id ?? this.tableId());
      this.roomId.set(s.room_id ?? this.roomId());
      if (s.reservation_meta && typeof s.reservation_meta === 'object') this.reservationMeta.set(s.reservation_meta);
      const items:CartItem[] = Array.isArray(s.items) ? s.items.map((r:any) => ({
        name: String(r.name), price: Number(r.price||0), qty: Number(r.qty||0),
        product_id: r.product_id ?? null, notes: r.notes ?? null, extra_total: Number(r.extra_total||0)
      })) : [];
      this.cart.set(items);
    }catch(e){ console.warn('⚠️ _restoreCartFromSnapshot KO', e); }
  }

  private _debouncedSaveCart(){
    const sid = this.sessionId(); if (!sid) return; // nessuna sessione → niente sync
    clearTimeout(this._saveTimer);
    this._saveTimer = setTimeout(() => this._saveCartSnapshot(), 400);
  }

  private async _saveCartSnapshot(){
    const sid = this.sessionId(); if (!sid) return;
    const payload = this._collectCartSnapshot();
    const ver = this.cartVersion();

    try{
      const out = await this.nfc.saveSessionCart(sid, ver, payload);
      this.cartVersion.set(Number(out.version || 0));
      // console.log('💾 [Builder] cart saved v', this.cartVersion());
    }catch(e:any){
      if (e?.status === 409 || e?.statusCode === 409) {
        console.warn('🔁 [Builder] 409 version conflict → apertura MERGE UI');
        try{
          // carico stato corrente dal server
          const cur = await this.nfc.getSessionCart(sid);
          this._conflictServer = cur?.cart || null;
          this._conflictServerVersion = Number(cur?.version || 0);
          this._conflictLocal = payload;
          this._conflictLocalVersion = ver;
          this.mergeOpen.set(true);
        }catch(re){ console.error('💥 [Builder] reload after 409 KO', re); }
        return;
      }
      console.warn('💾❌ [Builder] saveSessionCart KO (cache locale, ritento al prossimo input)', e);
    }
  }

  // ======================= PRENOTAZIONE & CONFERMA ==========================
  private async _maybeCreateReservationOnConfirm(): Promise<void> {
    if (!this.createReservationOnConfirm()) return;
    if (this.reservationMeta()) return;
    const tId = this.tableId(); if (!tId) return;

    const rawName = (this.customerName() || 'Cliente').trim();
    const { first, last } = this._splitName(rawName);
    const phone  = (this.customerPhone() || '').trim() || null;
    const email  = (this.customerEmail() || '').trim() || null;
    const ppl    = this.covers() || 0;
    const note   = (this.note() || '').trim() || null;

    const start = new Date();
    const end   = new Date(start.getTime() + RES_DEFAULT_DURATION_MIN*60*1000);

    const payload:any = {
      customer_first: first || null,
      customer_last : last || null,
      phone, email, party_size: ppl,
      start_at : this._fmtLocalYYYYMMDDTHHMM(start),
      end_at   : this._fmtLocalYYYYMMDDTHHMM(end),
      room_id  : this.roomId() ?? null,
      table_id : tId,
      notes    : note || undefined,
      status   : 'accepted'
    };

    try{
      console.log('🧾 [OrderBuilder] create reservation on confirm…', payload);
      const anyRes:any = this.res as any;
      const createdAny: any = await firstValueFrom(
        typeof anyRes.create === 'function' ? anyRes.create(payload) :
        typeof anyRes.add === 'function'    ? anyRes.add(payload) :
        anyRes.createReservation(payload)
      );
      const c: any = createdAny || {};
      const newId = Number(c.id || c.reservation?.id || 0) || 0;

      if (newId){
        try{ if (typeof anyRes.checkIn === 'function') await firstValueFrom(anyRes.checkIn(newId)); }catch(ci){ console.warn('⚠️ check-in auto KO', ci); }
        this.reservationMeta.set({ id:newId, table_id: tId, room_id : (c.room_id ?? this.roomId() ?? null) || null, start_at: payload.start_at });
        console.log('✅ prenotazione creata + check-in', { id:newId });
      } else {
        console.warn('⚠️ create reservation: risposta inattesa', c);
      }
    }catch(e){ console.error('💥 create reservation KO', e); }
  }

  async confirmOrder(){
    try{
      await this._maybeCreateReservationOnConfirm();

      const includeExtras=this.includeExtrasInTotal();
      const items:OrderItemInput[]=this.cart().map(r=>({
        name:r.name, qty:r.qty, price:Number(r.price)+(includeExtras?Number(r.extra_total||0):0),
        product_id:r.product_id ?? null, notes:r.notes ?? null
      }));
      if(this.covers()>0){ items.push({ name:'Coperto', qty:this.covers(), price:COVER_PRICE_EUR, product_id:null, notes:null }); }

      const payload:OrderInputPayload={ customer_name:(this.customerName()||'Cliente').trim(),
        phone:(this.customerPhone()||'').trim() || null, note:(this.note()||'').trim() || null,
        people:this.covers() || null, channel:'admin', items };

      const meta=this.reservationMeta();
      if(meta){
        payload.reservation_id = meta.id;
        payload.table_id       = meta.table_id ?? (this.tableId() ?? null);
        payload.room_id        = meta.room_id ?? this.roomId() ?? null;
        payload.scheduled_at   = meta.start_at ?? null;
      }else if (this.tableId()){
        payload.table_id = this.tableId();
        payload.room_id  = this.roomId() ?? null;
      }

      // includo session_id nel body create
      const sid = this.sessionId();
      if (sid) (payload as any).session_id = sid;

      console.log('📤 create order…', payload);
      const created:any = await firstValueFrom(this.api.create(payload as any));
      console.log('✅ creato', created);

      // Post-azione
      if (this.printMode() === 'conto') {
        try{ await firstValueFrom(this.api.print(created.id)); console.log('🖨️ conto OK'); }
        catch(pe){ console.warn('🖨️ conto KO (non blocco)', pe); }
      } else {
        try{
          const center = this.comandaCenter();
          await firstValueFrom(this.api.printComanda(created.id, center, 1));
          console.log(`🧾 ${center.toUpperCase()} OK`);
        }catch(ke){ console.warn('🧾 comanda KO (non blocco)', ke); }
      }

      this.cart.set([]); this.customOpen.set(false); this.router.navigate(['/orders']);
    }catch(e){ console.error('💥 create KO', e); }
  }

  // === Socket helpers =======================================================
  private _ensureSocketConnected(){
    if (this._sock) return;
    try{
      this._sock = io(undefined, { withCredentials: true }); // usa origin corrente/proxy
      this._sock.on('connect', () => console.log('🔌 [SOCKET] connected', this._sock?.id));
      this._sock.on('disconnect', (reason: any) => console.log('🔌 [SOCKET] disconnected', reason));

      // Evento live: qualcuno ha aggiornato il carrello di questa sessione
      this._sock.on('nfc:cart_updated', async (p: any) => {
        const sid = this.sessionId();
        if (!sid || Number(p?.session_id || 0) !== sid) return; // altra stanza
        const incomingV = Number(p?.version || 0);
        if (incomingV <= this.cartVersion()) {
          // vecchio o uguale (probabilmente noi stessi) → ignoro
          return;
        }
        console.log('📡 [SOCKET] nfc:cart_updated → reload cart (v', incomingV, ')');
        try{
          const cur = await this.nfc.getSessionCart(sid);
          this.cartVersion.set(Number(cur?.version || incomingV));
          if (cur?.cart) this._restoreCartFromSnapshot(cur.cart);
          console.log('✅ [Builder] cart riallineato da live (v', this.cartVersion(), ')');
        }catch(e){ console.warn('⚠️ [Builder] live reload KO', e); }

        // ricarico anche “ordine attivo”
        try { await this._loadActiveOrderForSession(sid); } catch {}
      });
    }catch(e){
      console.warn('📡 [SOCKET] init KO (continua senza live)', e);
    }
  }

  private _joinSocketSession(sid: number | null){
    if (!this._sock) return;
    if (this._joinedSid && this._joinedSid !== sid) {
      this._sock.emit('leave_session', { session_id: this._joinedSid });
      console.log('🔌 [SOCKET] leave_session', this._joinedSid);
      this._joinedSid = null;
    }
    if (sid && this._joinedSid !== sid) {
      this._sock.emit('join_session', { session_id: sid });
      console.log('🔌 [SOCKET] join_session', sid);
      this._joinedSid = sid;
    }
  }

  // === Merge actions ========================================================
  keepMine = async () => {
    try{
      const sid = this.sessionId(); if(!sid) return;
      // forzo un PUT con la versione corrente del server, ma con il MIO payload
      const serverV = this._conflictServerVersion || 0;
      await this.nfc.saveSessionCart(sid, serverV, this._conflictLocal);
      console.log('🟢 [Merge] mantieni il mio → salvato sovrascrivendo');
      const cur = await this.nfc.getSessionCart(sid);
      this.cartVersion.set(Number(cur?.version || serverV+1));
      if (cur?.cart) this._restoreCartFromSnapshot(cur.cart);
    }catch(e){ console.error('💥 [Merge] keepMine KO', e); }
    this.mergeOpen.set(false);
  };

  takeTheirs = async () => {
    try{
      const sid = this.sessionId(); if(!sid) return;
      // prendo lo snapshot del server (già in _conflictServer), lo applico
      if (this._conflictServer) this._restoreCartFromSnapshot(this._conflictServer);
      this.cartVersion.set(this._conflictServerVersion || 0);
      console.log('🔵 [Merge] prendi il loro → allineato allo stato server');
    }catch(e){ console.error('💥 [Merge] takeTheirs KO', e); }
    this.mergeOpen.set(false);
  };
}
