import { TestBed } from '@angular/core/testing';

import { StakedCheddaService } from './staked-chedda.service';

describe('StakedCheddaService', () => {
  let service: StakedCheddaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StakedCheddaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
