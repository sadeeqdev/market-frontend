import { TestBed } from '@angular/core/testing';

import { CheddaBaseTokenVaultService } from './chedda-base-token-vault.service';

describe('CheddaBaseTokenVaultService', () => {
  let service: CheddaBaseTokenVaultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheddaBaseTokenVaultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
