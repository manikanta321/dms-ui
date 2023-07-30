import { TestBed } from '@angular/core/testing';

import { SharedimageService } from './sharedimage.service';

describe('SharedimageService', () => {
  let service: SharedimageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedimageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
