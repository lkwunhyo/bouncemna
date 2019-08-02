import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SexualHistoryComponent } from './sexual-history.component';

describe('SexualHistoryComponent', () => {
  let component: SexualHistoryComponent;
  let fixture: ComponentFixture<SexualHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SexualHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SexualHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
