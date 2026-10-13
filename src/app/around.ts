import { Component } from '@angular/core';
import { NEARBY, RATINGS, SITE } from './site-data';

@Component({
  selector: 'app-around',
  styles: ':host{display:block}',
  template: `
<section id="around">
  <div class="two">
    <div>
      <h2>Around Almora</h2>
      <ul class="list">
        @for (n of nearby; track n.label) {
          <li>{{ n.label }}<span>{{ n.value }}</span></li>
        }
      </ul>
    </div>
    <div>
      <h2>Guest ratings</h2>
      <div class="score"><b>{{ ratings.overall }}</b><span>out of 5 · {{ ratings.count }} reviews on Airbnb</span></div>
      <ul class="list">
        @for (r of ratings.items; track r.label) {
          <li>{{ r.label }}<span>{{ r.value }}</span></li>
        }
      </ul>
      <p style="margin-top:12px"><a [href]="airbnb" target="_blank" rel="noopener" style="color:var(--brand)">Read all reviews on Airbnb</a></p>
    </div>
  </div>
</section>`,
})
export class Around {
  readonly nearby = NEARBY;
  readonly ratings = RATINGS;
  readonly airbnb = SITE.airbnbUrl;
}
