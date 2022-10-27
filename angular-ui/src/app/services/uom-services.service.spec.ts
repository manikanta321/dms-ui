import { TestBed } from '@angular/core/testing';

import { UomServicesService } from './uom-services.service';

describe('UomServicesService', () => {
  let service: UomServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UomServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
