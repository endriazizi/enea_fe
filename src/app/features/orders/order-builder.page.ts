// src/app/features/orders/order-builder.page.ts
// ============================================================================
// OrderBuilderPage — riepilogo carrello SEMPRE visibile + Personalizza
// - Base (SENZA) su chip rossi
// - Extra = ingredienti globali - base (chip verdi AGGIUNGI con qty+prezzi)
// - Preset + toggle “Somma EXTRA nel totale”
// - Log verbosi (emoji) per diagnosi rapida in DevTools
// ============================================================================
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { NgIf, NgFor, DecimalPipe, DatePipe, SlicePipe } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
  IonContent, IonItem, IonLabel, IonInput, IonTextarea, IonList,
  IonBadge, IonNote, IonSegment, IonSegmentButton,
  IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonFooter, IonModal, IonSelect, IonSelectOption, IonIcon, IonChip, IonToggle
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { OrdersApi, ProductIngredientChip, Ingredient } from '../../core/orders/orders.service';
import { ReservationsApi, Reservation } from '../../core/reservations/reservations.service';
import { WhatsAppService } from '../../core/notifications/whatsapp.service';
import { AuthService } from '../../core/auth/auth.service';

interface CatalogItem { id?: number | null; name: string; price: number; category?: string | null; }
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
    IonFooter, IonModal, IonSelect, IonSelectOption, IonIcon, IonChip, IonToggle
  ]
})
export class OrderBuilderPage implements OnInit {
  private api = inject(OrdersApi);
  private res = inject(ReservationsApi);
  private wa  = inject(WhatsAppService);
  private auth = inject(AuthService);
  private router = inject(Router);

  readonly COVER_PRICE = COVER_PRICE_EUR;

  // form
  customerName=signal(''); onInputName(ev:any){ this.customerName.set((ev?.detail?.value ?? ev?.target?.value ?? '').toString()); }
  customerPhone=signal(''); onInputPhone(ev:any){ this.customerPhone.set((ev?.detail?.value ?? ev?.target?.value ?? '').toString()); }
  note=signal('');          onInputNote (ev:any){ this.note.set((ev?.detail?.value ?? ev?.target?.value ?? '').toString()); }

  // coperti
  private readonly LS_COVERS='order.covers';
  covers=signal<number>(0);
  incCovers(){ const n=(this.covers()||0)+1; this.covers.set(n); localStorage.setItem(this.LS_COVERS,String(n)); }
  decCovers(){ const n=Math.max(0,(this.covers()||0)-1); this.covers.set(n); localStorage.setItem(this.LS_COVERS,String(n)); }

