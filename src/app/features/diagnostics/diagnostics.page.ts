// import { Component, inject, signal } from '@angular/core';
// import { NgIf, JsonPipe } from '@angular/common';
// import {
//   IonContent, IonHeader, IonToolbar, IonTitle,
//   IonButton, IonSpinner
// } from '@ionic/angular/standalone';
// import { HttpClient } from '@angular/common/http';
// import { firstValueFrom } from 'rxjs';

// @Component({
//   standalone: true,
//   selector: 'app-diagnostics',
//   imports: [NgIf, JsonPipe, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonSpinner],
//   template: `
//     <ion-header>
//       <ion-toolbar>
//         <ion-title>Diagnostics — /api/ping</ion-title>
//       </ion-toolbar>
//     </ion-header>

//     <ion-content>
//       <div style="padding:16px">
//         <!-- Bottone IONIC -->
//         <ion-button id="pingBtn" (click)="testPing()" [disabled]="loading()">Test /api/ping</ion-button>

//         <!-- Stato -->
//         <div *ngIf="loading()" style="margin-top:10px">
//           <ion-spinner></ion-spinner> In corso…
//         </div>
//         <pre *ngIf="result()" style="margin-top:10px; background:#f3f3f3; padding:12px; border-radius:8px">{{ result() | json }}</pre>
//         <p *ngIf="error()" style="margin-top:10px; color:#dc2626">{{ error() }}</p>

//         <!-- Fallback HTML (si vede anche se i CSS Ionic mancassero) -->
//         <button style="margin-top:12px; padding:10px 14px; background:#0ea5e9; color:#fff; border:0; border-radius:6px"
//                 (click)="testPing()">Test /api/ping (HTML)</button>
//       </div>
//     </ion-content>
//   `
// })
// export class DiagnosticsPage {
//   private http = inject(HttpClient);
//   loading = signal(false);
//   result = signal<unknown | null>(null);
//   error = signal<string | null>(null);

//   async testPing() {
//     this.loading.set(true); this.error.set(null); this.result.set(null);
//     try {
//       const res = await firstValueFrom(this.http.get('/api/ping')); // via proxy
//       this.result.set(res);
//     } catch (e: any) {
//       this.error.set(e?.message ?? 'Errore sconosciuto');
//     } finally {
//       this.loading.set(false);
//     }
//   }
// }


import { Component, signal } from '@angular/core';
import { NgIf, JsonPipe } from '@angular/common';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonSpinner } from '@ionic/angular/standalone';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../../core/api.service';


@Component({
standalone: true,
selector: 'app-diagnostics',
imports: [NgIf, JsonPipe, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonSpinner],
template: `
<ion-header><ion-toolbar><ion-title>Diagnostics — /api/ping</ion-title></ion-toolbar></ion-header>
<ion-content>
<div style="padding:16px">
<ion-button (click)="testPing()" [disabled]="loading()">Test /api/ping</ion-button>
<div *ngIf="loading()" style="margin-top:10px"><ion-spinner></ion-spinner> In corso…</div>
<pre *ngIf="result()" style="margin-top:10px; background:#f3f3f3; padding:12px; border-radius:8px">{{ result() | json }}</pre>
<p *ngIf="error()" style="margin-top:10px; color:#dc2626">{{ error() }}</p>
</div>
</ion-content>
`
})
export class DiagnosticsPage {
constructor(private api: ApiService) {}
loading = signal(false);
result = signal<unknown | null>(null);
error = signal<string | null>(null);


async testPing() {
this.loading.set(true); this.error.set(null); this.result.set(null);
try {
const res = await firstValueFrom(this.api.ping());
this.result.set(res);
} catch (e: any) {
this.error.set(e?.message ?? 'Errore sconosciuto');
} finally {
this.loading.set(false);
}
}
}