import { TestBed } from '@angular/core/testing';

import { DropManagerService } from './drop-manager.service';

describe('DropManagerService', () => {
  let service: DropManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DropManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
