import { TestBed } from '@angular/core/testing';

import { SharedServicesMaterialService } from './shared-services-material.service';

describe('SharedServicesMaterialService', () => {
  let service: SharedServicesMaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedServicesMaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
