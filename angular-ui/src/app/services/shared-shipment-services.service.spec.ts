import { TestBed } from '@angular/core/testing';

import { SharedShipmentServicesService } from './shared-shipment-services.service';

describe('SharedShipmentServicesService', () => {
  let service: SharedShipmentServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedShipmentServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
