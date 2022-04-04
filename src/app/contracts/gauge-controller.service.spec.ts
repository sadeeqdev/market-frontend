import { TestBed } from '@angular/core/testing';

import { GaugeControllerService } from './gauge-controller.service';

describe('GaugeControllerService', () => {
  let service: GaugeControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GaugeControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
