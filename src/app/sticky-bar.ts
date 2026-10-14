import { Component } from '@angular/core';
import { SITE, waLink } from './site-data';

@Component({
  selector: 'app-sticky-bar',
  styles: ':host{display:block}',
  template: `
<div class="sticky">
  <a class="btn" href="#book">Check dates</a>
  <a class="btn alt" [href]="wa" target="_blank" rel="noopener">WhatsApp</a>
</div>`,
})
export class StickyBar {
  readonly wa = waLink(SITE.greeting);
}
