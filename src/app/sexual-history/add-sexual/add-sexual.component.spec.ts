import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSexualComponent } from './add-sexual.component';

describe('AddSexualComponent', () => {
  let component: AddSexualComponent;
  let fixture: ComponentFixture<AddSexualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSexualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSexualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
