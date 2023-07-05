import { TestBed } from '@angular/core/testing';

import { EnvironmentProviderService } from './environment-provider.service';

describe('EnvironmentProviderService', () => {
  let service: EnvironmentProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvironmentProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
