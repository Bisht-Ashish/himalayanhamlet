import { Component, inject } from '@angular/core';
import { Enquiry } from './enquiry';

@Component({
  selector: 'app-sticky-bar',
  styles: ':host{display:block}',
  template: `
<div class="sticky">
  <a class="btn" href="#book">Check dates</a>
  <a class="btn line" [href]="q.link()" target="_blank" rel="noopener">WhatsApp</a>
</div>`,
})
export class StickyBar {
  readonly q = inject(Enquiry);
}
