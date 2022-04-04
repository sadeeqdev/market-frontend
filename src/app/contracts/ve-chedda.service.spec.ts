import { TestBed } from '@angular/core/testing';

import { VeCheddaService } from './ve-chedda.service';

describe('VeCheddaService', () => {
  let service: VeCheddaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VeCheddaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
