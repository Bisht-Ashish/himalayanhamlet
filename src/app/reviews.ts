import { Component } from '@angular/core';
import { RATINGS, REVIEWS, SITE } from './site-data';

@Component({
  selector: 'app-reviews',
  styles: ':host{display:block}',
  template: `
<section id="reviews">
  <h2>What guests say</h2>
  <div class="rev">
    @for (r of reviews; track $index) {
      <blockquote><p>“{{ r.text }}”</p><footer>{{ r.by }}</footer></blockquote>
    }
  </div>
  <p style="margin-top:14px"><a [href]="airbnb" target="_blank" rel="noopener" style="color:var(--brand)">Read all {{ count }} reviews on Airbnb</a></p>
</section>`,
})
export class Reviews {
  readonly reviews = REVIEWS;
  readonly airbnb = SITE.airbnbUrl;
  readonly count = RATINGS.count;
}
