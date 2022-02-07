import { TestBed } from '@angular/core/testing';

import { PriceConsumerService } from './price-consumer.service';

describe('PriceConsumerService', () => {
  let service: PriceConsumerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceConsumerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
