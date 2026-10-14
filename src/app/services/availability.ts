import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

export interface BookedRange {
  start: string; // first booked night, YYYY-MM-DD
  end: string; // check-out day (free for a new check-in)
}

/** Reads booked.json, which the calendar sync writes at publish time. */
@Injectable({ providedIn: 'root' })
export class Availability {
  private readonly http = inject(HttpClient);
  readonly booked = signal<BookedRange[]>([]);

  constructor() {
    this.http.get<BookedRange[]>('booked.json').subscribe({
      next: (data) => this.booked.set(Array.isArray(data) ? data : []),
      error: () => this.booked.set([]),
    });
  }

  isBooked(day: string): boolean {
    return this.booked().some((r) => day >= r.start && day < r.end);
  }

  overlaps(checkIn: string, checkOut: string): boolean {
    return this.booked().some((r) => checkIn < r.end && checkOut > r.start);
  }
}
