import { TestBed } from '@angular/core/testing';

import { CheddaRewardsService } from './chedda-rewards.service';

describe('CheddaRewardsService', () => {
  let service: CheddaRewardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheddaRewardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
