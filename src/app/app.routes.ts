import { Routes } from '@angular/router';

import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: 'games/top-games', component: AppComponent },
  { path: '', pathMatch: 'full', redirectTo: 'games/top-games' },
  { path: '**', redirectTo: 'games/top-games' },
];
