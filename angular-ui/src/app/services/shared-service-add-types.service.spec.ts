import { TestBed } from '@angular/core/testing';

import { SharedServiceAddTypesService } from './shared-service-add-types.service';

describe('SharedServiceAddTypesService', () => {
  let service: SharedServiceAddTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedServiceAddTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
