import {ActionReducerMap} from '@ngrx/store';

import {configReducer} from './configuration/config.reducer';
import {tokenReducer} from './configuration/token.reducer';
import {sessionReducer} from './session/session.reducer';

export const reducers: ActionReducerMap<any> = {
  config: configReducer,
  token: tokenReducer,
  session: sessionReducer,
};
