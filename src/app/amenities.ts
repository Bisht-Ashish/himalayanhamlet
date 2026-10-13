import { Component } from '@angular/core';
import { AMENITIES } from './site-data';

@Component({
  selector: 'app-amenities',
  styles: ':host{display:block}',
  template: `
<section id="amenities">
  <h2>Amenities</h2>
  <ul class="amen">
    @for (a of amenities; track a) {
      <li>{{ a }}</li>
    }
  </ul>
</section>`,
})
export class Amenities {
  readonly amenities = AMENITIES;
}
