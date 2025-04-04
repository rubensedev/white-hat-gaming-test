import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <div class="app-nav">
      <div #wrapper class="wrapper">
        <a [routerLink]="['/games', 'top']" routerLinkActive="active">
          Top Games
        </a>
        <a [routerLink]="['/games', 'new']" routerLinkActive="active">
          New Games
        </a>
        <a [routerLink]="['/games', 'slots']" routerLinkActive="active">
          Slots
        </a>
        <a [routerLink]="['/games', 'jackpots']" routerLinkActive="active">
          Jackpots
        </a>
        <a [routerLink]="['/games', 'live']" routerLinkActive="active">Live</a>
        <a [routerLink]="['/games', 'blackjack']" routerLinkActive="active">
          Blackjack
        </a>
        <a [routerLink]="['/games', 'roulette']" routerLinkActive="active">
          Roulette
        </a>
        <a [routerLink]="['/games', 'table']" routerLinkActive="active">
          Table
        </a>
        <a [routerLink]="['/games', 'poker']" routerLinkActive="active">
          Poker
        </a>
        <a [routerLink]="['/games', 'other']" routerLinkActive="active">
          Other
        </a>
      </div>

      <div #hamburguer class="hamburger" (click)="toggleMenu()">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </div>
  `,
  styleUrl: './app-nav.component.scss',
})
export class AppNavComponent {
  @ViewChild('hamburguer') hamburguer!: ElementRef;
  @ViewChild('wrapper') wrapper!: ElementRef;

  toggleMenu() {
    this.hamburguer.nativeElement.classList.toggle('active');
    this.wrapper.nativeElement.classList.toggle('active');
  }
}
