import { TestBed } from '@angular/core/testing';

import { PromotionListService } from './promotion-list.service';

describe('PromotionListService', () => {
  let service: PromotionListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromotionListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
