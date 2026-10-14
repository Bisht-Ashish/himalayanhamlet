import { Component, computed, input } from '@angular/core';

const PATHS: Record<string, string> = {
  bed: 'M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7M3 18h18M3 14h18M7 9V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2',
  users: 'M16 20v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M20 20v-1a4 4 0 0 0-3-3.9M15 4.2a3.5 3.5 0 0 1 0 6.6',
  mountain: 'M3 19l6-10 4 6 2-3 6 7z',
  utensils: 'M7 3v8M4 3v5a3 3 0 0 0 6 0V3M7 11v10M17 3c-2 2-3 5-3 8h6V3M17 11v10',
  wifi: 'M2 9a15 15 0 0 1 20 0M5 12.5a10.5 10.5 0 0 1 14 0M8.5 16a5.5 5.5 0 0 1 7 0M12 19.5h.01',
  flame: 'M12 3c1 3-3 5-3 9a4 4 0 0 0 8 0c0-2-1-3-2-5 0 2-1 3-2 3 0-2 0-4-1-7z',
  drop: 'M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z',
  thermo: 'M10 14V5a2 2 0 1 1 4 0v9a4 4 0 1 1-4 0z',
  laptop: 'M4 6h16v10H4zM2 19h20',
  plug: 'M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0zM12 17v4',
  leaf: 'M5 19C5 10 10 5 20 4c0 10-5 15-14 15zM5 19c3-5 6-8 10-10',
  cup: 'M4 8h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM17 9h2a2 2 0 0 1 0 5h-2M7 3v2M11 3v2',
  layers: 'M12 3l9 5-9 5-9-5zM3 13l9 5 9-5',
  instagram: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM17.5 6.5h.01',
  logo: 'M2 20l7-12 4 6 2.5-4L22 20z',
};

@Component({
  selector: 'app-icon',
  styles: ':host{display:inline-flex}svg{width:100%;height:100%}',
  template: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path [attr.d]="d()"/></svg>`,
})
export class Icon {
  readonly name = input.required<string>();
  readonly d = computed(() => PATHS[this.name()] ?? '');
}
