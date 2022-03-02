import { TestBed } from '@angular/core/testing';

import { WrappedNativeTokenService } from './wrapped-native-token.service';

describe('WrappedNativeTokenService', () => {
  let service: WrappedNativeTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WrappedNativeTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
