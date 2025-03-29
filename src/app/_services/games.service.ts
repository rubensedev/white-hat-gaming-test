import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  catchError,
  Observable,
  of,
  retry,
  tap,
  throwError,
  timer,
} from 'rxjs';

@Injectable()
export class GamesService {
  private games: {}[] = [];
  private readonly http = inject(HttpClient);
  private readonly API_URL =
    'https://stage.whgstage.com/front-end-test/games.php';
  private readonly RETRY_COUNT = 2;
  private readonly RETRY_DELAY_MS = 2500;

  read(): Observable<{}[]> {
    if (this.games.length) {
      return of(this.games);
    }

    return this.http.get<{}[]>(this.API_URL).pipe(
      tap((games) => (this.games = games)),
      retry({
        count: this.RETRY_COUNT,
        delay: (attemp) => timer(this.RETRY_DELAY_MS * attemp),
      }),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    const errorMsg =
      err.error instanceof ErrorEvent
        ? `Client-side error: ${err.error.message}`
        : `Server-side error (${err.status}): ${err.message}`;

    console.warn(errorMsg);
    return throwError(() => new Error(errorMsg));
  }
}
