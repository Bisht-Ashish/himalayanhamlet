import { Component } from '@angular/core';
import { HERO, NAV, SITE, waLink } from './site-data';

@Component({
  selector: 'app-hero',
  styles: ':host{display:block}',
  template: `
<div class="band">
  <div id="bg">
    <img class="heroimg" src="images/hero.webp" srcset="images/hero-800.webp 800w, images/hero.webp 1600w" sizes="100vw" width="1600" height="1066" [alt]="hero.alt" fetchpriority="high">
    <div class="shade"></div>
  </div>
  <div class="wrap">
    <header>
      <div class="logo">{{ site.name }}</div>
      <nav>
        @for (n of nav; track n.href) {
          <a [href]="n.href">{{ n.label }}</a>
        }
      </nav>
    </header>
    <div class="hero">
      <div>
        <h1>{{ hero.title }}</h1>
        <p class="lead">{{ hero.lead }}</p>
        <a class="btn" href="#book">Check dates</a><a class="btn alt" [href]="wa" target="_blank" rel="noopener">Chat on WhatsApp</a>
        <div class="facts">
          @for (f of hero.facts; track f) {
            <span>{{ f }}</span>
          }
        </div>
      </div>
    </div>
  </div>
</div>`,
})
export class Hero {
  readonly site = SITE;
  readonly hero = HERO;
  readonly nav = NAV;
  readonly wa = waLink(SITE.greeting);
}
