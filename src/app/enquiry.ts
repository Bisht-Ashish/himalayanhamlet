import { Injectable, computed, signal } from '@angular/core';
import { SITE, waLink } from './site-data';

/** Dates and guests shared by the hero bar and the booking form. */
@Injectable({ providedIn: 'root' })
export class Enquiry {
  readonly checkIn = signal('');
  readonly checkOut = signal('');
  readonly guests = signal('2');
  readonly guestName = signal('');

  readonly link = computed(() => {
    const a = this.checkIn();
    const b = this.checkOut();
    const g = this.guests();
    const nm = this.guestName().trim();
    const text =
      "Namaste! 🙏 I'd like to enquire about a stay at " + SITE.name + ' in Almora' +
      (a ? ' from ' + a : '') +
      (b ? ' to ' + b : '') +
      ' for ' + g + ' guest' + (g === '1' ? '' : 's') +
      '. Is it available, and what are the rates?' +
      (nm ? ' My name is ' + nm + '.' : '');
    return waLink(text);
  });
}
