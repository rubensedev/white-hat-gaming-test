import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';

import {
  combineLatest,
  map,
  Observable,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';

import { Store } from '../../../store';

// Services
import { GamesService } from '../../_services/games.service';
import { JackpotsService } from '../../_services/jackpots.service';

// Components
import { GameItemComponent } from '../../components/game-item/game-item.component';

// Models
import { Game } from '../../_models/game.model';
import { GameCategory } from '../../_models/game-category.model';
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
        [routeId]="routeId"
      ></game-item>
    </div>
  `,
  styles: `
    .games {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(225px, 1fr));
      justify-items: center;
      gap: 40px 8px;
    }
  `,
})
export class GamesComponent implements OnInit, OnDestroy {
  isLoading = true;
  routeId!: GameCategory['id'];

  games$!: Observable<GameWithJackpot[]>;

  private destroy$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store,
    private readonly gamesService: GamesService,
    private readonly jackpotsService: JackpotsService
  ) {}

  ngOnInit(): void {
    this.gamesService.games$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => (this.isLoading = false));

    this.jackpotsService.jackpots$.pipe(takeUntil(this.destroy$)).subscribe();

    this.games$ = this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('id')),
      tap((routeId: any) => (this.routeId = routeId)),
      switchMap((routeId) =>
        combineLatest([
          this.store.selectState('games'),
          this.store.selectState('jackpots'),
        ]).pipe(
          map(([games, jackpots]) => {
            const filteredGames = this.filterByCategories(routeId, games);
            return this.mergeGamesWithJackpots(filteredGames, jackpots);
          })
        )
      ),
      takeUntil(this.destroy$)
    );
  }

  private filterByCategories(routeId: any, games: Game[]): Game[] {
    const otherCategories: GameCategory['id'][] = ['ball', 'virtual', 'fun'];
    if (routeId === 'other') {
      return games.filter((game) =>
        otherCategories.some((cat) => game.categories.includes(cat))
      );
    }
    return games.filter((game) => game.categories.includes(routeId));
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

  trackById(id: number, value: Game): string {
    return value.id;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
