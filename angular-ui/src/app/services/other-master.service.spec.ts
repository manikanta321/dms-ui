import { TestBed } from '@angular/core/testing';

import { OtherMasterService } from './other-master.service';

describe('OtherMasterService', () => {
  let service: OtherMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtherMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
