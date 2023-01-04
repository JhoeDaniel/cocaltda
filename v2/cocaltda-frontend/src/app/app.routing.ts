import { Route } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'public' },

  // {
  //   path: 'signed-in-redirect',
  //   pathMatch: 'full',
  //   redirectTo: 'core',
  // },
  // Auth routes
  // {
  //   path: 'auth',
  //   data: {
  //     layout: 'empty',
  //   },
  //   component: LayoutComponent,
  //   loadChildren: () =>
  //     import('./modules/auth/auth.module').then((m) => m.AuthModule),
  // },
  // Core routes
  {
    path: 'core',
    component: LayoutComponent,
    loadChildren: () =>
      import('./modules/core/core.module').then((m) => m.CoreModule),
  },
  // Business routes
  // {
  //   path: 'business',
  //   component: LayoutComponent,
  //   loadChildren: () =>
  //     import('./modules/business/business.module').then(
  //       (m) => m.BusinessModule
  //     ),
  // },
  // Report routes
  // {
  //   path: 'report',
  //   component: LayoutComponent,
  //   loadChildren: () =>
  //     import('./modules/report/report.module').then((m) => m.ReportModule),
  // },
  // Public routes
  {
    path: 'public',
    component: LayoutComponent,
    data: {
      layout: 'empty',
    },
    loadChildren: () =>
      import('./modules/public/public.module').then((m) => m.PublicModule),
  },
  // Not found
  { path: '**', redirectTo: 'public/not-found' },
];
