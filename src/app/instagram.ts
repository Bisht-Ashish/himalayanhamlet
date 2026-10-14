import { Component } from '@angular/core';
import { Icon } from './icon';
import { Reveal } from './reveal';
import { SITE } from './site-data';

@Component({
  selector: 'app-instagram',
  imports: [Icon, Reveal],
  styles: ':host{display:block}',
  template: `
<section class="sec insta" id="instagram">
  <div class="wrap insta-in" appReveal>
    <span class="ig-badge"><app-icon name="instagram" /></span>
    <div>
      <h2>Follow our life in the hills</h2>
      <p>Sunrises, snow days, village walks and guest stories, shared on Instagram as {{ site.instagramHandle }}.</p>
    </div>
    <a class="btn ig" [href]="site.instagramUrl" target="_blank" rel="noopener">Follow {{ site.instagramHandle }}</a>
  </div>
</section>`,
})
export class InstagramBand {
  readonly site = SITE;
}
