import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { INITIAL_STATE } from './_helpers/injection-tokes';
import { StoreFactory } from './_helpers/factory-functions';

import { Store } from '../store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: INITIAL_STATE,
      useValue: {},
    },
    {
      provide: Store,
      useFactory: StoreFactory,
      deps: [INITIAL_STATE],
    },
  ],
};
