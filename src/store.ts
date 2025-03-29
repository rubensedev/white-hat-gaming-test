import { Inject, Injectable } from '@angular/core';

import {
  BehaviorSubject,
  distinctUntilKeyChanged,
  map,
  Observable,
  scan,
  Subject,
} from 'rxjs';

import { State } from './app/_models/state.model';

@Injectable({
  providedIn: 'root',
})
export class Store {
  private _store$: BehaviorSubject<State>;
  // Partial ensures we don't have to provide all properties
  private _stateUpdate$ = new Subject<Partial<State>>();

  constructor(@Inject('initialState') private initialState: State) {
    this._store$ = new BehaviorSubject<State>(initialState);
    // keep tracking of state updates
    this._stateUpdate$
      .pipe(
        scan<Partial<State>, State>(
          (current, updated) => ({ ...current, ...updated }),
          initialState
        )
      )
      // call this._store$.next(newState)
      .subscribe(this._store$);
  }

  // get the value of the state as read-only object
  get value(): Readonly<State> {
    return this._store$.getValue();
  }

  // select a specific key from the state and observe its changes
  selectState<K extends keyof State>(key: K): Observable<State[K]> {
    return this._store$.pipe(
      // prevent unnecesary emissions
      distinctUntilKeyChanged(key),
      map((state) => state[key])
    );
  }

  // update the state for a specific key or multiple at once
  set(partialState: Partial<State>) {
    this._stateUpdate$.next(partialState);
  }

  // check state changes when subscribing
  stateChanges(): Observable<State> {
    return this._store$.asObservable();
  }
}
