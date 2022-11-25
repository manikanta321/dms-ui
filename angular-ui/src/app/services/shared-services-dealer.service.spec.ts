import { TestBed } from '@angular/core/testing';

import { SharedServicesDealerService } from './shared-services-dealer.service';

describe('SharedServicesDealerService', () => {
  let service: SharedServicesDealerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedServicesDealerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
