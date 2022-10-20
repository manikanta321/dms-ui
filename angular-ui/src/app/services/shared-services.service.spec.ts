import { TestBed } from '@angular/core/testing';

import { SharedServicesService } from './shared-services.service';

describe('SharedServicesService', () => {
  let service: SharedServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
