import { TestBed } from '@angular/core/testing';

import { TargetGroupService } from './target-group.service';

describe('TargetGroupService', () => {
  let service: TargetGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TargetGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
