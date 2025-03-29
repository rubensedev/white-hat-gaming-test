import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { take } from 'rxjs';

import { GamesService } from './_services/games.service';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [GamesService],
  imports: [RouterOutlet, JsonPipe],
  template: `
    <div class="app">
      <h1>It works!</h1>
      <div>{{ games | json }}</div>
    </div>
  `,
  styles: ``,
})
export class AppComponent implements OnInit {
  games!: {}[];

  constructor(private readonly gamesService: GamesService) {}

  ngOnInit(): void {
    this.gamesService
      .read()
      .pipe(take(1))
      .subscribe((games) => (this.games = games));
  }
}
