import { TestBed } from '@angular/core/testing';

import { AddSexualService } from './add-sexual.service';

describe('AddSexualService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddSexualService = TestBed.get(AddSexualService);
    expect(service).toBeTruthy();
  });
});
