import { TestBed } from '@angular/core/testing';

import { OrdersApisService } from './orders-apis.service';

describe('OrdersApisService', () => {
  let service: OrdersApisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersApisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
