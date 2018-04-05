import {Action} from '@ngrx/store';

export function sessionReducer(state: { id: string }, action: Action) {
  switch (action.type) {
    default:
      return state;
  }
}
