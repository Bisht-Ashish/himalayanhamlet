import { Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Reveal } from './reveal';
import { Weather } from './services/weather';
import { REACH, SITE } from './site-data';

@Component({
  selector: 'app-weather-section',
  imports: [Reveal],
  styles: ':host{display:block}',
  template: `
<section class="sec alt" id="weather">
  <div class="wrap split" appReveal>
    <div>
      <h2>Getting here</h2>
      <p>{{ reach }}</p>
      <div class="wx">
        @for (d of weather.days(); track d.label) {
          <div>{{ d.label }}<b>{{ d.max }}° / {{ d.min }}°</b>Rain {{ d.rain }}%</div>
        } @empty {
          <p class="note">The 5-day forecast could not be loaded right now.</p>
        }
      </div>
      <a class="btn" [href]="mapsUrl" target="_blank" rel="noopener">Get directions in Google Maps</a>
    </div>
    <div class="map">
      <iframe title="Map showing Himalayan Hamlet Homestay in Almora" [src]="mapSrc" loading="lazy" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>
    </div>
  </div>
</section>`,
})
export class WeatherSection {
  readonly weather = inject(Weather);
  readonly reach = REACH;
  readonly mapsUrl = SITE.mapsUrl;
  readonly mapSrc = inject(DomSanitizer).bypassSecurityTrustResourceUrl(SITE.mapEmbedUrl);
}
