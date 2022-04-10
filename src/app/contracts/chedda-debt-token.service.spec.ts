import { TestBed } from '@angular/core/testing';

import { CheddaDebtTokenService } from './chedda-debt-token.service';

describe('CheddaDebtTokenService', () => {
  let service: CheddaDebtTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheddaDebtTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
