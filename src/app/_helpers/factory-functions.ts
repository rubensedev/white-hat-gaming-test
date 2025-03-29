import { Store } from '../../store';

import { State } from '../_models/state.model';

export function StoreFactory(initialState: State) {
  return new Store(initialState);
}
