import { Component } from '@angular/core';
import { Amenities } from './amenities';
import { Around } from './around';
import { Booking } from './booking';
import { Facts } from './facts';
import { Faq } from './faq';
import { SiteFooter } from './footer';
import { Gallery } from './gallery';
import { Header } from './header';
import { Hero } from './hero';
import { IgFloat } from './ig-float';
import { Hosts } from './hosts';
import { Reviews } from './reviews';
import { Rooms } from './rooms';
import { Seasons } from './seasons';
import { Stay } from './stay';
import { StickyBar } from './sticky-bar';
import { WeatherSection } from './weather-section';

@Component({
  selector: 'app-root',
  imports: [
    Header, Hero, Facts, Stay, Rooms, Amenities, Seasons, Gallery, Around, Hosts,
    WeatherSection, Reviews, Faq, Booking, SiteFooter, StickyBar, IgFloat,
  ],
  template: `
<app-header />
<main>
  <app-hero />
  <app-facts />
  <app-stay />
  <app-rooms />
  <app-amenities />
  <app-seasons />
  <app-gallery />
  <app-around />
  <app-hosts />
  <app-weather-section />
  <app-reviews />
  <app-faq />
  <app-booking />
</main>
<app-footer />
<app-sticky-bar />
<app-ig-float />`,
})
export class App {}
