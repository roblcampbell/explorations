import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcaPortalComponent } from './eca-portal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [EcaPortalComponent],
  exports: [EcaPortalComponent],
})
export class EcaPortalModule { }
