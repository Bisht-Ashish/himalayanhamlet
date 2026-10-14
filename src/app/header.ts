import { Component, signal } from '@angular/core';
import { Icon } from './icon';
import { NAV, SITE } from './site-data';

@Component({
  selector: 'app-header',
  imports: [Icon],
  styles: ':host{display:block}',
  host: { '(window:scroll)': 'onScroll()' },
  template: `
<header class="site-header" [class.solid]="solid()">
  <div class="wrap hd">
    <a class="brand" href="#top"><app-icon name="logo" />{{ site.name }}</a>
    <nav>
      @for (n of nav; track n.href) {
        <a [href]="n.href">{{ n.label }}</a>
      }
      <a class="btn" href="#book">Enquire</a>
    </nav>
  </div>
</header>`,
})
export class Header {
  readonly site = SITE;
  readonly nav = NAV;
  readonly solid = signal(false);
  onScroll() {
    this.solid.set(window.scrollY > 40);
  }
}
