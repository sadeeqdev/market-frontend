import { TestBed } from '@angular/core/testing';

import { DappExplorerService } from './dapp-explorer.service';

describe('DappExplorerService', () => {
  let service: DappExplorerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DappExplorerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
