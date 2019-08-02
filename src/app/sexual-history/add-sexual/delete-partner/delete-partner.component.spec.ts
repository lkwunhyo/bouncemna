import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePartnerComponent } from './delete-partner.component';

describe('DeletePartnerComponent', () => {
  let component: DeletePartnerComponent;
  let fixture: ComponentFixture<DeletePartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletePartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
