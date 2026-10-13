import { Component, computed, signal } from '@angular/core';
import { GALLERY } from './site-data';

@Component({
  selector: 'app-gallery',
  styles: ':host{display:block}',
  host: { '(document:keydown.escape)': 'open.set(null)' },
  template: `
<section id="gallery">
  <h2>Gallery</h2>
  <div class="gal">
    @for (p of photos; track p.small; let i = $index) {
      <button type="button" class="gbtn" (click)="open.set(i)" [attr.aria-label]="'Enlarge photo: ' + p.alt">
        <img class="ph" [src]="p.small" [alt]="p.alt" width="900" height="600" loading="lazy">
      </button>
    }
  </div>
  <p class="note" style="margin-top:10px">Tap a photo to enlarge it.</p>
  @if (current(); as p) {
    <div class="lb" (click)="open.set(null)" role="dialog" aria-modal="true" aria-label="Photo viewer">
      <img [src]="p.large" [alt]="p.alt">
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
}
