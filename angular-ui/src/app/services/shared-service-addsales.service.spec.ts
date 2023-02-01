import { TestBed } from '@angular/core/testing';

import { SharedServiceAddsalesService } from './shared-service-addsales.service';

describe('SharedServiceAddsalesService', () => {
  let service: SharedServiceAddsalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedServiceAddsalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
