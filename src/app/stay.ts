import { Component } from '@angular/core';
import { Reveal } from './reveal';
import { STAY } from './site-data';

@Component({
  selector: 'app-stay',
  imports: [Reveal],
  styles: ':host{display:block}',
  template: `
<section class="sec" id="stay">
  <div class="wrap split" appReveal>
    <div class="photo"><img src="images/bedroom1-b.webp" alt="Bedroom 1 with a king bed, a writing desk and a red folk-art painting under the wooden ceiling" width="900" height="1100" loading="lazy"></div>
    <div>
      <h2>A family home with the whole first floor to yourselves.</h2>
      @for (p of stay.paragraphs; track $index) {
        <p>{{ p }}</p>
      }
      <ul class="rows">
        @for (h of stay.highlights; track h.label) {
          <li>{{ h.label }}<span>{{ h.value }}</span></li>
        }
      </ul>
      <p><a class="more" href="our-family-home-in-almora/">Read the story of our family home &rarr;</a></p>
    </div>
  </div>
</section>`,
})
export class Stay {
  readonly stay = STAY;
}
