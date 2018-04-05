import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {Component} from '@angular/core';
import {ConfigurationService, IConfig} from '../services/configuration.service';
import {OnDestroy, OnInit} from '@angular/core/src/metadata/lifecycle_hooks';
import {Subscribable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {UpdateToken, TokenUpdated} from '../state/configuration/config.actions';
import {NgZone} from '@angular/core';
import {isEmpty} from 'lodash/fp';

@Component({
  selector: 'app-root',
  templateUrl: './portal-container.component.html',
  styleUrls: ['./portal-container.component.css'],
})
export class EcaPortalAppContainerComponent implements OnDestroy {

  refreshTokenSubscription: Subscription;
  title = 'Unassigned App Name';

  constructor(private configService: ConfigurationService, private _store: Store<any>, private _ngZone: NgZone) {
    this.configService.consumeConfigJson();

    // Set the application title read from the configuration file.
    const config = _store.select('config');
    config.map((configJson: IConfig) => configJson.portalAppTitle)
      .filter((titleText) => !isEmpty(titleText))
      .subscribe((value) => this.title = value,
        (error) => new Error('All DRC Portal applications must define a title.'));

    this._ngZone.runOutsideAngular(() => {
      this.refreshTokenSubscription = Observable
        .interval(60 * 1000)
        .withLatestFrom(this._store.select('token'))
        .switchMap(
          ([, token]) => {
            if (token) {
              this._store.dispatch(new UpdateToken());
            }
            return Observable.of(null);
          },
        ).subscribe();
    });
  }

  ngOnDestroy() {
    this.refreshTokenSubscription.unsubscribe();
  }

}
