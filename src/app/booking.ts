import { Component, computed, inject } from '@angular/core';
import { Enquiry } from './enquiry';
import { Reveal } from './reveal';
import { Availability } from './services/availability';
import { SITE } from './site-data';

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
  imports: [Reveal],
  styles: ':host{display:block}',
  template: `
<section class="sec" id="book">
  <div class="wrap" appReveal>
    <div class="book">
      <h2>Availability</h2>
      <div class="book-grid" [class.solo]="!avail.booked().length">
        @if (avail.booked().length) {
          <div>
            <p class="note">Availability for the next four months. Crossed-out days are not available. It follows our Airbnb calendar, which can lag by a few hours, so please confirm by message.</p>
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
        <div class="fcard">
          <h3>Your dates</h3>
          <p class="sel full">
            @if (q.checkIn() && q.checkOut()) {
              {{ q.checkIn() }} to {{ q.checkOut() }}, {{ q.guests() }} {{ q.guests() === '1' ? 'guest' : 'guests' }}
            } @else {
              Pick dates in the booking bar at the top, then come back here to check them against the calendar.
            }
          </p>
          <p class="note full" aria-live="polite">{{ message() }}</p>
          @if (site.directPerk) {
            <p class="perk full"><b>Book direct:</b> message us on WhatsApp for {{ site.directPerk }}.</p>
          }
          <a class="btn full" [href]="q.link()" target="_blank" rel="noopener">Send enquiry on WhatsApp</a>
          <a class="link full" href="#top">Change dates</a>
          <p class="note full">This opens WhatsApp with your details filled in. No payment is taken on this site.</p>
        </div>
      </div>
    </div>
  </div>
</section>`,
})
export class Booking {
  readonly avail = inject(Availability);
  readonly site = SITE;
  readonly today = iso(new Date());
  readonly weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  readonly guestOptions = ['1', '2', '3', '4'];

  readonly q = inject(Enquiry);

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
    const a = this.q.checkIn();
    const b = this.q.checkOut();
    if (!a || !b || !this.avail.booked().length) return '';
    if (b <= a) return 'Check-out must be after check-in.';
    return this.avail.overlaps(a, b)
      ? 'Those dates look booked. Message us anyway, as the calendar can lag by a few hours.'
      : 'These dates look free. Send your enquiry to confirm.';
  });
}
