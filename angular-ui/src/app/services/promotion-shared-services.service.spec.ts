import { TestBed } from '@angular/core/testing';

import { PromotionSharedServicesService } from './promotion-shared-services.service';

describe('PromotionSharedServicesService', () => {
  let service: PromotionSharedServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromotionSharedServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
