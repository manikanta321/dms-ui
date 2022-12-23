import { TestBed } from '@angular/core/testing';

import { TargetListService } from './target-list.service';

describe('TargetListService', () => {
  let service: TargetListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TargetListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
