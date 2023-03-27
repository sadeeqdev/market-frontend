import { TestBed } from '@angular/core/testing';

import { VaultStatsService } from './vault-stats.service';

describe('VaultStatsService', () => {
  let service: VaultStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaultStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
