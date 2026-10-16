import { Component } from '@angular/core';
import { Reveal } from './reveal';
import { RATINGS, REVIEWS, SITE } from './site-data';

@Component({
  selector: 'app-reviews',
  imports: [Reveal],
  styles: ':host{display:block}',
  template: `
<section class="sec" id="reviews">
  <div class="wrap" appReveal>
    <h2>What guests say</h2>
    <div class="rev">
      @for (r of reviews; track $index) {
        <blockquote><p>“{{ r.text }}”</p><footer>{{ r.by }}</footer></blockquote>
      }
    </div>
    <p class="rev-links">
      <a class="link" href="our-family-home-in-almora/">Read what guests remember about the family</a>
      <a class="link" [href]="airbnb" target="_blank" rel="noopener">Read all {{ count }} reviews on Airbnb</a>
    </p>
  </div>
</section>`,
})
export class Reviews {
  readonly reviews = REVIEWS;
  readonly airbnb = SITE.airbnbUrl;
  readonly count = RATINGS.count;
}
