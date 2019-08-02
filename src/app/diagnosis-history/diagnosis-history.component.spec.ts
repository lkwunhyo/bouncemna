import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosisHistoryComponent } from './diagnosis-history.component';

describe('DiagnosisHistoryComponent', () => {
  let component: DiagnosisHistoryComponent;
  let fixture: ComponentFixture<DiagnosisHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosisHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosisHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
