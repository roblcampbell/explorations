import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcaPortalComponent } from './eca-portal.component';

describe('EcaPortalComponent', () => {
  let component: EcaPortalComponent;
  let fixture: ComponentFixture<EcaPortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcaPortalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcaPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
