import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcaHeaderComponent } from './header/eca-header.component';
import { EcaFooterComponent } from './footer/eca-footer.component';
import { EcaPortalAppContainerComponent } from './portal-container/portal-container.component';
import { ClientConfigurationComponent } from './client-configuration/client-configuration.component';
import { UsersAndGroupsComponent } from './users-and-groups/users-and-groups.component';
import { UserConfigurationComponent } from './user-configuration/user-configuration.component';
import { EcaUnauthorizedComponent } from './unauthorized/unauthorized.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [EcaHeaderComponent, EcaFooterComponent, EcaPortalAppContainerComponent,
    ClientConfigurationComponent, UsersAndGroupsComponent, UserConfigurationComponent,
    EcaUnauthorizedComponent],
})
export class EcaModule { }
