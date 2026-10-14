import { Component } from '@angular/core';
import { FACTS } from './site-data';

@Component({
  selector: 'app-facts',
  styles: ':host{display:block}',
  template: `
<div class="strip">
  @for (f of facts; track f.title) {
    <div><b>{{ f.title }}</b>{{ f.text }}</div>
  }
</div>`,
})
export class Facts {
  readonly facts = FACTS;
}
