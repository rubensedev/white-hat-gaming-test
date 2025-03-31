import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError, Observable, retry, tap, throwError, timer } from 'rxjs';

import { Store } from '../../store';

// Models
import { Game } from '../_models/game.model';

@Injectable()
export class GamesService {
  private readonly http = inject(HttpClient);
  private readonly API_URL =
    'https://stage.whgstage.com/front-end-test/games.php';
  private readonly RETRY_COUNT = 2;
  private readonly RETRY_DELAY_MS = 2500;

  private readonly store: Store = inject(Store);

  games$: Observable<Game[]> = this.http.get<Game[]>(this.API_URL).pipe(
    tap((data) => {
      const games = data || [];
      this.store.set({ games });
    }),
    retry({
      count: this.RETRY_COUNT,
      delay: (attemp) => timer(this.RETRY_DELAY_MS * attemp),
    }),
    catchError(this.handleError)
  );

  private handleError(err: HttpErrorResponse): Observable<never> {
    const errorMsg =
      err.error instanceof ErrorEvent
        ? `Client-side error: ${err.error.message}`
        : `Server-side error (${err.status}): ${err.message}`;

    console.warn(errorMsg);
    return throwError(() => new Error(errorMsg));
  }
}
