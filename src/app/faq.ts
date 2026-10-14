import { Component } from '@angular/core';
import { Reveal } from './reveal';
import { FAQ } from './site-data';

@Component({
  selector: 'app-faq',
  imports: [Reveal],
  styles: ':host{display:block}',
  template: `
<section class="sec alt" id="faq">
  <div class="wrap" appReveal>
    <h2>Good to know</h2>
    <div class="faq">
      @for (f of faq; track f.q) {
        <details><summary>{{ f.q }}</summary><p>{{ f.a }}</p></details>
      }
    </div>
  </div>
</section>`,
})
export class Faq {
  readonly faq = FAQ;
}
