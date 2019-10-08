import { TestBed } from '@angular/core/testing';

import { DiagnosisHistoryService } from './diagnosis-history.service';

describe('DiagnosisHistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiagnosisHistoryService = TestBed.get(DiagnosisHistoryService);
    expect(service).toBeTruthy();
  });
});
