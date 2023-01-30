import { TestBed } from '@angular/core/testing';

import { SharedServicesShipmentService } from './shared-services-shipment.service';

describe('SharedServicesShipmentService', () => {
  let service: SharedServicesShipmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedServicesShipmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
