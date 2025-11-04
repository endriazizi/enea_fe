import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonInput, IonList, IonItem, IonLabel, IonIcon, IonSpinner, IonButton, IonNote
} from '@ionic/angular/standalone';
import { GContactPick } from '@/app/core/google/google-contacts.service';

@Component({
  standalone: true,
  selector: 'app-gcontacts-autocomplete',
  imports: [CommonModule, IonInput, IonList, IonItem, IonLabel, IonIcon, IonSpinner, IonButton, IonNote],
  templateUrl: './gcontacts-autocomplete.component.html',
  styleUrls: ['./gcontacts-autocomplete.component.scss'],
})
export class GContactsAutocompleteComponent {
  @Input() results: GContactPick[] = [];
  @Input() searching = false;
  @Input() placeholder = 'Cerca in Google Contacts…';
  @Input() needsConsent = false;               // 👈 nuovo
  @Output() queryChange = new EventEmitter<string>();
  @Output() selected = new EventEmitter<GContactPick>();
  @Output() connect = new EventEmitter<void>(); // 👈 nuovo

  value = signal('');

  onInput(ev: any) {
    const v = String(ev?.target?.value || '').trim();
    this.value.set(v);
    this.queryChange.emit(v);
  }

  pick(r: GContactPick) { this.selected.emit(r); }
  onConnect() { this.connect.emit(); }          // 👈 gesto esplicito utente
}
