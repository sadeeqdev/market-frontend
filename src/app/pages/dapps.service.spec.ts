import { TestBed } from '@angular/core/testing';

import { DappsService } from './dapps.service';

describe('DappsService', () => {
  let service: DappsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DappsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
