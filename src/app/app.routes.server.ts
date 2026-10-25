import { RenderMode, ServerRoute } from '@angular/ssr';

// The site is one page; build it ahead of time.
export const serverRoutes: ServerRoute[] = [{ path: '**', renderMode: RenderMode.Prerender }];
