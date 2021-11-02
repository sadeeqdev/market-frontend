import { TestBed } from '@angular/core/testing';

import { CheddaDappStoreService } from './chedda-dapp-store.service';

describe('CheddaDappStoreService', () => {
  let service: CheddaDappStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheddaDappStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
