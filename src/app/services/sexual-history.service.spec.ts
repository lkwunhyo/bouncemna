import { TestBed } from '@angular/core/testing';

import { SexualHistoryService } from './sexual-history.service';

describe('SexualHistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SexualHistoryService = TestBed.get(SexualHistoryService);
    expect(service).toBeTruthy();
  });
});
