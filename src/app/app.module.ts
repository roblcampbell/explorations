// Libraries & Boilerplate
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {StoreModule, MetaReducer, State} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {storeFreeze} from 'ngrx-store-freeze';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {EffectsModule} from '@ngrx/effects/';

// Material
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

// Components
import {EcaHeaderComponent} from './eca/header/eca-header.component';
import {EcaFooterComponent} from './eca/footer/eca-footer.component';
import {EcaPortalAppContainerComponent} from './eca/portal-container/portal-container.component';
import {EcaUnauthorizedComponent} from './eca/unauthorized/unauthorized.component';

import {reducers} from './eca/state/reducers';
import {effects} from './eca/state/effects';
import {initialState} from './eca/state/initialState';
import {AppRoutingModule} from './app-routing.module';

// Services

// General
import {environment} from '../environments/environment';
import {ScriptLoaderService} from './eca/services/script-loader.service';
import {ConfigurationService} from './eca/services/configuration.service';
import {SecurityService} from './eca/services/security.service';

let developmentImports = [
  StoreDevtoolsModule.instrument({
    maxAge: 100,
  }),
];

developmentImports = !environment.production ? developmentImports : [];
const metaReducers = !environment.production ? [storeFreeze] : [];

@NgModule({
  declarations: [
    EcaHeaderComponent,
    EcaFooterComponent,
    EcaPortalAppContainerComponent,
    EcaUnauthorizedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    StoreModule.forRoot(reducers, {initialState, metaReducers}),
    EffectsModule.forRoot(effects),
    ...developmentImports,
  ],
  providers: [
    ConfigurationService,
    SecurityService,
    ScriptLoaderService,
  ],
  bootstrap: [EcaPortalAppContainerComponent],
})
export class AppModule {
}
