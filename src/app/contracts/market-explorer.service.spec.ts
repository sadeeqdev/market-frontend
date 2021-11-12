import { TestBed } from '@angular/core/testing';

import { MarketExplorerService } from './market-explorer.service';

describe('MarketExplorerService', () => {
  let service: MarketExplorerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarketExplorerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
