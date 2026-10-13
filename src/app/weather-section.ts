import { Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Weather } from './services/weather';
import { REACH, SITE } from './site-data';

@Component({
  selector: 'app-weather-section',
  styles: ':host{display:block}',
  template: `
<section id="weather">
  <h2>Weather in Almora</h2>
  <div class="wx">
    @for (d of weather.days(); track d.label) {
      <div>{{ d.label }}<b>{{ d.max }}° / {{ d.min }}°</b>Rain {{ d.rain }}%</div>
    } @empty {
      <p class="note">The 5-day forecast could not be loaded right now. See the season guide above.</p>
    }
  </div>
  <h3 style="margin:22px 0 8px">How to reach us</h3>
  <p>{{ reach }}</p>
  <div class="map">
    <iframe title="Map showing Himalayan Hamlet Homestay in Almora" [src]="mapSrc" loading="lazy" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>
  </div>
  <a class="btn" [href]="mapsUrl" target="_blank" rel="noopener">Get directions in Google Maps</a>
</section>`,
})
export class WeatherSection {
  readonly weather = inject(Weather);
  readonly reach = REACH;
  readonly mapsUrl = SITE.mapsUrl;
  readonly mapSrc = inject(DomSanitizer).bypassSecurityTrustResourceUrl(SITE.mapEmbedUrl);
}
