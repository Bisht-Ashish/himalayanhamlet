import { Component } from '@angular/core';
import { Reveal } from './reveal';
import { ROOMS, SITE, waLink } from './site-data';

@Component({
  selector: 'app-rooms',
  imports: [Reveal],
  styles: ':host{display:block}',
  template: `
<section class="sec alt" id="rooms">
  <div class="wrap" appReveal>
    <h2>Two bedrooms</h2>
    <div class="rooms">
      @for (r of rooms; track r.name) {
        <div class="room">
          <div class="photo"><img [src]="r.photo" [alt]="r.alt" width="900" height="600" loading="lazy"></div>
          <h3>{{ r.name }}</h3>
          <p>{{ r.text }}</p>
        </div>
      }
    </div>
    @if (rate) {
      <div class="rate">
        <div>
          <h3>Rates</h3>
          <p><strong>{{ rate }}</strong> per night for the whole suite. Meals are extra, and prices change by season and weekend.</p>
        </div>
        <a class="btn" [href]="ask" target="_blank" rel="noopener">Ask for rates</a>
      </div>
    }
  </div>
</section>`,
})
export class Rooms {
  readonly rooms = ROOMS;
  readonly rate = SITE.nightlyRate ? '₹' + SITE.nightlyRate.toLocaleString('en-IN') : '';
  readonly ask = waLink(SITE.greeting);
}
