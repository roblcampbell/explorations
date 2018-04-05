import {Action} from '@ngrx/store';

export const AppActions = {
  GO: '[App] Go',
};

export interface IAppAction extends Action {
  payload?: any;
}

export class Go implements IAppAction {
  readonly type = AppActions.GO;
}
