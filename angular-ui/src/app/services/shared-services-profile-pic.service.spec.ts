import { TestBed } from '@angular/core/testing';

import { SharedServicesProfilePicService } from './shared-services-profile-pic.service';

describe('SharedServicesProfilePicService', () => {
  let service: SharedServicesProfilePicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedServicesProfilePicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
