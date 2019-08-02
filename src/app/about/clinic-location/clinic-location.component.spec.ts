import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicLocationComponent } from './clinic-location.component';

describe('ClinicLocationComponent', () => {
  let component: ClinicLocationComponent;
  let fixture: ComponentFixture<ClinicLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
