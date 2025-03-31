import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AppNavComponent } from './components/app-nav/app-nav.component';

import { Store } from '../store';

import { GamesService } from './_services/games.service';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [GamesService],
  imports: [RouterOutlet, AppNavComponent],
  template: `
    <div class="app">
      <app-nav></app-nav>
      <div class="wrapper"></div>
    </div>
  `,
  styles: ``,
})
export class AppComponent {
  constructor(
    private readonly store: Store,
    private readonly gamesService: GamesService
  ) {}
}
