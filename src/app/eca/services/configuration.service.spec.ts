import {TestBed, inject} from '@angular/core/testing';

import {ConfigurationService} from './configuration.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {reducers} from '../state/reducers';
import {StoreModule} from '@ngrx/store';
import {HttpTestingController} from '@angular/common/http/testing';
import {Store} from '@ngrx/store';

describe('ConfigurationService', () => {
  const initialState = {
    config: {},
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers, {initialState}),
        HttpClientTestingModule,
      ],
      providers: [
        ConfigurationService,
      ],
    });
  });

  it('should retrieve config.json', inject(
    [ConfigurationService, HttpTestingController],
    (service: ConfigurationService, httpMock: HttpTestingController) => {

      service.consumeConfigJson();
      httpMock.expectOne('config.json');
    }));

  it('should dispatch received json to the store', (done) => {
    inject([ConfigurationService, HttpTestingController, Store],
      (service: ConfigurationService, httpMock: HttpTestingController, store: Store<any>) => {

        // Set properties of an IConfig object needed for these tests.
        const expectedConfig = {
          client: 'MARS',
          portalHeaderLibUrl: 'sarlac.pit',
          myAppNameWebApi: 'mars.rover.of.awesome',
        };

        service.consumeConfigJson();

        httpMock.expectOne('config.json').flush(expectedConfig);

        store.select('config').subscribe((config) => {
          expect(config).toEqual(expectedConfig);
          done();
        });

      })();
  });
});
