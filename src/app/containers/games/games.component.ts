import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';

import {
  combineLatest,
  interval,
  map,
  Observable,
  startWith,
  switchMap,
  take,
} from 'rxjs';

import { Store } from '../../../store';

// Services
import { GamesService } from '../../_services/games.service';
import { JackpotsService } from '../../_services/jackpots.service';

// Components
import { GameItemComponent } from '../../components/game-item/game-item.component';

// Models
import { Game } from '../../_models/game.model';
import { Jackpot } from '../../_models/jackpot.model';
import { GameWithJackpot } from '../../_models/game-with-jackpot.model';

@Component({
  selector: 'games',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [GamesService, JackpotsService],
  imports: [GameItemComponent, NgIf, NgForOf, AsyncPipe],
  template: `
    <div class="games" *ngIf="games$ | async as games">
      <div *ngIf="isLoading">Loading games...</div>
      <div *ngIf="!isLoading && !games.length">No games in this category</div>

      <game-item
        *ngFor="let game of games; trackBy: trackById"
        [game]="game"
      ></game-item>
    </div>
  `,
  styles: `
    .games {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 25px 15px;
    }  
  `,
})
export class GamesComponent implements OnInit {
  isLoading = true;

  games$!: Observable<GameWithJackpot[]>;

  constructor(
    private readonly store: Store,
    private readonly gamesService: GamesService,
    private readonly jackpotsService: JackpotsService
  ) {}

  ngOnInit(): void {
    this.gamesService.games$
      .pipe(take(1))
      .subscribe(() => (this.isLoading = false));

    interval(3000)
      .pipe(
        startWith(0),
        switchMap(() => this.jackpotsService.jackpots$)
      )
      .subscribe();

    this.games$ = combineLatest([
      this.store.selectState('games'),
      this.store.selectState('jackpots'),
    ]).pipe(
      map(([games, jackpots]) => this.mergeGamesWithJackpots(games, jackpots))
    );
  }

  trackById(id: number, value: GameWithJackpot): string {
    return value.id;
  }

  private mergeGamesWithJackpots(
    games: Game[],
    jackpots: Jackpot[]
  ): GameWithJackpot[] {
    return games.map((game) => {
      const jackpot = jackpots.find((j) => j.game === game.id);
      return { ...game, jackpot: jackpot ? jackpot.amount : null };
    });
  }
}
