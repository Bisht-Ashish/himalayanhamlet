import { Component } from '@angular/core';
import { Icon } from './icon';
import { FOOTER_LINKS, SITE } from './site-data';

@Component({
  selector: 'app-footer',
  imports: [Icon],
  styles: ':host{display:block}',
  template: `
<footer class="foot">
  <div class="wrap foot-grid">
    <div>
      <a class="brand" href="#top"><app-icon name="logo" />{{ site.name }}</a>
      <p>Almora, Uttarakhand</p>
    </div>
    <div>
      <p>{{ site.phone }}</p>
      <p>{{ site.email }}</p>
      <a [href]="site.instagramUrl" target="_blank" rel="noopener">Instagram {{ site.instagramHandle }}</a>
    </div>
    <div>
      @for (l of links; track l.label) {
        <a [href]="l.href">{{ l.label }}</a>
      }
    </div>
  </div>
</footer>`,
})
export class SiteFooter {
  readonly site = SITE;
  readonly links = FOOTER_LINKS;
}
