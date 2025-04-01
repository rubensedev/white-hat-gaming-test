import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'games',
    loadChildren: () =>
      import('./containers/games/games.routes').then((x) => x.GamesRoutes),
  },
  { path: '', pathMatch: 'full', redirectTo: 'games' },
  { path: '**', redirectTo: 'games' },
];
