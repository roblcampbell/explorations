import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EcaUnauthorizedComponent} from './eca/unauthorized/unauthorized.component';
import {EcaPortalAppContainerComponent} from './eca/portal-container/portal-container.component';

import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {SecurityService} from './eca/services/security.service';
import {Router} from '@angular/router';

@Injectable()
export class RedirectOnUnauthorized implements CanActivate {

  constructor(private securityService: SecurityService, private router: Router) {
  }

  canActivate() {
    return this.securityService.isUserLoggedIn().map((isLoggedIn) => {
      if (!isLoggedIn) {
        this.router.navigate(['unauthorized']);
      }
      return isLoggedIn;
    });
  }
}

const routes: Routes = [
  {path: 'app', component: EcaPortalAppContainerComponent, canActivate: [RedirectOnUnauthorized]},
  {path: 'unauthorized', component: EcaUnauthorizedComponent},
  {path: '**', redirectTo: 'app'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [RedirectOnUnauthorized],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
