// src/app/features/reservations/_components/gcontacts-autocomplete/gcontacts-autocomplete.component.ts
//
// Autocomplete Google Contacts (solo FE)
// - Espone @Output() selected: EventEmitter<GContactPick>
// - Alla selezione emette il pick e svuota il campo di ricerca
// - Parent guida la ricerca via (queryChange) e results[]
// - Stile: Signals per stato locale, no ngModel.

import { Component, EventEmitter, Input, Output, signal, computed } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import {
  IonList, IonItem, IonLabel, IonIcon, IonSearchbar, IonSpinner
} from '@ionic/angular/standalone';

export interface GContactPick {
  displayName?: string | null;
  givenName?: string | null;
  familyName?: string | null;
  phone?: string | null;
  email?: string | null;
}

@Component({
  standalone: true,
  selector: 'app-gcontacts-autocomplete',
  templateUrl: './gcontacts-autocomplete.component.html',
  imports: [NgIf, NgFor, IonList, IonItem, IonLabel, IonIcon, IonSearchbar, IonSpinner]
})
export class GContactsAutocompleteComponent {
  /** Risultati da mostrare (arrivano dal parent quando cambia la query) */
  @Input() results: GContactPick[] = [];

  /** Placeholder del search */
  @Input() placeholder = 'Cerca in Google Contacts…';

  /** Mostra spinner mentre il parent sta cercando (opzionale) */
  @Input() searching = false;

  /** Emetto la query quando l’utente digita */
  @Output() queryChange = new EventEmitter<string>();

  /** Emetto il contatto selezionato */
  @Output() selected = new EventEmitter<GContactPick>();

  // Stato locale: valore del campo di ricerca (signal)
  query = signal<string>('');

  // UI helper: mostra lista solo se ho query con almeno 2 char
  showList = computed(() => this.query().trim().length >= 2);

  /** Digitazione nel searchbar → aggiorno signal e notifico il parent */
  onInput(ev: CustomEvent) {
    const q = (ev.detail as any)?.value?.toString() ?? '';
    this.query.set(q);
    this.queryChange.emit(q);
  }

  /** Selezione di un risultato → emetto pick + reset ricerca */
  onSelect(pick: GContactPick) {
    console.log('👤 [GContactsAutocomplete] pick', pick);
    this.selected.emit(pick);
    // reset locale + notifico parent per svuotare eventuali results
    this.query.set('');
    this.queryChange.emit('');
  }

  /** trackBy per la lista (evita ricostruzioni inutili) */
  trackByIdx(index: number, _item: GContactPick) { return index; }

  /** Facoltativo: reset forzato chiamabile dal parent */
  reset() {
    this.query.set('');
    this.queryChange.emit('');
  }
}
