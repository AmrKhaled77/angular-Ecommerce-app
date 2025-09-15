import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
    {
    path: 'productDetails/:id',
    renderMode: RenderMode.Server
  },
    {
    path: 'categoriesDetails/:id',
    renderMode: RenderMode.Server
  },
    {
    path: 'brandDeatils/:id',
    renderMode: RenderMode.Server
  },
    {
    path: 'makeOrder/:id',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
