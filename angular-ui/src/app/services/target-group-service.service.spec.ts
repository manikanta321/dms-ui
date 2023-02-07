import { TestBed } from '@angular/core/testing';

import { TargetGroupServiceService } from './target-group-service.service';

describe('TargetGroupServiceService', () => {
  let service: TargetGroupServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TargetGroupServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
