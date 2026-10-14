import { Component } from '@angular/core';
import { Icon } from './icon';
import { FACTS } from './site-data';

@Component({
  selector: 'app-facts',
  imports: [Icon],
  styles: ':host{display:block}',
  template: `
<div class="wrap facts-wrap">
  <div class="facts">
    @for (f of facts; track f.title) {
      <div class="fact"><app-icon [name]="f.icon" /><div><b>{{ f.title }}</b><span>{{ f.text }}</span></div></div>
    }
  </div>
</div>`,
})
export class Facts {
  readonly facts = FACTS;
}
