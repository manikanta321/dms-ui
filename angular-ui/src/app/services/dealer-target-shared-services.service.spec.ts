import { TestBed } from '@angular/core/testing';

import { DealerTargetSharedServicesService } from './dealer-target-shared-services.service';

describe('DealerTargetSharedServicesService', () => {
  let service: DealerTargetSharedServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DealerTargetSharedServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
