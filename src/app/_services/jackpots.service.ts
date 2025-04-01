import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError, Observable, retry, tap, throwError, timer } from 'rxjs';

import { Store } from '../../store';

// Models
import { Jackpot } from '../_models/jackpot.model';

@Injectable()
export class JackpotsService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly API_URL =
    'https://stage.whgstage.com/front-end-test/jackpots.php';
  private readonly RETRY_COUNT = 2;
  private readonly RETRY_DELAY_MS = 2500;

  private readonly store: Store = inject(Store);

  jackpots$: Observable<Jackpot[]> = this.http
    .get<Jackpot[]>(this.API_URL)
    .pipe(
      tap((data) => {
        const jackpots = data || [];
        this.store.set({ jackpots });
      }),
      retry({
        count: this.RETRY_COUNT,
        delay: (attempt) => timer(this.RETRY_DELAY_MS * attempt),
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
