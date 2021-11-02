import { TestBed } from '@angular/core/testing';

import { CheddaMarketService } from './chedda-market.service';

describe('CheddaMarketService', () => {
  let service: CheddaMarketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheddaMarketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
