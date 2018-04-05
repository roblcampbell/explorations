import {Action} from '@ngrx/store';

export const ConfigurationActions = {
  UPDATE_CONFIG: '[Configuration] Update',
  UPDATE_TOKEN: '[Configuration] Update Token',
  TOKEN_UPDATED: '[Configuration] Token Updated',
};

export interface IConfigurationAction extends Action {
  payload?: object;
}

export class UpdateConfig implements IConfigurationAction {
  readonly type = ConfigurationActions.UPDATE_CONFIG;

  constructor(public payload: object) {
  }
}

export class UpdateToken implements IConfigurationAction {
  readonly type = ConfigurationActions.UPDATE_TOKEN;
}

export class TokenUpdated implements IConfigurationAction {
  readonly type = ConfigurationActions.TOKEN_UPDATED;

  constructor(public payload: any) {
  }
}
