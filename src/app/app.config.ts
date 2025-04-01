import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

// Helpers
import { INITIAL_STATE } from './_helpers/injection-tokes';
import { StoreFactory } from './_helpers/factory-functions';
import { INITIAL_STATE_VALUE } from './_helpers/initial-state-value';

import { Store } from '../store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {
      provide: INITIAL_STATE,
      useValue: INITIAL_STATE_VALUE,
    },
    {
      provide: Store,
      useFactory: StoreFactory,
      deps: [INITIAL_STATE],
    },
  ],
};
