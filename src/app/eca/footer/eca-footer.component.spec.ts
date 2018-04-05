import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EcaFooterComponent} from './eca-footer.component';

describe('EcaFooterComponent', () => {
  let component: EcaFooterComponent;
  let fixture: ComponentFixture<EcaFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EcaFooterComponent,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcaFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create footer', () => {
    expect(component).toBeTruthy();
  });
});
