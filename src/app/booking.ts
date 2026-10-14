import { Component, computed, inject, signal } from '@angular/core';
import { Availability } from './services/availability';
import { SITE, waLink } from './site-data';

interface Cell {
  n: number;
  cls: string;
}

interface Month {
  title: string;
  blanks: number[];
  days: Cell[];
}

function iso(d: Date): string {
  return (
    d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2)
  );
}

@Component({
  selector: 'app-booking',
  styles: ':host{display:block}',
  template: `
<section id="book">
  <h2>Check dates and enquire</h2>
  @if (avail.booked().length) {
    <div>
      <p class="note" style="margin-bottom:10px">Availability for the next four months. Crossed-out days are not available. It follows our Airbnb calendar, which can lag by a few hours, so please confirm by message.</p>
      <div class="cal">
        @for (m of months(); track m.title) {
          <div class="mo">
            <h3>{{ m.title }}</h3>
            <div class="dg">
              @for (w of weekdays; track $index) {
                <i>{{ w }}</i>
              }
              @for (b of m.blanks; track b) {
                <em></em>
              }
              @for (d of m.days; track d.n) {
                <span [class]="d.cls">{{ d.n }}</span>
              }
            </div>
          </div>
        }
      </div>
    </div>
  }
  <form (submit)="$event.preventDefault()">
    <label>Check-in<input type="date" [min]="today" #ci (input)="checkIn.set(ci.value)"></label>
    <label>Check-out<input type="date" [min]="today" #co (input)="checkOut.set(co.value)"></label>
    <label>Guests
      <select #gs (change)="guests.set(gs.value)">
        @for (n of guestOptions; track n) {
          <option [value]="n" [selected]="n === guests()">{{ n }}</option>
        }
      </select>
    </label>
    <label>Your name<input #nm autocomplete="name" (input)="guestName.set(nm.value)"></label>
    <p class="perk full"><b>Book direct:</b> message us on WhatsApp for {{ site.directPerk }}.</p>
    <p class="note full" aria-live="polite">{{ message() }}</p>
    <a class="btn full" [href]="link()" target="_blank" rel="noopener">Send enquiry on WhatsApp</a>
    <p class="note full">This opens WhatsApp with your details filled in. No payment is taken on this site.</p>
  </form>
</section>`,
})
export class Booking {
  readonly avail = inject(Availability);
  readonly site = SITE;
  readonly today = iso(new Date());
  readonly weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  readonly guestOptions = ['1', '2', '3', '4'];

  readonly checkIn = signal('');
  readonly checkOut = signal('');
  readonly guests = signal('2');
  readonly guestName = signal('');

  readonly months = computed<Month[]>(() => {
    const booked = this.avail.booked();
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth();
    const out: Month[] = [];
    for (let k = 0; k < 4; k++) {
      const first = new Date(y, m + k, 1);
      const count = new Date(y, m + k + 1, 0).getDate();
      const days: Cell[] = [];
      for (let d = 1; d <= count; d++) {
        const s = iso(new Date(y, m + k, d));
        let cls = s < this.today ? 'p' : booked.some((r) => s >= r.start && s < r.end) ? 'b' : 'f';
        if (s === this.today) cls += ' t';
        days.push({ n: d, cls });
      }
      out.push({
        title: first.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
        blanks: Array.from({ length: first.getDay() }, (_, i) => i),
        days,
      });
    }
    return out;
  });

  readonly message = computed(() => {
    const a = this.checkIn();
    const b = this.checkOut();
    if (!a || !b || !this.avail.booked().length) return '';
    if (b <= a) return 'Check-out must be after check-in.';
    return this.avail.overlaps(a, b)
      ? 'Those dates look booked. Message us anyway, as the calendar can lag by a few hours.'
      : 'These dates look free. Send your enquiry to confirm.';
  });

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
