import { TestBed } from '@angular/core/testing';

import { MarketNftService } from './market-nft.service';

describe('MarketNftService', () => {
  let service: MarketNftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarketNftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
