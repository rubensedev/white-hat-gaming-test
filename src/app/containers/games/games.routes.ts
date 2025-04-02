import { Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

// Guards
import { validRouteGuard } from '../../_guards/valid-route.guard';

export const GamesRoutes: Routes = [
  {
    path: '',
    providers: [provideHttpClient()],
    children: [
      {
        path: ':id',
        canActivate: [validRouteGuard],
        loadComponent: () =>
          import('./games.component').then((x) => x.GamesComponent),
      },
      { path: '', pathMatch: 'full', redirectTo: 'top' },
      { path: '**', redirectTo: 'top' },
    ],
  },
  { path: '', pathMatch: 'full', redirectTo: '' },
];
