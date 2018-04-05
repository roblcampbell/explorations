import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IScan} from '../state/initialState';
import {forIn} from 'lodash/fp/forIn';
import {Observable} from 'rxjs/Observable';
import '../../rxjs-operators';
import {Store} from '@ngrx/store';
import {isEmpty} from 'lodash/fp';
import {ActivatedRoute} from '@angular/router/src/router_state';
import {Router} from '@angular/router';

@Injectable()
export class SecurityService {

  private apiPath$: Observable<string>;
  private headers$: Observable<HttpHeaders>;
  private token$: Observable<string>;

  constructor(private http: HttpClient, private store: Store<any>, private router: Router) {
    this.apiPath$ =
      this.store.select('config')
        .map((config) => config.securityServiceApi)
        .filter((path) => !isEmpty(path));
    this.token$ =
      this.store.select('token');
    this.headers$ =
      this.store.select('token')
        .filter((token) => !isEmpty(token))
        .map((token) => new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }));
  }

  createRefreshRequest() {
    return this.apiPath$
      .withLatestFrom(this.token$)
      .switchMap(
        ([apiPath, token]) => {
          return this.http.post(`${apiPath}/v0/refresh`, {
            token,
          });
        },
      );
  }

  refreshToken() {
    return this.createRefreshRequest()
      .catch((err) => {
        this.router.navigate(['unauthorized']);
        return Observable.of({
          token: null,
        });
      });
  }

  isUserLoggedIn() {
    return this.createRefreshRequest()
      .map((response) => true)
      .catch((err) => Observable.of(false));
  }

}
