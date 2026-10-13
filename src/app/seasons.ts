import { Component } from '@angular/core';
import { SEASONS } from './site-data';

@Component({
  selector: 'app-seasons',
  styles: ':host{display:block}',
  template: `
<section id="seasons">
  <h2>Every season is different</h2>
  <div class="cards">
    @for (s of seasons; track s.name) {
      <div class="c"><div class="cb"><h3>{{ s.name }}</h3><p>{{ s.text }}</p></div></div>
    }
  </div>
</section>`,
})
export class Seasons {
  readonly seasons = SEASONS;
}
