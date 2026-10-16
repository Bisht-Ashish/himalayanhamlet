import { Component, inject } from '@angular/core';
import { Enquiry } from './enquiry';
import { HERO } from './site-data';

@Component({
  selector: 'app-hero',
  styles: ':host{display:block}',
  template: `
<section class="hero" id="top">
  <img class="heroimg" src="images/hero.webp" srcset="images/hero-800.webp 800w, images/hero.webp 1600w" sizes="100vw" width="1600" height="1066" [alt]="hero.alt" fetchpriority="high">
  <div class="wrap hero-in">
    <h1>{{ hero.title }}</h1>
    <p class="lead">{{ hero.lead }}</p>
    <div class="chips">
      @for (f of hero.facts; track f) {
        <span class="chip">{{ f }}</span>
      }
    </div>
    <form class="bar" (submit)="$event.preventDefault()">
      <label>Check-in<input type="date" data-ph="Add date" [class.empty]="!q.checkIn()" [value]="q.checkIn()" (input)="q.checkIn.set($any($event.target).value)"></label>
      <label>Check-out<input type="date" data-ph="Add date" [class.empty]="!q.checkOut()" [value]="q.checkOut()" (input)="q.checkOut.set($any($event.target).value)"></label>
      <label>Guests
        <select (change)="q.guests.set($any($event.target).value)">
          @for (n of guestOptions; track n) {
            <option [value]="n" [selected]="n === q.guests()">{{ n }} {{ n === '1' ? 'guest' : 'guests' }}</option>
          }
        </select>
      </label>
      <a class="btn" [href]="q.link()" target="_blank" rel="noopener">Enquire on WhatsApp</a>
    </form>
  </div>
</section>`,
})
export class Hero {
  readonly hero = HERO;
  readonly q = inject(Enquiry);
  readonly guestOptions = ['1', '2', '3', '4'];
}
