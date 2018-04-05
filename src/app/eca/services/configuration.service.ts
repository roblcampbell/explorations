import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {UpdateConfig} from '../state/configuration/config.actions';

export interface IConfig {
  client: string;
  portalHeaderLibUrl: string;
  portalAppTitle: string;
  securityServiceApi: string;
  myAppNameWebApi: string;
}

/* istanbul ignore next */
if (environment.protractor) {
  console.log('App is running in environment "protractor"');
}

@Injectable()
export class ConfigurationService {

  constructor(private http: HttpClient, private store: Store<any>) {
  }

  consumeConfigJson() {

    this.http.get<IConfig>('config.json').subscribe((json) => {

      /* istanbul ignore next */
      if (environment.localapi) {
        json.myAppNameWebApi = 'http://localhost:8080';
        json.securityServiceApi = 'https://api-gateway-dev.drcedirect.com/eca-security-service/all-development-v0';
      }

      this.store.dispatch(new UpdateConfig(json));
    });

  }

}
