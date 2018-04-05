import {SecurityService} from '../../services/security.service';
import {Injectable} from '@angular/core';
import {Action, State, Store} from '@ngrx/store';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import '../../../rxjs-operators';
import {isEmpty, pick} from 'lodash/fp';

import {
  TokenUpdated,
  UpdateToken,
  ConfigurationActions,
  IConfigurationAction,
} from './config.actions';


@Injectable()
export class ConfigEffects {

  constructor(private actions$: Actions,
              private securityService: SecurityService,) {
  }

  @Effect() updateToken$: Observable<Action> = this.actions$.ofType(ConfigurationActions.UPDATE_TOKEN)
    .switchMap((action: IConfigurationAction) => {
      return this.securityService.refreshToken();
    })
    .switchMap((response: any) => {
      window['ECA_PORTAL_HEADER'].refresh(response.token);
      return Observable.of(new TokenUpdated(response.token));
    });
}
