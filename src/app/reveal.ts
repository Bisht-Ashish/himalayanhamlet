import { Directive, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';

/** Fades an element up once as it scrolls into view. Content stays visible if observers are unavailable. */
@Directive({ selector: '[appReveal]' })
export class Reveal implements OnInit, OnDestroy {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private io?: IntersectionObserver;

  ngOnInit() {
    if (typeof IntersectionObserver === 'undefined') return;
    this.el.classList.add('rv');
    this.io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          this.el.classList.add('in');
          this.io?.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    this.io.observe(this.el);
  }

  ngOnDestroy() {
    this.io?.disconnect();
  }
}
