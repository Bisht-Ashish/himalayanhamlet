import { Component } from '@angular/core';
import { STAY } from './site-data';

@Component({
  selector: 'app-stay',
  styles: ':host{display:block}',
  template: `
<section id="stay">
  <div class="two">
    <div>
      <h2>The stay</h2>
      @for (p of stay.paragraphs; track $index) {
        <p>{{ p }}</p>
      }
    </div>
    <div>
      <h2>Highlights</h2>
      <ul class="list">
        @for (h of stay.highlights; track h.label) {
          <li>{{ h.label }}<span>{{ h.value }}</span></li>
        }
      </ul>
    </div>
  </div>
</section>`,
})
export class Stay {
  readonly stay = STAY;
}
