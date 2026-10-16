import { Component } from '@angular/core';
import { Icon } from './icon';
import { SITE } from './site-data';

@Component({
  selector: 'app-ig-float',
  imports: [Icon],
  styles: ':host{display:block}',
  template: `<a class="ig-float" [href]="site.instagramUrl" target="_blank" rel="noopener" [attr.aria-label]="'Instagram ' + site.instagramHandle" title="Follow us on Instagram"><app-icon name="instagram" /></a>`,
})
export class IgFloat {
  readonly site = SITE;
}
