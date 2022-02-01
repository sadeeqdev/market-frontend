import { TestBed } from '@angular/core/testing';

import { CheddaLoanManagerService } from './chedda-loan-manager.service';

describe('CheddaLoanManagerService', () => {
  let service: CheddaLoanManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheddaLoanManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
