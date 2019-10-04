import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactProfileComponent } from './contact-profile.component';

describe('ContactProfileComponent', () => {
  let component: ContactProfileComponent;
  let fixture: ComponentFixture<ContactProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
