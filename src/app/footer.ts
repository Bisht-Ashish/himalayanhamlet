import { Component } from '@angular/core';
import { FOOTER_LINKS, SITE } from './site-data';

@Component({
  selector: 'app-footer',
  styles: ':host{display:block}',
  template: `
<footer class="site">
  <p><strong>{{ site.name }}</strong> · Almora, Uttarakhand · {{ site.phone }} · {{ site.email }}</p>
  <p>
    @for (l of links; track l.label) {
      <a [href]="l.href">{{ l.label }}</a>
    }
  </p>
</footer>`,
})
export class SiteFooter {
  readonly site = SITE;
  readonly links = FOOTER_LINKS;
}