  // catalogo
  private menuSig = signal<CatalogItem[]>([]);
  categories = computed(() => {
    const s=new Set<string>(); for (const m of this.menuSig()) s.add((m.category ?? 'Altro').toString().trim() || 'Altro');
    return Array.from(s).sort((a,b)=>a.localeCompare(b,'it'));
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

  // personalizza
  customOpen=signal(false);
  private _targetItem: CatalogItem | null = null;
  targetItem = () => this._targetItem;
  modalNote=signal('');

  // ingredienti
  ing = signal<ProductIngredientChip[]>([]); // base
  baseList = computed(()=> {
    const rows = this.ing() || [];
    const withFlag = rows.filter((r:any) => Number((r as any).is_default ?? (r as any).is_base ?? 1) === 1);
    return withFlag.length ? withFlag : rows;
  });

  allIngredients = signal<Ingredient[]>([]); // globali
  extras = signal<Ingredient[]>([]);         // extra = globali - base
  baseRemoved=signal<Record<number,true>>({});
  extraQty=signal<Record<number,number>>({});

  hasExtras = computed(()=> this.extras().length > 0);
  getExtraQty(id:number){ return this.extraQty()[id] || 0; }
  incExtra(id:number){ const next={...this.extraQty()}; next[id]=(next[id]||0)+1; this.extraQty.set(next); }
  decExtra(id:number){ const next={...this.extraQty()}; next[id]=Math.max(0,(next[id]||0)-1); if(next[id]===0) delete next[id]; this.extraQty.set(next); }

  // preview costo extra (computed così il template può usare extraCostPreview())
  private _computeExtraTotalPerUnit(): number {
    let sum=0;
    for(const [idStr,q] of Object.entries(this.extraQty())){
      const row=this.extras().find(e=>e.id===+idStr);
      const px=Number(row?.price_extra ?? 0);
      if((q||0)>0 && px>0) sum += (q as number)*px;
    }
    return sum;
  }
  extraCostPreview = computed(()=> this._computeExtraTotalPerUnit());

  async ngOnInit(){
    console.log('🧱 [OrderBuilder] init');
    this.covers.set(Number(localStorage.getItem(this.LS_COVERS) || '0') || 0);
    await this._loadAllIngredients();
    await this._loadMenu();
    await this._loadReservationsToday();
  }

  onLogout(){ this.auth.logout(); this.router.navigate(['/login'], { queryParams: { redirect: '/orders/new' } }); }

  // helper — coerciamo varie forme di risposta API in un array
  private _coerceArray<T>(input:any): T[] {
    if (Array.isArray(input)) return input as T[];
    if (!input || typeof input !== 'object') return [];
    const candidates = ['data','items','rows','result','results','list'];
    for (const k of candidates){
      const v = (input as any)[k];
      if (Array.isArray(v)) return v as T[];
    }
    // ultimo tentativo: primo valore che è un array
    for (const v of Object.values(input)){
      if (Array.isArray(v)) return v as T[];
    }
    return [];
  }

  private _todayISO():string{
    const d=new Date(); const y=d.getFullYear(); const m=String(d.getMonth()+1).padStart(2,'0'); const day=String(d.getDate()).padStart(2,'0');
    return `${y}-${m}-${day}`;
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
  private async _loadMenu(){
    try{
      const menu=await firstValueFrom(this.api.getMenu());
      this.menuSig.set((menu||[]).map(m => ({ id:m.id ?? null, name:m.name, price:Number(m.price||0), category:(m.category ?? null) })));
      console.log('📥 [OrderBuilder] menu items:', this.menuSig().length);
    }catch(e){ console.error('💥 [OrderBuilder] getMenu KO', e); this.menuSig.set([]); }
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
    if(!r){ this.reservationMeta.set(null); return; }
    this.reservationMeta.set({ id:r.id, table_id:r.table_id ?? null, room_id:r.room_id ?? null, start_at:r.start_at ?? null });

    const name = r.display_name || `${r.customer_first || ''} ${r.customer_last || ''}`.trim();
    this.customerName.set(name || '');
    this.customerPhone.set((r.phone || '').toString());
    const ppl = Number(r.party_size || 0) || 0;
    this.covers.set(ppl); localStorage.setItem(this.LS_COVERS, String(ppl));

    if(!this.note().trim()){
      const hhmm=r.start_at? new Date(r.start_at).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) : '';
      const tav=r.table_name || r.table_number ? ` — Tavolo ${r.table_name ?? r.table_number}` : '';
      this.note.set(`Rif. pren. #${r.id}${tav}${hhmm ? ' ('+hhmm+')' : ''}`);
    }
    console.log('🔗 [OrderBuilder] prenotazione selezionata', { id:r.id, ppl });
  }

  trackByMenuId= (_:number, m:CatalogItem)=> m.id ?? m.name;
  qtyInCart(baseName:string){ return this.cart().filter(r=>r.name===baseName && !r.notes).reduce((s,r)=>s+r.qty,0); }
  hasCustomFor(baseName:string){ return this.cart().some(r=>r.name===baseName && !!(r.notes||'').trim()); }
  incCartByBaseName(baseName:string, m?:CatalogItem){
    const price=Number((m as any)?.price ?? this.cart().find(r=>r.name===baseName)?.price ?? 0);
    const next=[...this.cart()]; const idx=next.findIndex(r=>r.name===baseName && !r.notes);
    if(idx>=0) next[idx]={...next[idx], qty:next[idx].qty+1};
    else next.push({ name:baseName, price, qty:1, product_id:(m as any)?.id ?? null, notes:null, extra_total:0 });
    this.cart.set(next);
  }
  decCartByBaseName(baseName:string){
    const next=[...this.cart()]; const idx=next.findIndex(r=>r.name===baseName && !r.notes);
    if(idx>=0){ const cur={...next[idx]}; cur.qty=Math.max(0,cur.qty-1); if(cur.qty===0) next.splice(idx,1); else next[idx]=cur; this.cart.set(next); }
  }
  incLine(line:CartItem){ this.cart.set(this.cart().map(r=> r===line ? {...r, qty:r.qty+1} : r)); }
  decLine(line:CartItem){
    const next=[...this.cart()]; const idx=next.indexOf(line);
    if(idx>=0){ const cur={...next[idx], qty:Math.max(0,next[idx].qty-1)}; if(cur.qty===0) next.splice(idx,1); else next[idx]=cur; this.cart.set(next); }
  }
  removeCartLine(line:CartItem){
    this.cart.set(this.cart().filter(r =>
      !(r.name===line.name && r.price===line.price && (r.product_id??null)===(line.product_id??null) && (r.notes??null)===(line.notes??null) && (r.extra_total??0)===(line.extra_total??0))
    ));
  }
  clearCart(){ this.cart.set([]); }

  canCustomize(_m:CatalogItem){ return true; }
  async openCustomize(m:CatalogItem){
    this._targetItem=m;
    this.modalNote.set('');
    this.baseRemoved.set({});
    this.extraQty.set({});
    this.ing.set([]);
    this.extras.set([]);
    this.customOpen.set(true);

    
      // Assicuriamoci che gli ingredienti globali siano disponibili (apertura modal immediata)
      if(!this.allIngredients()?.length){
        await this._loadAllIngredients();
      }
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
  toggleBase(id:number){ const next={...this.baseRemoved()}; if(next[id]) delete next[id]; else next[id]=true; this.baseRemoved.set(next); }

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

  addCustomToCartFromModal(){
    const t=this._targetItem; if(!t) return;
    const line:CartItem={
      name:t.name, price:Number(t.price||0), qty:1, product_id:t.id ?? null,
      notes:(this._buildNotesFromSelections() || null),
      extra_total:this.extraCostPreview() || 0
    };
    this.cart.set([...this.cart(), line]);
    console.log('🧾➕ added custom line', line);
  }

  // preset
  private readonly LS_PRESETS='order.presets.v2';
  presets=signal<Preset[]>(this._loadPresets());
  presetsForTarget = computed(()=> {
    const base=this._targetItem?.name || '';
    return this.presets().filter(p=>p.baseName===base).sort((a,b)=>b.created_at-a.created_at);
  });
  private _loadPresets():Preset[]{ try{
    const raw2=localStorage.getItem(this.LS_PRESETS); const arr2=raw2?JSON.parse(raw2):null; if(Array.isArray(arr2)) return arr2;
    const raw1=localStorage.getItem('order.presets.v1'); const arr1=raw1?JSON.parse(raw1):null; if(Array.isArray(arr1)) return arr1;
    return [];
  }catch{ return []; } }
  private _persistPresets(){ try{ localStorage.setItem(this.LS_PRESETS, JSON.stringify(this.presets())); }catch(e){ console.warn('💾❌ persistPresets', e); } }

  savePresetFromModal(){
    const t=this._targetItem; if(!t) return;
    const notes=this._buildNotesFromSelections();
    if(!notes && !Object.keys(this.baseRemoved()).length && !Object.keys(this.extraQty()).length){
      console.log('💾⚠️ preset vuoto ignorato'); return;
    }
    const p:Preset={ id:`${Date.now()}-${Math.random().toString(36).slice(2,8)}`, baseName:t.name, notes, created_at:Date.now(),
      removedBaseIds:Object.keys(this.baseRemoved()).map(Number),
      extraQty:Object.keys(this.extraQty()).length ? {...this.extraQty()} : undefined,
      includeExtrasInTotal:this.includeExtrasInTotal()
    };
    this.presets.set([p,...this.presets()]); this._persistPresets();
    console.log('💾✅ preset salvato', p);
  }
  applyPresetConfig(p:Preset){
    this.baseRemoved.set({}); this.extraQty.set({});
    if(p.removedBaseIds?.length){ const map:Record<number,true>={}; for(const id of p.removedBaseIds) map[id]=true; this.baseRemoved.set(map); }
    if(p.extraQty && Object.keys(p.extraQty).length){ this.extraQty.set({...p.extraQty}); }
    if(typeof p.includeExtrasInTotal==='boolean'){ this.includeExtrasInTotal.set(!!p.includeExtrasInTotal); }
    this.modalNote.set('');
    console.log('⚙️ preset configurato', p.id);
  }
  applyPresetAdd(p:Preset){
    const t=this._targetItem; if(!t) return;
    // ricalcolo extraPerUnit usando gli attuali prezzi degli extra globali
    let extraPerUnit=0;
    if(p.extraQty && Object.keys(p.extraQty).length){
      for(const [idStr,q] of Object.entries(p.extraQty)){
        const row=this.extras().find(e=>e.id===+idStr);
        const px=Number(row?.price_extra ?? 0);
        if((q||0)>0 && px>0) extraPerUnit += (q as number)*px;
      }
    }
    const line:CartItem={ name:t.name, price:Number(t.price||0), qty:1, product_id:t.id ?? null, notes:p.notes || null, extra_total:extraPerUnit||0 };
    this.cart.set([...this.cart(), line]);
    console.log('⚡ preset aggiunto', p.id, line);
  }
  deletePreset(p:Preset){ this.presets.set(this.presets().filter(x=>x.id!==p.id)); this._persistPresets(); console.log('🗑️ preset eliminato', p.id); }

  async confirmOrder(){
    try{
      const includeExtras=this.includeExtrasInTotal();
      const items:OrderItemInput[]=this.cart().map(r=>({
        name:r.name, qty:r.qty, price:Number(r.price)+(includeExtras?Number(r.extra_total||0):0),
        product_id:r.product_id ?? null, notes:r.notes ?? null
      }));
      if(this.covers()>0){ items.push({ name:'Coperto', qty:this.covers(), price:COVER_PRICE_EUR, product_id:null, notes:null }); }

      const payload:OrderInputPayload={ customer_name:(this.customerName()||'Cliente').trim(),
        phone:(this.customerPhone()||'').trim() || null, note:(this.note()||'').trim() || null,
        people:this.covers() || null, channel:'admin', items };
      const meta=this.reservationMeta(); if(meta){ payload.reservation_id=meta.id; payload.table_id=meta.table_id ?? null; payload.room_id=meta.room_id ?? null; payload.scheduled_at=meta.start_at ?? null; }

      console.log('📤 create order…', payload);
      const created=await firstValueFrom(this.api.create(payload as any));
      console.log('✅ creato', created);
      try{ await firstValueFrom(this.api.print(created.id)); console.log('🖨️ print OK'); }catch(pe){ console.warn('🖨️ print KO (non blocco)', pe); }
      this.cart.set([]); this.customOpen.set(false); this.router.navigate(['/orders']);
    }catch(e){ console.error('💥 create KO', e); }
  }
}
