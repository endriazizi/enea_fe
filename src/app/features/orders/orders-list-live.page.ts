// src/app/features/orders/orders-list-live.page.ts
// Lista “semplice” con SSE (stessa logica della live, ma layout lista)
import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { CommonModule, UpperCasePipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonSegment, IonSegmentButton, IonButton, IonItem, IonLabel, IonNote, IonInput
} from '@ionic/angular/standalone';



import { OrdersApi, OrderHeader, OrderFull } from '../../core/orders/orders.service';


@Component({
  standalone: true,
  selector: 'app-orders-list-live',
  templateUrl: './orders-list-live.page.html',
  imports: [
    CommonModule, UpperCasePipe, DecimalPipe, NgFor, NgIf,
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonSegment, IonSegmentButton, IonButton, IonItem, IonLabel, IonNote, IonInput
  ]
})
export class OrdersListLivePage implements OnInit, OnDestroy {
  private api = inject(OrdersApi);

  readonly statuses = ['all','pending','confirmed','preparing','ready','completed'];
  status = signal<'all'|'pending'|'confirmed'|'preparing'|'ready'|'completed'>('all');
  hours  = signal<number>(6);
  rows   = signal<OrderHeader[]>([]);
  es?: EventSource;

  async load() {
    const data = await this.api.list({ status: this.status(), hours: this.hours() }).toPromise();
    this.rows.set(data || []);
  }

  ngOnInit() { this.load(); this.es = this.api.stream(); this.es.addEventListener('created',()=>this.load()); this.es.addEventListener('status',()=>this.load()); }
  ngOnDestroy() { try { this.es?.close(); } catch {} }
}
