import { Component, computed, signal } from '@angular/core';
import { Reveal } from './reveal';
import { GALLERY } from './site-data';

@Component({
  selector: 'app-gallery',
  imports: [Reveal],
  styles: ':host{display:block}',
  host: {
    '(document:keydown.escape)': 'open.set(null)',
    '(document:keydown.arrowright)': 'step(1)',
    '(document:keydown.arrowleft)': 'step(-1)',
  },
  template: `
<section class="sec" id="gallery">
  <div class="wrap" appReveal>
    <h2>Gallery</h2>
    <div class="gal">
      @for (p of photos; track p.small; let i = $index) {
        <button type="button" class="gbtn" (click)="open.set(i)" [attr.aria-label]="'Enlarge photo: ' + p.alt">
          <img [src]="p.small" [alt]="p.alt" width="900" height="600" loading="lazy">
        </button>
      }
    </div>
    <p class="note" style="margin-top:12px">Tap a photo to enlarge it.</p>
  </div>
  @if (current(); as p) {
    <div class="lb" (click)="open.set(null)" role="dialog" aria-modal="true" aria-label="Photo viewer">
      <img [src]="p.large" [alt]="p.alt" (click)="$event.stopPropagation()">
      <button type="button" class="lbn prev" aria-label="Previous photo" (click)="go($event, -1)">‹</button>
      <button type="button" class="lbn next" aria-label="Next photo" (click)="go($event, 1)">›</button>
      <button type="button" class="lbx" aria-label="Close" (click)="open.set(null)">✕</button>
    </div>
  }
</section>`,
})
export class Gallery {
  readonly photos = GALLERY;
  readonly open = signal<number | null>(null);
  readonly current = computed(() => {
    const i = this.open();
    return i === null ? null : this.photos[i];
  });
  step(d: number) {
    const i = this.open();
    if (i !== null) this.open.set((i + d + this.photos.length) % this.photos.length);
  }
  go(e: Event, d: number) {
    e.stopPropagation();
    this.step(d);
  }
}
