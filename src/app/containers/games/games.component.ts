import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { map, Observable, switchMap, take, tap } from 'rxjs';

import { Store } from '../../../store';

// Services
import { GamesService } from '../../_services/games.service';

// Components
import { GameItemComponent } from '../../components/game-item/game-item.component';

// Models
import { Game } from '../../_models/game.model';
import { GameCategory } from '../../_models/game-category.model';

@Component({
  selector: 'games',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [GamesService],
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
export class GamesComponent implements OnInit {
  isLoading = true;
  routeId!: GameCategory['id'];

  games$!: Observable<Game[]>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store,
    private readonly gamesService: GamesService
  ) {}

  ngOnInit(): void {
    this.gamesService.games$
      .pipe(take(1))
      .subscribe(() => (this.isLoading = false));

    this.games$ = this.route.paramMap.pipe(
      map((params) => params.get('id')),
      tap((routeId: any) => (this.routeId = routeId)),
      switchMap((routeId: any) => {
        const otherCategories: GameCategory['id'][] = [
          'ball',
          'virtual',
          'fun',
        ];
        return this.store.selectState('games').pipe(
          map((games) => {
            if (routeId === 'other') {
              return games.filter((game) =>
                otherCategories.some((cat) => game.categories.includes(cat))
              );
            }
            return games.filter((game) => game.categories.includes(routeId));
          })
        );
      })
    );
  }

  trackById(id: number, value: Game): string {
    return value.id;
  }
}
