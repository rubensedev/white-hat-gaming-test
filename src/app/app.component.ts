import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Components
import { AppNavComponent } from './components/app-nav/app-nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppNavComponent],
  template: `
    <div class="app">
      <app-nav></app-nav>
      <div class="wrapper">
        <router-outlet></router-outlet>
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
