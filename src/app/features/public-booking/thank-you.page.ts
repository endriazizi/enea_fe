import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent
} from '@ionic/angular/standalone';

@Component({
  standalone: true,
  selector: 'app-thank-you',
  templateUrl: './thank-you.page.html',
  imports: [
    NgIf, RouterLink,
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent
  ]
})
export class ThankYouPage {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  id   = this.route.snapshot.queryParamMap.get('id') || '';
  name = this.route.snapshot.queryParamMap.get('name') || '';
  date = this.route.snapshot.queryParamMap.get('date') || '';
  time = this.route.snapshot.queryParamMap.get('time') || '';
  party = Number(this.route.snapshot.queryParamMap.get('party') || 1);

  icsHref = computed(() => {
    if (!this.date || !this.time) return '';
    const start = this.toICS(`${this.date} ${this.time}:00`);
    const end   = this.toICS(this.addMinutesString(`${this.date} ${this.time}:00`, 90));
    const lines = [
      'BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Pienissimo//Booking//IT',
      'BEGIN:VEVENT',
      `UID:pienissimo-${this.id}@booking`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `SUMMARY:Prenotazione tavolo${this.name ? ' — ' + this.name : ''}`,
      'END:VEVENT','END:VCALENDAR'
    ].join('\r\n');
    return 'data:text/calendar;charset=utf-8,' + encodeURIComponent(lines);
  });

  mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Pienissimo';

  private toICS(dt: string) {
    const [d, t] = dt.split(' ');
    return d.replaceAll('-','') + 'T' + t.replaceAll(':','');
  }
  private addMinutesString(dt: string, min: number) {
    const [d, t] = dt.split(' ');
    const [H, M] = t.split(':').map(n => parseInt(n,10));
    const base = new Date(`${d}T${String(H).padStart(2,'0')}:${String(M).padStart(2,'0')}:00`);
    base.setMinutes(base.getMinutes() + min);
    const y = base.getFullYear();
    const mo = String(base.getMonth()+1).padStart(2,'0');
    const da = String(base.getDate()).padStart(2,'0');
    const hh = String(base.getHours()).padStart(2,'0');
    const mm = String(base.getMinutes()).padStart(2,'0');
    return `${y}-${mo}-${da} ${hh}:${mm}:00`;
  }

  goHome() { this.router.navigateByUrl('/'); }
}
