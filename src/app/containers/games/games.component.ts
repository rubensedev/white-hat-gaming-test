import { Component, OnInit } from '@angular/core';
import { GameItemComponent } from '../../components/game/game.component';
import { Store } from '../../../store';
import { GamesService } from '../../_services/games.service';
import { Game } from '../../_models/game.model';
import { Observable, take } from 'rxjs';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'games',
  standalone: true,
  providers: [GamesService],
  imports: [GameItemComponent, NgIf, NgForOf, AsyncPipe],
  template: `
    <div class="games" *ngIf="games$ | async as games">
      <div *ngIf="isLoading">Loading games...</div>
      <div *ngIf="!isLoading && !games.length">No games in this category</div>

      <game-item *ngFor="let game of games" [game]="game"></game-item>
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
  games$!: Observable<Game[]>;
  isLoading = true;

  constructor(
    private readonly store: Store,
    private readonly gamesService: GamesService
  ) {}

  ngOnInit(): void {
    this.gamesService.games$
      .pipe(take(1))
      .subscribe(() => (this.isLoading = false));
    this.games$ = this.store.selectState('games');
  }
}
