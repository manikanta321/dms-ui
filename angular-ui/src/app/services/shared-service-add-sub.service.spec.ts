import { TestBed } from '@angular/core/testing';

import { SharedServiceAddSubService } from './shared-service-add-sub.service';

describe('SharedServiceAddSubService', () => {
  let service: SharedServiceAddSubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedServiceAddSubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
