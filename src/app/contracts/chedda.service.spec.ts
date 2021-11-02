import { TestBed } from '@angular/core/testing';

import { CheddaService } from './chedda.service';

describe('CheddaService', () => {
  let service: CheddaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheddaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
