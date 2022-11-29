import { TestBed } from '@angular/core/testing';

import { AssosiationServicesService } from './assosiation-services.service';

describe('AssosiationServicesService', () => {
  let service: AssosiationServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssosiationServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
