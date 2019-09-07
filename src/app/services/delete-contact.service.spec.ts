import { TestBed } from '@angular/core/testing';

import { DeleteContactService } from './delete-contact.service';

describe('DeleteContactService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeleteContactService = TestBed.get(DeleteContactService);
    expect(service).toBeTruthy();
  });
});
