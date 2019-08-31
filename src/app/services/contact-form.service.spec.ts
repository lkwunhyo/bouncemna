import { TestBed } from '@angular/core/testing';

import { ContactFormService } from './contact-form.service';

describe('ContactFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactFormService = TestBed.get(ContactFormService);
    expect(service).toBeTruthy();
  });
});
