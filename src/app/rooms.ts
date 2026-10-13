import { Component } from '@angular/core';
import { ROOMS, SITE } from './site-data';

@Component({
  selector: 'app-rooms',
  styles: ':host{display:block}',
  template: `
<section id="rooms">
  <h2>Bedrooms</h2>
  <div class="cards">
    @for (r of rooms; track r.name) {
      <div class="c">
        <div class="art-box"><img class="ph" [src]="r.photo" [alt]="r.alt" width="900" height="600" loading="lazy"></div>
        <div class="cb"><h3>{{ r.name }}</h3><p>{{ r.text }}</p></div>
      </div>
    }
    <div class="c">
      <div class="cb">
        <h3>Rates</h3>
        <p>
          @if (rate) {
            <span style="font-weight:800;font-size:1.2rem;color:var(--ink)">{{ rate }}</span> per night for the whole suite
          } @else {
            Message us your dates for exact rates.
          }
        </p>
        <p style="margin-top:8px">Meals are extra. Prices change by season and weekend.</p>
      </div>
    </div>
  </div>
</section>`,
})
export class Rooms {
  readonly rooms = ROOMS;
  readonly rate = SITE.nightlyRate ? '₹' + SITE.nightlyRate.toLocaleString('en-IN') : '';
}
