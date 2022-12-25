import { TestBed } from '@angular/core/testing';

import { SalesServicesService } from './sales-services.service';

describe('SalesServicesService', () => {
  let service: SalesServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
