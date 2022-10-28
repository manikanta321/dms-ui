import { TestBed } from '@angular/core/testing';

import { TaxTemplateServiceService } from './tax-template-service.service';

describe('TaxTemplateServiceService', () => {
  let service: TaxTemplateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxTemplateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
