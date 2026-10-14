import { Component } from '@angular/core';
import { Icon } from './icon';
import { Reveal } from './reveal';
import { AMENITIES } from './site-data';

@Component({
  selector: 'app-amenities',
  imports: [Icon, Reveal],
  styles: ':host{display:block}',
  template: `
<section class="sec" id="amenities">
  <div class="wrap" appReveal>
    <h2>Everything you need</h2>
    <ul class="amen">
      @for (a of amenities; track a.text) {
        <li><span class="ico"><app-icon [name]="a.icon" /></span>{{ a.text }}</li>
      }
    </ul>
  </div>
</section>`,
})
export class Amenities {
  readonly amenities = AMENITIES;
}
