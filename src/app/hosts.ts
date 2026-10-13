import { Component } from '@angular/core';
import { HOSTS } from './site-data';

@Component({
  selector: 'app-hosts',
  styles: ':host{display:block}',
  template: `
<section id="hosts">
  <div class="two">
    <div>
      <h2>Meet your hosts</h2>
      <p>{{ hosts.text }}</p>
      <p class="note">{{ hosts.note }}</p>
    </div>
    <div>
      <h2>A day at the Hamlet</h2>
      <ul class="list">
        @for (d of hosts.day; track d.label) {
          <li>{{ d.label }}<span>{{ d.value }}</span></li>
        }
      </ul>
      <p class="note" style="margin-top:8px">Example plan. Edit to match what you offer.</p>
    </div>
  </div>
</section>`,
})
export class Hosts {
  readonly hosts = HOSTS;
}
