import { Component } from '@angular/core';
import { FAQ } from './site-data';

@Component({
  selector: 'app-faq',
  styles: ':host{display:block}',
  template: `
<section id="faq">
  <h2>Good to know</h2>
  @for (f of faq; track f.q) {
    <details><summary>{{ f.q }}</summary><p>{{ f.a }}</p></details>
  }
</section>`,
})
export class Faq {
  readonly faq = FAQ;
}
