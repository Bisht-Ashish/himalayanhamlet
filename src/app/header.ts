import { Component, signal } from '@angular/core';
import { Icon } from './icon';
import { NAV, SITE } from './site-data';

@Component({
  selector: 'app-header',
  imports: [Icon],
  styles: ':host{display:block}',
  host: { '(window:scroll)': 'onScroll()', '(document:keydown.escape)': 'toggle(false)' },
  template: `
<header class="site-header" [class.solid]="solid()" [class.m-open]="open()">
  <div class="wrap hd">
    <a class="brand" href="#top"><app-icon name="logo" />{{ site.name }}</a>
    <nav>
      @for (n of nav; track n.href) {
        <a [href]="n.href">{{ n.label }}</a>
      }
      <a class="btn" href="#book">Enquire</a>
    </nav>
    <button class="menu-btn" type="button" [attr.aria-label]="open() ? 'Close menu' : 'Open menu'" [attr.aria-expanded]="open()" aria-controls="m-sheet" (click)="toggle()"><span></span><span></span></button>
  </div>
</header>
  @if (open()) {
    <div class="m-sheet" id="m-sheet" (click)="toggle(false)">
      @for (n of nav; track n.href) {
        <a [href]="n.href">{{ n.label }}</a>
      }
      <a class="m-cta" href="#book">Enquire</a>
    </div>
  }`,
})
export class Header {
  readonly site = SITE;
  readonly nav = NAV;
  readonly solid = signal(false);
  readonly open = signal(false);
  toggle(v?: boolean) {
    const o = v ?? !this.open();
    this.open.set(o);
    document.body.style.overflow = o ? 'hidden' : '';
  }
  onScroll() {
    this.solid.set(window.scrollY > 40);
  }
}
