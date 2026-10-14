import { Component } from '@angular/core';
import { Reveal } from './reveal';
import { NEARBY, RATINGS, SITE } from './site-data';

@Component({
  selector: 'app-around',
  imports: [Reveal],
  styles: ':host{display:block}',
  template: `
<section class="sec alt" id="around">
  <div class="wrap split top" appReveal>
    <div>
      <h2>Around Almora</h2>
      <ul class="rows">
        @for (n of nearby; track n.label) {
          <li>{{ n.label }}<span>{{ n.value }}</span></li>
        }
      </ul>
    </div>
    <div>
      <h2>Guest ratings</h2>
      <div class="score"><b>{{ ratings.overall }}</b><span>out of 5 · {{ ratings.count }} reviews on Airbnb</span></div>
      <ul class="rows subr">
        @for (r of ratings.items; track r.label) {
          <li>{{ r.label }}<span>{{ r.value }}</span></li>
        }
      </ul>
      <p style="margin-top:14px"><a class="link" [href]="airbnb" target="_blank" rel="noopener">Read all reviews on Airbnb</a></p>
    </div>
  </div>
</section>`,
})
export class Around {
  readonly nearby = NEARBY;
  readonly ratings = RATINGS;
  readonly airbnb = SITE.airbnbUrl;
}
