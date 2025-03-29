import { InjectionToken } from '@angular/core';

import { State } from '../_models/state.model';

export const INITIAL_STATE = new InjectionToken<State>('initialState');
