import { Component } from '@angular/core';
import { Reveal } from './reveal';
import { HOSTS } from './site-data';

@Component({
  selector: 'app-hosts',
  imports: [Reveal],
  styles: ':host{display:block}',
  template: `
<section class="sec" id="hosts">
  <div class="wrap split top hosts" appReveal>
    <div>
      <h2>Meet your hosts</h2>
      <p>{{ hosts.text }}</p>
      <p><a class="more" [href]="hosts.storyUrl">Read our family story &rarr;</a></p>
      @if (hosts.note) {
        <p class="note">{{ hosts.note }}</p>
      }
    </div>
    <div>
      <h2>A day at the Hamlet</h2>
      <ul class="rows">
        @for (d of hosts.day; track d.label) {
          <li>{{ d.label }}<span>{{ d.value }}</span></li>
        }
      </ul>
    </div>
  </div>
</section>`,
})
export class Hosts {
  readonly hosts = HOSTS;
}
