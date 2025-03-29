import { Routes } from '@angular/router';

import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: 'games', component: AppComponent },
  { path: '', pathMatch: 'full', redirectTo: 'games' },
  { path: '**', redirectTo: 'games' },
];
