import { Component } from '@angular/core';
import { Reveal } from './reveal';
import { SEASONS } from './site-data';

@Component({
  selector: 'app-seasons',
  imports: [Reveal],
  styles: ':host{display:block}',
  template: `
<section class="sec alt" id="seasons">
  <div class="wrap" appReveal>
    <h2>Every season is different</h2>
    <div class="seasons">
      @for (s of seasons; track s.name) {
        <div class="season" [class]="'season ' + s.cls"><h3>{{ s.name }}</h3><p>{{ s.text }}</p></div>
      }
    </div>
  </div>
</section>`,
})
export class Seasons {
  readonly seasons = SEASONS;
}
