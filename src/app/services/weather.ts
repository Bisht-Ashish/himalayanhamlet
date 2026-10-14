import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { SITE } from '../site-data';

export interface ForecastDay {
  label: string;
  max: number;
  min: number;
  rain: number;
}

interface OpenMeteoResponse {
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
  };
}

/** Five-day forecast from Open-Meteo (free, no key). */
@Injectable({ providedIn: 'root' })
export class Weather {
  private readonly http = inject(HttpClient);
  readonly days = signal<ForecastDay[]>([]);

  constructor() {
    const url =
      'https://api.open-meteo.com/v1/forecast?latitude=' + SITE.latitude +
      '&longitude=' + SITE.longitude +
      '&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max' +
      '&timezone=Asia%2FKolkata&forecast_days=5';
    this.http.get<OpenMeteoResponse>(url).subscribe({
      next: (w) =>
        this.days.set(
          w.daily.time.map((t, i) => ({
            label: new Date(t + 'T12:00:00').toLocaleDateString('en-IN', { weekday: 'short' }),
            max: Math.round(w.daily.temperature_2m_max[i]),
            min: Math.round(w.daily.temperature_2m_min[i]),
            rain: w.daily.precipitation_probability_max[i],
          })),
        ),
      error: () => this.days.set([]),
    });
  }
}
