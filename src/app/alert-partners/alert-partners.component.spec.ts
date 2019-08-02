import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertPartnersComponent } from './alert-partners.component';

describe('AlertPartnersComponent', () => {
  let component: AlertPartnersComponent;
  let fixture: ComponentFixture<AlertPartnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertPartnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
