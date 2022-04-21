import { TestBed } from '@angular/core/testing';

import { PriceOracleService } from './price-oracle.service';

describe('PriceOracleService', () => {
  let service: PriceOracleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceOracleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
