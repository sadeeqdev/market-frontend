import { TestBed } from '@angular/core/testing';

import { CheddaXpService } from './chedda-xp.service';

describe('CheddaXpService', () => {
  let service: CheddaXpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheddaXpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
