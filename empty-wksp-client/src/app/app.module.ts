import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { EcaPortalModule } from 'PROJECT_NAME_TO_CHANGE';
import { EcaPortalComponent } from 'PROJECT_NAME_TO_CHANGE';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, EcaPortalModule
  ],
  providers: [],
  bootstrap: [AppComponent, EcaPortalComponent]
})
export class AppModule { }
