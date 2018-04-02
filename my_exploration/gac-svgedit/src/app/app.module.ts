import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';

import { DrcSvgEditorComponent } from './app.component';

@NgModule({
  declarations: [
    DrcSvgEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ColorPickerModule
  ],
  providers: [],
  bootstrap: [DrcSvgEditorComponent]
})
export class DrcSvgEditorAppModule { }
