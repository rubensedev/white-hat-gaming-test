import { Component } from '@angular/core';

// Containers
import { GamesComponent } from './containers/games/games.component';

// Components
import { AppNavComponent } from './components/app-nav/app-nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppNavComponent, GamesComponent],
  template: `
    <div class="app">
      <app-nav></app-nav>
      <div class="wrapper">
        <games></games>
      </div>
    </div>
  `,
  styles: `
    .app {
      .wrapper {
        max-width: 1300px;
        margin: 0 auto;
        padding: 30px;
      }
    }
  `,
})
export class AppComponent {}
