import { TestBed } from '@angular/core/testing';

import { LiqiudityGaugeService } from './liqiudity-gauge.service';

describe('LiqiudityGaugeService', () => {
  let service: LiqiudityGaugeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiqiudityGaugeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
