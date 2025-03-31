import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="app-nav">
      <div class="wrapper">
        <a routerLink="games/top-games" routerLinkActive="active">Top Games</a>
        <a routerLink="games/new-games" routerLinkActive="active">New Games</a>
        <a routerLink="games/slots" routerLinkActive="active">Slots</a>
        <a routerLink="games/jackpots" routerLinkActive="active">Jackpots</a>
        <a routerLink="games/live" routerLinkActive="active">Live</a>
        <a routerLink="games/blackjack" routerLinkActive="active">Blackjack</a>
        <a routerLink="games/roulette" routerLinkActive="active">Roulette</a>
        <a routerLink="games/table" routerLinkActive="active">Table</a>
        <a routerLink="games/poker" routerLinkActive="active">Poker</a>
        <a routerLink="games/other" routerLinkActive="active">Other</a>
      </div>
    </div>
  `,
  styleUrl: './app-nav.component.scss',
})
export class AppNavComponent {}
