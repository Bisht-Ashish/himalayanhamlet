import { Component, inject } from '@angular/core';
import { Enquiry } from './enquiry';
import { Icon } from './icon';

@Component({
  selector: 'app-wa-float',
  imports: [Icon],
  styles: ':host{display:block}',
  template: `<a class="wa-float" [href]="q.link()" target="_blank" rel="noopener" aria-label="Message us on WhatsApp" title="Message us on WhatsApp"><app-icon name="whatsapp" /></a>`,
})
export class WaFloat {
  readonly q = inject(Enquiry);
}
