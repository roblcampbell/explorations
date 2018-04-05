import {Action} from '@ngrx/store';
import {ConfigurationActions} from './config.actions';

export function tokenReducer(token: string, action: any) {
  switch (action.type) {

    case ConfigurationActions.TOKEN_UPDATED:
      return action.payload;

    default:
      return token;
  }
}


