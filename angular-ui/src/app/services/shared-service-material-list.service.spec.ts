import { TestBed } from '@angular/core/testing';

import { SharedServiceMaterialListService } from './shared-service-material-list.service';

describe('SharedServiceMaterialListService', () => {
  let service: SharedServiceMaterialListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedServiceMaterialListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
