import {SecurityService} from '../services/security.service';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store/';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css'],
})
export class EcaUnauthorizedComponent {
  constructor() {
  }
}
